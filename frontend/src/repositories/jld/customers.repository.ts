'use client';

import { mapCustomerRow } from './mappers';
import { createEntityId, normalizeSupabaseError, requireJldDataMode, sortByCreatedDesc } from './shared';
import { getMockStore, saveMockStore } from './mock-store';
import type { JldCustomer, JldCustomerInput } from '@/types/jld';
import type { Database } from '@/types/supabase';

type CustomerRow = Database['public']['Tables']['customers']['Row'];

function mapInputToCustomer(input: JldCustomerInput, existing?: JldCustomer): JldCustomer {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();
  const now = new Date().toISOString();

  return {
    id: existing?.id || createEntityId('customer'),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    email,
    phone: input.phone?.trim() || null,
    notes: input.notes?.trim() || null,
    newsletterOptIn: input.newsletterOptIn ?? existing?.newsletterOptIn ?? false,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export async function listCustomersRepository(): Promise<JldCustomer[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client.from('customers').select('*').order('created_at', { ascending: false });
    if (error) throw normalizeSupabaseError('customers', error);
    return ((data || []) as CustomerRow[]).map((row) => mapCustomerRow(row));
  }

  return sortByCreatedDesc(getMockStore().customers);
}

export async function getCustomerRepository(id: string): Promise<JldCustomer | null> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client.from('customers').select('*').eq('id', id).maybeSingle();
    if (error) throw normalizeSupabaseError('customer', error);
    return data ? mapCustomerRow(data as CustomerRow) : null;
  }

  return getMockStore().customers.find((customer) => customer.id === id) || null;
}

export async function createCustomerRepository(input: JldCustomerInput): Promise<JldCustomer> {
  const next = mapInputToCustomer(input);
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('customers')
      .insert({
        first_name: next.firstName,
        last_name: next.lastName,
        full_name: next.fullName,
        email: next.email,
        phone: next.phone,
        notes: next.notes,
        newsletter_opt_in: next.newsletterOptIn,
      })
      .select('*')
      .single();

    if (error) throw normalizeSupabaseError('customer creation', error);
    return mapCustomerRow(data as CustomerRow);
  }

  const store = getMockStore();
  store.customers.unshift(next);
  saveMockStore(store);
  return next;
}

export async function updateCustomerRepository(id: string, input: JldCustomerInput): Promise<JldCustomer> {
  const existing = await getCustomerRepository(id);
  if (!existing) throw new Error('Customer not found');

  const next = mapInputToCustomer(input, existing);
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('customers')
      .update({
        first_name: next.firstName,
        last_name: next.lastName,
        full_name: next.fullName,
        email: next.email,
        phone: next.phone,
        notes: next.notes,
        newsletter_opt_in: next.newsletterOptIn,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw normalizeSupabaseError('customer update', error);
    return mapCustomerRow(data as CustomerRow);
  }

  const store = getMockStore();
  store.customers = store.customers.map((customer) => (customer.id === id ? next : customer));
  saveMockStore(store);
  return next;
}

export async function deleteCustomerRepository(id: string): Promise<void> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { error } = await client.from('customers').delete().eq('id', id);
    if (error) throw normalizeSupabaseError('customer deletion', error);
    return;
  }

  const store = getMockStore();
  const customer = store.customers.find((entry) => entry.id === id);
  store.customers = store.customers.filter((entry) => entry.id !== id);
  store.giftCards = store.giftCards.map((giftCard) =>
    giftCard.customerId === id
      ? {
          ...giftCard,
          customerId: null,
          customerEmail: customer?.email || giftCard.customerEmail,
          updatedAt: new Date().toISOString(),
        }
      : giftCard,
  );
  store.payments = store.payments.map((payment) =>
    payment.customerId === id
      ? {
          ...payment,
          customerId: null,
          updatedAt: new Date().toISOString(),
        }
      : payment,
  );
  saveMockStore(store);
}
