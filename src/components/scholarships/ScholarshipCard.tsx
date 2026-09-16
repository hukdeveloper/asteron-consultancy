import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import type { Scholarship } from "@/types/content";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  return (
    <Card className="relative h-full transition-shadow focus-within:shadow-md hover:shadow-md">
      <CardContent className="flex h-full flex-col pt-6">
        <h3 className="text-foreground text-base font-semibold">
          <Link
            href={`/scholarships/${scholarship.slug}`}
            className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
          >
            {scholarship.name}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {scholarship.eligibilitySummary}
        </p>
        <SampleContentBadge
          className="mt-4 h-auto w-full max-w-full text-wrap whitespace-normal"
          label="Content template — not an active scholarship"
        />
      </CardContent>
    </Card>
  );
}
