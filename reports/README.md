# Audits, mesures et relevés datés

Ce dossier conserve les photographies techniques et éditoriales produites à une date donnée. Elles servent de trace, pas de description automatique du checkout ou de la production actuelle.

## Ordre de lecture

| Date | Document | Nature | Statut |
| --- | --- | --- | --- |
| 15 septembre 2026 | [Prévalidation de rendu ISCOD](./portfolio-rendu-preflight-2026-09-15.md) | Contrôles locaux, production échantillonnée et réserves avant remise | Archive datée la plus récente de cette série |
| 8 septembre 2026 | [Réanalyse complète](./code-quality-reaudit-2026-09-08.md) | Nouvelle reproduction des défauts après une première phase de corrections | Archive datée |
| 8 septembre 2026 | [Audit approfondi de qualité](./code-quality-audit-2026-09-08.md) | Audit initial de qualité, architecture et maintenabilité | Archive datée ; lire ensuite la réanalyse |
| 14 août 2026 | [Revue de livraison](./portfolio-delivery-audit-2026-08-14.md) | Contrôles de livraison et limites humaines ou externes | Archive datée |
| 16 juillet 2026 | [Audit critique](./critical-portfolio-audit-2026-07-16.md) | Revue technique et éditoriale | Archive datée |
| 16 juillet 2026 | [Audit Lighthouse de production](./lighthouse-production-2026-07-16.md) | Mesures de laboratoire sur le sitemap public de l'époque | Archive datée ; à ne pas réutiliser comme mesure courante |

## Modèle actif

- [Relevé de preuves de livraison](./portfolio-evidence-collection-template.md) : copier ce document sous un nom daté, puis compléter uniquement les résultats réellement observés et autorisés à la publication.

## Preuves brutes

Les sous-dossiers `code-quality-audit-2026-09-08/evidence/` et `code-quality-reaudit-2026-09-08/evidence/` contiennent les journaux, scripts, captures et données liés à leurs audits. Ils restent associés à leur contexte historique et ne doivent pas être reformattés pour ressembler au checkout courant.

## Règles d'utilisation

- Citer la date, la version et l'environnement avec chaque résultat.
- Ne pas mélanger un contrôle local, une observation de production, une validation humaine et un jugement de jury.
- Ne pas présenter un ancien nombre de tests, de routes ou d'URL comme une propriété actuelle.
- Créer un nouveau rapport pour un nouveau candidat au lieu d'écraser l'ancien.
- Ne jamais conserver de secret, de message privé, de coordonnées de testeur ou de donnée client non autorisée dans ces fichiers.
- Utiliser des liens relatifs afin que les rapports restent consultables sur toute machine et sur la forge Git.
