'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LessonCard } from '@/components/cards/LessonCard';
import { SeriesCard } from '@/components/cards/SeriesCard';
import { BookCard } from '@/components/cards/BookCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { Search, Compass, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const { language, t } = useLanguage();
  const [query, setQuery] = useState(queryParam);
  const [prevQueryParam, setPrevQueryParam] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<'all' | 'lessons' | 'series' | 'books' | 'categories'>('all');

  if (queryParam !== prevQueryParam) {
    setPrevQueryParam(queryParam);
    setQuery(queryParam);
  }

  const results = LibraryRepository.searchAll(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navSearch') }]} />

      {/* Header & Search Bar */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100 mb-4">
          {language === 'ar' ? 'البحث في محتويات المكتبة' : 'Search the Digital Library'}
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs">
          <Search className="w-5 h-5 absolute left-3.5 rtl:left-auto rtl:right-3.5 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-11 pr-24 rtl:pr-11 rtl:pl-24 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
          <button
            type="submit"
            className="absolute right-2 rtl:right-auto rtl:left-2 px-3.5 py-1.5 bg-emerald-900 text-amber-100 rounded-lg text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
          >
            {t('searchButton')}
          </button>
        </form>
      </div>

      {query.trim() ? (
        <div>
          {/* Result Tabs */}
          <div className="border-b border-stone-200 dark:border-stone-800 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs sm:text-sm font-medium overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>All Results ({results.totalCount})</span>
                {activeTab === 'all' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('lessons')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'lessons'
                    ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Lessons ({results.lessons.length})</span>
                {activeTab === 'lessons' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('series')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'series'
                    ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Series ({results.series.length})</span>
                {activeTab === 'series' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'books'
                    ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Books ({results.books.length})</span>
                {activeTab === 'books' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'categories'
                    ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>Disciplines ({results.categories.length})</span>
                {activeTab === 'categories' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
                )}
              </button>
            </div>

            <span className="text-xs text-stone-400 hidden sm:inline">
              Found {results.totalCount} matches for &quot;{query}&quot;
            </span>
          </div>

          {/* Results Sections */}
          {results.totalCount > 0 ? (
            <div className="space-y-12">
              
              {/* Lessons */}
              {(activeTab === 'all' || activeTab === 'lessons') && results.lessons.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">
                    {t('navDuruus')} ({results.lessons.length})
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {results.lessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} viewMode="row" />
                    ))}
                  </div>
                </div>
              )}

              {/* Series */}
              {(activeTab === 'all' || activeTab === 'series') && results.series.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">
                    {t('navSeries')} ({results.series.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.series.map((s) => (
                      <SeriesCard key={s.id} series={s} />
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {(activeTab === 'all' || activeTab === 'books') && results.books.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">
                    {t('navKutub')} ({results.books.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.books.map((b) => (
                      <BookCard key={b.id} book={b} />
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {(activeTab === 'all' || activeTab === 'categories') && results.categories.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">
                    {t('navCategories')} ({results.categories.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.categories.map((c) => (
                      <CategoryCard key={c.id} category={c} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
              <Compass className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
              <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
                {t('noResults')}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                No library items matched &quot;{query}&quot;. Try exploring by category or browsing the full catalog.
              </p>
            </div>
          )}

        </div>
      ) : (
        <div className="py-20 text-center text-stone-400 dark:text-stone-500">
          <Compass className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm font-medium">Type any term to search across lessons, series, books, and subjects.</p>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-stone-400 dark:text-stone-500">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
