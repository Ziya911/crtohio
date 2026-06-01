'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-white to-muted relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-emergency/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom text-center py-20 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emergency/10 mb-6 shadow-lg shadow-emergency/10">
            <AlertTriangle className="h-10 w-10 text-emergency" />
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-primary font-heading mb-4">
            Something Went Wrong
          </h1>

          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
            We apologize for the inconvenience. An unexpected error occurred. Please try again or
            contact us if the problem persists.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
            >
              <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-border text-primary hover:border-primary/30 hover:bg-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
