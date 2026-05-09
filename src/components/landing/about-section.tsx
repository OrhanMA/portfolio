"use client";

import { Code, GraduationCap, Briefcase } from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

export function AboutSection() {
  const dict = useDictionary();

  const highlights = [
    {
      icon: GraduationCap,
      title: dict.about.card1Title,
      description: dict.about.card1Desc,
    },
    {
      icon: Briefcase,
      title: dict.about.card2Title,
      description: dict.about.card2Desc,
    },
    {
      icon: Code,
      title: dict.about.card3Title,
      description: dict.about.card3Desc,
    },
  ];

  return (
    <section id="a-propos" className="section-tinted px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={dict.about.eyebrow}
            title={dict.about.heading}
            description={dict.about.lead}
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.65fr)] lg:items-start">
          <Reveal className="lg:pt-12">
            <p className="text-balance text-3xl font-medium leading-tight tracking-normal sm:text-4xl lg:text-5xl">
              {dict.about.statement}
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
              {dict.about.text}
            </p>
          </Reveal>

          <Reveal stagger=".about-highlight">
            <div className="grid gap-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="about-highlight invisible group grid gap-5 rounded-lg border border-border/70 bg-background/55 p-5 transition-colors hover:border-primary/60 hover:bg-background/80 sm:grid-cols-[48px_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border/70 bg-card text-primary transition-transform group-hover:-translate-y-1">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
