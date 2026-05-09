"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Code2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import { cn } from "@/lib/utils";

export function HeroSection({
  locale,
  headshot,
}: {
  locale: string;
  headshot: ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-kicker",
            ".hero-word",
            ".hero-copy",
            ".hero-meta",
            ".hero-cta",
            ".hero-panel",
            ".hero-proof",
            ".hero-scroll-hint",
          ],
          { autoAlpha: 1, y: 0, scale: 1 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-kicker", { y: 24, autoAlpha: 0, duration: 0.65 })
        .from(
          ".hero-word",
          { y: 90, autoAlpha: 0, duration: 0.9, stagger: 0.08 },
          "-=0.25",
        )
        .from(
          ".hero-copy",
          { y: 28, autoAlpha: 0, duration: 0.65, stagger: 0.08 },
          "-=0.45",
        )
        .from(
          ".hero-meta",
          { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
          "-=0.35",
        )
        .from(
          ".hero-cta",
          { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        .from(
          ".hero-panel",
          { y: 40, scale: 0.96, autoAlpha: 0, duration: 0.85 },
          "-=0.65",
        )
        .from(
          ".hero-proof",
          { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.08 },
          "-=0.35",
        )
        .from(
          ".hero-scroll-hint",
          { y: 10, autoAlpha: 0, duration: 0.5 },
          "-=0.1",
        );

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
      className="hero-gradient relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-8 pt-28 sm:px-6 lg:px-8"
    >
      <div className="section-ambient absolute inset-0 opacity-45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
        <div className="pb-8 lg:pb-0">
          <p className="hero-kicker invisible mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-primary">
            <Sparkles className="h-4 w-4" />
            {dict.hero.eyebrow}
          </p>

          <h1 className="text-balance max-w-5xl text-6xl font-semibold leading-[0.84] tracking-normal sm:text-7xl md:text-8xl lg:text-9xl">
            {["Orhan ", "Madi ", "Assani"].map((word) => (
              <span key={word} className="hero-word invisible block">
                {word}
              </span>
            ))}
          </h1>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(220px,0.34fr)] lg:items-start">
            <p className="hero-copy invisible max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {dict.hero.statement}
            </p>

            <div className="grid gap-3 text-sm text-muted-foreground">
              <span className="hero-meta invisible flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {dict.hero.location}
              </span>
              <span className="hero-meta invisible flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                {dict.hero.status}
              </span>
              <span className="hero-meta invisible flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                {dict.hero.subtitle}
              </span>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#realisations"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hero-cta invisible h-12 rounded-lg px-5 text-sm",
              )}
            >
              {dict.hero.ctaWork}
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hero-cta invisible h-12 rounded-lg px-5 text-sm",
              )}
            >
              {dict.hero.ctaContact}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="hero-panel invisible premium-card relative overflow-hidden rounded-lg p-3 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-[0.8fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.82fr_1fr]">
            <div className="relative min-h-72 overflow-hidden rounded-md bg-muted sm:min-h-96">
              {headshot}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  {dict.hero.availabilityLabel}
                </p>
                <p className="mt-2 text-sm text-foreground">
                  {dict.hero.availability}
                </p>
              </div>
            </div>

            <div className="grid content-between gap-3">
              {dict.hero.proofs.map(
                (proof: { value: string; label: string }, index: number) => (
                  <div
                    key={proof.label}
                    className="hero-proof invisible rounded-md border border-border/70 bg-background/55 p-4"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      0{index + 1}
                    </p>
                    <p className="mt-4 text-3xl font-semibold leading-none text-foreground">
                      {proof.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {proof.label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#a-propos"
        aria-label={dict.hero.scroll}
        className="hero-scroll-hint invisible absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            {dict.hero.scroll}
          </span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </a>
    </section>
  );
}
