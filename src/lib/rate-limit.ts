/**
 * Simple in-memory rate limiter.
 * Tracks submissions per key (typically IP address).
 *
 * NOTE: This works per-process. In a serverless environment (Vercel),
 * each function invocation may have its own memory space, so this
 * provides a best-effort rate limit. For stricter needs, use Redis
 * (e.g. Upstash) or Vercel KV.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 10 minutes
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}

/**
 * Check and consume a rate limit token.
 *
 * @param key - Unique identifier (IP address, user ID, etc.)
 * @param limit - Maximum number of requests in the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 * @returns { success, remaining, resetAt }
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1000
): { success: boolean; remaining: number; resetAt: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or window expired — create fresh
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  // Within window — check count
  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  // Increment
  entry.count++;
  return {
    success: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}
