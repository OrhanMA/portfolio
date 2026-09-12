import { describe, expect, it } from "vitest";
import fr from "@/app/[locale]/dictionaries/fr.json";
import en from "@/app/[locale]/dictionaries/en.json";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";
import { getTopicHref, topicPaths } from "@/lib/topic-links";

const validPaths = new Set([
  "/a-propos",
  "/competences",
  "/realisations",
  "/projects",
  ...competences.map(({ slug }) => `/competences/${slug}`),
  ...realisations.map(({ slug }) => `/realisations/${slug}`),
  ...fr.experience.entries.map(({ id }) => `/parcours/${id}`),
]);

describe("internal topic destinations", () => {
  it.each([
    ["fr", fr],
    ["en", en],
  ] as const)(
    "covers all published tags and existing routes in %s",
    (locale, dictionary) => {
      const tags = new Set([
        ...dictionary.experience.entries.flatMap(({ tags }) => tags),
        ...dictionary.articles.articlesData.flatMap(({ tags }) => tags),
        ...realisations.flatMap(({ tags }) => tags),
      ]);
      for (const label of tags) {
        const href = getTopicHref(label, locale);
        expect(href).toBe(`/${locale}${topicPaths[label]}`);
        expect(validPaths.has(topicPaths[label]), `${label}: ${href}`).toBe(
          true,
        );
      }
    },
  );
  it("keeps all destinations internal and avoids self-links", () => {
    for (const [label, path] of Object.entries(topicPaths)) {
      expect(validPaths.has(path), `${label}: ${path}`).toBe(true);
      const href = getTopicHref(label, "fr", path);
      expect(href).not.toBe(`/fr${path}`);
      expect(validPaths.has(href.slice(3))).toBe(true);
    }
  });
  it("reports missing mappings instead of publishing a broken link", () => {
    expect(() => getTopicHref("Unknown technology", "fr")).toThrow(
      "Missing internal destination",
    );
  });
});
