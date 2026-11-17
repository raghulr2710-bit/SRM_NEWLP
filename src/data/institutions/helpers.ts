import type { ImageAsset, InstitutionKey, Level, Programme } from "@/types/institution";

/** Pixel sizes of the generated assets in public/img/<key>/ai/. */
const AI_SIZE: Record<string, [number, number]> = {
  hero: [2000, 1131],
  industry: [1400, 792],
  cultural: [1400, 1738],
};

/**
 * AI-generated illustrative image (public/img/<key>/ai/<name>.webp).
 * Not a photograph of the institution: rendered with an "Illustrative" tag
 * and tracked for replacement in docs/CONTENT-AUDIT-AND-CONFIRMATIONS.md.
 */
export function aiImage(key: InstitutionKey, name: string, alt: string, objectPosition?: string): ImageAsset {
  const [width, height] = AI_SIZE[name] ?? [1400, 1050];
  return { src: `/img/${key}/ai/${name}.webp`, alt, width, height, illustrative: true, objectPosition };
}

interface Defaults {
  degree: string;
  level: Level;
  department: string;
  duration?: string;
  eligibility?: string;
  notes?: string;
  verified?: boolean;
}

/**
 * Builds a list of programmes sharing degree / department / eligibility.
 * Each entry is either a plain name or [name, overrides].
 */
export function group(
  defaults: Defaults,
  entries: (string | [string, Partial<Programme>])[],
): Programme[] {
  return entries.map((entry) => {
    const [name, overrides] = typeof entry === "string" ? [entry, {}] : entry;
    return {
      verified: true,
      ...defaults,
      name,
      ...overrides,
    } as Programme;
  });
}

export const PENDING_SCHOLARSHIP = {
  eligibility: "Awaiting the official scholarship policy for 2027–28.",
  benefits: "To be published by the admissions office. No amounts are shown until verified.",
  process: "Ask an admission counsellor for the current process.",
  terms: "Subject to the institution's official scholarship terms.",
  verified: false,
} as const;
