import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SERVICE_AREAS, SITE_NAME, BUSINESS_PHONE } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title: 'Service Areas — Medical Transportation in Ohio',
  description:
    `${SITE_NAME} serves Cincinnati, Mason, West Chester, Liberty Township, Hamilton, Middletown, and surrounding Ohio communities with reliable non-emergency medical transportation.`,
  path: '/service-areas',
})

const CITY_DETAILS: Record<string, { description: string; highlights: string[] }> = {
  cincinnati: {
    description:
      'Comprehensive NEMT coverage across Greater Cincinnati, including downtown, Over-the-Rhine, Clifton, Hyde Park, and surrounding neighborhoods.',
    highlights: ['UC Medical Center', 'Cincinnati Children\'s', 'Christ Hospital'],
  },
  mason: {
    description:
      'Reliable medical transportation serving Mason, Deerfield Township, and the Kings Mills area with easy access to I-71.',
    highlights: ['Deerfield Township', 'Kings Mills Area', 'I-71 Corridor'],
  },
  'west-chester': {
    description:
      'Door-to-door medical rides throughout West Chester Township, Beckett Ridge, and the Liberty Center area.',
    highlights: ['Beckett Ridge', 'Liberty Center Area', 'Butler County'],
  },
  'liberty-township': {
    description:
      'Dependable NEMT service for Liberty Township residents, with convenient access to Butler County medical facilities.',
    highlights: ['Butler County', 'Atrium Medical Center', 'Growing Community'],
  },
  hamilton: {
    description:
      'Full-service medical transportation in Hamilton, the Butler County seat, including Fort Hamilton Hospital and surrounding areas.',
    highlights: ['Fort Hamilton Hospital', 'Butler County Seat', 'Downtown Hamilton'],
  },
  middletown: {
    description:
      'Connecting Middletown patients to medical care throughout the region, from Atrium Medical Center to Cincinnati and Dayton facilities.',
    highlights: ['Atrium Medical Center', 'Between Cincinnati & Dayton', 'Warren County'],
  },
}

export default function ServiceAreasPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section with Image */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cincinnati-skyline.jpg"
            alt="Cincinnati skyline - medical transportation service coverage area"
            fill
            className="object-cover"
            priority
          />
          {/* Dark dramatic gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-heading/90 via-primary/80 to-primary-dark/85" />
          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        {/* Animated decorative orbs */}
        <div className="absolute top-16 left-10 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-primary-sky/8 rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/10">
              <MapPin className="h-4 w-4" />
              Serving Southwest Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Areas We Serve in Ohio
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
              {SITE_NAME} provides safe, reliable non-emergency medical transportation throughout
              Greater Cincinnati and Southwest Ohio. We connect patients to the care they need,
              no matter where they are in our service area.
            </p>
            {/* Stats badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/10">
                <MapPin className="h-4 w-4 text-accent" />
                6+ Cities
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/10">
                <Phone className="h-4 w-4 text-accent" />
                Dispatch Available
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/10">
                <ArrowRight className="h-4 w-4 text-accent" />
                Insurance & Private Pay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Cards Grid */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Find Medical Transportation Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on your city to learn about NEMT services available in your area, including
              local hospitals and medical centers we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area) => {
              const details = CITY_DETAILS[area.slug]
              return (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group bg-white rounded-xl border border-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-xl font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {details?.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {details?.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-block px-2.5 py-1 bg-muted text-xs font-medium text-muted-foreground rounded-md"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Book a Ride From Any of Our Service Areas
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need a ride to a doctor&apos;s appointment, dialysis treatment, or
              hospital discharge, we are here to help. Book online in minutes or give us a call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                Book Your Ride Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Don't See Your City? */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-extrabold text-primary mb-4">
              Don&apos;t See Your City Listed?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our service area extends beyond the cities listed above. If you are located in
              Southwest Ohio and need medical transportation, contact us to discuss your needs.
              We may be able to accommodate your ride request.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Contact Us to Check Availability
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
