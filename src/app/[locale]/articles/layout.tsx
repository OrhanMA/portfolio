import { ArticleEnhancements } from "@/components/article-enhancements";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function ArticlesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <article className="prose prose-neutral mx-auto max-w-7xl dark:prose-invert prose-h1:text-balance prose-h1:text-5xl prose-h1:font-black prose-h1:uppercase prose-h1:leading-[0.9] prose-h1:tracking-[-0.05em] prose-h2:font-black prose-h2:tracking-[-0.025em] prose-a:text-primary prose-pre:rounded-lg prose-pre:border prose-pre:border-border [&>:not(.not-prose)]:mx-auto [&>:not(.not-prose)]:max-w-3xl">
        <ArticleEnhancements
          locale={locale}
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
    </main>
  );
}
