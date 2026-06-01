import { Header } from '@/components/layout/Header'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-muted">
        {children}
      </main>
    </>
  )
}
