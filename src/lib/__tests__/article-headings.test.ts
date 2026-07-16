import { describe, expect, it } from "vitest";
import { extractArticleHeadings } from "@/lib/article-headings";

describe("extractArticleHeadings", () => {
  it("creates stable anchors from MDX headings", () => {
    expect(
      extractArticleHeadings(`
## Contexte métier
### [Migration progressive](https://example.com)
\`\`\`md
## Not a section
\`\`\`
## Contexte métier
`),
    ).toEqual([
      { id: "contexte-metier", text: "Contexte métier", level: 2 },
      {
        id: "migration-progressive",
        text: "Migration progressive",
        level: 3,
      },
      { id: "contexte-metier-2", text: "Contexte métier", level: 2 },
    ]);
  });
});
