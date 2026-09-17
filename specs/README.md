# Plans de test fonctionnels

Ce dossier décrit les parcours attendus dans un langage lisible. Les fichiers `e2e/*.spec.ts` restent la source exécutable et peuvent couvrir plusieurs variantes d'un même parcours.

## Documents

- [`user-flows.md`](./user-flows.md) : matrice comportementale des parcours publics et des états critiques.

## Commandes de vérification

| Commande | Périmètre |
| --- | --- |
| `pnpm test:unit` | Logique et composants sous jsdom. |
| `pnpm test:browser` | Composants et captures dans Chromium. |
| `pnpm test` | Projets Vitest unitaires et navigateur. |
| `pnpm build` | Build Next.js de production. |
| `pnpm test:e2e` | Parcours Playwright contre un build de production. |

`playwright.config.ts` construit puis démarre le site en local lorsque nécessaire. Avant de conclure sur le rendu, s'assurer que le serveur sert bien le build courant et non un ancien dossier `.next`.

## Maintenance

- Décrire ici les comportements et risques couverts, pas les sélecteurs internes de chaque test.
- Mettre à jour le plan lorsqu'un parcours public, un contrôle interactif ou une exigence d'accessibilité change.
- Conserver les scénarios FR/EN, desktop/mobile, clavier, mouvement réduit et sans JavaScript lorsqu'ils s'appliquent.
- Inspecter une différence visuelle avant de mettre à jour une capture de référence.
- Maintenir des baselines séparées pour macOS et Linux.
