import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  /**
   * "compact" (icon + short wordmark, for the header) or "full" (icon +
   * wordmark + tagline, for the footer). Defaults to "compact".
   */
  variant?: "compact" | "full";
}

/**
 * Temporary, code-based brand mark: an open book (education) topped by a
 * four-point compass star (guidance/direction). Deliberately simple
 * geometry — no downloaded asset — so it can be swapped for a
 * commissioned logo later by editing only this file. Works on light or
 * dark surfaces because the book strokes use currentColor; only the star
 * keeps the fixed brand-gold accent (checked against both navy and
 * soft-white backgrounds — see docs/DESIGN_SYSTEM.md §2 — and exempt from
 * text-contrast rules anyway since it's a decorative logo mark).
 *
 * Presentational only — does not render its own <Link>. Wrap it in
 * `<Link href="/">` at the call site (SiteHeader, SiteFooter) so it can
 * still be unit-tested without a router.
 */
export function SiteLogo({ className, variant = "compact" }: SiteLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 24 24"
        width={variant === "full" ? 36 : 28}
        height={variant === "full" ? 36 : 28}
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-current"
      >
        {/* Compass star (guidance) */}
        <path
          d="M12 1.5 13.4 8.6 20.5 10 13.4 11.4 12 18.5 10.6 11.4 3.5 10 10.6 8.6Z"
          className="fill-brand-gold"
        />
        {/* Open book (education) */}
        <path
          d="M2.75 12.75c2.6-1 5.4-1 8.25 0v7.75c-2.85-1-5.65-1-8.25 0Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M21.25 12.75c-2.6-1-5.4-1-8.25 0v7.75c2.85-1 5.65-1 8.25 0Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-semibold tracking-tight",
            variant === "full" ? "text-lg" : "text-base",
          )}
        >
          Asteron
          <span className="sr-only"> Global Consultancy</span>
        </span>
        {variant === "full" ? (
          <span className="text-xs opacity-80">Guidance Beyond Borders</span>
        ) : null}
      </span>
    </span>
  );
}
