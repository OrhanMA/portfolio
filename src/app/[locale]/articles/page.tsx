import type { Metadata } from "next";
import { createLocalizedMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { ArticlesFilterableList } from "@/components/articles-filterable-list";
import { ArticleCards } from "@/components/article-cards";
import { buildArticleIndex } from "@/lib/articles";
import type { ArticleIndexItem } from "@/lib/types/articles";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { RouteStructuredData } from "@/components/route-structured-data";
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
  const articles: ArticleIndexItem[] = await buildArticleIndex(
    dict.articles.articlesData,
    loc,
  );

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}/articles`} />
      <EditorialPageHeader
        className="articles-page-header"
        eyebrow={dict.nav.articles}
        title={dict.articles.heading}
        description={dict.articles.subtext}
        titleClassName="uppercase"
      />

      <div data-articles-page>
        <Suspense
          fallback={
            <ArticleCards
              articles={articles}
              locale={loc}
              minuteShort={dict.articles.minuteShort}
              noResults={dict.articles.noResults}
            />
          }
        >
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
    </>
  );
}
