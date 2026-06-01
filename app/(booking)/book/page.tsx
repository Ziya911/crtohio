import type { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { generatePageMetadata } from '@/lib/seo'
import { SITE_NAME } from '@/lib/constants'
import { BookingWizard } from '@/components/booking/BookingWizard'

export const metadata: Metadata = generatePageMetadata({
  title: 'Book a Ride',
  description:
    `Book your non-emergency medical transportation ride with ${SITE_NAME}. Easy online booking for Cincinnati, Mason, West Chester, and surrounding Ohio areas.`,
  path: '/book',
})

export default async function BookPage() {
  // Check if user is logged in for prefill
  let userPrefill: {
    name?: string
    email?: string
    phone?: string
    dob?: string
  } | null = null

  try {
    const session = await auth()
    if (session?.user?.id) {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { name: true, email: true, phone: true, dateOfBirth: true },
      })
      if (user) {
        userPrefill = {
          name: user.name || undefined,
          email: user.email,
          phone: user.phone || undefined,
          dob: user.dateOfBirth
            ? user.dateOfBirth.toISOString().split('T')[0]
            : undefined,
        }
      }
    }
  } catch {
    // Guest booking — no prefill
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          Book Your Ride
        </h1>
        <p className="mt-2 text-muted-foreground">
          Complete the form below to request a ride. All fields marked with{' '}
          <span className="text-red-500">*</span> are required.
        </p>
      </div>

      <BookingWizard userPrefill={userPrefill} />
    </div>
  )
}
