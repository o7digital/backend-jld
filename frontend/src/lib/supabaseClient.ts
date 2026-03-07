'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import { requireSupabaseBrowserClient } from './supabase';
import type { Database } from '@/types/supabase';

export function getSupabaseClient() {
  return requireSupabaseBrowserClient();
}

export type AppSupabaseClient = SupabaseClient<Database>;
