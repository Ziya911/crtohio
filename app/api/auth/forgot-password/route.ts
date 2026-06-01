import crypto from 'crypto'

import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { sendEmail } from '@/lib/email/send'
import { PasswordResetEmail } from '@/lib/email/templates/PasswordReset'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { SITE_NAME } from '@/lib/constants'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = forgotPasswordSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Always return success to prevent email enumeration
    const successResponse = NextResponse.json(
      {
        message:
          'If an account with that email exists, we have sent a password reset link.',
      },
      { status: 200 }
    )

    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return successResponse
    }

    // Delete any existing reset tokens for this email
    await db.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Generate a secure token
    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const resetUrl = `${siteUrl}/reset-password?token=${token}`

    await sendEmail({
      to: email,
      subject: `Reset Your Password — ${SITE_NAME}`,
      react: PasswordResetEmail({ resetUrl, userName: user.name ?? undefined }),
    })

    return successResponse
  } catch (error) {
    console.error('[Forgot Password Error]', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
