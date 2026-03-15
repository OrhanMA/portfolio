import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendContactEmail } from "@/app/[locale]/actions/contact";
import { escapeHtml } from "@/lib/utils";

// Use vi.hoisted so mockSend is available when vi.mock factories run (they're hoisted)
const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn(),
}));

// Mock next/headers
vi.mock("next/headers", () => ({
  headers: vi.fn(() =>
    Promise.resolve(
      new Map([["x-forwarded-for", "127.0.0.1"]])
    )
  ),
}));

// Mock resend — use a regular function (not arrow) so it works as a constructor with `new`
vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: mockSend } };
  }),
}));

// Mock rate limiter
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 4, resetAt: Date.now() + 3600000 })),
}));

// Mock recaptcha
vi.mock("@/lib/recaptcha", () => ({
  verifyRecaptcha: vi.fn(() => Promise.resolve({ success: true, score: 0.9 })),
  RECAPTCHA_THRESHOLD: 0.5,
}));

const validData = {
  name: "Jean Dupont",
  email: "jean@example.com",
  reason: "offer",
  message: "Bonjour, je souhaite discuter d'une opportunite professionnelle.",
  honeypot: "",
  timestamp: Date.now() - 10000, // 10 seconds ago
};

describe("escapeHtml()", () => {
  it("escapes & < > quotes", () => {
    expect(escapeHtml('Hello & "World" <script>')).toBe(
      "Hello &amp; &quot;World&quot; &lt;script&gt;"
    );
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  it("handles strings with no special chars", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});

describe("sendContactEmail()", () => {
  beforeEach(() => {
    mockSend.mockReset();
    mockSend.mockResolvedValue({ error: null });
  });

  it("returns error for invalid schema data", async () => {
    const result = await sendContactEmail({
      name: "",
      email: "bad",
      reason: "",
      message: "",
    } as any);

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("invalides");
  });

  it("rejects honeypot-filled submissions at schema level", async () => {
    const result = await sendContactEmail({
      ...validData,
      honeypot: "bot-filled",
    });

    // Schema rejects non-empty honeypot (max(0)) → validation error
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("invalides");
    // Should NOT have called Resend
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns error when submission is too fast", async () => {
    const result = await sendContactEmail({
      ...validData,
      timestamp: Date.now() - 1000, // Only 1 second ago
    });

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("patienter");
  });

  it("returns error when rate limit is exceeded", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockReturnValueOnce({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 3600000,
    });

    const result = await sendContactEmail(validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("Trop de messages");
  });

  it("returns error when reCAPTCHA fails", async () => {
    const { verifyRecaptcha } = await import("@/lib/recaptcha");
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({
      success: false,
      score: 0.2,
    });

    const result = await sendContactEmail({
      ...validData,
      recaptchaToken: "bad-token",
    });

    expect(result?.success).toBe(false);
    expect(result?.message).toContain("securite");
  });

  it("sends email via Resend on success", async () => {
    const result = await sendContactEmail(validData);

    expect(result?.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining("[Portfolio]"),
      })
    );
  });

  it("returns error when Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({
      error: { message: "API error" },
    });

    const result = await sendContactEmail(validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("erreur");
  });

  it("returns error when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network error"));

    const result = await sendContactEmail(validData);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain("inattendue");
  });
});
