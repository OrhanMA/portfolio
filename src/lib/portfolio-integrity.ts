import type { Competence } from "@/lib/competences";
import type { Realisation } from "@/lib/realisations";
import { findLinkedExperiences } from "@/lib/experience";

export type PortfolioExperienceEntry = {
  id: string;
  linkedRealisations?: readonly string[];
  linkedCompetences?: readonly string[];
};

type PortfolioIntegrityInput = {
  competences: readonly Competence[];
  realisations: readonly Realisation[];
  experiences: readonly PortfolioExperienceEntry[];
};

/**
 * Validates the cross-catalog relations required by the portfolio.
 *
 * A realisation must be attached to an experience, and every relation must
 * point to an existing canonical competence or realisation. Keeping this
 * check at the content boundary makes a broken editorial reference fail with
 * its source slug instead of much later in a page render.
 */
export function assertPortfolioIntegrity({
  competences,
  realisations,
  experiences,
}: PortfolioIntegrityInput) {
  const competenceSlugs = new Set(competences.map(({ slug }) => slug));
  const realisationSlugs = new Set(realisations.map(({ slug }) => slug));
  const errors: string[] = [];

  for (const competence of competences) {
    if (competence.linkedRealisations.length === 0) {
      errors.push(
        `Competence ${competence.slug} must reference at least one realisation`,
      );
    }

    for (const realisationSlug of competence.linkedRealisations) {
      if (!realisationSlugs.has(realisationSlug)) {
        errors.push(
          `Competence ${competence.slug} references unknown realisation ${realisationSlug}`,
        );
      }
    }
  }

  for (const realisation of realisations) {
    if (realisation.linkedCompetences.length === 0) {
      errors.push(
        `Realisation ${realisation.slug} must reference at least one competence`,
      );
    }

    if (findLinkedExperiences(experiences, realisation.slug).length === 0) {
      errors.push(
        `Realisation ${realisation.slug} must reference at least one experience`,
      );
    }

    for (const competenceSlug of realisation.linkedCompetences) {
      if (!competenceSlugs.has(competenceSlug)) {
        errors.push(
          `Realisation ${realisation.slug} references unknown competence ${competenceSlug}`,
        );
      }
    }
  }

  for (const experience of experiences) {
    for (const realisationSlug of experience.linkedRealisations ?? []) {
      if (!realisationSlugs.has(realisationSlug)) {
        errors.push(
          `Experience ${experience.id} references unknown realisation ${realisationSlug}`,
        );
      }
    }

    for (const competenceSlug of experience.linkedCompetences ?? []) {
      if (!competenceSlugs.has(competenceSlug)) {
        errors.push(
          `Experience ${experience.id} references unknown competence ${competenceSlug}`,
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Portfolio content integrity failed:\n- ${errors.join("\n- ")}`);
  }
}
