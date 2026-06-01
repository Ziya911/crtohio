import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  DollarSign,
  CheckCircle2,
  Info,
  PersonStanding,
  Accessibility,
  Clock,
  Building2,
  Footprints,
  Timer,
  Percent,
  AlertCircle,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, PRICING_CONFIG } from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'Pricing',
  description: `Transparent, affordable pricing for non-emergency medical transportation. ${SITE_NAME} offers competitive rates for ambulatory and wheelchair transportation in Ohio.`,
  path: '/pricing',
})

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
]

const INCLUDED_FEATURES = [
  'Door-to-door pickup and drop-off',
  'Professional, trained driver',
  'ADA-compliant vehicle',
  'Secure wheelchair tie-downs (wheelchair rides)',
  'Climate-controlled interior',
  'Real-time dispatch coordination',
]

const SURCHARGES = [
  {
    icon: <Building2 className="h-5 w-5" />,
    label: 'Building / Inside Assist',
    description: 'Driver assists passenger through building lobby, elevators, or hallways',
    amount: PRICING_CONFIG.buildingAssist,
  },
  {
    icon: <Footprints className="h-5 w-5" />,
    label: 'Stairs Assistance',
    description: 'Driver assists passenger up or down stairs at pickup or drop-off location',
    amount: PRICING_CONFIG.stairs,
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'After-Hours Service',
    description: 'Rides before 7 AM, after 7 PM, or on weekends',
    amount: null,
    note: `+${((PRICING_CONFIG.afterHoursMultiplier - 1) * 100).toFixed(0)}% on base fare`,
  },
  {
    icon: <Timer className="h-5 w-5" />,
    label: 'Waiting Time',
    description: `Additional waiting beyond the ${PRICING_CONFIG.waitGraceMinutes}-minute grace period`,
    amount: PRICING_CONFIG.waitPerMinute,
    unit: 'per minute',
  },
]

export default function PricingPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(BREADCRUMBS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" className="bg-muted border-b border-border">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            {BREADCRUMBS.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                )}
                {index === BREADCRUMBS.length - 1 ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-white to-muted">
        {/* Floating decorative circles */}
        <div className="absolute top-8 right-8 md:top-12 md:right-20 w-72 h-72 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-8 left-4 md:bottom-12 md:left-16 w-56 h-56 bg-primary/5 rounded-full blur-[60px]" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-[#0891b2]/5 rounded-full blur-[50px]" />

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
              <DollarSign className="h-4 w-4" />
              Transparent Pricing
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6">
              Transparent, Affordable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-sky">
                Pricing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              We believe in honest, upfront pricing with no hidden fees. Know your estimated
              cost before you book, and only pay for the services you need.
            </p>

            {/* Mini preview cards */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-5 py-3.5 border-l-4 border-primary">
                <DollarSign className="h-5 w-5 text-primary shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground leading-tight">Starting at</p>
                  <p className="font-heading font-bold text-primary">From ${PRICING_CONFIG.baseFareAmbulatory} base fare</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-5 py-3.5 border-l-4 border-primary">
                <PersonStanding className="h-5 w-5 text-primary shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground leading-tight">Ambulatory</p>
                  <p className="font-heading font-bold text-primary">${PRICING_CONFIG.perMileAmbulatory.toFixed(2)}/mi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING CARDS ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Our Rate Structure
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, distance-based pricing. Your total fare is calculated from a base
                fare plus a per-mile charge based on your transportation type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Ambulatory Card */}
              <div className="relative flex flex-col p-8 bg-white rounded-2xl border-2 border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-light text-primary rounded-xl">
                    <PersonStanding className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary">
                      Ambulatory
                    </h3>
                    <p className="text-sm text-muted-foreground">Walk-on passengers</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading text-4xl font-bold text-primary">
                      ${PRICING_CONFIG.baseFareAmbulatory}
                    </span>
                    <span className="text-muted-foreground">base fare</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      + ${PRICING_CONFIG.perMileAmbulatory.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">per mile</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  For passengers who can walk independently or with minimal assistance.
                  Includes door-to-door service with a professional driver.
                </p>
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Includes:</p>
                  <ul className="space-y-2">
                    {INCLUDED_FEATURES.filter(f => !f.includes('wheelchair')).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Wheelchair Card */}
              <div className="relative flex flex-col p-8 bg-white rounded-2xl border-2 border-primary/40 shadow-lg shadow-primary/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Full Accessibility
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl">
                    <Accessibility className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary">
                      Wheelchair
                    </h3>
                    <p className="text-sm text-muted-foreground">Wheelchair passengers</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading text-4xl font-bold text-primary">
                      ${PRICING_CONFIG.baseFareWheelchair}
                    </span>
                    <span className="text-muted-foreground">base fare</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      + ${PRICING_CONFIG.perMileWheelchair.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">per mile</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  For passengers using manual or powered wheelchairs. Includes ADA-compliant
                  vehicles with ramps, lifts, and secure tie-down systems.
                </p>
                <div className="mt-auto pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Includes:</p>
                  <ul className="space-y-2">
                    {INCLUDED_FEATURES.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Round Trip Discount */}
            <div className="bg-accent-light border border-accent/20 rounded-2xl p-6 md:p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-xl shrink-0">
                  <Percent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-1">
                    Round-Trip Discount
                  </h3>
                  <p className="text-muted-foreground">
                    Book a round trip and save{' '}
                    <span className="font-semibold text-accent-dark">
                      {((1 - PRICING_CONFIG.roundTripDiscount) * 100).toFixed(0)}%
                    </span>{' '}
                    on your total fare. The discount is automatically applied when you select
                    a round-trip booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-muted rounded-2xl p-6 md:p-8 mb-12">
              <h3 className="font-heading text-xl font-bold text-primary mb-4">
                Example Price Calculation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Ambulatory, One-Way, 10 Miles
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base fare</span>
                      <span className="font-medium text-foreground">
                        ${PRICING_CONFIG.baseFareAmbulatory.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Mileage (10 mi x ${PRICING_CONFIG.perMileAmbulatory.toFixed(2)})
                      </span>
                      <span className="font-medium text-foreground">
                        ${(10 * PRICING_CONFIG.perMileAmbulatory).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-semibold text-foreground">Estimated Total</span>
                      <span className="font-bold text-primary text-lg">
                        ${(PRICING_CONFIG.baseFareAmbulatory + 10 * PRICING_CONFIG.perMileAmbulatory).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Wheelchair, Round-Trip, 15 Miles
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base fare</span>
                      <span className="font-medium text-foreground">
                        ${PRICING_CONFIG.baseFareWheelchair.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Mileage (15 mi x ${PRICING_CONFIG.perMileWheelchair.toFixed(2)} x 2)
                      </span>
                      <span className="font-medium text-foreground">
                        ${(15 * PRICING_CONFIG.perMileWheelchair * 2).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Round-trip discount ({((1 - PRICING_CONFIG.roundTripDiscount) * 100).toFixed(0)}%)
                      </span>
                      <span className="font-medium text-accent-dark">
                        -${(
                          (PRICING_CONFIG.baseFareWheelchair + 15 * PRICING_CONFIG.perMileWheelchair * 2) *
                          (1 - PRICING_CONFIG.roundTripDiscount)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-semibold text-foreground">Estimated Total</span>
                      <span className="font-bold text-primary text-lg">
                        ${(
                          (PRICING_CONFIG.baseFareWheelchair + 15 * PRICING_CONFIG.perMileWheelchair * 2) *
                          PRICING_CONFIG.roundTripDiscount
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SURCHARGES ===== */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Additional Services & Surcharges
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Optional add-on services are available based on your specific needs.
                These are only applied when requested.
              </p>
            </div>
            <div className="space-y-4">
              {SURCHARGES.map((surcharge) => (
                <div
                  key={surcharge.label}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border card-hover"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-light text-primary rounded-lg shrink-0">
                    {surcharge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary">{surcharge.label}</h3>
                    <p className="text-sm text-muted-foreground">{surcharge.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {surcharge.amount !== null ? (
                      <p className="font-bold text-foreground text-lg">
                        ${surcharge.amount.toFixed(2)}
                        {surcharge.unit && (
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            /{surcharge.unit.replace('per ', '')}
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-primary">
                        {surcharge.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAYMENT METHODS ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Accepted Payment Methods
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We work with multiple payment options to make medical transportation accessible for everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Medicaid',
                  description: 'Covered transportation for eligible Medicaid members',
                },
                {
                  title: 'Private Insurance',
                  description: 'We work with select insurance providers',
                },
                {
                  title: 'Facility Billing',
                  description: 'Direct billing for healthcare facility partners',
                },
                {
                  title: 'Private Pay',
                  description: 'Self-pay with transparent, upfront pricing',
                },
              ].map((method) => (
                <div
                  key={method.title}
                  className="text-center p-5 bg-muted rounded-xl card-hover"
                >
                  <h3 className="font-semibold text-primary mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISCLAIMER ===== */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary-light border border-primary/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">
                    Pricing Disclaimer
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    The prices listed on this page are estimates and may vary based on actual
                    distance traveled, traffic conditions, and specific service needs. Final
                    pricing is determined at the time of booking confirmation based on actual
                    route distance. Medicaid and insurance-covered rides are subject to payer
                    approval and coverage terms.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For an accurate estimate tailored to your specific trip, use our online
                    booking tool or contact our dispatch team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Get a Free Ride Estimate
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Use our online booking tool to calculate your exact trip cost instantly.
            No obligation, no account required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-semibold rounded-xl transition-colors shadow-lg"
            >
              Get Your Estimate
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
