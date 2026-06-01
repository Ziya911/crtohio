'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react'

type Props = {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onContinue: () => void
  onSubmit?: () => void
  isSubmitting?: boolean
  continueDisabled?: boolean
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  onSubmit,
  isSubmitting = false,
  continueDisabled = false,
}: Props) {
  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/60">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
        className={`h-11 px-6 text-sm font-semibold rounded-xl ${isFirstStep ? 'invisible' : ''}`}
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || continueDisabled}
          className="h-11 px-8 bg-primary text-white hover:bg-primary-dark min-w-45 text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit Request
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className="h-11 px-8 bg-primary text-white hover:bg-primary-dark text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Next
          <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  )
}
