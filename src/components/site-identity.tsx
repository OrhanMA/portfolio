import Link from "next/link";
import { ThemePortrait } from "@/components/theme-portrait";
import { cn } from "@/lib/utils";

export const SITE_OWNER_NAME = "Orhan Madi Assani";

export function SiteIdentity({
  href,
  className,
  ariaCurrent,
}: {
  href: string;
  className?: string;
  ariaCurrent?: "page";
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      data-site-identity
      aria-current={ariaCurrent}
      className={cn("shrink-0 text-sm font-semibold tracking-[-0.02em]", className)}
    >
      <ThemePortrait
        data-site-identity-photo
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
