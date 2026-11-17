import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  action,
  id,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-6 lg:mb-14 ${
        align === "center" ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-3xl" : "max-w-3xl"}>
        <p className={`eyebrow mb-4 flex items-center gap-3 ${dark ? "on-dark text-accent-ink" : "text-accent-ink"}`}>
          {index && <span className={`font-mono ${dark ? "text-white/60" : "text-muted"}`}>{index}</span>}
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`font-display text-[2rem] leading-[1.08] tracking-tight text-balance md:text-5xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? "text-white/75" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
