# aitoolslist.ai

A research-driven AI **product intelligence** publication — 14 categories, one
standout tool per category, published as one curated **fortnightly** edition.
Built from the product PRD & technical architecture spec
(`aitoolslist_prd_architecture.md`) and its enhancement specs.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — lightweight, mobile-first UI
- **Drizzle ORM** + **Neon PostgreSQL**
- **Auth.js (NextAuth v5)** + Google OAuth (optional sign-in)
- **Zod** validation on all write endpoints
- Deployed on **Vercel** (fortnightly Discovery Agent runs via Vercel Cron)

## Editions

Editions are **fortnightly**: two per month, covering the 1st–15th and the
16th–end of month. The current edition's content is the display source of truth
in `lib/content.ts`.

## What's implemented

- Responsive homepage: hero, 14 category picks, "AI landscape this fortnight",
  edition takeaways, benefits, $299 listing CTA, newsletter
- `/categories` index + `/categories/[slug]` detail pages
- Intelligence-grade product profiles `/tools/[slug]` — at-a-glance specs,
  overview, strengths/limitations, alternatives comparison, benchmarks and a
  claim-level verification table
- Fortnightly edition pages `/editions/[date]` with history-safe routing
- Product enquiry form (`/api/leads`) and $299 listing form (`/api/listings`),
  persisted to Neon
- Google sign-in (`/login`)
- **Fortnightly Discovery Agent** (`agent/`) — multi-stage research →
  fact-check → scoring → publish pipeline, triggered by Vercel Cron
  (`/api/agent/run`, scheduled on the 1st and 16th)
- Full SEO: dynamic metadata, canonical URLs, Open Graph, `sitemap.xml`,
  `robots.txt`, JSON-LD (Organization, WebSite, SoftwareApplication,
  BreadcrumbList, Article)
- Neon schema (Drizzle) + idempotent seed script

### Editorial honesty

Each pick carries an explicit verification status. **Verified** picks have
cleared the Discovery Agent's evidence gate (dated evidence + score threshold);
others display as **curated preview · pending fact-check**. Every winner carries
dated evidence URLs, pricing is directional (never invented), and
vendor-reported metrics are flagged as such in the copy and in the claim-level
verification table. Categories without a credible fresh candidate are shown as
"No verified pick this edition" rather than forced.

## Scaffolded for later phases (NOT live)

- Admin dashboard & editorial review queue
- Razorpay/Stripe payments, newsletter ESP, advanced search

## Local development

```bash
npm install
cp .env.example .env   # fill in secrets (see below)
npm run db:push        # create tables in Neon
npm run db:seed        # seed categories, products, edition
npm run dev
```

Run the Discovery Agent locally with `npm run agent` (see `agent/cli.ts`).

## Environment variables

| Variable               | Purpose                           |
| ---------------------- | --------------------------------- |
| `DATABASE_URL`         | Neon pooled connection string     |
| `AUTH_SECRET`          | Auth.js session encryption secret |
| `AUTH_GOOGLE_ID`       | Google OAuth client ID            |
| `AUTH_GOOGLE_SECRET`   | Google OAuth client secret        |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for SEO     |

> **Security:** the Neon credential was shared in plaintext during setup and
> should be treated as exposed — rotate the Neon password and update
> `DATABASE_URL` in both `.env` and the Vercel project. Google OAuth requires
> the deployment's `/api/auth/callback/google` URL added as an authorized
> redirect URI in the Google Cloud console.
