import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Award, type LucideIcon } from "lucide-react";
import type { Stat } from "@/types/institution";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import type { LiveImg } from "./types";

/** Shared building blocks for live landing-page sections (server-safe). */
export type Img = LiveImg | null;

export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** "5700+" → { value: 5700, suffix: "+" }; non-numeric values (e.g. "A++") return null. */
export function toStat(v: string, label: string): Stat | null {
  const m = v.trim().match(/^(#?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1] || undefined, value: Number(m[2].replace(/,/g, "")), suffix: m[3] || undefined, label };
}
export function Value({ v, label }: { v: string; label: string }) {
  const s = toStat(v, label);
  return s ? <Counter stat={s} /> : <>{v}</>;
}

export function Pic({ img, className = "", sizes, contain = false, priority = false }: { img: Img | undefined; className?: string; sizes: string; contain?: boolean; priority?: boolean }) {
  if (!img) return null;
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} preload={priority} className={`${contain ? "object-contain" : "object-cover"} ${className}`} />;
}

export function Heading({ children, intro, eyebrow, Icon, light = false, wide = false, align = "center" }: { children: ReactNode; intro?: ReactNode; eyebrow?: string; Icon?: LucideIcon; light?: boolean; wide?: boolean; align?: "center" | "left" }) {
  return (
    <Reveal className={`mb-8 lg:mb-10 ${align === "left" ? "text-left" : "mx-auto text-center"} ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 inline-flex items-center gap-2 ${light ? "text-white/75" : "text-accent-ink"}`}>
          {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
          {eyebrow}
        </p>
      )}
      <h2 className={`type-h2 font-display text-balance ${light ? "text-white" : "text-ink"}`}>{children}</h2>
      {intro && <div className={`type-lead mx-auto mt-4 ${wide ? "max-w-4xl text-balance" : "max-w-2xl"} ${light ? "text-white/75" : "text-muted"}`}>{intro}</div>}
    </Reveal>
  );
}

export function PromoHeading({ text }: { text: string }) {
  const i = text.search(/#1\b|No\.\s?1\b/);
  return (
    <h2 className="type-h2 font-display text-balance text-ink">
      {i < 0 ? text : (
        <>
          {text.slice(0, i)}
          <span className="text-brand">{text.slice(i)}</span>
        </>
      )}
    </h2>
  );
}

export function StatBand({ items, icons }: { items: { value: string; label: string }[]; icons: LucideIcon[] }) {
  return (
    <section aria-label="Key figures" className="on-dark bg-gradient-to-br from-brand to-[var(--brand-deep)] text-on-brand">
      <dl className="container-x grid grid-cols-1 divide-y divide-white/10 py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-12 lg:py-14">
        {items.map((s, i) => {
          const Icon = icons[i] ?? Award;
          return (
            <Reveal key={s.label} delay={0.08 * i} className="flex items-center gap-4 py-4 sm:flex-col sm:gap-0 sm:py-0 sm:text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 sm:mb-4">
                <Icon aria-hidden="true" className="h-5 w-5 text-[var(--hl)]" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/70 sm:mt-3">{s.label}</dt>
                <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.75rem] lg:text-5xl [&_[aria-hidden]>span]:text-[var(--hl)]">
                  <Value v={s.value} label={s.label} />
                </dd>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

/**
 * Student cut-out standing on a CTA band, rising above its top edge (desktop only).
 * The band needs a "container-x relative" wrapper; circle colours are passed in.
 */
export function CtaStudent({ src, ratio, circle, ring, edge = false }: { src: string; ratio: string; circle: string; ring: string; /** stand at the right edge (no button beside it) */ edge?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute bottom-0 hidden h-[calc(100%+4.5rem)] lg:block ${edge ? "right-8 xl:right-16" : "right-[15rem] xl:right-[17rem]"}`} style={{ aspectRatio: ratio }}>
      <span className="absolute -inset-x-[30%] bottom-0 top-[-10%] overflow-hidden">
        <span className={`absolute bottom-[-36%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full ${circle}`} />
        <span className={`absolute bottom-[-30%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full border-2 border-dashed ${ring}`} />
      </span>
      <Image src={src} alt="" fill sizes="220px" className="object-contain object-bottom" />
    </div>
  );
}

export function CtaBand({ text, student }: { text: string; student?: { src: string; ratio: string } }) {
  return (
    <section className="relative bg-[var(--hl)] text-brand-ink">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[2.5rem] border-white/30" />
        <div className="absolute -bottom-24 left-[30%] h-48 w-48 rounded-full border-[1.75rem] border-brand/10" />
      </div>
      <div className="container-x relative">
        {student && <CtaStudent src={student.src} ratio={student.ratio} circle="bg-brand" ring="border-brand/35" />}
        <Reveal className="relative flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-14">
          <h2 className={`type-h2 font-display ${student ? "lg:max-w-[52%]" : ""}`}>{text}</h2>
          <a
            href="#top"
            className="group relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--btn-radius,var(--radius-card))] bg-brand px-6 text-[0.95rem] font-semibold text-white shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--brand)_90%,transparent)] transition-[background-color,transform] duration-200 hover:bg-brand-ink active:translate-y-px"
          >
            Register Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
