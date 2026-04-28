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

const navigationItems = [
  'Dashboard',
  'Análisis de ventas',
  'Productividad',
  'Producto',
  'Catálogos',
  'Clientes',
  'IA / Hugging Face',
  'Configuración',
];

const branches = ['Todas las sucursales', 'Polanco', 'Santa Fe', 'Pedregal', 'Satélite', 'Interlomas', 'Condesa'];
const periods = ['Abril 2026 MTD', 'Marzo 2026', 'Q1 2026', 'Últimos 90 días'];

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

const intelligenceCards = [
  { title: 'Riesgo no-retorno cliente', score: '78', risk: 'Alto', recommendation: 'Activar campaña VIP para 148 clientes con caída de frecuencia.' },
  { title: 'Predicción demanda servicios', score: '86', risk: 'Medio', recommendation: 'Refuerza color y peinado en Polanco/Santa Fe jueves a sábado.' },
  { title: 'Anomalías remises / crédito', score: '64', risk: 'Medio', recommendation: 'Revisar descuentos superiores a 45% y créditos abiertos > 21 días.' },
  { title: 'Ruptura stock inminente', score: '91', risk: 'Alto', recommendation: 'Comprar 34 unidades críticas antes del cierre semanal.' },
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

function Header({ activeModule, onToggleSidebar }: { activeModule: string; onToggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black text-white shadow-2xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg lg:hidden"
            aria-label="Abrir navegación"
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
          {['Dirección', 'Operación', 'Admin'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
              {item}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-amber-200/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
          Módulo: <span className="ml-1 font-semibold text-white">{activeModule}</span>
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

function Sidebar({ activeModule, isOpen, onSelect }: { activeModule: string; isOpen: boolean; onSelect: (item: string) => void }) {
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
              <div className="text-xs text-slate-400">Navigation</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeModule === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelect(item)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-300 font-semibold text-black shadow-lg shadow-amber-700/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-amber-200">Owner system</div>
          <div className="mt-3 text-sm leading-6 text-slate-300">Arquitectura preparada para API, base de datos y capa Hugging Face.</div>
        </div>
      </div>
    </aside>
  );
}

function GlobalFilters({
  selectedBranch,
  selectedPeriod,
  viewMode,
  onBranchChange,
  onPeriodChange,
  onViewModeChange,
}: {
  selectedBranch: string;
  selectedPeriod: string;
  viewMode: string;
  onBranchChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onViewModeChange: (value: string) => void;
}) {
  return (
    <section className="rounded-[28px] border border-stone-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-3 md:grid-cols-3">
          <SelectControl label="Sucursal" value={selectedBranch} options={branches} onChange={onBranchChange} />
          <SelectControl label="Periodo" value={selectedPeriod} options={periods} onChange={onPeriodChange} />
          <SelectControl label="Vista" value={viewMode} options={['Dirección', 'Operación', 'Admin']} onChange={onViewModeChange} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['Export Excel', 'Print', 'Refresh'].map((action) => (
            <button key={action} type="button" className="rounded-2xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50">
              {action}
            </button>
          ))}
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Última sincronización · 09:42</span>
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

function MetricCard({ item }: { item: (typeof dashboardMetrics)[number] }) {
  const toneClass = item.tone === 'risk' ? 'text-rose-700 bg-rose-50' : item.tone === 'warn' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50';
  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="text-sm text-stone-500">{item.label}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value}</div>
      <div className="mt-1 text-xs text-slate-400">{item.note}</div>
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

function AlertList({ alerts }: { alerts: typeof inventoryAlerts }) {
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
              {alert.status}
            </div>
          </div>
          <div className="mt-3 text-sm text-stone-600">
            Stock actual: {alert.stock} · Mínimo esperado: {alert.min} · Riesgo {alert.severity}
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

function CollaboratorCard({ person, index }: { person: (typeof collaboratorRankingData)[number]; index: number }) {
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
        <MiniStat label="Servicios" value={String(person.services)} note="periodo" />
        <MiniStat label="Ventas" value={person.sales} note="MXN" />
        <MiniStat label="Bono" value={person.bonus} note="estimado" />
        <MiniStat label="Eficiencia" value={person.efficiency} note="agenda" />
      </div>
    </div>
  );
}

function IntelligenceLayer() {
  return (
    <SectionCard eyebrow="Hugging Face Intelligence Layer" title="IA conectada a operación real" action="Mock · listo para API">
      <div className="grid gap-4 lg:grid-cols-4">
        {intelligenceCards.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-slate-800 bg-gradient-to-b from-black to-zinc-950 p-5 text-white">
            <div className="text-sm font-semibold text-amber-200">{item.title}</div>
            <div className="mt-5 flex items-end justify-between">
              <div className="text-4xl font-semibold">{item.score}</div>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.risk === 'Alto' ? 'bg-rose-500/15 text-rose-100' : 'bg-amber-500/15 text-amber-100'}`}>
                Riesgo {item.risk}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{item.recommendation}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function ExecutiveSummary({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <SectionCard eyebrow="Executive View" title="Resumen ejecutivo para dirección" action="MTD vs mes anterior">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {dashboardMetrics.slice(0, 4).map((metric) => (
            <MetricCard key={metric.label} item={metric} />
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            {branchSummary.slice(0, 3).map((branch) => (
              <MiniStat key={branch.name} label={branch.name} value={branch.sales} note={`MTD ${branch.mtd}`} />
            ))}
          </div>
          <div className="rounded-[24px] border border-rose-100 bg-rose-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Alerta principal del día</div>
            <div className="mt-2 font-semibold text-rose-950">Riesgo de ruptura Redken Acidic Bonding en Pedregal.</div>
            <p className="mt-2 text-sm text-rose-800">IA recomienda transferir inventario desde Condesa y generar orden de compra antes de 18:00.</p>
          </div>
          <DataTable
            columns={[
              { key: 'label', label: 'Indicador', tone: 'strong' },
              { key: 'current', label: 'Actual' },
              { key: 'previous', label: 'Anterior' },
              { key: 'delta', label: 'Delta', tone: 'danger' },
            ]}
            rows={monthlyComparison}
          />
        </div>
      </div>
    </SectionCard>
  );
}

function ModulePreview() {
  return (
    <SectionCard eyebrow="Vistas preparadas" title="Sub-vistas premium listas para integración" action="Contratos UI estables">
      <DataTable
        columns={[
          { key: 'module', label: 'Módulo', tone: 'strong' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Estado' },
          { key: 'metric', label: 'Métrica mock' },
        ]}
        rows={modulePreviewData}
      />
    </SectionCard>
  );
}

export default function JldBackendPremiumMockup() {
  const [selectedBranch, setSelectedBranch] = useState('Todas las sucursales');
  const [selectedPeriod, setSelectedPeriod] = useState('Abril 2026 MTD');
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [viewMode, setViewMode] = useState('Dirección');
  const [showExecutivePreview, setShowExecutivePreview] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredBranchSummary = useMemo(() => {
    if (selectedBranch === 'Todas las sucursales') return branchSummary;
    return branchSummary.filter((branch) => branch.name === selectedBranch);
  }, [selectedBranch]);

  function handleSelectModule(item: string) {
    setActiveModule(item);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-slate-50 to-slate-100 text-slate-950">
      <Header activeModule={activeModule} onToggleSidebar={() => setSidebarOpen((value) => !value)} />
      {sidebarOpen ? <button type="button" aria-label="Cerrar navegación" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" /> : null}

      <div className="lg:grid lg:grid-cols-[18rem_1fr]">
        <Sidebar activeModule={activeModule} isOpen={sidebarOpen} onSelect={handleSelectModule} />

        <main className="flex w-full flex-col gap-6 px-4 py-6 lg:px-6">
          <GlobalFilters
            selectedBranch={selectedBranch}
            selectedPeriod={selectedPeriod}
            viewMode={viewMode}
            onBranchChange={setSelectedBranch}
            onPeriodChange={setSelectedPeriod}
            onViewModeChange={setViewMode}
          />

          <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[32px] border border-stone-200 bg-gradient-to-b from-white to-stone-50 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Backend propietario premium</div>
              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                    Pilotage JLD para dirección, ventas, operación e inteligencia aplicada
                  </h1>
                  <p className="mt-4 max-w-4xl text-[15px] leading-8 text-stone-600">
                    Vista mock preparada para datos reales: sucursales, KPIs, productividad, crédito, descuentos, inventario y recomendaciones Hugging Face.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExecutivePreview((value) => !value)}
                  className="rounded-2xl bg-gradient-to-r from-amber-600 to-amber-300 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-700/20"
                >
                  {showExecutivePreview ? 'Ocultar Executive View' : 'Mostrar Executive View'}
                </button>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {dashboardMetrics.map((item) => (
                  <MetricCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 p-7 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200">Lectura ejecutiva</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Decisiones prioritarias</h2>
              <div className="mt-5 grid gap-3">
                <MiniDecision label="Venta MTD" value="$1.84M" note="Presión por ticket alto, volumen estable." />
                <MiniDecision label="Riesgo crédito" value="$58,930" note="4 folios requieren seguimiento." />
                <MiniDecision label="IA recomienda" value="Reabasto" note="34 unidades críticas esta semana." />
              </div>
            </div>
          </section>

          <ExecutiveSummary visible={showExecutivePreview} />

          <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <SectionCard eyebrow="Pilotage multi-sucursal" title="Resumen comparativo sucursales" action={selectedPeriod}>
              <DataTable
                columns={[
                  { key: 'name', label: 'Sucursal', tone: 'strong' },
                  { key: 'sales', label: 'Ventas' },
                  { key: 'tickets', label: 'Tickets' },
                  { key: 'avg', label: 'Ticket prom.' },
                  { key: 'occupancy', label: 'Ocupación' },
                  { key: 'mtd', label: 'MTD' },
                ]}
                rows={filteredBranchSummary}
              />
            </SectionCard>

            <SectionCard eyebrow="Alertes opérationnelles" title="Inventario y consumo interno" action={`${inventoryAlerts.length} alertas activas`}>
              <AlertList alerts={inventoryAlerts} />
            </SectionCard>
          </section>

          <IntelligenceLayer />

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <SectionCard eyebrow="Análisis de ventas" title="Resumen financiero y mix de pago" action="Funnel + tabla exportable">
              <div className="grid gap-4 md:grid-cols-2">
                <MiniStat label="Ingresos totales" value="$305,836.00" note="01-04-2026 → 23-04-2026" />
                <MiniStat label="Tickets emitidos" value="174" note="Polanco filtrado" />
                <MiniStat label="Promedio ticket" value="$1,757.68" note="sin IVA" />
                <MiniStat label="Venta diaria" value="$13,297.22" note="promedio periodo" />
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

            <SectionCard eyebrow="Visual premium" title="Top 10 tipos de servicio" action="Distribución del periodo">
              <FunnelCard items={topServicesData} />
            </SectionCard>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <SectionCard eyebrow="Top colaboradores" title="Productividad individual" className="xl:col-span-1">
              <div className="space-y-3">
                {collaboratorRankingData.slice(0, 4).map((person, index) => (
                  <CollaboratorCard key={person.name} person={person} index={index} />
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Ventas a crédito" title="Créditos otorgados" className="xl:col-span-1">
              <DataTable
                columns={[
                  { key: 'folio', label: 'Folio', tone: 'strong' },
                  { key: 'client', label: 'Cliente' },
                  { key: 'amount', label: 'Importe' },
                  { key: 'due', label: 'Adeudo', tone: 'danger' },
                  { key: 'age', label: 'Antig.' },
                ]}
                rows={creditsData}
              />
            </SectionCard>

            <SectionCard eyebrow="Descuentos otorgados" title="Detalle del periodo" className="xl:col-span-1">
              <div className="space-y-3">
                {discountsData.map((item) => (
                  <div key={`${item.date}-${item.client}`} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">{item.service}</div>
                    <div className="mt-1 text-xs text-stone-500">{item.date} · {item.client}</div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-stone-500">Original {item.original}</span>
                      <span className="font-semibold text-slate-900">Cobrado {item.charged}</span>
                    </div>
                    <div className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{item.type}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </section>

          <SectionCard eyebrow="Mapa funcional" title="Cobertura de módulos reales detectados" action="Análisis · Productividad · Producto · Catálogos">
            <ModuleGrid sections={moduleSectionsData} activeModule={activeModule} onSelect={setActiveModule} />
          </SectionCard>

          <ModulePreview />
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
