'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { HardDrive, Server, CheckCircle, Database, Headphones, FileText } from 'lucide-react';

export default function AdminMediaPage() {
  const { language, t } = useLanguage();
  const mediaAssets = LibraryRepository.getMediaAssets();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          { label: t('navAdmin'), href: '/admin' },
          { label: 'Media Assets & CDN' },
        ]}
      />

      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
          Media Assets &amp; Storage Mirror
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
          Monitors media file hosting, audio compression bitrates, and Telegram cache mirrors.
        </p>
      </div>

      {/* Storage Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
          <div className="flex items-center gap-2 text-stone-500 mb-2 text-xs">
            <HardDrive className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>Audio Storage Total</span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            42.8 GB
          </span>
          <span className="text-[11px] text-stone-400 mt-1 block">
            480 MP3 files at 128 kbps stereo
          </span>
        </div>

        <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
          <div className="flex items-center gap-2 text-stone-500 mb-2 text-xs">
            <FileText className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>PDF Manuscripts Total</span>
          </div>
          <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 block">
            1.4 GB
          </span>
          <span className="text-[11px] text-stone-400 mt-1 block">
            20 high-resolution verified texts
          </span>
        </div>

        <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
          <div className="flex items-center gap-2 text-stone-500 mb-2 text-xs">
            <Server className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span>CDN Sync Health</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold text-lg">
            <CheckCircle className="w-5 h-5 fill-current" />
            <span>Operational</span>
          </div>
          <span className="text-[11px] text-stone-400 mt-1 block">
            Direct caching with edge propagation
          </span>
        </div>
      </div>

      {/* Media Assets Table */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Bitrate</th>
                <th className="py-3 px-4">CDN Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/80 font-mono">
              {mediaAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/60 font-sans">
                  <td className="py-3 px-4 font-mono font-medium text-stone-800 dark:text-stone-200">
                    {asset.fileName}
                  </td>
                  <td className="py-3 px-4 uppercase text-stone-500 text-[11px]">
                    {asset.fileType}
                  </td>
                  <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                    {asset.fileSizeFormatted}
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-500">
                    {asset.duration ? LibraryRepository.formatDuration(asset.duration) : '—'}
                  </td>
                  <td className="py-3 px-4 text-stone-500">
                    {asset.bitrate || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      <span>Synchronized</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
