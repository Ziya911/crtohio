'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const prevPath = useRef(pathname + searchParams.toString())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    setVisible(true)
    setProgress(0)

    // Quickly ramp to ~80%, then slow down
    let current = 0
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      current += current < 50 ? 8 : current < 80 ? 3 : 0.5
      if (current >= 90) {
        current = 90
        if (timerRef.current) clearInterval(timerRef.current)
      }
      setProgress(current)
    }, 50)
  }, [])

  const done = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setProgress(100)
    setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 300)
  }, [])

  useEffect(() => {
    const current = pathname + searchParams.toString()
    if (current !== prevPath.current) {
      done()
      prevPath.current = current
    }
  }, [pathname, searchParams, done])

  // Intercept link clicks to start progress
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Skip external links, hash links, tel/mailto, download links
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        anchor.hasAttribute('download') ||
        anchor.target === '_blank'
      ) {
        return
      }

      // Skip if modifier keys are pressed (open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      // Check if we're navigating to a different page
      const currentPath = pathname + searchParams.toString()
      const targetPath = href.split('?')[0] + (href.includes('?') ? '?' + href.split('?')[1] : '')
      if (targetPath !== currentPath) {
        start()
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, searchParams, start])

  if (!visible && progress === 0) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 10px rgba(10, 77, 140, 0.5), 0 0 5px rgba(10, 77, 140, 0.3)',
        }}
      />
    </div>
  )
}
