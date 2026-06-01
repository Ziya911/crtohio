'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { TOTAL_STEPS } from '@/lib/stores/bookingStore'

const STEP_LABELS = [
  'Ride Type',
  'Passenger',
  'Pickup',
  'Drop-off',
  'Transport',
  'Payer',
  'Estimate',
  'Notes',
  'Review',
]

type Props = {
  currentStep: number
  completedSteps: number[]
  onStepClick?: (step: number) => void
}

export function StepIndicator({ currentStep, completedSteps, onStepClick }: Props) {
  return (
    <>
      {/* Mobile: progress bar + step name */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm text-muted-foreground">
            {STEP_LABELS[currentStep - 1]}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: numbered circles */}
      <div className="hidden md:flex items-center justify-between">
        {STEP_LABELS.map((label, idx) => {
          const step = idx + 1
          const isCompleted = completedSteps.includes(step)
          const isCurrent = step === currentStep
          const isPast = step < currentStep
          const isClickable = isCompleted || isPast

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(step)}
                className={cn(
                  'flex flex-col items-center group',
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div
                  className={cn(
                    'flex items-center justify-center size-8 rounded-full text-xs font-bold transition-all',
                    isCurrent
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : isCompleted || isPast
                        ? 'bg-primary/10 text-primary group-hover:bg-primary/20'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted || isPast ? (
                    <Check className="size-4" />
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={cn(
                    'mt-1.5 text-[10px] font-medium whitespace-nowrap transition-colors',
                    isCurrent
                      ? 'text-primary'
                      : isClickable
                        ? 'text-muted-foreground group-hover:text-primary'
                        : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </button>

              {step < TOTAL_STEPS && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-1.5 -mt-4 transition-colors',
                    isPast || isCompleted ? 'bg-primary/30' : 'bg-muted'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
