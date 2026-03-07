'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { getJldCopy } from '@/i18n/jld';
import { formatMxn, prettifyToken, statusBadgeClass } from '@/lib/jld-format';
import { getJldDataMode } from '@/repositories/jld';
import { createProduct, deleteProduct, getProductsSummary, listProducts, updateProduct } from '@/services/jld';
import type { JldProduct, JldProductInput } from '@/types/jld';
import { DataModeBadge } from './DataModeBadge';
import { MetricCard } from './MetricCard';

const PRODUCT_TYPES: JldProductInput['productType'][] = ['gift_card', 'retail_product', 'service'];

const EMPTY_FORM: JldProductInput = {
  name: '',
  slug: '',
  description: '',
  productType: 'gift_card',
  priceMxn: 500,
  active: true,
  imageUrl: '',
};

export function JldProductsManager({
  heading,
  subtitle,
  backHref,
}: {
  heading: string;
  subtitle: string;
  backHref?: string;
}) {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const [products, setProducts] = useState<JldProduct[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    giftCards: 0,
    services: 0,
    retail: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | JldProduct['productType']>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JldProductInput>(EMPTY_FORM);

  const mode = getJldDataMode();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextProducts, nextSummary] = await Promise.all([listProducts(), getProductsSummary()]);
      setProducts(nextProducts);
      setSummary(nextSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesType = typeFilter === 'all' || product.productType === typeFilter;
      const haystack = [product.name, product.slug, product.description || ''].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [products, query, typeFilter]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!form.name.trim()) throw new Error('Product name is required');
      if (form.priceMxn < 0) throw new Error('Price must be greater than or equal to zero');

      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }

      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save product');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (product: JldProduct) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      productType: product.productType,
      priceMxn: product.priceMxn,
      active: product.active,
      imageUrl: product.imageUrl || '',
    });
  };

  const handleDelete = async (product: JldProduct) => {
    const ok = typeof window === 'undefined' ? true : window.confirm(copy.deleteConfirmProduct);
    if (!ok) return;

    setSaving(true);
    setError(null);
    try {
      await deleteProduct(product.id);
      if (editingId === product.id) resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.productsTitle}</p>
          <h1 className="mt-2 text-3xl font-semibold">{heading}</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {backHref ? (
            <Link href={backHref} className="btn-secondary text-sm">
              {t('common.back')}
            </Link>
          ) : null}
          <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label={copy.productsTitle} value={String(summary.total)} />
        <MetricCard label={copy.active} value={String(summary.active)} />
        <MetricCard label="Gift Cards" value={String(summary.giftCards)} />
        <MetricCard label="Services / Retail" value={`${summary.services} / ${summary.retail}`} />
      </div>

      {error ? <div className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <form className="card p-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{editingId ? copy.editProduct : copy.addProduct}</p>
              <h2 className="mt-1 text-xl font-semibold">{editingId ? copy.saveChanges : copy.create}</h2>
            </div>
            {editingId ? (
              <button type="button" className="btn-secondary text-sm" onClick={resetForm}>
                {t('common.cancel')}
              </button>
            ) : null}
          </div>

          <div className="mt-5 space-y-4">
            <label className="block text-sm text-slate-300">
              {t('field.name')}
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </label>

            <label className="block text-sm text-slate-300">
              Slug
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                value={form.slug || ''}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                placeholder="gift-card-1000-mxn"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-slate-300">
                {copy.productType}
                <select
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                  value={form.productType}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, productType: event.target.value as JldProduct['productType'] }))
                  }
                >
                  {PRODUCT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {prettifyToken(type)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-slate-300">
                {copy.amountMxn}
                <input
                  type="number"
                  min={0}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                  value={form.priceMxn}
                  onChange={(event) => setForm((prev) => ({ ...prev, priceMxn: Number(event.target.value) }))}
                />
              </label>
            </div>

            <label className="block text-sm text-slate-300">
              Image URL
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                value={form.imageUrl || ''}
                onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
                placeholder="/tarjeta2.png"
              />
            </label>

            <label className="block text-sm text-slate-300">
              {t('field.notes')}
              <textarea
                className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                value={form.description || ''}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={Boolean(form.active)}
                onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))}
              />
              {copy.active}
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
              <h2 className="mt-1 text-xl font-semibold">{copy.productsTitle}</h2>
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
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as 'all' | JldProduct['productType'])}
              >
                <option value="all">{copy.allTypes}</option>
                {PRODUCT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {prettifyToken(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? <p className="mt-6 text-sm text-slate-400">{t('common.loading')}</p> : null}
          {!loading && filtered.length === 0 ? <p className="mt-6 text-sm text-slate-400">{copy.noData}</p> : null}

          <div className="mt-5 space-y-3">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.045]"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${product.active ? statusBadgeClass('active') : statusBadgeClass('cancelled')}`}>
                        {product.active ? copy.active : copy.inactive}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{product.slug}</p>
                    {product.description ? <p className="mt-3 max-w-2xl text-sm text-slate-300">{product.description}</p> : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn-secondary text-sm" onClick={() => startEdit(product)}>
                      {copy.editProduct}
                    </button>
                    <button type="button" className="btn-secondary text-sm" onClick={() => handleDelete(product)}>
                      {t('common.delete')}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                  <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.productType}</p>
                    <p className="mt-2 font-semibold">{prettifyToken(product.productType)}</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{copy.amountMxn}</p>
                    <p className="mt-2 font-semibold">{formatMxn(product.priceMxn)}</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/10 px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Image</p>
                    <p className="mt-2 font-semibold">{product.imageUrl || '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
