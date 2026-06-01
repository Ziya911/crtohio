import { z } from 'zod'

export const driverApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255)
    .transform((val) => val.toLowerCase().trim()),
  licenseStatus: z
    .string()
    .min(1, 'Please select your license status')
    .refine((v) => ['valid', 'suspended', 'revoked', 'expired'].includes(v), {
      message: 'Please select a valid license status',
    }),
  licenseNumber: z
    .string()
    .min(4, 'Please enter a valid license number')
    .max(20, 'License number is too long'),
  yearsExperience: z
    .string()
    .min(1, 'Please select your years of experience'),
  cleanDrivingRecord: z
    .string()
    .min(1, 'Please select an option')
    .refine((v) => ['yes', 'no'].includes(v), { message: 'Please select an option' }),
  hasCprCert: z
    .string()
    .min(1, 'Please select an option')
    .refine((v) => ['yes', 'no'].includes(v), { message: 'Please select an option' }),
  previousTransportExperience: z
    .string()
    .max(500, 'Must be 500 characters or less')
    .optional()
    .or(z.literal('')),
  wheelchairExperience: z
    .string()
    .min(1, 'Please select an option')
    .refine((v) => ['yes', 'no'].includes(v), { message: 'Please select an option' }),
  hasOwnCar: z
    .string()
    .min(1, 'Please select an option')
    .refine((v) => ['yes', 'no'].includes(v), { message: 'Please select an option' }),
  carMake: z.string().max(100).optional().or(z.literal('')),
  carModel: z.string().max(100).optional().or(z.literal('')),
  availability: z
    .array(z.string())
    .min(1, 'Please select at least one day'),
  backgroundCheckAgreement: z.literal(true, {
    error: 'You must agree to a background check',
  }),
}).superRefine((data, ctx) => {
  if (data.hasOwnCar === 'yes') {
    if (!data.carMake || data.carMake.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Car make is required',
        path: ['carMake'],
      })
    }
    if (!data.carModel || data.carModel.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Car model is required',
        path: ['carModel'],
      })
    }
  }
})

export type DriverApplicationInput = z.infer<typeof driverApplicationSchema>
