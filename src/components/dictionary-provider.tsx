"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/app/[locale]/dictionaries";

export type ClientDictionary = Pick<
  Dictionary,
  "cookies" | "errorPage" | "notFound"
>;

const DictionaryContext = createContext<ClientDictionary | null>(null);

export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: ClientDictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): ClientDictionary {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}
