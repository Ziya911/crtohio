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
  title: 'Middletown Medical Transportation Services — NEMT in Middletown, OH',
  description:
    'Non-emergency medical transportation in Middletown, Ohio. Serving Atrium Medical Center, local clinics, and connecting patients to Cincinnati and Dayton healthcare facilities. Book your ride today.',
  path: '/service-areas/middletown',
})

const NEARBY_AREAS = [
  'Downtown Middletown',
  'Manchester',
  'Lemon Township',
  'Turtlecreek Township',
  'Franklin (nearby)',
  'Trenton (nearby)',
  'Monroe (nearby)',
  'Poasttown',
  'Madison Township',
  'Middletown North',
  'Middletown South',
  'State Route 122 Corridor',
]

const MEDICAL_FACILITIES = [
  'Atrium Medical Center — Premier Health',
  'Premier Health Urgent Care — Middletown',
  'Middletown Community Health Center',
  'Butler Behavioral Health — Middletown',
  'HealthSource of Ohio — Middletown',
  'Greater Dayton Area Hospital Association (regional)',
]

export default function MiddletownPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Middletown', href: '/service-areas/middletown' },
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
              <span className="text-white">Middletown</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              Middletown, Ohio — Between Cincinnati &amp; Dayton
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Middletown Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Dependable non-emergency medical transportation for Middletown, Ohio. Strategically
              located between Cincinnati and Dayton, we connect Middletown residents to Atrium
              Medical Center, regional hospitals, and specialty healthcare providers with safe,
              timely rides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in Middletown
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

      {/* About NEMT in Middletown */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in Middletown
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Middletown occupies a unique geographic position in Southwest Ohio, sitting
                almost exactly halfway between Cincinnati and Dayton along the I-75 corridor.
                This location gives Middletown residents access to major healthcare systems in
                both metropolitan areas, but it also means longer travel times for specialist
                appointments. Atrium Medical Center, part of the Premier Health network, is
                Middletown&apos;s primary hospital and provides a wide range of services
                including emergency care, surgical procedures, cardiac care, and cancer
                treatment. For services not available locally, however, residents often need
                to travel 30 to 45 minutes to Cincinnati or Dayton.
              </p>
              <p>
                For Middletown&apos;s aging population, patients undergoing dialysis at local
                centers, and individuals managing chronic conditions that require regular
                medical visits, getting to and from appointments can be one of the biggest
                barriers to receiving consistent care. {SITE_NAME} addresses this challenge
                head-on by providing dedicated medical transportation that serves the entire
                Middletown area. Our vehicles are maintained to the highest safety standards,
                our drivers are trained in passenger assistance and sensitivity, and our
                scheduling accommodates the recurring nature of treatments like dialysis,
                physical therapy, and chemotherapy. Whether your appointment is at Atrium
                Medical Center down the road or at a Cincinnati Children&apos;s specialist
                an hour south, we are here to get you there safely and on time.
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
                Middletown Medical Facilities We Serve
              </h2>
              <p className="text-lg text-muted-foreground">
                We transport patients to Middletown&apos;s local facilities and to hospitals
                in Cincinnati and Dayton for specialized care.
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
              Middletown&apos;s location between Cincinnati and Dayton means we regularly
              transport patients to UC Medical Center, Miami Valley Hospital, Kettering Health
              facilities, Cincinnati Children&apos;s, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in Middletown
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our complete suite of NEMT services is available to Middletown-area residents,
              covering everything from routine medical visits to recurring treatments.
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

      {/* Why Middletown Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why Middletown Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Two-Metro Access
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Middletown&apos;s position between Cincinnati and Dayton means your doctor
                    could be in either metro area. We serve both directions along I-75,
                    providing comfortable rides whether you are heading south to UC Medical
                    Center or north to Miami Valley Hospital. Our drivers plan for travel time
                    so you arrive on schedule regardless of which city your appointment is in.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Built for Recurring Patients
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Many Middletown patients travel multiple times per week for dialysis or
                    physical therapy. Our recurring ride program provides consistent scheduling,
                    familiar drivers, and the peace of mind that comes from knowing your
                    transportation is handled -- so you can focus on your treatment and recovery.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Compassionate Local Service
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We are not a faceless national ride-sharing app. {SITE_NAME} is a local
                    service provider that understands Middletown and its people. Our drivers
                    treat every passenger like family, providing assistance with mobility needs,
                    patience during pickups, and a friendly conversation when you need it.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Coverage for Every Situation
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept private insurance, facility contracts, and private pay.
                    Whether you have commercial health insurance or are paying out of pocket,
                    we offer transparent pricing and multiple ways to make medical transportation
                    affordable.
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
              Middletown Area Coverage
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We provide medical transportation across all of Middletown and the surrounding
              Butler and Warren County communities.
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
              Book Your Ride in Middletown
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Whether you are heading to Atrium Medical Center, a Cincinnati hospital, or a
              Dayton specialist, we will get you there safely. Book online in minutes or call
              our team.
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
