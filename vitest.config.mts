import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@/lib/gsap": fileURLToPath(
        new URL("./src/test/__mocks__/gsap.ts", import.meta.url)
      ),
      "server-only": fileURLToPath(
        new URL("./src/test/__mocks__/server-only.ts", import.meta.url)
      ),
    },
  },
  test: {
    name: "unit",
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["src/**/*.browser.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/components/**",
        "src/middleware.ts",
        "src/app/**/actions/**",
        "src/app/**/dictionaries.ts",
      ],
      exclude: [
        "src/components/ui/**",
        "src/lib/gsap.ts",
        "src/components/theme-provider.tsx",
        "src/components/smooth-scroll.tsx",
        "src/components/page-transition.tsx",
        "src/components/set-lang.tsx",
        "src/test/**",
      ],
    },
  },
});
