'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { useI18n } from '@/contexts/I18nContext';
import { getJldCopy } from '@/i18n/jld';
import { formatDate } from '@/lib/jld-format';
import {
  createOperationsEntry,
  createOperationsProfile,
  getOperationsWorkspace,
  type JldOperationsEntry,
} from '@/lib/jld-operations-store';
import { getOperationsArea, getOperationsWorkspaceCopy, type JldOperationsArea } from '@/lib/jld-operations';
import { getJldDataMode } from '@/repositories/jld';
import { DataModeBadge } from './DataModeBadge';
import { MetricCard } from './MetricCard';

type FeedbackState = {
  tone: 'error' | 'success';
  message: string;
} | null;

type ProfileFormState = {
  name: string;
  email: string;
};

type EntryFormState = {
  date: string;
  time: string;
  serviceName: string;
  clientName: string;
  durationMinutes: number;
  notes: string;
  consumables: string[];
  customConsumable: string;
};

const EMPTY_PROFILE_FORM: ProfileFormState = {
  name: '',
  email: '',
};

const EMPTY_WORKSPACE = {
  profiles: [],
  entries: [],
};

const LANGUAGE_LOCALE = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-MX',
} as const;

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getLocalTimeValue() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function createEntryForm(area: JldOperationsArea): EntryFormState {
  return {
    date: getLocalDateKey(),
    time: getLocalTimeValue(),
    serviceName: area.servicePresets[0] || '',
    clientName: '',
    durationMinutes: area.defaultDurationMinutes,
    notes: '',
    consumables: [],
    customConsumable: '',
  };
}

function hasIgnoreCase(values: string[], candidate: string) {
  return values.some((value) => value.toLowerCase() === candidate.toLowerCase());
}

function mergeConsumables(values: string[]) {
  const next: string[] = [];

  values.forEach((value) => {
    const normalized = value.trim();
    if (!normalized || hasIgnoreCase(next, normalized)) return;
    next.push(normalized);
  });

  return next;
}

function formatEntryTimestamp(entry: JldOperationsEntry, locale: string) {
  const parsed = new Date(entry.createdAt);
  if (Number.isNaN(parsed.getTime())) return entry.time;

  return parsed.toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function OperationsAreaWorkspace({ slug }: { slug: string }) {
  const { language, t } = useI18n();
  const copy = getJldCopy(language);
  const workspaceCopy = getOperationsWorkspaceCopy(language);
  const area = getOperationsArea(language, slug);
  const mode = getJldDataMode();
  const [workspaceVersion, setWorkspaceVersion] = useState(0);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(EMPTY_PROFILE_FORM);
  const [entryForm, setEntryForm] = useState<EntryFormState>(() =>
    area
      ? createEntryForm(area)
      : {
          date: getLocalDateKey(),
          time: getLocalTimeValue(),
          serviceName: '',
          clientName: '',
          durationMinutes: 30,
          notes: '',
          consumables: [],
          customConsumable: '',
        },
  );
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const workspace = useMemo(() => {
    const seed = workspaceVersion;
    if (seed < 0) return EMPTY_WORKSPACE;
    return area ? getOperationsWorkspace(area.slug) : EMPTY_WORKSPACE;
  }, [area, workspaceVersion]);

  const profiles = workspace.profiles;
  const entries = workspace.entries;
  const effectiveSelectedProfileId =
    selectedProfileId && profiles.some((profile) => profile.id === selectedProfileId)
      ? selectedProfileId
      : profiles[0]?.id ?? null;

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.id === effectiveSelectedProfileId) || null,
    [effectiveSelectedProfileId, profiles],
  );

  const selectedDayEntries = useMemo(
    () => entries.filter((entry) => entry.date === entryForm.date),
    [entries, entryForm.date],
  );

  const totalMinutes = useMemo(
    () => selectedDayEntries.reduce((total, entry) => total + entry.durationMinutes, 0),
    [selectedDayEntries],
  );

  const uniqueConsumablesCount = useMemo(() => {
    const items: string[] = [];
    selectedDayEntries.forEach((entry) => {
      entry.consumables.forEach((consumable) => {
        if (!hasIgnoreCase(items, consumable)) items.push(consumable);
      });
    });
    return items.length;
  }, [selectedDayEntries]);

  const feedbackClass =
    feedback?.tone === 'error'
      ? 'border-rose-400/25 bg-rose-400/10 text-rose-100'
      : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100';

  const addCustomConsumable = () => {
    const value = entryForm.customConsumable.trim();
    if (!value) return;

    setEntryForm((current) => ({
      ...current,
      consumables: mergeConsumables([...current.consumables, value]),
      customConsumable: '',
    }));
  };

  const toggleConsumable = (value: string) => {
    setEntryForm((current) => ({
      ...current,
      consumables: hasIgnoreCase(current.consumables, value)
        ? current.consumables.filter((item) => item.toLowerCase() !== value.toLowerCase())
        : mergeConsumables([...current.consumables, value]),
    }));
  };

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!area) return;

    const name = profileForm.name.trim();
    const email = profileForm.email.trim().toLowerCase();

    if (!name || !email) {
      setFeedback({ tone: 'error', message: workspaceCopy.validationProfileRequired });
      return;
    }

    const existingProfile = profiles.find((profile) => profile.email.toLowerCase() === email);
    if (existingProfile) {
      setSelectedProfileId(existingProfile.id);
      setProfileForm(EMPTY_PROFILE_FORM);
      setFeedback({ tone: 'success', message: workspaceCopy.profileExists });
      return;
    }

    const profile = createOperationsProfile({
      areaSlug: area.slug,
      name,
      email,
    });
    setSelectedProfileId(profile.id);
    setProfileForm(EMPTY_PROFILE_FORM);
    setFeedback({ tone: 'success', message: workspaceCopy.profileCreated });
    setWorkspaceVersion((current) => current + 1);
  };

  const handleEntrySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!area) return;
    if (!selectedProfile) {
      setFeedback({ tone: 'error', message: workspaceCopy.validationProfileFirst });
      return;
    }

    const serviceName = entryForm.serviceName.trim();
    if (!serviceName) {
      setFeedback({ tone: 'error', message: workspaceCopy.validationServiceRequired });
      return;
    }

    const nextConsumables = mergeConsumables([
      ...entryForm.consumables,
      ...entryForm.customConsumable.split(',').map((item) => item.trim()),
    ]);

    createOperationsEntry({
      areaSlug: area.slug,
      profileId: selectedProfile.id,
      profileName: selectedProfile.name,
      profileEmail: selectedProfile.email,
      date: entryForm.date,
      time: entryForm.time,
      serviceName,
      clientName: entryForm.clientName,
      durationMinutes: Math.max(5, Number(entryForm.durationMinutes) || area.defaultDurationMinutes),
      notes: entryForm.notes,
      consumables: nextConsumables,
    });

    setSelectedProfileId(selectedProfile.id);
    setEntryForm({
      ...createEntryForm(area),
      date: entryForm.date,
    });
    setFeedback({ tone: 'success', message: workspaceCopy.entryCreated });
    setWorkspaceVersion((current) => current + 1);
  };

  return (
    <Guard>
      <AppShell>
        {!area ? (
          <div className="card p-6">
            <p className="text-sm text-slate-400">{copy.operationsTitle}</p>
            <h1 className="mt-2 text-2xl font-semibold">{workspaceCopy.notFoundTitle}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">{workspaceCopy.notFoundDescription}</p>
            <Link href="/operaciones" className="btn-secondary mt-5 inline-flex text-sm">
              {copy.operationsDetailBack}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.operationsDetailTitle}</p>
                <h1 className="mt-2 text-3xl font-semibold">{area.title}</h1>
                <p className="mt-2 max-w-3xl text-sm text-slate-400">{area.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/operaciones" className="btn-secondary text-sm">
                  {copy.operationsDetailBack}
                </Link>
                <DataModeBadge mode={mode} mockLabel={copy.dataModeMock} liveLabel={copy.dataModeSupabase} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard label={workspaceCopy.profilesMetric} value={String(profiles.length)} />
              <MetricCard label={workspaceCopy.servicesMetric} value={String(selectedDayEntries.length)} />
              <MetricCard label={workspaceCopy.consumablesMetric} value={String(uniqueConsumablesCount)} />
            </div>

            {feedback ? <div className={`rounded-xl border px-4 py-3 text-sm ${feedbackClass}`}>{feedback.message}</div> : null}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_380px]">
              <div className="space-y-6">
                <section className="card p-6">
                  <div className={`rounded-[24px] bg-gradient-to-br ${area.accent} p-[1px]`}>
                    <div className="rounded-[23px] bg-[rgba(10,15,30,0.92)] p-6">
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{copy.operationsTitle}</p>
                      <h2 className="mt-2 text-2xl font-semibold">{workspaceCopy.tabletModeTitle}</h2>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">{area.tabletNote}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.focusLabel}</p>
                      <p className="mt-3 text-xl font-semibold">{area.focusValue}</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{area.cadenceLabel}</p>
                      <p className="mt-3 text-xl font-semibold">{area.cadenceValue}</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{workspaceCopy.durationLabel}</p>
                      <p className="mt-3 text-xl font-semibold">
                        {totalMinutes} {workspaceCopy.durationUnit}
                      </p>
                    </div>
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                  <form className="card p-5" onSubmit={handleProfileSubmit}>
                    <div>
                      <p className="text-sm text-slate-400">{workspaceCopy.accountTitle}</p>
                      <h2 className="mt-1 text-xl font-semibold">{workspaceCopy.createProfileLabel}</h2>
                      <p className="mt-2 text-sm text-slate-400">{workspaceCopy.accountSubtitle}</p>
                      <p className="mt-2 text-xs text-slate-500">{workspaceCopy.createProfileHint}</p>
                    </div>

                    <div className="mt-5 space-y-4">
                      <label className="block text-sm text-slate-300">
                        {t('field.name')}
                        <input
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={profileForm.name}
                          onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))}
                        />
                      </label>

                      <label className="block text-sm text-slate-300">
                        {t('field.email')}
                        <input
                          type="email"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={profileForm.email}
                          onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))}
                        />
                      </label>
                    </div>

                    <button type="submit" className="btn-primary mt-5 w-full justify-center">
                      {workspaceCopy.createProfileLabel}
                    </button>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-slate-200">{workspaceCopy.existingProfilesTitle}</p>
                      <div className="mt-3 space-y-2">
                        {profiles.length === 0 ? (
                          <p className="rounded-xl border border-dashed border-white/10 px-3 py-4 text-sm text-slate-400">
                            {workspaceCopy.existingProfilesEmpty}
                          </p>
                        ) : (
                          profiles.map((profile) => {
                            const active = profile.id === effectiveSelectedProfileId;
                            return (
                              <button
                                key={profile.id}
                                type="button"
                                onClick={() => {
                                  setSelectedProfileId(profile.id);
                                  setFeedback(null);
                                }}
                                className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                                  active
                                    ? 'border-cyan-300/35 bg-cyan-300/10 text-white'
                                    : 'border-white/8 bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.045]'
                                }`}
                              >
                                <p className="font-semibold">{profile.name}</p>
                                <p className="mt-1 text-xs text-slate-400">{profile.email}</p>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </form>

                  <form className="card p-5" onSubmit={handleEntrySubmit}>
                    <div>
                      <p className="text-sm text-slate-400">{workspaceCopy.journalTitle}</p>
                      <h2 className="mt-1 text-xl font-semibold">{workspaceCopy.serviceLabel}</h2>
                      <p className="mt-2 text-sm text-slate-400">{workspaceCopy.journalSubtitle}</p>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <label className="block text-sm text-slate-300">
                        {workspaceCopy.dateLabel}
                        <input
                          type="date"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={entryForm.date}
                          onChange={(event) => setEntryForm((current) => ({ ...current, date: event.target.value }))}
                        />
                      </label>

                      <label className="block text-sm text-slate-300">
                        {workspaceCopy.timeLabel}
                        <input
                          type="time"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={entryForm.time}
                          onChange={(event) => setEntryForm((current) => ({ ...current, time: event.target.value }))}
                        />
                      </label>
                    </div>

                    <div className="mt-5">
                      <p className="text-sm text-slate-300">{workspaceCopy.serviceLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {area.servicePresets.map((preset) => {
                          const active = entryForm.serviceName === preset;
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setEntryForm((current) => ({ ...current, serviceName: preset }))}
                              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                active
                                  ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100'
                                  : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]'
                              }`}
                            >
                              {preset}
                            </button>
                          );
                        })}
                      </div>

                      <input
                        className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                        value={entryForm.serviceName}
                        placeholder={workspaceCopy.servicePlaceholder}
                        onChange={(event) => setEntryForm((current) => ({ ...current, serviceName: event.target.value }))}
                      />
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                      <label className="block text-sm text-slate-300">
                        {workspaceCopy.clientLabel}
                        <input
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={entryForm.clientName}
                          placeholder={workspaceCopy.clientPlaceholder}
                          onChange={(event) => setEntryForm((current) => ({ ...current, clientName: event.target.value }))}
                        />
                      </label>

                      <label className="block text-sm text-slate-300">
                        {workspaceCopy.durationLabel}
                        <input
                          type="number"
                          min={5}
                          step={5}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                          value={entryForm.durationMinutes}
                          onChange={(event) =>
                            setEntryForm((current) => ({
                              ...current,
                              durationMinutes: Number(event.target.value) || area.defaultDurationMinutes,
                            }))
                          }
                        />
                      </label>
                    </div>

                    <div className="mt-5">
                      <p className="text-sm text-slate-300">{workspaceCopy.consumablesLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {area.consumablePresets.map((preset) => {
                          const active = hasIgnoreCase(entryForm.consumables, preset);
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => toggleConsumable(preset)}
                              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                active
                                  ? 'border-amber-300/35 bg-amber-300/10 text-amber-100'
                                  : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]'
                              }`}
                            >
                              {preset}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_140px]">
                        <label className="block text-sm text-slate-300">
                          {workspaceCopy.customConsumableLabel}
                          <input
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                            value={entryForm.customConsumable}
                            placeholder={workspaceCopy.customConsumablePlaceholder}
                            onChange={(event) =>
                              setEntryForm((current) => ({ ...current, customConsumable: event.target.value }))
                            }
                          />
                        </label>

                        <button type="button" className="btn-secondary mt-7 justify-center text-sm" onClick={addCustomConsumable}>
                          {workspaceCopy.addConsumable}
                        </button>
                      </div>
                    </div>

                    <label className="mt-5 block text-sm text-slate-300">
                      {workspaceCopy.notesLabel}
                      <textarea
                        className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-300/40"
                        value={entryForm.notes}
                        placeholder={workspaceCopy.notesPlaceholder}
                        onChange={(event) => setEntryForm((current) => ({ ...current, notes: event.target.value }))}
                      />
                    </label>

                    <button type="submit" className="btn-primary mt-5 w-full justify-center">
                      {workspaceCopy.saveEntry}
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-6">
                <section className="card p-5">
                  <p className="text-sm text-slate-400">{workspaceCopy.tabletModeTitle}</p>
                  <h2 className="mt-1 text-xl font-semibold">{workspaceCopy.activeProfileLabel}</h2>
                  <p className="mt-2 text-sm text-slate-400">{workspaceCopy.tabletModeSubtitle}</p>

                  <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    {selectedProfile ? (
                      <>
                        <p className="text-lg font-semibold">{selectedProfile.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{selectedProfile.email}</p>
                        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">{area.title}</p>
                        <p className="mt-2 text-sm text-slate-300">{workspaceCopy.savedOnDevice}</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-400">{workspaceCopy.validationProfileFirst}</p>
                    )}
                  </div>
                </section>

                <section className="card p-5">
                  <p className="text-sm text-slate-400">{workspaceCopy.recentEntriesTitle}</p>
                  <h2 className="mt-1 text-xl font-semibold">{formatDate(entryForm.date, LANGUAGE_LOCALE[language])}</h2>
                  <p className="mt-2 text-sm text-slate-400">{workspaceCopy.recentEntriesSubtitle}</p>

                  <div className="mt-5 space-y-3">
                    {selectedDayEntries.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
                        {workspaceCopy.recentEntriesEmpty}
                      </p>
                    ) : (
                      selectedDayEntries.map((entry) => (
                        <article key={entry.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold text-slate-100">{entry.serviceName}</p>
                              <p className="mt-1 text-sm text-slate-400">
                                {entry.profileName}
                                {entry.clientName ? ` / ${entry.clientName}` : ''}
                              </p>
                            </div>
                            <div className="text-right text-xs text-slate-500">
                              <p>{entry.time}</p>
                              <p className="mt-1">
                                {entry.durationMinutes} {workspaceCopy.durationUnit}
                              </p>
                            </div>
                          </div>

                          {entry.consumables.length > 0 ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {entry.consumables.map((consumable) => (
                                <span
                                  key={`${entry.id}-${consumable}`}
                                  className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-100"
                                >
                                  {consumable}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {entry.notes ? <p className="mt-4 text-sm text-slate-300">{entry.notes}</p> : null}

                          <p className="mt-4 text-xs text-slate-500">
                            {formatEntryTimestamp(entry, LANGUAGE_LOCALE[language])}
                          </p>
                        </article>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </AppShell>
    </Guard>
  );
}
