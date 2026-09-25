import { Container } from "@/components/layout/Container";
import { UniversitySlider } from "@/components/home/UniversitySlider";
import type { ExampleUniversity, HomeHeroContent } from "@/types/content";

interface HeroProps {
  hero: HomeHeroContent;
  universities: ExampleUniversity[];
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
 * 2. The heading/CTA copy was removed from view entirely, per explicit
 *    lead-architect correction — the hero is the university slider and
 *    nothing else, full width, with no competing marketing text above
 *    it. `hero.heading` is kept as a screen-reader/SEO-only `<h1>`
 *    (`sr-only`, not deleted) rather than dropped altogether: every page
 *    on this site still needs exactly one real `<h1>` for accessibility
 *    and search — same content model field, just not rendered visibly
 *    here anymore. See `UniversitySlider`'s own doc comment for the
 *    content policy behind naming real universities.
 */
export function Hero({ hero, universities }: HeroProps) {
  return (
    <section className="bg-background py-10 sm:py-14 lg:py-16">
      <Container>
        <h1 className="sr-only">{hero.heading}</h1>
        <div className="from-surface-pale-blue to-surface-pale-mint border-border/60 rounded-[2rem] border bg-gradient-to-br p-6 sm:p-10 lg:p-12">
          <UniversitySlider universities={universities} />
          <p className="text-muted-foreground mt-4 text-center text-xs">
            Examples of universities across our covered destinations — shown
            for illustration only, not a partnership or admissions
            guarantee.
          </p>
        </div>
      </Container>
    </section>
  );
}
