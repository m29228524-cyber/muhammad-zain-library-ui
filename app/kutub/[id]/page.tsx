'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { PDFViewerPlaceholder } from '@/components/common/PDFViewerPlaceholder';
import {
  BookOpen,
  FileText,
  Download,
  Bookmark,
  Layers,
  Headphones,
  CheckCircle,
} from 'lucide-react';

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params?.id as string;
  const { language, t } = useLanguage();
  const { isBookmarked, toggleBookmark } = useLearning();
  const [activeTab, setActiveTab] = useState<'reader' | 'toc' | 'lessons'>('reader');

  const book = LibraryRepository.getBookById(bookId);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Book Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested text could not be found in the library.
        </p>
        <Link href="/kutub" className="px-4 py-2 bg-emerald-900 text-amber-100 rounded-md text-xs font-semibold">
          Return to Kutub
        </Link>
      </div>
    );
  }

  const category = LibraryRepository.getCategoryById(book.categoryId);
  const series = book.seriesId ? LibraryRepository.getSeriesById(book.seriesId) : undefined;
  const lessons = LibraryRepository.getLessonsByBook(book.id);
  const bookmarked = isBookmarked('book', book.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          ...(category
            ? [
                {
                  label: language === 'ar' ? category.name_ar : category.name_en,
                  href: `/categories/${category.id}`,
                },
              ]
            : [{ label: t('navKutub'), href: '/kutub' }]),
          { label: language === 'ar' ? book.title_ar : book.title_en },
        ]}
      />

      {/* Book Top Header Banner */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Cover Art */}
          <div className="md:col-span-3 relative aspect-3/4 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 shadow-sm max-w-xs mx-auto md:mx-0 w-full">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={language === 'ar' ? book.title_ar : book.title_en}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-400">
                <BookOpen className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-9 flex flex-col justify-between">
            <div>
              {/* Hierarchical Header Line */}
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
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
                <span>{book.lessonCount} {t('duruusCount')}</span>
                {book.pdfPages && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{book.pdfPages} pages</span>
                  </>
                )}
                {book.pdfSize && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{book.pdfSize}</span>
                  </>
                )}
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-tight mb-1">
                {language === 'ar' ? book.title_ar : book.title_en}
              </h1>

              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic mb-4">
                {language === 'ar' ? book.author_ar : book.author_en}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                {language === 'ar' ? book.description_ar : book.description_en}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {book.pdfUrl && (
                <a
                  href={book.pdfUrl}
                  download
                  className="px-4 py-2.5 rounded-lg bg-emerald-900 text-amber-100 hover:bg-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('downloadPdf')} ({book.pdfSize || 'PDF'})</span>
                </a>
              )}

              {series && (
                <Link
                  href={`/series/${series.id}`}
                  className="px-4 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  <span>Go to Audio Series ({series.lessonCount} lessons)</span>
                </Link>
              )}

              <button
                onClick={() => toggleBookmark('book', book.id)}
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

      {/* Tabs: PDF Manuscript Reader / Table of Contents / Audio Lessons */}
      <div className="border-b border-stone-200 dark:border-stone-800 mb-6 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('reader')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'reader'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <span>PDF Manuscript Reader</span>
          {activeTab === 'reader' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('toc')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'toc'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <span>Table of Contents ({book.tableOfContents?.length || 0})</span>
          {activeTab === 'toc' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'lessons'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <span>Audio Commentary ({lessons.length})</span>
          {activeTab === 'lessons' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'reader' && (
        <PDFViewerPlaceholder
          title={language === 'ar' ? book.title_ar : book.title_en}
          pdfUrl={book.pdfUrl}
          totalPages={book.pdfPages || 48}
        />
      )}

      {activeTab === 'toc' && (
        <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-4">
            {language === 'ar' ? 'فهرس أبواب الكتاب' : 'Table of Contents &amp; Chapter Map'}
          </h3>

          {book.tableOfContents && book.tableOfContents.length > 0 ? (
            <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
              {book.tableOfContents.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-stone-400 w-8">
                      ch. {item.chapter.toString().padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        {language === 'ar' ? item.title_ar : item.title_en}
                      </p>
                      {language !== 'ar' && item.title_ar && (
                        <p className="font-arabic text-stone-400">{item.title_ar}</p>
                      )}
                    </div>
                  </div>

                  {item.lessonId && (
                    <Link
                      href={`/duruus/${item.lessonId}`}
                      className="px-3 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500">
              Detailed table of contents is currently being prepared for this edition.
            </p>
          )}
        </div>
      )}

      {activeTab === 'lessons' && (
        <div className="flex flex-col gap-3">
          {lessons.length > 0 ? (
            lessons.map((l) => (
              <div
                key={l.id}
                className="p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-0.5">
                    <span className="font-mono font-medium">#{l.lessonNumber.toString().padStart(3, '0')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{LibraryRepository.formatDuration(l.duration)}</span>
                  </div>
                  <Link
                    href={`/duruus/${l.id}`}
                    className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400"
                  >
                    {language === 'ar' ? l.title_ar : l.title_en}
                  </Link>
                </div>
                <Link
                  href={`/duruus/${l.id}`}
                  className="px-3 py-1.5 bg-emerald-900 text-amber-100 rounded-md text-xs font-semibold flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </Link>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-stone-500">
              Lessons for this book are being cataloged.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
