import {
  Bell,
  Building2,
  Download,
  Eye,
  Filter,
  Palette,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  dashboardKpis,
  demoBranches,
  demoCollaborators,
  demoInventoryAlerts,
  demoModules,
  demoServices,
  smartCatalogCards,
  type BranchName,
} from '@/data/jld-demo-data';
import { KpiCard } from './KpiCard';
import { ModuleTile } from './ModuleTile';
import { SectionHeader } from './SectionHeader';
import { DataTableDemo } from './DataTableDemo';

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
      <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400" style={{ width: `${value}%` }} />
    </div>
  );
}

export function DashboardScreen({
  branch,
  setBranch,
  period,
  setPeriod,
  activeModule,
  setActiveModule,
}: {
  branch: BranchName;
  setBranch: (next: BranchName) => void;
  period: 'Hoy' | 'Semana' | 'Mes actual';
  setPeriod: (next: 'Hoy' | 'Semana' | 'Mes actual') => void;
  activeModule: string;
  setActiveModule: (next: string) => void;
}) {
  const filteredCollaborators = demoCollaborators.filter((item) => branch === 'Bodega' || item.branch === branch);

  return (
    <main className="flex-1">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/65 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 xl:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[24px] bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 text-white shadow-[0_20px_40px_-20px_rgba(236,72,153,0.85)]">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Mockup premium JLD</p>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Dashboard ejecutivo</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[240px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  className="h-11 w-full rounded-2xl border border-white bg-white/90 pl-10 pr-3 text-sm text-zinc-900 shadow-sm"
                  placeholder="Buscar cliente, servicio o producto"
                />
              </div>
              <button className="inline-flex h-11 items-center rounded-2xl border border-white bg-white/80 px-4 text-sm font-medium text-zinc-700">
                <Bell className="mr-2 h-4 w-4" /> Alertas
              </button>
              <button className="inline-flex h-11 items-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 text-sm font-semibold text-white hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Nuevo registro
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {demoBranches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setBranch(item)}
                  className={`inline-flex items-center rounded-2xl border border-white px-4 py-2 text-sm font-medium shadow-sm ${
                    branch === item ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white' : 'bg-white/85 text-zinc-700'
                  }`}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(['Hoy', 'Semana', 'Mes actual'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPeriod(value)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium shadow-sm ${
                    period === value ? 'bg-zinc-900 text-white' : 'bg-white/85 text-zinc-700'
                  }`}
                >
                  {value}
                </button>
              ))}
              <button className="inline-flex items-center rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </button>
              <button className="inline-flex items-center rounded-2xl border border-white bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-4 py-6 sm:px-6 xl:px-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardKpis.map((card) => (
            <KpiCard key={card.title} {...card} />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demoModules.map((module) => (
            <ModuleTile
              key={module.key}
              icon={module.icon}
              label={module.label}
              accent={module.accent}
              surface={module.surface}
              active={activeModule === module.key}
              onClick={() => setActiveModule(module.key)}
            />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(34,197,94,0.2)] backdrop-blur-xl">
            <SectionHeader
              title="Productividad por colaborador"
              description="Lectura clara y visual para recepcion, gerencia y central."
              action={
                <button className="inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                  <Eye className="mr-2 h-4 w-4" /> Ver detalle
                </button>
              }
            />

            <div className="mt-5">
              <DataTableDemo
                headers={['Colaborador', 'Sucursal', 'Servicios', 'Ventas']}
                headerGradient="bg-gradient-to-r from-fuchsia-50 via-white to-cyan-50"
                rows={filteredCollaborators.map((item) => (
                  <div key={item.name} className="grid grid-cols-4 items-center px-4 py-4 text-sm hover:bg-fuchsia-50/40">
                    <div>
                      <p className="font-medium text-zinc-900">{item.name}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Satisfaccion</span>
                        <div className="w-28">
                          <ProgressBar value={item.satisfaction} />
                        </div>
                        <span className="text-xs font-medium text-zinc-700">{item.satisfaction}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{item.branch}</span>
                    </div>
                    <div className="font-medium text-zinc-800">{item.services}</div>
                    <div className="font-semibold text-zinc-900">{item.sales}</div>
                  </div>
                ))}
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(236,72,153,0.28)] backdrop-blur-xl">
            <SectionHeader
              title="Alertas de inventario"
              description="Priorizacion visual real para reaccion inmediata del equipo."
            />
            <div className="mt-5 space-y-4">
              {demoInventoryAlerts.map((item, index) => (
                <div
                  key={item.name}
                  className={`rounded-3xl border border-white/70 bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-rose-50 to-orange-50' : 'from-cyan-50 to-blue-50'
                  } p-4`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-zinc-900">{item.name}</p>
                      <p className="mt-1 text-sm text-zinc-500">Proveedor: {item.supplier}</p>
                    </div>
                    <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">Stock bajo</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-zinc-600">Existencia actual: {item.stock}</span>
                    <span className="font-medium text-zinc-900">Minimo: {item.minimum}</span>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={(item.stock / item.minimum) * 100} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(59,130,246,0.2)] backdrop-blur-xl">
            <SectionHeader title="Servicios mas vendidos" description="Lectura rapida de volumen, margen y sucursal." />
            <div className="mt-5">
              <DataTableDemo
                headers={['Servicio', 'Categoria', 'Sucursal', 'Precio', 'Margen']}
                headerGradient="bg-gradient-to-r from-cyan-50 via-white to-violet-50"
                rows={demoServices.map((item) => (
                  <div key={item.service} className="grid grid-cols-5 items-center px-4 py-4 text-sm hover:bg-cyan-50/30">
                    <div className="font-medium text-zinc-900">{item.service}</div>
                    <div>{item.category}</div>
                    <div>
                      <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">{item.branch}</span>
                    </div>
                    <div className="font-medium">{item.price}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <ProgressBar value={item.margin} />
                      </div>
                      <span className="text-xs font-semibold text-zinc-700">{item.margin}%</span>
                    </div>
                  </div>
                ))}
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(168,85,247,0.24)] backdrop-blur-xl">
            <SectionHeader
              title="Catalogo inteligente"
              description="Tarjetas de lectura ejecutiva para decisiones rapidas."
              action={
                <div className="inline-flex items-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white">
                  <Sparkles className="mr-2 h-4 w-4" /> Demo IA visual
                </div>
              }
            />
            <div className="mt-5 grid gap-4">
              {smartCatalogCards.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/70 bg-gradient-to-r from-white to-zinc-50 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500">{item.subtitle}</p>
                      <p className="mt-1 text-lg font-semibold text-zinc-900">{item.title}</p>
                    </div>
                    <div className={`rounded-2xl bg-gradient-to-r ${item.color} px-3 py-1 text-sm font-semibold text-white`}>{item.trend}</div>
                  </div>
                  <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-r from-fuchsia-50 via-white to-cyan-50 p-4 text-sm text-zinc-700">
              <p className="font-semibold text-zinc-800">Modo demo activo</p>
              <p className="mt-1">Datos ficticios para presentacion comercial. Sin conexion a base real.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
