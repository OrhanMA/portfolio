import { ArticlePageLayout } from "../[slug]/layout";

export default async function OdooSessionTimeoutLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="odoo-session-timeout">
      {children}
    </ArticlePageLayout>
  );
}
