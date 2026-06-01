'use client'

import { Shield, MapPin, Clock, Heart } from 'lucide-react'
import { CountUp } from '@/components/shared/CountUp'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'

const STATS = [
  {
    icon: <Heart className="h-7 w-7" />,
    value: 10000,
    suffix: '+',
    label: 'Happy Riders Served',
    gradient: 'from-accent to-accent-dark',
  },
  {
    icon: <Clock className="h-7 w-7" />,
    value: 98,
    suffix: '%',
    label: 'On-Time Arrival Rate',
    gradient: 'from-primary to-primary-sky',
  },
  {
    icon: <MapPin className="h-7 w-7" />,
    value: 6,
    suffix: '+',
    label: 'Cities Covered',
    gradient: 'from-primary-sky to-primary',
  },
  {
    icon: <Shield className="h-7 w-7" />,
    value: 5,
    suffix: '+',
    label: 'Years of Experience',
    gradient: 'from-accent-dark to-accent',
  },
]

export function StatsSection() {
  return (
    <section className="relative -mt-1 py-12 md:py-16 bg-white z-10">
      <div className="container-custom">
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <StaggerItem key={stat.label} variant="scaleUp">
              <div className="relative group text-center p-6 md:p-8 rounded-2xl bg-white border border-border hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-500 card-hover">
                {/* Gradient icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.gradient} text-white rounded-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
