"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered reveal: a short, single-shot fade + rise.
 *
 * Implemented with one shared IntersectionObserver and CSS transitions (see
 * `[data-reveal]` in globals.css) rather than a motion component per element.
 * That keeps hydration cheap on long pages. Reduced-motion users get the fade
 * only, and a <noscript> rule in the root layout shows everything without JS.
 */
let observer: IntersectionObserver | null = null;

function observe(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.setAttribute("data-revealed", "");
    return;
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  observer.observe(el);
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  mask = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
  /** Image mask reveal (clip-path wipe + settle) instead of fade + rise. */
  mask?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) observe(el);
    return () => {
      if (el) observer?.unobserve(el);
    };
  }, []);

  const Comp = as as ElementType;
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <Comp ref={ref} data-reveal={mask ? "mask" : ""} className={className} style={style}>
      {children}
    </Comp>
  );
}
