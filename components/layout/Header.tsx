'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/context/ThemeContext';
import { Language } from '@/types/library';
import {
  Search,
  Globe,
  Sun,
  Moon,
  Bookmark,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { SearchModal } from '@/components/search/SearchModal';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/duruus', label: t('navDuruus') },
    { href: '/series', label: t('navSeries') },
    { href: '/kutub', label: t('navKutub') },
    { href: '/categories', label: t('navCategories') },
    { href: '/about', label: t('navAbout') },
    { href: '/admin', label: t('navAdmin') },
  ];

  const languages: { code: Language; label: string; nativeLabel: string }[] = [
    { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'am', label: 'Amharic', nativeLabel: 'አማርኛ' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800 bg-[#FBF9F5]/95 dark:bg-[#0C1410]/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <Link href="/" className="group flex items-center gap-3 shrink-0 focus-visible:outline-none">
            <div className="w-9 h-9 rounded-sm bg-emerald-900 dark:bg-emerald-800 flex items-center justify-center text-amber-100 font-serif text-lg font-bold shadow-xs">
              ز
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'مكتبة الشيخ محمد زين' : 'محمد زين'}
              </span>
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 tracking-wide uppercase">
                {language === 'ar' ? 'أرشيف العلوم الشرعية' : 'Shaykh Muhammad Zain'}
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-stone-600 dark:text-stone-300">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-emerald-800 dark:hover:text-emerald-400 ${
                    isActive
                      ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                      : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 dark:bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label={t('quickSearch')}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md border border-stone-200/80 dark:border-stone-700/60 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span className="hidden md:inline">{t('searchCommand')}</span>
              <kbd className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] font-mono text-stone-400 dark:text-stone-500 bg-stone-200/60 dark:bg-stone-900 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-label={t('languageSelect')}
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/80 rounded-md transition-colors cursor-pointer"
              >
                <Globe className="w-4 h-4" />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-36 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-lg py-1 z-50 text-xs">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-start flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer ${
                          language === l.code
                            ? 'text-emerald-800 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/20'
                            : 'text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <span>{l.nativeLabel}</span>
                        {language === l.code && (
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/80 rounded-md transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* My Learning / Saved */}
            <Link
              href="/my-learning"
              aria-label={t('navMyLearning')}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/80 rounded-md transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-md transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Slide-out Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
