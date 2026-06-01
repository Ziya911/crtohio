import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

type Props = {
  resetUrl: string
  userName?: string
}

export function PasswordResetEmail({ resetUrl, userName }: Props) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: '#f0f7ff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '40px 20px',
          }}
        >
          <Section
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '40px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Text
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#030712',
                marginBottom: '16px',
              }}
            >
              Reset Your Password
            </Text>
            <Text style={{ color: '#64748B', lineHeight: '1.6' }}>
              Hi{userName ? ` ${userName}` : ''}, we received a request to reset
              your password. Click the button below to set a new one.
            </Text>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: '#0A4D8C',
                color: '#ffffff',
                padding: '14px 32px',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '16px',
                marginBottom: '16px',
              }}
            >
              Reset Password
            </Button>
            <Text style={{ color: '#64748B', fontSize: '14px' }}>
              This link expires in 1 hour. If you didn&apos;t request this, you
              can safely ignore this email.
            </Text>
            <Hr style={{ borderColor: '#e2e8f0', marginTop: '24px' }} />
            <Text style={{ color: '#94a3b8', fontSize: '12px' }}>
              {SITE_NAME} — {SITE_TAGLINE}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
