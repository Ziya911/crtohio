/**
 * Simple in-memory rate limiter.
 * 5 bookings per hour per IP. Resets automatically.
 */

type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  // Clean expired entry
  if (entry && now >= entry.resetAt) {
    store.delete(ip)
  }

  const current = store.get(ip)

  if (!current) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (current.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  current.count++
  return { allowed: true, remaining: MAX_REQUESTS - current.count }
}
