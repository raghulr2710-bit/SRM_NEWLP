import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Institution } from "@/types/institution";

export const ogSize = { width: 1200, height: 630 };

/** Branded Open Graph card for an institution (logo + headline + campaign line). */
export async function renderOg(inst: Institution) {
  const logo = await readFile(join(process.cwd(), "public", inst.logo.src));
  const mime = inst.logo.src.endsWith(".jpg") ? "image/jpeg" : "image/png";
  const logoSrc = `data:${mime};base64,${logo.toString("base64")}`;
  const logoH = 110;
  const logoW = Math.round((inst.logo.width / inst.logo.height) * logoH);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: inst.theme.brandInk }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            margin: 40,
            padding: 56,
            background: "#ffffff",
            borderTop: `14px solid ${inst.theme.accent}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={logoW} height={logoH} alt="" style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: inst.theme.accent, fontWeight: 700 }}>
              Admissions Open 2027–28
            </div>
            <div style={{ fontSize: 64, lineHeight: 1.05, color: inst.theme.brandInk, fontWeight: 800, marginTop: 16 }}>
              {inst.hero.headline.join(" ")}
            </div>
            <div style={{ fontSize: 28, color: inst.theme.muted, marginTop: 18 }}>{inst.name}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
