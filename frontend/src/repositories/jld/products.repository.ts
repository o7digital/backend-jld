'use client';

import { mapProductRow } from './mappers';
import { getMockStore, saveMockStore } from './mock-store';
import { createEntityId, normalizeSupabaseError, requireJldDataMode, slugify, sortByCreatedDesc } from './shared';
import type { JldProduct, JldProductInput } from '@/types/jld';
import type { Database } from '@/types/supabase';

type ProductRow = Database['public']['Tables']['products']['Row'];

function ensureUniqueSlug(base: string, products: JldProduct[], currentId?: string): string {
  const normalized = slugify(base) || 'product';
  const existingSlugs = new Set(
    products.filter((product) => product.id !== currentId).map((product) => product.slug.toLowerCase()),
  );
  if (!existingSlugs.has(normalized)) return normalized;

  let suffix = 2;
  while (existingSlugs.has(`${normalized}-${suffix}`)) suffix += 1;
  return `${normalized}-${suffix}`;
}

function mapInputToProduct(input: JldProductInput, products: JldProduct[], existing?: JldProduct): JldProduct {
  const now = new Date().toISOString();
  const name = input.name.trim();
  const slugSource = input.slug?.trim() || name;

  return {
    id: existing?.id || createEntityId('product'),
    name,
    slug: ensureUniqueSlug(slugSource, products, existing?.id),
    description: input.description?.trim() || null,
    productType: input.productType,
    priceMxn: Number(input.priceMxn || 0),
    active: input.active ?? existing?.active ?? true,
    imageUrl: input.imageUrl?.trim() || null,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

export async function listProductsRepository(): Promise<JldProduct[]> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw normalizeSupabaseError('products', error);
    return ((data || []) as ProductRow[]).map((row) => mapProductRow(row));
  }

  return sortByCreatedDesc(getMockStore().products);
}

export async function createProductRepository(input: JldProductInput): Promise<JldProduct> {
  const products = await listProductsRepository();
  const next = mapInputToProduct(input, products);
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('products')
      .insert({
        name: next.name,
        slug: next.slug,
        description: next.description,
        product_type: next.productType,
        price_mxn: next.priceMxn,
        active: next.active,
        image_url: next.imageUrl,
      })
      .select('*')
      .single();

    if (error) throw normalizeSupabaseError('product creation', error);
    return mapProductRow(data as ProductRow);
  }

  const store = getMockStore();
  store.products.unshift(next);
  saveMockStore(store);
  return next;
}

export async function updateProductRepository(id: string, input: JldProductInput): Promise<JldProduct> {
  const products = await listProductsRepository();
  const existing = products.find((product) => product.id === id);
  if (!existing) throw new Error('Product not found');

  const next = mapInputToProduct(input, products, existing);
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { data, error } = await client
      .from('products')
      .update({
        name: next.name,
        slug: next.slug,
        description: next.description,
        product_type: next.productType,
        price_mxn: next.priceMxn,
        active: next.active,
        image_url: next.imageUrl,
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw normalizeSupabaseError('product update', error);
    return mapProductRow(data as ProductRow);
  }

  const store = getMockStore();
  store.products = store.products.map((product) => (product.id === id ? next : product));
  saveMockStore(store);
  return next;
}

export async function deleteProductRepository(id: string): Promise<void> {
  const { mode, client } = requireJldDataMode();

  if (mode === 'supabase' && client) {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw normalizeSupabaseError('product deletion', error);
    return;
  }

  const store = getMockStore();
  store.products = store.products.filter((product) => product.id !== id);
  store.payments = store.payments.map((payment) =>
    payment.productId === id
      ? {
          ...payment,
          productId: null,
          updatedAt: new Date().toISOString(),
        }
      : payment,
  );
  saveMockStore(store);
}
