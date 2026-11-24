import type { VerificationStatus } from "@/lib/content";
import { verificationLabel } from "@/lib/content";

const styles: Record<VerificationStatus, string> = {
  verified: "bg-mint text-on-mint",
  researched: "bg-sky text-on-sky",
  preview: "bg-peach text-on-peach",
  needs_review: "bg-taggray text-ink-600",
  no_pick: "bg-taggray text-ink-500",
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
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold ${styles[status]} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "verified"
            ? "bg-verified"
            : status === "researched"
              ? "bg-brand-500"
              : status === "preview"
                ? "bg-on-peach"
                : "bg-ink-400"
        }`}
      />
      {verificationLabel[status]}
    </span>
  );
}
