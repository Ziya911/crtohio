'use client'

import { useState, useEffect } from 'react'
import { useBookingStore } from '@/lib/stores/bookingStore'
import { PriceBreakdown } from '@/components/booking/PriceBreakdown'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, MapPin, Clock, Route, AlertTriangle } from 'lucide-react'
import type { PricingOutput } from '@/lib/pricing'

type Props = {
  registerValidate: (fn: () => boolean) => void
}

export function StepMapEstimate({ registerValidate }: Props) {
  const {
    pickupInfo,
    dropoffInfo,
    transportType,
    rideType: rideTypeData,
    setEstimate,
    markCompleted,
  } = useBookingStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [distance, setDistance] = useState<{
    miles: number
    durationMinutes: number
  } | null>(null)
  const [pricing, setPricing] = useState<PricingOutput | null>(null)

  useEffect(() => {
    setLoading(true)
    setError('')

    async function fetchEstimate() {
      if (
        !pickupInfo?.pickupLat ||
        !pickupInfo?.pickupLng ||
        !dropoffInfo?.dropoffLat ||
        !dropoffInfo?.dropoffLng
      ) {
        setError(
          'Unable to calculate estimate. Please go back and re-enter your addresses using the autocomplete suggestions.'
        )
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/pricing/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickupLat: pickupInfo.pickupLat,
            pickupLng: pickupInfo.pickupLng,
            dropoffLat: dropoffInfo.dropoffLat,
            dropoffLng: dropoffInfo.dropoffLng,
            transportType: transportType?.transportType || 'ambulatory',
            isRoundTrip: rideTypeData?.rideType === 'round_trip',
            needsBuildingAssist: transportType?.needsBuildingAssist || false,
            hasStairs: transportType?.hasStairs || false,
            pickupDateTime: pickupInfo.pickupDate && pickupInfo.pickupTime
              ? `${pickupInfo.pickupDate}T${pickupInfo.pickupTime}`
              : undefined,
          }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to get estimate')
        }

        const data = await res.json()
        setDistance(data.distance)
        setPricing(data.pricing)
        setEstimate({
          miles: data.distance.miles,
          durationMinutes: data.distance.durationMinutes,
          total: data.pricing.total,
        })
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to calculate estimate'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEstimate()
  // Re-fetch if ride type or transport type changes (e.g. user goes back and changes selection)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rideTypeData?.rideType, transportType?.transportType])

  const distanceMiles = distance ? Math.round(distance.miles * 10) / 10 : 0
  // Format duration as hours and minutes
  const durationFormatted = distance
    ? distance.durationMinutes >= 60
      ? `${Math.floor(distance.durationMinutes / 60)} hr ${distance.durationMinutes % 60} min`
      : `${distance.durationMinutes} min`
    : ''

  function validate(): boolean {
    markCompleted(7)
    return true
  }

  // Re-register on every render so validate always captures current state
  useEffect(() => { registerValidate(validate) })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">
          Route & Price Estimate
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your estimated distance, travel time, and pricing.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 text-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">
            Calculating your route and estimate...
          </p>
        </div>
      ) : error ? (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="size-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">
              Unable to calculate estimate
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Route info cards */}
          <div className="grid gap-3 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Route className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Estimated Distance
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {distanceMiles} mi
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Estimated Time
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {durationFormatted}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Route Type</p>
                  <p className="text-lg font-bold text-primary">
                    {rideTypeData?.rideType === 'round_trip'
                      ? 'Round Trip'
                      : 'One Way'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Route</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 size-3 rounded-full bg-green-500 ring-2 ring-green-200" />
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="text-sm font-medium">
                    {pickupInfo?.pickupAddress}
                  </p>
                </div>
              </div>
              <div className="ml-1.5 h-6 w-0.5 bg-border" />
              <div className="flex items-start gap-3">
                <div className="mt-1 size-3 rounded-full bg-red-500 ring-2 ring-red-200" />
                <div>
                  <p className="text-xs text-muted-foreground">Drop-off</p>
                  <p className="text-sm font-medium">
                    {dropoffInfo?.dropoffAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price breakdown */}
          {pricing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Price Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceBreakdown pricing={pricing} />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
