import { createElement } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { SampleContentBadge } from "@/components/shared/SampleContentBadge";
import { resolveIcon } from "@/lib/icons";
import type { TeamMember } from "@/types/content";

interface TeamGridProps {
  members: TeamMember[];
}

/**
 * Role-based placeholder cards — no real name, photo, or credential is
 * ever rendered here. See docs/DECISIONS.md "Team Placeholders".
 */
export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li key={member.id}>
          <Card className="h-full">
            <CardContent className="flex h-full flex-col items-start pt-6">
              <span
                aria-hidden="true"
                className="bg-secondary text-secondary-foreground flex size-12 shrink-0 items-center justify-center rounded-full"
              >
                {createElement(resolveIcon(member.icon), {
                  className: "size-6",
                })}
              </span>
              <h3 className="text-foreground mt-4 text-base font-semibold">
                {member.roleTitle}
              </h3>
              <p className="text-muted-foreground mt-1.5 flex-1 text-sm">
                {member.roleSummary}
              </p>
              <SampleContentBadge
                className="mt-4"
                label={member.placeholderNote}
              />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
