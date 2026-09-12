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
      className={cn("border-border", className)}
    >
      <div
      >
        <div>
          {leading}
          <p>
            {eyebrow}
          </p>
          <h1
            className={titleClassName}
          >
            {title}
          </h1>
          {description && (
            <div>
              {description}
            </div>
          )}
          {meta && <div>{meta}</div>}
        </div>

        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}
