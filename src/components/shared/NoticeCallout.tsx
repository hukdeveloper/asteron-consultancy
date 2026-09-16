import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface NoticeCalloutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Prominent, accessible callout for required regulatory/integrity notices
 * (visa disclaimer, scholarship disclaimer, insurance disclosure, etc.) —
 * deliberately not small print, per the accessibility requirement that
 * disclosures stay readable. Extracted from the pattern used across
 * Phase 4's Study Abroad sections.
 */
export function NoticeCallout({ children, className }: NoticeCalloutProps) {
  return (
    <div
      className={cn(
        "border-border bg-muted/60 flex gap-3 rounded-xl border p-4",
        className,
      )}
    >
      <AlertCircle
        aria-hidden="true"
        className="text-muted-foreground mt-0.5 size-5 shrink-0"
      />
      <p className="text-foreground text-sm font-medium">{children}</p>
    </div>
  );
}
