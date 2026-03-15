"use client";

import { useCallback, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDictionary } from "@/components/dictionary-provider";

// Map each card index to an image path
const CARD_IMAGES: Record<number, string> = {
  0: "/images/1up-building-drone-photo.webp",
  1: "/images/lig-grenoble-building.webp",
  2: "/images/dynamo-chambery-simplon.webp",
};

export function ExperienceSection() {
  const container = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  const handleCardMouseEnter = useCallback(
    (index: number, e: React.MouseEvent) => {
      const el = cursorImageRef.current;
      if (!el) return;

      const src = CARD_IMAGES[index];
      if (!src) return;

      const img = el.querySelector("img") as HTMLImageElement;
      if (img) img.src = src;

      const containerEl = container.current;
      if (!containerEl) return;

      const rect = containerEl.getBoundingClientRect();
      gsap.set(el, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      gsap.to(el, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    },
    []
  );

  const handleCardMouseLeave = useCallback(() => {
    const el = cursorImageRef.current;
    if (!el) return;

    gsap.to(el, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.in",
      overwrite: true,
    });
  }, []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cursorImageRef.current;
    if (!el) return;

    const containerEl = container.current;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    gsap.to(el, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

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
      {/* Cursor-following image */}
      <div
        ref={cursorImageRef}
        className="pointer-events-none absolute top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2 invisible"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="h-36 w-56 overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10 sm:h-44 sm:w-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CARD_IMAGES[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

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
                  description: string;
                  tags: string[];
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="timeline-card relative grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
                  onMouseEnter={(e) => handleCardMouseEnter(index, e)}
                  onMouseLeave={handleCardMouseLeave}
                  onMouseMove={handleCardMouseMove}
                >
                  {/* Dot */}
                  <div className="timeline-dot absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2" />

                  {/* Content positioning: alternate sides on desktop */}
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
                        <p className="text-sm text-primary">{exp.company}</p>
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
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
