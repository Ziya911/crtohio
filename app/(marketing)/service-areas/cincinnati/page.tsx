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
  title: 'Cincinnati Medical Transportation Services — NEMT in Cincinnati, OH',
  description:
    'Reliable non-emergency medical transportation in Cincinnati, Ohio. Serving UC Medical Center, Christ Hospital, Cincinnati Children\'s, Good Samaritan, and all Greater Cincinnati medical facilities. Book your ride today.',
  path: '/service-areas/cincinnati',
})

const NEIGHBORHOODS = [
  'Downtown Cincinnati',
  'Over-the-Rhine',
  'Clifton',
  'Hyde Park',
  'Mount Auburn',
  'Avondale',
  'Westwood',
  'Northside',
  'Price Hill',
  'Oakley',
  'Mount Lookout',
  'Walnut Hills',
  'Corryville',
  'College Hill',
  'Evanston',
  'Madisonville',
]

const HOSPITALS = [
  'UC Medical Center',
  'Cincinnati Children\'s Hospital Medical Center',
  'Christ Hospital',
  'Good Samaritan Hospital',
  'The Jewish Hospital — Mercy Health',
  'TriHealth Bethesda North Hospital',
  'Shriners Hospitals for Children',
  'Cincinnati VA Medical Center',
]

export default function CincinnatiPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Cincinnati', href: '/service-areas/cincinnati' },
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
              <span className="text-white">Cincinnati</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              Greater Cincinnati, Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Cincinnati Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Safe, dependable non-emergency medical transportation across Greater Cincinnati.
              From UC Medical Center in Clifton to Christ Hospital in Mount Auburn, we get you
              to your appointments on time, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in Cincinnati
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

      {/* About NEMT in Cincinnati */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in Cincinnati
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Cincinnati is home to some of the nation&apos;s leading medical institutions,
                including the University of Cincinnati Medical Center, Cincinnati Children&apos;s
                Hospital Medical Center -- ranked among the top pediatric hospitals in the
                country -- and the Christ Hospital network. With major healthcare campuses
                spread across Clifton Heights, Mount Auburn, Corryville, and Avondale, thousands
                of patients travel across the city every day for critical medical appointments,
                dialysis treatments, physical therapy sessions, and follow-up care.
              </p>
              <p>
                For many Cincinnati residents, especially seniors, individuals with disabilities,
                and Medicaid beneficiaries, getting to these appointments reliably is a real
                challenge. Public transit options like Metro buses may not accommodate wheelchair
                users or reach suburban medical offices easily. Ride-sharing services lack the
                specialized training and vehicle accommodations that medical passengers require.
                {SITE_NAME} bridges this gap by providing professional, NEMT-focused
                transportation with trained drivers, ADA-compliant vehicles, and scheduling
                built around your treatment times -- not around surge pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitals & Medical Centers */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Cincinnati Hospitals and Medical Centers We Serve
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide transportation to and from all major medical facilities in Cincinnati.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HOSPITALS.map((hospital) => (
                <div
                  key={hospital}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg border border-border"
                >
                  <Building2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{hospital}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Plus dialysis centers, specialist offices, outpatient surgery centers, rehabilitation
              facilities, and more across the Greater Cincinnati area.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in Cincinnati
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a complete range of non-emergency medical transportation services to
              meet the diverse needs of Cincinnati-area patients.
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

      {/* Why Cincinnati Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why Cincinnati Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    We Know Cincinnati Traffic
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    From I-75 congestion to downtown construction, our drivers know the best
                    routes through Cincinnati. We factor in real-time traffic so you arrive on
                    time for your appointment, whether it is at UC Medical Center in Clifton or
                    Good Samaritan Hospital in Clifton Heights.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Safe, Professional Drivers
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every driver passes a thorough background check and receives specialized
                    training in passenger assistance, wheelchair securement, and sensitivity to
                    medical passengers. Your safety and comfort are our top priorities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Medicaid and Insurance Accepted
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Many Cincinnati residents qualify for Medicaid-covered medical transportation.
                    We work with Medicaid managed care plans and accept private insurance to
                    minimize out-of-pocket costs. Private pay options are also available with
                    transparent, upfront pricing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Door-to-Door, Not Just Curb-to-Curb
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Many Cincinnati homes and apartment buildings present accessibility challenges.
                    Our drivers provide door-to-door and building-to-building assistance, helping
                    passengers from their front door to the vehicle and from the vehicle into the
                    medical facility.
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
              Cincinnati Neighborhoods and Areas We Cover
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We provide coverage across all of Greater Cincinnati, including these neighborhoods
              and surrounding communities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {NEIGHBORHOODS.map((neighborhood) => (
                <div
                  key={neighborhood}
                  className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-lg"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{neighborhood}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Don&apos;t see your neighborhood listed? We likely cover it.{' '}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                Contact us
              </Link>{' '}
              to confirm service availability.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Book Your Ride in Cincinnati
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Ready to schedule reliable medical transportation in Cincinnati? Book online in
              just a few minutes or call us directly to speak with our dispatch team.
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
