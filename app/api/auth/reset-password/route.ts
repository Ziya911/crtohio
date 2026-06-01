import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { resetPasswordSchema } from '@/lib/validations/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = resetPasswordSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const { token, password } = result.data

    // Find the verification token that has not expired
    const tokenRecord = await db.verificationToken.findFirst({
      where: {
        token,
        expires: { gt: new Date() },
      },
    })

    if (!tokenRecord) {
      return NextResponse.json(
        {
          message:
            'This reset link is invalid or has expired. Please request a new one.',
        },
        { status: 400 }
      )
    }

    // Find the user by the identifier (email) stored in the token
    const user = await db.user.findUnique({
      where: { email: tokenRecord.identifier },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User account not found.' },
        { status: 400 }
      )
    }

    // Hash the new password and update the user
    const passwordHash = await bcrypt.hash(password, 12)

    await db.user.update({
      where: { id: user.id },
      data: { passwordHash },
    })

    // Delete the used verification token
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: tokenRecord.identifier,
          token: tokenRecord.token,
        },
      },
    })

    return NextResponse.json(
      {
        message:
          'Your password has been reset successfully. You can now log in with your new password.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Reset Password Error]', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
