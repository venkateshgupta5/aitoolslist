import Image from "next/image";
import { categoryAccent } from "@/lib/content";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Tool/company logo. Renders the compressed logo (optimized + lazy-loaded via
 * next/image) when available, otherwise a category-coloured initials tile.
 */
export function ToolLogo({
  name,
  logo,
  categorySlug,
  size = 44,
  className = "rounded-xl",
}: {
  name: string;
  logo?: string;
  categorySlug: string;
  size?: number;
  className?: string;
}) {
  if (logo) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden border border-ink-200 bg-white ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={96}
          height={96}
          className="h-full w-full object-contain p-1.5"
        />
      </span>
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center text-sm font-bold text-white ${categoryAccent(categorySlug)} ${className}`}
      style={{ width: size, height: size }}
    >
      {initials(name)}
    </span>
  );
}
