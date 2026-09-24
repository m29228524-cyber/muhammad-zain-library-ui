'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Series } from '@/types/library';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Layers, Clock, Bookmark, FileText } from 'lucide-react';

interface SeriesCardProps {
  series: Series;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const { language, t } = useLanguage();
  const { getSeriesProgress, isBookmarked, toggleBookmark } = useLearning();

  const category = LibraryRepository.getCategoryById(series.categoryId);
  const book = series.bookId ? LibraryRepository.getBookById(series.bookId) : undefined;
  const seriesLessons = LibraryRepository.getLessonsBySeries(series.id);
  const lessonIds = seriesLessons.map((l) => l.id);
  const progress = getSeriesProgress(series.id, lessonIds);
  const bookmarked = isBookmarked('series', series.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark('series', series.id);
  };

  return (
    <Link
      href={`/series/${series.id}`}
      className="group flex flex-col bg-[#FBF9F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-xl overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs transition-all"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-16/10 w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
        {series.coverImage ? (
          <Image
            src={series.coverImage}
            alt={language === 'ar' ? series.title_ar : series.title_en}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
            <Layers className="w-10 h-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-80" />

        {/* Bookmark Icon in top right */}
        <button
          onClick={handleBookmark}
          title={bookmarked ? t('bookmarked') : t('bookmark')}
          className={`absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            bookmarked
              ? 'bg-amber-500/90 text-white'
              : 'bg-stone-900/40 text-stone-200 hover:bg-stone-900/70'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Overlay Badges: Zero-Pill text */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-stone-200 font-medium drop-shadow-sm">
          <span>{category ? (language === 'ar' ? category.name_ar : category.name_en) : ''}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {LibraryRepository.formatDurationHuman(series.totalDuration, language)}
          </span>
        </div>
      </div>

      {/* Series Details */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2">
            {language === 'ar' ? series.title_ar : series.title_en}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
            {language === 'ar' ? series.description_ar : series.description_en}
          </p>
        </div>

        {/* Progress or Stats */}
        <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
          {progress.completedCount > 0 ? (
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1.5 font-medium">
                <span>{progress.completedCount} of {progress.totalCount} completed</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-700 dark:bg-emerald-500 rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                <span>{series.lessonCount} {t('duruusCount')}</span>
                {book?.pdfAvailable && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{language === 'ar' ? 'كتاب متاح' : 'Book available'}</span>
                    </span>
                  </>
                )}
              </div>
              <span className="text-emerald-800 dark:text-emerald-400 font-medium group-hover:underline">
                {t('viewAll')} →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
