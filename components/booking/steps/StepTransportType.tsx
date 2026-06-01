'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { type TransportTypeData } from '@/lib/validations/booking'
import { Label } from '@/components/ui/label'
import { PersonStanding, Accessibility } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepTransportType({ registerValidate }: Props) {
  const { transportType: saved, setTransportType, markCompleted } =
    useBookingStore()

  const [form, setForm] = useState<TransportTypeData>({
    transportType: saved?.transportType || 'ambulatory',
    needsDoorAssist: saved?.needsDoorAssist ?? false,
    needsBuildingAssist: saved?.needsBuildingAssist ?? false,
    hasCompanion: saved?.hasCompanion ?? false,
    wheelchairOwned: saved?.wheelchairOwned ?? null,
    wheelchairPowered: saved?.wheelchairPowered ?? null,
    hasStairs: saved?.hasStairs ?? null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof TransportTypeData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function validate(): boolean {
    if (!form.transportType) {
      setErrors({ transportType: 'Please select a transport type' })
      return false
    }
    if (form.transportType === 'wheelchair' && form.wheelchairOwned === null) {
      setErrors({ wheelchairOwned: 'Please indicate if you own a wheelchair' })
      return false
    }
    setTransportType(form)
    markCompleted(5)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  const isWheelchair = form.transportType === 'wheelchair'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Transportation Type</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the type of transportation needed.
        </p>
      </div>

      {/* Transport type cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => update('transportType', 'ambulatory')}
          className={cn(
            'flex items-center gap-4 rounded-xl border-2 p-5 text-left transition-all',
            form.transportType === 'ambulatory'
              ? 'border-primary bg-primary text-white shadow-md'
              : 'border-border hover:border-primary/30'
          )}
        >
          <div
            className={cn(
              'flex size-12 items-center justify-center rounded-full',
              form.transportType === 'ambulatory'
                ? 'bg-white/20 text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <PersonStanding className="size-6" />
          </div>
          <div>
            <p className={cn('font-semibold', form.transportType === 'ambulatory' ? 'text-white' : 'text-foreground')}>Ambulatory</p>
            <p className={cn('text-xs', form.transportType === 'ambulatory' ? 'text-white/80' : 'text-muted-foreground')}>
              Can walk with minimal assistance
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => update('transportType', 'wheelchair')}
          className={cn(
            'flex items-center gap-4 rounded-xl border-2 p-5 text-left transition-all',
            form.transportType === 'wheelchair'
              ? 'border-primary bg-primary text-white shadow-md'
              : 'border-border hover:border-primary/30'
          )}
        >
          <div
            className={cn(
              'flex size-12 items-center justify-center rounded-full',
              form.transportType === 'wheelchair'
                ? 'bg-white/20 text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Accessibility className="size-6" />
          </div>
          <div>
            <p className={cn('font-semibold', form.transportType === 'wheelchair' ? 'text-white' : 'text-foreground')}>Wheelchair</p>
            <p className={cn('text-xs', form.transportType === 'wheelchair' ? 'text-white/80' : 'text-muted-foreground')}>
              Requires wheelchair-accessible vehicle
            </p>
          </div>
        </button>
      </div>
      {errors.transportType && (
        <p className="text-xs text-red-600">{errors.transportType}</p>
      )}

      {/* Assistance options */}
      <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5">
        <p className="text-sm font-semibold text-foreground">
          Additional Assistance
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors">
            <input
              type="checkbox"
              checked={form.needsDoorAssist}
              onChange={(e) => update('needsDoorAssist', e.target.checked)}
              className="size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">Need door-to-door assistance</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors">
            <input
              type="checkbox"
              checked={form.needsBuildingAssist}
              onChange={(e) => update('needsBuildingAssist', e.target.checked)}
              className="size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">Need building assistance</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors">
            <input
              type="checkbox"
              checked={form.hasCompanion}
              onChange={(e) => update('hasCompanion', e.target.checked)}
              className="size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">Companion rider</span>
          </label>
        </div>
      </div>

      {/* Wheelchair sub-fields */}
      {isWheelchair && (
        <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm font-semibold text-primary">
            Wheelchair Details
          </p>

          <div>
            <Label className="text-sm">
              Do you own the wheelchair?{' '}
              <span className="text-red-500">*</span>
            </Label>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wheelchairOwned"
                  checked={form.wheelchairOwned === true}
                  onChange={() => update('wheelchairOwned', true)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wheelchairOwned"
                  checked={form.wheelchairOwned === false}
                  onChange={() => update('wheelchairOwned', false)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
            {errors.wheelchairOwned && (
              <p className="mt-1 text-xs text-red-600">
                {errors.wheelchairOwned}
              </p>
            )}
          </div>

          {form.wheelchairOwned && (
            <div>
              <Label className="text-sm">Manual or power wheelchair?</Label>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wheelchairPowered"
                    checked={form.wheelchairPowered === false}
                    onChange={() => update('wheelchairPowered', false)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Manual</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="wheelchairPowered"
                    checked={form.wheelchairPowered === true}
                    onChange={() => update('wheelchairPowered', true)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Power</span>
                </label>
              </div>
            </div>
          )}

          <div>
            <Label className="text-sm">Any stairs at pickup location?</Label>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasStairs"
                  checked={form.hasStairs === true}
                  onChange={() => update('hasStairs', true)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasStairs"
                  checked={form.hasStairs === false}
                  onChange={() => update('hasStairs', false)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
