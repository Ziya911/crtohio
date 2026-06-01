# Project Plan — Care Ride Transportation

## Phase 1: Foundation + Static Marketing Pages ✅

### 1A. Project Initialization
- [x] Initialize Next.js 16 project with TypeScript, Tailwind CSS v4, ESLint, App Router
- [x] Initialize Git repo + `.gitignore`
- [x] Create `.env.example` with all env var keys
- [x] Install all locked dependencies (Prisma, NextAuth, Google Maps, RHF, Zod, Zustand, TanStack Query, Resend, React Email, Framer Motion, Lucide, bcryptjs)
- [x] Install dev tooling (tsx)
- [x] Create full folder structure per CLAUDE.md Section 5

### 1B. Database Setup
- [x] Write `prisma/schema.prisma` with full schema
- [x] Write `prisma/seed.ts` (admin user seeder)
- [x] Configure `prisma.config.ts` for Prisma v7
- [x] Add `prisma.seed` config to `package.json`
- [x] Verify `prisma generate` works

### 1C. Core Configuration
- [x] Set up `lib/db.ts` — Prisma client singleton
- [x] Set up `lib/utils.ts` — cn() utility
- [x] Set up `lib/constants.ts` — brand colors, business info, services, nav links, pricing config
- [x] Set up `lib/seo.ts` — metadata helpers, JSON-LD generators
- [x] Configure `next.config.ts` with security headers

### 1D. Design System & Global Layout
- [x] Set up `app/globals.css` with CSS variables for brand colors
- [x] Configure fonts via `next/font/google` — Poppins (headings) + Inter (body)
- [x] Extend Tailwind with brand colors, fonts, container
- [x] Create `app/layout.tsx` — root layout with fonts, metadata, skip-to-content
- [x] Build `components/layout/Header.tsx` — responsive nav with mobile menu
- [x] Build `components/layout/Footer.tsx` — contact info, nav links, disclaimer
- [x] Build `components/layout/EmergencyBanner.tsx` — red 911 banner
- [x] Create `app/(marketing)/layout.tsx` — marketing layout with header + footer

### 1E. Home Page
- [x] Hero section with CTA
- [x] Trust badges (Licensed, NEMT Certified, Medicaid, 24/7, ADA)
- [x] Services overview (8 service cards)
- [x] How it works (3 steps)
- [x] Why choose us (6 benefit cards)
- [x] Service area section
- [x] CTA strip
- [x] Testimonials placeholder
- [x] Contact info strip
- [x] LocalBusiness JSON-LD

### 1F. Core Marketing Pages
- [x] About page
- [x] Services index + 8 service detail pages (ambulatory, wheelchair, dialysis, medical-appointments, hospital-discharge, facility, private-pay, recurring)
- [x] Pricing page with pricing table
- [x] FAQ page with 16 Q&As

### 1G. Service Area Pages
- [x] Service areas index
- [x] 6 city landing pages (Cincinnati, Mason, West Chester, Liberty Township, Hamilton, Middletown)

### 1H. Lead Capture & Contact
- [x] Partner With Us page with inquiry form
- [x] Become a Driver page with application form
- [x] Contact page with form + info

### 1I. Legal & Utility Pages
- [x] Privacy Policy
- [x] Terms & Conditions
- [x] Accessibility Statement
- [x] 404 page
- [x] Error page

### 1J. SEO Foundation
- [x] Per-page metadata exports
- [x] JSON-LD on key pages (LocalBusiness, Service, FAQ, Breadcrumb)
- [x] `app/sitemap.ts`
- [x] `app/robots.ts`

### 1K. Verification
- [x] `pnpm build` succeeds (31 static pages generated)
- [x] `pnpm dev` runs without errors
- [ ] Visual review at mobile/tablet/desktop

---

## Phase 2: Booking System

### 2A. Booking State Management
- [ ] Create Zustand store with all 10 steps' data
- [ ] Implement localStorage persistence
- [ ] Step navigation logic (next, previous, jump)
- [ ] Store reset on submission

### 2B. Zod Validation Schemas
- [ ] Per-step Zod schemas (Steps 1-9)
- [ ] Combined full booking schema for API

### 2C. Booking Wizard UI
- [ ] Booking page with step orchestrator
- [ ] Step progress indicator
- [ ] 10 step components

### 2D. Google Maps Integration
- [ ] `lib/maps.ts` wrapper
- [ ] Geocoding + Distance Matrix
- [ ] Places autocomplete proxy API
- [ ] AddressAutocomplete component

### 2E. Pricing Engine
- [ ] `lib/pricing.ts` pure function
- [ ] Pricing estimate API route
- [ ] Unit tests

### 2F. Booking API & Email
- [ ] POST `/api/bookings` route
- [ ] Email sender utility
- [ ] Admin notification template
- [ ] Customer confirmation template
- [ ] Confirmation page

---

## Phase 3: Authentication + User Portal

- [ ] NextAuth.js v5 credentials provider
- [ ] Auth API route
- [ ] Route protection middleware
- [ ] Login, register, forgot password pages
- [ ] Email verification + password reset
- [ ] User dashboard (rides, profile)
- [ ] Pre-fill booking for logged-in users

---

## Phase 4: Admin Panel + Dispatch

- [ ] Admin dashboard with stats
- [ ] Rides table with filters/search
- [ ] Ride detail with status workflow
- [ ] User management
- [ ] Communication log
- [ ] Status change email templates

---

## Phase 5: Polish, Testing & Launch

- [ ] Real content/images/logo
- [ ] WCAG AA accessibility audit
- [ ] Lighthouse 90+ performance
- [ ] Playwright E2E tests
- [ ] Unit tests (pricing, Zod schemas)
- [ ] Sentry monitoring
- [ ] Analytics setup
- [ ] Vercel deployment
- [ ] DNS + SSL
- [ ] Handoff documentation
