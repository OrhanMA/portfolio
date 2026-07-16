"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/fr";
  const router = useRouter();

  // Extract current locale from pathname
  const currentLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) ?? "fr";

  function switchLocale() {
    const newLocale: Locale = currentLocale === "fr" ? "en" : "fr";

    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    router.push(newPath);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={switchLocale}
      aria-label={`Switch to ${currentLocale === "fr" ? "English" : "French"}`}
      className="text-xs font-semibold"
    >
      {currentLocale === "fr" ? "EN" : "FR"}
    </Button>
  );
}
