'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 dark:text-stone-400 py-3 mb-4 overflow-x-auto whitespace-nowrap">
      <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
        {t('navHome')}
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-stone-400 shrink-0 rtl:rotate-180" />
          {item.href ? (
            <Link href={item.href} className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-xs sm:max-w-md">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
