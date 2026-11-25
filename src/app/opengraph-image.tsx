import { ImageResponse } from "next/og";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}, Software Engineer and AI Builder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at build time so the image is prerendered as a static file.
const photoFile = join(process.cwd(), "public", site.photoPath);
const photo = existsSync(photoFile)
  ? `data:image/jpeg;base64,${(await readFile(photoFile)).toString("base64")}`
  : null;

export default function OpengraphImage() {

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0D1117",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(63,185,80,0.25), transparent 45%), radial-gradient(circle at 100% 100%, rgba(88,166,255,0.22), transparent 45%)",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ display: "flex", fontSize: 28, color: "#3FB950", fontFamily: "monospace" }}>
            saroash@islamabad:~$ whoami
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.02, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              marginTop: 20,
              backgroundImage: "linear-gradient(90deg, #3FB950, #58A6FF)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Software Engineer · AI Builder
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9198A1", marginTop: 28, lineHeight: 1.4 }}>
            AI-integrated web products · FAST-NUCES Islamabad
          </div>
        </div>
        {photo ? (
          <div
            style={{
              display: "flex",
              padding: 3,
              borderRadius: 30,
              backgroundImage: "linear-gradient(160deg, #3FB950, #58A6FF)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={288} height={512} alt="" style={{ borderRadius: 27, objectFit: "cover" }} />
          </div>
        ) : null}
      </div>
    ),
    size,
  );
}
