import "server-only";

export const RECAPTCHA_THRESHOLD = 0.5;

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
}

/**
 * Verify a reCAPTCHA v3 token server-side.
 * Returns { success, score } or throws on network error.
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction = "contact_form",
): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Verification is optional when no secret key is configured.
  if (!secretKey) {
    return { success: true, score: 1 };
  }

  // If no token provided, fail
  if (!token) {
    return { success: false, score: 0 };
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: token }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) return { success: false, score: 0 };

  const data: RecaptchaVerifyResponse = await response.json();
  const score = data.score ?? 0;
  const allowedHostnames = (
    process.env.RECAPTCHA_ALLOWED_HOSTNAMES ??
    "orhanmadiassani.com,www.orhanmadiassani.com"
  )
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);
  const timestamp = data.challenge_ts ? Date.parse(data.challenge_ts) : NaN;
  const isFresh =
    Number.isFinite(timestamp) &&
    timestamp <= Date.now() + 5_000 &&
    Date.now() - timestamp <= 2 * 60 * 1_000;

  return {
    success:
      data.success &&
      score >= RECAPTCHA_THRESHOLD &&
      data.action === expectedAction &&
      Boolean(data.hostname && allowedHostnames.includes(data.hostname)) &&
      isFresh,
    score,
  };
}
