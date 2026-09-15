import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/route-structured-data", () => ({
  RouteStructuredData: () => null,
}));

vi.mock("@/components/contact-form", () => ({
  ContactForm: () => (
    <form aria-label="Contact form">
      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" />
    </form>
  ),
}));

import ContactPage from "../contact/page";

describe("ContactPage", () => {
  it.each([
    ["fr", "Me contacter", "Domaines de connaissance"],
    ["en", "Contact me", "Areas of expertise"],
  ] as const)(
    "merges the %s introduction, knowledge panel and form",
    async (locale, heading, knowledgeHeading) => {
      const page = await ContactPage({
        params: Promise.resolve({ locale }),
      });
      const { container } = render(page);

      expect(screen.getByRole("heading", { name: heading })).toHaveAttribute(
        "id",
        "contact-heading",
      );
      expect(
        screen.getByRole("heading", { name: knowledgeHeading }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /odoo/i })).toHaveAttribute(
        "href",
        `/${locale}/competences/developpement-odoo`,
      );
      expect(screen.getByRole("form", { name: "Contact form" })).toBeInTheDocument();
      expect(container.querySelector("[data-editorial-page-header]")).toBeNull();
      expect(container.querySelector("[data-contact-page]")).toBeInTheDocument();
    },
  );
});
