import { ImageResponse } from "next/og";

export const alt = "Orhan Madi Assani — Développeur full-stack";
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
      >
        <div
        />
        <div
        />
        <div
        >
          <div
          >
            Portfolio
          </div>
          <div
          >
            Orhan Madi Assani
          </div>
          <div
          >
            {isFr ? "Développeur full-stack" : "Full-Stack Developer"}
          </div>
          <div
          >
            <span>Odoo</span>
            <span>·</span>
            <span>Symfony</span>
            <span>·</span>
            <span>Next.js</span>
          </div>
          <div
          >
            orhanmadiassani.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
