import "server-only";

import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";

export async function getArticleMetadata(
  locale: string,
  slug: string,
): Promise<Metadata> {
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const article = dict.articles.articlesData.find((item) => item.slug === slug);

  if (!article) return {};

  return createLocalizedMetadata({
    locale: loc,
    pathname: `/articles/${slug}`,
    title: `${article.title} | ${dict.nav.articles} | Orhan Madi Assani`,
    description: article.description,
  });
}
