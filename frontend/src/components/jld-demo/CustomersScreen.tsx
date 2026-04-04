import { CheckCircle2, Users } from 'lucide-react';
import { demoCustomers } from '@/data/jld-demo-data';
import { DataTableDemo } from './DataTableDemo';
import { SectionHeader } from './SectionHeader';

export function CustomersScreen() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 xl:px-8">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[34px] border border-white/70 bg-white/80 p-7 shadow-[0_20px_60px_-24px_rgba(236,72,153,0.24)] backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">Cliente destacada</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900">Magda Martinez</h2>
              <p className="mt-2 max-w-xl text-zinc-500">
                Ficha cliente premium con historico, gasto acumulado, nivel y recomendaciones de seguimiento.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white shadow-lg">
              <Users className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { label: 'Visitas', value: '18' },
              { label: 'Gasto total', value: '$24,800' },
              { label: 'Nivel', value: 'VIP' },
              { label: 'Ultima visita', value: '28 Mar' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-gradient-to-r from-white to-fuchsia-50 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-zinc-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(59,130,246,0.2)] backdrop-blur-xl">
          <SectionHeader title="Resumen de perfil" description="Mas elegante y accionable que el historial tradicional." />
          <div className="mt-4 space-y-3">
            {[
              'Color y balayage como servicios dominantes.',
              'Alta recurrencia y ticket premium.',
              'Ideal para campanas de reactivacion VIP.',
              'Vista optimizada para recepcion y gerencia.',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4 text-sm text-zinc-700">
                <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(168,85,247,0.22)] backdrop-blur-xl">
        <SectionHeader title="Listado de clientes" description="Historico visual premium con segmentacion clara." />
        <div className="mt-5">
          <DataTableDemo
            headers={['Cliente', 'Visitas', 'Gasto', 'Ultima visita', 'Nivel']}
            headerGradient="bg-gradient-to-r from-fuchsia-50 via-white to-orange-50"
            rows={demoCustomers.map((item) => (
              <div key={item.name} className="grid grid-cols-5 items-center px-4 py-4 text-sm hover:bg-fuchsia-50/30">
                <div className="font-medium text-zinc-900">{item.name}</div>
                <div>{item.visits}</div>
                <div className="font-medium">{item.spend}</div>
                <div>{item.lastVisit}</div>
                <div>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{item.level}</span>
                </div>
              </div>
            ))}
          />
        </div>
      </div>
    </div>
  );
}
