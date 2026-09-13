import { z } from "zod";

/**
 * Central, validated access to environment variables.
 *
 * Only variables that are actually consumed by the app belong here.
 * Public (`NEXT_PUBLIC_*`) and server-only variables are validated in
 * separate schemas so a server secret can never be re-exported to the
 * client bundle by accident.
 */

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

const DEV_FALLBACK_SITE_URL = "http://localhost:3000";

function parsePublicEnv() {
  const result = publicSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  });

  if (!result.success) {
    throw new Error(
      `Invalid public environment variables: ${result.error.message}`,
    );
  }

  return result.data;
}

const publicEnv = parsePublicEnv();

export const env = {
  /**
   * Absolute site URL, safe to use for metadataBase and canonical links.
   * Falls back to a local development URL so `next dev` never crashes
   * solely because NEXT_PUBLIC_SITE_URL is unset.
   */
  siteUrl: publicEnv.NEXT_PUBLIC_SITE_URL ?? DEV_FALLBACK_SITE_URL,
} as const;
