export type LocalizedContent = {
  fr: string;
  en: string;
};

export type OdooProject = {
  slug: string;
  title: string;
  href: string;
  summary: LocalizedContent;
  details: LocalizedContent[];
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

export function getOdooProjectBySlug(slug: string) {
  return odooProjects.find((project) => project.slug === slug);
}
