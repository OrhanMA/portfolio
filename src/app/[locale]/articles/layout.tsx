import { ArticleEnhancements } from "@/components/article-enhancements";
import { ArticleStructuredData } from "@/components/structured-data";
import { extractArticleHeadings } from "@/lib/article-headings";
import { estimateReadingMinutes, getArticleContent } from "@/lib/articles";
import { getDictionary } from "../dictionaries";
import { parseLocale } from "@/lib/i18n";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function ArticlesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  const dict = await getDictionary(loc);
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-pathname") ?? "";
  const articleSlug = pathname.match(/\/articles\/([^/]+)\/?$/)?.[1];
  const article = articleSlug
    ? dict.articles.articlesData.find(({ slug }) => slug === articleSlug)
    : undefined;
  const articleContent = article ? await getArticleContent(article.slug) : "";
  const nonce = requestHeaders.get("x-nonce") ?? undefined;

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      {article && (
        <ArticleStructuredData
          locale={loc}
          slug={article.slug}
          headline={article.title}
          description={article.description}
          datePublished={article.date}
          tags={article.tags}
          nonce={nonce}
        />
      )}
      {article ? (
        <article className="prose prose-neutral mx-auto max-w-7xl dark:prose-invert prose-h1:text-balance prose-h1:text-5xl prose-h1:font-black prose-h1:uppercase prose-h1:leading-[0.9] prose-h1:tracking-[-0.05em] prose-h2:font-black prose-h2:tracking-[-0.025em] prose-a:text-primary prose-pre:rounded-lg prose-pre:border prose-pre:border-border [&>:not(.not-prose)]:mx-auto [&>:not(.not-prose)]:max-w-3xl">
          <ArticleEnhancements
            locale={loc}
            slug={article.slug}
            articles={dict.articles.articlesData}
            headings={extractArticleHeadings(articleContent)}
            readingMinutes={estimateReadingMinutes(articleContent)}
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
      ) : (
        children
      )}
    </div>
  );
}
