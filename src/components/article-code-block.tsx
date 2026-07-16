"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Check, Copy } from "lucide-react";

export type ArticleCodeLabels = {
  copyCode: string;
  codeCopied: string;
};

const defaultLabels: ArticleCodeLabels = {
  copyCode: "Copy code",
  codeCopied: "Code copied",
};

const ArticleCodeLabelsContext = createContext<ArticleCodeLabels>(defaultLabels);

export function ArticleCodeLabelsProvider({
  children,
  labels,
}: {
  children: ReactNode;
  labels: ArticleCodeLabels;
}) {
  return (
    <ArticleCodeLabelsContext.Provider value={labels}>
      {children}
    </ArticleCodeLabelsContext.Provider>
  );
}

export function ArticleCodeBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const labels = useContext(ArticleCodeLabelsContext);
  const preRef = useRef<HTMLPreElement>(null);
  const copiedTimeout = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(
    () => () => {
      if (copiedTimeout.current) {
        window.clearTimeout(copiedTimeout.current);
      }
    },
    [],
  );

  async function copyCode() {
    const code = preRef.current?.textContent;

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      copiedTimeout.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="not-prose article-code-block relative mx-auto max-w-3xl">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 inline-flex h-7 items-center gap-1.5 rounded-md border border-white/20 bg-black/20 px-2.5 font-sans text-[0.75rem] font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        {copied ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
        ) : (
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {copied ? labels.codeCopied : labels.copyCode}
      </button>
    </div>
  );
}
