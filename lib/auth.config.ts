import type { NextAuthConfig } from 'next-auth'

/**
 * Edge-compatible auth config — NO database or Node.js-only imports.
 * Used by middleware (Edge runtime) and extended by the full auth.ts.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.isActive = user.isActive
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as 'ADMIN' | 'USER'
        session.user.isActive = token.isActive as boolean
      }
      return session
    },
  },
  providers: [], // Credentials provider added in full auth.ts
}
