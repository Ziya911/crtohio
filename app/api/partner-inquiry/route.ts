import { NextResponse } from 'next/server'
import { partnerInquirySchema } from '@/lib/validations/partner-inquiry'
import { sendEmail } from '@/lib/email/send'
import { PartnerInquiryAdminEmail } from '@/lib/email/templates/PartnerInquiryAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = partnerInquirySchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 })
    }

    const data = result.data

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Partnership Inquiry: ${data.organizationName} (${data.organizationType})`,
        react: PartnerInquiryAdminEmail(data),
      }).catch((err) => console.error('[Partner Inquiry Email Error]', err))
    }

    return NextResponse.json({ message: 'Inquiry submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('[Partner Inquiry Error]', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}
