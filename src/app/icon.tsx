import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
// Required for `output: "export"` (next.config.ts) — see opengraph-image.tsx.
export const dynamic = "force-static";

/**
 * Code-generated favicon reusing the same "J" + destination-dot mark as
 * `SiteLogo` (src/components/shared/SiteLogo.tsx) so the brand mark is
 * defined once, in spirit, across both the DOM and this static asset — no
 * downloaded/AI-generated image, per docs/DECISIONS.md "Content Accuracy".
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#14213D",
        borderRadius: 6,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
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
    </div>,
    { ...size },
  );
}
