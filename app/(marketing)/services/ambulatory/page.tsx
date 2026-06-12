import Link from 'next/link'
import Image from 'next/image'
import {
  PersonStanding,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Users,
  Clock,
  Shield,
  HeartHandshake,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'ambulatory')!

export const metadata = generatePageMetadata({
  title: `Ambulatory Transportation Services | ${SITE_NAME}`,
  description:
    'Safe, door-to-door ambulatory medical transportation for patients who can walk independently or with minimal assistance. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/ambulatory',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['wheelchair', 'medical-appointments', 'private-pay'].includes(s.slug)
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

export default function AmbulatoryServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Safe, door-to-door ambulatory medical transportation for patients who can walk independently or with minimal assistance. Professional drivers provide courteous, on-time service to medical appointments, treatments, and facilities across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Ambulatory Transportation', href: '/services/ambulatory' },
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
              <span className="text-foreground font-medium">Ambulatory Transportation</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — Split Layout */}
      <section className="bg-gradient-to-br from-white to-muted section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div className="flex gap-4 lg:gap-6">
              <div className="w-1 shrink-0 rounded-full bg-accent" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
                  <PersonStanding className="h-7 w-7 text-primary" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                  Ambulatory Transportation
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Door-to-door medical transportation for passengers who can walk independently or with
                  minimal assistance. Our trained drivers provide courteous, reliable service to get you
                  safely to and from your medical appointments.
                </p>
              </div>
            </div>
            {/* Right: Image */}
            <div className="relative h-[300px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/crtohio-ambulance.jpg"
                alt="Care Ride Transportation ambulatory vehicle"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Is Ambulatory Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-6">
              What Is Ambulatory Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ambulatory transportation is non-emergency medical transportation designed for
                individuals who are able to walk on their own or with minimal assistance, such as
                using a cane or walker. This is the most common type of NEMT service, providing a
                safe and reliable alternative to driving yourself or relying on family and friends
                for rides to medical appointments.
              </p>
              <p>
                At {SITE_NAME}, our ambulatory service goes beyond simply getting you
                from one location to another. Our drivers are trained to assist passengers with
                getting in and out of the vehicle, navigating curbs and steps, and ensuring comfort
                throughout the journey. Whether you are heading to a routine check-up, a specialist
                visit, or a follow-up procedure, we make sure you arrive on time and stress-free.
              </p>
              <p>
                Unlike rideshare services or standard taxis, our drivers understand the unique needs
                of medical passengers. We account for appointment times, plan routes to avoid delays,
                and provide the patience and assistance that medical transportation requires. Every
                ride is scheduled in advance, giving you peace of mind knowing your transportation
                is taken care of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Who Benefits from Ambulatory Transportation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Seniors who no longer drive but need regular medical appointments',
              'Patients recovering from procedures who should not drive themselves',
              'Individuals with temporary injuries or mobility limitations',
              'Patients attending therapy, rehabilitation, or counseling sessions',
              'People without access to personal transportation or public transit',
              'Medicaid beneficiaries eligible for non-emergency medical transport',
              'Patients needing reliable rides to lab work, imaging, or diagnostic tests',
              'Individuals managing chronic conditions with frequent doctor visits',
            ].map((item) => (
              <div key={item} className="bg-white rounded-xl p-4 border border-border/60 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
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
                title: 'Book Your Ride',
                text: 'Request your ride online or by phone. Provide your pickup address, destination, appointment time, and any special needs.',
              },
              {
                step: '2',
                title: 'Ride Confirmed',
                text: 'Our dispatch team reviews your request and confirms your ride. You will receive a confirmation with your driver and pickup details.',
              },
              {
                step: '3',
                title: 'Driver Arrives',
                text: 'Your driver arrives at your door on time, assists you to the vehicle, and ensures you are comfortable and secure before departing.',
              },
              {
                step: '4',
                title: 'Safe Arrival',
                text: 'You are dropped off at your appointment entrance. For round trips, your driver returns at your specified pickup time.',
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
            Why Choose {SITE_NAME} for Ambulatory Transportation?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: 'Punctual and Reliable',
                text: 'We know your appointments matter. Our drivers plan routes in advance and arrive early so you are never late for medical visits.',
              },
              {
                icon: HeartHandshake,
                title: 'Compassionate Assistance',
                text: 'Our drivers provide door-to-door assistance including help with steps, curbs, and getting in and out of the vehicle safely.',
              },
              {
                icon: Shield,
                title: 'Safe and Insured',
                text: 'All vehicles are regularly inspected and fully insured. Drivers are background-checked, trained, and committed to passenger safety.',
              },
              {
                icon: Users,
                title: 'Companion-Friendly',
                text: 'A maximum of one companion (family member, caregiver, or aide) may ride along. Companions must be requested in advance during booking so we can ensure adequate space.',
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
            Book Your Ambulatory Ride Today
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Ready to schedule your medical transportation? Request your ride online in minutes or
            call our team directly.
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
