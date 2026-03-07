'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Guard } from '../../components/Guard';
import { DataModeBadge } from '../../components/jld/DataModeBadge';
import { MetricCard } from '../../components/jld/MetricCard';
import { useI18n } from '../../contexts/I18nContext';
import { getJldCopy } from '../../i18n/jld';
import { formatDate, prettifyToken, statusBadgeClass } from '../../lib/jld-format';
import { getJldDataMode } from '../../repositories/jld';
import { createNewsletterSubscriber, getNewsletterSummary, listNewsletterSubscribers } from '../../services/jld';
import type { JldNewsletterSubscriberInput } from '../../types/jld';

const EMPTY_FORM: JldNewsletterSubscriberInput = {
  email: '',
  firstName: '',
  lastName: '',
  source: 'manual_admin',
  consent: true,
};

export default function NewsletterPage() {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const mode = getJldDataMode();
  const [subscribers, setSubscribers] = useState<Awaited<ReturnType<typeof listNewsletterSubscribers>>>([]);
  const [summary, setSummary] = useState<{ total: number; consented: number; bySource: Array<{ source: string; count: number }> }>({
    total: 0,
    consented: 0,
    bySource: [],
  });
  const [form, setForm] = useState<JldNewsletterSubscriberInput>(EMPTY_FORM);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [nextSubscribers, nextSummary] = await Promise.all([listNewsletterSubscribers(), getNewsletterSummary()]);
    setSubscribers(nextSubscribers);
    setSummary(nextSummary);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await load();
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load newsletter');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [load]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return subscribers.filter((subscriber) =>
      [subscriber.email, subscriber.firstName || '', subscriber.lastName || '', subscriber.source || '']
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [query, subscribers]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (!form.email?.trim()) throw new Error('Email is required');
      await createNewsletterSubscriber(form);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save subscriber');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Guard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.newsletterTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.newsletterTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.newsletterSubtitle}</p>
            </div>
            <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label={copy.newsletterTitle} value={String(summary.total)} />
            <MetricCard label="Consented" value={String(summary.consented)} />
            <MetricCard label={copy.source} value={String(summary.bySource.length)} />
          </div>

          {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <form className="card p-5" onSubmit={handleSubmit}>
              <p className="text-sm text-slate-400">{copy.newsletterTitle}</p>
              <h2 className="mt-1 text-xl font-semibold">{copy.create}</h2>

              <div className="mt-5 space-y-4">
                <label className="block text-sm text-slate-300">
                  {t('field.email')}
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    {copy.firstName}
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                      value={form.firstName || ''}
                      onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    {copy.lastName}
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                      value={form.lastName || ''}
                      onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    />
                  </label>
                </div>
                <label className="block text-sm text-slate-300">
                  {copy.source}
                  <input
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    value={form.source || ''}
                    onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))}
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={Boolean(form.consent)}
                    onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
                  />
                  {copy.newsletterOptIn}
                </label>
              </div>

              <button type="submit" className="btn-primary mt-5 w-full justify-center" disabled={saving}>
                {saving ? t('common.saving') : copy.create}
              </button>
            </form>

            <div className="space-y-6">
              <div className="card p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{copy.newsletterSources}</p>
                    <h2 className="mt-1 text-xl font-semibold">{copy.quickAccess}</h2>
                  </div>
                  <input
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    placeholder={copy.searchPlaceholder}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {loading ? <p className="mt-6 text-sm text-slate-400">{t('common.loading')}</p> : null}
                {!loading && filtered.length === 0 ? <p className="mt-6 text-sm text-slate-400">{copy.noData}</p> : null}

                <div className="mt-5 space-y-3">
                  {filtered.map((subscriber) => (
                    <div key={subscriber.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {[subscriber.firstName, subscriber.lastName].filter(Boolean).join(' ') || subscriber.email}
                            </h3>
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${subscriber.consent ? statusBadgeClass('active') : statusBadgeClass('cancelled')}`}>
                              {subscriber.consent ? copy.active : copy.inactive}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-400">{subscriber.email}</p>
                        </div>
                        <div className="text-right text-sm text-slate-300">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.source}</p>
                          <p className="mt-1 font-semibold">{prettifyToken(subscriber.source)}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-500">{formatDate(subscriber.subscribedAt, language)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <h2 className="text-xl font-semibold">{copy.newsletterSources}</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {summary.bySource.map((item) => (
                    <div key={item.source} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.source}</p>
                      <p className="mt-2 text-lg font-semibold">{prettifyToken(item.source)}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.count} subscribers</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}
