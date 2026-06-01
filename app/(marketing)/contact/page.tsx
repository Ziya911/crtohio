import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare,
} from 'lucide-react'
import { ContactForm } from '@/components/marketing/ContactForm'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  EMERGENCY_DISCLAIMER,
} from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. Call us, email us, or fill out our contact form. We are here to help with your non-emergency medical transportation needs in Ohio.`,
  path: '/contact',
})

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]

const CONTACT_INFO = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Phone',
    value: BUSINESS_PHONE,
    href: `tel:${BUSINESS_PHONE.replace(/\D/g, '')}`,
    description: 'Call us for immediate assistance',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    description: 'Send us a message anytime',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Location',
    value: BUSINESS_ADDRESS,
    href: undefined,
    description: 'Serving Greater Cincinnati & Southwest Ohio',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Business Hours',
    value: BUSINESS_HOURS,
    href: undefined,
    description: 'Dispatch available during business hours',
  },
]

export default function ContactPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-sky/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left - Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 text-white text-sm font-semibold rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                <MessageSquare className="h-4 w-4" />
                Get in Touch
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Have a question about our services or need help booking a ride?
                We&apos;re here to help. Reach out using the form below or contact us directly.
              </p>
            </div>

            {/* Right - Contact cards */}
            <div className="w-full max-w-sm space-y-4">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Call Us</p>
                  <p className="font-heading font-bold text-white">{BUSINESS_PHONE}</p>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email Us</p>
                  <p className="font-heading font-bold text-white">{BUSINESS_EMAIL}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="font-heading text-2xl font-extrabold text-primary mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you within one business day.
                </p>
                <ContactForm />
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2">
                <div className="sticky top-28">
                  <h2 className="font-heading text-2xl font-extrabold text-primary mb-2">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Prefer to reach out directly? Here is how you can contact us.
                  </p>

                  <div className="space-y-6 mb-10">
                    {CONTACT_INFO.map((info) => (
                      <div key={info.label} className="card-hover flex items-start gap-4 p-4 rounded-xl">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary-light text-primary rounded-xl shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary mb-0.5">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-primary font-medium hover:text-primary-dark transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-primary font-medium">{info.value}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Emergency Notice */}
                  <div className="bg-emergency-light border border-emergency/20 rounded-xl p-5">
                    <p className="text-sm font-semibold text-emergency mb-1">
                      Medical Emergency?
                    </p>
                    <p className="text-sm text-primary">
                      {EMERGENCY_DISCLAIMER}
                    </p>
                  </div>

                  {/* Quick Book CTA */}
                  <div className="mt-8 bg-muted rounded-xl p-6 text-center">
                    <p className="font-semibold text-primary mb-2">
                      Need a ride instead?
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Skip the form and book your medical transportation directly.
                    </p>
                    <Link
                      href="/book"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors"
                    >
                      Book a Ride
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP PLACEHOLDER ===== */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl font-extrabold text-primary mb-6">
              Our Service Area
            </h2>
            <div className="aspect-[16/6] md:aspect-[16/5] rounded-2xl border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d200000!2d-84.5120!3d39.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${SITE_NAME} Service Area — Greater Cincinnati, Ohio`}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Schedule your non-emergency medical transportation in just a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-semibold rounded-xl transition-colors shadow-lg"
            >
              Book a Ride Now
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
