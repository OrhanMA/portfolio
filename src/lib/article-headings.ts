export type ArticleHeading = {
  id: string;
  text: string;
  level: number;
};

function braceDelta(value: string) {
  return (
    (value.match(/{/g)?.length ?? 0) -
    (value.match(/}/g)?.length ?? 0)
  );
}

function hasEsmContinuation(line: string, braceDepth: number) {
  if (braceDepth > 0) return true;
  return /(?:[,=([{]|=>|\\)$/.test(line.trim());
}

/** Removes leading MDX ESM statements without treating article prose as code. */
export function stripMdxEsm(content: string) {
  const lines = content.split("\n");
  const output: string[] = [];
  let inEsm = false;
  let esmBraceDepth = 0;
  let seenContent = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (inEsm) {
      esmBraceDepth += braceDelta(line);
      if (esmBraceDepth <= 0 && !hasEsmContinuation(line, esmBraceDepth)) {
        inEsm = false;
      }
      continue;
    }

    if (!seenContent && /^(?:import|export)\b/.test(trimmed)) {
      esmBraceDepth = braceDelta(line);
      inEsm = hasEsmContinuation(line, esmBraceDepth);
      continue;
    }

    if (trimmed) {
      seenContent = true;
    }
    output.push(line);
  }

  return output.join("\n");
}

export function slugifyHeading(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function stripHeadingMarkup(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[\*_`]/g, "")
    .replace(/\s+#+$/, "")
    .trim();
}

/** Creates the same duplicate-safe IDs for server-extracted and rendered headings. */
export function createHeadingIdResolver() {
  const occurrences = new Map<string, number>();
  const usedIds = new Set<string>();

  return (value: string) => {
    const text = stripHeadingMarkup(value);
    const baseId = slugifyHeading(text);
    if (!baseId) {
      return undefined;
    }

    let occurrence = occurrences.get(baseId) ?? 0;
    let id = baseId;
    do {
      occurrence += 1;
      id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;
    } while (usedIds.has(id));

    occurrences.set(baseId, occurrence);
    usedIds.add(id);
    return id;
  };
}

/** Extracts stable, anchor-safe headings from an MDX source file. */
export function extractArticleHeadings(content: string): ArticleHeading[] {
  const getHeadingId = createHeadingIdResolver();

  return stripMdxEsm(content)
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) {
        return [];
      }

      const text = stripHeadingMarkup(match[2]);
      const id = getHeadingId(text);
      if (!id) {
        return [];
      }

      return [{
        id,
        text,
        level: match[1].length,
      }];
    });
}

/**
 * Pairs equivalent translated headings by their document order.
 *
 * A map is only emitted when both localized articles keep the same heading
 * structure. Falling back to the original fragment is safer than sending a
 * reader to the wrong section when the two documents diverge.
 */
export function createLocalizedHeadingMap(
  sourceContent: string,
  targetContent: string,
) {
  const sourceHeadings = extractArticleHeadings(sourceContent);
  const targetHeadings = extractArticleHeadings(targetContent);

  if (
    sourceHeadings.length !== targetHeadings.length ||
    sourceHeadings.some(
      (heading, index) => heading.level !== targetHeadings[index]?.level,
    )
  ) {
    return {};
  }

  return Object.fromEntries(
    sourceHeadings.map((heading, index) => [
      heading.id,
      targetHeadings[index].id,
    ]),
  );
}
