'use client';

import { mapGiftCardRow } from './mappers';
import { getMockStore } from './mock-store';
import { normalizeSupabaseError, requireJldDataMode, sortByCreatedDesc } from './shared';
import type { JldGiftCard } from '@/types/jld';
import type { Database } from '@/types/supabase';

type GiftCardRow = Database['public']['Tables']['gift_cards']['Row'];

export async function listGiftCardsRepository(): Promise<JldGiftCard[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client.from('gift_cards').select('*').order('created_at', { ascending: false });
    if (error) throw normalizeSupabaseError('gift cards', error);
    return ((data || []) as GiftCardRow[]).map((row) => mapGiftCardRow(row));
  }

  return sortByCreatedDesc(getMockStore().giftCards);
}
