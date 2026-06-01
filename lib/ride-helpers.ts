import type { RideStatus } from '@prisma/client'

export const RIDE_STATUS_CONFIG: Record<
  RideStatus,
  { label: string; className: string }
> = {
  NEW_REQUEST: {
    label: 'New Request',
    className: 'bg-blue-100 text-blue-700',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    className: 'bg-yellow-100 text-yellow-700',
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-green-100 text-green-700',
  },
  DECLINED: {
    label: 'Declined',
    className: 'bg-red-100 text-red-700',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-purple-100 text-purple-700',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-gray-100 text-gray-700',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-500',
  },
  NO_SHOW: {
    label: 'No Show',
    className: 'bg-orange-100 text-orange-700',
  },
}

export function formatRideStatus(status: RideStatus) {
  return RIDE_STATUS_CONFIG[status] ?? { label: status, className: 'bg-gray-100 text-gray-700' }
}

export function formatTransportType(type: string): string {
  switch (type) {
    case 'ambulatory':
      return 'Ambulatory'
    case 'wheelchair':
      return 'Wheelchair'
    default:
      return type
  }
}

export function formatPayerType(type: string): string {
  switch (type) {
    case 'medicaid':
      return 'Medicaid'
    case 'insurance':
      return 'Insurance'
    case 'facility':
      return 'Facility'
    case 'private_pay':
      return 'Private Pay'
    case 'cash':
      return 'Cash'
    case 'card':
      return 'Card'
    default:
      return type
  }
}

export function formatRideType(type: string): string {
  switch (type) {
    case 'one_way':
      return 'One Way'
    case 'round_trip':
      return 'Round Trip'
    case 'recurring':
      return 'Recurring'
    default:
      return type
  }
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatPrice(price: unknown): string {
  if (price === null || price === undefined) return '--'
  const num = typeof price === 'number' ? price : Number(price)
  if (isNaN(num)) return '--'
  return `$${num.toFixed(2)}`
}
