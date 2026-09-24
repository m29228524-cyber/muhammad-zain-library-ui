'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/types/library';
import { useAudio } from '@/lib/context/AudioContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Play, Pause, Bookmark, CheckCircle, FileText } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  viewMode?: 'card' | 'row';
}

export function LessonCard({ lesson, viewMode = 'card' }: LessonCardProps) {
  const { currentLesson, isPlaying, playLesson, togglePlay } = useAudio();
  const { language, t } = useLanguage();
  const { isCompleted, toggleCompleted, isBookmarked, toggleBookmark } = useLearning();

  const isCurrent = currentLesson?.id === lesson.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;
  const completed = isCompleted(lesson.id);
  const bookmarked = isBookmarked('lesson', lesson.id);

  const series = LibraryRepository.getSeriesById(lesson.seriesId);
  const category = LibraryRepository.getCategoryById(lesson.categoryId);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playLesson(lesson);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark('lesson', lesson.id);
  };

  const handleCompleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompleted(lesson.id);
  };

  // Row View
  if (viewMode === 'row') {
    return (
      <div className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-lg border transition-all ${
        isCurrent
          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
          : 'bg-[#FBF9F5] dark:bg-[#111C16] border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700'
      }`}>
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Play Button */}
          <button
            onClick={handlePlayClick}
            aria-label={isCurrentlyPlaying ? t('pause') : t('play')}
            className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isCurrentlyPlaying
                ? 'bg-emerald-800 text-amber-100 shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 group-hover:bg-emerald-900 group-hover:text-amber-100'
            }`}
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
            )}
          </button>

          {/* Lesson Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-0.5">
              <span className="font-mono font-medium">#{lesson.lessonNumber.toString().padStart(3, '0')}</span>
              {category && (
                <>
                  <span aria-hidden="true">·</span>
                  <Link
                    href={`/categories/${category.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline text-emerald-800 dark:text-emerald-400 font-medium truncate"
                  >
                    {language === 'ar' ? category.name_ar : category.name_en}
                  </Link>
                </>
              )}
              {series && (
                <>
                  <span aria-hidden="true">·</span>
                  <Link
                    href={`/series/${series.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline text-stone-600 dark:text-stone-400 truncate"
                  >
                    {language === 'ar' ? series.title_ar : series.title_en}
                  </Link>
                </>
              )}
            </div>

            <Link
              href={`/duruus/${lesson.id}`}
              className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-1"
            >
              {language === 'ar' ? lesson.title_ar : lesson.title_en}
            </Link>

            <div className="flex items-center gap-3 text-[11px] text-stone-400 dark:text-stone-500 mt-1">
              <span className="font-mono">{LibraryRepository.formatDuration(lesson.duration)}</span>
              <span aria-hidden="true">·</span>
              <span>{lesson.date}</span>
              {lesson.pdfUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                    <FileText className="w-3 h-3" /> PDF
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0 ml-3 rtl:mr-3 rtl:ml-0">
          <button
            onClick={handleCompleteClick}
            title={completed ? t('completed') : t('markCompleted')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              completed
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-stone-300 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </button>

          <button
            onClick={handleBookmarkClick}
            title={bookmarked ? t('bookmarked') : t('bookmark')}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              bookmarked
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-stone-300 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  // Card View
  return (
    <div className={`group flex flex-col justify-between p-5 rounded-xl border transition-all ${
      isCurrent
        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 shadow-xs'
        : 'bg-[#FBF9F5] dark:bg-[#111C16] border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs'
    }`}>
      <div>
        {/* Zero-Pill Metadata Line */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-mono font-medium text-emerald-800 dark:text-emerald-400">
              #{lesson.lessonNumber.toString().padStart(3, '0')}
            </span>
            {category && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{language === 'ar' ? category.name_ar : category.name_en}</span>
              </>
            )}
          </div>
          <button
            onClick={handleBookmarkClick}
            title={bookmarked ? t('bookmarked') : t('bookmark')}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              bookmarked
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-stone-300 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-300'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <Link
          href={`/duruus/${lesson.id}`}
          className="block text-base font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2"
        >
          {language === 'ar' ? lesson.title_ar : lesson.title_en}
        </Link>

        {/* Series link if available */}
        {series && (
          <Link
            href={`/series/${series.id}`}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors line-clamp-1 mb-3"
          >
            {language === 'ar' ? series.title_ar : series.title_en}
          </Link>
        )}

        {/* Short description */}
        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
          {language === 'ar' ? lesson.description_ar : lesson.description_en}
        </p>
      </div>

      {/* Card Footer: Audio Play Button + Timing */}
      <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 font-mono text-[11px]">
          <span>{LibraryRepository.formatDuration(lesson.duration)}</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.date}</span>
        </div>

        <button
          onClick={handlePlayClick}
          aria-label={isCurrentlyPlaying ? t('pause') : t('play')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            isCurrentlyPlaying
              ? 'bg-emerald-800 text-amber-100'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 group-hover:bg-emerald-900 group-hover:text-amber-100'
          }`}
        >
          {isCurrentlyPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{t('playing')}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
              <span>{t('play')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
