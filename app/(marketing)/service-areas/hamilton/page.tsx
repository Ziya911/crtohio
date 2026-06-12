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
  title: 'Hamilton Medical Transportation Services — NEMT in Hamilton, OH',
  description:
    'Non-emergency medical transportation in Hamilton, Ohio. Serving the Butler County seat with rides to Fort Hamilton Hospital, local medical offices, and Cincinnati-area healthcare facilities. Book today.',
  path: '/service-areas/hamilton',
})

const NEARBY_AREAS = [
  'Downtown Hamilton',
  'Lindenwald',
  'German Village',
  'Riverside',
  'Ross Township',
  'St. Clair Township',
  'Fairfield Township',
  'Hanover Township',
  'Hamilton Eastside',
  'Hamilton Westside',
  'New Miami (nearby)',
  'Millville (nearby)',
]

const MEDICAL_FACILITIES = [
  'Fort Hamilton Hospital — Kettering Health',
  'Butler Behavioral Health Services',
  'Greater Hamilton Health Center',
  'Hamilton Health Department',
  'Butler County Board of DD',
  'Premier Community Health — Hamilton',
]

export default function HamiltonPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Hamilton', href: '/service-areas/hamilton' },
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
              <span className="text-white">Hamilton</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              Hamilton, Butler County, Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Hamilton Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Reliable non-emergency medical transportation for Hamilton, Ohio -- the seat
              of Butler County. We provide safe, comfortable rides to Fort Hamilton Hospital,
              local clinics, and medical facilities across the Greater Cincinnati region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in Hamilton
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

      {/* About NEMT in Hamilton */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in Hamilton
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Hamilton is the county seat of Butler County and one of the oldest cities in
                Southwest Ohio. Situated along the Great Miami River, Hamilton has a rich
                industrial heritage and a close-knit community that values accessible
                healthcare. Fort Hamilton Hospital, part of the Kettering Health network,
                serves as the city&apos;s primary hospital, providing emergency care, surgical
                services, and a range of outpatient treatments. However, many Hamilton residents
                also need to travel to medical facilities in Cincinnati, Middletown, or Dayton
                for specialized procedures, cancer treatment, dialysis, or rehabilitation.
              </p>
              <p>
                Transportation to medical appointments is a significant barrier for many Hamilton
                residents, particularly seniors and individuals with disabilities.
                The city&apos;s public transit options are limited compared to
                Cincinnati, and ride-sharing services do not provide the specialized assistance
                that medical passengers often need. {SITE_NAME} fills this critical gap by
                offering NEMT service tailored to Hamilton&apos;s community. We provide
                ADA-compliant vehicles with wheelchair ramps and tie-down systems, trained
                drivers who help passengers from their front door to the medical facility, and
                scheduling designed around treatment times -- including early morning pickups
                for dialysis and late afternoon returns from outpatient procedures.
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
                Hamilton Medical Facilities We Serve
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide transportation to and from all Hamilton-area medical facilities and
                throughout the region.
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
              We also transport Hamilton residents to Cincinnati hospitals, Atrium Medical
              Center in Middletown, Dayton-area facilities, dialysis clinics, and specialist
              offices across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in Hamilton
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hamilton residents have full access to our complete range of NEMT services,
              tailored to meet the healthcare transportation needs of Butler County.
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

      {/* Why Hamilton Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why Hamilton Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Bridging the Distance to Specialists
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    While Fort Hamilton Hospital provides excellent local care, many Hamilton
                    residents need to travel 30 to 50 minutes south to Cincinnati for specialists,
                    cancer treatment, or advanced procedures. Our drivers make these longer trips
                    comfortable and stress-free, handling the I-75 commute so you can focus on
                    your health.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Understanding Hamilton&apos;s Community
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We are familiar with Hamilton&apos;s neighborhoods from Lindenwald to German
                    Village, from Riverside to the Eastside. Our drivers navigate the city&apos;s
                    streets confidently, know where the medical offices are located, and
                    understand the community they serve.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Flexible Payment Options
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept private insurance and private pay to ensure Hamilton residents
                    can access rides to their medical appointments. Transparent, upfront pricing
                    means no surprises when you book.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Consistent, Dependable Rides
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    When you have a standing appointment -- dialysis three times a week, weekly
                    therapy sessions, or monthly check-ups -- you need transportation you can
                    count on. Our recurring ride program ensures your driver shows up at the
                    same time, at the same place, without fail.
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
              Hamilton Area Coverage
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We serve all of Hamilton and the surrounding townships in Butler County.
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
              Book Your Ride in Hamilton
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Hamilton residents deserve reliable, affordable medical transportation. Book
              your ride online in just a few minutes or call us today.
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
