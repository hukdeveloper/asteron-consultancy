import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Code-generated favicon reusing the same compass-star/open-book mark as
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
    </div>,
    { ...size },
  );
}
