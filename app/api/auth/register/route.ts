import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { sendEmail } from '@/lib/email/send'
import { WelcomeEmail } from '@/lib/email/templates/WelcomeEmail'
import { registerSchema } from '@/lib/validations/auth'
import { SITE_NAME } from '@/lib/constants'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = registerSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const { name, email, password, phone } = result.data
    const otp = body.otp as string | undefined

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { error: 'Verification code is required' },
        { status: 400 }
      )
    }

    // Verify OTP
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: `otp:${email}`,
        token: otp,
        expires: { gt: new Date() },
      },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Create user with email verified
    await db.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone: phone || null,
        emailVerified: new Date(),
      },
    })

    // Clean up used OTP
    await db.verificationToken.deleteMany({
      where: { identifier: `otp:${email}` },
    })

    // Send welcome email (non-blocking — don't fail registration if this fails)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    sendEmail({
      to: email,
      subject: `Welcome to ${SITE_NAME}!`,
      react: WelcomeEmail({ userName: name, loginUrl: `${siteUrl}/login` }),
    }).catch((err) => console.error('[Welcome Email Error]', err))

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Register Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
