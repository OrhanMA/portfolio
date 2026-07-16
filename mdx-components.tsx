import type { MDXComponents } from "mdx/types";
import { ArticleCodeBlock } from "@/components/article-code-block";

export function useMDXComponents(): MDXComponents {
  return {
    pre: ArticleCodeBlock,
  };
}
