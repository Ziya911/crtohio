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

const STATUS_LABELS: Record<string, { label: string; color: string; bgColor: string }> = {
  CONFIRMED: { label: 'Confirmed', color: '#166534', bgColor: '#dcfce7' },
  DECLINED: { label: 'Declined', color: '#991b1b', bgColor: '#fee2e2' },
  CANCELLED: { label: 'Cancelled', color: '#9a3412', bgColor: '#ffedd5' },
  IN_PROGRESS: { label: 'In Progress', color: '#6b21a8', bgColor: '#f3e8ff' },
  COMPLETED: { label: 'Completed', color: '#374151', bgColor: '#f3f4f6' },
  UNDER_REVIEW: { label: 'Under Review', color: '#854d0e', bgColor: '#fef9c3' },
  NO_SHOW: { label: 'No Show', color: '#9f1239', bgColor: '#ffe4e6' },
}

type Props = {
  publicId: string
  passengerName: string
  pickupAddress: string
  dropoffAddress: string
  pickupDateTime: string
  newStatus: string
  declineReason?: string
  finalPrice?: string
}

export function RideStatusUpdateEmail({
  publicId,
  passengerName,
  pickupAddress,
  dropoffAddress,
  pickupDateTime,
  newStatus,
  declineReason,
  finalPrice,
}: Props) {
  const statusInfo = STATUS_LABELS[newStatus] || {
    label: newStatus.replace(/_/g, ' '),
    color: '#374151',
    bgColor: '#f3f4f6',
  }

  const isConfirmed = newStatus === 'CONFIRMED'
  const isDeclined = newStatus === 'DECLINED'
  const isCancelled = newStatus === 'CANCELLED'

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>Ride Status Update</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {passengerName},</Text>

            <Text style={paragraph}>
              Your ride request has been updated. Here&apos;s the latest status:
            </Text>

            <Section
              style={{
                ...statusBox,
                backgroundColor: statusInfo.bgColor,
                borderColor: statusInfo.color,
              }}
            >
              <Text
                style={{
                  ...statusText,
                  color: statusInfo.color,
                }}
              >
                Status: {statusInfo.label}
              </Text>
            </Section>

            {isConfirmed && (
              <Section style={successBox}>
                <Text style={successText}>
                  Your ride has been confirmed! Our team will ensure a driver
                  is ready for your scheduled pickup.
                </Text>
              </Section>
            )}

            {isDeclined && (
              <Section style={warningBox}>
                <Text style={warningText}>
                  Unfortunately, we are unable to accommodate this ride request.
                  {declineReason && (
                    <> Reason: {declineReason}</>
                  )}
                </Text>
              </Section>
            )}

            {isCancelled && (
              <Section style={warningBox}>
                <Text style={warningText}>
                  This ride has been cancelled. If you did not request this
                  cancellation, please contact us immediately.
                </Text>
              </Section>
            )}

            <Text style={refLabel}>Reference ID</Text>
            <Text style={refId}>{publicId}</Text>

            <Hr style={divider} />

            <Text style={label}>Pickup</Text>
            <Text style={value}>{pickupAddress}</Text>
            <Text style={valueMuted}>{pickupDateTime}</Text>

            <Hr style={divider} />

            <Text style={label}>Drop-off</Text>
            <Text style={value}>{dropoffAddress}</Text>

            {finalPrice && (
              <>
                <Hr style={divider} />
                <Text style={label}>Confirmed Price</Text>
                <Text style={{
                  color: '#0A4D8C',
                  fontSize: '24px',
                  fontWeight: '700' as const,
                  margin: '0 0 4px',
                }}>${finalPrice}</Text>
              </>
            )}

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

const statusBox = {
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  borderWidth: '1px',
  borderStyle: 'solid' as const,
}

const statusText = {
  fontSize: '16px',
  fontWeight: '700' as const,
  margin: '0',
  textAlign: 'center' as const,
}

const successBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '8px',
  padding: '16px',
  margin: '0 0 16px',
}

const successText = {
  color: '#166534',
  fontSize: '14px',
  fontWeight: '500' as const,
  margin: '0',
  lineHeight: '1.5',
}

const warningBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fbbf24',
  borderRadius: '8px',
  padding: '16px',
  margin: '0 0 16px',
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
