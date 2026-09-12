import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("recaptcha client", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "");
    document.getElementById("google-recaptcha-v3")?.remove();
    delete window.grecaptcha;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("is a no-op when no public site key is configured", async () => {
    const { executeRecaptcha, preloadRecaptcha } = await import(
      "@/lib/recaptcha-client"
    );
    await expect(preloadRecaptcha()).resolves.toBeUndefined();
    await expect(executeRecaptcha("contact_form")).resolves.toBe("");
  });

  it("loads the script once on intent", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    const { preloadRecaptcha } = await import("@/lib/recaptcha-client");

    const loading = preloadRecaptcha();
    const script = document.getElementById(
      "google-recaptcha-v3",
    ) as HTMLScriptElement;
    expect(script.src).toContain("render=public-key");
    script.dispatchEvent(new Event("load"));
    await expect(loading).resolves.toBeUndefined();
    expect(document.querySelectorAll("#google-recaptcha-v3")).toHaveLength(1);
  });

  it("removes a failed script so the next attempt can load it again", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    const { preloadRecaptcha } = await import("@/lib/recaptcha-client");

    const firstAttempt = preloadRecaptcha();
    const firstScript = document.getElementById("google-recaptcha-v3");
    firstScript?.dispatchEvent(new Event("error"));

    await expect(firstAttempt).rejects.toThrow("Unable to load reCAPTCHA");
    expect(document.getElementById("google-recaptcha-v3")).toBeNull();

    const secondAttempt = preloadRecaptcha();
    const secondScript = document.getElementById("google-recaptcha-v3");
    expect(secondScript).not.toBe(firstScript);
    secondScript?.dispatchEvent(new Event("load"));

    await expect(secondAttempt).resolves.toBeUndefined();
  });

  it("removes a script that never finishes loading", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    vi.useFakeTimers();
    const { preloadRecaptcha, RECAPTCHA_TIMEOUT_MS } = await import(
      "@/lib/recaptcha-client"
    );

    const loading = preloadRecaptcha();
    vi.advanceTimersByTime(RECAPTCHA_TIMEOUT_MS);

    await expect(loading).rejects.toThrow("loading timed out");
    expect(document.getElementById("google-recaptcha-v3")).toBeNull();
  });

  it("executes the expected action through the loaded API", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    const execute = vi.fn().mockResolvedValue("verified-token");
    window.grecaptcha = {
      ready: (callback) => callback(),
      execute,
    };
    const { executeRecaptcha } = await import("@/lib/recaptcha-client");

    await expect(executeRecaptcha("contact_form")).resolves.toBe(
      "verified-token",
    );
    expect(execute).toHaveBeenCalledWith("public-key", {
      action: "contact_form",
    });
  });

  it("times out when the API never calls ready", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    vi.useFakeTimers();
    window.grecaptcha = {
      ready: () => undefined,
      execute: vi.fn(),
    };
    const { executeRecaptcha, RECAPTCHA_TIMEOUT_MS } = await import(
      "@/lib/recaptcha-client"
    );

    const execution = executeRecaptcha("contact_form");
    const rejection = expect(execution).rejects.toThrow("execution timed out");
    await vi.advanceTimersByTimeAsync(RECAPTCHA_TIMEOUT_MS);

    await rejection;
  });

  it("times out when the API never resolves execute", async () => {
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-key");
    vi.useFakeTimers();
    window.grecaptcha = {
      ready: (callback) => callback(),
      execute: vi.fn(() => new Promise<string>(() => undefined)),
    };
    const { executeRecaptcha, RECAPTCHA_TIMEOUT_MS } = await import(
      "@/lib/recaptcha-client"
    );

    const execution = executeRecaptcha("contact_form");
    const rejection = expect(execution).rejects.toThrow("execution timed out");
    await vi.advanceTimersByTimeAsync(RECAPTCHA_TIMEOUT_MS);

    await rejection;
    vi.useRealTimers();
  });
});
