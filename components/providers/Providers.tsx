'use client'

import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import { NavigationProgress } from '@/components/shared/NavigationProgress'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      {children}
    </SessionProvider>
  )
}
