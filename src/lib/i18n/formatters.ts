import type { Language } from './types';

const LOCALES: Record<Language, string> = {
  ar: 'ar-SA',
  en: 'en-US',
};

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format a date value as a localized date string.
 * @example formatDate(new Date(), 'ar') → "١٠ فبراير ٢٠٢٦"
 */
export function formatDate(
  value: Date | string | number,
  language: Language,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  try {
    const date = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat(LOCALES[language], options).format(date);
  } catch {
    return String(value);
  }
}

/**
 * Format a date value as a short localized date string.
 * @example formatDateShort(new Date(), 'en') → "2/10/2026"
 */
export function formatDateShort(value: Date | string | number, language: Language): string {
  return formatDate(value, language, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/**
 * Format a Date as an ISO date string (yyyy-MM-dd) using LOCAL time.
 * Using toISOString() here would shift the date across timezones (e.g. a
 * Date created at 2026-01-15 22:00 in UTC+3 serializes as "2026-01-15"
 * in local time but "2026-01-15T19:00:00Z" → "2026-01-15" looks fine,
 * whereas 00:30 local on 2026-01-16 serializes to "2026-01-15" in UTC).
 * Replaces date-fns `format(date, "yyyy-MM-dd")`.
 * @example formatDateISO(new Date(2026, 0, 15)) → "2026-01-15"
 */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Format a date value as a localized time string.
 */
export function formatTime(value: Date | string | number, language: Language): string {
  return formatDate(value, language, { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format a date + time value as a localized datetime string.
 */
export function formatDateTime(value: Date | string | number, language: Language): string {
  return formatDate(value, language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ---------------------------------------------------------------------------
// Relative time formatting
// ---------------------------------------------------------------------------

const RELATIVE_THRESHOLDS = [
  { unit: 'year' as Intl.RelativeTimeFormatUnit, ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month' as Intl.RelativeTimeFormatUnit, ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week' as Intl.RelativeTimeFormatUnit, ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'day' as Intl.RelativeTimeFormatUnit, ms: 24 * 60 * 60 * 1000 },
  { unit: 'hour' as Intl.RelativeTimeFormatUnit, ms: 60 * 60 * 1000 },
  { unit: 'minute' as Intl.RelativeTimeFormatUnit, ms: 60 * 1000 },
  { unit: 'second' as Intl.RelativeTimeFormatUnit, ms: 1000 },
];

/**
 * Format a date as a localized relative time string.
 * @example formatRelativeTime(new Date('2026-02-01'), 'ar') → "منذ 9 أيام"
 */
export function formatRelativeTime(
  value: Date | string | number,
  language: Language
): string {
  try {
    const date = value instanceof Date ? value : new Date(value);
    const diff = date.getTime() - Date.now();
    const absDiff = Math.abs(diff);
    const rtf = new Intl.RelativeTimeFormat(LOCALES[language], { numeric: 'auto' });

    for (const { unit, ms } of RELATIVE_THRESHOLDS) {
      if (absDiff >= ms) {
        return rtf.format(Math.round(diff / ms), unit);
      }
    }

    return rtf.format(0, 'second');
  } catch {
    return String(value);
  }
}

// ---------------------------------------------------------------------------
// Number formatting
// ---------------------------------------------------------------------------

/**
 * Format a number with localized digit grouping.
 * @example formatNumber(1234567, 'ar') → "١٬٢٣٤٬٥٦٧"
 */
export function formatNumber(
  value: number,
  language: Language,
  options: Intl.NumberFormatOptions = {}
): string {
  try {
    return new Intl.NumberFormat(LOCALES[language], options).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Format a number as a localized percentage.
 * @example formatPercent(0.85, 'en') → "85%"
 */
export function formatPercent(value: number, language: Language): string {
  return formatNumber(value, language, { style: 'percent', maximumFractionDigits: 1 });
}
