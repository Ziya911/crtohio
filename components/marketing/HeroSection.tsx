'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Clock, Users, Star, CheckCircle2 } from 'lucide-react'
import { FloatingElement } from '@/components/shared/FloatingElement'
import { BUSINESS_PHONE, SITE_NAME } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] md:min-h-[92vh] flex items-center">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ambulance.jpg"
          alt={`${SITE_NAME} medical transport vehicle providing safe patient transportation`}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/85 via-[#030712]/70 to-[#030712]/40" />
        {/* Accent color overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 -left-20 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[80px]"
          animate={{ scale: [1.1, 1, 1.1], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content - takes 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass text-white text-sm font-semibold rounded-full mb-6"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              Trusted NEMT Provider in Ohio
              <span className="flex h-2 w-2 relative ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ color: '#FFFFFF' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#bfdbfe] to-[#dbeafe]">Safe &amp; Reliable</span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
                  Medical Transportation
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[6px] bg-accent/40 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </span>{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]">You Can Trust</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl"
            >
              Providing compassionate non-emergency medical transportation across Cincinnati,
              Mason, West Chester, and surrounding Ohio communities. Medicaid accepted.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-primary text-lg font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40 hover:-translate-y-1 animate-pulse-glow"
              >
                Book a Ride
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-white/20 text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Call Us Now
              </a>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              <span className="flex items-center gap-2">
                <span className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 text-[10px] font-bold text-white backdrop-blur-sm">
                      {['JM', 'SR', 'ML', 'TP'][i]}
                    </span>
                  ))}
                </span>
                <span className="font-medium">500+ rides monthly</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">4.9</span>
                <span>rating</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Private Pay Available</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right visual - Floating info cards (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative min-h-[400px]"
          >
            {/* Card cluster */}
            <FloatingElement duration={5} yOffset={12} className="absolute top-4 right-0">
              <div className="glass-white rounded-2xl shadow-2xl p-5 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/15 rounded-xl">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">On-Time Rate</p>
                    <p className="text-2xl font-extrabold text-primary">98.5%</p>
                  </div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement duration={6} delay={1.5} yOffset={10} className="absolute top-1/2 left-0 -translate-y-1/2">
              <div className="glass-white rounded-2xl shadow-2xl p-5 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/15 rounded-xl">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Happy Riders</p>
                    <p className="text-2xl font-extrabold text-primary">10,000+</p>
                  </div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement duration={4.5} delay={3} yOffset={8} className="absolute bottom-4 right-8">
              <div className="glass-white rounded-2xl shadow-2xl px-5 py-4 min-w-[180px]">
                <div className="flex items-center gap-1.5 mb-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-primary">Excellent Service</p>
                <p className="text-xs text-muted-foreground">Based on 200+ reviews</p>
              </div>
            </FloatingElement>

            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-64 h-64 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-full border border-accent/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 30C1440 30 1320 0 1080 15C840 30 720 55 480 40C240 25 120 5 0 15L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
