"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ArticleHeading } from "@/lib/article-headings";

type ArticleSummary = {
  slug: string;
  title: string;
  tags: string[];
};

type ArticleEnhancementsProps = {
  locale: string;
  slug: string;
  articles: ArticleSummary[];
  headings: ArticleHeading[];
  readingMinutes: number;
  labels: {
    readingTime: string;
    minuteShort: string;
    tableOfContents: string;
    relatedArticles: string;
    copyLink: string;
    copied: string;
    frenchOnlyNotice: string;
  };
};

export function ArticleEnhancements({
  locale,
  slug,
  articles,
  headings,
  readingMinutes,
  labels,
}: ArticleEnhancementsProps) {
  const [copied, setCopied] = useState(false);

  const currentArticle = useMemo(
    () => articles.find((article) => article.slug === slug),
    [articles, slug],
  );

  const relatedArticles = useMemo(() => {
    if (!currentArticle) {
      return [];
    }

    const currentTags = new Set(currentArticle.tags ?? []);

    return articles
      .filter((article) => article.slug !== currentArticle.slug)
      .map((article) => ({
        article,
        score: (article.tags ?? []).filter((tag) => currentTags.has(tag))
          .length,
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ article }) => article);
  }, [articles, currentArticle]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const article = document.querySelector("article");
    if (!article) {
      return;
    }

    const headingElements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );
    headingElements.forEach((heading, index) => {
      const nextHeading = headings[index];
      if (nextHeading) {
        heading.id = nextHeading.id;
      }
    });
  }, [headings, slug]);

  if (!slug || !currentArticle) {
    return null;
  }

  async function copyArticleLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <aside className="not-prose mx-auto mb-10 grid max-w-3xl gap-4 border border-border bg-card p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {labels.readingTime} : {readingMinutes} {labels.minuteShort}
          </Badge>
          {locale === "en" && (
            <Badge variant="outline">{labels.frenchOnlyNotice}</Badge>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-md"
          onClick={copyArticleLink}
        >
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          {copied ? labels.copied : labels.copyLink}
        </Button>
      </div>

      {headings.length > 0 && (
        <nav aria-label={labels.tableOfContents}>
          <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {labels.tableOfContents}
          </p>
          <div className="flex flex-wrap gap-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border border-border/70 px-2.5 py-1 text-xs text-muted-foreground no-underline transition-colors hover:border-primary/60 hover:text-foreground",
                  heading.level === 3 && "opacity-80",
                )}
              >
                <Link2 aria-hidden="true" className="h-3 w-3" />
                {heading.text}
              </a>
            ))}
          </div>
        </nav>
      )}

      {relatedArticles.length > 0 && (
        <div>
          <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {labels.relatedArticles}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="rounded-md border border-border/70 p-3 text-xs leading-5 text-foreground no-underline transition-colors hover:border-primary/60 hover:bg-muted/50"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
