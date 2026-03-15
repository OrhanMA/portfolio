"use client";

import { useRef } from "react";
import { GraduationCap, Code, Briefcase } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Card, CardContent } from "@/components/ui/card";
import { useDictionary } from "@/components/dictionary-provider";

export function AboutSection() {
  const container = useRef<HTMLDivElement>(null);
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

  useGSAP(
    () => {
      gsap.from(".about-heading", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".about-underline", {
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        delay: 0.3,
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="a-propos" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="about-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.about.heading}
          </h2>
          <div className="about-underline mt-2 h-1 w-16 rounded-full bg-primary" />
        </div>

        <p className="about-text mb-12 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {dict.about.text}
        </p>

        <div className="about-grid grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card
              key={item.title}
              className="about-card border-border/50 bg-card/50"
            >
              <CardContent className="pt-6">
                <item.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
