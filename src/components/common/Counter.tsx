"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/types/institution";

const fmt = (n: number, decimals: number, plain: boolean) =>
  plain
    ? n.toFixed(decimals)
    : n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Animated count-up for verified statistics. Renders the final value for SSR / reduced motion. */
export function Counter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const decimals = stat.decimals ?? 0;
  // Years (e.g. 1985) should not be grouped as 1,985.
  const plain = stat.value >= 1900 && stat.value <= 2100 && !stat.suffix;
  const [display, setDisplay] = useState(() => fmt(stat.value, decimals, plain));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const from = plain ? Math.max(stat.value - 40, 0) : 0;
    const controls = animate(from, stat.value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(fmt(v, decimals, plain)),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value, decimals, plain]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {stat.prefix}
        {display}
        {stat.suffix && (
          <span className={/^\s/.test(stat.suffix) ? "ml-[0.15em] text-[0.55em] tracking-normal" : undefined}>{stat.suffix.trim()}</span>
        )}
      </span>
      <span className="sr-only">
        {stat.prefix}
        {fmt(stat.value, decimals, plain)}
        {stat.suffix}
      </span>
    </span>
  );
}
