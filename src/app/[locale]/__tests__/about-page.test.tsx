import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "../a-propos/page";

describe("AboutPage", () => {
  it("presents the professional and personal project in French", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "Mon projet professionnel et personnel",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/développeur confirmé et référent technique Odoo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/outil de business intelligence auto-hébergé/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/API, le DevOps et le clean code/i)).toBeInTheDocument();
  });

  it("presents the professional and personal project in English", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "en" }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: "My professional and personal project",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/experienced developer and Odoo technical lead/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/self-hosted business intelligence tool/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/APIs, DevOps, and clean code/i)).toBeInTheDocument();
  });
});
