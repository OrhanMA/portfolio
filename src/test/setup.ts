import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Node 26 exposes a `localStorage` getter on the process global. Vitest's
// jsdom environment skips replacing existing globals that are not part of its
// browser key list, so use jsdom's storage object when that getter returns
// nothing. This keeps unit tests deterministic across supported Node versions.
const jsdomWindow = (
  globalThis as typeof globalThis & { jsdom?: { window: Window } }
).jsdom?.window;

if (jsdomWindow) {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: jsdomWindow.localStorage,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: jsdomWindow.sessionStorage,
  });
}

// Auto-cleanup after each test (required when globals: true is not set in Vitest config)
afterEach(() => {
  cleanup();
});
