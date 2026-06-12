import Link from 'next/link'
import Image from 'next/image'
import {
  Stethoscope,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  CalendarCheck,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'medical-appointments')!

export const metadata = generatePageMetadata({
  title: `Medical Appointment Transportation | ${SITE_NAME}`,
  description:
    'On-time transportation to doctor visits, specialist appointments, lab work, and medical procedures. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/medical-appointments',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['ambulatory', 'hospital-discharge', 'recurring'].includes(s.slug)
)

const IMAGE_MAP: Record<string, string> = {
  ambulatory: '/images/crtohio-ambulance.jpg',
  wheelchair: '/images/wheelchair-care.jpg',
  dialysis: '/images/service-dialysis.jpg',
  'medical-appointments': '/images/doctor-patient.jpg',
  'hospital-discharge': '/images/hospital.jpg',
  facility: '/images/about-team.jpg',
  'private-pay': '/images/private-pay.jpeg',
  recurring: '/images/recurring-rides.jpg',
}

export default function MedicalAppointmentsServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'On-time non-emergency medical transportation to doctor visits, specialist appointments, lab work, imaging, and medical procedures across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Medical Appointments', href: '/services/medical-appointments' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-muted border-b border-border">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
            </li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <span className="text-foreground font-medium">Medical Appointments</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — Reversed Split Layout (Image Left, Text Right) */}
      <section className="bg-gradient-to-br from-white to-muted section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Image */}
            <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="/images/doctor-patient.jpg"
                alt="Doctor consulting with patient at medical appointment"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Right: Text */}
            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
                <Stethoscope className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                Medical Appointment Transportation
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-6">
                On-time, reliable transportation to doctor visits, specialist appointments, lab work,
                imaging, and medical procedures. We make sure you get to every appointment safely and
                without stress.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  On-Time Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  All Appointment Types
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Round Trip Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Medical Appointment Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-6">
              What Is Medical Appointment Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Medical appointment transportation covers all types of scheduled healthcare visits,
                from routine check-ups and follow-up appointments to specialist consultations,
                diagnostic imaging, lab work, and outpatient procedures. This is the broadest
                category of non-emergency medical transportation and the one most frequently needed
                by patients across the Cincinnati metro area.
              </p>
              <p>
                Missing a medical appointment is more than an inconvenience. It can mean delayed
                diagnoses, interrupted treatment plans, and worsening health conditions. Studies show
                that patients who miss appointments due to transportation barriers experience
                significantly worse health outcomes. {SITE_NAME} exists to eliminate
                that barrier, providing dependable rides that ensure you keep every appointment on
                your calendar.
              </p>
              <p>
                Whether you need a ride to your primary care physician, a specialist across town, an
                imaging center for an MRI, or a surgical center for an outpatient procedure, our
                drivers get you there on time and bring you safely home afterward. For appointments
                involving sedation or anesthesia, we recommend booking a round trip so your return
                ride is already arranged when you are ready to leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Appointments We Serve */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Types of Appointments We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Primary care physician visits and annual physicals',
              'Specialist consultations (cardiology, oncology, orthopedics, etc.)',
              'Lab work and blood draws',
              'Diagnostic imaging (X-rays, MRIs, CT scans, ultrasounds)',
              'Physical therapy and rehabilitation sessions',
              'Mental health and counseling appointments',
              'Dental appointments and oral surgery',
              'Eye exams and ophthalmology visits',
              'Pre-surgical consultations and pre-op testing',
              'Outpatient surgical procedures',
              'Follow-up visits after hospitalization',
              'Chronic disease management check-ups',
            ].map((item) => (
              <div key={item} className="bg-white rounded-xl p-4 border border-border/60 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Schedule Your Ride',
                text: 'Tell us when and where your appointment is. We recommend booking at least 24 hours ahead for the best availability.',
              },
              {
                step: '2',
                title: 'Timely Pickup',
                text: 'Your driver arrives with plenty of time to spare, accounting for traffic, parking, and walking distance to your doctor\'s office.',
              },
              {
                step: '3',
                title: 'Door-to-Door Service',
                text: 'We take you directly to the facility entrance. Need help navigating a large medical campus? Your driver can assist with wayfinding.',
              },
              {
                step: '4',
                title: 'Return Trip Ready',
                text: 'For round trips, we coordinate your pickup with your appointment end time. Just let us know when you are ready and we will be there.',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%_-_12px)] w-[calc(100%_-_24px)] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 z-0" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-primary/20 relative z-10">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Why Choose {SITE_NAME} for Medical Appointments?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: 'Never Miss an Appointment',
                text: 'We build in buffer time for every ride so you arrive relaxed and on schedule, not rushing through the door at the last minute.',
              },
              {
                icon: MapPin,
                title: 'We Know the Area',
                text: 'Our drivers are familiar with hospitals, clinics, and medical centers across Cincinnati, Mason, West Chester, Hamilton, and surrounding areas.',
              },
              {
                icon: Shield,
                title: 'Safe Post-Procedure Transport',
                text: 'After procedures involving sedation or anesthesia, you should not drive. We provide safe transportation home so you can focus on recovery.',
              },
              {
                icon: CalendarCheck,
                title: 'One-Time or Recurring',
                text: 'Whether you need a single ride or regular weekly transport, we accommodate both one-time and recurring appointment schedules.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-6 shadow-[var(--shadow-card)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary-sky/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RELATED_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-border rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={IMAGE_MAP[service.slug] || '/images/medical-care.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-padding overflow-hidden">
        <Image
          src="/images/hero-ambulance.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712]/90 via-primary/85 to-primary-dark/90" />
        <div className="relative z-10 container-custom text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Book Your Medical Appointment Ride
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Do not let transportation be the reason you miss an important medical appointment.
            Book your ride today and arrive on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-lg"
            >
              Book a Ride Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
              className="inline-flex items-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/30"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Disclaimer */}
      <div className="bg-emergency-light py-3">
        <div className="container-custom text-center">
          <p className="text-sm text-emergency font-medium">{EMERGENCY_DISCLAIMER}</p>
        </div>
      </div>
    </>
  )
}
