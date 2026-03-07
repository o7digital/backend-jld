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
import { listCustomers, listPayments, listProducts, getPaymentsSummary } from '../../services/jld';
import type { JldCustomer, JldPayment, JldProduct } from '../../types/jld';

export default function PaymentsPage() {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const mode = getJldDataMode();
  const [payments, setPayments] = useState<JldPayment[]>([]);
  const [customers, setCustomers] = useState<JldCustomer[]>([]);
  const [products, setProducts] = useState<JldProduct[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    paid: 0,
    failed: 0,
    totalPaidMxn: 0,
  });
  const [status, setStatus] = useState<'all' | JldPayment['paymentStatus']>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [nextPayments, nextCustomers, nextProducts, nextSummary] = await Promise.all([
          listPayments(),
          listCustomers(),
          listProducts(),
          getPaymentsSummary(),
        ]);
        if (!active) return;
        setPayments(nextPayments);
        setCustomers(nextCustomers);
        setProducts(nextProducts);
        setSummary(nextSummary);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load payments');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const customersById = useMemo(() => new Map(customers.map((customer) => [customer.id, customer])), [customers]);
  const productsById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return payments.filter((payment) => {
      const matchesStatus = status === 'all' || payment.paymentStatus === status;
      const customer = payment.customerId ? customersById.get(payment.customerId) : null;
      const product = payment.productId ? productsById.get(payment.productId) : null;
      const haystack = [
        customer?.fullName || '',
        customer?.email || '',
        payment.provider,
        payment.providerReference || '',
        product?.name || '',
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalized || haystack.includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [customersById, payments, productsById, query, status]);

  return (
    <Guard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.paymentsTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.paymentsTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.paymentsSubtitle}</p>
            </div>
            <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
          </div>

          <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-5">
            <MetricCard label={copy.paymentsTitle} value={String(summary.total)} />
            <MetricCard label="Paid" value={String(summary.paid)} />
            <MetricCard label="Pending" value={String(summary.pending)} />
            <MetricCard label="Failed" value={String(summary.failed)} />
            <MetricCard label="Paid volume" value={formatMxn(summary.totalPaidMxn)} />
          </div>

          {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

          <div className="card p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-slate-400">{copy.quickAccess}</p>
                <h2 className="mt-1 text-xl font-semibold">{copy.paymentsTitle}</h2>
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
                  onChange={(event) => setStatus(event.target.value as 'all' | JldPayment['paymentStatus'])}
                >
                  <option value="all">{copy.allStatuses}</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>

            {loading ? <p className="mt-6 text-sm text-slate-400">{t('common.loading')}</p> : null}
            {!loading && filtered.length === 0 ? <p className="mt-6 text-sm text-slate-400">{copy.noData}</p> : null}

            <div className="mt-5 space-y-3">
              {filtered.map((payment) => {
                const customer = payment.customerId ? customersById.get(payment.customerId) : null;
                const product = payment.productId ? productsById.get(payment.productId) : null;

                return (
                  <div key={payment.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{formatMxn(payment.amountMxn)}</h3>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusBadgeClass(payment.paymentStatus)}`}>
                            {prettifyToken(payment.paymentStatus)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">{customer?.fullName || 'Unassigned customer'}</p>
                        <p className="mt-2 text-sm text-slate-300">{product?.name || 'No product linked'}</p>
                      </div>

                      <div className="text-right text-sm text-slate-300">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.provider}</p>
                        <p className="mt-1 font-semibold">{prettifyToken(payment.provider)}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">Reference</p>
                        <p className="mt-1 font-semibold">{payment.providerReference || 'Pending phase 2'}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                      <InfoCell label={copy.customerEmail} value={customer?.email || '—'} />
                      <InfoCell label={copy.paidAt} value={formatDate(payment.paidAt || payment.createdAt, language)} />
                      <InfoCell label={copy.status} value={prettifyToken(payment.paymentStatus)} />
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
