import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  ArticleStructuredData,
  StructuredData,
} from "@/components/structured-data";

function readGraph(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return {
    script,
    graph: JSON.parse(script?.textContent ?? "{}") as {
      "@graph": Array<Record<string, unknown>>;
    },
  };
}

describe("StructuredData", () => {
  it("uses ProfilePage only on the localized homepage", () => {
    const { container, rerender } = render(
      <StructuredData locale="fr" pathname="/fr" nonce="nonce-value" />,
    );
    let result = readGraph(container);
    expect(result.script).toHaveAttribute("nonce", "nonce-value");
    expect(result.graph["@graph"].at(-1)?.["@type"]).toBe("ProfilePage");

    rerender(
      <StructuredData
        locale="fr"
        pathname="/fr/contact"
        nonce="nonce-value"
      />,
    );
    result = readGraph(container);
    expect(result.graph["@graph"].at(-1)?.["@type"]).toBe("WebPage");
  });

  it("emits TechArticle and breadcrumb schemas", () => {
    const { container } = render(
      <ArticleStructuredData
        locale="en"
        slug="odoo-session-timeout"
        headline="Odoo sessions"
        description="Technical guide"
        datePublished="2026-03-13"
        tags={["Odoo"]}
      />,
    );
    const { graph } = readGraph(container);
    expect(graph["@graph"].map((item) => item["@type"])).toEqual([
      "TechArticle",
      "BreadcrumbList",
    ]);
    expect(graph["@graph"][0]?.inLanguage).toBe("fr-FR");
  });
});
