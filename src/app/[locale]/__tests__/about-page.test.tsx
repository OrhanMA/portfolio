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
    expect(screen.getByText(/DWWM, RNCP bac \+ 2, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/RNCP bac \+ 3, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/alternance en décembre 2024/i)).toBeInTheDocument();
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
    expect(screen.getByText(/DWWM, RNCP level 5, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/RNCP level 6, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/work-study program in December 2024/i)).toBeInTheDocument();
  });

  it("uses Roman numerals for the five editorial sections", async () => {
    const page = await AboutPage({
      params: Promise.resolve({ locale: "fr" }),
    });

    const { container } = render(page);

    expect(
      Array.from(container.querySelectorAll(".editorial-index"), (element) =>
        element.textContent?.trim(),
      ),
    ).toEqual(["I", "II", "III", "IV", "V"]);
  });
});
