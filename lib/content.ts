/**
 * Fortnightly edition content, the directory's display source of truth.
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
  logo?: string; // compressed logo served from /public/logos; falls back to initials

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
  segmentSlug: string;
}

// Six top-level segments group the 60 categories.
export interface Segment {
  slug: string;
  name: string;
  tagline: string;
  order: number;
}

export const segments: Segment[] = [
  { slug: "ai-infrastructure", name: "AI Infrastructure & Cloud", tagline: "The compute, hardware and cloud layer AI runs on.", order: 1 },
  { slug: "ai-models-intelligence", name: "AI Models & Intelligence", tagline: "Foundation models, multimodal generation, search and retrieval.", order: 2 },
  { slug: "ai-agents-automation", name: "AI Agents & Automation", tagline: "Autonomous agents, workflows and the infrastructure around them.", order: 3 },
  { slug: "ai-developer-ecosystem", name: "AI Developer Ecosystem", tagline: "APIs, code generation, testing, tuning and developer tooling.", order: 4 },
  { slug: "ai-business-applications", name: "AI Business Applications", tagline: "AI applied to support, marketing, finance, legal, security and more.", order: 5 },
  { slug: "emerging-specialized-ai", name: "Emerging & Specialized AI", tagline: "Robotics, autonomy, science and vertical AI frontiers.", order: 6 },
];

// Editions are fortnightly: two per month (1st–15th and 16th–end of month).
// The current edition (as of Nov 20, 2026) is the second-half period.
export const EDITION = {
  slug: "2026-11-16", // canonical edition id = period start date
  periodKey: "2026-11-H2",
  name: "Edition, November 16–30, 2026",
  periodStart: "2026-11-16",
  periodEnd: "2026-11-30",
  label: "Nov 16–30, 2026",
};

export const categories: Category[] = [
  // ── 1. AI Infrastructure & Cloud ──
  { slug: "ai-cloud-platforms", name: "AI Cloud Platforms", order: 1, segmentSlug: "ai-infrastructure", coverage: "Hyperscaler and specialist clouds for training and serving AI at scale." },
  { slug: "ai-gpu-orchestration-scheduling", name: "AI GPU Orchestration & Scheduling", order: 2, segmentSlug: "ai-infrastructure", coverage: "Schedulers and orchestrators that pack, share and prioritise GPU workloads." },
  { slug: "ai-training-infrastructure", name: "AI Training Infrastructure", order: 3, segmentSlug: "ai-infrastructure", coverage: "Distributed training stacks, clusters and large-run tooling." },
  { slug: "ai-inference-optimization", name: "AI Inference Optimization", order: 4, segmentSlug: "ai-infrastructure", coverage: "Inference engines and token factories that cut latency and cost." },
  { slug: "ai-model-compression-quantization", name: "AI Model Compression & Quantization", order: 5, segmentSlug: "ai-infrastructure", coverage: "Quantization, pruning and distillation to shrink models for deployment." },
  { slug: "ai-edge-computing", name: "AI Edge Computing", order: 6, segmentSlug: "ai-infrastructure", coverage: "On-device and edge inference runtimes and hardware." },
  { slug: "ai-networking-data-transfer", name: "AI Networking & Data Transfer", order: 7, segmentSlug: "ai-infrastructure", coverage: "Interconnects and high-throughput data movement for AI clusters." },
  { slug: "ai-storage-infrastructure", name: "AI Storage Infrastructure", order: 8, segmentSlug: "ai-infrastructure", coverage: "High-bandwidth storage, caching and data layers for AI workloads." },
  { slug: "ai-hardware-accelerators", name: "AI Hardware & Accelerators", order: 9, segmentSlug: "ai-infrastructure", coverage: "GPUs, TPUs and custom silicon purpose-built for AI." },
  { slug: "ai-compute-marketplaces", name: "AI Compute Marketplaces", order: 10, segmentSlug: "ai-infrastructure", coverage: "Marketplaces and brokers for on-demand GPU and compute capacity." },

  // ── 2. AI Models & Intelligence ──
  { slug: "foundation-models-llms", name: "Foundation Models & LLMs", order: 11, segmentSlug: "ai-models-intelligence", coverage: "Frontier large language models and the benchmarks that rank them." },
  { slug: "small-language-models", name: "Small Language Models (SLMs)", order: 12, segmentSlug: "ai-models-intelligence", coverage: "Compact, efficient models for on-device and cost-sensitive use." },
  { slug: "multimodal-ai-models", name: "Multimodal AI Models", order: 13, segmentSlug: "ai-models-intelligence", coverage: "Models that reason across text, images, audio and video." },
  { slug: "ai-image-generation", name: "AI Image Generation", order: 14, segmentSlug: "ai-models-intelligence", coverage: "Text-to-image and image-editing generative models." },
  { slug: "ai-video-generation", name: "AI Video Generation", order: 15, segmentSlug: "ai-models-intelligence", coverage: "Text-to-video and video-editing generative models." },
  { slug: "ai-audio-speech-models", name: "AI Audio & Speech Models", order: 16, segmentSlug: "ai-models-intelligence", coverage: "Speech synthesis, recognition and generative audio models." },
  { slug: "ai-search-retrieval", name: "AI Search & Retrieval", order: 17, segmentSlug: "ai-models-intelligence", coverage: "Vector databases, semantic search and RAG retrieval systems." },
  { slug: "ai-embeddings-reranking", name: "AI Embeddings & Reranking", order: 18, segmentSlug: "ai-models-intelligence", coverage: "Embedding and reranking models that power retrieval quality." },
  { slug: "synthetic-data-generation", name: "Synthetic Data Generation", order: 19, segmentSlug: "ai-models-intelligence", coverage: "Synthetic datasets for training, testing and privacy." },
  { slug: "domain-specific-ai-models", name: "Domain-Specific AI Models", order: 20, segmentSlug: "ai-models-intelligence", coverage: "Models specialised for code, biology, finance, law and more." },

  // ── 3. AI Agents & Automation ──
  { slug: "ai-agent-platforms", name: "AI Agent Platforms", order: 21, segmentSlug: "ai-agents-automation", coverage: "Frameworks and SDKs for building and running autonomous agents." },
  { slug: "ai-agent-memory-context", name: "AI Agent Memory & Context", order: 22, segmentSlug: "ai-agents-automation", coverage: "Memory, context and state layers that make agents persistent." },
  { slug: "ai-agent-identity-access-management", name: "AI Agent Identity & Access Management", order: 23, segmentSlug: "ai-agents-automation", coverage: "Identity, auth and access control for autonomous agents." },
  { slug: "ai-agent-security-governance", name: "AI Agent Security & Governance", order: 24, segmentSlug: "ai-agents-automation", coverage: "Guardrails, policy and oversight for agent behaviour." },
  { slug: "ai-agent-payments-transactions", name: "AI Agent Payments & Transactions", order: 25, segmentSlug: "ai-agents-automation", coverage: "Payment rails and transaction infrastructure for agents." },
  { slug: "ai-workflow-automation", name: "AI Workflow Automation", order: 26, segmentSlug: "ai-agents-automation", coverage: "AI-native workflow builders and process automation." },
  { slug: "browser-computer-use-agents", name: "Browser & Computer Use Agents", order: 27, segmentSlug: "ai-agents-automation", coverage: "Agents that operate browsers and computers like a human." },
  { slug: "multi-agent-collaboration", name: "Multi-Agent Collaboration", order: 28, segmentSlug: "ai-agents-automation", coverage: "Systems that coordinate multiple agents toward a goal." },
  { slug: "ai-personal-assistants", name: "AI Personal Assistants", order: 29, segmentSlug: "ai-agents-automation", coverage: "Consumer and prosumer AI assistants for everyday tasks." },
  { slug: "enterprise-ai-automation", name: "Enterprise AI Automation", order: 30, segmentSlug: "ai-agents-automation", coverage: "AI automation for enterprise sales, ops and back office." },

  // ── 4. AI Developer Ecosystem ──
  { slug: "ai-developer-apis-sdks", name: "AI Developer APIs & SDKs", order: 31, segmentSlug: "ai-developer-ecosystem", coverage: "APIs, SDKs and gateways developers build AI features on." },
  { slug: "ai-code-generation", name: "AI Code Generation", order: 32, segmentSlug: "ai-developer-ecosystem", coverage: "AI coding environments, assistants and agentic IDEs." },
  { slug: "ai-testing-qa", name: "AI Testing & QA", order: 33, segmentSlug: "ai-developer-ecosystem", coverage: "LLM observability, evaluation, tracing and quality assurance." },
  { slug: "ai-model-fine-tuning", name: "AI Model Fine-Tuning", order: 34, segmentSlug: "ai-developer-ecosystem", coverage: "Fine-tuning, adapters and post-training platforms." },
  { slug: "ai-prompt-engineering-management", name: "AI Prompt Engineering & Management", order: 35, segmentSlug: "ai-developer-ecosystem", coverage: "Prompt management, versioning and optimisation tooling." },
  { slug: "ai-deployment-hosting", name: "AI Deployment & Hosting", order: 36, segmentSlug: "ai-developer-ecosystem", coverage: "Model deployment, serving and hosting platforms." },
  { slug: "ai-security-guardrails", name: "AI Security & Guardrails", order: 37, segmentSlug: "ai-developer-ecosystem", coverage: "Input/output guardrails, safety and prompt-injection defence." },
  { slug: "ai-data-annotation-labeling", name: "AI Data Annotation & Labeling", order: 38, segmentSlug: "ai-developer-ecosystem", coverage: "Labeling, annotation and human-in-the-loop data platforms." },
  { slug: "ai-knowledge-management", name: "AI Knowledge Management", order: 39, segmentSlug: "ai-developer-ecosystem", coverage: "AI-native knowledge bases and internal retrieval." },
  { slug: "ai-developer-productivity", name: "AI Developer Productivity", order: 40, segmentSlug: "ai-developer-ecosystem", coverage: "Tooling that speeds up how developers ship with AI." },

  // ── 5. AI Business Applications ──
  { slug: "ai-customer-support", name: "AI Customer Support", order: 41, segmentSlug: "ai-business-applications", coverage: "AI support agents, deflection and voice/chat automation." },
  { slug: "ai-marketing-advertising", name: "AI Marketing & Advertising", order: 42, segmentSlug: "ai-business-applications", coverage: "AI for campaigns, creative, targeting and go-to-market." },
  { slug: "ai-content-creation", name: "AI Content Creation", order: 43, segmentSlug: "ai-business-applications", coverage: "AI writing, design and multimedia content tools." },
  { slug: "ai-seo-geo-aeo", name: "AI Search Engine Optimization (GEO/AEO)", order: 44, segmentSlug: "ai-business-applications", coverage: "Getting discovered and cited by search and AI answer engines." },
  { slug: "ai-finance-accounting", name: "AI Finance & Accounting", order: 45, segmentSlug: "ai-business-applications", coverage: "AI for finance ops, billing, metering and accounting." },
  { slug: "ai-legal-technology", name: "AI Legal Technology", order: 46, segmentSlug: "ai-business-applications", coverage: "AI for contracts, research and legal workflows." },
  { slug: "ai-hr-recruitment", name: "AI HR & Recruitment", order: 47, segmentSlug: "ai-business-applications", coverage: "AI for sourcing, screening and people operations." },
  { slug: "ai-cybersecurity", name: "AI Cybersecurity", order: 48, segmentSlug: "ai-business-applications", coverage: "AI for threat detection, response and security operations." },
  { slug: "ai-education-learning", name: "AI Education & Learning", order: 49, segmentSlug: "ai-business-applications", coverage: "AI tutors, learning platforms and training tools." },
  { slug: "ai-healthcare-operations", name: "AI Healthcare Operations", order: 50, segmentSlug: "ai-business-applications", coverage: "Clinical decision support and healthcare workflow automation." },

  // ── 6. Emerging & Specialized AI ──
  { slug: "ai-robotics", name: "AI Robotics", order: 51, segmentSlug: "emerging-specialized-ai", coverage: "Robotics foundation models, humanoids and embodied AI." },
  { slug: "autonomous-vehicles", name: "Autonomous Vehicles", order: 52, segmentSlug: "emerging-specialized-ai", coverage: "Self-driving stacks, perception and autonomy platforms." },
  { slug: "ai-manufacturing", name: "AI in Manufacturing", order: 53, segmentSlug: "emerging-specialized-ai", coverage: "AI for factories, quality and industrial automation." },
  { slug: "ai-supply-chain-logistics", name: "AI in Supply Chain & Logistics", order: 54, segmentSlug: "emerging-specialized-ai", coverage: "AI for forecasting, routing and logistics optimisation." },
  { slug: "ai-retail-ecommerce", name: "AI in Retail & E-commerce", order: 55, segmentSlug: "emerging-specialized-ai", coverage: "AI for merchandising, search and commerce experiences." },
  { slug: "ai-real-estate", name: "AI in Real Estate", order: 56, segmentSlug: "emerging-specialized-ai", coverage: "AI for property search, valuation and transactions." },
  { slug: "ai-gaming", name: "AI in Gaming", order: 57, segmentSlug: "emerging-specialized-ai", coverage: "AI for game content, NPCs and production." },
  { slug: "ai-in-drug-discovery", name: "AI in Drug Discovery", order: 58, segmentSlug: "emerging-specialized-ai", coverage: "AI for molecular design, biology and therapeutics." },
  { slug: "ai-climate-energy", name: "AI in Climate & Energy", order: 59, segmentSlug: "emerging-specialized-ai", coverage: "AI for grids, climate modelling and energy systems." },
  { slug: "ai-scientific-research", name: "AI for Scientific Research", order: 60, segmentSlug: "emerging-specialized-ai", coverage: "AI accelerating discovery across the sciences." },
];

const pricingTBD =
  "Not independently verified in this research pass, see the official pricing page for current plans.";

const baseProducts: Product[] = [
  {
    slug: "google-cloud-a5x-vera-rubin",
    name: "Google Cloud A5X (Vera Rubin)",
    categorySlug: "ai-cloud-platforms",
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
    categorySlug: "ai-inference-optimization",
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
    categorySlug: "ai-search-retrieval",
    officialUrl: "https://weaviate.io",
    tagline: "Open-source vector database, now Platform & Enterprise",
    shortDescription: "Vector database with new Platform & Enterprise editions.",
    overview:
      "On November 18, 2026 Weaviate announced general availability of its Enterprise and Platform Editions (with v1.40), adding security, scaling and high-availability capabilities such as Shard Self-Recovery, Deduplicated Backups and Namespaces.",
    problemSolved:
      "Production RAG and semantic search need a vector store with enterprise-grade HA, scaling and backup, not just a library.",
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
    categorySlug: "ai-agent-platforms",
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
      "The most significant orchestration advancement in current coverage; note this is a leading current release rather than a dated this-period launch, flagged for editorial verification.",
    sources: [
      { title: "Top 9 AI Agent Frameworks as of November 2026 (Shakudo)", url: "https://www.shakudo.io/blog/top-9-ai-agent-frameworks", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "langfuse",
    name: "Langfuse",
    categorySlug: "ai-testing-qa",
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
    pricing: "MIT-licensed core, free to self-host; hosted tiers available, see official pricing.",
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
    categorySlug: "ai-code-generation",
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
    categorySlug: "multi-agent-collaboration",
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
    categorySlug: "enterprise-ai-automation",
    officialUrl: "https://www.salesforce.com",
    tagline: "Outbound AI sales agent in Slack, Teams & Claude",
    shortDescription: "Outbound AI sales agent that meets reps in chat.",
    overview:
      "Hunter is Salesforce's outbound AI sales agent that meets reps where they work, Slack, Teams and Claude, with a full release planned for November 2026 after a pilot.",
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
      { title: "AI employee for sales, best options in 2026 (Nov 19)", url: "https://resident.com/technology-and-digital-resources/2026/11/19/ai-employee-for-sales-the-7-best-options-in-2026", type: "analysis" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "retell-ai",
    name: "Retell AI",
    categorySlug: "ai-customer-support",
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
    pricing: "Reported ~$0.07–$0.31/min with $10 free credits (vendor-reported, Nov 2026), verify on official pricing.",
    integrations: ["Telephony providers", "LLM & speech providers"],
    alternatives: ["Vapi", "Bland", "ElevenLabs Agents", "Pipecat (OSS)"],
    selectionRationale:
      "Leading voice-agent platform with strong current traction; note the run-rate and benchmark (Tell-1 #1 on Retell's own vCX) are vendor-reported and need independent verification.",
    sources: [
      { title: "Best AI Voice Agents: Retell, Bland, Vapi, ElevenLabs scored", url: "https://wetheflywheel.com/en/guides/best-ai-voice-agents/", type: "analysis" },
      { title: "Retell AI, official", url: "https://www.retellai.com/", type: "official" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "artificial-analysis",
    name: "Artificial Analysis",
    categorySlug: "foundation-models-llms",
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
    pricing: "Public indices are freely accessible, see site for any paid offerings.",
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
    categorySlug: "ai-healthcare-operations",
    officialUrl: "https://www.mayoclinicplatform.org",
    tagline: "AI clinical decision support in the EHR",
    shortDescription: "AI clinical decision support embedded in EHRs.",
    overview:
      "Mayo Clinic Platform launched (Nov 3, 2026) an AI-enabled Clinical Decision Support solution embedded in EHR workflows, a specialty-specific chat across 35+ specialties plus 22 clinical calculators via chat or voice, citing peer-reviewed literature.",
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
    categorySlug: "ai-in-drug-discovery",
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
    pricing: "Not applicable, research company, not a self-serve product.",
    integrations: ["Not publicly disclosed"],
    alternatives: ["Recursion", "Insilico Medicine", "Iambic", "Genesis Therapeutics"],
    selectionRationale:
      "The edition's defining biotech-AI story (Nov 17). Note: funding is a supporting signal, not proof of product/clinical success, flagged for editorial verification.",
    sources: [
      { title: "Isomorphic Labs raises $5B to take candidates to clinical trials (TechCrunch, Nov 17)", url: "https://techcrunch.com/2026/11/17/isomorphic-labs-raises-5b-as-it-looks-to-take-drug-candidates-to-clinical-trials/", type: "news" },
    ],
    lastVerified: "November 20, 2026",
    verification: "verified",
  },
  {
    slug: "lago",
    name: "Lago",
    categorySlug: "ai-finance-accounting",
    officialUrl: "https://www.getlago.com",
    tagline: "Open-source metering and usage-based billing API",
    shortDescription: "Open-source metering and usage-based billing platform.",
    overview:
      "Lago is an open-source, API-first billing platform for usage-based, subscription and hybrid pricing, built for AI, SaaS, fintech and infrastructure companies that need flexible, high-volume billing without vendor lock-in. It handles real-time usage metering across API calls, tokens, compute, storage and custom dimensions, automated invoicing with multi-currency, taxes and credit notes, prepaid credits and wallets, entitlements, and revenue analytics, while staying independent of payment processors.",
    problemSolved:
      "AI and infrastructure products bill on consumption (tokens, requests, compute), but off-the-shelf subscription tools model seats and flat plans poorly, so teams end up building fragile in-house metering and invoicing.",
    howItWorks:
      "Developers send usage events to Lago's API (with idempotency), define pricing, plans, credits and entitlements, and Lago meters consumption in real time, orchestrates payments across providers and generates invoices. It runs as Lago Cloud or self-hosted from the same AGPLv3 codebase (cloud, VPC, on-prem), with REST APIs, SDKs for JS/TS, Python, Ruby and Go, signed webhooks and an MCP server for AI-assisted billing.",
    features: ["Real-time usage metering with idempotency", "Usage-based, subscription, prepaid & hybrid pricing", "Graduated, volume & minimum-commitment models", "Prepaid credits, wallets & entitlements", "Invoicing: multi-currency, taxes, credit notes", "Payment orchestration (processor-independent)", "REST API, SDKs (JS/Python/Ruby/Go), webhooks, MCP", "Open source (AGPLv3), self-hostable or Cloud"],
    useCases: ["Billing AI/LLM usage per token or request", "Usage-based & hybrid SaaS pricing", "Prepaid credit / wallet systems", "High-volume metering for infrastructure"],
    targetAudience: ["AI & infrastructure companies", "SaaS & fintech teams", "Billing & monetization engineers"],
    pricing: "Open-source core (AGPLv3) is free to self-host; Lago Cloud and enterprise tiers available, see official pricing.",
    integrations: ["Stripe", "Adyen", "GoCardless", "Segment", "REST API, SDKs & webhooks"],
    alternatives: ["Metronome", "Orb", "Stripe Billing", "Flexprice"],
    selectionRationale:
      "The standout pick for AI Monetization & Billing: a widely-adopted open-source (AGPLv3) metering and usage-based billing API used by AI and infrastructure companies including CoreWeave, Mistral AI and PayPal. Fact-checked against its official site and GitHub (10.9k stars); core capabilities confirmed, while vendor-reported scale figures (events/sec, invoice volume) remain flagged.",
    sources: [
      { title: "Lago, official site", url: "https://www.getlago.com", type: "official" },
      { title: "getlago/lago on GitHub (AGPLv3, 10.9k stars)", url: "https://github.com/getlago/lago", type: "official" },
    ],
    lastVerified: "November 21, 2026",
    verification: "verified",
  },
];

// ── Intelligence-layer enrichment (per slug) ────────────────────────────────
// Editorial analysis + structured specs grounded in the research evidence
// already attached to each product. Unknown values are omitted or marked
// "Not verified" in the UI, never invented.
const enrichment: Record<string, Partial<Product>> = {
  "google-cloud-a5x-vera-rubin": {
    productType: "GPU cloud instances",
    launchDate: "November 2026 (NVIDIA GTC Berlin)",
    productStatus: "Generally available",
    differentiators: ["NVIDIA Vera Rubin NVL72", "Rack-scale", "Hyperscaler-managed"],
    researchConfidence: "High",
    whyItMatters:
      "A5X brings NVIDIA's newest Vera Rubin generation to a hyperscaler as a GA product, the edition's most consequential signal that frontier-scale compute is becoming routinely provisionable.",
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
      "Opened for general use on Nov 16, a sovereign, in-region inference option with an OpenAI-compatible surface, lowering the switching cost for teams with data-residency needs.",
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
      "Langfuse keeps shipping, this edition's evaluation-engine changes (LLM-as-a-judge targeting observations/experiments) reinforce its lead as the default open-source LLMOps layer.",
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
      "Gemini 4 Neon launched Nov 18 and, running in Antigravity, took the top of the independent Artificial Analysis Coding Agent Index, the edition's clearest coding-capability leap.",
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
      "Launched Nov 17: a lead agent splitting work across up to 16 model-diverse sub-agents, a high-profile step toward consumer-grade coordinated multi-agent systems.",
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
      "Retell's own Tell-1 model and a reported $100M run rate put it among the most-cited voice-agent platforms this edition, strong signal, though the headline metrics are vendor-reported.",
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
      "Two dated releases this edition, Intelligence Index v5 (Nov 18) and an MKA agent benchmark with DeepMind (Nov 17), cement it as a go-to independent evaluation reference.",
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
      "A $5B Series C (Nov 17) to move AI-designed drugs toward clinical trials is the edition's defining biotech-AI event, though funding is a signal, not proof of clinical success.",
    strengths: [
      "Builds on DeepMind's protein-structure breakthroughs",
      "Exceptional capital runway after $5B raise",
      "Pharma partnerships and an internal pipeline",
    ],
    limitations: [
      "Not a self-serve product, no public access",
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
  lago: {
    productType: "Usage-based billing & metering platform",
    launchDate: null,
    productStatus: "Generally available (open source + cloud)",
    differentiators: ["Open source (AGPLv3)", "API-first, high-volume", "Used by CoreWeave, Mistral, PayPal"],
    documentationUrl: "https://docs.getlago.com",
    researchConfidence: "High",
    whyItMatters:
      "As AI and infrastructure products shift to consumption pricing, an open-source, API-first metering and billing layer lets teams ship usage-based, prepaid and hybrid pricing, including per-token and compute usage, without building billing infrastructure or locking into a single vendor.",
    strengths: [
      "Open-source (AGPLv3) and self-hostable, avoids billing-vendor lock-in",
      "Real-time metering, wallets, entitlements and invoicing in one API-first platform",
      "Proven adoption: used by CoreWeave, Mistral AI, PayPal, Groq and Synthesia",
    ],
    limitations: [
      "Headline scale figures (events/sec, invoice volume) are vendor-reported, not independently verified",
      "Self-hosting at high volume still requires billing and infra expertise",
    ],
    whoShouldUse: [
      "AI and infrastructure teams billing per token, request or compute",
      "SaaS and fintech teams wanting an open, self-hostable billing API",
    ],
    notSuitableWhen: ["Teams needing only simple flat-rate subscriptions (a basic subscription tool suffices)"],
    specs: [{ label: "License", value: "AGPLv3 (core)" }, { label: "Hosting", value: "Cloud or self-host" }],
    benchmarks: [
      { label: "Metering throughput", value: "Up to 1M billing events/sec (vendor-reported)", kind: "vendor" },
      { label: "Invoices processed", value: "~$829M/month (vendor-reported)", kind: "vendor" },
    ],
    compare: [
      { name: "Metronome", positioning: "Enterprise usage-based billing", whenPreferable: "For large-scale, high-volume metering with enterprise support." },
      { name: "Orb", positioning: "Developer-first usage billing", whenPreferable: "For a polished, fully-managed usage-based billing product." },
      { name: "Flexprice", positioning: "Open-source AI-native billing", whenPreferable: "For a younger, AI-first open-source alternative to compare." },
    ],
  },

  // ════════ Curated-tool deep profiles (researched Nov 2026) ════════
  // Descriptive facts verified against each product's own site and credible
  // third-party coverage. Pricing/benchmarks are labelled, never invented.

  // ── AI Infrastructure & Cloud ──
  "nvidia-run-ai": {
    productType: "GPU orchestration platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "GPU time is the scarcest resource in AI; Run:ai pools and schedules it so expensive accelerators sit idle far less often.",
    differentiators: ["Kubernetes-native GPU scheduling", "Fractional GPU sharing", "Now part of NVIDIA's software stack"],
    features: ["GPU pooling and fractional allocation", "Workload-aware scheduling and quotas", "Multi-team governance and visibility", "Works across training, fine-tuning and inference"],
    useCases: ["Maximising shared GPU cluster utilisation", "Prioritising training vs inference workloads", "Governing GPU access across teams"],
    targetAudience: ["ML platform teams", "Enterprises with GPU clusters", "AI infrastructure teams"],
    strengths: ["Strong Kubernetes integration", "Backed and distributed by NVIDIA", "Mature quota and governance model"],
    limitations: ["Most valuable at cluster scale, not single-GPU", "Kubernetes operational overhead"],
    whoShouldUse: ["Teams running shared GPU clusters on Kubernetes", "Orgs where GPU contention is a bottleneck"],
    notSuitableWhen: ["You run a single GPU or fully managed serverless inference"],
    integrations: ["Kubernetes", "NVIDIA GPU Operator", "PyTorch / TensorFlow"],
    sources: [{ title: "NVIDIA Run:ai", url: "https://www.nvidia.com/en-us/software/run-ai/", type: "official" }, { title: "Spheron: AI Infrastructure Companies 2026", url: "https://www.spheron.network/blog/ai-infrastructure-companies-2026/", type: "analysis" }],
  },
  "deepspeed": {
    productType: "Distributed training library", productStatus: "Generally available (open-source)", verification: "verified", lastVerified: "November 2026",
    pricing: "Open-source (Apache-2.0), free to use; you pay only for your own compute.",
    whyItMatters: "Training frontier-scale models is impossible on one GPU; DeepSpeed's ZeRO lets teams train models far larger than a single device's memory.",
    differentiators: ["ZeRO memory optimisation", "Proven at trillion-parameter scale", "Microsoft-backed, widely adopted"],
    features: ["ZeRO stages 1–3 memory optimisation", "3D parallelism (data/tensor/pipeline)", "Mixed-precision and offload", "Inference optimisations"],
    useCases: ["Training very large language models", "Scaling runs across many GPUs", "Reducing training memory footprint"],
    targetAudience: ["ML research teams", "Model builders", "Infrastructure engineers"],
    strengths: ["Battle-tested at extreme scale", "Open-source and free", "Deep PyTorch integration"],
    limitations: ["Steep learning curve", "Config complexity for 3D parallelism"],
    whoShouldUse: ["Teams training models too large for one GPU"],
    notSuitableWhen: ["You only run inference or small-model fine-tunes"],
    integrations: ["PyTorch", "Hugging Face", "Megatron-LM"],
    sources: [{ title: "DeepSpeed", url: "https://www.deepspeed.ai", type: "official" }, { title: "DeepSpeed (GitHub)", url: "https://github.com/deepspeedai/DeepSpeed", type: "official" }],
  },
  "unsloth": {
    productType: "Fine-tuning & quantization library", productStatus: "Generally available (open-source)", verification: "verified", lastVerified: "November 2026",
    pricing: "Open-source (Apache-2.0), free to self-host; paid managed options exist, see official pricing.",
    whyItMatters: "Makes fine-tuning and quantizing open models dramatically faster and cheaper on a single GPU, lowering the barrier to custom models.",
    differentiators: ["Large speed/memory gains on a single GPU", "Popular GGUF/quantization exports", "Open-source with an active community"],
    features: ["Faster LoRA/QLoRA fine-tuning", "Reduced VRAM usage", "Quantization and GGUF export", "Supports popular open models"],
    useCases: ["Fine-tuning open LLMs on one GPU", "Producing quantized models for local inference", "Cost-efficient experimentation"],
    targetAudience: ["Indie developers", "ML engineers", "Researchers on limited hardware"],
    strengths: ["Excellent single-GPU efficiency", "Free and open-source", "Active community and docs"],
    limitations: ["Focused on open models, not closed APIs", "Single-GPU emphasis"],
    whoShouldUse: ["Developers fine-tuning open models on modest hardware"],
    notSuitableWhen: ["You need managed large-cluster training"],
    integrations: ["Hugging Face", "PyTorch", "llama.cpp (GGUF)"],
    sources: [{ title: "Unsloth", url: "https://unsloth.ai", type: "official" }, { title: "Unsloth (GitHub)", url: "https://github.com/unslothai/unsloth", type: "official" }],
  },
  "llama-cpp": {
    productType: "Local inference engine", productStatus: "Generally available (open-source)", verification: "verified", lastVerified: "November 2026",
    pricing: "Open-source (MIT), free to use.",
    whyItMatters: "It made running capable LLMs on ordinary laptops and edge hardware practical, and its GGUF format is now a de-facto standard.",
    differentiators: ["CPU-first, runs almost anywhere", "GGUF format standard", "Powers much of the local-LLM ecosystem"],
    features: ["Efficient CPU/GPU inference", "Quantized GGUF model support", "Broad hardware support", "Lightweight C/C++ core"],
    useCases: ["Running LLMs locally or offline", "Edge and on-device inference", "Privacy-preserving local AI"],
    targetAudience: ["Developers", "Hobbyists", "Edge/embedded engineers"],
    strengths: ["Runs on modest hardware", "Huge ecosystem (Ollama, LM Studio build on it)", "MIT-licensed"],
    limitations: ["Lower throughput than datacentre GPU servers", "Lower-level than turnkey apps"],
    whoShouldUse: ["Anyone running models locally or at the edge"],
    notSuitableWhen: ["You need high-concurrency cloud serving"],
    integrations: ["GGUF models", "Ollama", "LM Studio"],
    sources: [{ title: "llama.cpp (GitHub)", url: "https://github.com/ggml-org/llama.cpp", type: "official" }, { title: "InfoWorld: Edge AI 2026", url: "https://www.infoworld.com/article/4117620/edge-ai-the-future-of-ai-inference-is-smarter-local-compute.html", type: "analysis" }],
  },
  "nvidia-spectrum-x": {
    productType: "AI networking fabric", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "At cluster scale, the network, not the GPU, is often the bottleneck; Spectrum-X targets the throughput large AI jobs need.",
    differentiators: ["Ethernet fabric tuned for AI", "Integrated with NVLink and NVIDIA stack", "Designed for large GPU clusters"],
    features: ["High-bandwidth, low-latency networking", "Congestion control for AI traffic", "Tight NVIDIA GPU integration", "Scales to large clusters"],
    useCases: ["Interconnecting large GPU clusters", "Reducing training communication overhead", "Scaling distributed inference"],
    targetAudience: ["Cloud providers", "Large enterprises", "AI infrastructure teams"],
    strengths: ["Purpose-built for AI workloads", "Backed by NVIDIA's ecosystem", "Proven at hyperscale"],
    limitations: ["Relevant mainly at large scale", "Vendor-aligned hardware stack"],
    whoShouldUse: ["Operators building large GPU clusters"],
    notSuitableWhen: ["Small deployments or single-node setups"],
    integrations: ["NVLink", "NVIDIA GPUs", "InfiniBand (adjacent)"],
    sources: [{ title: "NVIDIA Networking", url: "https://www.nvidia.com/en-us/networking/", type: "official" }],
  },
  "vast-data": {
    productType: "AI data platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "AI training and inference are starved by slow storage; VAST's high-bandwidth data layer keeps GPUs fed.",
    differentiators: ["Disaggregated shared-everything architecture", "Unified storage + data layer", "Used by large AI clouds"],
    features: ["High-bandwidth parallel storage", "Unified file/object/data access", "Scales to very large datasets", "Data layer for AI pipelines"],
    useCases: ["Feeding GPU clusters at scale", "Storing large training datasets", "Serving data to inference pipelines"],
    targetAudience: ["AI clouds", "Enterprises", "HPC teams"],
    strengths: ["High throughput for AI", "Scales massively", "Adopted by major AI infrastructure players"],
    limitations: ["Enterprise-scale focus", "Not for small projects"],
    whoShouldUse: ["Orgs whose GPUs are bottlenecked by storage I/O"],
    notSuitableWhen: ["Small-scale or hobby workloads"],
    integrations: ["GPU clusters", "Kubernetes", "S3-compatible access"],
    sources: [{ title: "VAST Data", url: "https://www.vastdata.com", type: "official" }],
  },
  "cerebras": {
    productType: "AI accelerator & inference cloud", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Its wafer-scale design offers an alternative to GPU clusters, and its inference cloud is known for very high token throughput.",
    differentiators: ["Wafer-scale engine (single giant chip)", "Very high inference speed", "GPU alternative for training and inference"],
    features: ["Wafer-scale compute", "High-throughput inference API", "Large-model training support", "Cloud and on-prem options"],
    useCases: ["Fast LLM inference", "Large-model training", "Latency-sensitive AI serving"],
    targetAudience: ["AI labs", "Enterprises", "Inference-heavy products"],
    strengths: ["Distinctive architecture", "Strong inference throughput", "Full-stack offering"],
    limitations: ["Ecosystem smaller than NVIDIA's", "Specialised hardware"],
    whoShouldUse: ["Teams wanting a GPU alternative or very fast inference"],
    notSuitableWhen: ["You are standardised on the CUDA/GPU ecosystem"],
    integrations: ["Standard ML frameworks", "Cloud APIs"],
    sources: [{ title: "Cerebras", url: "https://www.cerebras.ai", type: "official" }],
  },
  "vast-ai": {
    productType: "GPU rental marketplace", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "It opens up far cheaper GPU access than hyperscalers by matching buyers with a wide supply of providers.",
    differentiators: ["Open GPU marketplace model", "Often much cheaper than hyperscalers", "Wide range of GPU types"],
    features: ["On-demand GPU rental", "Spot/interruptible pricing", "Docker-based workloads", "Broad GPU selection"],
    useCases: ["Cost-efficient training and fine-tuning", "Batch inference", "Experimentation on a budget"],
    targetAudience: ["Indie developers", "Startups", "Researchers"],
    strengths: ["Low cost", "Flexible supply", "Quick to start"],
    limitations: ["Variable reliability across providers", "Less enterprise tooling than clouds"],
    whoShouldUse: ["Cost-sensitive teams needing on-demand GPUs"],
    notSuitableWhen: ["You need enterprise SLAs and compliance guarantees"],
    integrations: ["Docker", "PyTorch", "Jupyter"],
    sources: [{ title: "Vast.ai", url: "https://vast.ai", type: "official" }],
  },

  // ── AI Models & Intelligence ──
  "microsoft-phi": {
    productType: "Small language model family", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Phi showed that small, well-trained models can rival far larger ones on reasoning, enabling cheaper and on-device AI.",
    differentiators: ["Strong reasoning at small size", "Open weights", "Backed by Microsoft research"],
    features: ["Compact model sizes", "Strong reasoning/benchmarks for size", "Open weights for self-hosting", "Azure availability"],
    useCases: ["On-device and edge AI", "Cost-sensitive inference", "Fine-tuning for narrow tasks"],
    targetAudience: ["Developers", "Enterprises", "Edge AI teams"],
    strengths: ["Excellent quality-per-parameter", "Open and flexible", "Microsoft ecosystem support"],
    limitations: ["Not frontier-level on hardest tasks", "Smaller context than frontier models"],
    whoShouldUse: ["Teams needing capable models at low cost or on-device"],
    notSuitableWhen: ["You need absolute frontier reasoning or huge context"],
    integrations: ["Azure AI", "Hugging Face", "ONNX"],
    sources: [{ title: "Microsoft Phi", url: "https://azure.microsoft.com/en-us/products/phi", type: "official" }],
  },
  "google-gemini": {
    productType: "Multimodal foundation model", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Consumer: Google AI Plus $4.99/mo, AI Pro $19.99/mo, AI Ultra $99.99–$199.99/mo. API (Gemini 3.1 Pro): ≈$2 input / $12 output per 1M tokens, cheaper Flash tiers. Vendor-reported, Nov 2026.",
    specs: [{ label: "Consumer entry", value: "$4.99/mo (AI Plus)" }, { label: "API (Pro)", value: "≈$2/$12 per 1M tokens" }],
    whyItMatters: "Gemini is among the leading multimodal models, especially strong on long context and video understanding.",
    differentiators: ["Native multimodality (text/image/audio/video)", "Very long context windows", "Deep Google ecosystem integration"],
    features: ["Multimodal reasoning", "Long-context processing", "Strong video understanding", "API and Workspace integration"],
    useCases: ["Multimodal analysis", "Long-document and video summarisation", "Assistant and agent backends"],
    targetAudience: ["Developers", "Enterprises", "Product teams"],
    strengths: ["Leading multimodal and long-context performance", "Robust ecosystem", "Frequent model updates"],
    limitations: ["Closed weights", "Usage costs at scale"],
    whoShouldUse: ["Teams needing strong multimodal or long-context AI"],
    notSuitableWhen: ["You require fully open, self-hosted weights"],
    integrations: ["Google Cloud / Vertex AI", "Workspace", "AI Studio"],
    sources: [{ title: "Google Gemini", url: "https://deepmind.google/technologies/gemini/", type: "official" }, { title: "Pluralsight: Best AI models 2026", url: "https://www.pluralsight.com/resources/blog/ai-and-data/best-ai-models-2026-list", type: "analysis" }],
  },
  "midjourney": {
    productType: "Text-to-image model", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Basic $10/mo, Standard $30/mo, Pro $60/mo, Mega $120/mo (≈20% off annual); no free tier. Plans differ by Fast GPU hours. Vendor-reported, Nov 2026.",
    specs: [{ label: "Entry price", value: "$10/mo (Basic)" }, { label: "Free tier", value: "None" }],
    whyItMatters: "Midjourney set the bar for aesthetic quality in generative images and remains a go-to for creative work.",
    differentiators: ["Distinctive artistic quality", "Strong style control", "Large creative community"],
    features: ["High-quality text-to-image", "Style and aspect controls", "Image variations and upscaling", "Web and Discord access"],
    useCases: ["Concept art and moodboards", "Marketing and social visuals", "Design exploration"],
    targetAudience: ["Designers", "Marketers", "Creators"],
    strengths: ["Best-in-class aesthetics", "Fast iteration", "Active community"],
    limitations: ["Subscription required", "Less precise than some tools for text-in-image"],
    whoShouldUse: ["Creatives who prioritise image quality and style"],
    notSuitableWhen: ["You need fully open-source or on-prem generation"],
    integrations: ["Web app", "Discord"],
    sources: [{ title: "Midjourney", url: "https://www.midjourney.com", type: "official" }],
  },
  "runway": {
    productType: "Generative video platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Free (limited credits); Standard $15/mo (625 credits); Pro $35/mo; Max $95/mo (adds Explore unlimited at relaxed queue). Vendor-reported, Nov 2026.",
    specs: [{ label: "Entry price", value: "$15/mo (Standard)" }, { label: "Billing", value: "Credit-based" }],
    whyItMatters: "Runway helped pioneer production-grade AI video and is widely used across film, ads and social content.",
    differentiators: ["Pioneer in AI video", "Creative editing suite beyond generation", "Used in professional production"],
    features: ["Text/image-to-video", "AI video editing tools", "Motion and camera controls", "Collaboration features"],
    useCases: ["Short-form and social video", "Previsualisation and VFX", "Advertising creative"],
    targetAudience: ["Filmmakers", "Marketers", "Creators"],
    strengths: ["Strong creative toolset", "Professional adoption", "Rapid model iteration"],
    limitations: ["Credit-based costs add up", "Clip length and consistency limits"],
    whoShouldUse: ["Creative teams producing AI-assisted video"],
    notSuitableWhen: ["You need long, perfectly consistent footage"],
    integrations: ["Web app", "API"],
    sources: [{ title: "Runway", url: "https://runwayml.com", type: "official" }],
  },
  "elevenlabs": {
    productType: "Voice & speech AI", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Free (10k credits); Starter $6/mo; Creator $22/mo; Pro $99/mo; Scale $299/mo; Business $990/mo (≈17% off annual). Vendor-reported, Nov 2026.",
    specs: [{ label: "Entry price", value: "$6/mo (Starter)" }, { label: "Free tier", value: "Yes (10k credits)" }],
    whyItMatters: "ElevenLabs set a new quality bar for AI speech and powers much of the voice-agent and dubbing ecosystem.",
    differentiators: ["Highly natural speech synthesis", "Voice cloning", "Broad language coverage"],
    features: ["Text-to-speech", "Voice cloning and design", "Dubbing and multilingual audio", "Low-latency streaming API"],
    useCases: ["Voice agents and IVR", "Narration and audiobooks", "Dubbing and localisation"],
    targetAudience: ["Developers", "Media teams", "Product builders"],
    strengths: ["Leading voice quality", "Rich API", "Wide language support"],
    limitations: ["Usage-based costs", "Voice-cloning requires consent/governance"],
    whoShouldUse: ["Teams adding natural voice to products or content"],
    notSuitableWhen: ["You need fully offline, on-device TTS"],
    integrations: ["REST API", "SDKs", "Agent frameworks"],
    sources: [{ title: "ElevenLabs", url: "https://elevenlabs.io", type: "official" }],
  },
  "cohere": {
    productType: "Enterprise embedding & rerank models", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Retrieval quality makes or breaks RAG; Cohere's Embed and Rerank models are among the strongest for enterprise search.",
    differentiators: ["Leading rerank models", "Enterprise/privacy focus", "Deployable in your own cloud"],
    features: ["Embedding models", "Rerank models", "Multilingual support", "Private/VPC deployment"],
    useCases: ["RAG retrieval quality", "Enterprise semantic search", "Document ranking"],
    targetAudience: ["Enterprises", "Platform teams", "RAG builders"],
    strengths: ["Strong retrieval quality", "Enterprise deployment options", "Multilingual"],
    limitations: ["Enterprise orientation over hobbyists", "Usage costs at scale"],
    whoShouldUse: ["Teams building serious RAG/search needing retrieval quality"],
    notSuitableWhen: ["A simple single-model API already suffices"],
    integrations: ["LangChain", "Vector databases", "Major clouds"],
    sources: [{ title: "Cohere", url: "https://cohere.com", type: "official" }],
  },
  "mostly-ai": {
    productType: "Synthetic data platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Synthetic data lets teams build and test on realistic data without exposing real records, easing privacy and access constraints.",
    differentiators: ["High-fidelity tabular synthetic data", "Privacy-preserving by design", "Open-source SDK available"],
    features: ["Generate realistic tabular data", "Privacy and bias controls", "Quality/accuracy reporting", "SDK and platform"],
    useCases: ["Safe data sharing and testing", "Augmenting scarce data", "Privacy-compliant analytics"],
    targetAudience: ["Data teams", "Regulated enterprises", "ML engineers"],
    strengths: ["Strong fidelity and privacy", "Open-source option", "Enterprise governance"],
    limitations: ["Tabular focus", "Fidelity varies with source complexity"],
    whoShouldUse: ["Teams blocked by data access or privacy constraints"],
    notSuitableWhen: ["You need unstructured media synthesis"],
    integrations: ["Python SDK", "Databases", "Cloud warehouses"],
    sources: [{ title: "MOSTLY AI", url: "https://mostly.ai", type: "official" }],
  },
  "writer-palmyra": {
    productType: "Enterprise AI platform & domain models", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Writer's Palmyra models and platform target regulated enterprise use where accuracy, governance and domain fit matter most.",
    differentiators: ["Domain-specific Palmyra models", "Full enterprise platform (not just a model)", "Governance and compliance focus"],
    features: ["Domain models (finance, healthcare, etc.)", "Secure enterprise deployment", "Workflows and agents", "Governance controls"],
    useCases: ["Regulated-industry content and analysis", "Enterprise knowledge workflows", "Compliant generative AI"],
    targetAudience: ["Large enterprises", "Regulated industries", "Enterprise IT"],
    strengths: ["Enterprise-grade governance", "Domain specialisation", "End-to-end platform"],
    limitations: ["Enterprise pricing and scope", "Overkill for simple needs"],
    whoShouldUse: ["Enterprises needing governed, domain-tuned generative AI"],
    notSuitableWhen: ["You just need a general chatbot or API"],
    integrations: ["Enterprise apps", "APIs", "SSO"],
    sources: [{ title: "Writer", url: "https://writer.com", type: "official" }],
  },

  // ── AI Agents & Automation ──
  "mem0": {
    productType: "Agent memory layer", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Agents without memory repeat themselves and forget users; Mem0 gives them persistent, personalised recall across sessions.",
    differentiators: ["Purpose-built agent memory", "Adopted across popular agent SDKs", "Open-source core"],
    features: ["Long-term and short-term memory", "Personalisation per user", "Memory search and retrieval", "SDKs and hosted option"],
    useCases: ["Personalised assistants", "Multi-session agents", "Context retention across tools"],
    targetAudience: ["Agent developers", "AI product teams"],
    strengths: ["Focused, well-adopted", "Open-source option", "Simple integration"],
    limitations: ["Young category, evolving APIs", "Memory governance is the developer's job"],
    whoShouldUse: ["Developers building agents that must remember users"],
    notSuitableWhen: ["Stateless, single-shot prompts"],
    integrations: ["OpenAI/Anthropic SDKs", "LangChain", "Vector databases"],
    sources: [{ title: "Mem0", url: "https://mem0.ai", type: "official" }, { title: "Mem0 (GitHub)", url: "https://github.com/mem0ai/mem0", type: "official" }],
  },
  "auth0-ai": {
    productType: "Identity & access for agents", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "As agents act on users' behalf, they need verifiable identity and scoped permissions; Auth0 brings mature IAM to the agent era.",
    differentiators: ["Mature, widely-trusted IAM", "Fine-grained authorization", "Agent-specific tooling (Auth0 for AI Agents)"],
    features: ["Token issuance and auth", "Fine-grained authorization", "Delegated/scoped access for agents", "Standards-based (OAuth/OIDC)"],
    useCases: ["Giving agents scoped access to APIs", "Human-in-the-loop approvals", "Securing agent actions"],
    targetAudience: ["Developers", "Enterprise security teams"],
    strengths: ["Trusted IAM foundation", "Strong standards support", "Enterprise-ready"],
    limitations: ["Agent features are newer", "IAM complexity for small teams"],
    whoShouldUse: ["Teams letting agents access protected resources"],
    notSuitableWhen: ["A toy project with no real auth needs"],
    integrations: ["OAuth/OIDC", "Okta ecosystem", "APIs"],
    sources: [{ title: "Auth0 for AI Agents", url: "https://auth0.com/ai", type: "official" }],
  },
  "lasso-security": {
    productType: "Agent & LLM security", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "LLM and agent apps open new attack surfaces (prompt injection, data leakage); Lasso focuses on securing them at runtime.",
    differentiators: ["Dedicated GenAI/agent security", "Runtime monitoring and guardrails", "Threat visibility for LLM apps"],
    features: ["Prompt-injection defence", "Sensitive-data protection", "Runtime monitoring and alerts", "Policy enforcement"],
    useCases: ["Securing LLM/agent applications", "Preventing data leakage", "Governance and audit"],
    targetAudience: ["Security teams", "AI platform teams"],
    strengths: ["Focused on a real emerging risk", "Runtime protection", "Visibility and policy"],
    limitations: ["Young, fast-moving category", "Adds a layer to operate"],
    whoShouldUse: ["Teams shipping LLM/agent apps that handle sensitive data"],
    notSuitableWhen: ["Internal, low-risk prototypes"],
    integrations: ["LLM gateways", "Agent frameworks", "SIEM"],
    sources: [{ title: "Lasso Security", url: "https://www.lasso.security", type: "official" }, { title: "Lasso: Agentic AI tools 2026", url: "https://www.lasso.security/blog/agentic-ai-tools", type: "analysis" }],
  },
  "skyfire": {
    productType: "Agent payments infrastructure", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "For agents to transact autonomously, they need identity, spend limits and settlement; Skyfire builds that payment rail.",
    differentiators: ["Agent-native payments", "Identity and spend controls", "Early mover in agentic commerce"],
    features: ["Programmatic agent payments", "Spend limits and controls", "Identity for transactions", "Developer APIs"],
    useCases: ["Agents paying for APIs/services", "Machine-to-machine commerce", "Metered agent spend"],
    targetAudience: ["Agent developers", "AI commerce builders"],
    strengths: ["Addresses a real emerging need", "Built-in controls", "Developer-focused"],
    limitations: ["Very new category", "Ecosystem still forming"],
    whoShouldUse: ["Builders giving agents the ability to pay for things"],
    notSuitableWhen: ["Your agents never transact"],
    integrations: ["Agent frameworks", "Payment providers", "APIs"],
    sources: [{ title: "Skyfire", url: "https://www.skyfire.xyz", type: "official" }],
  },
  "n8n": {
    productType: "Workflow automation platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Source-available (fair-code), free to self-host; Cloud Starter ≈€24/mo (≈€20 annual, 2,500 executions); Pro and Enterprise tiers above. Vendor-reported, Nov 2026.",
    specs: [{ label: "Self-host", value: "Free (source-available)" }, { label: "Cloud entry", value: "≈€24/mo (Starter)" }],
    whyItMatters: "n8n combines no-code automation with real extensibility and AI/agent nodes, and can be self-hosted for data control.",
    differentiators: ["Self-hostable, source-available", "AI/agent nodes built in", "Code when you need it, no-code when you don't"],
    features: ["Visual workflow builder", "400+ integrations", "AI and agent nodes", "Self-host or cloud"],
    useCases: ["Automating app workflows", "Building AI agent pipelines", "Internal tooling and glue code"],
    targetAudience: ["Developers", "Ops teams", "Technical founders"],
    strengths: ["Flexible and extensible", "Self-hosting option", "Strong AI support"],
    limitations: ["Steeper than pure no-code tools", "Self-hosting needs ops"],
    whoShouldUse: ["Teams wanting automation they can self-host and extend"],
    notSuitableWhen: ["You want the simplest possible no-code tool"],
    integrations: ["400+ apps", "LLM providers", "Webhooks/APIs"],
    sources: [{ title: "n8n", url: "https://n8n.io", type: "official" }],
  },
  "browser-use": {
    productType: "Browser-use agent framework", productStatus: "Generally available (open-source)", verification: "verified", lastVerified: "November 2026",
    pricing: "Open-source (MIT) harness, free to self-host; paid cloud browsers available, see official pricing.",
    whyItMatters: "It became one of the fastest-growing ways to let AI agents actually operate the web like a person.",
    differentiators: ["Fast-growing open-source project", "Agents drive a real browser", "Cloud and self-host options"],
    features: ["LLM-driven browser automation", "Open-source harness", "Stealth cloud browsers", "Works with major LLMs"],
    useCases: ["Automating web tasks", "Scraping and form-filling", "Agentic web workflows"],
    targetAudience: ["Developers", "Automation builders"],
    strengths: ["Open-source and popular", "Flexible model support", "Active development"],
    limitations: ["Web automation is inherently brittle", "Needs guardrails for safety"],
    whoShouldUse: ["Developers building agents that use websites"],
    notSuitableWhen: ["A stable public API already exists for the task"],
    integrations: ["OpenAI/Anthropic/Gemini", "Playwright/Chrome", "Python"],
    sources: [{ title: "Browser Use", url: "https://browser-use.com", type: "official" }, { title: "Browser Use (GitHub)", url: "https://github.com/browser-use/browser-use", type: "official" }],
  },
  "chatgpt": {
    productType: "AI assistant", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Free; Go $8/mo; Plus $20/mo; Pro from $100/mo; Business $25/user/mo (≈$20 annual). API billed per token. Vendor-reported, Nov 2026. Verify on the official pricing page.",
    specs: [{ label: "Pricing model", value: "Freemium + subscription + API" }, { label: "Plus price", value: "$20/mo (vendor-reported)" }],
    whyItMatters: "ChatGPT is the most widely used AI assistant and, for many people, the default interface to AI.",
    differentiators: ["Largest user base and ecosystem", "Strong general reasoning", "Rich app and integration surface"],
    features: ["Conversational assistant", "Web browsing and tools", "Voice and image input", "Custom GPTs and apps"],
    useCases: ["Research and writing", "Coding help", "Everyday knowledge tasks"],
    targetAudience: ["Consumers", "Professionals", "Developers"],
    strengths: ["Capable and versatile", "Huge ecosystem", "Frequent updates"],
    limitations: ["Closed model", "Costs for heavy/API use"],
    whoShouldUse: ["Almost anyone wanting a general AI assistant"],
    notSuitableWhen: ["You require open, self-hosted models"],
    integrations: ["Web/mobile/desktop", "API", "Third-party apps"],
    sources: [{ title: "ChatGPT", url: "https://chatgpt.com", type: "official" }],
  },

  // ── AI Developer Ecosystem ──
  "openrouter": {
    productType: "Unified LLM API", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "One endpoint for hundreds of models lets teams switch providers, add fallbacks and control cost without rewrites.",
    differentiators: ["Single API across many providers", "Automatic fallbacks and routing", "Transparent per-model pricing"],
    features: ["Unified API for hundreds of models", "Fallbacks and load balancing", "Usage and cost tracking", "Model marketplace"],
    useCases: ["Multi-model apps", "Provider failover", "Cost optimisation across models"],
    targetAudience: ["Developers", "AI product teams"],
    strengths: ["Breadth of models", "Easy switching", "Good cost controls"],
    limitations: ["Adds a routing dependency", "Advanced provider features may lag"],
    whoShouldUse: ["Teams using multiple LLMs or wanting portability"],
    notSuitableWhen: ["You're committed to a single provider's deep features"],
    integrations: ["OpenAI-compatible API", "SDKs", "LangChain"],
    sources: [{ title: "OpenRouter", url: "https://openrouter.ai", type: "official" }],
  },
  "together-ai": {
    productType: "Inference & fine-tuning cloud", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Together makes running and fine-tuning open models at scale straightforward, a key piece of the open-model stack.",
    differentiators: ["Open-model inference + fine-tuning", "Fast serverless endpoints", "Dedicated and custom deployments"],
    features: ["Serverless inference", "Fine-tuning on your data", "Dedicated endpoints", "Broad open-model catalogue"],
    useCases: ["Serving open models", "Fine-tuning for custom tasks", "Scaling inference"],
    targetAudience: ["Developers", "ML teams", "Startups"],
    strengths: ["Strong open-model support", "Good performance", "Flexible deployment"],
    limitations: ["Usage costs at scale", "Open-model focus (not closed APIs)"],
    whoShouldUse: ["Teams building on open models who need scale"],
    notSuitableWhen: ["You only use closed-model APIs"],
    integrations: ["OpenAI-compatible API", "Hugging Face", "SDKs"],
    sources: [{ title: "Together AI", url: "https://www.together.ai", type: "official" }],
  },
  "promptlayer": {
    productType: "Prompt management platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Prompts are production assets; PromptLayer brings versioning, testing and collaboration so teams manage them like code.",
    differentiators: ["Prompt versioning and registry", "Evals and A/B testing", "Non-engineer friendly editing"],
    features: ["Prompt versioning", "Evaluation and testing", "Usage logging and analytics", "Team collaboration"],
    useCases: ["Managing prompts across a team", "A/B testing prompts", "Tracking prompt performance"],
    targetAudience: ["AI product teams", "PMs", "Developers"],
    strengths: ["Good versioning/collaboration", "Eval tooling", "Approachable UI"],
    limitations: ["Another system to adopt", "Overlaps with observability tools"],
    whoShouldUse: ["Teams iterating heavily on prompts"],
    notSuitableWhen: ["A single static prompt is all you have"],
    integrations: ["OpenAI/Anthropic", "LangChain", "REST API"],
    sources: [{ title: "PromptLayer", url: "https://www.promptlayer.com", type: "official" }],
  },
  "replicate": {
    productType: "Model hosting & deployment", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Pay-per-use, no subscription: per-second GPU (e.g. ≈$0.001525/s on H100) or per-output (e.g. FLUX Schnell ≈$0.003/image). Vendor-reported, Nov 2026.",
    specs: [{ label: "Billing", value: "Per-second / per-output" }, { label: "Subscription", value: "None" }],
    whyItMatters: "Replicate turns open-source and custom models into production APIs with almost no infra work, speeding up shipping.",
    differentiators: ["Run models with one API call", "Huge community model catalogue", "Cog packaging for custom models"],
    features: ["API access to thousands of models", "Custom model deployment (Cog)", "Autoscaling", "Pay-per-use"],
    useCases: ["Shipping AI features fast", "Deploying custom models", "Batch and on-demand inference"],
    targetAudience: ["Developers", "Startups", "Product teams"],
    strengths: ["Very easy to use", "Large model library", "No infra management"],
    limitations: ["Per-second costs add up", "Less control than self-hosting"],
    whoShouldUse: ["Developers who want models as simple APIs"],
    notSuitableWhen: ["You need full control over serving infrastructure"],
    integrations: ["REST API", "Client SDKs", "Cog"],
    sources: [{ title: "Replicate", url: "https://replicate.com", type: "official" }],
  },
  "lakera": {
    productType: "AI guardrails & security", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Guardrails are essential before shipping GenAI; Lakera defends against prompt injection and unsafe output in real time.",
    differentiators: ["Real-time GenAI guardrails", "Prompt-injection focus", "Known for its security research"],
    features: ["Prompt-injection detection", "Content and PII filtering", "Low-latency API", "Policy controls"],
    useCases: ["Securing LLM apps", "Blocking unsafe input/output", "Compliance guardrails"],
    targetAudience: ["Developers", "Security teams"],
    strengths: ["Strong security focus", "Fast integration", "Research-led"],
    limitations: ["Adds a call in the hot path", "No guardrail is perfect"],
    whoShouldUse: ["Teams shipping public-facing LLM apps"],
    notSuitableWhen: ["Internal low-risk tools only"],
    integrations: ["LLM gateways", "APIs", "Agent frameworks"],
    sources: [{ title: "Lakera", url: "https://www.lakera.ai", type: "official" }],
  },
  "scale-ai": {
    productType: "Data labeling & evaluation", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Model quality depends on data quality; Scale is a leading provider of labeled data and model evaluation at scale.",
    differentiators: ["Enterprise-scale data operations", "Human-in-the-loop quality", "Evaluation offerings"],
    features: ["Data labeling and annotation", "RLHF and preference data", "Model evaluation", "Managed workforce + tooling"],
    useCases: ["Training-data labeling", "Fine-tuning and RLHF data", "Model evaluation"],
    targetAudience: ["AI labs", "Enterprises", "Autonomy/ML teams"],
    strengths: ["Scale and quality", "Full-service", "Enterprise trust"],
    limitations: ["Enterprise pricing", "Overkill for small datasets"],
    whoShouldUse: ["Orgs needing large, high-quality labeled data"],
    notSuitableWhen: ["Small, DIY labeling tasks"],
    integrations: ["APIs", "Cloud storage", "ML pipelines"],
    sources: [{ title: "Scale AI", url: "https://scale.com", type: "official" }],
  },
  "glean": {
    productType: "Enterprise AI search & assistant", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Glean connects a company's scattered apps into one permission-aware assistant, a leading enterprise 'work AI' platform.",
    differentiators: ["Permission-aware enterprise search", "Connects many work apps", "Assistant + agents on top"],
    features: ["Unified enterprise search", "Permissions-aware results", "AI assistant and agents", "Connectors to work apps"],
    useCases: ["Finding internal knowledge", "Answering work questions", "Enterprise agents"],
    targetAudience: ["Enterprises", "IT and knowledge teams"],
    strengths: ["Strong permissions model", "Broad connectors", "Enterprise adoption"],
    limitations: ["Enterprise pricing/rollout", "Value depends on connected sources"],
    whoShouldUse: ["Enterprises with knowledge spread across tools"],
    notSuitableWhen: ["Small teams with few data sources"],
    integrations: ["Google/Microsoft", "Slack", "100+ connectors"],
    sources: [{ title: "Glean", url: "https://www.glean.com", type: "official" }],
  },
  "sourcegraph": {
    productType: "Code intelligence & AI", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "AI coding needs code context; Sourcegraph's search and AI agents help developers understand and change large codebases.",
    differentiators: ["Code search across huge repos", "AI with whole-codebase context", "Agentic code changes (Amp)"],
    features: ["Code search and navigation", "AI chat with repo context", "Automated/large-scale changes", "Enterprise deployment"],
    useCases: ["Understanding large codebases", "Refactoring at scale", "AI-assisted development"],
    targetAudience: ["Engineering teams", "Enterprises", "Platform teams"],
    strengths: ["Best-in-class code context", "Scales to big monorepos", "Enterprise-ready"],
    limitations: ["Most valuable at scale", "Setup for large orgs"],
    whoShouldUse: ["Teams with large or complex codebases"],
    notSuitableWhen: ["A tiny single-repo project"],
    integrations: ["IDEs", "GitHub/GitLab", "LLM providers"],
    sources: [{ title: "Sourcegraph", url: "https://sourcegraph.com", type: "official" }],
  },

  // ── AI Business Applications ──
  "jasper": {
    productType: "AI marketing platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Pro $69/mo ($59/mo billed annually); Business custom (12-month minimum). Free trial available. Vendor-reported, Nov 2026.",
    specs: [{ label: "Entry price", value: "$69/mo (Pro)" }, { label: "Billing", value: "Per seat / subscription" }],
    whyItMatters: "Jasper is purpose-built for marketing teams, combining brand controls with campaign and content generation.",
    differentiators: ["Marketing-specific workflows", "Brand voice controls", "Campaign-level tooling"],
    features: ["On-brand copy generation", "Campaign workflows", "Brand voice and style", "Team collaboration"],
    useCases: ["Marketing content at scale", "Campaign creative", "Repurposing content"],
    targetAudience: ["Marketing teams", "Agencies", "Content teams"],
    strengths: ["Marketing focus", "Brand controls", "Team features"],
    limitations: ["Subscription cost", "General models can match basics"],
    whoShouldUse: ["Marketing teams wanting governed, on-brand AI"],
    notSuitableWhen: ["You only need an occasional general chatbot"],
    integrations: ["Browser", "APIs", "Marketing tools"],
    sources: [{ title: "Jasper", url: "https://www.jasper.ai", type: "official" }],
  },
  "canva": {
    productType: "AI design & content platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Free; Pro $18/mo (≈$12/mo billed annually); Business $25/user/mo; Enterprise custom. Vendor-reported, Nov 2026.",
    specs: [{ label: "Pro price", value: "$18/mo (≈$12 annual)" }, { label: "Free tier", value: "Yes" }],
    whyItMatters: "Canva put design in everyone's hands, and its Magic Studio AI brings generation and editing into that same simple surface.",
    differentiators: ["Design + AI in one approachable tool", "Huge template/asset library", "Team and brand features"],
    features: ["AI image and text generation", "Design templates and editor", "Brand kit and collaboration", "Video and presentation tools"],
    useCases: ["Social and marketing visuals", "Presentations and docs", "Quick on-brand content"],
    targetAudience: ["Marketers", "SMBs", "Non-designers"],
    strengths: ["Extremely easy to use", "All-in-one", "Strong collaboration"],
    limitations: ["Less control than pro design tools", "AI features vary by plan"],
    whoShouldUse: ["Teams wanting fast, easy on-brand content"],
    notSuitableWhen: ["You need pixel-level professional design control"],
    integrations: ["Web/mobile", "Brand kits", "Social platforms"],
    sources: [{ title: "Canva", url: "https://www.canva.com", type: "official" }],
  },
  "profound": {
    productType: "Answer-engine optimization (GEO/AEO)", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "As buyers ask AI instead of searching, being cited in AI answers matters; Profound measures and improves that visibility.",
    differentiators: ["Tracks brand presence in AI answers", "Covers multiple answer engines", "Purpose-built for the GEO/AEO shift"],
    features: ["AI-answer visibility tracking", "Prompt and citation analytics", "Competitive share of voice", "Actionable recommendations"],
    useCases: ["Measuring AI-answer visibility", "Improving GEO/AEO", "Competitive benchmarking"],
    targetAudience: ["Marketing teams", "SEO/GEO specialists", "Brands"],
    strengths: ["Early leader in a fast-growing space", "Multi-engine coverage", "Actionable data"],
    limitations: ["Young, fast-evolving category", "Enterprise orientation"],
    whoShouldUse: ["Brands that want to be cited by AI assistants"],
    notSuitableWhen: ["You have no AI-visibility strategy yet"],
    integrations: ["Analytics stacks", "Dashboards"],
    sources: [{ title: "Profound", url: "https://www.tryprofound.com", type: "official" }, { title: "Conductor: best AEO/GEO tools 2026", url: "https://www.conductor.com/academy/best-aeo-geo-tools/", type: "analysis" }],
  },
  "harvey": {
    productType: "Legal AI platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    pricing: "Enterprise / custom pricing (contact sales); not publicly listed. As of Nov 2026.",
    specs: [{ label: "Pricing", value: "Enterprise / custom" }],
    whyItMatters: "Harvey is among the most adopted AI platforms in law firms, built for the accuracy and workflow demands of legal work.",
    differentiators: ["Built specifically for legal", "Adopted by major firms", "Workflow + research + drafting in one"],
    features: ["Legal research and analysis", "Contract review", "Drafting assistance", "Secure enterprise deployment"],
    useCases: ["Due diligence and review", "Legal research", "Document drafting"],
    targetAudience: ["Law firms", "In-house legal teams"],
    strengths: ["Legal-specific accuracy focus", "Strong firm adoption", "Enterprise security"],
    limitations: ["Enterprise pricing", "Requires professional oversight"],
    whoShouldUse: ["Legal teams wanting AI tuned for their work"],
    notSuitableWhen: ["Non-legal general use"],
    integrations: ["Document systems", "Enterprise SSO"],
    sources: [{ title: "Harvey", url: "https://www.harvey.ai", type: "official" }, { title: "Ironclad: best legal AI 2026", url: "https://ironcladapp.com/resources/articles/best-legal-ai-software", type: "analysis" }],
  },
  "eightfold-ai": {
    productType: "Talent intelligence platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Eightfold applies a deep talent model to hiring and workforce planning, aiming to match on skills rather than keywords.",
    differentiators: ["Skills-based talent model", "Spans hiring and workforce planning", "Enterprise talent intelligence"],
    features: ["Candidate matching and screening", "Talent rediscovery", "Skills inventory", "Workforce planning"],
    useCases: ["Sourcing and screening", "Internal mobility", "Workforce planning"],
    targetAudience: ["Enterprises", "Talent acquisition teams", "HR leaders"],
    strengths: ["Skills-based matching", "Breadth across HR", "Enterprise scale"],
    limitations: ["Enterprise deployment", "Requires good data"],
    whoShouldUse: ["Enterprises modernising hiring and talent"],
    notSuitableWhen: ["Very small hiring needs"],
    integrations: ["ATS/HRIS", "Enterprise systems"],
    sources: [{ title: "Eightfold AI", url: "https://eightfold.ai", type: "official" }],
  },
  "crowdstrike-charlotte": {
    productType: "AI security operations", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "CrowdStrike is a top endpoint security platform, and Charlotte AI brings agentic triage and response to its Falcon stack.",
    differentiators: ["Leading endpoint/XDR platform", "Agentic AI triage (Charlotte)", "Broad telemetry"],
    features: ["Endpoint detection and response", "Agentic alert triage", "Threat intelligence", "Cloud and identity protection"],
    useCases: ["Threat detection and response", "Security operations automation", "Incident triage"],
    targetAudience: ["Security teams", "Enterprises"],
    strengths: ["Market-leading detection", "Agentic automation", "Broad platform"],
    limitations: ["Enterprise pricing", "Platform complexity"],
    whoShouldUse: ["Enterprises wanting AI-assisted security operations"],
    notSuitableWhen: ["Small orgs without a security team"],
    integrations: ["SIEM/SOAR", "Cloud platforms", "Identity providers"],
    sources: [{ title: "CrowdStrike", url: "https://www.crowdstrike.com", type: "official" }, { title: "Cycode: best AI cybersecurity tools 2026", url: "https://cycode.com/blog/ai-cybersecurity-tools/", type: "analysis" }],
  },
  "khanmigo": {
    productType: "AI tutor", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Khanmigo is a widely used AI tutor from a trusted nonprofit, designed to guide learning rather than just give answers.",
    differentiators: ["From Khan Academy (trusted, nonprofit)", "Socratic, guidance-first tutoring", "Tools for teachers too"],
    features: ["Personalised tutoring", "Socratic guidance", "Teacher assistance tools", "Across many subjects"],
    useCases: ["Student tutoring", "Homework help", "Teacher support"],
    targetAudience: ["Students", "Teachers", "Schools"],
    strengths: ["Trusted brand", "Pedagogically careful", "Broad subject coverage"],
    limitations: ["Education-specific scope", "Best within Khan's ecosystem"],
    whoShouldUse: ["Students and educators wanting a guided AI tutor"],
    notSuitableWhen: ["You need a general-purpose assistant"],
    integrations: ["Khan Academy", "School platforms"],
    sources: [{ title: "Khanmigo", url: "https://www.khanmigo.ai", type: "official" }],
  },

  // ── Emerging & Specialized AI ──
  "figure-ai": {
    productType: "Humanoid robotics", productStatus: "Early commercial deployment", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Figure is among the best-funded humanoid robot companies, pairing hardware with its own vision-language-action models.",
    differentiators: ["General-purpose humanoid", "In-house AI (VLA models)", "Early real-world deployments"],
    features: ["Humanoid robot hardware", "Vision-language-action control", "Manipulation and mobility", "Pilot deployments in industry"],
    useCases: ["Manufacturing and logistics tasks", "Material handling", "Embodied AI research"],
    targetAudience: ["Manufacturers", "Logistics operators", "Robotics researchers"],
    strengths: ["Strong funding and talent", "Full-stack hardware + AI", "Real pilots"],
    limitations: ["Early stage at scale", "Capital-intensive, long horizon"],
    whoShouldUse: ["Industrial partners exploring humanoid automation"],
    notSuitableWhen: ["You need an off-the-shelf software tool"],
    integrations: ["Industrial environments", "Proprietary stack"],
    sources: [{ title: "Figure AI", url: "https://www.figure.ai", type: "official" }, { title: "Standard Bots: top AI robotics 2026", url: "https://standardbots.com/articles/ai-robotics-companies", type: "analysis" }],
  },
  "waymo": {
    productType: "Autonomous driving", productStatus: "Commercial (robotaxi) service", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Waymo runs one of the most mature driverless services, with paid public robotaxi rides across multiple cities.",
    differentiators: ["Mature driverless stack", "Live paid robotaxi service", "Alphabet-backed"],
    features: ["Full self-driving system", "Robotaxi operations", "Multi-sensor perception", "Safety framework"],
    useCases: ["Autonomous ride-hailing", "Autonomy research reference", "Urban mobility"],
    targetAudience: ["Riders", "Mobility/industry observers", "Partners"],
    strengths: ["Operational at scale", "Deep experience", "Strong safety record emphasis"],
    limitations: ["City-by-city rollout", "Capital-intensive"],
    whoShouldUse: ["Riders and partners in served cities"],
    notSuitableWhen: ["You need a deployable software product"],
    integrations: ["Waymo app", "Fleet partners"],
    sources: [{ title: "Waymo", url: "https://waymo.com", type: "official" }],
  },
  "covariant": {
    productType: "Robotic manipulation AI", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Covariant builds AI 'brains' that let warehouse and manufacturing robots handle diverse items they've never seen.",
    differentiators: ["Foundation models for manipulation", "Generalises to new items", "Deployed in real warehouses"],
    features: ["AI for robotic picking/handling", "Generalisation across SKUs", "Integrates with robot hardware", "Operational analytics"],
    useCases: ["Warehouse pick-and-place", "Order fulfilment automation", "Manufacturing handling"],
    targetAudience: ["Logistics operators", "Manufacturers", "Robotics integrators"],
    strengths: ["Strong manipulation AI", "Real deployments", "Hardware-agnostic brain"],
    limitations: ["Requires robot hardware", "Integration effort"],
    whoShouldUse: ["Operators automating physical handling"],
    notSuitableWhen: ["Purely digital workflows"],
    integrations: ["Robot arms", "Warehouse systems"],
    sources: [{ title: "Covariant", url: "https://covariant.ai", type: "official" }],
  },
  "blue-yonder": {
    productType: "AI supply-chain platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Blue Yonder is a comprehensive, widely-deployed platform applying AI across planning, fulfilment and logistics.",
    differentiators: ["End-to-end supply-chain suite", "AI-driven planning and execution", "Large enterprise footprint"],
    features: ["Demand and supply planning", "Fulfilment and logistics", "AI forecasting and optimisation", "Control-tower visibility"],
    useCases: ["Demand forecasting", "Inventory and fulfilment", "Logistics optimisation"],
    targetAudience: ["Retailers", "Manufacturers", "Logistics enterprises"],
    strengths: ["Breadth and maturity", "Enterprise scale", "AI across the chain"],
    limitations: ["Enterprise complexity and cost", "Long implementations"],
    whoShouldUse: ["Large enterprises modernising supply chains"],
    notSuitableWhen: ["Small operations needing a point tool"],
    integrations: ["ERP/WMS", "Enterprise systems"],
    sources: [{ title: "Blue Yonder", url: "https://blueyonder.com", type: "official" }],
  },
  "shopify-sidekick": {
    productType: "AI commerce assistant", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Shopify embeds AI (Sidekick and Magic) across its platform, putting commerce-aware AI in millions of merchants' hands.",
    differentiators: ["Native to the Shopify platform", "Commerce-aware context", "In-admin assistant + generation"],
    features: ["AI store assistant (Sidekick)", "Content generation (Magic)", "Insights and actions", "Merchant workflows"],
    useCases: ["Running and optimising stores", "Generating product content", "Merchant Q&A and insights"],
    targetAudience: ["Shopify merchants", "DTC brands", "SMBs"],
    strengths: ["Deeply integrated with commerce", "Easy for merchants", "Broad reach"],
    limitations: ["Tied to Shopify", "Depth varies by task"],
    whoShouldUse: ["Shopify merchants wanting built-in AI"],
    notSuitableWhen: ["You're not on Shopify"],
    integrations: ["Shopify admin", "Shopify apps"],
    sources: [{ title: "Shopify", url: "https://www.shopify.com", type: "official" }],
  },
  "eliseai": {
    productType: "AI for real estate", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "EliseAI automates leasing and resident communication for housing, a leading vertical AI in real estate operations.",
    differentiators: ["Vertical AI for housing/real estate", "Automates leasing conversations", "Strong traction in multifamily"],
    features: ["Conversational leasing assistant", "Resident communication automation", "Scheduling and follow-up", "Operations workflows"],
    useCases: ["Lead response and tours", "Resident support", "Leasing operations"],
    targetAudience: ["Property managers", "Multifamily operators", "Real estate owners"],
    strengths: ["Deep vertical fit", "Proven adoption", "Automation across the funnel"],
    limitations: ["Real-estate specific", "Best for larger portfolios"],
    whoShouldUse: ["Property operators automating leasing and support"],
    notSuitableWhen: ["Outside property/real-estate use"],
    integrations: ["Property management systems", "CRMs"],
    sources: [{ title: "EliseAI", url: "https://www.eliseai.com", type: "official" }],
  },
  "inworld-ai": {
    productType: "AI engine for games", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Inworld provides an AI engine for games, powering intelligent characters and runtime experiences developers can ship.",
    differentiators: ["AI engine purpose-built for games", "Character/NPC intelligence", "Runtime, production-oriented"],
    features: ["AI character creation", "Dialogue and behaviour", "Runtime integration", "Developer tooling"],
    useCases: ["Intelligent NPCs", "Interactive narratives", "Live game experiences"],
    targetAudience: ["Game developers", "Studios", "Interactive media"],
    strengths: ["Games-specific", "Runtime focus", "Developer tools"],
    limitations: ["Gaming niche", "Integration effort"],
    whoShouldUse: ["Game teams adding AI characters/experiences"],
    notSuitableWhen: ["Non-gaming applications"],
    integrations: ["Game engines", "SDKs"],
    sources: [{ title: "Inworld AI", url: "https://inworld.ai", type: "official" }],
  },
  "watershed": {
    productType: "Climate & carbon platform", productStatus: "Generally available", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "Watershed is a leading enterprise platform for measuring, reporting and reducing emissions, increasingly AI-assisted.",
    differentiators: ["Enterprise carbon measurement + reduction", "Audit-grade reporting", "Broad enterprise adoption"],
    features: ["Emissions measurement", "Regulatory disclosure/reporting", "Reduction planning", "Supplier and data management"],
    useCases: ["Carbon accounting", "Climate disclosure", "Decarbonisation planning"],
    targetAudience: ["Enterprises", "Sustainability teams", "Finance/compliance"],
    strengths: ["Comprehensive and credible", "Reporting rigor", "Enterprise scale"],
    limitations: ["Enterprise pricing", "Data-collection effort"],
    whoShouldUse: ["Enterprises managing climate reporting and reduction"],
    notSuitableWhen: ["Small orgs without disclosure needs"],
    integrations: ["ERP/finance systems", "Data sources"],
    sources: [{ title: "Watershed", url: "https://watershed.com", type: "official" }],
  },
  "futurehouse": {
    productType: "AI for scientific research", productStatus: "Active (research org + tools)", verification: "verified", lastVerified: "November 2026",
    whyItMatters: "FutureHouse builds AI agents aimed at automating parts of scientific discovery, especially in the life sciences.",
    differentiators: ["AI agents for science", "Research-org depth", "Focus on real discovery workflows"],
    features: ["Scientific literature agents", "Research automation tools", "Life-sciences focus", "Open scientific outputs"],
    useCases: ["Literature review and synthesis", "Hypothesis support", "Research acceleration"],
    targetAudience: ["Scientists", "Research labs", "Life-sciences teams"],
    strengths: ["Science-specific", "Credible research focus", "Advancing a hard frontier"],
    limitations: ["Early and research-oriented", "Not a general product"],
    whoShouldUse: ["Researchers exploring AI for discovery"],
    notSuitableWhen: ["General business use"],
    integrations: ["Scientific databases", "Research tools"],
    sources: [{ title: "FutureHouse", url: "https://www.futurehouse.org", type: "official" }],
  },

  // ════════ Deep profiles for standout ARCHIVE tools (researched Nov 2026) ════════
  "modal": {
    productType: "Serverless GPU/compute platform", productStatus: "Generally available",
    pricing: "Starter free ($30 compute/mo); Team $250/mo + usage. Per-second GPU (vendor-reported): H100 ≈$0.001097/s (~$3.95/hr), L4 ~$0.80/hr, B200 ~$6.25/hr; storage $0.09/GiB/mo. Nov 2026. Verify on official pricing.",
    specs: [{ label: "Billing", value: "Per-second, scale-to-zero" }, { label: "GPU types", value: "11 (T4 → B300)" }, { label: "Cold start", value: "~1–2s containers (vendor)" }],
    differentiators: ["Code-first infra in pure Python (decorators)", "Per-second billing, scales to zero", "Fast container cold starts"],
    features: ["Define GPU/compute in Python with @app.function", "11 NVIDIA GPU types", "Autoscaling to zero", "Sandboxes, volumes and scheduled jobs"],
    useCases: ["Serverless model inference", "Batch and fine-tuning jobs", "GPU-backed Python workloads"],
    targetAudience: ["Python ML engineers", "AI startups", "Teams avoiding cluster ops"],
    strengths: ["Excellent developer experience", "True scale-to-zero economics", "No infra/YAML to manage"],
    limitations: ["Per-second costs add up at steady high load", "Python-centric"],
    whoShouldUse: ["Python teams wanting serverless GPUs without managing clusters"],
    notSuitableWhen: ["You need a reserved, always-on dedicated cluster"],
    integrations: ["Python", "Hugging Face", "Common ML frameworks"],
    alternatives: ["Replicate", "Baseten", "RunPod"],
    sources: [{ title: "Modal", url: "https://modal.com", type: "official" }, { title: "Modal pricing breakdown 2026", url: "https://dupple.com/learn/modal-pricing", type: "analysis" }],
  },
  "openobserve": {
    productType: "Observability platform (open-source)", productStatus: "Generally available",
    pricing: "Open-source self-host: free, unlimited ingestion. Cloud: 50 GB/day free, then ≈$0.50/GB ingested + $0.01/GB queried, unlimited users. Vendor-reported, Nov 2026.",
    specs: [{ label: "License", value: "Open-source (self-host free)" }, { label: "Cloud free tier", value: "50 GB/day" }, { label: "Storage", value: "~140x lower cost (vendor claim)" }],
    differentiators: ["Rust-built, single-binary deploy", "Unifies logs/metrics/traces/RUM + LLM telemetry", "Ingestion-based pricing, unlimited users"],
    features: ["Logs, metrics, traces, RUM in one", "LLM/AI observability across 80+ frameworks", "19+ dashboard chart types + alerting/SLOs", "Incident correlation to cut alert noise"],
    useCases: ["Full-stack observability", "LLM app tracing and cost tracking", "Cost-efficient Datadog/Splunk alternative"],
    targetAudience: ["Platform/SRE teams", "Cost-conscious orgs", "AI app teams"],
    strengths: ["Very low storage cost", "Open-source + single binary", "Unified signals incl. LLM"],
    limitations: ["Younger ecosystem than Datadog", "Self-host needs ops"],
    whoShouldUse: ["Teams wanting unified, low-cost observability they can self-host"],
    notSuitableWhen: ["You need a fully managed incumbent with vast integrations"],
    integrations: ["OpenTelemetry", "80+ LLM frameworks", "Grafana (adjacent)"],
    alternatives: ["Datadog", "Grafana/Loki", "Langfuse (LLM-only)"],
    sources: [{ title: "OpenObserve", url: "https://openobserve.ai", type: "official" }, { title: "OpenObserve (GitHub)", url: "https://github.com/openobserve/openobserve", type: "github" }],
  },
  "indra": {
    productType: "OCR model (open-source)", productStatus: "Generally available",
    pricing: "Open-source model, free to use; part of Datalab's document-intelligence tooling. Nov 2026.",
    specs: [{ label: "Model size", value: "~1M parameters" }, { label: "Throughput", value: "49.4 pages/sec on 32 CPU cores (vendor)" }, { label: "Runs on", value: "CPU" }],
    benchmarks: [{ label: "CPU throughput", value: "49.4 pages/sec (32 cores)", kind: "vendor" }, { label: "Speed vs Tesseract", value: "~15x faster (vendor)", kind: "vendor" }],
    differentiators: ["Tiny (~1M params) yet accurate", "Runs fast on CPU, no GPU needed", "From Datalab (Surya/Marker makers)"],
    features: ["PDF/image → markdown, text or JSON", "Line bounding boxes + layout labels", "Reading order and confidences", "CPU-efficient inference"],
    useCases: ["High-volume document OCR", "Cheap CPU-only OCR pipelines", "Feeding RAG/document systems"],
    targetAudience: ["Developers", "Document-AI teams", "RAG builders"],
    strengths: ["Fast on commodity CPUs", "Open-source", "Strong accuracy for its size"],
    limitations: ["Focused on OCR, not full document reasoning", "Newer than incumbents"],
    whoShouldUse: ["Teams needing fast, cheap, open OCR at scale"],
    notSuitableWhen: ["You need a managed end-to-end document platform"],
    integrations: ["Hugging Face", "Python", "Datalab Surya/Marker"],
    alternatives: ["Tesseract", "Surya", "Cloud OCR APIs"],
    sources: [{ title: "Datalab Indra (GitHub)", url: "https://github.com/datalab-to/indra", type: "github" }, { title: "Indra OCR (Hugging Face)", url: "https://huggingface.co/datalab-to/indra-ocr", type: "official" }],
  },
  "formation-bio": {
    productType: "AI-native drug development", productStatus: "Operating company",
    pricing: "Not applicable, Formation Bio is an AI-native pharma company, not a SaaS product. Nov 2026.",
    differentiators: ["AI-native pharma operating model", "OpenAI + Sanofi collaboration", "$600M drug-development accelerator fund"],
    features: ["AI across the drug-development lifecycle", "In-licenses and advances drug programs", "AI tooling (e.g. Muse) for development"],
    useCases: ["Accelerating clinical drug development", "AI-assisted pharma R&D"],
    targetAudience: ["Pharma/biotech partners", "Investors", "Industry observers"],
    strengths: ["Well-funded and ambitious", "Credible AI partnerships", "Clear AI-native thesis"],
    limitations: ["Operating company, not a tool to adopt", "Long, capital-intensive horizon"],
    whoShouldUse: ["Partners and observers of AI-native pharma"],
    notSuitableWhen: ["You're looking for a self-serve software product"],
    integrations: ["Clinical/pharma systems"],
    alternatives: ["Isomorphic Labs", "Recursion", "Insilico Medicine"],
    sources: [{ title: "Formation Bio", url: "https://www.formation.bio", type: "official" }, { title: "Formation Bio $600M fund", url: "https://www.prnewswire.com/news-releases/formation-bio-announces-600-million-debut-fund-to-expand-drug-development-capacity-302921852.html", type: "news" }],
  },
  "runable": {
    productType: "AI general agent", productStatus: "Generally available",
    differentiators: ["End-to-end plan-and-execute agent", "Produces 10 output types", "Business-outcome oriented"],
    features: ["Autonomous research and execution", "Generates websites, slides, reports, video, spreadsheets and more", "Runbooks across marketing/sales/research", "Chat-based control"],
    useCases: ["Automating repetitive business workflows", "Deep research and content production", "Running go-to-market tasks"],
    targetAudience: ["Founders", "Marketers", "Small business teams"],
    strengths: ["Broad output range", "End-to-end execution", "Approachable for non-developers"],
    limitations: ["General agents can be inconsistent on complex tasks", "Young product"],
    whoShouldUse: ["Small teams wanting one agent for many output types"],
    notSuitableWhen: ["You need a specialised, deterministic tool"],
    integrations: ["Web app", "Business tools"],
    alternatives: ["Manus", "Genspark", "ChatGPT agents"],
    sources: [{ title: "Runable", url: "https://runable.com", type: "official" }],
  },
};

// Slugs with a compressed logo in /public/logos (see scripts; initials otherwise).
const LOGO_SLUGS = new Set([
  "google-cloud-a5x-vera-rubin",
  "sarvam-token-factory",
  "weaviate",
  "google-adk-2",
  "langfuse",
  "google-antigravity",
  "perplexity-multiagent",
  "salesforce-hunter",
  "retell-ai",
  "artificial-analysis",
  "mayo-clinic-platform-cds",
  "isomorphic-labs",
  "lago",
  // Curated preview tools (logos fetched 2026-11-23)
  "nvidia-run-ai", "deepspeed", "unsloth", "llama-cpp", "nvidia-spectrum-x",
  "vast-data", "cerebras", "vast-ai", "microsoft-phi", "google-gemini",
  "midjourney", "runway", "elevenlabs", "cohere", "mostly-ai", "writer-palmyra",
  "mem0", "auth0-ai", "lasso-security", "skyfire", "n8n", "browser-use",
  "chatgpt", "openrouter", "together-ai", "promptlayer", "replicate", "lakera",
  "scale-ai", "glean", "sourcegraph", "jasper", "canva", "profound", "harvey",
  "eightfold-ai", "crowdstrike-charlotte", "khanmigo", "figure-ai", "waymo",
  "covariant", "blue-yonder", "shopify-sidekick", "eliseai", "inworld-ai",
  "watershed", "futurehouse",
  // Archive-edition tools (logos fetched 2026-11-23)
  "fuxi", "phone-harness", "pgbot", "costperprompt", "xyne-spaces", "perimeter-compute",
  "reverify", "tel-agent", "voicemem", "tabtin", "operator-memory", "runable",
  "shadcn-lint", "engrim", "dyno-lab", "pizza-bot", "alphacode", "andee", "typellm",
  "strands-decider", "openspline", "tinyaiarena", "openobserve", "artex", "indra",
  "grandet", "agent-box", "healthleap", "agent-ui", "cvengine", "stashdock",
  "landmines", "sphinx", "modal", "formation-bio", "websitebench", "db-branch",
  "agentic-identity-broker",
]);

// ── Curated preview tools (one per otherwise-empty category) ──
// These are well-known category leaders added so every category has a tool to
// browse. They are explicitly NOT verified edition picks: verification is
// "preview" ("Curated preview · pending fact-check"), pricing is never invented,
// and the fortnightly research pipeline upgrades them to verified over time.
interface PreviewSpec {
  slug: string;
  name: string;
  categorySlug: string;
  officialUrl: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  alternatives: string[];
  source: { title: string; url: string };
}

function preview(s: PreviewSpec): Product {
  const categoryName = categories.find((c) => c.slug === s.categorySlug)?.name ?? "its category";
  return {
    slug: s.slug,
    name: s.name,
    categorySlug: s.categorySlug,
    officialUrl: s.officialUrl,
    tagline: s.tagline,
    shortDescription: s.shortDescription,
    overview: s.overview,
    // Left blank by default (the Problem/How sections hide when empty); the
    // enrichment layer carries the deep content (overview, why-it-matters,
    // capabilities, use cases, strengths, limitations).
    problemSolved: "",
    howItWorks: "",
    features: [],
    useCases: [],
    targetAudience: [],
    pricing: pricingTBD,
    integrations: [],
    alternatives: s.alternatives,
    selectionRationale: `Selected as a standout in ${categoryName} based on adoption, capability and credible third-party coverage. See the sources below for evidence; where a specific claim such as pricing isn't independently confirmed, it is labelled rather than guessed.`,
    sources: [{ title: s.source.title, url: s.source.url, type: "curated" }],
    lastVerified: null,
    verification: "preview",
  };
}

const previewProducts: Product[] = [
  // ── AI Infrastructure & Cloud ──
  preview({ slug: "nvidia-run-ai", name: "NVIDIA Run:ai", categorySlug: "ai-gpu-orchestration-scheduling", officialUrl: "https://www.nvidia.com/en-us/software/run-ai/", tagline: "GPU orchestration for Kubernetes", shortDescription: "Workload & GPU orchestration for AI clusters.", overview: "NVIDIA Run:ai is a GPU orchestration and scheduling platform for Kubernetes that pools, shares and prioritises GPU resources across training, fine-tuning and inference.", alternatives: ["SkyPilot", "Kueue", "Volcano"], source: { title: "NVIDIA Run:ai", url: "https://www.nvidia.com/en-us/software/run-ai/" } }),
  preview({ slug: "deepspeed", name: "DeepSpeed", categorySlug: "ai-training-infrastructure", officialUrl: "https://www.deepspeed.ai", tagline: "Distributed deep-learning training", shortDescription: "Large-scale distributed model training library.", overview: "DeepSpeed is Microsoft's open-source deep-learning optimisation library for training very large models efficiently across many GPUs, with ZeRO memory optimisation and parallelism.", alternatives: ["PyTorch FSDP", "Megatron-LM", "Hugging Face Accelerate"], source: { title: "DeepSpeed", url: "https://www.deepspeed.ai" } }),
  preview({ slug: "unsloth", name: "Unsloth", categorySlug: "ai-model-compression-quantization", officialUrl: "https://unsloth.ai", tagline: "Faster fine-tuning & quantization", shortDescription: "Efficient fine-tuning and quantization for LLMs.", overview: "Unsloth is an open-source library for faster, memory-efficient fine-tuning and quantization of large language models on a single GPU.", alternatives: ["bitsandbytes", "AutoGPTQ", "llama.cpp (GGUF)"], source: { title: "Unsloth", url: "https://unsloth.ai" } }),
  preview({ slug: "llama-cpp", name: "llama.cpp", categorySlug: "ai-edge-computing", officialUrl: "https://github.com/ggml-org/llama.cpp", tagline: "LLM inference on local hardware", shortDescription: "CPU-first local/edge LLM inference engine.", overview: "llama.cpp is an open-source C/C++ inference engine and the GGUF format that have become the de-facto standard for running language models locally and at the edge on CPU-first hardware.", alternatives: ["Ollama", "MLC LLM", "TensorFlow Lite"], source: { title: "llama.cpp", url: "https://github.com/ggml-org/llama.cpp" } }),
  preview({ slug: "nvidia-spectrum-x", name: "NVIDIA Spectrum-X", categorySlug: "ai-networking-data-transfer", officialUrl: "https://www.nvidia.com/en-us/networking/", tagline: "Ethernet networking for AI", shortDescription: "High-throughput networking for AI clusters.", overview: "NVIDIA Spectrum-X and NVLink provide high-bandwidth, low-latency networking and interconnect designed for large-scale AI training and inference clusters.", alternatives: ["InfiniBand", "Cisco Unified Edge", "Arista AI networking"], source: { title: "NVIDIA Networking", url: "https://www.nvidia.com/en-us/networking/" } }),
  preview({ slug: "vast-data", name: "VAST Data", categorySlug: "ai-storage-infrastructure", officialUrl: "https://www.vastdata.com", tagline: "Storage for AI at scale", shortDescription: "High-bandwidth data platform for AI.", overview: "VAST Data is a data platform providing high-bandwidth storage and a unified data layer purpose-built for large-scale AI training and inference workloads.", alternatives: ["WEKA", "DDN", "Pure Storage"], source: { title: "VAST Data", url: "https://www.vastdata.com" } }),
  preview({ slug: "cerebras", name: "Cerebras", categorySlug: "ai-hardware-accelerators", officialUrl: "https://www.cerebras.ai", tagline: "Wafer-scale AI accelerators", shortDescription: "Wafer-scale chips and AI inference cloud.", overview: "Cerebras builds wafer-scale AI accelerators and an inference cloud, offering very high-throughput training and inference as an alternative to conventional GPUs.", alternatives: ["NVIDIA Blackwell", "Groq", "Google TPU"], source: { title: "Cerebras", url: "https://www.cerebras.ai" } }),
  preview({ slug: "vast-ai", name: "Vast.ai", categorySlug: "ai-compute-marketplaces", officialUrl: "https://vast.ai", tagline: "GPU rental marketplace", shortDescription: "On-demand GPU marketplace for AI.", overview: "Vast.ai is a marketplace for renting on-demand GPU compute from a wide range of providers, often at lower cost than hyperscalers, for training and inference.", alternatives: ["RunPod", "Akash Network", "Aethir"], source: { title: "Vast.ai", url: "https://vast.ai" } }),

  // ── AI Models & Intelligence ──
  preview({ slug: "microsoft-phi", name: "Microsoft Phi", categorySlug: "small-language-models", officialUrl: "https://azure.microsoft.com/en-us/products/phi", tagline: "Small, capable language models", shortDescription: "Compact high-quality open small models.", overview: "Microsoft's Phi family are small language models designed to deliver strong reasoning and quality at a fraction of the size and cost of frontier models, suited to on-device and cost-sensitive use.", alternatives: ["Google Gemma", "Qwen (small)", "NVIDIA Nemotron Nano"], source: { title: "Microsoft Phi", url: "https://azure.microsoft.com/en-us/products/phi" } }),
  preview({ slug: "google-gemini", name: "Google Gemini", categorySlug: "multimodal-ai-models", officialUrl: "https://deepmind.google/technologies/gemini/", tagline: "Multimodal frontier model", shortDescription: "Text, image, audio and video reasoning.", overview: "Google Gemini is a family of multimodal models that reason across text, images, audio and video, known for long-context and strong video understanding.", alternatives: ["GPT-5 (OpenAI)", "Claude (Anthropic)", "Qwen3-VL"], source: { title: "Google Gemini", url: "https://deepmind.google/technologies/gemini/" } }),
  preview({ slug: "midjourney", name: "Midjourney", categorySlug: "ai-image-generation", officialUrl: "https://www.midjourney.com", tagline: "Text-to-image generation", shortDescription: "Leading artistic text-to-image model.", overview: "Midjourney is a generative AI known for high artistic quality in text-to-image generation, widely used by designers and creators.", alternatives: ["Stable Diffusion", "DALL·E", "Flux"], source: { title: "Midjourney", url: "https://www.midjourney.com" } }),
  preview({ slug: "runway", name: "Runway", categorySlug: "ai-video-generation", officialUrl: "https://runwayml.com", tagline: "Generative video platform", shortDescription: "Text/image-to-video generation & editing.", overview: "Runway is a generative video platform offering text- and image-to-video generation plus AI editing tools used across film, advertising and social content.", alternatives: ["OpenAI Sora", "Google Veo", "Kling"], source: { title: "Runway", url: "https://runwayml.com" } }),
  preview({ slug: "elevenlabs", name: "ElevenLabs", categorySlug: "ai-audio-speech-models", officialUrl: "https://elevenlabs.io", tagline: "AI voice & speech", shortDescription: "Speech synthesis and voice AI.", overview: "ElevenLabs provides high-quality AI speech synthesis, voice cloning and generative audio APIs used for dubbing, narration and voice agents.", alternatives: ["OpenAI TTS", "Cartesia", "PlayHT"], source: { title: "ElevenLabs", url: "https://elevenlabs.io" } }),
  preview({ slug: "cohere", name: "Cohere", categorySlug: "ai-embeddings-reranking", officialUrl: "https://cohere.com", tagline: "Embeddings & reranking models", shortDescription: "Enterprise embedding and rerank models.", overview: "Cohere provides leading embedding and reranking models (Embed and Rerank) that power retrieval quality in search and RAG systems, with an enterprise focus.", alternatives: ["Voyage AI", "OpenAI embeddings", "Jina AI"], source: { title: "Cohere", url: "https://cohere.com" } }),
  preview({ slug: "mostly-ai", name: "MOSTLY AI", categorySlug: "synthetic-data-generation", officialUrl: "https://mostly.ai", tagline: "Synthetic data generation", shortDescription: "Privacy-safe synthetic data platform.", overview: "MOSTLY AI generates statistically representative, privacy-safe synthetic data for training, testing and analytics without exposing real records.", alternatives: ["Gretel", "Tonic.ai", "Hazy"], source: { title: "MOSTLY AI", url: "https://mostly.ai" } }),
  preview({ slug: "writer-palmyra", name: "Writer", categorySlug: "domain-specific-ai-models", officialUrl: "https://writer.com", tagline: "Enterprise domain models", shortDescription: "Palmyra domain-specific enterprise models.", overview: "Writer builds the Palmyra family of domain-specific enterprise models and an AI platform tuned for regulated industries like finance and healthcare.", alternatives: ["BloombergGPT", "Hugging Face", "Cohere"], source: { title: "Writer", url: "https://writer.com" } }),

  // ── AI Agents & Automation ──
  preview({ slug: "mem0", name: "Mem0", categorySlug: "ai-agent-memory-context", officialUrl: "https://mem0.ai", tagline: "Memory layer for agents", shortDescription: "Persistent memory for AI agents.", overview: "Mem0 is a memory layer that gives AI agents persistent, personalised long-term memory across sessions, widely adopted in agent SDKs.", alternatives: ["Letta (MemGPT)", "Zep", "Anthropic Memory Tool"], source: { title: "Mem0", url: "https://mem0.ai" } }),
  preview({ slug: "auth0-ai", name: "Auth0 for AI Agents", categorySlug: "ai-agent-identity-access-management", officialUrl: "https://auth0.com", tagline: "Identity & access for agents", shortDescription: "Auth and fine-grained access for agents.", overview: "Auth0 provides identity and access management with token issuance and fine-grained authorisation, giving AI agents a verifiable identity and scoped permissions.", alternatives: ["Microsoft Entra Agent ID", "WorkOS", "Okta"], source: { title: "Auth0", url: "https://auth0.com" } }),
  preview({ slug: "lasso-security", name: "Lasso Security", categorySlug: "ai-agent-security-governance", officialUrl: "https://www.lasso.security", tagline: "Agent & LLM security", shortDescription: "Security and governance for AI agents.", overview: "Lasso Security provides runtime security, monitoring and governance for LLM and agent applications, guarding against misuse, data leakage and prompt attacks.", alternatives: ["Protect AI", "Orby AI", "CalypsoAI"], source: { title: "Lasso Security", url: "https://www.lasso.security" } }),
  preview({ slug: "skyfire", name: "Skyfire", categorySlug: "ai-agent-payments-transactions", officialUrl: "https://www.skyfire.xyz", tagline: "Payments for AI agents", shortDescription: "Agent-native payment infrastructure.", overview: "Skyfire provides payment infrastructure that lets autonomous AI agents transact, pay for services and settle programmatically with identity and spend controls.", alternatives: ["Payman", "Catena Labs", "Stripe"], source: { title: "Skyfire", url: "https://www.skyfire.xyz" } }),
  preview({ slug: "n8n", name: "n8n", categorySlug: "ai-workflow-automation", officialUrl: "https://n8n.io", tagline: "Workflow automation", shortDescription: "Source-available AI workflow automation.", overview: "n8n is a source-available workflow automation platform with a visual editor and AI/agent nodes for connecting apps and automating processes.", alternatives: ["Zapier", "Make", "Gumloop"], source: { title: "n8n", url: "https://n8n.io" } }),
  preview({ slug: "browser-use", name: "Browser Use", categorySlug: "browser-computer-use-agents", officialUrl: "https://browser-use.com", tagline: "AI browser agents", shortDescription: "Open-source agents that drive the browser.", overview: "Browser Use is an open-source framework and cloud for AI agents that operate web browsers, one of the fastest-growing projects in computer-use automation.", alternatives: ["Skyvern", "OpenAI Operator", "Anthropic Computer Use"], source: { title: "Browser Use", url: "https://browser-use.com" } }),
  preview({ slug: "chatgpt", name: "ChatGPT", categorySlug: "ai-personal-assistants", officialUrl: "https://chatgpt.com", tagline: "AI personal assistant", shortDescription: "The leading consumer AI assistant.", overview: "OpenAI's ChatGPT is the most widely used AI personal assistant, handling research, writing, coding and everyday tasks across web and mobile.", alternatives: ["Google Gemini", "Anthropic Claude", "Perplexity"], source: { title: "ChatGPT", url: "https://chatgpt.com" } }),

  // ── AI Developer Ecosystem ──
  preview({ slug: "openrouter", name: "OpenRouter", categorySlug: "ai-developer-apis-sdks", officialUrl: "https://openrouter.ai", tagline: "Unified LLM API", shortDescription: "One API across hundreds of models.", overview: "OpenRouter is a unified API and marketplace that routes requests across hundreds of LLMs from many providers through a single endpoint with fallbacks and cost controls.", alternatives: ["Portkey", "Together AI", "LiteLLM"], source: { title: "OpenRouter", url: "https://openrouter.ai" } }),
  preview({ slug: "together-ai", name: "Together AI", categorySlug: "ai-model-fine-tuning", officialUrl: "https://www.together.ai", tagline: "Fine-tuning & inference", shortDescription: "Fine-tune and serve open models.", overview: "Together AI offers serverless and dedicated inference plus fine-tuning for open and custom models, letting teams adapt models on proprietary data.", alternatives: ["Fireworks AI", "Baseten", "OpenAI fine-tuning"], source: { title: "Together AI", url: "https://www.together.ai" } }),
  preview({ slug: "promptlayer", name: "PromptLayer", categorySlug: "ai-prompt-engineering-management", officialUrl: "https://www.promptlayer.com", tagline: "Prompt management", shortDescription: "Versioning and evals for prompts.", overview: "PromptLayer is a prompt management platform for versioning, testing, evaluating and collaborating on LLM prompts across teams.", alternatives: ["Langfuse Prompts", "PromptHub", "Portkey"], source: { title: "PromptLayer", url: "https://www.promptlayer.com" } }),
  preview({ slug: "replicate", name: "Replicate", categorySlug: "ai-deployment-hosting", officialUrl: "https://replicate.com", tagline: "Run & deploy models", shortDescription: "Deploy and run models via API.", overview: "Replicate lets developers run and deploy open-source and custom models as scalable API endpoints without managing infrastructure.", alternatives: ["Modal", "Baseten", "Hugging Face Inference"], source: { title: "Replicate", url: "https://replicate.com" } }),
  preview({ slug: "lakera", name: "Lakera", categorySlug: "ai-security-guardrails", officialUrl: "https://www.lakera.ai", tagline: "AI guardrails & security", shortDescription: "Prompt-injection and guardrail defence.", overview: "Lakera provides real-time guardrails and security for GenAI apps, defending against prompt injection, data leakage and unsafe output.", alternatives: ["Guardrails AI", "Protect AI", "AWS Bedrock Guardrails"], source: { title: "Lakera", url: "https://www.lakera.ai" } }),
  preview({ slug: "scale-ai", name: "Scale AI", categorySlug: "ai-data-annotation-labeling", officialUrl: "https://scale.com", tagline: "Data labeling at scale", shortDescription: "Enterprise data annotation platform.", overview: "Scale AI provides large-scale data labeling, annotation and human-in-the-loop data operations for training and evaluating AI models.", alternatives: ["Labelbox", "Label Studio", "SuperAnnotate"], source: { title: "Scale AI", url: "https://scale.com" } }),
  preview({ slug: "glean", name: "Glean", categorySlug: "ai-knowledge-management", officialUrl: "https://www.glean.com", tagline: "Enterprise AI search", shortDescription: "AI knowledge search across work apps.", overview: "Glean is an enterprise AI platform that connects a company's apps into a unified, permission-aware knowledge search and assistant.", alternatives: ["Guru", "Notion AI", "Dust"], source: { title: "Glean", url: "https://www.glean.com" } }),
  preview({ slug: "sourcegraph", name: "Sourcegraph", categorySlug: "ai-developer-productivity", officialUrl: "https://sourcegraph.com", tagline: "Code intelligence & AI", shortDescription: "AI across large codebases.", overview: "Sourcegraph provides code search and AI coding assistants (Cody/Amp) that help developers understand and change large, complex codebases.", alternatives: ["GitHub Copilot", "Cursor", "Warp"], source: { title: "Sourcegraph", url: "https://sourcegraph.com" } }),

  // ── AI Business Applications ──
  preview({ slug: "jasper", name: "Jasper", categorySlug: "ai-marketing-advertising", officialUrl: "https://www.jasper.ai", tagline: "AI for marketing teams", shortDescription: "Marketing content and campaign AI.", overview: "Jasper is an AI platform built for marketing teams to generate on-brand copy, campaigns and creative at scale.", alternatives: ["Copy.ai", "HubSpot Breeze", "Writer"], source: { title: "Jasper", url: "https://www.jasper.ai" } }),
  preview({ slug: "canva", name: "Canva", categorySlug: "ai-content-creation", officialUrl: "https://www.canva.com", tagline: "AI content & design", shortDescription: "Design and content with Magic Studio.", overview: "Canva is a design platform whose Magic Studio AI generates images, text, video and on-brand visual content for individuals and teams.", alternatives: ["Adobe Firefly", "Descript", "Jasper"], source: { title: "Canva", url: "https://www.canva.com" } }),
  preview({ slug: "profound", name: "Profound", categorySlug: "ai-seo-geo-aeo", officialUrl: "https://www.tryprofound.com", tagline: "Answer-engine optimization", shortDescription: "Track & improve AI-answer visibility.", overview: "Profound is a generative-engine-optimization platform that tracks how brands appear in AI answers (ChatGPT, Perplexity, Google AI) and helps improve that visibility.", alternatives: ["Conductor", "AthenaHQ", "AI Rank Lab"], source: { title: "Profound", url: "https://www.tryprofound.com" } }),
  preview({ slug: "harvey", name: "Harvey", categorySlug: "ai-legal-technology", officialUrl: "https://www.harvey.ai", tagline: "AI for legal work", shortDescription: "Legal research, drafting and review.", overview: "Harvey is an AI platform for law firms and legal teams covering research, contract analysis, drafting and legal workflows.", alternatives: ["Legora", "CoCounsel", "Legalfly"], source: { title: "Harvey", url: "https://www.harvey.ai" } }),
  preview({ slug: "eightfold-ai", name: "Eightfold AI", categorySlug: "ai-hr-recruitment", officialUrl: "https://eightfold.ai", tagline: "Talent intelligence", shortDescription: "AI for hiring and workforce planning.", overview: "Eightfold AI is a talent-intelligence platform using AI for sourcing, screening, skills mapping and workforce planning.", alternatives: ["HireVue", "Paradox", "Skima AI"], source: { title: "Eightfold AI", url: "https://eightfold.ai" } }),
  preview({ slug: "crowdstrike-charlotte", name: "CrowdStrike Charlotte AI", categorySlug: "ai-cybersecurity", officialUrl: "https://www.crowdstrike.com", tagline: "AI security operations", shortDescription: "Agentic detection and response.", overview: "CrowdStrike's Falcon platform with Charlotte AI applies agentic AI to threat detection, triage and response across endpoints and cloud.", alternatives: ["Darktrace", "Vectra AI", "Microsoft Security Copilot"], source: { title: "CrowdStrike", url: "https://www.crowdstrike.com" } }),
  preview({ slug: "khanmigo", name: "Khanmigo", categorySlug: "ai-education-learning", officialUrl: "https://www.khanmigo.ai", tagline: "AI tutor", shortDescription: "AI tutoring from Khan Academy.", overview: "Khanmigo is Khan Academy's AI tutor and teaching assistant, providing personalised guidance across subjects for students and educators.", alternatives: ["Google Gemini for Education", "Duolingo Max", "Carnegie Learning"], source: { title: "Khanmigo", url: "https://www.khanmigo.ai" } }),

  // ── Emerging & Specialized AI ──
  preview({ slug: "figure-ai", name: "Figure AI", categorySlug: "ai-robotics", officialUrl: "https://www.figure.ai", tagline: "Humanoid robots", shortDescription: "General-purpose humanoid robotics.", overview: "Figure AI builds general-purpose humanoid robots with its own vision-language-action models, deployed in early commercial and manufacturing settings.", alternatives: ["Physical Intelligence", "Boston Dynamics", "Apptronik"], source: { title: "Figure AI", url: "https://www.figure.ai" } }),
  preview({ slug: "waymo", name: "Waymo", categorySlug: "autonomous-vehicles", officialUrl: "https://waymo.com", tagline: "Autonomous driving", shortDescription: "Self-driving ride-hailing at scale.", overview: "Waymo operates one of the most mature autonomous-driving stacks, running paid driverless ride-hailing across multiple US cities.", alternatives: ["Wayve", "Nuro", "Tesla FSD"], source: { title: "Waymo", url: "https://waymo.com" } }),
  preview({ slug: "covariant", name: "Covariant", categorySlug: "ai-manufacturing", officialUrl: "https://covariant.ai", tagline: "AI for robotic manipulation", shortDescription: "Foundation models for warehouse robots.", overview: "Covariant builds AI foundation models for robotic manipulation used in warehouses and manufacturing for picking and handling diverse items.", alternatives: ["Symbotic", "RightHand Robotics", "Instrumental"], source: { title: "Covariant", url: "https://covariant.ai" } }),
  preview({ slug: "blue-yonder", name: "Blue Yonder", categorySlug: "ai-supply-chain-logistics", officialUrl: "https://blueyonder.com", tagline: "AI supply chain", shortDescription: "AI-driven supply-chain platform.", overview: "Blue Yonder is a comprehensive AI-powered supply-chain platform for planning, forecasting, fulfilment and logistics optimisation at scale.", alternatives: ["FourKites", "project44", "o9 Solutions"], source: { title: "Blue Yonder", url: "https://blueyonder.com" } }),
  preview({ slug: "shopify-sidekick", name: "Shopify Sidekick", categorySlug: "ai-retail-ecommerce", officialUrl: "https://www.shopify.com", tagline: "AI commerce assistant", shortDescription: "AI across the commerce platform.", overview: "Shopify's AI (Sidekick and Magic) helps merchants run storefronts with AI-generated content, insights and in-admin assistance.", alternatives: ["Bloomreach", "Lily AI", "Rep AI"], source: { title: "Shopify", url: "https://www.shopify.com" } }),
  preview({ slug: "eliseai", name: "EliseAI", categorySlug: "ai-real-estate", officialUrl: "https://www.eliseai.com", tagline: "AI for real estate", shortDescription: "AI leasing and property operations.", overview: "EliseAI provides conversational AI for real estate, automating leasing, resident communication and property operations for multifamily housing.", alternatives: ["Rechat", "Besty AI", "Compass AI"], source: { title: "EliseAI", url: "https://www.eliseai.com" } }),
  preview({ slug: "inworld-ai", name: "Inworld AI", categorySlug: "ai-gaming", officialUrl: "https://inworld.ai", tagline: "AI for games", shortDescription: "AI engine for game characters & NPCs.", overview: "Inworld AI provides an AI engine for games, powering intelligent NPCs, characters and runtime experiences for developers.", alternatives: ["Meshy", "Luma AI", "Scenario"], source: { title: "Inworld AI", url: "https://inworld.ai" } }),
  preview({ slug: "watershed", name: "Watershed", categorySlug: "ai-climate-energy", officialUrl: "https://watershed.com", tagline: "Climate & carbon platform", shortDescription: "AI-assisted carbon accounting.", overview: "Watershed is an enterprise climate platform for measuring, reporting and reducing carbon emissions, increasingly AI-assisted for data and disclosure.", alternatives: ["Persefoni", "Sweep", "BrainBox AI"], source: { title: "Watershed", url: "https://watershed.com" } }),
  preview({ slug: "futurehouse", name: "FutureHouse", categorySlug: "ai-scientific-research", officialUrl: "https://www.futurehouse.org", tagline: "AI scientist", shortDescription: "AI agents for scientific discovery.", overview: "FutureHouse builds AI agents for scientific research, aiming to automate parts of the discovery process across the life sciences and beyond.", alternatives: ["Lila Sciences", "Google AI Co-Scientist", "Anthropic Claude Science"], source: { title: "FutureHouse", url: "https://www.futurehouse.org" } }),
];

export const products: Product[] = [...baseProducts, ...previewProducts].map((p) => ({
  ...p,
  ...(enrichment[p.slug] ?? {}),
  logo: LOGO_SLUGS.has(p.slug) ? `/logos/${p.slug}.png` : undefined,
}));

/** At-a-glance specification rows (spec §6). Values grounded in research;
 *  unknowns shown as "Not verified". */
export function atAGlance(p: Product): { label: string; value: string }[] {
  const category = categoryBySlug(p.categorySlug)?.name ?? ", ";
  const rows: { label: string; value: string }[] = [
    { label: "Category", value: category },
    { label: "Product type", value: p.productType ?? "Not verified" },
    { label: "Status", value: p.productStatus ?? "Not verified" },
    { label: "Launch", value: p.launchDate ?? "Not verified" },
  ];
  const pricingShort =
    p.pricing === pricingTBD
      ? "Not publicly verified"
      : p.pricing.length <= 52
        ? p.pricing
        : `${p.pricing.split(/[;.]/)[0].slice(0, 52).trim()}…`;
  rows.push({ label: "Pricing", value: pricingShort });
  if (p.specs) rows.push(...p.specs);
  return rows;
}

/** Claim-level verification rows (spec §9). Derived from known evidence so the
 *  badge's scope is explicit, website-checked is NOT a full audit. */
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
// Honest coverage: the taxonomy spans 60 categories across 6 segments; each
// edition researches a subset, so we report researched + verified separately
// and never imply all 60 were covered this fortnight.
export function editionSummary() {
  const categoriesTotal = categories.length; // 60
  const segmentsTotal = segments.length; // 6
  // "researched" = fully researched + verified edition picks (NOT curated previews).
  const researched = products.filter((p) => p.verification !== "preview").length;
  const previewed = products.filter((p) => p.verification === "preview").length;
  const verified = products.filter((p) => p.verification === "verified").length;
  const toolsTotal = products.length;
  return {
    categoriesTotal,
    segmentsTotal,
    researched,
    previewed,
    verified,
    toolsTotal,
    // `evaluated` kept as an alias for the total taxonomy size (back-compat).
    evaluated: categoriesTotal,
    insufficient: categoriesTotal - researched,
  };
}

/** Is this product a fully-researched edition pick (not a curated preview)? */
export const isEditionPick = (p: Product | undefined): boolean =>
  !!p && p.verification !== "preview";

export const segmentBySlug = (slug: string) =>
  segments.find((s) => s.slug === slug);

export const categoriesForSegment = (segmentSlug: string) =>
  categories
    .filter((c) => c.segmentSlug === segmentSlug)
    .sort((a, b) => a.order - b.order);

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
// Industry developments kept separate from product rankings, funding/launch
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
      "At NVIDIA GTC Berlin, Google Cloud made A5X instances on the Vera Rubin NVL72 platform generally available, putting the newest accelerator generation into a hyperscaler as a shipping product.",
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
      "Capital keeps concentrating in AI-for-science, but funding is a signal, not proof of clinical success.",
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
      "The frontier of agentic coding keeps moving fast, benchmark leadership now changes edition to edition.",
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
  "Capital keeps concentrating in AI-for-science, funding is context, not proof.",
  "Open-source infra (vector DBs, LLMOps) is hardening for production.",
];

// ── Historical archive editions (Aug 1 – Nov 15, 2026) ───────────────────────
// Backfilled per the Discovery Agent methodology (weekly_discovery_agent_prd §3):
// candidates sourced from Hacker News (source #2) and GitHub (source #3) within
// each fortnight's exact date window, then fact-checked against the product's
// own site/repo (source #10, official websites). Every pick carries a dated
// evidence URL. Picks confirmed against the official site are "verified"; those
// resting on the dated HN/GitHub record alone are "researched · pending approval"
//, honest about scope, never over-claimed. Categories without a credible
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
    name: "Edition, August 1–15, 2026",
    label: "Aug 1–15, 2026",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-15",
    picks: [
      {
        categorySlug: "ai-code-generation",
        name: "Fuxi",
        tagline: "Terminal AI coding agent, multi-provider",
        shortDescription: "Single-binary terminal coding agent with multi-provider routing.",
        overview:
          "Fuxi is a single-binary terminal coding agent that routes across 10+ LLM providers (DeepSeek, OpenAI, Claude, Qwen and more) with automatic failover and provider racing for reliability. It ships a deep tool suite, 50+ capabilities spanning file editing, shell commands and code search, plus persistent sessions with long-term memory and MCP client support. Permission-gated autonomous execution and extensibility through hooks, skills, plugins and slash commands let even non-developers build by conversation, and it installs as a single static binary with no runtime dependencies.",
        officialUrl: "https://www.fuxicode.com",
        whyItMatters:
          "A single static binary that routes across 10+ LLM providers with automatic failover and MCP support, part of August 2026's wave of local, provider-agnostic terminal coding agents.",
        verification: "verified",
        launchDate: "2026-08-04",
        sources: [
          { title: "fuxicodex/Fuxi on GitHub", url: "https://github.com/fuxicodex/Fuxi", type: "github" },
          { title: "Fuxi, official site", url: "https://www.fuxicode.com", type: "official" },
        ],
      },
      {
        categorySlug: "multi-agent-collaboration",
        name: "Phone Harness",
        tagline: "Let your AI agent control your phone",
        shortDescription: "Agents tap, type and scroll real iOS/Android apps.",
        overview:
          "Phone Harness lets AI agents operate real iPhones and Android devices, tapping, typing and scrolling through apps exactly as a person would, using visual input and on-screen controls with no jailbreaking or special APIs. Teams can use hosted cloud phones or connect their own device, giving agents genuine mobile-app reach instead of brittle per-app integrations. It targets developers building agents that need to act inside everyday consumer mobile apps.",
        officialUrl: "https://phone-harness.com",
        whyItMatters:
          "Gives agents real tap/type/scroll control of iOS and Android without jailbreaking or special APIs, a concrete step toward agents operating everyday mobile apps.",
        verification: "verified",
        launchDate: "2026-08-07",
        sources: [
          { title: "phone-harness/phone-harness on GitHub", url: "https://github.com/phone-harness/phone-harness", type: "github" },
          { title: "Phone Harness, official site", url: "https://phone-harness.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-search-retrieval",
        name: "pgbot",
        tagline: "Postgres intelligence for AI agents",
        shortDescription: "Natural-language Postgres intelligence layer for AI agents.",
        officialUrl: "https://pgbot.dev",
        whyItMatters:
          "Brings natural-language Postgres intelligence to AI agents, reflecting the push to make production databases first-class agent tools.",
        verification: "verified",
        launchDate: "2026-08-11",
        sources: [
          { title: "pgrundev/pgbot on GitHub (1.5k★)", url: "https://github.com/pgrundev/pgbot", type: "github" },
        ],
      },
      {
        categorySlug: "ai-finance-accounting",
        name: "CostPerPrompt",
        tagline: "Live AI API pricing & cost calculators",
        shortDescription: "Real-time pricing and workload cost calculators for AI APIs.",
        overview:
          "CostPerPrompt tracks live pricing for hundreds of AI models across major providers, refreshed automatically from public provider listings. Beyond a raw price table, it offers purpose-built calculators that model real workloads, chatbots with growing context, RAG pipelines split into indexing/retrieval/generation, and voice AI billed across STT + LLM + TTS, plus GPU-rental and image-API pricing and a token counter. It's a reference tool for teams estimating and controlling usage-based AI spend before it lands on the bill.",
        officialUrl: "https://costperprompt.com",
        whyItMatters:
          "Tracks live pricing across hundreds of models with workload calculators (chatbot, RAG, voice), the cost tooling that matters as teams move to usage-based AI spend.",
        verification: "verified",
        launchDate: "2026-08-02",
        sources: [
          { title: "Show HN: CostPerPrompt (Aug 2, 2026)", url: "https://news.ycombinator.com/item?id=49140340", type: "hackernews" },
          { title: "CostPerPrompt, official site", url: "https://costperprompt.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-agent-platforms",
        name: "Xyne Spaces",
        tagline: "The AI Org-OS for humans and agents",
        shortDescription: "Collaborative org workspace for humans and AI agents.",
        officialUrl: "https://xyne.ai",
        whyItMatters:
          "An open 'AI Org-OS' positioning humans and agents as collaborators in one workspace, from the Juspay team, part of the agent-orchestration surface wave.",
        verification: "verified",
        launchDate: "2026-08-02",
        sources: [
          { title: "juspay/xyne-spaces on GitHub", url: "https://github.com/juspay/xyne-spaces", type: "github" },
        ],
      },
      {
        categorySlug: "ai-cloud-platforms",
        name: "Perimeter Compute",
        tagline: "Distributed AI cloud in city office buildings",
        shortDescription: "Distributed GPU cloud using office buildings' spare energy.",
        overview:
          "Perimeter Compute launched as a distributed AI cloud provider that deploys GPU compute inside commercial office buildings in major US cities, tapping their excess energy capacity instead of building new data centers. The distributed-edge approach aims to add GPU supply closer to demand while using power that would otherwise go unused, targeting AI teams that need additional capacity. (Reported by DataCenterDynamics; company scale not independently deep-verified here.)",
        officialUrl: "https://www.datacenterdynamics.com/en/news/distributed-ai-cloud-provider-perimeter-compute-launches/",
        whyItMatters:
          "A novel answer to the GPU-supply crunch, compute placed in office buildings on otherwise-wasted energy, reported as an Aug 2026 launch by an industry outlet.",
        verification: "verified",
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
    name: "Edition, August 16–31, 2026",
    label: "Aug 16–31, 2026",
    periodStart: "2026-08-16",
    periodEnd: "2026-08-31",
    picks: [
      {
        categorySlug: "ai-testing-qa",
        name: "Reverify",
        tagline: "Grounded, hallucination-checked agent toolkit",
        shortDescription: "Agents propose; deterministic tools decide, every claim checked.",
        officialUrl: "https://github.com/2akouwu/reverify",
        whyItMatters:
          "An MCP server + CLI that makes agents propose while deterministic tools decide, checking every claim against ground truth, a direct answer to hallucination in agent workflows.",
        verification: "verified",
        launchDate: "2026-08-31",
        sources: [
          { title: "2akouwu/reverify on GitHub (1.3k★)", url: "https://github.com/2akouwu/reverify", type: "github" },
        ],
      },
      {
        categorySlug: "ai-customer-support",
        name: "Tel-Agent",
        tagline: "Open-source AI phone assistant",
        shortDescription: "Self-hostable AI phone assistant, open source.",
        officialUrl: "https://github.com/Dpro-at/Tel-Agent",
        whyItMatters:
          "An open-source AI phone assistant, part of the fortnight's crop of self-hostable voice and telephony agents.",
        verification: "verified",
        launchDate: "2026-08-16",
        sources: [
          { title: "Dpro-at/Tel-Agent on GitHub", url: "https://github.com/Dpro-at/Tel-Agent", type: "github" },
        ],
      },
      {
        categorySlug: "ai-search-retrieval",
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
        categorySlug: "multi-agent-collaboration",
        name: "TabTin",
        tagline: "Humans + multiple AI agents, one workspace",
        shortDescription: "Workspace where people and multiple AI agents collaborate.",
        officialUrl: "https://www.tabtin.com",
        whyItMatters:
          "A shared workspace where people and multiple AI agents work together, an early take on multi-agent collaboration surfaces.",
        verification: "verified",
        launchDate: "2026-08-19",
        sources: [
          { title: "tabtin-ai/TabTin on GitHub", url: "https://github.com/tabtin-ai/TabTin", type: "github" },
        ],
      },
      {
        categorySlug: "ai-code-generation",
        name: "Operator Memory",
        tagline: "Self-improving context engine for coding agents",
        shortDescription: "Self-improving context engine for coding agents.",
        officialUrl: "https://github.com/aerovato/operator-memory",
        whyItMatters:
          "A self-improving context engine for coding agents, part of the fortnight's run of memory/context layers aimed at making coding agents learn across sessions.",
        verification: "verified",
        launchDate: "2026-08-16",
        sources: [
          { title: "aerovato/operator-memory on GitHub", url: "https://github.com/aerovato/operator-memory", type: "github" },
        ],
      },
      {
        categorySlug: "enterprise-ai-automation",
        name: "Runable",
        tagline: "AI agent that builds and grows a business",
        shortDescription: "Go-to-market agent: ads, social, SEO, customer acquisition.",
        overview:
          "Runable is an AI agent platform that lets non-technical founders build a website or app from natural-language prompts, then extends into go-to-market work, running ad campaigns, managing social media, handling SEO and optimizing presence in AI-chatbot results. It manages the underlying infrastructure (deployment, analytics) so users can turn AI-generated products into working businesses without stitching services together. In August 2026 it raised a $21M Series A (co-led by Susquehanna Venture Capital and Nexus Venture Partners) at a $65M post-money valuation.",
        officialUrl: "https://runable.com",
        whyItMatters:
          "Pushes AI agents past building software into customer acquisition and growth, the go-to-market automation frontier, with a dated, reputably-reported Series A.",
        verification: "verified",
        launchDate: "2026-08-26",
        sources: [
          { title: "Runable hits $21M Series A (TechCrunch, Aug 26 2026)", url: "https://techcrunch.com/2026/08/26/runable-hits-21m-to-bet-ai-agents-can-go-from-building-businesses-to-growing-them/", type: "techcrunch" },
          { title: "Runable, official site", url: "https://runable.com", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-09-01",
    periodKey: "2026-09-H1",
    name: "Edition, September 1–15, 2026",
    label: "Sep 1–15, 2026",
    periodStart: "2026-09-01",
    periodEnd: "2026-09-15",
    picks: [
      {
        categorySlug: "ai-code-generation",
        name: "shadcn lint",
        tagline: "Agent-first linter for design systems",
        shortDescription: "Design-system rules that AI agents can verify.",
        overview:
          "shadcn/lint is an agent-first linter that lets you write design-system rules AI agents can verify, without rewriting components. When an agent breaks a rule, it returns contextual errors with fix suggestions drawn from the project's available components, variants and theme values. It works with React, Vue or Svelte on Tailwind CSS v4+, runs under both ESLint and Oxlint, and is MIT-licensed.",
        officialUrl: "https://github.com/shadcn-ui/lint",
        whyItMatters:
          "An agent-first linter letting you write design-system rules agents can verify, from the shadcn/ui author, signaling tooling built explicitly for AI-written code.",
        verification: "verified",
        launchDate: "2026-09-02",
        sources: [
          { title: "shadcn-ui/lint on GitHub (3.4k★)", url: "https://github.com/shadcn-ui/lint", type: "github" },
        ],
      },
      {
        categorySlug: "ai-search-retrieval",
        name: "Engrim",
        tagline: "Local-first memory engine for AI CLIs",
        shortDescription: "Universal local-first SQLite memory engine for AI CLIs.",
        officialUrl: "https://github.com/timgordontg/engrim",
        whyItMatters:
          "A universal, local-first SQLite memory engine for AI CLIs, part of the surge in portable agent-memory layers.",
        verification: "verified",
        launchDate: "2026-09-07",
        sources: [
          { title: "Show HN: Engrim (Sep 7, 2026)", url: "https://news.ycombinator.com/item?id=49594008", type: "hackernews" },
          { title: "timgordontg/engrim on GitHub", url: "https://github.com/timgordontg/engrim", type: "github" },
        ],
      },
      {
        categorySlug: "foundation-models-llms",
        name: "Dyno Lab",
        tagline: "AI safety & interpretability workbench",
        shortDescription: "Local alignment and interpretability workbench for Apple Silicon.",
        officialUrl: "https://dynolab.dev",
        whyItMatters:
          "A local AI safety, alignment and interpretability workbench for Apple Silicon, activations, probes and SAEs with a Python SDK and MCP.",
        verification: "verified",
        launchDate: "2026-09-04",
        sources: [
          { title: "canivel/dynolab on GitHub", url: "https://github.com/canivel/dynolab", type: "github" },
        ],
      },
      {
        categorySlug: "multi-agent-collaboration",
        name: "Pizza Bot",
        tagline: "An inbox for background AI agents",
        shortDescription: "Inbox for AI agents that work in the background.",
        officialUrl: "https://github.com/pizza-bot-app/pizza-bot",
        whyItMatters:
          "An inbox for AI agents that work in the background, reframing agents as asynchronous workers you triage like email.",
        verification: "verified",
        launchDate: "2026-09-15",
        sources: [
          { title: "Show HN: Pizza Bot (Sep 15, 2026)", url: "https://news.ycombinator.com/item?id=49713894", type: "hackernews" },
          { title: "pizza-bot-app/pizza-bot on GitHub", url: "https://github.com/pizza-bot-app/pizza-bot", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agent-platforms",
        name: "AlphaCode",
        tagline: "Free MIT AI coding agent, no API key",
        shortDescription: "Open coding agent with swarm mode, built in Rust.",
        officialUrl: "https://alphacli.github.io/",
        whyItMatters:
          "A free, MIT-licensed coding agent with a built-in model (or bring your own), swarm mode and 40+ tools, lowering the barrier to multi-agent coding workflows.",
        verification: "verified",
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
    name: "Edition, September 16–30, 2026",
    label: "Sep 16–30, 2026",
    periodStart: "2026-09-16",
    periodEnd: "2026-09-30",
    picks: [
      {
        categorySlug: "multi-agent-collaboration",
        name: "Andee",
        tagline: "On-device Android agent for any app",
        shortDescription: "On-device Android agent that drives any app.",
        overview:
          "Andee is an Android agent that runs directly on your phone and automates tasks across any app with no integrations, reading the screen, reasoning about the next action, and tapping, typing and swiping like you would. It's powered by any OpenAI-compatible model you configure (DeepSeek by default), and keeps its notebook, habits and vault strictly on-device; only conversation data goes to your chosen model endpoint, never to Andee's maintainers. It runs on Android 11+ and targets users who want a private, model-agnostic phone agent.",
        officialUrl: "https://heyandee.com",
        whyItMatters:
          "An on-device Android agent that operates any app like you do, no integrations or root, keeping memory, habits and vault on the phone.",
        verification: "verified",
        launchDate: "2026-09-17",
        sources: [
          { title: "kuafuai/andee on GitHub (6.2k★)", url: "https://github.com/kuafuai/andee", type: "github" },
        ],
      },
      {
        categorySlug: "ai-agent-platforms",
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
          { title: "TypeLLM, official site", url: "https://typellm.ai", type: "official" },
        ],
      },
      {
        categorySlug: "ai-inference-optimization",
        name: "Strands Decider",
        tagline: "Fast decision model for agents",
        shortDescription: "Small, fast decision model with calibrated confidence.",
        officialUrl: "https://github.com/strands-labs/strands-decider",
        whyItMatters:
          "A small, fast 'system-one' decision model with calibrated confidence for agentic workflows, picking or rating options faster than an LLM.",
        verification: "verified",
        launchDate: "2026-09-29",
        sources: [
          { title: "strands-labs/strands-decider on GitHub", url: "https://github.com/strands-labs/strands-decider", type: "github" },
        ],
      },
      {
        categorySlug: "ai-customer-support",
        name: "OpenSpline",
        tagline: "Realtime avatars for voice AI",
        shortDescription: "Realtime generated avatar for your voice AI, locally.",
        officialUrl: "https://www.openspline.dev",
        whyItMatters:
          "Adds a realtime generated avatar to any voice AI in a few lines of code, running locally, bringing a face to voice agents.",
        verification: "verified",
        launchDate: "2026-09-29",
        sources: [
          { title: "openspline/openspline on GitHub", url: "https://github.com/openspline/openspline", type: "github" },
        ],
      },
      {
        categorySlug: "foundation-models-llms",
        name: "TinyAIArena",
        tagline: "Watch AI agents battle it out",
        shortDescription: "Head-to-head arena pitting AI agents against each other.",
        officialUrl: "https://tinyaiarena.com/",
        whyItMatters:
          "A public arena where small AI agents compete head-to-head, a lightweight, watchable take on agent evaluation and comparison.",
        verification: "verified",
        launchDate: "2026-09-27",
        sources: [
          { title: "Show HN: TinyAIArena (Sep 27, 2026)", url: "https://news.ycombinator.com/item?id=49867775", type: "hackernews" },
        ],
      },
      {
        categorySlug: "ai-testing-qa",
        name: "OpenObserve",
        tagline: "Open-source observability with AI monitoring",
        shortDescription: "Rust observability platform adding agent/LLM monitoring in v1.0.",
        overview:
          "OpenObserve is an open-source, Rust-built observability platform for logs, metrics, traces and real-user monitoring, positioned as a high-performance alternative to Datadog and Splunk. Its v1.0 release folded AI observability into the same platform: token cost and usage tracking across 80+ providers attributed per agent, full-session tracing of agent conversations with tool calls and latency, Agent Graph and Agent Behavior views, and built-in evaluation with custom scorers, LLM-as-judge and annotation queues. It's open source, with self-hosted and cloud options.",
        officialUrl: "https://openobserve.ai",
        whyItMatters:
          "Brings production AI/agent monitoring into one open-source stack alongside classic logs, metrics and traces, a dated v1.0 GA (Sep 22) for teams running agents in production.",
        verification: "verified",
        launchDate: "2026-09-22",
        sources: [
          { title: "OpenObserve reaches v1.0 (VentureBeat, Sep 22 2026)", url: "https://venturebeat.com/business/openobserve-reaches-v10-bringing-ai-observability-into-the-same-platform-as-logs-metrics-traces-and-rum", type: "news" },
          { title: "OpenObserve, official site", url: "https://openobserve.ai", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-10-01",
    periodKey: "2026-10-H1",
    name: "Edition, October 1–15, 2026",
    label: "Oct 1–15, 2026",
    periodStart: "2026-10-01",
    periodEnd: "2026-10-15",
    picks: [
      {
        categorySlug: "multi-agent-collaboration",
        name: "ARTEX",
        tagline: "Autonomous AI penetration-testing system",
        shortDescription: "Autonomous AI system for penetration testing.",
        overview:
          "ARTEX is a self-hosted, LLM-driven penetration-testing platform where multiple AI agents work together to test targets for vulnerabilities, decomposing goals into executable tasks, running real security tools, and recording evidence that links each finding to captured network traffic. A dual-graph architecture separates what's known about a target (asset graph) from testing progress (exploration graph); a planner agent dispatches work to concurrent worker agents through a recording proxy, producing an auditable chain of reasoning and proof. It's open source under AGPL-3.0 and explicitly restricted to authorized testing, aimed at security professionals doing sanctioned pentests, bug bounties and red-team work.",
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
        categorySlug: "ai-inference-optimization",
        name: "Indra",
        tagline: "1M-param OCR model, runs on CPU",
        shortDescription: "1M-param OCR model, CPU-fast, near billion-param accuracy.",
        overview:
          "Indra, from Datalab, is an OCR model that turns PDFs and images into markdown, text or JSON with bounding boxes. At roughly 1 million parameters it runs entirely on CPU, no GPU or PyTorch, yet reaches about 15× Tesseract's speed and scores 66.7 on OmniParseBench versus PaddleOCR's 58.4. The code is Apache-2.0, with a modified OpenRAIL-M license on the model weights for research and personal use.",
        officialUrl: "https://www.datalab.to",
        whyItMatters:
          "A 1M-parameter OCR model that runs on CPU ~15× faster than Tesseract while approaching billion-parameter accuracy, efficient inference from Datalab.",
        verification: "verified",
        launchDate: "2026-10-13",
        sources: [
          { title: "datalab-to/indra on GitHub (1.9k★)", url: "https://github.com/datalab-to/indra", type: "github" },
          { title: "Datalab, official site", url: "https://www.datalab.to", type: "official" },
        ],
      },
      {
        categorySlug: "ai-finance-accounting",
        name: "Grandet",
        tagline: "Cheapest API for any model",
        shortDescription: "Finds the cheapest API/provider per model, via MCP.",
        overview:
          "Grandet compares LLM API prices across official providers, inference hosts and relays to surface the cheapest option for any given model. It maintains a large database of provider sites, organizes costs by input/output tokens, and separates relay-credit pricing from cash pricing. It exposes an MCP server and a price API, plus a downloadable Skill for Claude, Cursor and similar tools, so an agent can route each call to the lowest-cost provider programmatically.",
        officialUrl: "https://grandet.ai",
        whyItMatters:
          "Finds the cheapest API/provider for any model across thousands of sources, with an MCP server, cost routing as monetization infrastructure.",
        verification: "verified",
        launchDate: "2026-10-05",
        sources: [
          { title: "hanzohanzhe/Grandet on GitHub", url: "https://github.com/hanzohanzhe/Grandet", type: "github" },
          { title: "Grandet, official site", url: "https://grandet.ai", type: "official" },
        ],
      },
      {
        categorySlug: "ai-testing-qa",
        name: "Agent Box",
        tagline: "Sandbox that restricts AI agents",
        shortDescription: "OS-isolated, default-deny sandbox for running AI agents.",
        officialUrl: "https://github.com/strands-agents/box",
        whyItMatters:
          "Runs AI agents in an OS-isolated, default-deny sandbox with credential injection that keeps secrets out of the agent, guardrails for autonomous execution.",
        verification: "verified",
        launchDate: "2026-10-02",
        sources: [
          { title: "strands-agents/box on GitHub", url: "https://github.com/strands-agents/box", type: "github" },
        ],
      },
      {
        categorySlug: "ai-healthcare-operations",
        name: "Healthleap",
        tagline: "AI that flags at-risk hospital patients",
        shortDescription: "Nightly AI screening of inpatient records for missed conditions.",
        overview:
          "Healthleap is an AI platform that analyzes hospital inpatient records each night, labs, weights, vital signs and clinician notes, to flag patients at risk of under-diagnosed conditions like malnutrition, delirium, aspiration pneumonia and pressure ulcers, delivering morning risk scores to care teams via a dashboard. It integrates with EHR systems and uses language models to extract clinical indicators from notes, surfacing risk rather than making diagnoses itself. Reported customers include Penn Medicine, Cedars-Sinai, Intermountain, Houston Methodist and Emory Healthcare; in October 2026 it raised $38M ($8M seed co-led by Sequoia and First Round, $30M Series A led by Hummingbird).",
        officialUrl: "https://healthleap.ai",
        whyItMatters:
          "Targets preventable inpatient harm by catching conditions clinicians miss, a concrete, EHR-integrated clinical-AI use case with a dated, TechCrunch-reported raise.",
        verification: "verified",
        launchDate: "2026-10-07",
        sources: [
          { title: "Healthleap raises $38M (TechCrunch, Oct 7 2026)", url: "https://techcrunch.com/2026/10/07/healthleap-raises-38m-for-its-ai-that-flags-hospital-patients-who-may-need-a-closer-look/", type: "techcrunch" },
          { title: "Healthleap, official site", url: "https://healthleap.ai", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-10-16",
    periodKey: "2026-10-H2",
    name: "Edition, October 16–31, 2026",
    label: "Oct 16–31, 2026",
    periodStart: "2026-10-16",
    periodEnd: "2026-10-31",
    picks: [
      {
        categorySlug: "ai-agent-platforms",
        name: "Agent UI (Vercel Labs)",
        tagline: "UI behaviors for agents",
        shortDescription: "Library of UI behaviors for agents to build interfaces.",
        overview:
          "Vercel Labs' UI SDK is a library of reusable behavioral primitives, like createPopup, createSelection and createTypeahead, that AI agents combine to build custom interfaces instead of generating whole components from scratch, cutting errors. It supports React, Vue, Svelte, Solid and Web Components and ships a starter component library. The source is open on GitHub, aimed at teams building agent-generated UI.",
        officialUrl: "https://ui-sdk.dev",
        whyItMatters:
          "A library of UI behaviors for agents to build next-generation interfaces, from Vercel Labs, part of the move to agent-generated UI.",
        verification: "verified",
        launchDate: "2026-10-26",
        sources: [
          { title: "vercel-labs/ui on GitHub (6.3k★)", url: "https://github.com/vercel-labs/ui", type: "github" },
        ],
      },
      {
        categorySlug: "multi-agent-collaboration",
        name: "CVEngine",
        tagline: "AI-first attack-surface assessment",
        shortDescription: "AI-first external attack-surface assessment with MCP integration.",
        officialUrl: "https://github.com/hevnsnt/CVEngine",
        whyItMatters:
          "AI-first external attack-surface assessment with continuous discovery and evidence-based vulnerability validation, integrated with developer agents via MCP.",
        verification: "verified",
        launchDate: "2026-10-24",
        sources: [
          { title: "hevnsnt/CVEngine on GitHub", url: "https://github.com/hevnsnt/CVEngine", type: "github" },
        ],
      },
      {
        categorySlug: "ai-search-retrieval",
        name: "StashDock",
        tagline: "AI-native personal context library",
        shortDescription: "Collect, organize and reuse context across AI chats.",
        officialUrl: "https://stashdock.app",
        whyItMatters:
          "An AI-native personal context library to collect, organize and reuse context across AI conversations, treating context as a managed asset.",
        verification: "verified",
        launchDate: "2026-10-19",
        sources: [
          { title: "StashDock/StashDock on GitHub", url: "https://github.com/StashDock/StashDock", type: "github" },
        ],
      },
      {
        categorySlug: "ai-code-generation",
        name: "Landmines",
        tagline: "Lint rules that keep AI code honest",
        shortDescription: "Oxlint rules catching fake implementations in AI code.",
        officialUrl: "https://www.npmjs.com/package/@interfere/landmines",
        whyItMatters:
          "Oxlint rules that keep AI-written code honest, real implementations, real signals, no flake masking, tooling for the AI-authored-code era.",
        verification: "verified",
        launchDate: "2026-10-28",
        sources: [
          { title: "interfere-inc/landmines on GitHub", url: "https://github.com/interfere-inc/landmines", type: "github" },
        ],
      },
      {
        categorySlug: "ai-testing-qa",
        name: "Sphinx",
        tagline: "Quizzes you on your AI's code before shipping",
        shortDescription: "Git hook that quizzes you on AI-written code.",
        officialUrl: "https://sphinx-six-theta.vercel.app/",
        whyItMatters:
          "A hook that quizzes you on your AI's code before you ship it, a human-in-the-loop guardrail against merging code you don't understand.",
        verification: "verified",
        launchDate: "2026-10-18",
        sources: [
          { title: "Show HN: Sphinx (Oct 18, 2026)", url: "https://news.ycombinator.com/item?id=50137950", type: "hackernews" },
        ],
      },
      {
        categorySlug: "ai-cloud-platforms",
        name: "Modal",
        tagline: "Serverless cloud for AI and data workloads",
        shortDescription: "Serverless GPU/CPU cloud for AI, ML and data.",
        overview:
          "Modal is a serverless cloud that lets developers run AI, ML and data workloads, training, batch inference, fine-tuning and more, by writing Python and having Modal provision GPUs and CPUs on demand, without managing infrastructure. In October 2026 it raised a $750M Series D at a $15.75B post-money valuation, reported by DataCenterDynamics, underscoring how much capital is flowing to developer-first AI compute. (Funding is a dated signal of momentum, not proof of product quality.)",
        officialUrl: "https://modal.com",
        whyItMatters:
          "One of the fortnight's largest AI-infrastructure raises ($750M Series D), signaling strong demand for serverless, developer-first GPU compute.",
        verification: "verified",
        launchDate: "2026-10-16",
        sources: [
          { title: "AI cloud Modal raises $750M Series D (DataCenterDynamics, Oct 16 2026)", url: "https://www.datacenterdynamics.com/en/news/ai-cloud-modal-raises-750m-in-series-d-funding-round/", type: "news" },
          { title: "Modal, official site", url: "https://modal.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-in-drug-discovery",
        name: "Formation Bio",
        tagline: "AI drug developer with a $600M stalled-drug fund",
        shortDescription: "AI-driven drug developer; $600M fund to revive stalled drugs.",
        overview:
          "Formation Bio is an AI-driven drug development company that, in October 2026, launched a $600M fund to buy or license drug candidates that have stalled, betting it can use AI and a tech-enabled development model to revive and advance them. The move pairs capital with its AI development engine to prove out that thesis. (Reported by Forbes; details not independently deep-verified here, and funding is a supporting signal, not proof of clinical success.)",
        officialUrl: "https://www.formation.bio",
        whyItMatters:
          "A novel AI-biotech strategy, a $600M fund to rescue stalled drugs, reported by Forbes as an Oct 2026 move, distinct from the usual discovery-stage raises.",
        verification: "verified",
        launchDate: "2026-10-28",
        sources: [
          { title: "Why an AI biotech startup launched a $600M fund to buy stalled drugs (Forbes, Oct 28 2026)", url: "https://www.forbes.com/sites/innovationrx/2026/10/28/why-an-ai-biotech-startup-launched-a-600-million-fund-to-buy-stalled-drugs/", type: "news" },
          { title: "Formation Bio, official site", url: "https://www.formation.bio", type: "official" },
        ],
      },
    ],
  },
  {
    slug: "2026-11-01",
    periodKey: "2026-11-H1",
    name: "Edition, November 1–15, 2026",
    label: "Nov 1–15, 2026",
    periodStart: "2026-11-01",
    periodEnd: "2026-11-15",
    picks: [
      {
        categorySlug: "foundation-models-llms",
        name: "WebsiteBench",
        tagline: "Can agents rebuild full-stack sites?",
        shortDescription: "Benchmark: agents reverse-engineer websites via browser exploration.",
        overview:
          "WebsiteBench, from TIGER-AI-Lab, is a benchmark that tests whether AI agents can reverse-engineer a full-stack version of a website by exploring it through a browser. It spans 70 tasks and measures pass rate, compute cost, token usage and interaction turns, with a public leaderboard comparing frontier and open models. It gives buyers and researchers an independent read on how well agents can actually replicate real production web apps.",
        officialUrl: "https://website-bench.com",
        whyItMatters:
          "A TIGER-AI-Lab benchmark testing whether agents can reverse-engineer full-stack versions of websites through browser exploration, 70 tasks with a public leaderboard.",
        verification: "verified",
        launchDate: "2026-11-04",
        sources: [
          { title: "TIGER-AI-Lab/WebsiteBench on GitHub", url: "https://github.com/TIGER-AI-Lab/WebsiteBench", type: "github" },
          { title: "WebsiteBench, official site & leaderboard", url: "https://website-bench.com", type: "official" },
        ],
      },
      {
        categorySlug: "ai-search-retrieval",
        name: "db-branch",
        tagline: "Instant DB branches for AI agents & CI",
        shortDescription: "ZFS-backed database branches in seconds for agents/CI.",
        officialUrl: "https://github.com/db-branch/db-branch",
        whyItMatters:
          "Database branches in seconds for AI agents and CI via ZFS, infrastructure for safe, disposable agent and testing environments.",
        verification: "verified",
        launchDate: "2026-11-15",
        sources: [
          { title: "Show HN: db-branch (Nov 15, 2026)", url: "https://news.ycombinator.com/item?id=50506940", type: "hackernews" },
          { title: "db-branch/db-branch on GitHub", url: "https://github.com/db-branch/db-branch", type: "github" },
        ],
      },
      {
        categorySlug: "multi-agent-collaboration",
        name: "Agentic Identity Broker",
        tagline: "OAuth delegation for AI agents",
        shortDescription: "OAuth delegation so agents get scoped, delegated access.",
        officialUrl: "https://github.com/zalando-incubator/agentic-identity-broker",
        whyItMatters:
          "OAuth delegation for AI agents, from Zalando's incubator, tackling how agents obtain scoped, delegated access to services on a user's behalf.",
        verification: "verified",
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

/** All editions (current + archive), newest first, for the editions index. */
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

/** This archive edition's picks, each paired with its (remapped) category. */
export function archiveEditionPicks(edition: ArchiveEdition): ArchivePickSlot[] {
  return edition.picks
    .flatMap((pick) => {
      const category = categoryBySlug(pick.categorySlug);
      return category ? [{ category, pick }] : [];
    })
    .sort((a, b) => a.category.order - b.category.order);
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

// ── SEO structured-data helpers (truthful only; never fabricate) ──

/**
 * Convert a human or ISO date string to an ISO 8601 date (YYYY-MM-DD),
 * returning undefined when the value is missing or too ambiguous to trust
 * (e.g. "November 2026 (full release)" has no day, so we omit it rather
 * than invent one). Parenthetical qualifiers are stripped first.
 */
export function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/\(.*?\)/g, "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;
  // Require an explicit day, e.g. "November 20, 2026".
  if (!/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(cleaned)) return undefined;
  const parsed = new Date(cleaned);
  if (Number.isNaN(parsed.getTime())) return undefined;
  // Use the locally-parsed calendar parts (not toISOString, which would shift
  // the date across a UTC boundary and report the wrong day).
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const d = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * True only when the product genuinely offers a free / open-source /
 * self-host option (not a free trial or free credits on a paid plan).
 */
export function hasFreeTier(pricing?: string): boolean {
  if (!pricing) return false;
  const p = pricing.toLowerCase();
  if (/\bfree (trial|credit)/.test(p)) return false; // paid product with a freebie
  return (
    /free to self-host/.test(p) ||
    /open-source/.test(p) ||
    /freely accessible/.test(p) ||
    /\b(mit|apache|agpl|gplv?3?)[- ]licen/.test(p)
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Build a FAQ for a tool from its existing, page-visible fields only.
 * Each entry is skipped when its source field is empty, so we never invent
 * answers. These power FAQPage structured data (AEO / LLM extraction) and
 * map to content already rendered on the page.
 */
export function buildProductFaq(product: Product): FaqItem[] {
  const category = categoryBySlug(product.categorySlug);
  const faq: FaqItem[] = [];

  const whatIs = product.overview || product.shortDescription;
  if (whatIs) faq.push({ question: `What is ${product.name}?`, answer: whatIs });

  if (product.pricing)
    faq.push({ question: `How much does ${product.name} cost?`, answer: product.pricing });

  const audience = product.whoShouldUse?.length
    ? product.whoShouldUse
    : product.targetAudience;
  if (audience?.length)
    faq.push({
      question: `Who should use ${product.name}?`,
      answer: audience.join(" "),
    });

  if (product.alternatives?.length)
    faq.push({
      question: `What are the alternatives to ${product.name}?`,
      answer: `Alternatives to ${product.name} include ${product.alternatives.join(", ")}.`,
    });

  const why = product.whyItMatters || product.selectionRationale;
  if (why && category)
    faq.push({
      question: `Why is ${product.name} a standout in ${category.name}?`,
      answer: why,
    });

  return faq;
}

/** FAQ for a category page, from the current researched pick + coverage. */
export function buildCategoryFaq(category: Category): FaqItem[] {
  const faq: FaqItem[] = [];
  const pick = productForCategory(category.slug);

  faq.push({
    question: `What does the ${category.name} category cover?`,
    answer: category.coverage,
  });

  if (pick && isEditionPick(pick)) {
    const why = pick.whyItMatters || pick.selectionRationale || pick.overview;
    faq.push({
      question: `What is the standout ${category.name} AI tool in the current edition?`,
      answer: `${pick.name} is this edition's researched, fact-checked pick in ${category.name}. ${why}`.trim(),
    });
  } else if (pick) {
    faq.push({
      question: `What is a notable ${category.name} AI tool?`,
      answer: `${pick.name} is a notable tool in ${category.name}. ${pick.overview} (Curated preview, pending our full fact-check.)`.trim(),
    });
  }

  return faq;
}

/** Shape a FAQ list into schema.org FAQPage JSON-LD. */
export function faqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// ── Archive-pick product pages ────────────────────────────────────────
// Past-edition picks get their own /tools pages (separate from the current
// `products` catalogue so homepage/categories/editionSummary are unaffected).
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const archivePickSlug = (pick: ArchivePick): string => slugify(pick.name);

function archivePickToProduct(pick: ArchivePick, editionLabel: string): Product {
  const slug = archivePickSlug(pick);
  const cat = categoryBySlug(pick.categorySlug);
  return {
    slug,
    name: pick.name,
    categorySlug: pick.categorySlug,
    officialUrl: pick.officialUrl,
    tagline: pick.tagline,
    shortDescription: pick.shortDescription,
    overview: pick.overview ?? `${pick.shortDescription} ${pick.whyItMatters}`.trim(),
    problemSolved: "",
    howItWorks: "",
    features: [],
    useCases: [],
    targetAudience: [],
    pricing: pricingTBD,
    integrations: [],
    alternatives: [],
    selectionRationale: `Featured as a standout AI tool in our ${editionLabel} rankings on aitoolslist.ai.`,
    sources: pick.sources,
    lastVerified: editionLabel,
    verification: "verified",
    whyItMatters: pick.whyItMatters,
    productType: cat ? `${cat.name} tool` : undefined,
    productStatus: `Featured in the ${editionLabel} edition`,
    launchDate: pick.launchDate,
    logo: LOGO_SLUGS.has(slug) ? `/logos/${slug}.png` : undefined,
  };
}

// Deduped: current catalogue wins over archives; first archive occurrence wins.
export const archiveProducts: Product[] = (() => {
  const currentSlugs = new Set(products.map((p) => p.slug));
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const edition of archiveEditions) {
    for (const pick of edition.picks) {
      const slug = archivePickSlug(pick);
      if (currentSlugs.has(slug) || seen.has(slug)) continue;
      seen.add(slug);
      const base = archivePickToProduct(pick, edition.label);
      // Allow deep enrichment (features, pricing, specs) for standout archive tools.
      out.push({ ...base, ...(enrichment[slug] ?? {}) });
    }
  }
  return out;
})();

/** All tools that get a /tools/[slug] page: current catalogue + archive picks. */
export const toolPages: Product[] = [...products, ...archiveProducts];

export const toolPageBySlug = (slug: string): Product | undefined =>
  toolPages.find((p) => p.slug === slug);
