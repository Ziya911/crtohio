import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { sendEmail } from '@/lib/email/send'
import { OtpVerificationEmail } from '@/lib/email/templates/OtpVerification'
import { SITE_NAME } from '@/lib/constants'

const schema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  name: z.string().optional(),
})

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { email, name } = result.data

    // Check if email already registered
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Delete any previous OTP for this email
    await db.verificationToken.deleteMany({
      where: { identifier: `otp:${email}` },
    })

    // Generate and store OTP (10 minutes expiry)
    const otp = generateOtp()
    const expires = new Date(Date.now() + 10 * 60 * 1000)

    await db.verificationToken.create({
      data: { identifier: `otp:${email}`, token: otp, expires },
    })

    // Send OTP email
    const emailResult = await sendEmail({
      to: email,
      subject: `Your Verification Code — ${SITE_NAME}`,
      react: OtpVerificationEmail({ otp, userName: name }),
    })

    if (!emailResult.success) {
      // Clean up the stored OTP since delivery failed
      await db.verificationToken.deleteMany({
        where: { identifier: `otp:${email}` },
      })

      return NextResponse.json(
        { error: emailResult.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Verification code sent. Check your inbox.' })
  } catch (error) {
    console.error('[Send OTP Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
