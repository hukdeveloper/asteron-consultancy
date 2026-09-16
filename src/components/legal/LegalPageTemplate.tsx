import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { NoticeCallout } from "@/components/shared/NoticeCallout";
import { PageHeader } from "@/components/shared/PageHeader";
import type { LegalPage } from "@/types/content";

interface LegalPageTemplateProps {
  page: LegalPage;
  draftNotice: string;
}

/** One shared template for every /legal/[page] draft — do not create a duplicated implementation per page. */
export function LegalPageTemplate({
  page,
  draftNotice,
}: LegalPageTemplateProps) {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: page.title }]} className="mb-6" />
        <PageHeader
          heading={page.title}
          description={`Last updated: ${page.lastUpdated}`}
        />
        <NoticeCallout className="mt-6">{draftNotice}</NoticeCallout>

        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-foreground text-lg font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-2 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <NoticeCallout className="mt-10">{draftNotice}</NoticeCallout>
      </Container>
    </Section>
  );
}
