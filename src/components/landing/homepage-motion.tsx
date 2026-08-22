"use client";

import { useEffect } from "react";

const sectionGroups = [
  { root: "#a-propos", selectors: [".about-copy", ".about-stamp"] },
  { root: "#parcours", selectors: [".journey-row"] },
  { root: "#contact", selectors: [".contact-copy", ".contact-circle"] },
];

function revealTargets(
  targets: HTMLElement[],
  reducedMotion: boolean,
  initialDelay = 0,
) {
  targets.forEach((target, index) => {
    target.classList.remove("invisible");
    if (reducedMotion) return;

    target.animate?.(
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 420,
        delay: initialDelay + index * 45,
        easing: "ease-out",
        fill: "backwards",
      },
    );
  });
}

export function HomepageMotion() {
  useEffect(() => {
    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const observers: IntersectionObserver[] = [];

    const observe = (root: HTMLElement, targets: HTMLElement[]) => {
      const reveal = () => revealTargets(targets, reducedMotion);
      const isHashTarget = root.id && window.location.hash === `#${root.id}`;

      if (isHashTarget || reducedMotion || !("IntersectionObserver" in window)) {
        reveal();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          reveal();
          observer.disconnect();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(root);
      observers.push(observer);
    };

    sectionGroups.forEach(({ root: rootSelector, selectors }) => {
      const root = document.querySelector<HTMLElement>(rootSelector);
      if (!root) return;
      const targets = selectors.flatMap((selector) =>
        Array.from(root.querySelectorAll<HTMLElement>(selector)),
      );
      observe(root, targets);
    });

    document.querySelectorAll<HTMLElement>(".reveal-root").forEach((root) => {
      const selector = root.dataset.revealStagger;
      const delay = Number(root.dataset.revealDelay ?? 0) * 1000;
      const targets = selector
        ? Array.from(root.querySelectorAll<HTMLElement>(selector))
        : [root];

      const reveal = () => revealTargets(targets, reducedMotion, delay);
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
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(root);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
