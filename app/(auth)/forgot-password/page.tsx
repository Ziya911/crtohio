'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPasswordSchema } from '@/lib/validations/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    // Validate with Zod
    const result = forgotPasswordSchema.safeParse({ email })
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result.data.email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setIsLoading(false)
        return
      }

      setIsSuccess(true)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent-light">
            <CheckCircle className="size-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            If an account exists for <span className="font-medium text-foreground">{email}</span>,
            we&apos;ve sent a password reset link. Please check your inbox and spam folder.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsSuccess(false)
              setEmail('')
            }}
            className="w-full h-11 text-base"
          >
            Try a different email
          </Button>

          <Link href="/login" className="block">
            <Button
              type="button"
              variant="ghost"
              className="w-full h-11 text-primary hover:text-primary-dark text-base"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Forgot Password?</h1>
        <p className="text-muted-foreground mt-2">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })) }}
              autoComplete="email"
              className={`h-11 pl-10 ${fieldErrors.email ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-xs text-emergency">{fieldErrors.email}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-primary text-white hover:bg-primary-dark transition-colors text-base font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}
