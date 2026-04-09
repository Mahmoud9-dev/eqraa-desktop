import type { Translations } from "@/lib/i18n";

/**
 * Get the translated label for a department key.
 * Uses the attendance.departments translation namespace as the canonical source.
 */
export function getDepartmentLabel(dept: string, t: Translations): string {
  const labels: Record<string, string> = {
    quran: t.attendance.departments.quran,
    tajweed: t.attendance.departments.tajweed,
    tarbawi: t.attendance.departments.tarbawi,
  };
  return labels[dept] || dept;
}
