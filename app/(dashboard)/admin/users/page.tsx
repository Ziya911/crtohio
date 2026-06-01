import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { ArrowLeftIcon } from 'lucide-react'
import { AdminUsersClient } from '@/components/dashboard/AdminUsersClient'

export default async function AdminUsersPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Users</h1>
        </div>
      </div>

      <AdminUsersClient />
    </div>
  )
}
