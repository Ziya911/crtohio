'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SearchIcon, FilterIcon, XIcon, Loader2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

type UserRow = {
  id: string
  name: string | null
  email: string
  phone: string | null
  isActive: boolean
  createdAt: string
  _count: { rides: number }
}

export function AdminUsersClient() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async (page: number, query: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '10')
      if (query) params.set('q', query)

      const res = await fetch(`/api/admin/users?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUsers(data.users)
      setTotal(data.total)
      setTotalPages(data.totalPages)
      setCurrentPage(data.page)
    } catch {
      setUsers([])
      setTotal(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(1, '')
  }, [fetchUsers])

  function handleSearch() {
    setAppliedQuery(searchQuery)
    fetchUsers(1, searchQuery)
  }

  function handleClear() {
    setSearchQuery('')
    setAppliedQuery('')
    fetchUsers(1, '')
  }

  function handlePageChange(page: number) {
    fetchUsers(page, appliedQuery)
  }

  const hasFilters = !!appliedQuery

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div>
        <p className="text-sm text-muted-foreground">
          {total} user{total !== 1 ? 's' : ''} registered
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="user-search"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Search
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="user-search"
                  type="text"
                  placeholder="Search name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="inline-flex items-center gap-2 h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <FilterIcon className="size-4" />
                )}
                Search
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && users.length === 0 ? (
            <div className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2Icon className="size-5 animate-spin" />
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              {hasFilters ? 'No users match your search.' : 'No users registered yet.'}
            </p>
          ) : (
            <>
              <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden sm:table-cell">Rides</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className={loading ? 'opacity-50' : ''}>
                          <TableCell className="font-medium">
                            {user.name || '--'}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">
                            {user.phone || '--'}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {user._count.rides}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block size-2 rounded-full ${
                                  user.isActive ? 'bg-green-500' : 'bg-red-500'
                                }`}
                              />
                              <span className="text-sm">
                                {user.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
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
