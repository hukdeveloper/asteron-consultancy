import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import type { SuccessStory } from "@/types/content";

interface SuccessStoryCardProps {
  story: SuccessStory;
}

/** Every card carries its own visible "Demo content" label — not just a page-level note. No offer letters, passport information or private records are ever shown here. */
export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col pt-6">
        <p className="text-foreground text-sm font-semibold">
          {story.displayName}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {story.destinationName} · {story.studyLevel} · {story.subject}
        </p>
        <Quote
          aria-hidden="true"
          className="text-brand-teal-text mt-4 size-5"
        />
        <p className="text-foreground mt-1 flex-1 text-sm italic">
          “{story.quote}”
        </p>
        <p className="text-muted-foreground mt-3 text-xs">{story.summary}</p>
        <SampleContentBadge className="mt-4 self-start" label="Demo content" />
      </CardContent>
    </Card>
  );
}
