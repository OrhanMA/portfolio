import type { LocalizedContent } from "@/lib/types/content";

export type CompetenceType = "human" | "technical";

export type CompetenceLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export type Anecdote = {
  title: LocalizedContent;
  content: LocalizedContent;
  result: LocalizedContent;
  linkedRealisation?: string; // slug of linked realisation
};

export type CompetenceNews = {
  date: string;
  dateLabel: LocalizedContent;
  title: LocalizedContent;
  summary: LocalizedContent;
  source: string;
  href: string;
};

export type Competence = {
  slug: string;
  title: LocalizedContent;
  type: CompetenceType;
  level: CompetenceLevel;
  /** 0–100, used for radar chart */
  radarValue: number;
  icon: string;
  definition: LocalizedContent;
  relatedNews: CompetenceNews;
  anecdotes: Anecdote[];
  selfCritique: {
    level: LocalizedContent;
    importance: LocalizedContent;
    acquisitionSpeed?: LocalizedContent;
    advice: LocalizedContent;
  };
  evolution: {
    goal: LocalizedContent;
    training: LocalizedContent;
  };
  linkedRealisations: string[];
};
