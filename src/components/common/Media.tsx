import Image from "next/image";
import { ImageOff } from "lucide-react";
import { isPending, type Media as MediaT } from "@/types/institution";

/** Clearly labelled placeholder for content / assets awaiting client approval. */
export function PendingBox({
  label,
  className = "",
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`pending-hatch relative flex h-full w-full items-center justify-center overflow-hidden ${
        dark ? "bg-white/5 text-white/80" : "bg-brand-soft text-brand"
      } ${className}`}
    >
      <div className="flex max-w-[16rem] flex-col items-center gap-2 px-4 text-center">
        <ImageOff aria-hidden="true" className="h-5 w-5 opacity-70" />
        <span className="text-xs font-bold uppercase tracking-[0.14em]">Asset pending</span>
        <span className="text-sm leading-snug font-medium">{label}</span>
      </div>
    </div>
  );
}

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

/**
 * Renders an image filling its (relatively positioned) parent, or a labelled
 * placeholder if the asset is still pending.
 */
export function MediaFill({
  media,
  sizes,
  className = "",
  preload = false,
  tone,
  zoom = false,
}: {
  media: MediaT;
  sizes: string;
  className?: string;
  preload?: boolean;
  tone?: "light" | "dark";
  zoom?: boolean;
}) {
  if (isPending(media)) return <PendingBox label={media.pending} tone={tone} className={className} />;
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${zoom ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]" : ""} ${className}`}
      style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
    />
  );
}
