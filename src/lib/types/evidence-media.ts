import type { LocalizedContent } from "@/lib/types/content";

export type EvidenceMedia = {
  type: "image" | "youtube";
  src: string;
  title: LocalizedContent;
  description: LocalizedContent;
  layout?: "standard" | "wide";
};
