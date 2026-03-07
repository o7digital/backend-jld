'use client';

import Link from 'next/link';
import { AppShell } from '../../components/AppShell';
import { Guard } from '../../components/Guard';
import { DataModeBadge } from '../../components/jld/DataModeBadge';
import { MetricCard } from '../../components/jld/MetricCard';
import { useI18n } from '../../contexts/I18nContext';
import { getJldCopy } from '../../i18n/jld';
import { getOperationsAreas } from '../../lib/jld-operations';
import { getJldDataMode } from '../../repositories/jld';

export default function OperacionesPage() {
  const { language } = useI18n();
  const copy = getJldCopy(language);
  const areas = getOperationsAreas(language);
  const mode = getJldDataMode();

  return (
    <Guard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.operationsTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.operationsTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.operationsSubtitle}</p>
            </div>
            <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label={copy.operationsSummaryTeams} value={String(areas.length)} />
            <MetricCard label={copy.operationsSummaryUnits} value="Salon Ops" />
            <MetricCard label={copy.operationsSummaryStatus} value={copy.operationsSummaryStatusValue} />
          </div>

          <section className="card p-5">
            <div className="max-w-3xl">
              <p className="text-sm text-slate-400">{copy.operationsBoardTitle}</p>
              <h2 className="mt-1 text-2xl font-semibold">{copy.operationsBoardTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{copy.operationsBoardSubtitle}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/operaciones/${area.slug}`}
                  className="group rounded-[22px] border border-white/8 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.045]"
                >
                  <div className={`rounded-2xl bg-gradient-to-br ${area.accent} p-[1px]`}>
                    <div className="rounded-[15px] bg-[rgba(10,15,30,0.86)] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.operationsTitle}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-100">{area.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-400">{area.description}</p>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                    <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.focusLabel}</p>
                      <p className="mt-2 font-semibold">{area.focusValue}</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.cadenceLabel}</p>
                      <p className="mt-2 font-semibold">{area.cadenceValue}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200">
                    {copy.operationsAction}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </AppShell>
    </Guard>
  );
}
