# Audit critique du portfolio — 16 juillet 2026

> **Fiche d'archive**
> - **Date :** 16 juillet 2026.
> - **Nature :** audit critique technique et éditorial.
> - **État :** photographie historique du site à cette date.
> - **Suite :** [revue de livraison du 14 août 2026](./portfolio-delivery-audit-2026-08-14.md).
> - **Avertissement :** ce rapport ne décrit pas nécessairement le checkout courant ; les rapports ultérieurs ne valent que pour leur propre candidat.

## Périmètre et méthode

- Inspection du code Next.js 16 / React 19 / TypeScript strict et des routes App Router.
- Relecture des métadonnées, du sitemap, du proxy/CSP, du formulaire, des composants interactifs et des tests.
- Inspection visuelle de l’accueil en 1440 × 1000 et 390 × 844, plus vérification locale de la réalisation CAP2vie.
- Appui sur l’audit Lighthouse de production existant : 100 URL, médiane LCP 2,49 s, mais deux pages à 57/100 à cause de lecteurs YouTube.

Les scores Lighthouse historiques ne sont pas présentés comme des mesures des corrections ci-dessous : une mise en production puis une nouvelle collecte restent nécessaires.

## Problèmes trouvés et corrigés

| Gravité | Problème et emplacement | Pourquoi c’était un problème | Correction appliquée |
| --- | --- | --- | --- |
| Élevée | Quatre `iframe` YouTube sont créées dans `src/app/[locale]/realisations/[slug]/page.tsx` pour CAP2vie. | Même en `loading="lazy"`, elles dégradent lourdement FCP/LCP et établissent des connexions tierces avant un choix explicite ; l’audit de production a mesuré 57/100, avec un LCP jusqu’à 12,24 s. | `YouTubeFacade` n’insère aucun lecteur avant clic, affiche une information de confidentialité et charge ensuite le domaine `youtube-nocookie.com` avec `referrerPolicy="no-referrer"`. |
| Élevée | Une carte d’article était un lien englobant des boutons de tags dans `src/components/articles-filterable-list.tsx`. | Les éléments interactifs imbriqués produisent du HTML invalide, une navigation clavier ambiguë et des annonces incohérentes par lecteur d’écran. | La navigation est désormais portée uniquement par le titre ; les boutons de tags sont des contrôles frères, testés comme tels. |
| Moyenne | La bannière de cookies déclarait `aria-modal="true"` sans retenir le focus dans `src/components/cookie-consent.tsx`. | Le focus pouvait quitter une modale prétendument bloquante et atteindre le contenu masqué ; c’est un défaut réel de parcours clavier. | Piégeage Tab/Shift+Tab, restauration du focus d’origine, description associée et cible de fermeture portée à 32 px. |
| Moyenne | Les CTA vermillon utilisaient du texte blanc avec un contraste Lighthouse signalé à 3,18:1. | Le texte de l’action primaire ne satisfaisait pas WCAG AA pour un texte normal. | Les tokens vermillon/accent sont assombris sans changer la hiérarchie graphique. Le CTA sombre vérifié localement atteint 4,67:1 ; le thème clair est plus contrasté. |
| Moyenne | Les tags cliquables des cartes articles étaient trop petits (environ 22 px). | Une cible tactile sous 24 px pénalise le mobile et a été remontée par Lighthouse. | Hauteur de 28 px, espacement horizontal augmenté et état `aria-pressed` explicite. |

## Points contrôlés sans défaut bloquant actuel

- SEO : métadonnées localisées, canonicals/hreflang, Open Graph, JSON-LD, `robots.txt` et sitemap sont présents. Les routes ont un H1 et la structure de titres est couverte par les tests existants.
- Sécurité : CSP nonce stricte, anti-spam multicouche, validation Zod côté serveur, échappement du contenu e-mail, rate limit durable exigé en production et aucune vulnérabilité modérée ou critique remontée par `pnpm audit`.
- Performance : images via `next/image`, polices via `next/font`, Lenis chargé à l’interaction, animations réduites selon `prefers-reduced-motion`, budget de bundle respecté.
- Design/UX : direction visuelle cohérente, CTA primaire visible, absence de débordement mobile dans les E2E, navigation localisée et lien d’évitement présents.

## Dette et limites à traiter avant de revendiquer un niveau senior sans réserve

1. Rejouer Lighthouse sur la production après déploiement et archiver les résultats. Sans métriques post-correction, l’amélioration CAP2vie est prouvée structurellement, pas chiffrée en conditions réseau réelles.
2. La CSP à nonce force un rendu dynamique et des réponses `no-store`. C’est un arbitrage de sécurité défendable, mais il élimine le bénéfice de pages statiques/CDN pour un portfolio. Il faut documenter ce coût et le réévaluer si le trafic augmente.
3. Les contenus de réalisations sont très volumineux dans des modules TypeScript. Ils sont bien séparés du rendu, mais une source éditoriale dédiée (MDX typé ou CMS Git) simplifierait les revues et les changements de contenu.
4. Ajouter un contrôle automatisé d’accessibilité de type axe et des scénarios E2E de clavier complets ; Lighthouse ne remplace ni un lecteur d’écran ni ce niveau de couverture.
5. Ajouter une télémétrie d’erreurs et de délivrabilité pour le formulaire de contact. L’interface gère l’échec, mais une équipe ne peut pas diagnostiquer une perte de message sans observation serveur.

## Notes après corrections

| Axe | Note / 100 | Motif |
| --- | ---: | --- |
| Architecture | 85 | App Router et responsabilités globalement cohérents ; toutes les pages restent dynamiques par choix CSP. |
| Qualité du code | 84 | Typage et tests solides ; contenu métier très massif et quelques interactions restent implémentées à la main. |
| Lisibilité | 84 | Conventions nettes ; certains modules de contenu et pages sont difficiles à parcourir. |
| Maintenabilité | 83 | Bon socle de tests ; manque d’observabilité et contenu éditorial lourd à relire. |
| Performance | 88 | La cause majeure CAP2vie est supprimée ; mesure de production post-correction manquante. |
| UX | 89 | Parcours, CTA, i18n et responsive solides ; valider encore avec des utilisateurs et au clavier sur tous les parcours. |
| Design | 86 | Système visuel cohérent mais dense ; la lisibilité doit rester prioritaire sur les décorations pour de futurs contenus. |
| SEO | 92 | Fondations complètes ; vérifier les résultats indexés après chaque évolution de contenu. |
| Accessibilité | 91 | Corrections concrètes sur focus, contraste, cibles tactiles et structure interactive ; pas encore d’audit assistif automatisé exhaustif. |
| Bonnes pratiques Next.js | 86 | Bon usage App Router, metadata et `next/image` ; stratégie CSP/cache à expliciter comme compromis opérationnel. |

**Note globale : 87/100.**

## Les 10 priorités restantes

1. Déployer puis refaire Lighthouse complet sur les 100 URL.
2. Ajouter axe à la CI et des scénarios clavier E2E.
3. Instrumenter les erreurs et la délivrabilité du formulaire.
4. Décider explicitement si la CSP nonce justifie le coût de rendu dynamique/no-store.
5. Définir un budget LCP par gabarit et le faire échouer en CI quand il régresse.
6. Extraire les études de cas les plus longues vers un format éditorial typé.
7. Réaliser un test avec NVDA/VoiceOver et un parcours sans souris.
8. Contrôler régulièrement les données structurées via Search Console après déploiement.
9. Ajouter des preuves externes vérifiables (recommandations, attestations ou métriques d’usage) lorsque disponibles.
10. Vérifier les informations de formation et leurs dates précises dans la frise.
