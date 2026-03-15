import { render, type RenderOptions } from "@testing-library/react";
import { DictionaryProvider } from "@/components/dictionary-provider";
import frDict from "@/app/[locale]/dictionaries/fr.json";
import enDict from "@/app/[locale]/dictionaries/en.json";

type Dictionary = typeof frDict;

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: "fr" | "en";
  dictionary?: Dictionary;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { locale = "fr", dictionary, ...options }: CustomRenderOptions = {}
) {
  const dict = dictionary ?? (locale === "fr" ? frDict : enDict);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <DictionaryProvider dictionary={dict}>{children}</DictionaryProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export { frDict, enDict };
export { screen, waitFor, within, act } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
