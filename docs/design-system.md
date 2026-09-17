# Système visuel éditorial romain

Ce document décrit les principes visuels actifs. Il ne remplace ni les composants ni les variables définies dans `src/app/globals.css`.

## Principes

- Le contenu, les routes bilingues et les preuves restent indépendants de la décoration.
- L'architecture romaine sert de cadre éditorial discret : elle ne doit pas concurrencer les titres, les contrôles ou les médias de preuve.
- Les couleurs applicatives utilisent les variables sémantiques shadcn et les utilitaires Tailwind.
- Les surfaces protègent la lisibilité dans les deux thèmes et sur les images de fond.
- Les composants partagés portent les décisions communes ; une route ne doit pas créer une seconde direction visuelle locale sans nécessité démontrée.

## Palette et typographies

- `background`, `card` et `muted` définissent les surfaces principales.
- `foreground` et `muted-foreground` définissent les textes principal et secondaire.
- `primary` porte le rouge d'action utilisé par les boutons, liens, repères et focus.
- Forum, exposée par `--font-display`, est réservée aux grands titres éditoriaux.
- EB Garamond, exposée par `--font-serif`, sert aux textes longs et aux articles.
- Roboto Flex reste la police fonctionnelle de l'interface.
- Geist Mono porte les dates, niveaux, index et métadonnées techniques.

Les quatre polices sont chargées avec `next/font/google` dans `src/components/deferred-fonts.tsx`.

## Atmosphères par famille de routes

`PageAtmosphere` choisit le décor en fonction de la famille de page. Les assets restent décoratifs, sont placés derrière le contenu et ne capturent pas le pointeur.

| Famille | Routes principales | Traitement |
| --- | --- | --- |
| `home` | accueil | Vidéo `/videos/home-atmosphere.mp4` avec poster `/images/background-home.webp`. |
| `home` secondaire | contact, articles et pages légales | Fond statique de la famille accueil avec voile renforcé. |
| `about` | `/a-propos` | Fond éditorial de présentation. |
| `journey` | `/parcours/[slug]` | Colonnade consacrée au parcours. |
| `skills` | `/competences` et ses fiches | Géométrie monumentale dédiée aux compétences. |
| `work` | `/realisations`, `/projects` et leurs fiches | Forum éditorial consacré aux réalisations. |

Le fond vidéo de l'accueil utilise `autoPlay`, `loop`, `muted` et `playsInline`. Le poster statique reste disponible lorsque la vidéo ne peut pas être lue et lorsque la réduction des mouvements l'exige. Les voiles et cadrages mobiles doivent garder les contenus au premier plan.

## Mouvement et dégradation

- Les animations applicatives améliorent un contenu déjà rendu ; elles ne portent aucune information indispensable.
- Les animations GSAP utilisent le point d'entrée central `@/lib/gsap`, `useGSAP` avec un `scope` et `autoAlpha` pour les apparitions.
- La classe `invisible` associée aux animations doit conserver la règle de secours sans JavaScript décrite dans l'architecture.
- `prefers-reduced-motion: reduce` supprime la vidéo atmosphérique et réduit les animations non essentielles.
- `prefers-reduced-transparency: reduce` remplace les principales surfaces translucides par des surfaces opaques.

## Accessibilité visuelle

- Les fonds décoratifs n'ont pas de texte alternatif informatif et ne remplacent jamais une preuve ou un libellé.
- Les textes, focus et contrôles doivent garder un contraste lisible dans les thèmes clair et sombre.
- Les logos d'entreprises et de formations conservent une surface blanche lorsque leur lisibilité l'exige.
- Les visuels générés ou issus de banques d'images sont présentés comme illustrations, jamais comme preuves des systèmes clients ou des lieux de travail.
