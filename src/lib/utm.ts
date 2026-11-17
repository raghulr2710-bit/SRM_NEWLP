"use client";

import { UTM_KEYS, type UtmParams } from "./enquiry";

const STORAGE_KEY = "srm_lp_utm";

/**
 * Captures UTM / click-id parameters on first landing and keeps them for the
 * session (first-touch), so they survive in-page navigation and are attached
 * to the enquiry payload. Values are trimmed and length-limited.
 */
export function captureUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v.trim().slice(0, 200);
  }
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as UtmParams;
    if (Object.keys(fromUrl).length > 0 && Object.keys(stored).length === 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return Object.keys(stored).length > 0 ? stored : fromUrl;
  } catch {
    return fromUrl;
  }
}
