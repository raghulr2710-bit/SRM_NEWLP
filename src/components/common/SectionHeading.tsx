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
      className={`mb-9 flex flex-col gap-6 lg:mb-12 ${
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
          className={`type-h2 font-display text-balance ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`type-lead mt-4 max-w-2xl ${dark ? "text-white/75" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
