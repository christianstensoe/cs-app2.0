import { ImageResponse } from "next/og";
import { site } from "@/lib/cv";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "96px",
          backgroundColor: "#09090b",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              color: "#f4f4f5",
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#a1a1aa",
              maxWidth: 900,
            }}
          >
            {site.role}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#38bdf8" }}>
          christianstensoe.com
        </div>
      </div>
    ),
    size
  );
}
