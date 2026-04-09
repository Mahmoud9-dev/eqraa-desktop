import type { Language } from './types';

export interface CommonTranslations {
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  filter: string;
  loading: string;
  noData: string;
  actions: string;
  confirm: string;
  back: string;
  close: string;
  submit: string;
  reset: string;
  view: string;
  export: string;
  print: string;
  yes: string;
  no: string;
  darkMode: string;
  lightMode: string;
  toggleTheme: string;
  switchToEnglish: string;
  switchToArabic: string;
  previous: string;
  next: string;
  pageOf: string;
  showingResults: string;
}

export const common: Record<Language, CommonTranslations> = {
  ar: {
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    search: 'بحث',
    filter: 'تصفية',
    loading: 'جارٍ التحميل...',
    noData: 'لا توجد بيانات',
    actions: 'إجراءات',
    confirm: 'تأكيد',
    back: 'رجوع',
    close: 'إغلاق',
    submit: 'إرسال',
    reset: 'إعادة ضبط',
    view: 'عرض',
    export: 'تصدير',
    print: 'طباعة',
    yes: 'نعم',
    no: 'لا',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    toggleTheme: 'تبديل الوضع',
    switchToEnglish: 'Switch to English',
    switchToArabic: 'التبديل إلى العربية',
    previous: 'السابق',
    next: 'التالي',
    pageOf: 'صفحة {page} من {totalPages}',
    showingResults: 'عرض {count} من {total} نتيجة',
  },
  en: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    noData: 'No data available',
    actions: 'Actions',
    confirm: 'Confirm',
    back: 'Back',
    close: 'Close',
    submit: 'Submit',
    reset: 'Reset',
    view: 'View',
    export: 'Export',
    print: 'Print',
    yes: 'Yes',
    no: 'No',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    toggleTheme: 'Toggle theme',
    switchToEnglish: 'Switch to English',
    switchToArabic: 'التبديل إلى العربية',
    previous: 'Previous',
    next: 'Next',
    pageOf: 'Page {page} of {totalPages}',
    showingResults: 'Showing {count} of {total} results',
  },
};
