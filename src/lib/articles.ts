import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type {
  ArticleDictionaryItem,
  ArticleIndexItem,
} from "@/lib/types/articles";
import { stripMdxEsm } from "@/lib/article-headings";
import type { Locale } from "@/lib/i18n";

export type { ArticleDictionaryItem, ArticleIndexItem } from "@/lib/types/articles";

const WORDS_PER_MINUTE = 220;
const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function stripMdxForSearch(content: string) {
  return stripMdxEsm(content)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingMinutes(content: string) {
  const words = stripMdxForSearch(content).split(/\s+/).filter(Boolean);

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

/**
 * Reads one published article during the current React render/request cache.
 * Missing or unreadable content is a validation failure, not an empty article.
 */
export const getArticleContent = cache(async (slug: string, locale: Locale = "fr") => {
  if (!ARTICLE_SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid article slug: ${slug}`);
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "articles",
    slug,
    `${locale}.mdx`,
  );

  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    const code = error instanceof Error && "code" in error ? error.code : undefined;
    const reason = code === "ENOENT" ? "file not found" : "could not be read";
    throw new Error(`Article content ${reason} for slug: ${slug}`, {
      cause: error,
    });
  }
});

export async function buildArticleIndex(
  articles: ArticleDictionaryItem[],
  locale: Locale = "fr",
) {
  return Promise.all(
    articles.map(async (article): Promise<ArticleIndexItem> => {
      const tags = article.tags ?? [];
      const content = await getArticleContent(article.slug, locale);
      // An empty file is distinct from a missing file: metadata remains
      // searchable, and estimateReadingMinutes deliberately returns 1.
      const cleanContent = stripMdxForSearch(content);

      return {
        ...article,
        tags,
        readingMinutes: estimateReadingMinutes(content),
        searchText: [
          article.title,
          article.description,
          tags.join(" "),
          cleanContent,
        ].join(" "),
      };
    }),
  );
}
