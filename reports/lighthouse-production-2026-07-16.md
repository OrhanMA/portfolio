# Audit Lighthouse — production

Date : 16 juillet 2026  
Périmètre : les **100 URL** exposées par le sitemap de [orhanmadiassani.com](https://orhanmadiassani.com/sitemap.xml).  
Fenêtre de collecte : 2026-07-16T21:13:42.716Z → 2026-07-16T21:22:02.427Z.

## Méthode

- Lighthouse **13.4.0**, moteur de Chrome, avec le profil **mobile** et les catégories Performance, Accessibilité, Bonnes pratiques et SEO.
- Une mesure de laboratoire indépendante par URL, sur la production publique. Les scores peuvent varier légèrement entre deux passages ; ils ne remplacent pas les Core Web Vitals réels des visiteurs.
- Abréviations : FCP = First Contentful Paint, LCP = Largest Contentful Paint, TBT = Total Blocking Time, CLS = Cumulative Layout Shift.

## Vue d’ensemble

| Métrique | Moyenne | Médiane | Plage (min–max) |
| --- | --- | --- | --- |
| Performance | 94.3 | 96.0 | 57–97 |
| Accessibilité | 99.8 | 100.0 | 96–100 |
| Bonnes pratiques | 99.9 | 100.0 | 96–100 |
| SEO | 100.0 | 100.0 | 100–100 |
| FCP | 1.34 s | 1.08 s | 0.94 s–8.72 s |
| LCP | 2.73 s | 2.49 s | 2.26 s–12.24 s |
| TBT | 44 ms | 44 ms | 0 ms–107 ms |
| CLS | 0.000 | 0.000 | 0.000–0.000 |

Résultat : **98/100 pages ont une performance d’au moins 90** ; les 2 exceptions sont les variantes FR/EN de la réalisation « App Trajectoires de vie ». Toutes les pages obtiennent **100 en SEO** et un **CLS de 0**.

## Priorités

1. **P0 — App Trajectoires de vie** : [FR](https://orhanmadiassani.com/fr/realisations/app-trajectoires-de-vie) et [EN](https://orhanmadiassani.com/en/realisations/app-trajectoires-de-vie) font 57 en performance. Le chargement direct de quatre lecteurs YouTube amène un FCP à 8,63/8,72 s, un LCP à 9,53/12,24 s et une alerte Cookies dans DevTools (Bonnes pratiques 96). Remplacer les iframes par une façade/aperçu activé au clic — puis ne créer l’iframe qu’après consentement et interaction — est le levier principal.
2. **P1 — Contraste de l’accueil** : [FR](/fr) et [EN](/en) sont à 96 en accessibilité. Le CTA de réalisations (texte blanc sur #ff5444) mesure un contraste de 3,18:1 ; viser au moins 4,5:1.
3. **P1 — Cibles tactiles des listes d’articles** : [FR](/fr/articles) et [EN](/en/articles) sont à 96 en accessibilité. Les boutons de tags font environ 22 px de haut au lieu des 24 px minimum ; augmenter leur hauteur et l’espacement.
4. **P2 — Optimisations secondaires de la page App Trajectoires de vie** : Lighthouse estime environ 25 KiB économisables sur l’image décorative Fuji, 25 KiB de JavaScript inutilisé et ~150 ms de CSS bloquant. Ces gains sont secondaires par rapport aux embeds YouTube.

## Résultats détaillés — français

| URL | Perf. | A11y | BP | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [/fr](https://orhanmadiassani.com/fr) | 95 | 96 | 100 | 100 | 1.23 s | 2.73 s | 45 ms | 0.000 |
| [/fr/a-propos](https://orhanmadiassani.com/fr/a-propos) | 96 | 100 | 100 | 100 | 1.01 s | 2.32 s | 34 ms | 0.000 |
| [/fr/competences](https://orhanmadiassani.com/fr/competences) | 97 | 100 | 100 | 100 | 0.94 s | 2.57 s | 39 ms | 0.000 |
| [/fr/realisations](https://orhanmadiassani.com/fr/realisations) | 96 | 100 | 100 | 100 | 0.97 s | 2.44 s | 48 ms | 0.000 |
| [/fr/articles](https://orhanmadiassani.com/fr/articles) | 94 | 96 | 100 | 100 | 1.56 s | 2.89 s | 33 ms | 0.000 |
| [/fr/projects](https://orhanmadiassani.com/fr/projects) | 96 | 100 | 100 | 100 | 1.08 s | 2.43 s | 58 ms | 0.000 |
| [/fr/contact](https://orhanmadiassani.com/fr/contact) | 95 | 100 | 100 | 100 | 0.99 s | 2.75 s | 107 ms | 0.000 |
| [/fr/mentions-legales](https://orhanmadiassani.com/fr/mentions-legales) | 97 | 100 | 100 | 100 | 1.06 s | 2.26 s | 39 ms | 0.000 |
| [/fr/politique-confidentialite](https://orhanmadiassani.com/fr/politique-confidentialite) | 96 | 100 | 100 | 100 | 1.02 s | 2.37 s | 45 ms | 0.000 |
| [/fr/articles/odoo-session-timeout](https://orhanmadiassani.com/fr/articles/odoo-session-timeout) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 42 ms | 0.000 |
| [/fr/articles/telecharger-code-odoo-jupyter](https://orhanmadiassani.com/fr/articles/telecharger-code-odoo-jupyter) | 96 | 100 | 100 | 100 | 1.08 s | 2.43 s | 54 ms | 0.000 |
| [/fr/articles/docker-dangling-images](https://orhanmadiassani.com/fr/articles/docker-dangling-images) | 95 | 100 | 100 | 100 | 1.23 s | 2.58 s | 36 ms | 0.000 |
| [/fr/articles/migration-odoo-v16-v19](https://orhanmadiassani.com/fr/articles/migration-odoo-v16-v19) | 94 | 100 | 100 | 100 | 1.22 s | 2.72 s | 52 ms | 0.000 |
| [/fr/articles/refonte-site-corporate-1up](https://orhanmadiassani.com/fr/articles/refonte-site-corporate-1up) | 97 | 100 | 100 | 100 | 1.07 s | 2.27 s | 57 ms | 0.000 |
| [/fr/articles/application-cap2vie-lig](https://orhanmadiassani.com/fr/articles/application-cap2vie-lig) | 96 | 100 | 100 | 100 | 1.30 s | 2.65 s | 53 ms | 0.000 |
| [/fr/projects/account_invoice_context](https://orhanmadiassani.com/fr/projects/account_invoice_context) | 95 | 100 | 100 | 100 | 1.05 s | 2.51 s | 53 ms | 0.000 |
| [/fr/projects/account_invoice_margin](https://orhanmadiassani.com/fr/projects/account_invoice_margin) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 52 ms | 0.000 |
| [/fr/projects/bom_component_totals](https://orhanmadiassani.com/fr/projects/bom_component_totals) | 95 | 100 | 100 | 100 | 1.54 s | 2.50 s | 30 ms | 0.000 |
| [/fr/projects/contact_roles](https://orhanmadiassani.com/fr/projects/contact_roles) | 96 | 100 | 100 | 100 | 0.98 s | 2.44 s | 55 ms | 0.000 |
| [/fr/projects/crm_lead_partner_context](https://orhanmadiassani.com/fr/projects/crm_lead_partner_context) | 96 | 100 | 100 | 100 | 1.00 s | 2.46 s | 63 ms | 0.000 |
| [/fr/projects/invoice_overdue_alert](https://orhanmadiassani.com/fr/projects/invoice_overdue_alert) | 96 | 100 | 100 | 100 | 0.99 s | 2.45 s | 42 ms | 0.000 |
| [/fr/projects/packing_list](https://orhanmadiassani.com/fr/projects/packing_list) | 95 | 100 | 100 | 100 | 1.53 s | 2.49 s | 27 ms | 0.000 |
| [/fr/projects/partner_commercial_profile](https://orhanmadiassani.com/fr/projects/partner_commercial_profile) | 96 | 100 | 100 | 100 | 0.95 s | 2.41 s | 54 ms | 0.000 |
| [/fr/projects/partner_lead_qualification](https://orhanmadiassani.com/fr/projects/partner_lead_qualification) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 25 ms | 0.000 |
| [/fr/projects/product_b2b_pricing](https://orhanmadiassani.com/fr/projects/product_b2b_pricing) | 96 | 100 | 100 | 100 | 0.99 s | 2.45 s | 55 ms | 0.000 |
| [/fr/projects/product_catalog_metadata](https://orhanmadiassani.com/fr/projects/product_catalog_metadata) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 66 ms | 0.000 |
| [/fr/projects/product_packaging](https://orhanmadiassani.com/fr/projects/product_packaging) | 96 | 100 | 100 | 100 | 1.01 s | 2.46 s | 24 ms | 0.000 |
| [/fr/projects/purchase_order_line_barcode](https://orhanmadiassani.com/fr/projects/purchase_order_line_barcode) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 55 ms | 0.000 |
| [/fr/projects/sale_order_channel_info](https://orhanmadiassani.com/fr/projects/sale_order_channel_info) | 96 | 100 | 100 | 100 | 0.95 s | 2.41 s | 35 ms | 0.000 |
| [/fr/projects/sale_order_fiscal_year](https://orhanmadiassani.com/fr/projects/sale_order_fiscal_year) | 96 | 100 | 100 | 100 | 0.96 s | 2.42 s | 53 ms | 0.000 |
| [/fr/projects/sale_order_invoice_date](https://orhanmadiassani.com/fr/projects/sale_order_invoice_date) | 96 | 100 | 100 | 100 | 0.94 s | 2.41 s | 38 ms | 0.000 |
| [/fr/projects/sale_order_line_notes](https://orhanmadiassani.com/fr/projects/sale_order_line_notes) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 42 ms | 0.000 |
| [/fr/projects/sale_order_risk_alerts](https://orhanmadiassani.com/fr/projects/sale_order_risk_alerts) | 96 | 100 | 100 | 100 | 1.01 s | 2.48 s | 41 ms | 0.000 |
| [/fr/projects/stock_move_product_analytics](https://orhanmadiassani.com/fr/projects/stock_move_product_analytics) | 96 | 100 | 100 | 100 | 0.99 s | 2.45 s | 56 ms | 0.000 |
| [/fr/projects/stock_value_api](https://orhanmadiassani.com/fr/projects/stock_value_api) | 95 | 100 | 100 | 100 | 1.58 s | 2.50 s | 29 ms | 0.000 |
| [/fr/competences/autonomie](https://orhanmadiassani.com/fr/competences/autonomie) | 94 | 100 | 100 | 100 | 1.29 s | 2.79 s | 53 ms | 0.000 |
| [/fr/competences/perseverance](https://orhanmadiassani.com/fr/competences/perseverance) | 93 | 100 | 100 | 100 | 1.83 s | 2.71 s | 34 ms | 0.000 |
| [/fr/competences/adaptabilite](https://orhanmadiassani.com/fr/competences/adaptabilite) | 95 | 100 | 100 | 100 | 1.23 s | 2.73 s | 47 ms | 0.000 |
| [/fr/competences/amelioration-continue](https://orhanmadiassani.com/fr/competences/amelioration-continue) | 94 | 100 | 100 | 100 | 1.26 s | 2.76 s | 43 ms | 0.000 |
| [/fr/competences/communication](https://orhanmadiassani.com/fr/competences/communication) | 93 | 100 | 100 | 100 | 1.83 s | 2.71 s | 31 ms | 0.000 |
| [/fr/competences/developpement-odoo](https://orhanmadiassani.com/fr/competences/developpement-odoo) | 94 | 100 | 100 | 100 | 1.26 s | 2.76 s | 66 ms | 0.000 |
| [/fr/competences/developpement-backend](https://orhanmadiassani.com/fr/competences/developpement-backend) | 95 | 100 | 100 | 100 | 1.23 s | 2.73 s | 60 ms | 0.000 |
| [/fr/competences/developpement-frontend](https://orhanmadiassani.com/fr/competences/developpement-frontend) | 94 | 100 | 100 | 100 | 1.21 s | 2.71 s | 39 ms | 0.000 |
| [/fr/competences/devops](https://orhanmadiassani.com/fr/competences/devops) | 94 | 100 | 100 | 100 | 1.29 s | 2.79 s | 61 ms | 0.000 |
| [/fr/competences/python](https://orhanmadiassani.com/fr/competences/python) | 94 | 100 | 100 | 100 | 1.23 s | 2.73 s | 59 ms | 0.000 |
| [/fr/realisations/migration-odoo-v16-v19](https://orhanmadiassani.com/fr/realisations/migration-odoo-v16-v19) | 90 | 100 | 100 | 100 | 2.10 s | 3.04 s | 0 ms | 0.000 |
| [/fr/realisations/modules-metier-odoo](https://orhanmadiassani.com/fr/realisations/modules-metier-odoo) | 96 | 100 | 100 | 100 | 1.38 s | 2.58 s | 65 ms | 0.000 |
| [/fr/realisations/refonte-site-corporate](https://orhanmadiassani.com/fr/realisations/refonte-site-corporate) | 92 | 100 | 100 | 100 | 1.87 s | 2.88 s | 0 ms | 0.000 |
| [/fr/realisations/app-trajectoires-de-vie](https://orhanmadiassani.com/fr/realisations/app-trajectoires-de-vie) | 57 | 100 | 96 | 100 | 8.63 s | 9.53 s | 0 ms | 0.000 |
| [/fr/realisations/portfolio-professionnel](https://orhanmadiassani.com/fr/realisations/portfolio-professionnel) | 92 | 100 | 100 | 100 | 1.88 s | 2.75 s | 0 ms | 0.000 |

## Résultats détaillés — anglais

| URL | Perf. | A11y | BP | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [/en](https://orhanmadiassani.com/en) | 93 | 96 | 100 | 100 | 1.23 s | 2.73 s | 56 ms | 0.000 |
| [/en/a-propos](https://orhanmadiassani.com/en/a-propos) | 96 | 100 | 100 | 100 | 1.25 s | 2.28 s | 34 ms | 0.000 |
| [/en/competences](https://orhanmadiassani.com/en/competences) | 93 | 100 | 100 | 100 | 1.27 s | 2.65 s | 68 ms | 0.000 |
| [/en/realisations](https://orhanmadiassani.com/en/realisations) | 96 | 100 | 100 | 100 | 0.96 s | 2.42 s | 53 ms | 0.000 |
| [/en/articles](https://orhanmadiassani.com/en/articles) | 94 | 96 | 100 | 100 | 1.24 s | 2.81 s | 56 ms | 0.000 |
| [/en/projects](https://orhanmadiassani.com/en/projects) | 96 | 100 | 100 | 100 | 1.06 s | 2.41 s | 53 ms | 0.000 |
| [/en/contact](https://orhanmadiassani.com/en/contact) | 94 | 100 | 100 | 100 | 0.98 s | 2.73 s | 85 ms | 0.000 |
| [/en/mentions-legales](https://orhanmadiassani.com/en/mentions-legales) | 97 | 100 | 100 | 100 | 1.07 s | 2.27 s | 35 ms | 0.000 |
| [/en/politique-confidentialite](https://orhanmadiassani.com/en/politique-confidentialite) | 97 | 100 | 100 | 100 | 0.94 s | 2.29 s | 42 ms | 0.000 |
| [/en/articles/odoo-session-timeout](https://orhanmadiassani.com/en/articles/odoo-session-timeout) | 96 | 100 | 100 | 100 | 0.98 s | 2.44 s | 31 ms | 0.000 |
| [/en/articles/telecharger-code-odoo-jupyter](https://orhanmadiassani.com/en/articles/telecharger-code-odoo-jupyter) | 96 | 100 | 100 | 100 | 1.10 s | 2.45 s | 42 ms | 0.000 |
| [/en/articles/docker-dangling-images](https://orhanmadiassani.com/en/articles/docker-dangling-images) | 95 | 100 | 100 | 100 | 1.22 s | 2.57 s | 57 ms | 0.000 |
| [/en/articles/migration-odoo-v16-v19](https://orhanmadiassani.com/en/articles/migration-odoo-v16-v19) | 94 | 100 | 100 | 100 | 1.24 s | 2.74 s | 32 ms | 0.000 |
| [/en/articles/refonte-site-corporate-1up](https://orhanmadiassani.com/en/articles/refonte-site-corporate-1up) | 96 | 100 | 100 | 100 | 1.08 s | 2.28 s | 52 ms | 0.000 |
| [/en/articles/application-cap2vie-lig](https://orhanmadiassani.com/en/articles/application-cap2vie-lig) | 95 | 100 | 100 | 100 | 1.22 s | 2.57 s | 56 ms | 0.000 |
| [/en/projects/account_invoice_context](https://orhanmadiassani.com/en/projects/account_invoice_context) | 96 | 100 | 100 | 100 | 1.24 s | 2.43 s | 56 ms | 0.000 |
| [/en/projects/account_invoice_margin](https://orhanmadiassani.com/en/projects/account_invoice_margin) | 96 | 100 | 100 | 100 | 0.99 s | 2.45 s | 51 ms | 0.000 |
| [/en/projects/bom_component_totals](https://orhanmadiassani.com/en/projects/bom_component_totals) | 94 | 100 | 100 | 100 | 1.62 s | 2.57 s | 31 ms | 0.000 |
| [/en/projects/contact_roles](https://orhanmadiassani.com/en/projects/contact_roles) | 96 | 100 | 100 | 100 | 1.00 s | 2.45 s | 42 ms | 0.000 |
| [/en/projects/crm_lead_partner_context](https://orhanmadiassani.com/en/projects/crm_lead_partner_context) | 96 | 100 | 100 | 100 | 1.05 s | 2.51 s | 51 ms | 0.000 |
| [/en/projects/invoice_overdue_alert](https://orhanmadiassani.com/en/projects/invoice_overdue_alert) | 96 | 100 | 100 | 100 | 0.98 s | 2.44 s | 51 ms | 0.000 |
| [/en/projects/packing_list](https://orhanmadiassani.com/en/projects/packing_list) | 96 | 100 | 100 | 100 | 1.01 s | 2.47 s | 49 ms | 0.000 |
| [/en/projects/partner_commercial_profile](https://orhanmadiassani.com/en/projects/partner_commercial_profile) | 96 | 100 | 100 | 100 | 0.96 s | 2.43 s | 33 ms | 0.000 |
| [/en/projects/partner_lead_qualification](https://orhanmadiassani.com/en/projects/partner_lead_qualification) | 96 | 100 | 100 | 100 | 0.99 s | 2.45 s | 34 ms | 0.000 |
| [/en/projects/product_b2b_pricing](https://orhanmadiassani.com/en/projects/product_b2b_pricing) | 96 | 100 | 100 | 100 | 0.96 s | 2.43 s | 55 ms | 0.000 |
| [/en/projects/product_catalog_metadata](https://orhanmadiassani.com/en/projects/product_catalog_metadata) | 96 | 100 | 100 | 100 | 1.24 s | 2.43 s | 27 ms | 0.000 |
| [/en/projects/product_packaging](https://orhanmadiassani.com/en/projects/product_packaging) | 96 | 100 | 100 | 100 | 0.97 s | 2.44 s | 52 ms | 0.000 |
| [/en/projects/purchase_order_line_barcode](https://orhanmadiassani.com/en/projects/purchase_order_line_barcode) | 96 | 100 | 100 | 100 | 0.96 s | 2.43 s | 36 ms | 0.000 |
| [/en/projects/sale_order_channel_info](https://orhanmadiassani.com/en/projects/sale_order_channel_info) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 42 ms | 0.000 |
| [/en/projects/sale_order_fiscal_year](https://orhanmadiassani.com/en/projects/sale_order_fiscal_year) | 96 | 100 | 100 | 100 | 1.04 s | 2.50 s | 52 ms | 0.000 |
| [/en/projects/sale_order_invoice_date](https://orhanmadiassani.com/en/projects/sale_order_invoice_date) | 96 | 100 | 100 | 100 | 0.99 s | 2.46 s | 53 ms | 0.000 |
| [/en/projects/sale_order_line_notes](https://orhanmadiassani.com/en/projects/sale_order_line_notes) | 96 | 100 | 100 | 100 | 0.96 s | 2.43 s | 43 ms | 0.000 |
| [/en/projects/sale_order_risk_alerts](https://orhanmadiassani.com/en/projects/sale_order_risk_alerts) | 96 | 100 | 100 | 100 | 0.97 s | 2.43 s | 37 ms | 0.000 |
| [/en/projects/stock_move_product_analytics](https://orhanmadiassani.com/en/projects/stock_move_product_analytics) | 96 | 100 | 100 | 100 | 0.96 s | 2.42 s | 49 ms | 0.000 |
| [/en/projects/stock_value_api](https://orhanmadiassani.com/en/projects/stock_value_api) | 96 | 100 | 100 | 100 | 0.96 s | 2.43 s | 39 ms | 0.000 |
| [/en/competences/autonomie](https://orhanmadiassani.com/en/competences/autonomie) | 95 | 100 | 100 | 100 | 1.23 s | 2.73 s | 45 ms | 0.000 |
| [/en/competences/perseverance](https://orhanmadiassani.com/en/competences/perseverance) | 94 | 100 | 100 | 100 | 1.31 s | 2.81 s | 34 ms | 0.000 |
| [/en/competences/adaptabilite](https://orhanmadiassani.com/en/competences/adaptabilite) | 93 | 100 | 100 | 100 | 1.47 s | 2.81 s | 56 ms | 0.000 |
| [/en/competences/amelioration-continue](https://orhanmadiassani.com/en/competences/amelioration-continue) | 94 | 100 | 100 | 100 | 1.23 s | 2.73 s | 53 ms | 0.000 |
| [/en/competences/communication](https://orhanmadiassani.com/en/competences/communication) | 94 | 100 | 100 | 100 | 1.31 s | 2.81 s | 42 ms | 0.000 |
| [/en/competences/developpement-odoo](https://orhanmadiassani.com/en/competences/developpement-odoo) | 94 | 100 | 100 | 100 | 1.21 s | 2.71 s | 35 ms | 0.000 |
| [/en/competences/developpement-backend](https://orhanmadiassani.com/en/competences/developpement-backend) | 95 | 100 | 100 | 100 | 1.22 s | 2.72 s | 38 ms | 0.000 |
| [/en/competences/developpement-frontend](https://orhanmadiassani.com/en/competences/developpement-frontend) | 92 | 100 | 100 | 100 | 1.87 s | 2.75 s | 31 ms | 0.000 |
| [/en/competences/devops](https://orhanmadiassani.com/en/competences/devops) | 94 | 100 | 100 | 100 | 1.23 s | 2.73 s | 51 ms | 0.000 |
| [/en/competences/python](https://orhanmadiassani.com/en/competences/python) | 94 | 100 | 100 | 100 | 1.25 s | 2.75 s | 43 ms | 0.000 |
| [/en/realisations/migration-odoo-v16-v19](https://orhanmadiassani.com/en/realisations/migration-odoo-v16-v19) | 93 | 100 | 100 | 100 | 1.70 s | 2.72 s | 38 ms | 0.000 |
| [/en/realisations/modules-metier-odoo](https://orhanmadiassani.com/en/realisations/modules-metier-odoo) | 95 | 100 | 100 | 100 | 1.12 s | 2.58 s | 47 ms | 0.000 |
| [/en/realisations/refonte-site-corporate](https://orhanmadiassani.com/en/realisations/refonte-site-corporate) | 91 | 100 | 100 | 100 | 1.85 s | 3.01 s | 34 ms | 0.000 |
| [/en/realisations/app-trajectoires-de-vie](https://orhanmadiassani.com/en/realisations/app-trajectoires-de-vie) | 57 | 100 | 96 | 100 | 8.72 s | 12.24 s | 0 ms | 0.000 |
| [/en/realisations/portfolio-professionnel](https://orhanmadiassani.com/en/realisations/portfolio-professionnel) | 92 | 100 | 100 | 100 | 1.87 s | 2.80 s | 33 ms | 0.000 |

## Pages les moins performantes

| URL | Perf. | FCP | LCP | TBT |
| --- | --- | --- | --- | --- |
| [/fr/realisations/app-trajectoires-de-vie](https://orhanmadiassani.com/fr/realisations/app-trajectoires-de-vie) | 57 | 8.63 s | 9.53 s | 0 ms |
| [/en/realisations/app-trajectoires-de-vie](https://orhanmadiassani.com/en/realisations/app-trajectoires-de-vie) | 57 | 8.72 s | 12.24 s | 0 ms |
| [/fr/realisations/migration-odoo-v16-v19](https://orhanmadiassani.com/fr/realisations/migration-odoo-v16-v19) | 90 | 2.10 s | 3.04 s | 0 ms |
| [/en/realisations/refonte-site-corporate](https://orhanmadiassani.com/en/realisations/refonte-site-corporate) | 91 | 1.85 s | 3.01 s | 34 ms |
