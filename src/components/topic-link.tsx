import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getTopicHref } from "@/lib/topic-links";
import { cn } from "@/lib/utils";

export function TopicLink({
  label,
  locale,
  currentPath,
  className,
}: {
  label: string;
  locale: Locale;
  currentPath?: string;
  className?: string;
}) {
  return (
    <Link
      href={getTopicHref(label, locale, currentPath)}
    >
      {label}
    </Link>
  );
}
