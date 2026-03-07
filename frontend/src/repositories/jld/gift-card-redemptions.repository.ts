'use client';

import { mapRedemptionRow } from './mappers';
import { getMockStore } from './mock-store';
import { normalizeSupabaseError, requireJldDataMode } from './shared';
import type { JldGiftCardRedemption } from '@/types/jld';
import type { Database } from '@/types/supabase';

type RedemptionRow = Database['public']['Tables']['gift_card_redemptions']['Row'];

export async function listGiftCardRedemptionsRepository(): Promise<JldGiftCardRedemption[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('gift_card_redemptions')
      .select('*')
      .order('redeemed_at', { ascending: false });
    if (error) throw normalizeSupabaseError('gift card redemptions', error);
    return ((data || []) as RedemptionRow[]).map((row) => mapRedemptionRow(row));
  }

  return [...getMockStore().giftCardRedemptions].sort((a, b) => +new Date(b.redeemedAt) - +new Date(a.redeemedAt));
}
