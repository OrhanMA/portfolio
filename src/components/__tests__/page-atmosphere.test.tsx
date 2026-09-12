import { describe, expect, it } from "vitest";
import { resolvePageAtmosphere } from "@/components/page-atmosphere";

describe("resolvePageAtmosphere", () => {
  it.each([
    ["/fr", "home", false],
    ["/en/a-propos", "about", false],
    ["/fr/parcours/1up-fullstack-developer", "journey", false],
    ["/fr/competences", "skills", false],
    ["/en/competences/communication", "skills", false],
    ["/fr/realisations", "work", false],
    ["/fr/realisations/modules-metier-odoo", "work", false],
    ["/en/projects/legacy", "work", false],
    ["/fr/contact", "home", true],
    ["/en/articles", "home", true],
  ] as const)("maps %s to %s", (pathname, family, secondary) => {
    expect(resolvePageAtmosphere(pathname)).toEqual({ family, secondary });
  });
});
