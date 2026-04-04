import { LineChart, Star, TrendingUp, Users } from 'lucide-react';
import { demoCollaborators, productivityMetrics } from '@/data/jld-demo-data';
import { SectionHeader } from './SectionHeader';

const metricIcons = [LineChart, Star, Users, TrendingUp] as const;

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
      <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400" style={{ width: `${value}%` }} />
    </div>
  );
}

export function ProductivityScreen() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 xl:px-8">
      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 backdrop-blur-xl">
          <SectionHeader title="Top colaboradores" description="Vista ranking premium para direccion y gerencia." />
          <div className="mt-4 space-y-4">
            {demoCollaborators.slice(0, 4).map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-white to-fuchsia-50 p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-orange-400 font-semibold text-white">
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">{item.name}</p>
                    <p className="text-sm text-zinc-500">{item.branch}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-zinc-900">{item.sales}</p>
                  <p className="text-sm text-zinc-500">{item.services} servicios</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-white/70 bg-white/80 p-6 backdrop-blur-xl">
          <SectionHeader title="Panel de rendimiento" description="Metricas visuales y accionables en una sola vista." />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {productivityMetrics.map((item, index) => {
              const Icon = metricIcons[index];
              return (
                <div key={item.title} className="rounded-3xl bg-gradient-to-br from-white to-zinc-50 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">{item.title}</p>
                    <div className={`rounded-2xl bg-gradient-to-br ${item.color} p-2.5 text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-zinc-900">{item.value}%</p>
                  <div className="mt-3">
                    <ProgressBar value={item.value} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
