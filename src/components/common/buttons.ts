/** Shared button class recipes. Colours come from the active institution theme. */
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 rounded-[var(--btn-radius,var(--radius-card))] cursor-pointer";

export const btn = {
  accent: `${base} bg-accent text-on-accent hover:brightness-110 shadow-[0_8px_24px_-12px_var(--accent)]`,
  brand: `${base} bg-brand text-on-brand hover:bg-brand-ink`,
  outline: `${base} border border-current text-ink hover:bg-ink hover:text-surface`,
  outlineLight: `${base} border border-white/50 text-white hover:bg-white hover:text-brand-ink`,
  ghostLight: `${base} bg-white/10 text-white backdrop-blur hover:bg-white/20`,
  white: `${base} bg-white text-brand-ink hover:bg-brand-soft`,
  link: "inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline cursor-pointer",
};
