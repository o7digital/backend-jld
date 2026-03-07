'use client';

import type { JldDataMode } from '@/types/jld';

export function DataModeBadge({ mode, mockLabel, liveLabel }: { mode: JldDataMode; mockLabel: string; liveLabel: string }) {
  const isLive = mode === 'supabase';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
        isLive
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
          : 'border-amber-400/30 bg-amber-400/10 text-amber-100'
      }`}
    >
      {isLive ? liveLabel : mockLabel}
    </span>
  );
}
