import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { HeroVisual } from "@/components/home/HeroVisual";
import type { HomeHeroContent } from "@/types/content";

interface HeroProps {
  hero: HomeHeroContent;
}

/**
 * Editorial, balanced hero — Phase 10B (see docs/DECISIONS.md "Visual
 * Language Reset"), width/panel fix per lead-architect review. Two
 * corrections from the first Phase 10B pass:
 *
 * 1. The hero previously used `Container variant="wide"` (~1480px) while
 *    every other homepage section uses the default ~1152px `content`
 *    width — the hero's edges didn't line up with the section directly
 *    below it. Now uses the default container like the rest of the page.
 * 2. The left (text) and right (visual) columns previously sat on
 *    mismatched backgrounds — plain white behind the text, a separate
 *    tinted card floating on the right — which read as two unrelated
 *    halves. Both columns now sit inside one shared soft-tinted panel,
 *    with the visual rendered as a white card floating *on* that panel
 *    for contrast, so the whole hero reads as one composed, aligned
 *    unit instead of a mismatched split.
 */
export function Hero({ hero }: HeroProps) {
  return (
    <section className="bg-background py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="from-surface-pale-blue to-surface-pale-mint border-border/60 rounded-[2rem] border bg-gradient-to-br p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-brand-blue text-sm font-semibold tracking-wide">
                {hero.eyebrow}
              </p>
              <h1 className="text-foreground mt-3 text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {hero.heading}
              </h1>
              <p className="text-muted-foreground mt-5 max-w-lg text-base sm:text-lg">
                {hero.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  variant="accent"
                  size="lg"
                  className="h-12 px-6 text-base"
                >
                  <Link href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-background h-12 px-6 text-base"
                >
                  <Link href={hero.secondaryCta.href}>
                    {hero.secondaryCta.label}
                  </Link>
                </Button>
              </div>

              {hero.reassuranceItems && hero.reassuranceItems.length > 0 ? (
                <ul className="text-muted-foreground mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {hero.reassuranceItems.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="bg-brand-teal size-1.5 rounded-full"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
