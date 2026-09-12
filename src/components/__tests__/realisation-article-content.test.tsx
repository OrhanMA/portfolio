import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  parseRealisationContent,
  RealisationArticleContent,
} from "@/components/realisation-article-content";
import { realisations, type Realisation } from "@/lib/realisations";

const contentFields = [
  "presentation",
  "objectives",
  "risks",
  "steps",
  "actors",
  "results",
  "aftermath",
  "critique",
] as const satisfies readonly (keyof Realisation)[];

describe("RealisationArticleContent", () => {
  it("turns numbered paragraphs into a scannable semantic list", () => {
    render(
      <RealisationArticleContent
        text={
          "1. **A clear milestone.** The complete explanation remains visible.\n\n2. **A second milestone.** Its supporting detail is preserved too."
        }
      />,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "A clear milestone." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The complete explanation remains visible."),
    ).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  it("keeps unnumbered editorial paragraphs as readable prose", () => {
    render(
      <RealisationArticleContent
        text={"First complete paragraph.\n\nSecond paragraph with **important context**."}
      />,
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("First complete paragraph.")).toBeInTheDocument();
    expect(screen.getByText("important context").tagName).toBe("STRONG");
  });

  it("parses every French and English achievement section without losing content", () => {
    for (const realisation of realisations) {
      for (const field of contentFields) {
        const localizedContent = realisation[field];
        if (!localizedContent || typeof localizedContent === "string") continue;

        for (const locale of ["fr", "en"] as const) {
          const source = localizedContent[locale].trim();
          const reconstructed = parseRealisationContent(source)
            .map((block) =>
              block.kind === "paragraph"
                ? block.text
                : `${block.number}. **${block.title}** ${block.body}`,
            )
            .join("\n\n");

          expect(reconstructed).toBe(source);
        }
      }
    }
  });

  it("uses alphabetic markers for every numbered achievement section", () => {
    for (const realisation of realisations) {
      for (const field of contentFields) {
        const localizedContent = realisation[field];
        if (!localizedContent || typeof localizedContent === "string") continue;

        for (const locale of ["fr", "en"] as const) {
          const blocks = parseRealisationContent(localizedContent[locale]);
          if (!blocks.every((block) => block.kind === "numbered")) continue;

          const { container, unmount } = render(
            <RealisationArticleContent text={localizedContent[locale]} locale={locale} />,
          );

          const markers = Array.from(
            container.querySelectorAll("ol[type='a'] > li > span[aria-hidden='true']"),
            (marker) => marker.textContent,
          );

          expect(markers).toEqual(
            blocks.map((_, index) => String.fromCharCode("a".charCodeAt(0) + index)),
          );

          unmount();
        }
      }
    }
  });
});
