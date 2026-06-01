import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { geocodeAddress, getDistanceMatrix } from '@/lib/maps'
import { calculatePrice, isAfterHours } from '@/lib/pricing'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email/send'
import { NewBookingAdminEmail } from '@/lib/email/templates/NewBookingAdmin'
import { BookingReceivedEmail } from '@/lib/email/templates/BookingReceived'
import { SITE_NAME } from '@/lib/constants'

const bookingSchema = z.object({
  // Ride type
  rideType: z.enum(['one_way', 'round_trip', 'recurring']),
  recurringPattern: z.string().optional().nullable(),

  // Passenger
  passengerName: z.string().min(2),
  passengerDob: z.string().min(1),
  passengerPhone: z.string().min(10),
  passengerEmail: z.string().email().optional().or(z.literal('')),
  emergencyContact: z.string().optional().or(z.literal('')),

  // Pickup
  pickupAddress: z.string().min(5),
  pickupApt: z.string().optional().or(z.literal('')),
  pickupLocationType: z.string().min(1),
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
  pickupLat: z.number().optional().nullable(),
  pickupLng: z.number().optional().nullable(),

  // Dropoff
  dropoffAddress: z.string().min(5),
  dropoffFacilityName: z.string().optional().or(z.literal('')),
  dropoffAppointmentTime: z.string().optional().or(z.literal('')),
  dropoffDepartment: z.string().optional().or(z.literal('')),
  dropoffLat: z.number().optional().nullable(),
  dropoffLng: z.number().optional().nullable(),

  // Transport
  transportType: z.enum(['ambulatory', 'wheelchair']),
  needsDoorAssist: z.boolean().default(false),
  needsBuildingAssist: z.boolean().default(false),
  hasCompanion: z.boolean().default(false),
  wheelchairOwned: z.boolean().optional().nullable(),
  wheelchairPowered: z.boolean().optional().nullable(),
  hasStairs: z.boolean().optional().nullable(),

  // Payer
  payerType: z.enum(['medicaid', 'insurance', 'facility', 'private_pay', 'cash', 'card']),
  payerDetails: z.record(z.string(), z.unknown()),

  // Notes
  specialInstructions: z.string().optional().or(z.literal('')),
  gateCode: z.string().optional().or(z.literal('')),
  mobilityNotes: z.string().optional().or(z.literal('')),
  preferredLanguage: z.string().optional().or(z.literal('')),
  additionalInfo: z.string().optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many booking requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const result = bookingSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid booking data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Check if user is logged in
    const session = await auth()
    const userId = session?.user?.id || null

    // Geocode addresses if lat/lng missing
    let pickupLat = data.pickupLat ?? null
    let pickupLng = data.pickupLng ?? null
    let dropoffLat = data.dropoffLat ?? null
    let dropoffLng = data.dropoffLng ?? null

    if (!pickupLat || !pickupLng) {
      const geo = await geocodeAddress(data.pickupAddress)
      if (geo) {
        pickupLat = geo.lat
        pickupLng = geo.lng
      }
    }
    if (!dropoffLat || !dropoffLng) {
      const geo = await geocodeAddress(data.dropoffAddress)
      if (geo) {
        dropoffLat = geo.lat
        dropoffLng = geo.lng
      }
    }

    // Calculate distance and price
    let estimatedMiles: number | null = null
    let estimatedDuration: number | null = null
    let estimatedPrice: number | null = null

    if (pickupLat && pickupLng && dropoffLat && dropoffLng) {
      try {
        const dist = await getDistanceMatrix(
          { lat: pickupLat, lng: pickupLng },
          { lat: dropoffLat, lng: dropoffLng }
        )
        estimatedMiles = dist.miles
        estimatedDuration = dist.durationMinutes

        const pickupDateTime = new Date(`${data.pickupDate}T${data.pickupTime}`)
        const pricing = calculatePrice({
          miles: dist.miles,
          transportType: data.transportType,
          isRoundTrip: data.rideType === 'round_trip',
          isAfterHours: isAfterHours(pickupDateTime),
          needsBuildingAssist: data.needsBuildingAssist,
          hasStairs: data.hasStairs ?? false,
        })
        estimatedPrice = pricing.total
      } catch (err) {
        console.error('[Booking] Distance calculation failed:', err)
      }
    }

    // Create pickup datetime
    const pickupDateTime = new Date(`${data.pickupDate}T${data.pickupTime}`)

    // Save ride to database
    const ride = await db.ride.create({
      data: {
        userId,
        rideType: data.rideType,
        recurringPattern: data.recurringPattern,
        passengerName: data.passengerName,
        passengerDob: new Date(data.passengerDob),
        passengerPhone: data.passengerPhone,
        passengerEmail: data.passengerEmail || null,
        emergencyContact: data.emergencyContact || null,
        pickupAddress: data.pickupAddress,
        pickupApt: data.pickupApt || null,
        pickupLocationType: data.pickupLocationType,
        pickupLat,
        pickupLng,
        pickupDateTime,
        dropoffAddress: data.dropoffAddress,
        dropoffFacilityName: data.dropoffFacilityName || null,
        dropoffAppointmentTime: data.dropoffAppointmentTime
          ? new Date(`${data.pickupDate}T${data.dropoffAppointmentTime}`)
          : null,
        dropoffDepartment: data.dropoffDepartment || null,
        dropoffLat,
        dropoffLng,
        transportType: data.transportType,
        needsDoorAssist: data.needsDoorAssist,
        needsBuildingAssist: data.needsBuildingAssist,
        hasCompanion: data.hasCompanion,
        wheelchairOwned: data.wheelchairOwned,
        wheelchairPowered: data.wheelchairPowered,
        hasStairs: data.hasStairs,
        payerType: data.payerType,
        payerDetails: data.payerDetails as Record<string, string>,
        estimatedMiles,
        estimatedDuration,
        estimatedPrice,
        specialInstructions: [
          data.preferredLanguage ? `[Preferred Language: ${data.preferredLanguage}]` : '',
          data.specialInstructions || '',
        ].filter(Boolean).join('\n') || null,
        gateCode: data.gateCode || null,
        mobilityNotes: data.mobilityNotes || null,
        status: 'NEW_REQUEST',
      },
    })

    // Send emails (non-blocking)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL

    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: `New Ride Request — ${data.passengerName}`,
        react: NewBookingAdminEmail({
          publicId: ride.publicId,
          passengerName: data.passengerName,
          passengerPhone: data.passengerPhone,
          pickupAddress: data.pickupAddress,
          dropoffAddress: data.dropoffAddress,
          pickupDateTime: pickupDateTime.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          transportType: data.transportType,
          rideType: data.rideType,
          payerType: data.payerType,
          estimatedPrice: estimatedPrice
            ? `$${estimatedPrice.toFixed(2)}`
            : 'N/A',
          adminUrl: `${siteUrl}/admin/rides/${ride.id}`,
        }),
      }).catch((err) => console.error('[Booking Admin Email Error]', err))
    }

    if (data.passengerEmail) {
      sendEmail({
        to: data.passengerEmail,
        subject: `Ride Request Received — ${SITE_NAME}`,
        react: BookingReceivedEmail({
          publicId: ride.publicId,
          passengerName: data.passengerName,
          pickupAddress: data.pickupAddress,
          dropoffAddress: data.dropoffAddress,
          pickupDateTime: pickupDateTime.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          transportType: data.transportType,
          rideType: data.rideType,
        }),
      }).catch((err) => console.error('[Booking Customer Email Error]', err))
    }

    return NextResponse.json(
      { publicId: ride.publicId, rideId: ride.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Booking Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
