import { describe, expect, it } from "vitest";
import { getDictionary } from "@/app/[locale]/dictionaries";
import {
  buildArticleIndex,
  estimateReadingMinutes,
  getArticleContent,
  stripMdxForSearch,
} from "@/lib/articles";

describe("article indexing helpers", () => {
  it("strips markdown and keeps article text searchable", () => {
    const text = stripMdxForSearch(`
# Titre

Un [lien utile](https://example.com) avec du \`code\`.

\`\`\`ts
const secret = "ignored";
\`\`\`
`);

    expect(text).toContain("Titre");
    expect(text).toContain("lien utile");
    expect(text).toContain("code");
    expect(text).not.toContain("secret");
    expect(text).not.toContain("https://example.com");
  });

  it("does not index MDX implementation details", () => {
    const text = stripMdxForSearch(
      [
        'import { getArticleMetadata } from "../article-metadata";',
        "",
        "export async function generateMetadata() {",
        '  return getArticleMetadata("fr", "fixture");',
        "}",
        "",
        "# Article public",
        "",
        "Le contenu à rechercher.",
      ].join("\n"),
    );

    expect(text).toContain("Article public");
    expect(text).toContain("Le contenu à rechercher");
    expect(text).not.toContain("getArticleMetadata");
    expect(text).not.toContain("generateMetadata");
  });

  it("estimates at least one minute of reading time", () => {
    expect(estimateReadingMinutes("Court article")).toBe(1);
  });

  it("indexes real MDX article content for article search", async () => {
    const index = await buildArticleIndex([
      {
        slug: "application-cap2vie-lig",
        title: "CAP2vie",
        description: "Application de trajectoires de vie.",
        date: "2026-05-13",
        tags: ["Vue.js", "D3.js", "Recherche"],
      },
    ]);

    expect(index).toHaveLength(1);
    expect(index[0].readingMinutes).toBeGreaterThan(1);
    expect(index[0].searchText).toContain("questionnaire");
    expect(index[0].searchText).toContain("multi");
    expect(index[0].searchText).toContain("D3.js");
  });

  it("keeps every published dictionary article backed by an MDX file", async () => {
    for (const locale of ["fr", "en"] as const) {
      const dictionary = await getDictionary(locale);

      await expect(
        buildArticleIndex(dictionary.articles.articlesData, locale),
      ).resolves.toHaveLength(dictionary.articles.articlesData.length);
    }
  });

  it("fails explicitly when an indexed article file is missing", async () => {
    await expect(
      buildArticleIndex([
        {
          slug: "missing-published-article",
          title: "Missing article",
          description: "This file should not be silently ignored.",
          date: "2026-05-13",
        },
      ]),
    ).rejects.toThrow(
      "Article content file not found for slug: missing-published-article",
    );
  });

  it("rejects invalid slugs before constructing a filesystem path", async () => {
    await expect(getArticleContent("../outside-article")).rejects.toThrow(
      "Invalid article slug: ../outside-article",
    );
  });

  it("keeps empty content distinguishable from a missing file", () => {
    const content = "";

    expect(content).toBe("");
    expect(stripMdxForSearch(content)).toBe("");
    expect(estimateReadingMinutes(content)).toBe(1);
  });
});
