export type ArticleHeading = {
  id: string;
  text: string;
  level: number;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripHeadingMarkup(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[\*_`]/g, "")
    .replace(/\s+#+$/, "")
    .trim();
}

/** Extracts stable, anchor-safe headings from an MDX source file. */
export function extractArticleHeadings(content: string): ArticleHeading[] {
  const occurrences = new Map<string, number>();

  return content
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) {
        return [];
      }

      const text = stripHeadingMarkup(match[2]);
      const baseId = slugify(text);
      if (!baseId) {
        return [];
      }

      const occurrence = (occurrences.get(baseId) ?? 0) + 1;
      occurrences.set(baseId, occurrence);

      return [{
        id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
        text,
        level: match[1].length,
      }];
    });
}
