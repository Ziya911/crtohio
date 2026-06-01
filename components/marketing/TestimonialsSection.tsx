'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { SITE_NAME } from '@/lib/constants'

const TESTIMONIALS = [
  {
    name: 'Margaret T.',
    location: 'Cincinnati, OH',
    rating: 5,
    initials: 'MT',
    color: 'bg-primary',
    quote:
      `${SITE_NAME} has been a lifesaver for my dialysis appointments. The drivers are always on time and so kind. I feel safe every trip.`,
  },
  {
    name: 'James R.',
    location: 'Mason, OH',
    rating: 5,
    initials: 'JR',
    color: 'bg-accent',
    quote:
      `After my hip surgery, I needed reliable wheelchair transportation. ${SITE_NAME} made my recovery appointments stress-free. Highly recommend!`,
  },
  {
    name: 'Sarah M.',
    location: 'West Chester, OH',
    rating: 5,
    initials: 'SM',
    color: 'bg-primary-sky',
    quote:
      'I book rides for my elderly mother regularly. The booking process is simple, and the drivers treat her with genuine care and respect.',
  },
  {
    name: 'Robert K.',
    location: 'Liberty Township, OH',
    rating: 5,
    initials: 'RK',
    color: 'bg-amber-500',
    quote:
      'Exceptional service! The wheelchair-accessible vehicle was clean and well-maintained. The driver was patient and professional throughout.',
  },
  {
    name: 'Linda W.',
    location: 'Hamilton, OH',
    rating: 5,
    initials: 'LW',
    color: 'bg-rose-500',
    quote:
      `As a hospital case manager, I refer patients to ${SITE_NAME} regularly. They consistently deliver reliable, compassionate transportation.`,
  },
  {
    name: 'David P.',
    location: 'Middletown, OH',
    rating: 5,
    initials: 'DP',
    color: 'bg-indigo-500',
    quote:
      `My father needs weekly rides to his cardiologist. ${SITE_NAME} has never missed a pickup. The peace of mind they provide is priceless.`,
  },
  {
    name: 'Nancy H.',
    location: 'Fairfield, OH',
    rating: 5,
    initials: 'NH',
    color: 'bg-teal-500',
    quote:
      `Switching to ${SITE_NAME} was the best decision for our facility. Their professionalism and reliability have been outstanding from day one.`,
  },
  {
    name: 'Carlos G.',
    location: 'Norwood, OH',
    rating: 5,
    initials: 'CG',
    color: 'bg-orange-500',
    quote:
      `The drivers are incredibly respectful and the vehicles are always spotless. I recommend ${SITE_NAME} to everyone at our senior center.`,
  },
]

const CLONE_COUNT = 2
const GAP = 20
const AUTO_PLAY_MS = 5000

export function TestimonialsSection() {
  const N = TESTIMONIALS.length
  const [trackIndex, setTrackIndex] = useState(CLONE_COUNT)
  const [smooth, setSmooth] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extended array: [clone last 2] + [all real] + [clone first 2]
  const extended = [
    ...TESTIMONIALS.slice(-CLONE_COUNT),
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, CLONE_COUNT),
  ]

  // Measure card width based on container
  useEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const isMd = window.matchMedia('(min-width: 768px)').matches
      const count = isMd ? 3 : 1
      setVisibleCount(count)
      setCardWidth((w - GAP * (count - 1)) / count)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // translateX: position trackIndex in the center slot
  const translateX =
    visibleCount === 3
      ? -(trackIndex - 1) * (cardWidth + GAP)
      : -trackIndex * (cardWidth + GAP)

  // Real index for dot highlighting (0-based into TESTIMONIALS)
  const realIndex = ((trackIndex - CLONE_COUNT) % N + N) % N

  const goNext = useCallback(() => {
    setSmooth(true)
    setTrackIndex((prev) => prev + 1)
  }, [])

  const goPrev = useCallback(() => {
    setSmooth(true)
    setTrackIndex((prev) => prev - 1)
  }, [])

  const goTo = useCallback((index: number) => {
    setSmooth(true)
    setTrackIndex(index + CLONE_COUNT)
  }, [])

  // Infinite loop: snap back to real position after reaching a clone
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget) return
      if (trackIndex >= N + CLONE_COUNT) {
        setSmooth(false)
        setTrackIndex(CLONE_COUNT)
      } else if (trackIndex < CLONE_COUNT) {
        setSmooth(false)
        setTrackIndex(N + CLONE_COUNT - 1)
      }
    },
    [trackIndex, N]
  )

  // Re-enable transitions after instant snap
  useEffect(() => {
    if (!smooth) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSmooth(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [smooth])

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, AUTO_PLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, goNext])

  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-[#052d52] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative">
        <MotionWrapper variant="fadeUp" className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider mb-3 px-3 py-1 bg-white/10 rounded-full">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            What Our Riders Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real experiences from the people we are honored to serve.
          </p>
        </MotionWrapper>

        {/* Carousel */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative px-12 md:px-14">
            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Track viewport */}
            <div ref={containerRef} className="overflow-hidden py-4">
              <div
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(${cardWidth ? translateX : 0}px)`,
                  transition: smooth
                    ? 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extended.map((testimonial, idx) => {
                  const isCenter = idx === trackIndex
                  const isAdj =
                    idx === trackIndex - 1 || idx === trackIndex + 1

                  return (
                    <div
                      key={idx}
                      className="shrink-0"
                      style={{
                        width: cardWidth || '33.333%',
                        transform: `scale(${isCenter ? 1 : 0.92}) translateY(${isCenter ? -8 : 0}px)`,
                        opacity: isCenter ? 1 : isAdj ? 0.55 : 0.3,
                        transition: smooth
                          ? 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.65s ease'
                          : 'none',
                      }}
                    >
                      <div
                        className={`relative flex flex-col h-full p-6 md:p-7 rounded-3xl border transition-colors duration-500 ${
                          isCenter
                            ? 'bg-white/[0.14] backdrop-blur-md border-accent/30 shadow-xl shadow-accent/10'
                            : 'bg-white/[0.06] backdrop-blur-sm border-white/10'
                        }`}
                      >
                        <Quote
                          className={`h-8 w-8 mb-4 transition-colors duration-500 ${
                            isCenter ? 'text-accent/40' : 'text-white/15'
                          }`}
                        />

                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors duration-500 ${
                                isCenter
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-amber-400/50 text-amber-400/50'
                              }`}
                            />
                          ))}
                        </div>

                        <blockquote
                          className={`leading-relaxed mb-6 flex-1 text-[15px] transition-colors duration-500 ${
                            isCenter ? 'text-white/90 font-medium' : 'text-white/50'
                          }`}
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                          <div
                            className={`flex items-center justify-center w-11 h-11 ${testimonial.color} text-white font-semibold rounded-full text-sm shadow-lg transition-opacity duration-500 ${
                              !isCenter ? 'opacity-60' : ''
                            }`}
                          >
                            {testimonial.initials}
                          </div>
                          <div>
                            <p
                              className={`font-semibold text-sm transition-colors duration-500 ${
                                isCenter ? 'text-white' : 'text-white/60'
                              }`}
                            >
                              {testimonial.name}
                            </p>
                            <p
                              className={`text-xs transition-colors duration-500 ${
                                isCenter ? 'text-white/50' : 'text-white/30'
                              }`}
                            >
                              {testimonial.location}
                            </p>
                          </div>
                        </div>

                        {/* Accent glow on center card */}
                        <div
                          className={`absolute -inset-px rounded-3xl bg-gradient-to-b from-accent/20 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${
                            isCenter ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className="relative p-1"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === realIndex
                      ? 'w-8 h-3 bg-accent'
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
                {index === realIndex && !isPaused && (
                  <motion.span
                    className="absolute inset-1 rounded-full bg-accent-light origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTO_PLAY_MS / 1000, ease: 'linear' }}
                    key={`progress-${realIndex}-${trackIndex}`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
