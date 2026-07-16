import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_MAX_AGE_SECONDS,
  getStoredConsent,
  hasConsentBeenGiven,
  isAnalyticsAccepted,
  setStoredConsent,
} from "@/lib/cookie-consent";

describe("cookie-consent utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = "cookie-consent-given=;Max-Age=0;Path=/";
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
});
