'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { LessonCard } from '@/components/cards/LessonCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  BookOpen,
  Layers,
  ArrowRight,
  Headphones,
  FileText,
  ChevronRight,
  FolderTree,
} from 'lucide-react';

function DuruusContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSeries = searchParams.get('series') || 'all';

  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSeries, setSelectedSeries] = useState(initialSeries);
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'lesson_number' | 'title'>('lesson_number');
  const [viewMode, setViewMode] = useState<'grouped' | 'row' | 'card'>('grouped');

  const categories = LibraryRepository.getCategories();
  const seriesList = LibraryRepository.getAllSeries(selectedCategory !== 'all' ? selectedCategory : undefined);
  const currentCategory = selectedCategory !== 'all' ? LibraryRepository.getCategoryById(selectedCategory) : null;

  const lessons = useMemo(() => {
    return LibraryRepository.getLessons({
      searchQuery,
      categoryId: selectedCategory,
      seriesId: selectedSeries,
      durationRange: selectedDuration as any,
      sortBy,
    });
  }, [searchQuery, selectedCategory, selectedSeries, selectedDuration, sortBy]);

  // Group lessons by their parent Series
  const groupedLessons = useMemo(() => {
    const map = new Map<string, typeof lessons>();
    lessons.forEach((l) => {
      const sId = l.seriesId || 'uncategorized';
      if (!map.has(sId)) {
        map.set(sId, []);
      }
      map.get(sId)!.push(l);
    });

    return Array.from(map.entries()).map(([sId, items]) => {
      const s = LibraryRepository.getSeriesById(sId);
      const b = s?.bookId ? LibraryRepository.getBookById(s.bookId) : undefined;
      return {
        series: s,
        book: b,
        lessons: items.sort((a, b) => a.lessonNumber - b.lessonNumber),
      };
    });
  }, [lessons]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSeries('all');
    setSelectedDuration('all');
    setSortBy('lesson_number');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedSeries !== 'all' ||
    selectedDuration !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          ...(currentCategory
            ? [
                {
                  label: language === 'ar' ? currentCategory.name_ar : currentCategory.name_en,
                  href: `/categories/${currentCategory.id}`,
                },
              ]
            : []),
          { label: t('navDuruus') },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
            Curriculum &amp; Audio Lessons
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mt-1">
            {language === 'ar' ? 'سجل الدروس والمجالس العلمية' : 'Curated Audio Lessons Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl leading-relaxed">
            {language === 'ar'
              ? 'الدروس العلمية مرتبة بحسب السلاسل والمتون المشروحة، مرفقة بالملفات الصوتية والمصادر المعتمدة.'
              : 'Scholarly lessons sequentially structured within their parent collections and books, with high-fidelity audio lectures and attached texts.'}
          </p>
        </div>

        {/* View Mode Toggle: Grouped by Series vs Flat List/Grid */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 text-xs">
            <button
              onClick={() => setViewMode('grouped')}
              aria-label="Grouped by Series"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer font-medium ${
                viewMode === 'grouped'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'حسب السلاسل' : 'By Series'}</span>
            </button>
            <button
              onClick={() => setViewMode('row')}
              aria-label="List view"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'row'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Sequential List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              aria-label="Grid view"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Cards Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hierarchical Context Notice (if category is chosen) */}
      {currentCategory && (
        <div className="mb-6 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                {language === 'ar'
                  ? `تصفح فن: ${currentCategory.name_ar}`
                  : `Discipline: ${currentCategory.name_en}`}
              </h4>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                {language === 'ar'
                  ? 'يمكنك استعراض صفحة هذا الفن للاطلاع على السلاسل المقررة والمتون المعتمدة أولاً.'
                  : 'You can explore this discipline’s dedicated page to see its structured collections and classical texts.'}
              </p>
            </div>
          </div>
          <Link
            href={`/categories/${currentCategory.id}`}
            className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold shrink-0 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{language === 'ar' ? 'فتح صفحة الفن' : 'Explore Discipline'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 mb-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            />
          </div>

          {/* Discipline/Category Select */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSeries('all');
              }}
              className="w-full py-2 px-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ar' ? c.name_ar : c.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Series Select */}
          <div className="md:col-span-3">
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="w-full py-2 px-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer truncate"
            >
              <option value="all">{t('allSeries')}</option>
              {seriesList.map((s) => (
                <option key={s.id} value={s.id}>
                  {language === 'ar' ? s.title_ar : s.title_en}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Select */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
            >
              <option value="lesson_number">{t('sortLessonNumber')}</option>
              <option value="newest">{t('sortNewest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
              <option value="title">{t('sortTitle')}</option>
            </select>
          </div>

        </div>

        {/* Active Filters Row */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-200/60 dark:border-stone-800/60 text-xs">
            <div className="flex items-center gap-2 text-stone-500">
              <span>Showing {lessons.length} lessons</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('clearFilters')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Content Rendering: Grouped by Series vs Flat List */}
      {lessons.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
          <BookOpen className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
          <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
            {t('noResults')}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
            No lessons match your current filter criteria. Try clearing filters or searching another keyword.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t('clearFilters')}
          </button>
        </div>
      ) : viewMode === 'grouped' ? (
        /* HIERARCHICAL GROUPED VIEW (Requirement 1 & 8) */
        <div className="space-y-8">
          {groupedLessons.map(({ series, book, lessons: groupItems }) => (
            <div
              key={series ? series.id : 'unknown'}
              className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs"
            >
              {/* Parent Series Header Card */}
              <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 dark:bg-stone-900/60">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {series && (
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'سلسلة علمية' : 'Series Collection'}</span>
                      </span>
                    )}
                    <span className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">
                      {groupItems.length} {language === 'ar' ? 'مجالس' : 'lessons'}
                    </span>
                    {book && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{language === 'ar' ? 'كتاب متاح' : 'Book Available'}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                    {series
                      ? (language === 'ar' ? series.title_ar : series.title_en)
                      : 'Lessons'}
                  </h3>

                  {book && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-0.5">
                      {language === 'ar' ? book.author_ar : book.author_en}
                    </p>
                  )}
                </div>

                {series && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/series/${series.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{language === 'ar' ? 'استعراض السلسلة' : 'Explore Collection'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Ordered Lessons within this Series */}
              <div className="p-4 sm:p-5 flex flex-col gap-2">
                {groupItems.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} viewMode="row" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'row' ? (
        <div className="flex flex-col gap-2.5">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} viewMode="row" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} viewMode="card" />
          ))}
        </div>
      )}

    </div>
  );
}

export default function DuruusPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-stone-400 dark:text-stone-500">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading lessons catalog...</p>
        </div>
      }
    >
      <DuruusContent />
    </Suspense>
  );
}
