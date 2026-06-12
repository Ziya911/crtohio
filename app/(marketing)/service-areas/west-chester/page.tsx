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
  title: 'West Chester Medical Transportation Services — NEMT in West Chester, OH',
  description:
    'Reliable non-emergency medical transportation in West Chester Township, Ohio. Serving Beckett Ridge, Liberty Center, and Butler County. Rides to medical appointments, dialysis, and hospitals. Book today.',
  path: '/service-areas/west-chester',
})

const NEARBY_AREAS = [
  'Beckett Ridge',
  'Liberty Center Area',
  'Tylersville Road Corridor',
  'Union Centre',
  'Lakota Area',
  'Pisgah',
  'Sharonville (nearby)',
  'Fairfield (nearby)',
  'West Chester Town Center',
  'Cincinnati-Dayton Road',
  'Cox Road Area',
  'Butler County',
]

const MEDICAL_FACILITIES = [
  'West Chester Hospital (UC Health)',
  'Liberty Campus — Premier Health',
  'West Chester Medical Offices',
  'Beckett Ridge Health Center',
  'Cincinnati Children\'s — Liberty Campus',
  'Mercy Health — Fairfield Hospital (nearby)',
]

export default function WestChesterPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'West Chester', href: '/service-areas/west-chester' },
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
              <span className="text-white">West Chester</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              West Chester Township, Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              West Chester Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Professional non-emergency medical transportation for West Chester Township
              residents. From Beckett Ridge to Union Centre, we provide reliable rides to
              medical appointments, treatments, and hospital visits throughout Butler County
              and Greater Cincinnati.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in West Chester
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

      {/* About NEMT in West Chester */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in West Chester
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                West Chester Township is one of the largest and fastest-growing communities in
                Butler County, home to over 60,000 residents who enjoy a mix of suburban comfort
                and easy access to the Greater Cincinnati metro area. The township is anchored
                by thriving commercial centers like Union Centre Boulevard and the Liberty Center
                lifestyle development, but when it comes to healthcare, many residents need to
                travel to specialized facilities in downtown Cincinnati, Fairfield, or even
                Dayton for the care they require.
              </p>
              <p>
                For seniors living in West Chester&apos;s many retirement communities, patients
                undergoing regular dialysis or chemotherapy treatments, and individuals
                recovering from surgery at West Chester Hospital (a UC Health facility),
                reliable medical transportation is not a luxury -- it is a necessity.
                {' '}{SITE_NAME} provides dedicated NEMT service throughout West Chester Township
                and surrounding areas, with ADA-accessible vehicles, trained drivers who assist
                with mobility needs, and scheduling that revolves around your medical
                appointments -- not the other way around. We handle everything from routine
                doctor visits along the Tylersville Road medical corridor to longer trips to
                Cincinnati Children&apos;s or UC Medical Center downtown.
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
                Medical Facilities Near West Chester
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide rides to these facilities and to any medical provider in the region.
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
              We also transport West Chester residents to Cincinnati-area hospitals, specialist
              offices, dialysis centers, and rehabilitation facilities throughout the region.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in West Chester
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every NEMT service we offer is available to West Chester Township residents and
              the surrounding Butler County communities.
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

      {/* Why West Chester Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why West Chester Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Navigating Butler County Roads
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    West Chester&apos;s growth has brought increased traffic along I-75,
                    Tylersville Road, and Cincinnati-Dayton Road. Our drivers are familiar with
                    the best routes through the township and know how to navigate construction
                    zones and peak commuting times to get you to appointments on schedule.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Serving Senior Communities
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    West Chester is home to numerous senior living and assisted living
                    communities. We work closely with facility staff to coordinate pickups and
                    drop-offs, ensuring a smooth transition from residence to medical appointment
                    and back, with door-to-door assistance every step of the way.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    ADA-Accessible Fleet
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our vehicles are equipped with wheelchair ramps, secure tie-down systems,
                    and comfortable seating for both ambulatory and wheelchair-dependent
                    passengers. Every vehicle is regularly inspected and maintained to the
                    highest safety standards.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Multiple Payment Options
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We work with private insurance providers and healthcare facilities
                    to cover your medical transportation costs. Private pay is always available
                    with clear, upfront pricing and no hidden surcharges.
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
              West Chester Area Coverage
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We cover all of West Chester Township and the surrounding communities in Butler
              County.
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
              Book Your Ride in West Chester
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Reliable medical transportation is just a few clicks away. Book online or call
              our West Chester area dispatch team today.
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
