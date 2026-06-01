# GETTING STARTED — Care Ride Transportation Project

This guide walks you through setting up the project on your local machine and getting Claude Code working on it.

---

## Step 1: Prerequisites

Make sure you have these installed:

| Tool | Check command | Install link |
|---|---|---|
| Node.js 20+ LTS | `node -v` | https://nodejs.org |
| pnpm | `pnpm -v` | `npm install -g pnpm` |
| Git | `git -v` | https://git-scm.com |
| VS Code | — | https://code.visualstudio.com |
| Claude Code extension | — | Available in VS Code marketplace |

---

## Step 2: Create the Project Folder

```bash
mkdir crtohio
cd crtohio
git init
```

---

## Step 3: Drop In the CLAUDE.md File

Place `CLAUDE.md` (the one I created for you) at the root of the `crtohio` folder.

Your folder should look like this:
```
crtohio/
└── CLAUDE.md
```

---

## Step 4: Set Up Free Accounts (Do This Once)

Before Claude Code can finish setup, you need accounts on these services. All have free tiers.

### A) GitHub
- Sign up at https://github.com (skip if you already have one)
- Create a new repository called `crtohio` (private)
- Add your client's `operations@medstatsbilling.com` as a collaborator (Settings → Collaborators)

### B) Neon (PostgreSQL database)
- Sign up at https://neon.tech (free)
- Create a new project called `crtohio`
- Copy the connection string — you'll need it for `.env.local`

### C) Vercel (hosting — needed for deploy later, not for local dev)
- Sign up at https://vercel.com (free)
- Skip the project creation for now; we'll connect it when ready to deploy

### D) Resend (email)
- Sign up at https://resend.com (free, 3,000 emails/month)
- Get your API key from the dashboard

### E) Google Cloud (Maps API)
- Go to https://console.cloud.google.com
- Create a project called "CareRide"
- Enable these APIs:
  - **Distance Matrix API**
  - **Places API**
  - **Geocoding API**
- Go to "Credentials" → create an API key
- **Important:** Set quota limits (e.g., 1,000 requests/day) under "Quotas & System Limits" so you never get a surprise bill
- Set up billing alerts at $5, $20, $50

---

## Step 5: Open in VS Code and Launch Claude Code

```bash
code .
```

Once VS Code is open in the `crtohio` folder:
1. Open the Claude Code panel
2. Claude Code will auto-detect and read `CLAUDE.md`
3. Give Claude Code this first instruction:

```
Read CLAUDE.md carefully. Then create PLAN.md following the instructions in Section 4 of CLAUDE.md. Show me the plan with all 5 phases broken into specific actionable tasks. Do not write any code yet. I'll review the plan and approve before you start Phase 1.
```

Claude Code will:
1. Read the full `CLAUDE.md`
2. Create a `PLAN.md` with checkboxed task lists for each of the 5 phases
3. Wait for your approval

---

## Step 6: Review the Plan & Approve

Once Claude Code shows you `PLAN.md`:
- Read through all 5 phases
- Add/remove/edit tasks as you see fit
- When happy, tell Claude Code: **"Plan approved. Begin Phase 1."**

---

## Step 7: Phase-by-Phase Development

Claude Code will work through one phase at a time. After each phase:
- It will stop and summarize what was built
- You test it
- You give the go-ahead for the next phase

Example prompts after each phase:
- *"Phase 1 looks good. Run all tests, then begin Phase 2."*
- *"Pause on Phase 2 — I want to change the home page hero. Use this copy instead: [...]"*
- *"Skip the blog page for now, that's a Phase 2 feature. Continue."*

---

## Step 8: Environment Variables Setup

After Claude Code completes Phase 1, fill in your `.env.local` file with:

```bash
# From Neon
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Pick any values for now (these create your admin login)
ADMIN_EMAIL="admin@crtohio.com"
ADMIN_PASSWORD="MyStrongPassword123!"

# From Google Cloud
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
GOOGLE_MAPS_SERVER_KEY="..."

# From Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="bookings@crtohio.com"  # Use Resend's onboarding domain initially
ADMIN_NOTIFICATION_EMAIL="your-email@gmail.com"  # Where to receive booking notifications

# Local site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Then run:
```bash
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

Visit `http://localhost:3000` — you should see the placeholder app running.

---

## Step 9: Daily Development Workflow

```bash
pnpm dev              # Start the Next.js dev server
pnpm prisma studio    # Browse the database at http://localhost:5555
pnpm lint             # Check code style
pnpm typecheck        # Type check
pnpm test             # Run unit tests
```

Commit frequently with conventional commit messages:
```bash
git add .
git commit -m "feat: add home page hero section"
git push origin main
```

---

## Step 10: When Ready to Deploy

After Phase 5, follow these steps to push live:

1. Push code to GitHub
2. In Vercel: New Project → Import from GitHub → Select `crtohio` repo
3. Add all environment variables from `.env.local` to Vercel project settings
4. Deploy — Vercel auto-detects Next.js
5. Connect domain: Vercel → Domains → Add `crtohio.com`
6. Update DNS at Namecheap to point to Vercel (Vercel will give exact records)
7. Wait for DNS propagation (usually 5-60 minutes)
8. SSL certificate auto-issues via Vercel

---

## Troubleshooting

**Claude Code doesn't seem to follow CLAUDE.md instructions**
- Make sure the file is exactly at the root of your project folder, named `CLAUDE.md` (case-sensitive)
- Start a new chat session if Claude Code seems off-track
- Reference CLAUDE.md explicitly: *"Per Section 8 of CLAUDE.md, the booking flow has 10 steps. Please follow that."*

**Prisma migration fails**
- Make sure `DATABASE_URL` is correct in `.env.local`
- For Neon, both `DATABASE_URL` and `DIRECT_URL` need to be set
- Try `pnpm prisma migrate reset` to start fresh (warning: deletes all data)

**`pnpm dev` fails with module not found**
- Run `pnpm install` again
- Delete `node_modules` and `pnpm-lock.yaml`, then `pnpm install`

**Google Maps autocomplete not working**
- Check that the API key is correct
- Verify the APIs are enabled in Google Cloud Console
- Check the API key restrictions allow `localhost` during dev

---

## Files Claude Code Will Create

After all phases, your project will look like this:

```
crtohio/
├── CLAUDE.md              ← Project context for Claude Code
├── PLAN.md                ← Phase-by-phase task list
├── README.md              ← Human-readable project overview
├── app/                   ← Next.js pages and API routes
├── components/            ← React components
├── lib/                   ← Utilities, DB client, helpers
├── prisma/                ← Database schema + migrations
├── public/                ← Static assets
├── types/                 ← Shared TypeScript types
├── tests/                 ← Unit and E2E tests
├── .env.local             ← Your secrets (gitignored)
├── .env.example           ← Template (committed)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Summary

The full flow:
1. Set up accounts (GitHub, Neon, Vercel, Resend, Google Cloud)
2. Create local folder + drop in `CLAUDE.md`
3. Open in VS Code, launch Claude Code
4. Tell it to read `CLAUDE.md` and create `PLAN.md`
5. Approve the plan
6. Work through phases 1-5, approving each
7. Deploy to Vercel + crtohio.com

You can interrupt Claude Code at any time to make changes, ask questions, or change direction. Just keep `CLAUDE.md` and `PLAN.md` updated as the source of truth.

Good luck! 🚀
