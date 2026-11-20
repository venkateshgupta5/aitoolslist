# aitoolslist.ai --- Product Requirements Document & Technical Architecture

**Product vision:** Build a research-driven AI discovery platform that
identifies one standout AI product per category every week, explains why
it matters, and helps visitors evaluate products and express buying
intent.

**Positioning:** An AI intelligence and discovery publication---not
another unfiltered AI tools directory.

------------------------------------------------------------------------

## 1. Product overview

### Objectives

1.  Discover emerging and trending AI tools.
2.  Build trust through credible sources and independent fact-checking.
3.  Help visitors understand products and evaluate purchasing decisions.
4.  Generate qualified leads for listed AI products.
5.  Monetize through paid product listings at **\$49**.
6.  Build organic traffic through SEO-friendly category, product and
    weekly-edition pages.

### Target audiences

  Audience            Primary need
  ------------------- --------------------------------------
  Founders            Discover emerging AI products
  Developers          Find infrastructure and coding tools
  Product managers    Evaluate AI capabilities
  Sales leaders       Discover sales automation
  Enterprise buyers   Compare solutions and vendors
  AI enthusiasts      Stay updated on AI innovation

### Core product promise

**13 categories. 13 standout tools. One curated weekly edition.**

Every weekly selection is researched, fact-checked and editorially
approved before publication.

------------------------------------------------------------------------

## 2. Category architecture

The homepage contains 13 categories, with exactly one featured tool in
each category per weekly edition.

  ------------------------------------------------------------------------
                            \# Category              Coverage
  ---------------------------- --------------------- ---------------------
                             1 AI Compute & GPU      GPU clusters, cloud
                               Cloud                 compute, specialized
                                                     AI chips

                             2 AI Model Serving &    Model hosting,
                               Inference             inference engines,
                                                     optimization,
                                                     deployment

                             3 AI Data               Vector databases,
                               Infrastructure        data pipelines,
                                                     embeddings, data
                                                     processing

                             4 AI Development &      LLM frameworks, agent
                               Orchestration         orchestration,
                                                     workflow
                                                     infrastructure

                             5 AI Observability &    LLM monitoring,
                               Evaluation            tracing, testing,
                                                     evaluations,
                                                     guardrails

                             6 AI Coding & Developer AI IDEs, coding
                               Tools                 assistants, developer
                                                     productivity

                             7 AI Agents             Autonomous agents and
                                                     agent platforms

                             8 AI Sales              Sales intelligence
                                                     and automation

                             9 AI Voice Agents       Voice AI and
                                                     conversational agents

                            10 AI Evals              Model testing,
                                                     benchmarking and
                                                     evaluation platforms

                            11 AI Observability      Production
                                                     monitoring, analytics
                                                     and reliability

                            12 AI Healthcare         Clinical AI and
                                                     healthcare automation

                            13 AI Biotech & Drug     Computational biology
                               Discovery             and drug discovery
  ------------------------------------------------------------------------

**Taxonomy note:** Keep AI Observability & Evaluation (category 5) and
AI Evals (category 10) distinct only if category 5 is focused on
production monitoring, tracing and guardrails while category 10 focuses
on formal model/application evaluation and benchmarking. Category 11
should focus on production observability. Avoid duplicate products
appearing across categories unless explicitly justified.

------------------------------------------------------------------------

## 3. Homepage requirements

The homepage should feel like a premium technology publication, not a
conventional software directory.

### Homepage sections

1.  **Navigation:** Logo, categories, search, submit a tool, login.
2.  **Hero:** Value proposition, weekly edition date and search.
3.  **This week's picks:** 13 category sections, one featured tool per
    category.
4.  **Why aitoolslist.ai:** Three key benefits.
5.  **List your app:** \$49 listing CTA and lead capture.
6.  **Newsletter:** Optional email subscription.
7.  **Footer:** About, contact, privacy, terms and sitemap.

### Hero copy

**Find your next AI advantage.**

13 categories. 13 standout tools. One curated weekly edition.

Independently researched. Fact-checked. Updated every week.

### Three key benefits

1.  **Curated discovery:** One standout AI product in each category,
    rather than hundreds of unfiltered listings.
2.  **Verified intelligence:** Every featured product is researched
    against credible sources and independently fact-checked.
3.  **Decision-ready insights:** Understand capabilities, use cases,
    pricing, integrations and ideal customers before visiting a vendor.

### Weekly picks display

Each category card should show: - Category name - Product logo - Product
name - Short description (maximum 10 words) - One-line reason it was
selected - Verification status - Link to product detail page

Show the edition date and a link to historical editions. If no candidate
meets the evidence threshold, show **"No verified pick this week"**
rather than forcing a weak selection.

### List your app CTA

**List your app here --- \$49**

Explain what the paid listing includes and link to a submission form.
Payment must not influence editorial rankings.

------------------------------------------------------------------------

## 4. Product detail page

Each tool receives a dedicated, indexable URL:

`https://aitoolslist.ai/tools/product-name`

### Required product information

  Field                 Requirement
  --------------------- ----------------------------------------------------
  Product name          Official product name
  Short description     Maximum 10 words
  Product overview      Plain-language explanation of what it does
  Problem solved        Customer pain point
  How it works          Simple explanation of functionality
  Key features          3--6 core capabilities
  Use cases             Practical applications
  Target audience       Who should use it
  Pricing               Verified plans/pricing or "Not publicly disclosed"
  Integrations          Supported platforms and APIs
  Alternatives          Comparable tools, where verified
  Why it was selected   Editorial selection rationale
  Sources               Credible supporting source links
  Last verified         Date of latest verification
  CTA                   Visit website / Request information

### Buying-decision principle

Never invent pricing, capabilities, integrations, customer claims or
adoption metrics. Unknown information must explicitly appear as **"Not
publicly disclosed"** or **"Not verified."**

### Product enquiry form

Capture: - Full name (required) - Work email (required) - Location
(required) - Profession (required) - Message (optional) - Product ID
(automatically attached) - Consent (required)

A visitor should be able to submit an enquiry without creating an
account. Keep the form short and mobile-friendly.

------------------------------------------------------------------------

## 5. AI research and fact-checking engine

This is the core product capability. Use a multi-agent research
pipeline, not a single AI prompt that searches the internet and
publishes results.

### Weekly pipeline

1.  **Discovery/crawler agent:** Finds emerging products and signals
    across credible sources.
2.  **Candidate extraction agent:** Extracts products, deduplicates them
    and maps them to categories.
3.  **Research agent:** Collects official descriptions, features,
    pricing, use cases, launch information and evidence.
4.  **Ranking engine:** Scores eligible candidates using a consistent
    methodology.
5.  **Independent fact-checking agent:** Verifies material claims
    against primary sources and flags unsupported information.
6.  **Editorial approval:** Human reviewer approves the final 13
    selections.
7.  **Publishing agent:** Publishes the weekly edition, product pages,
    metadata and sitemap updates.

### Credible sources to monitor

  -----------------------------------------------------------------------
  Source                              What to extract
  ----------------------------------- -----------------------------------
  Official product websites           Product identity, features and
                                      positioning

  Official changelogs and blogs       Releases and product momentum

  Product Hunt                        Launch activity and community
                                      engagement

  GitHub                              Stars, releases, contributors and
                                      repository activity

  Hacker News                         Developer discussion and interest

  TechCrunch and established tech     Launches, company context and
  publications                        funding

  Research publications               Technical breakthroughs

  Official pricing pages              Current pricing

  Official documentation              Integrations and technical
                                      capabilities
  -----------------------------------------------------------------------

Prefer official APIs, RSS feeds and permitted crawling. Respect
robots.txt, website terms, rate limits and copyright restrictions. A
source being accessible does not mean its content can be republished.

### Ranking methodology

Score each candidate out of 100:

  Factor                             Weight
  ------------------------------ ----------
  Market traction and adoption          25%
  Recent momentum                       20%
  Product innovation                    20%
  Community interest                    15%
  Practical usefulness                  10%
  Source credibility                    10%
  **Total**                        **100%**

The ranking objective is **trending and useful**, not simply most
funded. Funding is a supporting signal, not the ranking objective.

### Candidate thresholds

  Score      Decision
  ---------- -------------------------------
  85--100    Strong candidate
  70--84     Eligible, subject to evidence
  50--69     Needs further research
  Below 50   Reject

### Fact-checking checklist

-   Does the product exist?
-   Is the official website correct?
-   Is the category correct?
-   Is the description accurate?
-   Are claimed features available today?
-   Is pricing current and supported by an official source?
-   Are integrations actually supported?
-   Are customer/adoption claims substantiated?
-   Are cited sources credible and relevant?
-   Is there enough evidence for the weekly selection?

**Hard publishing rule:** A product cannot be published if its identity,
official URL or core product description fails verification. Remove
unsupported claims rather than rewriting them as facts.

Evidence standard: - At least one primary source for product
capabilities. - At least two independent credible sources for important
claims where available. - Official pricing source required before
displaying exact pricing. - No fabricated traffic, funding or usage
metrics. - Record the source URL, title, source type, claims supported
and verification date.

### Weekly schedule

  Day         Activity
  ----------- --------------------------
  Monday      Discover new tools
  Tuesday     Extract and classify
  Wednesday   Research and score
  Thursday    Fact-check and shortlist
  Friday      Editorial approval
  Saturday    Publish weekly edition

Each edition has a fixed `week_start` and `week_end`. Never overwrite
historical editions.

------------------------------------------------------------------------

## 6. Technical architecture

### Recommended stack

  -----------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -----------------------
  Frontend                Next.js + React         Website

  Language                TypeScript              Type safety

  Styling                 Tailwind CSS            Lightweight UI

  UI components           shadcn/ui               Reusable components

  Hosting                 Vercel                  Deployment and CDN

  Database                Neon PostgreSQL         Persistent storage

  ORM                     Drizzle ORM             Database access

  Authentication          Auth.js + Google OAuth  User login

  AI agents               OpenAI API              Research and
                                                  verification

  Search                  Tavily or equivalent    Web discovery
                          search API              

  Crawling                Firecrawl or custom     Source extraction
                          compliant crawler       

  Scheduling              Vercel Cron             Weekly triggers

  Background processing   Inngest or equivalent   Durable multi-step
                                                  workflows

  Analytics               Vercel Analytics        Traffic and performance

  Error monitoring        Sentry                  Application monitoring
  -----------------------------------------------------------------------

### System architecture

``` text
Visitors / Search Engines
          |
          v
Next.js application on Vercel
(SSR, static generation, API routes, SEO)
          |
          +------------------+
          |                  |
          v                  v
    Neon PostgreSQL       Auth.js
    Products, editions,   Google OAuth,
    categories, sources, sessions, roles
    users and leads
          |
          v
Weekly research orchestration
          |
          +--> Scheduler
          +--> Discovery agent
          +--> Research agent
          +--> Ranking engine
          +--> Fact-checking agent
          +--> Editorial approval
          +--> Publishing agent
          |
          v
Search APIs + official sources + compliant crawler
```

### Critical architectural decision

Do not run crawling and multi-agent research inside a normal page
request or one serverless function. These are long-running,
failure-prone workflows. Use durable background orchestration with
retries, step-level execution, logs and idempotency.

The frontend reads only approved, published editions. Research agents
must never directly update public-facing product records.

------------------------------------------------------------------------

## 7. Neon PostgreSQL database design

Separate product identity, weekly rankings, source evidence, research
execution and commercial leads. A product may be featured in multiple
weekly editions without duplicate product records.

### Entity model

-   `categories`: 13 permanent categories.
-   `products`: Master product information.
-   `product_sources`: Source URLs and claim-level evidence.
-   `weekly_editions`: Historical weekly publications.
-   `weekly_picks`: Product-category selections for an edition.
-   `users`: Application user profiles.
-   `leads`: Product enquiries.
-   `research_runs`: Agent execution history.
-   `listing_submissions`: Paid listing requests.

### PostgreSQL migration blueprint

``` sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(140) UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(220) UNIQUE NOT NULL,
  official_url TEXT NOT NULL,
  logo_url TEXT,
  tagline VARCHAR(120),
  short_description VARCHAR(120),
  overview TEXT,
  problem_solved TEXT,
  how_it_works TEXT,
  features JSONB DEFAULT '[]',
  use_cases JSONB DEFAULT '[]',
  target_audience JSONB DEFAULT '[]',
  pricing_model TEXT,
  pricing_details JSONB DEFAULT '{}',
  integrations JSONB DEFAULT '[]',
  alternatives JSONB DEFAULT '[]',
  selection_rationale TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  source_url TEXT NOT NULL,
  source_title TEXT,
  source_type VARCHAR(40),
  credibility_level VARCHAR(20),
  claims_supported JSONB DEFAULT '[]',
  published_at TIMESTAMPTZ,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE weekly_editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_name VARCHAR(150),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  approved_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(week_start)
);

CREATE TABLE weekly_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES weekly_editions(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  product_id UUID REFERENCES products(id),
  ranking_score NUMERIC(5,2),
  selection_reason TEXT,
  verification_status VARCHAR(30),
  published_at TIMESTAMPTZ,
  UNIQUE(edition_id, category_id)
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150),
  email VARCHAR(255) UNIQUE NOT NULL,
  image TEXT,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id UUID REFERENCES users(id),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  location VARCHAR(150) NOT NULL,
  profession VARCHAR(120) NOT NULL,
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(30) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE research_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID REFERENCES weekly_editions(id),
  agent_name VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES categories(id),
  status VARCHAR(30) DEFAULT 'pending',
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE listing_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(200) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  website_url TEXT NOT NULL,
  contact_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  description TEXT,
  payment_status VARCHAR(30) DEFAULT 'pending',
  payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_weekly_editions_status
  ON weekly_editions(status, week_start DESC);
CREATE INDEX idx_weekly_picks_edition
  ON weekly_picks(edition_id, category_id);
CREATE INDEX idx_product_sources_product
  ON product_sources(product_id);
CREATE INDEX idx_leads_product
  ON leads(product_id, created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_research_runs_edition
  ON research_runs(edition_id, status);
```

### Database implementation notes

-   Use Auth.js's standard Drizzle adapter tables for OAuth accounts and
    sessions; the `users` table above is the application-level profile.
-   Add constraints for valid statuses, non-negative scores and valid
    edition date ranges.
-   Enforce that only approved, verified products appear in published
    picks.
-   Add a trigger or application-level transaction to update
    `updated_at`.
-   Store source evidence separately so published claims can be audited.
-   Archive old products rather than deleting historical records.
-   Consider a claim-level evidence table as the product matures.

### Neon credential security

The database credential shared in the original project brief should be
treated as exposed. **Rotate the Neon database password before using
it.** Store the replacement only in Vercel environment variables:

``` env
DATABASE_URL=postgresql://...
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
OPENAI_API_KEY=...
SEARCH_API_KEY=...
```

Never expose database credentials in frontend code, GitHub commits,
client-side environment variables or crawler output. Use Neon's pooled
connection string for application traffic and a separate migration
connection where appropriate.

------------------------------------------------------------------------

## 8. Authentication and user management

Use Google OAuth through Auth.js.

### Login journey

1.  Visitor clicks Sign in.
2.  Google OAuth consent screen opens.
3.  User authenticates.
4.  Auth.js validates the callback.
5.  User profile and OAuth account are persisted.
6.  Session is created.
7.  User is redirected to the homepage or intended destination.

### Roles

  Role              Permissions
  ----------------- ----------------------------------------------
  Visitor           Browse and submit public lead forms
  Registered user   Manage profile and view own enquiries
  Admin             Manage products, categories, leads and users
  Editor            Approve research and publish editions

Google sign-in should not be mandatory for product lead submission.
Offer it as an optional convenience.

------------------------------------------------------------------------

## 9. Lead generation and monetization

There are two separate commercial funnels.

### Funnel A: Product enquiry

``` text
User visits product page
        |
        v
Clicks Request information
        |
        v
Submits lead form
        |
        v
Backend validates and stores lead
        |
        v
Admin notification / CRM follow-up
```

Lead attribution should include: - Product page URL - Product ID and
category - Weekly edition - UTM source, medium and campaign - Referrer -
Submission timestamp

### Funnel B: \$49 paid listing

Recommended flow:

1.  Vendor submits listing form.
2.  Backend validates website and submission.
3.  Create a \$49 payment order using Razorpay or Stripe.
4.  User completes payment.
5.  Verify payment signature server-side.
6.  Update payment status to paid.
7.  Admin reviews the listing.
8.  Publish after editorial approval.

Payment buys a listing opportunity, not a guaranteed weekly editorial
selection. Paid listings must be clearly labeled **Sponsored** or
**Promoted** and must never influence independent weekly rankings.

------------------------------------------------------------------------

## 10. SEO architecture

SEO must be part of the initial routing and database design.

### URL structure

  Page             URL
  ---------------- -------------------------
  Homepage         `/`
  Category         `/categories/ai-agents`
  Product          `/tools/product-name`
  Weekly edition   `/weekly/2026-11-20`
  About            `/about`
  Submit listing   `/submit-tool`

### Technical SEO checklist

  Element              Implementation
  -------------------- ----------------------------------------------------
  Canonical URLs       Self-referencing canonical on every indexable page
  Sitemap              Dynamic XML sitemap
  Robots.txt           Allow public pages, block private/admin routes
  Metadata             Dynamic title and description
  Open Graph           Social sharing metadata
  Twitter cards        Social previews
  Schema.org           SoftwareApplication, Organization, BreadcrumbList
  Internal links       Category ↔ product ↔ weekly edition
  Breadcrumbs          Structured navigation
  Image optimization   Next.js Image
  Mobile SEO           Responsive and mobile-first
  Redirects            301 for changed slugs
  Duplicate content    Canonical and noindex strategy
  Pagination           Crawlable category archives

### Example product metadata

``` html
<title>Product Name – Features, Pricing & Review | aitoolslist.ai</title>
<meta name="description"
content="Discover Product Name, its features, use cases,
pricing and capabilities. Explore our verified AI tool profile." />
<link rel="canonical"
href="https://aitoolslist.ai/tools/product-name" />
```

### Structured data

-   `Organization` for aitoolslist.ai.
-   `WebSite` and `SearchAction` where applicable.
-   `SoftwareApplication` for product pages when accurate.
-   `BreadcrumbList` for navigation.
-   `Article` for editorial weekly research pages.

Do not use `AggregateRating` or fake review schema unless genuine,
eligible user review data exists.

### Indexing strategy

-   Homepage: index.
-   Category pages: index.
-   Verified product pages: index.
-   Historical weekly editions: index.
-   Draft and unverified product pages: noindex.
-   Login, admin, lead confirmation and internal APIs: noindex.

Sitemap should include canonical URLs only and update after publication.

------------------------------------------------------------------------

## 11. Application APIs

  Endpoint                      Method       Purpose
  ----------------------------- ------------ ----------------------------
  `/api/categories`             GET          Get all categories
  `/api/products`               GET          Search and filter products
  `/api/products/[slug]`        GET          Fetch product details
  `/api/weekly/latest`          GET          Fetch current edition
  `/api/weekly/[date]`          GET          Fetch historical edition
  `/api/leads`                  POST         Submit product enquiry
  `/api/listings`               POST         Submit paid listing
  `/api/auth/[...nextauth]`     GET/POST     Google authentication
  `/api/admin/products`         POST/PATCH   Manage products
  `/api/admin/approve`          POST         Approve weekly selections
  `/api/cron/weekly-research`   POST         Trigger research workflow
  `/api/cron/publish`           POST         Publish approved edition

All admin endpoints require server-side role authorization. Public
endpoints need input validation and rate limiting.

------------------------------------------------------------------------

## 12. Admin dashboard

An internal admin dashboard is essential to operate 13 categories and
multiple agents every week.

### Admin capabilities

1.  View all 13 category selections.
2.  Compare shortlisted candidates.
3.  View research sources and individual claims.
4.  Review fact-check results.
5.  Approve, reject or replace a selection.
6.  Edit product descriptions.
7.  Publish or schedule an edition.
8.  View product leads and export CSV.
9.  Track paid listings and payment status.
10. Retry failed research jobs.

### Editorial states

Use explicit states: - `draft` - `researching` - `needs_review` -
`verified` - `approved` - `published` - `rejected` - `archived`

The admin dashboard must distinguish draft, verified, approved and
published states.

------------------------------------------------------------------------

## 13. Performance and lightweight design

Performance is a product requirement.

### Core Web Vitals targets

  Metric            Target
  -------- ---------------
  LCP        ≤ 2.5 seconds
  INP             ≤ 200 ms
  CLS                ≤ 0.1

Targets apply to the 75th percentile of real-user visits, separately for
mobile and desktop.

### Engineering decisions

  Area                  Decision
  --------------------- ----------------------------------------------------
  Rendering             Static generation for homepage and published pages
  Refresh               Revalidate after weekly publication
  Database              Indexed queries and connection pooling
  Images                WebP/AVIF, optimized logos
  JavaScript            Minimal client-side JavaScript
  Fonts                 One optimized font family
  CSS                   Tailwind, minimal styling overhead
  Search                PostgreSQL full-text search initially
  Caching               Vercel CDN and appropriate cache headers
  Third-party scripts   Load analytics asynchronously
  Animations            Minimal CSS transitions

Avoid heavy client-side frameworks, large animations, autoplay videos
and unnecessary third-party scripts.

The public homepage must not make live AI or crawler API calls. It reads
pre-published data from the database and CDN.

------------------------------------------------------------------------

## 14. Security and reliability

-   Validate all user input using Zod.
-   Apply rate limits to enquiry and listing endpoints.
-   Add CAPTCHA or bot protection where abuse warrants it.
-   Verify Google OAuth sessions server-side.
-   Protect admin operations using RBAC.
-   Verify payment signatures.
-   Store secrets only in deployment environment variables.
-   Use parameterized SQL queries.
-   Maintain agent execution logs.
-   Implement retry limits and dead-letter handling.
-   Back up database data.
-   Keep personal lead information access-controlled.
-   Define lead retention and deletion policies.
-   Obtain consent for marketing communication separately.
-   Restrict crawler domains, request timeouts and content sizes.
-   Implement SSRF protection and block private/internal network
    addresses.

------------------------------------------------------------------------

## 15. Product analytics and KPIs

Measure discovery quality and commercial outcomes.

  KPI                             What it measures
  ------------------------------- -------------------------
  Organic sessions                SEO acquisition
  Category page visits            Category discovery
  Product page views              Product interest
  Search-to-click rate            Discovery effectiveness
  Lead conversion rate            Buying intent
  Leads per category              Commercial demand
  Paid listing conversion         Monetization
  Verified claim rate             Research quality
  Weekly publication completion   Operational reliability
  Research cost per edition       AI economics

Suggested initial operating targets: - 13 category slots per weekly
edition. - 100% of published products have verified official URLs. -
100% of material product claims have supporting evidence. - 100% of
editions retain historical records. - Zero unapproved automated
publications. - Track product enquiry and paid listing conversion
separately.

------------------------------------------------------------------------

## 16. Development roadmap

Build in four phases rather than attempting the entire agent
infrastructure on day one.

### Phase 1 --- Directory foundation (P0)

-   Next.js website
-   Responsive homepage
-   13 category pages
-   Product detail pages
-   Neon database
-   Google login
-   Product enquiry forms
-   \$49 listing submission
-   SEO foundation

### Phase 2 --- Research engine (P1)

-   Web discovery agent
-   Source extraction
-   Candidate classification
-   Ranking engine
-   Fact-checking agent
-   Research audit trail

### Phase 3 --- Editorial automation (P1)

-   Weekly scheduler
-   Admin dashboard
-   Human approval workflow
-   Automatic publishing
-   Historical weekly editions
-   Dynamic sitemap

### Phase 4 --- Growth and monetization (P2)

-   Razorpay payment integration
-   Paid listing management
-   Newsletter
-   Advanced search
-   Analytics dashboard
-   Lead management and CRM integration

------------------------------------------------------------------------

## 17. Recommended project structure

``` text
aitoolslist/
├── app/
│   ├── page.tsx
│   ├── categories/
│   │   └── [slug]/page.tsx
│   ├── tools/
│   │   └── [slug]/page.tsx
│   ├── weekly/
│   │   └── [date]/page.tsx
│   ├── login/
│   ├── submit-tool/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── editions/
│   │   ├── research/
│   │   └── leads/
│   └── api/
│       ├── products/
│       ├── categories/
│       ├── leads/
│       ├── listings/
│       ├── auth/
│       ├── admin/
│       └── cron/
├── components/
│   ├── layout/
│   ├── homepage/
│   ├── products/
│   ├── categories/
│   ├── forms/
│   └── ui/
├── design-system/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── components/
├── lib/
│   ├── db/
│   ├── auth/
│   ├── seo/
│   ├── validation/
│   └── analytics/
├── agents/
│   ├── discovery/
│   ├── research/
│   ├── ranking/
│   ├── fact-check/
│   └── publishing/
├── workflows/
│   └── weekly-edition.ts
├── drizzle/
│   └── migrations/
└── public/
    ├── logos/
    └── icons/
```

------------------------------------------------------------------------

## 18. MVP definition of done

-   [ ] Homepage displays all 13 categories.
-   [ ] Exactly one verified featured tool per category where evidence
    supports a selection.
-   [ ] Each product has a dedicated SEO-friendly page.
-   [ ] Product short descriptions are limited to 10 words.
-   [ ] Product pages provide buying-decision information.
-   [ ] Enquiry form captures name, email, location and profession.
-   [ ] Google sign-in works.
-   [ ] Neon stores products, categories, editions and leads.
-   [ ] Admin can edit and approve weekly selections.
-   [ ] Discovery and fact-checking agents maintain source evidence.
-   [ ] Publishing runs on a weekly schedule.
-   [ ] Previous weekly editions remain accessible.
-   [ ] \$49 listing CTA captures vendor enquiries.
-   [ ] Canonical tags, sitemap and robots.txt work.
-   [ ] Mobile responsiveness and Core Web Vitals targets are met.
-   [ ] No unverified AI-generated content is automatically published.

------------------------------------------------------------------------

## 19. Final product recommendation

Position aitoolslist.ai as an **AI intelligence and discovery
publication**, not an AI tools marketplace.

The competitive advantage should be the quality of selection,
credibility of research and usefulness of product information.

Separate the platform into three systems:

1.  **Discovery system:** Finds and ranks emerging products.
2.  **Editorial system:** Verifies and approves product information.
3.  **Distribution system:** Publishes SEO pages and converts visitors
    into leads.

Build Phase 1 first using Next.js, Tailwind, Drizzle and Neon. Once the
directory and admin foundation work, integrate the multi-agent research
engine.

**Implementation status:** This document specifies the product and
architecture. It does not mean the website has been deployed or
connected to the Neon database.
