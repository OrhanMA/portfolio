"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, BookOpenText, Search, X } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SearchableArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  searchText: string;
};

type ArticlesFilterableListProps = {
  articles: SearchableArticle[];
  locale: string;
  labels: {
    allTopics: string;
    searchPlaceholder: string;
    clearSearch: string;
    noResults: string;
    readingTime: string;
    minuteShort: string;
  };
};

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function ArticlesFilterableList({
  articles,
  locale,
  labels,
}: ArticlesFilterableListProps) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}/articles`;
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState<string | null>(
    searchParams?.get("tag") ?? null,
  );
  const [query, setQuery] = useState(searchParams?.get("q") ?? "");

  const tags = useMemo(
    () =>
      Array.from(new Set(articles.flatMap((article) => article.tags))).sort(
        (a, b) => a.localeCompare(b, locale),
      ),
    [articles, locale],
  );

  const normalizedQuery = normalizeSearchText(query.trim());

  useEffect(() => {
    const params = new URLSearchParams();

    if (activeTag) {
      params.set("tag", activeTag);
    }

    if (query.trim()) {
      params.set("q", query.trim());
    }

    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [activeTag, pathname, query, router]);

  const filteredArticles = articles.filter((article) => {
    const matchesTag = activeTag ? article.tags.includes(activeTag) : true;
    const matchesQuery = normalizedQuery
      ? normalizeSearchText(article.searchText).includes(normalizedQuery)
      : true;

    return matchesTag && matchesQuery;
  });

  return (
    <section className="mt-10">
      <div className="grid gap-4 border-b border-border/70 pb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
          className="h-12 rounded-lg border-foreground/20 bg-background/85 pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={labels.clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              buttonVariants({
                variant: activeTag === null ? "default" : "outline",
                size: "sm",
              }),
              "rounded-md",
            )}
          >
            {labels.allTopics}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setActiveTag((current) => (current === tag ? null : tag))
              }
              className={cn(
                buttonVariants({
                  variant: activeTag === tag ? "default" : "outline",
                  size: "sm",
                }),
                "rounded-md",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="mt-6 grid gap-4">
          {filteredArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/${locale}/articles/${article.slug}`}
              className="no-underline"
            >
              <Card
                className={cn(
                  "group premium-card my-0 rounded-xl border-l-4 border-l-primary transition-all duration-300 hover:-translate-y-1 hover:border-primary/50",
                  index % 2 === 1 && "border-l-vermillion",
                )}
              >
                <CardHeader className="grid gap-5 sm:grid-cols-[72px_1fr_auto] sm:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md border border-border/70 bg-background text-primary">
                    <BookOpenText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString(
                          locale === "fr" ? "fr-FR" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.readingMinutes} {labels.minuteShort}
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-black leading-tight tracking-[-0.025em]">
                      <h2>{article.title}</h2>
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-2xl leading-6">
                      {article.description}
                    </CardDescription>
                    {article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              setActiveTag(tag);
                            }}
                          >
                            <Badge
                              variant="secondary"
                              className="border border-border/50 bg-background/70 font-sans text-[11px] hover:border-primary/60"
                            >
                              {tag}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:block" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-border/70 bg-muted/30 p-6 text-sm text-muted-foreground">
          {labels.noResults}
        </div>
      )}
    </section>
  );
}
