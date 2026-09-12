import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RadarChart } from "@/components/radar-chart";

describe("RadarChart navigation", () => {
  it("exposes each skill label as an accessible link", () => {
    render(
      <RadarChart
        title="Skills"
        scaleLabel="out of 100"
        data={[
          { label: "Python", value: 80, href: "/en/competences/python" },
          { label: "DevOps", value: 70, href: "/en/competences/devops" },
          {
            label: "Odoo",
            value: 85,
            href: "/en/competences/developpement-odoo",
          },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: /Skills/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/en/competences/python",
    );
  });
});
