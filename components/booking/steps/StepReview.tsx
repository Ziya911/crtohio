'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { SITE_NAME } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil } from 'lucide-react'

type Props = {
  registerValidate: (fn: () => boolean) => void
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-primary hover:text-primary-dark text-xs font-medium flex items-center gap-1"
    >
      <Pencil className="size-3" />
      Edit
    </button>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string | null | undefined
}) {
  if (!value) return null
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value}</span>
    </div>
  )
}

export function StepReview({ registerValidate, onSubmit, isSubmitting }: Props) {
  const store = useBookingStore()
  const {
    rideType,
    passengerInfo,
    pickupInfo,
    dropoffInfo,
    transportType,
    payerInfo,
    rideNotes,
    estimate,
    goToStep,
  } = store
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  function validate(): boolean {
    if (!agreed) {
      setError('You must agree to the terms before submitting')
      return false
    }
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  const rideTypeLabel =
    rideType?.rideType === 'round_trip'
      ? 'Round Trip'
      : rideType?.rideType === 'recurring'
        ? 'Recurring'
        : 'One Way'

  const transportLabel =
    transportType?.transportType === 'wheelchair' ? 'Wheelchair' : 'Ambulatory'

  function payerLabel(): string {
    if (!payerInfo) return ''
    switch (payerInfo.payerType) {
      case 'insurance':
        return `Insurance — ${payerInfo.insuranceCompany}`
      case 'facility':
        return `Facility — ${payerInfo.facilityName}`
      case 'private_pay':
        return 'Private Pay'
      case 'cash':
        return 'Cash'
      case 'card':
        return 'Card'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Review Your Request
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Please review all information before submitting.
        </p>
      </div>

      {/* Ride Type */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Ride Type</CardTitle>
          <EditButton onClick={() => goToStep(1)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <Badge variant="outline" className="text-primary border-primary/30">
            {rideTypeLabel}
          </Badge>
          {rideType?.recurringPattern && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({rideType.recurringPattern})
            </span>
          )}
        </CardContent>
      </Card>

      {/* Passenger */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Passenger</CardTitle>
          <EditButton onClick={() => goToStep(2)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
          <InfoRow label="Name" value={passengerInfo?.passengerName} />
          <InfoRow label="DOB" value={passengerInfo?.passengerDob} />
          <InfoRow label="Phone" value={passengerInfo?.passengerPhone} />
          <InfoRow label="Email" value={passengerInfo?.passengerEmail} />
          <InfoRow
            label="Emergency Contact"
            value={passengerInfo?.emergencyContact}
          />
        </CardContent>
      </Card>

      {/* Pickup */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Pickup</CardTitle>
          <EditButton onClick={() => goToStep(3)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
          <InfoRow label="Address" value={pickupInfo?.pickupAddress} />
          <InfoRow label="Apt/Suite" value={pickupInfo?.pickupApt} />
          <InfoRow label="Date" value={pickupInfo?.pickupDate} />
          <InfoRow label="Time" value={pickupInfo?.pickupTime} />
        </CardContent>
      </Card>

      {/* Drop-off */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Drop-off</CardTitle>
          <EditButton onClick={() => goToStep(4)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
          <InfoRow label="Address" value={dropoffInfo?.dropoffAddress} />
          <InfoRow label="Facility" value={dropoffInfo?.dropoffFacilityName} />
          <InfoRow
            label="Appointment"
            value={dropoffInfo?.dropoffAppointmentTime}
          />
          <InfoRow label="Department" value={dropoffInfo?.dropoffDepartment} />
        </CardContent>
      </Card>

      {/* Transport */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Transport</CardTitle>
          <EditButton onClick={() => goToStep(5)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
          <InfoRow label="Type" value={transportLabel} />
          <InfoRow
            label="Door Assist"
            value={transportType?.needsDoorAssist ? 'Yes' : 'No'}
          />
          <InfoRow
            label="Building Assist"
            value={transportType?.needsBuildingAssist ? 'Yes' : 'No'}
          />
          <InfoRow
            label="Companion"
            value={transportType?.hasCompanion ? 'Yes' : 'No'}
          />
        </CardContent>
      </Card>

      {/* Payer */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
          <CardTitle className="text-sm">Payment</CardTitle>
          <EditButton onClick={() => goToStep(6)} />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <p className="text-sm font-medium">{payerLabel()}</p>
        </CardContent>
      </Card>

      {/* Estimate */}
      {estimate && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Estimate</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
            <InfoRow label="Distance" value={`${Math.round(estimate.miles * 10) / 10} mi`} />
            <InfoRow
              label="Duration"
              value={estimate.durationMinutes >= 60
                ? `${Math.floor(estimate.durationMinutes / 60)} hr ${estimate.durationMinutes % 60} min`
                : `${estimate.durationMinutes} min`}
            />
            <InfoRow
              label="Estimated Price"
              value={`$${estimate.total.toFixed(2)}`}
            />
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {(rideNotes?.specialInstructions ||
        rideNotes?.gateCode ||
        rideNotes?.mobilityNotes ||
        rideNotes?.preferredLanguage ||
        rideNotes?.additionalInfo) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm">Notes</CardTitle>
            <EditButton onClick={() => goToStep(8)} />
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0 divide-y divide-border">
            <InfoRow
              label="Instructions"
              value={rideNotes?.specialInstructions}
            />
            <InfoRow label="Gate Code" value={rideNotes?.gateCode} />
            <InfoRow label="Mobility Notes" value={rideNotes?.mobilityNotes} />
            <InfoRow label="Preferred Language" value={rideNotes?.preferredLanguage ? rideNotes.preferredLanguage.charAt(0).toUpperCase() + rideNotes.preferredLanguage.slice(1) : undefined} />
            <InfoRow label="Additional" value={rideNotes?.additionalInfo} />
          </CardContent>
        </Card>
      )}

      {/* Terms */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked)
              setError('')
            }}
            className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-muted-foreground">
            I confirm that all information provided is accurate. I understand
            that this is a <strong>ride request</strong>, not a confirmation, and
            that the {SITE_NAME} team will review and contact me to confirm the
            ride details and final pricing.
          </span>
        </label>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  )
}
