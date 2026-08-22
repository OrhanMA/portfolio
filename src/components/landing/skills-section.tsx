import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";

type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
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
      title: dict.backend,
      description: dict.backendDesc,
      skills: ["PHP", "Symfony", "Python", "PostgreSQL", "REST API", "Architecture modulaire"],
    },
    {
      title: dict.frontend,
      description: dict.frontendDesc,
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML / CSS", "UI / UX"],
    },
    {
      title: dict.odoo,
      description: dict.odooDesc,
      skills: ["Odoo 16 → 19", "Modules métier", "Personnalisation", "Migrations", "Automatisations", "Rapports"],
    },
    {
      title: dict.devops,
      description: dict.devopsDesc,
      skills: ["Docker", "Git / GitHub", "Linux", "CI / CD", "Nginx", "VPS"],
    },
    {
      title: dict.methods,
      description: dict.methodsDesc,
      skills: ["Agile / Scrum", "Conception", "Tests", "Documentation", "Optimisation", "Qualité"],
    },
    {
      title: dict.education,
      description: dict.educationDesc,
      skills: ["Algorithmique", "Structures de données", "Réseaux", "Systèmes", "Bases de données", "Mathématiques"],
    },
  ];

  return (
    <section
      id="competences"
      className="landing-deferred landing-deferred-skills px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {dict.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {dict.heading}
            </h2>
          </div>
          <LandingButtonLink
            href={`/${locale}/competences`}
            variant="outline"
            size="sm"
            className="border-border"
          >
            {dict.ctaAll}
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
          </LandingButtonLink>
        </Reveal>

        <Reveal className="mt-10" stagger=".skill-column">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <article
                key={category.title}
                className="skill-column invisible min-h-64 border-b border-r border-border p-6 transition-colors hover:bg-muted/60"
              >
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>
                <ul className="mt-5 grid gap-1.5 text-xs leading-5 text-foreground/75">
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
