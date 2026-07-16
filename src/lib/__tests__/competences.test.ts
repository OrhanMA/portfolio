import { describe, expect, it } from "vitest";
import { competences } from "@/lib/competences";

describe("competences", () => {
  it("links every definition to a distinct, dated official source", () => {
    expect(competences).toHaveLength(10);

    const sources = new Set<string>();

    for (const competence of competences) {
      const news = competence.relatedNews;

      expect(news.date, competence.slug).toMatch(/^\d{4}-\d{2}(?:-\d{2})?$/);
      expect(news.href, competence.slug).toMatch(/^https:\/\//);
      expect(news.source, competence.slug).not.toHaveLength(0);
      expect(news.dateLabel.fr, competence.slug).not.toHaveLength(0);
      expect(news.dateLabel.en, competence.slug).not.toHaveLength(0);
      expect(news.title.fr, competence.slug).not.toHaveLength(0);
      expect(news.title.en, competence.slug).not.toHaveLength(0);
      expect(news.summary.fr, competence.slug).not.toHaveLength(0);
      expect(news.summary.en, competence.slug).not.toHaveLength(0);
      expect(sources.has(news.href), competence.slug).toBe(false);

      sources.add(news.href);
    }
  });

  it("keeps every skill article substantial, bilingual, and grounded in achievements", () => {
    for (const competence of competences) {
      expect(competence.definition.fr.length, `${competence.slug} definition.fr`).toBeGreaterThanOrEqual(900);
      expect(competence.definition.en.length, `${competence.slug} definition.en`).toBeGreaterThanOrEqual(750);
      expect(competence.definition.fr, competence.slug).toContain("\n\n");
      expect(competence.definition.en, competence.slug).toContain("\n\n");
      expect(competence.anecdotes, competence.slug).toHaveLength(3);

      for (const anecdote of competence.anecdotes) {
        expect(anecdote.content.fr.length, `${competence.slug} evidence.fr`).toBeGreaterThanOrEqual(450);
        expect(anecdote.content.en.length, `${competence.slug} evidence.en`).toBeGreaterThanOrEqual(400);
        expect(anecdote.result.fr.length, `${competence.slug} result.fr`).toBeGreaterThanOrEqual(180);
        expect(anecdote.result.en.length, `${competence.slug} result.en`).toBeGreaterThanOrEqual(180);
        expect(anecdote.linkedRealisation, competence.slug).toBeDefined();
        expect(competence.linkedRealisations, competence.slug).toContain(
          anecdote.linkedRealisation,
        );
      }

      const selfCritiqueLength = Object.values(competence.selfCritique).reduce(
        (length, value) =>
          length + (value?.fr.length ?? 0) + (value?.en.length ?? 0),
        0,
      );
      const evolutionLength =
        competence.evolution.goal.fr.length +
        competence.evolution.goal.en.length +
        competence.evolution.training.fr.length +
        competence.evolution.training.en.length;

      expect(selfCritiqueLength, `${competence.slug} selfCritique`).toBeGreaterThanOrEqual(1_700);
      expect(evolutionLength, `${competence.slug} evolution`).toBeGreaterThanOrEqual(800);
    }
  });
});
