import type React from 'react'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

type SendEmailOptions = {
  to: string
  subject: string
  react: React.ReactElement
}

type SendEmailResult =
  | { success: true; id: string }
  | { success: false; message: string }

export async function sendEmail({ to, subject, react }: SendEmailOptions): Promise<SendEmailResult> {
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  if (!resend) {
    console.error('[Email] RESEND_API_KEY is not configured')
    return { success: false, message: 'Email service is not configured (missing RESEND_API_KEY)' }
  }

  try {
    const { data, error } = await resend.emails.send({ from, to, subject, react })

    if (error) {
      const message =
        (error as { message?: string }).message ||
        JSON.stringify(error)
      console.error('[Email Error]', message)
      return { success: false, message }
    }

    console.log(`[Email] Sent to ${to}: ${data?.id}`)
    return { success: true, id: data!.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error'
    console.error('[Email Error]', message)
    return { success: false, message }
  }
}
