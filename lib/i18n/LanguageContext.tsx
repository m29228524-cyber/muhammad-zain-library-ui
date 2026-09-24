'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Direction } from '@/types/library';
import { translations, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationDictionary) => string;
  getLocalized: (item: any, fieldPrefix: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('library_lang') as Language;
      if (saved && (saved === 'en' || saved === 'ar' || saved === 'am')) {
        return saved;
      }
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('ar')) return 'ar';
      if (browserLang.startsWith('am')) return 'am';
    } catch {
      // fallback
    }
    return 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
    try {
      localStorage.setItem('library_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: keyof TranslationDictionary): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  // Safe localized field resolver with transparent fallback
  const getLocalized = (item: any, fieldPrefix: string): string => {
    if (!item) return '';

    const langKey = `${fieldPrefix}_${language}`;
    const enKey = `${fieldPrefix}_en`;
    const arKey = `${fieldPrefix}_ar`;
    const amKey = `${fieldPrefix}_am`;

    if (item[langKey]) return item[langKey];
    if (language === 'ar' && item[arKey]) return item[arKey];
    if (language === 'am' && item[amKey]) return item[amKey];
    if (item[enKey]) return item[enKey];
    if (item[arKey]) return item[arKey];
    if (item[fieldPrefix]) return item[fieldPrefix];

    return '';
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
