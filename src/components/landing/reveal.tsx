"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: string;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  y = 28,
}: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = stagger
        ? gsap.utils.toArray<HTMLElement>(stagger)
        : container.current;

      if (!target) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(target, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        target,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          delay,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: {
            trigger: container.current,
            start: "top 86%",
            once: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className={cn(!stagger && "invisible", className)}>
      {children}
    </div>
  );
}
