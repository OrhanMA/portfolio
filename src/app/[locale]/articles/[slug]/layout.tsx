import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleCodeLabelsProvider } from "@/components/article-code-block";
import { ArticleEnhancements } from "@/components/article-enhancements";
import { ArticleStructuredData } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { extractArticleHeadings } from "@/lib/article-headings";
import { estimateReadingMinutes, getArticleContent } from "@/lib/articles";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getLocalizedPageContext } from "../../route-context";

export async function ArticlePageLayout({
  children,
  locale,
  slug,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
  slug: string;
}>) {
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);
  const articleIndex = dict.articles.articlesData.findIndex(
    (article) => article.slug === slug,
  );
  const article = dict.articles.articlesData[articleIndex];

  if (!article) {
    notFound();
  }

  const [articleContent, requestHeaders] = await Promise.all([
    getArticleContent(article.slug),
    headers(),
  ]);
  const readingMinutes = estimateReadingMinutes(articleContent);
  const publishedAt = new Intl.DateTimeFormat(
    loc === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(`${article.date}T12:00:00`));
  const nonce = requestHeaders.get("x-nonce") ?? undefined;

  return (
    <div>
      <ArticleStructuredData
        locale={loc}
        slug={article.slug}
        headline={article.title}
        description={article.description}
        datePublished={article.date}
        tags={article.tags}
        nonce={nonce}
      />

      <header
        data-article-masthead
        className="article-masthead border-b border-border px-4 pb-9 pt-24 sm:px-6 sm:pb-11 lg:px-8 lg:pt-28"
      >
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 text-sm font-bold text-foreground/65 transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {dict.nav.articles}
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="editorial-index">
                {dict.nav.articles} · {String(articleIndex + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-foreground/72 sm:text-lg sm:leading-8">
                {article.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <time
                dateTime={article.date}
                className="border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {publishedAt}
              </time>
              <span className="border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {dict.articles.readingTime} · {readingMinutes} {dict.articles.minuteShort}
              </span>
            </div>
          </div>

          {article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="border border-border/60 bg-background/70">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

      </header>

      <section className="bg-muted/35 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <article
          data-article-content
          className="article-content prose prose-neutral mx-auto max-w-7xl dark:prose-invert prose-headings:scroll-mt-28 prose-headings:text-foreground prose-h1:mb-10 prose-h1:mt-0 prose-h1:max-w-5xl prose-h1:text-balance prose-h1:text-5xl prose-h1:font-semibold prose-h1:leading-[0.95] prose-h1:tracking-[-0.05em] sm:prose-h1:text-6xl lg:prose-h1:text-7xl prose-h2:mt-16 prose-h2:border-t prose-h2:border-border prose-h2:pt-10 prose-h2:text-3xl prose-h2:font-semibold prose-h2:leading-tight prose-h2:tracking-[-0.03em] sm:prose-h2:text-4xl prose-h3:text-xl prose-h3:font-semibold prose-h3:tracking-[-0.02em] prose-p:text-[1.025rem] prose-p:leading-8 prose-p:text-foreground/78 sm:prose-p:text-[1.0625rem] prose-strong:text-foreground prose-li:my-2 prose-li:text-foreground/78 prose-li:marker:text-foreground prose-a:font-semibold prose-a:text-foreground prose-a:decoration-foreground/45 prose-a:underline-offset-4 hover:prose-a:decoration-foreground prose-blockquote:border-l-2 prose-blockquote:border-foreground prose-blockquote:bg-muted prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:font-medium prose-blockquote:text-foreground prose-hr:border-border prose-table:block prose-table:overflow-x-auto prose-th:border-b prose-th:border-border prose-th:px-3 prose-th:py-3 prose-th:text-foreground prose-td:border-b prose-td:border-border/70 prose-td:px-3 prose-td:py-3 prose-img:border prose-img:border-border [&>:not(.not-prose)]:mx-auto [&>:not(.not-prose)]:max-w-3xl"
        >
          <ArticleEnhancements
            locale={loc}
            slug={article.slug}
            articles={dict.articles.articlesData}
            headings={extractArticleHeadings(articleContent)}
            readingMinutes={readingMinutes}
            labels={{
              readingTime: dict.articles.readingTime,
              minuteShort: dict.articles.minuteShort,
              tableOfContents: dict.articles.tableOfContents,
              relatedArticles: dict.articles.relatedArticles,
              copyLink: dict.articles.copyLink,
              copied: dict.articles.copied,
              frenchOnlyNotice: dict.articles.frenchOnlyNotice,
            }}
          />
          <ArticleCodeLabelsProvider
            labels={{
              copyCode: dict.articles.copyCode,
              codeCopied: dict.articles.codeCopied,
            }}
          >
            {children}
          </ArticleCodeLabelsProvider>
        </article>
      </section>
    </div>
  );
}

export default async function ArticleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;

  return (
    <ArticlePageLayout locale={locale} slug={slug}>
      {children}
    </ArticlePageLayout>
  );
}
