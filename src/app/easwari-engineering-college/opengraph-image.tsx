import { easwari } from "@/data/institutions";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${easwari.name} – Admissions Open 2027–28`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(easwari);
}
