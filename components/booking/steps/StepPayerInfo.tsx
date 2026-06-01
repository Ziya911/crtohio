'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { type PayerInfoData } from '@/lib/validations/booking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Building2, Landmark, Wallet, Banknote, CreditCard, AlertTriangle } from 'lucide-react'

const PAYER_TYPES = [
  // { value: 'medicaid', label: 'Medicaid', icon: ShieldCheck }, // Temporarily disabled
  { value: 'insurance', label: 'Insurance', icon: Landmark },
  { value: 'facility', label: 'Facility', icon: Building2 },
  { value: 'private_pay', label: 'Private Pay', icon: Wallet },
  { value: 'cash', label: 'Cash', icon: Banknote },
  { value: 'card', label: 'Card', icon: CreditCard },
] as const

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepPayerInfo({ registerValidate }: Props) {
  const { payerInfo: saved, setPayerInfo, markCompleted, pickupInfo } = useBookingStore()

  const [payerType, setPayerType] = useState<string>(
    saved?.payerType || 'insurance'
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Insurance fields
  const [insuranceCompany, setInsuranceCompany] = useState(
    (saved as { insuranceCompany?: string } | null)?.insuranceCompany || ''
  )
  const [memberId, setMemberId] = useState(
    (saved as { memberId?: string } | null)?.memberId || ''
  )
  const [insurancePhone, setInsurancePhone] = useState(
    (saved as { insurancePhone?: string } | null)?.insurancePhone || ''
  )
  const [policyHolderName, setPolicyHolderName] = useState(
    (saved as { policyHolderName?: string } | null)?.policyHolderName || ''
  )

  // Facility fields
  const [facilityName, setFacilityName] = useState(
    (saved as { facilityName?: string } | null)?.facilityName || ''
  )
  const [contactPerson, setContactPerson] = useState(
    (saved as { contactPerson?: string } | null)?.contactPerson || ''
  )
  const [facilityPhone, setFacilityPhone] = useState(
    (saved as { facilityPhone?: string } | null)?.facilityPhone || ''
  )
  const [facilityEmail, setFacilityEmail] = useState(
    (saved as { facilityEmail?: string } | null)?.facilityEmail || ''
  )
  const [billingContact, setBillingContact] = useState(
    (saved as { billingContact?: string } | null)?.billingContact || ''
  )

  // Private pay
  const [privatePayAcknowledged, setPrivatePayAcknowledged] = useState(
    (saved as { privatePayAcknowledged?: boolean } | null)
      ?.privatePayAcknowledged || false
  )

  // Cash
  const [cashAcknowledged, setCashAcknowledged] = useState(
    (saved as { cashAcknowledged?: boolean } | null)
      ?.cashAcknowledged || false
  )

  // Card
  const [cardAcknowledged, setCardAcknowledged] = useState(
    (saved as { cardAcknowledged?: boolean } | null)
      ?.cardAcknowledged || false
  )

  // Check if pickup is at least 24 hours from now
  function isPickupAtLeast24HoursAway(): boolean {
    if (!pickupInfo?.pickupDate || !pickupInfo?.pickupTime) return false
    const pickupDateTime = new Date(`${pickupInfo.pickupDate}T${pickupInfo.pickupTime}`)
    const now = new Date()
    const diffMs = pickupDateTime.getTime() - now.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return diffHours >= 24
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (payerType === 'insurance') {
      if (!insuranceCompany)
        newErrors.insuranceCompany = 'Insurance company is required'
      if (!memberId) newErrors.memberId = 'Member ID is required'
      if (!isPickupAtLeast24HoursAway()) {
        newErrors.insurance24hr = 'Insurance rides must be booked at least 24 hours before pickup time.'
      }
    } else if (payerType === 'facility') {
      if (!facilityName) newErrors.facilityName = 'Facility name is required'
      if (!contactPerson) newErrors.contactPerson = 'Contact person is required'
      if (!facilityPhone) newErrors.facilityPhone = 'Phone number is required'
    } else if (payerType === 'private_pay') {
      if (!privatePayAcknowledged)
        newErrors.privatePayAcknowledged = 'You must acknowledge the terms'
    } else if (payerType === 'cash') {
      if (!cashAcknowledged)
        newErrors.cashAcknowledged = 'You must acknowledge the terms'
    } else if (payerType === 'card') {
      if (!cardAcknowledged)
        newErrors.cardAcknowledged = 'You must acknowledge the terms'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    let data: PayerInfoData
    if (payerType === 'insurance') {
      data = {
        payerType: 'insurance',
        insuranceCompany,
        memberId,
        insurancePhone,
        policyHolderName,
      }
    } else if (payerType === 'facility') {
      data = {
        payerType: 'facility',
        facilityName,
        contactPerson,
        facilityPhone,
        facilityEmail,
        billingContact,
      }
    } else if (payerType === 'cash') {
      data = {
        payerType: 'cash',
        cashAcknowledged: true,
      }
    } else if (payerType === 'card') {
      data = {
        payerType: 'card',
        cardAcknowledged: true,
      }
    } else {
      data = {
        payerType: 'private_pay',
        privatePayAcknowledged: true,
      }
    }

    setPayerInfo(data)
    markCompleted(6)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  const insuranceNotEarly = payerType === 'insurance' && !isPickupAtLeast24HoursAway()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Payment Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How will this ride be paid for?
        </p>
      </div>

      {/* Payer type tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {PAYER_TYPES.map((type) => {
          const Icon = type.icon
          const selected = payerType === type.value
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                setPayerType(type.value)
                setErrors({})
              }}
              className={cn(
                'flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-all',
                selected
                  ? 'border-primary bg-primary text-white'
                  : 'border-border hover:border-primary/30'
              )}
            >
              <Icon
                className={cn(
                  'size-5',
                  selected ? 'text-white' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-xs font-semibold',
                  selected ? 'text-white' : 'text-muted-foreground'
                )}
              >
                {type.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Insurance 24-hour warning */}
      {payerType === 'insurance' && (
        <div className={cn(
          'flex items-start gap-3 rounded-lg border p-4',
          insuranceNotEarly
            ? 'border-red-300 bg-red-50'
            : 'border-amber-200 bg-amber-50'
        )}>
          <AlertTriangle className={cn(
            'size-5 shrink-0 mt-0.5',
            insuranceNotEarly ? 'text-red-600' : 'text-amber-600'
          )} />
          <div>
            <p className={cn(
              'text-sm font-semibold',
              insuranceNotEarly ? 'text-red-800' : 'text-amber-800'
            )}>
              Insurance rides require 24-hour advance booking
            </p>
            <p className={cn(
              'text-xs mt-1',
              insuranceNotEarly ? 'text-red-700' : 'text-amber-700'
            )}>
              We need at least 24 hours before the ride to contact your insurance provider and verify coverage.
              {insuranceNotEarly && ' Please select a pickup time at least 24 hours from now, or choose a different payment method.'}
            </p>
          </div>
        </div>
      )}
      {errors.insurance24hr && (
        <p className="text-xs text-red-600 -mt-4">{errors.insurance24hr}</p>
      )}

      {/* Conditional sub-forms */}
      {payerType === 'insurance' && (
        <div className="grid gap-5 sm:grid-cols-2 rounded-xl border border-border/60 bg-muted/20 p-5">
          <div>
            <Label>
              Insurance Company <span className="text-red-500">*</span>
            </Label>
            <Input
              value={insuranceCompany}
              onChange={(e) => {
                setInsuranceCompany(e.target.value)
                setErrors((p) => ({ ...p, insuranceCompany: '' }))
              }}
              placeholder="e.g., UnitedHealthcare"
              aria-invalid={!!errors.insuranceCompany}
            />
            {errors.insuranceCompany && (
              <p className="mt-1 text-xs text-red-600">
                {errors.insuranceCompany}
              </p>
            )}
          </div>
          <div>
            <Label>
              Member ID <span className="text-red-500">*</span>
            </Label>
            <Input
              value={memberId}
              onChange={(e) => {
                setMemberId(e.target.value)
                setErrors((p) => ({ ...p, memberId: '' }))
              }}
              placeholder="Enter member ID"
              aria-invalid={!!errors.memberId}
            />
            {errors.memberId && (
              <p className="mt-1 text-xs text-red-600">{errors.memberId}</p>
            )}
          </div>
          <div>
            <Label>Insurance Phone</Label>
            <Input
              type="tel"
              value={insurancePhone}
              onChange={(e) => setInsurancePhone(e.target.value)}
              placeholder="(800) 555-0100"
            />
          </div>
          <div>
            <Label>Policy Holder Name</Label>
            <Input
              value={policyHolderName}
              onChange={(e) => setPolicyHolderName(e.target.value)}
              placeholder="If different from passenger"
            />
          </div>
        </div>
      )}

      {payerType === 'facility' && (
        <div className="grid gap-5 sm:grid-cols-2 rounded-xl border border-border/60 bg-muted/20 p-5">
          <div>
            <Label>
              Facility Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={facilityName}
              onChange={(e) => {
                setFacilityName(e.target.value)
                setErrors((p) => ({ ...p, facilityName: '' }))
              }}
              placeholder="e.g., Good Samaritan Hospital"
              aria-invalid={!!errors.facilityName}
            />
            {errors.facilityName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.facilityName}
              </p>
            )}
          </div>
          <div>
            <Label>
              Contact Person <span className="text-red-500">*</span>
            </Label>
            <Input
              value={contactPerson}
              onChange={(e) => {
                setContactPerson(e.target.value)
                setErrors((p) => ({ ...p, contactPerson: '' }))
              }}
              placeholder="Contact name"
              aria-invalid={!!errors.contactPerson}
            />
            {errors.contactPerson && (
              <p className="mt-1 text-xs text-red-600">
                {errors.contactPerson}
              </p>
            )}
          </div>
          <div>
            <Label>
              Facility Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              type="tel"
              value={facilityPhone}
              onChange={(e) => {
                setFacilityPhone(e.target.value)
                setErrors((p) => ({ ...p, facilityPhone: '' }))
              }}
              placeholder="(513) 555-0100"
              aria-invalid={!!errors.facilityPhone}
            />
            {errors.facilityPhone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.facilityPhone}
              </p>
            )}
          </div>
          <div>
            <Label>Facility Email</Label>
            <Input
              type="email"
              value={facilityEmail}
              onChange={(e) => setFacilityEmail(e.target.value)}
              placeholder="transport@facility.com"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Billing Contact</Label>
            <Input
              value={billingContact}
              onChange={(e) => setBillingContact(e.target.value)}
              placeholder="Billing department contact info"
            />
          </div>
        </div>
      )}

      {payerType === 'private_pay' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800 mb-4">
            <strong>Private pay rides must be reviewed and confirmed before service.</strong>
            {' '}Our team will contact you with final pricing before your ride.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={privatePayAcknowledged}
              onChange={(e) => {
                setPrivatePayAcknowledged(e.target.checked)
                setErrors((p) => ({ ...p, privatePayAcknowledged: '' }))
              }}
              className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-amber-900">
              I understand that this is a private pay ride and that pricing will
              be confirmed before service.
            </span>
          </label>
          {errors.privatePayAcknowledged && (
            <p className="mt-2 text-xs text-red-600">
              {errors.privatePayAcknowledged}
            </p>
          )}
        </div>
      )}

      {payerType === 'cash' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800 mb-4">
            <strong>Cash payment is due at the time of service.</strong>
            {' '}Please have the exact amount ready. Our team will confirm pricing before your ride.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={cashAcknowledged}
              onChange={(e) => {
                setCashAcknowledged(e.target.checked)
                setErrors((p) => ({ ...p, cashAcknowledged: '' }))
              }}
              className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-amber-900">
              I understand that cash payment is required at the time of service.
            </span>
          </label>
          {errors.cashAcknowledged && (
            <p className="mt-2 text-xs text-red-600">
              {errors.cashAcknowledged}
            </p>
          )}
        </div>
      )}

      {payerType === 'card' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800 mb-4">
            <strong>Card payment will be processed at the time of service.</strong>
            {' '}Our team will confirm pricing before your ride. We accept all major credit and debit cards.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={cardAcknowledged}
              onChange={(e) => {
                setCardAcknowledged(e.target.checked)
                setErrors((p) => ({ ...p, cardAcknowledged: '' }))
              }}
              className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-amber-900">
              I understand that card payment will be processed at the time of service.
            </span>
          </label>
          {errors.cardAcknowledged && (
            <p className="mt-2 text-xs text-red-600">
              {errors.cardAcknowledged}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
