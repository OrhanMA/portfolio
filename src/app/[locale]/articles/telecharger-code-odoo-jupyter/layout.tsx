import { ArticlePageLayout } from "../[slug]/layout";

export default async function DownloadOdooSourceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="telecharger-code-odoo-jupyter">
      {children}
    </ArticlePageLayout>
  );
}
