import { ImageResponse } from "next/og";

export const alt = "Orhan Madi Assani — Développeur Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "#f3ead7",
          color: "#17120f",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: 999,
            right: -70,
            top: 85,
            background: "#d63124",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 28,
            border: "3px solid #17120f",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#d63124",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textAlign: "left",
              lineHeight: 1.1,
              maxWidth: 760,
            }}
          >
            Orhan Madi Assani
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#17120f",
              textAlign: "left",
            }}
          >
            {isFr ? "Développeur Fullstack" : "Fullstack Developer"}
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "20px",
              fontSize: 22,
              color: "#534a43",
            }}
          >
            <span>Odoo</span>
            <span style={{ color: "#d63124" }}>·</span>
            <span>Symfony</span>
            <span style={{ color: "#d63124" }}>·</span>
            <span>Next.js</span>
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: 18,
              color: "#534a43",
            }}
          >
            orhanmadiassani.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
