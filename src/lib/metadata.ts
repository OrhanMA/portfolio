import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://orhanmadiassani.com";

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
