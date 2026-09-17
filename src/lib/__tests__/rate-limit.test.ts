import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("tracks an isolated fixed window in the current server instance", async () => {
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

  it("does not call an external service in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const fetchSpy = vi.spyOn(global, "fetch");
    const key = `production-${crypto.randomUUID()}`;

    await expect(rateLimit(key)).resolves.toMatchObject({
      success: true,
      remaining: 4,
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
