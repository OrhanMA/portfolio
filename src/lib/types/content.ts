import type { Locale } from "@/lib/i18n";

/** Text whose value is available for every locale supported by the site. */
export type LocalizedContent = Record<Locale, string>;
