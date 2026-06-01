'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, PhoneCall, Car } from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'

const STEPS = [
  {
    step: 1,
    icon: <CalendarCheck className="h-8 w-8" />,
    title: 'Book Online or Call',
    description:
      'Use our easy online form or call us directly to request your ride. Tell us where and when you need to go.',
    color: 'from-primary to-primary-sky',
    bgColor: 'bg-primary/5',
  },
  {
    step: 2,
    icon: <PhoneCall className="h-8 w-8" />,
    title: 'We Confirm Your Ride',
    description:
      'Our team reviews your request, confirms the details, and sends you a confirmation with your ride information.',
    color: 'from-accent to-accent-dark',
    bgColor: 'bg-accent/5',
  },
  {
    step: 3,
    icon: <Car className="h-8 w-8" />,
    title: 'We Pick You Up',
    description:
      'A professional driver arrives at your door on schedule, assists you into the vehicle, and gets you there safely.',
    color: 'from-primary-sky to-primary',
    bgColor: 'bg-primary-sky/5',
  },
]

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#f7faff] to-[#f0f7ff] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

      <div className="container-custom relative">
        <MotionWrapper variant="fadeUp" className="text-center mb-14 md:mb-20">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3 px-3 py-1 bg-primary/5 rounded-full">
            How It Works
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5">
            Getting a Ride Is{' '}
            <span className="text-gradient-accent">
              Easy
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to safe, reliable medical transportation.
          </p>
        </MotionWrapper>

        <StaggerContainer staggerDelay={0.15} className="relative max-w-5xl mx-auto">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary-sky/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ originX: 0 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {STEPS.map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative flex flex-col items-center text-center group">
                  {/* Step number circle */}
                  <div className="relative z-10 mb-6">
                    <div className={`flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-white text-primary font-bold text-sm rounded-full shadow-md border-2 border-primary/10">
                      {item.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 rounded-2xl ${item.bgColor} w-full`}>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
