import { describe, it, expect } from "vitest";
import { getDictionary } from "@/app/[locale]/dictionaries";

function leafPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      leafPaths(item, `${prefix}[${index}]`),
    );
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

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

  it("both dictionaries have matching deep leaf paths", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");

    expect(leafPaths(fr).sort()).toEqual(leafPaths(en).sort());
  });

  it("exposes the TOEIC date in both languages", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");

    expect(fr.proofs.items.toeic.description).toContain("7 août 2025");
    expect(en.proofs.items.toeic.description).toContain("August 7, 2025");
    expect(
      fr.experience.entries.find((entry) => entry.title.startsWith("TOEIC"))
        ?.period,
    ).toBe("7 août 2025");
    expect(
      en.experience.entries.find((entry) => entry.title.startsWith("TOEIC"))
        ?.period,
    ).toBe("August 7, 2025");
  });

  it("keeps timeline chronology metadata identical across locales", async () => {
    const fr = await getDictionary("fr");
    const en = await getDictionary("en");
    const chronology = (entries: typeof fr.experience.entries) =>
      entries.map(({ id, startDate, endDate }) => ({
        id,
        startDate,
        endDate,
      }));

    expect(chronology(en.experience.entries)).toEqual(
      chronology(fr.experience.entries),
    );

    for (const entry of chronology(fr.experience.entries)) {
      expect(entry.startDate).toMatch(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
      if (entry.endDate !== null) {
        expect(entry.endDate).toMatch(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
      }
    }
  });
});
