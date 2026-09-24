'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Layers, Plus, BookOpen, Clock } from 'lucide-react';

export default function AdminSeriesPage() {
  const { language, t } = useLanguage();
  const allSeries = LibraryRepository.getAllSeries();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          { label: t('navAdmin'), href: '/admin' },
          { label: 'Series Management' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
            Educational Series ({allSeries.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Configure commentary curricula, sequence lessons, and link classical textbooks.
          </p>
        </div>
      </div>

      {/* Series Table */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Series Title</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Lesson Count</th>
                <th className="py-3 px-4">Total Duration</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
              {allSeries.map((s) => {
                const c = LibraryRepository.getCategoryById(s.categoryId);
                return (
                  <tr key={s.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/60">
                    <td className="py-3.5 px-4 max-w-sm">
                      <Link
                        href={`/series/${s.id}`}
                        className="font-medium text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 block"
                      >
                        {s.title_en}
                      </Link>
                      <span className="font-arabic text-stone-500 text-[11px] block">
                        {s.title_ar}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {c?.name_en}
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      {s.lessonCount} duruus
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap">
                      {LibraryRepository.formatDurationHuman(s.totalDuration, 'en')}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/series/${s.id}`}
                        className="text-emerald-800 dark:text-emerald-400 hover:underline font-semibold"
                      >
                        View Series →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
