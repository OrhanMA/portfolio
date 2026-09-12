import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_MAX_AGE_SECONDS,
  getStoredConsent,
  hasConsentBeenGiven,
  isAnalyticsAccepted,
  setStoredConsent,
  shouldReloadAfterAnalyticsWithdrawal,
} from "@/lib/cookie-consent";

describe("cookie-consent utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "cookie-consent-given=;Max-Age=0;Path=/";
    document.cookie = "cookie-consent-analytics=;Max-Age=0;Path=/";
    // Reset the module's session fallback through a successful storage read so
    // each test starts without inheriting a previous quota failure.
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        version: 2,
        decidedAt: Date.now(),
      }),
    );
    getStoredConsent();
    localStorage.clear();
    getStoredConsent();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("stores a versioned, timestamped consent for six months", () => {
    const now = 1_700_000_000_000;
    vi.spyOn(Date, "now").mockReturnValue(now);

    setStoredConsent({ necessary: true, analytics: true });

    expect(getStoredConsent()).toEqual({
      necessary: true,
      analytics: true,
      version: 2,
      decidedAt: now,
    });
    expect(document.cookie).toContain("cookie-consent-given=true");
    expect(CONSENT_MAX_AGE_SECONDS).toBe(15_552_000);
    vi.restoreAllMocks();
  });

  it("rejects malformed, legacy, future and expired consent", () => {
    const cases = [
      "not-json",
      JSON.stringify({ necessary: true, analytics: true }),
      JSON.stringify({
        necessary: true,
        analytics: true,
        version: 2,
        decidedAt: Date.now() + 120_000,
      }),
      JSON.stringify({
        necessary: true,
        analytics: true,
        version: 2,
        decidedAt: Date.now() - (CONSENT_MAX_AGE_SECONDS + 1) * 1_000,
      }),
    ];

    for (const stored of cases) {
      localStorage.setItem("cookie-consent", stored);
      expect(getStoredConsent()).toBeNull();
      expect(localStorage.getItem("cookie-consent")).toBeNull();
    }
  });

  it("fails closed when reading storage is denied", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage access denied");
    });

    expect(() => getStoredConsent()).not.toThrow();
    expect(getStoredConsent()).toBeNull();
    expect(isAnalyticsAccepted()).toBe(false);
  });

  it("fails closed when invalid consent cannot be removed", () => {
    localStorage.setItem("cookie-consent", "not-json");
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("Storage removal denied");
    });

    expect(() => getStoredConsent()).not.toThrow();
    expect(getStoredConsent()).toBeNull();
  });

  it("keeps an explicit decision in memory when storage quota is exhausted", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage quota exceeded");
    });

    setStoredConsent({ necessary: true, analytics: false });

    expect(hasConsentBeenGiven()).toBe(true);
    expect(isAnalyticsAccepted()).toBe(false);
  });

  it("does not restore an old acceptance after a failed withdrawal", () => {
    setStoredConsent({ necessary: true, analytics: true });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage quota exceeded");
    });

    expect(setStoredConsent({ necessary: true, analytics: false })).toBe(true);
    expect(getStoredConsent()?.analytics).toBe(false);
    expect(isAnalyticsAccepted()).toBe(false);
  });

  it("reports whether a valid decision and analytics consent exist", () => {
    expect(hasConsentBeenGiven()).toBe(false);
    expect(isAnalyticsAccepted()).toBe(false);

    setStoredConsent({ necessary: true, analytics: false });
    expect(hasConsentBeenGiven()).toBe(true);
    expect(isAnalyticsAccepted()).toBe(false);

    setStoredConsent({ necessary: true, analytics: true });
    expect(isAnalyticsAccepted()).toBe(true);
  });

  it("removes Google Analytics cookies when consent is withdrawn", () => {
    document.cookie = "_ga=test;Path=/";
    document.cookie = "portfolio=value;Path=/";

    setStoredConsent({ necessary: true, analytics: false });

    expect(document.cookie).not.toContain("_ga=test");
    expect(document.cookie).toContain("portfolio=value");
  });

  it("requires a reload only when already-granted analytics consent is withdrawn", () => {
    expect(
      shouldReloadAfterAnalyticsWithdrawal(
        { analytics: true },
        { necessary: true, analytics: false },
      ),
    ).toBe(true);
    expect(
      shouldReloadAfterAnalyticsWithdrawal(
        { analytics: false },
        { necessary: true, analytics: false },
      ),
    ).toBe(false);
    expect(
      shouldReloadAfterAnalyticsWithdrawal(null, {
        necessary: true,
        analytics: false,
      }),
    ).toBe(false);
  });
});
