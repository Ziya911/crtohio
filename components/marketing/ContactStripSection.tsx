'use client'

import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'
import { BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_HOURS } from '@/lib/constants'

const CONTACT_ITEMS = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Phone',
    value: BUSINESS_PHONE,
    href: `tel:${BUSINESS_PHONE.replace(/\D/g, '')}`,
    gradient: 'from-primary to-primary-sky',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    gradient: 'from-accent to-accent-dark',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Hours',
    value: BUSINESS_HOURS,
    href: undefined,
    gradient: 'from-primary-sky to-primary',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Location',
    value: 'Greater Cincinnati & SW Ohio',
    href: undefined,
    gradient: 'from-accent-dark to-accent',
  },
]

export function ContactStripSection() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-gray-50 to-[#f7faff] border-t border-border/50">
      <div className="container-custom">
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {CONTACT_ITEMS.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border/60 hover:shadow-md hover:border-primary/15 transition-all duration-300 h-full min-h-[88px]">
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.gradient} text-white rounded-xl shrink-0 shadow-sm`}>
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors block truncate"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
