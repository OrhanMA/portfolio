# Documentation du portfolio

Ce dossier contient la documentation active du dépôt. Les résultats datés, mesures et audits sont conservés séparément dans [`reports/`](../reports/README.md).

## Guides actifs

| Document | Rôle |
| --- | --- |
| [`../README.md`](../README.md) | Présentation, démarrage rapide et commandes principales. |
| [`configuration.md`](./configuration.md) | Variables d'environnement, services externes, MCP et déploiement. |
| [`architecture.md`](./architecture.md) | Frontières de rendu, sécurité, données et performance. |
| [`contributing.md`](./contributing.md) | Procédures pour faire évoluer routes et contenus. |
| [`i18n.md`](./i18n.md) | Sources de vérité et règles de localisation. |
| [`design-system.md`](./design-system.md) | Direction visuelle, polices, atmosphères et accessibilité. |
| [`../PORTFOLIO_CHECKLIST.md`](../PORTFOLIO_CHECKLIST.md) | Suivi actif des critères ISCOD et des vérifications restantes. |
| [`../specs/README.md`](../specs/README.md) | Plans de test fonctionnels et correspondance avec les E2E. |

## Références

- [`references/prompts-images-ia.md`](./references/prompts-images-ia.md) conserve les prompts ayant servi à explorer les illustrations. Ils documentent une source de génération, pas une preuve de projet.
- [`../grille-evaluation-portfolio.pdf`](../grille-evaluation-portfolio.pdf) est la grille officielle ISCOD/Visiplus et reste inchangée.
- [`../public/images/project-photography/README.md`](../public/images/project-photography/README.md) consigne la provenance des photographies de projet.

## Principes de maintenance

- Un guide actif décrit le dépôt courant ; une mesure datée appartient à `reports/`.
- Une commande documentée doit exister dans `package.json` ou dans un outil versionné.
- Une variable d'environnement doit correspondre à `.env.example` et au code qui la lit.
- Les chemins internes restent relatifs afin que la documentation fonctionne sur toute machine et sur la forge Git.
- Les rapports historiques ne sont pas réécrits pour ressembler à l'état actuel.
