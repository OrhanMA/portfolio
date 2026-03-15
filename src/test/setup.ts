import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Auto-cleanup after each test (required when globals: true is not set in Vitest config)
afterEach(() => {
  cleanup();
});
