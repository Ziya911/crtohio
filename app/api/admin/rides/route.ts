import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import type { Prisma } from '@prisma/client'
import { RIDE_STATUSES, type RideStatus } from '@/lib/ride-status'

const VALID_STATUSES = RIDE_STATUSES

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const statusFilter = searchParams.get('status') as RideStatus | null
  const searchQuery = searchParams.get('q')
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10))

  const where: Prisma.RideWhereInput = {}

  if (statusFilter && VALID_STATUSES.includes(statusFilter)) {
    where.status = statusFilter
  }

  if (searchQuery) {
    where.OR = [
      { passengerName: { contains: searchQuery, mode: 'insensitive' } },
      { passengerEmail: { contains: searchQuery, mode: 'insensitive' } },
      { pickupAddress: { contains: searchQuery, mode: 'insensitive' } },
      { dropoffAddress: { contains: searchQuery, mode: 'insensitive' } },
      { publicId: { contains: searchQuery, mode: 'insensitive' } },
    ]
  }

  const [rides, total] = await Promise.all([
    db.ride.findMany({
      where,
      orderBy: { pickupDateTime: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { communications: true },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.ride.count({ where }),
  ])

  return NextResponse.json({
    rides,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
