import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";

const STUDY_LEVEL_LINKS = [
  {
    id: "undergraduate",
    href: "/study-abroad/undergraduate",
    title: "Undergraduate",
    description:
      "Planning your first bachelor's-level degree abroad after secondary/high school.",
  },
  {
    id: "postgraduate",
    href: "/study-abroad/postgraduate",
    title: "Postgraduate",
    description:
      "Master's and doctoral-level study, including for career-changers and returning students.",
  },
];

interface StudyLevelLinksSectionProps {
  popularSubjectAreas: string[];
}

export function StudyLevelLinksSection({
  popularSubjectAreas,
}: StudyLevelLinksSectionProps) {
  return (
    <Section aria-labelledby="study-levels-heading">
      <Container>
        <SectionHeading
          eyebrow="Study levels"
          heading="Undergraduate and postgraduate guidance"
          headingId="study-levels-heading"
          className="max-w-3xl"
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {STUDY_LEVEL_LINKS.map((level) => (
            <li key={level.id}>
              <Link
                href={level.href}
                className="group border-border bg-card focus-visible:ring-brand-blue relative flex h-full flex-col gap-4 rounded-2xl border p-6 transition-shadow outline-none hover:shadow-md focus-visible:ring-2"
              >
                <span className="bg-surface-pale-blue text-brand-blue flex size-11 items-center justify-center rounded-full">
                  <GraduationCap aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-foreground inline-flex items-center gap-1.5 text-base font-semibold">
                    {level.title}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-sm">
                    {level.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <h3 className="text-foreground text-sm font-semibold tracking-wide">
            Popular subject areas
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {popularSubjectAreas.map((subject) => (
              <li key={subject}>
                <Badge variant="secondary">{subject}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
