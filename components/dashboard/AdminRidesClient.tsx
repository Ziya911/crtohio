'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SearchIcon, FilterIcon, XIcon, Loader2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { RideStatus } from '@prisma/client'

const STATUS_CONFIG: Record<
  RideStatus,
  { label: string; className: string }
> = {
  NEW_REQUEST: { label: 'New Request', className: 'bg-blue-100 text-blue-800' },
  UNDER_REVIEW: { label: 'Under Review', className: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
  DECLINED: { label: 'Declined', className: 'bg-red-100 text-red-800' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-purple-100 text-purple-800' },
  COMPLETED: { label: 'Completed', className: 'bg-gray-100 text-gray-800' },
  CANCELLED: { label: 'Cancelled', className: 'bg-orange-100 text-orange-800' },
  NO_SHOW: { label: 'No Show', className: 'bg-rose-100 text-rose-800' },
}

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as RideStatus[]

function formatDate(date: string): string {
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
  const num = Number(price)
  if (isNaN(num)) return '--'
  return `$${num.toFixed(2)}`
}

type RideRow = {
  id: string
  publicId: string
  passengerName: string
  passengerEmail: string | null
  pickupAddress: string
  dropoffAddress: string
  pickupDateTime: string
  transportType: string
  payerType: string
  status: RideStatus
  estimatedPrice: unknown
  finalPrice: unknown
  user: { id: string; name: string | null; email: string } | null
}

export function AdminRidesClient() {
  const [rides, setRides] = useState<RideRow[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [appliedStatus, setAppliedStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchRides = useCallback(async (page: number, status: string, query: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '10')
      if (status) params.set('status', status)
      if (query) params.set('q', query)

      const res = await fetch(`/api/admin/rides?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setRides(data.rides)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCurrentPage(data.page)
    } catch {
      setRides([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRides(1, '', '')
  }, [fetchRides])

  function handleFilter() {
    setAppliedQuery(searchQuery)
    setAppliedStatus(statusFilter)
    fetchRides(1, statusFilter, searchQuery)
  }

  function handleClear() {
    setSearchQuery('')
    setStatusFilter('')
    setAppliedQuery('')
    setAppliedStatus('')
    fetchRides(1, '', '')
  }

  function handlePageChange(page: number) {
    fetchRides(page, appliedStatus, appliedQuery)
  }

  const hasFilters = !!(appliedStatus || appliedQuery)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {total} ride{total !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* Status Filter */}
            <div className="flex flex-col gap-1.5 sm:w-48">
              <label
                htmlFor="status-filter"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">All Statuses</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="search-input"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Search
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search name, email, address, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                  className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleFilter}
                disabled={loading}
                className="inline-flex items-center gap-2 h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <FilterIcon className="size-4" />
                )}
                Filter
              </button>
              {hasFilters && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 h-10 px-4 border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium rounded-lg transition-colors"
                >
                  <XIcon className="size-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && rides.length === 0 ? (
            <div className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2Icon className="size-5 animate-spin" />
              Loading rides...
            </div>
          ) : rides.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No rides match your filters.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Passenger</TableHead>
                        <TableHead className="hidden md:table-cell">Pickup</TableHead>
                        <TableHead className="hidden md:table-cell">Drop-off</TableHead>
                        <TableHead className="hidden lg:table-cell">Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Payer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Est. Price</TableHead>
                        <TableHead className="hidden sm:table-cell">Final Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rides.map((ride) => {
                        const statusConfig = STATUS_CONFIG[ride.status]
                        return (
                          <TableRow key={ride.id} className={loading ? 'opacity-50' : ''}>
                            <TableCell>
                              <Link
                                href={`/admin/rides/${ride.id}`}
                                className="text-primary font-medium underline-offset-4 hover:underline whitespace-nowrap"
                              >
                                {formatDate(ride.pickupDateTime)}
                              </Link>
                            </TableCell>
                            <TableCell className="font-medium">
                              {ride.passengerName}
                            </TableCell>
                            <TableCell
                              className="hidden md:table-cell max-w-[180px] truncate text-muted-foreground"
                              title={ride.pickupAddress}
                            >
                              {ride.pickupAddress}
                            </TableCell>
                            <TableCell
                              className="hidden md:table-cell max-w-[180px] truncate text-muted-foreground"
                              title={ride.dropoffAddress}
                            >
                              {ride.dropoffAddress}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell capitalize text-muted-foreground">
                              {ride.transportType}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell capitalize text-muted-foreground">
                              {ride.payerType.replace('_', ' ')}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={statusConfig.className}
                              >
                                {statusConfig.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell font-medium">
                              {formatPrice(ride.estimatedPrice)}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell font-medium text-primary">
                              {formatPrice(ride.finalPrice)}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} ({total} total)
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1 || loading}
                      className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronLeftIcon className="size-4" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page: number
                      if (totalPages <= 5) {
                        page = i + 1
                      } else if (currentPage <= 3) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i
                      } else {
                        page = currentPage - 2 + i
                      }
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className={`inline-flex items-center justify-center size-9 rounded-lg text-sm font-medium transition-colors ${
                            page === currentPage
                              ? 'bg-primary text-white'
                              : 'border border-border bg-white hover:bg-muted'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages || loading}
                      className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronRightIcon className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
