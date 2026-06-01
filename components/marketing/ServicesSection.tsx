'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  PersonStanding,
  Accessibility,
  HeartPulse,
  Stethoscope,
  Hospital,
  Building2,
  Wallet,
  CalendarClock,
} from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'
import { SERVICES } from '@/lib/constants'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  PersonStanding: <PersonStanding className="h-6 w-6" />,
  Accessibility: <Accessibility className="h-6 w-6" />,
  HeartPulse: <HeartPulse className="h-6 w-6" />,
  Stethoscope: <Stethoscope className="h-6 w-6" />,
  Hospital: <Hospital className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Wallet: <Wallet className="h-6 w-6" />,
  CalendarClock: <CalendarClock className="h-6 w-6" />,
}

const SERVICE_IMAGES: Record<string, string> = {
  ambulatory: '/images/elderly-happy.jpg',
  wheelchair: '/images/wheelchair-care.jpg',
  dialysis: '/images/service-dialysis.jpg',
  'medical-appointments': '/images/doctor-patient.jpg',
  'hospital-discharge': '/images/hospital.jpg',
  facility: '/images/about-team.jpg',
  'private-pay': '/images/van-transport.jpg',
  recurring: '/images/caring-hands.jpg',
}

export function ServicesSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <MotionWrapper variant="fadeUp" className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3 px-3 py-1 bg-primary/5 rounded-full">
            Our Services
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5">
            Comprehensive Medical{' '}
            <span className="text-gradient-primary">
              Transportation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine doctor visits to recurring dialysis treatments, we provide safe,
            reliable transportation tailored to your medical needs.
          </p>
        </MotionWrapper>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex flex-col h-full bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Service image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[service.slug] || '/images/hero-medical.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm text-primary rounded-xl shadow-sm">
                      {SERVICE_ICONS[service.icon]}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <MotionWrapper variant="fadeUp" delay={0.5} className="text-center mt-12">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-primary font-semibold bg-primary/5 hover:bg-primary/10 rounded-xl transition-all duration-300"
          >
            View All Services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  )
}
