import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import {
  PixelSkillIcon,
  type PixelSkillIconName,
} from "@/components/landing/pixel-art";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/app/[locale]/dictionaries";

type SkillCategory = {
  icon: PixelSkillIconName;
  title: string;
  description: string;
  skills: string[];
  color: string;
};

export function SkillsSection({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary["skills"];
}) {
  const skillCategories: SkillCategory[] = [
    {
      icon: "backend",
      title: dict.backend,
      description: dict.backendDesc,
      skills: ["PHP", "Symfony", "Python", "PostgreSQL", "REST API", "Architecture modulaire"],
      color: "text-primary",
    },
    {
      icon: "frontend",
      title: dict.frontend,
      description: dict.frontendDesc,
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML / CSS", "UI / UX"],
      color: "text-vermillion",
    },
    {
      icon: "odoo",
      title: dict.odoo,
      description: dict.odooDesc,
      skills: ["Odoo 16 → 19", "Modules métier", "Personnalisation", "Migrations", "Automatisations", "Rapports"],
      color: "text-primary",
    },
    {
      icon: "devops",
      title: dict.devops,
      description: dict.devopsDesc,
      skills: ["Docker", "Git / GitHub", "Linux", "CI / CD", "Nginx", "VPS"],
      color: "text-vermillion",
    },
    {
      icon: "methods",
      title: dict.methods,
      description: dict.methodsDesc,
      skills: ["Agile / Scrum", "Conception", "Tests", "Documentation", "Optimisation", "Qualité"],
      color: "text-primary",
    },
    {
      icon: "education",
      title: dict.education,
      description: dict.educationDesc,
      skills: ["Algorithmique", "Structures de données", "Réseaux", "Systèmes", "Bases de données", "Mathématiques"],
      color: "text-foreground",
    },
  ];

  return (
    <section
      id="competences"
      className="landing-deferred landing-deferred-skills px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              {dict.eyebrow}
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {dict.heading}
            </h2>
          </div>
          <LandingButtonLink
            href={`/${locale}/competences`}
            variant="outline"
            size="sm"
            className="rounded-full border-foreground/25 bg-background/75"
          >
            {dict.ctaAll}
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
          </LandingButtonLink>
        </Reveal>

        <Reveal className="mt-10" stagger=".skill-column">
          <div className="grid border-y border-foreground/20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {skillCategories.map((category) => (
              <article
                key={category.title}
                className="skill-column invisible group min-h-72 border-b border-foreground/15 px-5 py-7 transition-colors hover:bg-primary/[0.04] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r xl:border-b-0 xl:[&:not(:last-child)]:border-r"
              >
                <PixelSkillIcon
                  name={category.icon}
                  className={cn(
                    "h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2",
                    category.color,
                  )}
                />
                <h3 className={cn("mt-5 text-lg font-black", category.color)}>
                  {category.title}
                </h3>
                <p className="sr-only">{category.description}</p>
                <ul className="mt-5 grid gap-1.5 text-[12px] leading-5 text-foreground/72">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
