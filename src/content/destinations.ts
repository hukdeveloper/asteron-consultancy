import type { Destination } from "@/types/content";

/**
 * Full destination records for the /study-abroad/[destination] template.
 *
 * Content policy (see docs/DECISIONS.md "Content Accuracy"): every field
 * below is deliberately general. No precise visa fees, processing times,
 * financial thresholds, work-rights promises, universal deadlines,
 * invented scholarships, or invented university partnerships appear
 * anywhere in this file. `lastReviewed` records when this general-guidance
 * content was last checked against this policy — it does NOT claim that
 * live government/official sources were re-verified on that date (no
 * browsing was performed to author this content; see docs/DECISIONS.md).
 * Readers are directed to official institutions and immigration
 * authorities for current, binding requirements throughout.
 */
export const destinations: Destination[] = [
  {
    id: "uk",
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    region: "Europe",
    flagLabel: "UK",
    visualIcon: "Landmark",
    heroTitle: "Study in the United Kingdom",
    heroDescription:
      "A long-established higher education system with a wide range of universities and programme lengths.",
    overview:
      "The UK is home to a large number of universities offering undergraduate and postgraduate programmes across most subject areas. Course structures, entry requirements and programme lengths vary by institution, so comparing individual universities and courses directly is an important part of planning.",
    highlights: [
      {
        id: "uk-tradition",
        title: "Established academic tradition",
        description:
          "A long history of higher education across a wide range of institutions.",
      },
      {
        id: "uk-shorter-postgrad",
        title: "Often shorter postgraduate courses",
        description:
          "Many postgraduate programmes are one year — confirm duration with each university, as it varies by course.",
      },
      {
        id: "uk-diversity",
        title: "Wide subject range",
        description:
          "Programmes are offered across most academic and professional subject areas.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate", "Foundation"],
    popularSubjectAreas: [
      "Business and Management",
      "Computing and Technology",
      "Engineering",
      "Social Sciences",
    ],
    applicationProcess:
      "Undergraduate applications are typically made through the UK's centralised UCAS system, while postgraduate applications are usually made directly to each university. Confirm the correct route and any deadlines with your chosen institutions.",
    typicalIntakes: ["September", "January"],
    generalCostGuidance:
      "Costs vary significantly by city, university and lifestyle — London is generally more expensive than other regions. Check each university's own published estimates for current figures.",
    scholarshipGuidance:
      "Some UK universities and external organisations offer scholarships or fee reductions for international students. Availability, criteria and amounts vary by university, subject and intake, so check directly with your shortlisted institutions rather than assuming eligibility.",
    visaGuidance:
      "Studying in the UK generally requires a student visa appropriate to your course and institution. Visa categories, documentary requirements, fees and processing times are set and updated by the UK government, not by Janan, and can change. Always confirm current requirements on the official UK government immigration website before making plans.",
    workAndLifestyleNote:
      "Some student visa routes permit limited part-time work during study, subject to conditions set by the UK government that can change. Confirm current work conditions and any post-study options directly with official UK government sources — Janan does not determine or guarantee work rights.",
    faqItems: [
      {
        id: "uk-faq-language",
        question: "Do I need to prove English proficiency to study in the UK?",
        answer:
          "Most institutions require evidence of English proficiency for international applicants, though exact requirements vary by university and course. Check the specific requirement for each programme you're considering.",
      },
      {
        id: "uk-faq-work",
        question: "Can I work part-time while studying in the UK?",
        answer:
          "Some visa categories allow limited part-time work, subject to UK government conditions that can change. Confirm current rules on the official UK government immigration website.",
      },
      {
        id: "uk-faq-length",
        question: "How long do UK degrees typically take?",
        answer:
          "Many undergraduate degrees are three years and many postgraduate taught degrees are one year, but this varies by course and institution — always confirm with the specific university.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations:
      "English-speaking; English-proficiency evidence is generally required for admission.",
    lifestyleSetting:
      "Mix of large global cities and smaller university towns.",
    planningConsiderations:
      "September intake is generally the most competitive — starting your research and application early is advisable.",
    seo: {
      metaTitle: "Study in the United Kingdom",
      metaDescription:
        "General guidance on studying in the United Kingdom: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "au",
    slug: "australia",
    name: "Australia",
    shortName: "Australia",
    region: "Oceania",
    flagLabel: "AU",
    visualIcon: "Sun",
    heroTitle: "Study in Australia",
    heroDescription:
      "A well-regarded international education sector with universities across major cities and regional areas.",
    overview:
      "Australia hosts a large international student population across a range of universities in major cities and regional centres. Programme structures, entry requirements and campus environments differ between institutions, so comparing options directly is recommended.",
    highlights: [
      {
        id: "au-research",
        title: "Strong research reputation",
        description:
          "A number of Australian universities are well known internationally for research output.",
      },
      {
        id: "au-campus-life",
        title: "Established international student support",
        description:
          "Many universities have dedicated international student services.",
      },
      {
        id: "au-climate",
        title: "Varied city and regional options",
        description:
          "Choose between major coastal cities and smaller regional university towns.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate", "Vocational"],
    popularSubjectAreas: [
      "Business and Management",
      "Health and Life Sciences",
      "Engineering",
      "Computing and Technology",
    ],
    applicationProcess:
      "Applications are generally made directly to each university or via an authorised education agent. Some institutions also participate in centralised application services for certain states — confirm the correct route for your chosen university.",
    typicalIntakes: ["February", "July"],
    generalCostGuidance:
      "Living costs vary between major cities and regional areas. Check each university's own published estimates, which are updated more often than general guidance like this.",
    scholarshipGuidance:
      "Australian universities and government bodies offer a range of scholarship programmes for international students, with criteria that vary by university, course and nationality. Check current, official scholarship listings directly on each university's website rather than relying on general guidance.",
    visaGuidance:
      "Studying in Australia generally requires a student visa. Visa subclasses, financial and health-insurance requirements, fees and processing times are set by the Australian government and can change. Always confirm current requirements on the official Australian Government Department of Home Affairs website before making plans.",
    workAndLifestyleNote:
      "Student visa holders in Australia are generally permitted some paid work during study, subject to conditions set by the Australian government that can change over time. Confirm current work conditions and any post-study options directly with official Australian government sources.",
    faqItems: [
      {
        id: "au-faq-agent",
        question: "Do I need an education agent to apply?",
        answer:
          "It's possible to apply directly to most universities, though some students choose to work with an authorised agent or consultant for extra support. This isn't a formal requirement set by the universities themselves.",
      },
      {
        id: "au-faq-regional",
        question: "Is studying in a regional area different from a major city?",
        answer:
          "Regional campuses can offer a different lifestyle and sometimes different visa-related considerations. Compare options directly with universities you're considering.",
      },
      {
        id: "au-faq-insurance",
        question: "Do international students need health cover in Australia?",
        answer:
          "International students are generally required to hold health cover appropriate to their visa. Confirm the current requirement with official Australian government sources and see our Insurance section for general guidance.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations:
      "English-speaking; English-proficiency evidence is generally required for admission.",
    lifestyleSetting:
      "Mix of major coastal cities and regional university towns.",
    planningConsiderations:
      "Health cover arrangements are typically needed early in the visa process — plan for this alongside your application.",
    seo: {
      metaTitle: "Study in Australia",
      metaDescription:
        "General guidance on studying in Australia: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "ca",
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    region: "North America",
    flagLabel: "CA",
    visualIcon: "TreePine",
    heroTitle: "Study in Canada",
    heroDescription:
      "A diverse higher education system across provinces, each with its own institutions and processes.",
    overview:
      "Canadian higher education is organised at the provincial level, meaning institutions, processes and some requirements can vary between provinces. Comparing universities and colleges directly, including which province they're in, is an important part of planning a Canadian application.",
    highlights: [
      {
        id: "ca-provinces",
        title: "Diverse provinces and cities",
        description:
          "Options range from large multicultural cities to smaller university towns.",
      },
      {
        id: "ca-college-options",
        title: "Universities and colleges",
        description:
          "Both university and college pathways exist, with different focuses and durations.",
      },
      {
        id: "ca-bilingual",
        title: "English and French options",
        description:
          "Some institutions and programmes are offered in French or bilingually, depending on the province.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate", "Diploma"],
    popularSubjectAreas: [
      "Business and Management",
      "Computing and Technology",
      "Health and Life Sciences",
      "Engineering",
    ],
    applicationProcess:
      "Applications are generally made directly to each institution, though some provinces use centralised application portals for certain programmes. Confirm the correct process for your chosen institution and province.",
    typicalIntakes: ["September", "January"],
    generalCostGuidance:
      "Costs vary notably by province and city. Check each institution's own current published estimates rather than relying on general figures.",
    scholarshipGuidance:
      "Canadian institutions, provincial governments and external organisations offer a range of scholarships and awards for international students, with eligibility varying by institution, province and programme. Check official, current scholarship listings directly with your shortlisted institutions.",
    visaGuidance:
      "Studying in Canada generally requires a study permit. Requirements, supporting documents, fees and processing times are set by the Government of Canada and can change. Always confirm current requirements on the official Government of Canada immigration website (Immigration, Refugees and Citizenship Canada) before making plans.",
    workAndLifestyleNote:
      "Some study permit holders are permitted limited work during study, subject to conditions set by the Government of Canada that can change. Confirm current work conditions and any post-graduation options directly with official Government of Canada sources — Janan does not determine or guarantee work rights.",
    faqItems: [
      {
        id: "ca-faq-province",
        question: "Does it matter which province I study in?",
        answer:
          "Yes — education is organised provincially in Canada, and this can affect institution types, some processes and cost of living. Compare provinces as part of choosing where to apply.",
      },
      {
        id: "ca-faq-college-university",
        question:
          "What's the difference between a Canadian college and university?",
        answer:
          "Colleges and universities in Canada can differ in programme focus and length. Review each institution's own programme details to understand which suits your goals.",
      },
      {
        id: "ca-faq-work-after",
        question: "Can I work in Canada after I graduate?",
        answer:
          "Post-graduation work options exist but are determined and updated by the Government of Canada, not by Janan, and depend on your specific circumstances. Confirm current rules on the official Government of Canada immigration website.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations:
      "Primarily English, with French-medium and bilingual options in some provinces (notably Quebec).",
    lifestyleSetting:
      "Mix of large multicultural cities and smaller university towns across a wide geography.",
    planningConsiderations:
      "Provincial differences can affect timelines and requirements — confirm details for the specific province you're considering.",
    seo: {
      metaTitle: "Study in Canada",
      metaDescription:
        "General guidance on studying in Canada: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "us",
    slug: "united-states",
    name: "United States",
    shortName: "US",
    region: "North America",
    flagLabel: "US",
    visualIcon: "Building2",
    heroTitle: "Study in the United States",
    heroDescription:
      "A large and varied higher education system with many institution types and programme structures.",
    overview:
      "The United States has one of the largest and most varied higher education systems in the world, spanning research universities, liberal arts colleges and community colleges. Because institution types, costs and programme structures vary widely, comparing specific universities directly is especially important when planning a US application.",
    highlights: [
      {
        id: "us-variety",
        title: "Wide range of institution types",
        description:
          "From large research universities to smaller liberal arts colleges, each with a different style of study.",
      },
      {
        id: "us-flexible-curriculum",
        title: "Flexible undergraduate curricula",
        description:
          "Many undergraduate programmes allow broad study before choosing or refining a major.",
      },
      {
        id: "us-research-facilities",
        title: "Extensive research facilities",
        description:
          "Many universities offer significant research infrastructure, particularly at postgraduate level.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate"],
    popularSubjectAreas: [
      "Business and Management",
      "Computing and Technology",
      "Engineering",
      "Arts and Design",
    ],
    applicationProcess:
      "Applications are generally made directly to each institution, sometimes via shared application platforms used by multiple universities. Standardised test requirements, if any, and document requirements vary by institution — confirm directly with each university.",
    typicalIntakes: ["August/September", "January"],
    generalCostGuidance:
      "Costs vary enormously between institution types and states. Check each university's own current published cost-of-attendance estimates rather than relying on general figures.",
    scholarshipGuidance:
      "Many US universities offer merit- or need-based financial aid and scholarships for international students, with availability and criteria varying significantly by institution. Check each university's own financial aid office for current, official information rather than assuming eligibility.",
    visaGuidance:
      "Studying in the US generally requires an appropriate student visa (commonly the F-1 category) sponsored by your enrolling institution. Visa requirements, documentary evidence, fees and processing times are set by the US Department of State and US Citizenship and Immigration Services, and can change. Always confirm current requirements on official US government immigration websites before making plans.",
    workAndLifestyleNote:
      "US student visa rules generally restrict off-campus work with limited exceptions, set and updated by US government authorities. Confirm current work conditions and any post-study options (such as periods of optional practical training) directly with official US government sources — Janan does not determine or guarantee work rights.",
    faqItems: [
      {
        id: "us-faq-tests",
        question: "Do I need standardised test scores to apply?",
        answer:
          "Requirements vary by institution and programme — some require standardised tests, others don't. Confirm the specific requirement for each university you're considering.",
      },
      {
        id: "us-faq-cost-variation",
        question: "Why do costs vary so much between US universities?",
        answer:
          "Institution type (public, private, research-focused, liberal arts) and state significantly affect cost. Compare each university's own published estimates directly.",
      },
      {
        id: "us-faq-opt",
        question: "Can international students work in the US after graduating?",
        answer:
          "Some post-study work options exist but are determined by US government authorities, not by Janan, and depend on your specific visa category and circumstances. Confirm current rules on official US government immigration websites.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations:
      "English-speaking; English-proficiency evidence is generally required for international admission.",
    lifestyleSetting:
      "Extremely varied — from large cities to small college towns, across a wide range of campus styles.",
    planningConsiderations:
      "Institution types vary widely, so allow extra time to research and compare universities before applying.",
    seo: {
      metaTitle: "Study in the United States",
      metaDescription:
        "General guidance on studying in the United States: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "de",
    slug: "germany",
    name: "Germany",
    shortName: "Germany",
    region: "Europe",
    flagLabel: "DE",
    visualIcon: "Cog",
    heroTitle: "Study in Germany",
    heroDescription:
      "A strong public university system with a particular reputation in technical and research-focused fields.",
    overview:
      "Germany's higher education system is largely public, with many universities well regarded for technical, engineering and research-focused programmes. Programme language (German, English, or both), entry requirements and application timelines vary by university and course, so checking directly with each institution is important.",
    highlights: [
      {
        id: "de-technical",
        title: "Strong technical and engineering reputation",
        description:
          "A number of German universities and technical institutions are well known internationally in these fields.",
      },
      {
        id: "de-public-system",
        title: "Largely public university system",
        description:
          "Most German universities are public institutions, which can affect their fee and funding structure.",
      },
      {
        id: "de-english-programmes",
        title: "Growing number of English-taught programmes",
        description:
          "Many postgraduate and some undergraduate programmes are offered fully or partly in English — confirm the language of instruction for each course.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate"],
    popularSubjectAreas: [
      "Engineering",
      "Computing and Technology",
      "Business and Management",
      "Social Sciences",
    ],
    applicationProcess:
      "Applications are generally made directly to universities or via a centralised portal used by many German institutions. Requirements, including language proficiency (German and/or English), vary by course — confirm directly with each university.",
    typicalIntakes: [
      "Winter semester (September/October)",
      "Summer semester (March/April)",
    ],
    generalCostGuidance:
      "Public universities in Germany often have low or no tuition fees for many programmes, though this can vary by state, institution and programme, and additional semester contributions are common. Confirm current fee arrangements directly with each university.",
    scholarshipGuidance:
      "A range of scholarship and funding programmes exist for international students in Germany, offered by universities, government-affiliated organisations and other bodies, with criteria varying by programme and applicant background. Check current, official scholarship information directly rather than assuming eligibility.",
    visaGuidance:
      "Non-EU/EEA students generally require a student visa or residence permit to study in Germany. Requirements, supporting documents (including proof of financial resources), fees and processing times are set by German federal and local authorities and can change. Always confirm current requirements on official German government and embassy/consulate websites before making plans.",
    workAndLifestyleNote:
      "International students in Germany are generally permitted limited part-time work during study, subject to conditions set by German authorities that can change. Confirm current work conditions and any post-study options directly with official German government sources — Janan does not determine or guarantee work rights.",
    faqItems: [
      {
        id: "de-faq-language",
        question: "Do I need to speak German to study in Germany?",
        answer:
          "It depends on the programme — many postgraduate and some undergraduate courses are taught in English, while others require German proficiency. Confirm the language of instruction for each course you're considering.",
      },
      {
        id: "de-faq-fees",
        question:
          "Is it true that German universities don't charge tuition fees?",
        answer:
          "Many public universities have low or no tuition fees for many programmes, but this varies by state, institution and programme, and semester contributions are common. Confirm current fee arrangements with each university.",
      },
      {
        id: "de-faq-funds",
        question: "Do I need to show proof of funds for a German student visa?",
        answer:
          "Non-EU/EEA applicants are generally asked to demonstrate sufficient financial resources as part of the visa process. Exact requirements are set by German authorities and can change — confirm current requirements on official government sources.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations:
      "German and English; language of instruction varies by programme — confirm before applying.",
    lifestyleSetting:
      "Mix of major cities and mid-sized university towns across the country.",
    planningConsiderations:
      "Confirming language of instruction and semester dates early helps avoid mismatched expectations.",
    seo: {
      metaTitle: "Study in Germany",
      metaDescription:
        "General guidance on studying in Germany: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
  {
    id: "ie",
    slug: "ireland",
    name: "Ireland",
    shortName: "Ireland",
    region: "Europe",
    flagLabel: "IE",
    visualIcon: "Leaf",
    heroTitle: "Study in Ireland",
    heroDescription:
      "A growing destination for international students, with an English-speaking higher education system.",
    overview:
      "Ireland has become an increasingly popular destination for international students, offering an English-speaking higher education system with universities and colleges across the country. Programme structures and entry requirements vary by institution, so comparing options directly is recommended.",
    highlights: [
      {
        id: "ie-english-speaking",
        title: "English-speaking system",
        description:
          "Programmes are generally taught in English, which some students find eases the transition.",
      },
      {
        id: "ie-growing-sector",
        title: "Growing international student community",
        description:
          "Ireland's international student population has been growing, with increasing support services in many institutions.",
      },
      {
        id: "ie-compact-country",
        title: "Compact geography",
        description:
          "A relatively small country, which some students find makes travel between cities straightforward.",
      },
    ],
    studyLevels: ["Undergraduate", "Postgraduate"],
    popularSubjectAreas: [
      "Business and Management",
      "Computing and Technology",
      "Health and Life Sciences",
      "Social Sciences",
    ],
    applicationProcess:
      "Undergraduate applications are often made through Ireland's centralised application system, while postgraduate applications are generally made directly to each institution. Confirm the correct route for your chosen course.",
    typicalIntakes: ["September", "January"],
    generalCostGuidance:
      "Costs vary by city and institution, with Dublin generally more expensive than other regions. Check each institution's own current published estimates.",
    scholarshipGuidance:
      "Some Irish institutions and government-affiliated bodies offer scholarships or funding support for international students, with criteria varying by institution and programme. Check current, official scholarship information directly with your shortlisted institutions.",
    visaGuidance:
      "Non-EU/EEA students generally require an appropriate immigration permission to study in Ireland. Requirements, supporting documents, fees and processing times are set by Irish immigration authorities and can change. Always confirm current requirements on official Irish government immigration websites before making plans.",
    workAndLifestyleNote:
      "International students in Ireland are generally permitted limited part-time work during study, subject to conditions set by Irish authorities that can change. Confirm current work conditions and any post-study options directly with official Irish government sources — Janan does not determine or guarantee work rights.",
    faqItems: [
      {
        id: "ie-faq-size",
        question:
          "Is Ireland a good option if I want a smaller student experience?",
        answer:
          "Ireland offers a range of institution sizes, from large universities in Dublin to smaller colleges elsewhere. Compare options directly based on what environment suits you.",
      },
      {
        id: "ie-faq-cost",
        question: "Is Dublin expensive to study in?",
        answer:
          "Dublin is generally more expensive than other Irish cities for accommodation and living costs. Consider this when comparing institutions and locations.",
      },
      {
        id: "ie-faq-post-study",
        question:
          "Can international graduates stay in Ireland to work after their studies?",
        answer:
          "Post-study options exist but are determined and updated by Irish immigration authorities, not by Janan. Confirm current rules on official Irish government immigration websites.",
      },
    ],
    relatedServices: [
      "visa-guidance",
      "accommodation-support",
      "pre-departure-guidance",
    ],
    languageConsiderations: "English-speaking throughout.",
    lifestyleSetting:
      "Compact country; mix of the Dublin capital region and smaller cities and towns.",
    planningConsiderations:
      "Dublin accommodation can be competitive — planning housing early is advisable.",
    seo: {
      metaTitle: "Study in Ireland",
      metaDescription:
        "General guidance on studying in Ireland: study levels, application process, scholarships, visa guidance and student life considerations.",
    },
    lastReviewed: "2026-09-13",
    contentStatus: "published",
    isFeatured: true,
  },
];
