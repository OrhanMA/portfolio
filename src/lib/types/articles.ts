/**
 * Article metadata shared by the server-side dictionary and the search index.
 * This module must stay free of filesystem, React and Next.js imports so it can
 * be consumed by client components.
 */
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
