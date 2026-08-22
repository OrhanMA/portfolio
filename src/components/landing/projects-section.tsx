import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";

type FeaturedSlug =
  | "migration-odoo-v16-v19"
  | "modules-metier-odoo"
  | "refonte-site-corporate";

export type FeaturedProjectSummary = {
  slug: FeaturedSlug;
  title: string;
  tags: string[];
};

const CASE_MEDIA: Record<
  FeaturedSlug,
  { src: string; imageClassName: string; surfaceClassName: string }
> = {
  "migration-odoo-v16-v19": {
    src: "/images/project-screenshots/odoo/odoo-success-migration-v19.png",
    imageClassName: "object-contain p-9 sm:p-12",
    surfaceClassName: "bg-muted",
  },
  "modules-metier-odoo": {
    src: "/images/project-screenshots/odoo/self-made-modules-list.png",
    imageClassName: "object-cover object-left",
    surfaceClassName: "bg-muted",
  },
  "refonte-site-corporate": {
    src: "/images/project-screenshots/corporate/corporate-local-hero.png",
    imageClassName: "object-cover object-center",
    surfaceClassName: "bg-muted",
  },
};

type CaseCopy = {
  slug: FeaturedSlug;
  problem: string;
  contribution: string;
  result: string;
  metricValue: string;
  metricLabel: string;
  metricNote: string;
};

export function ProjectsSection({
  locale,
  projects,
  dict,
}: {
  locale: string;
  projects: FeaturedProjectSummary[];
  dict: Dictionary["featuredProjects"];
}) {
  const caseCopyBySlug = Object.fromEntries(
    (dict.cases as CaseCopy[]).map((item) => [item.slug, item]),
  ) as Record<FeaturedSlug, CaseCopy>;

  return (
    <section
      id="realisations"
      className="landing-deferred landing-deferred-projects border-y border-border bg-muted/35 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {dict.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            {dict.eyebrow}
          </h2>
        </Reveal>

        <Reveal className="mt-10" stagger=".case-row">
          <div className="overflow-hidden border border-border bg-background">
            {projects.map((project, index) => {
              const slug = project.slug;
              const media = CASE_MEDIA[slug];
              const copy = caseCopyBySlug[slug];
              const imageOnRight = index === 1;

              return (
                <article
                  key={project.slug}
                  className="case-row invisible grid border-b border-border last:border-b-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)_190px]"
                >
                  <div
                    className={cn(
                      "group relative min-h-72 overflow-hidden border-b border-border sm:min-h-80 lg:min-h-72 lg:border-b-0 lg:border-r",
                      media.surfaceClassName,
                      imageOnRight && "lg:order-2",
                    )}
                  >
                    <Image
                      src={media.src}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className={cn(
                        "pointer-events-none transition-transform duration-300 group-hover:scale-[1.015]",
                        media.imageClassName,
                      )}
                    />
                    <span className="absolute left-5 top-5 border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                      {dict.featuredLabel}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex min-h-72 flex-col justify-center px-6 py-8 sm:px-8 lg:border-r lg:px-9",
                      imageOnRight && "lg:order-1",
                    )}
                  >
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {copy.contribution}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border border-border px-2 py-1 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/${locale}/realisations/${project.slug}`}
                      className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold underline-offset-4 hover:underline"
                    >
                      {dict.readCase}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div
                    data-slot="project-result"
                    className="relative flex min-h-48 flex-col justify-center border-t border-foreground/15 px-6 py-8 lg:order-3 lg:min-h-72 lg:border-t-0"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {dict.resultLabel}
                    </p>
                    <p className="mt-2 text-5xl font-semibold leading-none tracking-[-0.05em]">
                      {copy.metricValue}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-5">{copy.metricLabel}</p>
                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                      {copy.metricNote}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>

    </section>
  );
}
