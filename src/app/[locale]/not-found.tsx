"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { useDictionary } from "@/components/dictionary-provider";

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
      <div>
        <Link
          href={`/${locale}`}
        >
          {dict.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
