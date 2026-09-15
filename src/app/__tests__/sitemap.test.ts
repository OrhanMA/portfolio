import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import frDictionary from "@/app/[locale]/dictionaries/fr.json";

describe("sitemap", () => {
  it("derives every localized article URL and publication date from content", async () => {
    const entries = await sitemap();

    for (const locale of ["fr", "en"]) {
      for (const article of frDictionary.articles.articlesData) {
        const entry = entries.find(
          ({ url }) =>
            url ===
            `https://orhanmadiassani.com/${locale}/articles/${article.slug}`,
        );
        expect(entry).toBeDefined();
        expect(entry?.lastModified).toEqual(
          new Date(`${article.date}T00:00:00.000Z`),
        );
      }
    }
  });

  it("does not emit duplicate URLs", async () => {
    const entries = await sitemap();
    const urls = entries.map(({ url }) => url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("publishes the dedicated journey index in both locales", async () => {
    const entries = await sitemap();
    expect(entries.map(({ url }) => url)).toEqual(
      expect.arrayContaining([
        "https://orhanmadiassani.com/fr/parcours",
        "https://orhanmadiassani.com/en/parcours",
      ]),
    );
  });
});
