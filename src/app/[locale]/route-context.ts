import "server-only";

import { notFound } from "next/navigation";
import { parseLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export async function getLocalizedPageContext(locale: string) {
  const parsedLocale = parseLocale(locale);

  if (!parsedLocale) {
    notFound();
  }

  return {
    locale: parsedLocale,
    dictionary: await getDictionary(parsedLocale),
  };
}
