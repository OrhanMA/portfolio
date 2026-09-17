import type { LocalizedContent } from "@/lib/types/content";

export type { LocalizedContent } from "@/lib/types/content";

export type OdooProject = {
  slug: string;
  title: string;
  href: string;
  summary: LocalizedContent;
  details: LocalizedContent[];
  businessProblem?: LocalizedContent;
  solution?: LocalizedContent;
  technicalHighlights?: LocalizedContent[];
  impact?: LocalizedContent;
};

export const odooProjects: OdooProject[] = [
  {
    slug: "account_invoice_context",
    title: "Account Invoice Context",
    href: "https://github.com/OrhanMA/account_invoice_context",
    summary: {
      fr: "Ajoute du contexte métier sur les factures clients, comme les références de livraison et d'origine commerciale.",
      en: "Adds business context to customer invoices, including delivery references and sales-origin information.",
    },
    details: [
      {
        fr: "Ce module enrichit les factures Odoo avec des informations utiles au suivi opérationnel, sans dépendre d'un environnement fortement personnalisé.",
        en: "This module enriches Odoo invoices with operational context while remaining installable on a generic setup.",
      },
      {
        fr: "Il facilite la lecture des documents comptables par les équipes finance, ADV et logistique en mettant en avant les informations d'origine directement sur la facture.",
        en: "It makes accounting documents easier to read for finance, sales admin, and logistics teams by surfacing origin data directly on the invoice.",
      },
    ],
  },
  {
    slug: "account_invoice_margin",
    title: "Account Invoice Margin",
    href: "https://github.com/OrhanMA/account_invoice_margin",
    summary: {
      fr: "Calcule et expose la marge des factures pour suivre la rentabilité directement depuis la comptabilité.",
      en: "Calculates and exposes invoice margin to monitor profitability directly from accounting workflows.",
    },
    details: [
      {
        fr: "Le module apporte une vision marge au niveau de la facture en s'appuyant sur les données de coût et les lignes comptables.",
        en: "The module brings margin visibility at invoice level using cost data and accounting lines.",
      },
      {
        fr: "Il est utile pour analyser rapidement la performance commerciale sans exporter les données vers un outil externe.",
        en: "It helps quickly analyze commercial performance without exporting data to an external tool.",
      },
    ],
  },
  {
    slug: "bom_component_totals",
    title: "BOM Component Totals",
    href: "https://github.com/OrhanMA/bom_component_totals",
    summary: {
      fr: "Affiche des totaux de composants sur les nomenclatures pour mieux lire et contrôler les assemblages.",
      en: "Displays component totals on bills of materials to improve readability and assembly control.",
    },
    details: [
      {
        fr: "Ce module ajoute une lecture synthétique des quantités cumulées sur les nomenclatures Odoo.",
        en: "This module adds a compact view of cumulative quantities on Odoo bills of materials.",
      },
      {
        fr: "Il aide les équipes production et méthode à valider plus vite les structures produits et à repérer les incohérences.",
        en: "It helps production and process teams validate product structures faster and spot inconsistencies.",
      },
    ],
  },
  {
    slug: "contact_roles",
    title: "Contact Roles",
    href: "https://github.com/OrhanMA/contact_roles",
    summary: {
      fr: "Structure les rôles métier des contacts d'un partenaire pour clarifier qui fait quoi chez un client ou fournisseur.",
      en: "Structures partner contact roles to clarify who does what on the customer or supplier side.",
    },
    details: [
      {
        fr: "Le module permet d'identifier plus clairement les interlocuteurs commerciaux, comptables ou logistiques.",
        en: "The module helps identify commercial, accounting, or logistics contacts more clearly.",
      },
      {
        fr: "Il améliore la qualité de la donnée CRM et limite les ambiguïtés dans la communication quotidienne.",
        en: "It improves CRM data quality and reduces ambiguity in day-to-day communication.",
      },
    ],
  },
  {
    slug: "crm_lead_partner_context",
    title: "CRM Lead Partner Context",
    href: "https://github.com/OrhanMA/crm_lead_partner_context",
    summary: {
      fr: "Affiche plus de contexte partenaire dans les leads CRM pour aider à qualifier plus vite les opportunités.",
      en: "Adds richer partner context to CRM leads to help qualify opportunities faster.",
    },
    details: [
      {
        fr: "Ce module rapproche les données partenaires des leads pour éviter les allers-retours entre écrans.",
        en: "This module brings partner data closer to leads to avoid jumping between screens.",
      },
      {
        fr: "Il aide les équipes commerciales à prendre de meilleures décisions dès les premières étapes de qualification.",
        en: "It helps sales teams make better decisions during the earliest qualification stages.",
      },
    ],
  },
  {
    slug: "invoice_overdue_alert",
    title: "Invoice Overdue Alert",
    href: "https://github.com/OrhanMA/invoice_overdue_alert",
    summary: {
      fr: "Met en évidence les factures en retard de paiement pour accélérer le suivi de recouvrement.",
      en: "Highlights overdue invoices to speed up collection follow-up.",
    },
    details: [
      {
        fr: "Le module rend les retards de paiement visibles directement dans l'interface métier.",
        en: "The module makes payment delays visible directly in the business interface.",
      },
      {
        fr: "Il soutient les équipes finance en réduisant le temps nécessaire pour détecter les dossiers à relancer.",
        en: "It supports finance teams by reducing the time needed to spot cases requiring reminders.",
      },
    ],
  },
  {
    slug: "packing_list",
    title: "Packing List",
    href: "https://github.com/OrhanMA/packing_list",
    summary: {
      fr: "Génère des packing lists exploitables pour la préparation logistique, avec colisage et références client.",
      en: "Generates usable packing lists for logistics preparation, including packaging data and customer references.",
    },
    details: [
      {
        fr: "Ce module formalise la préparation d'expédition avec un document clair pour les équipes entrepôt et les clients.",
        en: "This module formalizes shipment preparation with a clear document for warehouse teams and customers.",
      },
      {
        fr: "Il embarque les champs nécessaires au colisage afin de rester autonome sur une installation Odoo standard.",
        en: "It embeds the packaging-related fields it needs so it stays autonomous on a standard Odoo installation.",
      },
    ],
  },
  {
    slug: "partner_commercial_profile",
    title: "Partner Commercial Profile",
    href: "https://github.com/OrhanMA/partner_commercial_profile",
    summary: {
      fr: "Ajoute une lecture commerciale structurée sur les fiches partenaires pour mieux qualifier les comptes.",
      en: "Adds a structured commercial view on partner records to better qualify accounts.",
    },
    details: [
      {
        fr: "Le module enrichit la fiche partenaire avec des informations utiles au pilotage commercial.",
        en: "The module enriches partner records with information useful for commercial steering.",
      },
      {
        fr: "Il aide à standardiser la collecte de données dans le CRM et améliore la continuité entre prospection et vente.",
        en: "It helps standardize CRM data collection and improves continuity between prospecting and sales.",
      },
    ],
  },
  {
    slug: "partner_lead_qualification",
    title: "Partner Lead Qualification",
    href: "https://github.com/OrhanMA/partner_lead_qualification",
    summary: {
      fr: "Ajoute des informations de qualification partenaire pour mieux prioriser et suivre les leads commerciaux.",
      en: "Adds partner qualification data to better prioritize and track sales leads.",
    },
    details: [
      {
        fr: "Ce module structure le niveau de qualification d'un prospect ou d'un partenaire dans le cycle commercial.",
        en: "This module structures the qualification level of a prospect or partner in the sales cycle.",
      },
      {
        fr: "Il améliore la lisibilité des dossiers et aide à concentrer les efforts sur les opportunités les plus pertinentes.",
        en: "It improves record readability and helps focus effort on the most relevant opportunities.",
      },
    ],
  },
  {
    slug: "product_b2b_pricing",
    title: "Product B2B Pricing",
    href: "https://github.com/OrhanMA/product_b2b_pricing",
    summary: {
      fr: "Expose des informations de tarification B2B sur les produits pour faciliter les usages commerciaux et catalogue.",
      en: "Exposes B2B pricing information on products for easier sales and catalog workflows.",
    },
    details: [
      {
        fr: "Le module organise des données tarifaires orientées B2B directement sur les fiches produit.",
        en: "The module organizes B2B-oriented pricing data directly on product records.",
      },
      {
        fr: "Il permet d'avoir une base plus claire pour la vente, le chiffrage et la maintenance des catalogues.",
        en: "It provides a clearer base for sales, quoting, and catalog maintenance.",
      },
    ],
  },
  {
    slug: "product_catalog_metadata",
    title: "Product Catalog Metadata",
    href: "https://github.com/OrhanMA/product_catalog_metadata",
    summary: {
      fr: "Centralise des métadonnées produit utiles à la publication, au tri et à la qualité du catalogue.",
      en: "Centralizes product metadata useful for publishing, sorting, and catalog quality.",
    },
    details: [
      {
        fr: "Ce module aide à structurer les informations annexes autour du produit au-delà des champs standards Odoo.",
        en: "This module helps structure additional product information beyond standard Odoo fields.",
      },
      {
        fr: "Il facilite la cohérence du catalogue et sert de base à d'autres usages e-commerce ou reporting.",
        en: "It improves catalog consistency and serves as a base for other e-commerce or reporting use cases.",
      },
    ],
  },
  {
    slug: "product_packaging",
    title: "Product Packaging",
    href: "https://github.com/OrhanMA/product_packaging",
    summary: {
      fr: "Ajoute des données de conditionnement produit pour fiabiliser la vente, la logistique et la préparation.",
      en: "Adds product packaging data to improve sales, logistics, and preparation reliability.",
    },
    details: [
      {
        fr: "Le module met en avant les informations de conditionnement utiles aux équipes opérationnelles.",
        en: "The module highlights packaging information useful for operational teams.",
      },
      {
        fr: "Il permet de mieux relier les données produit aux documents logistiques et aux usages terrain.",
        en: "It better connects product data with logistics documents and real-world warehouse usage.",
      },
    ],
  },
  {
    slug: "purchase_order_line_barcode",
    title: "Purchase Order Line Barcode",
    href: "https://github.com/OrhanMA/purchase_order_line_barcode",
    summary: {
      fr: "Affiche les codes-barres sur les lignes d'achat pour fluidifier le contrôle et la réception fournisseur.",
      en: "Displays barcodes on purchase order lines to streamline control and supplier receipt workflows.",
    },
    details: [
      {
        fr: "Ce module rend les documents d'achat plus exploitables pour les équipes qui manipulent les références au scan.",
        en: "This module makes purchasing documents more usable for teams working with scanned references.",
      },
      {
        fr: "Il réduit les recherches manuelles et accélère les opérations de réception ou de vérification.",
        en: "It reduces manual lookups and speeds up receiving or verification operations.",
      },
    ],
  },
  {
    slug: "sale_order_channel_info",
    title: "Sale Order Channel Info",
    href: "https://github.com/OrhanMA/sale_order_channel_info",
    summary: {
      fr: "Ajoute des informations de canal de vente sur les commandes pour mieux segmenter l'activité commerciale.",
      en: "Adds sales-channel information to orders for better commercial segmentation.",
    },
    details: [
      {
        fr: "Le module permet d'identifier l'origine d'une commande directement dans le flux de vente.",
        en: "The module identifies an order's origin directly in the sales workflow.",
      },
      {
        fr: "Il facilite ensuite le reporting, la lecture du pipe commercial et l'analyse par canal.",
        en: "It then supports reporting, sales-pipeline visibility, and channel-based analysis.",
      },
    ],
  },
  {
    slug: "sale_order_fiscal_year",
    title: "Sale Order Fiscal Year",
    href: "https://github.com/OrhanMA/sale_order_fiscal_year",
    summary: {
      fr: "Ajoute la notion d'exercice fiscal aux commandes pour simplifier le classement et le reporting.",
      en: "Adds fiscal-year information to sales orders to simplify classification and reporting.",
    },
    details: [
      {
        fr: "Ce module rattache les commandes à un cadre d'analyse comptable ou budgétaire plus explicite.",
        en: "This module links orders to a more explicit accounting or budgeting analysis frame.",
      },
      {
        fr: "Il est utile lorsqu'on a besoin de rapprocher les flux commerciaux d'un découpage financier interne.",
        en: "It is useful when sales flows need to align with an internal financial breakdown.",
      },
    ],
  },
  {
    slug: "sale_order_invoice_date",
    title: "Sale Order Invoice Date",
    href: "https://github.com/OrhanMA/sale_order_invoice_date",
    summary: {
      fr: "Expose des informations de date de facturation sur les commandes pour mieux piloter le cycle vente-facture.",
      en: "Exposes invoicing date information on orders to better monitor the sales-to-invoice cycle.",
    },
    details: [
      {
        fr: "Le module rapproche les données de commande et de facturation pour limiter les zones d'ombre dans le suivi.",
        en: "The module brings order and invoice data closer together to reduce blind spots in follow-up.",
      },
      {
        fr: "Il aide à analyser le délai entre vente et facturation sans passer par des exports ou des vues complexes.",
        en: "It helps analyze the delay between sale and invoicing without relying on exports or complex views.",
      },
    ],
  },
  {
    slug: "sale_order_line_notes",
    title: "Sale Order Line Notes",
    href: "https://github.com/OrhanMA/sale_order_line_notes",
    summary: {
      fr: "Ajoute des notes au niveau des lignes de commande pour mieux transmettre les consignes opérationnelles.",
      en: "Adds notes at sales order line level to better convey operational instructions.",
    },
    details: [
      {
        fr: "Ce module répond au besoin de porter des commentaires précis sur une ligne plutôt que sur toute la commande.",
        en: "This module answers the need for precise comments on a single line instead of the whole order.",
      },
      {
        fr: "Il est utile pour les cas de personnalisation, de préparation particulière ou de contraintes logistiques.",
        en: "It is useful for customization cases, special preparation, or logistics constraints.",
      },
    ],
  },
  {
    slug: "sale_order_risk_alerts",
    title: "Sale Order Risk Alerts",
    href: "https://github.com/OrhanMA/sale_order_risk_alerts",
    summary: {
      fr: "Met en avant des alertes de risque sur les commandes afin d'aider les équipes à sécuriser la vente.",
      en: "Highlights risk alerts on sales orders to help teams secure the sales process.",
    },
    details: [
      {
        fr: "Le module attire l'attention sur des signaux métier qui méritent une validation supplémentaire avant traitement.",
        en: "The module surfaces business signals that deserve extra validation before processing.",
      },
      {
        fr: "Il soutient la prise de décision côté ADV et commerce en rendant les situations sensibles plus visibles.",
        en: "It supports sales admin and commercial decision-making by making sensitive situations more visible.",
      },
    ],
  },
  {
    slug: "stock_move_product_analytics",
    title: "Stock Move Product Analytics",
    href: "https://github.com/OrhanMA/stock_move_product_analytics",
    summary: {
      fr: "Expose des axes analytiques sur les mouvements de stock pour mieux suivre les flux produits.",
      en: "Exposes analytical dimensions on stock moves to better track product flows.",
    },
    details: [
      {
        fr: "Ce module enrichit la lecture des mouvements de stock avec des éléments d'analyse métier complémentaires.",
        en: "This module enriches stock move analysis with complementary business dimensions.",
      },
      {
        fr: "Il facilite le reporting transversal entre logistique, produits et performance opérationnelle.",
        en: "It makes cross-functional reporting easier between logistics, products, and operational performance.",
      },
    ],
  },
  {
    slug: "stock_value_api",
    title: "Stock Value API",
    href: "https://github.com/OrhanMA/stock_value_api",
    summary: {
      fr: "Expose la valeur de stock via une API pour l'intégration avec des outils externes ou des tableaux de bord.",
      en: "Exposes stock value through an API for integration with external tools or dashboards.",
    },
    details: [
      {
        fr: "Le module ouvre un point d'accès programmatique à des données de valorisation stock.",
        en: "The module opens a programmatic access point to stock valuation data.",
      },
      {
        fr: "Il est particulièrement utile pour brancher Odoo à des outils maison, de BI ou de pilotage financier.",
        en: "It is especially useful when connecting Odoo to in-house tools, BI platforms, or financial dashboards.",
      },
    ],
  },
];

const odooProjectCaseStudies: Record<
  string,
  Pick<
    OdooProject,
    "businessProblem" | "solution" | "technicalHighlights" | "impact"
  >
> = {
  account_invoice_context: {
    businessProblem: {
      fr: "Les équipes finance, ADV et logistique avaient besoin de retrouver l'origine commerciale et logistique d'une facture sans ouvrir plusieurs écrans.",
      en: "Finance, sales admin, and logistics teams needed to understand an invoice's commercial and logistics origin without opening several screens.",
    },
    solution: {
      fr: "Le module remonte les références utiles directement sur les factures pour rendre les documents comptables plus lisibles.",
      en: "The module surfaces useful references directly on invoices to make accounting documents easier to read.",
    },
    technicalHighlights: [
      {
        fr: "Extensions de modèles comptables Odoo avec champs calculés et intégration dans les vues facture.",
        en: "Odoo accounting model extensions with computed fields and invoice view integration.",
      },
    ],
    impact: {
      fr: "Moins d'allers-retours entre ventes, livraisons et factures, donc un suivi plus rapide au quotidien.",
      en: "Fewer jumps between sales, deliveries, and invoices, making daily follow-up faster.",
    },
  },
  account_invoice_margin: {
    businessProblem: {
      fr: "La marge sur facture était difficile à fiabiliser et demandait des contrôles manuels ou des exports.",
      en: "Invoice margin was hard to make reliable and required manual checks or exports.",
    },
    solution: {
      fr: "Le module calcule la marge au niveau facture et ligne, avec une logique adaptée aux besoins de pilotage.",
      en: "The module calculates margin at invoice and line level with logic adapted to steering needs.",
    },
    technicalHighlights: [
      {
        fr: "Calculs comptables, champs monétaires, vues liste/formulaire et logique de recalcul historique.",
        en: "Accounting calculations, monetary fields, list/form views, and historical recomputation logic.",
      },
    ],
    impact: {
      fr: "Marge plus fiable, disponible directement dans Odoo, et base plus solide pour les KPI de direction.",
      en: "More reliable margin, available directly in Odoo, and a stronger base for management KPIs.",
    },
  },
  bom_component_totals: {
    businessProblem: {
      fr: "Les nomenclatures étaient difficiles à contrôler rapidement lorsque plusieurs lignes répétaient des composants.",
      en: "Bills of materials were hard to check quickly when several lines repeated components.",
    },
    solution: {
      fr: "Le module agrège les quantités de composants pour donner une lecture synthétique de la nomenclature.",
      en: "The module aggregates component quantities to provide a compact BoM reading.",
    },
    technicalHighlights: [
      {
        fr: "Calculs sur lignes de nomenclature et ajout d'informations opérationnelles dans l'interface produit.",
        en: "Calculations on BoM lines and operational information added to the product interface.",
      },
    ],
    impact: {
      fr: "Contrôle plus rapide des assemblages et réduction des erreurs de lecture côté produit/production.",
      en: "Faster assembly checks and fewer reading errors for product/production users.",
    },
  },
  contact_roles: {
    businessProblem: {
      fr: "Les fiches clients et fournisseurs ne distinguaient pas assez clairement les rôles des interlocuteurs.",
      en: "Customer and supplier records did not clearly distinguish contact responsibilities.",
    },
    solution: {
      fr: "Le module structure les fonctions et rôles des contacts pour clarifier qui contacter selon le sujet.",
      en: "The module structures contact functions and roles to clarify who to contact depending on the topic.",
    },
    technicalHighlights: [
      {
        fr: "Modèles relationnels Odoo, vues partenaires et valeurs métier réutilisables.",
        en: "Odoo relational models, partner views, and reusable business values.",
      },
    ],
    impact: {
      fr: "Donnée CRM plus propre et communication quotidienne moins ambiguë.",
      en: "Cleaner CRM data and less ambiguity in daily communication.",
    },
  },
  crm_lead_partner_context: {
    businessProblem: {
      fr: "La qualification d'un lead demandait de naviguer entre l'opportunité et la fiche partenaire.",
      en: "Qualifying a lead required moving between the opportunity and partner record.",
    },
    solution: {
      fr: "Le module rapproche le contexte partenaire des leads pour accélérer la qualification.",
      en: "The module brings partner context closer to leads to speed up qualification.",
    },
    technicalHighlights: [
      {
        fr: "Extension CRM avec champs liés/calculés et adaptation des vues lead.",
        en: "CRM extension with related/computed fields and lead view adaptation.",
      },
    ],
    impact: {
      fr: "Meilleure lecture commerciale dès les premières étapes et moins de changements d'écran.",
      en: "Better commercial reading from early stages and fewer screen switches.",
    },
  },
  invoice_overdue_alert: {
    businessProblem: {
      fr: "Le suivi des factures en retard reposait trop sur des recherches manuelles.",
      en: "Overdue invoice follow-up relied too much on manual searches.",
    },
    solution: {
      fr: "Le module automatise les alertes de retard et laisse les utilisateurs paramétrer les seuils utiles.",
      en: "The module automates overdue alerts and lets users configure useful thresholds.",
    },
    technicalHighlights: [
      {
        fr: "Cron Odoo, préférences utilisateur, configuration système et notifications ciblées.",
        en: "Odoo cron, user preferences, system configuration, and targeted notifications.",
      },
    ],
    impact: {
      fr: "Recouvrement plus visible et détection plus rapide des dossiers à relancer.",
      en: "More visible collection workflow and faster detection of accounts to follow up.",
    },
  },
  packing_list: {
    businessProblem: {
      fr: "La préparation logistique avait besoin d'un document de colisage plus clair que les documents standards.",
      en: "Logistics preparation needed a clearer packing document than the standard ones.",
    },
    solution: {
      fr: "Le module génère des packing lists depuis les transferts avec lignes, états, impression et suivi.",
      en: "The module generates packing lists from transfers with lines, states, printing, and follow-up.",
    },
    technicalHighlights: [
      {
        fr: "Wizard, séquence, modèles métier, boutons d'action, rapports QWeb et intégration stock picking.",
        en: "Wizard, sequence, business models, action buttons, QWeb reports, and stock picking integration.",
      },
    ],
    impact: {
      fr: "Préparation plus structurée, document exploitable par l'entrepôt et meilleure transmission client.",
      en: "More structured preparation, warehouse-ready document, and better customer handoff.",
    },
  },
  partner_commercial_profile: {
    businessProblem: {
      fr: "Les informations commerciales partenaires étaient dispersées et peu standardisées.",
      en: "Partner commercial information was scattered and poorly standardized.",
    },
    solution: {
      fr: "Le module ajoute une lecture commerciale structurée directement sur la fiche partenaire.",
      en: "The module adds a structured commercial view directly to the partner record.",
    },
    technicalHighlights: [
      {
        fr: "Champs métier partenaires, vues dédiées et intégration au cycle CRM/vente.",
        en: "Partner business fields, dedicated views, and CRM/sales cycle integration.",
      },
    ],
    impact: {
      fr: "Qualification plus homogène et continuité plus claire entre prospection, vente et suivi.",
      en: "More consistent qualification and clearer continuity between prospecting, sales, and follow-up.",
    },
  },
  partner_lead_qualification: {
    businessProblem: {
      fr: "Les leads n'étaient pas toujours priorisés avec les mêmes critères métier.",
      en: "Leads were not always prioritized using the same business criteria.",
    },
    solution: {
      fr: "Le module structure la qualification pour mieux identifier les opportunités pertinentes.",
      en: "The module structures qualification to better identify relevant opportunities.",
    },
    technicalHighlights: [
      {
        fr: "Statuts, champs d'analyse et vues orientées qualification commerciale.",
        en: "Statuses, analysis fields, and views focused on sales qualification.",
      },
    ],
    impact: {
      fr: "Dossiers plus lisibles et effort commercial mieux concentré.",
      en: "More readable records and better-focused sales effort.",
    },
  },
  product_b2b_pricing: {
    businessProblem: {
      fr: "Les données tarifaires B2B devaient être plus visibles pour le catalogue et les équipes commerciales.",
      en: "B2B pricing data needed to be more visible for the catalog and sales teams.",
    },
    solution: {
      fr: "Le module organise les informations de prix B2B sur les fiches produit.",
      en: "The module organizes B2B pricing information on product records.",
    },
    technicalHighlights: [
      {
        fr: "Extension produits/tarifs et adaptation des vues de catalogue.",
        en: "Product/pricelist extension and catalog view adaptation.",
      },
    ],
    impact: {
      fr: "Chiffrage et maintenance catalogue plus simples, avec moins de dépendance aux exports.",
      en: "Simpler quoting and catalog maintenance, with less reliance on exports.",
    },
  },
  product_catalog_metadata: {
    businessProblem: {
      fr: "Le catalogue produit demandait des métadonnées absentes du standard Odoo.",
      en: "The product catalog needed metadata missing from standard Odoo.",
    },
    solution: {
      fr: "Le module centralise les informations produit utiles à la publication, au tri et au reporting.",
      en: "The module centralizes product information useful for publishing, sorting, and reporting.",
    },
    technicalHighlights: [
      {
        fr: "Nombreux champs produit, tags, catégories publiques et vues de contrôle catalogue.",
        en: "Numerous product fields, tags, public categories, and catalog control views.",
      },
    ],
    impact: {
      fr: "Catalogue plus cohérent et meilleure base pour les usages e-commerce/B2B.",
      en: "More consistent catalog and better foundation for e-commerce/B2B use cases.",
    },
  },
  product_packaging: {
    businessProblem: {
      fr: "Les informations de conditionnement étaient nécessaires à la vente, à l'achat et à la logistique.",
      en: "Packaging information was needed across sales, purchasing, and logistics.",
    },
    solution: {
      fr: "Le module expose les dimensions, poids, GTIN, colisage et données palettes sur les produits.",
      en: "The module exposes dimensions, weights, GTINs, packaging, and pallet data on products.",
    },
    technicalHighlights: [
      {
        fr: "Champs produit calculés/affichés, onchange poids et intégration dans les vues opérationnelles.",
        en: "Displayed/computed product fields, weight onchange logic, and operational view integration.",
      },
    ],
    impact: {
      fr: "Moins de recherches manuelles et meilleure fiabilité des documents logistiques.",
      en: "Fewer manual lookups and more reliable logistics documents.",
    },
  },
  purchase_order_line_barcode: {
    businessProblem: {
      fr: "Le contrôle fournisseur demandait d'identifier vite les produits sur les lignes d'achat.",
      en: "Supplier control required quick product identification on purchase lines.",
    },
    solution: {
      fr: "Le module affiche les codes-barres directement dans les lignes d'achat.",
      en: "The module displays barcodes directly on purchase order lines.",
    },
    technicalHighlights: [
      {
        fr: "Extension purchase.order.line et adaptation des vues achat.",
        en: "purchase.order.line extension and purchase view adaptation.",
      },
    ],
    impact: {
      fr: "Réception et vérification fournisseur plus rapides, surtout dans les flux avec scan.",
      en: "Faster supplier receipt and verification, especially in scan-heavy workflows.",
    },
  },
  sale_order_channel_info: {
    businessProblem: {
      fr: "L'origine des commandes devait être plus visible pour segmenter l'activité.",
      en: "Order origin needed to be more visible to segment activity.",
    },
    solution: {
      fr: "Le module ajoute les informations de canal de vente directement dans le flux commande.",
      en: "The module adds sales-channel information directly into the order workflow.",
    },
    technicalHighlights: [
      {
        fr: "Champs commande, vues liste/formulaire et logique de reporting commercial.",
        en: "Order fields, list/form views, and sales reporting logic.",
      },
    ],
    impact: {
      fr: "Analyse par canal plus simple et lecture commerciale plus rapide.",
      en: "Simpler channel analysis and faster commercial reading.",
    },
  },
  sale_order_fiscal_year: {
    businessProblem: {
      fr: "Le rapprochement entre commandes et périodes financières n'était pas assez explicite.",
      en: "The link between orders and financial periods was not explicit enough.",
    },
    solution: {
      fr: "Le module rattache les commandes à un exercice fiscal exploitable en recherche et reporting.",
      en: "The module links orders to a fiscal year usable in search and reporting.",
    },
    technicalHighlights: [
      {
        fr: "Calcul d'exercice sur date de commande et ajout aux vues de vente.",
        en: "Fiscal-year calculation from order date and addition to sales views.",
      },
    ],
    impact: {
      fr: "Classement et reporting financier plus directs pour les équipes internes.",
      en: "More direct financial classification and reporting for internal teams.",
    },
  },
  sale_order_invoice_date: {
    businessProblem: {
      fr: "Le délai entre commande et facture était difficile à suivre depuis les vues de vente.",
      en: "The delay between order and invoice was hard to follow from sales views.",
    },
    solution: {
      fr: "Le module expose la date de facturation liée à la commande.",
      en: "The module exposes the invoicing date linked to the order.",
    },
    technicalHighlights: [
      {
        fr: "Champs liés/calculés sur sale.order et intégration dans les vues liste.",
        en: "Related/computed fields on sale.order and list view integration.",
      },
    ],
    impact: {
      fr: "Suivi vente-facture plus fluide et moins de recherches croisées.",
      en: "Smoother sales-to-invoice tracking and fewer cross-searches.",
    },
  },
  sale_order_line_notes: {
    businessProblem: {
      fr: "Certaines consignes ne concernaient qu'une ligne de commande, pas toute la commande.",
      en: "Some instructions applied to a single order line, not the entire order.",
    },
    solution: {
      fr: "Le module ajoute des notes au niveau ligne et les propage aux flux liés quand nécessaire.",
      en: "The module adds line-level notes and propagates them to related flows when needed.",
    },
    technicalHighlights: [
      {
        fr: "Extension sale.order.line, stock.move et affichage dans les vues opérationnelles.",
        en: "sale.order.line and stock.move extension with operational view display.",
      },
    ],
    impact: {
      fr: "Consignes plus précises pour la préparation et moins de pertes d'information.",
      en: "More precise preparation instructions and less information loss.",
    },
  },
  sale_order_risk_alerts: {
    businessProblem: {
      fr: "Les commandes sensibles devaient être identifiées avant confirmation ou traitement.",
      en: "Sensitive orders needed to be identified before confirmation or processing.",
    },
    solution: {
      fr: "Le module met en avant des alertes de risque et peut bloquer ou guider la validation.",
      en: "The module surfaces risk alerts and can block or guide validation.",
    },
    technicalHighlights: [
      {
        fr: "Règles métier sur commandes, configuration, modèles de courriel et vues d'alerte.",
        en: "Business rules on orders, configuration, email templates, and alert views.",
      },
    ],
    impact: {
      fr: "Ventes mieux sécurisées et décisions ADV plus rapides sur les cas à risque.",
      en: "More secure sales and faster sales-admin decisions on risky cases.",
    },
  },
  stock_move_product_analytics: {
    businessProblem: {
      fr: "Les mouvements de stock manquaient d'axes de lecture pour le reporting produit.",
      en: "Stock moves lacked analysis dimensions for product reporting.",
    },
    solution: {
      fr: "Le module enrichit les mouvements avec des informations produit exploitables en reporting.",
      en: "The module enriches stock moves with product information usable in reporting.",
    },
    technicalHighlights: [
      {
        fr: "Champs analytiques sur stock.move et adaptation des vues logistiques.",
        en: "Analytical fields on stock.move and logistics view adaptation.",
      },
    ],
    impact: {
      fr: "Meilleure lecture transversale entre stock, produits et performance opérationnelle.",
      en: "Better cross-functional reading across stock, products, and operational performance.",
    },
  },
  stock_value_api: {
    businessProblem: {
      fr: "La valeur de stock devait être consommable par des outils externes sans exports manuels.",
      en: "Stock value needed to be consumed by external tools without manual exports.",
    },
    solution: {
      fr: "Le module expose des routes API pour récupérer les données de valorisation et de stock.",
      en: "The module exposes API routes to retrieve stock and valuation data.",
    },
    technicalHighlights: [
      {
        fr: "Contrôleurs HTTP Odoo, méthodes modèle, calculs de stock et paramètres de sécurité.",
        en: "Odoo HTTP controllers, model methods, stock calculations, and security parameters.",
      },
    ],
    impact: {
      fr: "Synchronisation et tableaux de bord plus automatisés, avec moins de manipulation humaine.",
      en: "More automated synchronization and dashboards, with less human handling.",
    },
  },
};

odooProjects.forEach((project) => {
  Object.assign(project, odooProjectCaseStudies[project.slug]);
});

export function getOdooProjectBySlug(slug: string) {
  return odooProjects.find((project) => project.slug === slug);
}
