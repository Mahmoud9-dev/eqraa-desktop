import type { Language } from './types';

export interface ExportTranslations {
  exportPDF: string;
  exportCSV: string;
  exportSuccess: string;
  exportError: string;
  exportCancelled: string;
  exporting: string;
  reportTitle: string;
  generatedOn: string;
  students: string;
  attendance: string;
  quranProgress: string;
  importCSV: string;
  importing: string;
  importError: string;
  downloadTemplate: string;
}

export const exportI18n: Record<Language, ExportTranslations> = {
  ar: {
    exportPDF: 'تصدير PDF',
    exportCSV: 'تصدير CSV',
    exportSuccess: 'تم التصدير بنجاح',
    exportError: 'حدث خطأ أثناء التصدير',
    exportCancelled: 'تم إلغاء التصدير',
    exporting: 'جاري التصدير...',
    reportTitle: 'تقرير',
    generatedOn: 'تاريخ التقرير',
    students: 'الطلاب',
    attendance: 'الحضور والغياب',
    quranProgress: 'تقدم القرآن',
    importCSV: 'استيراد CSV',
    importing: 'جاري الاستيراد...',
    importError: 'حدث خطأ أثناء الاستيراد',
    downloadTemplate: 'تحميل القالب',
  },
  en: {
    exportPDF: 'Export PDF',
    exportCSV: 'Export CSV',
    exportSuccess: 'Exported successfully',
    exportError: 'An error occurred during export',
    exportCancelled: 'Export cancelled',
    exporting: 'Exporting...',
    reportTitle: 'Report',
    generatedOn: 'Generated on',
    students: 'Students',
    attendance: 'Attendance',
    quranProgress: 'Quran Progress',
    importCSV: 'Import CSV',
    importing: 'Importing...',
    importError: 'An error occurred during import',
    downloadTemplate: 'Download Template',
  },
};
