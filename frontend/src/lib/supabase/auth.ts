'use client';

import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { getSupabaseBrowserClient, requireSupabaseBrowserClient } from './browser-client';
import { isSupabaseConfigured } from './config';

export function isSupabaseAuthReady(): boolean {
  return isSupabaseConfigured();
}

export async function getCurrentSupabaseSession(): Promise<Session | null> {
  const client = getSupabaseBrowserClient();
  if (!client) return null;

  const { data, error } = await client.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function subscribeToSupabaseAuth(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
): (() => void) | null {
  const client = getSupabaseBrowserClient();
  if (!client) return null;

  const {
    data: { subscription },
  } = client.auth.onAuthStateChange(callback);

  return () => subscription.unsubscribe();
}

export async function signInWithSupabasePassword(email: string, password: string) {
  const client = requireSupabaseBrowserClient();
  return client.auth.signInWithPassword({ email, password });
}

export async function signOutFromSupabase() {
  const client = getSupabaseBrowserClient();
  return client?.auth.signOut();
}
