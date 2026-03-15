import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {dict.articles.heading}
      </h1>
      <p className="mt-2 text-muted-foreground">{dict.articles.subtext}</p>

      <div className="mt-8 space-y-4">
        {dict.articles.articlesData.map(
          (article: {
            slug: string;
            title: string;
            description: string;
            date: string;
            tags?: string[];
          }) => (
            <Link
              key={article.slug}
              href={`/${locale}/articles/${article.slug}`}
              className="no-underline"
            >
              <Card className="border-border/50 bg-card transition-colors hover:bg-muted my-8">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString(
                        locale === "fr" ? "fr-FR" : "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {article.description}
                  </CardDescription>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {article.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
