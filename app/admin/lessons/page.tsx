'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Search, Plus, Play, Edit, Trash2, BookOpen } from 'lucide-react';

export default function AdminLessonsPage() {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');
  const allLessons = LibraryRepository.getLessons();

  const filtered = search.trim()
    ? allLessons.filter(
        (l) =>
          l.title_en.toLowerCase().includes(search.toLowerCase()) ||
          l.title_ar.includes(search) ||
          l.lessonNumber.toString() === search.trim()
      )
    : allLessons;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          { label: t('navAdmin'), href: '/admin' },
          { label: 'Lessons Management' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
            Cataloged Lessons ({allLessons.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Manage, re-order, edit transcripts, and update audio recordings in the public catalog.
          </p>
        </div>

        <Link
          href="/admin/import"
          className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ingest from Telegram</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter lessons by title or lesson number..."
          className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
        />
      </div>

      {/* Lessons Table */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title (AR / EN)</th>
                <th className="py-3 px-4">Series</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Broadcast Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
              {filtered.map((lesson) => {
                const s = LibraryRepository.getSeriesById(lesson.seriesId);
                const c = LibraryRepository.getCategoryById(lesson.categoryId);
                return (
                  <tr key={lesson.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/60">
                    <td className="py-3 px-4 font-mono font-medium text-stone-400">
                      #{lesson.lessonNumber.toString().padStart(3, '0')}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <Link
                        href={`/duruus/${lesson.id}`}
                        className="font-medium text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 truncate block"
                      >
                        {lesson.title_en}
                      </Link>
                      <span className="font-arabic text-[11px] text-stone-500 block truncate">
                        {lesson.title_ar}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {s?.title_en || '—'}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {c?.name_en || '—'}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-500 whitespace-nowrap">
                      {LibraryRepository.formatDuration(lesson.duration)}
                    </td>
                    <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                      {lesson.date}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/duruus/${lesson.id}`}
                          className="p-1 text-stone-400 hover:text-emerald-800"
                          title="View"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </Link>
                      </div>
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
