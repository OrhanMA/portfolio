import { describe, expect, it } from "vitest";
import { competences } from "@/lib/competences";
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

  it("keeps the current portfolio article count accurate", () => {
    const portfolio = realisations.find(
      (item) => item.slug === "portfolio-professionnel",
    );

    expect(portfolio?.results.fr).toContain("6 articles publiés");
    expect(portfolio?.results.en).toContain("6 published articles");
  });
});
