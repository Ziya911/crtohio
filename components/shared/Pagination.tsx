import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  currentPage: number
  totalPages: number
  totalItems: number
  /** Base URL path without query params, e.g. "/admin/rides" */
  basePath: string
  /** Existing search params to preserve (status, q, etc.) */
  searchParams?: Record<string, string>
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  basePath,
  searchParams = {},
}: Props) {
  if (totalPages <= 1) return null

  function buildHref(page: number): string {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    return `${basePath}?${params.toString()}`
  }

  // Generate page numbers to show (max 5 visible)
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  const itemStart = (currentPage - 1) * 10 + 1
  const itemEnd = Math.min(currentPage * 10, totalItems)

  return (
    <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {itemStart}–{itemEnd} of {totalItems}
      </p>

      <nav className="flex items-center gap-1" aria-label="Pagination">
        {currentPage > 1 ? (
          <Link
            href={buildHref(currentPage - 1)}
            className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50">
            <ChevronLeft className="size-4" />
          </span>
        )}

        {pages[0] > 1 && (
          <>
            <Link
              href={buildHref(1)}
              className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium transition-colors"
            >
              1
            </Link>
            {pages[0] > 2 && (
              <span className="inline-flex items-center justify-center size-9 text-sm text-muted-foreground">
                ...
              </span>
            )}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              'inline-flex items-center justify-center size-9 rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-primary text-white border border-primary'
                : 'border border-border bg-white hover:bg-primary hover:text-white hover:border-primary'
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="inline-flex items-center justify-center size-9 text-sm text-muted-foreground">
                ...
              </span>
            )}
            <Link
              href={buildHref(totalPages)}
              className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium transition-colors"
            >
              {totalPages}
            </Link>
          </>
        )}

        {currentPage < totalPages ? (
          <Link
            href={buildHref(currentPage + 1)}
            className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center size-9 rounded-lg border border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50">
            <ChevronRight className="size-4" />
          </span>
        )}
      </nav>
    </div>
  )
}
