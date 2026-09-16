import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  sendContactEmail,
  submitContactForm,
} from "@/app/[locale]/actions/contact";
import { escapeHtml } from "@/lib/utils";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("next/headers", () => ({
  headers: vi.fn(() =>
    Promise.resolve(new Map([["x-forwarded-for", "127.0.0.1"]])),
  ),
}));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: mockSend } };
  }),
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() =>
    Promise.resolve({
      success: true,
      remaining: 4,
      resetAt: Date.now() + 3_600_000,
    }),
  ),
}));

vi.mock("@/lib/recaptcha", () => ({
  verifyRecaptcha: vi.fn(() =>
    Promise.resolve({ success: true, score: 0.9 }),
  ),
  RECAPTCHA_THRESHOLD: 0.5,
}));

const validData = {
  name: "Jean Dupont",
  email: "jean@example.com",
  reason: "offer" as const,
  message: "Bonjour, je souhaite discuter d'une opportunite professionnelle.",
  honeypot: "",
  timestamp: Date.now() - 10_000,
};

describe("escapeHtml()", () => {
  it("escapes HTML metacharacters", () => {
    expect(escapeHtml('Hello & "World" <script>')).toBe(
      "Hello &amp; &quot;World&quot; &lt;script&gt;",
    );
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  it("keeps plain and empty strings unchanged", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World");
    expect(escapeHtml("")).toBe("");
  });
});

describe("sendContactEmail()", () => {
  beforeEach(async () => {
    mockSend.mockReset();
    mockSend.mockResolvedValue({ error: null });
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockResolvedValue({
      success: true,
      remaining: 4,
      resetAt: Date.now() + 3_600_000,
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns an error for invalid schema data", async () => {
    const result = await sendContactEmail("fr", {
      name: "",
      email: "bad",
      reason: "offer",
      message: "",
    } as Parameters<typeof sendContactEmail>[1]);

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("invalides");
  });

  it("silently succeeds for a filled honeypot without sending", async () => {
    const result = await sendContactEmail("fr", {
      ...validData,
      honeypot: "bot-filled",
    });

    expect(result?.success).toBe(true);
    expect(result?.message).toContain("succès");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("uses the same validation and anti-spam path for native form data", async () => {
    const formData = new FormData();
    formData.set("name", validData.name);
    formData.set("email", validData.email);
    formData.set("reason", validData.reason);
    formData.set("message", validData.message);
    formData.set("honeypot", "bot-filled");
    formData.set("timestamp", String(validData.timestamp));
    formData.set("recaptchaToken", "");

    await submitContactForm("fr", formData);

    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects submissions completed too quickly", async () => {
    const result = await sendContactEmail("fr", {
      ...validData,
      timestamp: Date.now() - 1_000,
    });

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("patienter");
  });

  it("returns localized errors for the English form", async () => {
    const result = await sendContactEmail("en", {
      ...validData,
      timestamp: Date.now(),
    });

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("wait");
  });

  it("rejects when the durable rate limit is exceeded", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockResolvedValueOnce({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 3_600_000,
    });

    const result = await sendContactEmail("fr", validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("Trop de messages");
  });

  it("fails closed when the rate-limit store is unavailable", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockRejectedValueOnce(new Error("Redis unavailable"));

    const result = await sendContactEmail("fr", validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("sécurité");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects when reCAPTCHA fails", async () => {
    const { verifyRecaptcha } = await import("@/lib/recaptcha");
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({
      success: false,
      score: 0.2,
    });

    const result = await sendContactEmail("fr", {
      ...validData,
      recaptchaToken: "bad-token",
    });

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("sécurité");
  });

  it.each([
    ["times out", new Error("The operation was aborted")],
    ["rejects due to a network error", new Error("Network error")],
    ["returns malformed JSON", new SyntaxError("Unexpected token")],
  ])("returns a temporary-unavailable result when reCAPTCHA %s", async (_label, error) => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    const { verifyRecaptcha } = await import("@/lib/recaptcha");
    vi.mocked(verifyRecaptcha).mockRejectedValueOnce(error);

    const result = await sendContactEmail("fr", {
      ...validData,
      recaptchaToken: "unavailable-token",
    });

    expect(result).toMatchObject({
      status: "temporarily-unavailable",
      success: false,
    });
    expect(result?.message).toContain("sécurité");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects a missing reCAPTCHA token when configured", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");

    const result = await sendContactEmail("fr", validData);

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("sécurité");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends an escaped email through Resend", async () => {
    const result = await sendContactEmail("fr", validData);

    expect(result?.success).toBe(true);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining("[Portfolio]"),
        html: expect.not.stringContaining("<script>"),
        text: expect.stringContaining("Jean Dupont"),
      }),
    );
  });

  it("strips line breaks from email subjects", async () => {
    await sendContactEmail("fr", {
      ...validData,
      name: "Jean\r\nBcc: attacker@example.com",
    });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.not.stringMatching(/[\r\n]/),
      }),
    );
  });

  it("returns a localized error when Resend reports a failure", async () => {
    mockSend.mockResolvedValueOnce({ error: { message: "API error" } });

    const result = await sendContactEmail("en", validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("error");
  });

  it("returns a localized error when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network error"));

    const result = await sendContactEmail("en", validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("unexpected");
  });
});
