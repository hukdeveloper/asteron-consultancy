import { ImageResponse } from "next/og";

import { siteContent } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteContent.name} — ${siteContent.tagline}`;

/**
 * Code-generated default Open Graph image — brand colours (navy/teal/gold,
 * see docs/DESIGN_SYSTEM.md), the same compass-star/open-book mark as
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
            d="M12 1.5 13.4 8.6 20.5 10 13.4 11.4 12 18.5 10.6 11.4 3.5 10 10.6 8.6Z"
            fill="#3157F6"
          />
          <path
            d="M2.75 12.75c2.6-1 5.4-1 8.25 0v7.75c-2.85-1-5.65-1-8.25 0Z"
            fill="#12A594"
            fillOpacity={0.35}
            stroke="#F7F9FC"
            strokeWidth={1.3}
          />
          <path
            d="M21.25 12.75c-2.6-1-5.4-1-8.25 0v7.75c2.85-1 5.65-1 8.25 0Z"
            fill="#12A594"
            fillOpacity={0.35}
            stroke="#F7F9FC"
            strokeWidth={1.3}
          />
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
