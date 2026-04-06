/**
 * Typed i18n index — assembles all per-domain dictionaries into the
 * canonical `translations` Record<Language, Translations> that the
 * LanguageContext and all consumers depend on.
 *
 * To add a new namespace:
 *   1. Create src/lib/i18n/<namespace>.ts
 *   2. Export its interface and data object from this file
 *   3. Add it to the Translations interface and the translations record below
 */

export type { Language } from './types';

// --- Per-domain re-exports (types + data) ---
export { type CommonTranslations, common } from './common';
export { type NavTranslations, nav } from './nav';
export { type AuthTranslations, auth } from './auth';
export { type HomeTranslations, home } from './home';
export { type HeaderTranslations, header } from './header';
export { type StudentsTranslations, students } from './students';
export { type TeachersTranslations, teachers } from './teachers';
export { type AttendanceTranslations, attendance } from './attendance';
export { type ExamsTranslations, exams } from './exams';
export { type AnnouncementsTranslations, announcements } from './announcements';
export { type SettingsTranslations, settings } from './settings';
export { type ErrorTranslations, errors } from './errors';
export { type AdminTranslations, admin } from './admin';
export { type TajweedTranslations, tajweed } from './tajweed';
export { type SuggestionsTranslations, suggestions } from './suggestions';
export { type MeetingsTranslations, meetings } from './meetings';
export { type QuranTranslations, quran } from './quran';
export { type ScheduleTranslations, schedule } from './schedule';
export { type SubjectsTranslations, subjects as subjectsI18n } from './subjects';
export { type EducationalTranslations, educational } from './educational';
export { type LibraryTranslations, library } from './library';
export { type QuranCirclesTranslations, quranCircles } from './quranCircles';
export { type TarbiwiTranslations, tarbiwi } from './tarbiwi';
export { type ExportTranslations, exportI18n } from './export';
export { type ChartsTranslations, charts } from './charts';

// --- Formatters ---
export {
  formatDate,
  formatDateShort,
  formatDateISO,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatPercent,
} from './formatters';

// ---------------------------------------------------------------------------
// Assembled Translations type
// ---------------------------------------------------------------------------

import type { CommonTranslations } from './common';
import type { NavTranslations } from './nav';
import type { AuthTranslations } from './auth';
import type { HomeTranslations } from './home';
import type { HeaderTranslations } from './header';
import type { StudentsTranslations } from './students';
import type { TeachersTranslations } from './teachers';
import type { AttendanceTranslations } from './attendance';
import type { ExamsTranslations } from './exams';
import type { AnnouncementsTranslations } from './announcements';
import type { SettingsTranslations } from './settings';
import type { ErrorTranslations } from './errors';
import type { AdminTranslations } from './admin';
import type { TajweedTranslations } from './tajweed';
import type { SuggestionsTranslations } from './suggestions';
import type { MeetingsTranslations } from './meetings';
import type { QuranTranslations } from './quran';
import type { ScheduleTranslations } from './schedule';
import type { SubjectsTranslations } from './subjects';
import type { EducationalTranslations } from './educational';
import type { LibraryTranslations } from './library';
import type { QuranCirclesTranslations } from './quranCircles';
import type { TarbiwiTranslations } from './tarbiwi';
import type { ExportTranslations } from './export';
import type { ChartsTranslations } from './charts';

import { common } from './common';
import { nav } from './nav';
import { auth } from './auth';
import { home } from './home';
import { header } from './header';
import { students } from './students';
import { teachers } from './teachers';
import { attendance } from './attendance';
import { exams } from './exams';
import { announcements } from './announcements';
import { settings } from './settings';
import { errors } from './errors';
import { admin } from './admin';
import { tajweed } from './tajweed';
import { suggestions } from './suggestions';
import { meetings } from './meetings';
import { quran } from './quran';
import { schedule } from './schedule';
import { subjects as subjectsI18n } from './subjects';
import { educational } from './educational';
import { library } from './library';
import { quranCircles } from './quranCircles';
import { tarbiwi } from './tarbiwi';
import { exportI18n } from './export';
import { charts } from './charts';

import type { Language } from './types';

export interface Translations {
  common: CommonTranslations;
  nav: NavTranslations;
  auth: AuthTranslations;
  home: HomeTranslations;
  header: HeaderTranslations;
  students: StudentsTranslations;
  teachers: TeachersTranslations;
  attendance: AttendanceTranslations;
  exams: ExamsTranslations;
  announcements: AnnouncementsTranslations;
  settings: SettingsTranslations;
  errors: ErrorTranslations;
  admin: AdminTranslations;
  tajweed: TajweedTranslations;
  suggestions: SuggestionsTranslations;
  meetings: MeetingsTranslations;
  quran: QuranTranslations;
  schedule: ScheduleTranslations;
  subjects: SubjectsTranslations;
  educational: EducationalTranslations;
  library: LibraryTranslations;
  quranCircles: QuranCirclesTranslations;
  tarbiwi: TarbiwiTranslations;
  export: ExportTranslations;
  charts: ChartsTranslations;
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: common.ar,
    nav: nav.ar,
    auth: auth.ar,
    home: home.ar,
    header: header.ar,
    students: students.ar,
    teachers: teachers.ar,
    attendance: attendance.ar,
    exams: exams.ar,
    announcements: announcements.ar,
    settings: settings.ar,
    errors: errors.ar,
    admin: admin.ar,
    tajweed: tajweed.ar,
    suggestions: suggestions.ar,
    meetings: meetings.ar,
    quran: quran.ar,
    schedule: schedule.ar,
    subjects: subjectsI18n.ar,
    educational: educational.ar,
    library: library.ar,
    quranCircles: quranCircles.ar,
    tarbiwi: tarbiwi.ar,
    export: exportI18n.ar,
    charts: charts.ar,
  },
  en: {
    common: common.en,
    nav: nav.en,
    auth: auth.en,
    home: home.en,
    header: header.en,
    students: students.en,
    teachers: teachers.en,
    attendance: attendance.en,
    exams: exams.en,
    announcements: announcements.en,
    settings: settings.en,
    errors: errors.en,
    admin: admin.en,
    tajweed: tajweed.en,
    suggestions: suggestions.en,
    meetings: meetings.en,
    quran: quran.en,
    schedule: schedule.en,
    subjects: subjectsI18n.en,
    educational: educational.en,
    library: library.en,
    quranCircles: quranCircles.en,
    tarbiwi: tarbiwi.en,
    export: exportI18n.en,
    charts: charts.en,
  },
};
