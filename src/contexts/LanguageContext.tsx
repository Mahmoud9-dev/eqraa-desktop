
import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { translations, type Language, type Translations } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Language metadata
// ---------------------------------------------------------------------------

export interface LanguageMeta {
  /** BCP-47 language code */
  code: Language;
  /** Human-readable display label in the language itself */
  label: string;
  /** Locale string for Intl APIs (e.g. Intl.DateTimeFormat) */
  locale: string;
  /** Document writing direction */
  dir: 'rtl' | 'ltr';
}

const LANGUAGE_META: Record<Language, LanguageMeta> = {
  ar: { code: 'ar', label: 'العربية', locale: 'ar-SA', dir: 'rtl' },
  en: { code: 'en', label: 'English', locale: 'en-US', dir: 'ltr' },
};

// ---------------------------------------------------------------------------
// Dot-notation translation lookup
// ---------------------------------------------------------------------------

/**
 * Resolve a dot-notation key (e.g. "students.table.name") against a
 * translations object.  Returns undefined when the path is not found.
 */
function resolvePath(obj: unknown, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolate `{{variable}}` placeholders in a string.
 * e.g. interpolate("Hello {{name}}", { name: "Ali" }) → "Hello Ali"
 */
function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) =>
    key in params ? String(params[key]) : `{{${key}}}`
  );
}

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

export interface LanguageContextType {
  /** Active language code */
  language: Language;
  /** Raw translations object for the active language (backward-compat) */
  t: Translations;
  /**
   * Stable translation lookup with dot-notation key and optional interpolation.
   * Falls back to English when the key is missing in the active language.
   * Emits a console.warn in development when a key cannot be found at all.
   *
   * @example
   * tFunc('students.table.name')
   * tFunc('students.deleteConfirm', { name: student.name })
   */
  tFunc: (key: string, params?: Record<string, string | number>) => string;
  /** Metadata about the active language (locale, direction, label) */
  languageMeta: LanguageMeta;
  /** Toggle between Arabic and English */
  toggleLanguage: () => void;
  /** Convenience flag: true when active language is Arabic */
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'eqraa-language';

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ar') return stored;
    }
    return 'ar';
  });

  useEffect(() => {
    const { dir } = LANGUAGE_META[language];
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const tFunc = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // 1. Try active language
      let result = resolvePath(translations[language], key);

      // 2. Fall back to English
      if (result === undefined && language !== 'en') {
        result = resolvePath(translations['en'], key);
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Missing key "${key}" in "${language}", using English fallback.`);
        }
      }

      // 3. Last resort: return the key path
      if (result === undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Missing key "${key}" in all languages. Rendering key path.`);
        }
        return key;
      }

      return params ? interpolate(result, params) : result;
    },
    [language]
  );

  const value: LanguageContextType = useMemo(
    () => ({
      language,
      t: translations[language],
      tFunc,
      languageMeta: LANGUAGE_META[language],
      toggleLanguage,
      isRTL: language === 'ar',
    }),
    [language, tFunc, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
