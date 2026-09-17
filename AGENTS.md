# Instructions du dépôt

## Environnement et sources de vérité

- Utiliser Node.js 22, pnpm 10.20.0 et les scripts de `package.json`.
- Le projet utilise Next.js 16.3.4, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui avec Base UI, GSAP, Lenis et MDX.
- Avant de modifier une API ou une convention Next.js, lire le guide correspondant dans `node_modules/next/dist/docs/`.
- Lorsque les outils `next-devtools-mcp` sont exposés, utiliser `nextjs_index` pour découvrir le serveur, `nextjs_docs` pour la documentation et `nextjs_call` ou `browser_eval` pour l'inspection.
- Préserver les changements sans rapport déjà présents dans le worktree. Ne pas committer, pousser, déployer ni réécrire l'historique sans demande explicite.

## Architecture applicative

- Préférer les Server Components lorsqu'aucune interaction ni animation n'est nécessaire.
- Un composant interactif ou animé doit porter `"use client"`.
- Importer GSAP, `useGSAP`, ScrollTrigger et Lenis depuis `@/lib/gsap`.
- Utiliser `useGSAP` avec un `scope`. Pour les apparitions, utiliser `autoAlpha` avec la dégradation sans JavaScript existante.
- Utiliser `buttonVariants()` avec `cn()` pour les liens rendus comme des boutons. Base UI Button ne prend pas en charge le contrat shadcn `asChild`.
- `buttonVariants()` est réservé aux Client Components.
- Les schémas Zod compatibles avec `@hookform/resolvers` importent `z` depuis `zod/v3`.
- Les décisions de rendu, CSP, données et performance sont décrites dans `docs/architecture.md`.

## Contenu et internationalisation

- Les locales supportées sont `fr` et `en`, déclarées dans `src/lib/i18n.ts`.
- Les routes publiques se trouvent sous `src/app/[locale]/` et les liens internes conservent le préfixe de locale.
- Toute nouvelle clé d'interface est ajoutée aux deux dictionnaires avec la même structure.
- Les données éditoriales localisées utilisent `Locale`, `LocalizedContent` ou `Record<Locale, ...>`.
- Les relations entre compétences, réalisations et expériences utilisent les slugs canoniques et les helpers de `src/lib/portfolio-links.ts`. Ne pas fabriquer une destination depuis un libellé traduit.
- Chaque article technique utilise un `page.tsx` et deux corps `fr.mdx` et `en.mdx`. Les titres `h2` et `h3` restent alignés entre langues afin de préserver les ancres.
- Les procédures d'ajout sont dans `docs/contributing.md` et les règles de localisation dans `docs/i18n.md`.

## Services externes et confidentialité

- Le formulaire valide les données côté client et serveur, puis applique honeypot, contrôle temporel, rate limit Redis et reCAPTCHA lorsqu'il est configuré.
- En production, le rate limit doit disposer d'un stockage durable ; l'absence de Redis provoque un échec fermé.
- Les scripts Analytics restent désactivés avant consentement et aucun fallback `<noscript>` ne doit contourner ce choix.
- Ne jamais afficher, committer ou recopier les valeurs de `.env.local`.
- Les variables et procédures de déploiement sont documentées dans `docs/configuration.md`.

## Vérification

- Adapter les tests lorsqu'un comportement, une route, une action serveur ou un contrat de composant change.
- Ajouter des tests unitaires pour les nouvelles fonctions de `src/lib/`.
- Pour les articles, conserver les tests de localisation, d'indexation, de filtres, d'ancres et de rendu sans JavaScript.
- Pour la navigation et l'accessibilité, vérifier les deux locales ainsi que les états desktop, mobile et mouvement réduit concernés.
- Choisir des contrôles proportionnés au changement. Après une modification documentaire pure, vérifier au minimum les liens et `git diff --check`.
- Ne mettre à jour une capture visuelle qu'après inspection de la différence et conserver les baselines macOS et Linux séparées.
- Avant un commit demandé, exécuter les contrôles nécessaires et inspecter exactement les chemins indexés.

## Portfolio et documentation

- Pour une demande d'amélioration ou une revue de rendu, consulter `PORTFOLIO_CHECKLIST.md`.
- Distinguer preuve locale, preuve publiée, contrôle humain et jugement du jury.
- Les guides actifs vivent dans `docs/`, les plans de test dans `specs/` et les mesures datées dans `reports/`.
- Ne pas transformer un ancien rapport, un ancien nombre de tests ou une ancienne mesure Lighthouse en affirmation sur l'état courant.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
