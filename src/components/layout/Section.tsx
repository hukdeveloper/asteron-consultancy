import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends ComponentProps<"section"> {
  /** Render as a different semantic element when "section" isn't right. */
  as?: ElementType;
}

/**
 * Consistent vertical rhythm between page sections (docs/DESIGN_SYSTEM.md §4).
 * Defaults to `<section>`; pass `as` for other semantics (e.g. `"div"`
 * inside an already-labelled landmark, to avoid an unnamed nested region).
 */
export function Section({
  as: As = "section",
  className,
  ...props
}: SectionProps) {
  return <As className={cn("py-12 sm:py-16 lg:py-20", className)} {...props} />;
}
