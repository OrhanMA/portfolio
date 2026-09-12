import { describe, expect, it } from "vitest";
import {
  filterArticleIndex,
  normalizeArticleSearchText,
} from "@/lib/article-search";

const articles = [
  {
    slug: "odoo",
    title: "Migration Odoo",
    description: "Une migration métier.",
    date: "2026-05-13",
    tags: ["Odoo"],
    readingMinutes: 2,
    searchText: "Migration Odoo Une migration métier ERP",
  },
  {
    slug: "docker",
    title: "Images Docker",
    description: "Nettoyage d'images.",
    date: "2026-05-13",
    tags: ["Docker"],
    readingMinutes: 2,
    searchText: "Images Docker Nettoyage d'images",
  },
];

describe("article search helpers", () => {
  it("normalizes accents and case", () => {
    expect(normalizeArticleSearchText("Été ODOO")).toBe("ete odoo");
  });

  it("filters by tag and indexed content", () => {
    expect(filterArticleIndex(articles, { tag: "Odoo" })).toHaveLength(1);
    expect(filterArticleIndex(articles, { query: "metier" })[0]?.slug).toBe(
      "odoo",
    );
  });
});
