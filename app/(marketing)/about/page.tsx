import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Heart,
  Shield,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  Accessibility,
  Car,
  Target,
  Handshake,
  Award,
  MapPin,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, SERVICE_AREAS } from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: `Learn about ${SITE_NAME} — our mission, values, and commitment to providing safe, reliable non-emergency medical transportation across Ohio.`,
  path: '/about',
})

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
]

const VALUES = [
  {
    icon: <Shield className="h-7 w-7" />,
    title: 'Safety First',
    description:
      'Every vehicle is meticulously maintained, every driver thoroughly vetted. Your safety is the foundation of everything we do.',
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: 'Compassion',
    description:
      'We understand the vulnerability of medical travel. Our team treats every passenger with the kindness and respect they deserve.',
  },
  {
    icon: <Clock className="h-7 w-7" />,
    title: 'Reliability',
    description:
      'Medical appointments cannot wait. We are committed to on-time pickups and dependable service you can count on.',
  },
  {
    icon: <Target className="h-7 w-7" />,
    title: 'Accessibility',
    description:
      'Transportation should never be a barrier to healthcare. We provide ADA-compliant vehicles and assistance for all mobility levels.',
  },
  {
    icon: <Handshake className="h-7 w-7" />,
    title: 'Integrity',
    description:
      'Transparent pricing, honest communication, and a genuine commitment to serving our community with the highest ethical standards.',
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: 'Excellence',
    description:
      'We continuously strive to improve our service, train our team, and exceed the expectations of those we serve.',
  },
]

const WHO_WE_SERVE = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Patients & Individuals',
    description:
      'Whether you need a ride to a routine check-up, dialysis treatment, physical therapy, or a specialist appointment, we are here to get you there safely.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Families & Caregivers',
    description:
      'We give families peace of mind knowing their loved ones are in safe, professional hands during medical transportation.',
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: 'Healthcare Facilities',
    description:
      'Hospitals, nursing homes, dialysis centers, and clinics partner with us for reliable patient transportation and discharge services.',
  },
]

const FLEET_FEATURES = [
  'Wheelchair-accessible vehicles with ramps and lifts',
  'Secure wheelchair tie-down and restraint systems',
  'Climate-controlled interiors for passenger comfort',
  'Regular safety inspections and maintenance schedules',
  'GPS-equipped for route optimization and tracking',
  'Clean, sanitized vehicles for every ride',
]

export default function AboutPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(BREADCRUMBS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== BREADCRUMB ===== */}
      <nav
        aria-label="Breadcrumb"
        className="bg-muted border-b border-border"
      >
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

      {/* ===== HERO WITH BACKGROUND IMAGE ===== */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-ambulance.jpg"
            alt="Professional medical transportation services"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Dark dramatic gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-heading/90 via-primary/80 to-primary-dark/85" />
          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        {/* Animated decorative orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-primary-sky/8 rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />

        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/10">
              <ShieldCheck className="h-4 w-4" />
              Trusted NEMT Provider in Ohio
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Trusted Partner in Medical Transportation
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mb-10">
              We are a dedicated non-emergency medical transportation provider serving the
              Greater Cincinnati area and surrounding Ohio communities. Our mission is simple:
              get you to your medical appointments safely, comfortably, and on time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="animate-pulse-glow inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-white/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/40"
              >
                Book a Ride
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION (Split: Text Left, Image Right) ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full mb-4" />
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Our Mission
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
                  Bridging the Gap Between Patients and Care
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every year, millions of Americans miss medical appointments due to
                  transportation barriers. At {SITE_NAME}, we believe that
                  access to reliable transportation should never stand between a person and
                  the healthcare they need.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded with a commitment to serve our local community, we provide
                  professional non-emergency medical transportation across Southwest Ohio.
                  Our team understands the unique needs of medical passengers, from those
                  requiring wheelchair-accessible vehicles to patients needing recurring
                  rides for dialysis treatments.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you are heading to a routine check-up, a specialist appointment,
                  or returning home after a hospital stay, {SITE_NAME} is here to ensure your
                  journey is safe, comfortable, and stress-free.
                </p>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary-sky/5 border border-primary/10 rounded-xl">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-sky">6+</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cities Served</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary-sky/5 border border-primary/10 rounded-xl">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-sky">24/7</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Availability</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary-sky/5 border border-primary/10 rounded-xl">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-sky">ADA</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Compliant</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Glowing accent dot decoration */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent/20 rounded-full blur-md" />
                <div className="img-zoom relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/about-team.jpg"
                    alt={`${SITE_NAME} team of healthcare and transportation professionals`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-accent/30 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES (Image + Grid) ===== */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          {/* Section header with image accent */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-end mb-12 md:mb-16">
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Our Values
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                What Drives Us Every Day
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Our core values guide every ride, every interaction, and every decision we make.
                They are not just words on a page — they are the standards we hold ourselves to.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="img-zoom relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/caring-hands.jpg"
                  alt="Caring hands representing our commitment to compassionate transportation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="card-hover flex flex-col p-6 md:p-8 bg-white rounded-2xl border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-primary-light text-primary rounded-xl mb-5">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO WE SERVE (Split: Image Left, Cards Right) ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Image column */}
              <div className="relative">
                <div className="img-zoom relative aspect-3/4 sm:aspect-4/5 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/nurse-patient.jpg"
                    alt="Nurse assisting a patient, representing the care and attention we bring to medical transportation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-full">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold text-primary">Trusted Care</p>
                      <p className="text-sm text-muted-foreground">By patients & facilities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content column */}
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Who We Serve
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                  Transportation for Everyone Who Needs It
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We serve individuals, families, and healthcare organizations across Southwest Ohio.
                </p>
                <div className="space-y-5">
                  {WHO_WE_SERVE.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 p-5 bg-muted rounded-xl hover:bg-primary-light transition-colors duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-full shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-primary mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR FLEET (Split: Text Left, Image Right) ===== */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Our Fleet
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-6">
                  Safe, Comfortable, ADA-Compliant Vehicles
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our fleet of well-maintained vehicles is designed to accommodate passengers
                  of all mobility levels. Every vehicle meets ADA compliance standards and
                  undergoes regular safety inspections.
                </p>
                <ul className="space-y-3">
                  {FLEET_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="img-zoom relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/elderly-happy.jpg"
                    alt="Happy elderly couple representing our commitment to comfortable and joyful transportation experiences"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-accent/20 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Where We Operate
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Proudly Serving Southwest Ohio
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We provide non-emergency medical transportation across the Greater Cincinnati
              area and surrounding communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {SERVICE_AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-primary-light text-foreground hover:text-primary rounded-full text-sm font-medium transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {area.name}
                </Link>
              ))}
            </div>
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              View All Service Areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Background image for CTA */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-medical.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-dark/95 to-primary/90" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Experience the {SITE_NAME} Difference?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Book your ride today and discover why families and facilities trust us with
            their medical transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-semibold rounded-xl transition-colors shadow-lg"
            >
              Book a Ride
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
