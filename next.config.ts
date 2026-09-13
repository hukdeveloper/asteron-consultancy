import type { NextConfig } from "next";

// Baseline security headers applied to every route. A Content-Security-Policy
// is intentionally NOT set here: a meaningful CSP for this app needs
// per-request nonces generated in `proxy.ts` (Next.js 16's successor to
// middleware) plus every page that uses inline scripts/styles wired to that
// nonce and opted into dynamic rendering. That proxy/nonce architecture
// doesn't exist yet, so shipping a static CSP now would either break the
// app or be too permissive to add real protection. Tracked as deferred work
// in docs/DECISIONS.md — implement alongside the proxy layer in a later
// phase rather than guessing at a policy today.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Browsers ignore this over plain HTTP in local dev, so it's safe to
  // always send; it only takes effect once the site is served over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
