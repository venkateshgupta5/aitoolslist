/**
 * Fortnightly edition content — the directory's display source of truth.
 *
 * Edition 2026-11-H2 (Nov 16–30, 2026) winners were produced by the fortnightly
 * Discovery Agent's research pass and auto-signed-off (all cleared the evidence
 * gate: dated evidence + score ≥ 70), so they display as "Verified". Per both
 * PRDs' anti-fabrication rule, every winner still carries dated evidence URLs,
 * pricing is directional (never invented), and vendor-reported metrics remain
 * flagged in the copy. Categories without a credible fresh candidate are shown
 * as "No verified pick this edition" rather than forced.
 */

export type VerificationStatus =
  | "verified"
  | "researched"
  | "preview"
  | "needs_review"
  | "no_pick";

export interface Source {
  title: string;
  url: string;
  type: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  officialUrl: string;
  tagline: string;
  shortDescription: string; // max ~10 words
  overview: string;
  problemSolved: string;
  howItWorks: string;
  features: string[];
  useCases: string[];
  targetAudience: string[];
  pricing: string;
  integrations: string[];
  alternatives: string[];
  selectionRationale: string;
  sources: Source[];
  lastVerified: string | null;
  verification: VerificationStatus;

  // ── Intelligence-layer enrichment (Product Listing Enhancements spec) ──
  // All optional; sections render only when populated (never padded).
  productType?: string;
  launchDate?: string | null;
  productStatus?: string;
  differentiators?: string[];
  whyItMatters?: string;
  strengths?: string[];
  limitations?: string[];
  whoShouldUse?: string[];
  notSuitableWhen?: string[];
  documentationUrl?: string;
  researchConfidence?: "High" | "Medium" | "Low";
  benchmarks?: { label: string; value: string; kind: "vendor" | "independent" | "community" }[];
  specs?: { label: string; value: string }[];
  compare?: { name: string; positioning: string; whenPreferable: string }[];
}

export interface ClaimRow {
  field: string;
  status: "Confirmed" | "Cross-checked" | "Vendor-reported" | "Unverified" | "Unavailable" | "N/A";
  note?: string;
}

export interface Category {
  slug: string;
  name: string;
  order: number;
  coverage: string;
}

// Editions are fortnightly: two per month (1st–15th and 16th–end of month).
// The current edition (as of Nov 20, 2026) is the second-half period.
export const EDITION = {
  slug: "2026-11-16", // canonical edition id = period start date
  periodKey: "2026-11-H2",
  name: "Edition — November 16–30, 2026",
  periodStart: "2026-11-16",
  periodEnd: "2026-11-30",
  label: "Nov 16–30, 2026",
};

export const categories: Category[] = [
  { slug: "ai-compute-gpu-cloud", name: "AI Compute & GPU Cloud", order: 1, coverage: "GPU clusters, cloud compute and specialized AI chips." },
  { slug: "ai-model-serving-inference", name: "AI Model Serving & Inference", order: 2, coverage: "Model hosting, inference engines, optimization and deployment." },
  { slug: "ai-data-infrastructure", name: "AI Data Infrastructure", order: 3, coverage: "Vector databases, data pipelines, embeddings and processing." },
  { slug: "ai-development-orchestration", name: "AI Development & Orchestration", order: 4, coverage: "LLM frameworks, agent orchestration and workflow infrastructure." },
  { slug: "ai-observability-evaluation", name: "AI Observability & Evaluation", order: 5, coverage: "LLM monitoring, tracing, testing, evaluations and guardrails." },
  { slug: "ai-coding-developer-tools", name: "AI Coding & Developer Tools", order: 6, coverage: "AI IDEs, coding assistants and developer productivity." },
  { slug: "ai-agents", name: "AI Agents", order: 7, coverage: "Autonomous agents and agent-building platforms." },
  { slug: "ai-sales", name: "AI Sales", order: 8, coverage: "Sales intelligence and go-to-market automation." },
  { slug: "ai-voice-agents", name: "AI Voice Agents", order: 9, coverage: "Voice AI and conversational phone agents." },
  { slug: "ai-evals", name: "AI Evals", order: 10, coverage: "Model testing, benchmarking and evaluation platforms." },
  { slug: "ai-observability", name: "AI Observability", order: 11, coverage: "Production monitoring, analytics and reliability." },
  { slug: "ai-healthcare", name: "AI Healthcare", order: 12, coverage: "Clinical AI and healthcare workflow automation." },
  { slug: "ai-biotech-drug-discovery", name: "AI Biotech & Drug Discovery", order: 13, coverage: "Computational biology and drug discovery." },
  { slug: "ai-monetization-billing", name: "AI Monetization & Billing Infrastructure", order: 14, coverage: "Usage-based billing, metering, pricing and payments infrastructure for AI products." },
];

const pricingTBD =
  "Not independently verified in this research pass — see the official pricing page for current plans.";

const baseProducts: Product[] = [
  {
    slug: "google-cloud-a5x-vera-rubin",
    name: "Google Cloud A5X (Vera Rubin)",
    categorySlug: "ai-compute-gpu-cloud",
    officialUrl: "https://cloud.google.com/blog/topics/ai-infrastructure/google-cloud-infrastructure-at-nvidia-gtc-berlin-2026",
    tagline: "A5X instances on NVIDIA Vera Rubin NVL72",
    shortDescription: "GA GPU instances on NVIDIA's Vera Rubin platform.",
    overview:
      "Google Cloud announced general availability of A5X instances built on the NVIDIA Vera Rubin NVL72 platform, a new tier of accelerated compute for large-scale AI training and inference.",
    problemSolved:
      "Frontier AI workloads need access to the newest accelerators at scale; A5X brings the Vera Rubin generation to a hyperscaler with managed networking and storage.",
    howItWorks:
      "Teams provision A5X instances on Google Cloud and run training/inference on the NVL72 rack-scale configuration through Google's AI infrastructure stack.",
    features: ["NVIDIA Vera Rubin NVL72 platform", "Rack-scale accelerated compute", "Managed networking & storage", "Generally available"],
    useCases: ["Large model training", "High-throughput inference", "AI infrastructure at scale"],
    targetAudience: ["AI labs", "Enterprises", "Infrastructure teams"],
    pricing: pricingTBD,
    integrations: ["Google Cloud", "NVIDIA GPU stack", "Kubernetes (GKE)"],
    alternatives: ["CoreWeave", "Lambda", "Nebius", "Crusoe"],
    selectionRationale:
      "The edition's most significant GPU-cloud event: GA of the Vera Rubin generation on a hyperscaler, announced at NVIDIA GTC Berlin 2026.",
    sources: [
      { title: "Google Cloud infrastructure at NVIDIA GTC Berlin 2026", url: "https://cloud.google.com/blog/topics/ai-infrastructure/google-cloud-infrastructure-at-nvidia-gtc-berlin-2026", type: "official" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "sarvam-token-factory",
    name: "Sarvam Token Factory",
    categorySlug: "ai-model-serving-inference",
    officialUrl: "https://www.sarvam.ai",
    tagline: "India-hosted inference via an OpenAI-compatible API",
    shortDescription: "India-hosted model inference, OpenAI-compatible API.",
    overview:
      "Sarvam AI opened its Token Factory inference platform for general use on November 16, 2026, giving developers access to Sarvam's own models and selected open-weight models on GPU infrastructure in India.",
    problemSolved:
      "Teams needing sovereign, low-latency inference in-region previously lacked a locally hosted, OpenAI-compatible option.",
    howItWorks:
      "Developers call models through an OpenAI-compatible API; workloads run on India-based GPU infrastructure.",
    features: ["OpenAI-compatible API", "Sarvam + open-weight models", "India-hosted GPU infrastructure", "General availability (Nov 16)"],
    useCases: ["Sovereign/in-region inference", "Production LLM serving", "Open-model hosting"],
    targetAudience: ["Developers", "Enterprises in India", "AI product teams"],
    pricing: pricingTBD,
    integrations: ["OpenAI-compatible SDKs"],
    alternatives: ["Baseten", "Fireworks AI", "Together AI", "E2E Blaze"],
    selectionRationale:
      "A clean, dated this-period launch (Nov 16) opening a sovereign inference platform with an OpenAI-compatible surface.",
    sources: [
      { title: "Sarvam Opens Token Factory for India-Hosted AI Model Inference", url: "https://www.cxodigitalpulse.com/sarvam-opens-token-factory-for-india-hosted-ai-model-inference/", type: "news" },
      { title: "Explained: Sarvam AI's Token Factory (Business Standard)", url: "https://www.business-standard.com/technology/artificial-intelligence/explained-sarvam-ai-s-token-factory-and-debate-over-ai-sovereignty-goals-126112000685_1.html", type: "news" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "weaviate",
    name: "Weaviate",
    categorySlug: "ai-data-infrastructure",
    officialUrl: "https://weaviate.io",
    tagline: "Open-source vector database, now Platform & Enterprise",
    shortDescription: "Vector database with new Platform & Enterprise editions.",
    overview:
      "On November 18, 2026 Weaviate announced general availability of its Enterprise and Platform Editions (with v1.40), adding security, scaling and high-availability capabilities such as Shard Self-Recovery, Deduplicated Backups and Namespaces.",
    problemSolved:
      "Production RAG and semantic search need a vector store with enterprise-grade HA, scaling and backup — not just a library.",
    howItWorks:
      "Teams store embeddings in Weaviate and query by vector similarity; the new editions add managed platform and enterprise controls.",
    features: ["Shard Self-Recovery", "Deduplicated Backups", "Namespaces", "Enterprise HA & scaling (v1.40)"],
    useCases: ["Retrieval-augmented generation", "Semantic search", "AI-agent memory"],
    targetAudience: ["AI developers", "Platform teams", "Enterprises"],
    pricing: pricingTBD,
    integrations: ["LangChain", "LlamaIndex", "Common embedding providers"],
    alternatives: ["Pinecone", "Qdrant", "Milvus", "Oracle AI Vector DB"],
    selectionRationale:
      "A recognizable vector DB shipping a dated this-period GA (Nov 18) of enterprise/platform editions with concrete HA features.",
    sources: [
      { title: "Weaviate Advances Vector Database Technology (Nov 18)", url: "https://stockhouse.com/news/press-releases/2026/11/18/weaviate-advances-vector-database-technology-to-power-fast-growing-ai", type: "press-release" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "google-adk-2",
    name: "Google ADK 2.0",
    categorySlug: "ai-development-orchestration",
    officialUrl: "https://google.github.io/adk-docs/",
    tagline: "Graph-based multi-agent orchestration framework",
    shortDescription: "Agent Development Kit with graph-based orchestration.",
    overview:
      "Google's Agent Development Kit 2.0 moves from hierarchical execution to a graph-based engine supporting coordinator agents, sub-agent delegation and fan-out/fan-in multi-agent patterns.",
    problemSolved:
      "Complex agent workflows outgrow linear chains; developers need a graph execution model with first-class multi-agent coordination.",
    howItWorks:
      "Developers define agents and a graph of delegation/coordination, which the ADK runtime executes with fan-out/fan-in.",
    features: ["Graph-based execution engine", "Coordinator & sub-agent delegation", "Fan-out/fan-in patterns", "A2A & MCP protocol support"],
    useCases: ["Multi-agent orchestration", "Complex LLM workflows", "Enterprise agent apps"],
    targetAudience: ["AI engineers", "Developers", "Platform teams"],
    pricing: pricingTBD,
    integrations: ["A2A protocol", "MCP", "Google AI stack"],
    alternatives: ["LangGraph", "CrewAI", "Microsoft Agent Framework", "smolagents"],
    selectionRationale:
      "The most significant orchestration advancement in current coverage; note this is a leading current release rather than a dated this-period launch — flagged for editorial verification.",
    sources: [
      { title: "Top 9 AI Agent Frameworks as of November 2026 (Shakudo)", url: "https://www.shakudo.io/blog/top-9-ai-agent-frameworks", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "langfuse",
    name: "Langfuse",
    categorySlug: "ai-observability-evaluation",
    officialUrl: "https://langfuse.com",
    tagline: "Open-source LLM observability & evaluation",
    shortDescription: "Open-source tracing and evals for LLM apps.",
    overview:
      "Langfuse is the most widely adopted open-source LLM observability and evaluation platform, covering tracing, prompt management, evaluations and datasets. This week it shipped changes to its evaluation engine, with LLM-as-a-judge evaluators now targeting observations/experiments.",
    problemSolved:
      "LLM apps are hard to debug and improve without tracing, prompt versioning and quality evals over time.",
    howItWorks:
      "Developers instrument apps with Langfuse SDKs to capture traces, then evaluate and monitor quality in a dashboard; self-hostable (MIT core).",
    features: ["End-to-end tracing", "Prompt management", "LLM-as-a-judge evaluators (updated Nov 16)", "Open source, self-hostable"],
    useCases: ["Debugging LLM apps", "Prompt iteration", "Quality monitoring & evals"],
    targetAudience: ["AI engineers", "Platform teams"],
    pricing: "MIT-licensed core, free to self-host; hosted tiers available — see official pricing.",
    integrations: ["LangChain", "LlamaIndex", "OpenAI", "MCP"],
    alternatives: ["LangSmith", "Arize Phoenix", "Opik", "Braintrust"],
    selectionRationale:
      "Category leader actively shipping this edition (evaluation-engine changes effective Nov 16), with dominant open-source adoption.",
    sources: [
      { title: "Top LLM Observability & Evaluation Platforms in 2026 (MarkTechPost)", url: "https://www.marktechpost.com/2026/08/09/top-llm-observability-and-evaluation-platforms-in-2026-langfuse-langsmith-braintrust-arize-and-more-compared/", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "google-antigravity",
    name: "Google Antigravity (Gemini 4 Neon)",
    categorySlug: "ai-coding-developer-tools",
    officialUrl: "https://antigravity.google",
    tagline: "Agentic coding in Google's Antigravity CLI",
    shortDescription: "Agentic coding tool topping the coding-agent index.",
    overview:
      "Google launched Gemini 4 Neon on November 18, 2026; running in Google's Antigravity CLI it tops the Artificial Analysis Coding Agent Index at 59, making Antigravity the edition's standout AI coding environment.",
    problemSolved:
      "Developers want agentic, codebase-aware assistance that leads on independent coding benchmarks, directly in their workflow.",
    howItWorks:
      "Antigravity runs Gemini 4 Neon as an agentic coding assistant via a CLI, executing multi-step coding tasks across a project.",
    features: ["Gemini 4 Neon model", "#1 on Artificial Analysis Coding Agent Index (59)", "Agentic CLI workflow", "Launched Nov 18"],
    useCases: ["Feature development", "Agentic refactoring", "Codebase reasoning"],
    targetAudience: ["Software developers", "Engineering teams"],
    pricing: pricingTBD,
    integrations: ["Google AI stack", "Command line / CLI"],
    alternatives: ["Cursor", "Cognition Devin", "GitHub Copilot", "Windsurf"],
    selectionRationale:
      "A dated this-period launch (Nov 18) that took the top of an independent coding-agent benchmark.",
    sources: [
      { title: "AI Models Released in November 2026 (release tracker)", url: "https://www.nocode.mba/ai-release-tracker/2026/11", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "perplexity-multiagent",
    name: "Perplexity Multiagent",
    categorySlug: "ai-agents",
    officialUrl: "https://www.perplexity.ai",
    tagline: "Up to 16 AI agents working as one team",
    shortDescription: "Lead agent coordinates up to 16 sub-agents.",
    overview:
      "On November 17, 2026 Perplexity launched Multiagent, a new effort level for its Comet agent platform: a lead agent (Claude Fable 5.2) splits work across as many as 16 agents running on different models.",
    problemSolved:
      "Single agents stall on complex, multi-part tasks; coordinated multi-agent teams can decompose and parallelize work.",
    howItWorks:
      "A lead agent plans and delegates subtasks to up to 16 model-diverse sub-agents, then composes the results.",
    features: ["Lead agent orchestration", "Up to 16 parallel agents", "Model-diverse sub-agents", "Launched Nov 17"],
    useCases: ["Deep research", "Complex multi-step tasks", "Parallelized agent workflows"],
    targetAudience: ["Knowledge workers", "Researchers", "Power users"],
    pricing: pricingTBD,
    integrations: ["Multiple frontier models", "Perplexity Comet"],
    alternatives: ["ChatGPT agents", "Google ADK", "CrewAI", "Manus"],
    selectionRationale:
      "The edition's highest-profile AI-agent launch (Nov 17), notable for coordinated model-diverse multi-agent execution.",
    sources: [
      { title: "Perplexity launches Multiagent (up to 16 agents)", url: "https://pasqualepillitteri.it/en/news/35232/perplexity-launches-multiagent-up-to-16-ai-agents-working", type: "news" },
      { title: "AI Agents News Brief: November 17, 2026", url: "https://aiagentsdirectory.com/news/ai-agents-news-brief-november-17-2026", type: "news" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "salesforce-hunter",
    name: "Hunter by Salesforce",
    categorySlug: "ai-sales",
    officialUrl: "https://www.salesforce.com",
    tagline: "Outbound AI sales agent in Slack, Teams & Claude",
    shortDescription: "Outbound AI sales agent that meets reps in chat.",
    overview:
      "Hunter is Salesforce's outbound AI sales agent that meets reps where they work — Slack, Teams and Claude — with a full release planned for November 2026 after a pilot.",
    problemSolved:
      "Outbound prospecting is repetitive; an agent embedded in reps' chat tools can draft and drive outreach in context.",
    howItWorks:
      "Hunter operates as an agent inside messaging/collaboration tools, assisting reps with outbound workflows tied to Salesforce data.",
    features: ["Outbound agent", "Works in Slack, Teams & Claude", "Salesforce-native data", "Full release Nov 2026"],
    useCases: ["Outbound prospecting", "Rep assistance", "Pipeline generation"],
    targetAudience: ["Sales teams", "RevOps", "SDRs"],
    pricing: pricingTBD,
    integrations: ["Salesforce", "Slack", "Microsoft Teams", "Claude"],
    alternatives: ["Clay", "ZoomInfo", "11x", "Artisan"],
    selectionRationale:
      "A notable AI-sales product release this month; rollout is still completing, so flagged for editorial verification.",
    sources: [
      { title: "AI employee for sales — best options in 2026 (Nov 19)", url: "https://resident.com/technology-and-digital-resources/2026/11/19/ai-employee-for-sales-the-7-best-options-in-2026", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "retell-ai",
    name: "Retell AI",
    categorySlug: "ai-voice-agents",
    officialUrl: "https://www.retellai.com",
    tagline: "AI voice agents for contact centers",
    shortDescription: "Developer platform for AI phone agents.",
    overview:
      "Retell AI is a voice-agent platform for building AI phone agents. As of November 2026 it reports a $100M annualized revenue run rate and its Tell-1 model ranking #1 on the Retell vCX Benchmark.",
    problemSolved:
      "Building low-latency, reliable voice agents for calls is hard to assemble from speech + LLM + telephony parts.",
    howItWorks:
      "Developers configure voice agents via API, wiring models and telephony; Retell handles the real-time voice pipeline.",
    features: ["Real-time voice pipeline", "Tell-1 voice model", "Telephony integration", "APIs & SDKs"],
    useCases: ["Customer support lines", "Appointment scheduling", "Outbound voice"],
    targetAudience: ["Developers", "Contact centers", "Product teams"],
    pricing: "Reported ~$0.07–$0.31/min with $10 free credits (vendor-reported, Nov 2026) — verify on official pricing.",
    integrations: ["Telephony providers", "LLM & speech providers"],
    alternatives: ["Vapi", "Bland", "ElevenLabs Agents", "Pipecat (OSS)"],
    selectionRationale:
      "Leading voice-agent platform with strong current traction; note the run-rate and benchmark (Tell-1 #1 on Retell's own vCX) are vendor-reported and need independent verification.",
    sources: [
      { title: "Best AI Voice Agents: Retell, Bland, Vapi, ElevenLabs scored", url: "https://wetheflywheel.com/en/guides/best-ai-voice-agents/", type: "analysis" },
      { title: "Retell AI — official", url: "https://www.retellai.com/", type: "official" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "artificial-analysis",
    name: "Artificial Analysis",
    categorySlug: "ai-evals",
    officialUrl: "https://artificialanalysis.ai",
    tagline: "Independent AI model benchmarking",
    shortDescription: "Independent model benchmarking & intelligence index.",
    overview:
      "Artificial Analysis is an independent benchmarking platform. On November 18, 2026 it announced Intelligence Index v5 (spanning knowledge work, coding, science and general knowledge) and, with Google DeepMind, a Multimodal Knowledge Agent (MKA) benchmark on Nov 17.",
    problemSolved:
      "Teams need consistent, independent evaluation to compare rapidly changing models and agents.",
    howItWorks:
      "Artificial Analysis runs standardized evaluation suites across models and publishes comparative indices and leaderboards.",
    features: ["Intelligence Index v5 (Nov 18)", "Multimodal Knowledge Agent benchmark (Nov 17)", "Progress Index v1", "Independent methodology"],
    useCases: ["Model selection", "Benchmark tracking", "Capability comparison"],
    targetAudience: ["AI engineers", "Researchers", "Buyers"],
    pricing: "Public indices are freely accessible — see site for any paid offerings.",
    integrations: ["Covers major model providers"],
    alternatives: ["LMArena", "LiveBench", "Vals AI", "Braintrust"],
    selectionRationale:
      "Shipped two dated this-period evaluation releases (Index v5 on Nov 18; MKA benchmark with DeepMind on Nov 17).",
    sources: [
      { title: "Announcing Artificial Analysis Intelligence Index v5", url: "https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5", type: "official" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  // ai-observability (category 11): no distinct this-period production-monitoring
  // launch separable from the Observability & Evaluation pick (Langfuse).
  // Intentionally omitted → shown as "No verified pick this edition".
  {
    slug: "mayo-clinic-platform-cds",
    name: "Mayo Clinic Platform CDS",
    categorySlug: "ai-healthcare",
    officialUrl: "https://www.mayoclinicplatform.org",
    tagline: "AI clinical decision support in the EHR",
    shortDescription: "AI clinical decision support embedded in EHRs.",
    overview:
      "Mayo Clinic Platform launched (Nov 3, 2026) an AI-enabled Clinical Decision Support solution embedded in EHR workflows — a specialty-specific chat across 35+ specialties plus 22 clinical calculators via chat or voice, citing peer-reviewed literature.",
    problemSolved:
      "Clinicians need literature-grounded decision support inside their existing EHR workflow, not a separate tool.",
    howItWorks:
      "A large language model surfaces specialty-specific guidance and calculators within the EHR, citing peer-reviewed sources for clinician review.",
    features: ["Specialty-specific chat (35+ specialties)", "22 clinical calculators", "Cites peer-reviewed literature", "Embedded in EHR workflows"],
    useCases: ["Clinical decision support", "Complex case reasoning", "Point-of-care calculations"],
    targetAudience: ["Clinicians", "Health systems", "Mayo Clinic Platform participants"],
    pricing: pricingTBD,
    integrations: ["Electronic health record systems"],
    alternatives: ["OpenEvidence", "Google Gemini for Healthcare", "Abridge", "Nabla"],
    selectionRationale:
      "A concrete, dated clinical AI launch this month (Nov 3) from a credible institution, embedded directly in EHR workflows.",
    sources: [
      { title: "Mayo Clinic Platform launches AI-driven clinical decision support tool", url: "https://www.fiercehealthcare.com/ai-and-machine-learning/mayo-clinic-launches-ai-driven-clinical-decision-support-tool", type: "news" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "isomorphic-labs",
    name: "Isomorphic Labs",
    categorySlug: "ai-biotech-drug-discovery",
    officialUrl: "https://www.isomorphiclabs.com",
    tagline: "AI-first drug discovery heading to the clinic",
    shortDescription: "AI drug discovery; $5B raised to reach clinic.",
    overview:
      "Isomorphic Labs (spun out of Google DeepMind) closed an oversubscribed $5 billion Series C on November 17, 2026 to advance its AI drug-design engine and take candidates toward clinical trials.",
    problemSolved:
      "Drug discovery is slow and costly; AI methods aim to accelerate target and molecule design toward the clinic.",
    howItWorks:
      "Isomorphic develops and applies AI models for biology and chemistry, partnering with pharma and advancing an internal pipeline.",
    features: ["AI drug-design engine", "Protein-structure-informed methods", "Pharma partnerships", "$5B Series C (Nov 17)"],
    useCases: ["Early-stage drug discovery", "Target & molecule design", "Pipeline development"],
    targetAudience: ["Pharmaceutical companies", "Biotech researchers", "Investors"],
    pricing: "Not applicable — research company, not a self-serve product.",
    integrations: ["Not publicly disclosed"],
    alternatives: ["Recursion", "Insilico Medicine", "Iambic", "Genesis Therapeutics"],
    selectionRationale:
      "The edition's defining biotech-AI story (Nov 17). Note: funding is a supporting signal, not proof of product/clinical success — flagged for editorial verification.",
    sources: [
      { title: "Isomorphic Labs raises $5B to take candidates to clinical trials (TechCrunch, Nov 17)", url: "https://techcrunch.com/2026/11/17/isomorphic-labs-raises-5b-as-it-looks-to-take-drug-candidates-to-clinical-trials/", type: "news" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "flexprice",
    name: "Flexprice",
    categorySlug: "ai-monetization-billing",
    officialUrl: "https://flexprice.io",
    tagline: "Open-source usage-based billing for AI products",
    shortDescription: "Developer-first metering and usage-based billing engine.",
    overview:
      "Flexprice is an open-source monetization and billing platform positioned as \"infrastructure built for AI-native companies.\" It handles real-time usage metering, flexible pricing (usage-based, tiered, credit-based and hybrid), credit wallets, feature entitlements and automated invoicing so teams can bill for tokens, API calls or other consumption without building billing infrastructure in-house.",
    problemSolved:
      "AI products increasingly bill on consumption (tokens, requests, compute), but off-the-shelf subscription tools model seats and flat plans poorly — teams end up building fragile in-house metering and invoicing.",
    howItWorks:
      "Developers instrument their app to send usage events (via SDKs, API or CLI), define pricing and credit rules in a no-code dashboard, and Flexprice meters consumption in real time, enforces feature entitlements, tracks wallet balances and generates invoices; it runs as a managed cloud or self-hosted under AGPL-3.0, and ships an MCP server so coding agents can call billing operations.",
    features: ["Real-time usage metering", "Usage-based, tiered, credit-based & hybrid pricing", "Credit wallets & top-ups", "Feature entitlements / access control", "Subscriptions & automated invoicing", "No-code UI, SDKs, CLI & MCP server", "Open source (AGPL-3.0), self-hostable"],
    useCases: ["Billing LLM/AI apps per token or request", "Usage-based & hybrid SaaS pricing", "Prepaid credit / wallet systems", "Feature gating by plan or customer"],
    targetAudience: ["AI product teams", "SaaS developers", "Billing & monetization engineers"],
    pricing: "Open-source core (AGPL-3.0) is free to self-host; managed cloud and enterprise tiers available — see official pricing.",
    integrations: ["Stripe", "Razorpay", "Paddle", "HubSpot", "Snowflake", "QuickBooks / Zoho", "REST API, SDKs & webhooks"],
    alternatives: ["Metronome", "Orb", "Lago", "Stripe Billing"],
    selectionRationale:
      "The standout pick for the new AI Monetization & Billing Infrastructure category: an open-source (AGPL-3.0), developer-first metering and billing engine purpose-built for usage-based and agentic AI pricing. Fact-checked against its official site, GitHub repository and dated public launch (Show HN, Jun 30 2025); core claims confirmed, while vendor-reported scale and cloud-pricing figures remain flagged.",
    sources: [
      { title: "Flexprice — official site", url: "https://flexprice.io", type: "official" },
      { title: "Flexprice on GitHub (AGPL-3.0)", url: "https://github.com/flexprice/flexprice", type: "official" },
      { title: "Show HN: Flexprice — Open-Source Usage-Based Billing Toolkit (Jun 30, 2025)", url: "https://news.ycombinator.com/item?id=44422663", type: "news" },
    ],
    lastVerified: "November 21, 2026",
    verification: "verified",
  },
];

// ── Intelligence-layer enrichment (per slug) ────────────────────────────────
// Editorial analysis + structured specs grounded in the research evidence
// already attached to each product. Unknown values are omitted or marked
// "Not verified" in the UI — never invented.
const enrichment: Record<string, Partial<Product>> = {
  "google-cloud-a5x-vera-rubin": {
    productType: "GPU cloud instances",
    launchDate: "November 2026 (NVIDIA GTC Berlin)",
    productStatus: "Generally available",
    differentiators: ["NVIDIA Vera Rubin NVL72", "Rack-scale", "Hyperscaler-managed"],
    researchConfidence: "High",
    whyItMatters:
      "A5X brings NVIDIA's newest Vera Rubin generation to a hyperscaler as a GA product — the edition's most consequential signal that frontier-scale compute is becoming routinely provisionable.",
    strengths: [
      "Access to the latest Vera Rubin NVL72 rack-scale platform",
      "Managed networking, storage and GKE integration",
      "Hyperscaler reliability and global regions",
    ],
    limitations: [
      "Hyperscaler GPU pricing is typically higher than specialist neoclouds",
      "Public per-hour pricing for A5X not verified in this research pass",
    ],
    whoShouldUse: [
      "Teams training or serving large models at scale",
      "Enterprises already on Google Cloud wanting newest accelerators",
    ],
    notSuitableWhen: ["Cost-sensitive hobby or small-scale workloads", "Teams needing single on-demand GPUs cheaply"],
    specs: [{ label: "Platform", value: "NVIDIA Vera Rubin NVL72" }, { label: "Integration", value: "GKE / Google Cloud" }],
    compare: [
      { name: "CoreWeave", positioning: "GPU-specialist neocloud", whenPreferable: "When you want faster provisioning and lower GPU cost than a hyperscaler." },
      { name: "Lambda", positioning: "Developer-friendly GPU cloud", whenPreferable: "For simpler on-demand GPU access and training clusters." },
      { name: "Nebius", positioning: "AI-focused cloud", whenPreferable: "For managed AI infrastructure outside the big-three hyperscalers." },
    ],
  },
  "sarvam-token-factory": {
    productType: "Managed inference platform",
    launchDate: "November 16, 2026",
    productStatus: "Generally available",
    differentiators: ["OpenAI-compatible", "India-hosted", "Open-weight + Sarvam models"],
    documentationUrl: "https://docs.sarvam.ai",
    researchConfidence: "Medium",
    whyItMatters:
      "Opened for general use on Nov 16 — a sovereign, in-region inference option with an OpenAI-compatible surface, lowering the switching cost for teams with data-residency needs.",
    strengths: [
      "OpenAI-compatible API reduces migration effort",
      "India-hosted GPU infrastructure for data residency",
      "Access to both Sarvam and selected open-weight models",
    ],
    limitations: [
      "Model catalogue and regional coverage not fully verified",
      "Public pricing and rate limits not verified in this research pass",
    ],
    whoShouldUse: [
      "Developers needing in-region (India) inference",
      "Enterprises with data-residency or sovereignty requirements",
    ],
    notSuitableWhen: ["Workloads requiring a specific proprietary frontier model unavailable here"],
    specs: [{ label: "API", value: "OpenAI-compatible" }, { label: "Hosting", value: "India" }],
    compare: [
      { name: "Baseten", positioning: "Managed model serving", whenPreferable: "For custom model deployment with autoscaling in the US." },
      { name: "Fireworks AI", positioning: "Fast open-model inference", whenPreferable: "For low-latency serving of popular open models." },
      { name: "Together AI", positioning: "Open-model cloud", whenPreferable: "For a broad open-model catalogue and fine-tuning." },
    ],
  },
  weaviate: {
    productType: "Vector database",
    launchDate: "November 18, 2026 (v1.40 GA)",
    productStatus: "Generally available",
    differentiators: ["Open source", "Enterprise HA", "Namespaces & self-recovery"],
    documentationUrl: "https://docs.weaviate.io",
    researchConfidence: "High",
    whyItMatters:
      "The v1.40 GA of Platform and Enterprise editions moves Weaviate from a strong library to a production-grade managed vector store with HA, backups and multi-tenancy.",
    strengths: [
      "Mature open-source core with large community",
      "New enterprise HA: Shard Self-Recovery, Deduplicated Backups",
      "Namespaces for multi-tenant isolation",
    ],
    limitations: [
      "Operating self-hosted at scale still requires expertise",
      "Managed Platform Edition pricing not verified in this research pass",
    ],
    whoShouldUse: [
      "Teams building production RAG or semantic search",
      "Enterprises needing HA and multi-tenancy in a vector store",
    ],
    notSuitableWhen: ["Tiny prototypes where a simple embedded store suffices"],
    specs: [{ label: "License", value: "Open source (core)" }, { label: "Version", value: "v1.40" }],
    compare: [
      { name: "Pinecone", positioning: "Fully managed vector DB", whenPreferable: "When you want zero-ops managed serverless vectors." },
      { name: "Qdrant", positioning: "Open-source vector DB", whenPreferable: "For a Rust-based engine with strong filtering." },
      { name: "Milvus", positioning: "Scalable open-source vector DB", whenPreferable: "For very large-scale, GPU-accelerated vector search." },
    ],
  },
  "google-adk-2": {
    productType: "Agent orchestration framework",
    launchDate: null,
    productStatus: "Available",
    differentiators: ["Graph execution", "Multi-agent", "A2A + MCP"],
    documentationUrl: "https://google.github.io/adk-docs/",
    researchConfidence: "Medium",
    whyItMatters:
      "ADK 2.0's shift to a graph execution engine with fan-out/fan-in makes sophisticated multi-agent coordination a first-class primitive rather than a workaround.",
    strengths: [
      "Graph-based execution for complex agent topologies",
      "Coordinator + sub-agent delegation patterns",
      "Supports A2A and MCP interoperability protocols",
    ],
    limitations: [
      "Tighter alignment with Google's AI stack",
      "This is a leading current release, not a dated this-period launch",
    ],
    whoShouldUse: ["AI engineers building multi-agent systems", "Teams needing graph-structured agent workflows"],
    notSuitableWhen: ["Simple single-agent chatbots where a framework adds overhead"],
    compare: [
      { name: "LangGraph", positioning: "Graph agent framework", whenPreferable: "For a mature Python/JS ecosystem and tooling." },
      { name: "CrewAI", positioning: "Role-based multi-agent", whenPreferable: "For quick role-playing crews with minimal setup." },
      { name: "Microsoft Agent Framework", positioning: "Enterprise orchestration", whenPreferable: "For Microsoft-centric enterprise stacks." },
    ],
  },
  langfuse: {
    productType: "LLM observability & evals",
    launchDate: null,
    productStatus: "Generally available (open source)",
    differentiators: ["Open source", "Tracing + evals", "Self-hostable"],
    documentationUrl: "https://langfuse.com/docs",
    researchConfidence: "High",
    whyItMatters:
      "Langfuse keeps shipping — this edition's evaluation-engine changes (LLM-as-a-judge targeting observations/experiments) reinforce its lead as the default open-source LLMOps layer.",
    strengths: [
      "MIT-licensed core, free to self-host",
      "End-to-end tracing, prompt management and evals in one tool",
      "Large adoption and active release cadence",
    ],
    limitations: [
      "Trace-level evaluators deprecated on Langfuse Cloud (migration needed)",
      "Advanced hosted tiers carry cost at scale",
    ],
    whoShouldUse: ["AI engineers debugging and evaluating LLM apps", "Teams wanting self-hostable LLMOps"],
    notSuitableWhen: ["Teams already standardized on a full-stack APM they can't leave"],
    specs: [{ label: "License", value: "MIT (core)" }, { label: "Hosting", value: "Cloud or self-host" }],
    compare: [
      { name: "LangSmith", positioning: "LangChain-native observability", whenPreferable: "If your stack is built on LangChain/LangGraph." },
      { name: "Arize Phoenix", positioning: "OSS tracing + RAG eval", whenPreferable: "When retrieval-quality evaluation is the priority." },
      { name: "Braintrust", positioning: "Eval-driven platform", whenPreferable: "For teams organizing work around evals and experiments." },
    ],
  },
  "google-antigravity": {
    productType: "Agentic coding tool",
    launchDate: "November 18, 2026",
    productStatus: "Available",
    differentiators: ["Gemini 4 Neon", "#1 coding index", "Agentic CLI"],
    researchConfidence: "High",
    whyItMatters:
      "Gemini 4 Neon launched Nov 18 and, running in Antigravity, took the top of the independent Artificial Analysis Coding Agent Index — the edition's clearest coding-capability leap.",
    strengths: [
      "Tops an independent coding-agent benchmark (index 59)",
      "Agentic, multi-step coding workflow via CLI",
      "Backed by Google's model and infra",
    ],
    limitations: [
      "Benchmark leadership is a snapshot; rankings shift quickly",
      "Public pricing for the coding tool not verified in this research pass",
    ],
    whoShouldUse: ["Developers wanting the current top-ranked coding agent", "Teams comfortable with CLI-driven agentic workflows"],
    notSuitableWhen: ["Developers who prefer a fully GUI editor experience"],
    benchmarks: [
      { label: "Artificial Analysis Coding Agent Index", value: "#1, score 59 (Nov 18, 2026)", kind: "independent" },
    ],
    compare: [
      { name: "Cursor", positioning: "AI-native code editor", whenPreferable: "For a polished GUI editor with codebase chat." },
      { name: "Cognition Devin", positioning: "Autonomous dev agent", whenPreferable: "For longer-running, hands-off project work." },
      { name: "GitHub Copilot", positioning: "In-IDE assistant", whenPreferable: "For broad IDE integration and enterprise rollout." },
    ],
  },
  "perplexity-multiagent": {
    productType: "Multi-agent assistant",
    launchDate: "November 17, 2026",
    productStatus: "Available (new effort level for Comet)",
    differentiators: ["Up to 16 agents", "Model-diverse", "Lead-agent orchestration"],
    researchConfidence: "High",
    whyItMatters:
      "Launched Nov 17: a lead agent splitting work across up to 16 model-diverse sub-agents — a high-profile step toward consumer-grade coordinated multi-agent systems.",
    strengths: [
      "Parallelizes complex tasks across many agents",
      "Model-diverse sub-agents (Opus, GPT, Gemini)",
      "Consumer-accessible, not just a developer SDK",
    ],
    limitations: [
      "Multi-agent runs can be slower and costlier per task",
      "Quality depends on task decomposition; not verified across domains",
    ],
    whoShouldUse: ["Researchers and analysts running deep multi-step tasks", "Power users wanting parallelized agent work"],
    notSuitableWhen: ["Simple single-shot questions where one model is faster"],
    compare: [
      { name: "ChatGPT agents", positioning: "Agentic assistant", whenPreferable: "For a tightly integrated OpenAI ecosystem." },
      { name: "Google ADK", positioning: "Developer agent framework", whenPreferable: "When you need to build custom multi-agent systems." },
      { name: "Manus", positioning: "Autonomous task agent", whenPreferable: "For hands-off end-to-end task completion." },
    ],
  },
  "salesforce-hunter": {
    productType: "AI sales agent",
    launchDate: "November 2026 (full release)",
    productStatus: "Rolling out",
    differentiators: ["Outbound agent", "In Slack/Teams/Claude", "Salesforce-native"],
    researchConfidence: "Medium",
    whyItMatters:
      "Salesforce's outbound agent meeting reps inside Slack, Teams and Claude signals incumbent CRMs embedding agents directly into reps' daily tools.",
    strengths: [
      "Lives where reps already work (chat tools)",
      "Native access to Salesforce CRM data",
      "Backed by a dominant CRM vendor",
    ],
    limitations: [
      "Still completing rollout after pilot",
      "Pricing and availability details not verified in this research pass",
    ],
    whoShouldUse: ["Salesforce-based sales teams", "RevOps teams automating outbound"],
    notSuitableWhen: ["Teams not on Salesforce or wanting a standalone tool"],
    compare: [
      { name: "Clay", positioning: "Data enrichment + outbound", whenPreferable: "For multi-source enrichment and list building." },
      { name: "11x", positioning: "AI SDR", whenPreferable: "For a fully autonomous outbound SDR agent." },
      { name: "Artisan", positioning: "AI BDR platform", whenPreferable: "For an all-in-one outbound platform." },
    ],
  },
  "retell-ai": {
    productType: "Voice agent platform",
    launchDate: null,
    productStatus: "Generally available",
    differentiators: ["Real-time voice", "Tell-1 model", "Telephony"],
    documentationUrl: "https://docs.retellai.com",
    researchConfidence: "Medium",
    whyItMatters:
      "Retell's own Tell-1 model and a reported $100M run rate put it among the most-cited voice-agent platforms this edition — strong signal, though the headline metrics are vendor-reported.",
    strengths: [
      "Developer-focused real-time voice pipeline",
      "Own Tell-1 voice model",
      "Telephony and model-provider integrations",
    ],
    limitations: [
      "Headline metrics are vendor-reported and not independently verified",
      "Tell-1 #1 ranking is on Retell's own vCX benchmark",
    ],
    whoShouldUse: ["Developers building phone agents", "Contact centers automating calls"],
    notSuitableWhen: ["Teams needing a no-code done-for-you line (consider others)"],
    benchmarks: [
      { label: "Retell vCX Benchmark (Tell-1)", value: "#1 overall (Nov 2026)", kind: "vendor" },
      { label: "Reported annualized run rate", value: "~$100M (vendor-reported)", kind: "vendor" },
    ],
    compare: [
      { name: "Vapi", positioning: "Developer voice platform", whenPreferable: "For maximum model/telephony configurability." },
      { name: "Bland", positioning: "Low-cost voice calls", whenPreferable: "For simple, cost-sensitive outbound/inbound." },
      { name: "ElevenLabs Agents", positioning: "Voice quality leader", whenPreferable: "When lifelike voice quality is the priority." },
    ],
  },
  "artificial-analysis": {
    productType: "Model benchmarking platform",
    launchDate: "November 18, 2026 (Index v5)",
    productStatus: "Live",
    differentiators: ["Independent", "Index v5", "Agent benchmarks"],
    documentationUrl: "https://artificialanalysis.ai/methodology/intelligence-benchmarking",
    researchConfidence: "High",
    whyItMatters:
      "Two dated releases this edition — Intelligence Index v5 (Nov 18) and an MKA agent benchmark with DeepMind (Nov 17) — cement it as a go-to independent evaluation reference.",
    strengths: [
      "Independent, transparent methodology",
      "Broad coverage across models and providers",
      "Public indices freely accessible",
    ],
    limitations: [
      "Aggregate indices can mask task-specific differences",
      "Not a testing framework you run on your own app",
    ],
    whoShouldUse: ["Buyers comparing models", "Engineers tracking capability over time"],
    notSuitableWhen: ["Teams needing to run custom evals on their own data (use an eval platform)"],
    compare: [
      { name: "LMArena", positioning: "Human-preference arena", whenPreferable: "For crowd-sourced head-to-head preferences." },
      { name: "LiveBench", positioning: "Contamination-resistant benchmark", whenPreferable: "For fresh, leak-resistant academic-style tests." },
      { name: "Vals AI", positioning: "Real-world task benchmarks", whenPreferable: "For domain tasks like finance or law." },
    ],
  },
  "mayo-clinic-platform-cds": {
    productType: "Clinical decision support",
    launchDate: "November 3, 2026",
    productStatus: "Available to Mayo Clinic Platform participants",
    differentiators: ["EHR-embedded", "Cites literature", "35+ specialties"],
    researchConfidence: "High",
    whyItMatters:
      "A credible institution shipping literature-cited, EHR-embedded decision support (Nov 3) is a meaningful step for trustworthy clinical AI at the point of care.",
    strengths: [
      "Embedded directly in EHR workflows",
      "Cites peer-reviewed literature for its answers",
      "35+ specialties and 22 clinical calculators",
    ],
    limitations: [
      "Access limited to Mayo Clinic Platform participants",
      "Decision support assists, does not replace, clinician judgment",
    ],
    whoShouldUse: ["Clinicians at participating organizations", "Health systems in Mayo's provider programs"],
    notSuitableWhen: ["Organizations outside Mayo Clinic Platform programs"],
    compare: [
      { name: "OpenEvidence", positioning: "Medical evidence assistant", whenPreferable: "For broad, open clinical Q&A with citations." },
      { name: "Google Gemini for Healthcare", positioning: "Agentic healthcare platform", whenPreferable: "For unifying clinical/operational systems." },
      { name: "Abridge", positioning: "Ambient clinical documentation", whenPreferable: "When the need is note-taking, not decision support." },
    ],
  },
  "isomorphic-labs": {
    productType: "AI drug-discovery company",
    launchDate: "November 17, 2026 ($5B Series C)",
    productStatus: "Private (research company)",
    differentiators: ["AlphaFold lineage", "$5B raised", "Toward clinic"],
    researchConfidence: "Medium",
    whyItMatters:
      "A $5B Series C (Nov 17) to move AI-designed drugs toward clinical trials is the edition's defining biotech-AI event — though funding is a signal, not proof of clinical success.",
    strengths: [
      "Builds on DeepMind's protein-structure breakthroughs",
      "Exceptional capital runway after $5B raise",
      "Pharma partnerships and an internal pipeline",
    ],
    limitations: [
      "Not a self-serve product — no public access",
      "Funding does not guarantee clinical or regulatory success",
    ],
    whoShouldUse: ["Pharma partners and researchers", "Investors tracking AI-bio"],
    notSuitableWhen: ["Developers seeking a usable API or product today"],
    compare: [
      { name: "Recursion", positioning: "AI-driven drug discovery (public)", whenPreferable: "For a public company with a clinical pipeline." },
      { name: "Insilico Medicine", positioning: "Generative chemistry", whenPreferable: "For end-to-end generative drug design." },
      { name: "Iambic", positioning: "AI drug discovery", whenPreferable: "For physics-informed ML drug design." },
    ],
  },
  flexprice: {
    productType: "Usage-based billing & metering platform",
    launchDate: "June 30, 2025 (public launch / Show HN)",
    productStatus: "Generally available (open source + cloud)",
    differentiators: ["Open source (AGPL-3.0)", "AI/usage-first", "Credits, wallets & entitlements"],
    documentationUrl: "https://docs.flexprice.io",
    researchConfidence: "High",
    whyItMatters:
      "As AI products shift to consumption pricing, a purpose-built open-source metering and billing layer lets teams ship usage-based, credit-based and agentic pricing — including per-token and GPU usage — without constructing billing infrastructure themselves.",
    strengths: [
      "Open-source (AGPL-3.0) and self-hostable — avoids billing-vendor lock-in",
      "Real-time metering with credit wallets and feature entitlements in one platform",
      "AI-native focus: meters inference tokens, GPU and agentic workloads; ships an MCP server",
    ],
    limitations: [
      "Younger and less proven at scale than incumbent billing platforms",
      "Headline throughput and cloud-pricing figures are vendor-reported, not independently verified",
    ],
    whoShouldUse: [
      "AI product teams billing per token, request or compute",
      "Developers wanting an open, self-hostable billing engine",
    ],
    notSuitableWhen: ["Teams needing only simple flat-rate subscriptions (a basic subscription tool suffices)"],
    specs: [{ label: "License", value: "AGPL-3.0 (core)" }, { label: "Hosting", value: "Cloud or self-host" }],
    benchmarks: [
      { label: "Real-time metering throughput", value: "40k+ events/sec, sub-60ms P99 (vendor-reported)", kind: "vendor" },
    ],
    compare: [
      { name: "Metronome", positioning: "Enterprise usage-based billing", whenPreferable: "For large-scale, high-volume metering with enterprise support." },
      { name: "Orb", positioning: "Developer-first usage billing", whenPreferable: "For a polished managed usage-based billing product." },
      { name: "Lago", positioning: "Open-source billing", whenPreferable: "For another open-source metering/billing option to compare." },
    ],
  },
};

export const products: Product[] = baseProducts.map((p) => ({
  ...p,
  ...(enrichment[p.slug] ?? {}),
}));

/** At-a-glance specification rows (spec §6). Values grounded in research;
 *  unknowns shown as "Not verified". */
export function atAGlance(p: Product): { label: string; value: string }[] {
  const category = categoryBySlug(p.categorySlug)?.name ?? "—";
  const rows: { label: string; value: string }[] = [
    { label: "Category", value: category },
    { label: "Product type", value: p.productType ?? "Not verified" },
    { label: "Status", value: p.productStatus ?? "Not verified" },
    { label: "Launch", value: p.launchDate ?? "Not verified" },
  ];
  const pricingShort =
    /mit|free|open source|not applicable/i.test(p.pricing) && p.pricing.length < 90
      ? p.pricing
      : "Not publicly verified";
  rows.push({ label: "Pricing", value: pricingShort });
  if (p.specs) rows.push(...p.specs);
  return rows;
}

/** Claim-level verification rows (spec §9). Derived from known evidence so the
 *  badge's scope is explicit — website-checked is NOT a full audit. */
export function claimStatuses(p: Product): ClaimRow[] {
  const rows: ClaimRow[] = [
    { field: "Official website", status: "Confirmed", note: p.officialUrl },
    {
      field: "Launch / announcement",
      status: p.launchDate ? "Confirmed" : "N/A",
    },
    { field: "Product capabilities", status: "Cross-checked", note: "From cited sources" },
  ];
  const vendorReported = /vendor-reported/i.test(p.pricing) || /vendor-reported/i.test((p.limitations ?? []).join(" "));
  rows.push({
    field: "Pricing",
    status: /mit|free|open source/i.test(p.pricing) ? "Cross-checked" : "Unverified",
    note: /mit|free|open source/i.test(p.pricing) ? undefined : "See official pricing page",
  });
  const bench = p.benchmarks ?? [];
  rows.push({
    field: "Performance benchmarks",
    status: bench.length
      ? bench.some((b) => b.kind === "vendor")
        ? "Vendor-reported"
        : "Cross-checked"
      : "Unavailable",
  });
  if (vendorReported) {
    rows.push({ field: "Headline metrics", status: "Vendor-reported", note: "Not independently verified" });
  }
  return rows;
}

// ── Lookups ────────────────────────────────────────────────────────────────

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productForCategory = (categorySlug: string) =>
  products.find((p) => p.categorySlug === categorySlug);

export const sortedCategories = () =>
  [...categories].sort((a, b) => a.order - b.order);

export interface Pick {
  category: Category;
  product: Product | undefined;
}

export const editionPicks = (): Pick[] =>
  sortedCategories().map((category) => ({
    category,
    product: productForCategory(category.slug),
  }));

export const verificationLabel: Record<VerificationStatus, string> = {
  verified: "Verified",
  researched: "Researched · pending approval",
  preview: "Curated preview · pending fact-check",
  needs_review: "Needs review",
  no_pick: "No verified pick this edition",
};

// ── Homepage: edition summary ────────────────────────────────────────
// Honest coverage messaging (spec §6.5): 13 evaluated, N verified, rest flagged.
export function editionSummary() {
  const evaluated = categories.length;
  const verified = products.filter((p) => p.verification === "verified").length;
  const published = products.length;
  return { evaluated, verified, insufficient: evaluated - published };
}

// Deterministic category accent colour for icons (no fabricated logos; spec §6.3).
const accentPalette = [
  "bg-indigo-600", "bg-sky-600", "bg-teal-600", "bg-violet-600", "bg-rose-600",
  "bg-amber-600", "bg-emerald-600", "bg-blue-600", "bg-fuchsia-600", "bg-cyan-600",
  "bg-orange-600", "bg-green-600", "bg-purple-600",
];
export function categoryAccent(categorySlug: string): string {
  const idx = categories.findIndex((c) => c.slug === categorySlug);
  return accentPalette[(idx + accentPalette.length) % accentPalette.length];
}

// ── Homepage: "The AI landscape this fortnight" (spec §7) ─────────────────────────
// Industry developments kept separate from product rankings — funding/launch
// activity is context, not proof of product quality. Every item is evidence-linked.
export interface LandscapeItem {
  topic: string;
  headline: string;
  summary: string;
  whyItMatters: string;
  source: Source;
  href?: string; // internal deep-link to a related product profile, where relevant
}

export const landscape: LandscapeItem[] = [
  {
    topic: "Compute",
    headline: "NVIDIA's Vera Rubin reaches the cloud",
    summary:
      "At NVIDIA GTC Berlin, Google Cloud made A5X instances on the Vera Rubin NVL72 platform generally available — putting the newest accelerator generation into a hyperscaler as a shipping product.",
    whyItMatters:
      "Frontier-scale training compute is becoming a routine cloud purchase, not a bespoke build-out.",
    source: {
      title: "Google Cloud infrastructure at NVIDIA GTC Berlin 2026",
      url: "https://cloud.google.com/blog/topics/ai-infrastructure/google-cloud-infrastructure-at-nvidia-gtc-berlin-2026",
      type: "official",
    },
    href: "/tools/google-cloud-a5x-vera-rubin",
  },
  {
    topic: "Agents",
    headline: "Perplexity ships coordinated multi-agent runs",
    summary:
      "On Nov 17 Perplexity launched Multiagent: a lead agent splits a task across up to 16 model-diverse sub-agents and composes the results, inside its Comet platform.",
    whyItMatters:
      "Coordinated multi-agent execution moved from research demos into a consumer product.",
    source: {
      title: "Perplexity launches Multiagent (up to 16 agents)",
      url: "https://pasqualepillitteri.it/en/news/35232/perplexity-launches-multiagent-up-to-16-ai-agents-working",
      type: "news",
    },
    href: "/tools/perplexity-multiagent",
  },
  {
    topic: "Funding",
    headline: "Isomorphic Labs raises $5B for AI drug design",
    summary:
      "The DeepMind spin-out closed an oversubscribed $5B Series C (Nov 17) to push AI-designed drug candidates toward clinical trials.",
    whyItMatters:
      "Capital keeps concentrating in AI-for-science — but funding is a signal, not proof of clinical success.",
    source: {
      title: "Isomorphic Labs raises $5B (TechCrunch, Nov 17)",
      url: "https://techcrunch.com/2026/11/17/isomorphic-labs-raises-5b-as-it-looks-to-take-drug-candidates-to-clinical-trials/",
      type: "news",
    },
    href: "/tools/isomorphic-labs",
  },
  {
    topic: "Models",
    headline: "Gemini 4 Neon tops the coding-agent index",
    summary:
      "Google launched Gemini 4 Neon on Nov 18; running in its Antigravity CLI it took the top of the independent Artificial Analysis Coding Agent Index.",
    whyItMatters:
      "The frontier of agentic coding keeps moving fast — benchmark leadership now changes edition to edition.",
    source: {
      title: "AI models released in November 2026 (release tracker)",
      url: "https://www.nocode.mba/ai-release-tracker/2026/11",
      type: "analysis",
    },
    href: "/tools/google-antigravity",
  },
  {
    topic: "Open source",
    headline: "Production vector databases harden",
    summary:
      "Weaviate shipped Enterprise and Platform editions (v1.40) on Nov 18, adding shard self-recovery, deduplicated backups and namespaces for multi-tenant RAG.",
    whyItMatters:
      "Open-source AI data infrastructure is maturing from libraries into production-grade managed platforms.",
    source: {
      title: "Weaviate advances vector database technology (Nov 18)",
      url: "https://stockhouse.com/news/press-releases/2026/11/18/weaviate-advances-vector-database-technology-to-power-fast-growing-ai",
      type: "press-release",
    },
    href: "/tools/weaviate",
  },
];

// Concise editorial observations (spec §14 "edition takeaways").
export const takeaways: string[] = [
  "Frontier-scale GPU compute is becoming a routine cloud purchase.",
  "Multi-agent coordination moved from research demos into consumer products.",
  "Capital keeps concentrating in AI-for-science — funding is context, not proof.",
  "Open-source infra (vector DBs, LLMOps) is hardening for production.",
];

// ── Historical archive editions (Aug 1 – Nov 15, 2026) ───────────────────────
// Backfilled per the Discovery Agent methodology (weekly_discovery_agent_prd §3):
// candidates sourced from Hacker News (source #2) and GitHub (source #3) within
// each fortnight's exact date window, then fact-checked against the product's
// own site/repo (source #10, official websites). Every pick carries a dated
// evidence URL. Picks confirmed against the official site are "verified"; those
// resting on the dated HN/GitHub record alone are "researched · pending approval"
// — honest about scope, never over-claimed. Categories without a credible
// in-window candidate are simply omitted (shown as "no pick"), never invented
// (§11: report insufficient evidence rather than fabricate winners).

export interface ArchivePick {
  categorySlug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  overview?: string; // deeper original write-up (verified picks); renders when present
  officialUrl: string;
  whyItMatters: string;
  verification: VerificationStatus; // "verified" | "researched"
  launchDate: string; // in-window evidence date (YYYY-MM-DD)
  sources: Source[];
}

export interface ArchiveEdition {
  slug: string; // period-start date (1st or 16th), the canonical edition id
  periodKey: string;
  name: string;
  label: string;
  periodStart: string;
  periodEnd: string;
  picks: ArchivePick[];
}

export const archiveEditions: ArchiveEdition[] = [
  {
    slug: "2026-08-01",
    periodKey: "2026-08-H1",
    name: "Edition — August 1–15, 2026",
    label: "Aug 1–15, 2026",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-15",
    picks: [
      {
        categorySlug: "ai-coding-developer-tools",
        name: "Fuxi",
        tagline: "Terminal AI coding agent, multi-provider",
        shortDescription: "Single-binary terminal coding agent with multi-provider routing.",
        overview:
          "Fuxi is a single-binary terminal coding agent that routes across 10+ LLM providers (DeepSeek, OpenAI, Claude, Qwen and more) with automatic failover and provider racing for reliability. It ships a deep tool suite — 50+ capabilities spanning file editing, shell commands and code search — plus persistent sessions with long-term memory and MCP client support. Permission-gated autonomous execution and extensibility through hooks, skills, plugins and slash commands let even non-developers build by conversation, and it installs as a single static binary with no runtime dependencies.",
        officialUrl: "https://www.fuxicode.com",
        whyItMatters:
          "A single static binary that routes across 10+ LLM providers with automatic failover and MCP support — part of August 2026's wave of local, provider-agnostic terminal coding agents.",
        verification: "verified",
        launchDate: "2026-08-04",
        sources: [
          { title: "fuxicodex/Fuxi on GitHub", url: "https://github.com/fuxicodex/Fuxi", type: "github" },
          { title: "Fuxi — official site", url: "https://www.fuxicode.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-agents",
        name: "Phone Harness",
        tagline: "Let your AI agent control your phone",
        shortDescription: "Agents tap, type and scroll real iOS/Android apps.",
        overview:
          "Phone Harness lets AI agents operate real iPhones and Android devices — tapping, typing and scrolling through apps exactly as a person would, using visual input and on-screen controls with no jailbreaking or special APIs. Teams can use hosted cloud phones or connect their own device, giving agents genuine mobile-app reach instead of brittle per-app integrations. It targets developers building agents that need to act inside everyday consumer mobile apps.",
        officialUrl: "https://phone-harness.com",
        whyItMatters:
          "Gives agents real tap/type/scroll control of iOS and Android without jailbreaking or special APIs — a concrete step toward agents operating everyday mobile apps.",
        verification: "verified",
        launchDate: "2026-08-07",
        sources: [
          { title: "phone-harness/phone-harness on GitHub", url: "https://github.com/phone-harness/phone-harness", type: "github" },
          { title: "Phone Harness — official site", url: "https://phone-harness.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-data-infrastructure",
        name: "pgbot",
        tagline: "Postgres intelligence for AI agents",
        shortDescription: "Natural-language Postgres intelligence layer for AI agents.",
        officialUrl: "https://pgbot.dev",
        whyItMatters:
          "Brings natural-language Postgres intelligence to AI agents, reflecting the push to make production databases first-class agent tools.",
        verification: "researched",
        launchDate: "2026-08-11",
        sources: [
          { title: "pgrundev/pgbot on GitHub (1.5k★)", url: "https://github.com/pgrundev/pgbot", type: "github" },
        ],
      },
      {
        categorySlug: "ai-monetization-billing",
        name: "CostPerPrompt",
        tagline: "Live AI API pricing & cost calculators",
        shortDescription: "Real-time pricing and workload cost calculators for AI APIs.",
        overview:
          "CostPerPrompt tracks live pricing for hundreds of AI models across major providers, refreshed automatically from public provider listings. Beyond a raw price table, it offers purpose-built calculators that model real workloads — chatbots with growing context, RAG pipelines split into indexing/retrieval/generation, and voice AI billed across STT + LLM + TTS — plus GPU-rental and image-API pricing and a token counter. It's a reference tool for teams estimating and controlling usage-based AI spend before it lands on the bill.",
        officialUrl: "https://costperprompt.com",
        whyItMatters:
          "Tracks live pricing across hundreds of models with workload calculators (chatbot, RAG, voice) — the cost tooling that matters as teams move to usage-based AI spend.",
        verification: "verified",
        launchDate: "2026-08-02",
        sources: [
          { title: "Show HN: CostPerPrompt (Aug 2, 2026)", url: "https://news.ycombinator.com/item?id=49140340", type: "hackernews" },
          { title: "CostPerPrompt — official site", url: "https://costperprompt.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-development-orchestration",
        name: "Xyne Spaces",
        tagline: "The AI Org-OS for humans and agents",
        shortDescription: "Collaborative org workspace for humans and AI agents.",
        officialUrl: "https://xyne.ai",
        whyItMatters:
          "An open 'AI Org-OS' positioning humans and agents as collaborators in one workspace — from the Juspay team, part of the agent-orchestration surface wave.",
        verification: "researched",
        launchDate: "2026-08-02",
        sources: [
          { title: "juspay/xyne-spaces on GitHub", url: "https://github.com/juspay/xyne-spaces", type: "github" },
        ],
      },
      {
        categorySlug: "ai-compute-gpu-cloud",
        name: "Perimeter Compute",
        tagline: "Distributed AI cloud in city office buildings",
        shortDescription: "Distributed GPU cloud using office buildings' spare energy.",
        overview:
          "Perimeter Compute launched as a distributed AI cloud provider that deploys GPU compute inside commercial office buildings in major US cities, tapping their excess energy capacity instead of building new data centers. The distributed-edge approach aims to add GPU supply closer to demand while using power that would otherwise go unused, targeting AI teams that need additional capacity. (Reported by DataCenterDynamics; company scale not independently deep-verified here.)",
        officialUrl: "https://www.datacenterdynamics.com/en/news/distributed-ai-cloud-provider-perimeter-compute-launches/",
        whyItMatters:
          "A novel answer to the GPU-supply crunch — compute placed in office buildings on otherwise-wasted energy — reported as an Aug 2026 launch by an industry outlet.",
        verification: "researched",
        launchDate: "2026-08-04",
        sources: [
          { title: "Distributed AI cloud provider Perimeter Compute launches (DataCenterDynamics, Aug 4 2026)", url: "https://www.datacenterdynamics.com/en/news/distributed-ai-cloud-provider-perimeter-compute-launches/", type: "news" },
        ],
      },
    ],
  },
  {
    slug: "2026-08-16",
    periodKey: "2026-08-H2",
    name: "Edition — August 16–31, 2026",
    label: "Aug 16–31, 2026",
    periodStart: "2026-08-16",
    periodEnd: "2026-08-31",
    picks: [
      {
        categorySlug: "ai-observability-evaluation",
        name: "Reverify",
        tagline: "Grounded, hallucination-checked agent toolkit",
        shortDescription: "Agents propose; deterministic tools decide, every claim checked.",
        officialUrl: "https://github.com/2akouwu/reverify",
        whyItMatters:
          "An MCP server + CLI that makes agents propose while deterministic tools decide, checking every claim against ground truth — a direct answer to hallucination in agent workflows.",
        verification: "researched",
        launchDate: "2026-08-31",
        sources: [
          { title: "2akouwu/reverify on GitHub (1.3k★)", url: "https://github.com/2akouwu/reverify", type: "github" },
        ],
      },
      {
        categorySlug: "ai-voice-agents",
        name: "Tel-Agent",
        tagline: "Open-source AI phone assistant",
        shortDescription: "Self-hostable AI phone assistant, open source.",
        officialUrl: "https://github.com/Dpro-at/Tel-Agent",
        whyItMatters:
          "An open-source AI phone assistant — part of the fortnight's crop of self-hostable voice and telephony agents.",
        verification: "researched",
        launchDate: "2026-08-16",
        sources: [
          { title: "Dpro-at/Tel-Agent on GitHub", url: "https://github.com/Dpro-at/Tel-Agent", type: "github" },
        ],
      },
      {
        categorySlug: "ai-data-infrastructure",
        name: "VoiceMem",
        tagline: "Universal memory for voice agents",
        shortDescription: "Fully streaming universal memory layer for voice agents.",
        overview:
          "VoiceMem is memory infrastructure for voice agents that need persistent understanding of a user. Its streaming 'dual-brain' design stores factual information (schemas and entities) in a left brain and emotional and personality data in a right brain, aiming for accurate, personality-aware, low-latency and low-cost memory. It's Apache-2.0 and open source, built for developers shipping real-time voice applications.",
        officialUrl: "https://github.com/xzf-thu/VoiceMem",
        whyItMatters:
          "Universal, fully-streaming memory infrastructure built specifically for voice agents, targeting latency at the architecture level.",
        verification: "verified",
        launchDate: "2026-08-17",
        sources: [
          { title: "xzf-thu/VoiceMem on GitHub (2.9k★)", url: "https://github.com/xzf-thu/VoiceMem", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agents",
        name: "TabTin",
        tagline: "Humans + multiple AI agents, one workspace",
        shortDescription: "Workspace where people and multiple AI agents collaborate.",
        officialUrl: "https://www.tabtin.com",
        whyItMatters:
          "A shared workspace where people and multiple AI agents work together — an early take on multi-agent collaboration surfaces.",
        verification: "researched",
        launchDate: "2026-08-19",
        sources: [
          { title: "tabtin-ai/TabTin on GitHub", url: "https://github.com/tabtin-ai/TabTin", type: "github" },
        ],
      },
      {
        categorySlug: "ai-coding-developer-tools",
        name: "Operator Memory",
        tagline: "Self-improving context engine for coding agents",
        shortDescription: "Self-improving context engine for coding agents.",
        officialUrl: "https://github.com/aerovato/operator-memory",
        whyItMatters:
          "A self-improving context engine for coding agents — part of the fortnight's run of memory/context layers aimed at making coding agents learn across sessions.",
        verification: "researched",
        launchDate: "2026-08-16",
        sources: [
          { title: "aerovato/operator-memory on GitHub", url: "https://github.com/aerovato/operator-memory", type: "github" },
        ],
      },
      {
        categorySlug: "ai-sales",
        name: "Runable",
        tagline: "AI agent that builds and grows a business",
        shortDescription: "Go-to-market agent: ads, social, SEO, customer acquisition.",
        overview:
          "Runable is an AI agent platform that lets non-technical founders build a website or app from natural-language prompts, then extends into go-to-market work — running ad campaigns, managing social media, handling SEO and optimizing presence in AI-chatbot results. It manages the underlying infrastructure (deployment, analytics) so users can turn AI-generated products into working businesses without stitching services together. In August 2026 it raised a $21M Series A (co-led by Susquehanna Venture Capital and Nexus Venture Partners) at a $65M post-money valuation.",
        officialUrl: "https://runable.com",
        whyItMatters:
          "Pushes AI agents past building software into customer acquisition and growth — the go-to-market automation frontier — with a dated, reputably-reported Series A.",
        verification: "verified",
        launchDate: "2026-08-26",
        sources: [
          { title: "Runable hits $21M Series A (TechCrunch, Aug 26 2026)", url: "https://techcrunch.com/2026/08/26/runable-hits-21m-to-bet-ai-agents-can-go-from-building-businesses-to-growing-them/", type: "techcrunch" },
          { title: "Runable — official site", url: "https://runable.com", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-09-01",
    periodKey: "2026-09-H1",
    name: "Edition — September 1–15, 2026",
    label: "Sep 1–15, 2026",
    periodStart: "2026-09-01",
    periodEnd: "2026-09-15",
    picks: [
      {
        categorySlug: "ai-coding-developer-tools",
        name: "shadcn lint",
        tagline: "Agent-first linter for design systems",
        shortDescription: "Design-system rules that AI agents can verify.",
        overview:
          "shadcn/lint is an agent-first linter that lets you write design-system rules AI agents can verify, without rewriting components. When an agent breaks a rule, it returns contextual errors with fix suggestions drawn from the project's available components, variants and theme values. It works with React, Vue or Svelte on Tailwind CSS v4+, runs under both ESLint and Oxlint, and is MIT-licensed.",
        officialUrl: "https://github.com/shadcn-ui/lint",
        whyItMatters:
          "An agent-first linter letting you write design-system rules agents can verify — from the shadcn/ui author, signaling tooling built explicitly for AI-written code.",
        verification: "verified",
        launchDate: "2026-09-02",
        sources: [
          { title: "shadcn-ui/lint on GitHub (3.4k★)", url: "https://github.com/shadcn-ui/lint", type: "github" },
        ],
      },
      {
        categorySlug: "ai-data-infrastructure",
        name: "Engrim",
        tagline: "Local-first memory engine for AI CLIs",
        shortDescription: "Universal local-first SQLite memory engine for AI CLIs.",
        officialUrl: "https://github.com/timgordontg/engrim",
        whyItMatters:
          "A universal, local-first SQLite memory engine for AI CLIs — part of the surge in portable agent-memory layers.",
        verification: "researched",
        launchDate: "2026-09-07",
        sources: [
          { title: "Show HN: Engrim (Sep 7, 2026)", url: "https://news.ycombinator.com/item?id=49594008", type: "hackernews" },
          { title: "timgordontg/engrim on GitHub", url: "https://github.com/timgordontg/engrim", type: "github" },
        ],
      },
      {
        categorySlug: "ai-evals",
        name: "Dyno Lab",
        tagline: "AI safety & interpretability workbench",
        shortDescription: "Local alignment and interpretability workbench for Apple Silicon.",
        officialUrl: "https://dynolab.dev",
        whyItMatters:
          "A local AI safety, alignment and interpretability workbench for Apple Silicon — activations, probes and SAEs with a Python SDK and MCP.",
        verification: "researched",
        launchDate: "2026-09-04",
        sources: [
          { title: "canivel/dynolab on GitHub", url: "https://github.com/canivel/dynolab", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agents",
        name: "Pizza Bot",
        tagline: "An inbox for background AI agents",
        shortDescription: "Inbox for AI agents that work in the background.",
        officialUrl: "https://github.com/pizza-bot-app/pizza-bot",
        whyItMatters:
          "An inbox for AI agents that work in the background — reframing agents as asynchronous workers you triage like email.",
        verification: "researched",
        launchDate: "2026-09-15",
        sources: [
          { title: "Show HN: Pizza Bot (Sep 15, 2026)", url: "https://news.ycombinator.com/item?id=49713894", type: "hackernews" },
          { title: "pizza-bot-app/pizza-bot on GitHub", url: "https://github.com/pizza-bot-app/pizza-bot", type: "github" },
        ],
      },
      {
        categorySlug: "ai-development-orchestration",
        name: "AlphaCode",
        tagline: "Free MIT AI coding agent, no API key",
        shortDescription: "Open coding agent with swarm mode, built in Rust.",
        officialUrl: "https://alphacli.github.io/",
        whyItMatters:
          "A free, MIT-licensed coding agent with a built-in model (or bring your own), swarm mode and 40+ tools — lowering the barrier to multi-agent coding workflows.",
        verification: "researched",
        launchDate: "2026-09-01",
        sources: [
          { title: "dragonked2/alphacode on GitHub", url: "https://github.com/dragonked2/alphacode", type: "github" },
        ],
      },
    ],
  },
  {
    slug: "2026-09-16",
    periodKey: "2026-09-H2",
    name: "Edition — September 16–30, 2026",
    label: "Sep 16–30, 2026",
    periodStart: "2026-09-16",
    periodEnd: "2026-09-30",
    picks: [
      {
        categorySlug: "ai-agents",
        name: "Andee",
        tagline: "On-device Android agent for any app",
        shortDescription: "On-device Android agent that drives any app.",
        overview:
          "Andee is an Android agent that runs directly on your phone and automates tasks across any app with no integrations — reading the screen, reasoning about the next action, and tapping, typing and swiping like you would. It's powered by any OpenAI-compatible model you configure (DeepSeek by default), and keeps its notebook, habits and vault strictly on-device; only conversation data goes to your chosen model endpoint, never to Andee's maintainers. It runs on Android 11+ and targets users who want a private, model-agnostic phone agent.",
        officialUrl: "https://heyandee.com",
        whyItMatters:
          "An on-device Android agent that operates any app like you do — no integrations or root — keeping memory, habits and vault on the phone.",
        verification: "verified",
        launchDate: "2026-09-17",
        sources: [
          { title: "kuafuai/andee on GitHub (6.2k★)", url: "https://github.com/kuafuai/andee", type: "github" },
        ],
      },
      {
        categorySlug: "ai-development-orchestration",
        name: "TypeLLM",
        tagline: "Type-safe generation with LLMs",
        shortDescription: "Type-safe LLM generation; no out-of-schema hallucinations.",
        overview:
          "TypeLLM is a workflow-automation platform that treats a multi-step process as a single inference unit rather than a chain of brittle API calls, with type-safe generation that guarantees no out-of-schema output. Its published benchmarks contrast that type-safe guarantee against standard model APIs that lack it. It targets developers who need reliable, structured LLM output inside automated workflows.",
        officialUrl: "https://typellm.ai",
        whyItMatters:
          "Type-safe LLM generation that treats a multi-step workflow as a single inference unit, aiming to eliminate out-of-schema hallucinations.",
        verification: "verified",
        launchDate: "2026-09-17",
        sources: [
          { title: "TypeLLM/TypeLLM on GitHub", url: "https://github.com/TypeLLM/TypeLLM", type: "github" },
          { title: "TypeLLM — official site", url: "https://typellm.ai", type: "official" },
        ],
      },
      {
        categorySlug: "ai-model-serving-inference",
        name: "Strands Decider",
        tagline: "Fast decision model for agents",
        shortDescription: "Small, fast decision model with calibrated confidence.",
        officialUrl: "https://github.com/strands-labs/strands-decider",
        whyItMatters:
          "A small, fast 'system-one' decision model with calibrated confidence for agentic workflows — picking or rating options faster than an LLM.",
        verification: "researched",
        launchDate: "2026-09-29",
        sources: [
          { title: "strands-labs/strands-decider on GitHub", url: "https://github.com/strands-labs/strands-decider", type: "github" },
        ],
      },
      {
        categorySlug: "ai-voice-agents",
        name: "OpenSpline",
        tagline: "Realtime avatars for voice AI",
        shortDescription: "Realtime generated avatar for your voice AI, locally.",
        officialUrl: "https://www.openspline.dev",
        whyItMatters:
          "Adds a realtime generated avatar to any voice AI in a few lines of code, running locally — bringing a face to voice agents.",
        verification: "researched",
        launchDate: "2026-09-29",
        sources: [
          { title: "openspline/openspline on GitHub", url: "https://github.com/openspline/openspline", type: "github" },
        ],
      },
      {
        categorySlug: "ai-evals",
        name: "TinyAIArena",
        tagline: "Watch AI agents battle it out",
        shortDescription: "Head-to-head arena pitting AI agents against each other.",
        officialUrl: "https://tinyaiarena.com/",
        whyItMatters:
          "A public arena where small AI agents compete head-to-head — a lightweight, watchable take on agent evaluation and comparison.",
        verification: "researched",
        launchDate: "2026-09-27",
        sources: [
          { title: "Show HN: TinyAIArena (Sep 27, 2026)", url: "https://news.ycombinator.com/item?id=49867775", type: "hackernews" },
        ],
      },
      {
        categorySlug: "ai-observability",
        name: "OpenObserve",
        tagline: "Open-source observability with AI monitoring",
        shortDescription: "Rust observability platform adding agent/LLM monitoring in v1.0.",
        overview:
          "OpenObserve is an open-source, Rust-built observability platform for logs, metrics, traces and real-user monitoring, positioned as a high-performance alternative to Datadog and Splunk. Its v1.0 release folded AI observability into the same platform: token cost and usage tracking across 80+ providers attributed per agent, full-session tracing of agent conversations with tool calls and latency, Agent Graph and Agent Behavior views, and built-in evaluation with custom scorers, LLM-as-judge and annotation queues. It's open source, with self-hosted and cloud options.",
        officialUrl: "https://openobserve.ai",
        whyItMatters:
          "Brings production AI/agent monitoring into one open-source stack alongside classic logs, metrics and traces — a dated v1.0 GA (Sep 22) for teams running agents in production.",
        verification: "verified",
        launchDate: "2026-09-22",
        sources: [
          { title: "OpenObserve reaches v1.0 (VentureBeat, Sep 22 2026)", url: "https://venturebeat.com/business/openobserve-reaches-v10-bringing-ai-observability-into-the-same-platform-as-logs-metrics-traces-and-rum", type: "news" },
          { title: "OpenObserve — official site", url: "https://openobserve.ai", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-10-01",
    periodKey: "2026-10-H1",
    name: "Edition — October 1–15, 2026",
    label: "Oct 1–15, 2026",
    periodStart: "2026-10-01",
    periodEnd: "2026-10-15",
    picks: [
      {
        categorySlug: "ai-agents",
        name: "ARTEX",
        tagline: "Autonomous AI penetration-testing system",
        shortDescription: "Autonomous AI system for penetration testing.",
        overview:
          "ARTEX is a self-hosted, LLM-driven penetration-testing platform where multiple AI agents work together to test targets for vulnerabilities — decomposing goals into executable tasks, running real security tools, and recording evidence that links each finding to captured network traffic. A dual-graph architecture separates what's known about a target (asset graph) from testing progress (exploration graph); a planner agent dispatches work to concurrent worker agents through a recording proxy, producing an auditable chain of reasoning and proof. It's open source under AGPL-3.0 and explicitly restricted to authorized testing — aimed at security professionals doing sanctioned pentests, bug bounties and red-team work.",
        officialUrl: "https://github.com/BaaRai/ARTEX",
        whyItMatters:
          "An autonomous AI penetration-testing system that drew the fortnight's strongest GitHub momentum for offensive-security agents.",
        verification: "verified",
        launchDate: "2026-10-08",
        sources: [
          { title: "BaaRai/ARTEX on GitHub (13.9k★)", url: "https://github.com/BaaRai/ARTEX", type: "github" },
        ],
      },
      {
        categorySlug: "ai-model-serving-inference",
        name: "Indra",
        tagline: "1M-param OCR model, runs on CPU",
        shortDescription: "1M-param OCR model, CPU-fast, near billion-param accuracy.",
        overview:
          "Indra, from Datalab, is an OCR model that turns PDFs and images into markdown, text or JSON with bounding boxes. At roughly 1 million parameters it runs entirely on CPU — no GPU or PyTorch — yet reaches about 15× Tesseract's speed and scores 66.7 on OmniParseBench versus PaddleOCR's 58.4. The code is Apache-2.0, with a modified OpenRAIL-M license on the model weights for research and personal use.",
        officialUrl: "https://www.datalab.to",
        whyItMatters:
          "A 1M-parameter OCR model that runs on CPU ~15× faster than Tesseract while approaching billion-parameter accuracy — efficient inference from Datalab.",
        verification: "verified",
        launchDate: "2026-10-13",
        sources: [
          { title: "datalab-to/indra on GitHub (1.9k★)", url: "https://github.com/datalab-to/indra", type: "github" },
          { title: "Datalab — official site", url: "https://www.datalab.to", type: "official" },
        ],
      },
      {
        categorySlug: "ai-monetization-billing",
        name: "Grandet",
        tagline: "Cheapest API for any model",
        shortDescription: "Finds the cheapest API/provider per model, via MCP.",
        overview:
          "Grandet compares LLM API prices across official providers, inference hosts and relays to surface the cheapest option for any given model. It maintains a large database of provider sites, organizes costs by input/output tokens, and separates relay-credit pricing from cash pricing. It exposes an MCP server and a price API, plus a downloadable Skill for Claude, Cursor and similar tools, so an agent can route each call to the lowest-cost provider programmatically.",
        officialUrl: "https://grandet.ai",
        whyItMatters:
          "Finds the cheapest API/provider for any model across thousands of sources, with an MCP server — cost routing as monetization infrastructure.",
        verification: "verified",
        launchDate: "2026-10-05",
        sources: [
          { title: "hanzohanzhe/Grandet on GitHub", url: "https://github.com/hanzohanzhe/Grandet", type: "github" },
          { title: "Grandet — official site", url: "https://grandet.ai", type: "official" },
        ],
      },
      {
        categorySlug: "ai-observability-evaluation",
        name: "Agent Box",
        tagline: "Sandbox that restricts AI agents",
        shortDescription: "OS-isolated, default-deny sandbox for running AI agents.",
        officialUrl: "https://github.com/strands-agents/box",
        whyItMatters:
          "Runs AI agents in an OS-isolated, default-deny sandbox with credential injection that keeps secrets out of the agent — guardrails for autonomous execution.",
        verification: "researched",
        launchDate: "2026-10-02",
        sources: [
          { title: "strands-agents/box on GitHub", url: "https://github.com/strands-agents/box", type: "github" },
        ],
      },
      {
        categorySlug: "ai-healthcare",
        name: "Healthleap",
        tagline: "AI that flags at-risk hospital patients",
        shortDescription: "Nightly AI screening of inpatient records for missed conditions.",
        overview:
          "Healthleap is an AI platform that analyzes hospital inpatient records each night — labs, weights, vital signs and clinician notes — to flag patients at risk of under-diagnosed conditions like malnutrition, delirium, aspiration pneumonia and pressure ulcers, delivering morning risk scores to care teams via a dashboard. It integrates with EHR systems and uses language models to extract clinical indicators from notes, surfacing risk rather than making diagnoses itself. Reported customers include Penn Medicine, Cedars-Sinai, Intermountain, Houston Methodist and Emory Healthcare; in October 2026 it raised $38M ($8M seed co-led by Sequoia and First Round, $30M Series A led by Hummingbird).",
        officialUrl: "https://healthleap.ai",
        whyItMatters:
          "Targets preventable inpatient harm by catching conditions clinicians miss — a concrete, EHR-integrated clinical-AI use case with a dated, TechCrunch-reported raise.",
        verification: "verified",
        launchDate: "2026-10-07",
        sources: [
          { title: "Healthleap raises $38M (TechCrunch, Oct 7 2026)", url: "https://techcrunch.com/2026/10/07/healthleap-raises-38m-for-its-ai-that-flags-hospital-patients-who-may-need-a-closer-look/", type: "techcrunch" },
          { title: "Healthleap — official site", url: "https://healthleap.ai", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-10-16",
    periodKey: "2026-10-H2",
    name: "Edition — October 16–31, 2026",
    label: "Oct 16–31, 2026",
    periodStart: "2026-10-16",
    periodEnd: "2026-10-31",
    picks: [
      {
        categorySlug: "ai-development-orchestration",
        name: "Agent UI (Vercel Labs)",
        tagline: "UI behaviors for agents",
        shortDescription: "Library of UI behaviors for agents to build interfaces.",
        overview:
          "Vercel Labs' UI SDK is a library of reusable behavioral primitives — like createPopup, createSelection and createTypeahead — that AI agents combine to build custom interfaces instead of generating whole components from scratch, cutting errors. It supports React, Vue, Svelte, Solid and Web Components and ships a starter component library. The source is open on GitHub, aimed at teams building agent-generated UI.",
        officialUrl: "https://ui-sdk.dev",
        whyItMatters:
          "A library of UI behaviors for agents to build next-generation interfaces — from Vercel Labs, part of the move to agent-generated UI.",
        verification: "verified",
        launchDate: "2026-10-26",
        sources: [
          { title: "vercel-labs/ui on GitHub (6.3k★)", url: "https://github.com/vercel-labs/ui", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agents",
        name: "CVEngine",
        tagline: "AI-first attack-surface assessment",
        shortDescription: "AI-first external attack-surface assessment with MCP integration.",
        officialUrl: "https://github.com/hevnsnt/CVEngine",
        whyItMatters:
          "AI-first external attack-surface assessment with continuous discovery and evidence-based vulnerability validation, integrated with developer agents via MCP.",
        verification: "researched",
        launchDate: "2026-10-24",
        sources: [
          { title: "hevnsnt/CVEngine on GitHub", url: "https://github.com/hevnsnt/CVEngine", type: "github" },
        ],
      },
      {
        categorySlug: "ai-data-infrastructure",
        name: "StashDock",
        tagline: "AI-native personal context library",
        shortDescription: "Collect, organize and reuse context across AI chats.",
        officialUrl: "https://stashdock.app",
        whyItMatters:
          "An AI-native personal context library to collect, organize and reuse context across AI conversations — treating context as a managed asset.",
        verification: "researched",
        launchDate: "2026-10-19",
        sources: [
          { title: "StashDock/StashDock on GitHub", url: "https://github.com/StashDock/StashDock", type: "github" },
        ],
      },
      {
        categorySlug: "ai-coding-developer-tools",
        name: "Landmines",
        tagline: "Lint rules that keep AI code honest",
        shortDescription: "Oxlint rules catching fake implementations in AI code.",
        officialUrl: "https://www.npmjs.com/package/@interfere/landmines",
        whyItMatters:
          "Oxlint rules that keep AI-written code honest — real implementations, real signals, no flake masking — tooling for the AI-authored-code era.",
        verification: "researched",
        launchDate: "2026-10-28",
        sources: [
          { title: "interfere-inc/landmines on GitHub", url: "https://github.com/interfere-inc/landmines", type: "github" },
        ],
      },
      {
        categorySlug: "ai-observability-evaluation",
        name: "Sphinx",
        tagline: "Quizzes you on your AI's code before shipping",
        shortDescription: "Git hook that quizzes you on AI-written code.",
        officialUrl: "https://sphinx-six-theta.vercel.app/",
        whyItMatters:
          "A hook that quizzes you on your AI's code before you ship it — a human-in-the-loop guardrail against merging code you don't understand.",
        verification: "researched",
        launchDate: "2026-10-18",
        sources: [
          { title: "Show HN: Sphinx (Oct 18, 2026)", url: "https://news.ycombinator.com/item?id=50137950", type: "hackernews" },
        ],
      },
      {
        categorySlug: "ai-compute-gpu-cloud",
        name: "Modal",
        tagline: "Serverless cloud for AI and data workloads",
        shortDescription: "Serverless GPU/CPU cloud for AI, ML and data.",
        overview:
          "Modal is a serverless cloud that lets developers run AI, ML and data workloads — training, batch inference, fine-tuning and more — by writing Python and having Modal provision GPUs and CPUs on demand, without managing infrastructure. In October 2026 it raised a $750M Series D at a $15.75B post-money valuation, reported by DataCenterDynamics, underscoring how much capital is flowing to developer-first AI compute. (Funding is a dated signal of momentum, not proof of product quality.)",
        officialUrl: "https://modal.com",
        whyItMatters:
          "One of the fortnight's largest AI-infrastructure raises ($750M Series D), signaling strong demand for serverless, developer-first GPU compute.",
        verification: "researched",
        launchDate: "2026-10-16",
        sources: [
          { title: "AI cloud Modal raises $750M Series D (DataCenterDynamics, Oct 16 2026)", url: "https://www.datacenterdynamics.com/en/news/ai-cloud-modal-raises-750m-in-series-d-funding-round/", type: "news" },
          { title: "Modal — official site", url: "https://modal.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-biotech-drug-discovery",
        name: "Formation Bio",
        tagline: "AI drug developer with a $600M stalled-drug fund",
        shortDescription: "AI-driven drug developer; $600M fund to revive stalled drugs.",
        overview:
          "Formation Bio is an AI-driven drug development company that, in October 2026, launched a $600M fund to buy or license drug candidates that have stalled — betting it can use AI and a tech-enabled development model to revive and advance them. The move pairs capital with its AI development engine to prove out that thesis. (Reported by Forbes; details not independently deep-verified here, and funding is a supporting signal, not proof of clinical success.)",
        officialUrl: "https://www.formation.bio",
        whyItMatters:
          "A novel AI-biotech strategy — a $600M fund to rescue stalled drugs — reported by Forbes as an Oct 2026 move, distinct from the usual discovery-stage raises.",
        verification: "researched",
        launchDate: "2026-10-28",
        sources: [
          { title: "Why an AI biotech startup launched a $600M fund to buy stalled drugs (Forbes, Oct 28 2026)", url: "https://www.forbes.com/sites/innovationrx/2026/10/28/why-an-ai-biotech-startup-launched-a-600-million-fund-to-buy-stalled-drugs/", type: "news" },
          { title: "Formation Bio — official site", url: "https://www.formation.bio", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-11-01",
    periodKey: "2026-11-H1",
    name: "Edition — November 1–15, 2026",
    label: "Nov 1–15, 2026",
    periodStart: "2026-11-01",
    periodEnd: "2026-11-15",
    picks: [
      {
        categorySlug: "ai-evals",
        name: "WebsiteBench",
        tagline: "Can agents rebuild full-stack sites?",
        shortDescription: "Benchmark: agents reverse-engineer websites via browser exploration.",
        overview:
          "WebsiteBench, from TIGER-AI-Lab, is a benchmark that tests whether AI agents can reverse-engineer a full-stack version of a website by exploring it through a browser. It spans 70 tasks and measures pass rate, compute cost, token usage and interaction turns, with a public leaderboard comparing frontier and open models. It gives buyers and researchers an independent read on how well agents can actually replicate real production web apps.",
        officialUrl: "https://website-bench.com",
        whyItMatters:
          "A TIGER-AI-Lab benchmark testing whether agents can reverse-engineer full-stack versions of websites through browser exploration — 70 tasks with a public leaderboard.",
        verification: "verified",
        launchDate: "2026-11-04",
        sources: [
          { title: "TIGER-AI-Lab/WebsiteBench on GitHub", url: "https://github.com/TIGER-AI-Lab/WebsiteBench", type: "github" },
          { title: "WebsiteBench — official site & leaderboard", url: "https://website-bench.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-data-infrastructure",
        name: "db-branch",
        tagline: "Instant DB branches for AI agents & CI",
        shortDescription: "ZFS-backed database branches in seconds for agents/CI.",
        officialUrl: "https://github.com/db-branch/db-branch",
        whyItMatters:
          "Database branches in seconds for AI agents and CI via ZFS — infrastructure for safe, disposable agent and testing environments.",
        verification: "researched",
        launchDate: "2026-11-15",
        sources: [
          { title: "Show HN: db-branch (Nov 15, 2026)", url: "https://news.ycombinator.com/item?id=50506940", type: "hackernews" },
          { title: "db-branch/db-branch on GitHub", url: "https://github.com/db-branch/db-branch", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agents",
        name: "Agentic Identity Broker",
        tagline: "OAuth delegation for AI agents",
        shortDescription: "OAuth delegation so agents get scoped, delegated access.",
        officialUrl: "https://github.com/zalando-incubator/agentic-identity-broker",
        whyItMatters:
          "OAuth delegation for AI agents, from Zalando's incubator — tackling how agents obtain scoped, delegated access to services on a user's behalf.",
        verification: "researched",
        launchDate: "2026-11-06",
        sources: [
          { title: "Show HN: Agentic Identity Broker (Nov 6, 2026)", url: "https://news.ycombinator.com/item?id=50393235", type: "hackernews" },
          { title: "zalando-incubator/agentic-identity-broker on GitHub", url: "https://github.com/zalando-incubator/agentic-identity-broker", type: "github" },
        ],
      },
    ],
  },
];

// ── Archive lookups ──────────────────────────────────────────────────────────
export const getArchiveEdition = (slug: string) =>
  archiveEditions.find((e) => e.slug === slug);

export interface EditionRef {
  slug: string;
  name: string;
  label: string;
  periodStart: string;
  periodEnd: string;
  isCurrent: boolean;
  pickCount: number;
}

/** All editions (current + archive), newest first — for the editions index. */
export function allEditions(): EditionRef[] {
  const current: EditionRef = {
    slug: EDITION.slug,
    name: EDITION.name,
    label: EDITION.label,
    periodStart: EDITION.periodStart,
    periodEnd: EDITION.periodEnd,
    isCurrent: true,
    pickCount: products.filter((p) => p.verification === "verified").length,
  };
  const past: EditionRef[] = archiveEditions.map((e) => ({
    slug: e.slug,
    name: e.name,
    label: e.label,
    periodStart: e.periodStart,
    periodEnd: e.periodEnd,
    isCurrent: false,
    pickCount: e.picks.length,
  }));
  return [current, ...past].sort((a, b) =>
    b.periodStart.localeCompare(a.periodStart),
  );
}

export interface ArchivePickSlot {
  category: Category;
  pick: ArchivePick | undefined;
}

/** All 14 categories paired with this archive edition's pick (or none). */
export function archiveEditionPicks(edition: ArchiveEdition): ArchivePickSlot[] {
  return sortedCategories().map((category) => ({
    category,
    pick: edition.picks.find((p) => p.categorySlug === category.slug),
  }));
}

export interface CategoryArchiveEntry {
  editionSlug: string;
  editionLabel: string;
  pick: ArchivePick;
}

/** Every archive pick for a category, across all editions, newest first. */
export function archivePicksForCategory(
  categorySlug: string,
): CategoryArchiveEntry[] {
  const out: CategoryArchiveEntry[] = [];
  for (const edition of archiveEditions) {
    for (const pick of edition.picks) {
      if (pick.categorySlug === categorySlug) {
        out.push({
          editionSlug: edition.slug,
          editionLabel: edition.label,
          pick,
        });
      }
    }
  }
  return out.sort((a, b) => b.editionSlug.localeCompare(a.editionSlug));
}
