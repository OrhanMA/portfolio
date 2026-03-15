export type CookieConsent = {
  necessary: true; // Always true — cannot be declined
  analytics: boolean;
};

const CONSENT_KEY = "cookie-consent";
const CONSENT_COOKIE = "cookie-consent-given";

/**
 * Read stored consent from localStorage.
 * Returns null if no consent has been given yet.
 */
export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

/**
 * Store consent preferences in localStorage and set a cookie
 * so the server/middleware can read consent status.
 */
export function setStoredConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  // Set a cookie so we know consent was given (readable server-side)
  document.cookie = `${CONSENT_COOKIE}=true;path=/;max-age=31536000;SameSite=Lax`;
}

/**
 * Check if the user has given any consent decision (accept or reject).
 */
export function hasConsentBeenGiven(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) !== null;
}

/**
 * Check if analytics cookies are accepted.
 */
export function isAnalyticsAccepted(): boolean {
  const consent = getStoredConsent();
  return consent?.analytics ?? false;
}
