"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ArticleHeading } from "@/lib/article-headings";
import type { Locale } from "@/lib/i18n";

type ArticleSummary = {
  slug: string;
  title: string;
  tags: string[];
};

type ArticleEnhancementsProps = {
  locale: Locale;
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
    <aside>
      <div>
        <div>
          <Badge variant="secondary">
            {labels.readingTime} : {readingMinutes} {labels.minuteShort}
          </Badge>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyArticleLink}
        >
          {copied ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
          {copied ? labels.copied : labels.copyLink}
        </Button>
      </div>

      {headings.length > 0 && (
        <nav aria-label={labels.tableOfContents}>
          <p>
            {labels.tableOfContents}
          </p>
          <div>
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
              >
                <Link2 aria-hidden="true" />
                {heading.text}
              </a>
            ))}
          </div>
        </nav>
      )}

      {relatedArticles.length > 0 && (
        <div>
          <p>
            {labels.relatedArticles}
          </p>
          <div>
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
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
