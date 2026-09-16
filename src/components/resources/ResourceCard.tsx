import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ResourceArticle, ResourceCategory } from "@/types/content";

interface ResourceCardProps {
  article: ResourceArticle;
  categoryLabel: string;
}

export function ResourceCard({ article, categoryLabel }: ResourceCardProps) {
  return (
    <Card className="relative h-full transition-shadow focus-within:shadow-md hover:shadow-md">
      <CardContent className="flex h-full flex-col pt-6">
        <BookOpen aria-hidden="true" className="text-brand-teal-text size-6" />
        <Badge variant="outline" className="mt-3 w-fit">
          {categoryLabel}
        </Badge>
        <h3 className="text-foreground mt-3 text-base font-semibold">
          <Link
            href={`/resources/${article.slug}`}
            className="focus-visible:ring-ring rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {article.summary}
        </p>
        <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
          <Clock aria-hidden="true" className="size-3.5" />
          {article.readingTimeMinutes} min read
        </p>
      </CardContent>
    </Card>
  );
}

export function categoryLabelFor(
  categories: ResourceCategory[],
  categoryId: string,
) {
  return (
    categories.find((category) => category.id === categoryId)?.label ??
    categoryId
  );
}
