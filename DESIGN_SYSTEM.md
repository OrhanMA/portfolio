# Système visuel éditorial romain

## Principes

- Le contenu, les routes bilingues et les liens de preuve restent indépendants de la décoration.
- La profondeur vient des cinq illustrations, des plans superposés et d'ombres directionnelles sobres. La transparence sert uniquement à protéger la lecture.
- Les composants utilisent les variables sémantiques shadcn et les utilitaires Tailwind. Aucun composant ne dépend d'une couleur brute propre à une page.
- Les angles sont presque droits (`--radius: 0.25rem`) pour rappeler les cadres et les inscriptions minérales.

## Palette et typographies

- `background`, `card` et `muted` définissent les blancs cassés et les surfaces ivoire.
- `foreground` et `muted-foreground` définissent le charbon chaud et le texte secondaire.
- `primary` est l'unique rouge d'action. Il sert aux boutons, liens, repères, focus et détails lumineux.
- Forum (`--font-display`) est réservé aux héros et titres de sections.
- EB Garamond (`--font-serif`) est utilisé pour les paragraphes et articles longs.
- Roboto Flex reste la police fonctionnelle de la navigation, des contrôles et des formulaires. Geist Mono porte les dates, niveaux, index et métadonnées.

## Familles de fond

Le composant `PageAtmosphere` choisit une seule image décorative par route :

| Famille | Routes | Asset |
| --- | --- | --- |
| `home` | accueil, contact, articles, pages légales | `background-home.webp` |
| `about` | `/a-propos` | `background-about.webp` |
| `journey` | `/parcours/[slug]` | `background-journey.webp` |
| `skills` | `/competences` et ses articles | `background-skills.webp` |
| `work` | `/realisations`, `/projects` et leurs articles | `background-work.webp` |

La couche est fixée au viewport, placée derrière le contenu et utilise `pointer-events: none`. Les routes secondaires reçoivent un voile renforcé. Sur mobile, le cadrage se déplace vers la zone calme et le voile gagne en opacité.

## Mouvement et accessibilité

- Seule la lumière atmosphérique se déplace lentement. Les cartes utilisent une translation courte au survol.
- `prefers-reduced-motion: reduce` désactive le mouvement de lumière et réduit toutes les transitions non essentielles.
- `prefers-reduced-transparency: reduce` remplace les surfaces translucides principales par des surfaces opaques.
- Les fonds ont un texte alternatif vide, ne capturent pas le pointeur et ne remplacent aucune information de contenu.
