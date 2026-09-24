'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function AdminBooksPage() {
  const { language, t } = useLanguage();
  const allBooks = LibraryRepository.getBooks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          { label: t('navAdmin'), href: '/admin' },
          { label: 'Books & Texts Management' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
            Cataloged Texts &amp; Books ({allBooks.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Manage classical treatises, editions, PDF attachments, and chapter mappings.
          </p>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Book Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">PDF Info</th>
                <th className="py-3 px-4">Chapters</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
              {allBooks.map((b) => {
                const c = LibraryRepository.getCategoryById(b.categoryId);
                return (
                  <tr key={b.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/60">
                    <td className="py-3.5 px-4 max-w-sm">
                      <Link
                        href={`/kutub/${b.id}`}
                        className="font-medium text-stone-900 dark:text-stone-100 hover:text-emerald-800 dark:hover:text-emerald-400 block"
                      >
                        {b.title_en}
                      </Link>
                      <span className="font-arabic text-stone-500 text-[11px] block">
                        {b.title_ar}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 italic">
                      {b.author_en}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {c?.name_en}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap">
                      {b.pdfPages} pp · {b.pdfSize}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 whitespace-nowrap">
                      {b.tableOfContents?.length || 0} mapped
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/kutub/${b.id}`}
                        className="text-emerald-800 dark:text-emerald-400 hover:underline font-semibold mr-3"
                      >
                        View Text →
                      </Link>
                      {b.pdfUrl && (
                        <a
                          href={b.pdfUrl}
                          download
                          className="text-stone-500 hover:text-stone-800 inline-block"
                        >
                          <Download className="w-3.5 h-3.5 inline" />
                        </a>
                      )}
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
