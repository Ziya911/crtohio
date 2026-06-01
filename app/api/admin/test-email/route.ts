import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sendEmail } from '@/lib/email/send'
import { WelcomeEmail } from '@/lib/email/templates/WelcomeEmail'
import { SITE_NAME } from '@/lib/constants'

export async function POST() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const toEmail = session.user.email!
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const result = await sendEmail({
    to: toEmail,
    subject: `Test Email — ${SITE_NAME}`,
    react: WelcomeEmail({
      userName: session.user.name || 'Admin',
      loginUrl: `${siteUrl}/admin`,
    }),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 500 })
  }

  return NextResponse.json({
    message: `Test email sent to ${toEmail}. Check your inbox (and spam folder).`,
  })
}
