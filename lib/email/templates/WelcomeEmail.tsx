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
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_PHONE_RAW, SITE_TAGLINE } from '@/lib/constants'

type Props = {
  userName: string
  loginUrl: string
}

export function WelcomeEmail({ userName, loginUrl }: Props) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerText}>{SITE_NAME}</Text>
          </Section>
          <Hr style={hr} />

          {/* Content */}
          <Section style={content}>
            <Text style={heading}>Welcome, {userName}!</Text>
            <Text style={paragraph}>
              Your account has been created and your email is verified. You can
              now log in to book and track your medical transportation rides.
            </Text>

            <Section style={featureList}>
              <Text style={featureItem}>✓ Book rides online, anytime</Text>
              <Text style={featureItem}>✓ Track your ride status in real time</Text>
              <Text style={featureItem}>✓ View your full ride history</Text>
              <Text style={featureItem}>✓ Manage your profile and preferences</Text>
            </Section>

            <Button href={loginUrl} style={button}>
              Go to My Account
            </Button>

            <Text style={small}>
              If you did not create this account, please contact us immediately
              at{' '}
              <a href={`tel:${BUSINESS_PHONE_RAW}`} style={link}>
                {BUSINESS_PHONE}
              </a>
              .
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              {SITE_NAME} | {SITE_TAGLINE}
            </Text>
            <Text style={footerText}>
              For medical emergencies, call 911. We do not provide emergency
              ambulance services.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main: React.CSSProperties = {
  backgroundColor: '#f0f7ff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container: React.CSSProperties = {
  maxWidth: '480px',
  margin: '40px auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}

const header: React.CSSProperties = {
  backgroundColor: '#0A4D8C',
  padding: '24px 32px',
}

const headerText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 700,
  margin: 0,
}

const hr: React.CSSProperties = {
  borderColor: '#e2e8f0',
  margin: 0,
}

const content: React.CSSProperties = {
  padding: '32px',
}

const heading: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#030712',
  margin: '0 0 16px',
}

const paragraph: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 20px',
}

const featureList: React.CSSProperties = {
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  padding: '16px 20px',
  marginBottom: '24px',
}

const featureItem: React.CSSProperties = {
  fontSize: '14px',
  color: '#0A4D8C',
  margin: '0 0 8px',
  fontWeight: 500,
}

const button: React.CSSProperties = {
  backgroundColor: '#2BB673',
  color: '#ffffff',
  padding: '12px 28px',
  borderRadius: '8px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '20px',
  fontSize: '15px',
}

const small: React.CSSProperties = {
  fontSize: '12px',
  color: '#6B7280',
  lineHeight: '20px',
  margin: '16px 0 0',
}

const link: React.CSSProperties = {
  color: '#0A4D8C',
}

const footer: React.CSSProperties = {
  padding: '24px 32px',
  backgroundColor: '#f8fafc',
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  margin: '0 0 4px',
  textAlign: 'center' as const,
}
