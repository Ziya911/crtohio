import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

type Props = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function ContactFormAdminEmail({ name, email, phone, subject, message }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f7ff', fontFamily: 'Arial, sans-serif', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#0A4D8C', marginBottom: '4px' }}>
            New Contact Form Submission
          </Text>
          <Text style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
            Someone submitted the contact form on {SITE_URL.replace(/^https?:\/\//, '')}
          </Text>
          <Hr style={{ borderColor: '#E2E8F0', marginBottom: '24px' }} />

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Name</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600', marginTop: '0' }}>{name}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Email</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{email}</Text>
          </Section>

          {phone && (
            <Section style={{ marginBottom: '16px' }}>
              <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Phone</Text>
              <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{phone}</Text>
            </Section>
          )}

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Subject</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600', marginTop: '0' }}>{subject}</Text>
          </Section>

          <Hr style={{ borderColor: '#E2E8F0', marginBottom: '16px' }} />

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Message</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', lineHeight: '1.6', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{message}</Text>
          </Section>

          <Hr style={{ borderColor: '#E2E8F0', marginTop: '24px', marginBottom: '16px' }} />
          <Text style={{ fontSize: '12px', color: '#94a3b8' }}>
            {SITE_NAME} — {SITE_URL.replace(/^https?:\/\//, '')}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
