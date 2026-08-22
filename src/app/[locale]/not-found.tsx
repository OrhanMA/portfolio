"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { useDictionary } from "@/components/dictionary-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split("/").filter(Boolean)[0] || "fr";
  const dict = useDictionary();

  return (
    <div>
      <EditorialPageHeader
        eyebrow="404"
        title={dict.notFound.heading}
        description={dict.notFound.text}
        titleClassName="uppercase"
      />
      <div className="flex min-h-64 items-center justify-center bg-muted/35 px-6 py-16">
        <Link
          href={`/${locale}`}
          className={cn(
            buttonVariants({ size: "lg" }),
            "px-7",
          )}
        >
          {dict.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
