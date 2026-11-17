import type { ReactNode } from "react";

export type RealisationContentBlock =
  | {
      kind: "paragraph";
      text: string;
    }
  | {
      kind: "numbered";
      number: number;
      title: string;
      body: string;
    };

const numberedBlockPattern = /^(\d+)\.\s+\*\*(.+?)\*\*\s*([\s\S]*)$/;

export function parseRealisationContent(text: string): RealisationContentBlock[] {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const numberedBlock = block.match(numberedBlockPattern);

      if (!numberedBlock) {
        return { kind: "paragraph", text: block };
      }

      return {
        kind: "numbered",
        number: Number(numberedBlock[1]),
        title: numberedBlock[2],
        body: numberedBlock[3],
      };
    });
}

function renderInlineBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export function RealisationArticleContent({ text }: { text: string }) {
  const blocks = parseRealisationContent(text);
  const isNumberedList = blocks.every((block) => block.kind === "numbered");

  if (!isNumberedList) {
    return (
      <div data-realisation-article-body>
        {blocks.map((block, index) => (
          <p key={index}>
            {renderInlineBold(
              block.kind === "paragraph"
                ? block.text
                : `${block.number}. **${block.title}** ${block.body}`,
            )}
          </p>
        ))}
      </div>
    );
  }

  return (
    <ol type="a" data-realisation-article-body data-realisation-article-list>
      {blocks.map((block, index) => {
        if (block.kind !== "numbered") return null;

        return (
          <li
            key={`${block.number}-${index}`}
            value={block.number}
          >
            <span
              aria-hidden="true"
            >
              {String.fromCharCode("a".charCodeAt(0) + index)}
            </span>
            <div>
              <h3>
                {renderInlineBold(block.title)}
              </h3>
              {block.body && (
                <p>
                  {renderInlineBold(block.body)}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
