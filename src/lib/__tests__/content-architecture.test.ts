import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { competences } from "@/lib/competences";
import { realisations } from "@/lib/realisations";

const libDirectory = path.join(process.cwd(), "src", "lib");

describe("editorial content architecture", () => {
  it("keeps each achievement in its own module behind a lightweight index", async () => {
    const index = await readFile(path.join(libDirectory, "realisations.ts"), "utf8");
    const files = (await readdir(path.join(libDirectory, "realisations"))).filter(
      (file) => file !== "types.ts",
    );

    expect(index.length).toBeLessThan(5_000);
    expect(files.sort()).toEqual(
      realisations.map((realisation) => `${realisation.slug}.ts`).sort(),
    );
  });

  it("keeps each skill in its own module behind a lightweight index", async () => {
    const index = await readFile(path.join(libDirectory, "competences.ts"), "utf8");
    const files = (await readdir(path.join(libDirectory, "competences"))).filter(
      (file) => file !== "types.ts",
    );

    expect(index.length).toBeLessThan(5_000);
    expect(files.sort()).toEqual(
      competences.map((competence) => `${competence.slug}.ts`).sort(),
    );
  });
});
