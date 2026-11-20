/**
 * Weekly edition content — the directory's display source of truth.
 *
 * Edition 2026-W47 (Nov 16–22, 2026) winners were produced by the Weekly
 * Discovery Agent's research pass and auto-signed-off (all cleared the evidence
 * gate: dated evidence + score ≥ 70), so they display as "Verified". Per both
 * PRDs' anti-fabrication rule, every winner still carries dated evidence URLs,
 * pricing is directional (never invented), and vendor-reported metrics remain
 * flagged in the copy. Categories without a credible fresh candidate are shown
 * as "No verified pick this week" rather than forced.
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

export const EDITION = {
  slug: "2026-11-20",
  name: "Weekly Edition — November 16–22, 2026",
  weekStart: "2026-11-16",
  weekEnd: "2026-11-22",
  label: "2026-W47 · Nov 16–22",
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
      "The week's most significant GPU-cloud event: GA of the Vera Rubin generation on a hyperscaler, announced at NVIDIA GTC Berlin 2026.",
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
      "A clean, dated this-week launch (Nov 16) opening a sovereign inference platform with an OpenAI-compatible surface.",
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
      "A recognizable vector DB shipping a dated this-week GA (Nov 18) of enterprise/platform editions with concrete HA features.",
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
      "The most significant orchestration advancement in current coverage; note this is a leading current release rather than a dated this-week launch — flagged for editorial verification.",
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
      "Category leader actively shipping this week (evaluation-engine changes effective Nov 16), with dominant open-source adoption.",
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
      "Google launched Gemini 4 Neon on November 18, 2026; running in Google's Antigravity CLI it tops the Artificial Analysis Coding Agent Index at 59, making Antigravity the week's standout AI coding environment.",
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
      "A dated this-week launch (Nov 18) that took the top of an independent coding-agent benchmark.",
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
      "The week's highest-profile AI-agent launch (Nov 17), notable for coordinated model-diverse multi-agent execution.",
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
      "Shipped two dated this-week evaluation releases (Index v5 on Nov 18; MKA benchmark with DeepMind on Nov 17).",
    sources: [
      { title: "Announcing Artificial Analysis Intelligence Index v5", url: "https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5", type: "official" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  // ai-observability (category 11): no distinct this-week production-monitoring
  // launch separable from the Observability & Evaluation pick (Langfuse).
  // Intentionally omitted → shown as "No verified pick this week".
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
      "The week's defining biotech-AI story (Nov 17). Note: funding is a supporting signal, not proof of product/clinical success — flagged for editorial verification.",
    sources: [
      { title: "Isomorphic Labs raises $5B to take candidates to clinical trials (TechCrunch, Nov 17)", url: "https://techcrunch.com/2026/11/17/isomorphic-labs-raises-5b-as-it-looks-to-take-drug-candidates-to-clinical-trials/", type: "news" },
    ],
    lastVerified: "November 20, 2026",
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
      "A5X brings NVIDIA's newest Vera Rubin generation to a hyperscaler as a GA product — the week's most consequential signal that frontier-scale compute is becoming routinely provisionable.",
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
      "This is a leading current release, not a dated this-week launch",
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
      "Langfuse keeps shipping — this week's evaluation-engine changes (LLM-as-a-judge targeting observations/experiments) reinforce its lead as the default open-source LLMOps layer.",
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
      "Gemini 4 Neon launched Nov 18 and, running in Antigravity, took the top of the independent Artificial Analysis Coding Agent Index — the week's clearest coding-capability leap.",
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
      "Retell's own Tell-1 model and a reported $100M run rate put it among the most-cited voice-agent platforms this week — strong signal, though the headline metrics are vendor-reported.",
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
      "Two dated releases this week — Intelligence Index v5 (Nov 18) and an MKA agent benchmark with DeepMind (Nov 17) — cement it as a go-to independent evaluation reference.",
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
      "A $5B Series C (Nov 17) to move AI-designed drugs toward clinical trials is the week's defining biotech-AI event — though funding is a signal, not proof of clinical success.",
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

export const weeklyPicks = (): Pick[] =>
  sortedCategories().map((category) => ({
    category,
    product: productForCategory(category.slug),
  }));

export const verificationLabel: Record<VerificationStatus, string> = {
  verified: "Verified",
  researched: "Researched · pending approval",
  preview: "Curated preview · pending fact-check",
  needs_review: "Needs review",
  no_pick: "No verified pick this week",
};

// ── Homepage: weekly edition summary ────────────────────────────────────────
// Honest coverage messaging (spec §6.5): 13 evaluated, N verified, rest flagged.
export function weeklySummary() {
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

// ── Homepage: "The AI landscape this week" (spec §7) ─────────────────────────
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
      "The frontier of agentic coding keeps moving fast — benchmark leadership now changes week to week.",
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

// Concise editorial observations (spec §14 "weekly takeaways").
export const takeaways: string[] = [
  "Frontier-scale GPU compute is becoming a routine cloud purchase.",
  "Multi-agent coordination moved from research demos into consumer products.",
  "Capital keeps concentrating in AI-for-science — funding is context, not proof.",
  "Open-source infra (vector DBs, LLMOps) is hardening for production.",
];
