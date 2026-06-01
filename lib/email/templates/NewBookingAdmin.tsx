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
import { SITE_NAME } from '@/lib/constants'

type Props = {
  publicId: string
  passengerName: string
  passengerPhone: string
  pickupAddress: string
  dropoffAddress: string
  pickupDateTime: string
  transportType: string
  rideType: string
  payerType: string
  estimatedPrice: string
  adminUrl: string
}

export function NewBookingAdminEmail({
  publicId,
  passengerName,
  passengerPhone,
  pickupAddress,
  dropoffAddress,
  pickupDateTime,
  transportType,
  rideType,
  payerType,
  estimatedPrice,
  adminUrl,
}: Props) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>New Ride Request</Text>
          </Section>

          <Section style={content}>
            <Text style={label}>Reference ID</Text>
            <Text style={value}>{publicId}</Text>

            <Hr style={divider} />

            <Text style={label}>Passenger</Text>
            <Text style={value}>
              {passengerName} — {passengerPhone}
            </Text>

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

            <Hr style={divider} />

            <Text style={label}>Ride Type</Text>
            <Text style={value}>
              {rideType === 'round_trip'
                ? 'Round Trip'
                : rideType === 'recurring'
                  ? 'Recurring'
                  : 'One Way'}
            </Text>

            <Hr style={divider} />

            <Text style={label}>Payer</Text>
            <Text style={value}>
              {payerType === 'medicaid'
                ? 'Medicaid'
                : payerType === 'insurance'
                  ? 'Insurance'
                  : payerType === 'facility'
                    ? 'Facility'
                    : 'Private Pay'}
            </Text>

            <Hr style={divider} />

            <Text style={label}>Estimated Price</Text>
            <Text style={value}>{estimatedPrice}</Text>
          </Section>

          <Section style={{ textAlign: 'center' as const, padding: '24px 0' }}>
            <Button style={button} href={adminUrl}>
              View in Admin Panel
            </Button>
          </Section>

          <Text style={footer}>
            {SITE_NAME} — Admin Notification
          </Text>
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

const button = {
  backgroundColor: '#0A4D8C',
  color: '#ffffff',
  borderRadius: '8px',
  fontWeight: '600' as const,
  fontSize: '14px',
  padding: '12px 24px',
  textDecoration: 'none' as const,
}

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  textAlign: 'center' as const,
  padding: '0 32px 24px',
}
