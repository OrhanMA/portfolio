"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { gsap, useGSAP } from "@/lib/gsap";
import { useDictionary } from "@/components/dictionary-provider";
import { Reveal } from "@/components/landing/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const CARD_IMAGES: Record<number, string> = {
  0: "/images/1up-building-drone-photo.webp",
  1: "/images/lig-grenoble-building.webp",
  2: "/images/dynamo-chambery-simplon.webp",
};

export function ExperienceSection() {
  const container = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([".timeline-line", ".timeline-card", ".timeline-dot"], {
          autoAlpha: 1,
          scaleY: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.from(".timeline-card", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 72%",
        },
        y: 42,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.from(".timeline-dot", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 72%",
        },
        scale: 0,
        duration: 0.4,
        stagger: 0.18,
        ease: "back.out(1.7)",
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="parcours"
      className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={dict.experience.eyebrow}
            title={dict.experience.heading}
            description={dict.experience.subtext}
          />
        </Reveal>

        <div className="timeline-container relative mt-16">
          <div className="timeline-line absolute left-0 top-0 hidden h-full w-px origin-top bg-border lg:block" />

          <div className="grid gap-5">
            {dict.experience.entries.map(
              (
                exp: {
                  period: string;
                  title: string;
                  company: string;
                  logo: string;
                  url: string;
                  companies?: { name: string; logo: string; url: string }[];
                  description: string;
                  institutions?: string;
                  tags: string[];
                },
                index: number,
              ) => {
                const imageSrc = CARD_IMAGES[index];

                return (
                  <article
                    key={`${exp.period}-${exp.title}`}
                    className="timeline-card invisible relative grid gap-5 border-t border-border/70 pt-5 lg:grid-cols-[180px_minmax(0,1fr)_320px] lg:gap-8"
                  >
                    <div className="timeline-dot absolute -left-[5px] top-5 hidden h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background lg:block" />

                    <div className="lg:pl-8">
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                        {exp.period}
                      </p>
                    </div>

                    <div className="premium-card rounded-lg p-5 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-normal">
                            {exp.title}
                          </h3>
                          {exp.companies ? (
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                              {exp.companies.map((company) => (
                                <a
                                  key={company.name}
                                  href={company.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/company inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  <Image
                                    src={company.logo}
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="rounded-sm"
                                  />
                                  {company.name}
                                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/company:opacity-100" />
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/company mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Image
                                src={exp.logo}
                                alt=""
                                width={22}
                                height={22}
                                className="rounded-sm"
                              />
                              {exp.company}
                              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover/company:opacity-100" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-7 text-muted-foreground">
                        {exp.description}
                      </p>
                      {exp.institutions && (
                        <p className="mt-4 border-l border-border pl-4 text-sm italic leading-7 text-muted-foreground/85">
                          {exp.institutions}
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.tags.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="border border-border/50 bg-background/70 font-mono text-[11px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {imageSrc && (
                      <div className="relative hidden overflow-hidden rounded-lg border border-border/70 bg-muted lg:block">
                        <Image
                          src={imageSrc}
                          alt=""
                          fill
                          sizes="320px"
                          className="pointer-events-none object-cover saturate-[0.85]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/45 to-transparent" />
                      </div>
                    )}
                  </article>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
