# Architecture et décisions

Cette fiche décrit les frontières qui doivent rester explicites quand le portfolio évolue. Elle complète `AGENTS.md`, qui contient les règles d'exécution détaillées.

## Rendu et sécurité

- `src/app/[locale]/layout.tsx` est un Server Component : il valide la locale, rend `<html lang>`, charge le dictionnaire et fournit les providers.
- `src/proxy.ts` choisit la locale et ajoute le nonce CSP à la réponse. Le layout lit ce nonce pour les providers qui injectent un script.
- Le nonce rend le document dynamique par requête. `generateStaticParams` couvre les locales connues, mais ne transforme pas cette frontière de sécurité en garantie de site statique.
- Les pages et les données éditoriales restent côté serveur tant qu'elles ne nécessitent pas d'état ou d'événement navigateur. Les composants interactifs portent leur propre frontière `"use client"`.

## Animation et dégradation

Les animations améliorent le rendu existant. Les sections de la homepage reçoivent leur contenu depuis le serveur ; la classe `invisible` ne masque une cible qu'après l'ajout de `html.js` par le runtime client. La règle `html:not(.js) .invisible` garde donc le contenu lisible quand JavaScript est désactivé. Toute nouvelle animation doit conserver ce comportement et respecter `prefers-reduced-motion`.

Les animations GSAP importent `@/lib/gsap`, utilisent `useGSAP` avec un `scope`, et emploient `autoAlpha` dans les transitions d'entrée. Les animations Web API de la homepage suivent la même règle de dégradation et ne doivent pas déplacer le contenu éditorial hors du HTML serveur.

## Données éditoriales et relations

Les catalogues canoniques vivent dans `src/lib/competences`, `src/lib/realisations`, `src/lib/experience` et `src/lib/odoo-projects`. Les dictionnaires contiennent l'interface et les métadonnées localisées. Les liens entre une réalisation, une compétence et une expérience passent par les helpers de `src/lib/portfolio-links.ts` et sont vérifiés par les tests d'intégrité ; une page ne doit pas reconstruire ces relations à partir d'un libellé traduit.

## Performance

`pnpm check:bundle` contrôle le poids de chaque asset JS/CSS produit. Après `pnpm build`, `pnpm check:performance` vérifie la présence de `.next/BUILD_ID`, démarre ce build avec `next start`, charge les quatre routes représentatives dans un contexte Chromium neuf et compare leurs tailles encodées de JS, document et fontes ainsi que leur nombre d'éléments DOM à `performance-budget.json`. Le contrôle échoue si le build ou une mesure manque ; il ne relit aucune photographie historique. Ces seuils détectent une régression locale du build contrôlé, mais ne remplacent ni Lighthouse ni une mesure sur appareil réel. Toute optimisation doit commencer par une mesure réseau/CPU et préserver les preuves éditoriales nécessaires.
