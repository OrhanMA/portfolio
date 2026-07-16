import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://orhanmadiassani.com";
const SOCIAL_IMAGE = "/opengraph-image";

export function localizedUrl(locale: Locale, pathname = "") {
  const suffix = pathname
    ? `/${pathname.replace(/^\/+|\/+$/g, "")}`
    : "";

  return `${SITE_URL}/${locale}${suffix}`;
}

export function localizedAlternates(
  locale: Locale,
  pathname = "",
): NonNullable<Metadata["alternates"]> {
  const suffix = pathname
    ? `/${pathname.replace(/^\/+|\/+$/g, "")}`
    : "";

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      fr: `/fr${suffix}`,
      en: `/en${suffix}`,
      "x-default": `/fr${suffix}`,
    },
  };
}

export function createLocalizedMetadata({
  locale,
  pathname = "",
  title,
  description,
}: {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, pathname),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      siteName: "Orhan Madi Assani",
      url: localizedUrl(locale, pathname),
      images: [
        {
          url: `/${locale}${SOCIAL_IMAGE}`,
          width: 1200,
          height: 630,
          alt:
            locale === "fr"
              ? "Portfolio d’Orhan Madi Assani"
              : "Orhan Madi Assani’s portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/${locale}${SOCIAL_IMAGE}`],
    },
  };
}
