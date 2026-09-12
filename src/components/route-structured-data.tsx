import { headers } from "next/headers";
import {
  PageStructuredData as PageStructuredDataScript,
} from "@/components/structured-data";
import type { Locale } from "@/lib/i18n";

export async function RouteStructuredData({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <PageStructuredDataScript
      locale={locale}
      pathname={pathname}
      nonce={nonce}
    />
  );
}
