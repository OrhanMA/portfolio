"use client";

import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { LinkedText } from "@/components/linked-text";
import { defaultLocale, parseLocale } from "@/lib/i18n";

export function ArticleLinkedText({ children }: { children?: ReactNode }) {
  const params = useParams<{ locale: string }>();
  const locale = parseLocale(params?.locale ?? "") ?? defaultLocale;
  return <LinkedText locale={locale}>{children}</LinkedText>;
}
