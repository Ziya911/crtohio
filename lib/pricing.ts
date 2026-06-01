import { PRICING_CONFIG } from '@/lib/constants'

export type PricingInput = {
  miles: number
  transportType: 'ambulatory' | 'wheelchair'
  isRoundTrip: boolean
  isAfterHours: boolean
  needsBuildingAssist: boolean
  hasStairs: boolean
  waitingTimeMinutes?: number
}

export type PricingOutput = {
  baseFare: number
  mileageCharge: number
  perMileRate: number
  effectiveMiles: number
  surcharges: { label: string; amount: number }[]
  subtotal: number
  roundTripDiscount: number
  afterHoursCharge: number
  total: number
  disclaimers: string[]
}

/**
 * Checks whether a given date/time falls outside business hours.
 * After-hours: before 7AM / after 7PM on weekdays, all weekends.
 */
export function isAfterHours(date: Date): boolean {
  const day = date.getDay() // 0=Sun, 6=Sat
  const hour = date.getHours()

  // Weekends — always after hours
  if (day === 0 || day === 6) return true

  // Mon-Fri — before 7AM or after 7PM
  return hour < 7 || hour >= 19
}

export function calculatePrice(input: PricingInput): PricingOutput {
  const {
    miles,
    transportType,
    isRoundTrip,
    isAfterHours: afterHours,
    needsBuildingAssist,
    hasStairs,
    waitingTimeMinutes = 0,
  } = input

  const config = PRICING_CONFIG

  // Base fare by transport type
  const baseFare =
    transportType === 'wheelchair'
      ? config.baseFareWheelchair
      : config.baseFareAmbulatory

  // Mileage
  const perMile =
    transportType === 'wheelchair'
      ? config.perMileWheelchair
      : config.perMileAmbulatory
  const effectiveMiles = isRoundTrip ? miles * 2 : miles
  const mileageCharge = round(effectiveMiles * perMile)

  // Surcharges
  const surcharges: { label: string; amount: number }[] = []

  if (needsBuildingAssist) {
    surcharges.push({ label: 'Building / Inside Assistance', amount: config.buildingAssist })
  }
  if (hasStairs) {
    surcharges.push({ label: 'Stairs at Pickup', amount: config.stairs })
  }

  // Waiting time (after 10-minute grace period)
  const billableWait = Math.max(0, waitingTimeMinutes - config.waitGraceMinutes)
  if (billableWait > 0) {
    surcharges.push({
      label: `Waiting Time (${billableWait} min after ${config.waitGraceMinutes}-min grace)`,
      amount: round(billableWait * config.waitPerMinute),
    })
  }

  const surchargeTotal = surcharges.reduce((sum, s) => sum + s.amount, 0)

  // Subtotal before discounts/multipliers
  const subtotal = round(baseFare + mileageCharge + surchargeTotal)

  // Round trip discount (10% off total)
  const roundTripDiscount = isRoundTrip
    ? round(subtotal * (1 - config.roundTripDiscount))
    : 0

  const afterDiscount = round(subtotal - roundTripDiscount)

  // After-hours: +25% on base fare only
  const afterHoursCharge = afterHours
    ? round(baseFare * (config.afterHoursMultiplier - 1))
    : 0

  const total = round(afterDiscount + afterHoursCharge)

  // Disclaimers
  const disclaimers: string[] = [
    'This is an estimate only. Final pricing may vary based on actual distance, waiting time, and service requirements.',
  ]
  if (afterHours) {
    disclaimers.push(
      'After-hours surcharge applied (+25% on base fare for rides before 7 AM, after 7 PM, or on weekends).'
    )
  }
  if (isRoundTrip) {
    disclaimers.push(
      `Round-trip discount of ${((1 - config.roundTripDiscount) * 100).toFixed(0)}% applied.`
    )
  }

  return {
    baseFare,
    mileageCharge,
    perMileRate: perMile,
    effectiveMiles,
    surcharges,
    subtotal,
    roundTripDiscount,
    afterHoursCharge,
    total,
    disclaimers,
  }
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
