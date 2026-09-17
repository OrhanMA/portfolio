# Portfolio professionnel — Orhan Madi Assani

Portfolio bilingue français/anglais construit avec Next.js 16.3.4, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui avec Base UI, GSAP, Lenis et MDX.

Le site présente le parcours, dix compétences, cinq réalisations détaillées, des modules Odoo documentés, des articles techniques et les preuves publiques nécessaires au dossier professionnel.

## Démarrage local

### Prérequis

- Node.js 22, indiqué dans `.nvmrc` et `package.json` ;
- Corepack ;
- pnpm 10.20.0, déclaré dans `package.json`.

```bash
nvm use
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000). La racine redirige vers `/fr` ou `/en` selon la préférence enregistrée puis l'en-tête `Accept-Language`.

Le formulaire peut être affiché sans configurer les services externes. Pour tester l'envoi, l'anti-spam, la mesure d'audience ou un déploiement, suivre le [guide de configuration](./docs/configuration.md). Ne jamais committer `.env.local`.

## Repères d'architecture

```text
src/
  app/[locale]/                # Routes, layouts et dictionnaires FR/EN
  components/                  # Interface et composants interactifs
  lib/                         # Contenus canoniques, schémas et services
  proxy.ts                     # Détection de locale et CSP à nonce
e2e/                           # Scénarios Playwright exécutables
specs/                         # Plans de test lisibles
docs/                          # Documentation active
reports/                       # Audits et relevés datés
public/proofs/                 # Documents publics présentés dans le footer
```

Les routes utilisent l'App Router et le segment dynamique `[locale]`. Les données structurées du portfolio vivent dans des catalogues canoniques sous `src/lib/`; les dictionnaires JSON portent les libellés et métadonnées d'interface. Les décisions détaillées sont décrites dans [l'architecture](./docs/architecture.md).

## Commandes utiles

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Démarre le serveur de développement. |
| `pnpm build` | Construit la version de production. |
| `pnpm start` | Sert le build `.next` existant. |
| `pnpm lint` | Exécute ESLint. |
| `pnpm typecheck` | Vérifie TypeScript en mode strict. |
| `pnpm audit:security` | Échoue à partir d'une vulnérabilité modérée. |
| `pnpm test:unit` | Exécute les tests Vitest sous jsdom. |
| `pnpm test:browser` | Exécute les tests de composants dans Chromium. |
| `pnpm test:coverage` | Mesure la couverture unitaire et ses seuils. |
| `pnpm test` | Exécute les projets Vitest unitaires et navigateur. |
| `pnpm check:bundle` | Contrôle les budgets des assets produits. |
| `pnpm check:performance` | Mesure le build courant sur des routes représentatives. |
| `pnpm test:e2e` | Exécute les parcours Playwright. |

La CI exécute les contrôles statiques et de sécurité, la couverture, les tests navigateur, le build, les budgets puis les E2E. Les mesures locales et les audits datés ne constituent pas à eux seuls une validation de la production.

## Documentation

- [Sommaire de la documentation](./docs/README.md)
- [Configuration locale et production](./docs/configuration.md)
- [Architecture et décisions](./docs/architecture.md)
- [Recettes de contribution](./docs/contributing.md)
- [Internationalisation](./docs/i18n.md)
- [Système visuel](./docs/design-system.md)
- [Checklist active du portfolio](./PORTFOLIO_CHECKLIST.md)
- [Plans de test](./specs/README.md)
- [Index des audits et rapports](./reports/README.md)

La grille officielle ISCOD/Visiplus est conservée dans [`grille-evaluation-portfolio.pdf`](./grille-evaluation-portfolio.pdf). Les résultats Lighthouse de juillet 2026 sont une photographie historique consultable dans [`reports/lighthouse-production-2026-07-16.md`](./reports/lighthouse-production-2026-07-16.md) ; ils ne décrivent pas automatiquement la version courante.

## Contribution

Avant une revue, vérifier les commandes pertinentes pour le changement effectué et inspecter le diff. Les procédures d'ajout d'une route, d'un article, d'une compétence, d'une réalisation ou d'une langue sont centralisées dans [les recettes de contribution](./docs/contributing.md).
