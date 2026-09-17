# Architecture et décisions

Cette fiche décrit les frontières durables du portfolio. Les procédures sont dans [`contributing.md`](./contributing.md), les règles de localisation dans [`i18n.md`](./i18n.md) et les paramètres externes dans [`configuration.md`](./configuration.md).

## Rendu et document localisé

- `src/app/[locale]/layout.tsx` valide la locale, rend le document `<html lang={locale}>`, charge le dictionnaire et installe les providers partagés.
- Les pages restent des Server Components tant qu'elles n'ont pas besoin d'un état, d'un événement navigateur ou d'une animation.
- Chaque composant interactif ou animé porte sa propre frontière `"use client"`.
- `src/app/global-not-found.tsx` couvre les URL situées hors de l'arbre localisé ; `src/app/[locale]/not-found.tsx` fournit le retour localisé.
- `src/proxy.ts` détecte la locale à partir du cookie, de `Accept-Language`, puis de la locale par défaut.

## CSP et sécurité du rendu

`src/proxy.ts` crée un nonce CSP par requête et le transmet au document. Le layout le fournit aux composants qui injectent des scripts. Cette frontière rend le document dynamique par choix de sécurité : `generateStaticParams` peut déclarer les locales connues sans transformer le site en export statique.

Les scripts Analytics restent conditionnés au consentement. Le formulaire applique sa validation côté client et serveur, un honeypot, un délai minimal, une limitation locale gratuite par instance et, lorsqu'il est configuré, reCAPTCHA v3 avec contrôle du score, de l'action, du hostname et de l'âge du jeton. Le limiteur en mémoire complète ces contrôles sans service payant ; son état n'est pas partagé entre les instances serverless et ne doit donc pas être présenté comme une limite distribuée.

Les en-têtes applicatifs complémentaires sont définis dans `next.config.mjs`. Une modification de la CSP ou du proxy doit être vérifiée dans un build courant et dans un navigateur ; l'absence de message dans un ancien serveur de développement ne constitue pas une preuve.

## Animation et dégradation

Les animations améliorent un contenu déjà rendu côté serveur :

- GSAP est importé depuis `@/lib/gsap` ;
- les composants animés utilisent `useGSAP` avec un `scope` ;
- les apparitions utilisent `autoAlpha` ;
- la classe `invisible` ne doit être active qu'après l'ajout de `html.js` par le runtime client ;
- la règle `html:not(.js) .invisible` maintient le contenu lisible sans JavaScript ;
- `prefers-reduced-motion` désactive les mouvements non essentiels et le fond vidéo de l'accueil.

Lenis est synchronisé avec le ticker GSAP. Le document ne doit pas ajouter `scroll-behavior: smooth`, car les deux mécanismes entreraient en concurrence.

## Données éditoriales et relations

Les catalogues canoniques vivent sous `src/lib/` :

- `competences/` pour les dix compétences ;
- `realisations/` pour les cinq études de cas ;
- les modules d'expérience et de parcours pour les emplois et formations ;
- `odoo-projects.ts` pour les modules Odoo présentés.

Les dictionnaires JSON contiennent les textes d'interface et les métadonnées de navigation. Les relations entre compétences, réalisations et expériences sont résolues par les helpers de `src/lib/portfolio-links.ts`. Un slug inconnu doit rester une erreur explicite : une page ne doit pas reconstruire une relation à partir d'un libellé traduit.

Les articles techniques possèdent un point d'entrée `page.tsx` et deux corps `fr.mdx` et `en.mdx`. `LocalizedArticle` choisit le corps correspondant à la locale ; `ArticlePageLayout` fournit la structure éditoriale partagée. L'index de recherche lit le contenu localisé, ses métadonnées, ses tags et sa description.

## Performance

`pnpm check:bundle` contrôle le poids des assets JavaScript et CSS produits. Après `pnpm build`, `pnpm check:performance` :

1. vérifie la présence du `.next/BUILD_ID` courant ;
2. démarre ce build avec `next start` ;
3. charge les routes représentatives dans un contexte Chromium neuf ;
4. compare les tailles encodées du document, du JavaScript et des fontes, ainsi que le nombre d'éléments DOM, aux seuils de `performance-budget.json`.

Ces contrôles détectent des régressions locales. Ils ne remplacent ni Lighthouse, ni les Core Web Vitals de terrain, ni une mesure sur appareil réel. Toute affirmation de production doit rester associée à une date, une URL et une version identifiables dans `reports/`.
