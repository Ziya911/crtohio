export const RIDE_STATUSES = [
  'NEW_REQUEST',
  'UNDER_REVIEW',
  'CONFIRMED',
  'DECLINED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
] as const

export type RideStatus = (typeof RIDE_STATUSES)[number]
