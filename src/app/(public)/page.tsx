import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { getSiteContent } from "@/lib/content/site";

export default async function HomePage() {
  const site = await getSiteContent();

  return (
    <Section className="py-16 sm:py-24">
      <Container>
        <Badge variant="outline" className="mb-6">
          Development preview — Phase 1 foundation
        </Badge>

        <SiteLogo variant="full" className="mb-10" />

        <PageHeader
          heading={`Welcome to ${site.name}`}
          description={site.description}
        />

        <Button asChild className="mt-8">
          <a href="#foundation-note">What is this page?</a>
        </Button>

        <Card id="foundation-note" className="mt-16 max-w-2xl scroll-mt-8">
          <CardContent className="text-muted-foreground space-y-3 pt-6 text-sm">
            <p className="text-foreground font-medium">
              This is a development-only foundation page.
            </p>
            <p>
              It exists to verify the application shell, design tokens, and
              component library — not to represent the final Asteron Global
              Consultancy homepage. The full marketing homepage (hero, services,
              destinations, success stories, and more) will be built in a later
              phase, following the content order documented in{" "}
              <code className="bg-muted rounded px-1 py-0.5 text-xs">
                docs/PRODUCT_REQUIREMENTS.md
              </code>
              .
            </p>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
