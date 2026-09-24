'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { SeriesCard } from '@/components/cards/SeriesCard';
import { LessonCard } from '@/components/cards/LessonCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import {
  Search,
  BookOpen,
  Layers,
  ArrowRight,
  Headphones,
  FileText,
  Send,
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [heroSearch, setHeroSearch] = useState('');

  const stats = LibraryRepository.getArchiveStats();
  const featuredSeries = LibraryRepository.getAllSeries().slice(0, 4);
  const recentLessons = LibraryRepository.getLessons().slice(0, 6);
  const categories = LibraryRepository.getCategories().slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 dark:border-stone-800/80 bg-gradient-to-b from-[#F5F1E8]/70 via-[#FBF9F5] to-[#FBF9F5] dark:from-[#08100C] dark:via-[#0C1410] dark:to-[#0C1410] pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle background ornamentation hairline */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Telegram Archive Badge - Anti-slop zero-pill clean text */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 mb-6">
              <Send className="w-3.5 h-3.5" />
              <span>{t('telegramArchiveNotice')}</span>
            </div>

            {/* Arabic Grand Headline */}
            <h1 className="font-arabic font-bold text-3xl sm:text-5xl lg:text-6xl text-emerald-950 dark:text-emerald-100 tracking-tight leading-tight mb-3">
              {t('arabicBrand')}
            </h1>

            {/* English Title & Translation */}
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-800 dark:text-stone-200 tracking-normal mb-4">
              {language === 'am' ? 'የሸይኽ ሙሓመድ ዘይን ዲጂታል ቤተ-መጻሕፍት' : 'Shaykh Muhammad Zain Digital Library'}
            </h2>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mb-8">
              {t('heroDescription')}
            </p>

            {/* Search Input Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-xl relative flex items-center mb-8 shadow-sm"
            >
              <Search className="w-5 h-5 absolute left-4 rtl:left-auto rtl:right-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-28 rtl:pr-12 rtl:pl-28 py-3.5 bg-white dark:bg-[#121E18] border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800 dark:focus:ring-emerald-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 rtl:right-auto rtl:left-2 px-4 py-2 bg-emerald-900 dark:bg-emerald-700 hover:bg-emerald-800 dark:hover:bg-emerald-600 text-amber-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {t('searchButton')}
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium">
              <Link
                href="/duruus"
                className="px-5 py-2.5 rounded-lg bg-emerald-900 dark:bg-emerald-700 text-amber-100 hover:bg-emerald-800 dark:hover:bg-emerald-600 shadow-xs transition-colors flex items-center gap-2"
              >
                <Headphones className="w-4 h-4" />
                <span>{t('exploreDuruus')}</span>
              </Link>
              <Link
                href="/series"
                className="px-5 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>{t('browseSeries')}</span>
              </Link>
              <Link
                href="/kutub"
                className="px-5 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t('viewBooks')}</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Archival Metrics Band — Zero-Pill Strict Typography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 sm:-mt-12">
        <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/90 dark:border-stone-800/90 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x md:rtl:divide-x-reverse divide-stone-200 dark:divide-stone-800">
            
            <div className="pt-3 md:pt-0">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 block">
                {stats.totalLessons}+
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">
                {t('duruusCount')}
              </span>
            </div>

            <div className="pt-3 md:pt-0">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 block">
                {stats.totalSeries}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">
                {t('seriesCount')}
              </span>
            </div>

            <div className="pt-3 md:pt-0">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 block">
                {stats.totalBooks}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">
                {t('booksCount')}
              </span>
            </div>

            <div className="pt-3 md:pt-0">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 block">
                {stats.totalAudioHours}h+
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">
                {t('audioHoursCount')}
              </span>
            </div>

            <div className="pt-3 md:pt-0 col-span-2 md:col-span-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 block">
                12
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1 block">
                {t('navCategories')}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 1. Islamic Knowledge Disciplines (Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 border-b border-stone-200/80 dark:border-stone-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              {t('categoriesSection')}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mt-1">
              {t('navCategories')}
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 flex items-center gap-1 group"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 2. Featured Thematic Series & Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 border-b border-stone-200/80 dark:border-stone-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              {t('featuredSeries')}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mt-1">
              {t('navSeries')}
            </h2>
          </div>
          <Link
            href="/series"
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 flex items-center gap-1 group"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSeries.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      </section>

      {/* 3. Recent Audio Lessons (Duruus) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 border-b border-stone-200/80 dark:border-stone-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              {t('recentLessons')}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mt-1">
              {t('navDuruus')}
            </h2>
          </div>
          <Link
            href="/duruus"
            className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 flex items-center gap-1 group"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} viewMode="card" />
          ))}
        </div>
      </section>

      {/* Archival Mission & Telegram Channel Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-900/30 bg-[#0C1A14] text-stone-200 p-8 sm:p-12 lg:p-16">
          {/* Subtle background image */}
          <div className="absolute inset-0 opacity-15">
            <Image
              src="/images/scholarly_library_interior_1790240045124.jpg"
              alt="Scholarly Library"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-xs font-medium text-amber-200 mb-4">
              <Send className="w-3.5 h-3.5" />
              <span>Official Telegram Archive</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-4xl text-amber-100 mb-4 leading-tight">
              Preserving Sacred Knowledge from Telegram to a Structured Digital Library
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed mb-8">
              Thousands of audio recordings, lesson PDFs, and lecture series delivered by Shaykh Muhammad Zain are continually gathered from the official Telegram channel, verified, cataloged into systematic curricula, and made freely accessible for students of Islamic knowledge across the world.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <a
                href="https://t.me/ShaykhMuhammadZain_Archive"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Join Official Telegram Channel</span>
              </a>
              <Link
                href="/about"
                className="px-5 py-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Learn About the Preservation Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
