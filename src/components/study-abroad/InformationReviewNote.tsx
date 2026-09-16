import { Container } from "@/components/layout/Container";

interface InformationReviewNoteProps {
  lastReviewed: string;
}

/** Required disclaimer + review-date note for every destination page (docs/DECISIONS.md "Content Accuracy"). */
export function InformationReviewNote({
  lastReviewed,
}: InformationReviewNoteProps) {
  return (
    <div className="border-border border-t py-8">
      <Container>
        <p className="text-muted-foreground max-w-3xl text-xs">
          This page provides general guidance only and is not immigration, legal
          or financial advice. Requirements may change at any time. Information
          on this page was last reviewed on{" "}
          <time dateTime={lastReviewed}>{lastReviewed}</time> — always confirm
          current requirements with the relevant university, institution or
          official government immigration authority before making decisions.
        </p>
      </Container>
    </div>
  );
}
