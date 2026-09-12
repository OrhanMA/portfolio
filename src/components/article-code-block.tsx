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
import { cn } from "@/lib/utils";

export type ArticleCodeLabels = {
  copyCode: string;
  codeCopied: string;
  codeBlock: string;
};

const defaultLabels: ArticleCodeLabels = {
  copyCode: "Copy code",
  codeCopied: "Code copied",
  codeBlock: "Code block",
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
    <div>
      <pre
        ref={preRef}
        {...props}
        tabIndex={0}
        aria-label={labels.codeBlock}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copyCode}
      >
        {copied ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {copied ? labels.codeCopied : labels.copyCode}
      </button>
    </div>
  );
}
