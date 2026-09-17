# Revue de livraison du portfolio — 14 août 2026

> **Fiche d'archive**
> - **Date :** 14 août 2026.
> - **Nature :** revue de livraison et de ses réserves techniques ou humaines.
> - **État :** document historique conservé avec son périmètre d'origine.
> - **Suite :** [prévalidation du 15 septembre 2026](./portfolio-rendu-preflight-2026-09-15.md).
> - **Avertissement :** ce rapport ne décrit pas nécessairement le checkout courant.

## Conclusion

Le socle livré dans le dépôt est valide : tests, build et E2E sont verts. La production répond correctement sur Vercel et le sitemap public est sain. La revue ne conclut pas à une livraison finale sans réserve, car les preuves humaines, certaines données métier, un essai sur téléphone physique et la réception réelle d'e-mails ne peuvent pas être déduits du code. Le LCP de la page CAP2vie n'atteint pas encore la cible de 3 s sur la mesure effectuée aujourd'hui.

## Méthode et résultats reproductibles

| Contrôle | Résultat |
| --- | --- |
| Tests unitaires et composants | `corepack pnpm test` : 37 fichiers, 174 tests réussis. |
| Build | `corepack pnpm build` : compilation TypeScript et génération de 109 routes réussies. |
| Parcours E2E | `corepack pnpm test:e2e` : 30 scénarios réussis sur build de production local. |
| Dépendances | Next.js, `@next/mdx` et `eslint-config-next` mis à jour en 16.2.11 ; `sharp` et les transitoires concernés sont corrigés. `pnpm audit --audit-level=moderate` : 0 vulnérabilité. |
| Sitemap de production | 100 URL contrôlées : HTTP 200, exactement un H1 et canonical égale à l'URL localisée pour chacune. |
| Déploiement public | Domaine `orhanmadiassani.com` servi par Vercel ; HTTPS/HSTS, `robots.txt`, `sitemap.xml`, contact, CAP2vie et 404 répondent correctement. |
| Liens externes | 44 liens publics contrôlés : 42 réponses HTTP valides, lien ETS anglais corrigé dans le dépôt ; OpenAI et LinkedIn bloquent les robots, sans preuve d'un lien cassé. |
| Lighthouse production, CAP2vie FR | Deux passages Lighthouse 13.4.0 mobile : performance 84 puis 73 ; LCP 3,5 s puis 4,5 s, TBT 20 ms puis 80 ms, CLS 0. Le build local est à LCP 2,2 s. |

## Checklist de livraison

| Demande | État | Justification |
| --- | --- | --- |
| Nom, prénom et photo visibles ; accueil ; menu fixe ; À propos ; frise ; contact | ✅ | Navbar persistante, portrait, hero, page À propos, section Parcours et contact sont présents dans les routes et les E2E. |
| 10 compétences avec preuves, autocritique et évolution | ✅ | Les 10 entrées disposent des rubriques requises et des liens vers les réalisations. |
| Au moins 5 réalisations détaillées | ✅ | Cinq études de cas, structurées en présentation, objectifs, risques, étapes, acteurs, résultats, suites et regard critique. |
| Relations compétences ↔ réalisations | ✅ | Relation bidirectionnelle vérifiée par `portfolio-relationships.test.ts`. |
| CV, TOEIC, titres RNCP et PDFs | ✅ | Liens accessibles et PDF inspectés. TOEIC : 920/990, 7 août 2025 ; DWWM : 21 décembre 2023 ; CDA : 24 décembre 2024. Le CV public a été corrigé le 22 août 2026 pour correspondre aux dates confirmées du site : 1UP depuis décembre 2024, LIG de mai à octobre 2024, CDA de janvier à décembre 2024 et DWWM en 2023. |
| Noms d'entreprise et technologies | ⚠️ | 1UP, LIG, ISCOD, Simplon, USMB, ETS et les technologies visibles ont été recoupés avec les URLs et les PDF disponibles. Les dates d'emploi sont confirmées ; l'usage effectif de certaines technologies reste à confirmer par le propriétaire. |
| Métriques d'impact | ⚠️ | 16 modules et 19 utilisateurs directs sont repris du CV public. Les effectifs externes, volumes de modules tiers, durée d'interruption, délai de stabilisation et gain estimé ont été retirés des contenus courts et de l'article public faute de source publiable. Mesurer avant/après reste nécessaire. |
| Preuves humaines | ❌ | Aucune recommandation, attestation ou retour publiable n'est disponible dans le dépôt. Il serait incorrect d'en créer un. |
| Relecture rédactionnelle | ✅ localement | Les réalisations respectent la grille de contenu. Les formulations qui présentaient un gain de temps estimé comme une mesure ont été réécrites. Une relecture orale par l'auteur reste utile pour valider la voix personnelle. |
| Mobile et navigation | ✅ en émulation | E2E sur 390 × 844 et 1280 × 900, FR/EN, menu/sous-menus, formulaires, ancres, thème, retour de navigation et absence de défilement horizontal. |
| Téléphone réel | ❌ | Non disponible dans cet environnement. |
| Accessibilité | ✅ localement | H1 unique, titres, alternatives, labels, messages d'erreur, focus et réduction des animations sont contrôlés par rendu, code et tests. |
| Lecteur d'écran réel | ❌ | VoiceOver/NVDA nécessite un essai humain. |
| Vidéos YouTube différées | ✅ | `YouTubeFacade` ne crée l'iframe `youtube-nocookie` qu'après clic ; test unitaire dédié vert. |
| Compression d'image | ✅ dans le code | Images via `next/image`; l'illustration Fuji de l'en-tête utilise désormais une qualité 60 et des `sizes` plus précis afin d'éviter le téléchargement 640 px signalé par Lighthouse. |
| LCP inférieur à 3 s | ❌ | Mesure Lighthouse du 14 août à 3,5 s pour CAP2vie. La façade vidéo a supprimé les requêtes tierces initiales, mais ne suffit pas encore. |
| SEO, partage et langues | ✅ structurellement | Metadata localisée, canonical, hreflang, OG, JSON-LD, sitemap et robots sont présents; les 100 pages production satisfont H1/canonical. |
| Aperçus LinkedIn / WhatsApp | ❌ | À valider après déploiement par partage réel des URLs publiques. |
| Formulaire, anti-spam, cookies, confidentialité | ✅ code / ⚠️ réception | Validation Zod, honeypot, horodatage, limite de débit, reCAPTCHA conditionnel, consentement et politique sont couverts. La réception réelle ne doit être confirmée qu'avec la boîte cible. |
| Clés exposées et dépendances | ✅ revue statique | Aucun secret n'est suivi dans les fichiers source contrôlés ; les variables sont lues depuis l'environnement et `pnpm audit` ne remonte plus de vulnérabilité. |
| Déploiement, domaine, redirections, 404 | ✅ état public | Vercel, HTTPS, `/fr` et `/en`, sitemap, robots et 404 répondent. La version de cette revue doit encore être déployée. |
| Tests non guidés de 2–3 personnes | ❌ | Requiert de vrais testeurs et leur consentement. |

## Correctifs effectués dans cette revue

1. Correction du lien ETS TOEIC anglais qui retournait HTTP 404.
2. Retrait des gains de temps estimés, des effectifs externes, des volumes de modules tiers et de la durée d'interruption non sourcés des cartes et de l'article Odoo ; le site indique désormais qu'une mesure fiable manque.
3. Optimisation de l'illustration décorative de l'en-tête, signalée par Lighthouse comme surdimensionnée.
4. Mise à jour de la date `lastModified` globale du sitemap au 14 août 2026.
5. Mise à jour de Next.js, de l'outil d'images et des dépendances transitives vers des versions sans avis de sécurité connu.
6. Actualisation de `PORTFOLIO_CHECKLIST.md` pour séparer l'audit historique des validations actuelles et des preuves manquantes.
7. Revalidation après correction : tests, build, 30 E2E, audit des dépendances et contrôle des espaces de diff sont verts. Un contrôle d'intégrité empêche désormais une régression du nombre de compétences/réalisations, des rubriques bilingues obligatoires et des liens réciproques.

## Décisions requises pour fermer la revue

Le relevé prêt à compléter est disponible dans [`portfolio-evidence-collection-template.md`](./portfolio-evidence-collection-template.md). Il évite de publier des données ou témoignages sans source, méthode ni accord.

1. Clôturé le 22 août 2026 : chronologie confirmée. Le site est la référence et le CV est aligné sur les dates 1UP/LIG, les périodes de formation et les dates de délivrance des titres.
2. Autoriser et fournir les 1 à 3 preuves humaines à publier, avec nom, fonction, texte validé et éventuelle date d'expiration.
3. Définir une période de mesure pour les impacts : temps moyen de traitement, nombre de dossiers/factures, erreurs évitées et population concernée, avant et après automatisation.
4. Déployer les correctifs, puis exécuter trois Lighthouse mobiles sur CAP2vie. La cible est LCP < 3 s au percentile ou à la médiane défini à l'avance.
5. Réaliser un test de réception du formulaire, un passage VoiceOver/NVDA, un test sur téléphone physique et trois parcours non guidés. Consigner date, appareil, scénario et résultats sans publier de données personnelles non autorisées.
