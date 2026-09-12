import { getCompetenceBySlug } from "@/lib/competences";
import { getRealisationBySlug } from "@/lib/realisations";
import type { Locale } from "@/lib/i18n";

export type PortfolioLink = {
  slug: string;
  title: string;
};

function resolveLinks<T extends { title: Record<Locale, string> }>(
  slugs: readonly string[],
  locale: Locale,
  lookup: (slug: string) => T | undefined,
  kind: "competence" | "realisation",
): PortfolioLink[] {
  return slugs.map((slug) => {
    const item = lookup(slug);

    if (!item) {
      throw new Error(`Unknown ${kind} slug referenced by experience: ${slug}`);
    }

    return { slug, title: item.title[locale] };
  });
}

/**
 * Resolves experience relations against the canonical content catalogs.
 * Missing references fail loudly instead of leaking a raw slug into the UI.
 */
export function resolveRealisationLinks(
  slugs: readonly string[] | undefined,
  locale: Locale,
) {
  return resolveLinks(slugs ?? [], locale, getRealisationBySlug, "realisation");
}

export function resolveCompetenceLinks(
  slugs: readonly string[] | undefined,
  locale: Locale,
) {
  return resolveLinks(slugs ?? [], locale, getCompetenceBySlug, "competence");
}
