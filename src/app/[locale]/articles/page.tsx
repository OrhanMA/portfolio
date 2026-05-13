import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";
import { Suspense } from "react";
import {
  ArticlesFilterableList,
  type SearchableArticle,
} from "@/components/articles-filterable-list";
import { buildArticleIndex } from "@/lib/articles";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const articles: SearchableArticle[] = await buildArticleIndex(
    dict.articles.articlesData,
  );

  return (
    <div className="not-prose">
      <section className="grid gap-8 border-b border-border/70 pb-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
            Lab notes
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl md:text-7xl">
            {dict.articles.heading}
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          {dict.articles.subtext}
        </p>
      </section>

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
  );
}
