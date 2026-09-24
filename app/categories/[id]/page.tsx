'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAudio } from '@/lib/context/AudioContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  BookOpen,
  Scroll,
  ShieldCheck,
  Scale,
  Compass,
  PenTool,
  HeartHandshake,
  Layers,
  FileText,
  Play,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const { language, t } = useLanguage();
  const { playLesson } = useAudio();

  const [expandedSeriesId, setExpandedSeriesId] = useState<string | null>(null);

  const category = LibraryRepository.getCategoryById(categoryId);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Category Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested discipline or category could not be found.
        </p>
        <Link
          href="/categories"
          className="px-4 py-2 bg-emerald-900 text-amber-100 rounded-md text-xs font-semibold"
        >
          Return to Categories
        </Link>
      </div>
    );
  }

  const categoryName = language === 'ar' ? category.name_ar : category.name_en;

  // Hierarchical data: Category -> Series -> Books -> Lessons
  const seriesList = LibraryRepository.getAllSeries(category.id);
  const booksList = LibraryRepository.getBooks(category.id);
  const allCategoryLessons = LibraryRepository.getLessons({ categoryId: category.id });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Scroll': return <Scroll className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const toggleExpandSeries = (sId: string) => {
    setExpandedSeriesId(expandedSeriesId === sId ? null : sId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs: Home -> Categories -> Discipline */}
      <Breadcrumbs
        items={[
          { label: t('navCategories'), href: '/categories' },
          { label: language === 'ar' ? category.name_ar : category.name_en },
        ]}
      />

      {/* Category Hero Banner */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/90 dark:border-stone-800/90 rounded-2xl p-6 sm:p-8 lg:p-10 mb-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-900/5 dark:bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-100 flex items-center justify-center shadow-xs">
                {getCategoryIcon(category.icon)}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
                  {language === 'ar' ? 'فنون العلوم الشرعية' : 'Islamic Sacred Science'}
                </span>
                <span className="block text-xs text-stone-500 dark:text-stone-400">
                  {language === 'ar' ? 'تصنيف منهجي متكامل' : 'Structured Curricular Collection'}
                </span>
              </div>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 tracking-tight leading-tight mb-2">
              {language === 'ar' ? category.name_ar : category.name_en}
            </h1>

            {language !== 'ar' && (
              <h2 className="font-arabic font-bold text-xl text-emerald-950 dark:text-emerald-300 mb-4">
                {category.name_ar}
              </h2>
            )}

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
              {language === 'ar' ? category.description_ar : category.description_en}
            </p>

            {/* Hierarchical Stats Overview */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-700 dark:text-stone-300 border-t border-stone-200/80 dark:border-stone-800/80 pt-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span className="font-semibold text-stone-900 dark:text-stone-100">{seriesList.length}</span>
                <span>{language === 'ar' ? 'سلاسل ومجموعات علمية' : 'Series & Collections'}</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span className="font-semibold text-stone-900 dark:text-stone-100">{booksList.length}</span>
                <span>{language === 'ar' ? 'كتب ومتون مقررة' : 'Studied Books'}</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span className="font-semibold text-stone-900 dark:text-stone-100">{allCategoryLessons.length}</span>
                <span>{language === 'ar' ? 'دروس صوتية مفهرسة' : 'Cataloged Lessons'}</span>
              </div>
            </div>

          </div>

          {/* Quick Action Navigation */}
          <div className="shrink-0 flex md:flex-col gap-2">
            <Link
              href="/categories"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{language === 'ar' ? 'جميع التصنيفات' : 'All Disciplines'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 1: Thematic Collections & Series (Category -> Series) */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              {language === 'ar' ? 'السلاسل العلمية المقررة' : 'Primary Educational Collections'}
            </span>
            <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mt-0.5">
              {language === 'ar' ? 'السلاسل والشروحات العلمية' : `Series & Collections in ${categoryName}`}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {language === 'ar'
                ? 'مجموعات الدروس المنظمة في هذا الباب، كل سلسلة تضم فهرساً مرتباً بالمجالس الصوتية والمتن المصاحب.'
                : 'Curated curriculum series. Each collection organizes individual lessons sequentially with their attached audio lectures and texts.'}
            </p>
          </div>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 hidden sm:block">
            {seriesList.length} {language === 'ar' ? 'سلاسل' : 'Collections'}
          </span>
        </div>

        {seriesList.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 dark:bg-stone-900/50 rounded-xl border border-stone-200 dark:border-stone-800">
            <Layers className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-xs text-stone-500">No active series listed for this discipline.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesList.map((series) => {
              const seriesLessons = LibraryRepository.getLessonsBySeries(series.id);
              const linkedBook = series.bookId ? LibraryRepository.getBookById(series.bookId) : undefined;
              const isExpanded = expandedSeriesId === series.id;

              return (
                <div
                  key={series.id}
                  className="group flex flex-col justify-between bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl overflow-hidden hover:border-emerald-800/50 dark:hover:border-emerald-700/60 hover:shadow-md transition-all"
                >
                  <div>
                    {/* Header Image & Status */}
                    <div className="relative aspect-16/9 bg-stone-100 dark:bg-stone-900 overflow-hidden">
                      {series.coverImage ? (
                        <Image
                          src={series.coverImage}
                          alt={language === 'ar' ? series.title_ar : series.title_en}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                          <Layers className="w-8 h-8" />
                        </div>
                      )}

                      {/* Zero-Pill Badges */}
                      <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-stone-900/85 text-amber-100 text-[11px] font-medium backdrop-blur-xs flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          <span>{series.lessonCount} {language === 'ar' ? 'درساً' : 'lessons'}</span>
                        </span>
                        {linkedBook && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-950/85 text-emerald-200 border border-emerald-700/40 text-[11px] font-medium backdrop-blur-xs flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>{language === 'ar' ? 'كتاب متاح' : 'Book Available'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Collection Content */}
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {language === 'ar' ? series.title_ar : series.title_en}
                      </h3>

                      {language !== 'ar' && (
                        <h4 className="font-arabic text-xs font-semibold text-emerald-950 dark:text-emerald-400 line-clamp-1 mt-0.5 mb-2">
                          {series.title_ar}
                        </h4>
                      )}

                      {/* Author Info if Book is linked */}
                      {linkedBook && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2 line-clamp-1">
                          {language === 'ar' ? linkedBook.author_ar : linkedBook.author_en}
                        </p>
                      )}

                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
                        {language === 'ar' ? series.description_ar : series.description_en}
                      </p>

                      {/* Ordered Lessons Sample Bar */}
                      <div className="bg-white/80 dark:bg-stone-900/80 rounded-xl p-3 border border-stone-200/60 dark:border-stone-800/60 mb-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Scroll className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            <span>{language === 'ar' ? 'فهرس الدروس' : 'Curriculum Order'}</span>
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            {LibraryRepository.formatDurationHuman(series.totalDuration, language)}
                          </span>
                        </div>

                        {/* Top 3 Lessons Preview */}
                        <div className="space-y-1.5">
                          {seriesLessons.slice(0, 3).map((l) => (
                            <div
                              key={l.id}
                              className="flex items-center justify-between gap-2 text-[11px] text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                            >
                              <span className="font-mono text-emerald-800 dark:text-emerald-400 font-semibold shrink-0">
                                {l.lessonNumber.toString().padStart(2, '0')}
                              </span>
                              <span className="truncate flex-1">
                                {language === 'ar' ? l.title_ar : l.title_en}
                              </span>
                              <button
                                onClick={() => playLesson(l)}
                                title="Play Lesson Audio"
                                className="p-1 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            </div>
                          ))}
                          {series.lessonCount > 3 && (
                            <p className="text-[10px] text-stone-400 pt-1 text-center font-medium">
                              +{series.lessonCount - 3} {language === 'ar' ? 'دروس إضافية في هذه السلسلة' : 'more lessons'}
                            </p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-stone-200/60 dark:border-stone-800/60 mt-2">
                    <Link
                      href={`/series/${series.id}`}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{language === 'ar' ? 'استعراض السلسلة والدروس' : 'Explore Series'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>

                    {seriesLessons.length > 0 && (
                      <button
                        onClick={() => playLesson(seriesLessons[0])}
                        title="Start Audio Playback from Lesson 1"
                        className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: Associated Classical Texts & Books (Category -> Books) */}
      {booksList.length > 0 && (
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
                {language === 'ar' ? 'المتون والمصادر المعتمدة' : 'Studied Texts & Treatises'}
              </span>
              <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mt-0.5">
                {language === 'ar' ? 'الكتب والمتون المقررة في هذا الفن' : `Classical Books Studied in ${categoryName}`}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {language === 'ar'
                  ? 'المتون الأصلية والكتب التراثية المشروحة في هذه الدروس مع إمكانية القراءة والتحميل المباشر بصيغة PDF.'
                  : 'Classical source texts and treatises explained in these lessons with direct PDF reading and download support.'}
              </p>
            </div>
            <Link
              href="/kutub"
              className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'جميع الكتب' : 'All Books'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {booksList.map((book) => (
              <div
                key={book.id}
                className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl flex flex-col justify-between hover:border-emerald-800/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    {book.pdfAvailable && (
                      <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                        PDF {book.pdfSize ? `· ${book.pdfSize}` : ''}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
                    {language === 'ar' ? book.title_ar : book.title_en}
                  </h3>

                  <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2">
                    {language === 'ar' ? book.author_ar : book.author_en}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
                    {language === 'ar' ? book.description_ar : book.description_en}
                  </p>

                  {book.tableOfContents && book.tableOfContents.length > 0 && (
                    <div className="text-[11px] text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/60 pt-2 mb-4">
                      <span className="font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                        {language === 'ar' ? 'أبواب المتن:' : 'Key Chapters:'}
                      </span>
                      <ul className="space-y-1">
                        {book.tableOfContents.slice(0, 2).map((item) => (
                          <li key={item.chapter} className="truncate flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-500 shrink-0" />
                            <span>{language === 'ar' ? item.title_ar : item.title_en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between gap-2">
                  <Link
                    href={`/kutub/${book.id}`}
                    className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'تفاصيل الكتاب والفهرس' : 'Book Details & PDF'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>

                  {book.seriesId && (
                    <Link
                      href={`/series/${book.seriesId}`}
                      className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1"
                    >
                      <span>{language === 'ar' ? 'شرح السلسلة' : 'Audio Series'}</span>
                      <Headphones className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: Sequential Lesson Catalog Organized by Series (Category -> Series -> Lessons) */}
      <section>
        <div className="flex items-end justify-between mb-6 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              {language === 'ar' ? 'التسلسل المنهجي للمجالس' : 'Curriculum Lesson Directory'}
            </span>
            <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mt-0.5">
              {language === 'ar' ? 'فهرس الدروس مرتبة حسب السلاسل' : 'Ordered Lessons by Series'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {language === 'ar'
                ? 'لا يتم عرض الدروس بشكل عشوائي، بل وفق تسلسل كل كتاب وسلسلة لضمان التحصيل العلمي المتدرج.'
                : 'Lessons are strictly structured under their respective parent series, reflecting authentic classical progression.'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {seriesList.map((series) => {
            const seriesLessons = LibraryRepository.getLessonsBySeries(series.id);
            const isExpanded = expandedSeriesId === series.id;

            return (
              <div
                key={series.id}
                className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl overflow-hidden shadow-xs"
              >
                {/* Series Banner Header / Toggle */}
                <div
                  onClick={() => toggleExpandSeries(series.id)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/50 dark:hover:bg-stone-900/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-900/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                          {language === 'ar' ? series.title_ar : series.title_en}
                        </h3>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                          {seriesLessons.length} {language === 'ar' ? 'دروس' : 'lessons'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                        {language === 'ar' ? series.description_ar : series.description_en}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/series/${series.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold items-center gap-1 transition-colors"
                    >
                      <span>{language === 'ar' ? 'صفحة السلسلة' : 'Series Page'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle series lesson list"
                      className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Lesson List (Collapsible / Default Expanded for first series) */}
                {(isExpanded || expandedSeriesId === null) && (
                  <div className="border-t border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-6 bg-white/50 dark:bg-[#0E1712]/50">
                    <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
                      {seriesLessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="py-3 sm:py-3.5 flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-900/60 px-3 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Sequence number */}
                            <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                              {lesson.lessonNumber.toString().padStart(2, '0')}
                            </span>

                            <div className="min-w-0">
                              <Link
                                href={`/duruus/${lesson.id}`}
                                className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 hover:text-emerald-900 dark:hover:text-emerald-400 transition-colors line-clamp-1 block"
                              >
                                {language === 'ar' ? lesson.title_ar : lesson.title_en}
                              </Link>
                              <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{LibraryRepository.formatDuration(lesson.duration)}</span>
                                </span>
                                {lesson.pdfUrl && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400">
                                      <FileText className="w-3 h-3" />
                                      <span>PDF</span>
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => playLesson(lesson)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span className="hidden sm:inline">{language === 'ar' ? 'تشغيل' : 'Play'}</span>
                            </button>

                            <Link
                              href={`/duruus/${lesson.id}`}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                              title="View Lesson Details"
                            >
                              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
