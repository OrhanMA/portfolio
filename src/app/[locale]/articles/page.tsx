import Link from "next/link";
import { ArrowUpRight, BookOpenText } from "lucide-react";
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

      <div className="mt-10 grid gap-4">
        {dict.articles.articlesData.map(
          (
            article: {
            slug: string;
            title: string;
            description: string;
            date: string;
            tags?: string[];
          },
            index: number,
          ) => (
            <Link
              key={article.slug}
              href={`/${locale}/articles/${article.slug}`}
              className="no-underline"
            >
              <Card className="group premium-card my-0 border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <CardHeader className="grid gap-5 sm:grid-cols-[72px_1fr_auto] sm:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md border border-border/70 bg-background text-primary">
                    <BookOpenText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        0{index + 1}
                      </span>
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
                    <CardTitle className="text-2xl leading-tight tracking-normal">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-2xl leading-6">
                      {article.description}
                    </CardDescription>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="border border-border/50 bg-background/70 font-mono text-[11px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:block" />
                </CardHeader>
              </Card>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
