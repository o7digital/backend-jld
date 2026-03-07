import type { LanguageCode } from './types';

type JldCopy = {
  dataModeMock: string;
  dataModeSupabase: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  quickLinksTitle: string;
  clientsTitle: string;
  clientsSubtitle: string;
  giftCardsTitle: string;
  giftCardsSubtitle: string;
  paymentsTitle: string;
  paymentsSubtitle: string;
  productsTitle: string;
  productsSubtitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  addCustomer: string;
  editCustomer: string;
  addProduct: string;
  editProduct: string;
  firstName: string;
  lastName: string;
  newsletterOptIn: string;
  status: string;
  source: string;
  amountMxn: string;
  remainingBalance: string;
  productType: string;
  active: string;
  inactive: string;
  recipient: string;
  customerEmail: string;
  provider: string;
  paidAt: string;
  code: string;
  message: string;
  noData: string;
  quickAccess: string;
  manage: string;
  recentCustomers: string;
  recentGiftCards: string;
  recentPayments: string;
  newsletterSources: string;
  saveChanges: string;
  create: string;
  searchPlaceholder: string;
  allStatuses: string;
  allTypes: string;
  deleteConfirmCustomer: string;
  deleteConfirmProduct: string;
};

export const JLD_COPY: Record<LanguageCode, JldCopy> = {
  en: {
    dataModeMock: 'Mock fallback',
    dataModeSupabase: 'Supabase live',
    dashboardTitle: 'Jean Louis David Admin',
    dashboardSubtitle: 'Dedicated overview for customers, gift cards, payments, catalog and newsletter.',
    quickLinksTitle: 'Priority modules',
    clientsTitle: 'Customers',
    clientsSubtitle: 'Clean JLD customer base, ready for Supabase and future gifting flows.',
    giftCardsTitle: 'Gift Cards',
    giftCardsSubtitle: 'Gift card inventory, status tracking and remaining balance overview.',
    paymentsTitle: 'Payments',
    paymentsSubtitle: 'Prepared for future Stripe integration, with a manual/mock fallback for now.',
    productsTitle: 'Products',
    productsSubtitle: 'Gift cards, services and retail products in one JLD-ready catalog.',
    newsletterTitle: 'Newsletter',
    newsletterSubtitle: 'Subscribers and acquisition sources, ready for future automations.',
    addCustomer: 'Add customer',
    editCustomer: 'Edit customer',
    addProduct: 'Add product',
    editProduct: 'Edit product',
    firstName: 'First name',
    lastName: 'Last name',
    newsletterOptIn: 'Newsletter opt-in',
    status: 'Status',
    source: 'Source',
    amountMxn: 'Amount (MXN)',
    remainingBalance: 'Remaining balance',
    productType: 'Product type',
    active: 'Active',
    inactive: 'Inactive',
    recipient: 'Recipient',
    customerEmail: 'Customer email',
    provider: 'Provider',
    paidAt: 'Paid at',
    code: 'Code',
    message: 'Message',
    noData: 'No records yet.',
    quickAccess: 'Quick access',
    manage: 'Open module',
    recentCustomers: 'Recent customers',
    recentGiftCards: 'Recent gift cards',
    recentPayments: 'Recent payments',
    newsletterSources: 'Newsletter sources',
    saveChanges: 'Save changes',
    create: 'Create',
    searchPlaceholder: 'Search by name, email or code',
    allStatuses: 'All statuses',
    allTypes: 'All types',
    deleteConfirmCustomer: 'Delete this customer?',
    deleteConfirmProduct: 'Delete this product?',
  },
  fr: {
    dataModeMock: 'Mode mock',
    dataModeSupabase: 'Supabase connecte',
    dashboardTitle: 'Jean Louis David Admin',
    dashboardSubtitle: 'Vue d’ensemble dediee aux clients, gift cards, paiements, catalogue et newsletter.',
    quickLinksTitle: 'Modules prioritaires',
    clientsTitle: 'Clients',
    clientsSubtitle: 'Base clients JLD propre, prete pour Supabase et les futurs parcours gift card.',
    giftCardsTitle: 'Gift Cards',
    giftCardsSubtitle: 'Suivi du stock, des statuts et du solde restant des cartes cadeaux.',
    paymentsTitle: 'Paiements',
    paymentsSubtitle: "Structure prete pour Stripe plus tard, avec fallback manuel/mock aujourd'hui.",
    productsTitle: 'Produits',
    productsSubtitle: 'Gift cards, services et retail dans un catalogue unifie.',
    newsletterTitle: 'Newsletter',
    newsletterSubtitle: "Abonnes et sources d'acquisition, prets pour les automations futures.",
    addCustomer: 'Ajouter client',
    editCustomer: 'Modifier client',
    addProduct: 'Ajouter produit',
    editProduct: 'Modifier produit',
    firstName: 'Prenom',
    lastName: 'Nom',
    newsletterOptIn: 'Consentement newsletter',
    status: 'Statut',
    source: 'Source',
    amountMxn: 'Montant (MXN)',
    remainingBalance: 'Solde restant',
    productType: 'Type de produit',
    active: 'Actif',
    inactive: 'Inactif',
    recipient: 'Destinataire',
    customerEmail: 'Email client',
    provider: 'Provider',
    paidAt: 'Paye le',
    code: 'Code',
    message: 'Message',
    noData: 'Aucun enregistrement pour le moment.',
    quickAccess: 'Acces rapide',
    manage: 'Ouvrir module',
    recentCustomers: 'Clients recents',
    recentGiftCards: 'Gift cards recentes',
    recentPayments: 'Paiements recents',
    newsletterSources: 'Sources newsletter',
    saveChanges: 'Enregistrer',
    create: 'Creer',
    searchPlaceholder: 'Rechercher par nom, email ou code',
    allStatuses: 'Tous les statuts',
    allTypes: 'Tous les types',
    deleteConfirmCustomer: 'Supprimer ce client ?',
    deleteConfirmProduct: 'Supprimer ce produit ?',
  },
  es: {
    dataModeMock: 'Modo mock',
    dataModeSupabase: 'Supabase conectado',
    dashboardTitle: 'Jean Louis David Admin',
    dashboardSubtitle: 'Vista dedicada para clientes, gift cards, pagos, catalogo y newsletter.',
    quickLinksTitle: 'Modulos prioritarios',
    clientsTitle: 'Clientes',
    clientsSubtitle: 'Base JLD limpia, lista para Supabase y futuros flujos de gifting.',
    giftCardsTitle: 'Gift Cards',
    giftCardsSubtitle: 'Inventario de tarjetas, estados y saldo restante listo para operar.',
    paymentsTitle: 'Pagos',
    paymentsSubtitle: 'Preparado para Stripe mas adelante, con fallback manual/mock por ahora.',
    productsTitle: 'Productos',
    productsSubtitle: 'Gift cards, servicios y retail en un catalogo unificado para JLD.',
    newsletterTitle: 'Newsletter',
    newsletterSubtitle: 'Suscriptores y fuentes de captacion listos para futuras automatizaciones.',
    addCustomer: 'Agregar cliente',
    editCustomer: 'Editar cliente',
    addProduct: 'Agregar producto',
    editProduct: 'Editar producto',
    firstName: 'Nombre',
    lastName: 'Apellido',
    newsletterOptIn: 'Consentimiento newsletter',
    status: 'Estado',
    source: 'Origen',
    amountMxn: 'Monto (MXN)',
    remainingBalance: 'Saldo restante',
    productType: 'Tipo de producto',
    active: 'Activo',
    inactive: 'Inactivo',
    recipient: 'Destinatario',
    customerEmail: 'Email del cliente',
    provider: 'Proveedor',
    paidAt: 'Pagado el',
    code: 'Codigo',
    message: 'Mensaje',
    noData: 'Sin registros por ahora.',
    quickAccess: 'Acceso rapido',
    manage: 'Abrir modulo',
    recentCustomers: 'Clientes recientes',
    recentGiftCards: 'Gift cards recientes',
    recentPayments: 'Pagos recientes',
    newsletterSources: 'Fuentes newsletter',
    saveChanges: 'Guardar cambios',
    create: 'Crear',
    searchPlaceholder: 'Buscar por nombre, email o codigo',
    allStatuses: 'Todos los estados',
    allTypes: 'Todos los tipos',
    deleteConfirmCustomer: 'Eliminar este cliente?',
    deleteConfirmProduct: 'Eliminar este producto?',
  },
};

export function getJldCopy(language: LanguageCode) {
  return JLD_COPY[language];
}
