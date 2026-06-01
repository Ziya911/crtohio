import Link from 'next/link'
import { ArrowRight, Phone, ChevronDown, HelpCircle } from 'lucide-react'
import { generatePageMetadata, generateFaqJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_EMAIL, EMERGENCY_DISCLAIMER } from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'Frequently Asked Questions',
  description: `Find answers to common questions about ${SITE_NAME}'s non-emergency medical transportation services, booking process, insurance, Medicaid, wheelchair access, and more.`,
  path: '/faq',
})

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq' },
]

const FAQS = [
  {
    category: 'Booking & Scheduling',
    questions: [
      {
        question: `How do I book a ride with ${SITE_NAME}?`,
        answer:
          'You can book a ride through our online booking form on this website or by calling us directly. Our online form walks you through a simple step-by-step process where you provide your pickup and drop-off details, transportation needs, and insurance information. No account is required to book.',
      },
      {
        question: 'How far in advance should I book my ride?',
        answer:
          'We recommend booking at least 24 to 48 hours in advance to ensure availability, especially for wheelchair transportation. However, we do our best to accommodate same-day and next-day requests when possible. For recurring rides (such as dialysis), we suggest scheduling all appointments at once for guaranteed availability.',
      },
      {
        question: 'Can I schedule recurring rides for regular appointments?',
        answer:
          'Yes! We offer recurring ride scheduling for patients with regular appointments, such as dialysis treatments, physical therapy sessions, or ongoing specialist visits. You can set up daily, weekly, or custom recurring schedules. Contact our dispatch team to set up your recurring ride plan.',
      },
      {
        question: 'Is my booking confirmed immediately after I submit the form?',
        answer:
          'No. When you submit a booking request, our dispatch team reviews the details and confirms availability. You will receive a confirmation email or phone call once your ride has been confirmed. All bookings are requests until confirmed by our team.',
      },
      {
        question: 'Can I book a ride for someone else (a family member or patient)?',
        answer:
          'Absolutely. Many of our bookings are made by family members, caregivers, or healthcare facility staff on behalf of patients. Simply provide the passenger\'s information during the booking process.',
      },
      {
        question: 'Do you provide same-day rides?',
        answer:
          'We do our best to accommodate same-day ride requests when our schedule permits. However, same-day availability is not guaranteed, especially for wheelchair transportation which requires specific vehicles. For the best availability, we recommend booking at least 24 to 48 hours in advance. If you need a same-day ride, call us directly and we will do everything we can to help.',
      },
    ],
  },
  {
    category: 'Insurance & Payment',
    questions: [
      {
        question: 'Do you accept Medicaid for transportation?',
        answer:
          'Yes, we accept Medicaid as a form of payment for eligible non-emergency medical transportation. You will need to provide your Medicaid ID number during the booking process. Please note that Medicaid coverage for transportation varies by plan and situation, so we recommend verifying your benefits with your Medicaid provider.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept Medicaid, private insurance, facility billing (for healthcare partners), and private pay (self-pay). For private pay rides, we offer transparent pricing with no hidden fees. Contact us for specific payment details and options.',
      },
      {
        question: 'How much does a ride cost?',
        answer:
          'Pricing depends on the distance, type of transportation (ambulatory or wheelchair), and any additional services needed. We offer transparent pricing starting with a base fare plus a per-mile rate. You can get a free estimate using our online booking tool, which calculates the cost based on your pickup and drop-off locations. Visit our Pricing page for detailed rate information.',
      },
    ],
  },
  {
    category: 'Services & Vehicles',
    questions: [
      {
        question: 'Is this a taxi service?',
        answer:
          `No, ${SITE_NAME} is not a taxi service. We are a licensed non-emergency medical transportation (NEMT) provider. Our services are specifically designed for patients who need safe, reliable transportation to and from medical appointments, treatments, and healthcare facilities. Unlike taxis, our drivers are trained in passenger assistance, wheelchair securement, and medical sensitivity.`,
      },
      {
        question: 'Do you provide wheelchair-accessible transportation?',
        answer:
          'Yes, we have a fleet of ADA-compliant wheelchair-accessible vehicles equipped with ramps, lifts, and secure tie-down systems. Whether you use a manual or powered wheelchair, our drivers are trained to safely assist you. Please let us know about your wheelchair type when booking so we can assign the appropriate vehicle.',
      },
      {
        question: 'What types of medical appointments do you provide rides for?',
        answer:
          'We provide transportation for all types of non-emergency medical appointments, including doctor visits, specialist consultations, dialysis treatments, physical therapy, chemotherapy, hospital discharges, nursing home transfers, lab work, imaging appointments, and more. We do not provide emergency ambulance services. For medical emergencies, always call 911.',
      },
      {
        question: 'Can a companion ride along with the patient?',
        answer:
          'Yes, one companion (family member, caregiver, or aide) can accompany the patient at no additional charge in most cases. Please indicate during the booking process that a companion will be riding along so we can ensure adequate space in the vehicle.',
      },
      {
        question: 'Do your drivers help patients to and from the door?',
        answer:
          'Yes, our drivers provide door-to-door assistance. This includes helping passengers from their door to the vehicle and from the vehicle to the entrance of their medical facility. For passengers who need additional assistance navigating stairs or walking through buildings, we offer door assist and building assist services for a small additional fee.',
      },
    ],
  },
  {
    category: 'Cancellations & Policies',
    questions: [
      {
        question: 'What is your cancellation policy?',
        answer:
          'We ask that you cancel or reschedule your ride at least 4 hours before the scheduled pickup time. Late cancellations and no-shows may be subject to a cancellation fee. We understand that medical situations can change unexpectedly, so please contact us as soon as possible if you need to make changes.',
      },
      {
        question: 'What areas do you serve?',
        answer:
          'We serve the Greater Cincinnati area and surrounding Southwest Ohio communities, including Cincinnati, Mason, West Chester, Liberty Township, Hamilton, Middletown, and nearby areas. If you are unsure whether we service your area, please contact us and we will be happy to check.',
      },
      {
        question: 'What happens if my appointment runs late?',
        answer:
          'We understand that medical appointments do not always run on schedule. For round-trip bookings, we include a reasonable waiting period. If your appointment runs significantly longer than expected, please call our dispatch team to update your pickup time. Additional waiting time may incur a per-minute waiting fee.',
      },
      {
        question: `How can I contact ${SITE_NAME} if I have more questions?`,
        answer:
          `You can reach us by phone at ${BUSINESS_PHONE}, by email at ${BUSINESS_EMAIL}, or through our Contact page. Our dispatch team is available during business hours to answer questions, help with bookings, or address any concerns.`,
      },
    ],
  },
]

const ALL_FAQS = FAQS.flatMap((category) =>
  category.questions.map((q) => ({
    question: q.question,
    answer: q.answer,
  }))
)

export default function FaqPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(BREADCRUMBS)
  const faqJsonLd = generateFaqJsonLd(ALL_FAQS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our medical transportation services,
            booking process, insurance, and more.
          </p>
        </div>
      </section>

      {/* ===== FAQ SECTIONS ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {FAQS.map((category) => (
              <div key={category.category} className="mb-12 last:mb-0">
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-6 pb-3 border-b border-border">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq) => (
                    <details
                      key={faq.question}
                      className="group bg-muted rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                    >
                      <summary className="flex items-start gap-3 p-5 cursor-pointer list-none select-none hover:bg-primary-light/50 transition-colors [&::-webkit-details-marker]:hidden">
                        <ChevronDown className="h-5 w-5 text-primary shrink-0 mt-0.5 transition-transform group-open:rotate-180" />
                        <span className="font-semibold text-primary leading-snug pr-2">
                          {faq.question}
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pl-13">
                        <div className="pl-8 border-l-2 border-primary/20">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STILL HAVE QUESTIONS ===== */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our friendly team is here to help. Reach out to us and we will get back
              to you as quickly as possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 text-primary font-semibold rounded-xl border border-border transition-colors"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Schedule your non-emergency medical transportation in just a few minutes.
            No account required.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-semibold rounded-xl transition-colors shadow-lg"
          >
            Book a Ride Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
