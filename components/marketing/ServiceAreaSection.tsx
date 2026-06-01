'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'
import { SERVICE_AREAS } from '@/lib/constants'

export function ServiceAreaSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <MotionWrapper variant="fadeLeft">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider mb-3 px-3 py-1 bg-primary/5 rounded-full">
                Service Areas
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-5">
                Serving Greater Cincinnati{' '}
                <span className="text-gradient-primary">
                  & Beyond
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We provide non-emergency medical transportation across Southwest Ohio, covering
                major cities and surrounding communities.
              </p>
            </MotionWrapper>

            <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-3 mb-8">
              {SERVICE_AREAS.map((area) => (
                <StaggerItem key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    className="flex items-center gap-2.5 p-3.5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <MapPin className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <MotionWrapper variant="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/service-areas"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-primary font-semibold bg-primary/5 hover:bg-primary/10 rounded-xl transition-all duration-300"
                >
                  View All Service Areas
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </MotionWrapper>
          </div>

          {/* Right - Image */}
          <MotionWrapper variant="fadeRight">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/city-road.jpg"
                  alt="Cincinnati area - serving the Greater Cincinnati metropolitan area"
                  width={600}
                  height={450}
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                {/* Overlay card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <p className="text-sm font-medium text-foreground">
                      Serving 6+ cities across Southwest Ohio with door-to-door service
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 w-28 h-28 bg-accent/10 rounded-3xl -z-10" />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
