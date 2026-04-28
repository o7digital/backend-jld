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

type Language = 'es' | 'en';

const copy = {
  es: {
    admin: 'Admin',
    activeAlerts: 'alertas activas',
    activeModule: 'Módulo',
    alertAge: 'Antig.',
    alertLevel: 'Riesgo',
    alertMain: 'Alerta principal del día',
    alertMainBody: 'IA recomienda transferir inventario desde Condesa y generar orden de compra antes de 18:00.',
    alertMainTitle: 'Riesgo de ruptura Redken Acidic Bonding en Pedregal.',
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
  },
  en: {
    admin: 'Admin',
    activeAlerts: 'active alerts',
    activeModule: 'Module',
    alertAge: 'Age',
    alertLevel: 'Risk',
    alertMain: "Today's main alert",
    alertMainBody: 'AI recommends transferring stock from Condesa and creating a purchase order before 18:00.',
    alertMainTitle: 'Stockout risk for Redken Acidic Bonding in Pedregal.',
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
  },
} satisfies Record<Language, Record<string, string>>;

const branchOptions = {
  es: ['Todas las sucursales', 'Polanco', 'Santa Fe', 'Pedregal', 'Satélite', 'Interlomas', 'Condesa'],
  en: ['All branches', 'Polanco', 'Santa Fe', 'Pedregal', 'Satélite', 'Interlomas', 'Condesa'],
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
];

const dashboardMetrics = [
  { label: 'Ventas del mes', value: '$1.84M', note: 'MTD vs mes anterior', delta: '-6.2%', tone: 'risk' },
  { label: 'Ticket promedio', value: '$1,285', note: 'promedio por ticket', delta: '+4.1%', tone: 'good' },
  { label: 'Clientes activos', value: '2,486', note: 'últimos 90 días', delta: '+8.8%', tone: 'good' },
  { label: 'Consumo interno', value: '$86,420', note: 'controlado por sucursal', delta: '-3.2%', tone: 'good' },
  { label: 'Remises del mes', value: '$142,300', note: '12.4% sobre venta', delta: '+1.7%', tone: 'warn' },
  { label: 'Ventas a crédito', value: '$58,930', note: 'saldo pendiente', delta: '+9.3%', tone: 'risk' },
  { label: 'Ocupación', value: '81%', note: 'agenda consolidada', delta: '+5 pts', tone: 'good' },
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
  { name: 'Polanco', sales: '$642,000', tickets: '386', avg: '$1,663', occupancy: '87%', mtd: '+7.4%' },
  { name: 'Santa Fe', sales: '$581,400', tickets: '342', avg: '$1,700', occupancy: '82%', mtd: '+3.8%' },
  { name: 'Pedregal', sales: '$366,800', tickets: '228', avg: '$1,609', occupancy: '76%', mtd: '-2.1%' },
  { name: 'Satélite', sales: '$249,500', tickets: '167', avg: '$1,494', occupancy: '69%', mtd: '-6.9%' },
  { name: 'Interlomas', sales: '$214,200', tickets: '141', avg: '$1,519', occupancy: '71%', mtd: '+1.5%' },
  { name: 'Condesa', sales: '$196,700', tickets: '129', avg: '$1,525', occupancy: '74%', mtd: '+4.2%' },
];

const inventoryAlerts = [
  { product: 'Kérastase Gloss Absolu 250ml', branch: 'Polanco', stock: 3, min: 8, status: 'Reposición urgente', severity: 'Alta' },
  { product: "L'Oréal Metal Detox Mask", branch: 'Santa Fe', stock: 5, min: 10, status: 'Compra sugerida', severity: 'Media' },
  { product: 'Redken Acidic Bonding', branch: 'Pedregal', stock: 2, min: 6, status: 'Riesgo de ruptura', severity: 'Alta' },
  { product: 'Brazilian Ionic Bonding Spray', branch: 'Satélite', stock: 7, min: 12, status: 'Monitorear', severity: 'Baja' },
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
  { name: 'Lizbeth Torres', branch: 'Santa Fe', services: 118, sales: '$84,160', bonus: '$10,200', efficiency: '91%' },
  { name: 'Ana Romelia Gutiérrez', branch: 'Polanco', services: 111, sales: '$79,540', bonus: '$9,480', efficiency: '89%' },
  { name: 'Selene Flores', branch: 'Pedregal', services: 98, sales: '$69,330', bonus: '$8,150', efficiency: '86%' },
  { name: 'Mariana Rivas', branch: 'Condesa', services: 91, sales: '$61,200', bonus: '$7,450', efficiency: '84%' },
];

const moduleSectionsData: ModuleSection[] = [
  { title: 'Análisis de ventas', description: 'Ingresos, pagos, descuentos, crédito y lectura financiera.', items: salesModules, accent: 'from-amber-500/20 to-transparent' },
  { title: 'Productividad', description: 'Sucursal, equipo, tiempos de atención y desempeño individual.', items: productivityModules, accent: 'from-blue-500/20 to-transparent' },
  { title: 'Producto', description: 'Inventario, compras, ajustes, consumo interno e historial.', items: productModules, accent: 'from-emerald-500/20 to-transparent' },
  { title: 'Catálogos', description: 'Estructura maestra de operación para sucursales y servicios.', items: catalogModules, accent: 'from-slate-500/20 to-transparent' },
];

const monthlyComparison = [
  { label: 'Ventas MTD', current: '$1.84M', previous: '$1.96M', delta: '-6.2%' },
  { label: 'Tickets', current: '1,393', previous: '1,287', delta: '+8.2%' },
  { label: 'Ticket promedio', current: '$1,285', previous: '$1,234', delta: '+4.1%' },
  { label: 'Crédito pendiente', current: '$58,930', previous: '$53,900', delta: '+9.3%' },
];

const modulePreviewData = [
  { module: 'Resumen financiero', owner: 'Dirección', status: 'Listo mock', metric: '$305,836' },
  { module: 'Concentrado forma de pago', owner: 'Caja', status: 'Listo mock', metric: '4 medios' },
  { module: 'Productividad Individual Detallada', owner: 'Operación', status: 'Listo mock', metric: '52 colaboradores' },
  { module: 'Inventario sucursal', owner: 'Producto', status: 'Listo mock', metric: '218 SKUs' },
  { module: 'Cat. servicios', owner: 'Admin', status: 'Listo mock', metric: '94 servicios' },
];

function Header({ activeModule, language, onToggleSidebar }: { activeModule: string; language: Language; onToggleSidebar: () => void }) {
  const t = copy[language];
  const activeModuleLabel = navigationItems.find((item) => item.es === activeModule)?.[language] ?? activeModule;
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
          {[t.salonDirection, t.operation, t.admin].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
              {item}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-amber-200/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          {t.activeModule}: <span className="ml-1 font-semibold text-white">{activeModuleLabel}</span>
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
}: {
  selectedBranch: string;
  selectedPeriod: string;
  viewMode: string;
  language: Language;
  onBranchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onViewModeChange: (value: string) => void;
  onLanguageChange: (value: Language) => void;
}) {
  const t = copy[language];
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
          {['Export Excel', 'Print', 'Refresh'].map((action) => (
            <button key={action} type="button" className="rounded-2xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50">
              {action}
            </button>
          ))}
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">{t.lastSync}</span>
        </div>
      </div>
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

function ModuleGrid({ sections, activeModule, onSelect }: { sections: ModuleSection[]; activeModule: string; onSelect: (value: string) => void }) {
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
                onClick={() => onSelect(section.title)}
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
  const [showExecutivePreview, setShowExecutivePreview] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = copy[language];

  const filteredBranchSummary = useMemo(() => {
    if (selectedBranch === branchOptions[language][0]) return branchSummary;
    return branchSummary.filter((branch) => branch.name === selectedBranch);
  }, [language, selectedBranch]);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setSelectedBranch(branchOptions[nextLanguage][0]);
    setSelectedPeriod(periodOptions[nextLanguage][0]);
    setViewMode(viewModeOptions[nextLanguage][0]);
  }

  function handleSelectModule(item: string) {
    setActiveModule(item);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-slate-50 to-slate-100 text-slate-950">
      <Header activeModule={activeModule} language={language} onToggleSidebar={() => setSidebarOpen((value) => !value)} />
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
            onViewModeChange={setViewMode}
            onLanguageChange={handleLanguageChange}
          />

          <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
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
                <MiniDecision label={t.monthlySales} value="$1.84M" note={language === 'en' ? 'High ticket pressure, stable volume.' : 'Presión por ticket alto, volumen estable.'} />
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
                rows={filteredBranchSummary}
              />
            </SectionCard>

            <SectionCard eyebrow={t.operationsAlerts} title={t.inventoryAndInternalUse} action={`${inventoryAlerts.length} ${t.activeAlerts}`}>
              <AlertList alerts={inventoryAlerts} language={language} />
            </SectionCard>
          </section>

          <IntelligenceLayer language={language} />

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
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

          <section className="grid gap-6 xl:grid-cols-3">
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

          <SectionCard eyebrow={t.functionalMap} title={t.moduleCoverage} action={language === 'en' ? 'Sales analysis · Productivity · Product · Catalogs' : 'Análisis · Productividad · Producto · Catálogos'}>
            <ModuleGrid sections={moduleSectionsData} activeModule={activeModule} onSelect={setActiveModule} />
          </SectionCard>

          <ModulePreview language={language} />
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
