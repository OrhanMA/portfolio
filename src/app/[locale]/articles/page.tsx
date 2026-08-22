import type { Metadata } from "next";
import { createLocalizedMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import {
  ArticlesFilterableList,
  type SearchableArticle,
} from "@/components/articles-filterable-list";
import { buildArticleIndex } from "@/lib/articles";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { getLocalizedPageContext } from "../route-context";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

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
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
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
        className="relative left-1/2 w-screen -translate-x-1/2"
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Suspense>
          <ArticlesFilterableList
            articles={articles}
            locale={loc}
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
