import { autonomie } from "./competences/autonomie";
import { perseverance } from "./competences/perseverance";
import { adaptabilite } from "./competences/adaptabilite";
import { ameliorationContinue } from "./competences/amelioration-continue";
import { communication } from "./competences/communication";
import { developpementOdoo } from "./competences/developpement-odoo";
import { developpementBackend } from "./competences/developpement-backend";
import { developpementFrontend } from "./competences/developpement-frontend";
import { devops } from "./competences/devops";
import { python } from "./competences/python";
import type { Competence, CompetenceLevel, CompetenceType } from "./competences/types";
import type { LocalizedContent } from "@/lib/types/content";

export type { Anecdote, Competence, CompetenceLevel, CompetenceNews, CompetenceType } from "./competences/types";

export const competences: Competence[] = [
  autonomie,
  perseverance,
  adaptabilite,
  ameliorationContinue,
  communication,
  developpementOdoo,
  developpementBackend,
  developpementFrontend,
  devops,
  python,
];

export function getCompetenceBySlug(slug: string) {
  return competences.find((competence) => competence.slug === slug);
}

export function getCompetencesByType(type: CompetenceType) {
  return competences.filter((competence) => competence.type === type);
}

export const competenceLevelLabels: Record<
  CompetenceLevel,
  LocalizedContent
> = {
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" },
  expert: { fr: "Expert", en: "Expert" },
};
