'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export default function CategoriesPage() {
  const { language, t } = useLanguage();
  const categories = LibraryRepository.getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navCategories') }]} />

      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
          Sacred Sciences &amp; Classifications
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mt-1">
          {language === 'ar' ? 'أبواب وفنون العلوم الشرعية' : 'Disciplines & Branches of Knowledge'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl leading-relaxed">
          {language === 'ar'
            ? 'تصنيف منهجي لكافة الدروس والكتب وفق أبواب العلوم الإسلامية الكبرى: من أصول التوحيد والتفسير إلى دقائق اللغة والفقه والمواريث.'
            : 'Structured taxonomy classifying lessons, audio recordings, and classical books across the major branches of traditional Islamic sacred knowledge.'}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

    </div>
  );
}
