/**
 * The 13 fixed categories with classification keyword hints.
 * Keywords drive deterministic candidate→category mapping (and seed the
 * LLM classifier prompt when OPENAI_API_KEY is configured).
 */
import { categories as siteCategories } from "@/lib/content";

export interface AgentCategory {
  slug: string;
  name: string;
  order: number;
  keywords: string[];
}

const keywordMap: Record<string, string[]> = {
  "ai-compute-gpu-cloud": [
    "gpu", "gpu cloud", "compute", "h100", "h200", "b200", "cluster",
    "accelerator", "ai chip", "inference hardware", "training cluster",
  ],
  "ai-model-serving-inference": [
    "inference", "model serving", "serving", "llm serving", "vllm", "tgi",
    "deploy model", "inference engine", "throughput", "quantization",
  ],
  "ai-data-infrastructure": [
    "vector database", "vector db", "embeddings", "rag", "data pipeline",
    "etl", "feature store", "data infrastructure", "retrieval",
  ],
  "ai-development-orchestration": [
    "framework", "orchestration", "langchain", "llamaindex", "agent framework",
    "workflow", "sdk", "llm app", "chains", "pipeline",
  ],
  "ai-observability-evaluation": [
    "observability", "tracing", "monitoring llm", "evaluation", "evals",
    "guardrails", "prompt management", "llmops",
  ],
  "ai-coding-developer-tools": [
    "coding", "code editor", "copilot", "ide", "developer tool", "autocomplete",
    "code assistant", "pair programming", "codegen",
  ],
  "ai-agents": [
    "agent", "autonomous agent", "multi-agent", "agentic", "ai agent",
    "agent platform", "computer use", "browser agent",
  ],
  "ai-sales": [
    "sales", "outbound", "crm", "prospecting", "lead", "gtm", "sdr",
    "sales intelligence", "enrichment",
  ],
  "ai-voice-agents": [
    "voice", "voice agent", "speech", "tts", "stt", "telephony", "call",
    "conversational", "phone",
  ],
  "ai-evals": [
    "eval", "benchmark", "testing", "evaluation platform", "scoring",
    "model testing", "red team",
  ],
  "ai-observability": [
    "observability", "monitoring", "analytics", "reliability", "logging",
    "apm", "production monitoring",
  ],
  "ai-healthcare": [
    "healthcare", "clinical", "medical", "ehr", "patient", "diagnosis",
    "health", "scribe", "documentation",
  ],
  "ai-biotech-drug-discovery": [
    "biotech", "drug discovery", "protein", "molecule", "genomics",
    "computational biology", "bioinformatics", "pharma",
  ],
};

export const agentCategories: AgentCategory[] = siteCategories.map((c) => ({
  slug: c.slug,
  name: c.name,
  order: c.order,
  keywords: keywordMap[c.slug] ?? [],
}));
