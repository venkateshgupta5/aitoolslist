export const siteConfig = {
  name: "aitoolslist.ai",
  title: "aitoolslist.ai — AI product intelligence, every fortnight",
  description:
    "An independent fortnightly intelligence platform tracking emerging AI products across 14 categories — researched, evaluated and curated. Discover. Evaluate. Decide.",
  tagline: "Discover the AI tools shaping what's next. Researched. Evaluated. Curated.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolslist.ai",
  listingPrice: "$299",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
