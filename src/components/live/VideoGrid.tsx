"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Play } from "lucide-react";
import { VideoEmbed, youTubeId } from "@/components/common/VideoEmbed";

/** cover = image shown on cards that cannot be embedded (e.g. Facebook links). */
export type GridVideo = { url: string; title: string; cover?: string };

/**
 * Single-row slider of extra videos (client-supplied links) with prev / next arrows.
 * YouTube links use the click-to-load player; other links (e.g. Facebook, which cannot
 * be embedded from share links) show a cover image and open on the source site.
 */
export function VideoGrid({ videos, heading }: { videos: GridVideo[]; heading?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
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
            <li key={v.url} className="flex w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-32px_rgba(10,20,50,0.5)] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]">
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
