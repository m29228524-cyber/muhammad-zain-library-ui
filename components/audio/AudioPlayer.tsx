'use client';

import React, { useState } from 'react';
import { Lesson } from '@/types/library';
import { useAudio } from '@/lib/context/AudioContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useLearning } from '@/lib/context/LearningContext';
import { LibraryRepository } from '@/lib/data/repository';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Download,
  Share2,
  CheckCircle,
  Bookmark,
  Check,
} from 'lucide-react';

interface AudioPlayerProps {
  lesson: Lesson;
}

export function AudioPlayer({ lesson }: AudioPlayerProps) {
  const {
    currentLesson,
    isPlaying,
    currentTime,
    duration,
    playLesson,
    togglePlay,
    seek,
    skip,
    playbackRate,
    setRate,
    volume,
    setVol,
    isMuted,
    toggleMute,
  } = useAudio();

  const { t, language } = useLanguage();
  const { isCompleted, toggleCompleted, isBookmarked, toggleBookmark } = useLearning();
  const [copied, setCopied] = useState(false);

  const isThisLessonActive = currentLesson?.id === lesson.id;
  const activeIsPlaying = isThisLessonActive && isPlaying;
  const activeTime = isThisLessonActive ? currentTime : 0;
  const activeDuration = isThisLessonActive && duration > 0 ? duration : lesson.duration;
  const percent = activeDuration > 0 ? (activeTime / activeDuration) * 100 : 0;

  const completed = isCompleted(lesson.id);
  const bookmarked = isBookmarked('lesson', lesson.id);

  const handlePlayToggle = () => {
    if (!isThisLessonActive) {
      playLesson(lesson);
    } else {
      togglePlay();
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 shadow-xs">
      
      {/* Top row: Status indicators & Quick actions */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
          <span className="font-medium text-stone-700 dark:text-stone-300">
            {isThisLessonActive && isPlaying ? t('playing') : t('audioLecture')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{LibraryRepository.formatDurationHuman(lesson.duration, language)}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mark completed */}
          <button
            onClick={() => toggleCompleted(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              completed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${completed ? 'fill-current' : ''}`} />
            <span>{completed ? t('completed') : t('markCompleted')}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark('lesson', lesson.id)}
            className={`p-2 rounded-md border transition-colors cursor-pointer ${
              bookmarked
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
            }`}
            title={bookmarked ? t('bookmarked') : t('bookmark')}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Scrubber / Progress Bar */}
      <div className="mb-6">
        <div
          role="slider"
          aria-label="Audio progress scrubber"
          aria-valuemin={0}
          aria-valuemax={activeDuration}
          aria-valuenow={Math.floor(activeTime)}
          className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full cursor-pointer relative group overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            if (!isThisLessonActive) {
              playLesson(lesson);
            }
            seek(clickPos * activeDuration);
          }}
        >
          <div
            className="h-full bg-emerald-800 dark:bg-emerald-500 rounded-full transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
          <span>{LibraryRepository.formatDuration(Math.floor(activeTime))}</span>
          <span>{LibraryRepository.formatDuration(Math.floor(activeDuration))}</span>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Playback speed selector */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-lg border border-stone-200 dark:border-stone-700/60">
          {speeds.map((rate) => (
            <button
              key={rate}
              onClick={() => setRate(rate)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                playbackRate === rate
                  ? 'bg-white dark:bg-stone-700 text-emerald-900 dark:text-emerald-300 font-semibold shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Center Primary Audio Transport Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => {
              if (isThisLessonActive) skip(-10);
            }}
            disabled={!isThisLessonActive}
            title={t('rewind10')}
            className="p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handlePlayToggle}
            aria-label={activeIsPlaying ? t('pause') : t('play')}
            className="w-14 h-14 rounded-full bg-emerald-900 dark:bg-emerald-600 text-amber-100 flex items-center justify-center hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-transform active:scale-95 shadow-md cursor-pointer"
          >
            {activeIsPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5 rtl:mr-0.5 rtl:ml-0" />
            )}
          </button>

          <button
            onClick={() => {
              if (isThisLessonActive) skip(10);
            }}
            disabled={!isThisLessonActive}
            title={t('forward10')}
            className="p-2.5 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Right utility buttons: Volume, Share, Download */}
        <div className="flex items-center gap-2">
          {/* Volume */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-500 mr-2">
            <button
              onClick={toggleMute}
              className="p-1.5 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-20 h-1 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-800 dark:accent-emerald-500"
            />
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            title={t('share')}
            className="p-2 rounded-md border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1 text-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden md:inline">{copied ? 'Copied' : t('share')}</span>
          </button>

          {/* Download Audio */}
          <a
            href={lesson.audioUrl}
            download={`Lesson_${lesson.lessonNumber}_${lesson.title_en}.mp3`}
            target="_blank"
            rel="noopener noreferrer"
            title={t('downloadAudio')}
            className="p-2 rounded-md border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">{t('downloadAudio')}</span>
          </a>
        </div>

      </div>

      {/* Keyboard shortcuts helper note */}
      <div className="mt-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 text-[11px] text-stone-400 dark:text-stone-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>Shortcuts:</span>
          <span><kbd className="px-1 py-0.5 bg-stone-200/70 dark:bg-stone-800 rounded font-mono">Space</kbd> Play / Pause</span>
          <span><kbd className="px-1 py-0.5 bg-stone-200/70 dark:bg-stone-800 rounded font-mono">← / →</kbd> Seek 10s</span>
        </div>
        <span className="hidden sm:inline">Background audio continues while navigating</span>
      </div>

    </div>
  );
}
