import { ArticlePageLayout } from "../[slug]/layout";

export default async function Cap2VieLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="application-cap2vie-lig">
      {children}
    </ArticlePageLayout>
  );
}
