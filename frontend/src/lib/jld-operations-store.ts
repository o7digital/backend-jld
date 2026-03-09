import { createEntityId } from '@/repositories/jld/shared';
import type { JldOperationsAreaSlug } from './jld-operations';

export type JldOperationsProfile = {
  id: string;
  areaSlug: JldOperationsAreaSlug;
  name: string;
  email: string;
  createdAt: string;
  lastUsedAt: string | null;
};

export type JldOperationsEntry = {
  id: string;
  areaSlug: JldOperationsAreaSlug;
  profileId: string;
  profileName: string;
  profileEmail: string;
  date: string;
  time: string;
  serviceName: string;
  clientName: string;
  durationMinutes: number;
  notes: string;
  consumables: string[];
  createdAt: string;
};

type OperationsWorkspaceStore = {
  profiles: JldOperationsProfile[];
  entries: JldOperationsEntry[];
};

const STORAGE_KEY = 'jld-operations-workspace-v1';

let memoryStore: OperationsWorkspaceStore | null = null;

function createEmptyStore(): OperationsWorkspaceStore {
  return {
    profiles: [],
    entries: [],
  };
}

function cloneStore(store: OperationsWorkspaceStore): OperationsWorkspaceStore {
  return structuredClone(store);
}

function hydrateStore(): OperationsWorkspaceStore {
  if (typeof window === 'undefined') return createEmptyStore();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyStore();

    const parsed = JSON.parse(raw) as Partial<OperationsWorkspaceStore>;
    return {
      profiles: Array.isArray(parsed.profiles) ? parsed.profiles : [],
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    return createEmptyStore();
  }
}

function readStore(): OperationsWorkspaceStore {
  if (!memoryStore) {
    memoryStore = hydrateStore();
  }

  return cloneStore(memoryStore);
}

function writeStore(next: OperationsWorkspaceStore) {
  memoryStore = cloneStore(next);

  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
  } catch {
    // Ignore write errors and keep the in-memory state.
  }
}

function sortProfiles(profiles: JldOperationsProfile[]) {
  return [...profiles].sort((left, right) => {
    const leftDate = left.lastUsedAt || left.createdAt;
    const rightDate = right.lastUsedAt || right.createdAt;
    return +new Date(rightDate) - +new Date(leftDate);
  });
}

function sortEntries(entries: JldOperationsEntry[]) {
  return [...entries].sort((left, right) => +new Date(right.createdAt) - +new Date(left.createdAt));
}

export function getOperationsWorkspace(areaSlug: JldOperationsAreaSlug) {
  const store = readStore();

  return {
    profiles: sortProfiles(store.profiles.filter((profile) => profile.areaSlug === areaSlug)),
    entries: sortEntries(store.entries.filter((entry) => entry.areaSlug === areaSlug)),
  };
}

export function createOperationsProfile(input: { areaSlug: JldOperationsAreaSlug; name: string; email: string }) {
  const store = readStore();
  const now = new Date().toISOString();

  const profile: JldOperationsProfile = {
    id: createEntityId('ops-profile'),
    areaSlug: input.areaSlug,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    createdAt: now,
    lastUsedAt: null,
  };

  store.profiles.unshift(profile);
  writeStore(store);

  return profile;
}

export function createOperationsEntry(
  input: Omit<JldOperationsEntry, 'id' | 'createdAt' | 'consumables'> & { consumables: string[] },
) {
  const store = readStore();
  const now = new Date().toISOString();

  const entry: JldOperationsEntry = {
    id: createEntityId('ops-entry'),
    areaSlug: input.areaSlug,
    profileId: input.profileId,
    profileName: input.profileName.trim(),
    profileEmail: input.profileEmail.trim().toLowerCase(),
    date: input.date,
    time: input.time,
    serviceName: input.serviceName.trim(),
    clientName: input.clientName.trim(),
    durationMinutes: input.durationMinutes,
    notes: input.notes.trim(),
    consumables: Array.from(new Set(input.consumables.map((item) => item.trim()).filter(Boolean))),
    createdAt: now,
  };

  store.entries.unshift(entry);
  store.profiles = store.profiles.map((profile) =>
    profile.id === input.profileId ? { ...profile, lastUsedAt: now } : profile,
  );

  writeStore(store);

  return entry;
}
