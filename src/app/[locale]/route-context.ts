import "server-only";

import { notFound } from "next/navigation";
import { competences } from "@/lib/competences";
import { parseLocale } from "@/lib/i18n";
import { assertPortfolioIntegrity } from "@/lib/portfolio-integrity";
import { realisations } from "@/lib/realisations";
import { getDictionary } from "./dictionaries";

export async function getLocalizedPageContext(locale: string) {
  const parsedLocale = parseLocale(locale);

  if (!parsedLocale) {
    notFound();
  }

  const dictionary = await getDictionary(parsedLocale);
  assertPortfolioIntegrity({
    competences,
    realisations,
    experiences: dictionary.experience.entries,
  });

  return {
    locale: parsedLocale,
    dictionary,
  };
}
