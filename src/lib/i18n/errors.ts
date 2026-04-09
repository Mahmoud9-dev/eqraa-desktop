import type { Language } from './types';

export interface ErrorTranslations {
  notFound: string;
  notFoundDescription: string;
  unauthorized: string;
  serverError: string;
  networkError: string;
  unknownError: string;
  validationRequired: string;
  validationEmail: string;
  validationMinLength: string;
  validationMaxLength: string;
  validationPasswordsMustMatch: string;
  backHome: string;
  errorBoundaryRetry: string;
}

export const errors: Record<Language, ErrorTranslations> = {
  ar: {
    notFound: 'الصفحة غير موجودة',
    notFoundDescription: 'عذراً، الصفحة التي تبحث عنها غير موجودة.',
    unauthorized: 'غير مصرح لك بالوصول',
    serverError: 'خطأ في الخادم',
    networkError: 'خطأ في الشبكة',
    unknownError: 'حدث خطأ غير متوقع',
    validationRequired: 'هذا الحقل مطلوب',
    validationEmail: 'البريد الإلكتروني غير صالح',
    validationMinLength: 'القيمة قصيرة جداً',
    validationMaxLength: 'القيمة طويلة جداً',
    validationPasswordsMustMatch: 'كلمتا المرور غير متطابقتين',
    backHome: 'العودة للرئيسية',
    errorBoundaryRetry: 'حاول مرة أخرى',
  },
  en: {
    notFound: 'Page Not Found',
    notFoundDescription: "Sorry, the page you're looking for doesn't exist.",
    unauthorized: 'You are not authorized to access this page',
    serverError: 'Server error',
    networkError: 'Network error',
    unknownError: 'An unexpected error occurred',
    validationRequired: 'This field is required',
    validationEmail: 'Invalid email address',
    validationMinLength: 'Value is too short',
    validationMaxLength: 'Value is too long',
    validationPasswordsMustMatch: 'Passwords do not match',
    backHome: 'Back to Home',
    errorBoundaryRetry: 'Try Again',
  },
};
