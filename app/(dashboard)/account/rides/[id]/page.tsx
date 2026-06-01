import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Accessibility,
  Wallet,
  FileText,
  CheckCircle2,
  ExternalLinkIcon,
  NavigationIcon,
} from 'lucide-react'
import {
  formatRideStatus,
  formatTransportType,
  formatPayerType,
  formatRideType,
  formatDateTime,
  formatDate,
  formatPrice,
} from '@/lib/ride-helpers'

function formatDistance(miles: number | null | undefined): string {
  if (!miles) return '--'
  return `${miles.toFixed(1)} mi`
}

function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return '--'
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`
}

function googleMapsSearchUrl(address: string, lat?: number | null, lng?: number | null): string {
  if (lat && lng) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

function googleMapsDirectionsUrl(
  pickupAddress: string, pickupLat: number | null | undefined, pickupLng: number | null | undefined,
  dropoffAddress: string, dropoffLat: number | null | undefined, dropoffLng: number | null | undefined,
): string {
  const origin = pickupLat && pickupLng ? `${pickupLat},${pickupLng}` : encodeURIComponent(pickupAddress)
  const dest = dropoffLat && dropoffLng ? `${dropoffLat},${dropoffLng}` : encodeURIComponent(dropoffAddress)
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`
}

export default async function UserRideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params

  const ride = await db.ride.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!ride) {
    notFound()
  }

  const statusConfig = formatRideStatus(ride.status)

  // Build timeline entries from audit dates
  const timeline: { label: string; date: Date | null; icon: React.ReactNode }[] = [
    {
      label: 'Requested',
      date: ride.createdAt,
      icon: <FileText className="size-4" />,
    },
    {
      label: 'Reviewed',
      date: ride.reviewedAt,
      icon: <Clock className="size-4" />,
    },
    {
      label: 'Confirmed',
      date: ride.confirmedAt,
      icon: <CheckCircle2 className="size-4" />,
    },
    {
      label: 'Completed',
      date: ride.completedAt,
      icon: <CheckCircle2 className="size-4" />,
    },
  ]

  // If cancelled, add that too
  if (ride.cancelledAt) {
    timeline.push({
      label: 'Cancelled',
      date: ride.cancelledAt,
      icon: <Clock className="size-4" />,
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back button + status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" render={<Link href="/account/rides" />}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary">Ride Details</h1>
            <p className="text-xs text-muted-foreground">ID: {ride.publicId}</p>
          </div>
        </div>
        <Badge className={`${statusConfig.className} border-0 px-3 py-1 text-sm`}>
          {statusConfig.label}
        </Badge>
      </div>

      {/* Decline reason if applicable */}
      {ride.status === 'DECLINED' && ride.declineReason && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <p className="text-sm font-medium text-red-800">Reason for decline:</p>
            <p className="mt-1 text-sm text-red-700">{ride.declineReason}</p>
          </CardContent>
        </Card>
      )}

      {/* Ride Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            Ride Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ride Type
              </p>
              <p className="mt-1 text-sm font-medium">{formatRideType(ride.rideType)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pickup Date & Time
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatDateTime(ride.pickupDateTime)}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pickup Address
            </p>
            <div className="mt-1 flex items-start gap-2">
              <p className="text-sm flex-1">{ride.pickupAddress}</p>
              <a
                href={googleMapsSearchUrl(ride.pickupAddress, ride.pickupLat, ride.pickupLng)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 shrink-0 text-xs text-primary hover:underline"
                title="Open in Google Maps"
              >
                <ExternalLinkIcon className="size-3" />
                Map
              </a>
            </div>
            {ride.pickupApt && (
              <p className="text-xs text-muted-foreground">Apt/Suite: {ride.pickupApt}</p>
            )}
            <p className="text-xs text-muted-foreground capitalize">
              Location: {ride.pickupLocationType.replace(/_/g, ' ')}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Drop-off Address
            </p>
            <div className="mt-1 flex items-start gap-2">
              <p className="text-sm flex-1">{ride.dropoffAddress}</p>
              <a
                href={googleMapsSearchUrl(ride.dropoffAddress, ride.dropoffLat, ride.dropoffLng)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 shrink-0 text-xs text-primary hover:underline"
                title="Open in Google Maps"
              >
                <ExternalLinkIcon className="size-3" />
                Map
              </a>
            </div>
            {ride.dropoffFacilityName && (
              <p className="text-xs text-muted-foreground">
                Facility: {ride.dropoffFacilityName}
              </p>
            )}
            {ride.dropoffDepartment && (
              <p className="text-xs text-muted-foreground">
                Department: {ride.dropoffDepartment}
              </p>
            )}
            {ride.dropoffAppointmentTime && (
              <p className="text-xs text-muted-foreground">
                Appointment: {formatDateTime(ride.dropoffAppointmentTime)}
              </p>
            )}
          </div>

          {/* View Route button */}
          <div className="pt-2">
            <a
              href={googleMapsDirectionsUrl(
                ride.pickupAddress, ride.pickupLat, ride.pickupLng,
                ride.dropoffAddress, ride.dropoffLat, ride.dropoffLng,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <NavigationIcon className="size-4" />
              View Route on Map
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Passenger Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            Passenger Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Name
              </p>
              <p className="mt-1 text-sm font-medium">{ride.passengerName}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Phone
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm">
                <Phone className="size-3 text-muted-foreground" />
                {ride.passengerPhone}
              </p>
            </div>
            {ride.passengerEmail && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm">
                  <Mail className="size-3 text-muted-foreground" />
                  {ride.passengerEmail}
                </p>
              </div>
            )}
            {ride.emergencyContact && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Emergency Contact
                </p>
                <p className="mt-1 text-sm">{ride.emergencyContact}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transport Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="size-4 text-primary" />
            Transport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Transport Type
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatTransportType(ride.transportType)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Assistance
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {ride.needsDoorAssist && (
                  <Badge variant="secondary" className="text-xs">Door Assist</Badge>
                )}
                {ride.needsBuildingAssist && (
                  <Badge variant="secondary" className="text-xs">Building Assist</Badge>
                )}
                {ride.hasCompanion && (
                  <Badge variant="secondary" className="text-xs">Has Companion</Badge>
                )}
                {ride.hasStairs && (
                  <Badge variant="secondary" className="text-xs">Stairs</Badge>
                )}
                {!ride.needsDoorAssist && !ride.needsBuildingAssist && !ride.hasCompanion && !ride.hasStairs && (
                  <span className="text-sm text-muted-foreground">None requested</span>
                )}
              </div>
            </div>
            {ride.transportType === 'wheelchair' && (
              <>
                {ride.wheelchairOwned !== null && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Wheelchair
                    </p>
                    <p className="mt-1 text-sm">
                      {ride.wheelchairOwned ? 'Patient-owned' : 'Needs wheelchair provided'}
                    </p>
                  </div>
                )}
                {ride.wheelchairPowered !== null && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Type
                    </p>
                    <p className="mt-1 text-sm">
                      {ride.wheelchairPowered ? 'Powered/Electric' : 'Manual'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="size-4 text-primary" />
            Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Payer Type
            </p>
            <p className="mt-1 text-sm font-medium">{formatPayerType(ride.payerType)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Route & Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            Route & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Distance
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatDistance(ride.estimatedMiles)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Travel Time
              </p>
              <p className="mt-1 text-sm font-medium">
                {formatDuration(ride.estimatedDuration)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Estimated Price
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {formatPrice(ride.estimatedPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Final Price
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {ride.finalPrice !== null ? formatPrice(ride.finalPrice) : <span className="text-sm font-normal text-muted-foreground">Pending confirmation</span>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {(ride.specialInstructions || ride.gateCode || ride.mobilityNotes) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ride.specialInstructions && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Special Instructions
                </p>
                <p className="mt-1 text-sm">{ride.specialInstructions}</p>
              </div>
            )}
            {ride.gateCode && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Gate Code
                </p>
                <p className="mt-1 text-sm">{ride.gateCode}</p>
              </div>
            )}
            {ride.mobilityNotes && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Mobility Notes
                </p>
                <p className="mt-1 text-sm">{ride.mobilityNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4">
            {timeline.map((entry, index) => {
              const hasDate = entry.date !== null
              return (
                <div key={entry.label} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
                      hasDate
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {entry.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        hasDate ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {entry.label}
                    </p>
                    {hasDate ? (
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(entry.date!)}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Pending</p>
                    )}
                  </div>
                  {/* Connector line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-[13px] mt-7 h-6 w-px bg-border" style={{ top: `${index * 56}px` }} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Back button */}
      <div className="pb-4">
        <Button variant="outline" render={<Link href="/account/rides" />}>
          <ArrowLeft className="size-4" />
          Back to My Rides
        </Button>
      </div>
    </div>
  )
}
