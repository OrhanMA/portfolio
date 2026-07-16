"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Copy, Link2 } from "lucide-react";
import frDictionary from "@/app/[locale]/dictionaries/fr.json";
import enDictionary from "@/app/[locale]/dictionaries/en.json";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type ArticleEnhancementsProps = {
  locale: string;
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

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCurrentArticle(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const articleIndex = parts.indexOf("articles");

  return articleIndex >= 0 ? parts[articleIndex + 1] : undefined;
}

export function ArticleEnhancements({
  locale,
  labels,
}: ArticleEnhancementsProps) {
  const pathname = usePathname() ?? "";
  const slug = getCurrentArticle(pathname);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [readingMinutes, setReadingMinutes] = useState(1);
  const [copied, setCopied] = useState(false);

  const articleData =
    locale === "fr"
      ? frDictionary.articles.articlesData
      : enDictionary.articles.articlesData;

  const currentArticle = useMemo(
    () => articleData.find((article) => article.slug === slug),
    [articleData, slug],
  );

  const relatedArticles = useMemo(() => {
    if (!currentArticle) {
      return [];
    }

    const currentTags = new Set(currentArticle.tags ?? []);

    return articleData
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
  }, [articleData, currentArticle]);

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
    const nextHeadings = headingElements.map((heading) => {
      const text = heading.textContent?.trim() ?? "";
      const id = heading.id || slugify(text);

      heading.id = id;

      return {
        id,
        text,
        level: Number(heading.tagName.replace("H", "")),
      };
    });

    const wordCount = (article.textContent ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const frame = window.requestAnimationFrame(() => {
      setHeadings(nextHeadings);
      setReadingMinutes(Math.max(1, Math.ceil(wordCount / 220)));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

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
    <aside className="not-prose premium-card mx-auto mb-10 grid max-w-3xl gap-4 rounded-xl border-l-4 border-l-primary p-4 text-sm">
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
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
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
                <Link2 className="h-3 w-3" />
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
