import { describe, it, expect } from "vitest";
import { contactSchema, contactReasons } from "@/lib/schemas/contact";

const validData = {
  name: "Jean Dupont",
  email: "jean@example.com",
  reason: "offer",
  message: "Bonjour, je souhaite discuter d'une opportunite.",
  timestamp: Date.now() - 5_000,
};

describe("contactSchema", () => {
  describe("valid submissions", () => {
    it("accepts a complete valid form submission", () => {
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("accepts submission with reason != other and no customSubject", () => {
      const result = contactSchema.safeParse({
        ...validData,
        reason: "freelance",
      });
      expect(result.success).toBe(true);
    });

    it("accepts honeypot as empty string", () => {
      const result = contactSchema.safeParse({
        ...validData,
        honeypot: "",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a reCAPTCHA token when provided", () => {
      const result = contactSchema.safeParse({
        ...validData,
        timestamp: 1234567890,
        recaptchaToken: "token123",
      });
      expect(result.success).toBe(true);
    });

    it('accepts reason "other" with customSubject provided', () => {
      const result = contactSchema.safeParse({
        ...validData,
        reason: "other",
        customSubject: "Mon sujet",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("invalid submissions", () => {
    it("rejects a submission without a timestamp", () => {
      const result = contactSchema.safeParse({
        ...validData,
        timestamp: undefined,
      });
      expect(result.success).toBe(false);
    });

    it("rejects name shorter than 2 chars", () => {
      const result = contactSchema.safeParse({ ...validData, name: "A" });
      expect(result.success).toBe(false);
    });

    it("rejects name longer than 100 chars", () => {
      const result = contactSchema.safeParse({
        ...validData,
        name: "A".repeat(101),
      });
      expect(result.success).toBe(false);
    });

    it("rejects invalid email format", () => {
      const result = contactSchema.safeParse({
        ...validData,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty reason", () => {
      const result = contactSchema.safeParse({ ...validData, reason: "" });
      expect(result.success).toBe(false);
    });

    it("rejects message shorter than 10 chars", () => {
      const result = contactSchema.safeParse({
        ...validData,
        message: "Short",
      });
      expect(result.success).toBe(false);
    });

    it("rejects message longer than 5000 chars", () => {
      const result = contactSchema.safeParse({
        ...validData,
        message: "A".repeat(5001),
      });
      expect(result.success).toBe(false);
    });

    it("rejects filled honeypot (bot detection)", () => {
      const result = contactSchema.safeParse({
        ...validData,
        honeypot: "bot-filled-this",
      });
      expect(result.success).toBe(false);
    });

    it('rejects reason "other" without customSubject', () => {
      const result = contactSchema.safeParse({
        ...validData,
        reason: "other",
      });
      expect(result.success).toBe(false);
    });

    it('rejects reason "other" with empty customSubject', () => {
      const result = contactSchema.safeParse({
        ...validData,
        reason: "other",
        customSubject: "   ",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("contactReasons", () => {
  it("has 6 entries", () => {
    expect(contactReasons).toHaveLength(6);
  });

  it("contains expected values", () => {
    const values = contactReasons.map((r) => r.value);
    expect(values).toEqual([
      "offer",
      "freelance",
      "collaboration",
      "question",
      "feedback",
      "other",
    ]);
  });
});
