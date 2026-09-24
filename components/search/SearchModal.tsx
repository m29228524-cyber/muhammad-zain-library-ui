'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import {
  Search,
  X,
  BookOpen,
  Layers,
  FileText,
  Compass,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['Riyad as-Salihin', 'Tafsir Ibn Kathir', 'الإخلاص', 'الواسطية'];
    try {
      const saved = localStorage.getItem('library_recent_searches');
      return saved ? JSON.parse(saved) : ['Riyad as-Salihin', 'Tafsir Ibn Kathir', 'الإخلاص', 'الواسطية'];
    } catch {
      return ['Riyad as-Salihin', 'Tafsir Ibn Kathir', 'الإخلاص', 'الواسطية'];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setQuery('');
    }
  }

  // Global Cmd+K trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          inputRef.current?.focus();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const searchResults = query.trim() ? LibraryRepository.searchAll(query) : null;

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  const handleCommitSearch = () => {
    if (query.trim()) {
      try {
        const next = [query.trim(), ...recentSearches.filter((s) => s !== query.trim())].slice(0, 8);
        setRecentSearches(next);
        localStorage.setItem('library_recent_searches', JSON.stringify(next));
      } catch {
        // ignore
      }
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden transition-all">
        
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommitSearch();
            }}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-stone-100 dark:divide-stone-800/60">
          
          {/* If no query: show recent searches and quick links */}
          {!query.trim() && (
            <div className="py-2">
              <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2.5">
                {t('recentSearches')}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectRecent(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                  >
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <div className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                {t('popularDisciplines')}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LibraryRepository.getCategories().slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/duruus?category=${cat.id}`}
                    onClick={onClose}
                    className="p-2.5 rounded-lg border border-stone-200/80 dark:border-stone-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-medium text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    {language === 'ar' ? cat.name_ar : cat.name_en}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* If query has results */}
          {searchResults && searchResults.totalCount > 0 && (
            <div className="flex flex-col gap-4 py-2">
              
              {/* Lessons */}
              {searchResults.lessons.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                    {t('navDuruus')} ({searchResults.lessons.length})
                  </div>
                  <div className="flex flex-col gap-1">
                    {searchResults.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/duruus/${lesson.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800/80 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <BookOpen className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-400">
                              {language === 'ar' ? lesson.title_ar : lesson.title_en}
                            </p>
                            <p className="text-[11px] text-stone-400 truncate">
                              Lesson #{lesson.lessonNumber} · {LibraryRepository.formatDuration(lesson.duration)}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Series */}
              {searchResults.series.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                    {t('navSeries')} ({searchResults.series.length})
                  </div>
                  <div className="flex flex-col gap-1">
                    {searchResults.series.map((s) => (
                      <Link
                        key={s.id}
                        href={`/series/${s.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800/80 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate group-hover:text-amber-800 dark:group-hover:text-amber-400">
                              {language === 'ar' ? s.title_ar : s.title_en}
                            </p>
                            <p className="text-[11px] text-stone-400 truncate">
                              {s.lessonCount} {t('duruusCount')}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {searchResults.books.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2">
                    {t('navKutub')} ({searchResults.books.length})
                  </div>
                  <div className="flex flex-col gap-1">
                    {searchResults.books.map((b) => (
                      <Link
                        key={b.id}
                        href={`/kutub/${b.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800/80 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-stone-600 dark:text-stone-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-800 dark:text-stone-200 truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-400">
                              {language === 'ar' ? b.title_ar : b.title_en}
                            </p>
                            <p className="text-[11px] text-stone-400 truncate">
                              {language === 'ar' ? b.author_ar : b.author_en}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* If query has 0 results */}
          {searchResults && searchResults.totalCount === 0 && (
            <div className="py-12 text-center text-stone-400 dark:text-stone-500">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">{t('noResults')}</p>
              <p className="text-xs mt-1">Try searching for &quot;Hadith&quot;, &quot;Tafsir&quot;, or &quot;الإخلاص&quot;</p>
            </div>
          )}

        </div>

        {/* Footer */}
        {query.trim() && (
          <div className="p-3 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
            <span>Press <kbd className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded font-mono">Enter</kbd> for full catalog search</span>
            <button
              onClick={handleCommitSearch}
              className="text-emerald-800 dark:text-emerald-400 font-semibold hover:underline"
            >
              See all results →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
