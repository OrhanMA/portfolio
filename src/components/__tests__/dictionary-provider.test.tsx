import { describe, it, expect } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import {
  DictionaryProvider,
  useDictionary,
} from "@/components/dictionary-provider";
import frDict from "@/app/[locale]/dictionaries/fr.json";

describe("DictionaryProvider", () => {
  it("renders children", () => {
    render(
      <DictionaryProvider dictionary={frDict}>
        <p>Hello</p>
      </DictionaryProvider>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});

describe("useDictionary()", () => {
  it("returns dictionary when inside DictionaryProvider", () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: ({ children }) => (
        <DictionaryProvider dictionary={frDict}>{children}</DictionaryProvider>
      ),
    });

    expect(result.current.cookies.title).toBe(frDict.cookies.title);
  });

  it("throws when used outside DictionaryProvider", () => {
    expect(() => {
      renderHook(() => useDictionary());
    }).toThrow("useDictionary must be used within a DictionaryProvider");
  });
});
