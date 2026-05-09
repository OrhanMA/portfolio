"use client";

import {
  Container,
  Monitor,
  Puzzle,
  Server,
  GraduationCap,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/components/dictionary-provider";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

export function SkillsSection() {
  const dict = useDictionary();

  const skillCategories = [
    {
      icon: Server,
      title: dict.skills.backend,
      description: dict.skills.backendDesc,
      skills: ["Symfony 6.3+", "PHP", "Python", "Redis", "API Platform"],
    },
    {
      icon: Monitor,
      title: dict.skills.frontend,
      description: dict.skills.frontendDesc,
      skills: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Puzzle,
      title: dict.skills.odoo,
      description: dict.skills.odooDesc,
      skills: ["Odoo 16+", "Module dev", "Upgrade/Migration", "OWL", "Python"],
    },
    {
      icon: Container,
      title: dict.skills.devops,
      description: dict.skills.devopsDesc,
      skills: ["Git", "Docker", "PostgreSQL", "Shell", "Linux", "CI/CD", "VPS (OVH, DO)"],
    },
    {
      icon: Users,
      title: dict.skills.methods,
      description: dict.skills.methodsDesc,
      skills: ["Agile/Scrum", "Code Review", "Tests", "REST API"],
    },
    {
      icon: GraduationCap,
      title: dict.skills.education,
      description: dict.skills.educationDesc,
      skills: ["Algorithms", "DB Design", "UML", "Project Management"],
    },
  ];

  return (
    <section
      id="competences"
      className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={dict.skills.eyebrow}
            title={dict.skills.heading}
            description={dict.skills.subtext}
          />
        </Reveal>

        <Reveal className="mt-16" stagger=".skill-card">
          <div className="grid grid-cols-1 border-y border-border/70 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category) => (
            <article
              key={category.title}
              className="skill-card invisible group min-h-72 border-b border-border/70 p-5 transition-colors hover:bg-muted/35 md:odd:border-r xl:border-r xl:[&:nth-child(3n)]:border-r-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <category.icon className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-1" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Stack
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-normal">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="border border-border/50 bg-background/70 font-mono text-[11px]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
