import type { Language } from './types';

export interface HeaderTranslations {
  roles: {
    admin: string;
    teacher: string;
    student: string;
    parent: string;
    default: string;
  };
  home: string;
  logout: string;
  logoutError: string;
  logoutSuccess: string;
  openMenu: string;
  defaultUser: string;
  openSearch: string;
  searchPlaceholder: string;
  searchEmpty: string;
  searchStudents: string;
  searchTeachers: string;
}

export const header: Record<Language, HeaderTranslations> = {
  ar: {
    roles: {
      admin: 'مدير',
      teacher: 'معلم',
      student: 'طالب',
      parent: 'ولي أمر',
      default: 'مستخدم',
    },
    home: 'الرئيسية',
    logout: 'خروج',
    logoutError: 'خطأ في تسجيل الخروج',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    openMenu: 'فتح القائمة',
    defaultUser: 'مستخدم',
    openSearch: 'بحث',
    searchPlaceholder: 'ابحث عن طالب أو معلم...',
    searchEmpty: 'لا توجد نتائج',
    searchStudents: 'الطلاب',
    searchTeachers: 'المعلمون',
  },
  en: {
    roles: {
      admin: 'Admin',
      teacher: 'Teacher',
      student: 'Student',
      parent: 'Parent',
      default: 'User',
    },
    home: 'Home',
    logout: 'Logout',
    logoutError: 'Logout failed',
    logoutSuccess: 'Logged out successfully',
    openMenu: 'Open menu',
    defaultUser: 'User',
    openSearch: 'Search',
    searchPlaceholder: 'Search for a student or teacher...',
    searchEmpty: 'No results found',
    searchStudents: 'Students',
    searchTeachers: 'Teachers',
  },
};
