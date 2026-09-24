'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { useAudio } from '@/lib/context/AudioContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Layers,
  BookOpen,
  Clock,
  Play,
  Pause,
  FileText,
  Search,
  CheckCircle,
  Bookmark,
  Download,
  Share2,
  ChevronRight,
  Headphones,
  Calendar,
} from 'lucide-react';

export default function SeriesDetailPage() {
  const params = useParams();
  const seriesId = params?.id as string;
  const { language, t } = useLanguage();
  const { currentLesson, isPlaying, playLesson, togglePlay } = useAudio();
  const { getSeriesProgress, isBookmarked, toggleBookmark } = useLearning();
  const [lessonSearch, setLessonSearch] = useState('');

  const series = LibraryRepository.getSeriesById(seriesId);

  if (!series) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Series Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested series could not be found.
        </p>
        <Link href="/series" className="px-4 py-2 bg-emerald-900 text-amber-100 rounded-md text-xs font-semibold">
          Return to Series
        </Link>
      </div>
    );
  }

  const category = LibraryRepository.getCategoryById(series.categoryId);
  const book = series.bookId ? LibraryRepository.getBookById(series.bookId) : undefined;
  const lessons = LibraryRepository.getLessonsBySeries(series.id);
  const lessonIds = lessons.map((l) => l.id);
  const progress = getSeriesProgress(series.id, lessonIds);
  const bookmarked = isBookmarked('series', series.id);

  const filteredLessons = lessonSearch.trim()
    ? lessons.filter((l) =>
        l.title_en.toLowerCase().includes(lessonSearch.toLowerCase()) ||
        l.title_ar.includes(lessonSearch) ||
        (l.title_am && l.title_am.includes(lessonSearch)) ||
        l.lessonNumber.toString() === lessonSearch.trim()
      )
    : lessons;

  const handleStartListening = () => {
    if (lessons.length > 0) {
      playLesson(lessons[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hierarchical Breadcrumbs: Home -> Category -> Series */}
      <Breadcrumbs
        items={[
          ...(category
            ? [
                {
                  label: language === 'ar' ? category.name_ar : category.name_en,
                  href: `/categories/${category.id}`,
                },
              ]
            : [{ label: t('navSeries'), href: '/series' }]),
          { label: language === 'ar' ? series.title_ar : series.title_en },
        ]}
      />

      {/* Series Hero Banner */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/90 dark:border-stone-800/90 rounded-2xl overflow-hidden shadow-xs mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
          
          {/* Cover Art */}
          <div className="md:col-span-4 relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-sm">
            {series.coverImage ? (
              <Image
                src={series.coverImage}
                alt={language === 'ar' ? series.title_ar : series.title_en}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                <Layers className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Metadata & Actions */}
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              {/* Hierarchical parent link */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                {category && (
                  <>
                    <Link
                      href={`/categories/${category.id}`}
                      className="font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                    >
                      {language === 'ar' ? category.name_ar : category.name_en}
                    </Link>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span>{series.lessonCount} {t('duruusCount')}</span>
                <span aria-hidden="true">·</span>
                <span>{LibraryRepository.formatDurationHuman(series.totalDuration, language)}</span>
                {book?.pdfAvailable && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      {language === 'ar' ? 'كتاب متاح' : 'Book Available'}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-tight mb-2">
                {language === 'ar' ? series.title_ar : series.title_en}
              </h1>

              {language !== 'ar' && (
                <h2 className="font-arabic font-bold text-lg text-emerald-950 dark:text-emerald-200 mb-3">
                  {series.title_ar}
                </h2>
              )}

              {/* Author Attribution if linked to a Book */}
              {book && (
                <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 mb-3">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {language === 'ar' ? 'المؤلف:' : 'Author:'}
                  </span>
                  <span className="italic">{language === 'ar' ? book.author_ar : book.author_en}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {language === 'ar' ? series.description_ar : series.description_en}
              </p>
            </div>

            {/* Curriculum Progress & CTAs */}
            <div>
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5 font-medium">
                  <span>Progress: {progress.completedCount} of {progress.totalCount} completed</span>
                  <span>{progress.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-700 dark:bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleStartListening}
                  className="px-5 py-2.5 rounded-lg bg-emerald-900 dark:bg-emerald-700 text-amber-100 hover:bg-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
                  <span>{language === 'ar' ? 'بدء الاستماع من المجلس الأول' : 'Start from Lesson 1'}</span>
                </button>

                {book && (
                  <Link
                    href={`/kutub/${book.id}`}
                    className="px-4 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{language === 'ar' ? 'المتن وقراءة الكتاب' : 'View Book & PDF'}</span>
                  </Link>
                )}

                <button
                  onClick={() => toggleBookmark('series', series.id)}
                  title={bookmarked ? t('bookmarked') : t('bookmark')}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                    bookmarked
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                      : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Associated Book / PDF Section (Book-to-Audio Relationship) */}
      {book && (
        <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
                  {language === 'ar' ? 'المتن المعتمد المشروح' : 'Studied Classical Text & PDF'}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mt-0.5">
                  {language === 'ar' ? book.title_ar : book.title_en}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {language === 'ar' ? book.author_ar : book.author_en}
                  {book.pdfPages ? ` · ${book.pdfPages} pages` : ''}
                  {book.pdfSize ? ` · ${book.pdfSize}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/kutub/${book.id}`}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تصفح الكتاب' : 'Read Book Online'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Lesson Catalog (Hierarchy: Series -> Lessons -> Audio) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              {language === 'ar' ? 'فهرس مجالس السلسلة' : 'Lessons in this Collection'}
            </h3>
            <span className="text-xs text-stone-500">
              {filteredLessons.length} {language === 'ar' ? 'درساً مسجلاً ومرفقاً بالصوت' : 'lessons with attached audio and materials'}
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={lessonSearch}
              onChange={(e) => setLessonSearch(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في دروس هذه السلسلة...' : 'Search lessons in this series...'}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Clean, ordered list layout with clear visual hierarchy */}
        <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden divide-y divide-stone-200/70 dark:divide-stone-800/70">
          {filteredLessons.map((lesson) => {
            const isCurrentlyActive = currentLesson?.id === lesson.id;
            const isCurrentPlaying = isCurrentlyActive && isPlaying;

            return (
              <div
                key={lesson.id}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                  isCurrentlyActive
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30'
                    : 'hover:bg-white dark:hover:bg-stone-900/40'
                }`}
              >
                {/* Left: Sequence + Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      isCurrentlyActive
                        ? 'bg-emerald-900 text-amber-100'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {lesson.lessonNumber.toString().padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <Link
                      href={`/duruus/${lesson.id}`}
                      className={`font-serif font-bold text-sm sm:text-base hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors line-clamp-1 block ${
                        isCurrentlyActive
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {language === 'ar' ? lesson.title_ar : lesson.title_en}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{LibraryRepository.formatDuration(lesson.duration)}</span>
                      </span>

                      <span aria-hidden="true">·</span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{lesson.date}</span>
                      </span>

                      {lesson.pdfUrl && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-medium">
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF Attached</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Audio Playback & Link */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (isCurrentlyActive) {
                        togglePlay();
                      } else {
                        playLesson(lesson);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                      isCurrentPlaying
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-900 hover:bg-emerald-800 text-amber-100'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span className="hidden sm:inline">{language === 'ar' ? 'إيقاف' : 'Pause'}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
                        <span className="hidden sm:inline">{language === 'ar' ? 'استماع' : 'Listen'}</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/duruus/${lesson.id}`}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                    title={language === 'ar' ? 'عرض تفاصيل الدرس' : 'Lesson Details'}
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
