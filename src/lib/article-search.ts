import type { ArticleIndexItem } from "@/lib/types/articles";

export function normalizeArticleSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function filterArticleIndex(
  articles: ArticleIndexItem[],
  filters: { tag?: string | null; query?: string },
) {
  const normalizedQuery = normalizeArticleSearchText(
    filters.query?.trim() ?? "",
  );

  return articles.filter((article) => {
    const matchesTag = filters.tag ? article.tags.includes(filters.tag) : true;
    const matchesQuery = normalizedQuery
      ? normalizeArticleSearchText(article.searchText).includes(normalizedQuery)
      : true;

    return matchesTag && matchesQuery;
  });
}
