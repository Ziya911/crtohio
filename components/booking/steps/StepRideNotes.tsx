'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { rideNotesSchema, type RideNotesData } from '@/lib/validations/booking'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepRideNotes({ registerValidate }: Props) {
  const { rideNotes: saved, setRideNotes, markCompleted } = useBookingStore()

  const [form, setForm] = useState<RideNotesData>({
    specialInstructions: saved?.specialInstructions || '',
    gateCode: saved?.gateCode || '',
    mobilityNotes: saved?.mobilityNotes || '',
    preferredLanguage: saved?.preferredLanguage || '',
    additionalInfo: saved?.additionalInfo || '',
  })

  function update(field: keyof RideNotesData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): boolean {
    const result = rideNotesSchema.safeParse(form)
    if (!result.success) {
      return false
    }
    setRideNotes(result.data)
    markCompleted(8)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Ride Notes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add any additional information for your driver. All fields are
          optional.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <textarea
            id="specialInstructions"
            value={form.specialInstructions || ''}
            onChange={(e) => update('specialInstructions', e.target.value)}
            placeholder="e.g., Ring doorbell twice, patient is hard of hearing..."
            rows={3}
            maxLength={1000}
            className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10"
          />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {(form.specialInstructions || '').length}/1000
          </p>
        </div>

        <div>
          <Label htmlFor="gateCode">Gate Code</Label>
          <Input
            id="gateCode"
            value={form.gateCode || ''}
            onChange={(e) => update('gateCode', e.target.value)}
            placeholder="e.g., #1234"
            maxLength={50}
          />
        </div>

        <div>
          <Label htmlFor="mobilityNotes">Mobility Notes</Label>
          <textarea
            id="mobilityNotes"
            value={form.mobilityNotes || ''}
            onChange={(e) => update('mobilityNotes', e.target.value)}
            placeholder="e.g., Uses a walker, needs extra time to board..."
            rows={2}
            maxLength={500}
            className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10"
          />
        </div>

        <div>
          <Label htmlFor="preferredLanguage">Preferred Communication Language</Label>
          <select
            id="preferredLanguage"
            value={form.preferredLanguage || ''}
            onChange={(e) => update('preferredLanguage', e.target.value)}
            className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10"
          >
            <option value="">English (Default)</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
            <option value="chinese">Chinese (Mandarin)</option>
            <option value="hindi">Hindi</option>
            <option value="somali">Somali</option>
            <option value="swahili">Swahili</option>
            <option value="other">Other</option>
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            If you or the patient prefer to communicate in a language other than English, please let us know so we can try to accommodate.
          </p>
        </div>

        <div>
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <textarea
            id="additionalInfo"
            value={form.additionalInfo || ''}
            onChange={(e) => update('additionalInfo', e.target.value)}
            placeholder="Any other details you'd like us to know..."
            rows={2}
            maxLength={1000}
            className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10"
          />
        </div>
      </div>
    </div>
  )
}
