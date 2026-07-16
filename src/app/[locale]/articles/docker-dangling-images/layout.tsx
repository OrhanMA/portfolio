import { ArticlePageLayout } from "../[slug]/layout";

export default async function DockerDanglingImagesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <ArticlePageLayout locale={locale} slug="docker-dangling-images">
      {children}
    </ArticlePageLayout>
  );
}
