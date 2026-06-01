'use client'

import type { PricingOutput } from '@/lib/pricing'

export function PriceBreakdown({ pricing }: { pricing: PricingOutput }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Base Fare</span>
        <span className="font-medium">${pricing.baseFare.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Mileage Charge
          <span className="text-xs ml-1">({pricing.effectiveMiles.toFixed(1)} mi × ${pricing.perMileRate.toFixed(2)}/mi)</span>
        </span>
        <span className="font-medium">${pricing.mileageCharge.toFixed(2)}</span>
      </div>

      {pricing.surcharges.map((s, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{s.label}</span>
          <span className="font-medium">${s.amount.toFixed(2)}</span>
        </div>
      ))}

      <div className="flex justify-between text-sm border-t border-border pt-2">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
      </div>

      {pricing.roundTripDiscount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Round-Trip Discount</span>
          <span>-${pricing.roundTripDiscount.toFixed(2)}</span>
        </div>
      )}

      {pricing.afterHoursCharge > 0 && (
        <div className="flex justify-between text-sm text-amber-600">
          <span>After-Hours Surcharge</span>
          <span>+${pricing.afterHoursCharge.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between border-t-2 border-primary/20 pt-3">
        <span className="text-base font-bold">Estimated Total</span>
        <span className="text-lg font-bold text-primary">
          ${pricing.total.toFixed(2)}
        </span>
      </div>

      {pricing.disclaimers.length > 0 && (
        <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
          {pricing.disclaimers.map((d, i) => (
            <p key={i} className="text-xs text-amber-700 leading-relaxed">
              {d}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
