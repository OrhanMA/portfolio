"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, BookOpen, MapPin, Briefcase } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

export function HeroSection({
  locale,
  headshot,
}: {
  locale: string;
  headshot: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Use autoAlpha instead of opacity to prevent FOUC
      // autoAlpha manages both opacity AND visibility
      tl.from(".hero-headshot", { scale: 0.8, autoAlpha: 0, duration: 0.8 })
        .from(".hero-greeting", { y: 40, autoAlpha: 0, duration: 0.8 }, "-=0.4")
        .from(
          ".hero-title .word",
          { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
          "-=0.4"
        )
        .from(
          ".hero-subtitle",
          { y: 30, autoAlpha: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".hero-location",
          { y: 20, autoAlpha: 0, duration: 0.5 },
          "-=0.2"
        )
        .from(
          ".hero-cta",
          { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.15 },
          "-=0.2"
        )
        .from(
          ".hero-scroll-hint",
          { y: 10, autoAlpha: 0, duration: 0.5 },
          "-=0.1"
        );

      // Background orb pulse
      gsap.to(".hero-orb", {
        scale: 1.15,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll hint bounce
      gsap.to(".hero-scroll-hint", {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="hero-gradient relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-orb absolute h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="hero-orb absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-primary/3 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <div className="hero-headshot invisible mb-4 flex justify-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background sm:h-28 sm:w-28">
            {headshot}
          </div>
        </div>

        <p className="hero-greeting invisible mb-4 text-lg text-muted-foreground md:text-xl">
          {dict.hero.greeting}
        </p>

        <h1 className="hero-title mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="word invisible inline-block">
            {dict.hero.title1}
          </span>{" "}
          <span className="word invisible inline-block text-primary">
            {dict.hero.title2}
          </span>
        </h1>

        <p className="hero-subtitle invisible mb-4 text-lg text-muted-foreground md:text-xl lg:text-2xl">
          {dict.hero.subtitle}
        </p>

        <div className="hero-location invisible mb-10 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {dict.hero.location}
          </span>
          <span className="hidden sm:inline text-border">·</span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {dict.hero.status}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#parcours"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hero-cta invisible"
            )}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            {dict.hero.ctaParcours}
          </a>
          <Link
            href={`/${locale}/articles`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "hero-cta invisible"
            )}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {dict.hero.ctaArticles}
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#a-propos"
        className="hero-scroll-hint invisible absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <span className="text-xs uppercase tracking-widest">
            {dict.hero.scroll}
          </span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </a>
    </section>
  );
}
