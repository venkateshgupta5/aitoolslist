// Serves /badge.svg: the "Featured on aitoolslist.ai" badge that featured
// companies embed on their own site (linking back to their profile). Each
// embed is an editorial backlink to aitoolslist.ai. Supports ?theme=light.
export const dynamic = "force-static";
export const dynamicParams = true;

function badge(theme: "dark" | "light") {
  const c =
    theme === "light"
      ? { bg: "#ffffff", border: "#e5e7eb", sub: "#6b7280", title: "#0b0f17" }
      : { bg: "#0b0f17", border: "#1f2a3a", sub: "#8a96a8", title: "#ffffff" };

  return `<svg width="240" height="56" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Featured on aitoolslist.ai">
  <rect x="0.5" y="0.5" width="239" height="55" rx="9.5" fill="${c.bg}" stroke="${c.border}"/>
  <circle cx="30" cy="28" r="12" fill="#16a34a"/>
  <path d="M24.6 28.4l3.1 3.1 6.4-7.2" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="52" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="1.5" font-weight="600" fill="${c.sub}">FEATURED ON</text>
  <text x="52" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="${c.title}">aitoolslist.ai</text>
</svg>`;
}

export function GET(request: Request) {
  const theme =
    new URL(request.url).searchParams.get("theme") === "light" ? "light" : "dark";
  return new Response(badge(theme), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
    },
  });
}
