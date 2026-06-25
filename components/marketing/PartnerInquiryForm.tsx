'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { partnerInquirySchema } from '@/lib/validations/partner-inquiry'
import { BUSINESS_EMAIL } from '@/lib/constants'

const PARTNER_TYPES = [
  { value: '', label: 'Select organization type' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'nursing_home', label: 'Nursing Home' },
  { value: 'dialysis_center', label: 'Dialysis Center' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'assisted_living', label: 'Assisted Living Facility' },
  { value: 'rehabilitation', label: 'Rehabilitation Center' },
  { value: 'other', label: 'Other' },
]

export function PartnerInquiryForm() {
  const [form, setForm] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    message: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const result = partnerInquirySchema.safeParse(form)
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-accent-light border border-accent/20 rounded-xl p-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="size-7 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Inquiry Submitted!</h3>
        <p className="text-muted-foreground">
          Thank you for your interest in partnering with us. Our partnerships team will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-card)] space-y-6" noValidate>
      {error && (
        <div className="rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-foreground mb-1.5">
            Organization Name <span className="text-emergency">*</span>
          </label>
          <input
            type="text"
            id="organizationName"
            value={form.organizationName}
            onChange={(e) => updateField('organizationName', e.target.value)}
            placeholder="e.g., Good Samaritan Hospital"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${fieldErrors.organizationName ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.organizationName && <p className="text-xs text-emergency mt-1">{fieldErrors.organizationName}</p>}
        </div>
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-foreground mb-1.5">
            Contact Name <span className="text-emergency">*</span>
          </label>
          <input
            type="text"
            id="contactName"
            value={form.contactName}
            onChange={(e) => updateField('contactName', e.target.value)}
            placeholder="Your full name"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${fieldErrors.contactName ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.contactName && <p className="text-xs text-emergency mt-1">{fieldErrors.contactName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="partner-email" className="block text-sm font-medium text-foreground mb-1.5">
          Email Address <span className="text-emergency">*</span>
        </label>
        <input
          type="email"
          id="partner-email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@organization.com"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${fieldErrors.email ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.email && <p className="text-xs text-emergency mt-1">{fieldErrors.email}</p>}
      </div>

      {/* Phone — full width so consent text is readable */}
      <div>
        <label htmlFor="partner-phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone Number <span className="text-emergency">*</span>
        </label>
        <input
          type="tel"
          id="partner-phone"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="(513) 555-0100"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${fieldErrors.phone ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.phone && <p className="text-xs text-emergency mt-1">{fieldErrors.phone}</p>}
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          By providing your phone number, you agree to receive SMS messages from Care Ride Transportation regarding your request. Message and data rates may apply. Message frequency varies. Reply STOP to opt out and HELP for assistance.{' '}
          <a href="/privacy" className="underline hover:text-primary transition-colors">View our Privacy Policy</a>.
        </p>
      </div>

      <div>
        <label htmlFor="organizationType" className="block text-sm font-medium text-foreground mb-1.5">
          Organization Type <span className="text-emergency">*</span>
        </label>
        <select
          id="organizationType"
          value={form.organizationType}
          onChange={(e) => updateField('organizationType', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${fieldErrors.organizationType ? 'border-emergency' : 'border-border'}`}
        >
          {PARTNER_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {fieldErrors.organizationType && <p className="text-xs text-emergency mt-1">{fieldErrors.organizationType}</p>}
      </div>

      <div>
        <label htmlFor="partner-message" className="block text-sm font-medium text-foreground mb-1.5">
          Tell Us About Your Transportation Needs
        </label>
        <textarea
          id="partner-message"
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          rows={5}
          placeholder="Describe your patient transportation needs, estimated volume, any specific requirements..."
          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Partnership Inquiry
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  )
}
