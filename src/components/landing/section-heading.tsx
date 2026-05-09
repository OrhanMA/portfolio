import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t border-border/70 pt-6 md:grid-cols-[0.75fr_1.25fr] md:items-end",
        className,
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </p>
      <div>
        <h2 className="text-balance text-4xl font-semibold leading-[0.95] tracking-normal sm:text-5xl lg:text-7xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
