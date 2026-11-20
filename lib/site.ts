export const siteConfig = {
  name: "aitoolslist.ai",
  title: "aitoolslist.ai — Find your next AI advantage",
  description:
    "An AI intelligence and discovery publication. 13 categories, 13 standout tools, one curated weekly edition — independently researched and fact-checked.",
  tagline: "13 categories. 13 standout tools. One curated weekly edition.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aitoolslist.ai",
  listingPrice: "$49",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
