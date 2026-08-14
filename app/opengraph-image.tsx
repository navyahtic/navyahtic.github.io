import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Required for `output: export` — the PNG is rendered once at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/**
 * Generated at build time. Deliberately typographic rather than photographic:
 * a name at this size survives being shown as a 300px-wide thumbnail in a
 * chat client, which a portrait crop does not.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#dc4437",
              fontFamily: "monospace",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#1a1a1a",
              fontWeight: 600,
              display: "flex",
            }}
          >
            {profile.name}
          </div>
        </div>

        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "#6e6e6e",
            maxWidth: 900,
            display: "flex",
          }}
        >
          {profile.statement}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#9a9a9a",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            borderTop: "1px solid rgba(0,0,0,0.12)",
            paddingTop: 24,
          }}
        >
          <span>IITM HTIC — IIT MADRAS</span>
          <span>{profile.email}</span>
        </div>
      </div>
    ),
    size,
  );
}
