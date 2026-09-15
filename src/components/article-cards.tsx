import Link from "next/link";
import { ArrowUpRight, BookOpenText } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import type { Locale } from "@/lib/i18n";
import type { ArticleIndexItem } from "@/lib/types/articles";

export function formatArticleDate(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    },
  );
}

export function ArticleCards({
  articles,
  locale,
  minuteShort,
  noResults,
}: {
  articles: ArticleIndexItem[];
  locale: Locale;
  minuteShort: string;
  noResults: string;
}) {
  if (articles.length === 0) {
    return (
      <div>
        {noResults}
      </div>
    );
  }

  return (
    <div>
      {articles.map((article, index) => (
        <Card
          key={article.slug}
        >
          <CardHeader>
            <div>
              <BookOpenText />
            </div>
            <div>
              <div>
                <span>
                  0{index + 1}
                </span>
                <span>
                  {formatArticleDate(article.date, locale)}
                </span>
                <span>
                  {article.readingMinutes} {minuteShort}
                </span>
              </div>
              <CardTitle>
                <h2>
                  <Link
                    href={`/${locale}/articles/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </h2>
              </CardTitle>
              <CardDescription>
                <LinkedText locale={locale}>{article.description}</LinkedText>
              </CardDescription>
              {article.tags.length > 0 && (
                <div>
                  {article.tags.map((tag) => (
                    <TopicLink
                      key={tag}
                      label={tag}
                      locale={locale}
                    />
                  ))}
                </div>
              )}
            </div>
            <ArrowUpRight
              aria-hidden="true"
            />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
