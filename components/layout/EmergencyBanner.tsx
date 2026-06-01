import { AlertTriangle, Phone } from 'lucide-react'
import { EMERGENCY_DISCLAIMER } from '@/lib/constants'

export function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-emergency to-[#b91c1c] text-white text-center py-2 px-4 text-sm font-semibold" role="alert">
      <div className="container-custom flex items-center justify-center gap-2 flex-wrap">
        <AlertTriangle className="h-4 w-4 shrink-0 animate-pulse" aria-hidden="true" />
        <span>{EMERGENCY_DISCLAIMER}</span>
        <a href="tel:911" className="inline-flex items-center gap-1 underline underline-offset-2 font-bold hover:no-underline">
          <Phone className="h-3 w-3" />
          Call 911
        </a>
      </div>
    </div>
  )
}
