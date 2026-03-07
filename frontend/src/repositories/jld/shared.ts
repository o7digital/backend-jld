'use client';

import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase';
import type { JldDataMode } from '@/types/jld';

export function getJldDataMode(): JldDataMode {
  return isSupabaseConfigured() ? 'supabase' : 'mock';
}

export function requireJldDataMode(): { mode: JldDataMode; client: ReturnType<typeof getSupabaseBrowserClient> } {
  const mode = getJldDataMode();
  return { mode, client: getSupabaseBrowserClient() };
}

export function createEntityId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function normalizeSupabaseError(entity: string, error: { message?: string } | null): Error {
  if (!error) return new Error(`Unable to access ${entity}`);
  return new Error(error.message || `Unable to access ${entity}`);
}

export function sortByCreatedDesc<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
