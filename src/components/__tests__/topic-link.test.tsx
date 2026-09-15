import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopicLink } from "@/components/topic-link";

describe("TopicLink", () => {
  it("gives short labels a WCAG-sized interactive target", () => {
    render(<TopicLink label="API" locale="fr" />);

    const link = screen.getByRole("link", { name: "API" });
    expect(link).toHaveAttribute("href", "/fr/competences/developpement-backend");
    expect(link).toHaveAttribute("data-topic-link");
    expect(link).toHaveClass(
      "inline-flex",
      "min-h-6",
      "min-w-6",
      "items-center",
      "justify-center",
    );
  });
});
