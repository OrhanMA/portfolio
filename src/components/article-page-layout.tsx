import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleCodeLabelsProvider } from "@/components/article-code-block";
import { ArticleEnhancements } from "@/components/article-enhancements";
import { ArticleStructuredData } from "@/components/structured-data";
import { extractArticleHeadings } from "@/lib/article-headings";
import { estimateReadingMinutes, getArticleContent } from "@/lib/articles";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPageContext } from "@/app/[locale]/route-context";

export async function ArticlePageLayout({
  children,
  locale,
  slug,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
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
      >
        <div>
          <Link
            href={`/${locale}/articles`}
          >
            <ArrowLeft aria-hidden="true" />
            {dict.nav.articles}
          </Link>

          <div>
            <div>
              <p>
                {dict.nav.articles} · {String(articleIndex + 1).padStart(2, "0")}
              </p>
              <p>
                <LinkedText locale={loc}>{article.description}</LinkedText>
              </p>
            </div>

            <div>
              <time
                dateTime={article.date}
              >
                {publishedAt}
              </time>
              <span>
                {dict.articles.readingTime} · {readingMinutes} {dict.articles.minuteShort}
              </span>
            </div>
          </div>

          {article.tags.length > 0 && (
            <div>
              {article.tags.map((tag) => (
                <TopicLink key={tag} label={tag} locale={loc} />
              ))}
            </div>
          )}
        </div>

      </header>

      <section>
        <article
          data-article-content
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
              codeBlock: dict.articles.codeBlock,
            }}
          >
            <div lang="fr" data-article-body>
              {children}
            </div>
          </ArticleCodeLabelsProvider>
        </article>
      </section>
    </div>
  );
}
