'use client'

import { useState, useCallback, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { pickupInfoSchema, type PickupInfoData } from '@/lib/validations/booking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddressAutocomplete } from '@/components/booking/AddressAutocomplete'

const LOCATION_TYPES = [
  { value: 'home', label: 'Home' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'nursing_home', label: 'Nursing Home' },
  { value: 'assisted_living', label: 'Assisted Living' },
  { value: 'dialysis_center', label: 'Dialysis Center' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'other', label: 'Other' },
] as const

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepPickupInfo({ registerValidate }: Props) {
  const { pickupInfo: saved, setPickupInfo, markCompleted } = useBookingStore()

  const [form, setForm] = useState<PickupInfoData>({
    pickupAddress: saved?.pickupAddress || '',
    pickupApt: saved?.pickupApt || '',
    pickupLocationType: saved?.pickupLocationType || 'home',
    pickupDate: saved?.pickupDate || '',
    pickupTime: saved?.pickupTime || '',
    pickupLat: saved?.pickupLat ?? null,
    pickupLng: saved?.pickupLng ?? null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof PickupInfoData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleAddressChange = useCallback(
    (value: string) => {
      update('pickupAddress', value)
    },
    []
  )

  const handleAddressSelect = useCallback(
    (result: { address: string; lat: number; lng: number }) => {
      setForm((prev) => ({
        ...prev,
        pickupAddress: result.address,
        pickupLat: result.lat,
        pickupLng: result.lng,
      }))
    },
    []
  )

  // Min date: today
  const today = new Date().toISOString().split('T')[0]

  function validate(): boolean {
    const result = pickupInfoSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return false
    }
    setPickupInfo(result.data)
    markCompleted(3)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Pickup Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Where should we pick up the passenger?
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="pickupAddress">
            Pickup Address <span className="text-red-500">*</span>
          </Label>
          <AddressAutocomplete
            id="pickupAddress"
            value={form.pickupAddress}
            onChange={handleAddressChange}
            onSelect={handleAddressSelect}
            placeholder="Start typing an address..."
            aria-invalid={!!errors.pickupAddress}
          />
          {errors.pickupAddress && (
            <p className="mt-1 text-xs text-red-600">{errors.pickupAddress}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pickupApt">Apartment / Suite #</Label>
          <Input
            id="pickupApt"
            value={form.pickupApt || ''}
            onChange={(e) => update('pickupApt', e.target.value)}
            placeholder="Apt 2B"
          />
        </div>

        <div>
          <Label htmlFor="pickupLocationType">
            Location Type <span className="text-red-500">*</span>
          </Label>
          <select
            id="pickupLocationType"
            value={form.pickupLocationType}
            onChange={(e) => update('pickupLocationType', e.target.value)}
            className="flex h-11 w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10"
          >
            {LOCATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="pickupDate">
            Pickup Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pickupDate"
            type="date"
            min={today}
            value={form.pickupDate}
            onChange={(e) => update('pickupDate', e.target.value)}
            aria-invalid={!!errors.pickupDate}
          />
          {errors.pickupDate && (
            <p className="mt-1 text-xs text-red-600">{errors.pickupDate}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pickupTime">
            Pickup Time <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pickupTime"
            type="time"
            value={form.pickupTime}
            onChange={(e) => update('pickupTime', e.target.value)}
            aria-invalid={!!errors.pickupTime}
          />
          {errors.pickupTime && (
            <p className="mt-1 text-xs text-red-600">{errors.pickupTime}</p>
          )}
        </div>
      </div>
    </div>
  )
}
