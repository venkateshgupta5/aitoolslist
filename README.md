# aitoolslist.ai

A research-driven AI discovery publication — 13 categories, 13 standout tools,
one curated weekly edition. Built from the product PRD & technical architecture
spec (`aitoolslist_prd_architecture.md`).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — lightweight, mobile-first UI
- **Drizzle ORM** + **Neon PostgreSQL**
- **Auth.js (NextAuth v5)** + Google OAuth (optional sign-in)
- **Zod** validation on all write endpoints
- Deployed on **Vercel**

## What's implemented (Phase 1 — directory foundation)

- Responsive homepage: hero, 13 category weekly picks, benefits, $49 listing CTA, newsletter
- `/categories` index + `/categories/[slug]` detail pages
- SEO-friendly product pages `/tools/[slug]` with full buying-decision info
- Weekly edition pages `/weekly/[date]` with history-safe routing
- Product enquiry form (`/api/leads`) and $49 listing form (`/api/listings`), persisted to Neon
- Google sign-in (`/login`)
- Full SEO: dynamic metadata, canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`,
  JSON-LD (Organization, WebSite, SoftwareApplication, BreadcrumbList, Article)
- Neon schema (Drizzle) + idempotent seed script

### Editorial honesty

Phase 1 picks are a **curated preview** and have not yet run through the Phase 2
multi-agent research + independent fact-check pipeline. Pricing is directional
and links to official pages; no adoption metrics are asserted as verified facts.

## Scaffolded for later phases (NOT live)

- Phase 2 multi-agent research/fact-check pipeline (`research_runs` table exists)
- Phase 3 admin dashboard & weekly scheduler
- Phase 4 Razorpay/Stripe payments, newsletter ESP, advanced search

## Local development

```bash
npm install
cp .env.example .env   # fill in secrets (see below)
npm run db:push        # create tables in Neon
npm run db:seed        # seed categories, products, weekly edition
npm run dev
```

## Environment variables

| Variable             | Purpose                              |
| -------------------- | ------------------------------------ |
| `DATABASE_URL`       | Neon pooled connection string        |
| `AUTH_SECRET`        | Auth.js session encryption secret    |
| `AUTH_GOOGLE_ID`     | Google OAuth client ID               |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret           |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for SEO      |

> **Security:** the Neon credential was shared in plaintext during setup and
> should be treated as exposed — rotate the Neon password and update
> `DATABASE_URL` in both `.env` and the Vercel project. Google OAuth requires
> the deployment's `/api/auth/callback/google` URL added as an authorized
> redirect URI in the Google Cloud console.
