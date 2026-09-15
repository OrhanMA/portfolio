"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { useDictionary } from "@/components/dictionary-provider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = pathname?.split("/").filter(Boolean)[0] || "fr";
  const dict = useDictionary();

  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div>
      <EditorialPageHeader
        eyebrow={dict.errorPage.eyebrow}
        title={dict.errorPage.heading}
        description={dict.errorPage.text}
        titleClassName="uppercase"
      />
      <div>
        <div>
          <Button onClick={reset} size="lg">
            {dict.errorPage.retry}
          </Button>
          <Link
            href={`/${locale}`}
          >
            {dict.errorPage.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
