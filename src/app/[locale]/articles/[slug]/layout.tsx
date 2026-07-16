import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleEnhancements } from "@/components/article-enhancements";
import { ArticleStructuredData } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { extractArticleHeadings } from "@/lib/article-headings";
import { estimateReadingMinutes, getArticleContent } from "@/lib/articles";
import { parseLocale } from "@/lib/i18n";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getDictionary } from "../../dictionaries";

export async function ArticlePageLayout({
  children,
  locale,
  slug,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
  slug: string;
}>) {
  const loc = parseLocale(locale);

  if (!loc) {
    notFound();
  }

  const dict = await getDictionary(loc);
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
        className="article-masthead relative isolate overflow-hidden border-b border-foreground/15 px-4 pb-9 pt-24 sm:px-6 sm:pb-11 lg:px-8 lg:pt-28"
      >
        <div className="absolute inset-0 -z-20 bg-primary/[0.025]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_28%,color-mix(in_oklch,var(--vermillion)_20%,transparent)_0_1px,transparent_1.4px)] bg-[size:7px_7px] opacity-45" />
        <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-vermillion/90 sm:h-80 sm:w-80" />

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
                className="rounded-full border border-foreground/15 bg-background/65 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
              >
                {publishedAt}
              </time>
              <span className="rounded-full border border-foreground/15 bg-background/65 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
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

        <div className="absolute bottom-0 left-0 h-1 w-28 bg-primary sm:w-44" />
        <div className="absolute bottom-0 left-28 h-1 w-8 bg-vermillion sm:left-44" />
      </header>

      <section className="section-tinted px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <article
          data-article-content
          className="article-content prose prose-neutral mx-auto max-w-7xl dark:prose-invert prose-headings:scroll-mt-28 prose-headings:text-foreground prose-h1:mb-10 prose-h1:mt-0 prose-h1:max-w-5xl prose-h1:text-balance prose-h1:text-5xl prose-h1:font-black prose-h1:uppercase prose-h1:leading-[0.86] prose-h1:tracking-[-0.055em] sm:prose-h1:text-6xl lg:prose-h1:text-7xl prose-h2:mt-16 prose-h2:border-t prose-h2:border-border/70 prose-h2:pt-10 prose-h2:text-3xl prose-h2:font-black prose-h2:leading-tight prose-h2:tracking-[-0.035em] sm:prose-h2:text-4xl prose-h3:text-xl prose-h3:font-bold prose-h3:tracking-[-0.02em] prose-p:text-[1.025rem] prose-p:leading-8 prose-p:text-foreground/78 sm:prose-p:text-[1.0625rem] prose-strong:text-foreground prose-li:my-2 prose-li:text-foreground/78 prose-li:marker:text-primary prose-a:font-semibold prose-a:text-primary prose-a:decoration-primary/45 prose-a:underline-offset-4 hover:prose-a:decoration-primary prose-blockquote:border-l-4 prose-blockquote:border-vermillion prose-blockquote:bg-vermillion/[0.04] prose-blockquote:px-6 prose-blockquote:py-1 prose-blockquote:font-medium prose-blockquote:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-foreground prose-pre:p-0 prose-pre:shadow-[6px_7px_0_color-mix(in_oklch,var(--primary)_12%,transparent)] dark:prose-pre:bg-card dark:prose-pre:shadow-[6px_7px_0_color-mix(in_oklch,var(--primary)_16%,transparent)] prose-pre:code:block prose-pre:code:overflow-x-auto prose-pre:code:bg-transparent prose-pre:code:p-5 prose-pre:code:text-inherit prose-hr:border-border prose-table:block prose-table:overflow-x-auto prose-th:border-b prose-th:border-border prose-th:px-3 prose-th:py-3 prose-th:text-foreground prose-td:border-b prose-td:border-border/70 prose-td:px-3 prose-td:py-3 prose-img:rounded-xl prose-img:border prose-img:border-border [&>:not(.not-prose)]:mx-auto [&>:not(.not-prose)]:max-w-3xl"
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
          {children}
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
