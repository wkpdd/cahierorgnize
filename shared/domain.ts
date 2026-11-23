// Domain vocabulary shared by the server and the web app.
// Labels are French first (the language used on Algerian procurement documents) with English.

export type Lang = 'en' | 'fr';
export type Label = { en: string; fr: string };

export const PROJECT_TYPES = {
  cdc: { en: 'Tender (cahier des charges)', fr: "Appel d'offres (cahier des charges)" },
  consultation: { en: 'Consultation (order)', fr: 'Consultation' },
  bc: { en: 'Purchase order (bon de commande)', fr: 'Bon de commande' },
  marche: { en: 'Big project (marché)', fr: 'Grand projet (marché)' },
} satisfies Record<string, Label>;
export type ProjectType = keyof typeof PROJECT_TYPES;

export const AWARD_CRITERIA = {
  lowest: { en: 'Lowest price (moins-disant)', fr: 'Moins-disant (prix le plus bas)' },
  best: { en: 'Best offer (mieux-disant)', fr: 'Mieux-disant (meilleure offre)' },
} satisfies Record<string, Label>;
export type AwardCriterion = keyof typeof AWARD_CRITERIA;

export const PROJECT_STATUSES = {
  watch: { en: 'To study', fr: 'À étudier', color: 'slate' },
  preparing: { en: 'Preparing', fr: 'En préparation', color: 'blue' },
  submitted: { en: 'Submitted', fr: 'Soumis', color: 'indigo' },
  opened: { en: 'Envelopes opened', fr: 'Plis ouverts', color: 'violet' },
  won: { en: 'Won', fr: 'Gagné', color: 'green' },
  lost: { en: 'Lost', fr: 'Perdu', color: 'red' },
  cancelled: { en: 'Cancelled / unsuccessful', fr: 'Annulé / infructueux', color: 'zinc' },
  in_progress: { en: 'In progress (ODS)', fr: 'En exécution (ODS)', color: 'amber' },
  delivered: { en: 'Delivered', fr: 'Livré', color: 'teal' },
  invoiced: { en: 'Invoiced', fr: 'Facturé', color: 'cyan' },
  paid: { en: 'Paid / closed', fr: 'Payé / clôturé', color: 'emerald' },
} satisfies Record<string, Label & { color: string }>;
export type ProjectStatus = keyof typeof PROJECT_STATUSES;

/** Statuses that mean "still competing" (deadline matters). */
export const ACTIVE_BID_STATUSES: ProjectStatus[] = ['watch', 'preparing', 'submitted', 'opened'];
/** Statuses after a win. */
export const WON_STATUSES: ProjectStatus[] = ['won', 'in_progress', 'delivered', 'invoiced', 'paid'];

export const OFFER_STATUSES = {
  draft: { en: 'Draft', fr: 'Brouillon', color: 'slate' },
  ready: { en: 'Ready', fr: 'Prête', color: 'blue' },
  submitted: { en: 'Submitted', fr: 'Déposée', color: 'indigo' },
  won: { en: 'Won', fr: 'Retenue', color: 'green' },
  lost: { en: 'Not selected', fr: 'Non retenue', color: 'red' },
  rejected: { en: 'Rejected', fr: 'Rejetée', color: 'zinc' },
  withdrawn: { en: 'Withdrawn', fr: 'Retirée', color: 'zinc' },
} satisfies Record<string, Label & { color: string }>;
export type OfferStatus = keyof typeof OFFER_STATUSES;

export const RESULT_STATUSES = {
  admitted: { en: 'Admitted', fr: 'Recevable' },
  rejected: { en: 'Rejected', fr: 'Rejetée' },
  winner: { en: 'Winner', fr: 'Attributaire' },
} satisfies Record<string, Label>;

export const PAYMENT_METHODS = {
  transfer: { en: 'Bank transfer', fr: 'Virement' },
  treasury: { en: 'Treasury (mandat)', fr: 'Trésor (mandatement)' },
  cheque: { en: 'Cheque', fr: 'Chèque' },
  cash: { en: 'Cash', fr: 'Espèces' },
} satisfies Record<string, Label>;

export const DOC_CATEGORIES = {
  cdc: { en: 'Cahier des charges (scan)', fr: 'Cahier des charges (scan)' },
  notice: { en: 'Tender notice', fr: "Avis d'appel d'offres" },
  admin: { en: 'Application file', fr: 'Dossier de candidature' },
  technical: { en: 'Technical offer / catalog', fr: 'Offre technique / catalogue' },
  financial: { en: 'Financial offer', fr: 'Offre financière' },
  bond: { en: 'Bank bond (caution)', fr: 'Caution bancaire' },
  opening: { en: 'Opening minutes (PV)', fr: "PV d'ouverture des plis" },
  award: { en: 'Award notice', fr: "Avis d'attribution" },
  contract: { en: 'Contract / purchase order', fr: 'Marché / bon de commande' },
  ods: { en: 'Service order (ODS)', fr: 'Ordre de service (ODS)' },
  delivery: { en: 'Delivery note / reception PV', fr: 'Bon de livraison / PV de réception' },
  invoice: { en: 'Invoice', fr: 'Facture' },
  payment: { en: 'Payment proof', fr: 'Justificatif de paiement' },
  company: { en: 'Company document', fr: "Document de l'entreprise" },
  other: { en: 'Other', fr: 'Autre' },
} satisfies Record<string, Label>;
export type DocCategory = keyof typeof DOC_CATEGORIES;

/** Standard company documents that usually expire and must be renewed for each submission. */
export const COMPANY_DOC_TYPES = {
  rc: { en: 'Commercial register (RC)', fr: 'Registre de commerce (RC)' },
  nif: { en: 'Tax ID card (NIF)', fr: 'Carte NIF' },
  nis: { en: 'Statistical ID (NIS)', fr: 'Avis NIS' },
  extrait_role: { en: 'Tax clearance (extrait de rôle)', fr: 'Extrait de rôle apuré' },
  cnas: { en: 'CNAS certificate', fr: 'Attestation CNAS' },
  casnos: { en: 'CASNOS certificate', fr: 'Attestation CASNOS' },
  casier: { en: 'Criminal record (casier judiciaire)', fr: 'Casier judiciaire' },
  bilan: { en: 'Financial statements (bilans)', fr: 'Bilans financiers' },
  statuts: { en: 'Company statutes', fr: 'Statuts' },
  rib: { en: 'Bank details (RIB)', fr: 'RIB' },
  other: { en: 'Other', fr: 'Autre' },
} satisfies Record<string, Label>;

export interface StageTemplate {
  key: string;
  label: Label;
  /** project date column that drives this stage's due date */
  dateField?: 'submission_deadline' | 'opening_date' | 'publication_date';
  /** status the project moves to when this stage is completed */
  setsStatus?: ProjectStatus;
  optional?: boolean;
}

const S = {
  publication: { key: 'publication', label: { en: 'Notice published', fr: 'Avis publié (BOMOP / presse / site)' }, dateField: 'publication_date' },
  cdc_withdrawal: { key: 'cdc_withdrawal', label: { en: 'Specifications withdrawn (retrait du CDC)', fr: 'Retrait du cahier des charges' }, setsStatus: 'preparing' },
  study: { key: 'study', label: { en: 'Study needs & find products/suppliers', fr: 'Étude des besoins & sourcing' } },
  bid_bond: { key: 'bid_bond', label: { en: 'Bid bond (caution de soumission)', fr: 'Caution de soumission' }, optional: true },
  admin_docs: { key: 'admin_docs', label: { en: 'Application file (administrative documents)', fr: 'Dossier de candidature (pièces administratives)' } },
  technical: { key: 'technical', label: { en: 'Technical offer & catalog', fr: 'Offre technique & catalogue' } },
  financial: { key: 'financial', label: { en: 'Financial offer (BPU / DQE)', fr: 'Offre financière (BPU / DQE)' } },
  submission: { key: 'submission', label: { en: 'Submit the offer (dépôt)', fr: 'Dépôt des offres' }, dateField: 'submission_deadline', setsStatus: 'submitted' },
  opening: { key: 'opening', label: { en: 'Envelope opening (public session)', fr: 'Ouverture des plis (séance publique)' }, dateField: 'opening_date', setsStatus: 'opened' },
  provisional_award: { key: 'provisional_award', label: { en: 'Provisional award published', fr: 'Attribution provisoire' } },
  appeal: { key: 'appeal', label: { en: 'Appeal period (recours)', fr: 'Délai de recours' }, optional: true },
  contract: { key: 'contract', label: { en: 'Contract notified / signed', fr: 'Notification / signature du marché' } },
  performance_bond: { key: 'performance_bond', label: { en: 'Performance bond (bonne exécution)', fr: 'Caution de bonne exécution' }, optional: true },
  ods: { key: 'ods', label: { en: 'Service order received (ODS)', fr: 'Ordre de service reçu (ODS)' }, setsStatus: 'in_progress' },
  delivery: { key: 'delivery', label: { en: 'Delivery / execution', fr: 'Livraison / exécution' }, setsStatus: 'delivered' },
  reception: { key: 'reception', label: { en: 'Reception minutes (PV de réception)', fr: 'PV de réception' } },
  invoicing: { key: 'invoicing', label: { en: 'Invoice issued', fr: 'Facturation' }, setsStatus: 'invoiced' },
  payment: { key: 'payment', label: { en: 'Payment fully received', fr: 'Paiement reçu' }, setsStatus: 'paid' },
  retention_release: { key: 'retention_release', label: { en: 'Final reception & guarantee release', fr: 'Réception définitive & restitution des retenues' }, optional: true },
  // purchase-order specific
  request: { key: 'request', label: { en: 'Request received', fr: 'Demande reçue' }, setsStatus: 'preparing' },
  proforma: { key: 'proforma', label: { en: 'Quote / proforma sent', fr: 'Devis / facture proforma envoyée' }, setsStatus: 'submitted' },
  order: { key: 'order', label: { en: 'Purchase order received', fr: 'Bon de commande reçu' }, setsStatus: 'in_progress' },
} satisfies Record<string, StageTemplate>;

export const STAGE_TEMPLATES: Record<ProjectType, StageTemplate[]> = {
  cdc: [S.publication, S.cdc_withdrawal, S.study, S.bid_bond, S.admin_docs, S.technical, S.financial, S.submission, S.opening, S.provisional_award, S.appeal, S.contract, S.ods, S.delivery, S.reception, S.invoicing, S.payment],
  consultation: [
    { ...S.publication, label: { en: 'Consultation received / published', fr: 'Lettre de consultation reçue / publiée' } },
    S.cdc_withdrawal, S.study, S.admin_docs, S.technical, S.financial, S.submission, S.opening,
    { ...S.provisional_award, label: { en: 'Result announced', fr: 'Résultat de la consultation' } },
    { ...S.contract, label: { en: 'Purchase order / agreement received', fr: 'Bon de commande / convention reçu' } },
    S.delivery, S.reception, S.invoicing, S.payment,
  ],
  bc: [S.request, S.study, S.proforma, S.order, S.delivery, S.reception, S.invoicing, S.payment],
  marche: [S.publication, S.cdc_withdrawal, S.study, S.bid_bond, S.admin_docs, S.technical, S.financial, S.submission, S.opening, S.provisional_award, S.appeal, S.contract, S.performance_bond, S.ods, S.delivery, S.reception, S.invoicing, S.payment, S.retention_release],
};

export function stageLabel(key: string | null | undefined, fallback: string, lang: Lang): string {
  if (key) {
    for (const list of Object.values(STAGE_TEMPLATES)) {
      const t = list.find((s) => s.key === key);
      if (t) return t.label[lang];
    }
  }
  return fallback;
}
