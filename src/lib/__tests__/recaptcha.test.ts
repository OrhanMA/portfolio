import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RECAPTCHA_THRESHOLD, verifyRecaptcha } from "@/lib/recaptcha";

describe("RECAPTCHA_THRESHOLD", () => {
  it("is 0.5", () => {
    expect(RECAPTCHA_THRESHOLD).toBe(0.5);
  });
});

describe("verifyRecaptcha()", () => {
  const validResponse = () => ({
    success: true,
    score: 0.9,
    action: "contact_form",
    hostname: "orhanmadiassani.com",
    challenge_ts: new Date().toISOString(),
  });

  beforeEach(() => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("is optional when no secret key is configured", async () => {
    expect(await verifyRecaptcha("some-token")).toEqual({
      success: true,
      score: 1,
    });
  });

  it("rejects an empty token when verification is configured", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    expect(await verifyRecaptcha("")).toEqual({ success: false, score: 0 });
  });

  it("posts the token to Google's verification endpoint", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(validResponse())));

    await verifyRecaptcha("test-token");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://www.google.com/recaptcha/api/siteverify",
      expect.objectContaining({ method: "POST", cache: "no-store" }),
    );
  });

  it("accepts a fresh token with the expected score, action and hostname", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ...validResponse(), score: 0.7 })),
    );

    expect(await verifyRecaptcha("test-token")).toEqual({
      success: true,
      score: 0.7,
    });
  });

  it.each([
    ["a low score", { score: 0.3 }],
    ["another action", { action: "login" }],
    ["another hostname", { hostname: "evil.example" }],
    [
      "an expired challenge",
      { challenge_ts: new Date(Date.now() - 3 * 60_000).toISOString() },
    ],
  ])("rejects %s", async (_label, override) => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ...validResponse(), ...override })),
    );

    expect((await verifyRecaptcha("test-token")).success).toBe(false);
  });

  it("rejects unsuccessful and non-OK verification responses", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ ...validResponse(), success: false })),
    );
    expect((await verifyRecaptcha("test-token")).success).toBe(false);

    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response("unavailable", { status: 503 }),
    );
    expect((await verifyRecaptcha("test-token")).success).toBe(false);
  });
});
