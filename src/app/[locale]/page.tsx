import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HomepageMotion } from "@/components/landing/homepage-motion";
import { ProjectsSection } from "@/components/landing/projects-section";
import { RouteStructuredData } from "@/components/route-structured-data";
import { SkillsSection } from "@/components/landing/skills-section";
import { ThemePortrait } from "@/components/theme-portrait";
import type { FeaturedProjectSummary } from "@/components/landing/projects-section";
import { getRealisationBySlug } from "@/lib/realisations";
import type { Locale } from "@/lib/i18n";
import { getLocalizedPageContext } from "./route-context";

// Editorial selection stays explicit; its title and tags come from the
// canonical realisation catalog below.
const featuredProjectSlugs = [
  "migration-odoo-v16-v19",
  "modules-metier-odoo",
  "refonte-site-corporate",
] as const satisfies readonly FeaturedProjectSummary["slug"][];

function getFeaturedProjects(locale: Locale): FeaturedProjectSummary[] {
  return featuredProjectSlugs.map((slug) => {
    const project = getRealisationBySlug(slug);

    if (!project) {
      throw new Error(`Unknown featured realisation slug: ${slug}`);
    }

    return { slug, title: project.title[locale], tags: project.tags };
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <>
      <RouteStructuredData locale={loc} pathname={`/${loc}`} />
      <HeroSection
        locale={loc}
        dict={dict.hero}
        headshot={
          <ThemePortrait
            alt="Orhan Madi Assani"
            width={1024}
            height={1024}
            sizes="(max-width: 1023px) min(100vw - 2rem, 384px), 440px"
            fetchPriority="high"
            preload
          />
        }
      />
      <AboutSection locale={loc} dict={dict.about} />
      <ExperienceSection locale={loc} dict={dict.experience} />
      <SkillsSection locale={loc} dict={dict.skills} />
      <ProjectsSection
        locale={loc}
        projects={getFeaturedProjects(loc)}
        dict={dict.featuredProjects}
      />
      <CtaSection locale={loc} dict={dict.cta} />
      <HomepageMotion />
    </>
  );
}
