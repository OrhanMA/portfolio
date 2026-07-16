import { afterEach, describe, expect, it, vi } from "vitest";
import { FontActivation } from "@/components/font-activation";
import { renderWithProviders } from "@/test/utils";

describe("FontActivation", () => {
  afterEach(() => {
    document.documentElement.classList.remove("font-sans-test", "font-mono-test");
    vi.useRealTimers();
  });

  it("defers font classes until the first interaction", async () => {
    renderWithProviders(
      <FontActivation
        loadFonts={async () => ({
          deferredFontClassName: "font-sans-test font-mono-test",
        })}
      />,
    );

    expect(document.documentElement).not.toHaveClass("font-sans-test");
    window.dispatchEvent(new Event("pointerdown"));
    await Promise.resolve();
    expect(document.documentElement).toHaveClass(
      "font-sans-test",
      "font-mono-test",
    );
  });

  it("activates fonts after the fallback timeout", async () => {
    vi.useFakeTimers();
    renderWithProviders(
      <FontActivation
        loadFonts={async () => ({
          deferredFontClassName: "font-sans-test font-mono-test",
        })}
      />,
    );

    await vi.advanceTimersByTimeAsync(5000);
    expect(document.documentElement).toHaveClass(
      "font-sans-test",
      "font-mono-test",
    );
  });
});
