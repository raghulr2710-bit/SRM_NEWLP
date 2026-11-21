/**
 * Content contract for a "live" landing page (src/data/live/<key>.json).
 * Text comes verbatim from the institution's live registration site; optional
 * sections are simply omitted (the template hides them).
 */

export type LiveImg = { src: string; alt: string; width: number; height: number };

export interface LiveStat {
  value: string; // "5700+", "A++", "55 LPA"
  label: string;
}

export interface LiveData {
  sourceUrl: string;
  meta: {
    /** Short institution name for eyebrows / aria labels, e.g. "SRM IST, Ramapuram". */
    shortName: string;
    /** Tab + header label for the "why" section, e.g. "Why SRM". */
    whyLabel: string;
    /** Title of the promo video, e.g. "SRM IST Ramapuram Campus". */
    videoTitle?: string;
  };
  hero: {
    /** Exactly two lines; line 2 renders in the brand colour. */
    headline: [string, string];
    /** Sub-line under the headline, e.g. "Registrations Open for 2027". */
    button: string;
    /** Optional hero paragraph shown under the headline (replaces the `button` sub-line). */
    text?: string;
    /** Pill above the headline and form-card title, e.g. "Admissions Open 2027". */
    formHeading: string;
  };
  logo: LiveImg;
  rankings?: {
    heading: string;
    items: { title?: string; text: string; badge: LiveImg | null; body: string }[]; // body = issuing body, e.g. "NAAC"
  };
  /** poster = optional local HD thumbnail (when YouTube has no HD one) */
  promo?: { heading: string; text: string; videoUrl?: string; poster?: string };
  /** Exactly 3 figures each for the two blue bands (placements / academics). */
  stats1?: LiveStat[];
  stats2?: LiveStat[];
  /** Milestone row (auto-looping). icon = lucide name from MILESTONE_ICONS in LiveMotion.tsx. */
  facts?: (LiveStat & { icon?: string })[];
  /** Highlight banners rebuilt as text (only if the site has such banners). */
  highlightSlides?: {
    parts: { text: string; big?: boolean; accent?: boolean; value?: number; suffix?: string }[];
    image: LiveImg; // transparent cut-out preferred
    logo?: boolean; // badge/logo image: rendered smaller, centred
  }[];
  programmes: {
    heading: string;
    ugEligibility?: unknown; // see UgEligibility in LiveCourses.tsx (optional)
    flabsUgNote?: string;
    lateralEntry?: { eligibility: string; programmes: string[]; degreeLabel?: string };
    items: {
      faculty: string; // grouping in the sidebar, e.g. "ENGINEERING PROGRAMME"
      section: string | null; // sub-heading inside a faculty, e.g. "UNDERGRADUATE COURSES (DURATION 4 YEARS)"
      title: string; // "B.Tech - Civil Engineering"
      eligibility: string | null;
      lateralEntry: boolean;
      partTime: boolean;
      level: "UG" | "PG" | "Diploma" | "PhD" | string;
      /** course profile from a client course guide: overview, placement roles, higher-study options */
      profile?: { overview: string; careers: string[]; higherStudies: string[] };
      hideActions?: boolean;
    }[];
  };
  /** heading/intro default to "Steps to follow"; icons = names from STEP_ICON_SET in LiveMotion.tsx */
  steps?: { items: string[]; heading?: string; intro?: string; icons?: string[] };
  madeSimple?: { heading: string; subheading: string; items: string[] }; // "Title – detail"
  why?: { heading: string; intro?: string; items: { title: string; image: LiveImg | null }[] };
  collaborations?: { heading: string; items: { name: string; logo: LiveImg | null }[] };
  placements?: {
    heading: string;
    cards?: { title: string; text: string }[];
    /** Faculty-level placement figures (e.g. FLABS), shown as a panel under the cards. */
    facultyStats?: { heading: string; items: { value: string; label: string }[] };
    profiles?: {
      name: string;
      batch?: string;
      department?: string;
      ctc?: string;
      company?: string;
      photo: LiveImg | null;
      companyLogo?: LiveImg | null;
    }[];
  };
  recruiters?: { heading: string; logos: { name: string; logo: LiveImg | null }[] };
  ctaHeading: string;
  /** Optional student cut-out shown on the closing CTA band (ratio = "w / h"). */
  ctaStudent?: { src: string; ratio: string };
  /** videos = extra campus-life video links (YouTube plays inline; others open in a new tab). */
  campus?: { heading: string; items: (LiveImg & { title: string; tag?: string })[]; videos?: { url: string; title: string; cover?: string }[] };
  testimonials?: {
    heading: string;
    /** Video testimonials (YouTube) and/or written quotes with a photo. line2 = role/company, line3 = batch/college. */
    /** package = salary line for alumni cards (shown when there is no quote). */
    items: { name: string; line2: string; line3: string; videoUrl?: string; quote?: string; package?: string; photo?: LiveImg | null }[];
    /** extra student video links shown as a grid under the stories */
    videos?: { url: string; title: string; cover?: string }[];
  };
  faqs?: { heading: string; items: { q: string; a: string }[] };
  contact: {
    address: string;
    phones: { display: string; href: string }[];
    emails: string[];
    map?: LiveImg | null;
    landmarks?: string[];
    footer: string;
  };
  /** Anything written by us (not on the live site) – listed for review, never rendered. */
  _notes?: string[];
}
