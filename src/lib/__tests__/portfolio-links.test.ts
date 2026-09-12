import { describe, expect, it } from "vitest";
import {
  resolveCompetenceLinks,
  resolveRealisationLinks,
} from "@/lib/portfolio-links";

describe("portfolio link resolution", () => {
  it("returns localized titles from the canonical catalogs", () => {
    expect(resolveRealisationLinks(["migration-odoo-v16-v19"], "fr")).toEqual([
      {
        slug: "migration-odoo-v16-v19",
        title: "Migration d'un ERP d'entreprise d'Odoo 16 vers Odoo 19",
      },
    ]);
    expect(resolveCompetenceLinks(["developpement-frontend"], "en")).toEqual([
      {
        slug: "developpement-frontend",
        title: "Frontend Development (React/Next.js)",
      },
    ]);
  });

  it("fails with the source relation when a slug is not catalogued", () => {
    expect(() => resolveRealisationLinks(["missing-realisation"], "fr")).toThrow(
      "Unknown realisation slug referenced by experience: missing-realisation",
    );
  });
});
