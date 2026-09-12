"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { useDictionary } from "@/components/dictionary-provider";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/fr";
  const { nav } = useDictionary();

  // Extract current locale from pathname
  const currentLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) ?? defaultLocale;
  const currentLocaleIndex = locales.indexOf(currentLocale);
  const nextLocale =
    locales[(currentLocaleIndex + 1) % locales.length] ?? defaultLocale;
  const localeNames = nav.localeNames as Record<Locale, string>;

  function switchLocale() {
    const newLocale: Locale = nextLocale;

    // Replace only the locale segment and keep the current URL context.
    const newPath = replaceLocaleInUrl(
      pathname,
      newLocale,
      window.location.search,
      window.location.hash,
    );

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    // A document navigation refreshes the CSP nonce used by the new locale.
    window.location.assign(newPath);
  }

  return (
    <Button
      data-language-switcher
      variant="ghost"
      size="icon"
      onClick={switchLocale}
      aria-label={
        nav.switchToLocale.replace("{locale}", localeNames[nextLocale])
      }
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}

export function replaceLocaleInUrl(
  pathname: string,
  newLocale: Locale,
  search = "",
  hash = "",
) {
  const segments = pathname.split("/");
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = newLocale;
  }

  const path = segments.join("/") || `/${newLocale}`;
  const query = search ? (search.startsWith("?") ? search : `?${search}`) : "";
  const fragment = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";

  return `${path}${query}${fragment}`;
}
