import type { Language } from './types';

export interface ExportTranslations {
  exportPDF: string;
  exportCSV: string;
  exportSuccess: string;
  exportError: string;
  exportCancelled: string;
  reportTitle: string;
  generatedOn: string;
  students: string;
  attendance: string;
  quranProgress: string;
}

export const exportI18n: Record<Language, ExportTranslations> = {
  ar: {
    exportPDF: 'تصدير PDF',
    exportCSV: 'تصدير CSV',
    exportSuccess: 'تم التصدير بنجاح',
    exportError: 'حدث خطأ أثناء التصدير',
    exportCancelled: 'تم إلغاء التصدير',
    reportTitle: 'تقرير',
    generatedOn: 'تاريخ التقرير',
    students: 'الطلاب',
    attendance: 'الحضور والغياب',
    quranProgress: 'تقدم القرآن',
  },
  en: {
    exportPDF: 'Export PDF',
    exportCSV: 'Export CSV',
    exportSuccess: 'Exported successfully',
    exportError: 'An error occurred during export',
    exportCancelled: 'Export cancelled',
    reportTitle: 'Report',
    generatedOn: 'Generated on',
    students: 'Students',
    attendance: 'Attendance',
    quranProgress: 'Quran Progress',
  },
};
