'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/library';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  BookOpen,
  Scroll,
  ShieldCheck,
  Scale,
  Compass,
  PenTool,
  HeartHandshake,
  Layers,
  FileText,
  CheckCircle,
  Flame,
  Coins,
  ArrowRight,
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { language, t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Scroll': return <Scroll className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Coins': return <Coins className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group flex flex-col justify-between p-5 bg-[#FBF9F5] dark:bg-[#111C16] border border-stone-200/80 dark:border-stone-800/80 rounded-xl hover:border-emerald-800/40 dark:hover:border-emerald-700/50 hover:shadow-xs transition-all"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-900 group-hover:text-amber-100 transition-all">
            {getIcon(category.icon)}
          </div>
          <span className="text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors mb-1">
          {language === 'ar' ? category.name_ar : category.name_en}
        </h3>

        {language !== 'ar' && (
          <p className="font-arabic text-xs text-stone-400 dark:text-stone-500 mb-2">
            {category.name_ar}
          </p>
        )}

        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed mb-4">
          {language === 'ar' ? category.description_ar : category.description_en}
        </p>
      </div>

      {/* Stats Line */}
      <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400">
        <span className="font-medium text-stone-700 dark:text-stone-300">
          {category.lessonCount} {t('duruusCount')}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {category.seriesCount} {t('seriesCount')}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {category.bookCount} {t('booksCount')}
        </span>
      </div>
    </Link>
  );
}
