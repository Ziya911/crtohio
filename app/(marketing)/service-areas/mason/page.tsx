import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  Clock,
  Shield,
  Heart,
  Building2,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, SERVICES } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title: 'Mason Medical Transportation Services — NEMT in Mason, OH',
  description:
    'Non-emergency medical transportation in Mason, Ohio. Serving Deerfield Township, Kings Mills, and Warren County. Reliable rides to medical appointments, dialysis, and hospital visits. Book today.',
  path: '/service-areas/mason',
})

const NEARBY_AREAS = [
  'Deerfield Township',
  'Kings Mills',
  'Kings Island Area',
  'South Lebanon',
  'Maineville',
  'Morrow',
  'Landen',
  'Fields Ertel Area',
  'Socialville',
  'Tylersville',
  'Western Row',
  'Mason-Montgomery Road Corridor',
]

const MEDICAL_FACILITIES = [
  'Lindner Center of HOPE',
  'Bethesda Butler Hospital',
  'Mason Medical Center',
  'Deerfield Township Medical Offices',
  'Premier Health Urgent Care — Mason',
  'Cincinnati Children\'s Mason Campus',
]

export default function MasonPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Mason', href: '/service-areas/mason' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="gradient-primary text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
              <span>/</span>
              <span className="text-white">Mason</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              Mason &amp; Warren County, Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Mason Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Dependable non-emergency medical transportation for Mason residents and the
              greater Deerfield Township area. We connect you to healthcare throughout Warren
              County and Greater Cincinnati with on-time, comfortable rides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in Mason
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About NEMT in Mason */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in Mason
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Mason is one of the fastest-growing cities in Warren County, with a population
                that continues to expand along the I-71 corridor between Cincinnati and Dayton.
                While the city has seen tremendous growth in retail and residential development
                -- from the Deerfield Towne Center to new subdivisions near Kings Island -- its
                residents still rely on Cincinnati-area hospitals and specialty clinics for many
                medical needs. The drive from Mason to UC Medical Center or Cincinnati
                Children&apos;s Hospital can take 30 to 45 minutes depending on traffic along
                I-71, making reliable transportation essential for patients who cannot drive
                themselves.
              </p>
              <p>
                {SITE_NAME} serves Mason and the surrounding Deerfield Township area with
                door-to-door medical transportation designed around patient needs. Whether
                you need a recurring ride to a dialysis center along the Mason-Montgomery
                Road corridor, transportation to the Lindner Center of HOPE for outpatient
                mental health treatment, or a safe ride home following a procedure at Bethesda
                Butler Hospital, our professionally trained drivers and well-maintained
                vehicles ensure you travel comfortably and arrive on time. We accept private
                insurance and private pay to make medical transportation accessible
                to all Mason residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Facilities */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Medical Facilities Near Mason
              </h2>
              <p className="text-lg text-muted-foreground">
                We transport patients to local facilities and to Cincinnati-area hospitals
                for specialized care.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MEDICAL_FACILITIES.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg border border-border"
                >
                  <Building2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{facility}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              We also provide transportation from Mason to Cincinnati-area hospitals including
              UC Medical Center, Cincinnati Children&apos;s main campus, Christ Hospital, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in Mason
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All of our NEMT services are available to Mason-area residents, from one-time
              rides to ongoing recurring transportation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-muted hover:bg-primary-light rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-heading text-sm font-semibold text-primary group-hover:text-primary transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Mason Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why Mason Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    I-71 Corridor Expertise
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The drive from Mason to downtown Cincinnati involves navigating one of
                    Ohio&apos;s busiest interstate corridors. Our drivers know the best times
                    to travel, alternative routes through Fields Ertel and Montgomery, and
                    how to plan pickup times so you arrive at your appointment stress-free.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Suburban Pickup Reliability
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Unlike ride-sharing services that may have limited availability in suburban
                    Mason, {SITE_NAME} maintains a dedicated fleet that serves the Warren County
                    area. You will never be stranded waiting for a driver who is too far away
                    to reach you on time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Recurring Ride Scheduling
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Many Mason patients travel regularly to Cincinnati for dialysis, chemotherapy,
                    or physical therapy. Our recurring ride program lets you schedule your
                    transportation once and ride on autopilot, with the same reliable pickup
                    times each week.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Flexible Payment Options
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept private insurance plans and facility contracts. For
                    self-pay riders, we offer transparent pricing with no hidden fees. Get a
                    fare estimate before you book so there are no surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-4">
              Mason Area Coverage
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We provide medical transportation across Mason and surrounding communities in
              Warren County.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {NEARBY_AREAS.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-lg"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Book Your Ride in Mason
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Need medical transportation from Mason to anywhere in the Greater Cincinnati
              region? Book online in minutes or call our dispatch team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                Book Online Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors w-full sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
