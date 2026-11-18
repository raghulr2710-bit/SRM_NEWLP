import type { ComponentType } from "react";
import type { Rgb } from "../HalfGlobe";
import type { LiveData } from "../types";

/** Props every section component receives. Sections render their own <section id="…"> (ids drive the tab bar). */
export interface SectionProps {
  live: LiveData;
  /** Globe settings for the collaborations section (optional). */
  globe?: { home: [number, number]; partners: boolean; base: Rgb; marker: Rgb; glow: Rgb };
}

export type SectionKey =
  | "promo"
  | "why"
  | "stats1"
  | "placements"
  | "recruiters"
  | "collaborations"
  | "rankings"
  | "stats2"
  | "highlights"
  | "testimonials"
  | "campus"
  | "admission"
  | "faqs"
  | "contact"
  | "cta";

/** A campus's section designs; anything left out falls back to the default design. */
export type SectionSet = Partial<Record<SectionKey, ComponentType<SectionProps>>>;
