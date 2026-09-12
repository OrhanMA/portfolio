import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import Link from "next/link";
import { getTopicHref, topicPaths } from "@/lib/topic-links";
import type { Locale } from "@/lib/i18n";

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const canonicalNames = new Map(
  Object.keys(topicPaths).map((name) => [name.toLowerCase(), name]),
);
const names = Object.keys(topicPaths)
  .filter((name) => name.length > 2)
  .sort((a, b) => b.length - a.length);
const mentionPattern = new RegExp(
  `(?<![\\p{L}\\p{N}_])(${names.map(escapeRegExp).join("|")})(?![\\p{L}\\p{N}_])`,
  "giu",
);

/** Only enrich text nodes; preserve existing links, controls and code. */
export function linkTextMentions(
  children: ReactNode,
  locale: Locale,
  currentPath?: string,
): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(mentionPattern).map((part, index) =>
        canonicalNames.has(part.toLowerCase()) ? (
          <Link
            key={index}
            href={getTopicHref(
              canonicalNames.get(part.toLowerCase())!,
              locale,
              currentPath,
            )}
          >
            {part}
          </Link>
        ) : (
          part
        ),
      );
    }
    if (
      !isValidElement<{ children?: ReactNode }>(child) ||
      child.type === Link ||
      (typeof child.type === "string" &&
        ["a", "code", "pre", "button", "svg", "h1"].includes(child.type))
    )
      return child;
    return cloneElement(
      child,
      {},
      linkTextMentions(child.props.children, locale, currentPath),
    );
  });
}

export function LinkedText({
  children,
  locale,
  currentPath,
}: {
  children: ReactNode;
  locale: Locale;
  currentPath?: string;
}) {
  return <>{linkTextMentions(children, locale, currentPath)}</>;
}
