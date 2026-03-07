'use client';

import { mapNewsletterRow } from './mappers';
import { getMockStore, saveMockStore } from './mock-store';
import { createEntityId, normalizeSupabaseError, requireJldDataMode, sortByCreatedDesc } from './shared';
import type { JldNewsletterSubscriber, JldNewsletterSubscriberInput } from '@/types/jld';
import type { Database } from '@/types/supabase';

type NewsletterRow = Database['public']['Tables']['newsletter_subscribers']['Row'];

function mapInputToSubscriber(
  input: JldNewsletterSubscriberInput,
  existing?: JldNewsletterSubscriber,
): JldNewsletterSubscriber {
  const now = new Date().toISOString();
  return {
    id: existing?.id || createEntityId('newsletter'),
    email: input.email.trim().toLowerCase(),
    firstName: input.firstName?.trim() || null,
    lastName: input.lastName?.trim() || null,
    source: input.source?.trim() || 'manual_admin',
    consent: input.consent ?? existing?.consent ?? true,
    subscribedAt: existing?.subscribedAt || now,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export async function listNewsletterSubscribersRepository(): Promise<JldNewsletterSubscriber[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    if (error) throw normalizeSupabaseError('newsletter subscribers', error);
    return ((data || []) as NewsletterRow[]).map((row) => mapNewsletterRow(row));
  }

  return sortByCreatedDesc(getMockStore().newsletterSubscribers);
}

export async function createNewsletterSubscriberRepository(
  input: JldNewsletterSubscriberInput,
): Promise<JldNewsletterSubscriber> {
  const next = mapInputToSubscriber(input);
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('newsletter_subscribers')
      .insert({
        email: next.email,
        first_name: next.firstName,
        last_name: next.lastName,
        source: next.source,
        consent: next.consent,
        subscribed_at: next.subscribedAt,
      })
      .select('*')
      .single();

    if (error) throw normalizeSupabaseError('newsletter subscriber creation', error);
    return mapNewsletterRow(data as NewsletterRow);
  }

  const store = getMockStore();
  store.newsletterSubscribers.unshift(next);
  saveMockStore(store);
  return next;
}
