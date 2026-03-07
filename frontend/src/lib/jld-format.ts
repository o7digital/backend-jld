export const MXN_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 2,
});

export function formatMxn(value: number): string {
  return MXN_FORMATTER.format(value || 0);
}

export function formatDate(value?: string | null, locale = 'es-MX'): string {
  if (!value) return '—';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function prettifyToken(value: string | null | undefined): string {
  if (!value) return '—';
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function statusBadgeClass(status: string | null | undefined): string {
  const normalized = (status || '').toLowerCase();

  if (normalized === 'active' || normalized === 'paid') {
    return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200';
  }

  if (normalized === 'pending') {
    return 'border-amber-400/25 bg-amber-400/10 text-amber-100';
  }

  if (normalized === 'redeemed') {
    return 'border-cyan-400/25 bg-cyan-400/10 text-cyan-100';
  }

  if (normalized === 'cancelled' || normalized === 'failed' || normalized === 'expired' || normalized === 'refunded') {
    return 'border-rose-400/25 bg-rose-400/10 text-rose-100';
  }

  return 'border-white/10 bg-white/5 text-slate-200';
}
