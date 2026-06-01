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
  verificationUrl: string
  userName?: string
}

export function EmailVerificationEmail({ verificationUrl, userName }: Props) {
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
              Welcome to {SITE_NAME}
            </Text>
            <Text style={{ color: '#64748B', lineHeight: '1.6' }}>
              Hi{userName ? ` ${userName}` : ''}, thank you for creating your
              account. Please verify your email address by clicking the button
              below.
            </Text>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: '#2BB673',
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
              Verify Email Address
            </Button>
            <Text style={{ color: '#64748B', fontSize: '14px' }}>
              This link expires in 24 hours. If you didn&apos;t create an
              account with us, you can safely ignore this email.
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
