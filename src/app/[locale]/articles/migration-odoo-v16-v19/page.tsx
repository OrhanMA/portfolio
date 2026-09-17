import { notFound } from "next/navigation";
import { LocalizedArticle } from "@/components/localized-article";
import { parseLocale } from "@/lib/i18n";
import { getArticleMetadata } from "../article-metadata";
import FrenchArticle from "./fr.mdx";
import EnglishArticle from "./en.mdx";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getArticleMetadata(locale, "migration-odoo-v16-v19");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = parseLocale(locale);
  if (!loc) notFound();
  return <LocalizedArticle locale={loc} FrenchArticle={FrenchArticle} EnglishArticle={EnglishArticle} />;
}
