# Technical Architecture — Asteron Global Consultancy

> **Scope correction (2026-09-12):** the initial release is a **static website** — no database, no ORM, no authentication, no admin dashboard, no API server. This document was rewritten accordingly; the previous Prisma/PostgreSQL/Auth.js-based architecture is preserved conceptually in the "Future Tracks" sections as the target for later phases, not as current-track work. See [docs/DECISIONS.md](DECISIONS.md).

## Roadmap Tracks (context for every section below)

1. **Static website** (current) — everything in Sections 1–14 describes this track unless a section says otherwise.
2. **Form-service integration** (future) — Section 15.
3. **Strapi CMS integration** (future) — Section 16.
4. **Advanced portal features** (future, speculative, not designed) — Section 17.

## 1. Application Architecture

- **Framework:** Next.js App Router, TypeScript throughout, statically generated (SSG) — no server-side database queries, no server-side sessions.
- **Rendering strategy:** Server Components by default. Client Components only where interactivity is required (forms, menus, any small interactive widget). Nearly the entire site can be static HTML with minimal client JS.
- **Route groups:** A single `(public)` route group holds all pages (see [docs/SITEMAP.md](SITEMAP.md)). There is no `(admin)` route group and none is planned — content management happens outside the Next.js app (Track 3, via Strapi's own admin).
- **Content layer** (replaces the "data access layer" from the original database-backed design):
  - `src/types/content.ts` — shared content types, shaped to match the target Strapi content model in [docs/CONTENT_MODEL.md](CONTENT_MODEL.md).
  - `src/content/` — local typed TypeScript content objects; the current "source of truth."
  - `src/lib/content/` — the content-access layer. Every function here is `async` and returns a `Promise`, even though the current implementation is synchronous local data — this is what lets Track 3 swap in real Strapi API calls without changing a single call site.
  - **Rule:** pages and components import from `src/lib/content/*`, never from `src/content/*` directly.
- **Component layers:**
  - `components/ui/` — low-level, reusable, presentation-only components (shadcn/ui primitives).
  - `components/layout/`, `components/shared/` — composed, feature-level components (e.g., `Container`, `PageHeader`, future `DestinationCard`).
  - Route-level `page.tsx`/`layout.tsx` files compose components and fetch content via the content-access layer.

### Shared Website Shell (Phase 2)

`src/app/(public)/layout.tsx` wraps every public route in one shell, composed top to bottom:

1. `AnnouncementBar` — a server component; renders `null` (nothing) if `siteConfig.announcementBarEnabled` is `false` or the current `AnnouncementContent.enabled` is `false`. No dismiss state — see docs/DECISIONS.md for why a persisted-dismiss control was deliberately not built.
2. `SiteHeader` — a server component that fetches nav/CTA/site content once, then renders:
   - `HeaderDesktopNav` (Client Component; needs `usePathname` for active-link state) — hidden below `xl`. Items with `children` open an accessible Radix `DropdownMenu` (click/keyboard-triggered, not hover-only).
   - `HeaderMobileMenu` (Client Component; owns the Sheet's open state) — hidden at `xl` and above. Built on shadcn's `Sheet` (Radix `Dialog`), so focus trapping, `Escape`-to-close, and focus return on close are handled by the library. Grouped items use native `<details>/<summary>` — keyboard-operable and exposed to assistive tech with no extra ARIA wiring.
   - The **`xl` breakpoint (1280px), not `lg` (1024px), is load-bearing**: with 9 top-level items plus a CTA and logo, `lg` measured 185px of horizontal overflow at exactly 1024px width in manual testing. Do not lower this breakpoint without re-checking for overflow at 1024–1279px.
3. `<main>` — the page's own content. This is the **only** `<main>` on any public page; the root layout (`src/app/layout.tsx`) intentionally renders no `<main>` of its own so nested route groups don't duplicate the landmark. A future route group with a different shell (e.g. a standalone campaign landing page) defines its own `<main>` without conflicting with this one.
4. `SiteFooter` — a server component: brand summary + social links, data-driven link groups (`getFooterLinkGroups()`), contact details (`getSiteContent().contact`), legal links (`getLegalLinks()`), and a disclaimer paragraph.
5. `MobileQuickActions` — a server component; renders `null` if `siteConfig.mobileQuickActionsEnabled` is `false`. Fixed to the viewport bottom, `md:hidden`, respects `env(safe-area-inset-bottom)`. When enabled, the same layout adds `pb-16 md:pb-0` to `<main>` so the bar never overlaps page content or the footer.

## 2. Route Organization

```
app/
  layout.tsx                         # root layout: html/body, fonts, metadata, skip link
  not-found.tsx                      # implemented
  error.tsx                          # implemented
  global-error.tsx                   # implemented
  (public)/
    layout.tsx                       # the shared shell — see above
    page.tsx                         # temporary development homepage (Phase 1)
    about/                           # ComingSoon
    study-abroad/
      page.tsx                       # ComingSoon
      [destination]/page.tsx         # ComingSoon per destination; generateStaticParams from src/content/destinations.ts
    universities/                    # ComingSoon
    services/
      page.tsx                       # ComingSoon
      [slug]/page.tsx                # ComingSoon per service; generateStaticParams from src/content/services.ts
    scholarships/                    # ComingSoon
    insurance/                       # ComingSoon
    success-stories/                 # ComingSoon
    resources/
      page.tsx                       # ComingSoon
      faqs/page.tsx                  # ComingSoon (added beyond the original sitemap — see docs/SITEMAP.md)
    events/                          # ComingSoon
    contact/                         # ComingSoon
    book-consultation/               # ComingSoon
    check-eligibility/               # ComingSoon
    insurance-quote/                 # ComingSoon
    legal/
      privacy-policy/                # ComingSoon
      terms-of-service/              # ComingSoon
      cookie-policy/                 # ComingSoon
      disclaimer/                    # ComingSoon
```

Every route above other than `/` currently renders `src/components/shared/ComingSoon.tsx` — one shared placeholder component, not duplicated markup per route — with a route-specific title and breadcrumb. Phase 3 replaces each with real content, one route at a time, without needing to touch the shell or the other routes.

No `api/` directory and no `(admin)` group exist or are planned for this track — there is nothing server-side to expose an API for yet.

## 3. Content Access Approach (current track)

- Every content type gets a local typed object under `src/content/` and a corresponding `async` accessor under `src/lib/content/`. Implemented so far: `getSiteContent()` (identity + contact), `getHeaderNavigation()` / `getHeaderPrimaryCta()` / `getFooterLinkGroups()` / `getLegalLinks()` (navigation), `getAnnouncement()`, `getSocialLinks()`, `getDestinations()` / `getDestinationBySlug(slug)`, `getServices()` / `getServiceBySlug(slug)`.
- Dynamic routes (e.g., `study-abroad/[destination]`) use `generateStaticParams()` reading from the content-access layer to enumerate all pages at build time — everything is prerendered, nothing is fetched at request time. An unknown slug (one not returned by `generateStaticParams`) calls `notFound()` rather than rendering a generic placeholder, so a truly unmapped URL still reaches the real 404 page.
- Destination/service navigation entries (dropdown children) are generated from `src/content/{destinations,services}.ts` in `src/content/navigation.ts` rather than duplicated by hand — adding a destination/service automatically updates the header, and its `[slug]`/`[destination]` stub route picks it up via `generateStaticParams` without further wiring.
- `src/config/site.ts` holds structural feature toggles (`announcementBarEnabled`, `mobileQuickActionsEnabled`) — distinct from both `src/content/*` (marketing content) and `src/lib/env.ts` (environment variables). This is where "disable the announcement bar" or "disable mobile quick actions" is implemented.
- No pagination/filtering infrastructure is needed while content volume is small and hand-authored; add it only if a listing page's content volume genuinely requires it, and implement it client-side over the already-static dataset (no server-side query layer exists to filter in).

## 4. Authentication and Authorization

**Not applicable to the current track.** There is no admin surface, no staff login, and no authenticated area anywhere in the static website. Do not add Auth.js, sessions, or any auth-adjacent code until Track 3 (Strapi) introduces a real need for it — and even then, Strapi ships its own admin authentication; this project would not build its own.

## 5. Forms and Validation (current track: UI only)

- **Client-side:** React Hook Form + Zod resolvers for all forms (Consultation, Check Eligibility, Insurance Quote, Contact), with accessible real-time validation and error messaging.
- **No server-side persistence exists in this track.** There is no database and no API route to submit to.
- **Submission adapter pattern:** each form calls a single, swappable submission function (e.g., `submitConsultationRequest(data)`) defined behind a small adapter interface. The current implementation is an explicitly-labelled **demo/development mode** — it may log to the console or simulate a delay, but it must never claim to the visitor that the enquiry was saved or will be followed up on. The UI's success state must say so in plain language (e.g., "Form submission is not yet connected — this is a development preview").
- **Track 2 will:** implement a real adapter (e.g., posting to a third-party form/email service or a small serverless function), add spam/bot mitigation (honeypot field, timing heuristic, optional CAPTCHA) and rate limiting at that boundary, and remove the demo-mode messaging.
- **Track 3 will:** optionally route submissions into Strapi as content entries if that becomes the chosen lead-storage mechanism, superseding whatever Track 2 adapter was used.

## 6. Media (current track)

- Local placeholder media only, under `public/images/` and `public/videos/`, served via Next.js image optimization (`next/image`) with responsive sizing and lazy loading (excluding above-the-fold hero media).
- No media storage abstraction/provider is needed yet since there is no dynamic upload path — all media ships with the repository.
- Every media file must be appropriately licensed placeholder content per [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) §11; track attribution in a comment or a lightweight local manifest if a file requires it.

## 7. Email

**Not applicable to the current track** — there is nothing server-side to send email from. An email-provider abstraction becomes relevant only once Track 2 needs to notify staff of a real submission.

## 8. Security (current track)

- Input validation on every form via Zod, client-side (no server boundary exists yet to also validate at).
- Output encoding handled by React/Next defaults.
- Standard security headers set in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- **Content-Security-Policy is intentionally deferred**, not implemented. A meaningful CSP needs per-request nonces (via a `proxy.ts`, Next 16's renamed middleware) and dynamic rendering on nonce-consuming pages — that architecture isn't needed yet for a static site and would add complexity without a corresponding attack surface to protect. Revisit once Track 2/3 introduce dynamic behavior worth protecting with a nonce-based CSP.
- No secrets exist in the current track beyond `NEXT_PUBLIC_SITE_URL` (not sensitive); environment-variable validation (`src/lib/env.ts`, Zod-backed) still applies as a general discipline.
- No database, no admin, no server-side personal-data handling — the attack surface is deliberately minimal in this track.

## 9. SEO

- Centralized metadata via the Next.js Metadata API (`generateMetadata`), sourced from content's SEO fields (`metaTitle`, `metaDescription`) via the content-access layer.
- Structured data (JSON-LD for Organization, BreadcrumbList, Article, Event, FAQPage) can be added once the corresponding pages exist — populate only with real/approved data, per [CLAUDE.md](../CLAUDE.md).
- Sitemap/robots: Next.js's built-in `sitemap.ts`/`robots.ts` conventions, generated from local content (no admin route to exclude, since none exists).
- Canonical URLs via `metadataBase` (already configured) plus per-page `alternates.canonical` once dynamic routes exist.

## 10. Accessibility

- Target: **WCAG 2.2 AA**.
- Semantic HTML landmarks, correct heading hierarchy, accessible form labels/error associations (`aria-describedby`, `aria-invalid`), visible focus states, full keyboard operability.
- Color contrast for all brand tokens checked against WCAG AA at the component level (see [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)).
- No motion-only or color-only signaling of state.
- Skip-to-content link (implemented), accessible mobile menu once navigation exists (proper `aria-expanded`/focus trapping).

## 11. Performance

- Targets: LCP ≤ 2.5s, CLS < 0.1, INP < 200ms on representative pages.
- Fully static generation gives every page a strong performance baseline by default — no database round-trip, no server rendering cost per request.
- Image optimization, self-hosted fonts (`next/font`), route-level code-splitting via App Router defaults.
- Avoid heavy client-side libraries for non-essential motion/carousels (no carousels unless strongly justified).

## 12. Testing

- **Unit/component:** Vitest + Testing Library for components, the content-access layer, and utility functions (`src/lib/`).
- **End-to-end:** Playwright for critical journeys — homepage, navigation between static pages once built, and each form's client-side happy-path and validation-error path.
- **Accessibility testing:** automated checks (e.g., axe integration) on key pages as part of the E2E suite.
- Tests are required for new behavior per [CLAUDE.md](../CLAUDE.md); CI should run format:check, lint, typecheck, unit tests, and E2E.

## 13. Deployment (current track)

- Target: any static-hosting-capable platform (e.g., Vercel, Netlify, or a static export served from any CDN/object storage) — no database or persistent runtime is required.
- Environment separation (development/staging/production) is about build-time environment variables (`NEXT_PUBLIC_SITE_URL`) only — there is no database or secret credential to separate per environment yet.
- No migrations, no backup strategy needed for the current track (nothing persists server-side). Revisit once Track 3 introduces Strapi's own database.

## 14. Operational Considerations (current track)

- No structured server-side logging is needed yet — there is no server-side logic beyond static rendering and (later) a thin form-submission adapter. Add structured logging when Track 2 introduces a real submission endpoint worth logging.
- **Privacy-aware analytics**, if added, must be cookieless/aggregated or consent-gated, and must not degrade Core Web Vitals — provider TBD, see [docs/DECISIONS.md](DECISIONS.md).
- Basic uptime monitoring for the deployed static site is a reasonable launch-readiness item; no error-rate/APM tooling is needed without a server.

## 15. Future Track: Form-Service Integration

- Replace the demo-mode submission adapter (Section 5) with a call to a real external service (e.g., a transactional email API, a hosted form-backend service, or a small serverless function written specifically for this purpose).
- Add spam/bot mitigation (honeypot + timing heuristic, optional CAPTCHA behind a swappable interface) and rate limiting at whatever boundary receives the submission.
- Decide at that time whether submissions are (a) emailed directly to staff with no storage, (b) stored by the third-party service's own dashboard, or (c) proxied into Strapi (Section 16) as content entries — record the decision in [docs/DECISIONS.md](DECISIONS.md) when made.
- This track does **not** require introducing a database into this Next.js codebase merely to receive form submissions — prefer a managed service or a minimal stateless function first.

## 16. Future Track: Strapi CMS Integration

- Stand up Strapi as a **separate application** (not inside this Next.js codebase) with content types matching [docs/CONTENT_MODEL.md](CONTENT_MODEL.md): Destinations, Universities, Programmes, Services, Insurance information, Scholarships, Success Stories, Articles, Events, FAQs, Team Members, Site Settings, Navigation, and reusable SEO fields/Media.
- Re-implement each function in `src/lib/content/` to call the Strapi API instead of returning local data — the function signatures (already `async`, already returning the shapes in `src/types/content.ts`) should not need to change, and neither should any page or component that calls them.
- Decide on-demand revalidation strategy at that point (e.g., Incremental Static Regeneration triggered by a Strapi webhook) vs. rebuilding on every content change.
- Content management happens in **Strapi's own admin UI** — this project does not build a custom admin dashboard in this track or any other.
- Staff roles/permissions (currently an open question, U-005 in [docs/DECISIONS.md](DECISIONS.md)) are configured in Strapi's own role system, not designed bespoke here.

## 17. Future Track: Advanced Portal Features (speculative)

Not designed, not scoped, not committed to. Would cover things like authenticated student accounts, application-lifecycle tracking, online payments, and insurance policy issuance — each of which would need its own architecture decision (very likely reintroducing a database and authentication) if and when the business actually commits to building it. Do not build toward this speculatively.

## 18. Phase 1 Implementation Notes

Recorded when the project was scaffolded (see [docs/DECISIONS.md](DECISIONS.md) for the full decision log):

- **Framework versions:** Next.js 16.3.5 (App Router, Turbopack — stable and default as of v16, no manual `--turbopack` flag needed), React 19.2.8, TypeScript 5. Next.js 16 changed several APIs from prior versions (fully async `params`/`searchParams`, `middleware` → `proxy`, `next lint` removed in favor of the ESLint CLI, ESLint flat config as default). Anyone extending this codebase should treat pre-2026 Next.js knowledge as potentially stale and check `node_modules/next/dist/docs/` (or `AGENTS.md`) for the installed version's actual behavior before assuming an API.
- **shadcn/ui uses the Radix primitive library** (`-b radix`), not the newer Base UI default, specifically so `class-variance-authority`, `clsx`, and `tailwind-merge` remain first-class direct dependencies with a hand-written `cn()` in `src/lib/utils.ts`, per this project's explicit stack requirements — the shadcn CLI's own current default otherwise generates code against its own bundled `cn` package instead.
- **No `loading.tsx` yet** — there are no async data boundaries to show a fallback for on a fully static site with local content; add one only if a future route introduces genuine runtime waiting.
- **The original Phase 1 scope briefly included a `/admin` placeholder route, PostgreSQL/Prisma, and Auth.js.** The lead architect corrected this mid-phase: the initial release is static-only. The admin route was deleted before this phase completed; no database or auth packages were ever installed. See [docs/DECISIONS.md](DECISIONS.md) for the full record.

## 19. Phase 2 Implementation Notes

Recorded when the shared shell and content architecture were built (see [docs/DECISIONS.md](DECISIONS.md) for the full decision log):

- **Header/mobile-nav breakpoint is `xl` (1280px), not `lg` (1024px).** Measured 185px of horizontal overflow at exactly 1024px with 9 top-level nav items + CTA + logo under `lg`. Widening the breakpoint to `xl` fixed it with no other layout changes. Re-check for overflow at 1024–1279px before ever lowering this.
- **No brand icons (Facebook/Instagram/LinkedIn/YouTube) are available in the installed `lucide-react` version** — the package dropped bundled brand/social glyphs. Footer social links render as neutral two-letter initial badges ("Fb", "Ig", "In", "Yt") instead, avoiding both a new icon dependency and any risk of reproducing a trademarked logo.
- **Vitest needed explicit `afterEach(cleanup)`.** With `globals: false` in `vitest.config.mts`, `@testing-library/react`'s automatic cleanup (which looks for a _global_ `afterEach`) never registered, so multiple `render()` calls across `it` blocks in one file accumulated in the same document. Fixed once, centrally, in `vitest.setup.ts` — no per-file workaround needed.
- **A stray leftover `next dev` process on port 3000 caused a real-looking Playwright failure** (the mobile-menu click appeared to do nothing) because Playwright's `webServer.reuseExistingServer` silently reused it instead of running the configured `build && start`. Symptom: HMR WebSocket connection attempts in browser console logs on a supposedly-production server. If a Playwright test behaves inexplicably, check for and kill anything already listening on port 3000 before assuming a code bug.
- **`Button` (shadcn-generated) is not wrapped in `React.forwardRef`.** This did not block any interaction actually needed in this phase (Radix `Trigger`/`asChild` composition worked correctly for both `DropdownMenu` and `Sheet` once tested against a real, freshly-built server), but keep it in mind if a future Radix primitive's `asChild` composition needs ref forwarding for measurement/positioning and behaves unexpectedly.
- Added the `accent` Button variant (`bg-brand-gold text-brand-gold-foreground`) to `src/components/ui/button.tsx` for the "Book a Consultation" CTA family, matching the Accent colour role already documented in docs/DESIGN_SYSTEM.md §2 — this is a normal edit to a shadcn-generated file, not a fork to avoid maintaining.
- `docs/SITEMAP.md` gained one route not in the original list: `/resources/faqs`, needed because the header's Resources dropdown includes "FAQs" but the sitemap had no dedicated FAQ page.
