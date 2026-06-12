import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Handshake,
  ArrowRight,
  Phone,
  CheckCircle2,
  Clock,
  TrendingDown,
  UserCheck,
  Building2,
  HeartPulse,
  Shield,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/constants'
import { PartnerInquiryForm } from '@/components/marketing/PartnerInquiryForm'

export const metadata: Metadata = generatePageMetadata({
  title: `Partner With ${SITE_NAME} — Healthcare Facility Transportation Partnerships`,
  description:
    `Partner with ${SITE_NAME} to provide reliable non-emergency medical transportation for your patients. Reduce no-shows, improve outcomes, and get a dedicated account manager. Hospitals, nursing homes, dialysis centers, and clinics welcome.`,
  path: '/partner',
})

const BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Reduce Patient No-Shows',
    description:
      `Transportation barriers are one of the leading causes of missed medical appointments. By partnering with ${SITE_NAME}, your facility ensures patients have reliable rides to every appointment, significantly reducing no-show rates and improving health outcomes.`,
  },
  {
    icon: UserCheck,
    title: 'Dedicated Account Manager',
    description:
      'Every partner facility is assigned a dedicated account manager who understands your scheduling needs, patient demographics, and operational requirements. One point of contact for all your transportation coordination.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description:
      'We work around your facility\'s schedule, not the other way around. Whether you need early-morning dialysis pickups, post-surgery discharges, or recurring weekly appointments, our fleet is ready when your patients need us.',
  },
  {
    icon: Shield,
    title: 'Compliant and Professional',
    description:
      'All drivers pass thorough background checks and receive training in HIPAA awareness, passenger assistance, and medical sensitivity. Our vehicles are regularly inspected, insured, and ADA-compliant.',
  },
  {
    icon: HeartPulse,
    title: 'Improved Patient Outcomes',
    description:
      'When patients can consistently attend their treatments, follow-up visits, and therapy sessions, health outcomes improve dramatically. Reliable transportation is a critical social determinant of health.',
  },
  {
    icon: Building2,
    title: 'Streamlined Billing',
    description:
      'We offer consolidated monthly billing for facility partners, eliminating the hassle of per-ride invoicing. Work with private insurance or direct facility contracts — whatever works best for your organization.',
  },
]

export default function PartnerPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Partner With Us', href: '/partner' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/about-team.jpg" alt="Healthcare facility partnership" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20">
              <Handshake className="h-4 w-4" />
              Healthcare Facility Partnerships
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Partner With {SITE_NAME}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Hospitals, nursing homes, dialysis centers, and clinics across Southwest Ohio
              trust {SITE_NAME} to provide reliable medical transportation for their patients.
              Reduce no-shows, improve outcomes, and give your patients the dependable rides
              they deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Submit a Partnership Inquiry
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
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

      {/* The Problem We Solve */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-6">
              Transportation Barriers Hurt Patient Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3.6M</div>
                <p className="text-muted-foreground text-sm">
                  Americans miss or delay medical care each year due to transportation issues
                  (AHA study)
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-muted-foreground text-sm">
                  Average no-show rate reduction when facilities provide coordinated
                  transportation
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$150B</div>
                <p className="text-muted-foreground text-sm">
                  Estimated annual cost of missed appointments to the U.S. healthcare system
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              By partnering with {SITE_NAME}, your facility can address one of the most common
              social determinants of health -- transportation -- and see measurable improvements
              in patient attendance and outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Benefits of Partnering With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy for healthcare facilities to provide dependable transportation
              for their patients and residents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-[var(--shadow-card)] card-hover">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              How Our Partnership Works
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Initial Consultation',
                  description:
                    'We meet with your team to understand your patient population, scheduling needs, volume expectations, and any specific requirements your facility has for transportation providers.',
                },
                {
                  step: '2',
                  title: 'Custom Transportation Plan',
                  description:
                    'We design a tailored transportation plan that integrates with your facility\'s workflow. This includes scheduling protocols, communication procedures, designated pickup/drop-off points, and billing arrangements.',
                },
                {
                  step: '3',
                  title: 'Onboarding and Training',
                  description:
                    'Your staff receives a brief training on how to request rides, track patient transportation, and communicate with our dispatch team. We assign a dedicated account manager as your single point of contact.',
                },
                {
                  step: '4',
                  title: 'Ongoing Service and Reporting',
                  description:
                    'We provide reliable daily transportation and share monthly reports on ride volume, on-time performance, and patient feedback. Regular check-ins ensure the partnership continues to meet your evolving needs.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-10">
              Facilities We Partner With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Hospitals',
                'Nursing Homes',
                'Dialysis Centers',
                'Clinics',
                'Assisted Living',
                'Rehabilitation Centers',
                'Mental Health Facilities',
                'Home Health Agencies',
              ].map((facility) => (
                <div
                  key={facility}
                  className="flex items-center gap-2 bg-white p-4 rounded-lg border border-border justify-center"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section id="inquiry-form" className="section-padding bg-white scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Submit a Partnership Inquiry
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and our partnerships team will be in touch within one
                business day. You can also reach us directly at{' '}
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-primary font-medium hover:underline"
                >
                  {BUSINESS_EMAIL}
                </a>
                .
              </p>
            </div>

            <PartnerInquiryForm />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Ready to Discuss a Partnership?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Our partnerships team is available to discuss how {SITE_NAME} can support your
              facility&apos;s patient transportation needs. Call us or send us a message.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors w-full sm:w-auto"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
