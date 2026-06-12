import Link from 'next/link'
import Image from 'next/image'
import {
  Building2,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Users,
  Clock,
  FileText,
  Handshake,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'facility')!

export const metadata = generatePageMetadata({
  title: `Facility Transportation Services | ${SITE_NAME}`,
  description:
    'Reliable medical transportation for nursing homes, assisted living communities, and healthcare facilities. Individual and group transport with dedicated account management.',
  path: '/services/facility',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['wheelchair', 'hospital-discharge', 'recurring'].includes(s.slug)
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

export default function FacilityServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Reliable non-emergency medical transportation for nursing homes, assisted living communities, rehabilitation centers, and healthcare facilities across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Facility Transportation', href: '/services/facility' },
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
              <span className="text-foreground font-medium">Facility Transportation</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — Light Blue-Gray with Image Card */}
      <section className="relative bg-gradient-to-br from-[#f0f4f8] to-[#e8eef5] overflow-hidden">
        {/* Subtle geometric hexagon pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%230A4D8C' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }}
        />
        <div className="relative container-custom py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                Facility Transportation
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
                Dedicated medical transportation solutions for nursing homes, assisted living
                communities, rehabilitation centers, and healthcare facilities. We partner with
                your staff to ensure every resident gets to their appointments safely and on time.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Dedicated Account', 'Group Transport', 'Simplified Billing'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Right: Image Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-2xl max-w-md w-full aspect-[4/3]">
                <Image
                  src="/images/about-team.jpg"
                  alt="Medical team providing facility transportation services"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Facility Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-6">
              What Is Facility Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Facility transportation is a specialized NEMT service designed for healthcare
                facilities that need to coordinate reliable transportation for their residents and
                patients. Nursing homes, assisted living communities, skilled nursing facilities,
                group homes, and rehabilitation centers all face the ongoing challenge of getting
                their residents to off-site medical appointments, therapies, and procedures.
              </p>
              <p>
                {SITE_NAME} serves as a transportation partner for facilities, working
                directly with your activities coordinators, nursing staff, and administrative team
                to streamline the booking and scheduling process. We understand the complexities of
                facility operations: varying mobility levels among residents, the need for
                wheelchair-accessible vehicles, coordination with multiple appointment times, and
                the importance of maintaining detailed records for regulatory compliance.
              </p>
              <p>
                Our facility transportation service offers both individual and group transport
                options. Whether a single resident needs a ride to a specialist or multiple
                residents have appointments at the same medical complex, we configure our service to
                match your facility's needs. We also provide dedicated account management so your
                staff always has a direct line to our dispatch team, reducing the administrative
                burden of arranging transportation for your residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities We Serve */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Facilities We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Nursing homes and long-term care facilities',
              'Assisted living communities and senior living centers',
              'Skilled nursing and rehabilitation facilities',
              'Group homes and adult foster care residences',
              'Memory care and Alzheimer\'s care facilities',
              'Independent living communities with medical transport needs',
              'Dialysis centers coordinating patient rides',
              'Hospitals and health systems managing patient logistics',
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
            How Our Facility Partnership Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Onboarding Meeting',
                text: 'We meet with your team to understand your facility\'s transportation volume, resident needs, scheduling preferences, and billing requirements.',
              },
              {
                step: '2',
                title: 'Account Setup',
                text: `Your facility receives a dedicated account with streamlined booking access, priority scheduling, and a direct contact at ${SITE_NAME}.`,
              },
              {
                step: '3',
                title: 'Easy Booking',
                text: 'Your staff books rides by phone or through our system. Provide the resident\'s name, appointment details, mobility needs, and we handle the rest.',
              },
              {
                step: '4',
                title: 'Reliable Execution',
                text: 'Our drivers arrive on time, assist residents with care, transport them safely, and return them to your facility after their appointments.',
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
            Why Facilities Choose {SITE_NAME}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Handshake,
                title: 'Dedicated Account Management',
                text: `Your facility gets a dedicated point of contact at ${SITE_NAME} who understands your operations, residents, and scheduling patterns.`,
              },
              {
                icon: Users,
                title: 'Individual and Group Transport',
                text: 'Whether you need one resident transported or a group heading to the same medical complex, we scale our service to your needs.',
              },
              {
                icon: FileText,
                title: 'Simplified Billing',
                text: 'We offer consolidated billing for facilities, making it easy to track transportation costs per resident and streamline your accounting.',
              },
              {
                icon: Clock,
                title: 'Reliability You Can Count On',
                text: 'Your staff does not have time to chase down late drivers. Our on-time commitment means fewer disruptions to your daily operations and fewer missed appointments.',
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
            Partner With {SITE_NAME} for Your Facility
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Let us handle transportation so your staff can focus on care. Contact us to discuss a
            facility partnership tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partner"
              className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-lg"
            >
              Partner With Us
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
