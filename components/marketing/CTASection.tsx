'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { BUSINESS_PHONE } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ambulance.jpg"
          alt="Medical transportation vehicle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712]/90 via-primary/85 to-primary-dark/90" />
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary-sky/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <MotionWrapper variant="fadeUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-accent text-sm font-semibold mb-6 border border-white/10">
                <Sparkles className="h-4 w-4" />
                Book in Under 5 Minutes
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.1}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to Book Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-[#5ee9a5]">
                  Ride?
                </span>
              </h2>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.2}>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg">
                Schedule your non-emergency medical transportation in just a few minutes.
                No account needed — book as a guest instantly.
              </p>
            </MotionWrapper>

            <MotionWrapper variant="fadeUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-white/90 text-primary text-lg font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40 hover:-translate-y-1 animate-pulse-glow"
                >
                  Book a Ride Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Call Us
                </a>
              </div>
            </MotionWrapper>
          </div>

          {/* Right — feature cards */}
          <MotionWrapper variant="fadeUp" delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <CheckCircle2 className="h-6 w-6 text-accent" />,
                  title: 'Easy Scheduling',
                  desc: 'Book online in minutes or call us for immediate help.',
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-primary-sky" />,
                  title: 'Licensed & Insured',
                  desc: 'Fully licensed NEMT provider with comprehensive coverage.',
                },
                {
                  icon: <Clock className="h-6 w-6 text-amber-400" />,
                  title: 'Dispatch Support',
                  desc: 'Dispatch available during business hours. Customer inquiries received 24/7.',
                },
                {
                  icon: <Phone className="h-6 w-6 text-accent-light" />,
                  title: 'Easy Booking',
                  desc: 'Book online in minutes or call us for immediate help.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-5 bg-white/[0.08] backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/[0.14] transition-colors duration-300"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1440 20 1200 0 960 10C720 20 480 40 240 30C120 25 0 10 0 10L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
