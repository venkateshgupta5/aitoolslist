/**
 * Weekly edition content — the directory's display source of truth.
 *
 * Edition 2026-W47 (Nov 16–22, 2026) winners were produced by the Weekly
 * Discovery Agent's research pass and are presented as "researched · pending
 * editorial approval". Per both PRDs' anti-fabrication rule, every winner
 * carries dated evidence URLs, pricing is directional (never invented), and
 * vendor-reported metrics are flagged. Categories without a credible fresh
 * candidate are shown as "No verified pick this week" rather than forced.
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

export const products: Product[] = [
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
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
    lastVerified: null,
    verification: "researched",
  },
];

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
