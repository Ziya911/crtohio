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
  fullName: string
  email: string
  phone: string
  licenseStatus: string
  licenseNumber: string
  yearsExperience: string
  cleanDrivingRecord: string
  hasCprCert: string
  wheelchairExperience: string
  hasOwnCar: string
  carMake?: string
  carModel?: string
  availability: string[]
  previousTransportExperience?: string
}

export function DriverApplicationAdminEmail(props: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f0f7ff', fontFamily: 'Arial, sans-serif', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#0A4D8C', marginBottom: '4px' }}>
            New Driver Application
          </Text>
          <Text style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
            Someone submitted a driver application on {SITE_URL.replace(/^https?:\/\//, '')}
          </Text>
          <Hr style={{ borderColor: '#E2E8F0', marginBottom: '24px' }} />

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Applicant</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600', marginTop: '0' }}>{props.fullName}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Email</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{props.email}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Phone</Text>
            <Text style={{ fontSize: '16px', color: '#0F172A', marginTop: '0' }}>{props.phone}</Text>
          </Section>

          <Hr style={{ borderColor: '#E2E8F0', marginBottom: '16px' }} />

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>License Status</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0', textTransform: 'capitalize' }}>{props.licenseStatus}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>License Number</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0' }}>{props.licenseNumber}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Years of Experience</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0' }}>{props.yearsExperience}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Clean Driving Record</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0', textTransform: 'capitalize' }}>{props.cleanDrivingRecord}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>CPR / First Aid Certified</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0', textTransform: 'capitalize' }}>{props.hasCprCert}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Wheelchair Assistance Experience</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0', textTransform: 'capitalize' }}>{props.wheelchairExperience}</Text>
          </Section>

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Has Own Car</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0', textTransform: 'capitalize' }}>{props.hasOwnCar}</Text>
          </Section>

          {props.hasOwnCar === 'yes' && props.carMake && props.carModel && (
            <Section style={{ marginBottom: '16px' }}>
              <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Vehicle</Text>
              <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0' }}>{props.carMake} {props.carModel}</Text>
            </Section>
          )}

          <Section style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Availability</Text>
            <Text style={{ fontSize: '14px', color: '#0F172A', marginTop: '0' }}>{props.availability.join(', ')}</Text>
          </Section>

          {props.previousTransportExperience && (
            <Section style={{ marginBottom: '16px' }}>
              <Text style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>Previous Experience</Text>
              <Text style={{ fontSize: '14px', color: '#0F172A', lineHeight: '1.6', marginTop: '4px', whiteSpace: 'pre-wrap' }}>
                {props.previousTransportExperience}
              </Text>
            </Section>
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
