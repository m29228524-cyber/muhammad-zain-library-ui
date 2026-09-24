'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Send, BookOpen, Layers, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full border-t border-stone-200 dark:border-stone-800 bg-[#F7F4EE] dark:bg-[#090F0C] text-stone-600 dark:text-stone-400 text-xs transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Archival Identity */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-emerald-900 dark:bg-emerald-800 flex items-center justify-center text-amber-100 font-serif font-bold text-xs">
                ز
              </div>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                {language === 'ar' ? 'مكتبة الشيخ محمد زين' : 'Shaykh Muhammad Zain'}
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              {t('heroDescription')}
            </p>
            <div className="pt-2">
              <a
                href="https://t.me/ShaykhMuhammadZain_Archive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-200/70 dark:bg-stone-800/80 hover:bg-stone-300/80 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Telegram Official Channel</span>
              </a>
            </div>
          </div>

          {/* Column 2: Scholarly Collections */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-stone-900 dark:text-stone-200 text-xs tracking-wider uppercase font-sans">
              {language === 'ar' ? 'الأقسام الرئيسية' : 'Library Catalog'}
            </h4>
            <ul className="flex flex-col gap-2 text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/duruus" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navDuruus')} (Audio Lessons)
                </Link>
              </li>
              <li>
                <Link href="/series" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navSeries')} (Thematic Series)
                </Link>
              </li>
              <li>
                <Link href="/kutub" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navKutub')} (Books & Treatises)
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navCategories')} (Disciplines)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Discoveries */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-stone-900 dark:text-stone-200 text-xs tracking-wider uppercase font-sans">
              {language === 'ar' ? 'سلاسل مميزة' : 'Featured Collections'}
            </h4>
            <ul className="flex flex-col gap-2 text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/series/series-riyad-as-salihin" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  Riyad as-Salihin
                </Link>
              </li>
              <li>
                <Link href="/series/series-tafsir-ibn-kathir" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  Tafsir Ibn Kathir
                </Link>
              </li>
              <li>
                <Link href="/series/series-al-aqeedah-al-wasitiyyah" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  Al-Aqeedah Al-Wasitiyyah
                </Link>
              </li>
              <li>
                <Link href="/series/series-al-ajrumiyyah" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  Al-Ajrumiyyah Grammar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Archival Project */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-stone-900 dark:text-stone-200 text-xs tracking-wider uppercase font-sans">
              {language === 'ar' ? 'عن المشروع' : 'The Archive'}
            </h4>
            <ul className="flex flex-col gap-2 text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/about" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/my-learning" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navMyLearning')}
                </Link>
              </li>
              <li>
                <Link href="/admin/import" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('adminImport')} (Workflow)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                  {t('navAdmin')}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Hairline Divider & Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 dark:text-stone-400">
          <p>
            © {new Date().getFullYear()} {language === 'ar' ? 'مكتبة الشيخ محمد زين - جميع الحقوق محفوظة لوجه الله تعالى' : 'Shaykh Muhammad Zain Digital Library. Dedicated to preserving beneficial knowledge.'}
          </p>
          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400">
            <span>Archival Telegram Mirror</span>
            <span aria-hidden="true">·</span>
            <span>Multilingual (AR / EN / AM)</span>
            <span aria-hidden="true">·</span>
            <span>No Commercial Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
