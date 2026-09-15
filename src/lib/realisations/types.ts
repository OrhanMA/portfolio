import type { LocalizedContent } from "@/lib/types/content";

export type Realisation = {
  slug: string;
  title: LocalizedContent;
  shortDescription: LocalizedContent;
  context: LocalizedContent;
  summary: RealisationSummary;
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

export type RealisationSummary = {
  context: LocalizedContent;
  role: LocalizedContent;
  result: LocalizedContent;
  proof: LocalizedContent;
};

export type RealisationMedia = {
  type: "image" | "youtube";
  src: string;
  title: LocalizedContent;
  description: LocalizedContent;
};
