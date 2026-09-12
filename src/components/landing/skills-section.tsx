import { LinkedText } from "@/components/linked-text";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { LandingButtonLink } from "@/components/landing/landing-button-link";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/i18n";

type SkillLink = {
  label: string;
  path: string;
};

type SkillCategory = {
  title: string;
  path: string;
  description: string;
  skills: readonly SkillLink[];
};

export function SkillsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["skills"];
}) {
  const skillCategories: SkillCategory[] = [
    {
      title: dict.backend,
      path: "/competences/developpement-backend",
      description: dict.backendDesc,
      skills: dict.links.backend,
    },
    {
      title: dict.frontend,
      path: "/competences/developpement-frontend",
      description: dict.frontendDesc,
      skills: dict.links.frontend,
    },
    {
      title: dict.odoo,
      path: "/competences/developpement-odoo",
      description: dict.odooDesc,
      skills: dict.links.odoo,
    },
    {
      title: dict.devops,
      path: "/competences/devops",
      description: dict.devopsDesc,
      skills: dict.links.devops,
    },
    {
      title: dict.methods,
      path: "/competences/amelioration-continue",
      description: dict.methodsDesc,
      skills: dict.links.methods,
    },
    {
      title: dict.education,
      path: "/a-propos",
      description: dict.educationDesc,
      skills: dict.links.education,
    },
  ];

  return (
    <section
      id="competences"
    >
      <div>
        <Reveal>
          <div>
            <p>
              {dict.eyebrow}
            </p>
            <h2>
              {dict.heading}
            </h2>
          </div>
          <LandingButtonLink
            href={`/${locale}/competences`}
            variant="outline"
            size="sm"
          >
            {dict.ctaAll}
            <ArrowUpRight />
          </LandingButtonLink>
        </Reveal>

        <Reveal stagger=".skill-column">
          <div>
            {skillCategories.map((category) => (
              <article
                key={category.title}
              >
                <h3><Link href={`/${locale}${category.path}`}>{category.title}</Link></h3>
                <p>
                  <LinkedText locale={locale}>{category.description}</LinkedText>
                </p>
                <ul>
                  {category.skills.map((skill) => {
                    const label = skill.label;

                    return (
                      <li key={label}>
                        <Link
                          href={`/${locale}${skill.path}`}
                          prefetch={false}
                        >
                          {label}
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
