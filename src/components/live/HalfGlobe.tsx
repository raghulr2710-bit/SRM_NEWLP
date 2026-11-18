"use client";

/**
 * Rotating half-globe (WebGL via `cobe`), adapted from the Magic UI "Globe"
 * referenced in the Motion Studio catalogue. A centred upper hemisphere with
 * a soft glow sits on the section's bottom edge. Markers show Chennai and the
 * partner universities. Initialises only when scrolled into view, pauses
 * off-screen, and stays still for prefers-reduced-motion.
 */

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [13.03, 80.18], size: 0.08 }, // Chennai (SRMIST Ramapuram)
  { location: [42.36, -71.09], size: 0.05 }, // MIT / Harvard Medical School, Boston
  { location: [1.3, 103.78], size: 0.05 }, // NUS, Singapore
  { location: [52.48, -1.9], size: 0.05 }, // Birmingham City University
  { location: [24.79, 120.99], size: 0.05 }, // Tsing Hua University, Hsinchu
  { location: [41.83, -87.63], size: 0.05 }, // Illinois Tech, Chicago
  { location: [25.04, 121.53], size: 0.05 }, // Taipei Tech
  { location: [38.54, -121.75], size: 0.05 }, // UC Davis
  { location: [-37.72, 145.05], size: 0.05 }, // La Trobe University, Melbourne
];

export function HalfGlobe({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let globe: ReturnType<typeof createGlobe> | null = null;
    let phi = 4.6; // India facing the viewer
    let visible = false;
    let size = 0;

    const fit = () => {
      size = el.offsetWidth * dpr;
      el.width = size;
      el.height = size;
    };

    const start = () => {
      if (globe) return;
      fit();
      try {
        globe = createGlobe(el, {
          devicePixelRatio: dpr,
          width: size,
          height: size,
          phi,
          theta: 0.3,
          dark: 0,
          diffuse: 1.4,
          mapSamples: 22000,
          mapBrightness: 7,
          baseColor: [0.86, 0.91, 1],
          markerColor: [242 / 255, 174 / 255, 30 / 255],
          glowColor: [0.78, 0.86, 1],
          markers: MARKERS,
          onRender: (state) => {
            if (!reduce && visible) phi += 0.0026;
            state.phi = phi;
            state.width = size;
            state.height = size;
          },
        });
        el.style.opacity = "1";
      } catch (err) {
        console.error("[HalfGlobe]", err);
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "200px" },
    );
    io.observe(box);
    window.addEventListener("resize", fit);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", fit);
      globe?.destroy();
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className={`pointer-events-none relative mx-auto aspect-[2/1] w-[min(44rem,92vw)] overflow-hidden ${className}`}>
      {/* soft halo, kept fully inside the box so no edge is ever clipped */}
      <div className="absolute left-1/2 top-[10%] aspect-square w-[86%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,79,160,0.16)_0%,rgba(11,79,160,0.06)_42%,transparent_66%)]" />
      <canvas ref={canvas} className="absolute left-0 top-0 aspect-square w-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]" />
      {/* blend the globe's base into the section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-alt via-surface-alt/60 to-transparent" />
    </div>
  );
}
