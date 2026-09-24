'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';
import { Language } from '@/types/library';
import { X, Search, Globe, Sun, Moon, Bookmark, Send } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  onOpenSearch: () => void;
}

export function MobileNav({ isOpen, onClose, navLinks, onOpenSearch }: MobileNavProps) {
  const pathname = usePathname();
  const { language, setLanguage, direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 ${
          direction === 'rtl' ? 'right-0' : 'left-0'
        } w-4/5 max-w-sm bg-[#FBF9F5] dark:bg-[#0C1410] border-r dark:border-stone-800 p-6 flex flex-col justify-between shadow-2xl transition-transform`}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-emerald-900 dark:bg-emerald-800 flex items-center justify-center text-amber-100 font-serif font-bold text-sm">
                ز
              </div>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                {language === 'ar' ? 'مكتبة الشيخ محمد زين' : 'Shaykh Muhammad Zain'}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-between w-full px-3 py-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 rounded-md border border-stone-200 dark:border-stone-700/60"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-400" />
              <span>{t('searchPlaceholder')}</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-200 dark:bg-stone-900 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/my-learning"
              onClick={onClose}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60 flex items-center justify-between"
            >
              <span>{t('navMyLearning')}</span>
              <Bookmark className="w-4 h-4 text-stone-400" />
            </Link>
          </nav>
        </div>

        {/* Footer actions: Language & Theme */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {t('languageSelect')}
            </span>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-md">
              {(['ar', 'en', 'am'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                    language === l
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {l === 'ar' ? 'عربي' : l === 'en' ? 'EN' : 'አማርኛ'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>{theme === 'dark' ? t('darkMode') : t('lightMode')}</span>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Telegram link */}
          <a
            href="https://t.me/ShaykhMuhammadZain_Archive"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram Channel Archive</span>
          </a>
        </div>
      </div>
    </div>
  );
}
