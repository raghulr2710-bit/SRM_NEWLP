import Image from "next/image";
import { Info } from "lucide-react";
import { isPending, type Media as MediaT } from "@/types/institution";

/** Small inline tag for unverified details. */
export function PendingTag({ children = "To be confirmed", className = "" }: { children?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border border-dashed border-current px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}

/** Marks an AI-generated visual so it is never mistaken for a photograph of the institution. */
export function IllustrativeTag({ className = "" }: { className?: string }) {
  return (
    <span
      title="AI-generated illustrative image – not a photograph of this institution"
      className={`pointer-events-none absolute z-[1] inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm ${className || "left-3 top-3"}`}
    >
      <Info aria-hidden="true" className="h-3 w-3" />
      Illustrative
    </span>
  );
}

/**
 * Renders an image filling its (relatively positioned) parent. Every visual
 * slot in the data files carries a real image (official photograph or an
 * AI-generated illustrative visual); a pending asset falls back to a quiet
 * brand-tinted surface rather than a placeholder box.
 */
export function MediaFill({
  media,
  sizes,
  className = "",
  preload = false,
  zoom = false,
  tag = true,
  tagClassName,
}: {
  media: MediaT;
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Kept for call-site compatibility. */
  tone?: "light" | "dark";
  zoom?: boolean;
  /** Show the "Illustrative" tag on AI-generated images. */
  tag?: boolean;
  tagClassName?: string;
}) {
  if (isPending(media)) return <div aria-hidden="true" className={`h-full w-full bg-gradient-to-br from-brand to-brand-ink ${className}`} />;
  return (
    <>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={media.illustrative ? 75 : undefined}
        className={`object-cover ${zoom ? "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" : ""} ${className}`}
        style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
      />
      {media.illustrative && tag && <IllustrativeTag className={tagClassName} />}
    </>
  );
}
