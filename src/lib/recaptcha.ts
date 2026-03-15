// ─── Client-side ─────────────────────────────────────────────

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

/**
 * Execute reCAPTCHA v3 and return a verification token.
 * Must be called from a client component after the reCAPTCHA script has loaded.
 */
export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.warn("reCAPTCHA site key not configured — skipping.");
    return "";
  }

  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      // Script hasn't loaded yet, resolve empty (server will handle gracefully)
      resolve("");
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}

// ─── Server-side ─────────────────────────────────────────────

export const RECAPTCHA_THRESHOLD = 0.5;

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  "error-codes"?: string[];
}

/**
 * Verify a reCAPTCHA v3 token server-side.
 * Returns { success, score } or throws on network error.
 */
export async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If no secret key configured, skip verification (dev mode)
  if (!secretKey) {
    console.warn("reCAPTCHA secret key not configured — skipping verification.");
    return { success: true, score: 1 };
  }

  // If no token provided, fail
  if (!token) {
    return { success: false, score: 0 };
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    }
  );

  const data: RecaptchaVerifyResponse = await response.json();

  return {
    success: data.success && data.score >= RECAPTCHA_THRESHOLD,
    score: data.score ?? 0,
  };
}
