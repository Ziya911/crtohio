'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { useGoogleMaps } from './GoogleMapsProvider'

type AddressResult = {
  address: string
  lat: number
  lng: number
}

type Prediction = {
  placeId: string
  mainText: string
  secondaryText: string
  description: string
}

type Props = {
  value: string
  onChange: (value: string) => void
  onSelect: (result: AddressResult) => void
  placeholder?: string
  id?: string
  disabled?: boolean
  'aria-invalid'?: boolean
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter address',
  id,
  disabled,
  'aria-invalid': ariaInvalid,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { isLoaded } = useGoogleMaps()

  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  // Keep latest callbacks in refs to avoid stale closures
  const onChangeRef = useRef(onChange)
  const onSelectRef = useRef(onSelect)
  onChangeRef.current = onChange
  onSelectRef.current = onSelect

  // Ohio bounds for biasing
  const boundsRef = useRef<google.maps.LatLngBounds | null>(null)

  // Initialize services once Google Maps loads
  useEffect(() => {
    if (!isLoaded) return

    serviceRef.current = new google.maps.places.AutocompleteService()

    // PlacesService needs a DOM node (can be hidden)
    const div = document.createElement('div')
    placesServiceRef.current = new google.maps.places.PlacesService(div)

    boundsRef.current = new google.maps.LatLngBounds(
      new google.maps.LatLng(38.4, -84.8),
      new google.maps.LatLng(41.9, -80.5)
    )
  }, [isLoaded])

  // Fetch predictions when value changes
  const fetchPredictions = useCallback((input: string) => {
    if (!serviceRef.current || !input || input.length < 3) {
      setPredictions([])
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    serviceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'us' },
        types: ['address'],
        bounds: boundsRef.current || undefined,
      },
      (results, status) => {
        setIsLoading(false)
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results?.length
        ) {
          const mapped: Prediction[] = results.slice(0, 5).map((r) => ({
            placeId: r.place_id,
            mainText: r.structured_formatting.main_text,
            secondaryText: r.structured_formatting.secondary_text || '',
            description: r.description,
          }))
          setPredictions(mapped)
          setIsOpen(true)
          setActiveIndex(-1)
        } else {
          setPredictions([])
          setIsOpen(false)
        }
      }
    )
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    onChangeRef.current(val)

    // Debounce predictions
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchPredictions(val), 300)
  }

  function selectPrediction(prediction: Prediction) {
    if (!placesServiceRef.current) return

    // Get place details (lat/lng)
    placesServiceRef.current.getDetails(
      {
        placeId: prediction.placeId,
        fields: ['formatted_address', 'geometry'],
      },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.formatted_address &&
          place.geometry?.location
        ) {
          const result: AddressResult = {
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }
          if (inputRef.current) {
            inputRef.current.value = result.address
          }
          onChangeRef.current(result.address)
          onSelectRef.current(result)
        }
      }
    )

    // Immediately close and update input
    setIsOpen(false)
    setPredictions([])
    if (inputRef.current) {
      inputRef.current.value = prediction.description
    }
    onChangeRef.current(prediction.description)
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || predictions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) =>
          prev < predictions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : predictions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < predictions.length) {
          selectPrediction(predictions[activeIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as EventListener)
    }
  }, [])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          defaultValue={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (predictions.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-activedescendant={
            activeIndex >= 0 ? `prediction-${activeIndex}` : undefined
          }
          className="h-11 w-full min-w-0 rounded-lg border border-input bg-white px-3.5 py-2.5 pr-10 text-sm transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MapPin className="size-4" />
          )}
        </div>
      </div>

      {isOpen && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          className="absolute left-0 right-0 z-10000 mt-1 overflow-hidden rounded-lg border border-border bg-white shadow-lg"
        >
          {predictions.map((prediction, index) => (
            <button
              key={prediction.placeId}
              id={`prediction-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              type="button"
              className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                index === activeIndex
                  ? 'bg-primary/5 text-primary'
                  : 'text-foreground hover:bg-muted/50'
              } ${index > 0 ? 'border-t border-border/50' : ''}`}
              onClick={() => selectPrediction(prediction)}
              onTouchEnd={(e) => {
                e.preventDefault()
                selectPrediction(prediction)
              }}
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <span className="font-medium">{prediction.mainText}</span>
                {prediction.secondaryText && (
                  <span className="block truncate text-xs text-muted-foreground">
                    {prediction.secondaryText}
                  </span>
                )}
              </div>
            </button>
          ))}
          <div className="border-t border-border/50 px-3 py-1.5 text-right">
            <span className="text-[10px] text-muted-foreground/60">
              Powered by Google
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
