import { describe, it, expect } from "vitest";
import { getDictionary } from "@/app/[locale]/dictionaries";

describe("getDictionary()", () => {
  it("returns French dictionary", async () => {
    const dict = await getDictionary("fr");
    expect(dict.metadata.title).toContain("Orhan Madi Assani");
    expect(dict.nav.home).toBe("Accueil");
  });

  it("returns English dictionary", async () => {
    const dict = await getDictionary("en");
    expect(dict.metadata.title).toContain("Orhan Madi Assani");
    expect(dict.nav.home).toBe("Home");
  });

  it("both dictionaries have matching top-level keys", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");
    const frKeys = Object.keys(fr).sort();
    const enKeys = Object.keys(en).sort();
    expect(frKeys).toEqual(enKeys);
  });
});
