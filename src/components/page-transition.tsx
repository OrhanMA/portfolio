"use client";

import { useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef<string | null>(null);
  const pathname = usePathname();

  const animateIn = useCallback(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      containerRef.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  useGSAP(() => {
    // Skip animation on initial mount
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    // Only animate if pathname actually changed
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      animateIn();
    }
  }, [pathname, animateIn]);

  return <div ref={containerRef}>{children}</div>;
}
