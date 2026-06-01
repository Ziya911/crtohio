import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { generatePageMetadata } from '@/lib/seo'
import { CheckCircle2, Phone, ArrowRight, UserPlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BUSINESS_PHONE, BOOKING_DISCLAIMER, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title: 'Ride Request Received',
  description: `Your ride request has been submitted to ${SITE_NAME}.`,
  path: '/book/confirmation',
})

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="container-custom py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="size-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold font-heading text-foreground md:text-3xl">
          Ride Request Received!
        </h1>

        {id && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Your Reference ID</p>
            <p className="mt-1 text-xl font-bold font-mono text-primary">
              {id}
            </p>
          </div>
        )}

        {/* Warning */}
        <Card className="mt-6 border-amber-200 bg-amber-50/80 text-left">
          <CardContent className="pt-4 space-y-2">
            <p className="text-sm font-medium text-amber-800">
              {BOOKING_DISCLAIMER}
            </p>
            <p className="text-sm font-bold text-amber-900">
              Our team will send you a confirmation email with the confirmed rate and price for your ride.
            </p>
          </CardContent>
        </Card>

        {/* What happens next */}
        <Card className="mt-4 text-left">
          <CardContent className="pt-4 space-y-3">
            <p className="font-semibold text-foreground">What happens next?</p>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Our dispatch team will review your request</li>
              <li>We will contact you to confirm ride details and pricing</li>
              <li>
                You will receive a confirmation once your ride is approved
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            <Phone className="size-4" />
            Call {BUSINESS_PHONE}
          </a>

          {isLoggedIn ? (
            <Link
              href="/account/rides"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              View My Rides
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <UserPlus className="size-4" />
              Create an Account
            </Link>
          )}
        </div>

        {!isLoggedIn && (
          <p className="mt-4 text-xs text-muted-foreground">
            Create an account to track your future rides and manage your
            bookings online.
          </p>
        )}

        <Link
          href="/"
          className="mt-8 inline-block text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
