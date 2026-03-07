'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Guard } from '../components/Guard';
import { DataModeBadge } from '../components/jld/DataModeBadge';
import { MetricCard } from '../components/jld/MetricCard';
import { useI18n } from '../contexts/I18nContext';
import { getJldCopy } from '../i18n/jld';
import { formatDate, formatMxn, prettifyToken, statusBadgeClass } from '../lib/jld-format';
import { getDashboardOverview } from '../services/jld';
import type { JldDashboardOverview } from '../types/jld';

const QUICK_LINKS = [
  { href: '/clients', key: 'clientsTitle' },
  { href: '/gift-cards', key: 'giftCardsTitle' },
  { href: '/payments', key: 'paymentsTitle' },
  { href: '/products', key: 'productsTitle' },
  { href: '/newsletter', key: 'newsletterTitle' },
] as const;

export default function DashboardPage() {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const [data, setData] = useState<JldDashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const next = await getDashboardOverview();
        if (!active) return;
        setData(next);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load dashboard');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Guard>
      <AppShell>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.quickLinksTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.dashboardTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.dashboardSubtitle}</p>
            </div>
            <DataModeBadge
              mode={data?.dataMode || 'mock'}
              mockLabel={copy.dataModeMock}
              liveLabel={copy.dataModeSupabase}
            />
          </div>

          {loading ? <div className="text-slate-300">{t('common.loading')}</div> : null}
          {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

          {data ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <MetricCard label={copy.clientsTitle} value={String(data.stats.customers)} hint="Customers table ready" />
                <MetricCard label={copy.giftCardsTitle} value={String(data.stats.activeGiftCards)} hint="Active cards" />
                <MetricCard label={copy.paymentsTitle} value={String(data.stats.pendingPayments)} hint="Pending status" />
                <MetricCard label={copy.productsTitle} value={String(data.stats.activeProducts)} hint="Active catalog items" />
                <MetricCard
                  label={copy.newsletterTitle}
                  value={String(data.stats.newsletterSubscribers)}
                  hint="Subscribers with source tracking"
                />
                <MetricCard
                  label="Revenue / Liability"
                  value={`${formatMxn(data.stats.grossRevenueMxn)} / ${formatMxn(data.stats.giftCardLiabilityMxn)}`}
                  hint="Paid revenue vs active gift card exposure"
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-5">
                {QUICK_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="card p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/20">
                    <p className="text-sm text-slate-400">{copy.quickAccess}</p>
                    <h2 className="mt-3 text-xl font-semibold">{copy[item.key]}</h2>
                    <p className="mt-6 text-sm text-cyan-300">{copy.manage}</p>
                  </Link>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-3">
                <section className="card p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{copy.recentCustomers}</h2>
                    <Link href="/clients" className="text-sm text-cyan-300">
                      {copy.manage}
                    </Link>
                  </div>
                  <div className="mt-4 space-y-3">
                    {data.recentCustomers.map((customer) => (
                      <div key={customer.id} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold">{customer.fullName}</p>
                            <p className="text-sm text-slate-400">{customer.email}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${customer.newsletterOptIn ? statusBadgeClass('active') : statusBadgeClass('cancelled')}`}>
                            {customer.newsletterOptIn ? copy.active : copy.inactive}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{formatDate(customer.createdAt, language)}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="card p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{copy.recentGiftCards}</h2>
                    <Link href="/gift-cards" className="text-sm text-cyan-300">
                      {copy.manage}
                    </Link>
                  </div>
                  <div className="mt-4 space-y-3">
                    {data.recentGiftCards.map((giftCard) => (
                      <div key={giftCard.id} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold">{giftCard.code}</p>
                            <p className="text-sm text-slate-400">{giftCard.customerEmail}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadgeClass(giftCard.status)}`}>
                            {prettifyToken(giftCard.status)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{formatMxn(giftCard.amountMxn)}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="card p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{copy.recentPayments}</h2>
                    <Link href="/payments" className="text-sm text-cyan-300">
                      {copy.manage}
                    </Link>
                  </div>
                  <div className="mt-4 space-y-3">
                    {data.recentPayments.map((payment) => (
                      <div key={payment.id} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold">{formatMxn(payment.amountMxn)}</p>
                            <p className="text-sm text-slate-400">{prettifyToken(payment.provider)}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadgeClass(payment.paymentStatus)}`}>
                            {prettifyToken(payment.paymentStatus)}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">{formatDate(payment.createdAt, language)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <section className="card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{copy.newsletterSources}</h2>
                  <Link href="/newsletter" className="text-sm text-cyan-300">
                    {copy.manage}
                  </Link>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {data.newsletterBreakdown.map((item) => (
                    <div key={item.source} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.source}</p>
                      <p className="mt-2 text-lg font-semibold">{prettifyToken(item.source)}</p>
                      <p className="mt-3 text-sm text-slate-400">{item.count} subscribers</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </AppShell>
    </Guard>
  );
}
