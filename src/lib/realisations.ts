import { migrationOdooV16V19 } from "./realisations/migration-odoo-v16-v19";
import { modulesMetierOdoo } from "./realisations/modules-metier-odoo";
import { refonteSiteCorporate } from "./realisations/refonte-site-corporate";
import { appTrajectoiresDeVie } from "./realisations/app-trajectoires-de-vie";
import { portfolioProfessionnel } from "./realisations/portfolio-professionnel";
import type { Realisation } from "./realisations/types";

export type { Realisation, RealisationMedia } from "./realisations/types";

export const realisations: Realisation[] = [
  migrationOdooV16V19,
  modulesMetierOdoo,
  refonteSiteCorporate,
  appTrajectoiresDeVie,
  portfolioProfessionnel,
];

export function getRealisationBySlug(slug: string) {
  return realisations.find((realisation) => realisation.slug === slug);
}
