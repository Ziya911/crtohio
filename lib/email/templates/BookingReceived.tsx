import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'
import { SITE_NAME, BUSINESS_PHONE, SITE_TAGLINE } from '@/lib/constants'

type Props = {
  publicId: string
  passengerName: string
  pickupAddress: string
  dropoffAddress: string
  pickupDateTime: string
  transportType: string
  rideType: string
}

export function BookingReceivedEmail({
  publicId,
  passengerName,
  pickupAddress,
  dropoffAddress,
  pickupDateTime,
  transportType,
  rideType,
}: Props) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>Ride Request Received</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {passengerName},</Text>
            <Text style={paragraph}>
              Thank you for choosing {SITE_NAME}. We have received
              your ride request.
            </Text>

            <Section style={warningBox}>
              <Text style={warningText}>
                This is a ride REQUEST, not a confirmation. Our team will review
                your request and contact you shortly to confirm the details.
              </Text>
            </Section>

            <Text style={refLabel}>Your Reference ID</Text>
            <Text style={refId}>{publicId}</Text>

            <Hr style={divider} />

            <Text style={label}>Pickup</Text>
            <Text style={value}>{pickupAddress}</Text>
            <Text style={valueMuted}>{pickupDateTime}</Text>

            <Hr style={divider} />

            <Text style={label}>Drop-off</Text>
            <Text style={value}>{dropoffAddress}</Text>

            <Hr style={divider} />

            <Text style={label}>Transport Type</Text>
            <Text style={value}>
              {transportType === 'wheelchair' ? 'Wheelchair' : 'Ambulatory'}
            </Text>

            <Text style={label}>Ride Type</Text>
            <Text style={value}>
              {rideType === 'round_trip'
                ? 'Round Trip'
                : rideType === 'recurring'
                  ? 'Recurring'
                  : 'One Way'}
            </Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              If you have any questions, please contact us at{' '}
              <strong>{BUSINESS_PHONE}</strong> or reply to this email.
            </Text>
          </Section>

          <Section style={footerSection}>
            <Text style={footer}>
              {SITE_NAME} — {SITE_TAGLINE}
            </Text>
            <Text style={footerSmall}>
              For medical emergencies, call 911. We do not provide emergency
              ambulance services.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '580px',
  borderRadius: '8px',
  overflow: 'hidden' as const,
}

const header = {
  backgroundColor: '#0A4D8C',
  padding: '24px 32px',
}

const headerText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '700' as const,
  margin: '0',
}

const content = {
  padding: '24px 32px',
}

const greeting = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
}

const paragraph = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const warningBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fbbf24',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
}

const warningText = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '500' as const,
  margin: '0',
  lineHeight: '1.5',
}

const refLabel = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 4px',
}

const refId = {
  color: '#0A4D8C',
  fontSize: '20px',
  fontWeight: '700' as const,
  fontFamily: 'monospace',
  margin: '0 0 16px',
}

const label = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 4px',
}

const value = {
  color: '#1f2937',
  fontSize: '15px',
  fontWeight: '500' as const,
  margin: '0 0 4px',
}

const valueMuted = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const divider = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
}

const footerSection = {
  backgroundColor: '#f9fafb',
  padding: '16px 32px',
}

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0 0 4px',
}

const footerSmall = {
  color: '#dc3545',
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: '0',
}
