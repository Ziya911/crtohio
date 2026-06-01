/**
 * Server-side Google Maps helpers.
 * Uses GOOGLE_MAPS_SERVER_KEY, falls back to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 */

type LatLng = { lat: number; lng: number }

type DistanceResult = {
  miles: number
  durationMinutes: number
}

function getApiKey(): string {
  const key =
    process.env.GOOGLE_MAPS_SERVER_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!key) throw new Error('No Google Maps API key configured')
  return key
}

export async function getDistanceMatrix(
  origin: LatLng,
  destination: LatLng
): Promise<DistanceResult> {
  const key = getApiKey()
  const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json')
  url.searchParams.set('origins', `${origin.lat},${origin.lng}`)
  url.searchParams.set('destinations', `${destination.lat},${destination.lng}`)
  url.searchParams.set('units', 'imperial')
  url.searchParams.set('key', key)

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`Distance Matrix API error: ${res.status}`)

  const data = await res.json()

  if (data.status !== 'OK') {
    throw new Error(`Distance Matrix API status: ${data.status}`)
  }

  const element = data.rows?.[0]?.elements?.[0]
  if (!element || element.status !== 'OK') {
    throw new Error(
      `No route found: ${element?.status || 'UNKNOWN'}`
    )
  }

  // distance.value is in meters, duration.value is in seconds
  const miles = Math.round((element.distance.value / 1609.34) * 10) / 10
  const durationMinutes = Math.round(element.duration.value / 60)

  return { miles, durationMinutes }
}

export async function geocodeAddress(
  address: string
): Promise<LatLng | null> {
  const key = getApiKey()
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
  url.searchParams.set('address', address)
  url.searchParams.set('key', key)

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } })
  if (!res.ok) return null

  const data = await res.json()

  if (data.status !== 'OK' || !data.results?.length) {
    return null
  }

  const { lat, lng } = data.results[0].geometry.location
  return { lat, lng }
}
