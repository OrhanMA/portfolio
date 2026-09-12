import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://orhanmadiassani.com";

function stringifyJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({
  locale,
  nonce,
}: {
  locale: Locale;
  nonce?: string;
}) {
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
            ? "Développeur full-stack"
            : "Full-Stack Developer",
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
    ],
  };

  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}

export function PageStructuredData({
  locale,
  pathname,
  nonce,
}: {
  locale: Locale;
  pathname: string;
  nonce?: string;
}) {
  const inLanguage = locale === "fr" ? "fr-FR" : "en-US";
  const personId = `${BASE_URL}/#person`;
  const websiteId = `${BASE_URL}/${locale}#website`;
  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const pageUrl = `${BASE_URL}${pathname}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isHomepage ? "ProfilePage" : "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        inLanguage,
        name:
          locale === "fr"
            ? "Portfolio d'Orhan Madi Assani"
            : "Orhan Madi Assani Portfolio",
        ...(isHomepage ? { about: { "@id": personId } } : {}),
        isPartOf: {
          "@id": websiteId,
        },
      },
    ],
  };

  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}

export function ArticleStructuredData({
  locale,
  slug,
  headline,
  description,
  datePublished,
  tags,
  nonce,
}: {
  locale: Locale;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  tags: string[];
  nonce?: string;
}) {
  const articleUrl = `${BASE_URL}/${locale}/articles/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${articleUrl}#article`,
        headline,
        description,
        url: articleUrl,
        datePublished,
        dateModified: datePublished,
        inLanguage: "fr-FR",
        keywords: tags,
        author: { "@id": `${BASE_URL}/#person` },
        isPartOf: { "@id": `${BASE_URL}/${locale}#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "fr" ? "Accueil" : "Home",
            item: `${BASE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: `${BASE_URL}/${locale}/articles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: headline,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
