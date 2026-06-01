import { z } from 'zod'

// Step 1 — Ride Type
export const rideTypeSchema = z.object({
  rideType: z.enum(['one_way', 'round_trip', 'recurring']),
  recurringPattern: z
    .enum(['daily', 'weekly', 'mwf', 'custom'])
    .optional()
    .nullable(),
})

// Step 2 — Passenger Info
export const passengerInfoSchema = z.object({
  passengerName: z.string().min(2, 'Full name is required'),
  passengerDob: z.string().min(1, 'Date of birth is required'),
  passengerPhone: z
    .string()
    .min(10, 'Valid phone number is required')
    .regex(/^[\d\s()+-]+$/, 'Invalid phone number format'),
  passengerEmail: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  emergencyContact: z.string().optional().or(z.literal('')),
})

// Step 3 — Pickup Info
export const pickupInfoSchema = z.object({
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  pickupApt: z.string().optional().or(z.literal('')),
  pickupLocationType: z.enum([
    'home',
    'hospital',
    'nursing_home',
    'assisted_living',
    'dialysis_center',
    'clinic',
    'other',
  ]),
  pickupDate: z.string().min(1, 'Pickup date is required'),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  pickupLat: z.number().optional().nullable(),
  pickupLng: z.number().optional().nullable(),
})

// Step 4 — Dropoff Info
export const dropoffInfoSchema = z.object({
  dropoffAddress: z.string().min(5, 'Drop-off address is required'),
  dropoffFacilityName: z.string().optional().or(z.literal('')),
  dropoffAppointmentTime: z.string().optional().or(z.literal('')),
  dropoffDepartment: z.string().optional().or(z.literal('')),
  dropoffLat: z.number().optional().nullable(),
  dropoffLng: z.number().optional().nullable(),
})

// Step 5 — Transport Type
export const transportTypeSchema = z
  .object({
    transportType: z.enum(['ambulatory', 'wheelchair']),
    needsDoorAssist: z.boolean().default(false),
    needsBuildingAssist: z.boolean().default(false),
    hasCompanion: z.boolean().default(false),
    wheelchairOwned: z.boolean().optional().nullable(),
    wheelchairPowered: z.boolean().optional().nullable(),
    hasStairs: z.boolean().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.transportType === 'wheelchair') {
      if (data.wheelchairOwned === null || data.wheelchairOwned === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please indicate if you own a wheelchair',
          path: ['wheelchairOwned'],
        })
      }
    }
  })

// Step 6 — Payer Info (discriminated by payerType)
const medicaidPayerSchema = z.object({
  payerType: z.literal('medicaid'),
  medicaidId: z.string().min(1, 'Medicaid ID is required'),
  medicaidDob: z.string().min(1, 'Date of birth is required'),
  medicaidPlanName: z.string().min(1, 'Plan name is required'),
  rideApprovalStatus: z.string().optional().or(z.literal('')),
})

const insurancePayerSchema = z.object({
  payerType: z.literal('insurance'),
  insuranceCompany: z.string().min(1, 'Insurance company is required'),
  memberId: z.string().min(1, 'Member ID is required'),
  insurancePhone: z.string().optional().or(z.literal('')),
  policyHolderName: z.string().optional().or(z.literal('')),
})

const facilityPayerSchema = z.object({
  payerType: z.literal('facility'),
  facilityName: z.string().min(1, 'Facility name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  facilityPhone: z.string().min(1, 'Facility phone is required'),
  facilityEmail: z.string().optional().or(z.literal('')),
  billingContact: z.string().optional().or(z.literal('')),
})

const privatePayPayerSchema = z.object({
  payerType: z.literal('private_pay'),
  privatePayAcknowledged: z
    .boolean()
    .refine((v) => v === true, 'You must acknowledge the private pay terms'),
})

const cashPayerSchema = z.object({
  payerType: z.literal('cash'),
  cashAcknowledged: z
    .boolean()
    .refine((v) => v === true, 'You must acknowledge the cash payment terms'),
})

const cardPayerSchema = z.object({
  payerType: z.literal('card'),
  cardAcknowledged: z
    .boolean()
    .refine((v) => v === true, 'You must acknowledge the card payment terms'),
})

export const payerInfoSchema = z.discriminatedUnion('payerType', [
  // medicaidPayerSchema, // Temporarily disabled
  insurancePayerSchema,
  facilityPayerSchema,
  privatePayPayerSchema,
  cashPayerSchema,
  cardPayerSchema,
])

// Step 8 — Ride Notes
export const rideNotesSchema = z.object({
  specialInstructions: z.string().max(1000).optional().or(z.literal('')),
  gateCode: z.string().max(50).optional().or(z.literal('')),
  mobilityNotes: z.string().max(500).optional().or(z.literal('')),
  preferredLanguage: z.string().optional().or(z.literal('')),
  additionalInfo: z.string().max(1000).optional().or(z.literal('')),
})

// Combined full booking schema for API submission
export const fullBookingSchema = rideTypeSchema
  .merge(passengerInfoSchema)
  .merge(pickupInfoSchema)
  .merge(dropoffInfoSchema)
  .merge(
    z.object({
      transportType: z.enum(['ambulatory', 'wheelchair']),
      needsDoorAssist: z.boolean().default(false),
      needsBuildingAssist: z.boolean().default(false),
      hasCompanion: z.boolean().default(false),
      wheelchairOwned: z.boolean().optional().nullable(),
      wheelchairPowered: z.boolean().optional().nullable(),
      hasStairs: z.boolean().optional().nullable(),
    })
  )
  .merge(
    z.object({
      payerType: z.enum(['medicaid', 'insurance', 'facility', 'private_pay', 'cash', 'card']),
      payerDetails: z.record(z.string(), z.unknown()),
    })
  )
  .merge(rideNotesSchema)

// Inferred types
export type RideTypeData = z.infer<typeof rideTypeSchema>
export type PassengerInfoData = z.infer<typeof passengerInfoSchema>
export type PickupInfoData = z.infer<typeof pickupInfoSchema>
export type DropoffInfoData = z.infer<typeof dropoffInfoSchema>
export type TransportTypeData = z.infer<typeof transportTypeSchema>
export type PayerInfoData = z.infer<typeof payerInfoSchema>
export type RideNotesData = z.infer<typeof rideNotesSchema>
export type FullBookingData = z.infer<typeof fullBookingSchema>
