"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

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
      <div className="section-tinted flex min-h-64 items-center justify-center px-6 py-16">
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={reset} size="lg" className="rounded-full">
            {dict.errorPage.retry}
          </Button>
          <Link
            href={`/${locale}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            {dict.errorPage.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
