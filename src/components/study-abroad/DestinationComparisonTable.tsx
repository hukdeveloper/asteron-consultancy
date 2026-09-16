import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Destination } from "@/types/content";

interface DestinationComparisonTableProps {
  destinations: Destination[];
}

const ROWS: { label: string; render: (destination: Destination) => string }[] =
  [
    { label: "Common study levels", render: (d) => d.studyLevels.join(", ") },
    {
      label: "General intake pattern",
      render: (d) => d.typicalIntakes.join(", "),
    },
    {
      label: "Language considerations",
      render: (d) => d.languageConsiderations,
    },
    { label: "Lifestyle setting", render: (d) => d.lifestyleSetting },
    {
      label: "Planning considerations",
      render: (d) => d.planningConsiderations,
    },
  ];

/**
 * Qualitative-only comparison — deliberately no rankings, scores or
 * numeric ratings (docs/DECISIONS.md "Content Accuracy"). Rendered twice:
 * a real <table> for wider viewports and a stacked, non-scrolling card
 * list for narrow ones, so mobile never requires horizontal scrolling.
 */
export function DestinationComparisonTable({
  destinations,
}: DestinationComparisonTableProps) {
  return (
    <Section className="bg-muted/50" aria-labelledby="comparison-heading">
      <Container>
        <SectionHeading
          eyebrow="At a glance"
          heading="A general comparison, not a ranking"
          headingId="comparison-heading"
          description="These notes are a general starting point for comparison — they don't rank or score destinations against each other."
          className="max-w-3xl"
        />

        <div className="mt-8 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">
              General comparison of study levels, intakes, language, lifestyle
              and planning considerations across destinations
            </caption>
            <thead>
              <tr className="border-border border-b">
                <th
                  scope="col"
                  className="text-foreground py-3 pr-4 font-semibold"
                >
                  Destination
                </th>
                {ROWS.map((row) => (
                  <th
                    key={row.label}
                    scope="col"
                    className="text-foreground py-3 pr-4 font-semibold"
                  >
                    {row.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr
                  key={destination.id}
                  className="border-border border-b last:border-0"
                >
                  <th
                    scope="row"
                    className="text-foreground py-3 pr-4 font-medium"
                  >
                    {destination.name}
                  </th>
                  {ROWS.map((row) => (
                    <td
                      key={row.label}
                      className="text-muted-foreground py-3 pr-4 align-top"
                    >
                      {row.render(destination)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-8 space-y-4 md:hidden">
          {destinations.map((destination) => (
            <li
              key={destination.id}
              className="bg-card border-border rounded-xl border p-4"
            >
              <h3 className="text-foreground text-base font-semibold">
                {destination.name}
              </h3>
              <dl className="mt-3 space-y-2">
                {ROWS.map((row) => (
                  <div key={row.label}>
                    <dt className="text-foreground text-xs font-semibold tracking-wide">
                      {row.label}
                    </dt>
                    <dd className="text-muted-foreground mt-0.5 text-sm">
                      {row.render(destination)}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
