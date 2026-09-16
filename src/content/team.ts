import type { TeamMember } from "@/types/content";

/**
 * Role-based placeholder team cards for /team. No real staff information
 * exists yet — do not add names, photos, biographies, or credentials
 * here. See docs/DECISIONS.md "Team Placeholders" and "How to replace
 * team placeholders" in README.md for the replacement procedure.
 */
export const teamMembers: TeamMember[] = [
  {
    id: "senior-education-counsellor",
    roleTitle: "Senior Education Counsellor",
    roleSummary:
      "Helps students clarify their goals and compare destinations, study levels and subject areas.",
    isPlaceholder: true,
    placeholderNote: "Profile to be added.",
    icon: "Compass",
    displayOrder: 1,
  },
  {
    id: "admissions-adviser",
    roleTitle: "Admissions Adviser",
    roleSummary:
      "Supports application planning, document preparation and communication with institutions.",
    isPlaceholder: true,
    placeholderNote: "Profile to be added.",
    icon: "FileCheck2",
    displayOrder: 2,
  },
  {
    id: "visa-documentation-adviser",
    roleTitle: "Visa Documentation Adviser",
    roleSummary:
      "Helps organise visa documentation and understand the general application process.",
    isPlaceholder: true,
    placeholderNote: "Profile to be added.",
    icon: "IdCard",
    displayOrder: 3,
  },
  {
    id: "insurance-support-adviser",
    roleTitle: "Insurance Support Adviser",
    roleSummary:
      "Provides general information and quotation assistance for student, travel and visitor insurance.",
    isPlaceholder: true,
    placeholderNote: "Profile to be added.",
    icon: "ShieldCheck",
    displayOrder: 4,
  },
  {
    id: "student-support-coordinator",
    roleTitle: "Student Support Coordinator",
    roleSummary:
      "Coordinates ongoing support from application through to pre-departure preparation.",
    isPlaceholder: true,
    placeholderNote: "Profile to be added.",
    icon: "Users",
    displayOrder: 5,
  },
];
