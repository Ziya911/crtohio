import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { sendEmail } from '@/lib/email/send'
import { ContactFormAdminEmail } from '@/lib/email/templates/ContactFormAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
    }

    const { name, email, phone, subject, message } = result.data

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Contact Form: ${subject} — from ${name}`,
        react: ContactFormAdminEmail({ name, email, phone, subject, message }),
      }).catch((err) => console.error('[Contact Email Error]', err))
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 })
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}
