"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleCards, formatArticleDate } from "@/components/article-cards";
import { filterArticleIndex } from "@/lib/article-search";
import type { Locale } from "@/lib/i18n";
import type { ArticleIndexItem } from "@/lib/types/articles";

type ArticlesFilterableListProps = {
  articles: ArticleIndexItem[];
  locale: Locale;
  labels: {
    allTopics: string;
    searchPlaceholder: string;
    clearSearch: string;
    noResults: string;
    readingTime: string;
    minuteShort: string;
  };
};

export { formatArticleDate };

export function ArticlesFilterableList({
  articles,
  locale,
  labels,
}: ArticlesFilterableListProps) {
  const pathname = usePathname() ?? `/${locale}/articles`;
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.toString() ?? "";
  const activeTag = searchParams?.get("tag") ?? null;
  const query = searchParams?.get("q") ?? "";
  const [tagInput, setTagInput] = useState(activeTag);
  const [queryInput, setQueryInput] = useState(query);

  const tags = useMemo(
    () =>
      Array.from(new Set(articles.flatMap((article) => article.tags))).sort(
        (a, b) => a.localeCompare(b, locale),
      ),
    [articles, locale],
  );

  useEffect(() => {
    // This effect mirrors browser back/forward and external URL changes into
    // the controlled fields. Local input changes update their state directly.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL state is an external synchronization source.
    setTagInput(activeTag);
    setQueryInput(query);
  }, [activeTag, currentSearch, query]);

  function replaceFilters(nextTag: string | null, nextQuery: string) {
    const params = new URLSearchParams(currentSearch);

    if (nextTag) params.set("tag", nextTag);
    else params.delete("tag");

    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    else params.delete("q");

    const nextSearch = params.toString();

    // Filtering is local. Native history integration updates Next's search
    // params without scheduling competing route transitions when a visitor
    // types and clears quickly.
    if (typeof window !== "undefined") {
      window.history.replaceState(
        window.history.state,
        "",
        nextSearch ? `${pathname}?${nextSearch}` : pathname,
      );
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }

  const filteredArticles = filterArticleIndex(articles, {
    tag: tagInput,
    query: queryInput,
  });

  return (
    <section>
      <div>
        <div>
          <Search />
          <Input
            type="search"
            aria-label={labels.searchPlaceholder}
            value={queryInput}
            onChange={(event) => {
              const nextQuery = event.target.value;
              setQueryInput(nextQuery);
              replaceFilters(tagInput, nextQuery);
            }}
            placeholder={labels.searchPlaceholder}
          />
          {queryInput && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={labels.clearSearch}
              onClick={() => {
                setQueryInput("");
                replaceFilters(tagInput, "");
              }}
            >
              <X />
            </Button>
          )}
        </div>

        <div>
          <button
            type="button"
            className="h-7"
            onClick={() => {
              setTagInput(null);
              replaceFilters(null, queryInput);
            }}
            aria-pressed={tagInput === null}
          >
            {labels.allTopics}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="h-7"
              aria-pressed={tagInput === tag}
              onClick={() => {
                const nextTag = tagInput === tag ? null : tag;
                setTagInput(nextTag);
                replaceFilters(nextTag, queryInput);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ArticleCards
        articles={filteredArticles}
        locale={locale}
        minuteShort={labels.minuteShort}
        noResults={labels.noResults}
      />
    </section>
  );
}
