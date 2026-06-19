'use client'

import { useState } from 'react'
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Clock,
  ShieldCheck,
  HeartPulse,
  Accessibility,
  CalendarDays,
  FileCheck,
  Loader2,
  Send,
  CheckCircle,
  Briefcase,
  Car,
} from 'lucide-react'
import { driverApplicationSchema, type DriverApplicationInput } from '@/lib/validations/driver-application'

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export function DriverApplicationForm() {
  const [form, setForm] = useState<Record<string, string | string[] | boolean>>({
    fullName: '',
    phone: '',
    email: '',
    licenseStatus: '',
    licenseNumber: '',
    yearsExperience: '',
    cleanDrivingRecord: '',
    hasCprCert: '',
    previousTransportExperience: '',
    wheelchairExperience: '',
    hasOwnCar: '',
    carMake: '',
    carModel: '',
    availability: [],
    backgroundCheckAgreement: false,
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  function updateField(field: string, value: string | string[] | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function toggleAvailability(day: string) {
    const current = (form.availability as string[]) || []
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day]
    updateField('availability', updated)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const result = driverApplicationSchema.safeParse(form)
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-has-error="true"]')
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/driver-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit application')
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
      <div className="bg-white rounded-xl p-8 md:p-10 shadow-[var(--shadow-card)] text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-accent-light">
          <CheckCircle className="size-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground leading-relaxed">
          Thank you for your interest in joining our team. Our hiring team will review your application
          and reach out within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6" noValidate>
      {error && (
        <div className="rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div data-has-error={!!fieldErrors.fullName}>
        <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
          <User className="size-4 text-primary" />
          Full Name <span className="text-emergency">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          placeholder="Your full legal name"
          value={form.fullName as string}
          onChange={(e) => updateField('fullName', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.fullName ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.fullName && <p className="text-xs text-emergency mt-1">{fieldErrors.fullName}</p>}
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-has-error={!!fieldErrors.phone}>
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
            <Phone className="size-4 text-primary" />
            Phone Number <span className="text-emergency">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(513) 555-0100"
            value={form.phone as string}
            onChange={(e) => updateField('phone', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.phone ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.phone && <p className="text-xs text-emergency mt-1">{fieldErrors.phone}</p>}
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            By providing your phone number, you consent to receive SMS messages from Care Ride Transportation regarding your driver application. Message &amp; data rates may apply. Reply STOP to opt out.
          </p>
        </div>
        <div data-has-error={!!fieldErrors.email}>
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
            <Mail className="size-4 text-primary" />
            Email Address <span className="text-emergency">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={form.email as string}
            onChange={(e) => updateField('email', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.email ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.email && <p className="text-xs text-emergency mt-1">{fieldErrors.email}</p>}
        </div>
      </div>

      {/* License Status & Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div data-has-error={!!fieldErrors.licenseStatus}>
          <label htmlFor="licenseStatus" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
            <CreditCard className="size-4 text-primary" />
            License Status <span className="text-emergency">*</span>
          </label>
          <select
            id="licenseStatus"
            value={form.licenseStatus as string}
            onChange={(e) => updateField('licenseStatus', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.licenseStatus ? 'border-emergency' : 'border-border'}`}
          >
            <option value="">Select status</option>
            <option value="valid">Valid</option>
            <option value="suspended">Suspended</option>
            <option value="revoked">Revoked</option>
            <option value="expired">Expired</option>
          </select>
          {fieldErrors.licenseStatus && <p className="text-xs text-emergency mt-1">{fieldErrors.licenseStatus}</p>}
        </div>
        <div data-has-error={!!fieldErrors.licenseNumber}>
          <label htmlFor="licenseNumber" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
            <CreditCard className="size-4 text-primary" />
            License Number <span className="text-emergency">*</span>
          </label>
          <input
            type="text"
            id="licenseNumber"
            placeholder="Your license number"
            value={form.licenseNumber as string}
            onChange={(e) => updateField('licenseNumber', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.licenseNumber ? 'border-emergency' : 'border-border'}`}
          />
          {fieldErrors.licenseNumber && <p className="text-xs text-emergency mt-1">{fieldErrors.licenseNumber}</p>}
        </div>
      </div>

      {/* Years of Experience */}
      <div data-has-error={!!fieldErrors.yearsExperience}>
        <label htmlFor="yearsExperience" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
          <Clock className="size-4 text-primary" />
          Years of Driving Experience <span className="text-emergency">*</span>
        </label>
        <select
          id="yearsExperience"
          value={form.yearsExperience as string}
          onChange={(e) => updateField('yearsExperience', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.yearsExperience ? 'border-emergency' : 'border-border'}`}
        >
          <option value="">Select experience</option>
          <option value="0-1">Less than 1 year</option>
          <option value="1-3">1 to 3 years</option>
          <option value="3-5">3 to 5 years</option>
          <option value="5-10">5 to 10 years</option>
          <option value="10+">10+ years</option>
        </select>
        {fieldErrors.yearsExperience && <p className="text-xs text-emergency mt-1">{fieldErrors.yearsExperience}</p>}
      </div>

      {/* Clean Driving Record */}
      <fieldset data-has-error={!!fieldErrors.cleanDrivingRecord}>
        <legend className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <ShieldCheck className="size-4 text-primary" />
          Do you have a clean driving record? <span className="text-emergency">*</span>
        </legend>
        <div className="flex gap-6">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="cleanDrivingRecord"
                value={val}
                checked={form.cleanDrivingRecord === val}
                onChange={(e) => updateField('cleanDrivingRecord', e.target.value)}
                className="w-4 h-4 text-primary accent-primary"
              />
              <span className="text-sm text-foreground capitalize">{val}</span>
            </label>
          ))}
        </div>
        {fieldErrors.cleanDrivingRecord && <p className="text-xs text-emergency mt-1">{fieldErrors.cleanDrivingRecord}</p>}
      </fieldset>

      {/* CPR / First Aid */}
      <fieldset data-has-error={!!fieldErrors.hasCprCert}>
        <legend className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <HeartPulse className="size-4 text-primary" />
          Do you have CPR / First Aid certification? <span className="text-emergency">*</span>
        </legend>
        <div className="flex gap-6">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasCprCert"
                value={val}
                checked={form.hasCprCert === val}
                onChange={(e) => updateField('hasCprCert', e.target.value)}
                className="w-4 h-4 text-primary accent-primary"
              />
              <span className="text-sm text-foreground capitalize">{val}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          CPR/First Aid certification is required. Company-sponsored training is available for candidates who do not yet hold certification.
        </p>
        {fieldErrors.hasCprCert && <p className="text-xs text-emergency mt-1">{fieldErrors.hasCprCert}</p>}
      </fieldset>

      {/* Previous Transport Experience */}
      <div data-has-error={!!fieldErrors.previousTransportExperience}>
        <label htmlFor="previousTransportExperience" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
          <Briefcase className="size-4 text-primary" />
          Previous Transportation / Medical Transport Experience
        </label>
        <textarea
          id="previousTransportExperience"
          rows={3}
          placeholder="Describe any relevant experience in transportation or medical transport..."
          value={form.previousTransportExperience as string}
          onChange={(e) => updateField('previousTransportExperience', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-colors ${fieldErrors.previousTransportExperience ? 'border-emergency' : 'border-border'}`}
        />
        {fieldErrors.previousTransportExperience && <p className="text-xs text-emergency mt-1">{fieldErrors.previousTransportExperience}</p>}
      </div>

      {/* Wheelchair Assistance Experience */}
      <fieldset data-has-error={!!fieldErrors.wheelchairExperience}>
        <legend className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Accessibility className="size-4 text-primary" />
          Do you have wheelchair assistance experience? <span className="text-emergency">*</span>
        </legend>
        <div className="flex gap-6">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wheelchairExperience"
                value={val}
                checked={form.wheelchairExperience === val}
                onChange={(e) => updateField('wheelchairExperience', e.target.value)}
                className="w-4 h-4 text-primary accent-primary"
              />
              <span className="text-sm text-foreground capitalize">{val}</span>
            </label>
          ))}
        </div>
        {fieldErrors.wheelchairExperience && <p className="text-xs text-emergency mt-1">{fieldErrors.wheelchairExperience}</p>}
      </fieldset>

      {/* Own Car */}
      <fieldset data-has-error={!!fieldErrors.hasOwnCar}>
        <legend className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Car className="size-4 text-primary" />
          Do you have your own car? <span className="text-emergency">*</span>
        </legend>
        <div className="flex gap-6">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasOwnCar"
                value={val}
                checked={form.hasOwnCar === val}
                onChange={(e) => updateField('hasOwnCar', e.target.value)}
                className="w-4 h-4 text-primary accent-primary"
              />
              <span className="text-sm text-foreground capitalize">{val}</span>
            </label>
          ))}
        </div>
        {fieldErrors.hasOwnCar && <p className="text-xs text-emergency mt-1">{fieldErrors.hasOwnCar}</p>}
      </fieldset>

      {/* Car Make & Model (conditional) */}
      {form.hasOwnCar === 'yes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div data-has-error={!!fieldErrors.carMake}>
            <label htmlFor="carMake" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <Car className="size-4 text-primary" />
              Car Make <span className="text-emergency">*</span>
            </label>
            <input
              type="text"
              id="carMake"
              placeholder="e.g., Toyota, Honda, Ford"
              value={form.carMake as string}
              onChange={(e) => updateField('carMake', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.carMake ? 'border-emergency' : 'border-border'}`}
            />
            {fieldErrors.carMake && <p className="text-xs text-emergency mt-1">{fieldErrors.carMake}</p>}
          </div>
          <div data-has-error={!!fieldErrors.carModel}>
            <label htmlFor="carModel" className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
              <Car className="size-4 text-primary" />
              Car Model <span className="text-emergency">*</span>
            </label>
            <input
              type="text"
              id="carModel"
              placeholder="e.g., Camry, Civic, Explorer"
              value={form.carModel as string}
              onChange={(e) => updateField('carModel', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.carModel ? 'border-emergency' : 'border-border'}`}
            />
            {fieldErrors.carModel && <p className="text-xs text-emergency mt-1">{fieldErrors.carModel}</p>}
          </div>
        </div>
      )}

      {/* Availability */}
      <fieldset data-has-error={!!fieldErrors.availability}>
        <legend className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <CalendarDays className="size-4 text-primary" />
          Availability / Working Days <span className="text-emergency">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = (form.availability as string[]).includes(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleAvailability(day)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  isSelected
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-foreground border-border hover:border-primary/50'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
        {fieldErrors.availability && <p className="text-xs text-emergency mt-1">{fieldErrors.availability}</p>}
      </fieldset>

      {/* Background Check Agreement */}
      <div data-has-error={!!fieldErrors.backgroundCheckAgreement}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.backgroundCheckAgreement as boolean}
            onChange={(e) => updateField('backgroundCheckAgreement', e.target.checked)}
            className="w-4 h-4 mt-0.5 text-primary accent-primary"
          />
          <span className="text-sm text-foreground leading-relaxed">
            <FileCheck className="size-4 text-primary inline mr-1 -mt-0.5" />
            I agree to undergo a comprehensive background check and driving record review as part of the
            hiring process. All information provided will be kept confidential. <span className="text-emergency">*</span>
          </span>
        </label>
        {fieldErrors.backgroundCheckAgreement && <p className="text-xs text-emergency mt-1">{fieldErrors.backgroundCheckAgreement}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Submit Application
          </>
        )}
      </button>
    </form>
  )
}
