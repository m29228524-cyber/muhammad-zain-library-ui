'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { SeriesCard } from '@/components/cards/SeriesCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Search, Layers, X } from 'lucide-react';

export default function SeriesPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = LibraryRepository.getCategories();
  const allSeries = LibraryRepository.getAllSeries();

  const filteredSeries = useMemo(() => {
    let results = allSeries;
    if (selectedCategory !== 'all') {
      results = results.filter((s) => s.categoryId === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter((s) =>
        s.title_en.toLowerCase().includes(q) ||
        s.title_ar.includes(q) ||
        s.description_en.toLowerCase().includes(q)
      );
    }
    return results;
  }, [allSeries, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navSeries') }]} />

      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
          Curricula &amp; Thematic Collections
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mt-1">
          {language === 'ar' ? 'السلاسل العلمية والمناهج المكتملة' : 'Educational Series & Curricula'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl leading-relaxed">
          {language === 'ar'
            ? 'سلاسل علمية منهجية متكاملة تشرح أمهات الكتب في العقيدة والحديث والتفسير والفقه والنحو برواية منهجية متصلة.'
            : 'Structured, multi-part scholarly commentary series explaining fundamental classical texts from start to completion.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 mb-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search series by title or subject..."
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            />
          </div>

          <div className="md:col-span-5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs text-stone-700 dark:text-stone-300 focus:outline-none cursor-pointer"
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ar' ? c.name_ar : c.name_en}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Series Grid */}
      {filteredSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-stone-300 dark:border-stone-800 rounded-xl">
          <Layers className="w-10 h-10 mx-auto text-stone-400 mb-3 opacity-60" />
          <h3 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
            {t('noResults')}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
            No series found matching your search.
          </p>
        </div>
      )}

    </div>
  );
}
