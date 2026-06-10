import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeftIcon,
  UserIcon,
  MapPinIcon,
  CarIcon,
  WalletIcon,
  ClipboardListIcon,
  MessageSquareIcon,
  CalendarIcon,
  ClockIcon,
  ExternalLinkIcon,
  NavigationIcon,
} from 'lucide-react'
import RideAdminActions from '@/components/dashboard/RideAdminActions'
import type { RideStatus } from '@/lib/ride-status'

const STATUS_CONFIG: Record<
  RideStatus,
  { label: string; className: string }
> = {
  NEW_REQUEST: {
    label: 'New Request',
    className: 'bg-blue-100 text-blue-800',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    className: 'bg-yellow-100 text-yellow-800',
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-green-100 text-green-800',
  },
  DECLINED: {
    label: 'Declined',
    className: 'bg-red-100 text-red-800',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-purple-100 text-purple-800',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-gray-100 text-gray-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-orange-100 text-orange-800',
  },
  NO_SHOW: {
    label: 'No Show',
    className: 'bg-rose-100 text-rose-800',
  },
}

const COMM_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  email: { label: 'Email', className: 'bg-blue-100 text-blue-800' },
  sms: { label: 'SMS', className: 'bg-green-100 text-green-800' },
  phone: { label: 'Phone', className: 'bg-purple-100 text-purple-800' },
  note: { label: 'Note', className: 'bg-gray-100 text-gray-800' },
  status_change: {
    label: 'Status Change',
    className: 'bg-amber-100 text-amber-800',
  },
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return '--'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

function formatPrice(price: unknown): string {
  if (price === null || price === undefined) return '--'
  const num =
    typeof price === 'object' && 'toNumber' in (price as object)
      ? (price as { toNumber(): number }).toNumber()
      : Number(price)
  return `$${num.toFixed(2)}`
}

function formatPriceRaw(price: unknown): string {
  if (price === null || price === undefined) return ''
  const num =
    typeof price === 'object' && 'toNumber' in (price as object)
      ? (price as { toNumber(): number }).toNumber()
      : Number(price)
  return num.toFixed(2)
}

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

export default async function AdminRideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const { id } = await params

  const ride = await db.ride.findUnique({
    where: { id },
    include: {
      user: true,
      communications: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!ride) {
    notFound()
  }

  const statusConfig = STATUS_CONFIG[ride.status as RideStatus]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" render={<Link href="/admin/rides" />}>
          <ArrowLeftIcon className="size-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-heading">
              Ride Details
            </h1>
            <Badge
              variant="secondary"
              className={`text-sm ${statusConfig.className}`}
            >
              {statusConfig.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            ID: {ride.publicId} | Created: {formatDate(ride.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Passenger Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="size-4" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Name
                  </dt>
                  <dd className="font-medium">{ride.passengerName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Phone
                  </dt>
                  <dd>{ride.passengerPhone}</dd>
                </div>
                {ride.passengerEmail && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Email
                    </dt>
                    <dd>{ride.passengerEmail}</dd>
                  </div>
                )}
                {ride.emergencyContact && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Emergency Contact
                    </dt>
                    <dd>{ride.emergencyContact}</dd>
                  </div>
                )}
                {ride.user && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Linked Account
                    </dt>
                    <dd className="text-primary">
                      {ride.user.email}
                    </dd>
                  </div>
                )}
                {!ride.userId && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Account
                    </dt>
                    <dd className="text-muted-foreground italic">
                      Guest booking
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Pickup & Dropoff */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="size-4" />
                  Route Information
                </CardTitle>
                <a
                  href={googleMapsDirectionsUrl(
                    ride.pickupAddress, ride.pickupLat, ride.pickupLng,
                    ride.dropoffAddress, ride.dropoffLat, ride.dropoffLng,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                >
                  <NavigationIcon className="size-3.5" />
                  View Route on Map
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-green-700">
                    Pickup
                  </h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Address
                      </dt>
                      <dd className="flex items-start gap-2">
                        <span className="flex-1">{ride.pickupAddress}</span>
                        <a
                          href={googleMapsSearchUrl(ride.pickupAddress, ride.pickupLat, ride.pickupLng)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors mt-0.5"
                          title="Open in Google Maps"
                        >
                          <ExternalLinkIcon className="size-3.5" />
                          Map
                        </a>
                      </dd>
                    </div>
                    {ride.pickupApt && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Apt / Suite
                        </dt>
                        <dd>{ride.pickupApt}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Location Type
                      </dt>
                      <dd className="capitalize">
                        {ride.pickupLocationType.replace('_', ' ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Pickup Date & Time
                      </dt>
                      <dd className="font-medium">
                        {formatDate(ride.pickupDateTime)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-red-700">
                    Drop-off
                  </h4>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Address
                      </dt>
                      <dd className="flex items-start gap-2">
                        <span className="flex-1">{ride.dropoffAddress}</span>
                        <a
                          href={googleMapsSearchUrl(ride.dropoffAddress, ride.dropoffLat, ride.dropoffLng)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors mt-0.5"
                          title="Open in Google Maps"
                        >
                          <ExternalLinkIcon className="size-3.5" />
                          Map
                        </a>
                      </dd>
                    </div>
                    {ride.dropoffFacilityName && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Facility
                        </dt>
                        <dd>{ride.dropoffFacilityName}</dd>
                      </div>
                    )}
                    {ride.dropoffDepartment && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Department
                        </dt>
                        <dd>{ride.dropoffDepartment}</dd>
                      </div>
                    )}
                    {ride.dropoffAppointmentTime && (
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Appointment Time
                        </dt>
                        <dd>{formatDate(ride.dropoffAppointmentTime)}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ride Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CarIcon className="size-4" />
                Ride Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Ride Type
                  </dt>
                  <dd className="capitalize">
                    {ride.rideType.replace('_', ' ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Transport Type
                  </dt>
                  <dd className="capitalize">{ride.transportType}</dd>
                </div>
                {ride.recurringPattern && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Recurring Pattern
                    </dt>
                    <dd className="capitalize">{ride.recurringPattern}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Door Assist
                  </dt>
                  <dd>{ride.needsDoorAssist ? 'Yes' : 'No'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Building Assist
                  </dt>
                  <dd>{ride.needsBuildingAssist ? 'Yes' : 'No'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Companion
                  </dt>
                  <dd>{ride.hasCompanion ? 'Yes' : 'No'}</dd>
                </div>
                {ride.wheelchairOwned !== null && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Owns Wheelchair
                    </dt>
                    <dd>{ride.wheelchairOwned ? 'Yes' : 'No'}</dd>
                  </div>
                )}
                {ride.wheelchairPowered !== null && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Powered Wheelchair
                    </dt>
                    <dd>{ride.wheelchairPowered ? 'Yes' : 'No'}</dd>
                  </div>
                )}
                {ride.hasStairs !== null && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Has Stairs
                    </dt>
                    <dd>{ride.hasStairs ? 'Yes' : 'No'}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Payer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="size-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Payer Type
                  </dt>
                  <dd className="capitalize">
                    {ride.payerType.replace('_', ' ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Estimated Distance
                  </dt>
                  <dd>{formatDistance(ride.estimatedMiles)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Estimated Duration
                  </dt>
                  <dd>{formatDuration(ride.estimatedDuration)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Estimated Price
                  </dt>
                  <dd className="font-medium">
                    {formatPrice(ride.estimatedPrice)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Final Price
                  </dt>
                  <dd className="font-medium text-green-700">
                    {formatPrice(ride.finalPrice)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Notes & Instructions */}
          {(ride.specialInstructions || ride.gateCode || ride.mobilityNotes || ride.dispatchNotes) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardListIcon className="size-4" />
                  Notes & Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ride.specialInstructions && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Special Instructions
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap">
                      {ride.specialInstructions}
                    </dd>
                  </div>
                )}
                {ride.gateCode && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Gate Code
                    </dt>
                    <dd className="mt-1 font-mono">{ride.gateCode}</dd>
                  </div>
                )}
                {ride.mobilityNotes && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Mobility Notes
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap">
                      {ride.mobilityNotes}
                    </dd>
                  </div>
                )}
                {ride.dispatchNotes && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Dispatch Notes
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap">
                      {ride.dispatchNotes}
                    </dd>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Audit Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="size-4" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Created
                  </dt>
                  <dd>{formatDate(ride.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </dt>
                  <dd>{formatDate(ride.updatedAt)}</dd>
                </div>
                {ride.reviewedAt && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Reviewed At
                    </dt>
                    <dd>{formatDate(ride.reviewedAt)}</dd>
                  </div>
                )}
                {ride.confirmedAt && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Confirmed At
                    </dt>
                    <dd>{formatDate(ride.confirmedAt)}</dd>
                  </div>
                )}
                {ride.completedAt && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Completed At
                    </dt>
                    <dd>{formatDate(ride.completedAt)}</dd>
                  </div>
                )}
                {ride.cancelledAt && (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Cancelled At
                    </dt>
                    <dd>{formatDate(ride.cancelledAt)}</dd>
                  </div>
                )}
                {ride.declineReason && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-muted-foreground">
                      Decline Reason
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-destructive">
                      {ride.declineReason}
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Communication Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="size-4" />
                Communication Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ride.communications.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground">
                  No communications recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {ride.communications.map((comm) => {
                    const commConfig = COMM_TYPE_CONFIG[comm.type] || {
                      label: comm.type,
                      className: 'bg-gray-100 text-gray-800',
                    }
                    return (
                      <div
                        key={comm.id}
                        className="flex gap-3 border-l-2 border-muted pl-4"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={commConfig.className}
                            >
                              {commConfig.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground capitalize">
                              {comm.direction}
                            </span>
                            {comm.createdBy && (
                              <span className="text-xs text-muted-foreground">
                                by {comm.createdBy}
                              </span>
                            )}
                          </div>
                          <p className="text-sm whitespace-pre-wrap">
                            {comm.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(comm.createdAt)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Admin Actions */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <RideAdminActions
            rideId={ride.id}
            currentStatus={ride.status}
            dispatchNotes={ride.dispatchNotes}
            declineReason={ride.declineReason}
            finalPrice={formatPriceRaw(ride.finalPrice)}
          />
        </div>
      </div>
    </div>
  )
}
