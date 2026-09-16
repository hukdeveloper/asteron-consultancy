import { HelpCircle, type LucideIcon } from "lucide-react";
import * as icons from "lucide-react";

import type { IconName } from "@/types/content";

/**
 * Resolves a plain icon-name string (as stored in content files, so those
 * files don't need to import React/lucide) to an actual Lucide component.
 * Falls back to a generic icon if the name doesn't match — content typos
 * degrade gracefully instead of crashing the page.
 */
export function resolveIcon(name: IconName): LucideIcon {
  const icon = (icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? HelpCircle;
}
