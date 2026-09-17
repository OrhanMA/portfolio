import "server-only";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const localStore = new Map<string, RateLimitEntry>();

/**
 * Consumes one contact-form attempt in the current server instance.
 *
 * This best-effort limiter is intentionally local: it adds no paid external
 * dependency and complements reCAPTCHA, the honeypot and the minimum
 * submission time. Serverless instances do not share this in-memory state.
 */
export async function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1_000,
): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = localStore.get(key);

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + windowMs;
    localStore.set(key, { count: 1, resetAt });
    return { success: true, remaining: Math.max(0, limit - 1), resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}
