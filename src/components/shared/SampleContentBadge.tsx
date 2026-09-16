import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SampleContentBadgeProps {
  className?: string;
  /** Defaults to a general label; pass a more specific one where it reads better. */
  label?: string;
}

/**
 * Visible + accessible "this is demo content" label, per
 * docs/DESIGN_SYSTEM.md §12. Uses the neutral `outline` badge treatment
 * (not an accent colour) so sample content is never visually promoted as
 * if it were a verified achievement. Applies to testimonials, statistics,
 * partnerships, certifications, awards, and accreditations — remove only
 * when the lead architect confirms the underlying content is real
 * (log the change in docs/DECISIONS.md).
 */
export function SampleContentBadge({
  className,
  label = "Sample content — for illustration only",
}: SampleContentBadgeProps) {
  return (
    <Badge variant="outline" className={cn("font-normal", className)}>
      {label}
    </Badge>
  );
}
