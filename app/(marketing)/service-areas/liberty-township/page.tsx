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
  title: 'Liberty Township Medical Transportation Services — NEMT in Liberty Township, OH',
  description:
    'Non-emergency medical transportation in Liberty Township, Ohio. Serving Butler County with reliable rides to Atrium Medical Center, local doctors, and Cincinnati-area hospitals. Book your ride today.',
  path: '/service-areas/liberty-township',
})

const NEARBY_AREAS = [
  'Liberty Township Center',
  'Princeton Road Area',
  'Millikin Road Corridor',
  'Kyles Station',
  'Bethany Village',
  'Trenton (nearby)',
  'Monroe (nearby)',
  'Fairfield Township (nearby)',
  'Butler County',
  'Cincinnati Premium Outlets Area',
  'State Route 4 Corridor',
  'Liberty Way',
]

const MEDICAL_FACILITIES = [
  'Atrium Medical Center — Middletown',
  'West Chester Hospital — UC Health',
  'Mercy Health — Fairfield Hospital',
  'Liberty Township Medical Offices',
  'Premier Health Urgent Care',
  'Butler Behavioral Health Services',
]

export default function LibertyTownshipPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/service-areas' },
    { name: 'Liberty Township', href: '/service-areas/liberty-township' },
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
              <span className="text-white">Liberty Township</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              Liberty Township, Butler County, Ohio
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
              Liberty Township Medical Transportation Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              Trusted non-emergency medical transportation for Liberty Township residents.
              We connect you to Atrium Medical Center, West Chester Hospital, Cincinnati
              medical facilities, and local healthcare providers with safe, on-time service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-white/90 text-primary font-semibold rounded-lg transition-colors shadow-sm"
              >
                Book Your Ride in Liberty Township
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

      {/* About NEMT in Liberty Township */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
              About Non-Emergency Medical Transportation in Liberty Township
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Liberty Township is a thriving community in Butler County that has experienced
                tremendous residential growth over the past two decades. Located between West
                Chester and Monroe along the I-75 corridor, the township offers a suburban
                quality of life with growing amenities -- including the Liberty Center shopping
                and dining district. However, like many fast-growing suburban communities,
                Liberty Township residents often need to travel outside the immediate area for
                specialized medical care, particularly to hospitals in Middletown, West Chester,
                and downtown Cincinnati.
              </p>
              <p>
                For patients who rely on regular medical visits -- whether it is dialysis
                treatments at a nearby center, follow-up appointments after surgery at Atrium
                Medical Center in Middletown, or specialist consultations at UC Medical Center
                in Cincinnati -- having consistent, dependable transportation can make the
                difference between keeping and missing appointments. {SITE_NAME} serves Liberty
                Township with dedicated medical transportation that puts patient needs first. Our
                drivers are trained in passenger assistance, our vehicles are ADA-accessible,
                and our scheduling is built to accommodate the recurring nature of medical
                transportation. Whether you live near Princeton Road, along the Millikin Road
                corridor, or anywhere in the township, we are here to help.
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
                Medical Facilities Serving Liberty Township
              </h2>
              <p className="text-lg text-muted-foreground">
                We transport Liberty Township residents to these facilities and medical offices
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
              We also transport patients to Greater Cincinnati hospitals, dialysis clinics,
              rehabilitation centers, and specialty medical offices throughout the region.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Services Available in Liberty Township
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Liberty Township residents have access to all of our NEMT services,
              from one-time medical appointments to ongoing recurring rides.
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

      {/* Why Liberty Township Residents Choose Care Ride */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary text-center mb-10">
              Why Liberty Township Residents Choose {SITE_NAME}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Strategic Location Coverage
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Liberty Township sits between major medical hubs in Middletown and West
                    Chester. Our drivers know the fastest routes along I-75 and State Route 4
                    to get you to Atrium Medical Center, West Chester Hospital, or any facility
                    in the region without delays.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Growing Community, Growing Needs
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    As Liberty Township&apos;s population grows, so does the demand for
                    accessible healthcare transportation. We have scaled our services to match,
                    ensuring that even as the community expands, residents have dependable
                    access to medical transportation when they need it most.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Compassionate Patient Care
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Medical transportation is about more than just driving. Our team treats
                    every passenger with compassion and dignity, providing door-to-door
                    assistance, helping with mobility devices, and ensuring a comfortable
                    ride from your home to your medical appointment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Affordable and Transparent
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We accept private insurance and facility contracts. Self-pay riders get
                    transparent pricing with estimates provided before booking.
                    No surge pricing, no hidden fees, no surprises.
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
              Liberty Township Area Coverage
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We serve all of Liberty Township and the surrounding Butler County communities.
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
              Book Your Ride in Liberty Township
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Liberty Township residents deserve reliable medical transportation. Book online
              in minutes or call our dispatch team to schedule your next ride.
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
