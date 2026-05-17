'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../../components/AppShell';
import { Guard } from '../../../../components/Guard';
import {
  getPreviewAuthUsers,
  savePreviewAuthUsers,
  upsertPreviewAuthUser,
  type PreviewAuthUser,
} from '../../../../lib/previewAuth';

type Role = PreviewAuthUser['role'];

const emptyDraft = {
  email: '',
  name: '',
  role: 'MEMBER' as Role,
  password: '',
  twoFactorEnabled: false,
  twoFactorCode: '202607',
};

export default function SecurityParametersPage() {
  const [users, setUsers] = useState<PreviewAuthUser[]>([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUsers(getPreviewAuthUsers());
  }, []);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.email.localeCompare(b.email)),
    [users],
  );

  const refreshUsers = () => setUsers(getPreviewAuthUsers());

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.email.trim() || !draft.password.trim()) return;
    upsertPreviewAuthUser(draft);
    setDraft(emptyDraft);
    refreshUsers();
    setMessage('User password saved.');
  };

  const updateUser = (id: string, patch: Partial<PreviewAuthUser>) => {
    const nextUsers = users.map((user) => (user.id === id ? { ...user, ...patch } : user));
    savePreviewAuthUsers(nextUsers);
    setUsers(nextUsers);
    setMessage('Security settings updated.');
  };

  const removeUser = (id: string) => {
    const nextUsers = users.filter((user) => user.id !== id);
    savePreviewAuthUsers(nextUsers);
    setUsers(nextUsers);
    setMessage('User removed from local preview login.');
  };

  return (
    <Guard>
      <AppShell>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-slate-400">Admin · Parameters</p>
            <h1 className="text-3xl font-semibold">Update PWD & 2FA</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Temporary local security module for the JLD preview login. Passwords and 2FA codes are stored in this browser until Supabase/Auth backend is connected.
            </p>
          </div>
          <Link href="/admin/parameters" className="btn-secondary text-sm">
            Back to parameters
          </Link>
        </div>

        {message ? <div className="mb-4 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{message}</div> : null}

        <form className="card p-5" onSubmit={handleCreate}>
          <p className="text-sm font-semibold text-slate-100">Create or update a user password</p>
          <div className="mt-4 grid gap-3 lg:grid-cols-6">
            <label className="lg:col-span-2">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                value={draft.email}
                onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                placeholder="user@jeanlouisdavid.mx"
                required
              />
            </label>
            <label>
              <span className="text-sm text-slate-300">Name</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                placeholder="User name"
              />
            </label>
            <label>
              <span className="text-sm text-slate-300">Role</span>
              <select
                value={draft.role}
                onChange={(event) => setDraft((prev) => ({ ...prev, role: event.target.value as Role }))}
                className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
              >
                <option value="OWNER">Owner</option>
                <option value="ADMIN">Admin</option>
                <option value="MEMBER">Member</option>
              </select>
            </label>
            <label>
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={draft.password}
                onChange={(event) => setDraft((prev) => ({ ...prev, password: event.target.value }))}
                className="mt-1 w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                required
              />
            </label>
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full justify-center">
                Save password
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={draft.twoFactorEnabled}
                onChange={(event) => setDraft((prev) => ({ ...prev, twoFactorEnabled: event.target.checked }))}
              />
              Enable 2FA
            </label>
            <label className="text-sm text-slate-300">
              2FA code
              <input
                value={draft.twoFactorCode}
                onChange={(event) => setDraft((prev) => ({ ...prev, twoFactorCode: event.target.value }))}
                className="ml-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                inputMode="numeric"
              />
            </label>
          </div>
        </form>

        <div className="card mt-6 p-5">
          <p className="mb-4 text-sm font-semibold text-slate-100">Users with local preview login</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-2 text-left">User</th>
                  <th className="pb-2 text-left">Role</th>
                  <th className="pb-2 text-left">Password</th>
                  <th className="pb-2 text-left">2FA</th>
                  <th className="pb-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-t border-white/5 align-top">
                    <td className="py-3">
                      <p className="font-medium text-slate-100">{user.name || user.email}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </td>
                    <td className="py-3">
                      <select
                        value={user.role}
                        onChange={(event) => updateUser(user.id, { role: event.target.value as Role })}
                        className="rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                      >
                        <option value="OWNER">Owner</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MEMBER">Member</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <input
                        type="password"
                        value={user.password}
                        onChange={(event) => updateUser(user.id, { password: event.target.value })}
                        className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                      />
                    </td>
                    <td className="py-3">
                      <div className="flex flex-col gap-2">
                        <label className="inline-flex items-center gap-2 text-slate-300">
                          <input
                            type="checkbox"
                            checked={user.twoFactorEnabled}
                            onChange={(event) => updateUser(user.id, { twoFactorEnabled: event.target.checked })}
                          />
                          Enabled
                        </label>
                        <input
                          value={user.twoFactorCode}
                          onChange={(event) => updateUser(user.id, { twoFactorCode: event.target.value })}
                          className="w-32 rounded-lg bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-cyan-400"
                          inputMode="numeric"
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-200 hover:bg-red-500/10"
                        onClick={() => removeUser(user.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedUsers.length === 0 ? <p className="mt-3 text-sm text-slate-400">No local users configured.</p> : null}
        </div>
      </AppShell>
    </Guard>
  );
}
