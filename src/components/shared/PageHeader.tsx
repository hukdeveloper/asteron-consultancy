import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /** Small label above the heading, e.g. "Study Abroad". */
  eyebrow?: string;
  heading: ReactNode;
  description?: ReactNode;
  className?: string;
  /** Heading level for correct document outline; defaults to h1. */
  headingLevel?: "h1" | "h2";
}

/**
 * Shared eyebrow / heading / description structure used at the top of
 * pages and major sections (docs/DESIGN_SYSTEM.md §6).
 */
export function PageHeader({
  eyebrow,
  heading,
  description,
  className,
  headingLevel = "h1",
}: PageHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-brand-teal-text text-sm font-semibold tracking-wide">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-4 text-base sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
