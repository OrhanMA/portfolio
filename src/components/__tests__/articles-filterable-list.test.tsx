import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ArticlesFilterableList,
  formatArticleDate,
} from "@/components/articles-filterable-list";
import { renderWithProviders, screen, userEvent } from "@/test/utils";

const replaceStateMock = vi.fn();
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  usePathname: () => "/fr/articles",
  useSearchParams: () => currentSearchParams,
}));

const articles = [
  {
    slug: "odoo-migration",
    title: "Migration Odoo",
    description: "Retour sur une migration ERP.",
    date: "2026-05-13",
    tags: ["Odoo", "ERP"],
    readingMinutes: 3,
    searchText: "Migration Odoo Retour sur une migration ERP staging qweb",
  },
  {
    slug: "cap2vie",
    title: "CAP2vie",
    description: "Application de trajectoires de vie.",
    date: "2026-05-13",
    tags: ["D3.js", "Recherche"],
    readingMinutes: 4,
    searchText:
      "CAP2vie Application de trajectoires de vie conflit sociologique socket",
  },
];

const labels = {
  allTopics: "Tous",
  searchPlaceholder: "Rechercher par titre, contenu ou tag...",
  clearSearch: "Effacer la recherche",
  noResults: "Aucun article ne correspond à ces filtres.",
  readingTime: "Temps de lecture",
  minuteShort: "min",
};

describe("ArticlesFilterableList", () => {
  beforeEach(() => {
    replaceStateMock.mockClear();
    vi.spyOn(window.history, "replaceState").mockImplementation(replaceStateMock);
    currentSearchParams = new URLSearchParams();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("filters articles by tag", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(container.querySelector("[data-articles-index]")).toBeInTheDocument();
    expect(container.querySelector("[data-articles-filter-panel]")).toBeInTheDocument();
    expect(container.querySelector("[data-article-cards]")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "D3.js" })[0]);

    expect(screen.getByText("CAP2vie")).toBeInTheDocument();
    expect(screen.queryByText("Migration Odoo")).not.toBeInTheDocument();
  });

  it("keeps article-card tag controls large enough and exposes their selected state", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    const tag = screen.getAllByRole("button", { name: "D3.js" })[0];
    expect(tag).toHaveAttribute("aria-pressed", "false");
    expect(tag).toHaveClass("h-7");

    await user.click(tag);

    expect(tag).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps tag controls outside article links", () => {
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    const articleTag = screen.getByRole("link", { name: "D3.js" });

    expect(articleTag).toHaveAttribute("href", "/fr/realisations/app-trajectoires-de-vie");
    expect(articleTag.parentElement?.closest("a")).toBeNull();
    expect(screen.getByRole("link", { name: "CAP2vie" })).toHaveAttribute(
      "href",
      "/fr/articles/cap2vie",
    );
  });

  it("initializes filters from the URL search params", () => {
    currentSearchParams = new URLSearchParams("tag=Odoo&q=qweb");

    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(screen.getByRole("searchbox")).toHaveValue("qweb");
    expect(screen.getByText("Migration Odoo")).toBeInTheDocument();
    expect(screen.queryByText("CAP2vie")).not.toBeInTheDocument();
  });

  it("keeps date-only article values stable across time zones", () => {
    const date = new Date("2026-05-13");
    const format = (timeZone: string) =>
      new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone,
      }).format(date);

    expect(format("America/Los_Angeles")).toBe("12 mai 2026");
    expect(format("UTC")).toBe("13 mai 2026");
    expect(formatArticleDate("2026-05-13", "fr")).toBe("13 mai 2026");
  });

  it("adopts external URL changes without rewriting them", () => {
    currentSearchParams = new URLSearchParams("q=odoo&sort=recent");

    const view = renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(screen.getByRole("searchbox")).toHaveValue("odoo");

    currentSearchParams = new URLSearchParams("q=socket&sort=recent");
    view.rerender(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(screen.getByRole("searchbox")).toHaveValue("socket");
    expect(screen.getByText("CAP2vie")).toBeInTheDocument();
    expect(screen.queryByText("Migration Odoo")).not.toBeInTheDocument();
    expect(replaceStateMock).not.toHaveBeenCalled();
  });

  it("preserves unrelated URL parameters when changing filters", async () => {
    currentSearchParams = new URLSearchParams("sort=recent");
    const user = userEvent.setup();

    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    await user.type(screen.getByRole("searchbox"), "socket");

    expect(replaceStateMock.mock.calls.at(-1)?.[2]).toBe(
      "/fr/articles?sort=recent&q=socket",
    );
  });

  it("does not rewrite the URL when the initial filters already match it", () => {
    currentSearchParams = new URLSearchParams("tag=Odoo&q=qweb");

    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(replaceStateMock).not.toHaveBeenCalled();
  });

  it("keeps the active filters synchronized in the URL", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    await user.click(screen.getAllByRole("button", { name: "D3.js" })[0]);
    await user.type(screen.getByRole("searchbox"), "socket");

    expect(replaceStateMock.mock.calls.at(-1)?.[2]).toBe(
      "/fr/articles?tag=D3.js&q=socket",
    );

    await user.click(screen.getByRole("button", { name: labels.clearSearch }));

    expect(replaceStateMock.mock.calls.at(-1)?.[2]).toBe(
      "/fr/articles?tag=D3.js",
    );
  });

  it("searches in title, content and tags", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    await user.type(screen.getByRole("searchbox"), "socket");

    expect(screen.getByText("CAP2vie")).toBeInTheDocument();
    expect(screen.queryByText("Migration Odoo")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: labels.clearSearch }),
    );
    await user.type(screen.getByRole("searchbox"), "erp");

    expect(screen.getByText("Migration Odoo")).toBeInTheDocument();
    expect(screen.queryByText("CAP2vie")).not.toBeInTheDocument();
  });

  it("shows an empty state when no article matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    await user.type(screen.getByRole("searchbox"), "inexistant");

    expect(screen.getByText(labels.noResults)).toBeInTheDocument();
  });
});
