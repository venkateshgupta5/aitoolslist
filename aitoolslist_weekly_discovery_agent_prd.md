# aitoolslist.ai --- Weekly AI Tools Discovery Agent

**Product Requirements Document & Technical Architecture**

Version: 1.0\
Status: Proposed\
Execution: On-demand + weekly scheduled\
Primary output: 13 category winners per weekly edition

## 1. Product Vision

Build an autonomous AI research agent that discovers, researches,
evaluates, verifies, and ranks emerging AI tools every week.

The agent must identify the single best tool in each of the existing 13
categories and publish approved winners to Neon PostgreSQL.

Primary command:

``` text
get this week's tool
```

## 2. Product Requirements

-   Discover AI products from 10 credible sources.
-   Fetch detailed product information.
-   Store all raw research locally.
-   Normalize and deduplicate candidates.
-   Classify products into 13 predefined categories.
-   Calculate weekly momentum and quality scores.
-   Independently fact-check shortlisted products.
-   Select one winner per category.
-   Require editorial approval before publishing.
-   Store weekly editions and historical rankings.

## 3. Research Sources

1.  **Product Hunt** --- product launches, votes, comments, and makers.
2.  **Hacker News** --- Show HN, discussions, and technical feedback.
3.  **GitHub** --- stars, forks, contributors, and release activity.
4.  **Reddit** --- community discussions and adoption signals.
5.  **Peerlist** --- developer and startup launches.
6.  **BetaList** --- early-stage product launches.
7.  **TechCrunch** --- startup funding and company developments.
8.  **Crunchbase** --- company funding and investor information.
9.  **G2** --- customer reviews and product positioning.
10. **Official company websites and changelogs** --- capabilities,
    pricing, and documentation.

Use APIs and permitted feeds wherever possible. Product Hunt commercial
API usage requires permission.

## 4. Agent Architecture

### Orchestrator

-   Accept execution command.
-   Determine weekly date boundaries.
-   Create execution ID.
-   Coordinate all agents.
-   Handle retries and failures.

### Discovery Agent

-   Query all 10 sources.
-   Extract candidate tools.
-   Capture source URLs and timestamps.
-   Identify launch and engagement signals.

### Enrichment Agent

Collect:

-   Product name and website.
-   Description and tagline (maximum 10 words).
-   Features and capabilities.
-   Use cases.
-   Pricing and free tier.
-   API and integration support.
-   Open-source status.
-   Founders and company details.
-   Funding and investors.
-   Customer and adoption evidence.
-   Competitors and differentiation.

### Classification Agent

-   Map products to the existing 13 categories.
-   Deduplicate products.
-   Assign category confidence.
-   Flag ambiguous classifications.

### Ranking Agent

Calculate normalized scores:

  Dimension         Weight
  ------------- ----------
  Traction             25%
  Momentum             20%
  Innovation           20%
  Community            15%
  Usefulness           10%
  Credibility          10%
  **Total**       **100%**

Funding is a supporting signal, not an independent guarantee of product
quality.

### Fact-check Agent

-   Independently retrieve supporting evidence.
-   Validate features, pricing, and funding.
-   Verify company and product existence.
-   Challenge unsupported ranking claims.
-   Generate a confidence score.
-   Flag conflicting information.

### Publishing Agent

-   Prepare category winners.
-   Request human approval.
-   Upsert approved records into Neon.
-   Generate weekly edition.
-   Preserve historical records.

## 5. Weekly Workflow

1.  Determine the weekly date range.
2.  Query all 10 sources.
3.  Collect candidate products.
4.  Fetch detailed product information.
5.  Save raw JSON locally.
6.  Normalize product information.
7.  Deduplicate candidates.
8.  Classify into 13 categories.
9.  Calculate ranking scores.
10. Shortlist leading candidates.
11. Run independent fact-checking.
12. Select one winner per category.
13. Generate approval report.
14. Publish approved winners to Neon.
15. Generate historical weekly edition.

Use Monday 00:00 through Sunday 23:59 UTC as the default research
window.

## 6. Product Research Data Model

For every discovered tool, collect the following fields:

  -----------------------------------------------------------------------
  Information group                   Required fields
  ----------------------------------- -----------------------------------
  Identity                            Name, website, company, founder,
                                      launch date

  Description                         Tagline, detailed description

  Capabilities                        Features, use cases, supported
                                      models, integrations

  Commercial                          Pricing, free tier, enterprise
                                      availability

  Technology                          Open source, API availability,
                                      deployment options

  Traction                            GitHub stars, forks, votes,
                                      comments, community activity

  Business                            Funding amount, investors, funding
                                      stage, revenue if verified

  Adoption                            Customer names, user count,
                                      adoption evidence

  Competition                         Direct competitors, differentiation

  Research                            Source URLs, publication dates,
                                      evidence excerpts

  Agent intelligence                  Category, scores, confidence,
                                      recommendation

  Audit                               First discovered, last updated,
                                      verification timestamp
  -----------------------------------------------------------------------

Do not invent missing information. Every factual claim should have an
evidence URL, timestamp, and verification status.

## 7. Database Schema

Create the following Neon PostgreSQL tables:

  Table                  Purpose
  ---------------------- ----------------------------------------
  `categories`           Existing 13 category definitions
  `tools`                Canonical product records
  `tool_sources`         Source-specific observations and links
  `research_snapshots`   Detailed weekly research
  `tool_scores`          Individual scoring dimensions
  `fact_checks`          Claims, evidence, and verification
  `weekly_editions`      One record per weekly run
  `weekly_winners`       One winner per category per edition
  `agent_runs`           Execution logs, status, and errors

Database constraints:

-   Unique canonical tool identifier.
-   Unique `(edition_id, category_id)` in `weekly_winners`.
-   Unique `(tool_id, source_id, observation_period)` in source
    observations.
-   Never overwrite historical editions.
-   Use upsert for repeat executions of the same edition.
-   Preserve previous winners and rankings for historical comparisons.

## 8. Local Research Storage

Use a structured directory so every weekly execution is reproducible.

``` text
aitoolslist-agent/
  config/
    categories.json
    sources.json
    scoring.json

  data/
    raw/
      2026-W47/
        producthunt.json
        hackernews.json
        github.json
        ...
    enriched/
      2026-W47.json
    verified/
      2026-W47.json
    winners/
      2026-W47.json

  agents/
    orchestrator.ts
    discovery.ts
    enrichment.ts
    classification.ts
    ranking.ts
    fact-check.ts
    publisher.ts

  services/
    source-connectors/
    product-research.ts
    scoring-engine.ts
    database.ts

  schemas/
    tool.schema.json
    evidence.schema.json
    edition.schema.json

  README.md
```

Each weekly run should preserve raw responses, normalized records,
evidence, and final decisions. Local storage must not contain API
secrets.

## 9. Technology Stack

  Layer               Technology
  ------------------- ----------------------------------------------
  Language            TypeScript
  Runtime             Node.js
  Orchestration       Inngest
  LLM                 OpenAI API
  Web research        Tavily + Firecrawl
  Product discovery   Native APIs, RSS, and permitted public feeds
  Data validation     Zod
  Local storage       JSON files
  Database            Neon PostgreSQL
  ORM                 Drizzle
  Deployment          Vercel
  Scheduling          Vercel Cron
  Frontend            Existing Next.js application

Use deterministic TypeScript functions for date windows, deduplication,
scoring, validation, and database writes. Use LLM agents for research,
classification, and claim analysis.

## 10. Agent Execution Commands

  ---------------------------------------------------------------------------------
  Command                                       Behaviour
  --------------------------------------------- -----------------------------------
  `get this week's tool`                        Full weekly discovery and research

  `get this week's tool --dry-run`              Research and rank without database
                                                writes

  `get this week's tool --category AI Agents`   Run a single category

  `get this week's tool --reverify`             Recheck shortlisted candidates

  `get this week's tool --publish`              Publish an approved edition
  ---------------------------------------------------------------------------------

A repeat execution for the same week must be idempotent.

## 11. Quality and Acceptance Criteria

-   All 10 configured sources are attempted and source failures are
    logged.
-   All 13 categories are evaluated.
-   Every candidate has a canonical URL and deduplication key.
-   Every winner has detailed product information.
-   Every winner has verifiable supporting evidence.
-   The scoring methodology is consistent and auditable.
-   No unsupported funding, customer, or usage claims are published.
-   Exactly one approved winner exists per category.
-   Historical weekly editions remain accessible.
-   Failed runs can resume without duplicating records.
-   The system reports categories with insufficient evidence instead of
    inventing winners.

Exactly 13 winners is the publication target, not permission to
fabricate recommendations. A category with no credible candidate should
be flagged for manual review.

## 12. Rollout Plan

  -----------------------------------------------------------------------
  Phase                   Scope                   Outcome
  ----------------------- ----------------------- -----------------------
  Phase 1                 Source connectors and   Working discovery
                          local ingestion         engine

  Phase 2                 Enrichment and          Complete product
                          classification          research

  Phase 3                 Scoring and independent Ranked, evidence-backed
                          verification            candidates

  Phase 4                 Neon integration and    Reliable weekly
                          approval                publishing

  Phase 5                 Scheduling and          Production-ready agent
                          historical editions     
  -----------------------------------------------------------------------

## 13. Implementation Principles

Keep the agent independent of the website frontend. The agent should
operate as a standalone research pipeline. The website should only
consume approved records from Neon.

This enables:

1.  **Independent research:** Change discovery sources or AI models
    without changing the website.
2.  **Reproducibility:** Re-run historical weeks and compare rankings.
3.  **Editorial control:** Prevent unverified AI-generated
    recommendations from reaching the public website.

Build the research engine before website integration. The first
milestone should produce a local weekly JSON file containing discovered
candidates, complete product profiles, source evidence, individual
scores, and 13 shortlisted winners. Once that output is reliable,
connect the publisher to Neon.

Secure commercial data access for Product Hunt and avoid building the
business around fragile scraping.

## 14. Success Metrics

-   Source coverage: 100% attempted.
-   Category coverage: 13/13 evaluated.
-   Evidence-backed winner claims: 100%.
-   Duplicate published products: 0.
-   Duplicate weekly editions: 0.
-   Failed-run recovery: supported.
-   Manual editorial approval: required before publication.

**Final product outcome:** A reliable weekly AI intelligence engine
powering aitoolslist.ai, with transparent evidence, defensible rankings,
and an auditable history of emerging AI tools.
