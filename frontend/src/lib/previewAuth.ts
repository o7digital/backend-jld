'use client';

export type PreviewAuthUser = {
  id: string;
  email: string;
  name: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  password: string;
  twoFactorEnabled: boolean;
  twoFactorCode: string;
};

const STORAGE_KEY = 'jld-preview-auth-users-v1';
const DEFAULT_ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_JLD_ADMIN_EMAIL?.trim().toLowerCase() || 'olivier.steineur@gmail.com';
const DEFAULT_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_JLD_ADMIN_PASSWORD || 'JLD2026!';

export function getDefaultPreviewAdmin(): PreviewAuthUser {
  return {
    id: 'preview-jld-admin',
    email: DEFAULT_ADMIN_EMAIL,
    name: 'Olivier Steineur',
    role: 'OWNER',
    password: DEFAULT_ADMIN_PASSWORD,
    twoFactorEnabled: false,
    twoFactorCode: '202607',
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isPreviewAuthUser(value: unknown): value is PreviewAuthUser {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<PreviewAuthUser>;
  return (
    typeof item.id === 'string' &&
    typeof item.email === 'string' &&
    typeof item.name === 'string' &&
    typeof item.password === 'string' &&
    (item.role === 'OWNER' || item.role === 'ADMIN' || item.role === 'MEMBER')
  );
}

export function getPreviewAuthUsers(): PreviewAuthUser[] {
  const fallback = [getDefaultPreviewAdmin()];
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return fallback;
    const users = parsed.filter(isPreviewAuthUser).map((user) => ({
      ...user,
      email: normalizeEmail(user.email),
      twoFactorEnabled: Boolean(user.twoFactorEnabled),
      twoFactorCode: user.twoFactorCode || '202607',
    }));
    return users.length > 0 ? users : fallback;
  } catch {
    return fallback;
  }
}

export function savePreviewAuthUsers(users: PreviewAuthUser[]) {
  if (typeof window === 'undefined') return;
  const normalized = users.map((user) => ({ ...user, email: normalizeEmail(user.email) }));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function upsertPreviewAuthUser(input: Omit<PreviewAuthUser, 'id'> & { id?: string }) {
  const users = getPreviewAuthUsers();
  const email = normalizeEmail(input.email);
  const existing = users.find((user) => user.email === email || (input.id && user.id === input.id));
  const nextUser: PreviewAuthUser = {
    id: existing?.id || input.id || `preview-user-${Date.now()}`,
    email,
    name: input.name.trim() || email,
    role: input.role,
    password: input.password,
    twoFactorEnabled: input.twoFactorEnabled,
    twoFactorCode: input.twoFactorCode || '202607',
  };

  const nextUsers = existing
    ? users.map((user) => (user.id === existing.id ? nextUser : user))
    : [nextUser, ...users];
  savePreviewAuthUsers(nextUsers);
  return nextUser;
}

export function validatePreviewLogin(email: string, password: string, twoFactorCode?: string) {
  const normalizedEmail = normalizeEmail(email);
  const user = getPreviewAuthUsers().find((item) => item.email === normalizedEmail);
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  if (user.twoFactorEnabled && user.twoFactorCode !== (twoFactorCode || '').trim()) {
    throw new Error('Invalid 2FA code');
  }
  return user;
}
