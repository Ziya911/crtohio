'use client'

import Image from 'next/image'
import {
  Clock,
  Users,
  Car,
  CreditCard,
  CalendarCheck,
  Heart,
} from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'
import { TiltCard } from '@/components/shared/TiltCard'

const WHY_CHOOSE_US = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Reliable & On-Time',
    description:
      'We understand medical appointments are time-sensitive. Count on us to get you there on schedule.',
    gradient: 'from-primary to-primary-sky',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Professional Drivers',
    description:
      'Our trained, courteous drivers are background-checked and experienced in assisting passengers.',
    gradient: 'from-accent to-accent-dark',
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: 'ADA-Compliant Vehicles',
    description:
      'Wheelchair-accessible vehicles equipped with ramps, lifts, and secure tie-down systems.',
    gradient: 'from-primary-sky to-primary',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Flexible Payment Options',
    description:
      'We work with private insurance, facility billing, and private pay to make transportation accessible.',
    gradient: 'from-accent-dark to-accent',
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: 'Easy Online Booking',
    description:
      'Book your ride online in minutes with our simple step-by-step form, or call us directly.',
    gradient: 'from-primary to-accent',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Compassionate Care',
    description:
      'We treat every passenger like family. Our team is dedicated to comfortable, stress-free rides.',
    gradient: 'from-accent to-primary-sky',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.02] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/[0.02] rounded-full" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image */}
          <MotionWrapper variant="fadeLeft">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/nurse-patient.jpg"
                  alt="Compassionate care - healthcare worker assisting a patient"
                  width={600}
                  height={500}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
              </div>
              {/* Accent decoration */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-3xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-3xl -z-10" />
            </div>
          </MotionWrapper>

          {/* Right side - Features grid */}
          <div>
            <MotionWrapper variant="fadeRight" className="mb-10">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3 px-3 py-1 bg-primary/5 rounded-full">
                Why Choose Us
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Your Trusted Transportation{' '}
                <span className="text-gradient-primary">
                  Partner
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We go above and beyond to ensure every ride is safe, comfortable, and reliable.
              </p>
            </MotionWrapper>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_CHOOSE_US.map((item) => (
                <StaggerItem key={item.title}>
                  <TiltCard tiltDegree={5} className="group h-full">
                    <div className="flex flex-col h-full p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-border/60 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                      <div className={`flex items-center justify-center w-11 h-11 bg-gradient-to-br ${item.gradient} text-white rounded-xl mb-3 shadow-sm`}>
                        {item.icon}
                      </div>
                      <h3 className="font-heading text-base font-bold text-primary mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
