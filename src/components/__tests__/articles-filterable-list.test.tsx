import { beforeEach, describe, expect, it, vi } from "vitest";
import { ArticlesFilterableList } from "@/components/articles-filterable-list";
import { renderWithProviders, screen, userEvent } from "@/test/utils";

const replaceMock = vi.fn();
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  usePathname: () => "/fr/articles",
  useRouter: () => ({
    replace: replaceMock,
  }),
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
    replaceMock.mockClear();
    currentSearchParams = new URLSearchParams();
  });

  it("filters articles by tag", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

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

    const articleTag = screen.getAllByRole("button", { name: "D3.js" })[1];

    expect(articleTag.closest("a")).toBeNull();
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

  it("does not rewrite the URL when the initial filters already match it", () => {
    currentSearchParams = new URLSearchParams("tag=Odoo&q=qweb");

    renderWithProviders(
      <ArticlesFilterableList
        articles={articles}
        locale="fr"
        labels={labels}
      />,
    );

    expect(replaceMock).not.toHaveBeenCalled();
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

    expect(replaceMock).toHaveBeenLastCalledWith(
      "/fr/articles?tag=D3.js&q=socket",
      { scroll: false },
    );

    await user.click(screen.getByRole("button", { name: labels.clearSearch }));

    expect(replaceMock).toHaveBeenLastCalledWith("/fr/articles?tag=D3.js", {
      scroll: false,
    });
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
