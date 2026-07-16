"use client";

import { useEffect } from "react";

type MotionKind =
  | "copy"
  | "stamp"
  | "ninja"
  | "marker"
  | "samurai"
  | "hanging-ninja"
  | "circle"
  | "petals"
  | "sakura";

const fromTransforms: Record<MotionKind, string> = {
  copy: "translateY(30px)",
  stamp: "translateY(38px) scale(0.9)",
  ninja: "translate(80%, 24px) rotate(10deg)",
  marker: "scale(0) rotate(-12deg)",
  samurai: "translate(-82%, 32px) rotate(-9deg)",
  "hanging-ninja": "translate(120px, -50px) rotate(8deg)",
  circle: "scale(0.72)",
  petals: "translate(28px, 18px) rotate(8deg)",
  sakura: "translateX(100px) rotate(5deg)",
};

function revealElement(
  element: HTMLElement,
  kind: MotionKind,
  delay: number,
  reducedMotion: boolean,
) {
  element.classList.remove("invisible");
  if (reducedMotion) return;

  element.animate?.(
    [
      { opacity: 0, transform: fromTransforms[kind] },
      { opacity: 1, transform: "translate(0, 0) scale(1) rotate(0deg)" },
    ],
    {
      duration: kind === "marker" ? 450 : 700,
      delay,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "backwards",
    },
  );
}

export function HomepageMotion() {
  useEffect(() => {
    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const observers: IntersectionObserver[] = [];

    const observe = (
      root: HTMLElement | null,
      groups: Array<{ selector: string; kind: MotionKind }>,
      rootMargin = "0px 0px -14% 0px",
    ) => {
      if (!root) return;

      const reveal = () => {
        let index = 0;
        groups.forEach(({ selector, kind }) => {
          root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            revealElement(element, kind, index * 70, reducedMotion);
            index += 1;
          });
        });
      };

      if (reducedMotion || !("IntersectionObserver" in window)) {
        reveal();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          reveal();
          observer.disconnect();
        },
        { rootMargin },
      );
      observer.observe(root);
      observers.push(observer);
    };

    observe(document.querySelector("#a-propos"), [
      { selector: ".about-copy", kind: "copy" },
      { selector: ".about-stamp", kind: "stamp" },
      { selector: ".about-ninja", kind: "ninja" },
    ]);
    observe(document.querySelector("#parcours"), [
      { selector: ".journey-row", kind: "copy" },
      { selector: ".journey-marker", kind: "marker" },
      { selector: ".journey-samurai", kind: "samurai" },
      { selector: ".journey-hanging-ninja", kind: "hanging-ninja" },
    ]);
    observe(document.querySelector("#contact"), [
      { selector: ".contact-copy", kind: "copy" },
      { selector: ".contact-circle", kind: "circle" },
      { selector: ".contact-petals", kind: "petals" },
      { selector: ".contact-samurai", kind: "samurai" },
      { selector: ".contact-sakura", kind: "sakura" },
    ]);

    document.querySelectorAll<HTMLElement>(".reveal-root").forEach((root) => {
      const selector = root.dataset.revealStagger;
      const y = Number(root.dataset.revealY ?? 28);
      const delay = Number(root.dataset.revealDelay ?? 0) * 1000;
      const targets = selector
        ? Array.from(root.querySelectorAll<HTMLElement>(selector))
        : [root];

      const reveal = () => {
        targets.forEach((target, index) => {
          target.classList.remove("invisible");
          if (reducedMotion) return;
          target.animate?.(
            [
              { opacity: 0, transform: `translateY(${y}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 700,
              delay: delay + (selector ? index * 80 : 0),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            },
          );
        });
      };

      if (reducedMotion || !("IntersectionObserver" in window)) {
        reveal();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          reveal();
          observer.disconnect();
        },
        { rootMargin: "0px 0px -14% 0px" },
      );
      observer.observe(root);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
