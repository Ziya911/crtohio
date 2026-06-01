import type { Metadata } from 'next'
import { Poppins, Inter, Geist } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_TAGLINE, BUSINESS_ADDRESS_LOCALITY, BUSINESS_ADDRESS_REGION } from '@/lib/constants'
import { cn } from "@/lib/utils"
import { Providers } from '@/components/providers/Providers'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'NEMT',
    'non-emergency medical transportation',
    `medical transportation ${BUSINESS_ADDRESS_REGION}`,
    `wheelchair transportation ${BUSINESS_ADDRESS_LOCALITY}`,
    'dialysis transportation',
    `Medicaid transportation ${BUSINESS_ADDRESS_REGION}`,
    `medical rides ${BUSINESS_ADDRESS_LOCALITY}`,
    SITE_NAME,
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Safe, Reliable Medical Transportation`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("h-full", poppins.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
