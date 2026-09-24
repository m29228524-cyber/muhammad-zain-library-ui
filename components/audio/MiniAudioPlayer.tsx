'use client';

import React from 'react';
import Link from 'next/link';
import { useAudio } from '@/lib/context/AudioContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  CheckCircle,
} from 'lucide-react';
import { useLearning } from '@/lib/context/LearningContext';

export function MiniAudioPlayer() {
  const {
    currentLesson,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
    skip,
    volume,
    setVol,
    isMuted,
    toggleMute,
    isMiniPlayerOpen,
    closeMiniPlayer,
  } = useAudio();

  const { language, getLocalized, t } = useLanguage();
  const { isCompleted, toggleCompleted } = useLearning();

  if (!isMiniPlayerOpen || !currentLesson) return null;

  const series = LibraryRepository.getSeriesById(currentLesson.seriesId);
  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const completed = isCompleted(currentLesson.id);

  return (
    <aside aria-label="Audio player dock" className="fixed bottom-0 inset-x-0 z-50 bg-[#FBF9F5] dark:bg-[#111C17] border-t border-stone-300 dark:border-stone-800 shadow-2xl transition-all">
      {/* Interactive Progress Bar across top hairline */}
      <div
        className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickPos = (e.clientX - rect.left) / rect.width;
          seek(clickPos * duration);
        }}
      >
        <div
          className="h-full bg-emerald-800 dark:bg-emerald-500 relative transition-all"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Lesson & Series Metadata */}
        <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? t('pause') : t('play')}
            className="w-9 h-9 shrink-0 rounded-full bg-emerald-900 dark:bg-emerald-700 text-amber-100 flex items-center justify-center hover:bg-emerald-800 dark:hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
            )}
          </button>

          <div className="flex flex-col min-w-0">
            <Link
              href={`/duruus/${currentLesson.id}`}
              className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              {language === 'ar' ? currentLesson.title_ar : currentLesson.title_en}
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <span className="truncate">
                {series ? (language === 'ar' ? series.title_ar : series.title_en) : t('lessonNumber')}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {LibraryRepository.formatDuration(Math.floor(currentTime))} / {LibraryRepository.formatDuration(Math.floor(duration))}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Controls for Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => skip(-10)}
            title={t('rewind10')}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => skip(10)}
            title={t('forward10')}
            className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleCompleted(currentLesson.id)}
            title={completed ? t('completed') : t('markCompleted')}
            className={`p-1.5 transition-colors cursor-pointer ${
              completed
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Volume & Dismiss Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Volume Slider (Hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-500">
            <button
              onClick={toggleMute}
              className="p-1 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-16 h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-800 dark:accent-emerald-500"
            />
          </div>

          {/* Full Lesson Page Link */}
          <Link
            href={`/duruus/${currentLesson.id}`}
            title="Open lesson details"
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </Link>

          {/* Close mini player */}
          <button
            onClick={closeMiniPlayer}
            title={t('close')}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
}
