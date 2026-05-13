import { describe, expect, it } from "vitest";
import {
  buildArticleIndex,
  estimateReadingMinutes,
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
});
