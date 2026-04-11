import { ImageResponse } from "next/og";
import { siteConfig } from "./seo";

export const seoImageSize = {
  width: 1200,
  height: 630,
} as const;

export const seoImageContentType = "image/png";

type SeoImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accentStart?: string;
  accentEnd?: string;
};

export function createSeoImage({
  eyebrow,
  title,
  description,
  accentStart = "#2563eb",
  accentEnd = "#0f766e",
}: SeoImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #ecfeff 100%)",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 38%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -130,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: `linear-gradient(135deg, ${accentStart}, ${accentEnd})`,
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -170,
            left: -140,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: `linear-gradient(135deg, ${accentEnd}, ${accentStart})`,
            opacity: 0.14,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 16 }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0f766e 100%)",
                  color: "#ffffff",
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                BG
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#475569",
                  }}
                >
                  Portfolio
                </div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>
                  {siteConfig.name}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                border: "1px solid rgba(15, 23, 42, 0.12)",
                borderRadius: 9999,
                fontSize: 18,
                color: "#334155",
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              bentgarcia.com
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#2563eb",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 800,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "#334155",
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {["Next.js", "React", "TypeScript", "AI Interfaces"].map(
                (label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 16px",
                      borderRadius: 9999,
                      background: "rgba(15, 23, 42, 0.05)",
                      color: "#334155",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {label}
                  </div>
                )
              )}
            </div>

            <div style={{ display: "flex", fontSize: 20, color: "#475569" }}>
              Los Angeles, California
            </div>
          </div>
        </div>
      </div>
    ),
    seoImageSize
  );
}
