import { render, screen } from "@testing-library/react";
import Link from "next/link";
import { describe, expect, it } from "vitest";
import { LinkedText } from "@/components/linked-text";

describe("LinkedText", () => {
  it("links exact technology and experience mentions in the active language", () => {
    render(
      <LinkedText locale="en">
        <p>WordPress and Elementor at A. Gaveau, then Odoo/Python.</p>
      </LinkedText>,
    );
    expect(screen.getByRole("link", { name: "WordPress" })).toHaveAttribute(
      "href",
      "/en/parcours/a-gaveau-web-developer-internship",
    );
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/en/competences/python",
    );
    expect(screen.getByRole("link", { name: "A. Gaveau" })).toBeInTheDocument();
  });
  it("preserves existing links, code, controls and partial words", () => {
    const { container } = render(
      <LinkedText locale="fr">
        <p>
          <Link href="/fr/articles">Odoo</Link> <code>Python</code>{" "}
          <button>React</button> OdooSomething PostgreSQL
        </p>
      </LinkedText>,
    );
    expect(container.querySelector("a a, code a, button a")).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Odoo" })).toHaveAttribute(
      "href",
      "/fr/articles",
    );
  });
  it("preserves emphasis and sends current-page mentions to another page", () => {
    render(
      <LinkedText locale="fr" currentPath="/competences/python">
        <strong>Python</strong>
      </LinkedText>,
    );
    expect(screen.getByRole("link", { name: "Python" })).toHaveAttribute(
      "href",
      "/fr/competences",
    );
  });
});
