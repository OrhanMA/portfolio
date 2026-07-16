import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("recaptcha client", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "");
    document.getElementById("google-recaptcha-v3")?.remove();
    delete window.grecaptcha;
  });

  afterEach(() => {
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
});
