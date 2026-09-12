export type CookieConsent = {
  necessary: true;
  analytics: boolean;
};

export function shouldReloadAfterAnalyticsWithdrawal(
  previousConsent: Pick<CookieConsent, "analytics"> | null,
  nextConsent: CookieConsent,
): boolean {
  return previousConsent?.analytics === true && nextConsent.analytics === false;
}

type StoredCookieConsent = CookieConsent & {
  version: 2;
  decidedAt: number;
};

const CONSENT_KEY = "cookie-consent";
const CONSENT_COOKIE = "cookie-consent-given";
const CONSENT_ANALYTICS_COOKIE = "cookie-consent-analytics";
const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;
let sessionConsent: StoredCookieConsent | null = null;
let persistenceWriteFailed = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isStoredConsent(value: unknown): value is StoredCookieConsent {
  if (!value || typeof value !== "object") return false;
  const consent = value as Partial<StoredCookieConsent>;
  return (
    consent.version === CONSENT_VERSION &&
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.decidedAt === "number" &&
    Date.now() - consent.decidedAt <= CONSENT_MAX_AGE_SECONDS * 1_000 &&
    consent.decidedAt <= Date.now() + 60_000
  );
}

function deleteAnalyticsCookies() {
  const analyticsCookie = /^(_ga|_gid|_gat|_gac_|_gat_|__utm)/;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !analyticsCookie.test(name)) continue;
    document.cookie = `${name}=;Max-Age=0;Path=/;SameSite=Lax`;
    if (location.hostname.includes(".")) {
      document.cookie = `${name}=;Max-Age=0;Path=/;Domain=.${location.hostname};SameSite=Lax`;
    }
  }
}

function updateAnalyticsRuntime(accepted: boolean) {
  const measurementId =
    typeof process === "undefined"
      ? undefined
      : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (measurementId) {
    (window as unknown as Record<string, unknown>)[
      `ga-disable-${measurementId}`
    ] = !accepted;
  }
  window.gtag?.("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
  });
  window.dataLayer?.push({
    event: "cookie_consent_update",
    analytics_storage: accepted ? "granted" : "denied",
  });
  if (!accepted) deleteAnalyticsCookies();
}

function clearPersistedConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Storage is optional. The in-memory decision remains the session fallback.
  }

  try {
    document.cookie = `${CONSENT_COOKIE}=;Max-Age=0;Path=/;SameSite=Lax`;
    document.cookie = `${CONSENT_ANALYTICS_COOKIE}=;Max-Age=0;Path=/;SameSite=Lax`;
  } catch {
    // Cookie persistence is optional for the consent UI.
  }
}

function readCookie(name: string): string | null {
  try {
    const entry = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

function readAnalyticsCookie(): boolean | null {
  const value = readCookie(CONSENT_ANALYTICS_COOKIE);
  if (value === "1") return true;
  if (value === "0") return false;
  return null;
}

function createCookieFallback(analytics: boolean): StoredCookieConsent {
  return {
    necessary: true,
    analytics,
    version: CONSENT_VERSION,
    decidedAt: Date.now(),
  };
}

function persistConsentCookies(consent: CookieConsent): boolean {
  try {
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=true;Path=/;Max-Age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax${secure}`;
    document.cookie = `${CONSENT_ANALYTICS_COOKIE}=${consent.analytics ? "1" : "0"};Path=/;Max-Age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax${secure}`;
    return (
      readCookie(CONSENT_COOKIE) === "true" &&
      readAnalyticsCookie() === consent.analytics
    );
  } catch {
    return false;
  }
}

export function getStoredConsent(): StoredCookieConsent | null {
  if (typeof window === "undefined") return null;

  // A failed write means the in-memory decision is newer than anything that
  // can still be read from storage. Never replace an explicit withdrawal with
  // an older accepted value during this session.
  if (persistenceWriteFailed && sessionConsent) {
    return sessionConsent;
  }

  let raw: string | null;
  try {
    raw = localStorage.getItem(CONSENT_KEY);
  } catch {
    // A privacy-restricted browser can deny reads as well as writes.
    return sessionConsent;
  }

  if (!raw) {
    if (persistenceWriteFailed) return sessionConsent;
    const cookieAnalytics = readAnalyticsCookie();
    if (cookieAnalytics !== null) {
      sessionConsent = createCookieFallback(cookieAnalytics);
      return sessionConsent;
    }
    sessionConsent = null;
    return null;
  }

  try {
    const stored: unknown = JSON.parse(raw);
    if (isStoredConsent(stored)) {
      const cookieAnalytics = readAnalyticsCookie();
      // The preference cookie is a small durable fallback for browsers where
      // localStorage writes are blocked. It also prevents an old accepted
      // localStorage value from reviving analytics after a failed withdrawal.
      sessionConsent =
        cookieAnalytics === null || cookieAnalytics === stored.analytics
          ? stored
          : createCookieFallback(cookieAnalytics);
      persistenceWriteFailed = false;
      return sessionConsent;
    }
  } catch {
    // Invalid consent is cleared below and requested again.
  }

  const cookieAnalytics = readAnalyticsCookie();
  if (cookieAnalytics !== null) {
    sessionConsent = createCookieFallback(cookieAnalytics);
    persistenceWriteFailed = false;
    return sessionConsent;
  }

  sessionConsent = null;
  persistenceWriteFailed = false;
  clearPersistedConsent();
  return null;
}

export function setStoredConsent(consent: CookieConsent): boolean {
  if (typeof window === "undefined") return false;
  const stored: StoredCookieConsent = {
    ...consent,
    version: CONSENT_VERSION,
    decidedAt: Date.now(),
  };
  sessionConsent = stored;

  let storagePersisted = false;
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
    persistenceWriteFailed = false;
    storagePersisted = true;
  } catch {
    // Keep the explicit decision in memory for this session.
    persistenceWriteFailed = true;

    // Remove an old accepted value when the browser still permits removal.
    // The preference cookie below covers the complementary case where this
    // operation is blocked as well.
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // The session decision remains authoritative until the page is closed.
    }
  }

  const cookiesPersisted = persistConsentCookies(consent);
  if (cookiesPersisted) {
    // The cookie preference is now a durable source of truth, so a failed
    // localStorage write no longer needs to pin the module to its session
    // fallback.
    persistenceWriteFailed = false;
  }

  try {
    updateAnalyticsRuntime(consent.analytics);
  } catch (error) {
    console.error("Unable to update analytics consent runtime:", error);
  }

  return storagePersisted || cookiesPersisted;
}

export function hasConsentBeenGiven(): boolean {
  return getStoredConsent() !== null;
}

export function isAnalyticsAccepted(): boolean {
  return getStoredConsent()?.analytics ?? false;
}
