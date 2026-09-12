import Link from "next/link";
import { cn } from "@/lib/utils";

export const SITE_OWNER_NAME = "Orhan Madi Assani";

export function SiteIdentity({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      data-site-identity
    >
      <span
        data-site-identity-name
      >
        {SITE_OWNER_NAME}
      </span>
    </Link>
  );
}
