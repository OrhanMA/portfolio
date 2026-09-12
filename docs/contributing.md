# Recettes de contribution

## Ajouter une page localisée

1. Créer la route sous `src/app/[locale]/` et utiliser `getLocalizedPageContext` pour obtenir une `Locale` validée et le dictionnaire.
2. Ajouter les métadonnées, le lien de navigation et les entrées de sitemap si la page est publique.
3. Préfixer tous les liens internes par `/${locale}/` et ajouter les deux langues dans `src/app/[locale]/dictionaries/fr.json` et `en.json` quand le texte relève de l'interface.
4. Ajouter ou mettre à jour les tests de route, de métadonnées et de navigation concernés.

## Ajouter une compétence ou une réalisation

Déclarer l'élément dans son catalogue canonique, avec un slug stable et un contenu `Record<Locale, string>`. Ajouter les liens réciproques vers les expériences et sujets concernés via les helpers de `src/lib/portfolio-links.ts`. Mettre à jour les résumés de dictionnaire, les menus ou la sélection éditoriale de la homepage si nécessaire, puis lancer les tests d'intégrité.

## Ajouter un article MDX

1. Créer le dossier `src/app/[locale]/articles/[slug]/` et le fichier `page.mdx` dans la langue éditoriale publiée. Les six articles actuels sont rédigés en français ; un article français affiché sur la route anglaise reste signalé comme contenu français.
2. Ajouter un `layout.tsx` dans le même dossier pour appeler `ArticlePageLayout` avec la locale validée et le slug stable. Ce layout fournit le masthead, le sommaire, les articles liés, les données structurées et le bouton de copie des blocs de code.
3. Ajouter une entrée portant le même slug dans `articles.articlesData` des deux dictionnaires. Les titres, descriptions, dates et tags d'interface doivent rester localisés ; le contenu MDX n'est pas dupliqué artificiellement lorsqu'une traduction intégrale n'est pas publiée.
4. Vérifier que les titres `h2`/`h3` et les liens internes restent compatibles avec l'indexation : `buildArticleIndex` lit automatiquement le fichier MDX, nettoie le contenu et calcule le temps de lecture. Les imports/exports MDX doivent rester au début du fichier.
5. Ajouter ou mettre à jour les tests de l'index, des ancres et de la navigation, puis vérifier que la liste `/articles` conserve ses liens dans le rendu sans JavaScript. Les filtres interactifs sont une amélioration client, pas la seule porte d'accès aux articles.

## Ajouter une langue

Modifier `src/lib/i18n.ts`, créer le dictionnaire et compléter chaque donnée `Record<Locale, ...>` des catalogues. Vérifier `src/proxy.ts`, le layout, les métadonnées, le sélecteur de langue, le sitemap, les tests de parité et les parcours E2E. Le sélecteur parcourt `locales` et ne doit pas contenir de branche spéciale `fr`/`en`.

## Vérifier avant une revue

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check:bundle
pnpm check:performance
pnpm test:e2e
```

Les mesures Lighthouse et les captures visuelles sont datées : une référence doit être régénérée seulement après inspection de la différence. `pnpm check:performance` démarre le build `.next` courant, mesure les quatre routes avec Chromium et contrôle les budgets ; il ne transforme pas cette mesure locale en score Lighthouse ou en SLA de production.
