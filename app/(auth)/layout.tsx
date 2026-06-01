import Image from 'next/image'
import Link from 'next/link'
import { EMERGENCY_DISCLAIMER, SITE_NAME, LOGO_PATH } from '@/lib/constants'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-6">
        <Image
          src={LOGO_PATH}
          alt={SITE_NAME}
          width={200}
          height={65}
          className="h-18 w-auto"
          priority
        />
      </Link>

      <div className="w-full max-w-md">{children}</div>

      <p className="mt-8 text-xs text-center text-muted-foreground max-w-sm">
        {EMERGENCY_DISCLAIMER}
      </p>
    </div>
  )
}
