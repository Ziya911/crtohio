'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Loader2, Mail, MapPin } from 'lucide-react'
import { BUSINESS_ADDRESS_LOCALITY, BUSINESS_ADDRESS_REGION } from '@/lib/constants'

type TestStatus = 'idle' | 'testing' | 'success' | 'error'

type TestResult = {
  status: TestStatus
  message: string
}

const defaultResult: TestResult = { status: 'idle', message: '' }

export function ApiTestPanel() {
  const [mapsResult, setMapsResult] = useState<TestResult>(defaultResult)
  const [emailResult, setEmailResult] = useState<TestResult>(defaultResult)

  async function testMapsApi() {
    setMapsResult({ status: 'testing', message: 'Testing Google Maps API key...' })
    try {
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!key) {
        setMapsResult({ status: 'error', message: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set in .env' })
        return
      }

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(BUSINESS_ADDRESS_LOCALITY + '+' + BUSINESS_ADDRESS_REGION)}&key=${key}`
      const res = await fetch(url)
      const data = await res.json()

      if (data.status === 'OK') {
        setMapsResult({
          status: 'success',
          message: `✓ Google Maps API key works! Test geocode returned: "${data.results[0]?.formatted_address}"`,
        })
      } else if (data.status === 'REQUEST_DENIED') {
        setMapsResult({
          status: 'error',
          message: `API key rejected: ${data.error_message || 'REQUEST_DENIED — check key restrictions in Google Cloud Console (make sure Geocoding API is enabled and HTTP referrer includes localhost)'}`,
        })
      } else {
        setMapsResult({
          status: 'error',
          message: `Unexpected status: ${data.status} — ${data.error_message || ''}`,
        })
      }
    } catch (err) {
      setMapsResult({
        status: 'error',
        message: `Network error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  async function testEmailApi() {
    setEmailResult({ status: 'testing', message: 'Sending test email...' })
    try {
      const res = await fetch('/api/admin/test-email', { method: 'POST' })
      const data = await res.json()

      if (res.ok) {
        setEmailResult({
          status: 'success',
          message: data.message || 'Test email sent successfully! Check your inbox.',
        })
      } else {
        setEmailResult({
          status: 'error',
          message: data.error || 'Failed to send test email',
        })
      }
    } catch (err) {
      setEmailResult({
        status: 'error',
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Google Maps Test */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <span className="font-medium text-sm">Google Maps API</span>
          </div>
          <button
            onClick={testMapsApi}
            disabled={mapsResult.status === 'testing'}
            className="inline-flex items-center gap-2 h-8 px-4 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {mapsResult.status === 'testing' ? (
              <><Loader2 className="size-3 animate-spin" /> Testing...</>
            ) : (
              'Test Connection'
            )}
          </button>
        </div>
        {mapsResult.status !== 'idle' && (
          <div className={`flex items-start gap-2 rounded-md px-3 py-2 text-xs ${
            mapsResult.status === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : mapsResult.status === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-muted text-muted-foreground'
          }`}>
            {mapsResult.status === 'success' && <CheckCircle2 className="size-3.5 mt-0.5 shrink-0" />}
            {mapsResult.status === 'error' && <XCircle className="size-3.5 mt-0.5 shrink-0" />}
            {mapsResult.status === 'testing' && <Loader2 className="size-3.5 mt-0.5 shrink-0 animate-spin" />}
            <span>{mapsResult.message}</span>
          </div>
        )}
      </div>

      {/* Resend Email Test */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <span className="font-medium text-sm">Resend Email API</span>
          </div>
          <button
            onClick={testEmailApi}
            disabled={emailResult.status === 'testing'}
            className="inline-flex items-center gap-2 h-8 px-4 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {emailResult.status === 'testing' ? (
              <><Loader2 className="size-3 animate-spin" /> Sending...</>
            ) : (
              'Send Test Email'
            )}
          </button>
        </div>
        {emailResult.status !== 'idle' && (
          <div className={`flex items-start gap-2 rounded-md px-3 py-2 text-xs ${
            emailResult.status === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : emailResult.status === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-muted text-muted-foreground'
          }`}>
            {emailResult.status === 'success' && <CheckCircle2 className="size-3.5 mt-0.5 shrink-0" />}
            {emailResult.status === 'error' && <XCircle className="size-3.5 mt-0.5 shrink-0" />}
            {emailResult.status === 'testing' && <Loader2 className="size-3.5 mt-0.5 shrink-0 animate-spin" />}
            <span>{emailResult.message}</span>
          </div>
        )}
      </div>
    </div>
  )
}
