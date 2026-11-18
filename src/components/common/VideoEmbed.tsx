"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/** Extracts the YouTube video id from a watch, short or embed URL. */
export function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/**
 * Click-to-load YouTube player: shows the official thumbnail and only loads
 * the (privacy-enhanced) player when the visitor asks for it, so the page
 * stays fast and no third-party cookies are set up front.
 */
export function VideoEmbed({ url, title, className = "" }: { url: string; title: string; className?: string }) {
  const id = youTubeId(url);
  const [playing, setPlaying] = useState(false);
  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener" className={`inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline ${className}`}>
        <Play aria-hidden="true" className="h-4 w-4" /> {title}
      </a>
    );
  }
  return (
    <div className={`relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-black ${className}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
        >
          <span aria-hidden="true" className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-current" />
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
