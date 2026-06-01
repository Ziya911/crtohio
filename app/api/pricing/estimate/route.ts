import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getDistanceMatrix } from '@/lib/maps'
import { calculatePrice, isAfterHours } from '@/lib/pricing'

const estimateSchema = z.object({
  pickupLat: z.number(),
  pickupLng: z.number(),
  dropoffLat: z.number(),
  dropoffLng: z.number(),
  transportType: z.enum(['ambulatory', 'wheelchair']),
  isRoundTrip: z.boolean(),
  needsBuildingAssist: z.boolean().default(false),
  hasStairs: z.boolean().default(false),
  pickupDateTime: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = estimateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    let distance: { miles: number; durationMinutes: number }
    let isApproximate = false

    // Try Distance Matrix API first, fall back to straight-line calculation
    try {
      distance = await getDistanceMatrix(
        { lat: data.pickupLat, lng: data.pickupLng },
        { lat: data.dropoffLat, lng: data.dropoffLng }
      )
    } catch {
      // Fallback: Haversine straight-line distance * 1.3 road factor
      const R = 3958.8 // Earth radius in miles
      const dLat = ((data.dropoffLat - data.pickupLat) * Math.PI) / 180
      const dLng = ((data.dropoffLng - data.pickupLng) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((data.pickupLat * Math.PI) / 180) *
          Math.cos((data.dropoffLat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const straightLine = R * c
      const roadMiles = Math.round(straightLine * 1.3 * 10) / 10
      distance = {
        miles: roadMiles,
        durationMinutes: Math.round(roadMiles * 2), // ~30mph avg
      }
      isApproximate = true
    }

    // Determine if after hours
    const pickupDate = data.pickupDateTime
      ? new Date(data.pickupDateTime)
      : new Date()
    const afterHours = isAfterHours(pickupDate)

    // Calculate price
    const pricing = calculatePrice({
      miles: distance.miles,
      transportType: data.transportType,
      isRoundTrip: data.isRoundTrip,
      isAfterHours: afterHours,
      needsBuildingAssist: data.needsBuildingAssist,
      hasStairs: data.hasStairs,
    })

    if (isApproximate) {
      pricing.disclaimers.unshift(
        'Distance is approximate (based on straight-line calculation). Actual route distance may vary.'
      )
    }

    return NextResponse.json({
      distance: {
        miles: distance.miles,
        durationMinutes: distance.durationMinutes,
      },
      pricing,
      isApproximate,
    })
  } catch (error) {
    console.error('[Pricing Estimate Error]', error)
    const message =
      error instanceof Error ? error.message : 'Failed to calculate estimate'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
