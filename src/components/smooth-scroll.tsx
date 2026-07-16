"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
      false
    ) {
      return;
    }

    let disposed = false;
    let started = false;
    let destroyLenis: (() => void) | undefined;
    const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"];

    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startOnInteraction);
      });
    };

    const startOnInteraction = () => {
      if (started) return;
      started = true;
      removeInteractionListeners();

      void import("@/lib/gsap").then(({ gsap, ScrollTrigger, Lenis }) => {
        if (disposed) return;

        const lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        destroyLenis = () => {
          gsap.ticker.remove(tickerCallback);
          lenis.destroy();
        };
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startOnInteraction, {
        passive: true,
        once: true,
      });
    });

    return () => {
      disposed = true;
      removeInteractionListeners();
      destroyLenis?.();
    };
  }, []);

  return <>{children}</>;
}
