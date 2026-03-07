'use client';

import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Guard } from '../../components/Guard';
import { DataModeBadge } from '../../components/jld/DataModeBadge';
import { MetricCard } from '../../components/jld/MetricCard';
import { useI18n } from '../../contexts/I18nContext';
import { getJldCopy } from '../../i18n/jld';
import { formatDate, formatMxn, prettifyToken, statusBadgeClass } from '../../lib/jld-format';
import { getJldDataMode } from '../../repositories/jld';
import { listCustomers, listGiftCards, getGiftCardSummary } from '../../services/jld';
import type { JldCustomer } from '../../types/jld';
import type { GiftCardWithBalance } from '../../services/jld/gift-cards.service';

export default function GiftCardsPage() {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const mode = getJldDataMode();
  const [giftCards, setGiftCards] = useState<GiftCardWithBalance[]>([]);
  const [customers, setCustomers] = useState<JldCustomer[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    redeemed: 0,
    totalIssuedMxn: 0,
    remainingLiabilityMxn: 0,
  });
  const [status, setStatus] = useState<'all' | GiftCardWithBalance['status']>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [nextGiftCards, nextCustomers, nextSummary] = await Promise.all([
          listGiftCards(),
          listCustomers(),
          getGiftCardSummary(),
        ]);
        if (!active) return;
        setGiftCards(nextGiftCards);
        setCustomers(nextCustomers);
        setSummary(nextSummary);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load gift cards');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const customersById = useMemo(() => new Map(customers.map((customer) => [customer.id, customer])), [customers]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return giftCards.filter((giftCard) => {
      const matchesStatus = status === 'all' || giftCard.status === status;
      const customer = giftCard.customerId ? customersById.get(giftCard.customerId) : null;
      const haystack = [
        giftCard.code,
        giftCard.customerEmail,
        giftCard.recipientName || '',
        customer?.fullName || '',
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalized || haystack.includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [customersById, giftCards, query, status]);

  return (
    <Guard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.giftCardsTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.giftCardsTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.giftCardsSubtitle}</p>
            </div>
            <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
          </div>

          <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-5">
            <MetricCard label={copy.giftCardsTitle} value={String(summary.total)} />
            <MetricCard label={copy.active} value={String(summary.active)} />
            <MetricCard label="Redeemed" value={String(summary.redeemed)} />
            <MetricCard label="Issued" value={formatMxn(summary.totalIssuedMxn)} />
            <MetricCard label={copy.remainingBalance} value={formatMxn(summary.remainingLiabilityMxn)} />
          </div>

          {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

          <div className="card p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-slate-400">{copy.quickAccess}</p>
                <h2 className="mt-1 text-xl font-semibold">{copy.giftCardsTitle}</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                  placeholder={copy.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <select
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as 'all' | GiftCardWithBalance['status'])}
                >
                  <option value="all">{copy.allStatuses}</option>
                  <option value="active">Active</option>
                  <option value="redeemed">Redeemed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            {loading ? <p className="mt-6 text-sm text-slate-400">{t('common.loading')}</p> : null}
            {!loading && filtered.length === 0 ? <p className="mt-6 text-sm text-slate-400">{copy.noData}</p> : null}

            <div className="mt-5 space-y-3">
              {filtered.map((giftCard) => {
                const customer = giftCard.customerId ? customersById.get(giftCard.customerId) : null;

                return (
                  <div key={giftCard.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{giftCard.code}</h3>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadgeClass(giftCard.status)}`}>
                            {prettifyToken(giftCard.status)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">{customer?.fullName || giftCard.customerEmail}</p>
                        <p className="mt-2 text-sm text-slate-300">{copy.recipient}: {giftCard.recipientName || '—'}</p>
                        {giftCard.message ? <p className="mt-3 max-w-2xl text-sm text-slate-400">{giftCard.message}</p> : null}
                      </div>

                      <div className="grid gap-3 text-right text-sm text-slate-300">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.amountMxn}</p>
                          <p className="mt-1 font-semibold">{formatMxn(giftCard.amountMxn)}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.remainingBalance}</p>
                          <p className="mt-1 font-semibold">{formatMxn(giftCard.remainingAmountMxn)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-4">
                      <InfoCell label={copy.customerEmail} value={giftCard.customerEmail} />
                      <InfoCell label={copy.paidAt} value={formatDate(giftCard.purchasedAt, language)} />
                      <InfoCell label="Expires" value={formatDate(giftCard.expiresAt, language)} />
                      <InfoCell label="QR" value={giftCard.qrValue || 'Pending phase 2'} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
