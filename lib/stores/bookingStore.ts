'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  RideTypeData,
  PassengerInfoData,
  PickupInfoData,
  DropoffInfoData,
  TransportTypeData,
  PayerInfoData,
  RideNotesData,
} from '@/lib/validations/booking'

export const TOTAL_STEPS = 9

export type BookingState = {
  currentStep: number
  completedSteps: number[]

  // Step data
  rideType: RideTypeData | null
  passengerInfo: PassengerInfoData | null
  pickupInfo: PickupInfoData | null
  dropoffInfo: DropoffInfoData | null
  transportType: TransportTypeData | null
  payerInfo: PayerInfoData | null
  rideNotes: RideNotesData | null

  // Estimate data (from step 7)
  estimate: {
    miles: number
    durationMinutes: number
    total: number
  } | null

  // Actions
  setStep: (step: number) => void
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  markCompleted: (step: number) => void
  setRideType: (data: RideTypeData) => void
  setPassengerInfo: (data: PassengerInfoData) => void
  setPickupInfo: (data: PickupInfoData) => void
  setDropoffInfo: (data: DropoffInfoData) => void
  setTransportType: (data: TransportTypeData) => void
  setPayerInfo: (data: PayerInfoData) => void
  setRideNotes: (data: RideNotesData) => void
  setEstimate: (data: { miles: number; durationMinutes: number; total: number }) => void
  reset: () => void
}

const initialState = {
  currentStep: 1,
  completedSteps: [] as number[],
  rideType: null,
  passengerInfo: null,
  pickupInfo: null,
  dropoffInfo: null,
  transportType: null,
  payerInfo: null,
  rideNotes: null,
  estimate: null,
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      goToStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      markCompleted: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      setRideType: (data) => set({ rideType: data }),
      setPassengerInfo: (data) => set({ passengerInfo: data }),
      setPickupInfo: (data) => set({ pickupInfo: data }),
      setDropoffInfo: (data) => set({ dropoffInfo: data }),
      setTransportType: (data) => set({ transportType: data }),
      setPayerInfo: (data) => set({ payerInfo: data }),
      setRideNotes: (data) => set({ rideNotes: data }),
      setEstimate: (data) => set({ estimate: data }),

      reset: () => set(initialState),
    }),
    {
      name: 'crt-booking-draft',
      skipHydration: true,
    }
  )
)
