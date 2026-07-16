import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("tracks an isolated fixed window locally in tests", async () => {
    const key = `local-${crypto.randomUUID()}`;
    expect(await rateLimit(key, 2, 60_000)).toMatchObject({
      success: true,
      remaining: 1,
    });
    expect(await rateLimit(key, 2, 60_000)).toMatchObject({
      success: true,
      remaining: 0,
    });
    expect(await rateLimit(key, 2, 60_000)).toMatchObject({
      success: false,
      remaining: 0,
    });
  });

  it("resets the local window after expiry", async () => {
    const key = `reset-${crypto.randomUUID()}`;
    await rateLimit(key, 1, 60_000);
    expect((await rateLimit(key, 1, 60_000)).success).toBe(false);
    vi.advanceTimersByTime(60_001);
    expect((await rateLimit(key, 1, 60_000)).success).toBe(true);
  });

  it("uses an atomic Redis script when durable credentials exist", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "secret");
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: [2, 30_000] })),
    );

    const result = await rateLimit("hashed-ip", 5, 60_000);

    expect(result).toMatchObject({ success: true, remaining: 3 });
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://redis.example",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer secret" }),
      }),
    );
    const request = fetchSpy.mock.calls[0]?.[1];
    expect(String(request?.body)).toContain("EVAL");
  });

  it("fails closed in production without a durable store", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await expect(rateLimit("hashed-ip")).rejects.toThrow("durable Redis");
  });
});
