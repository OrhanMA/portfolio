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
        <strong key={index} className="font-semibold text-foreground">
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
      <div className="mx-auto max-w-[72ch] space-y-6 text-[1.025rem] leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
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
    <ol className="mx-auto max-w-[76ch] divide-y divide-border/70">
      {blocks.map((block) => {
        if (block.kind !== "numbered") return null;

        return (
          <li
            key={block.number}
            value={block.number}
            className="grid gap-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5 sm:py-9"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-11 items-center justify-center rounded-md bg-primary/10 font-sans text-xs font-bold tracking-[0.12em] text-primary"
            >
              {String(block.number).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-pretty text-lg font-bold leading-snug tracking-[-0.015em] text-foreground sm:text-xl">
                {renderInlineBold(block.title)}
              </h3>
              {block.body && (
                <p className="mt-3 text-[1.025rem] leading-[1.85] text-muted-foreground sm:text-[1.0625rem]">
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
