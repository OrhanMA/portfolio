import { defineWorkspace } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineWorkspace([
  // Unit/integration tests with jsdom (references existing config)
  "vitest.config.mts",
  // Browser component + visual regression tests (inline config)
  {
    plugins: [react()],
    resolve: {
      tsconfigPaths: true,
      alias: {
        "@/lib/gsap": fileURLToPath(
          new URL("./src/test/__mocks__/gsap.ts", import.meta.url)
        ),
      },
    },
    test: {
      name: "browser",
      include: ["src/**/*.browser.test.{ts,tsx}"],
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [{ browser: "chromium" }],
        headless: true,
      },
    },
  },
]);
