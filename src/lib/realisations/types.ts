import type { LocalizedContent } from "../odoo-projects";

export type Realisation = {
  slug: string;
  title: LocalizedContent;
  shortDescription: LocalizedContent;
  context: LocalizedContent;
  tags: string[];
  presentation: LocalizedContent;
  objectives: LocalizedContent;
  risks?: LocalizedContent;
  steps: LocalizedContent;
  actors: LocalizedContent;
  results: LocalizedContent;
  aftermath: LocalizedContent;
  critique: LocalizedContent;
  linkedCompetences: string[];
  media?: RealisationMedia[];
};

export type RealisationMedia = {
  type: "image" | "youtube";
  src: string;
  title: LocalizedContent;
  description: LocalizedContent;
};
