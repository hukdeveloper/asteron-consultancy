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
 * Temporary, code-based brand mark for "Janan Consultancy": a bold "J"
 * stroke ending in a filled destination dot — the same route/pin visual
 * language used throughout the site (`UniversitySlider`, `DetailHero`'s
 * icon badges) rather than a generic compass, so the logo reads as this
 * site's own mark rather than a stock icon. Deliberately simple geometry — no
 * downloaded asset — so it can be swapped for a commissioned logo later
 * by editing only this file. The J stroke uses currentColor (works on
 * light or dark surfaces); only the destination dot keeps the fixed
 * brand-blue accent (checked against both white and ink backgrounds —
 * see docs/DESIGN_SYSTEM.md §2 — and exempt from text-contrast rules
 * anyway since it's a decorative logo mark).
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
        width={variant === "full" ? 42 : 32}
        height={variant === "full" ? 42 : 32}
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-current"
      >
        {/* Rounded badge backdrop */}
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="7"
          fill="currentColor"
          fillOpacity="0.08"
        />
        {/* "J" stroke — the destination dot below is its own element so it
            can carry the fixed brand-blue accent independently. */}
        <path
          d="M14.5 6v8.2a4.3 4.3 0 0 1-4.3 4.3c-1.6 0-2.9-.7-3.7-1.9"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Destination dot (journey/guidance motif, echoed in the hero visual) */}
        <circle cx="14.5" cy="6" r="1.6" className="fill-brand-blue" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-semibold tracking-tight",
            variant === "full" ? "text-xl" : "text-lg",
          )}
        >
          Janan
          <span className="sr-only"> Consultancy</span>
        </span>
        {variant === "full" ? (
          <span className="text-sm opacity-80">Guidance Beyond Borders</span>
        ) : null}
      </span>
    </span>
  );
}
