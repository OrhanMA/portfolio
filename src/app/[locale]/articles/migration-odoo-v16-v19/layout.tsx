import { ArticlePageLayout } from "../[slug]/layout";

export default async function OdooMigrationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="migration-odoo-v16-v19">
      {children}
    </ArticlePageLayout>
  );
}
