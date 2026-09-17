# Checklist active du portfolio

Source normative : [grille officielle ISCOD/Visiplus](./grille-evaluation-portfolio.pdf), « Expert Ingénierie du Logiciel — Grille évaluation du portfolio », total de 100 points.

Dernière remise en forme documentaire : 17 septembre 2026.

## Lecture des statuts

| Statut | Signification |
| --- | --- |
| ✅ Validé structurellement | Le code et les données nécessaires sont présents dans le checkout inspecté. |
| 🧪 À vérifier sur le candidat final | Le comportement doit être rejoué sur le build ou le déploiement qui sera réellement remis. |
| 👤 À valider humainement | Le critère repose sur un jugement éditorial, un appareil, un compte ou une personne réelle. |
| ⚠️ Incomplet | Un élément exigé manque ou n'est pas suffisamment démontré. |

Un statut structurel ne garantit ni la note du jury, ni la production, ni l'exactitude de chaque affirmation métier. Les nombres de tests, routes et URL appartiennent aux [rapports datés](./reports/README.md), pas à cette checklist active.

## Grille ISCOD — 100 points

| Critère officiel | Barème | État du checkout | Preuve principale | Limite et action restante |
| --- | ---: | --- | --- | --- |
| Prénom, nom et photo sur toutes les pages | transversal | ✅ Validé structurellement | Le layout localisé rend la navigation et le footer partagés ; `ThemePortrait` centralise les portraits d'identité. | 🧪 Parcourir toutes les routes publiques du candidat final en clair et sombre et vérifier l'identité visible. |
| Page d'accueil attrayante, convaincante et correctement structurée | 5 | ✅ Validé structurellement | `src/app/[locale]/page.tsx` assemble l'introduction, les preuves, l'expérience et les réalisations. | 👤 Faire relire la première impression, la proposition de valeur et la hiérarchie par une personne extérieure. |
| Menu persistant avec des libellés courts et significatifs | 3 | ✅ Validé structurellement | `src/components/navbar.tsx` expose les destinations principales, les sous-menus et les contrôles mobile. | 🧪 Rejouer navigation clavier, mobile, fermeture par Échap et liens FR/EN sur le build final. |
| Article de présentation générale dédié, structuré et détaillé | 15 | ✅ Validé structurellement | La route `/[locale]/a-propos` et `src/lib/about.tsx` couvrent valeurs, projet, qualités humaines et centres d'intérêt. | 👤 Relire l'ordre, la précision des faits et l'absence d'introduction excessivement autocentrée. |
| Page commune « Mes compétences » : comparaison, niveau, dix compétences et deux domaines | 10 | ✅ Validé structurellement | La route `/[locale]/competences` utilise dix entrées canoniques, séparées entre compétences humaines et techniques, avec vue comparative et liens. | 🧪 Vérifier la lisibilité de la comparaison sur desktop et de la vue mobile sous 768 px. |
| Article individuel pour chaque compétence | 30 | ✅ Validé structurellement | Les dix routes `/[locale]/competences/[slug]` s'appuient sur les modules de `src/lib/competences/` et leurs relations canoniques. | 👤 Vérifier pour chaque fiche la définition contextualisée, les preuves, les résultats, l'autocritique, l'évolution et la véracité des liens. |
| Page commune « Mes réalisations » regroupant cinq réalisations | 5 | ✅ Validé structurellement | `src/lib/realisations.ts` déclare cinq études de cas et `/[locale]/realisations` les présente avec un descriptif et un lien. | 🧪 Vérifier les cinq cartes dans les deux langues. Ne pas confondre cette page avec les trois réalisations mises en avant sur l'accueil. |
| Article individuel pour chaque réalisation | 20 | ✅ Validé structurellement | Les cinq routes `/[locale]/realisations/[slug]` utilisent les modules détaillés de `src/lib/realisations/`. | 👤 Contrôler présentation, objectifs, contexte, risques, étapes, acteurs, résultats, suites et regard critique ; distinguer preuve, prototype et projection. |
| Parcours sous forme de frise ou d'axe antichronologique | 5 | ✅ Validé structurellement | La route `/[locale]/parcours` sépare expériences et formations, les trie et donne accès aux détails. | 🧪 Vérifier l'ordre, les dates, les ancres, les logos et la lisibilité mobile sur le candidat final. |
| Détail de chaque expérience, formation, test ou certification | 5 | ✅ Validé structurellement | Les routes `/[locale]/parcours/[slug]` exposent contexte, responsabilités, organisations, technologies, relations et preuves selon le type d'entrée. | 👤 Vérifier les périodes, rôles, lieux, diplômes, certifications, responsabilités et liens institutionnels avec les pièces autorisées. |
| Navigation circulaire compétences ↔ réalisations | transversal | ✅ Validé structurellement | Les relations sont résolues depuis les slugs canoniques par `src/lib/portfolio-links.ts` et rendues dans les pages concernées. | 🧪 Tester chaque relation dans les deux sens et les liens vers les expériences associées. |
| Espace contact ou pavé de coordonnées accessible depuis le menu ou chaque page | 2 | ✅ Validé structurellement | `/[locale]/contact`, la navigation et le footer exposent le parcours de contact. | 🧪 Vérifier le formulaire réel, la réception autorisée, les états d'erreur, l'anti-spam et les liens de confidentialité sur le déploiement final. |
| Orthographe corrigée | pénalité de 1 % toutes les 5 fautes | 👤 À valider humainement | Le contenu français est réparti entre dictionnaires, modules éditoriaux, composants visibles et articles MDX. | Effectuer une relecture humaine finale du rendu. Un correcteur automatique sert uniquement à repérer des candidats et ne doit pas réécrire les termes techniques ou les noms propres. |
| **Total officiel** | **100** | — | Somme des critères chiffrés de la grille. | La note finale appartient au jury ; aucun score global n'est revendiqué ici. |

## Vérifications techniques avant remise

- [ ] Identifier le commit exact du candidat final.
- [ ] Installer les dépendances verrouillées avec Node.js 22 et pnpm 10.20.0.
- [ ] Exécuter les contrôles statiques, tests, build et budgets prévus par la CI.
- [ ] Servir le build fraîchement produit avant toute conclusion navigateur.
- [ ] Rejouer les parcours E2E FR/EN, desktop/mobile, clavier, mouvement réduit et sans JavaScript.
- [ ] Contrôler toutes les URL du sitemap final, leurs statuts, H1, canonical et alternates.
- [ ] Vérifier les documents publics, liens externes et médias de preuve.
- [ ] Contrôler la production finale et relier son URL au commit.
- [ ] Tester la réception réelle du formulaire avec autorisation, sans exposer de message ni de coordonnées.
- [ ] Consigner la date, l'environnement, les commandes et les limites dans un nouveau rapport.

## Validations humaines et externes

- [ ] Relire l'intégralité des contenus français et anglais dans leur rendu.
- [ ] Vérifier les faits, dates, responsabilités, résultats et mesures avec leurs sources autorisées.
- [ ] Tester au moins un téléphone physique et un écran desktop.
- [ ] Tester VoiceOver ou NVDA sur les parcours principaux.
- [ ] Faire parcourir le portfolio à deux ou trois personnes sans guidage.
- [ ] Vérifier les aperçus de partage LinkedIn et messagerie.
- [ ] Présenter le site dans les conditions prévues pour le jury.

## Bonnes pratiques professionnelles hors barème direct

| Domaine | État structurel | Vérification restante |
| --- | --- | --- |
| Internationalisation FR/EN | ✅ Routes, dictionnaires, contenus canoniques et articles localisés. | Relire les deux langues et vérifier les changements de langue avec conservation du contexte. |
| Accessibilité | ✅ Navigation clavier, focus, lien d'évitement, mouvement réduit et tests Axe sont prévus. | Rejouer les contrôles sur le candidat final et effectuer un essai avec technologie d'assistance. |
| Performance | ✅ Budgets bundle et performance versionnés. | Mesurer le déploiement final ; ne pas réutiliser une ancienne mesure Lighthouse comme résultat courant. |
| SEO et partage | ✅ Sitemap, robots, canonical, alternates, OpenGraph et données structurées sont implémentés. | Inspecter les pages publiées et les aperçus réels. |
| Sécurité et confidentialité | ✅ CSP à nonce, consentement, validation serveur et anti-spam multicouche. | Vérifier les variables, en-têtes et services du déploiement final. |
| Tests et CI | ✅ Vitest, tests navigateur, Playwright et workflow GitHub Actions sont versionnés. | Exiger une exécution verte attachée au commit candidat. |
| Traçabilité des preuves | ✅ Documents publics, médias et relations éditoriales disposent de sources identifiables. | Confirmer les droits de publication et retirer toute donnée interne ou personnelle non autorisée. |

## Rapports de référence

- [Prévalidation ISCOD du 15 septembre 2026](./reports/portfolio-rendu-preflight-2026-09-15.md)
- [Revue de livraison du 14 août 2026](./reports/portfolio-delivery-audit-2026-08-14.md)
- [Audit Lighthouse de production du 16 juillet 2026](./reports/lighthouse-production-2026-07-16.md)
- [Index complet des rapports](./reports/README.md)
- [Modèle de collecte de preuves](./reports/portfolio-evidence-collection-template.md)

Ces documents sont des photographies historiques. En cas de divergence, le checkout et les résultats fraîchement exécutés prévalent pour l'état technique ; la grille PDF prévaut pour les critères officiels.
