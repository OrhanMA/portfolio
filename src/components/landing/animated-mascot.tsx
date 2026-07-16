"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type AnimatedMascotProps = {
  src: string;
  variantSrc: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  intervalMs?: number;
  initialDelayMs?: number;
  frameDurationMs?: number;
};

export function AnimatedMascot({
  src,
  variantSrc,
  width,
  height,
  className,
  imageClassName,
  intervalMs = 6200,
  initialDelayMs = 3200,
  frameDurationMs = 320,
}: AnimatedMascotProps) {
  const animationInterval = Math.max(intervalMs, frameDurationMs, 1);
  const frameDuration = Math.min(
    Math.max(frameDurationMs, 1),
    animationInterval,
  );
  const delay = Math.max(initialDelayMs, 0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const variant = containerRef.current?.querySelector<HTMLElement>(
        '[data-mascot-layer="variant"]',
      );
      if (!variant) return;

      gsap.set(variant, { autoAlpha: 0 });
      if (
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap
        .timeline({
          delay: delay / 1000,
          repeat: -1,
          repeatDelay: (animationInterval - frameDuration) / 1000,
        })
        .set(variant, { autoAlpha: 1, visibility: "visible" })
        .set(
          variant,
          { autoAlpha: 0, visibility: "hidden" },
          frameDuration / 1000,
        );
    },
    {
      scope: containerRef,
      dependencies: [animationInterval, delay, frameDuration],
      revertOnUpdate: true,
    },
  );

  return (
    <span
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative isolate block", className)}
      data-mascot-animation
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={cn(
          "mascot-layer-base absolute inset-0 z-0 block h-full w-full",
          imageClassName,
        )}
        data-mascot-layer="base"
        style={{ animation: "none", opacity: 1, visibility: "visible" }}
      />
      <Image
        src={variantSrc}
        alt=""
        width={width}
        height={height}
        className={cn(
          "mascot-layer-variant absolute inset-0 z-10 block h-full w-full",
          imageClassName,
        )}
        data-mascot-layer="variant"
        style={{ opacity: 0, visibility: "hidden" }}
      />
    </span>
  );
}
