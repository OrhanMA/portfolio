import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyRecaptcha, RECAPTCHA_THRESHOLD } from "@/lib/recaptcha";

describe("RECAPTCHA_THRESHOLD", () => {
  it("is 0.5", () => {
    expect(RECAPTCHA_THRESHOLD).toBe(0.5);
  });
});

describe("verifyRecaptcha() (server-side)", () => {
  beforeEach(() => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns success when no secret key is configured (dev mode)", async () => {
    const result = await verifyRecaptcha("some-token");
    expect(result).toEqual({ success: true, score: 1 });
  });

  it("returns failure when token is empty", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    const result = await verifyRecaptcha("");
    expect(result).toEqual({ success: false, score: 0 });
  });

  it("calls Google API with correct params", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, score: 0.9, action: "contact" }))
    );

    await verifyRecaptcha("test-token");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://www.google.com/recaptcha/api/siteverify",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("returns success when score >= 0.5", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, score: 0.7, action: "contact" }))
    );

    const result = await verifyRecaptcha("test-token");
    expect(result.success).toBe(true);
    expect(result.score).toBe(0.7);
  });

  it("returns failure when score < 0.5", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true, score: 0.3, action: "contact" }))
    );

    const result = await verifyRecaptcha("test-token");
    expect(result.success).toBe(false);
    expect(result.score).toBe(0.3);
  });

  it("returns failure when API returns success: false", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          score: 0,
          action: "contact",
          "error-codes": ["invalid-input-response"],
        })
      )
    );

    const result = await verifyRecaptcha("test-token");
    expect(result.success).toBe(false);
  });
});
