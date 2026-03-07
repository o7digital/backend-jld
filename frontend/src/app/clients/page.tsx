'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Guard } from '../../components/Guard';
import { DataModeBadge } from '../../components/jld/DataModeBadge';
import { MetricCard } from '../../components/jld/MetricCard';
import { useI18n } from '../../contexts/I18nContext';
import { getJldCopy } from '../../i18n/jld';
import { formatDate } from '../../lib/jld-format';
import { getJldDataMode } from '../../repositories/jld';
import { createCustomer, deleteCustomer, exportCustomersCsv, listCustomers, updateCustomer } from '../../services/jld';
import type { JldCustomer, JldCustomerInput } from '../../types/jld';

const EMPTY_FORM: JldCustomerInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
  newsletterOptIn: false,
};

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url);
}

export default function ClientsPage() {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const mode = getJldDataMode();
  const [customers, setCustomers] = useState<JldCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JldCustomerInput>(EMPTY_FORM);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCustomers(await listCustomers());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load customers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;

    return customers.filter((customer) =>
      [customer.fullName, customer.email, customer.phone || '', customer.notes || ''].join(' ').toLowerCase().includes(query),
    );
  }, [customers, search]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!form.firstName?.trim() || !form.lastName?.trim() || !form.email?.trim()) {
        throw new Error('First name, last name and email are required');
      }

      if (editingId) {
        await updateCustomer(editingId, form);
      } else {
        await createCustomer(form);
      }

      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save customer');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (customer: JldCustomer) => {
    setEditingId(customer.id);
    setForm({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || '',
      notes: customer.notes || '',
      newsletterOptIn: customer.newsletterOptIn,
    });
  };

  const handleDelete = async (customer: JldCustomer) => {
    const ok = typeof window === 'undefined' ? true : window.confirm(copy.deleteConfirmCustomer);
    if (!ok) return;

    setSaving(true);
    setError(null);
    try {
      await deleteCustomer(customer.id);
      if (editingId === customer.id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete customer');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      const csv = await exportCustomersCsv();
      downloadCsv(csv, `jld-customers-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to export customers');
    }
  };

  const newsletterOptIns = customers.filter((customer) => customer.newsletterOptIn).length;

  return (
    <Guard>
      <AppShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.clientsTitle}</p>
              <h1 className="mt-2 text-3xl font-semibold">{copy.clientsTitle}</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">{copy.clientsSubtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="btn-secondary text-sm" onClick={handleExport}>
                {t('clients.exportCsv')}
              </button>
              <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label={copy.clientsTitle} value={String(customers.length)} />
            <MetricCard label={copy.newsletterOptIn} value={String(newsletterOptIns)} />
            <MetricCard label={copy.dataModeSupabase} value={mode === 'supabase' ? 'ON' : 'OFF'} />
          </div>

          {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <form className="card p-5" onSubmit={handleSubmit}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{editingId ? copy.editCustomer : copy.addCustomer}</p>
                  <h2 className="mt-1 text-xl font-semibold">{editingId ? copy.saveChanges : copy.create}</h2>
                </div>
                {editingId ? (
                  <button type="button" className="btn-secondary text-sm" onClick={resetForm}>
                    {t('common.cancel')}
                  </button>
                ) : null}
              </div>

              <div className="mt-5 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    {copy.firstName}
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                      value={form.firstName}
                      onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    {copy.lastName}
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                      value={form.lastName}
                      onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                    />
                  </label>
                </div>

                <label className="block text-sm text-slate-300">
                  {t('field.email')}
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  {t('field.phone')}
                  <input
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    value={form.phone || ''}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  {t('field.notes')}
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                    value={form.notes || ''}
                    onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  />
                </label>

                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={Boolean(form.newsletterOptIn)}
                    onChange={(event) => setForm((prev) => ({ ...prev, newsletterOptIn: event.target.checked }))}
                  />
                  {copy.newsletterOptIn}
                </label>
              </div>

              <button type="submit" className="btn-primary mt-5 w-full justify-center" disabled={saving}>
                {saving ? t('common.saving') : editingId ? copy.saveChanges : copy.create}
              </button>
            </form>

            <div className="card p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-slate-400">{copy.quickAccess}</p>
                  <h2 className="mt-1 text-xl font-semibold">{copy.clientsTitle}</h2>
                </div>
                <input
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                  placeholder={copy.searchPlaceholder}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              {loading ? <p className="mt-6 text-sm text-slate-400">{t('common.loading')}</p> : null}
              {!loading && filteredCustomers.length === 0 ? <p className="mt-6 text-sm text-slate-400">{copy.noData}</p> : null}

              <div className="mt-5 space-y-3">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.045]"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{customer.fullName}</h3>
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${customer.newsletterOptIn ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-slate-300'}`}>
                            {customer.newsletterOptIn ? copy.active : copy.inactive}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">{customer.email}</p>
                        <p className="mt-2 text-sm text-slate-300">{customer.phone || '—'}</p>
                        {customer.notes ? <p className="mt-3 max-w-2xl text-sm text-slate-400">{customer.notes}</p> : null}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn-secondary text-sm" onClick={() => startEdit(customer)}>
                          {copy.editCustomer}
                        </button>
                        <button type="button" className="btn-secondary text-sm" onClick={() => handleDelete(customer)}>
                          {t('common.delete')}
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-500">{formatDate(customer.createdAt, language)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}
