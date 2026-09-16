import { CheckCircle2 } from "lucide-react";

const JOURNEY_STEPS = ["Choose", "Apply", "Prepare"];

/**
 * Original SVG/CSS hero visual — no photography (see
 * docs/MEDIA_ATTRIBUTIONS.md for why, and what real photography would
 * replace this with). Redesigned Phase 10B for the lighter "modern
 * editorial" direction (see docs/DECISIONS.md "Visual Language Reset"):
 * one light, airy portrait card (a route/globe motif) plus exactly one
 * floating "Your journey" card — at most two visual elements, per the
 * redesign brief's explicit limit. Rendered as a solid white card (not
 * its own tinted gradient) so it reads as a distinct object floating on
 * top of `Hero`'s shared tinted panel, rather than blending into it.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* Main portrait card */}
      <div
        aria-hidden="true"
        className="bg-background border-border/60 relative aspect-4/5 max-h-[520px] overflow-hidden rounded-[2rem] border shadow-md"
      >
        {/* Soft dot texture for depth, avoids a flat empty block */}
        <svg
          className="absolute inset-0 h-full w-full opacity-40"
          aria-hidden="true"
        >
          <pattern
            id="hero-dots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" className="fill-brand-blue/20" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        {/* Route/globe motif */}
        <svg
          viewBox="0 0 400 480"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="300"
            cy="120"
            r="86"
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <circle
            cx="300"
            cy="120"
            r="86"
            fill="none"
            stroke="#3157F6"
            strokeOpacity="0.12"
            strokeWidth="24"
          />
          <path
            d="M60 420 C 120 360, 140 300, 110 250 S 180 150, 230 170 S 290 130, 300 120"
            fill="none"
            stroke="#173B8F"
            strokeWidth="2"
            strokeDasharray="1 10"
            strokeLinecap="round"
          />
          <circle cx="60" cy="420" r="5" fill="#FF7A59" />
          <circle cx="300" cy="120" r="5" fill="#3157F6" />
        </svg>
      </div>

      {/* The one permitted floating element: a compact journey-steps card */}
      <div className="border-border bg-card absolute -bottom-6 left-1/2 w-[calc(100%-2.5rem)] max-w-72 -translate-x-1/2 rounded-2xl border p-4 shadow-lg sm:left-6 sm:translate-x-0">
        <p className="text-foreground text-sm font-semibold">Your journey</p>
        <ul className="mt-3 space-y-2">
          {JOURNEY_STEPS.map((step) => (
            <li
              key={step}
              className="text-muted-foreground flex items-center gap-2 text-sm"
            >
              <CheckCircle2
                aria-hidden="true"
                className="text-brand-teal size-4 shrink-0"
              />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
