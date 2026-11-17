import type { Level, Programme } from "@/types/institution";

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
