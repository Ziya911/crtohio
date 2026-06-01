'use client'

import { useState, useCallback, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import {
  dropoffInfoSchema,
  type DropoffInfoData,
} from '@/lib/validations/booking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddressAutocomplete } from '@/components/booking/AddressAutocomplete'

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepDropoffInfo({ registerValidate }: Props) {
  const { dropoffInfo: saved, setDropoffInfo, markCompleted } =
    useBookingStore()

  const [form, setForm] = useState<DropoffInfoData>({
    dropoffAddress: saved?.dropoffAddress || '',
    dropoffFacilityName: saved?.dropoffFacilityName || '',
    dropoffAppointmentTime: saved?.dropoffAppointmentTime || '',
    dropoffDepartment: saved?.dropoffDepartment || '',
    dropoffLat: saved?.dropoffLat ?? null,
    dropoffLng: saved?.dropoffLng ?? null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof DropoffInfoData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleAddressChange = useCallback((value: string) => {
    update('dropoffAddress', value)
  }, [])

  const handleAddressSelect = useCallback(
    (result: { address: string; lat: number; lng: number }) => {
      setForm((prev) => ({
        ...prev,
        dropoffAddress: result.address,
        dropoffLat: result.lat,
        dropoffLng: result.lng,
      }))
    },
    []
  )

  function validate(): boolean {
    const result = dropoffInfoSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return false
    }
    setDropoffInfo(result.data)
    markCompleted(4)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Drop-off Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Where should we take the passenger?
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="dropoffAddress">
            Drop-off Address <span className="text-red-500">*</span>
          </Label>
          <AddressAutocomplete
            id="dropoffAddress"
            value={form.dropoffAddress}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
            placeholder="Start typing an address..."
            aria-invalid={!!errors.dropoffAddress}
          />
          {errors.dropoffAddress && (
            <p className="mt-1 text-xs text-red-600">
              {errors.dropoffAddress}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="dropoffFacilityName">
            Facility / Doctor / Clinic Name
          </Label>
          <Input
            id="dropoffFacilityName"
            value={form.dropoffFacilityName || ''}
            onChange={(e) => update('dropoffFacilityName', e.target.value)}
            placeholder="e.g., Cincinnati Medical Center"
          />
        </div>

        <div>
          <Label htmlFor="dropoffAppointmentTime">Appointment Time</Label>
          <Input
            id="dropoffAppointmentTime"
            type="time"
            value={form.dropoffAppointmentTime || ''}
            onChange={(e) =>
              update('dropoffAppointmentTime', e.target.value)
            }
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="dropoffDepartment">Department / Suite #</Label>
          <Input
            id="dropoffDepartment"
            value={form.dropoffDepartment || ''}
            onChange={(e) => update('dropoffDepartment', e.target.value)}
            placeholder="e.g., Radiology, Suite 200"
          />
        </div>
      </div>
    </div>
  )
}
