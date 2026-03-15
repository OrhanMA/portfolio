import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("first request succeeds with remaining = limit - 1", () => {
    const result = rateLimit("test-first", 5, 60_000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("successive requests decrement remaining count", () => {
    const key = "test-successive";
    rateLimit(key, 5, 60_000);
    const result = rateLimit(key, 5, 60_000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(3);
  });

  it("rejects request when limit is reached", () => {
    const key = "test-limit";
    for (let i = 0; i < 3; i++) {
      rateLimit(key, 3, 60_000);
    }
    const result = rateLimit(key, 3, 60_000);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("different keys are independent", () => {
    rateLimit("key-a", 1, 60_000);
    const result = rateLimit("key-b", 1, 60_000);
    expect(result.success).toBe(true);
  });

  it("expired window resets the counter", () => {
    const key = "test-reset";
    // Exhaust the limit
    rateLimit(key, 1, 60_000);
    const rejected = rateLimit(key, 1, 60_000);
    expect(rejected.success).toBe(false);

    // Advance past the window
    vi.advanceTimersByTime(60_001);

    const after = rateLimit(key, 1, 60_000);
    expect(after.success).toBe(true);
    expect(after.remaining).toBe(0);
  });

  it("returns correct resetAt timestamp", () => {
    const now = Date.now();
    const windowMs = 60_000;
    const result = rateLimit("test-reset-at", 5, windowMs);
    expect(result.resetAt).toBe(now + windowMs);
  });

  it("works with custom limit and windowMs", () => {
    const key = "test-custom";
    const result = rateLimit(key, 10, 30_000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
  });
});
