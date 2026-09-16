# Release Checklist — Asteron Global Consultancy

For the lead architect / site owner to work through before approving a public launch. This document does not perform any of these actions itself — see [docs/PRODUCTION_CONTENT_CHECKLIST.md](PRODUCTION_CONTENT_CHECKLIST.md) for the classified list of what each content item needs, and [docs/DEPLOYMENT.md](DEPLOYMENT.md) for the technical deployment guide referenced throughout.

## 1. Validation (run immediately before any deploy)

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run validate:content`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm audit`
- [ ] `npm outdated` (reviewed, not necessarily zero)

All of the above passed as of this Phase 9 review — see the final report for exact results. Re-run all of them again immediately before the actual production deploy, since content/dependency state may have moved on since this review.

## 2. Content replacement (see docs/PRODUCTION_CONTENT_CHECKLIST.md for full detail)

- [ ] Real contact phone, WhatsApp number, email inbox, and address set in `src/content/site.ts`.
- [ ] Legal pages reviewed by a qualified professional and `isDraft: true` removed once approved.
- [ ] Decision made on team profiles, testimonials, scholarships, featured universities, social links, and the sample event — replace with real content or knowingly keep the placeholder/empty state.
- [ ] Insurance provider disclosure confirmed (does Asteron issue its own quotes or broker third-party insurers?).
- [ ] Destination content re-verified against current official government/institution sources.

## 3. Legal review

- [ ] Privacy Policy, Terms of Service, Cookie Policy, and Disclaimer reviewed and approved by a qualified professional.
- [ ] Confirm which jurisdiction(s)' data-protection law applies (relevant once Track 2 processes real form data).

## 4. Contact verification

- [ ] Phone number and WhatsApp number tested as reachable.
- [ ] Email inbox confirmed monitored.
- [ ] Physical address confirmed accurate (or map/office-hours placeholders intentionally kept).

## 5. Domain

- [ ] Production domain registered and DNS pointed at the chosen hosting platform.
- [ ] TLS certificate provisioned (automatic on most modern platforms).

## 6. Environment variables

- [ ] `NEXT_PUBLIC_SITE_URL` set to the final `https://` production domain in the hosting platform's environment configuration, **before** the build that will actually be deployed (it's baked in at build time — see docs/DEPLOYMENT.md §3, §9).
- [ ] Confirm no other environment variable is required (there is exactly one today — re-check `src/lib/env.ts` if this has changed since this checklist was written).

## 7. Hosting selection

- [ ] Review the platform comparison in docs/DEPLOYMENT.md and choose one.
- [ ] Confirm the chosen platform supports Next.js server runtime (this app is not a static export — see docs/DEPLOYMENT.md §1).

## 8. Preview deployment

- [ ] Deploy to a preview/staging environment first (most platforms provide this automatically per-PR/per-branch).
- [ ] Run the full post-deploy verification checklist (docs/DEPLOYMENT.md §15) against the preview URL before promoting to production.

## 9. Mobile QA

- [ ] Manually check the site on at least one real iOS and one real Android device (automated Playwright viewport emulation, already run in this review, is not a substitute for a real device pass).
- [ ] Confirm the mobile quick-actions bar (Call/WhatsApp/Book) does not obscure content or overlap the footer on a real device.
- [ ] Confirm all four forms are usable with a real on-screen keyboard (date pickers, select dropdowns, checkbox targets).

## 10. Form behaviour

- [ ] Confirm stakeholders understand and accept that all four forms currently show a "not connected yet" message on submission — no enquiry reaches staff through the website today.
- [ ] Decide whether this is acceptable for launch, or whether Track 2 (real form-service integration) must ship first — see docs/DEPLOYMENT.md §7 for what Track 2 requires before any form is connected.

## 11. Analytics decision

- [ ] Decide whether to add analytics at or after launch. None exists today (deliberately — see docs/DEPLOYMENT.md §8).
- [ ] If analytics is added, update the Cookie Policy and add a consent mechanism before any non-essential cookie is set.

## 12. Cookie reassessment

- [ ] Re-confirm no analytics/advertising/consent-management cookies have been introduced since this review (a one-line check: grep the codebase for new script tags or tracking libraries).
- [ ] If still none, no cookie banner is needed. If any were added, the Cookie Policy and this decision must be revisited together.

## 13. Backup / rollback

- [ ] Confirm the hosting platform keeps prior deployment artifacts available for rollback (most do automatically).
- [ ] No database exists in this track, so rollback is always safe — there is no persisted state to reconcile (revisit once Track 3 introduces Strapi's own database).

## 14. Production approval

- [ ] Every item under "Blockers" in docs/PRODUCTION_CONTENT_CHECKLIST.md is resolved or explicitly, knowingly accepted by the lead architect as a launch decision.
- [ ] Lead architect gives final sign-off to commit, push, and deploy — none of which this review performed.
