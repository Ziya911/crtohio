import Link from 'next/link'
import Image from 'next/image'
import {
  Wallet,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  Clock,
  Shield,
  BadgeCheck,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'private-pay')!

export const metadata = generatePageMetadata({
  title: `Private Pay Medical Transportation | ${SITE_NAME}`,
  description:
    'Self-pay non-emergency medical transportation with transparent pricing. No insurance required, no hidden fees. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/private-pay',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['ambulatory', 'medical-appointments', 'recurring'].includes(s.slug)
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

export default function PrivatePayServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Self-pay non-emergency medical transportation with transparent, upfront pricing. No insurance required, no hidden fees. Professional medical transport across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Private Pay Rides', href: '/services/private-pay' },
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
              <span className="text-foreground font-medium">Private Pay Rides</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — Clean White Split Layout */}
      <section className="bg-gradient-to-b from-white to-muted section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left side — text */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <Wallet className="h-7 w-7 text-amber-600" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                Private Pay Medical Transportation
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-6">
                Professional medical transportation with transparent, upfront pricing. No insurance
                paperwork, no Medicaid required, no hidden fees. Simply book your ride, know your
                cost, and go.
              </p>
              {/* Starting at badge */}
              <div className="inline-flex items-baseline gap-2 bg-amber-50 rounded-xl px-5 py-2.5 border border-amber-200 mb-8">
                <span className="text-amber-700 text-sm font-medium">Starting at</span>
                <span className="text-amber-600 text-2xl font-extrabold font-heading">$25</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['No Insurance Needed', 'Transparent Pricing', 'Instant Estimates'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Right side — image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[300px] sm:h-[380px] lg:h-[420px]">
                <Image
                  src="/images/private-pay.jpeg"
                  alt="Private pay medical transportation"
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

      {/* What Is Private Pay Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-6">
              What Is Private Pay Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Private pay medical transportation is a self-pay option for patients who need
                non-emergency medical rides but do not have Medicaid coverage, do not qualify for
                insurance-covered transport, or simply prefer the convenience and flexibility of
                paying out of pocket. With private pay, there are no authorization requirements, no
                insurance paperwork to file, and no eligibility restrictions. If you need a ride, we
                are here to help.
              </p>
              <p>
                Many patients choose private pay because it offers greater scheduling flexibility
                and faster booking. Without the need for prior authorizations or insurance
                verifications, private pay rides can often be arranged with shorter notice than
                insurance-covered transport. You get the same professional service, trained drivers,
                and safe vehicles, just with a simpler payment process.
              </p>
              <p>
                At {SITE_NAME}, we believe in transparent pricing. When you book a
                private pay ride, you receive an upfront cost estimate based on the distance, vehicle
                type, and any additional services required. There are no surprise charges or hidden
                fees. You know exactly what your ride will cost before you confirm your booking,
                giving you full control over your transportation budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Who Benefits from Private Pay Transportation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Patients without Medicaid or insurance-covered transportation benefits',
              'Individuals who prefer the simplicity of self-pay without insurance paperwork',
              'Family members arranging rides for elderly parents or loved ones',
              'Patients needing last-minute rides without prior authorization delays',
              'Individuals with insurance that does not cover non-emergency medical transport',
              'Out-of-state visitors needing temporary medical transportation in Ohio',
              'Patients who have exhausted their insurance-covered ride allocation',
              'Anyone who values transparent pricing and flexible scheduling',
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

      {/* Pricing Transparency */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            How Our Pricing Works
          </h2>
          <div className="max-w-3xl">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our private pay pricing is straightforward and based on a few simple factors. When you
              request a ride, we calculate your cost based on the following:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Base Fare',
                  text: 'Every ride includes a base fare that covers the driver, vehicle, and dispatch coordination.',
                },
                {
                  title: 'Mileage Rate',
                  text: 'A per-mile rate is applied based on the distance between your pickup and drop-off locations. Rates differ for ambulatory and wheelchair transport.',
                },
                {
                  title: 'Service Add-Ons',
                  text: 'Additional services such as door-through-door assistance, stair assistance, or building navigation are available at transparent add-on rates.',
                },
                {
                  title: 'Round-Trip Savings',
                  text: 'Booking a round trip qualifies for a discount compared to two separate one-way rides.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-border rounded-xl p-5 shadow-[var(--shadow-card)] hover:border-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="font-heading text-base font-semibold text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/pricing"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                View Our Full Pricing Page
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Get Your Estimate',
                text: 'Enter your pickup and drop-off addresses to receive an instant price estimate with no obligation.',
              },
              {
                step: '2',
                title: 'Book with Confidence',
                text: 'Confirm your booking knowing exactly what the ride will cost. No insurance paperwork or authorization needed.',
              },
              {
                step: '3',
                title: 'Enjoy Your Ride',
                text: 'Experience the same professional, safe, and comfortable medical transportation as any other ride we provide.',
              },
              {
                step: '4',
                title: 'Simple Payment',
                text: 'Pay upon completion of your ride or through our billing system. Receipts provided for personal records or tax purposes.',
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
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Why Choose {SITE_NAME} for Private Pay?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Transparent Pricing',
                text: 'No hidden fees, no surprise charges. You see your estimated cost before you book, and we honor it. What you see is what you pay.',
              },
              {
                icon: Clock,
                title: 'Quick Booking',
                text: 'Without the need for insurance authorizations, we can often accommodate private pay bookings on shorter notice than covered rides.',
              },
              {
                icon: BadgeCheck,
                title: 'Same Professional Service',
                text: 'Private pay riders receive the exact same trained drivers, clean vehicles, and high-quality care as every other passenger we serve.',
              },
              {
                icon: Shield,
                title: 'No Eligibility Restrictions',
                text: 'Anyone can use our private pay service. There are no income requirements, no insurance prerequisites, and no authorization paperwork.',
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
      <section className="section-padding bg-muted">
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
            Book Your Private Pay Ride
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Get an instant price estimate and book your medical transportation with no insurance
            hassle. Transparent pricing, professional service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-lg"
            >
              Get a Price Estimate
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
