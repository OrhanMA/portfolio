"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");

    // Skip animation on initial mount
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    // Only animate if pathname actually changed
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      if (
        containerRef.current &&
        !(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
      ) {
        containerRef.current.animate?.(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 400,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
        );
      }
    }
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
