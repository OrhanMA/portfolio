import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const sharedConfig = {
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@/lib/gsap": fileURLToPath(
        new URL("./src/test/__mocks__/gsap.ts", import.meta.url),
      ),
      "server-only": fileURLToPath(
        new URL("./src/test/__mocks__/server-only.ts", import.meta.url),
      ),
    },
  },
};

export default defineConfig({
  ...sharedConfig,
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.browser.test.{ts,tsx}"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.browser.test.{ts,tsx}"],
          exclude: process.env.CI
            ? ["src/components/__tests__/visual.browser.test.tsx"]
            : [],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            headless: true,
          },
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/components/**",
        "src/proxy.ts",
        "src/app/**/actions/**",
        "src/app/**/dictionaries.ts",
      ],
      exclude: [
        "src/components/ui/**",
        "src/lib/gsap.ts",
        "src/components/theme-provider.tsx",
        "src/components/smooth-scroll.tsx",
        "src/components/page-transition.tsx",
        "src/test/**",
      ],
      thresholds: {
        statements: 65,
        branches: 60,
        functions: 65,
        lines: 65,
      },
    },
  },
});
