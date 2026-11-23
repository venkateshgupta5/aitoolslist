import type { NextConfig } from "next";

// When the 14-category taxonomy was expanded to 60 categories across 6 segments,
// the old /categories/* slugs were already indexed. 301-redirect each to its
// nearest new category so link equity and indexed URLs are preserved.
const CATEGORY_REDIRECTS: Record<string, string> = {
  "ai-compute-gpu-cloud": "ai-cloud-platforms",
  "ai-model-serving-inference": "ai-inference-optimization",
  "ai-data-infrastructure": "ai-search-retrieval",
  "ai-development-orchestration": "ai-agent-platforms",
  "ai-observability-evaluation": "ai-testing-qa",
  "ai-observability": "ai-testing-qa",
  "ai-coding-developer-tools": "ai-code-generation",
  "ai-agents": "multi-agent-collaboration",
  "ai-sales": "enterprise-ai-automation",
  "ai-voice-agents": "ai-customer-support",
  "ai-evals": "foundation-models-llms",
  "ai-healthcare": "ai-healthcare-operations",
  "ai-biotech-drug-discovery": "ai-in-drug-discovery",
  "ai-monetization-billing": "ai-finance-accounting",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return Object.entries(CATEGORY_REDIRECTS).map(([from, to]) => ({
      source: `/categories/${from}`,
      destination: `/categories/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
