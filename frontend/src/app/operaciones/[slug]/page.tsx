'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { Guard } from '../../../components/Guard';
import { DataModeBadge } from '../../../components/jld/DataModeBadge';
import { MetricCard } from '../../../components/jld/MetricCard';
import { useI18n } from '../../../contexts/I18nContext';
import { getJldCopy } from '../../../i18n/jld';
import { getOperationsArea } from '../../../lib/jld-operations';
import { getJldDataMode } from '../../../repositories/jld';

export default function OperacionesDetailPage() {
  const { language } = useI18n();
  const copy = getJldCopy(language);
  const params = useParams<{ slug: string }>();
  const area = getOperationsArea(language, params.slug);
  const mode = getJldDataMode();

  return (
    <Guard>
      <AppShell>
        {!area ? (
          <div className="card p-6">
            <p className="text-sm text-slate-400">{copy.operationsTitle}</p>
            <h1 className="mt-2 text-2xl font-semibold">Area not found</h1>
            <Link href="/operaciones" className="btn-secondary mt-5 inline-flex text-sm">
              {copy.operationsDetailBack}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.operationsDetailTitle}</p>
                <h1 className="mt-2 text-3xl font-semibold">{area.title}</h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.operationsDetailSubtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/operaciones" className="btn-secondary text-sm">
                  {copy.operationsDetailBack}
                </Link>
                <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard label={area.focusLabel} value={area.focusValue} />
              <MetricCard label={area.cadenceLabel} value={area.cadenceValue} />
              <MetricCard label={copy.operationsSummaryStatus} value={copy.operationsSummaryStatusValue} />
            </div>

            <section className="card p-6">
              <div className={`rounded-[24px] bg-gradient-to-br ${area.accent} p-[1px]`}>
                <div className="rounded-[23px] bg-[rgba(10,15,30,0.92)] p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.operationsTitle}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{area.title}</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">{area.description}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.focusLabel}</p>
                  <p className="mt-3 text-xl font-semibold">{area.focusValue}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    Estructura lista para conectar inventario, planning o seguimiento operativo en una siguiente fase.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.cadenceLabel}</p>
                  <p className="mt-3 text-xl font-semibold">{area.cadenceValue}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    Placeholder premium pensado para futuras vistas por turno, tarea, responsable o abastecimiento.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.operationsSummaryStatus}</p>
                  <p className="mt-3 text-xl font-semibold">{copy.operationsSummaryStatusValue}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    Sin logica pesada por ahora: solo la base visual y la estructura de modulo lista para extender.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </AppShell>
    </Guard>
  );
}
