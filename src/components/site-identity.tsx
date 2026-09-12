import Image from "next/image";
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
      className={cn("shrink-0 text-sm font-semibold tracking-[-0.02em]", className)}
    >
      <Image
        data-site-identity-photo
        src="/images/coporate-headshot.webp"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        sizes="36px"
      />
      <span
        data-site-identity-name
      >
        {SITE_OWNER_NAME}
      </span>
    </Link>
  );
}
