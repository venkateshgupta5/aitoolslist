/**
 * Phase 1 editorial content — the directory's source of truth.
 *
 * Editorial honesty (per PRD §4 buying-decision principle):
 * these picks are a *curated preview* and have NOT yet been run through the
 * Phase 2 multi-agent research + independent fact-check pipeline. We therefore
 * do not assert exact pricing or adoption metrics as verified facts — pricing
 * is directional and points to the official page, and every pick carries a
 * "preview" verification status rather than "verified".
 */

export type VerificationStatus =
  | "verified"
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
  name: "Weekly Edition — November 20, 2026",
  weekStart: "2026-11-16",
  weekEnd: "2026-11-22",
  label: "Nov 16–22, 2026",
};

export const categories: Category[] = [
  {
    slug: "ai-compute-gpu-cloud",
    name: "AI Compute & GPU Cloud",
    order: 1,
    coverage: "GPU clusters, cloud compute and specialized AI chips.",
  },
  {
    slug: "ai-model-serving-inference",
    name: "AI Model Serving & Inference",
    order: 2,
    coverage: "Model hosting, inference engines, optimization and deployment.",
  },
  {
    slug: "ai-data-infrastructure",
    name: "AI Data Infrastructure",
    order: 3,
    coverage: "Vector databases, data pipelines, embeddings and processing.",
  },
  {
    slug: "ai-development-orchestration",
    name: "AI Development & Orchestration",
    order: 4,
    coverage: "LLM frameworks, agent orchestration and workflow infrastructure.",
  },
  {
    slug: "ai-observability-evaluation",
    name: "AI Observability & Evaluation",
    order: 5,
    coverage: "LLM monitoring, tracing, testing, evaluations and guardrails.",
  },
  {
    slug: "ai-coding-developer-tools",
    name: "AI Coding & Developer Tools",
    order: 6,
    coverage: "AI IDEs, coding assistants and developer productivity.",
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    order: 7,
    coverage: "Autonomous agents and agent-building platforms.",
  },
  {
    slug: "ai-sales",
    name: "AI Sales",
    order: 8,
    coverage: "Sales intelligence and go-to-market automation.",
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    order: 9,
    coverage: "Voice AI and conversational phone agents.",
  },
  {
    slug: "ai-evals",
    name: "AI Evals",
    order: 10,
    coverage: "Model testing, benchmarking and evaluation platforms.",
  },
  {
    slug: "ai-observability",
    name: "AI Observability",
    order: 11,
    coverage: "Production monitoring, analytics and reliability.",
  },
  {
    slug: "ai-healthcare",
    name: "AI Healthcare",
    order: 12,
    coverage: "Clinical AI and healthcare workflow automation.",
  },
  {
    slug: "ai-biotech-drug-discovery",
    name: "AI Biotech & Drug Discovery",
    order: 13,
    coverage: "Computational biology and drug discovery.",
  },
];

const notVerifiedPricing =
  "Pricing is not independently verified in this preview — see the official pricing page for current plans.";

export const products: Product[] = [
  {
    slug: "coreweave",
    name: "CoreWeave",
    categorySlug: "ai-compute-gpu-cloud",
    officialUrl: "https://www.coreweave.com",
    tagline: "GPU cloud purpose-built for AI workloads",
    shortDescription: "Specialized GPU cloud for large-scale AI training.",
    overview:
      "CoreWeave is a cloud provider focused specifically on GPU-accelerated and AI workloads, offering access to high-performance NVIDIA GPUs for training and inference at scale.",
    problemSolved:
      "General-purpose clouds can be expensive and hard to provision for large GPU jobs. Teams need fast access to modern accelerators sized for AI training and inference.",
    howItWorks:
      "Customers provision GPU instances and clusters through CoreWeave's platform and orchestrate workloads using Kubernetes-based tooling.",
    features: [
      "Access to modern NVIDIA GPU fleets",
      "Kubernetes-native orchestration",
      "High-performance networking and storage",
      "Scales from single GPUs to large clusters",
    ],
    useCases: [
      "Large language model training",
      "High-throughput inference serving",
      "Rendering and simulation workloads",
    ],
    targetAudience: ["AI labs", "Infrastructure teams", "Enterprises training models"],
    pricing: notVerifiedPricing,
    integrations: ["Kubernetes", "NVIDIA GPU stack"],
    alternatives: ["Lambda", "Crusoe", "Together AI"],
    selectionRationale:
      "A recognized specialist in GPU cloud for AI, frequently cited as infrastructure for large-scale model training.",
    sources: [
      { title: "CoreWeave — official website", url: "https://www.coreweave.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "fireworks-ai",
    name: "Fireworks AI",
    categorySlug: "ai-model-serving-inference",
    officialUrl: "https://fireworks.ai",
    tagline: "Fast, affordable inference for open models",
    shortDescription: "Fast inference platform for open-source models.",
    overview:
      "Fireworks AI provides a hosted inference platform optimized for serving open-source and fine-tuned models with low latency through a simple API.",
    problemSolved:
      "Running open models in production requires inference optimization and infrastructure most teams don't want to build and maintain themselves.",
    howItWorks:
      "Developers call Fireworks' API to run supported models, or deploy fine-tuned variants, with the platform handling serving and scaling.",
    features: [
      "Optimized serving for popular open models",
      "Fine-tuning and custom model deployment",
      "OpenAI-compatible API surface",
      "Usage-based access",
    ],
    useCases: [
      "Production LLM inference",
      "Serving fine-tuned open models",
      "Cost-sensitive high-volume workloads",
    ],
    targetAudience: ["Developers", "AI product teams", "Startups"],
    pricing: notVerifiedPricing,
    integrations: ["OpenAI-compatible SDKs", "Common LLM frameworks"],
    alternatives: ["Together AI", "Baseten", "Replicate"],
    selectionRationale:
      "Widely referenced among developers as a fast, cost-effective inference option for open models.",
    sources: [
      { title: "Fireworks AI — official website", url: "https://fireworks.ai", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "pinecone",
    name: "Pinecone",
    categorySlug: "ai-data-infrastructure",
    officialUrl: "https://www.pinecone.io",
    tagline: "Managed vector database for AI applications",
    shortDescription: "Managed vector database for semantic search and RAG.",
    overview:
      "Pinecone is a managed vector database that stores and searches embeddings, commonly used to power retrieval-augmented generation and semantic search.",
    problemSolved:
      "Storing and querying high-dimensional embeddings at scale is operationally complex; teams need a reliable managed vector store.",
    howItWorks:
      "Developers upsert embeddings into indexes and query by vector similarity through Pinecone's API and SDKs.",
    features: [
      "Managed, scalable vector indexes",
      "Low-latency similarity search",
      "Metadata filtering",
      "Serverless and pod-based options",
    ],
    useCases: ["Retrieval-augmented generation", "Semantic search", "Recommendation systems"],
    targetAudience: ["AI developers", "Platform teams", "Enterprises building RAG"],
    pricing: notVerifiedPricing,
    integrations: ["LangChain", "LlamaIndex", "OpenAI embeddings"],
    alternatives: ["Weaviate", "Qdrant", "Milvus"],
    selectionRationale:
      "A category-defining managed vector database frequently used as the default store in RAG stacks.",
    sources: [
      { title: "Pinecone — official website", url: "https://www.pinecone.io", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "langchain",
    name: "LangChain",
    categorySlug: "ai-development-orchestration",
    officialUrl: "https://www.langchain.com",
    tagline: "Framework for building LLM applications",
    shortDescription: "Framework for building LLM apps and agents.",
    overview:
      "LangChain is an open-source framework for developing applications powered by language models, providing abstractions for chains, tools, memory and agents.",
    problemSolved:
      "Wiring LLMs together with tools, data sources and control flow from scratch is repetitive; developers need reusable building blocks.",
    howItWorks:
      "Developers compose components — prompts, models, retrievers, tools — into chains and agents using LangChain's Python or JavaScript libraries.",
    features: [
      "Composable chains and agents",
      "Tool and retriever integrations",
      "Memory and state primitives",
      "Python and JavaScript SDKs",
    ],
    useCases: ["RAG applications", "Agentic workflows", "Chatbots and assistants"],
    targetAudience: ["Developers", "AI engineers", "Prototyping teams"],
    pricing: notVerifiedPricing,
    integrations: ["OpenAI", "Pinecone", "Many model and data providers"],
    alternatives: ["LlamaIndex", "Haystack", "Semantic Kernel"],
    selectionRationale:
      "One of the most widely adopted open-source frameworks for building LLM applications.",
    sources: [
      { title: "LangChain — official website", url: "https://www.langchain.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "langfuse",
    name: "Langfuse",
    categorySlug: "ai-observability-evaluation",
    officialUrl: "https://langfuse.com",
    tagline: "Open-source LLM engineering platform",
    shortDescription: "Open-source tracing and evals for LLM apps.",
    overview:
      "Langfuse is an open-source observability and evaluation platform for LLM applications, offering tracing, prompt management and evaluation tooling.",
    problemSolved:
      "LLM applications are hard to debug and improve without visibility into traces, prompts and quality over time.",
    howItWorks:
      "Developers instrument their application with Langfuse SDKs to capture traces and metrics, then review and evaluate them in a dashboard.",
    features: [
      "Tracing for LLM calls and chains",
      "Prompt management",
      "Evaluation and scoring",
      "Self-hostable, open source",
    ],
    useCases: ["Debugging LLM apps", "Prompt iteration", "Quality monitoring"],
    targetAudience: ["AI engineers", "Platform teams"],
    pricing: notVerifiedPricing,
    integrations: ["LangChain", "OpenAI", "LlamaIndex"],
    alternatives: ["LangSmith", "Arize Phoenix", "Helicone"],
    selectionRationale:
      "A popular open-source choice for LLM observability and evaluation with strong developer adoption.",
    sources: [
      { title: "Langfuse — official website", url: "https://langfuse.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "cursor",
    name: "Cursor",
    categorySlug: "ai-coding-developer-tools",
    officialUrl: "https://www.cursor.com",
    tagline: "The AI code editor",
    shortDescription: "AI-native code editor for faster development.",
    overview:
      "Cursor is an AI-powered code editor built to help developers write, edit and understand code with integrated AI assistance across the codebase.",
    problemSolved:
      "Context-switching to separate AI tools slows developers down; they want AI assistance directly in the editor with codebase awareness.",
    howItWorks:
      "Cursor extends a familiar editor experience with AI features for completion, chat, and multi-file edits grounded in the open project.",
    features: [
      "AI code completion and chat",
      "Codebase-aware edits",
      "Multi-file refactoring",
      "Familiar editor experience",
    ],
    useCases: ["Writing new features", "Refactoring", "Understanding unfamiliar code"],
    targetAudience: ["Software developers", "Engineering teams"],
    pricing: notVerifiedPricing,
    integrations: ["Popular language ecosystems", "Model providers"],
    alternatives: ["GitHub Copilot", "Windsurf", "Zed"],
    selectionRationale:
      "Among the most talked-about AI coding environments, with rapid adoption in the developer community.",
    sources: [
      { title: "Cursor — official website", url: "https://www.cursor.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "crewai",
    name: "CrewAI",
    categorySlug: "ai-agents",
    officialUrl: "https://www.crewai.com",
    tagline: "Framework for orchestrating role-playing AI agents",
    shortDescription: "Framework for multi-agent AI automation.",
    overview:
      "CrewAI is a framework for building multi-agent systems where specialized agents collaborate on tasks with defined roles and workflows.",
    problemSolved:
      "Single-prompt automations break on complex tasks; teams need structured ways to coordinate multiple agents and tools.",
    howItWorks:
      "Developers define agents, their roles and tools, and orchestrate them into crews that execute tasks collaboratively.",
    features: [
      "Role-based multi-agent orchestration",
      "Tool integration",
      "Sequential and parallel workflows",
      "Open-source core",
    ],
    useCases: ["Research automation", "Content pipelines", "Business process automation"],
    targetAudience: ["Developers", "Automation engineers"],
    pricing: notVerifiedPricing,
    integrations: ["LangChain tools", "Common LLM providers"],
    alternatives: ["LangGraph", "AutoGen", "OpenAI Agents"],
    selectionRationale:
      "A fast-growing open-source framework for multi-agent orchestration with strong community momentum.",
    sources: [
      { title: "CrewAI — official website", url: "https://www.crewai.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "clay",
    name: "Clay",
    categorySlug: "ai-sales",
    officialUrl: "https://www.clay.com",
    tagline: "Automated data enrichment and outbound for GTM teams",
    shortDescription: "AI data enrichment for sales prospecting.",
    overview:
      "Clay is a go-to-market platform that combines data enrichment from many sources with AI to help sales teams build and act on prospect lists.",
    problemSolved:
      "Sales teams waste time stitching together data providers and manual research to find and qualify prospects.",
    howItWorks:
      "Users build tables that pull from multiple enrichment providers and use AI to research and personalize outreach at scale.",
    features: [
      "Multi-provider data enrichment",
      "AI research and personalization",
      "Workflow automation",
      "CRM integrations",
    ],
    useCases: ["Prospect list building", "Lead enrichment", "Personalized outbound"],
    targetAudience: ["Sales teams", "Growth and RevOps teams"],
    pricing: notVerifiedPricing,
    integrations: ["CRMs", "Many data providers"],
    alternatives: ["Apollo", "Instantly", "11x"],
    selectionRationale:
      "A widely adopted AI-assisted GTM data platform frequently cited by modern sales teams.",
    sources: [
      { title: "Clay — official website", url: "https://www.clay.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "vapi",
    name: "Vapi",
    categorySlug: "ai-voice-agents",
    officialUrl: "https://vapi.ai",
    tagline: "Developer platform for voice AI agents",
    shortDescription: "Developer platform to build voice AI agents.",
    overview:
      "Vapi is a developer platform for building, testing and deploying voice AI agents that can handle phone calls using speech-to-text, LLMs and text-to-speech.",
    problemSolved:
      "Building real-time voice agents requires orchestrating transcription, reasoning and speech with low latency — hard to assemble from scratch.",
    howItWorks:
      "Developers configure voice agents via API, wiring together models and telephony, and deploy them to handle inbound or outbound calls.",
    features: [
      "Real-time voice pipeline",
      "Model-agnostic configuration",
      "Telephony integration",
      "APIs and SDKs",
    ],
    useCases: ["Customer support lines", "Appointment scheduling", "Outbound voice workflows"],
    targetAudience: ["Developers", "Product teams building voice"],
    pricing: notVerifiedPricing,
    integrations: ["Telephony providers", "LLM and speech providers"],
    alternatives: ["Retell AI", "Bland", "ElevenLabs Agents"],
    selectionRationale:
      "A developer-favored platform for voice agents, frequently referenced for rapid voice-app development.",
    sources: [
      { title: "Vapi — official website", url: "https://vapi.ai", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "braintrust",
    name: "Braintrust",
    categorySlug: "ai-evals",
    officialUrl: "https://www.braintrust.dev",
    tagline: "Evaluation platform for AI products",
    shortDescription: "Evaluation and experimentation platform for AI.",
    overview:
      "Braintrust is a platform for evaluating and iterating on AI applications, providing tooling for evals, datasets and experiment tracking.",
    problemSolved:
      "Shipping LLM features without systematic evaluation makes regressions invisible; teams need repeatable eval workflows.",
    howItWorks:
      "Teams define datasets and scoring functions, run experiments, and compare model and prompt changes over time.",
    features: [
      "Eval datasets and scoring",
      "Experiment comparison",
      "Logging and tracing",
      "Collaboration tooling",
    ],
    useCases: ["Prompt and model regression testing", "Benchmarking", "Quality gating in CI"],
    targetAudience: ["AI engineers", "ML teams"],
    pricing: notVerifiedPricing,
    integrations: ["Common model providers", "CI pipelines"],
    alternatives: ["Patronus AI", "LangSmith", "Arize"],
    selectionRationale:
      "A focused evaluation platform increasingly adopted by teams putting LLM features into production.",
    sources: [
      { title: "Braintrust — official website", url: "https://www.braintrust.dev", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "helicone",
    name: "Helicone",
    categorySlug: "ai-observability",
    officialUrl: "https://www.helicone.ai",
    tagline: "Open-source observability for LLM applications",
    shortDescription: "Open-source monitoring and analytics for LLMs.",
    overview:
      "Helicone is an open-source observability platform for LLM applications, providing logging, analytics and monitoring of production model usage.",
    problemSolved:
      "Teams running LLMs in production lack visibility into cost, latency and usage patterns across requests.",
    howItWorks:
      "Developers route LLM traffic through Helicone or use its SDK to capture requests, then analyze usage, cost and latency in a dashboard.",
    features: [
      "Request logging and analytics",
      "Cost and latency monitoring",
      "Caching and rate-limit insights",
      "Open-source and self-hostable",
    ],
    useCases: ["Production LLM monitoring", "Cost tracking", "Usage analytics"],
    targetAudience: ["Developers", "Platform and ops teams"],
    pricing: notVerifiedPricing,
    integrations: ["OpenAI", "Anthropic", "Proxy and SDK based"],
    alternatives: ["Langfuse", "Datadog LLM Observability", "Arize Phoenix"],
    selectionRationale:
      "A popular open-source LLM observability tool valued for quick setup and production monitoring.",
    sources: [
      { title: "Helicone — official website", url: "https://www.helicone.ai", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "abridge",
    name: "Abridge",
    categorySlug: "ai-healthcare",
    officialUrl: "https://www.abridge.com",
    tagline: "AI clinical documentation for clinicians",
    shortDescription: "AI that drafts clinical notes from conversations.",
    overview:
      "Abridge uses AI to generate clinical documentation from patient–clinician conversations, aiming to reduce the administrative burden on clinicians.",
    problemSolved:
      "Clinicians spend significant time on documentation, contributing to burnout and less time with patients.",
    howItWorks:
      "The platform captures the clinical conversation and generates structured draft notes for the clinician to review within their workflow.",
    features: [
      "Ambient clinical note generation",
      "Structured documentation drafts",
      "Clinician review workflow",
      "Enterprise healthcare focus",
    ],
    useCases: ["Ambient clinical documentation", "Reducing administrative load"],
    targetAudience: ["Clinicians", "Health systems"],
    pricing: notVerifiedPricing,
    integrations: ["Electronic health record systems"],
    alternatives: ["Nuance DAX", "Suki", "Nabla"],
    selectionRationale:
      "A prominent clinical AI documentation product frequently cited in healthcare AI coverage.",
    sources: [
      { title: "Abridge — official website", url: "https://www.abridge.com", type: "official" },
    ],
    lastVerified: null,
    verification: "preview",
  },
  {
    slug: "isomorphic-labs",
    name: "Isomorphic Labs",
    categorySlug: "ai-biotech-drug-discovery",
    officialUrl: "https://www.isomorphiclabs.com",
    tagline: "AI-first drug discovery",
    shortDescription: "AI-first approach to drug discovery.",
    overview:
      "Isomorphic Labs applies AI methods, building on advances in protein structure prediction, to accelerate the process of discovering new medicines.",
    problemSolved:
      "Traditional drug discovery is slow and costly; AI promises to speed up understanding of biology and candidate design.",
    howItWorks:
      "The company develops and applies AI models for biological and chemical problems, partnering with pharmaceutical organizations on drug programs.",
    features: [
      "AI models for drug discovery",
      "Protein structure–informed methods",
      "Pharma research partnerships",
    ],
    useCases: ["Early-stage drug discovery", "Target and molecule research"],
    targetAudience: ["Pharmaceutical companies", "Biotech researchers"],
    pricing: notVerifiedPricing,
    integrations: ["Not publicly disclosed"],
    alternatives: ["Recursion", "Insilico Medicine", "Iambic"],
    selectionRationale:
      "A high-profile AI-first drug discovery company advancing computational approaches to medicine.",
    sources: [
      {
        title: "Isomorphic Labs — official website",
        url: "https://www.isomorphiclabs.com",
        type: "official",
      },
    ],
    lastVerified: null,
    verification: "preview",
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
  preview: "Curated preview · pending fact-check",
  needs_review: "Needs review",
  no_pick: "No verified pick this week",
};
