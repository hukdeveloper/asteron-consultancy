import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import type { TrustPoint } from "@/types/content";

interface TrustStripProps {
  points: TrustPoint[];
}

export function TrustStrip({ points }: TrustStripProps) {
  return (
    <section
      className="bg-background border-border border-y py-8 sm:py-10"
      aria-label="Why students work with us"
    >
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <li key={point.id} className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                className="text-brand-teal-text mt-0.5 size-5 shrink-0"
              />
              <div>
                <p className="text-foreground text-sm font-semibold">
                  {point.title}
                </p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
