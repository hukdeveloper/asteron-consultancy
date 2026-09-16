/**
 * Authoritative route-ownership mapping for header nav active states
 * (redesigned Phase 10B — see docs/DECISIONS.md "Visual Language Reset").
 *
 * Deliberately NOT simple href-prefix matching: `/study-abroad/united-kingdom`
 * is prefixed by `/study-abroad` but must activate "Destinations", not
 * "Study Abroad" — the previous header's naive prefix check let two
 * unrelated nav items appear active simultaneously (e.g. both "Study
 * Abroad" and "Destinations" filled/active on a destination page), which
 * this function exists specifically to make structurally impossible: it
 * returns at most one group id, ever.
 */
export type NavGroupId =
  | "study-abroad"
  | "destinations"
  | "services"
  | "resources"
  | "about"
  | "contact";

export function getActiveNavGroupId(
  pathname: string | null | undefined,
): NavGroupId | null {
  if (!pathname) return null;

  if (pathname === "/study-abroad") return "study-abroad";

  if (pathname.startsWith("/study-abroad/")) {
    const rest = pathname.slice("/study-abroad/".length);
    if (rest === "undergraduate" || rest === "postgraduate") {
      return "study-abroad";
    }
    // Any other /study-abroad/<slug> is a destination detail page.
    return "destinations";
  }

  if (pathname === "/universities" || pathname.startsWith("/universities/")) {
    return "study-abroad";
  }
  if (pathname === "/scholarships" || pathname.startsWith("/scholarships/")) {
    return "study-abroad";
  }
  if (pathname === "/check-eligibility") return "study-abroad";

  if (pathname === "/services" || pathname.startsWith("/services/")) {
    return "services";
  }
  if (pathname === "/insurance" || pathname.startsWith("/insurance/")) {
    return "services";
  }

  if (pathname === "/resources" || pathname.startsWith("/resources/")) {
    return "resources";
  }
  if (pathname === "/events" || pathname.startsWith("/events/")) {
    return "resources";
  }
  if (pathname === "/faq") return "resources";
  if (
    pathname === "/success-stories" ||
    pathname.startsWith("/success-stories/")
  ) {
    return "resources";
  }

  if (pathname === "/about" || pathname === "/team") return "about";

  if (pathname === "/contact") return "contact";

  return null;
}
