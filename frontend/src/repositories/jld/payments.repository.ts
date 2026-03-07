'use client';

import { mapPaymentRow } from './mappers';
import { getMockStore } from './mock-store';
import { normalizeSupabaseError, requireJldDataMode, sortByCreatedDesc } from './shared';
import type { JldPayment } from '@/types/jld';
import type { Database } from '@/types/supabase';

type PaymentRow = Database['public']['Tables']['payments']['Row'];

export async function listPaymentsRepository(): Promise<JldPayment[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client.from('payments').select('*').order('created_at', { ascending: false });
    if (error) throw normalizeSupabaseError('payments', error);
    return ((data || []) as PaymentRow[]).map((row) => mapPaymentRow(row));
  }

  return sortByCreatedDesc(getMockStore().payments);
}
