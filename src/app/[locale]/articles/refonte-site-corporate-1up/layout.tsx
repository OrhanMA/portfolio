import { ArticlePageLayout } from "../[slug]/layout";

export default async function CorporateRedesignLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="refonte-site-corporate-1up">
      {children}
    </ArticlePageLayout>
  );
}
