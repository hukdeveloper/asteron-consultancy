import { ImageResponse } from "next/og";

import { siteContent } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteContent.name} — ${siteContent.tagline}`;
// Required for `output: "export"` (next.config.ts) — this image is fully
// deterministic (no request-time data), so force-static just tells Next
// to render it once at build time instead of expecting a server.
export const dynamic = "force-static";

/**
 * Code-generated default Open Graph image — brand colours (ink/blue/teal,
 * see docs/DESIGN_SYSTEM.md), the same "J" + destination-dot mark as
 * `SiteLogo`, the real site name and tagline. No stock photography, no
 * fabricated statistics or claims, per docs/DECISIONS.md "Content
 * Accuracy". Page-specific `openGraph.title`/`description` already set
 * per route (see each page's `generateMetadata`) still override the
 * title/description shown by link previews — this image is the shared
 * visual fallback used wherever a route doesn't set its own.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#14213D",
        padding: 64,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg
          viewBox="0 0 24 24"
          width={72}
          height={72}
          fill="none"
          style={{ display: "flex" }}
        >
          <path
            d="M14.5 6v8.2a4.3 4.3 0 0 1-4.3 4.3c-1.6 0-2.9-.7-3.7-1.9"
            stroke="#F7F9FC"
            strokeWidth={2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={14.5} cy={6} r={1.6} fill="#3157F6" />
        </svg>
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#F7F9FC",
            letterSpacing: -1,
          }}
        >
          {siteContent.name}
        </span>
      </div>
      <span
        style={{
          marginTop: 28,
          fontSize: 32,
          color: "#12A594",
          fontWeight: 600,
        }}
      >
        {siteContent.tagline}
      </span>
    </div>,
    { ...size },
  );
}
