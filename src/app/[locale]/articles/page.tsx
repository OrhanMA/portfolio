import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "../dictionaries";
import { parseLocale } from "@/lib/i18n";
import { createLocalizedMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import {
  ArticlesFilterableList,
  type SearchableArticle,
} from "@/components/articles-filterable-list";
import { buildArticleIndex } from "@/lib/articles";
import { EditorialPageHeader } from "@/components/editorial-page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);

  return createLocalizedMetadata({
    locale: loc,
    pathname: "/articles",
    title: `${dict.articles.heading} | Orhan Madi Assani`,
    description: dict.articles.subtext,
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);
  const articles: SearchableArticle[] = await buildArticleIndex(
    dict.articles.articlesData,
  );

  return (
    <div className="article-index not-prose">
      <EditorialPageHeader
        eyebrow={dict.nav.articles}
        title={dict.articles.heading}
        description={dict.articles.subtext}
        titleClassName="uppercase"
        className="relative left-1/2 -mt-28 w-screen -translate-x-1/2"
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Suspense>
          <ArticlesFilterableList
            articles={articles}
            locale={locale}
            labels={{
              allTopics: dict.articles.allTopics,
              searchPlaceholder: dict.articles.searchPlaceholder,
              clearSearch: dict.articles.clearSearch,
              noResults: dict.articles.noResults,
              readingTime: dict.articles.readingTime,
              minuteShort: dict.articles.minuteShort,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
