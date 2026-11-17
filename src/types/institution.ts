/**
 * Institution content model.
 *
 * Content rules (from the brief):
 *  - Only verified facts go into the data files.
 *  - Anything unverified is represented by a `Pending` value (rendered as a
 *    clearly labelled placeholder) or `verified: false` (rendered with a
 *    "details to be confirmed" tag). Never invent numbers, names or claims.
 *  - `source` fields record where a fact came from, for client sign-off.
 */

export type InstitutionKey = "rmp" | "trichy" | "eec" | "trp";

export type Level = "UG" | "PG" | "Diploma" | "Research";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  objectPosition?: string;
  /**
   * AI-generated illustrative visual – not a photograph of this institution,
   * its students or facilities. Rendered with an "Illustrative" tag and listed
   * in docs/CONTENT-AUDIT-AND-CONFIRMATIONS.md for replacement with approved photography.
   */
  illustrative?: boolean;
}

/** A clearly labelled gap where an approved asset is still required. */
export interface PendingAsset {
  pending: string;
}

export type Media = ImageAsset | PendingAsset;

export const isPending = (m: unknown): m is PendingAsset =>
  typeof m === "object" && m !== null && "pending" in m;

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  note?: string;
}

export interface Programme {
  name: string;
  degree: string;
  level: Level;
  department: string;
  duration?: string;
  eligibility?: string;
  /** Approved intake. Leave undefined unless verified. */
  intake?: number;
  notes?: string;
  verified: boolean;
}

export interface ThemeTokens {
  brand: string;
  brandInk: string;
  brandSoft: string;
  accent: string;
  accentSoft: string;
  /** Accent for text on light backgrounds (≥ 4.5:1). */
  accentText: string;
  /** Accent for text on dark backgrounds (≥ 4.5:1). */
  accentOnDark: string;
  onBrand: string;
  onAccent: string;
  surface: string;
  surfaceAlt: string;
  ink: string;
  muted: string;
  line: string;
  radiusCard: string;
}

export type SectionKey =
  | "enquiry"
  | "why"
  | "programmes"
  | "placements"
  | "industry"
  | "infrastructure"
  | "academics"
  | "scholarships"
  | "testimonials"
  | "campusLife"
  | "process"
  | "faqs"
  | "contact";

export interface Testimonial {
  name: string;
  programme: string;
  year?: string;
  role?: string;
  achievement?: string;
  /** Verbatim, approved quote only. */
  quote?: string;
  photo?: Media;
  videoUrl?: string;
}

export interface Accreditation {
  title: string;
  body: string;
  badge?: ImageAsset;
  source: string;
  verified: boolean;
}

export interface Institution {
  key: InstitutionKey;
  route: string;
  name: string;
  shortName: string;
  legalLine: string;
  city: string;
  logo: ImageAsset;
  /** True when the official logo artwork is designed for a dark background. */
  logoOnDark?: boolean;
  /** Applicant portal used by the "Apply Now" CTA (official existing portal). */
  applyUrl: string;
  brochureUrl: string | null;
  theme: ThemeTokens;
  layout: {
    hero: "editorial" | "geometric" | "heritage" | "poster";
    why: "list" | "bento";
    placements: "ledger" | "board";
    programmes: "grid" | "rows";
    order: SectionKey[];
  };
  seo: { title: string; description: string; keywords: string[] };

  hero: {
    eyebrow: string;
    headline: string[];
    body: string;
    /** Landscape photograph used across the split hero (desktop) / below the CTAs (mobile). */
    image: Media;
    secondaryImage?: Media;
    badges?: ImageAsset[];
    proof?: Stat[];
    proofNote?: string;
  };

  enquiry: {
    heading: string;
    body: string;
    /** Options for "Institution / Faculty" selection, when applicable. */
    faculties?: { label: string; options: string[] };
    levels: Level[];
    consent: string;
    nextSteps: string[];
  };

  why: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
    image?: Media;
    source: string;
  };

  programmes: {
    heading: string;
    intro: string;
    items: Programme[];
    footnote?: string;
  };

  placements: {
    heading: string;
    intro: string;
    stats: Stat[];
    scopeNote: string;
    records: { name: string; programme?: string; company?: string; package: string; batch?: string }[];
    recordsNote?: string;
    recruiters: { names: string[]; note: string } | PendingAsset;
    careerDevelopment: { title: string; body: string }[];
    image?: Media;
  };

  industry: {
    heading: string;
    intro: string;
    image?: Media;
    highlights: { title: string; body: string; source: string }[];
    timeline: { phase: string; title: string; body: string; pending?: boolean }[];
  };

  infrastructure: {
    heading: string;
    intro: string;
    items: { title: string; description: string; media: Media }[];
  };

  academics: {
    heading: string;
    intro: string;
    accreditations: Accreditation[];
    facts?: Stat[];
    factsNote?: string;
    image?: Media;
    caution?: string;
  };

  scholarships: {
    heading: string;
    intro: string;
    items: {
      category: string;
      eligibility: string;
      benefits: string;
      process: string;
      terms: string;
      verified: boolean;
    }[];
  };

  testimonials: {
    heading: string;
    intro: string;
    items: Testimonial[];
    pendingSlots?: number;
    note?: string;
  };

  campusLife: {
    heading: string;
    intro: string;
    items: { title: string; body?: string; media: Media }[];
  };

  process: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
    indicative: boolean;
    documents?: string[];
    payment?: string;
  };

  faqs: { q: string; a: string }[];

  contact: {
    address: string;
    addressVerified: boolean;
    phones: { label: string; display: string; tel: string }[];
    emails: string[];
    /** E.164 digits without "+", e.g. 919xxxxxxxxx. null = not yet verified. */
    whatsapp: string | null;
    mapQuery: string;
  };

  finalCta: { headline: string; body: string; image?: Media };

  footer: {
    tagline: string;
    social: { network: "facebook" | "instagram" | "linkedin" | "youtube" | "x"; url: string }[];
    privacyUrl: string | null;
    termsUrl: string | null;
  };
}
