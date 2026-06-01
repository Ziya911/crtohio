import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

type OtpVerificationEmailProps = {
  otp: string
  userName?: string
}

export function OtpVerificationEmail({
  otp,
  userName,
}: OtpVerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logoText}>{SITE_NAME}</Text>
          </Section>
          <Hr style={hr} />
          <Section style={contentSection}>
            <Text style={heading}>Verify Your Email</Text>
            <Text style={paragraph}>
              Hi{userName ? ` ${userName}` : ''},
            </Text>
            <Text style={paragraph}>
              Use the verification code below to complete your account
              registration. This code will expire in 10 minutes.
            </Text>
            <Section style={otpSection}>
              <Text style={otpCode}>{otp}</Text>
            </Section>
            <Text style={paragraph}>
              If you did not request this code, you can safely ignore this
              email.
            </Text>
          </Section>
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
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container: React.CSSProperties = {
  maxWidth: '480px',
  margin: '40px auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}

const logoSection: React.CSSProperties = {
  backgroundColor: '#0A4D8C',
  padding: '24px 32px',
}

const logoText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 700,
  margin: 0,
}

const hr: React.CSSProperties = {
  borderColor: '#e2e8f0',
  margin: 0,
}

const contentSection: React.CSSProperties = {
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
  margin: '0 0 16px',
}

const otpSection: React.CSSProperties = {
  textAlign: 'center' as const,
  padding: '16px 0',
  margin: '8px 0 24px',
}

const otpCode: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: 700,
  letterSpacing: '8px',
  color: '#0A4D8C',
  backgroundColor: '#f0f7ff',
  padding: '16px 24px',
  borderRadius: '8px',
  display: 'inline-block',
  margin: 0,
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
