import { describe, expect, it } from "vitest";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { competences } from "@/lib/competences";
import { assertPortfolioIntegrity } from "@/lib/portfolio-integrity";
import { realisations } from "@/lib/realisations";

describe("portfolio relationships", () => {
  it("keeps the required portfolio grid complete", () => {
    expect(competences).toHaveLength(10);
    expect(realisations).toHaveLength(5);

    for (const competence of competences) {
      expect(
        competence.linkedRealisations.length,
        `${competence.slug} must be evidenced by at least one achievement`,
      ).toBeGreaterThan(0);
    }

    for (const realisation of realisations) {
      expect(
        realisation.linkedCompetences.length,
        `${realisation.slug} must demonstrate at least one skill`,
      ).toBeGreaterThan(0);
      expect(realisation.risks, `${realisation.slug} must describe its difficulties`).toBeDefined();

      for (const locale of ["fr", "en"] as const) {
        for (const section of [
          "presentation",
          "objectives",
          "risks",
          "steps",
          "actors",
          "results",
          "aftermath",
          "critique",
        ] as const) {
          expect(
            realisation[section]?.[locale].trim().length,
            `${realisation.slug}.${section}.${locale} must be substantive`,
          ).toBeGreaterThanOrEqual(180);
        }
      }
    }
  });

  it("keeps canonical catalog identifiers unique and URL-safe", async () => {
    const dictionary = await getDictionary("fr");
    const ids = dictionary.experience.entries.map(({ id }) => id);
    const competenceSlugs = competences.map(({ slug }) => slug);
    const realisationSlugs = realisations.map(({ slug }) => slug);
    const articleSlugs = dictionary.articles.articlesData.map(({ slug }) => slug);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(competenceSlugs).size).toBe(competenceSlugs.length);
    expect(new Set(realisationSlugs).size).toBe(realisationSlugs.length);
    expect(new Set(articleSlugs).size).toBe(articleSlugs.length);

    for (const slug of [
      ...competenceSlugs,
      ...realisationSlugs,
      ...articleSlugs,
    ]) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }

    for (const article of dictionary.articles.articlesData) {
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(`${article.date}T00:00:00.000Z`))).toBe(
        false,
      );
    }
  });

  it("keeps competence and realisation links reciprocal", () => {
    for (const competence of competences) {
      for (const realisationSlug of competence.linkedRealisations) {
        const realisation = realisations.find(
          (item) => item.slug === realisationSlug,
        );

        expect(
          realisation,
          `Unknown realisation ${realisationSlug} linked from ${competence.slug}`,
        ).toBeDefined();
        expect(realisation?.linkedCompetences).toContain(competence.slug);
      }
    }

    for (const realisation of realisations) {
      for (const competenceSlug of realisation.linkedCompetences) {
        const competence = competences.find(
          (item) => item.slug === competenceSlug,
        );

        expect(
          competence,
          `Unknown competence ${competenceSlug} linked from ${realisation.slug}`,
        ).toBeDefined();
        expect(competence?.linkedRealisations).toContain(realisation.slug);
      }
    }
  });

  it("resolves every experience relation through the canonical catalogs", async () => {
    for (const locale of ["fr", "en"] as const) {
      const dictionary = await getDictionary(locale);
      expect(() =>
        assertPortfolioIntegrity({
          competences,
          realisations,
          experiences: dictionary.experience.entries,
        }),
      ).not.toThrow();

      for (const realisation of realisations) {
        expect(
          dictionary.experience.entries.some((entry) =>
            entry.linkedRealisations?.includes(realisation.slug),
          ),
          `${locale}: ${realisation.slug} must have a linked experience`,
        ).toBe(true);
      }
    }
  });

  it("keeps the current portfolio article count accurate", () => {
    const portfolio = realisations.find(
      (item) => item.slug === "portfolio-professionnel",
    );

    expect(portfolio?.results.fr).toContain("six articles publiés");
    expect(portfolio?.results.en).toContain("six published articles");
  });
});
