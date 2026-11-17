import { tiruchirappalli } from "@/data/institutions";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${tiruchirappalli.name} – Admissions Open 2027–28`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(tiruchirappalli);
}
