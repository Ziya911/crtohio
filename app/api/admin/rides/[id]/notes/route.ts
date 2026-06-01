import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const createNoteSchema = z.object({
  content: z.string().min(1, 'Note content is required').max(5000),
})

export async function POST(
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

  const parsed = createNoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const communication = await db.communication.create({
    data: {
      rideId: id,
      type: 'note',
      direction: 'internal',
      content: parsed.data.content,
      createdBy: session.user.name || session.user.email || 'Admin',
    },
  })

  return NextResponse.json({ communication }, { status: 201 })
}
