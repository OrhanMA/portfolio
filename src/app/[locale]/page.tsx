import Image from "next/image";

import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HomepageMotion } from "@/components/landing/homepage-motion";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { getLocalizedPageContext } from "./route-context";

const featuredProjects = {
  fr: [
    {
      slug: "migration-odoo-v16-v19" as const,
      title: "Migration d'un ERP d'entreprise de Odoo 16 vers Odoo 19",
      tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    },
    {
      slug: "modules-metier-odoo" as const,
      title: "Développement de modules métier pour un ERP",
      tags: ["Odoo", "Python", "PostgreSQL", "API"],
    },
    {
      slug: "refonte-site-corporate" as const,
      title: "Refonte d'un site corporate Next.js",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    },
  ],
  en: [
    {
      slug: "migration-odoo-v16-v19" as const,
      title: "Enterprise ERP migration from Odoo 16 to Odoo 19",
      tags: ["Odoo", "Python", "PostgreSQL", "Migration"],
    },
    {
      slug: "modules-metier-odoo" as const,
      title: "Business module development for an ERP",
      tags: ["Odoo", "Python", "PostgreSQL", "API"],
    },
    {
      slug: "refonte-site-corporate" as const,
      title: "Next.js corporate website redesign",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    },
  ],
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { locale: loc, dictionary: dict } = await getLocalizedPageContext(locale);

  return (
    <>
      <HeroSection
        locale={loc}
        dict={dict.hero}
        headshot={
          <Image
            src="/images/coporate-headshot.webp"
            alt="Orhan Madi Assani"
            width={1024}
            height={1024}
            sizes="(max-width: 1023px) min(100vw - 2rem, 384px), 440px"
            className="pointer-events-none"
            fetchPriority="high"
            preload
          />
        }
      />
      <AboutSection dict={dict.about} />
      <ExperienceSection locale={loc} dict={dict.experience} />
      <SkillsSection locale={loc} dict={dict.skills} />
      <ProjectsSection
        locale={loc}
        projects={featuredProjects[loc]}
        dict={dict.featuredProjects}
      />
      <CtaSection locale={loc} dict={dict.cta} />
      <HomepageMotion />
    </>
  );
}
