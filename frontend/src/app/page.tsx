'use client';

import { useMemo, useState } from 'react';

type TableColumn<T> = {
  key: keyof T;
  label: string;
  tone?: 'danger' | 'strong';
};

type ModuleSection = {
  title: string;
  description: string;
  items: string[];
  accent: string;
};

type CentralModule = {
  title: string;
  subtitle: string;
  metric: string;
  status: 'ready' | 'review' | 'locked';
};

type Language = 'es' | 'en';

const copy = {
  es: {
    admin: 'Admin',
    activeAlerts: 'alertas activas',
    activeModule: 'Módulo',
    alertAge: 'Antig.',
    alertLevel: 'Riesgo',
    alertMain: 'Alerta principal del día',
    alertMainBody: 'IA recomienda transferir inventario entre Polanco y Santa Fe y generar orden de compra antes de 18:00.',
    alertMainTitle: 'Riesgo de ruptura Brazilian Acai Ionic Bonding Spray en Santa Fe.',
    analytics: 'Análisis de ventas',
    amount: 'Importe',
    appliedIntelligence: 'inteligencia aplicada',
    branch: 'Sucursal',
    branchComparison: 'Resumen comparativo sucursales',
    charged: 'Cobrado',
    client: 'Cliente',
    closeNavigation: 'Cerrar navegación',
    collaboratorTop: 'Top colaboradores',
    collaborators: 'colaboradores',
    comparisonAction: 'MTD vs mes anterior',
    connectedAi: 'IA conectada a operación real',
    creditDebt: 'Adeudo',
    creditRisk: 'Riesgo crédito',
    creditSales: 'Ventas a crédito',
    creditsGranted: 'Créditos otorgados',
    current: 'Actual',
    dailySales: 'Venta diaria',
    dashboardTitle: 'Pilotage JLD para dirección, ventas, operación e inteligencia aplicada',
    dashboardSubtitle: 'Vista mock preparada para datos reales: sucursales, KPIs, productividad, crédito, descuentos, inventario y recomendaciones Hugging Face.',
    dataReady: 'Mock · listo para API',
    decisionReading: 'Lectura ejecutiva',
    demandPrediction: 'Predicción demanda servicios',
    demandRecommendation: 'Refuerza color y peinado en Polanco/Santa Fe jueves a sábado.',
    discountDetail: 'Detalle del periodo',
    discountsGranted: 'Descuentos otorgados',
    distributionPeriod: 'Distribución del periodo',
    executiveSummary: 'Resumen ejecutivo para dirección',
    executiveView: 'Executive View',
    exportableFunnel: 'Funnel + tabla exportable',
    filterBranch: 'Sucursal',
    filterPeriod: 'Periodo',
    filterView: 'Vista',
    financialAndPayment: 'Resumen financiero y mix de pago',
    folio: 'Folio',
    functionalMap: 'Mapa funcional',
    hiddenExecutive: 'Ocultar Executive View',
    indicator: 'Indicador',
    integrationReady: 'Contratos UI estables',
    inventoryAndInternalUse: 'Inventario y consumo interno',
    lastSync: 'Última sincronización · 09:42',
    mainEyebrow: 'Backend propietario premium',
    metric: 'Métrica mock',
    moduleCoverage: 'Cobertura de módulos reales detectados',
    monthlySales: 'Ventas del mes',
    mtdSales: 'Venta MTD',
    navigation: 'Navegación',
    noReturn: 'Riesgo no-retorno cliente',
    noReturnRecommendation: 'Activar campaña VIP para 148 clientes con caída de frecuencia.',
    operation: 'Operación',
    operationsAlerts: 'Alertas operacionales',
    original: 'Original',
    ownerSystemText: 'Arquitectura preparada para API, base de datos y capa Hugging Face.',
    paymentMethods: 'medios',
    pendingCredit: 'Crédito pendiente',
    periodAverage: 'promedio periodo',
    previous: 'Anterior',
    priorityDecisions: 'Decisiones prioritarias',
    productRestock: 'Reabasto',
    productRestockNote: '34 unidades críticas esta semana.',
    productivityIndividual: 'Productividad individual',
    readyMock: 'Listo mock',
    realModuleViews: 'Sub-vistas premium listas para integración',
    revenueTotal: 'Ingresos totales',
    risk: 'Riesgo',
    riskHigh: 'Alto',
    riskMedium: 'Medio',
    salonDirection: 'Dirección',
    stockBreak: 'Ruptura stock inminente',
    stockBreakRecommendation: 'Comprar 34 unidades críticas antes del cierre semanal.',
    stockCurrent: 'Stock actual',
    stockMin: 'Mínimo esperado',
    ticketAverage: 'Promedio ticket',
    ticketsIssued: 'Tickets emitidos',
    topServices: 'Top 10 tipos de servicio',
    viewsPrepared: 'Vistas preparadas',
    adminOperations: 'Administrativo operativo',
    centralSystem: 'Sistema Central',
    centralSystemSubtitle: 'Accesos agrupados como el sistema actual, con lectura ejecutiva y control operativo en la misma pantalla.',
    catalogControl: 'Control de catálogos',
    collaboratorSecurity: 'Seguridad colaboradores',
    reportForms: 'Reportes y consultas',
    cashDesk: 'Caja chica y efectivo',
    serviceCatalog: 'Catálogo de servicios',
    permissionMatrix: 'Matriz de permisos',
    pendingSetup: 'Pendiente setup',
    refreshed: 'Actualizado',
    actionReady: 'Acción ejecutada',
    moduleOpened: 'Módulo abierto',
  },
  en: {
    admin: 'Admin',
    activeAlerts: 'active alerts',
    activeModule: 'Module',
    alertAge: 'Age',
    alertLevel: 'Risk',
    alertMain: "Today's main alert",
    alertMainBody: 'AI recommends transferring stock between Polanco and Santa Fe and creating a purchase order before 18:00.',
    alertMainTitle: 'Stockout risk for Brazilian Acai Ionic Bonding Spray in Santa Fe.',
    analytics: 'Sales analysis',
    amount: 'Amount',
    appliedIntelligence: 'applied intelligence',
    branch: 'Branch',
    branchComparison: 'Branch comparison summary',
    charged: 'Charged',
    client: 'Client',
    closeNavigation: 'Close navigation',
    collaboratorTop: 'Top collaborators',
    collaborators: 'collaborators',
    comparisonAction: 'MTD vs previous month',
    connectedAi: 'AI connected to real operations',
    creditDebt: 'Outstanding',
    creditRisk: 'Credit risk',
    creditSales: 'Credit sales',
    creditsGranted: 'Granted credits',
    current: 'Current',
    dailySales: 'Daily sales',
    dashboardTitle: 'JLD command center for leadership, sales, operations and applied intelligence',
    dashboardSubtitle: 'Mock view prepared for real data: branches, KPIs, productivity, credit, discounts, inventory and Hugging Face recommendations.',
    dataReady: 'Mock · API-ready',
    decisionReading: 'Executive readout',
    demandPrediction: 'Service demand prediction',
    demandRecommendation: 'Reinforce color and styling capacity in Polanco/Santa Fe Thursday through Saturday.',
    discountDetail: 'Period detail',
    discountsGranted: 'Granted discounts',
    distributionPeriod: 'Period distribution',
    executiveSummary: 'Executive summary for leadership',
    executiveView: 'Executive View',
    exportableFunnel: 'Funnel + exportable table',
    filterBranch: 'Branch',
    filterPeriod: 'Period',
    filterView: 'View',
    financialAndPayment: 'Financial summary and payment mix',
    folio: 'Folio',
    functionalMap: 'Functional map',
    hiddenExecutive: 'Hide Executive View',
    indicator: 'Indicator',
    integrationReady: 'Stable UI contracts',
    inventoryAndInternalUse: 'Inventory and internal use',
    lastSync: 'Last sync · 09:42',
    mainEyebrow: 'Premium proprietary backend',
    metric: 'Mock metric',
    moduleCoverage: 'Real detected module coverage',
    monthlySales: 'Monthly sales',
    mtdSales: 'MTD sales',
    navigation: 'Navigation',
    noReturn: 'Client no-return risk',
    noReturnRecommendation: 'Launch a VIP campaign for 148 clients with declining visit frequency.',
    operation: 'Operations',
    operationsAlerts: 'Operational alerts',
    original: 'Original',
    ownerSystemText: 'Architecture prepared for API, database and Hugging Face layer.',
    paymentMethods: 'methods',
    pendingCredit: 'Pending credit',
    periodAverage: 'period average',
    previous: 'Previous',
    priorityDecisions: 'Priority decisions',
    productRestock: 'Restock',
    productRestockNote: '34 critical units this week.',
    productivityIndividual: 'Individual productivity',
    readyMock: 'Mock ready',
    realModuleViews: 'Premium sub-views ready for integration',
    revenueTotal: 'Total revenue',
    risk: 'Risk',
    riskHigh: 'High',
    riskMedium: 'Medium',
    salonDirection: 'Leadership',
    stockBreak: 'Imminent stockout',
    stockBreakRecommendation: 'Buy 34 critical units before weekly close.',
    stockCurrent: 'Current stock',
    stockMin: 'Expected minimum',
    ticketAverage: 'Average ticket',
    ticketsIssued: 'Issued tickets',
    topServices: 'Top 10 service types',
    viewsPrepared: 'Prepared views',
    adminOperations: 'Operational administration',
    centralSystem: 'Central System',
    centralSystemSubtitle: 'Access grouped like the current system, with executive readout and operational control in one screen.',
    catalogControl: 'Catalog control',
    collaboratorSecurity: 'Collaborator security',
    reportForms: 'Reports and queries',
    cashDesk: 'Petty cash and cash',
    serviceCatalog: 'Service catalog',
    permissionMatrix: 'Permission matrix',
    pendingSetup: 'Setup pending',
    refreshed: 'Updated',
    actionReady: 'Action completed',
    moduleOpened: 'Module opened',
  },
} satisfies Record<Language, Record<string, string>>;

const branchOptions = {
  es: ['Todas las sucursales', 'Polanco', 'Santa Fe'],
  en: ['All branches', 'Polanco', 'Santa Fe'],
} satisfies Record<Language, string[]>;

const periodOptions = {
  es: ['Abril 2026 MTD', 'Marzo 2026', 'Q1 2026', 'Últimos 90 días'],
  en: ['April 2026 MTD', 'March 2026', 'Q1 2026', 'Last 90 days'],
} satisfies Record<Language, string[]>;

const viewModeOptions = {
  es: ['Dirección', 'Operación', 'Admin'],
  en: ['Leadership', 'Operations', 'Admin'],
} satisfies Record<Language, string[]>;

const navigationItems = [
  { es: 'Dashboard', en: 'Dashboard' },
  { es: 'Análisis de ventas', en: 'Sales analysis' },
  { es: 'Productividad', en: 'Productivity' },
  { es: 'Producto', en: 'Product' },
  { es: 'Catálogos', en: 'Catalogs' },
  { es: 'Clientes', en: 'Clients' },
  { es: 'IA / Hugging Face', en: 'AI / Hugging Face' },
  { es: 'Configuración', en: 'Settings' },
];

const navigationTargets: Record<string, string> = {
  Dashboard: 'dashboard',
  'Análisis de ventas': 'ventas',
  Productividad: 'productividad',
  Producto: 'producto',
  Catálogos: 'catalogos',
  Clientes: 'clientes',
  'IA / Hugging Face': 'ia',
  Configuración: 'configuracion',
  Administrativo: 'admin',
};

const salesModules = [
  'Resumen financiero',
  'Concentrado ventas',
  'Resumen concentrado forma de pago',
  'Concentrado forma de pago',
  'Reporte de ingresos',
  'Histórico de ventas',
  'Ventas a crédito',
  'Descuentos otorgados',
];

const productivityModules = [
  'Productividad Sucursal',
  'Productividad Acumulada',
  'Productividad Individual Detallada',
  'Productividad Individual Concentrada',
  'Productividad Individual Acumulada',
  'Productividad Tiempos de Atención',
  'Estadísticas servicios',
  'Estadísticas producto',
];

const productModules = [
  'Inventario sucursal',
  'Ajustar inventario',
  'Detalle ajuste inventario',
  'Inventario histórico',
  'Historial de producto individual',
  'Historial de compras',
  'Detalle de consumo interno',
  'Concentrado consumo interno',
  'Detalle transferencias producto',
  'Pedidos',
];

const catalogModules = [
  'Cat. Sucursal',
  'Clasif. servicios',
  'Cat. servicios',
  'Cat. colaborador',
  'Cat. proveedores',
  'Cat. productos',
  'Cat. gastos',
  'Cat. paquetes',
  'Cat. usuarios central',
  'Copiar catálogos',
];

const administrativeModules = [
  'Ajustar movimientos sucursal',
  'Reimpresión',
  'Gastos mayores y de caja chica',
  'Cálculo de comisiones',
  'Registros de asistencia',
  'Ventas producto a colaboradores',
  'Préstamo a colaboradores',
  'Propinas a colaboradores',
  'Reporte retiros efectivo',
];

const branchAdjustmentModules = [
  'Ajustar saldo inicial caja chica',
  'Abrir corte de caja',
  'Ajustar retiro de efectivo',
  'Modificar notas',
  'Cancelar notas',
  'Ajustar gastos caja chica',
  'Ajustar préstamos',
];

const centralModules: CentralModule[] = [
  { title: 'Catálogos', subtitle: 'Sucursales, servicios, colaboradores, proveedores y paquetes.', metric: '10 accesos', status: 'ready' },
  { title: 'Dashboard', subtitle: 'Venta MTD, mix de pago, productividad, crédito e inventario.', metric: '$1.84M MTD', status: 'ready' },
  { title: 'Administrativo', subtitle: 'Caja, comisiones, asistencia, préstamos, propinas y reimpresión.', metric: '9 accesos', status: 'ready' },
  { title: 'Análisis de Ventas', subtitle: 'Resumen financiero, ingresos, descuentos, crédito y forma de pago.', metric: '8 reportes', status: 'ready' },
  { title: 'Productividad', subtitle: 'Sucursal, acumulados, tiempos y desempeño individual.', metric: '8 reportes', status: 'ready' },
  { title: 'Producto', subtitle: 'Inventario, compras, consumo interno, transferencias y pedidos.', metric: '10 accesos', status: 'ready' },
  { title: 'Clientes', subtitle: 'Historial, adeudos, retorno, frecuencia y campañas VIP.', metric: '2,486 activos', status: 'review' },
  { title: 'Bitácora', subtitle: 'Cambios de caja, inventario, permisos y movimientos críticos.', metric: '312 eventos', status: 'review' },
  { title: 'Parámetros', subtitle: 'Configuración de sucursal, seguridad, precios y reglas operativas.', metric: '18 reglas', status: 'ready' },
];

const serviceCatalogRows = [
  { key: 'BRAZILIAN 1', division: 'ALACIADO', name: 'BRAZILIAN RECARGA CORTO', price1: '$1,000.00', price2: '$0.00', cost: '$0.00' },
  { key: 'BRAZILIAN 2', division: 'ALACIADO', name: 'BRAZILIAN RECARGA MEDIA ESPALDA', price1: '$1,500.00', price2: '$0.00', cost: '$0.00' },
  { key: 'BRAZILIAN 3', division: 'ALACIADO', name: 'BRAZILIAN RECARGA LARGO', price1: '$2,000.00', price2: '$0.00', cost: '$0.00' },
  { key: 'BRAZILIAN 4', division: 'ALACIADO', name: 'BRAZILIAN SERVICIO CORTO', price1: '$2,500.00', price2: '$0.00', cost: '$0.00' },
  { key: 'BRAZILIAN 5', division: 'ALACIADO', name: 'BRAZILIAN CORTO AL HOMBRO', price1: '$3,000.00', price2: '$0.00', cost: '$0.00' },
];

const permissionRows = [
  { collaborator: 'Abril Zarco', branch: 'Polanco', caja: 'Activo', notas: 'Activo', inventario: 'Activo', seguridad: 'Limitado' },
  { collaborator: 'Ana Maria Alvarado', branch: 'Polanco', caja: 'Activo', notas: 'Activo', inventario: 'Activo', seguridad: 'Activo' },
  { collaborator: 'Juan Resendiz', branch: 'Polanco', caja: 'Activo', notas: 'Limitado', inventario: 'Activo', seguridad: 'Limitado' },
  { collaborator: 'Hilda Cruz', branch: 'Polanco', caja: 'Activo', notas: 'Activo', inventario: 'Activo', seguridad: 'Activo' },
];

const reportWorkflows = [
  { title: 'Propinas a colaboradores', branch: 'Sucursal + periodo', output: 'Colaborador, propina, ticket, corte', state: 'Listo mock' },
  { title: 'Venta al colaborador', branch: 'Sucursal + periodo + colaborador', output: 'Productos vendidos, precio, descuento', state: 'Listo mock' },
  { title: 'Préstamo a colaboradores', branch: 'Sucursal + colaborador', output: 'Saldo, abonos, vencimiento', state: 'Listo mock' },
  { title: 'Reporte retiros efectivo', branch: 'Sucursal + corte', output: 'Retiro, usuario, autorización', state: 'Pendiente setup' },
];

type WorkflowSelection = {
  title: string;
  category: string;
  filters: string;
  output: string;
  state: string;
  sensitive?: boolean;
};

const dashboardMetrics = [
  { label: 'Ventas del mes', value: '$1,223,400', note: 'Polanco + Santa Fe', delta: '+5.8%', tone: 'good' },
  { label: 'Ticket promedio', value: '$1,680', note: '728 tickets emitidos', delta: '+4.1%', tone: 'good' },
  { label: 'Clientes activos', value: '728', note: 'tickets del periodo', delta: '+8.2%', tone: 'good' },
  { label: 'Consumo interno', value: '$86,420', note: 'controlado por sucursal', delta: '-3.2%', tone: 'good' },
  { label: 'Remises del mes', value: '$151,302', note: '12.4% sobre venta', delta: '+1.7%', tone: 'warn' },
  { label: 'Ventas a crédito', value: '$58,930', note: 'saldo pendiente', delta: '+4.8%', tone: 'risk' },
  { label: 'Ocupación', value: '85%', note: 'promedio ponderado', delta: '+5 pts', tone: 'good' },
  { label: 'Rotación producto', value: '3.8x', note: 'sell-through mensual', delta: '+0.4x', tone: 'neutral' },
];

const metricTranslations: Record<string, { label: string; note: string }> = {
  'Ventas del mes': { label: 'Monthly sales', note: 'MTD vs previous month' },
  'Ticket promedio': { label: 'Average ticket', note: 'average per ticket' },
  'Clientes activos': { label: 'Active clients', note: 'last 90 days' },
  'Consumo interno': { label: 'Internal use', note: 'controlled by branch' },
  'Remises del mes': { label: 'Monthly discounts', note: '12.4% of sales' },
  'Ventas a crédito': { label: 'Credit sales', note: 'pending balance' },
  'Ocupación': { label: 'Occupancy', note: 'consolidated agenda' },
  'Rotación producto': { label: 'Product rotation', note: 'monthly sell-through' },
};

const branchSummary = [
  { name: 'Polanco', sales: '$642,000', salesValue: 642000, tickets: '386', avg: '$1,663', occupancy: '87%', mtd: '+7.4%' },
  { name: 'Santa Fe', sales: '$581,400', salesValue: 581400, tickets: '342', avg: '$1,700', occupancy: '82%', mtd: '+3.8%' },
];

const inventoryAlerts = [
  { product: 'Original Smoothing Solution 1L', branch: 'Santa Fe', stock: 1, min: 2, status: 'Reposición urgente', severity: 'Alta' },
  { product: 'Daily Smoothing Serum 240ml', branch: 'Santa Fe', stock: 2, min: 1, status: 'Monitorear', severity: 'Baja' },
  { product: 'Acai Ionic Bonding Spray 100ml', branch: 'Santa Fe', stock: 0, min: 2, status: 'Riesgo de ruptura', severity: 'Alta' },
  { product: 'Acai Ionic Bonding Spray 350ml', branch: 'Santa Fe', stock: 3, min: 2, status: 'Compra sugerida', severity: 'Media' },
];

const creditsData = [
  { folio: '3642', client: 'Romelia Gutierrez JLD', amount: '$2,863.00', due: '$2,863.00', age: '14 días' },
  { folio: '3599', client: 'Nouria Medjdoub', amount: '$600.00', due: '$600.00', age: '9 días' },
  { folio: '3550', client: 'Jorge Martínez JLD', amount: '$1,173.20', due: '$1,173.20', age: '22 días' },
  { folio: '3517', client: 'Mónica Cadena', amount: '$4,240.00', due: '$1,900.00', age: '31 días' },
];

const discountsData = [
  { date: '16-04-2026', client: 'Romelia Gutierrez JLD', service: 'Le Parfum Gloss Absolu 30ml', original: '$1,290.00', charged: '$903.00', type: '30% descuento' },
  { date: '12-04-2026', client: 'Nouria Medjdoub', service: 'Tratamiento Premier', original: '$1,500.00', charged: '$600.00', type: '60% descuento' },
  { date: '18-04-2026', client: 'Violeta Barburrea', service: 'Alto peinado sin densidad', original: '$800.00', charged: '$330.00', type: 'Precio modificado' },
];

const paymentMixData = [
  { label: 'Tarjeta', value: 44, amount: '$809,600' },
  { label: 'Efectivo', value: 26, amount: '$478,400' },
  { label: 'Transferencia', value: 18, amount: '$331,200' },
  { label: 'Crédito', value: 12, amount: '$220,800' },
];

const topServicesData = [
  { label: 'Peinado', value: 34.97 },
  { label: 'Corte', value: 15.69 },
  { label: 'Color', value: 13.42 },
  { label: 'Maquillaje', value: 11.89 },
  { label: 'Tratamiento capilar', value: 7.63 },
  { label: 'Manicure', value: 4.65 },
  { label: 'Pedicure', value: 3.92 },
  { label: 'Depilación', value: 3.04 },
  { label: 'Balayage', value: 2.52 },
  { label: 'Barbería', value: 2.27 },
];

const collaboratorRankingData = [
  { name: 'Jorge Martínez', branch: 'Polanco', services: 132, sales: '$96,420', bonus: '$11,800', efficiency: '94%' },
  { name: 'Hilda Cruz', branch: 'Santa Fe', services: 118, sales: '$84,160', bonus: '$10,200', efficiency: '91%' },
  { name: 'Ana Romelia Gutiérrez', branch: 'Polanco', services: 111, sales: '$79,540', bonus: '$9,480', efficiency: '89%' },
  { name: 'Abril Zarco', branch: 'Polanco', services: 98, sales: '$69,330', bonus: '$8,150', efficiency: '86%' },
  { name: 'Ana Maria Alvarado', branch: 'Polanco', services: 91, sales: '$61,200', bonus: '$7,450', efficiency: '84%' },
];

const moduleSectionsData: ModuleSection[] = [
  { title: 'Análisis de ventas', description: 'Ingresos, pagos, descuentos, crédito y lectura financiera.', items: salesModules, accent: 'from-amber-500/20 to-transparent' },
  { title: 'Productividad', description: 'Sucursal, equipo, tiempos de atención y desempeño individual.', items: productivityModules, accent: 'from-blue-500/20 to-transparent' },
  { title: 'Producto', description: 'Inventario, compras, ajustes, consumo interno e historial.', items: productModules, accent: 'from-emerald-500/20 to-transparent' },
  { title: 'Catálogos', description: 'Estructura maestra de operación para sucursales y servicios.', items: catalogModules, accent: 'from-slate-500/20 to-transparent' },
  { title: 'Administrativo', description: 'Caja, cortes, comisiones, ventas a colaboradores, préstamos y propinas.', items: administrativeModules, accent: 'from-rose-500/20 to-transparent' },
  { title: 'Ajustes sucursal', description: 'Operaciones sensibles de caja chica, notas, retiros y préstamos.', items: branchAdjustmentModules, accent: 'from-cyan-500/20 to-transparent' },
];

const monthlyComparison = [
  { label: 'Ventas MTD', current: '$1,223,400', previous: '$1,156,000', delta: '+5.8%' },
  { label: 'Tickets', current: '728', previous: '673', delta: '+8.2%' },
  { label: 'Ticket promedio', current: '$1,680', previous: '$1,718', delta: '-2.2%' },
  { label: 'Crédito pendiente', current: '$58,930', previous: '$56,250', delta: '+4.8%' },
];

const modulePreviewData = [
  { module: 'Resumen financiero', owner: 'Dirección', status: 'Listo mock', metric: '$305,836' },
  { module: 'Concentrado forma de pago', owner: 'Caja', status: 'Listo mock', metric: '4 medios' },
  { module: 'Productividad Individual Detallada', owner: 'Operación', status: 'Listo mock', metric: '52 colaboradores' },
  { module: 'Inventario sucursal', owner: 'Producto', status: 'Listo mock', metric: '218 SKUs' },
  { module: 'Cat. servicios', owner: 'Admin', status: 'Listo mock', metric: '94 servicios' },
  { module: 'Propinas a colaboradores', owner: 'Admin', status: 'Listo mock', metric: '52 colaboradores' },
  { module: 'Seguridad colaboradores', owner: 'Admin', status: 'Listo mock', metric: '17 permisos' },
];

function Header({
  activeModule,
  language,
  viewMode,
  isLoggedIn,
  onToggleSidebar,
  onViewModeChange,
  onToggleLogin,
}: {
  activeModule: string;
  language: Language;
  viewMode: string;
  isLoggedIn: boolean;
  onToggleSidebar: () => void;
  onViewModeChange: (value: string) => void;
  onToggleLogin: () => void;
}) {
  const t = copy[language];
  const activeModuleLabel = navigationItems.find((item) => item.es === activeModule)?.[language] ?? activeModule;
  const viewOptions = viewModeOptions[language];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black text-white shadow-2xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg lg:hidden"
            aria-label={t.navigation}
          >
            ≡
          </button>
          <LogoMark />
          <div>
            <div className="text-lg font-semibold tracking-tight">Jean Louis David</div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-amber-200/80">Sistema Central JLD · Backend propriétaire</div>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          {viewOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onViewModeChange(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                viewMode === item
                  ? 'border-amber-300 bg-amber-300 text-black shadow-lg shadow-amber-500/20'
                  : 'border-white/20 bg-white/10 text-white hover:border-amber-200 hover:bg-white/15'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleLogin}
            className={`hidden rounded-2xl border px-4 py-2 text-left text-xs transition md:block ${
              isLoggedIn
                ? 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100'
                : 'border-amber-300/40 bg-amber-300 text-black'
            }`}
          >
            <span className="block font-semibold">{isLoggedIn ? 'demo.cliente@jld.local' : 'Login usuario'}</span>
            <span className={`block ${isLoggedIn ? 'text-emerald-200/80' : 'text-black/60'}`}>
              {isLoggedIn ? 'Sesión activa' : 'Entrar al sistema'}
            </span>
          </button>
          <div className="rounded-2xl border border-amber-200/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
            {t.activeModule}: <span className="ml-1 font-semibold text-white">{activeModuleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative h-12 w-12 rounded-2xl border border-white/20 bg-white/5">
      <div className="absolute left-2 top-1.5 h-8 w-3.5 rounded-full bg-white" />
      <div className="absolute right-2 top-1.5 h-8 w-3.5 rounded-full bg-white" />
      <div className="absolute left-1/2 top-1 h-9 w-0.5 -translate-x-1/2 rotate-12 bg-black/60" />
    </div>
  );
}

function Sidebar({ activeModule, isOpen, language, onSelect }: { activeModule: string; isOpen: boolean; language: Language; onSelect: (item: string) => void }) {
  const t = copy[language];
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-black text-white transition-transform lg:sticky lg:top-20 lg:z-30 lg:h-[calc(100vh-5rem)] lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col justify-between p-5">
        <div>
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <LogoMark />
            <div>
              <div className="font-semibold">JLD Backend</div>
              <div className="text-xs text-slate-400">{t.navigation}</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const label = item[language];
              const isActive = activeModule === item.es;
              return (
                <button
                  key={item.es}
                  type="button"
                  onClick={() => onSelect(item.es)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-300 font-semibold text-black shadow-lg shadow-amber-700/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-amber-200">{language === 'en' ? 'Owner system' : 'Sistema propietario'}</div>
          <div className="mt-3 text-sm leading-6 text-slate-300">{t.ownerSystemText}</div>
        </div>
      </div>
    </aside>
  );
}

function GlobalFilters({
  selectedBranch,
  selectedPeriod,
  viewMode,
  language,
  onBranchChange,
  onPeriodChange,
  onViewModeChange,
  onLanguageChange,
  onExport,
  onPrint,
  onRefresh,
  lastSyncLabel,
  actionMessage,
}: {
  selectedBranch: string;
  selectedPeriod: string;
  viewMode: string;
  language: Language;
  onBranchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onViewModeChange: (value: string) => void;
  onLanguageChange: (value: Language) => void;
  onExport: () => void;
  onPrint: () => void;
  onRefresh: () => void;
  lastSyncLabel: string;
  actionMessage: string;
}) {
  const t = copy[language];
  const actions = [
    { label: 'Export Excel', handler: onExport },
    { label: 'Print', handler: onPrint },
    { label: 'Refresh', handler: onRefresh },
  ];
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-3 md:grid-cols-4">
          <SelectControl label={t.filterBranch} value={selectedBranch} options={branchOptions[language]} onChange={onBranchChange} />
          <SelectControl label={t.filterPeriod} value={selectedPeriod} options={periodOptions[language]} onChange={onPeriodChange} />
          <SelectControl label={t.filterView} value={viewMode} options={viewModeOptions[language]} onChange={onViewModeChange} />
          <SelectControl label="Language" value={language === 'es' ? 'Español' : 'English'} options={['Español', 'English']} onChange={(value) => onLanguageChange(value === 'Español' ? 'es' : 'en')} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.handler}
              className="rounded-2xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              {action.label}
            </button>
          ))}
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {t.refreshed} · {lastSyncLabel}
          </span>
        </div>
      </div>
      {actionMessage ? (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {actionMessage}
        </div>
      ) : null}
    </section>
  );
}

function SelectControl({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-amber-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SectionCard({ eyebrow, title, action, children, className = '' }: { eyebrow?: string; title: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[30px] border border-stone-200 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${className}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          {eyebrow ? <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">{eyebrow}</div> : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
        </div>
        {action ? <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ item, language }: { item: (typeof dashboardMetrics)[number]; language: Language }) {
  const toneClass = item.tone === 'risk' ? 'text-rose-700 bg-rose-50' : item.tone === 'warn' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50';
  const localized = language === 'en' ? metricTranslations[item.label] : null;
  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-stone-500">{localized?.label ?? item.label}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value}</div>
      <div className="mt-1 text-xs text-slate-400">{localized?.note ?? item.note}</div>
      <div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClass}`}>{item.delta}</div>
    </div>
  );
}

function MiniStat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-950">{value}</div>
      <div className="text-xs text-stone-400">{note}</div>
    </div>
  );
}

function BranchSalesPanel({
  branches,
  selectedBranch,
  selectedPeriod,
  language,
}: {
  branches: typeof branchSummary;
  selectedBranch: string;
  selectedPeriod: string;
  language: Language;
}) {
  const totalSales = branches.reduce((sum, branch) => sum + branch.salesValue, 0);
  const totalTickets = branches.reduce((sum, branch) => sum + Number(branch.tickets.replace(/,/g, '')), 0);
  const topSales = Math.max(...branchSummary.map((branch) => branch.salesValue));
  return (
    <section className="rounded-[30px] border border-stone-200 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
            {language === 'en' ? 'Branch sales' : 'Ventas por sucursal'}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {selectedBranch}
          </h2>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">{selectedPeriod}</div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <MiniStat label={language === 'en' ? 'Total sales' : 'Ventas total'} value={`$${totalSales.toLocaleString('en-US')}`} note={language === 'en' ? 'selected view' : 'vista seleccionada'} />
          <MiniStat label="Tickets" value={String(totalTickets)} note={language === 'en' ? 'issued tickets' : 'tickets emitidos'} />
          <MiniStat label={language === 'en' ? 'Average ticket' : 'Ticket promedio'} value={`$${Math.round(totalSales / Math.max(totalTickets, 1)).toLocaleString('en-US')}`} note="MXN" />
        </div>
        <div className="grid gap-3">
          {branches.map((branch) => {
            const isSelected = selectedBranch === branch.name;
            return (
              <div
                key={branch.name}
                className={`rounded-[22px] border p-4 ${isSelected ? 'border-amber-300 bg-amber-50' : 'border-stone-200 bg-stone-50'}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-950">{branch.name}</div>
                    <div className="mt-1 text-sm text-stone-500">
                      {branch.tickets} tickets · {branch.avg} · {language === 'en' ? 'Occupancy' : 'Ocupación'} {branch.occupancy}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-slate-950">{branch.sales}</div>
                    <div className="text-sm font-semibold text-emerald-700">MTD {branch.mtd}</div>
                  </div>
                </div>
                <div className="mt-4 h-3 rounded-full bg-white">
                  <div className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-300" style={{ width: `${Math.max(14, (branch.salesValue / topSales) * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DataTable<T extends Record<string, string>>({ columns, rows }: { columns: TableColumn<T>[]; rows: T[] }) {
  return (
    <div className="overflow-x-auto rounded-[24px] border border-stone-200">
      <table className="min-w-full text-sm">
        <thead className="bg-stone-100 text-stone-600">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 text-left font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={Object.values(row).join('-')} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
              {columns.map((column) => (
                <td key={String(column.key)} className={`px-4 py-3 ${column.tone === 'danger' ? 'font-semibold text-rose-700' : column.tone === 'strong' ? 'font-semibold text-slate-950' : 'text-stone-700'}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ModuleGrid({
  sections,
  activeModule,
  onSelect,
}: {
  sections: ModuleSection[];
  activeModule: string;
  onSelect: (value: string, detail?: string) => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {sections.map((section) => (
        <div key={section.title} className="rounded-[26px] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-5">
          <div className={`rounded-2xl bg-gradient-to-r ${section.accent} px-4 py-3`}>
            <div className="text-lg font-semibold">{section.title}</div>
            <div className="mt-1 text-sm text-stone-500">{section.description}</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSelect(section.title, item)}
                className={`rounded-[18px] border px-4 py-4 text-left text-sm font-medium shadow-sm transition ${
                  activeModule === section.title ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-stone-200 bg-white text-slate-700 hover:border-amber-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CentralSystemGrid({ language, onSelect }: { language: Language; onSelect: (value: string, detail?: string) => void }) {
  const t = copy[language];
  return (
    <SectionCard eyebrow={t.centralSystem} title={t.adminOperations} action={language === 'en' ? '9 families mapped' : '9 familias mapeadas'}>
      <div className="mb-5 max-w-3xl text-sm leading-6 text-stone-600">{t.centralSystemSubtitle}</div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {centralModules.map((module) => {
          const statusClass =
            module.status === 'ready'
              ? 'bg-emerald-50 text-emerald-700'
              : module.status === 'review'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-stone-100 text-stone-500';
          return (
            <button
              key={module.title}
              type="button"
              onClick={() => onSelect(module.title, module.subtitle)}
              className="min-h-44 rounded-[22px] border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-amber-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
                  {module.title.slice(0, 1)}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                  {module.status === 'ready' ? t.readyMock : module.status === 'review' ? language === 'en' ? 'Review' : 'Revisión' : t.pendingSetup}
                </span>
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-950">{module.title}</div>
              <div className="mt-2 text-sm leading-6 text-stone-500">{module.subtitle}</div>
              <div className="mt-4 text-sm font-semibold text-amber-700">{module.metric}</div>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}

function AdminOperationsPanel({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <SectionCard eyebrow={t.catalogControl} title={t.serviceCatalog} action={language === 'en' ? 'Sortable price list' : 'Lista precios editable'}>
        <DataTable
          columns={[
            { key: 'key', label: 'Clave', tone: 'strong' },
            { key: 'division', label: 'División' },
            { key: 'name', label: language === 'en' ? 'Service name' : 'Nombre servicio' },
            { key: 'price1', label: 'Precio 1', tone: 'strong' },
            { key: 'price2', label: 'Precio 2' },
            { key: 'cost', label: 'Costo' },
          ]}
          rows={serviceCatalogRows}
        />
      </SectionCard>

      <SectionCard eyebrow={t.collaboratorSecurity} title={t.permissionMatrix} action={language === 'en' ? 'Security tab' : 'Pestaña seguridad'}>
        <DataTable
          columns={[
            { key: 'collaborator', label: language === 'en' ? 'Collaborator' : 'Colaborador', tone: 'strong' },
            { key: 'branch', label: t.branch },
            { key: 'caja', label: 'Caja' },
            { key: 'notas', label: 'Notas' },
            { key: 'inventario', label: language === 'en' ? 'Inventory' : 'Inventario' },
            { key: 'seguridad', label: language === 'en' ? 'Security' : 'Seguridad' },
          ]}
          rows={permissionRows}
        />
      </SectionCard>
    </section>
  );
}

function ReportWorkflowPanel({
  language,
  selectedWorkflow,
  onSelect,
}: {
  language: Language;
  selectedWorkflow: WorkflowSelection;
  onSelect: (workflow: WorkflowSelection) => void;
}) {
  const t = copy[language];
  return (
    <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <SectionCard eyebrow={t.cashDesk} title={language === 'en' ? 'Branch adjustment controls' : 'Controles ajustes sucursal'} action="Caja chica · Corte · Notas">
        <div className="grid gap-3 sm:grid-cols-2">
          {branchAdjustmentModules.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                onSelect({
                  title: item,
                  category: language === 'en' ? 'Branch adjustment' : 'Ajuste sucursal',
                  filters: index === 1 ? 'Sucursal + usuario + corte abierto' : 'Sucursal + usuario + autorización',
                  output: index === 1 ? 'Corte activo, folio, bitácora' : 'Movimiento auditado, folio, autorización',
                  state: index === 1 ? 'Requiere validación' : 'Listo mock',
                  sensitive: index === 1,
                })
              }
              className={`rounded-[20px] border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 ${selectedWorkflow.title === item ? 'border-amber-300 bg-amber-50 text-slate-950 shadow-md' : index === 1 ? 'border-rose-200 bg-rose-50 text-rose-950' : 'border-stone-200 bg-stone-50 text-slate-800'}`}
            >
              <div className="text-sm font-semibold">{item}</div>
              <div className="mt-2 text-xs leading-5 text-stone-500">
                {index === 1
                  ? language === 'en'
                    ? 'Sensitive flow: requires branch, user and open shift.'
                    : 'Flujo sensible: requiere sucursal, usuario y corte abierto.'
                  : language === 'en'
                    ? 'Prepared for audit trail and authorization.'
                    : 'Preparado para bitácora y autorización.'}
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard eyebrow={t.reportForms} title={language === 'en' ? 'Administrative report workflows' : 'Flujos reportes administrativos'} action="Sucursal · Periodo · Colaborador">
        <div className="overflow-hidden rounded-[20px] border border-stone-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-stone-100 text-stone-600">
              <tr>
                <th className="px-4 py-3 font-semibold">{language === 'en' ? 'Report' : 'Reporte'}</th>
                <th className="px-4 py-3 font-semibold">{language === 'en' ? 'Filters' : 'Filtros'}</th>
                <th className="px-4 py-3 font-semibold">{language === 'en' ? 'Output' : 'Salida'}</th>
                <th className="px-4 py-3 font-semibold">{language === 'en' ? 'Status' : 'Estado'}</th>
              </tr>
            </thead>
            <tbody>
              {reportWorkflows.map((item) => {
                const state = language === 'en' && item.state === 'Pendiente setup' ? 'Setup pending' : language === 'en' ? 'Mock ready' : item.state;
                const isSelected = selectedWorkflow.title === item.title;
                return (
                  <tr key={item.title} className={`border-t border-stone-100 ${isSelected ? 'bg-amber-50' : 'bg-white odd:bg-stone-50/70'}`}>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          onSelect({
                            title: item.title,
                            category: language === 'en' ? 'Administrative report' : 'Reporte administrativo',
                            filters: item.branch,
                            output: item.output,
                            state,
                          })
                        }
                        className="text-left font-semibold text-slate-900 underline-offset-4 transition hover:text-amber-700 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-300"
                      >
                        {item.title}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{item.branch}</td>
                    <td className="px-4 py-3 text-stone-600">{item.output}</td>
                    <td className="px-4 py-3 text-stone-600">{state}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div id="workflow-detail" className={`mt-5 rounded-[24px] border p-5 ${selectedWorkflow.sensitive ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'}`}>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            {language === 'en' ? 'Selected workflow' : 'Workflow sélectionné'}
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-950">{selectedWorkflow.title}</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <MiniStat label={language === 'en' ? 'Filters' : 'Filtres'} value={selectedWorkflow.filters} note={selectedWorkflow.category} />
            <MiniStat label={language === 'en' ? 'Output' : 'Sortie'} value={selectedWorkflow.output} note={language === 'en' ? 'Prepared for API' : 'Préparé pour API'} />
            <MiniStat label={language === 'en' ? 'Status' : 'État'} value={selectedWorkflow.state} note={selectedWorkflow.sensitive ? 'Validación requerida' : 'Mock activo'} />
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

function AlertList({ alerts, language }: { alerts: typeof inventoryAlerts; language: Language }) {
  const t = copy[language];
  return (
    <div className="grid gap-3">
      {alerts.map((alert) => (
        <div key={alert.product} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-slate-900">{alert.product}</div>
              <div className="mt-1 text-sm text-stone-500">{alert.branch}</div>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${alert.severity === 'Alta' ? 'bg-rose-50 text-rose-700' : alert.severity === 'Media' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
              {language === 'en' ? (alert.severity === 'Alta' ? 'Urgent restock' : alert.severity === 'Media' ? 'Suggested purchase' : 'Monitor') : alert.status}
            </div>
          </div>
          <div className="mt-3 text-sm text-stone-600">
            {t.stockCurrent}: {alert.stock} · {t.stockMin}: {alert.min} · {t.alertLevel} {language === 'en' ? (alert.severity === 'Alta' ? t.riskHigh : alert.severity === 'Media' ? t.riskMedium : 'Low') : alert.severity}
          </div>
        </div>
      ))}
    </div>
  );
}

function FunnelCard({ items }: { items: typeof topServicesData }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.label} className="flex justify-center">
          <div
            className="min-w-[180px] rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white shadow-lg"
            style={{
              width: `${Math.max(18, item.value * 2.85)}%`,
              background: `linear-gradient(90deg, hsl(${204 + index * 8} 52% 42%), hsl(${218 + index * 7} 48% 58%))`,
            }}
          >
            {item.label} · {item.value}%
          </div>
        </div>
      ))}
    </div>
  );
}

function CollaboratorCard({ person, index, language }: { person: (typeof collaboratorRankingData)[number]; index: number; language: Language }) {
  return (
    <div className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{person.name}</div>
          <div className="mt-1 text-sm text-stone-500">{person.branch}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">{index + 1}</div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs xl:grid-cols-4">
        <MiniStat label={language === 'en' ? 'Services' : 'Servicios'} value={String(person.services)} note={language === 'en' ? 'period' : 'periodo'} />
        <MiniStat label={language === 'en' ? 'Sales' : 'Ventas'} value={person.sales} note="MXN" />
        <MiniStat label={language === 'en' ? 'Bonus' : 'Bono'} value={person.bonus} note={language === 'en' ? 'estimated' : 'estimado'} />
        <MiniStat label={language === 'en' ? 'Efficiency' : 'Eficiencia'} value={person.efficiency} note={language === 'en' ? 'agenda' : 'agenda'} />
      </div>
    </div>
  );
}

function IntelligenceLayer({ language }: { language: Language }) {
  const t = copy[language];
  const cards = [
    { title: t.noReturn, score: '78', risk: t.riskHigh, recommendation: t.noReturnRecommendation },
    { title: t.demandPrediction, score: '86', risk: t.riskMedium, recommendation: t.demandRecommendation },
    { title: language === 'en' ? 'Discount / credit anomalies' : 'Anomalías remises / crédito', score: '64', risk: t.riskMedium, recommendation: language === 'en' ? 'Review discounts above 45% and credit balances open for more than 21 days.' : 'Revisar descuentos superiores a 45% y créditos abiertos > 21 días.' },
    { title: t.stockBreak, score: '91', risk: t.riskHigh, recommendation: t.stockBreakRecommendation },
  ];
  return (
    <SectionCard eyebrow="Hugging Face Intelligence Layer" title={t.connectedAi} action={t.dataReady}>
      <div className="grid gap-4 lg:grid-cols-4">
        {cards.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-slate-800 bg-gradient-to-b from-black to-zinc-950 p-5 text-white">
            <div className="text-sm font-semibold text-amber-200">{item.title}</div>
            <div className="mt-5 flex items-end justify-between">
              <div className="text-4xl font-semibold">{item.score}</div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.risk === 'Alto' ? 'bg-rose-500/15 text-rose-100' : 'bg-amber-500/15 text-amber-100'}`}>
                {t.risk} {item.risk}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{item.recommendation}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ExecutiveSummary({ visible, language }: { visible: boolean; language: Language }) {
  const t = copy[language];
  if (!visible) return null;

  return (
    <SectionCard eyebrow={t.executiveView} title={t.executiveSummary} action={t.comparisonAction}>
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {dashboardMetrics.slice(0, 4).map((metric) => (
            <MetricCard key={metric.label} item={metric} language={language} />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            {branchSummary.slice(0, 3).map((branch) => (
              <MiniStat key={branch.name} label={branch.name} value={branch.sales} note={`MTD ${branch.mtd}`} />
            ))}
          </div>
          <div className="rounded-[24px] border border-rose-100 bg-rose-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">{t.alertMain}</div>
            <div className="mt-2 font-semibold text-rose-950">{t.alertMainTitle}</div>
            <p className="mt-2 text-sm text-rose-800">{t.alertMainBody}</p>
          </div>
          <DataTable
            columns={[
              { key: 'label', label: t.indicator, tone: 'strong' },
              { key: 'current', label: t.current },
              { key: 'previous', label: t.previous },
              { key: 'delta', label: 'Delta', tone: 'danger' },
            ]}
            rows={monthlyComparison}
          />
        </div>
      </div>
    </SectionCard>
  );
}

function ModulePreview({ language }: { language: Language }) {
  const t = copy[language];
  const rows = modulePreviewData.map((row) => ({
    ...row,
    owner: language === 'en' ? row.owner.replace('Dirección', 'Leadership').replace('Operación', 'Operations').replace('Producto', 'Product') : row.owner,
    status: language === 'en' ? t.readyMock : row.status,
    metric: row.metric.replace('medios', t.paymentMethods).replace('colaboradores', t.collaborators),
  }));
  return (
    <SectionCard eyebrow={t.viewsPrepared} title={t.realModuleViews} action={t.integrationReady}>
      <DataTable
        columns={[
          { key: 'module', label: t.activeModule, tone: 'strong' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: language === 'en' ? 'Status' : 'Estado' },
          { key: 'metric', label: t.metric },
        ]}
        rows={rows}
      />
    </SectionCard>
  );
}

export default function JldBackendPremiumMockup() {
  const [language, setLanguage] = useState<Language>('es');
  const [selectedBranch, setSelectedBranch] = useState(branchOptions.es[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions.es[0]);
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [viewMode, setViewMode] = useState(viewModeOptions.es[0]);
  const [lastSyncLabel, setLastSyncLabel] = useState('09:42');
  const [showExecutivePreview, setShowExecutivePreview] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [openedModuleDetail, setOpenedModuleDetail] = useState('Dashboard ejecutivo');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowSelection>({
    title: 'Abrir corte de caja',
    category: 'Ajuste sucursal',
    filters: 'Sucursal + usuario + corte abierto',
    output: 'Corte activo, folio, bitácora',
    state: 'Requiere validación',
    sensitive: true,
  });
  const t = copy[language];

  const filteredBranchSummary = useMemo(() => {
    if (selectedBranch === branchOptions[language][0]) return branchSummary;
    return branchSummary.filter((branch) => branch.name === selectedBranch);
  }, [language, selectedBranch]);

  const filteredBranchTableRows = useMemo(
    () => filteredBranchSummary.map(({ salesValue, ...branch }) => branch),
    [filteredBranchSummary],
  );

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setSelectedBranch(branchOptions[nextLanguage][0]);
    setSelectedPeriod(periodOptions[nextLanguage][0]);
    setViewMode(viewModeOptions[nextLanguage][0]);
  }

  function setTimedActionMessage(message: string) {
    setActionMessage(message);
    window.setTimeout(() => setActionMessage(''), 3500);
  }

  function handleSelectModule(item: string, detail?: string) {
    setActiveModule(item);
    setSidebarOpen(false);
    setOpenedModuleDetail(detail || item);
    setTimedActionMessage(`${t.moduleOpened}: ${detail || item}`);
    const targetId = navigationTargets[item] ?? 'dashboard';
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleSelectWorkflow(workflow: WorkflowSelection) {
    setSelectedWorkflow(workflow);
    setActiveModule('Configuración');
    setOpenedModuleDetail(workflow.title);
    setTimedActionMessage(`${t.actionReady}: ${workflow.title}`);
    window.setTimeout(() => {
      document.getElementById('workflow-detail')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  function handleViewModeChange(nextViewMode: string) {
    setViewMode(nextViewMode);
    setTimedActionMessage(`${t.actionReady}: ${nextViewMode}`);
    if (nextViewMode === viewModeOptions[language][2]) {
      setActiveModule('Configuración');
      document.getElementById('configuracion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (nextViewMode === viewModeOptions[language][1]) {
      setActiveModule('Productividad');
      document.getElementById('productividad')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setActiveModule('Dashboard');
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleExport() {
    const rows = [
      ['Section', 'Metric', 'Value', 'Detail'],
      ...dashboardMetrics.map((item) => ['Dashboard', item.label, item.value, item.note]),
      ...filteredBranchSummary.map((branch) => ['Sucursal', branch.name, branch.sales, `Tickets ${branch.tickets} | Ticket ${branch.avg} | Ocupacion ${branch.occupancy} | MTD ${branch.mtd}`]),
      ...inventoryAlerts.map((alert) => ['Inventario', alert.product, `${alert.stock}`, `${alert.branch} | Min ${alert.min} | ${alert.status}`]),
      ...collaboratorRankingData.map((person) => ['Productividad', person.name, person.sales, `${person.branch} | Servicios ${person.services} | Bono ${person.bonus}`]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(','),
      )
      .join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jld-dashboard-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setTimedActionMessage(`${t.actionReady}: Export Excel`);
  }

  function handlePrint() {
    setTimedActionMessage(`${t.actionReady}: Print`);
    window.print();
  }

  function handleRefresh() {
    const now = new Date();
    setLastSyncLabel(
      now.toLocaleTimeString(language === 'en' ? 'en-US' : 'es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
    setTimedActionMessage(`${t.actionReady}: Refresh`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-slate-50 to-slate-100 text-slate-950">
      <Header
        activeModule={activeModule}
        language={language}
        viewMode={viewMode}
        isLoggedIn={isLoggedIn}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
        onViewModeChange={handleViewModeChange}
        onToggleLogin={() => setIsLoggedIn((value) => !value)}
      />
      {sidebarOpen ? <button type="button" aria-label={t.closeNavigation} onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" /> : null}

      <div className="lg:grid lg:grid-cols-[18rem_1fr]">
        <Sidebar activeModule={activeModule} isOpen={sidebarOpen} language={language} onSelect={handleSelectModule} />

        <main className="flex w-full flex-col gap-6 px-4 py-6 lg:px-6">
          <GlobalFilters
            selectedBranch={selectedBranch}
            selectedPeriod={selectedPeriod}
            viewMode={viewMode}
            language={language}
            onBranchChange={setSelectedBranch}
            onPeriodChange={setSelectedPeriod}
            onViewModeChange={handleViewModeChange}
            onLanguageChange={handleLanguageChange}
            onExport={handleExport}
            onPrint={handlePrint}
            onRefresh={handleRefresh}
            lastSyncLabel={lastSyncLabel}
            actionMessage={actionMessage}
          />

          <section className="rounded-[24px] border border-amber-200 bg-gradient-to-r from-amber-50 to-white px-5 py-4 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{t.activeModule}</div>
                <div className="mt-1 text-lg font-semibold text-slate-950">{activeModule}</div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
                {openedModuleDetail}
              </div>
            </div>
          </section>

          <BranchSalesPanel
            branches={filteredBranchSummary}
            selectedBranch={selectedBranch}
            selectedPeriod={selectedPeriod}
            language={language}
          />

          <section id="dashboard" className="scroll-mt-28 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[32px] border border-stone-200 bg-gradient-to-b from-white to-stone-50 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">{t.mainEyebrow}</div>
              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                    {t.dashboardTitle}
                  </h1>
                  <p className="mt-4 max-w-4xl text-[15px] leading-8 text-stone-600">
                    {t.dashboardSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExecutivePreview((value) => !value)}
                  className="rounded-2xl bg-gradient-to-r from-amber-600 to-amber-300 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-700/20"
                >
                  {showExecutivePreview ? t.hiddenExecutive : language === 'en' ? `Show ${t.executiveView}` : `Mostrar ${t.executiveView}`}
                </button>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {dashboardMetrics.map((item) => (
                  <MetricCard key={item.label} item={item} language={language} />
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 p-7 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200">{t.decisionReading}</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.priorityDecisions}</h2>
              <div className="mt-5 grid gap-3">
                <MiniDecision label={t.monthlySales} value="$1,223,400" note={language === 'en' ? 'Polanco and Santa Fe consolidated.' : 'Consolidado Polanco y Santa Fe.'} />
                <MiniDecision label={t.creditRisk} value="$58,930" note={language === 'en' ? '4 folios require follow-up.' : '4 folios requieren seguimiento.'} />
                <MiniDecision label={language === 'en' ? 'AI recommends' : 'IA recomienda'} value={t.productRestock} note={t.productRestockNote} />
              </div>
            </div>
          </section>

          <ExecutiveSummary visible={showExecutivePreview} language={language} />

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <SectionCard eyebrow="Pilotage multi-sucursal" title={t.branchComparison} action={selectedPeriod}>
              <DataTable
                columns={[
                  { key: 'name', label: t.branch, tone: 'strong' },
                  { key: 'sales', label: language === 'en' ? 'Sales' : 'Ventas' },
                  { key: 'tickets', label: 'Tickets' },
                  { key: 'avg', label: 'Ticket prom.' },
                  { key: 'occupancy', label: language === 'en' ? 'Occupancy' : 'Ocupación' },
                  { key: 'mtd', label: 'MTD' },
                ]}
                rows={filteredBranchTableRows}
              />
            </SectionCard>

            <SectionCard eyebrow={t.operationsAlerts} title={t.inventoryAndInternalUse} action={`${inventoryAlerts.length} ${t.activeAlerts}`}>
              <AlertList alerts={inventoryAlerts} language={language} />
            </SectionCard>
          </section>

          <div id="ia" className="scroll-mt-28">
            <IntelligenceLayer language={language} />
          </div>

          <div id="admin" className="scroll-mt-28">
            <CentralSystemGrid language={language} onSelect={handleSelectModule} />
          </div>

          <div id="catalogos" className="scroll-mt-28">
            <AdminOperationsPanel language={language} />
          </div>

          <div id="configuracion" className="scroll-mt-28">
            <ReportWorkflowPanel
              language={language}
              selectedWorkflow={selectedWorkflow}
              onSelect={handleSelectWorkflow}
            />
          </div>

          <section id="ventas" className="scroll-mt-28 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <SectionCard eyebrow={t.analytics} title={t.financialAndPayment} action={t.exportableFunnel}>
              <div className="grid gap-4 md:grid-cols-2">
                <MiniStat label={t.revenueTotal} value="$305,836.00" note="01-04-2026 → 23-04-2026" />
                <MiniStat label={t.ticketsIssued} value="174" note={language === 'en' ? 'Polanco filtered' : 'Polanco filtrado'} />
                <MiniStat label={t.ticketAverage} value="$1,757.68" note={language === 'en' ? 'without VAT' : 'sin IVA'} />
                <MiniStat label={t.dailySales} value="$13,297.22" note={t.periodAverage} />
              </div>
              <div className="mt-5 space-y-3">
                {paymentMixData.map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-sm text-stone-600">
                      <span>{item.label}</span>
                      <span>{item.value}% · {item.amount}</span>
                    </div>
                    <div className="h-3 rounded-full bg-stone-200">
                      <div className="h-3 rounded-full" style={{ width: `${item.value}%`, background: `linear-gradient(90deg, hsl(${210 + index * 18} 52% 42%), hsl(${228 + index * 12} 48% 58%))` }} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Visual premium" title={t.topServices} action={t.distributionPeriod}>
              <FunnelCard items={topServicesData} />
            </SectionCard>
          </section>

          <section id="productividad" className="scroll-mt-28 grid gap-6 xl:grid-cols-3">
            <SectionCard eyebrow={t.collaboratorTop} title={t.productivityIndividual} className="xl:col-span-1">
              <div className="space-y-3">
                {collaboratorRankingData.slice(0, 4).map((person, index) => (
                  <CollaboratorCard key={person.name} person={person} index={index} language={language} />
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow={t.creditSales} title={t.creditsGranted} className="xl:col-span-1">
              <DataTable
                columns={[
                  { key: 'folio', label: t.folio, tone: 'strong' },
                  { key: 'client', label: t.client },
                  { key: 'amount', label: t.amount },
                  { key: 'due', label: t.creditDebt, tone: 'danger' },
                  { key: 'age', label: t.alertAge },
                ]}
                rows={creditsData}
              />
            </SectionCard>

            <SectionCard eyebrow={t.discountsGranted} title={t.discountDetail} className="xl:col-span-1">
              <div className="space-y-3">
                {discountsData.map((item) => (
                  <div key={`${item.date}-${item.client}`} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">{item.service}</div>
                    <div className="mt-1 text-xs text-stone-500">{item.date} · {item.client}</div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-stone-500">{t.original} {item.original}</span>
                      <span className="font-semibold text-slate-900">{t.charged} {item.charged}</span>
                    </div>
                    <div className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{item.type}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </section>

          <div id="producto" className="scroll-mt-28">
            <SectionCard eyebrow={t.functionalMap} title={t.moduleCoverage} action={language === 'en' ? 'Sales analysis · Productivity · Product · Catalogs' : 'Análisis · Productividad · Producto · Catálogos'}>
              <ModuleGrid sections={moduleSectionsData} activeModule={activeModule} onSelect={handleSelectModule} />
            </SectionCard>
          </div>

          <div id="clientes" className="scroll-mt-28">
            <ModulePreview language={language} />
          </div>
        </main>
      </div>
    </div>
  );
}

function MiniDecision({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-amber-200">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{note}</div>
    </div>
  );
}
