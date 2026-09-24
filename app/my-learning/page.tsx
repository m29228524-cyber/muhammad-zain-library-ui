'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LessonCard } from '@/components/cards/LessonCard';
import { SeriesCard } from '@/components/cards/SeriesCard';
import { BookCard } from '@/components/cards/BookCard';
import {
  Bookmark,
  CheckCircle,
  Clock,
  BookOpen,
  Layers,
  FileText,
  Play,
} from 'lucide-react';

export default function MyLearningPage() {
  const { language, t } = useLanguage();
  const { bookmarks, completedLessonIds, recentlyPlayedIds } = useLearning();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'completed' | 'history'>('bookmarks');

  // Resolve bookmarked objects
  const bookmarkedLessons = bookmarks
    .filter((b) => b.type === 'lesson')
    .map((b) => LibraryRepository.getLessonById(b.id))
    .filter(Boolean) as any[];

  const bookmarkedSeries = bookmarks
    .filter((b) => b.type === 'series')
    .map((b) => LibraryRepository.getSeriesById(b.id))
    .filter(Boolean) as any[];

  const bookmarkedBooks = bookmarks
    .filter((b) => b.type === 'book')
    .map((b) => LibraryRepository.getBookById(b.id))
    .filter(Boolean) as any[];

  // Resolve completed lessons
  const completedLessons = completedLessonIds
    .map((id) => LibraryRepository.getLessonById(id))
    .filter(Boolean) as any[];

  // Resolve recently played
  const recentLessons = recentlyPlayedIds
    .map((id) => LibraryRepository.getLessonById(id))
    .filter(Boolean) as any[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navMyLearning') }]} />

      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
          Personal Study Record
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mt-1">
          {language === 'ar' ? 'سجل متابعتي ومحفوظاتي' : 'My Learning & Saved Items'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl leading-relaxed">
          Track your progress through classical lesson series, resume your recent audio lectures, and view all saved study materials.
        </p>
      </div>

      {/* Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block">
              {bookmarks.length}
            </span>
            <span className="text-xs text-stone-500">Bookmarked Items</span>
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block">
              {completedLessonIds.length}
            </span>
            <span className="text-xs text-stone-500">Completed Lessons</span>
          </div>
        </div>

        <div className="p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block">
              {recentlyPlayedIds.length}
            </span>
            <span className="text-xs text-stone-500">Recently Played</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200 dark:border-stone-800 mb-8 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Saved Bookmarks ({bookmarks.length})</span>
          {activeTab === 'bookmarks' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Completed Lessons ({completedLessons.length})</span>
          {activeTab === 'completed' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Recently Listened ({recentLessons.length})</span>
          {activeTab === 'history' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-10">
          {bookmarkedLessons.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                Saved Lessons ({bookmarkedLessons.length})
              </h3>
              <div className="flex flex-col gap-2.5">
                {bookmarkedLessons.map((l) => (
                  <LessonCard key={l.id} lesson={l} viewMode="row" />
                ))}
              </div>
            </div>
          )}

          {bookmarkedSeries.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                Saved Series ({bookmarkedSeries.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedSeries.map((s) => (
                  <SeriesCard key={s.id} series={s} />
                ))}
              </div>
            </div>
          )}

          {bookmarkedBooks.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                Saved Books ({bookmarkedBooks.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedBooks.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </div>
          )}

          {bookmarks.length === 0 && (
            <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              <Bookmark className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
              <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
                No Bookmarks Saved Yet
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Click the bookmark icon on any lesson, series, or book while browsing to save it here.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div>
          {completedLessons.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {completedLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} viewMode="row" />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              <CheckCircle className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
              <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
                No Completed Lessons
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Mark lessons completed as you finish listening to track your progress.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          {recentLessons.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {recentLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} viewMode="row" />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              <Clock className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
              <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
                No Recently Played Lessons
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Start listening to any lecture and it will automatically appear here.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
