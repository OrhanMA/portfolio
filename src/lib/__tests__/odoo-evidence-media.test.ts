import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getCompetenceBySlug } from "@/lib/competences";
import { getRealisationBySlug } from "@/lib/realisations";

const historicalPaths = [
  "/images/project-screenshots/odoo/odoo-success-migration-v17.png",
  "/images/project-screenshots/odoo/odoo-success-migration-v18.png",
  "/images/project-screenshots/odoo/odoo-success-migration-v19.png",
];

const newPaths = [
  "/images/project-screenshots/odoo/migration-filter-removal-inventory.png",
  "/images/project-screenshots/odoo/migration-git-commits-jan21-26.png",
  "/images/project-screenshots/odoo/migration-git-commits-jan27-28.png",
  "/images/project-screenshots/odoo/migration-git-commits-feb06-08.png",
  "/images/project-screenshots/odoo/migration-hooks-fields-access-rights.png",
  "/images/project-screenshots/odoo/migration-studio-views-pre-migrate.png",
  "/images/project-screenshots/odoo/migration-qweb-reports-post-migrate.png",
  "/images/project-screenshots/odoo/migration-obsolete-automations-cleanup.png",
  "/images/project-screenshots/odoo/migration-filters-data-templates.png",
  "/images/project-screenshots/odoo/migration-business-views-reactivation.png",
  "/images/project-screenshots/odoo/migration-contact-references-post-init.png",
  "/images/project-screenshots/odoo/migration-odoo19-modules-loaded.png",
  "/images/project-screenshots/odoo/jira-odoo-workflow-board.png",
];

const jiraPath = "/images/project-screenshots/odoo/jira-odoo-workflow-board.png";

describe("Odoo evidence media integrity", () => {
  const realisation = getRealisationBySlug("migration-odoo-v16-v19");
  const competence = getCompetenceBySlug("developpement-odoo");

  it("keeps the three historical files and adds all thirteen new files", () => {
    expect(realisation).toBeDefined();
    expect(realisation?.media?.map((item) => item.src)).toEqual([
      ...historicalPaths,
      ...newPaths,
    ]);

    for (const src of [...historicalPaths, ...newPaths]) {
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }
  });

  it("keeps each gallery duplicate-free and only reuses Jira across galleries", () => {
    const realisationPaths = realisation?.media?.map((item) => item.src) ?? [];
    const competencePaths = competence?.media?.map((item) => item.src) ?? [];

    expect(new Set(realisationPaths).size).toBe(realisationPaths.length);
    expect(new Set(competencePaths).size).toBe(competencePaths.length);
    expect(competencePaths).toEqual([jiraPath]);
    expect(realisationPaths.filter((src) => competencePaths.includes(src))).toEqual([
      jiraPath,
    ]);
  });

  it("provides French and English titles and descriptions for every item", () => {
    for (const item of [
      ...(realisation?.media ?? []),
      ...(competence?.media ?? []),
    ]) {
      expect(item.title.fr.trim()).not.toBe("");
      expect(item.title.en.trim()).not.toBe("");
      expect(item.description.fr.trim()).not.toBe("");
      expect(item.description.en.trim()).not.toBe("");
    }
  });

  it("distinguishes the filter inventory from the observed cleanup execution", () => {
    const media = realisation?.media ?? [];
    const inventoryIndex = media.findIndex((item) =>
      item.src.endsWith("migration-filter-removal-inventory.png"),
    );
    const executionIndex = media.findIndex((item) =>
      item.src.endsWith("migration-filters-data-templates.png"),
    );
    const inventory = media[inventoryIndex];
    const execution = media[executionIndex];

    expect(inventoryIndex).toBeGreaterThanOrEqual(0);
    expect(inventoryIndex).toBeLessThan(executionIndex);
    expect(inventory.description.fr).toMatch(/Avant la migration|prépar/i);
    expect(inventory.description.fr).toMatch(/périmètre/i);
    expect(inventory.description.en).toMatch(/Before the migration|pre-migration/i);
    expect(inventory.description.en).toMatch(/scope/i);
    expect(execution.description.fr).toMatch(/exécution observée/i);
    expect(execution.description.en).toMatch(/observed execution/i);
    expect(inventory.description.fr).not.toMatch(/succès du script|script réussi/i);
    expect(inventory.description.en).not.toMatch(/successful script|script succeeded/i);
  });

  it("presents Git evidence as a representative selection across all three periods", () => {
    const gitMedia = (realisation?.media ?? []).filter((item) =>
      item.src.includes("migration-git-commits"),
    );
    const french = gitMedia.map((item) => item.description.fr).join(" ");
    const english = gitMedia.map((item) => item.description.en).join(" ");

    expect(gitMedia.map((item) => item.src)).toEqual(newPaths.slice(1, 4));
    expect(french).toMatch(/21 au 26 janvier 2026/);
    expect(french).toMatch(/27 et 28 janvier 2026/);
    expect(french).toMatch(/6 au 8 février 2026/);
    expect(french).toMatch(/master/);
    expect(english).toMatch(/master/);
    expect(french.match(/sélection représentative/g)).toHaveLength(3);
    expect(english.match(/representative selection/g)).toHaveLength(3);
    expect(`${french} ${english}`).not.toMatch(/exhausti(?:f|ve)/i);
  });

  it("dates Jira and separates the current workflow from migration history", () => {
    const realisationJira = realisation?.media?.find((item) => item.src === jiraPath);
    const competenceJira = competence?.media?.find((item) => item.src === jiraPath);

    expect(realisationJira?.description.fr).toContain("17 septembre 2026");
    expect(realisationJira?.description.fr).toContain("postérieure à la migration");
    expect(realisationJira?.description.en).toContain("September 17, 2026");
    expect(realisationJira?.description.en).toContain("after the v16-v19 migration");
    expect(competenceJira?.description.fr).toContain("17 septembre 2026");
    expect(competenceJira?.description.fr).toContain(
      "non l'historique du projet de migration",
    );
    expect(competenceJira?.description.en).toContain("September 17, 2026");
    expect(competenceJira?.description.en).toContain(
      "not the migration project's historical backlog",
    );
  });
});
