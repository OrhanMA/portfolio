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

function getRedisCredentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function localRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
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

async function redisRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  credentials: { url: string; token: string },
): Promise<RateLimitResult> {
  const script = [
    "local current = redis.call('INCR', KEYS[1])",
    "if current == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end",
    "local ttl = redis.call('PTTL', KEYS[1])",
    "return {current, ttl}",
  ].join("\n");
  const response = await fetch(credentials.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      script,
      "1",
      `portfolio:contact:${key}`,
      String(windowMs),
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Rate-limit store returned ${response.status}.`);
  }

  const payload = (await response.json()) as {
    result?: [number, number];
    error?: string;
  };
  if (payload.error || !Array.isArray(payload.result)) {
    throw new Error(payload.error ?? "Invalid rate-limit store response.");
  }

  const [count, ttl] = payload.result.map(Number);
  if (!Number.isFinite(count) || !Number.isFinite(ttl)) {
    throw new Error("Invalid rate-limit counters.");
  }

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: Date.now() + Math.max(0, ttl),
  };
}

/**
 * Consumes one contact-form attempt. Production uses an atomic Redis window so
 * the limit remains consistent across serverless instances. Tests and local
 * development use an isolated in-process store.
 */
export async function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1_000,
): Promise<RateLimitResult> {
  const credentials = getRedisCredentials();
  if (credentials) {
    return redisRateLimit(key, limit, windowMs, credentials);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "A durable Redis rate-limit store is required in production.",
    );
  }

  return localRateLimit(key, limit, windowMs);
}
