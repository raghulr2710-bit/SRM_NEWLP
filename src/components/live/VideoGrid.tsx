"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, MonitorPlay, Play, Smartphone } from "lucide-react";
import { VideoEmbed, youTubeId } from "@/components/common/VideoEmbed";

/** cover = image shown on cards that cannot be embedded (e.g. Facebook links). */
export type GridVideo = { url: string; title: string; cover?: string };

/**
 * Single-row slider of extra videos (client-supplied links) with prev / next arrows.
 * YouTube links use the click-to-load player; other links (e.g. Facebook, which cannot
 * be embedded from share links) show a cover image and open on the source site.
 */
/** Tall "reel" card: full-bleed thumbnail, glass play button, title over a gradient; plays in place. */
function ReelCard({ v, index }: { v: GridVideo; index: number }) {
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(v.url);
  const short = /shorts\//.test(v.url);
  if (!id) return null;
  const thumb = `https://i.ytimg.com/vi/${id}/${short ? "oar2" : "hq720"}.jpg`;
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-brand-ink transition-transform duration-300 hover:-translate-y-1">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 text-left">
          <Image src={thumb} alt="" fill unoptimized sizes="(min-width:1024px) 25vw, (min-width:640px) 45vw, 75vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/35 to-transparent" />
          <span aria-hidden="true" className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
            {short ? <Smartphone className="h-3.5 w-3.5" /> : <MonitorPlay className="h-3.5 w-3.5" />}
            {short ? "Short" : "Video"}
          </span>
          <span aria-hidden="true" className="absolute right-4 top-4 font-display text-sm font-semibold text-white/70">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="absolute left-1/2 top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--hl)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2.4s] motion-reduce:hidden" />
            <Play className="relative ml-1 h-7 w-7 fill-white text-white group-hover:fill-brand-ink group-hover:text-brand-ink" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span aria-hidden="true" className="mb-3 block h-1 w-10 rounded-full bg-[var(--hl)] transition-all duration-300 group-hover:w-16" />
            <span className="line-clamp-3 font-display text-base font-semibold leading-snug text-white">{v.title}</span>
            <span className="sr-only"> – play video</span>
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoGrid({ videos, heading, variant = "card" }: { videos: GridVideo[]; heading?: string; variant?: "card" | "reel" }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!videos.length) return null;
  const arrows = !(edge.start && edge.end);
  if (variant === "reel") {
    const reels = videos.filter((v) => youTubeId(v.url));
    return (
      <div className="mt-2">
        <ul ref={track} onScroll={update} aria-label="Student videos" className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-2 sm:mx-0 sm:px-0">
          {reels.map((v, i) => (
            <li key={v.url} className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]">
              <ReelCard v={v} index={i} />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-5">
          <div aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-[var(--hl)] transition-[width] duration-300" style={{ width: `${Math.max(12, progress * 100)}%` }} />
          </div>
          {arrows && (
            <div className="flex shrink-0 gap-2">
              {([[-1, ArrowLeft, "Previous videos", edge.start], [1, ArrowRight, "Next videos", edge.end]] as const).map(([d, Icon, l, off]) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => go(d)}
                  disabled={off}
                  aria-label={l}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-on-brand shadow-md transition-[background-color,color,opacity,transform] hover:-translate-y-0.5 hover:bg-[var(--hl)] hover:text-brand-ink disabled:pointer-events-none disabled:opacity-30"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        {heading && <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{heading}</h3>}
        {arrows && (
          <div className="flex shrink-0 gap-2">
            {([[-1, ArrowLeft, "Previous videos", edge.start], [1, ArrowRight, "Next videos", edge.end]] as const).map(([d, Icon, l, off]) => (
              <button
                key={l}
                type="button"
                onClick={() => go(d)}
                disabled={off}
                aria-label={l}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm transition-[background-color,color,opacity] hover:bg-brand hover:text-on-brand disabled:pointer-events-none disabled:opacity-40"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </button>
            ))}
          </div>
        )}
      </div>
      <ul ref={track} onScroll={update} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {videos.map((v) => {
          const yt = youTubeId(v.url);
          const fb = /facebook\.com/.test(v.url);
          return (
            <li key={v.url} className="flex w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-white sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]">
              {yt ? (
                <VideoEmbed url={v.url} title={v.title} className="!rounded-none" />
              ) : (
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="group relative flex aspect-video items-center justify-center overflow-hidden bg-brand text-white">
                  {v.cover && <Image src={v.cover} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 80vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  <span aria-hidden="true" className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/25" />
                  <span className="relative flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play aria-hidden="true" className="ml-1 h-6 w-6 fill-current" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold">
                      Watch on {fb ? "Facebook" : "the source site"} <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <span className="sr-only">: {v.title} (opens in a new tab)</span>
                </a>
              )}
              <p className="px-4 py-3 text-sm font-medium leading-snug text-ink">{v.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
