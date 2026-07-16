import { describe, expect, it } from "vitest";
import {
  createContactEmailHtml,
  createContactEmailText,
} from "@/lib/contact-email";

const message = {
  locale: "fr" as const,
  name: 'Jean <Dupont>',
  email: "jean@example.com",
  reasonLabel: "Proposition professionnelle",
  message: "Bonjour,\nJe souhaite échanger.",
};

describe("contact email template", () => {
  it("renders the portfolio identity and a reply CTA", () => {
    const html = createContactEmailHtml(message);

    expect(html).toContain("ORHAN MADI ASSANI · PORTFOLIO");
    expect(html).toContain("Nouveau message");
    expect(html).toContain("Répondre à Jean &lt;Dupont&gt;");
    expect(html).toContain("mailto:jean@example.com?subject=Re%3A%20Proposition%20professionnelle");
  });

  it("escapes user-provided values and preserves message line breaks", () => {
    const html = createContactEmailHtml({
      ...message,
      message: '<script>alert("xss")</script>\nBonjour',
    });

    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;<br />Bonjour");
  });

  it("provides a readable English plain-text fallback", () => {
    const text = createContactEmailText({ ...message, locale: "en" });

    expect(text).toContain("New message");
    expect(text).toContain("Email address: jean@example.com");
  });
});
