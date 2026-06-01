# CLAUDE.md — Care Ride Transportation (crtohio.com)

> **Read this entire file before writing a single line of code.**
> This is your source of truth for the project. Update this file whenever architectural decisions change.

---

## ⚡ FIRST INSTRUCTION TO CLAUDE CODE

Before you start coding anything:

1. **Read this entire CLAUDE.md file carefully.**
2. **Then read `PLAN.md`** (you will create this in Phase 0 below).
3. **Then propose your own breakdown of the project into 5 phases** with clear deliverables for each phase. Show me the breakdown before writing code. Wait for my approval.
4. Only after approval, start with **Phase 1: Project Foundation** (described below).
5. After completing each phase, **stop, summarize what was built, and wait for my approval before moving to the next phase.**

This phased approach is non-negotiable. Do not try to build the whole project in one sweep.

---

## 1. Project Overview

**Client:** Care Ride Transportation
**Built by:** MedStatsBilling
**Domain:** https://crtohio.com
**Type:** Non-Emergency Medical Transportation (NEMT) marketing website + online booking platform
**Service Area:** Cincinnati, Mason, West Chester, Liberty Township, Hamilton, Middletown, and surrounding Ohio
**Business Model:** B2C (individual riders) + B2B (hospitals, nursing homes, dialysis centers, clinics)

### Core Goals
1. Professional marketing website that ranks organically for local NEMT searches
2. Online ride booking system with multi-step conditional form
3. Google Maps based distance + pricing engine
4. Admin dispatch panel for ride management
5. (Phase 2 / future) Facility partner portal, driver portal, recurring rides automation

### Critical Business Rules — Always Honor These
- **NOT an emergency service.** Every public page must display: *"For medical emergencies, call 911. We do not provide emergency ambulance services."*
- **Bookings are REQUESTS, not confirmations.** All bookings require admin review before being confirmed.
- **PHI is handled carefully.** Booking form collects Medicaid IDs, DOBs, medical context. Never log PHI. Never display it where it shouldn't be.
- **Mobile-first.** Most bookings will come from phones. Every page must work beautifully at 375px width.

---

## 2. Tech Stack (LOCKED DECISIONS — do not change without asking)

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| Forms | **React Hook Form** + **Zod** validation |
| State | **Zustand** (booking flow), **TanStack Query** (server state) |
| Database | **PostgreSQL** on **Neon** (serverless) |
| ORM | **Prisma** |
| Auth | **NextAuth.js v5 (Auth.js)** — credentials + database sessions |
| Email | **Resend** + **React Email** templates |
| Maps | **@react-google-maps/api** + **Distance Matrix API** + **Places Autocomplete** |
| Icons | **Lucide React** |
| Animations | **Framer Motion** (sparingly) |
| Hosting | **Vercel** (production + previews) |
| Domain | **Namecheap** → DNS → Vercel |
| Monitoring | **Sentry** (free tier) |
| Analytics | **Vercel Analytics** + **Google Analytics 4** + **Google Search Console** |
| Package manager | **pnpm** |
| Node version | **20 LTS** |

---

## 3. Project Phases (Proposed — refine in your PLAN.md)

Below is a high-level proposed phase breakdown. When you create `PLAN.md`, refine these into a detailed task list with checkboxes per phase.

### Phase 1 — Project Foundation (Days 1–3)
**Goal:** A running Next.js app on localhost with all tools wired up and an empty homepage.

- Initialize Next.js 15 project with TypeScript, Tailwind, ESLint, Prettier
- Set up Git repo + `.gitignore` + commit conventions
- Install and configure all locked dependencies
- Set up Prisma with PostgreSQL schema (full schema below)
- Configure NextAuth.js (basic shell, no UI yet)
- Configure Resend (basic shell, no templates yet)
- Set up `.env.example` and load environment variables
- Create folder structure exactly as specified in Section 5
- Install shadcn/ui base components
- Set up global styles, fonts (Poppins + Inter), and CSS variables for the brand colors
- Verify `pnpm dev` runs and shows a placeholder homepage
- Verify `pnpm prisma migrate dev` works against local DB (or Neon dev branch)

**Deliverable:** Running scaffold. No real content yet. Database schema applied. Seed script creates admin user.

### Phase 2 — Public Marketing Pages (Days 4–8)
**Goal:** Every public-facing page is built, content placeholder is in place, mobile-responsive, with proper SEO foundation.

- Global header + footer (responsive)
- Home page with all sections (hero, services overview, why-choose-us, how-it-works, service area, quick booking CTA, reviews placeholder, contact info, emergency disclaimer)
- About page
- Services overview page + 8 individual service detail pages
- 6+ service area landing pages (one per city for local SEO)
- Pricing page with estimator entry point
- Partner With Us page (with inquiry form)
- Become a Driver page (with application form)
- FAQ page
- Contact page (form + map embed)
- Privacy Policy, Terms & Conditions, Accessibility pages
- 404 + error pages
- Per-page metadata API (titles, descriptions, OG, canonical)
- JSON-LD schema markup (LocalBusiness, MedicalBusiness, Service, FAQ, BreadcrumbList)
- `sitemap.ts` + `robots.ts`

**Deliverable:** All public pages live (with placeholder copy/images), fully responsive, SEO foundation in place.

### Phase 3 — Booking System (Days 9–16)
**Goal:** The 10-step booking flow works end-to-end as a guest or logged-in user. Saves to DB. Sends emails.

- Booking flow orchestrator + 10 step components
- Zustand store with localStorage persistence (don't lose progress on refresh)
- Address autocomplete via Google Places API
- Distance + duration calculation via Distance Matrix API
- Pricing engine in `lib/pricing.ts` (pure function, fully tested with Vitest)
- Conditional form logic (payer type branches, transport type branches, recurring patterns)
- Zod validation schemas per step
- POST `/api/bookings` API route
- Email templates: NewBookingAdmin, BookingReceivedCustomer (React Email + Resend)
- Confirmation page with public ride ID
- Guest mode (no auth required)
- Optional account creation prompt post-booking

**Deliverable:** A user can complete a full booking, admin gets an email, customer gets a confirmation email, ride is saved in DB.

### Phase 4 — Auth + User Account + Admin Panel (Days 17–22)
**Goal:** Users can register/login and see their rides. Admin can manage all rides.

- Auth pages: login, register, forgot password
- NextAuth.js credentials provider + email verification
- Middleware for protected routes (`/account/*`, `/admin/*`)
- User dashboard: ride list, ride detail, profile, change password
- Admin dashboard: stats overview, all rides table (with filters, search, status), ride detail with edit/status change, user list, settings
- Ride status workflow (New → Under Review → Confirmed → In Progress → Completed / Declined / Cancelled / No-Show)
- Communication log per ride (system events auto-logged, admin can add manual notes)
- Email templates: BookingConfirmed, BookingDeclined, PasswordReset, EmailVerification
- Pre-fill booking form when logged-in user starts a booking

**Deliverable:** Complete user + admin experiences. Admin can run dispatch operations from the panel.

### Phase 5 — Polish, Testing, Launch (Days 23–28)
**Goal:** Production-ready, deployed, tested, monitored.

- Replace placeholder content with real content (from client)
- Replace placeholder images with real photos / curated stock
- Drop in the final Care Ride logo (already designed)
- Accessibility audit (WCAG AA): keyboard nav, screen reader, contrast, focus states
- Performance audit: Lighthouse 90+ mobile across all pages
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Cross-device testing (mobile, tablet, desktop)
- E2E tests for booking flow (Playwright)
- Unit tests for pricing engine + utility functions
- Set up Sentry for production error monitoring
- Set up Vercel Analytics + Google Analytics 4 + Google Search Console
- Configure DNS at Namecheap → Vercel
- SSL certificate (auto via Vercel)
- Submit sitemap to Google Search Console
- Set up Google Cloud Console: Maps API key with spend limits and billing alerts
- Final smoke test on production
- Document hand-off (admin walkthrough, env vars, account access)

**Deliverable:** Live site at crtohio.com, fully tested, monitored, with all integrations wired up.

> **Note:** Day counts are estimates assuming responsive client feedback. Real timeline depends on content delivery and feedback turnaround.

---

## 4. The Plan File You Will Create

In Phase 0 (before Phase 1 begins), create `PLAN.md` at the project root with this structure:

```markdown
# Project Plan — Care Ride Transportation

## Phase 1: Project Foundation
- [ ] Task 1
- [ ] Task 2
...

## Phase 2: Public Marketing Pages
- [ ] Task 1
...

(etc. for all 5 phases)
```

Refine the tasks I proposed above into a concrete actionable checklist. As you complete each task, check it off. This is how we'll track progress.

---

## 5. Project Folder Structure

```
crtohio/
├── app/
│   ├── (marketing)/                  # Public marketing pages (SSG)
│   │   ├── page.tsx                  # Home
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx              # Services index
│   │   │   ├── ambulatory/page.tsx
│   │   │   ├── wheelchair/page.tsx
│   │   │   ├── dialysis/page.tsx
│   │   │   ├── medical-appointments/page.tsx
│   │   │   ├── hospital-discharge/page.tsx
│   │   │   ├── facility/page.tsx
│   │   │   ├── private-pay/page.tsx
│   │   │   └── recurring/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── service-areas/
│   │   │   ├── page.tsx
│   │   │   ├── cincinnati/page.tsx
│   │   │   ├── mason/page.tsx
│   │   │   ├── west-chester/page.tsx
│   │   │   ├── liberty-township/page.tsx
│   │   │   ├── hamilton/page.tsx
│   │   │   └── middletown/page.tsx
│   │   ├── partner/page.tsx
│   │   ├── become-a-driver/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── accessibility/page.tsx
│   ├── (booking)/
│   │   ├── book/
│   │   │   ├── page.tsx
│   │   │   └── confirmation/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/
│   │   ├── account/
│   │   │   ├── page.tsx
│   │   │   ├── rides/page.tsx
│   │   │   ├── rides/[id]/page.tsx
│   │   │   └── profile/page.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── rides/page.tsx
│   │       ├── rides/[id]/page.tsx
│   │       ├── users/page.tsx
│   │       └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── bookings/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── pricing/estimate/route.ts
│   │   ├── places/autocomplete/route.ts
│   │   └── admin/
│   │       ├── rides/route.ts
│   │       └── users/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── ui/                           # shadcn primitives
│   ├── marketing/
│   ├── booking/
│   │   └── steps/
│   ├── dashboard/
│   ├── layout/
│   └── shared/
├── lib/
│   ├── db.ts                         # Prisma client singleton
│   ├── auth.ts                       # NextAuth config + helpers
│   ├── pricing.ts                    # Price calculation engine
│   ├── maps.ts                       # Google Maps helpers
│   ├── email/
│   │   ├── send.ts
│   │   └── templates/
│   ├── validations/                  # Zod schemas
│   ├── stores/                       # Zustand stores
│   ├── constants.ts
│   ├── seo.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── images/
│   ├── logo.svg
│   └── favicon.ico
├── types/
├── tests/
├── .env.example
├── .env.local                        # gitignored
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── PLAN.md                           # You'll create this in Phase 0
├── README.md
└── CLAUDE.md                         # This file
```

---

## 6. Database Schema (Prisma)

This is the canonical schema. Apply it in Phase 1 via `prisma migrate dev --name init`.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum Role {
  ADMIN
  USER
}

enum RideStatus {
  NEW_REQUEST
  UNDER_REVIEW
  CONFIRMED
  DECLINED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  emailVerified   DateTime?
  passwordHash    String?
  name            String?
  phone           String?
  dateOfBirth     DateTime?
  role            Role      @default(USER)
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  rides           Ride[]
  sessions        Session[]
  accounts        Account[]

  @@index([email])
  @@index([role])
}

model Ride {
  id                  String      @id @default(cuid())
  publicId            String      @unique @default(cuid())

  // Ownership (null = guest booking)
  userId              String?
  user                User?       @relation(fields: [userId], references: [id])

  // Ride type
  rideType            String      // "one_way" | "round_trip" | "recurring"
  recurringPattern    String?     // "daily" | "weekly" | "mwf" | "custom"
  recurringDetails    Json?

  // Passenger
  passengerName       String
  passengerDob        DateTime
  passengerPhone      String
  passengerEmail      String?
  emergencyContact    String?

  // Pickup
  pickupAddress       String
  pickupApt           String?
  pickupLocationType  String      // "home" | "hospital" | "nursing_home" | etc.
  pickupLat           Float?
  pickupLng           Float?
  pickupDateTime      DateTime

  // Drop-off
  dropoffAddress      String
  dropoffFacilityName String?
  dropoffAppointmentTime DateTime?
  dropoffDepartment   String?
  dropoffLat          Float?
  dropoffLng          Float?

  // Transport
  transportType       String      // "ambulatory" | "wheelchair"
  needsDoorAssist     Boolean     @default(false)
  needsBuildingAssist Boolean     @default(false)
  hasCompanion        Boolean     @default(false)
  wheelchairOwned     Boolean?
  wheelchairPowered   Boolean?
  hasStairs           Boolean?

  // Payer
  payerType           String      // "medicaid" | "insurance" | "facility" | "private_pay"
  payerDetails        Json

  // Pricing
  estimatedMiles      Float?
  estimatedDuration   Int?        // minutes
  estimatedPrice      Decimal?    @db.Decimal(10, 2)
  finalPrice          Decimal?    @db.Decimal(10, 2)

  // Notes
  specialInstructions String?
  gateCode            String?
  mobilityNotes       String?

  // Status
  status              RideStatus  @default(NEW_REQUEST)
  dispatchNotes       String?
  declineReason       String?

  // Audit
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  reviewedAt          DateTime?
  reviewedBy          String?
  confirmedAt         DateTime?
  completedAt         DateTime?
  cancelledAt         DateTime?

  communications      Communication[]

  @@index([userId])
  @@index([status])
  @@index([pickupDateTime])
  @@index([publicId])
}

model Communication {
  id          String   @id @default(cuid())
  rideId      String
  ride        Ride     @relation(fields: [rideId], references: [id], onDelete: Cascade)
  type        String   // "email" | "sms" | "phone" | "note" | "status_change"
  direction   String   // "inbound" | "outbound" | "internal"
  content     String
  createdAt   DateTime @default(now())
  createdBy   String?

  @@index([rideId])
}

// NextAuth tables
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Seed Script (`prisma/seed.ts`)

The admin user is **predefined via this seed script** — never exposed to public registration.

```ts
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL!
  const adminPassword = process.env.ADMIN_PASSWORD!

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  }

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 12),
        name: 'Care Ride Admin',
        role: Role.ADMIN,
        emailVerified: new Date(),
      },
    })
    console.log('✓ Admin user created:', adminEmail)
  } else {
    console.log('✓ Admin user already exists:', adminEmail)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
```

Run with: `pnpm prisma db seed`

---

## 7. Authentication & Roles

### Roles
- **ADMIN** — Care Ride team. Full access to admin panel. Predefined via seed.
- **USER** — Registered customers. Can view their rides, manage profile.
- **GUEST** — *Not a DB role.* Conceptually, anyone not logged in. They can complete a booking; the resulting Ride row has `userId = null`.

### Auth provider
**NextAuth.js v5** with:
- Credentials provider (email + password, primary)
- Email magic link via Resend (optional fallback)
- **Database sessions** via Prisma adapter (not JWT — enables revocation)

### Route protection (`middleware.ts`)
- `/account/*` → requires `USER` or `ADMIN`
- `/admin/*` → requires `ADMIN` only
- `/api/admin/*` → requires `ADMIN` only
- All public routes open

### Guest bookings
- Guests can complete the full booking flow without registering
- After submission, the confirmation page offers (optional): "Create an account to track your future rides"
- Guests **cannot retrieve their booking after submission** — they must contact dispatch directly. This is by design and must be made clear in the UI.
- If a guest later registers with the same email, do **not** auto-link old guest bookings — require explicit admin linking.

---

## 8. Booking Flow (10 Steps)

The booking flow is a multi-step wizard. All state is kept client-side via Zustand (with localStorage persistence) until final submission.

1. **Ride Type** — one_way / round_trip / recurring (+ recurring sub-options)
2. **Passenger Info** — name, DOB, phone, email, emergency contact
3. **Pickup Info** — address (Google Places autocomplete), apt, location type, date/time
4. **Drop-off Info** — address, facility name, appointment time, department
5. **Transport Type** — ambulatory / wheelchair + assistance flags + wheelchair details (conditional)
6. **Payer Info** — payer type with conditional sub-fields (Medicaid / Insurance / Facility / Private Pay)
7. **Map & Estimate** — Google Distance Matrix calculates miles/time/price; show estimate with disclaimer
8. **Ride Notes** — special instructions, gate codes, mobility notes
9. **Review** — full summary; editable back-links to each step
10. **Confirmation** — success page with public ride ID and clear message: *"Your ride request has been received. This is not a final confirmation. Our team will review your request and contact you shortly."*

### Submission flow (POST `/api/bookings`)
1. Validate full payload with Zod schema
2. Geocode pickup/dropoff addresses (cache results)
3. Calculate distance/duration via Distance Matrix API
4. Calculate estimated price via `lib/pricing.ts`
5. Save Ride with status `NEW_REQUEST`
6. Send email to admin (template: `NewBookingAdmin`)
7. Send confirmation email to passenger (template: `BookingReceivedCustomer`)
8. Return `{ rideId, publicId }`
9. Redirect to `/book/confirmation?id={publicId}`

---

## 9. Pricing Engine (`lib/pricing.ts`)

**This must be a pure function** — testable, predictable, called from anywhere. Must have unit tests.

```ts
export interface PricingInput {
  miles: number
  transportType: 'ambulatory' | 'wheelchair'
  isRoundTrip: boolean
  isAfterHours: boolean         // outside business hours
  needsDoorAssist: boolean
  needsBuildingAssist: boolean
  hasStairs: boolean
  waitingTimeMinutes?: number
}

export interface PricingOutput {
  baseFare: number
  mileageCharge: number
  surcharges: { label: string; amount: number }[]
  subtotal: number
  total: number
  disclaimers: string[]
}

// PLACEHOLDER CONFIG — must be replaced with client-confirmed values before launch
const PRICING_CONFIG = {
  baseFare: 25,
  perMileAmbulatory: 3.5,
  perMileWheelchair: 4.5,
  afterHoursMultiplier: 1.5,
  doorAssist: 10,
  buildingAssist: 15,
  stairs: 20,
  waitPerMinute: 1,
  roundTripDiscount: 0.9,
}

export function calculatePrice(input: PricingInput): PricingOutput {
  // implementation
}
```

> **⚠️ ACTION REQUIRED:** The pricing values above are placeholders. Before launch, get final values from the client and update `lib/constants.ts`.

---

## 10. Google Maps Integration

### APIs used
1. **Places Autocomplete** — client-side, for address input fields
2. **Distance Matrix** — server-side only, for distance + duration calculation
3. **Geocoding** — server-side, address → lat/lng (cache results)

### Two API keys (security)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — client-side, restricted by HTTP referrer (`crtohio.com`, `*.crtohio.com`, `localhost`)
- `GOOGLE_MAPS_SERVER_KEY` — server-side, restricted by IP (or unrestricted but never exposed to client)

### Wrapper
All Google Maps calls go through `lib/maps.ts`. Never call the API directly from a component or route handler outside this file.

```ts
export async function getDistanceMatrix(origin: LatLng, destination: LatLng): Promise<{ miles: number; durationMin: number }>
export async function geocodeAddress(address: string): Promise<LatLng | null>
```

### Cost protection
- Set hard daily quota in Google Cloud Console
- Configure billing alerts at $5, $20, $50
- Use server-side caching (Geocoding results don't change for the same address)

---

## 11. Design System

### Brand colors (from logo work — already designed)
```css
:root {
  --color-primary: #0A4D8C;        /* Trust Blue — primary brand */
  --color-primary-sky: #2196F3;    /* Sky Blue — gradients */
  --color-primary-dark: #073A6A;
  --color-accent: #2BB673;          /* Care Green — CTAs */
  --color-accent-dark: #1A9C5A;
  --color-emergency: #DC3545;       /* For 911 banners */
  --color-bg: #FFFFFF;
  --color-bg-muted: #F0F7FF;        /* Soft Blue BG */
  --color-text: #1F2937;            /* Dark Slate */
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
}
```

### Typography
- **Headings:** Poppins (600, 700) — via `next/font/google`
- **Body:** Inter (400, 500, 600) — via `next/font/google`
- Base size: 16px mobile, scales up on desktop

### Spacing
- Container max-width: 1280px on desktop
- Section padding: `py-16 md:py-24` default
- Generous whitespace — this is a medical brand

### Accessibility (WCAG AA — non-negotiable)
- Keyboard navigable
- Screen reader compatible
- Color contrast meets AA
- Visible focus indicators
- Respects `prefers-reduced-motion`
- Form errors announced and recoverable
- Skip-to-content link

---

## 12. Environment Variables

Create `.env.example` (commit) and `.env.local` (gitignored):

```bash
# Database (Neon)
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
DIRECT_URL="postgresql://user:pass@host/db?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Admin seed (only used by prisma seed)
ADMIN_EMAIL="admin@crtohio.com"
ADMIN_PASSWORD="change-me-strong-password"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""   # Client-side, referrer-restricted
GOOGLE_MAPS_SERVER_KEY=""            # Server-side

# Resend
RESEND_API_KEY=""
RESEND_FROM_EMAIL="bookings@crtohio.com"
ADMIN_NOTIFICATION_EMAIL="dispatch@crtohio.com"

# Sentry (optional)
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # Update to production URL on deploy
```

---

## 13. Setup Commands (Day 1)

```bash
# 1. Initialize the project
pnpm create next-app@latest crtohio --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd crtohio

# 2. Install all dependencies
pnpm add prisma @prisma/client @auth/prisma-adapter next-auth@beta
pnpm add @react-google-maps/api
pnpm add react-hook-form @hookform/resolvers zod
pnpm add zustand @tanstack/react-query
pnpm add resend react-email @react-email/components
pnpm add framer-motion lucide-react
pnpm add bcryptjs
pnpm add -D @types/bcryptjs

# 3. Install dev tooling
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
pnpm add -D @playwright/test
pnpm add -D husky lint-staged

# 4. Initialize shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label form select textarea card dialog toast badge table tabs accordion

# 5. Initialize Prisma
pnpm prisma init
# (now paste the schema from Section 6 into prisma/schema.prisma)

# 6. Set up environment
cp .env.example .env.local
# Fill in real values

# 7. Push schema to DB
pnpm prisma migrate dev --name init
pnpm prisma db seed

# 8. Run dev server
pnpm dev
```

---

## 14. Coding Conventions

### TypeScript
- `strict: true` always
- No `any` without a `// eslint-disable-next-line` comment explaining why
- Prefer `type` over `interface` unless extending
- Use Zod inferred types: `type Booking = z.infer<typeof bookingSchema>`

### React / Next.js
- Server Components by default
- `'use client'` only when needed (forms, hooks, browser APIs)
- Co-locate components; promote to shared when used 2+ times
- Use `next/image` for every image, `next/font` for every font, `next/link` for internal navigation

### Imports
```ts
// 1. External packages
import { useState } from 'react'

// 2. Internal absolute imports (@/)
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'

// 3. Relative imports (one level max)
import { StepOne } from './steps/Step1'

// 4. Type imports
import type { Ride } from '@prisma/client'
```

### Naming
- Functions: `camelCase`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- DB tables (Prisma): `PascalCase`
- DB columns: `camelCase`

### File names
- Components: `PascalCase.tsx`
- Utilities/libs: `camelCase.ts`
- Pages: `page.tsx`, `layout.tsx`, `route.ts`

### Git commits (conventional commits)
- `feat: add booking step 5`
- `fix: correct wheelchair pricing calc`
- `chore: update dependencies`
- `docs: update CLAUDE.md`
- `test: add pricing engine tests`

---

## 15. Security Requirements

- All API routes validate input with Zod (no exceptions)
- All DB queries via Prisma (no raw SQL except where absolutely necessary)
- Passwords hashed with bcrypt (cost factor 12)
- Sessions stored in DB (not JWT)
- CSRF protection enabled (NextAuth handles by default)
- Rate limiting on `/api/bookings` and auth routes (use simple in-memory limiter for now, upgrade to Upstash later)
- No PHI in logs ever (mask Medicaid IDs, DOBs)
- No `dangerouslySetInnerHTML` without sanitization
- Strict CSP headers in `next.config.ts`
- HSTS header (Vercel handles via SSL)

---

## 16. Testing Strategy

### Required tests
- **`lib/pricing.ts`** — exhaustive Vitest tests covering all input combinations
- **Zod schemas** — valid + invalid input cases
- **API routes** — integration tests with mocked Prisma
- **E2E booking flow** — Playwright, full guest + logged-in journeys
- **Admin ride approval** — Playwright E2E

### Test commands
```bash
pnpm test           # Vitest unit + integration
pnpm test:e2e       # Playwright E2E
pnpm test:watch     # Vitest watch mode
```

---

## 17. When You Should STOP and ASK

Pause and ask the human before:
- Modifying `prisma/schema.prisma` in a way requiring a destructive migration
- Adding a new dependency (npm package) — confirm need and license
- Changing the auth model, role structure, or session strategy
- Touching `lib/pricing.ts` business logic without explicit instructions
- Changing `next.config.ts` or `middleware.ts`
- Anything that could log or expose PHI
- Removing or significantly changing existing tests
- Switching from any locked tech choice in Section 2

---

## 18. Open Questions (Pending Client Confirmation)

> Update this list as questions are resolved. Treat any unresolved item as a blocker for that part of the build.

- [ ] **HIPAA requirement?** — Critical for hosting decision. Vercel/Neon free tiers are NOT HIPAA-compliant.
- [ ] **Final pricing formula** — base fare, per-mile rates by transport type, surcharges, after-hours definition, round-trip discount
- [ ] **Business hours** — for after-hours surcharge logic and "open now" indicators
- [ ] **Business phone number** — displayed across the site, emails, schema
- [ ] **Physical address** — for Contact page, footer, LocalBusiness schema
- [ ] **Email addresses** — `bookings@`, `dispatch@`, `info@` setup
- [ ] **Insurance providers accepted** — for Insurance & Payment content
- [ ] **Existing reviews / testimonials** — for Reviews section
- [ ] **Cancellation policy details** — for Terms page
- [ ] **No-show policy details** — for Terms page
- [ ] **Data retention policy** — how long to keep ride records (typically 6-7 years for medical)
- [ ] **Service area precision** — exact ZIPs or just city names?
- [ ] **Guest bookings allowed?** — Decision pending: my recommendation is yes, with clear messaging that guests can't look up their booking later
- [ ] **Ride completion flow confirmation** — driver tells admin → admin marks "Completed" in panel

---

## 19. Phase Plan Future (Not in This Engagement)

These features are intentionally **out of scope** for now. If discussed, treat as **upgrade requests** requiring separate scoping.

- Facility partner portal with logins, dashboards, invoices
- Driver application portal + driver dashboard
- Automated recurring ride scheduling (cron jobs)
- SMS notifications via Twilio
- Online payment processing (Stripe)
- Blog / CMS for content (Sanity or Payload)
- Automated review collection
- QR code generator for marketing
- Advanced analytics dashboard
- Mobile apps (iOS / Android)
- Real-time ride tracking / GPS
- Insurance billing automation

---

## 20. Reference Links

- Next.js App Router: https://nextjs.org/docs/app
- Prisma: https://www.prisma.io/docs
- Neon: https://neon.tech/docs
- NextAuth v5 (Auth.js): https://authjs.dev
- shadcn/ui: https://ui.shadcn.com
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Resend: https://resend.com/docs
- React Email: https://react.email
- Google Distance Matrix: https://developers.google.com/maps/documentation/distance-matrix
- Schema.org MedicalBusiness: https://schema.org/MedicalBusiness
- Vercel: https://vercel.com/docs
- TanStack Query: https://tanstack.com/query/latest

---

## 21. Final Reminder Before You Start

1. ✅ Read this entire document
2. ✅ Create `PLAN.md` with refined task lists per phase
3. ✅ Show me the plan and wait for my approval
4. ✅ Start Phase 1 only after approval
5. ✅ Pause and summarize after each phase
6. ✅ Update CLAUDE.md and PLAN.md as decisions evolve

Let's build something great. 🚀

---

**Last updated:** Project kickoff
**Maintained by:** MedStatsBilling + Claude Code
