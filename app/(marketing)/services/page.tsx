import Link from 'next/link'
import Image from 'next/image'
import {
  PersonStanding,
  Accessibility,
  HeartPulse,
  Stethoscope,
  Hospital,
  Building2,
  Wallet,
  CalendarClock,
  ArrowRight,
  Phone,
  ChevronRight,
} from 'lucide-react'
import { SERVICES, SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER } from '@/lib/constants'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: `Non-Emergency Medical Transportation Services | ${SITE_NAME}`,
  description:
    'Explore our full range of NEMT services including ambulatory, wheelchair, dialysis, hospital discharge, facility transport, and more. Serving Cincinnati and surrounding Ohio areas.',
  path: '/services',
})

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PersonStanding,
  Accessibility,
  HeartPulse,
  Stethoscope,
  Hospital,
  Building2,
  Wallet,
  CalendarClock,
}

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

export default function ServicesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
  ])

  return (
    <>
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
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="text-foreground font-medium">Services</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section — Clean White with Gradient Text */}
      <section className="relative bg-gradient-to-b from-muted to-white py-20 md:py-28 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0A4D8C 1px, transparent 1px), linear-gradient(to bottom, #0A4D8C 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
            Our Services
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-sky to-accent">
            Our Transportation Services
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {SITE_NAME} offers a comprehensive range of non-emergency medical
            transportation services across Cincinnati, Mason, West Chester, and surrounding Ohio
            communities. Whatever your medical transport needs, we have you covered.
          </p>
          {/* Service type icon badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon]
              return (
                <div
                  key={service.slug}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-border shadow-sm text-sm text-muted-foreground"
                >
                  {Icon && <Icon className="h-4 w-4 text-primary" />}
                  <span>{service.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon]
              const imageSrc = IMAGE_MAP[service.slug]
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-white border border-border border-t-2 border-t-transparent hover:border-t-accent rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden img-zoom">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                        {Icon && (
                          <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                        )}
                      </div>
                      <h2 className="font-heading text-lg font-semibold text-primary group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Link indicator */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-4">
              Why Choose {SITE_NAME}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand that medical transportation is about more than just getting from point A
              to point B. It is about safety, reliability, and compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Trained Drivers',
                text: 'Our drivers are trained in passenger assistance, safety protocols, and sensitivity to the needs of medical passengers.',
                num: '01',
              },
              {
                title: 'On-Time Guarantee',
                text: 'We plan routes carefully and arrive early so you never miss an appointment. Punctuality is part of our promise.',
                num: '02',
              },
              {
                title: 'ADA-Compliant Fleet',
                text: 'Our vehicles are equipped with wheelchair ramps, secure tie-downs, and accessibility features that meet ADA standards.',
                num: '03',
              },
              {
                title: 'Multiple Payment Options',
                text: 'We accept Medicaid, private insurance, facility billing, and private pay. We work to make transport accessible to everyone.',
                num: '04',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-sky flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-sm font-bold">{item.num}</span>
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

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ambulance.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 to-primary/90" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Need a Ride? Book Now
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Booking your medical transportation is quick and easy. Request your ride online or call
            us directly to schedule.
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
