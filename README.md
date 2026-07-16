# Portfolio — Orhan Madi Assani

Portfolio bilingue FR/EN construit avec Next.js 16.2, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui (Base UI), GSAP, Lenis et MDX.

## Démarrage

```bash
corepack pnpm install
corepack pnpm dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000), qui redirige vers `/fr` ou `/en` selon la préférence enregistrée et `Accept-Language`.

La configuration de Resend, reCAPTCHA, Redis et Analytics est détaillée dans [MANUAL_CONFIGURATION.md](./MANUAL_CONFIGURATION.md). Copier [.env.example](./.env.example) vers `.env.local` pour démarrer.

## Architecture

```text
src/
  app/
    [locale]/
      layout.tsx                    # Document HTML localisé + providers
      page.tsx                      # Accueil App Router
      dictionaries/{fr,en}.json    # Contenu bilingue
      articles/                    # Listing + articles MDX
      competences/                 # Synthèse + 10 fiches
      realisations/                # Synthèse + 5 études de cas
      projects/                    # Modules Odoo open source
      contact/                     # Formulaire
      actions/contact.ts           # Server Action sécurisée
    global-error.tsx
    global-not-found.tsx
    sitemap.ts
    robots.ts
  components/                      # UI, sections et composants interactifs
  lib/                             # Contenu, schémas et services
  proxy.ts                         # Locale + CSP à nonce
scripts/check-bundle-budget.mjs    # Budgets JS/CSS
```

Les routes applicatives utilisent exclusivement l’App Router. Le layout `[locale]` rend directement `<html lang="fr|en">`; `global-not-found.tsx` couvre les URL hors arbre localisé. Le proxy applique un CSP à nonce sans `unsafe-inline` pour les scripts.

## Fonctionnalités clés

- Métadonnées localisées, canonical/hreflang `x-default`, OpenGraph, Twitter, sitemap et données structurées `Person`, `WebSite`, `WebPage`, `ProfilePage`, `TechArticle` et `BreadcrumbList`.
- Contenu de portfolio conforme à la grille ISCOD : présentation, parcours, 10 compétences, 5 réalisations, preuves et navigation réciproque.
- Formulaire bilingue validé côté client et serveur, honeypot silencieux, contrôle temporel, reCAPTCHA v3 chargé à l’intention et rate limit Redis atomique.
- Consentement Analytics versionné, valable six mois, réouvrable et révocable ; GTM/GA et Speed Insights restent désactivés avant accord.
- Images optimisées par `next/image`, fontes via `next/font`, GSAP centralisé et Lenis chargé à la première interaction.
- Dark mode, navigation clavier, focus visibles, lien d’évitement et gestion de `prefers-reduced-motion`.

## Audit Lighthouse de production

Le 16 juillet 2026, Lighthouse 13.4.0 avec le profil mobile de Chrome a audité les 100 URL du sitemap public, une fois par URL. Les moyennes relevées sont de **94,3** en performance, **99,8** en accessibilité, **99,9** en bonnes pratiques et **100** en SEO ; les 100 pages ont un CLS de 0 et 98 atteignent au moins 90 en performance.

Les deux variantes de `/realisations/app-trajectoires-de-vie` sont l’exception prioritaire : les quatre lecteurs YouTube chargés directement font chuter leur score de performance à 57. Le rapport complet par page, avec FCP, LCP, TBT et CLS, est disponible dans [reports/lighthouse-production-2026-07-16.md](./reports/lighthouse-production-2026-07-16.md). Ces mesures sont des résultats de laboratoire : elles doivent être rejouées après une modification significative du frontend.

## Commandes qualité

```bash
pnpm lint              # ESLint
pnpm typecheck         # TypeScript strict
pnpm audit:security    # Échec dès une vulnérabilité modérée
pnpm test:unit         # Vitest jsdom
pnpm test:coverage     # Couverture + seuils bloquants
pnpm test:browser      # Composants et snapshots Chromium
pnpm build             # Build de production Next.js
pnpm check:bundle      # Budgets des assets produits
pnpm test:e2e          # Parcours Playwright
pnpm test              # Projets Vitest unitaires + navigateur
```

La CI exécute lint, typecheck, audit, couverture, tests navigateur, build, budgets puis E2E. Le build `.next` est partagé entre les jobs Build et E2E pour éviter une compilation redondante.

## Variables CI/Vercel

| Variable | Usage |
|---|---|
| `RESEND_API_KEY` | Envoi d’email |
| `CONTACT_EMAIL` | Destinataire du formulaire |
| `FROM_EMAIL` | Expéditeur Resend vérifié |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Clé publique reCAPTCHA v3 |
| `RECAPTCHA_SECRET_KEY` | Vérification serveur reCAPTCHA |
| `RECAPTCHA_ALLOWED_HOSTNAMES` | Domaines autorisés, séparés par des virgules |
| `UPSTASH_REDIS_REST_URL` | Stockage distribué du rate limit |
| `UPSTASH_REDIS_REST_TOKEN` | Jeton secret Redis |
| `NEXT_PUBLIC_GTM_ID` | Conteneur GTM optionnel |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 direct, utilisé seulement sans GTM |

En production, Redis est obligatoire : le formulaire échoue volontairement de façon fermée si aucun stockage durable n’est configuré.
