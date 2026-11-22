import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const DISALLOW = ["/api/", "/admin/", "/login", "/profile"];

// AI / LLM crawlers we explicitly welcome so our research can be retrieved and
// cited by answer engines (ChatGPT, Claude, Perplexity, Gemini, etc.). They
// already fall under "*", but naming them signals intent and leaves a single
// place to tune access later.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI (ChatGPT training/search)
  "OAI-SearchBot", // OpenAI ChatGPT Search retrieval
  "ChatGPT-User", // ChatGPT live browsing on user request
  "ClaudeBot", // Anthropic crawler
  "Claude-Web", // Anthropic live retrieval
  "anthropic-ai", // Anthropic
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live retrieval
  "Google-Extended", // Google Gemini / AI Overviews training opt-in
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many models)
  "cohere-ai", // Cohere
  "Bytespider", // ByteDance
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
