import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'
import type { PrismaClient } from '@prisma/client'
import { RIDE_STATUSES, type RideStatus } from '@/lib/ride-status'
import { sendEmail } from '@/lib/email/send'
import { RideStatusUpdateEmail } from '@/lib/email/templates/RideStatusUpdate'
import { SITE_NAME } from '@/lib/constants'

const VALID_STATUSES = RIDE_STATUSES

const updateRideSchema = z.object({
  status: z.enum(RIDE_STATUSES).optional(),
  dispatchNotes: z.string().nullable().optional(),
  declineReason: z.string().nullable().optional(),
  finalPrice: z.number().min(0).nullable().optional(),
})

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const ride = await db.ride.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      communications: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!ride) {
    return NextResponse.json({ error: 'Ride not found' }, { status: 404 })
  }

  return NextResponse.json({ ride })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const ride = await db.ride.findUnique({ where: { id } })
  if (!ride) {
    return NextResponse.json({ error: 'Ride not found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = updateRideSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data
  const now = new Date()

  // Build the update payload
  const updateData: Record<string, unknown> = {}

  if (data.dispatchNotes !== undefined) {
    updateData.dispatchNotes = data.dispatchNotes
  }

  if (data.declineReason !== undefined) {
    updateData.declineReason = data.declineReason
  }

  if (data.finalPrice !== undefined) {
    updateData.finalPrice = data.finalPrice
  }

  // Handle status change with auto-timestamps
  const statusChanged = data.status && data.status !== ride.status
  if (data.status) {
    updateData.status = data.status

    if (statusChanged) {
      updateData.reviewedBy = session.user.id

      switch (data.status) {
        case 'UNDER_REVIEW':
          updateData.reviewedAt = now
          break
        case 'CONFIRMED':
          updateData.confirmedAt = now
          if (!ride.reviewedAt) {
            updateData.reviewedAt = now
          }
          break
        case 'COMPLETED':
          updateData.completedAt = now
          // Auto-set finalPrice from estimatedPrice if not provided
          if (
            (data.finalPrice === undefined || data.finalPrice === null || data.finalPrice === 0) &&
            !ride.finalPrice &&
            ride.estimatedPrice
          ) {
            updateData.finalPrice = ride.estimatedPrice
          }
          break
        case 'CANCELLED':
          updateData.cancelledAt = now
          break
        case 'DECLINED':
          updateData.reviewedAt = now
          break
      }
    }
  }

  // Perform the update and create a status change communication in a transaction
  const updatedRide = await db.$transaction(async (tx: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => {
    const updated = await tx.ride.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        communications: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    // Auto-log status change as a communication entry
    if (statusChanged && data.status) {
      const oldStatusLabel = ride.status.replace(/_/g, ' ').toLowerCase()
      const newStatusLabel = data.status.replace(/_/g, ' ').toLowerCase()

      await tx.communication.create({
        data: {
          rideId: id,
          type: 'status_change',
          direction: 'internal',
          content: `Status changed from "${oldStatusLabel}" to "${newStatusLabel}"`,
          createdBy: session.user.name || session.user.email || 'Admin',
        },
      })
    }

    return updated
  })

  // Send email notification to the passenger on status change
  if (statusChanged && data.status) {
    const recipientEmail = updatedRide.passengerEmail || updatedRide.user?.email
    if (recipientEmail) {
      const pickupDt = updatedRide.pickupDateTime
        ? new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }).format(new Date(updatedRide.pickupDateTime))
        : 'TBD'

      const statusLabels: Record<string, string> = {
        CONFIRMED: 'Ride Confirmed',
        DECLINED: 'Ride Declined',
        CANCELLED: 'Ride Cancelled',
        IN_PROGRESS: 'Ride In Progress',
        COMPLETED: 'Ride Completed',
        UNDER_REVIEW: 'Ride Under Review',
        NO_SHOW: 'Ride Marked No Show',
      }
      const subject = `${SITE_NAME} — ${statusLabels[data.status] || 'Status Update'} (${updatedRide.publicId})`

      await sendEmail({
        to: recipientEmail,
        subject,
        react: RideStatusUpdateEmail({
          publicId: updatedRide.publicId,
          passengerName: updatedRide.passengerName,
          pickupAddress: updatedRide.pickupAddress,
          dropoffAddress: updatedRide.dropoffAddress,
          pickupDateTime: pickupDt,
          newStatus: data.status,
          declineReason: data.declineReason || updatedRide.declineReason || undefined,
          finalPrice: (() => {
            const fp = updatedRide.finalPrice || updatedRide.estimatedPrice
            if (!fp) return undefined
            const num = typeof fp === 'object' && 'toNumber' in (fp as object)
              ? (fp as { toNumber(): number }).toNumber()
              : Number(fp)
            return num > 0 ? num.toFixed(2) : undefined
          })(),
        }),
      }).catch((err) => {
        console.error('[Status Email Error]', err)
      })
    }
  }

  return NextResponse.json({ ride: updatedRide })
}
