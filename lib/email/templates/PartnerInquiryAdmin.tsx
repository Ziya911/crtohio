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
  organizationName: string
  contactName: string
  email: string
  phone: string
  organizationType: string
  message?: string
}

export function PartnerInquiryAdminEmail({ organizationName, contactName, email, phone, organizationType, message }: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f7ff', fontFamily: 'Arial, sans-serif', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#0A4D8C', marginBottom: '4px' }}>
            New Partnership Inquiry
          </Text>
          <Text style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
            A healthcare facility submitted a partnership inquiry on {SITE_URL.replace(/^https?:\/\//, '')}
          </Text>
          <Hr style={{ borderColor: '#E2E8F0', marginBottom: '24px' }} />

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Organization</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600', marginTop: '0' }}>{organizationName}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Organization Type</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{organizationType}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Contact Person</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600', marginTop: '0' }}>{contactName}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Email</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{email}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Phone</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{phone}</Text>
          </Section>

          {message && (
            <>
              <Hr style={{ borderColor: '#E2E8F0', marginBottom: '16px' }} />
              <Section style={{ marginBottom: '16px' }}>
                <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Message</Text>
                <Text style={{ fontSize: '14px', color: '#0F172A', lineHeight: '1.6', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{message}</Text>
              </Section>
            </>
          )}

          <Hr style={{ borderColor: '#E2E8F0', marginTop: '24px', marginBottom: '16px' }} />
          <Text style={{ fontSize: '12px', color: '#94a3b8' }}>
            {SITE_NAME} — {SITE_URL.replace(/^https?:\/\//, '')}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
