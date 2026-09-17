import { describe, expect, it } from "vitest";
import {
  createLocalizedHeadingMap,
  createHeadingIdResolver,
  extractArticleHeadings,
  stripMdxEsm,
} from "@/lib/article-headings";

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

  it("uses the same duplicate-safe IDs as rendered MDX headings", () => {
    const getHeadingId = createHeadingIdResolver();

    expect(
      ["Introduction", "Introduction", "Éléments clés"].map(getHeadingId),
    ).toEqual(["introduction", "introduction-2", "elements-cles"]);
  });

  it("removes MDX imports and exports from searchable source", () => {
    const source = [
      'import { getArticleMetadata } from "../article-metadata";',
      "",
      "export async function generateMetadata({ params }) {",
      '  return getArticleMetadata(params.locale, "fixture");',
      "}",
      "",
      "# Article public",
      "",
      "Le contenu reste indexable.",
    ].join("\n");
    const cleaned = stripMdxEsm(source);

    expect(cleaned).not.toContain("getArticleMetadata");
    expect(cleaned).not.toContain("generateMetadata");
    expect(cleaned).toContain("# Article public");
    expect(cleaned).toContain("Le contenu reste indexable.");
  });

  it("does not consume prose after a one-line MDX export", () => {
    const cleaned = stripMdxEsm(
      'export const metadata = {}\n\n# Article\n\nTexte indexable.',
    );

    expect(cleaned).toContain("# Article");
    expect(cleaned).toContain("Texte indexable.");
  });

  it("does not consume prose after an import without a semicolon", () => {
    const cleaned = stripMdxEsm(
      'import { metadata } from "./metadata"\n\n# Article\n\nTexte indexable.',
    );

    expect(cleaned).toContain("# Article");
    expect(cleaned).toContain("Texte indexable.");
  });

  it("keeps ids unique when a heading base is also a generated suffix", () => {
    const getHeadingId = createHeadingIdResolver();

    expect(["Titre", "Titre", "Titre 2"].map(getHeadingId)).toEqual([
      "titre",
      "titre-2",
      "titre-2-2",
    ]);
  });

  it("maps equivalent translated headings by document structure", () => {
    expect(
      createLocalizedHeadingMap(
        "## Contexte\n### Difficulté principale",
        "## Context\n### Main difficulty",
      ),
    ).toEqual({
      contexte: "context",
      "difficulte-principale": "main-difficulty",
    });
  });

  it("does not map headings when translated document structures diverge", () => {
    expect(
      createLocalizedHeadingMap(
        "## Contexte\n### Difficulté principale",
        "## Context\n## Main difficulty",
      ),
    ).toEqual({});
  });
});
