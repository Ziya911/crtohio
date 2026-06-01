import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  ArrowLeftIcon,
  BuildingIcon,
  DollarSignIcon,
  InfoIcon,
  PlugZapIcon,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import {
  SITE_URL,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  PRICING_CONFIG,
} from '@/lib/constants'
import { ApiTestPanel } from '@/components/dashboard/ApiTestPanel'

function EnvStatus({ value, label }: { value: string | undefined; label: string }) {
  const isSet = Boolean(value)
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 ml-4 ${isSet ? 'text-green-700' : 'text-red-600'}`}>
        {isSet ? (
          <><CheckCircle2 className="size-3.5" /> Configured</>
        ) : (
          <><XCircle className="size-3.5" /> Not set</>
        )}
      </span>
    </div>
  )
}

export default async function AdminSettingsPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const googleMapsClientKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const googleMapsServerKey = process.env.GOOGLE_MAPS_SERVER_KEY
  const resendKey = process.env.RESEND_API_KEY
  const resendFrom = process.env.RESEND_FROM_EMAIL

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Settings</h1>
          <p className="text-muted-foreground">
            View current business and API configuration.
          </p>
        </div>
      </div>

      {/* API Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlugZapIcon className="size-4" />
            API Integrations
          </CardTitle>
          <CardDescription>
            Connection status for third-party services. Test each connection below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Key status */}
          <div className="rounded-lg border border-border px-4">
            <EnvStatus
              value={googleMapsClientKey}
              label="Google Maps Client Key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)"
            />
            <EnvStatus
              value={googleMapsServerKey}
              label="Google Maps Server Key (GOOGLE_MAPS_SERVER_KEY)"
            />
            <EnvStatus value={resendKey} label="Resend API Key (RESEND_API_KEY)" />
            <EnvStatus
              value={resendFrom}
              label={`Email From: ${resendFrom || 'not set'}`}
            />
          </div>

          {/* Live tests */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Live Connection Tests
            </p>
            <ApiTestPanel />
          </div>

          {/* Resend warning if using test domain */}
          {resendFrom === 'onboarding@resend.dev' && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
              <InfoIcon className="size-3.5 mt-0.5 shrink-0" />
              <span>
                <strong>Using Resend test address.</strong> Emails will only be delivered to the email
                you registered with on Resend. To send to anyone, verify your domain{' '}
                <strong>{SITE_URL.replace(/^https?:\/\//, '')}</strong> in the Resend dashboard, then update{' '}
                <code className="bg-amber-100 px-1 rounded">RESEND_FROM_EMAIL</code> to{' '}
                <strong>operations@{SITE_URL.replace(/^https?:\/\//, '')}</strong>.
              </span>
            </div>
          )}

          {!googleMapsServerKey && (
            <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs text-blue-800">
              <InfoIcon className="size-3.5 mt-0.5 shrink-0" />
              <span>
                <strong>GOOGLE_MAPS_SERVER_KEY is not set.</strong> This key is needed for server-side
                distance calculation and geocoding in the booking flow. Add it to{' '}
                <code className="bg-blue-100 px-1 rounded">.env</code> when setting up the booking
                system.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BuildingIcon className="size-4" />
            Business Information
          </CardTitle>
          <CardDescription>
            Current business contact details displayed across the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Phone Number</dt>
              <dd className="mt-1 font-medium">{BUSINESS_PHONE}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Email Address</dt>
              <dd className="mt-1 font-medium">{BUSINESS_EMAIL}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Business Address</dt>
              <dd className="mt-1 font-medium">{BUSINESS_ADDRESS}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Business Hours</dt>
              <dd className="mt-1 font-medium">{BUSINESS_HOURS}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Pricing Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSignIcon className="size-4" />
            Pricing Configuration
          </CardTitle>
          <CardDescription>
            Current pricing parameters used for ride estimates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Base Fare (Ambulatory)</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.baseFareAmbulatory.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Base Fare (Wheelchair)</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.baseFareWheelchair.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Per Mile (Ambulatory)</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.perMileAmbulatory.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Per Mile (Wheelchair)</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.perMileWheelchair.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">After Hours Surcharge</dt>
              <dd className="mt-1 text-lg font-bold">+{((PRICING_CONFIG.afterHoursMultiplier - 1) * 100).toFixed(0)}% on base</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Building Assist Surcharge</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.buildingAssist.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Stairs Surcharge</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.stairs.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Wait Grace Period</dt>
              <dd className="mt-1 text-lg font-bold">{PRICING_CONFIG.waitGraceMinutes} min</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Waiting Time (per min)</dt>
              <dd className="mt-1 text-lg font-bold">${PRICING_CONFIG.waitPerMinute.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Round Trip Discount</dt>
              <dd className="mt-1 text-lg font-bold">
                {((1 - PRICING_CONFIG.roundTripDiscount) * 100).toFixed(0)}% off
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Developer Note */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="flex items-start gap-3 pt-4">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-medium text-amber-800">Need to update these settings?</p>
            <p className="mt-1 text-sm text-amber-700">
              Contact your developer to update business information or pricing configuration.
              These values are managed in the application code for security and consistency.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
