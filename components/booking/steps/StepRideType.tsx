'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { rideTypeSchema, type RideTypeData } from '@/lib/validations/booking'
import { ArrowRightLeft, CornerUpRight, CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'

const RIDE_TYPES = [
  {
    value: 'one_way' as const,
    label: 'One Way',
    description: 'Single trip from pickup to drop-off',
    icon: CornerUpRight,
  },
  {
    value: 'round_trip' as const,
    label: 'Round Trip',
    description: 'There and back on the same day',
    icon: ArrowRightLeft,
  },
  {
    value: 'recurring' as const,
    label: 'Recurring Ride',
    description: 'Regularly scheduled rides',
    icon: CalendarClock,
  },
]

const RECURRING_PATTERNS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'mwf', label: 'Mon / Wed / Fri' },
  { value: 'custom', label: 'Custom Schedule' },
] as const

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepRideType({ registerValidate }: Props) {
  const { rideType: saved, setRideType, markCompleted } = useBookingStore()
  const [rideType, setLocalRideType] = useState(saved?.rideType || '')
  const [recurringPattern, setRecurringPattern] = useState(
    saved?.recurringPattern || ''
  )
  const [error, setError] = useState('')

  function handleSelect(type: string) {
    setLocalRideType(type)
    setError('')
    if (type !== 'recurring') {
      setRecurringPattern('')
    }
  }

  function validate(): boolean {
    const data = {
      rideType,
      recurringPattern: rideType === 'recurring' ? recurringPattern || null : null,
    }
    const result = rideTypeSchema.safeParse(data)
    if (!result.success) {
      setError('Please select a ride type')
      return false
    }
    if (rideType === 'recurring' && !recurringPattern) {
      setError('Please select a recurring pattern')
      return false
    }
    setRideType(result.data)
    markCompleted(1)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">
          What type of ride do you need?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select your ride type to get started.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {RIDE_TYPES.map((type) => {
          const Icon = type.icon
          const selected = rideType === type.value
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => handleSelect(type.value)}
              className={cn(
                'flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all',
                selected
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-border hover:border-primary/30 hover:bg-muted/50'
              )}
            >
              <div
                className={cn(
                  'flex size-12 items-center justify-center rounded-full',
                  selected
                    ? 'bg-white/20 text-white'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon className="size-5" />
              </div>
              <div>
                <p className={cn('font-semibold', selected ? 'text-white' : 'text-foreground')}>{type.label}</p>
                <p className={cn('mt-0.5 text-xs', selected ? 'text-white/80' : 'text-muted-foreground')}>
                  {type.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {rideType === 'recurring' && (
        <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
          <p className="text-sm font-semibold text-foreground">
            How often do you need rides?
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {RECURRING_PATTERNS.map((pattern) => (
              <button
                key={pattern.value}
                type="button"
                onClick={() => setRecurringPattern(pattern.value)}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-sm font-medium transition-all',
                  recurringPattern === pattern.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/30'
                )}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
