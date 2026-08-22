import type { ReactNode } from "react";
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
        "border-b border-border px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pt-32",
        !compact && "lg:pb-20",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-10",
          aside && "lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end",
        )}
      >
        <div className="max-w-5xl">
          {leading}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1
            className={cn(
              "mt-4 text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-foreground",
              compact && "text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92]",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {description && (
            <div className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </div>
          )}
          {meta && <div className="mt-6">{meta}</div>}
        </div>

        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}
