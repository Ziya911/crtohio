import Link from 'next/link'
import { Home, ArrowLeft, Phone } from 'lucide-react'
import { BUSINESS_PHONE } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-white to-muted relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom text-center py-20 relative z-10">
        <div className="max-w-lg mx-auto">
          {/* 404 Number */}
          <p className="text-[10rem] md:text-[12rem] font-extrabold text-gradient-primary font-heading leading-none mb-0 select-none">
            404
          </p>

          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary font-heading mb-4 -mt-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Let us help you get where you need to go.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-border text-primary hover:border-primary/30 hover:bg-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Contact Us
            </Link>
          </div>

          {/* Phone */}
          <p className="mt-10 text-sm text-muted-foreground">
            Need immediate help?{' '}
            <a href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`} className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              Call {BUSINESS_PHONE}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
