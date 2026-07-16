"use client";

import { useEffect } from "react";

const activationEvents = ["wheel", "touchstart", "pointerdown", "keydown"];

type FontLoader = () => Promise<{ deferredFontClassName: string }>;

export function FontActivation({ loadFonts }: { loadFonts?: FontLoader }) {
  useEffect(() => {
    let activated = false;

    const removeListeners = () => {
      activationEvents.forEach((eventName) => {
        window.removeEventListener(eventName, activate);
      });
    };

    const activate = () => {
      if (activated) return;
      activated = true;
      removeListeners();
      const loader = loadFonts ?? (() => import("@/components/deferred-fonts"));
      void loader().then(({ deferredFontClassName }) => {
        document.documentElement.classList.add(
          ...deferredFontClassName.split(" ").filter(Boolean),
        );
      });
    };

    activationEvents.forEach((eventName) => {
      window.addEventListener(eventName, activate, {
        passive: true,
        once: true,
      });
    });
    const timeout = window.setTimeout(activate, 5000);

    return () => {
      window.clearTimeout(timeout);
      removeListeners();
    };
  }, [loadFonts]);

  return null;
}
