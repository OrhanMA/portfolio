import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export class RateLimitUnavailableError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "RateLimitUnavailableError";
  }
}

function getRateLimitConfiguration() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new RateLimitUnavailableError(
      "The durable contact rate limiter is not configured.",
    );
  }

  return { url, token };
}

/**
 * Consumes one contact-form attempt in a shared Upstash Redis window.
 *
 * There is deliberately no in-memory fallback: a missing or unavailable
 * durable store must prevent an email from being sent instead of silently
 * weakening anti-spam protection across serverless instances.
 */
export async function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60 * 60 * 1_000,
): Promise<RateLimitResult> {
  const { url, token } = getRateLimitConfiguration();
  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
    prefix: "portfolio:contact",
  });

  try {
    const result = await limiter.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  } catch (error) {
    throw new RateLimitUnavailableError(
      "The durable contact rate limiter is unavailable.",
      { cause: error },
    );
  }
}
