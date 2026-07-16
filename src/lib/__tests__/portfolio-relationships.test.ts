import { describe, expect, it } from "vitest";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";

describe("portfolio relationships", () => {
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
