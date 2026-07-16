import { describe, it, expect } from "vitest";
import {
  locales,
  defaultLocale,
  isValidLocale,
  parseLocale,
} from "@/lib/i18n";

describe("i18n config", () => {
  it("locales contains exactly fr and en", () => {
    expect(locales).toEqual(["fr", "en"]);
  });

  it("defaultLocale is fr", () => {
    expect(defaultLocale).toBe("fr");
  });
});

describe("parseLocale()", () => {
  it("returns a typed supported locale", () => {
    expect(parseLocale("fr")).toBe("fr");
    expect(parseLocale("en")).toBe("en");
  });

  it("returns null instead of coercing an unsupported locale", () => {
    expect(parseLocale("de")).toBeNull();
  });
});

describe("isValidLocale()", () => {
  it('returns true for "fr"', () => {
    expect(isValidLocale("fr")).toBe(true);
  });

  it('returns true for "en"', () => {
    expect(isValidLocale("en")).toBe(true);
  });

  it('returns false for "de"', () => {
    expect(isValidLocale("de")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isValidLocale("")).toBe(false);
  });

  it('returns false for "FR" (case-sensitive)', () => {
    expect(isValidLocale("FR")).toBe(false);
  });
});
