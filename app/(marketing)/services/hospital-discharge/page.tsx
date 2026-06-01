import Link from 'next/link'
import Image from 'next/image'
import {
  Hospital,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Shield,
  UserCheck,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'hospital-discharge')!

export const metadata = generatePageMetadata({
  title: `Hospital Discharge Transportation | ${SITE_NAME}`,
  description:
    'Safe, comfortable rides home after hospital stays, surgeries, and outpatient procedures. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/hospital-discharge',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['medical-appointments', 'ambulatory', 'wheelchair'].includes(s.slug)
)

const IMAGE_MAP: Record<string, string> = {
  ambulatory: '/images/elderly-happy.jpg',
  wheelchair: '/images/wheelchair-van.jpg',
  dialysis: '/images/dialysis-treatment.jpg',
  'medical-appointments': '/images/doctor-patient.jpg',
  'hospital-discharge': '/images/hospital-corridor.jpg',
  facility: '/images/medical-team.jpg',
  'private-pay': '/images/transport-vehicle.jpg',
  recurring: '/images/senior-care.jpg',
}

export default function HospitalDischargeServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Safe, comfortable non-emergency medical transportation home after hospital stays, surgeries, and outpatient procedures. Trained drivers provide gentle, patient assistance across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Hospital Discharge', href: '/services/hospital-discharge' },
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
              <span className="text-foreground font-medium">Hospital Discharge</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero — Dark Charcoal with Image */}
      <section className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden">
        <Image
          src="/images/hospital-corridor.jpg"
          alt="Hospital corridor for discharge transportation services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 via-[#1f2937]/85 to-[#111827]/90" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <Hospital className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Hospital Discharge Transportation
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
                Safe, comfortable rides home after hospital stays, surgeries, and outpatient
                procedures. When you are ready to leave the hospital, we are ready to take you home
                with the care and patience your recovery demands.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Hospital Coordination', 'Flexible Timing', 'Door-to-Door'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Hospital Discharge Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-6">
              What Is Hospital Discharge Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hospital discharge transportation is a non-emergency medical transport service that
                provides patients with safe, comfortable rides from the hospital to their home or
                next care destination after an inpatient stay, outpatient procedure, or surgery.
                Hospitals require that patients be picked up by a responsible party upon discharge,
                and when family or friends are unavailable, professional medical transportation fills
                that critical gap.
              </p>
              <p>
                The discharge process can be unpredictable. While hospitals try to provide estimated
                discharge times, the actual release may come earlier or later depending on doctor
                rounds, test results, and administrative processing. {SITE_NAME} works
                closely with hospital discharge planners and social workers to coordinate pickup
                times, and we remain flexible to accommodate the inherent variability of the
                discharge process.
              </p>
              <p>
                Patients being discharged are often in a vulnerable state. They may be recovering
                from surgery, dealing with new mobility limitations, managing pain, or simply
                exhausted from their hospital stay. Our drivers are trained to provide the gentle,
                patient assistance that this situation requires. From helping with personal
                belongings and medical equipment to ensuring a smooth, careful ride home, we treat
                every discharge transport with the sensitivity it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary mb-8">
            Who Benefits from Hospital Discharge Transportation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Patients being discharged after inpatient hospital stays',
              'Individuals recovering from same-day or outpatient surgeries',
              'Patients who received sedation or anesthesia and cannot drive',
              'Seniors without family nearby to provide a ride home',
              'Patients being transferred to rehabilitation or skilled nursing facilities',
              'Individuals discharged from emergency department observation stays',
              'Patients with no personal vehicle or public transit access',
              'Hospital social workers arranging safe discharge plans for patients',
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
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Advance Booking',
                text: 'You, a family member, or the hospital discharge planner contacts us with your expected discharge date, time, and destination.',
              },
              {
                step: '2',
                title: 'Hospital Coordination',
                text: 'We coordinate directly with the hospital to confirm your discharge time and adjust if needed. We stay flexible for schedule changes.',
              },
              {
                step: '3',
                title: 'Gentle Pickup',
                text: 'Your driver meets you at the hospital entrance with your vehicle ready. They assist with belongings, medical equipment, and getting settled.',
              },
              {
                step: '4',
                title: 'Safe Arrival Home',
                text: 'You are driven carefully home. Your driver helps you to the door and ensures you are safely inside before leaving.',
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
            Why Choose {SITE_NAME} for Hospital Discharge?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: HeartHandshake,
                title: 'Patient, Compassionate Care',
                text: 'Our drivers understand that discharge patients may be in pain, groggy from medication, or anxious. We provide the gentle assistance and patience your situation requires.',
              },
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                text: 'Hospital discharges rarely run on schedule. We build in flexibility and coordinate with hospital staff so you are never stranded waiting for a ride.',
              },
              {
                icon: UserCheck,
                title: 'Discharge Planner Friendly',
                text: 'We work seamlessly with hospital social workers and discharge planners. They can book rides on your behalf and coordinate directly with our dispatch team.',
              },
              {
                icon: Shield,
                title: 'Ambulatory and Wheelchair Ready',
                text: 'Whether you are walking out on your own or leaving in a hospital wheelchair, we have the right vehicle ready. Our fleet handles both ambulatory and wheelchair patients.',
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

      {/* Note for Hospitals */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-primary-light border border-primary/20 rounded-xl p-8">
            <h2 className="font-heading text-xl font-extrabold text-primary mb-4">
              For Hospital Discharge Planners
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Are you a hospital social worker or discharge planner looking for a reliable
              transportation partner? {SITE_NAME} works with hospitals throughout the
              Cincinnati metro area to provide timely, safe discharge transport for patients.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We offer direct booking for discharge planners, flexible scheduling that adapts to
              discharge timing changes, and both ambulatory and wheelchair-accessible vehicles. Contact
              us to learn about our facility partnership program.
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Learn About Our Partner Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
            Book Your Hospital Discharge Ride
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Planning ahead for a hospital discharge? Book your ride now and have one less thing
            to worry about on discharge day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-lg"
            >
              Book a Ride Online
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
