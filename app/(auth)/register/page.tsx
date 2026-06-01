'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Lock, Phone, Loader2, ArrowRight, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema } from '@/lib/validations/auth'

type Step = 'form' | 'otp'

export default function RegisterPage() {
  const router = useRouter()

  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  function clearFieldError(field: string) {
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
  }

  function startResendTimer() {
    setCanResend(false)
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function handleSendOtp() {
    setError('')
    setFieldErrors({})

    // Validate form with Zod first
    const result = registerSchema.safeParse({ name, email, phone: phone || undefined, password, confirmPassword })
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      return
    }

    setIsSendingOtp(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result.data.email, name: result.data.name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to send verification code')
        setIsSendingOtp(false)
        return
      }

      setStep('otp')
      startResendTimer()
      // Focus first OTP input after transition
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSendingOtp(false)
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6)
      const newOtp = [...otp]
      for (let i = 0; i < digits.length; i++) {
        if (index + i < 6) newOtp[index + i] = digits[i]
      }
      setOtp(newOtp)
      const nextIndex = Math.min(index + digits.length, 5)
      otpRefs.current[nextIndex]?.focus()
      return
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          phone: phone || undefined,
          password,
          confirmPassword,
          otp: otpCode,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        setIsLoading(false)
        return
      }

      router.push('/login?registered=true')
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  async function handleResendOtp() {
    if (!canResend) return
    setError('')
    setIsSendingOtp(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), name }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to resend code')
        return
      }

      setOtp(['', '', '', '', '', ''])
      startResendTimer()
      otpRefs.current[0]?.focus()
    } catch {
      setError('Failed to resend code')
    } finally {
      setIsSendingOtp(false)
    }
  }

  // OTP verification step
  if (step === 'otp') {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary-light">
            <ShieldCheck className="size-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2">
            We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-3 block text-center">Enter verification code</Label>
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="h-12 w-11 rounded-lg border border-border bg-white text-center text-lg font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || otp.join('').length !== 6}
            className="w-full h-11 bg-primary text-white hover:bg-primary-dark transition-colors text-base font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" />
                Verify & Create Account
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?{' '}
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isSendingOtp}
                  className="text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  {isSendingOtp ? 'Sending...' : 'Resend code'}
                </button>
              ) : (
                <span className="text-muted-foreground">
                  Resend in {resendTimer}s
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={() => { setStep('form'); setOtp(['', '', '', '', '', '']); setError('') }}
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to form
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Registration form step
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Create Your Account</h1>
        <p className="text-muted-foreground mt-2">
          Sign up to book and track your rides
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-emergency-light border border-emergency/30 px-4 py-3 text-sm text-emergency">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
              autoComplete="name"
              className={`h-11 pl-10 ${fieldErrors.name ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isSendingOtp}
            />
          </div>
          {fieldErrors.name && (
            <p className="text-xs text-emergency">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
              autoComplete="email"
              className={`h-11 pl-10 ${fieldErrors.email ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isSendingOtp}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-xs text-emergency">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="(513) 555-0100"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearFieldError('phone') }}
              autoComplete="tel"
              className={`h-11 pl-10 ${fieldErrors.phone ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isSendingOtp}
            />
          </div>
          {fieldErrors.phone && (
            <p className="text-xs text-emergency">{fieldErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
              autoComplete="new-password"
              className={`h-11 pl-10 pr-10 ${fieldErrors.password ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isSendingOtp}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword') }}
              autoComplete="new-password"
              className={`h-11 pl-10 pr-10 ${fieldErrors.confirmPassword ? 'border-emergency focus-visible:ring-emergency' : ''}`}
              disabled={isSendingOtp}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-emergency">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSendOtp}
          disabled={isSendingOtp}
          className="w-full h-11 bg-primary text-white hover:bg-primary-dark transition-colors text-base font-medium"
        >
          {isSendingOtp ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending verification code...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-primary font-medium hover:text-primary-dark transition-colors"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}
