"use client";

import { useRef } from "react";
import {
  Server,
  Monitor,
  Puzzle,
  Container,
  Users,
  GraduationCap,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/components/dictionary-provider";

export function SkillsSection() {
  const container = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  const skillCategories = [
    {
      icon: Server,
      title: dict.skills.backend,
      skills: ["Symfony 6.3+", "PHP", "Python", "Redis", "API Platform"],
    },
    {
      icon: Monitor,
      title: dict.skills.frontend,
      skills: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Puzzle,
      title: dict.skills.odoo,
      skills: ["Odoo 16+", "Module dev", "Upgrade/Migration", "OWL", "Python"],
    },
    {
      icon: Container,
      title: dict.skills.devops,
      skills: ["Git", "Docker", "PostgreSQL", "Shell", "Linux", "CI/CD"],
    },
    {
      icon: Users,
      title: dict.skills.methods,
      skills: ["Agile/Scrum", "Code Review", "Tests", "REST API"],
    },
    {
      icon: GraduationCap,
      title: dict.skills.education,
      skills: ["Algorithms", "DB Design", "UML", "Project Management"],
    },
  ];

  useGSAP(
    () => {
      gsap.from(".skills-heading", {
        scrollTrigger: {
          trigger: ".skills-heading",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".skills-underline", {
        scrollTrigger: {
          trigger: ".skills-heading",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        delay: 0.3,
      });

      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="competences"
      className="bg-muted/30 py-24 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="skills-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.skills.heading}
          </h2>
          <div className="skills-underline mt-2 h-1 w-16 rounded-full bg-primary" />
        </div>

        <div className="skills-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className="skill-card border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <category.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
