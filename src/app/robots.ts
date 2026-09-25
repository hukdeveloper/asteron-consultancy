import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

// Required for `output: "export"` (next.config.ts) — see opengraph-image.tsx.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
