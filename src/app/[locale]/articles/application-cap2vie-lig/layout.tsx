import { ArticlePageLayout } from "@/components/article-page-layout";
import { notFound } from "next/navigation";
import { parseLocale } from "@/lib/i18n";

export default async function Cap2VieLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();

  return (
    <ArticlePageLayout locale={loc} slug="application-cap2vie-lig">
      {children}
    </ArticlePageLayout>
  );
}
