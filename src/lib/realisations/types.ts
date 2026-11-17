import type { LocalizedContent } from "@/lib/types/content";
import type { EvidenceMedia } from "@/lib/types/evidence-media";

export type RealisationSectionId =
  | "presentation"
  | "objectives"
  | "risks"
  | "steps"
  | "actors"
  | "results"
  | "aftermath"
  | "critique";

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
  contextualCompetences?: Partial<Record<RealisationSectionId, string[]>>;
  media?: RealisationMedia[];
};

export type RealisationSummary = {
  context: LocalizedContent;
  challenge: LocalizedContent;
  role: LocalizedContent;
  decision: LocalizedContent;
  result: LocalizedContent;
  proof: LocalizedContent;
};

export type RealisationMedia = EvidenceMedia;
