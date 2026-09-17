import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockLimit, mockRedis, mockRatelimit, mockSlidingWindow } = vi.hoisted(
  () => {
    const mockLimit = vi.fn();
    const mockRedis = vi.fn(function MockRedis() {});
    const mockSlidingWindow = vi.fn();
    const mockRatelimit = vi.fn(function MockRatelimit() {
      return { limit: mockLimit };
    });
    return { mockLimit, mockRedis, mockRatelimit, mockSlidingWindow };
  },
);

vi.mock("@upstash/redis", () => ({ Redis: mockRedis }));
vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(mockRatelimit, {
    slidingWindow: mockSlidingWindow,
  }),
}));

import { RateLimitUnavailableError, rateLimit } from "@/lib/rate-limit";

describe("rateLimit()", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    mockLimit.mockReset();
    mockRedis.mockReset();
    mockRatelimit.mockClear();
    mockSlidingWindow.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("uses a shared Upstash sliding window", async () => {
    mockLimit.mockResolvedValue({
      success: true,
      remaining: 1,
      reset: 1_700_000_000_000,
    });

    await expect(rateLimit("hashed-ip", 2, 60_000)).resolves.toEqual({
      success: true,
      remaining: 1,
      resetAt: 1_700_000_000_000,
    });
    expect(mockRedis).toHaveBeenCalledWith({
      url: "https://example.upstash.io",
      token: "test-token",
    });
    expect(mockSlidingWindow).toHaveBeenCalledWith(2, "60000 ms");
    expect(mockLimit).toHaveBeenCalledWith("hashed-ip");
  });

  it("returns a denied response when the shared quota is exhausted", async () => {
    mockLimit.mockResolvedValue({
      success: false,
      remaining: 0,
      reset: 1_700_000_000_000,
    });

    await expect(rateLimit("hashed-ip")).resolves.toMatchObject({
      success: false,
      remaining: 0,
    });
  });

  it("accepts the current variable names created by the Vercel Upstash integration", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv(
      "UPSTASH_REDIS_REST_KV_REST_API_URL",
      "",
    );
    vi.stubEnv("UPSTASH_REDIS_REST_KV_REST_API_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "https://integration.upstash.io");
    vi.stubEnv("KV_REST_API_TOKEN", "integration-token");
    mockLimit.mockResolvedValue({
      success: true,
      remaining: 4,
      reset: 1_700_000_000_000,
    });

    await expect(rateLimit("hashed-ip")).resolves.toMatchObject({
      success: true,
      remaining: 4,
    });
    expect(mockRedis).toHaveBeenCalledWith({
      url: "https://integration.upstash.io",
      token: "integration-token",
    });
  });

  it("fails closed when the durable store is not configured", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_URL", "");

    await expect(rateLimit("hashed-ip")).rejects.toBeInstanceOf(
      RateLimitUnavailableError,
    );
    expect(mockLimit).not.toHaveBeenCalled();
  });

  it("fails closed when Upstash is unavailable", async () => {
    const providerError = new Error("Upstash unavailable");
    mockLimit.mockRejectedValue(providerError);

    await expect(rateLimit("hashed-ip")).rejects.toMatchObject({
      name: "RateLimitUnavailableError",
      cause: providerError,
    });
  });
});
