import { ArticleLinkedText } from "@/components/article-linked-text";
import type { MDXComponents } from "mdx/types";
import { ArticleCodeBlock } from "@/components/article-code-block";
import { createHeadingIdResolver } from "@/lib/article-headings";
import { isValidElement, type ReactNode } from "react";

function getHeadingText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (
    typeof node === "string" ||
    typeof node === "number" ||
    typeof node === "bigint"
  ) {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getHeadingText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getHeadingText(node.props.children);
  }

  return "";
}

export function useMDXComponents(): MDXComponents {
  const getHeadingId = createHeadingIdResolver();

  return {
    pre: ArticleCodeBlock,
    h2: ({ children, ...props }) => (
      <h2 {...props} id={getHeadingId(getHeadingText(children))}>
        <ArticleLinkedText>{children}</ArticleLinkedText>
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} id={getHeadingId(getHeadingText(children))}>
        <ArticleLinkedText>{children}</ArticleLinkedText>
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p {...props}>
        <ArticleLinkedText>{children}</ArticleLinkedText>
      </p>
    ),
    li: ({ children, ...props }) => (
      <li {...props}>
        <ArticleLinkedText>{children}</ArticleLinkedText>
      </li>
    ),
    td: ({ children, ...props }) => (
      <td {...props}>
        <ArticleLinkedText>{children}</ArticleLinkedText>
      </td>
    ),
  };
}
