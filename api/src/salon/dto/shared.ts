import { Transform } from 'class-transformer';

export function trimString(value: unknown): unknown {
  return typeof value === 'string' ? value.trim() : value;
}

export function optionalTrimString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function optionalNumber(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return Number(trimmed);
}

export function optionalDate(value: unknown): Date | undefined {
  if (value === null || value === undefined) return undefined;
  if (value instanceof Date) return value;
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return new Date(trimmed);
}

export const Trim = () => Transform(({ value }) => trimString(value));
export const OptionalTrim = () => Transform(({ value }) => optionalTrimString(value));
export const OptionalNumber = () => Transform(({ value }) => optionalNumber(value));
export const OptionalDate = () => Transform(({ value }) => optionalDate(value));
