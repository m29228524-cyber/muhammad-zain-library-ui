'use client';

import React, { useState } from 'react';
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface PDFViewerProps {
  title: string;
  pdfUrl?: string;
  totalPages?: number;
}

export function PDFViewerPlaceholder({ title, pdfUrl, totalPages = 48 }: PDFViewerProps) {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
      
      {/* Top PDF Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
        
        {/* Left: Document info */}
        <div className="flex items-center gap-2 truncate">
          <FileText className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0" />
          <span className="font-medium text-stone-900 dark:text-stone-100 truncate max-w-xs">{title}</span>
        </div>

        {/* Center: Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <span className="font-mono text-[11px]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        {/* Right: Zoom & Download */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-stone-200/60 dark:bg-stone-700/60 px-1.5 py-0.5 rounded">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
              aria-label="Zoom out"
              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] w-8 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              aria-label="Zoom in"
              className="p-1 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-800 text-amber-100 hover:bg-emerald-900 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('downloadPdf')}</span>
            </a>
          )}
        </div>

      </div>

      {/* Manuscript Content Render Area */}
      <div className="p-6 sm:p-12 flex justify-center bg-stone-200/40 dark:bg-stone-950/60 overflow-x-auto min-h-[480px]">
        <div
          className="w-full max-w-2xl bg-white dark:bg-[#0E1612] border border-stone-300 dark:border-stone-800 rounded-sm shadow-md p-8 sm:p-12 text-stone-900 dark:text-stone-100 transition-all font-serif"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Classical Page Header */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-3 mb-6 flex items-center justify-between text-xs text-stone-400 font-sans">
            <span>{title}</span>
            <span>ص {currentPage}</span>
          </div>

          {/* Classical Manuscript Excerpt */}
          <div className="flex flex-col gap-6">
            <div className="text-center font-arabic text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <div className="text-center font-arabic text-lg font-semibold text-amber-900 dark:text-amber-400">
              بَابُ الإِخْلاَصِ وَإِحْضَارِ النِّيَّةِ فِي جَمِيعِ الأَعْمَالِ وَالأَقْوَالِ وَالأَحْوَالِ
            </div>

            <div className="font-arabic text-base sm:text-lg leading-loose text-stone-800 dark:text-stone-200 text-justify">
              قَالَ اللهُ تَعَالَى: ﴿وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ وَذَلِكَ دِينُ الْقَيِّمَةِ﴾ [البينة: ٥].
              <br /><br />
              وَعَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ». مُتَّفَقٌ عَلَيْهِ.
            </div>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-4 mt-6 text-xs text-stone-500 font-sans leading-relaxed">
              <strong>English Reference:</strong> It is narrated on the authority of the Leader of the Believers, Abu Hafs Umar ibn al-Khattab (may Allah be pleased with him), who said: I heard the Messenger of Allah (peace and blessings of Allah be upon him) say: &quot;Actions are only according to intentions, and each person will have only what they intended.&quot; (Agreed upon: Bukhari &amp; Muslim).
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
