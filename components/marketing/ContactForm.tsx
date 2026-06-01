'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, Loader2, CheckCircle } from 'lucide-react'
import { contactFormSchema } from '@/lib/validations/contact'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Booking Question',
  'Insurance & Billing',
  'Service Area Question',
  'Partnership Inquiry',
  'Feedback or Complaint',
  'Other',
]

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

    const result = contactFormSchema.safeParse(form)
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send message')
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
        <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 border border-border shadow-[var(--shadow-card)] space-y-5" noValidate>
      {error && (
        <div className="rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
          Full Name <span className="text-emergency">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="Your full name"
          className={`w-full px-4 py-3 bg-white border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${fieldErrors.name ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.name && <p className="text-xs text-emergency mt-1">{fieldErrors.name}</p>}
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email Address <span className="text-emergency">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 bg-white border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${fieldErrors.email ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.email && <p className="text-xs text-emergency mt-1">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            id="contact-phone"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">
          Subject <span className="text-emergency">*</span>
        </label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none ${fieldErrors.subject ? 'border-emergency' : 'border-border'}`}
        >
          <option value="">Select a subject</option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {fieldErrors.subject && <p className="text-xs text-emergency mt-1">{fieldErrors.subject}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message <span className="text-emergency">*</span>
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          rows={5}
          placeholder="Tell us how we can help you..."
          className={`w-full px-4 py-3 bg-white border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y min-h-[120px] ${fieldErrors.message ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.message && <p className="text-xs text-emergency mt-1">{fieldErrors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground">
        By submitting this form, you agree to our{' '}
        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        We will never share your information with third parties.
      </p>
    </form>
  )
}
