import type { NextConfig } from "next";

/**
 * `output: "export"` — this project is the static-website track (see
 * CLAUDE.md "Project Purpose" and docs/DECISIONS.md C-011/C-013): every
 * route is already static or SSG with no API routes, middleware, or
 * request-time server logic, so a Node server is not actually required to
 * run it. Export mode turns `next build` into a plain `out/` directory of
 * HTML/CSS/JS that can be uploaded to any static host (Hostinger shared
 * hosting, S3, GitHub Pages, etc.) as well as still working on Vercel.
 *
 * Two things this trades away, both handled outside `next.config.ts`
 * instead:
 * - `headers()` is not supported in export mode (there is no server to run
 *   it per-request). The same security headers now live in
 *   `public/.htaccess` for Apache-based static hosts — see that file and
 *   docs/DEPLOYMENT.md "Security Headers". A host without `.htaccess`
 *   support (e.g. a raw S3 bucket) needs the equivalent configured at
 *   that host/CDN layer instead.
 * - `next/image` optimization requires a running image-optimization
 *   server, which export mode doesn't have either. Nothing in this
 *   codebase uses `next/image` yet (no photography — see
 *   docs/MEDIA_ATTRIBUTIONS.md), but `images.unoptimized` is set now so
 *   adding an image later doesn't silently break the export build.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
