import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://orhanmadiassani.com";

function stringifyJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ locale }: { locale: Locale }) {
  const inLanguage = locale === "fr" ? "fr-FR" : "en-US";
  const personId = `${BASE_URL}/#person`;
  const websiteId = `${BASE_URL}/${locale}#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Orhan Madi Assani",
        url: `${BASE_URL}/${locale}`,
        image: `${BASE_URL}/images/coporate-headshot.webp`,
        jobTitle:
          locale === "fr"
            ? "Developpeur Fullstack"
            : "Fullstack Developer",
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Odoo",
          "Python",
          "PostgreSQL",
          "Symfony",
          "DevOps",
        ],
        sameAs: [
          "https://github.com/OrhanMA",
          "https://www.linkedin.com/in/orhanmadi/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Orhan Madi Assani",
        url: `${BASE_URL}/${locale}`,
        inLanguage,
        author: {
          "@id": personId,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/${locale}#profile`,
        url: `${BASE_URL}/${locale}`,
        inLanguage,
        name:
          locale === "fr"
            ? "Portfolio d'Orhan Madi Assani"
            : "Orhan Madi Assani Portfolio",
        about: {
          "@id": personId,
        },
        isPartOf: {
          "@id": websiteId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
