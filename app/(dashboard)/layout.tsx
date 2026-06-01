import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const user = {
    id: session.user.id as string,
    name: (session.user.name as string | null) ?? null,
    email: session.user.email as string,
    role: session.user.role as 'ADMIN' | 'USER',
  }

  return <DashboardShell user={user}>{children}</DashboardShell>
}
