'use client';

import { createMockJldDatabase } from './mock-data';
import type { JldMockDatabase } from '@/types/jld';

const STORAGE_KEY = 'jld-supabase-mock-v1';

let memoryStore: JldMockDatabase | null = null;

function cloneDatabase(input: JldMockDatabase): JldMockDatabase {
  return structuredClone(input);
}

function hydrateStore(): JldMockDatabase {
  const seed = createMockJldDatabase();
  if (typeof window === 'undefined') return seed;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seed;

  try {
    return {
      ...seed,
      ...JSON.parse(raw),
    } as JldMockDatabase;
  } catch {
    return seed;
  }
}

export function getMockStore(): JldMockDatabase {
  if (!memoryStore) {
    memoryStore = hydrateStore();
  }
  return cloneDatabase(memoryStore);
}

export function saveMockStore(next: JldMockDatabase) {
  memoryStore = cloneDatabase(next);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  }
}

export function resetMockStore() {
  memoryStore = createMockJldDatabase();
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  }
}
