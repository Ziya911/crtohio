'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore, TOTAL_STEPS } from '@/lib/stores/bookingStore'
import { GoogleMapsProvider } from './GoogleMapsProvider'
import { StepIndicator } from './StepIndicator'
import { StepNavigation } from './StepNavigation'
import { StepRideType } from './steps/StepRideType'
import { StepPassengerInfo } from './steps/StepPassengerInfo'
import { StepPickupInfo } from './steps/StepPickupInfo'
import { StepDropoffInfo } from './steps/StepDropoffInfo'
import { StepTransportType } from './steps/StepTransportType'
import { StepPayerInfo } from './steps/StepPayerInfo'
import { StepMapEstimate } from './steps/StepMapEstimate'
import { StepRideNotes } from './steps/StepRideNotes'
import { StepReview } from './steps/StepReview'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

type UserPrefill = {
  name?: string
  email?: string
  phone?: string
  dob?: string
} | null

export function BookingWizard({ userPrefill }: { userPrefill?: UserPrefill }) {
  const router = useRouter()
  const store = useBookingStore()
  const { currentStep, completedSteps, nextStep, prevStep, goToStep } = store
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const validateRef = useRef<(() => boolean) | null>(null)

  // Hydrate Zustand store from localStorage
  useEffect(() => {
    useBookingStore.persist.rehydrate()
  }, [])

  const registerValidate = useCallback((fn: () => boolean) => {
    validateRef.current = fn
  }, [])

  function handleContinue() {
    if (validateRef.current?.()) {
      nextStep()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Scroll to first error and add shake animation
      const firstError = document.querySelector('[aria-invalid="true"]')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        firstError.classList.add('animate-shake')
        setTimeout(() => firstError.classList.remove('animate-shake'), 500)
      }
    }
  }

  function handleBack() {
    prevStep()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStepClick(step: number) {
    // Only allow clicking on completed steps or the current step
    if (completedSteps.includes(step) || step < currentStep) {
      goToStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleSubmit() {
    if (!validateRef.current?.()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const {
        rideType,
        passengerInfo,
        pickupInfo,
        dropoffInfo,
        transportType,
        payerInfo,
        rideNotes,
      } = store

      // Build payer details object
      const payerDetails: Record<string, unknown> = {}
      if (payerInfo) {
        Object.entries(payerInfo).forEach(([key, value]) => {
          if (key !== 'payerType') {
            payerDetails[key] = value
          }
        })
      }

      const payload = {
        rideType: rideType?.rideType,
        recurringPattern: rideType?.recurringPattern,
        passengerName: passengerInfo?.passengerName,
        passengerDob: passengerInfo?.passengerDob,
        passengerPhone: passengerInfo?.passengerPhone,
        passengerEmail: passengerInfo?.passengerEmail || '',
        emergencyContact: passengerInfo?.emergencyContact || '',
        pickupAddress: pickupInfo?.pickupAddress,
        pickupApt: pickupInfo?.pickupApt || '',
        pickupLocationType: pickupInfo?.pickupLocationType,
        pickupDate: pickupInfo?.pickupDate,
        pickupTime: pickupInfo?.pickupTime,
        pickupLat: pickupInfo?.pickupLat,
        pickupLng: pickupInfo?.pickupLng,
        dropoffAddress: dropoffInfo?.dropoffAddress,
        dropoffFacilityName: dropoffInfo?.dropoffFacilityName || '',
        dropoffAppointmentTime: dropoffInfo?.dropoffAppointmentTime || '',
        dropoffDepartment: dropoffInfo?.dropoffDepartment || '',
        dropoffLat: dropoffInfo?.dropoffLat,
        dropoffLng: dropoffInfo?.dropoffLng,
        transportType: transportType?.transportType,
        needsDoorAssist: transportType?.needsDoorAssist || false,
        needsBuildingAssist: transportType?.needsBuildingAssist || false,
        hasCompanion: transportType?.hasCompanion || false,
        wheelchairOwned: transportType?.wheelchairOwned,
        wheelchairPowered: transportType?.wheelchairPowered,
        hasStairs: transportType?.hasStairs,
        payerType: payerInfo?.payerType,
        payerDetails,
        specialInstructions: rideNotes?.specialInstructions || '',
        gateCode: rideNotes?.gateCode || '',
        mobilityNotes: rideNotes?.mobilityNotes || '',
        preferredLanguage: rideNotes?.preferredLanguage || '',
        additionalInfo: rideNotes?.additionalInfo || '',
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit booking')
      }

      const data = await res.json()
      store.reset()
      router.push(`/book/confirmation?id=${data.publicId}`)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <StepRideType registerValidate={registerValidate} />
      case 2:
        return (
          <StepPassengerInfo
            registerValidate={registerValidate}
            prefill={userPrefill || undefined}
          />
        )
      case 3:
        return <StepPickupInfo registerValidate={registerValidate} />
      case 4:
        return <StepDropoffInfo registerValidate={registerValidate} />
      case 5:
        return <StepTransportType registerValidate={registerValidate} />
      case 6:
        return <StepPayerInfo registerValidate={registerValidate} />
      case 7:
        return <StepMapEstimate registerValidate={registerValidate} />
      case 8:
        return <StepRideNotes registerValidate={registerValidate} />
      case 9:
        return (
          <StepReview
            registerValidate={registerValidate}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <GoogleMapsProvider>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <StepIndicator
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={handleStepClick}
          />
        </div>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-6 sm:p-8">
            {/* Key forces re-mount on step change, triggering the slide animation */}
            <div key={currentStep} className="animate-step-in">
              {renderStep()}
            </div>

            {submitError && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertTriangle className="size-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            )}

            <StepNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onBack={handleBack}
              onContinue={handleContinue}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>

      </div>
    </GoogleMapsProvider>
  )
}
