import { z } from 'zod'

export const partnerInquirySchema = z.object({
  organizationName: z.string().min(2, 'Organization name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  organizationType: z.string().min(1, 'Please select an organization type'),
  message: z.string().optional(),
})

export type PartnerInquiryInput = z.infer<typeof partnerInquirySchema>
