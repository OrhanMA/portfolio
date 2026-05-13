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
      <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert prose-headings:tracking-normal prose-a:text-primary prose-pre:rounded-lg prose-pre:border prose-pre:border-border">
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
