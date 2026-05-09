"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/components/dictionary-provider";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { cn } from "@/lib/utils";
import { realisations } from "@/lib/realisations";
import type { Locale } from "@/lib/i18n";

const FEATURED_SLUGS = [
  "migration-odoo-v16-v19",
  "modules-metier-odoo",
  "refonte-site-corporate",
] as const;

const CASE_IMAGES: Record<(typeof FEATURED_SLUGS)[number], string> = {
  "migration-odoo-v16-v19": "/images/odoo-logo.webp",
  "modules-metier-odoo": "/images/odoo-logo.webp",
  "refonte-site-corporate": "/images/nextjs-logo.webp",
};

export function ProjectsSection({ locale }: { locale: string }) {
  const dict = useDictionary();
  const loc = locale as Locale;
  const resultBySlug = Object.fromEntries(
    dict.featuredProjects.results.map(
      (item: { slug: string; result: string }) => [item.slug, item.result],
    ),
  );

  const featuredRealisations = FEATURED_SLUGS.map((slug) =>
    realisations.find((realisation) => realisation.slug === slug),
  ).filter(Boolean);

  return (
    <section
      id="realisations"
      className="section-tinted px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={dict.featuredProjects.eyebrow}
            title={dict.featuredProjects.heading}
            description={dict.featuredProjects.text}
          />
        </Reveal>

        <Reveal className="mt-16" stagger=".case-study-card">
          <div className="grid gap-4">
            {featuredRealisations.map((realisation, index) => {
              if (!realisation) return null;
              const slug = realisation.slug as (typeof FEATURED_SLUGS)[number];

              return (
                <article
                  key={realisation.slug}
                  className="case-study-card invisible group grid overflow-hidden rounded-lg border border-border/70 bg-background/60 transition-colors hover:border-primary/60 hover:bg-background/85 lg:grid-cols-[0.72fr_1fr]"
                >
                  <div className="relative min-h-72 overflow-hidden bg-muted lg:min-h-[420px]">
                    <Image
                      src={CASE_IMAGES[slug]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="pointer-events-none object-contain saturate-[0.82] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                    <p className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">
                      {dict.featuredProjects.featuredLabel} 0{index + 1}
                    </p>
                  </div>

                  <div className="flex min-h-full flex-col justify-between gap-10 p-5 sm:p-8 lg:p-10">
                    <div>
                      <div className="mb-7 flex flex-wrap gap-2">
                        <Badge variant="outline" className="font-mono">
                          {realisation.context[loc]}
                        </Badge>
                        {realisation.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-balance text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                        {realisation.title[loc]}
                      </h3>
                      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                        {realisation.shortDescription[loc]}
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                      <div className="border-l border-primary/70 pl-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          {dict.featuredProjects.resultLabel}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {resultBySlug[realisation.slug]}
                        </p>
                      </div>

                      <Link
                        href={`/${locale}/realisations/${realisation.slug}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "h-12 rounded-lg px-5",
                        )}
                      >
                        {dict.featuredProjects.readCase}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/realisations`}
            className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-lg px-5")}
          >
            {dict.featuredProjects.ctaAll}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
