import { render, type RenderOptions } from "vitest-browser-react";
import { DictionaryProvider } from "@/components/dictionary-provider";
import frDict from "@/app/[locale]/dictionaries/fr.json";
import enDict from "@/app/[locale]/dictionaries/en.json";

type Dictionary = typeof frDict;

interface BrowserRenderOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: "fr" | "en";
  dictionary?: Dictionary;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { locale = "fr", dictionary, ...options }: BrowserRenderOptions = {}
) {
  const dict = dictionary ?? (locale === "fr" ? frDict : enDict);

  return render(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <DictionaryProvider dictionary={dict}>{children}</DictionaryProvider>
    ),
    ...options,
  });
}

export { frDict, enDict };
