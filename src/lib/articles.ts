import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type ArticleDictionaryItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type ArticleIndexItem = ArticleDictionaryItem & {
  tags: string[];
  readingMinutes: number;
  searchText: string;
};

const WORDS_PER_MINUTE = 220;

export function stripMdxForSearch(content: string) {
  return content
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

export const getArticleContent = cache(async (slug: string) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "articles",
    slug,
    "page.mdx",
  );

  try {
    return readFile(filePath, "utf8");
  } catch {
    return "";
  }
});

export async function buildArticleIndex(articles: ArticleDictionaryItem[]) {
  return Promise.all(
    articles.map(async (article): Promise<ArticleIndexItem> => {
      const tags = article.tags ?? [];
      const content = await getArticleContent(article.slug);
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
