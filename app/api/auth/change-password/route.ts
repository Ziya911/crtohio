import { NextResponse } from 'next/server'
import { z } from 'zod'
import { compare, hash } from 'bcryptjs'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Must contain uppercase, lowercase, and a number'
    ),
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsed = changePasswordSchema.safeParse(body)

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      const firstMessage = Object.values(fieldErrors).flat()[0]
      return NextResponse.json(
        { error: firstMessage || 'Invalid input' },
        { status: 400 }
      )
    }

    const { currentPassword, newPassword } = parsed.data

    // Fetch user with password hash
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: 'Unable to change password for this account' },
        { status: 400 }
      )
    }

    // Verify current password
    const isCurrentValid = await compare(currentPassword, user.passwordHash)
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash and save new password
    const newHash = await hash(newPassword, 12)

    await db.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newHash },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
