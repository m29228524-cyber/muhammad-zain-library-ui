'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/library';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import { BookOpen, FileText, Bookmark, Download } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { language, t } = useLanguage();
  const { isBookmarked, toggleBookmark } = useLearning();

  const category = LibraryRepository.getCategoryById(book.categoryId);
  const bookmarked = isBookmarked('book', book.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark('book', book.id);
  };

  return (
    <Link
      href={`/kutub/${book.id}`}
      className="group flex flex-col bg-[#FBF9F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-xl overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs transition-all"
    >
      {/* Book Cover */}
      <div className="relative aspect-4/3 w-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={language === 'ar' ? book.title_ar : book.title_en}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
            <BookOpen className="w-10 h-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-80" />

        {/* Bookmark Icon */}
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

        {/* Zero-Pill Bottom meta */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] text-stone-200 font-medium drop-shadow-sm">
          <span>{category ? (language === 'ar' ? category.name_ar : category.name_en) : ''}</span>
          {book.pdfPages && (
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {book.pdfPages} pages
            </span>
          )}
        </div>
      </div>

      {/* Book Information */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-1.5">
            {language === 'ar' ? book.title_ar : book.title_en}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 italic line-clamp-1 mb-2">
            {language === 'ar' ? book.author_ar : book.author_en}
          </p>

          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
            {language === 'ar' ? book.description_ar : book.description_en}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>
            {book.lessonCount} {t('duruusCount')}
          </span>
          <span className="text-emerald-800 dark:text-emerald-400 font-medium group-hover:underline">
            {t('viewAll')} →
          </span>
        </div>
      </div>
    </Link>
  );
}
