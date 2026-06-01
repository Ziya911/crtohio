'use client'

import { createContext, useContext } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'

const libraries: ('places')[] = ['places']

type GoogleMapsContextType = {
  isLoaded: boolean
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
})

export function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext)
}
