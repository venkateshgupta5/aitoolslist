export const siteConfig = {
  name: "aitoolslist.ai",
  title: "aitoolslist.ai: Find the best AI tools",
  description:
    "Discover and evaluate the best AI tools across 62 categories, backed by independent research, evidence and expert evaluation. Find the right AI tool for building, creating, automating, researching or scaling your business.",
  tagline: "Thousands of AI tools. One place to find the right one.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolslist.ai",
  listingPrice: "$199",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
