"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useDictionary } from "@/components/dictionary-provider";

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
      gsap.from(".experience-heading", {
        scrollTrigger: {
          trigger: ".experience-heading",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".experience-underline", {
        scrollTrigger: {
          trigger: ".experience-heading",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        delay: 0.3,
      });

      // Timeline line draws down
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

      // Cards stagger in
      gsap.from(".timeline-card", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Dots scale up
      gsap.from(".timeline-dot", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
        scale: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.3,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="parcours" className="section-tinted relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="experience-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.experience.heading}
          </h2>
          <div className="experience-underline mt-2 h-1 w-16 rounded-full bg-primary" />
        </div>

        <div className="timeline-container relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
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
                  tags: string[];
                },
                index: number
              ) => {
                const imageSrc = CARD_IMAGES[index];

                return (
                  <div
                    key={index}
                    className="timeline-card relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
                  >
                    {/* Dot */}
                    <div className="timeline-dot absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2" />

                    {/* Card side */}
                    <div
                      className={`pl-10 md:pl-0 ${
                        index % 2 === 0
                          ? "md:text-right md:pr-12"
                          : "md:col-start-2 md:pl-12"
                      }`}
                    >
                      <Card className="border-border/50 bg-card">
                        <CardHeader className="pb-2">
                          <Badge
                            variant="outline"
                            className="mb-2 w-fit text-xs text-muted-foreground"
                          >
                            {exp.period}
                          </Badge>
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          {exp.companies ? (
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                              {exp.companies.map((c, i) => (
                                <a
                                  key={i}
                                  href={c.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                                >
                                  <Image
                                    src={c.logo}
                                    alt=""
                                    width={18}
                                    height={18}
                                    className="rounded-sm"
                                  />
                                  {c.name}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <Image
                                src={exp.logo}
                                alt=""
                                width={20}
                                height={20}
                                className="rounded-sm"
                              />
                              {exp.company}
                            </a>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tags.map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Image on the opposite side — hidden on mobile, shown on md+ */}
                    {imageSrc && (
                      <div
                        className={`hidden md:flex items-center ${
                          index % 2 === 0
                            ? "md:col-start-2 md:pl-12"
                            : "md:col-start-1 md:row-start-1 md:pr-12 md:justify-end"
                        }`}
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-border/30">
                          <Image
                            src={imageSrc}
                            alt=""
                            width={320}
                            height={200}
                            className="h-auto w-full max-w-[280px] object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
