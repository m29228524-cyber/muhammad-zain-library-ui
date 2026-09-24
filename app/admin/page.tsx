'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Send,
  BookOpen,
  Layers,
  FileText,
  HardDrive,
  CheckCircle,
  Clock,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { language, t } = useLanguage();
  const stats = LibraryRepository.getArchiveStats();
  const pendingImports = LibraryRepository.getPendingImportsCount();
  const recentImports = LibraryRepository.getTelegramImports().slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navAdmin') }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900 text-amber-100 text-[11px] font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Archival Management Console</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
            Library Administration &amp; Curation
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Supervise the ingestion, verification, cataloging, and publication of Shaykh Muhammad Zain&apos;s educational heritage.
          </p>
        </div>

        <Link
          href="/admin/import"
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-amber-100 text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 shrink-0 transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Telegram Review Inbox ({pendingImports} pending)</span>
        </Link>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Pending Telegram Imports */}
        <Link
          href="/admin/import"
          className="p-5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 group-hover:underline">
              Review Queue →
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            {pendingImports}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 block">
            Telegram Imports Awaiting Review
          </span>
        </Link>

        {/* Cataloged Lessons */}
        <Link
          href="/admin/lessons"
          className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 group-hover:underline">
              Manage →
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            {stats.totalLessons}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 block">
            Published Audio Duruus
          </span>
        </Link>

        {/* Thematic Series */}
        <Link
          href="/admin/series"
          className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 group-hover:underline">
              Manage →
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            {stats.totalSeries}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 block">
            Active Study Series
          </span>
        </Link>

        {/* Books & Treatises */}
        <Link
          href="/admin/books"
          className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl hover:shadow-xs transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 group-hover:underline">
              Manage →
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            {stats.totalBooks}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 block">
            Cataloged Texts &amp; PDFs
          </span>
        </Link>

      </div>

      {/* Main Grid: Telegram Ingestion Pipeline & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Telegram Ingestion Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  Telegram Pipeline Status
                </h3>
              </div>
              <Link
                href="/admin/import"
                className="text-xs text-emerald-800 dark:text-emerald-400 hover:underline font-semibold"
              >
                Go to Inbox ({pendingImports} to review) →
              </Link>
            </div>

            <div className="space-y-3">
              {recentImports.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-stone-400">
                        Msg #{item.messageId}
                      </span>
                      <span className="font-medium text-stone-800 dark:text-stone-200 truncate">
                        {item.suggestedTitle_ar || item.suggestedTitle_en}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      {item.fileName} · {item.mediaType} · {item.fileSizeFormatted}
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 ${
                    item.status === 'pending'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      : item.status === 'approved'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
              <span>Channel Sync: <strong>@ShaykhMuhammadZain_Archive</strong></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Listening to broadcasts</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Archival Tools */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3">
              Curation Operations
            </h3>

            <div className="space-y-2">
              <Link
                href="/admin/import"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg hover:border-emerald-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2.5 transition-colors"
              >
                <Send className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span>Process Telegram Ingestion Inbox</span>
              </Link>

              <Link
                href="/admin/lessons"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg hover:border-emerald-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2.5 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                <span>Catalog New Manual Audio Lesson</span>
              </Link>

              <Link
                href="/admin/series"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg hover:border-emerald-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2.5 transition-colors"
              >
                <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Configure New Lesson Series</span>
              </Link>

              <Link
                href="/admin/books"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg hover:border-emerald-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                <span>Upload Classical Book / PDF</span>
              </Link>

              <Link
                href="/admin/media"
                className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-lg hover:border-emerald-700 text-xs font-medium text-stone-800 dark:text-stone-200 flex items-center gap-2.5 transition-colors"
              >
                <HardDrive className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                <span>Media Storage &amp; CDN Status</span>
              </Link>
            </div>
          </div>

          {/* Architecture Architecture Notice */}
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-stone-700 dark:text-stone-300">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 mb-1">
              Production Architecture
            </h4>
            <p className="leading-relaxed text-[11px] text-stone-600 dark:text-stone-400">
              The data service is decoupled via the clean repository pattern. In production, this frontend connects directly with the Telethon ingestion daemon and PostgreSQL database.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
