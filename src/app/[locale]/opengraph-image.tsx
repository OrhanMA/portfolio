import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Orhan Madi Assani — Développeur Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { locale: string } }) {
  const isFr = params.locale === "fr";

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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#a0a0a0",
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
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Orhan Madi Assani
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#c0c0c0",
              textAlign: "center",
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
              color: "#808080",
            }}
          >
            <span>Odoo</span>
            <span style={{ color: "#404040" }}>·</span>
            <span>Symfony</span>
            <span style={{ color: "#404040" }}>·</span>
            <span>Next.js</span>
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: 18,
              color: "#606060",
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
