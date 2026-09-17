# Recettes de contribution

Ce guide décrit les étapes à suivre pour les évolutions courantes. Les décisions d'architecture sont documentées dans [`architecture.md`](./architecture.md) et les règles de localisation dans [`i18n.md`](./i18n.md).

## Ajouter une page localisée

1. Créer la route sous `src/app/[locale]/`.
2. Utiliser `getLocalizedPageContext` pour obtenir une `Locale` validée et le dictionnaire.
3. Ajouter les métadonnées, le lien de navigation et l'entrée de sitemap si la page est publique.
4. Préfixer les liens internes par `/${locale}`.
5. Ajouter les textes d'interface dans les deux dictionnaires.
6. Mettre à jour les tests de route, de métadonnées et de navigation concernés.

## Ajouter une compétence ou une réalisation

1. Déclarer l'élément dans son catalogue canonique avec un slug stable.
2. Localiser les contenus avec `Record<Locale, ...>` ou `LocalizedContent`.
3. Déclarer les relations vers les expériences, compétences et réalisations avec leurs slugs canoniques.
4. Résoudre ces relations avec les helpers de `src/lib/portfolio-links.ts` ; ne pas reconstruire un lien depuis un libellé traduit.
5. Mettre à jour les résumés de dictionnaire, les menus ou la sélection de l'accueil uniquement si l'élément doit y apparaître.
6. Ajouter ou adapter les tests d'intégrité et de navigation.

Un slug relationnel inconnu doit continuer à provoquer une erreur explicite.

## Ajouter un article MDX

1. Créer le dossier `src/app/[locale]/articles/[slug]/`.
2. Ajouter `fr.mdx` et `en.mdx`. Les deux corps gardent la même structure de titres `h2` et `h3` afin de relier les ancres équivalentes.
3. Ajouter un `page.tsx` qui :
   - valide la locale ;
   - importe les deux fichiers MDX ;
   - transmet les deux composants à `LocalizedArticle`.
4. Utiliser `ArticlePageLayout` pour le masthead, le sommaire, les articles liés, les données structurées et la copie des blocs de code.
5. Ajouter le même slug dans `articles.articlesData` des deux dictionnaires avec des métadonnées réellement localisées.
6. Vérifier que `buildArticleIndex` lit le corps de la locale, nettoie correctement le MDX et calcule le temps de lecture.
7. Mettre à jour les tests de l'index, des ancres, du changement de langue et de la navigation.
8. Vérifier que la liste des articles conserve des liens utilisables sans JavaScript ; les filtres restent une amélioration client.

Les imports et exports MDX restent au début de chaque fichier.

## Ajouter une langue

1. Ajouter la locale à `src/lib/i18n.ts`.
2. Créer le dictionnaire et compléter chaque donnée `Record<Locale, ...>`.
3. Vérifier le proxy, le document `<html lang>`, les métadonnées, le sitemap et le sélecteur de langue.
4. Compléter les corps d'articles ou documenter explicitement leur stratégie de publication.
5. Étendre les tests de parité, de navigation, de liens et les parcours E2E.

Le sélecteur de langue parcourt `locales` et ne doit pas contenir de branche spéciale limitée à deux langues.

## Choisir les contrôles

Exécuter les contrôles proportionnés aux fichiers et comportements modifiés. Les commandes disponibles sont `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm check:bundle`, `pnpm check:performance` et `pnpm test:e2e`.

- Une modification de documentation exige au minimum une vérification des liens et `git diff --check`.
- Une modification de logique ou de composant exige les tests ciblés associés.
- Une modification transversale, de route, de build ou de configuration justifie les contrôles plus larges.
- Une capture de référence n'est mise à jour qu'après inspection de la différence.
- `pnpm check:performance` mesure le build `.next` courant ; il ne constitue ni un score Lighthouse ni un SLA de production.

Avant toute livraison Git, inspecter les chemins réellement modifiés et préserver les changements sans rapport déjà présents dans le worktree.
