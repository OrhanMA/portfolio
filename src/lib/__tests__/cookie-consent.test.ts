import { describe, it, expect, beforeEach } from "vitest";
import {
  getStoredConsent,
  setStoredConsent,
  hasConsentBeenGiven,
  isAnalyticsAccepted,
} from "@/lib/cookie-consent";

describe("cookie-consent utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    // Clear cookies
    document.cookie = "cookie-consent-given=;max-age=0";
  });

  describe("getStoredConsent()", () => {
    it("returns null when localStorage is empty", () => {
      expect(getStoredConsent()).toBeNull();
    });

    it("returns parsed consent object when stored", () => {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({ necessary: true, analytics: true })
      );
      expect(getStoredConsent()).toEqual({
        necessary: true,
        analytics: true,
      });
    });

    it("returns null on corrupted JSON", () => {
      localStorage.setItem("cookie-consent", "not-valid-json");
      expect(getStoredConsent()).toBeNull();
    });
  });

  describe("setStoredConsent()", () => {
    it("writes to localStorage", () => {
      setStoredConsent({ necessary: true, analytics: false });
      const stored = JSON.parse(localStorage.getItem("cookie-consent")!);
      expect(stored).toEqual({ necessary: true, analytics: false });
    });

    it("sets a cookie", () => {
      setStoredConsent({ necessary: true, analytics: true });
      expect(document.cookie).toContain("cookie-consent-given=true");
    });
  });

  describe("hasConsentBeenGiven()", () => {
    it("returns false when no consent stored", () => {
      expect(hasConsentBeenGiven()).toBe(false);
    });

    it("returns true after consent is stored", () => {
      setStoredConsent({ necessary: true, analytics: false });
      expect(hasConsentBeenGiven()).toBe(true);
    });
  });

  describe("isAnalyticsAccepted()", () => {
    it("returns false when no consent", () => {
      expect(isAnalyticsAccepted()).toBe(false);
    });

    it("returns false when analytics is false", () => {
      setStoredConsent({ necessary: true, analytics: false });
      expect(isAnalyticsAccepted()).toBe(false);
    });

    it("returns true when analytics is true", () => {
      setStoredConsent({ necessary: true, analytics: true });
      expect(isAnalyticsAccepted()).toBe(true);
    });
  });
});
