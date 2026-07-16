import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type EditorialPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  leading?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
  className?: string;
  titleClassName?: string;
};

export function EditorialPageHeader({
  eyebrow,
  title,
  description,
  leading,
  meta,
  aside,
  compact = false,
  className,
  titleClassName,
}: EditorialPageHeaderProps) {
  return (
    <section
      data-editorial-page-header
      className={cn(
        "relative isolate overflow-hidden border-b border-foreground/15 px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pt-32",
        !compact && "lg:pb-20",
        className,
      )}
    >
      <div className="absolute inset-0 -z-20 bg-primary/[0.025]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_32%,color-mix(in_oklch,var(--primary)_13%,transparent)_0_1px,transparent_1.4px)] bg-[size:7px_7px] opacity-35" />
      <div className="absolute -right-28 -top-32 -z-10 aspect-square w-80 rounded-full bg-vermillion/95 sm:w-[26rem]" />
      <div className="absolute right-[-8%] top-[4%] -z-10 h-[125%] w-[62%] opacity-20 mix-blend-multiply dark:opacity-10 dark:mix-blend-screen">
        <Image
          src="/images/decorative/fuji-detail.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="62vw"
          className="object-contain object-right-bottom"
        />
      </div>
      <Image
        src="/images/decorative/sakura-petals-trio.svg"
        alt=""
        aria-hidden="true"
        width={128}
        height={96}
        className="pointer-events-none absolute right-[8%] top-24 -z-[1] hidden h-auto w-24 rotate-12 sm:block lg:right-[16%]"
      />

      <div
        className={cn(
          "relative z-10 mx-auto grid max-w-7xl gap-10",
          aside && "lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end",
        )}
      >
        <div className="max-w-5xl">
          {leading}
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-vermillion">
            {eyebrow}
          </p>
          <h1
            className={cn(
              "mt-4 text-balance text-[clamp(3.4rem,8vw,7.6rem)] font-black leading-[0.82] tracking-[-0.06em] text-foreground",
              compact && "text-[clamp(3rem,6.5vw,6.4rem)] leading-[0.88]",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {description && (
            <div className="mt-6 max-w-3xl text-base font-medium leading-7 text-foreground/72 sm:text-lg sm:leading-8">
              {description}
            </div>
          )}
          {meta && <div className="mt-6">{meta}</div>}
        </div>

        {aside && <div className="relative z-10">{aside}</div>}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/15" />
      <div className="absolute bottom-0 left-0 h-1 w-28 bg-primary sm:w-44" />
      <div className="absolute bottom-0 left-28 h-1 w-8 bg-vermillion sm:left-44" />
    </section>
  );
}
