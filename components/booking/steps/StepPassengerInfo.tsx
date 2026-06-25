'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import {
  passengerInfoSchema,
  type PassengerInfoData,
} from '@/lib/validations/booking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  registerValidate: (fn: () => boolean) => void
  prefill?: {
    name?: string
    email?: string
    phone?: string
    dob?: string
  }
}

export function StepPassengerInfo({ registerValidate, prefill }: Props) {
  const { passengerInfo: saved, setPassengerInfo, markCompleted } =
    useBookingStore()

  const [form, setForm] = useState<PassengerInfoData>({
    passengerName: saved?.passengerName || prefill?.name || '',
    passengerDob: saved?.passengerDob || prefill?.dob || '',
    passengerPhone: saved?.passengerPhone || prefill?.phone || '',
    passengerEmail: saved?.passengerEmail || prefill?.email || '',
    emergencyContact: saved?.emergencyContact || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof PassengerInfoData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function validate(): boolean {
    const result = passengerInfoSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return false
    }
    setPassengerInfo(result.data)
    markCompleted(2)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Passenger Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the details of the person who will be riding.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="passengerName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="passengerName"
            value={form.passengerName}
            onChange={(e) => update('passengerName', e.target.value)}
            placeholder="John Doe"
            aria-invalid={!!errors.passengerName}
          />
          {errors.passengerName && (
            <p className="mt-1 text-xs text-red-600">{errors.passengerName}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="passengerDob">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <Input
            id="passengerDob"
            type="date"
            value={form.passengerDob}
            onChange={(e) => update('passengerDob', e.target.value)}
            aria-invalid={!!errors.passengerDob}
          />
          {errors.passengerDob && (
            <p className="mt-1 text-xs text-red-600">{errors.passengerDob}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="passengerPhone">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="passengerPhone"
            type="tel"
            value={form.passengerPhone}
            onChange={(e) => update('passengerPhone', e.target.value)}
            placeholder="(513) 555-0100"
            aria-invalid={!!errors.passengerPhone}
          />
          {errors.passengerPhone && (
            <p className="mt-1 text-xs text-red-600">
              {errors.passengerPhone}
            </p>
          )}
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            By providing your phone number, you agree to receive SMS messages from Care Ride Transportation regarding your request. Message and data rates may apply. Message frequency varies. Reply STOP to opt out and HELP for assistance.{' '}
            <a href="/privacy" className="underline hover:text-primary transition-colors">View our Privacy Policy</a>.
          </p>
        </div>

        <div>
          <Label htmlFor="passengerEmail">Email</Label>
          <Input
            id="passengerEmail"
            type="email"
            value={form.passengerEmail || ''}
            onChange={(e) => update('passengerEmail', e.target.value)}
            placeholder="john@example.com"
            aria-invalid={!!errors.passengerEmail}
          />
          {errors.passengerEmail && (
            <p className="mt-1 text-xs text-red-600">
              {errors.passengerEmail}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={form.emergencyContact || ''}
            onChange={(e) => update('emergencyContact', e.target.value)}
            placeholder="Name — (513) 555-0100"
          />
        </div>
      </div>
    </div>
  )
}
