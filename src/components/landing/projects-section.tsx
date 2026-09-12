import { LinkedText } from "@/components/linked-text";
import { TopicLink } from "@/components/topic-link";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

type FeaturedSlug =
  | "migration-odoo-v16-v19"
  | "modules-metier-odoo"
  | "refonte-site-corporate";

type CaseMedia = {
  src: string;
  imageClassName: string;
  surfaceClassName: string;
  source?: {
    author: string;
    href: string;
  };
};

const FEATURED_SLUGS = [
  "migration-odoo-v16-v19",
  "modules-metier-odoo",
  "refonte-site-corporate",
] as const satisfies readonly FeaturedSlug[];

export type FeaturedProjectSummary = {
  slug: FeaturedSlug;
  title: string;
  tags: string[];
};

const CASE_MEDIA: Record<
  FeaturedSlug,
  CaseMedia
> = {
  "migration-odoo-v16-v19": {
    // Source: https://www.pexels.com/photo/server-racks-on-data-center-4508751/
    src: "/images/project-photography/pexels-server-racks-4508751.webp",
    imageClassName: "object-cover object-center",
    surfaceClassName: "bg-muted",
    source: {
      author: "Brett Sayles",
      href: "https://www.pexels.com/photo/server-racks-on-data-center-4508751/",
    },
  },
  "modules-metier-odoo": {
    // Source: https://www.pexels.com/photo/vertical-shot-of-a-man-and-woman-working-in-an-office-12899161/
    src: "/images/project-photography/pexels-office-collaboration-12899161.webp",
    imageClassName: "object-cover object-[center_38%]",
    surfaceClassName: "bg-muted",
    source: {
      author: "Mizuno K",
      href: "https://www.pexels.com/photo/vertical-shot-of-a-man-and-woman-working-in-an-office-12899161/",
    },
  },
  "refonte-site-corporate": {
    src: "/images/project-screenshots/corporate/corporate-local-hero.png",
    imageClassName: "object-cover object-center",
    surfaceClassName: "bg-muted",
  },
};

type CaseCopy = Dictionary["featuredProjects"]["cases"][number];

function indexFeaturedCases(cases: readonly CaseCopy[]) {
  return FEATURED_SLUGS.reduce(
    (index, slug) => {
      const copy = cases.find((item) => item.slug === slug);

      if (!copy) {
        throw new Error(`Missing featured project copy for slug: ${slug}`);
      }

      index[slug] = copy;
      return index;
    },
    {} as Record<FeaturedSlug, CaseCopy>,
  );
}

export function ProjectsSection({
  locale,
  projects,
  dict,
}: {
  locale: Locale;
  projects: FeaturedProjectSummary[];
  dict: Dictionary["featuredProjects"];
}) {
  const caseCopyBySlug = indexFeaturedCases(dict.cases);

  return (
    <section
      id="realisations"
    >
      <div>
        <Reveal>
          <p>
            {dict.eyebrow}
          </p>
          <h2>
            {dict.eyebrow}
          </h2>
        </Reveal>

        <Reveal stagger=".case-row">
          <div>
            {projects.map((project, index) => {
              const slug = project.slug;
              const media = CASE_MEDIA[slug];
              const copy = caseCopyBySlug[slug];
              const imageOnRight = index === 1;

              return (
                <article
                  key={project.slug}
                >
                  <div
                  >
                    <Link
                      href={`/${locale}/realisations/${project.slug}`}
                    >
                      <Image
                        src={media.src}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                      />
                      <span>
                        {dict.featuredLabel}
                      </span>
                    </Link>
                    {media.source ? (
                      <a
                        href={media.source.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Photo · {media.source.author} / Pexels
                      </a>
                    ) : null}
                  </div>

                  <div
                  >
                    <h3>
                      <Link href={`/${locale}/realisations/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p>
                      <LinkedText locale={locale}>{copy.contribution}</LinkedText>
                    </p>
                    <div>
                      {project.tags.slice(0, 4).map((tag) => (
                        <TopicLink key={tag} label={tag} locale={locale} />
                      ))}
                    </div>
                    <Link
                      href={`/${locale}/realisations/${project.slug}`}
                    >
                      {dict.readCase}
                      <ArrowUpRight />
                    </Link>
                  </div>

                  <div
                    data-slot="project-result"
                  >
                    <p>
                      {dict.resultLabel}
                    </p>
                    <p>
                      {copy.metricValue}
                    </p>
                    <p>
                      {copy.metricLabel}
                    </p>
                    <p>
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
