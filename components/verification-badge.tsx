import type { VerificationStatus } from "@/lib/content";
import { verificationLabel } from "@/lib/content";

const styles: Record<VerificationStatus, string> = {
  verified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  researched: "bg-brand-50 text-brand-700 ring-brand-600/20",
  preview: "bg-amber-50 text-amber-700 ring-amber-600/20",
  needs_review: "bg-ink-100 text-ink-600 ring-ink-500/20",
  no_pick: "bg-ink-100 text-ink-500 ring-ink-500/20",
};

export function VerificationBadge({
  status,
  className = "",
}: {
  status: VerificationStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${styles[status]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "verified"
            ? "bg-emerald-500"
            : status === "researched"
              ? "bg-brand-500"
              : status === "preview"
                ? "bg-amber-500"
                : "bg-ink-400"
        }`}
      />
      {verificationLabel[status]}
    </span>
  );
}
