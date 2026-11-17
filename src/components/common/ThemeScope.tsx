import type { CSSProperties, ReactNode } from "react";
import type { ThemeTokens } from "@/types/institution";

/** Applies an institution's design tokens + fonts to everything inside it. */
export function ThemeScope({
  theme,
  displayFont,
  bodyFont,
  fontClassName,
  children,
}: {
  theme: ThemeTokens;
  displayFont: string;
  bodyFont: string;
  fontClassName: string;
  children: ReactNode;
}) {
  const style = {
    "--brand": theme.brand,
    "--brand-ink": theme.brandInk,
    "--brand-soft": theme.brandSoft,
    "--accent": theme.accent,
    "--accent-soft": theme.accentSoft,
    "--accent-text": theme.accentText,
    "--accent-on-dark": theme.accentOnDark,
    "--on-brand": theme.onBrand,
    "--on-accent": theme.onAccent,
    "--surface": theme.surface,
    "--surface-alt": theme.surfaceAlt,
    "--ink": theme.ink,
    "--muted": theme.muted,
    "--line": theme.line,
    "--radius-card": theme.radiusCard,
    "--font-display-family": displayFont,
    "--font-body-family": bodyFont,
    background: theme.surface,
    color: theme.ink,
    fontFamily: bodyFont,
  } as CSSProperties;

  return (
    <div className={fontClassName} style={style}>
      {children}
    </div>
  );
}
