'use client'

import { ShieldCheck, Award, Wallet, Headphones, Accessibility } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'

const TRUST_BADGES = [
  { icon: <ShieldCheck className="h-6 w-6" />, label: 'Licensed & Insured', desc: 'Full coverage' },
  { icon: <Award className="h-6 w-6" />, label: 'NEMT Certified', desc: 'State approved' },
  { icon: <Wallet className="h-6 w-6" />, label: 'Private Pay', desc: 'Transparent pricing' },
  { icon: <Headphones className="h-6 w-6" />, label: 'Dispatch Available', desc: 'Business hours' },
  { icon: <Accessibility className="h-6 w-6" />, label: 'ADA Compliant', desc: 'Full access' },
]

export function TrustBadgesSection() {
  return (
    <section className="py-6 md:py-8 bg-white relative z-10 -mt-1">
      <div className="container-custom">
        <MotionWrapper variant="fadeUp">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-border/60 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
              >
                <div className="text-primary">{badge.icon}</div>
                <div>
                  <p className="text-sm font-bold text-primary leading-tight">{badge.label}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
