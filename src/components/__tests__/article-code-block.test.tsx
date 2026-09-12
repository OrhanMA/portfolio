import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ArticleCodeBlock,
  ArticleCodeLabelsProvider,
} from "@/components/article-code-block";
import { renderWithProviders, screen, userEvent } from "@/test/utils";

const writeTextMock = vi.fn();

const labels = {
  copyCode: "Copier le code",
  codeCopied: "Code copié",
  codeBlock: "Bloc de code",
};

describe("ArticleCodeBlock", () => {
  beforeEach(() => {
    writeTextMock.mockReset();
  });

  function mockClipboard() {
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        ...window.navigator,
        clipboard: { writeText: writeTextMock },
      },
    });
  }

  it("copies the full code block and confirms the action", async () => {
    writeTextMock.mockResolvedValue(undefined);
    const user = userEvent.setup();
    mockClipboard();

    renderWithProviders(
      <ArticleCodeLabelsProvider labels={labels}>
        <ArticleCodeBlock>
          <code>{"SELECT key, value\nFROM ir_config_parameter;"}</code>
        </ArticleCodeBlock>
      </ArticleCodeLabelsProvider>,
    );

    await user.click(screen.getByRole("button", { name: labels.copyCode }));

    expect(writeTextMock).toHaveBeenCalledWith(
      "SELECT key, value\nFROM ir_config_parameter;",
    );
    expect(
      await screen.findByRole("button", { name: labels.codeCopied }),
    ).toBeInTheDocument();
  });
});
