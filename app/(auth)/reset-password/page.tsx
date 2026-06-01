'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordSchema } from '@/lib/validations/auth'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="bg-white rounded-2xl shadow-xl border border-border p-8 text-center text-muted-foreground">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  function clearFieldError(field: string) {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
  }

  // If no token is present in the URL, show an error state
  if (!token) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emergency-light">
            <ShieldAlert className="size-7 text-emergency" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Invalid Reset Link</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            This password reset link is invalid or has expired.
            Please request a new one.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Link href="/forgot-password" className="block">
            <Button
              type="button"
              className="w-full h-11 bg-primary text-white hover:bg-primary-dark transition-colors text-base font-medium"
            >
              Request New Reset Link
            </Button>
          </Link>

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    // Validate with Zod
    const result = resetPasswordSchema.safeParse({ token, password, confirmPassword })
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
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: result.data.token, password: result.data.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error?.toLowerCase().includes('expired') || data.error?.toLowerCase().includes('invalid')) {
          setError('This reset link has expired or is invalid. Please request a new one.')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
        setIsLoading(false)
        return
      }

      router.push('/login?reset=true')
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Set New Password</h1>
        <p className="text-muted-foreground mt-2">
          Enter your new password below
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
              autoComplete="new-password"
              className={`h-11 pl-10 ${fieldErrors.password ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.password ? (
            <p className="text-xs text-emergency">{fieldErrors.password}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              At least 8 characters with uppercase, lowercase, and a number.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword') }}
              autoComplete="new-password"
              className={`h-11 pl-10 ${fieldErrors.confirmPassword ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-emergency">{fieldErrors.confirmPassword}</p>
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
              Resetting password...
            </>
          ) : (
            'Reset Password'
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
