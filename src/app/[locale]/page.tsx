import Image from "next/image";
import { notFound } from "next/navigation";

import { AboutSection } from "@/components/landing/about-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ExperienceSection } from "@/components/landing/experience-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HomepageMotion } from "@/components/landing/homepage-motion";
import { ProjectsSection } from "@/components/landing/projects-section";
import { SkillsSection } from "@/components/landing/skills-section";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

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
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection
        locale={locale}
        dict={dict.hero}
        headshot={
          <Image
            src="/images/decorative/hero-portrait-jinbei-desktop.avif"
            alt="Orhan Madi Assani"
            width={1023}
            height={1537}
            sizes="(max-width: 639px) 88vw, (max-width: 1023px) 520px, 690px"
            className="pointer-events-none h-full w-full object-contain object-bottom"
            fetchPriority="high"
            preload
          />
        }
      />
      <AboutSection dict={dict.about} />
      <ExperienceSection locale={locale} dict={dict.experience} />
      <SkillsSection locale={locale} dict={dict.skills} />
      <ProjectsSection
        locale={locale}
        projects={featuredProjects[locale]}
        dict={dict.featuredProjects}
      />
      <CtaSection locale={locale} dict={dict.cta} />
      <HomepageMotion />
    </>
  );
}
