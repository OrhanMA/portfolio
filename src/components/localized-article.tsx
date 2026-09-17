import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";

type LocalizedArticleProps = {
  locale: Locale;
  FrenchArticle: ComponentType;
  EnglishArticle: ComponentType;
};

/** Renders the complete article in the locale selected by the route. */
export function LocalizedArticle({
  locale,
  FrenchArticle,
  EnglishArticle,
}: LocalizedArticleProps) {
  const Article = locale === "en" ? EnglishArticle : FrenchArticle;
  return <Article />;
}
