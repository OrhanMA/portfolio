import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ArticleLinkedText } from "@/components/article-linked-text";

const params = vi.hoisted(() => ({ locale: "en" }));
vi.mock("next/navigation", () => ({ useParams: () => params }));

describe("article technology links", () => {
  it("uses the reader locale even for a French article", () => {
    render(
      <ArticleLinkedText>Déploiement Odoo avec Docker.</ArticleLinkedText>,
    );
    expect(screen.getByRole("link", { name: "Docker" })).toHaveAttribute(
      "href",
      "/en/competences/devops",
    );
  });
});
