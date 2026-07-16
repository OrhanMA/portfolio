import { beforeEach, describe, expect, it, vi } from "vitest";
import { ArticleEnhancements } from "@/components/article-enhancements";
import { renderWithProviders, screen, userEvent } from "@/test/utils";

let pathname = "/fr/articles/migration-odoo-v16-v19";
const writeTextMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

const labels = {
  readingTime: "Temps de lecture",
  minuteShort: "min",
  tableOfContents: "Sommaire",
  relatedArticles: "Articles liés",
  copyLink: "Copier le lien",
  copied: "Lien copié",
  frenchOnlyNotice: "Article rédigé en français, traduction navigateur recommandée.",
};

const articles = [
  {
    slug: "migration-odoo-v16-v19",
    title: "Migration Odoo",
    tags: ["Odoo", "Migration"],
  },
  {
    slug: "odoo-javascript",
    title: "JavaScript dans Odoo",
    tags: ["Odoo", "JavaScript"],
  },
];

const headings = [
  { id: "contexte-metier", text: "Contexte métier", level: 2 },
  { id: "migration-progressive", text: "Migration progressive", level: 3 },
];

describe("ArticleEnhancements", () => {
  beforeEach(() => {
    pathname = "/fr/articles/migration-odoo-v16-v19";
    writeTextMock.mockReset();
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: {
        ...window.navigator,
        clipboard: { writeText: writeTextMock },
      },
    });
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "https://orhanmadiassani.com/fr/articles/migration-odoo-v16-v19" },
    });
  });

  it("renders server-derived table-of-contents data without waiting for hydration", () => {
    renderWithProviders(
      <>
        <article>
          <h2>Contexte métier</h2>
          <p>Un court contenu de test.</p>
          <h3>Migration progressive</h3>
        </article>
        <ArticleEnhancements
          locale="fr"
          slug="migration-odoo-v16-v19"
          articles={articles}
          headings={headings}
          readingMinutes={2}
          labels={labels}
        />
      </>,
    );

    expect(
      screen.getByRole("navigation", { name: labels.tableOfContents }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contexte métier/ })).toHaveAttribute(
      "href",
      "#contexte-metier",
    );
    expect(screen.getByRole("link", { name: /Migration progressive/ })).toHaveAttribute(
      "href",
      "#migration-progressive",
    );
    expect(screen.getByText(labels.relatedArticles)).toBeInTheDocument();
  });

  it("shows copied feedback after using the copy link button", async () => {
    writeTextMock.mockResolvedValue(undefined);
    const user = userEvent.setup();

    renderWithProviders(
      <>
        <article>
          <h2>Contexte métier</h2>
        </article>
        <ArticleEnhancements
          locale="fr"
          slug="migration-odoo-v16-v19"
          articles={articles}
          headings={headings}
          readingMinutes={2}
          labels={labels}
        />
      </>,
    );

    await user.click(screen.getByRole("button", { name: labels.copyLink }));

    expect(
      await screen.findByRole("button", { name: labels.copied }),
    ).toBeInTheDocument();
  });

  it("shows the French article notice on English article pages", () => {
    pathname = "/en/articles/migration-odoo-v16-v19";

    renderWithProviders(
      <>
        <article>
          <h2>Context</h2>
        </article>
        <ArticleEnhancements
          locale="en"
          slug="migration-odoo-v16-v19"
          articles={articles}
          headings={headings}
          readingMinutes={2}
          labels={labels}
        />
      </>,
      { locale: "en" },
    );

    expect(screen.getByText(labels.frenchOnlyNotice)).toBeInTheDocument();
  });
});
