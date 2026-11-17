import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ShieldCheck } from "lucide-react";
import type { Institution } from "@/types/institution";
import { ApplyButton } from "@/components/common/Cta";
import { Counter } from "@/components/common/Counter";
import { MediaFill } from "@/components/common/Media";
import { btn } from "@/components/common/buttons";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ENQUIRY_ANCHOR } from "@/components/common/EnquiryContext";
import { toFormProps } from "@/lib/form-props";

/**
 * Section 01 – Split hero.
 *
 * Desktop: copy, CTAs and three verified highlights on the left (≈60%), the
 * enquiry form on the right (≈40%), with a landscape photograph worked into
 * the composition behind them. Mobile: announcement → headline → body → CTAs
 * → highlights → photograph → full-width form (a re-flow, not a shrink).
 *
 * One shared structure, four identities (layout.hero):
 *  - editorial (Ramapuram):   light, serif, photo fades in from the right edge
 *  - geometric (Trichy):      dark navy, technical grid, full-bleed photo, gold diamond
 *  - heritage  (Easwari):     warm cream, photo in a sweeping curved panel
 *  - poster    (SRM TRP):     dark, bold uppercase, diagonal photo cut and accent slab
 */

type Variant = Institution["layout"]["hero"];

const STYLE: Record<
  Variant,
  {
    section: string;
    dark: boolean;
    image: string;
    imageInner?: string;
    headline: string;
    lastLine: string;
  }
> = {
  editorial: {
    section: "bg-surface",
    dark: false,
    image: "lg:inset-y-0 lg:right-0 lg:w-[64%]",
    headline: "font-display font-medium text-ink",
    lastLine: "text-accent-ink italic",
  },
  geometric: {
    section: "bg-brand text-white",
    dark: true,
    image: "lg:inset-0",
    headline: "font-display font-bold text-white",
    lastLine: "text-accent-ink",
  },
  heritage: {
    section: "bg-surface-alt",
    dark: false,
    image: "lg:right-0 lg:top-0 lg:bottom-0 lg:w-[54%] lg:rounded-bl-[14rem] xl:rounded-bl-[18rem]",
    headline: "font-display text-brand-ink",
    lastLine: "text-brand italic",
  },
  poster: {
    section: "bg-brand-ink text-white",
    dark: true,
    image: "lg:inset-y-0 lg:right-0 lg:w-[70%]",
    imageInner: "lg:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]",
    headline: "font-display font-black uppercase tracking-[-0.01em] text-white",
    lastLine: "text-accent-ink",
  },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Highlights({ inst, dark }: { inst: Institution; dark: boolean }) {
  if (!inst.hero.proof?.length) return null;
  return (
    <div className="hero-rise mt-8 lg:mt-9" style={d(0.32)}>
      <dl className={`grid max-w-xl grid-cols-3 divide-x ${dark ? "divide-white/15" : "divide-line"}`}>
        {inst.hero.proof.slice(0, 3).map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col-reverse px-3 first:pl-0 sm:px-5">
            <dt className={`mt-1 text-xs leading-snug sm:text-sm ${dark ? "text-white/70" : "text-muted"}`}>{s.label}</dt>
            <dd className={`font-display text-2xl leading-none font-semibold whitespace-nowrap sm:text-[2rem] ${dark ? "text-white" : "text-ink"}`}>
              <Counter stat={s} />
            </dd>
          </div>
        ))}
      </dl>
      {inst.hero.proofNote && (
        <p className={`mt-3 max-w-xl text-xs leading-snug ${dark ? "text-white/65" : "text-muted"}`}>* {inst.hero.proofNote}</p>
      )}
    </div>
  );
}

function Decor({ variant }: { variant: Variant }) {
  switch (variant) {
    case "editorial":
      return (
        <>
          {/* light veil so the copy sits on paper while the photo breathes on the right */}
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[64%] bg-gradient-to-r from-surface via-surface/70 to-transparent lg:block" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-surface/60 to-transparent lg:block" />
        </>
      );
    case "geometric":
      return (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-brand via-brand/92 to-brand/35 lg:block" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand lg:hidden" />
          <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full opacity-[0.12]">
            <defs>
              <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M56 0H0v56" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 hidden h-[26rem] w-[26rem] rotate-45 border-[2rem] border-accent/80 lg:block" />
        </>
      );
    case "heritage":
      return (
        <div aria-hidden="true" className="absolute right-[3%] top-10 -z-10 hidden h-[30rem] w-[30rem] rounded-full border border-brand/15 lg:block" />
      );
    case "poster":
      return (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-brand-ink via-brand-ink/55 to-brand-ink/10 lg:block" />
          <div aria-hidden="true" className="absolute bottom-0 left-[38%] -z-10 hidden h-3 w-[40%] -skew-x-[30deg] bg-accent lg:block" />
          <div aria-hidden="true" className="absolute -left-10 top-0 -z-10 h-full w-24 -skew-x-[18deg] bg-accent/90 max-lg:hidden" />
        </>
      );
  }
}

export function Hero({ inst }: { inst: Institution }) {
  const v = inst.layout.hero;
  const s = STYLE[v];
  const [first, ...rest] = inst.hero.headline;

  return (
    <section id="top" aria-label="Introduction" className={`relative isolate overflow-hidden ${s.section}`}>
      <Decor variant={v} />

      <div className="container-x grid items-center gap-10 pb-12 pt-8 sm:pt-10 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12 lg:py-10 xl:gap-20">
        {/* ---------- left: message ---------- */}
        <div className={s.dark ? "on-dark" : undefined}>
          <p
            className={`hero-rise eyebrow mb-5 inline-flex items-center gap-2.5 ${
              v === "geometric"
                ? "rounded-full bg-accent px-4 py-2 text-on-accent"
                : v === "poster"
                  ? "bg-accent px-3 py-1.5 text-on-accent"
                  : v === "heritage"
                    ? "text-brand"
                    : "text-accent-ink"
            }`}
            style={d(0)}
          >
            {v === "editorial" && <span aria-hidden="true" className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />}
            {v === "heritage" && <span aria-hidden="true" className="h-px w-10 bg-brand" />}
            Admissions Open 2027–28
          </p>

          <h1 className={`hero-rise type-hero text-balance ${s.headline}`} style={d(0.08)}>
            <span className="block">{first}</span>
            {rest.map((l) => (
              <span key={l} className={`block ${s.lastLine}`}>
                {l}
              </span>
            ))}
          </h1>

          <p className={`hero-rise type-lead mt-5 max-w-[34rem] ${s.dark ? "text-white/80" : "text-muted"}`} style={d(0.16)}>
            {inst.hero.body}
          </p>

          <div className="hero-rise mt-7 flex flex-wrap items-center gap-3" style={d(0.24)}>
            <ApplyButton href={inst.applyUrl} location="hero" className={`${btn.accent} transition-transform hover:-translate-y-0.5`} />
            <a href="#programmes" className={`${s.dark ? btn.outlineLight : btn.outline} group`}>
              Explore Programmes
              <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <Highlights inst={inst} dark={s.dark} />

          {/* One image element: an inline photo on mobile/tablet, the composition backdrop on desktop. */}
          <div
            className={`hero-uncover relative mt-8 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/9] lg:absolute lg:-z-20 lg:mt-0 lg:aspect-auto lg:rounded-none ${s.image}`}
          >
            <div className={`absolute inset-0 ${s.imageInner ?? ""}`}>
            <MediaFill
              media={inst.hero.image}
              preload
              sizes="(min-width:1024px) 70vw, 100vw"
              tagClassName={v === "poster" || v === "editorial" ? "right-3 bottom-3 lg:right-5 lg:bottom-5" : "left-3 bottom-3 lg:left-auto lg:right-5 lg:bottom-5"}
            />
            </div>
          </div>
        </div>

        {/* ---------- right: enquiry ---------- */}
        <div
          id={ENQUIRY_ANCHOR}
          className={`hero-rise scroll-mt-24 rounded-[var(--radius-card)] border bg-white p-5 text-ink shadow-[0_40px_90px_-40px_rgba(8,15,40,0.55)] sm:p-7 lg:p-7 ${
            s.dark ? "border-white/20" : "border-line"
          } ${v === "heritage" ? "border-t-4 border-t-brand" : ""} ${v === "poster" ? "border-l-4 border-l-accent" : ""}`}
          style={d(0.2)}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-[1.375rem] leading-tight text-ink sm:text-2xl">Start Your Admission Journey</h2>
              <p className="mt-1 text-sm text-muted">A counsellor from {inst.shortName} will call you back.</p>
            </div>
            <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
          </div>
          <EnquiryForm {...toFormProps(inst)} variant="hero" />
        </div>
      </div>

      {inst.hero.badges && (
        <div className={`relative border-t ${s.dark ? "on-dark border-white/10 bg-brand-ink/80 backdrop-blur" : "border-line bg-white/85 backdrop-blur"}`}>
          <div className="container-x flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className={`eyebrow ${s.dark ? "text-white/70" : "text-muted"}`}>{v === "poster" ? inst.legalLine : "Accredited & ranked"}</p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Accreditations, approvals and rankings">
              {inst.hero.badges.map((b) => (
                <li key={b.src} className={s.dark ? "rounded-full bg-white p-1.5" : ""}>
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    className={`w-auto object-contain ${s.dark ? "h-9" : "h-9"}`}
                    sizes="100px"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
