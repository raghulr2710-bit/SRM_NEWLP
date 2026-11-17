import Image from "next/image";
import { ArrowDown, PhoneCall } from "lucide-react";
import { isPending, type Institution } from "@/types/institution";
import { ApplyButton, EnquireButton } from "@/components/common/Cta";
import { Counter } from "@/components/common/Counter";
import { MediaFill, PendingBox } from "@/components/common/Media";
import { btn } from "@/components/common/buttons";

/* ------------------------------------------------------------------------ */
/* Shared bits                                                              */
/* ------------------------------------------------------------------------ */

function HeroCtas({ inst, tone }: { inst: Institution; tone: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ApplyButton href={inst.applyUrl} location="hero" className={btn.accent} />
      <a href="#programmes" className={tone === "dark" ? btn.outlineLight : btn.outline}>
        Explore Programmes
        <ArrowDown aria-hidden="true" className="h-4 w-4" />
      </a>
      <EnquireButton
        intent="counselling"
        location="hero"
        className={`inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold underline-offset-4 hover:underline ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        <PhoneCall aria-hidden="true" className="h-4 w-4" />
        Talk to a counsellor
      </EnquireButton>
    </div>
  );
}

function ProofStrip({ inst, tone }: { inst: Institution; tone: "light" | "dark" }) {
  if (!inst.hero.proof?.length) return null;
  const dark = tone === "dark";
  return (
    <div>
      <dl className={`grid grid-cols-3 divide-x ${dark ? "divide-white/15" : "divide-line"}`}>
        {inst.hero.proof.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col-reverse px-2 first:pl-0 min-[400px]:px-3 sm:px-5">
            <dt className={`mt-1 text-xs leading-snug sm:text-sm ${dark ? "text-white/70" : "text-muted"}`}>{s.label}</dt>
            <dd className={`font-display text-[1.35rem] leading-none whitespace-nowrap min-[400px]:text-2xl sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>
              <Counter stat={s} />
            </dd>
          </div>
        ))}
      </dl>
      {inst.hero.proofNote && (
        <p className={`mt-3 text-xs leading-snug ${dark ? "text-white/70" : "text-muted"}`}>* {inst.hero.proofNote}</p>
      )}
    </div>
  );
}

function Headline({
  lines,
  className,
  accentLast = true,
  lineClassName = "",
}: {
  lines: string[];
  className: string;
  accentLast?: boolean;
  lineClassName?: string;
}) {
  return (
    <h1 className={className}>
      {lines.map((l, i) => (
        <span key={l} className={`block ${lineClassName} ${accentLast && i === lines.length - 1 ? "text-accent-ink" : ""}`}>
          {l}
        </span>
      ))}
    </h1>
  );
}

/* ------------------------------------------------------------------------ */
/* A. Ramapuram – editorial split                                           */
/* ------------------------------------------------------------------------ */

export function HeroEditorial({ inst }: { inst: Institution }) {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] bg-brand-ink lg:block" />
      <div className="container-x relative grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-0 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7 lg:pr-14">
          <p className="eyebrow mb-6 inline-flex items-center gap-3 text-accent-ink">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {inst.hero.eyebrow}
          </p>
          <Headline
            lines={inst.hero.headline}
            className="font-display text-[2.9rem] font-medium leading-[0.98] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[5.4rem]"
          />
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{inst.hero.body}</p>
          <div className="mt-9">
            <HeroCtas inst={inst} tone="light" />
          </div>
          <div className="mt-12 max-w-xl border-t border-line pt-8">
            <ProofStrip inst={inst} tone="light" />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0 lg:mt-6">
            <div className="relative aspect-[534/495] overflow-hidden bg-brand-soft">
              <MediaFill media={inst.hero.image} preload sizes="(min-width:1024px) 34vw, 90vw" className="object-contain object-bottom" />
            </div>
            <div className="relative -mt-6 ml-6 mr-0 aspect-[16/9] border-4 border-surface lg:-ml-16">
              {inst.hero.secondaryImage && <MediaFill media={inst.hero.secondaryImage} sizes="(min-width:1024px) 30vw, 80vw" tone="dark" />}
            </div>
          </div>
          {inst.hero.badges && (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-white px-5 py-4 lg:justify-end lg:bg-transparent lg:px-0" aria-label="Accreditations and rankings">
              {inst.hero.badges.map((b) => (
                <li key={b.src} className="lg:rounded-sm lg:bg-white lg:p-2">
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-9 w-auto object-contain" sizes="90px" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* B. Tiruchirappalli – geometric dark                                       */
/* ------------------------------------------------------------------------ */

export function HeroGeometric({ inst }: { inst: Institution }) {
  return (
    <section id="top" aria-label="Introduction" className="on-dark relative isolate overflow-hidden bg-brand text-white">
      {/* geometric field */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full opacity-[0.14]">
        <defs>
          <pattern id="tri-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0v56" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tri-grid)" />
      </svg>
      <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 hidden h-[38rem] w-[38rem] rotate-45 border-[3rem] border-accent/90 lg:block" />
      <div aria-hidden="true" className="absolute -bottom-32 left-[38%] -z-10 hidden h-72 w-72 rotate-45 bg-brand-ink lg:block" />

      <div className="container-x grid items-center gap-10 pb-0 pt-12 lg:grid-cols-12 lg:gap-6 lg:pt-12">
        <div className="pb-12 lg:col-span-8 lg:pb-14">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-on-accent">
            {inst.hero.eyebrow}
          </p>
          {/* Two authored lines, each kept on one line from 640px up; size scales with the viewport so both fit. */}
          <Headline
            lines={inst.hero.headline}
            lineClassName="sm:whitespace-nowrap"
            className="font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[min(7.2vw,4rem)] lg:text-[min(4.7vw,4.25rem)]"
          />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{inst.hero.body}</p>
          <div className="mt-7">
            <HeroCtas inst={inst} tone="dark" />
          </div>
          <div className="mt-8 max-w-xl rounded-[var(--radius-card)] border border-white/15 bg-white/5 px-5 py-4 backdrop-blur">
            <ProofStrip inst={inst} tone="dark" />
          </div>
        </div>
        <div className="relative self-end lg:col-span-4">
          <div className="relative mx-auto aspect-square max-w-lg">
            <div aria-hidden="true" className="absolute inset-[2%] rotate-45 border-[1.25rem] border-accent/90 lg:hidden" />
            <div aria-hidden="true" className="absolute inset-[12%] rotate-45 rounded-[2rem] bg-white/95" />
            <MediaFill media={inst.hero.image} preload sizes="(min-width:1024px) 40vw, 90vw" className="object-contain object-bottom" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* C. Easwari – heritage / arch                                              */
/* ------------------------------------------------------------------------ */

export function HeroHeritage({ inst }: { inst: Institution }) {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden bg-surface-alt">
      <div className="container-x grid items-end gap-12 pt-12 lg:grid-cols-12 lg:pt-20">
        <div className="pb-14 lg:col-span-7 lg:pb-24">
          <p className="eyebrow mb-8 flex items-center gap-4 text-brand">
            <span aria-hidden="true" className="h-px w-12 bg-brand" />
            {inst.hero.eyebrow}
          </p>
          <Headline
            lines={inst.hero.headline}
            accentLast={false}
            className="font-display text-[2.6rem] leading-[1.04] text-brand-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]"
          />
          <p className="mt-6 font-display text-xl italic text-brand">{inst.footer.tagline}</p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{inst.hero.body}</p>
          <div className="mt-9">
            <HeroCtas inst={inst} tone="light" />
          </div>
          <div className="mt-12 border-y border-line py-6">
            <ProofStrip inst={inst} tone="light" />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto grid max-w-xl grid-cols-5 items-end gap-4">
            <div className="relative col-span-3 aspect-[414/600] overflow-hidden rounded-t-full bg-brand">
              <div aria-hidden="true" className="absolute inset-x-6 top-6 bottom-0 rounded-t-full border border-white/25" />
              <MediaFill media={inst.hero.image} preload sizes="(min-width:1024px) 28vw, 60vw" className="object-contain object-bottom" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pb-10">
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                {inst.hero.secondaryImage && <MediaFill media={inst.hero.secondaryImage} sizes="(min-width:1024px) 18vw, 40vw" />}
              </div>
              {inst.academics.facts?.[0] && (
                <div className="bg-brand p-5 text-on-brand">
                  <p className="font-display text-4xl leading-none">
                    <Counter stat={inst.academics.facts[0]} />
                  </p>
                  <p className="mt-2 text-sm text-white/80">{inst.academics.facts[0].label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* D. SRM TRP – bold poster                                                  */
/* ------------------------------------------------------------------------ */

export function HeroPoster({ inst }: { inst: Institution }) {
  const bg = inst.hero.secondaryImage;
  return (
    <section id="top" aria-label="Introduction" className="on-dark relative isolate overflow-hidden bg-brand-ink text-white">
      <div className="absolute inset-0 -z-20">
        {bg && !isPending(bg) ? (
          <Image src={bg.src} alt="" fill preload sizes="100vw" className="object-cover opacity-35" />
        ) : (
          <PendingBox label="Campus photograph" tone="dark" />
        )}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/30" />

      <div className="container-x grid items-end gap-8 pt-12 lg:grid-cols-12 lg:pt-16">
        <div className="pb-12 lg:col-span-7 lg:pb-20">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 bg-accent px-3 py-1.5 text-on-accent">{inst.hero.eyebrow}</p>
          <h1 className="font-display text-[3.2rem] font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-7xl lg:text-[6.5rem]">
            {inst.hero.headline.map((l, i) => (
              <span key={l} className={`block ${i === 1 ? "text-transparent [-webkit-text-stroke:2px_white]" : ""}`}>
                {l}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">{inst.hero.body}</p>
          <div className="mt-8">
            <HeroCtas inst={inst} tone="dark" />
          </div>
          {inst.hero.badges && (
            <ul className="mt-10 flex items-center gap-3" aria-label="Approvals and affiliations">
              {inst.hero.badges.map((b) => (
                <li key={b.src} className="rounded-full bg-white p-1.5">
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-11 w-11 object-contain" sizes="44px" />
                </li>
              ))}
              <li className="ml-2 text-sm leading-snug text-white/75">{inst.legalLine}</li>
            </ul>
          )}
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[1022/1250] max-w-md">
            <div aria-hidden="true" className="absolute bottom-0 left-[8%] right-[8%] top-[18%] bg-accent" />
            <MediaFill media={inst.hero.image} preload sizes="(min-width:1024px) 34vw, 85vw" className="object-contain object-bottom" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand">
        <dl className="container-x grid grid-cols-3">
          {inst.hero.proof?.map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col-reverse border-r border-white/10 px-2 py-6 last:border-r-0 min-[400px]:px-3 sm:px-8">
              <dt className="mt-1 text-xs uppercase tracking-wide text-white/75 [overflow-wrap:anywhere] sm:text-sm sm:tracking-wider">{s.label}</dt>
              <dd className="font-display text-[1.6rem] font-black whitespace-nowrap min-[400px]:text-3xl sm:text-5xl">
                <Counter stat={s} />
              </dd>
            </div>
          ))}
        </dl>
        {inst.hero.proofNote && <p className="container-x pb-4 text-xs text-white/70">* {inst.hero.proofNote}</p>}
      </div>
    </section>
  );
}

export function Hero({ inst }: { inst: Institution }) {
  switch (inst.layout.hero) {
    case "editorial":
      return <HeroEditorial inst={inst} />;
    case "geometric":
      return <HeroGeometric inst={inst} />;
    case "heritage":
      return <HeroHeritage inst={inst} />;
    case "poster":
      return <HeroPoster inst={inst} />;
  }
}

