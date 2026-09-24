'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAudio } from '@/lib/context/AudioContext';
import { LibraryRepository } from '@/lib/data/repository';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  BookOpen,
  Calendar,
  Clock,
  Layers,
  Send,
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Share2,
  Headphones,
  CheckCircle2,
  Play,
  Pause,
} from 'lucide-react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { currentLesson, isPlaying, playLesson, togglePlay } = useAudio();
  const lessonId = params?.id as string;

  const lesson = LibraryRepository.getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Lesson Not Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
          The requested lesson could not be found in the archive.
        </p>
        <Link
          href="/duruus"
          className="px-4 py-2 bg-emerald-900 text-amber-100 rounded-md text-xs font-semibold"
        >
          Return to Duruus
        </Link>
      </div>
    );
  }

  const series = LibraryRepository.getSeriesById(lesson.seriesId);
  const book = lesson.bookId ? LibraryRepository.getBookById(lesson.bookId) : (series?.bookId ? LibraryRepository.getBookById(series.bookId) : undefined);
  const category = LibraryRepository.getCategoryById(lesson.categoryId);

  // Series progression & playlist
  const seriesLessons = series ? LibraryRepository.getLessonsBySeries(series.id) : [];
  const currentIndex = seriesLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? seriesLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < seriesLessons.length - 1 ? seriesLessons[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Requirement 7: Explicit Hierarchical Breadcrumbs:
          Home → Category → Series → Lesson */}
      <Breadcrumbs
        items={[
          ...(category
            ? [
                {
                  label: language === 'ar' ? category.name_ar : category.name_en,
                  href: `/categories/${category.id}`,
                },
              ]
            : [{ label: t('navCategories'), href: '/categories' }]),
          ...(series
            ? [
                {
                  label: language === 'ar' ? series.title_ar : series.title_en,
                  href: `/series/${series.id}`,
                },
              ]
            : []),
          {
            label:
              language === 'ar'
                ? `الدرس ${lesson.lessonNumber}`
                : `Lesson ${lesson.lessonNumber}`,
          },
        ]}
      />

      {/* Requirement 6: Structural Hierarchy Header Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200/90 dark:border-stone-800/90 rounded-2xl p-6 sm:p-7 mb-8 shadow-xs">
        
        {/* Hierarchical Tree Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
          {category && (
            <Link
              href={`/categories/${category.id}`}
              className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-emerald-800 dark:text-emerald-400 font-semibold transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? category.name_ar : category.name_en}</span>
            </Link>
          )}

          <ChevronRight className="w-3 h-3 text-stone-400 rtl:rotate-180" />

          {series && (
            <Link
              href={`/series/${series.id}`}
              className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-medium transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-stone-400" />
              <span>{language === 'ar' ? series.title_ar : series.title_en}</span>
            </Link>
          )}

          {book && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-400 rtl:rotate-180" />
              <Link
                href={`/kutub/${book.id}`}
                className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium hover:underline flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? book.title_ar : book.title_en}</span>
              </Link>
            </>
          )}

          <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-900 text-amber-100 font-semibold ml-auto rtl:mr-auto rtl:ml-0">
            #{lesson.lessonNumber.toString().padStart(3, '0')}
          </span>
        </div>

        {/* Title in Arabic and English */}
        <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-2">
          {language === 'ar' ? lesson.title_ar : lesson.title_en}
        </h1>

        {language !== 'ar' && (
          <h2 className="font-arabic font-bold text-xl text-emerald-950 dark:text-emerald-200 mb-4">
            {lesson.title_ar}
          </h2>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{lesson.date}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{LibraryRepository.formatDuration(lesson.duration)}</span>
          </span>
          {series && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {language === 'ar'
                  ? `المجلس ${lesson.lessonNumber} من أصل ${series.lessonCount} مجلساً`
                  : `Lesson ${lesson.lessonNumber} of ${series.lessonCount}`}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Requirement 4: Dedicated Lesson Audio Player Component */}
      <div className="mb-10">
        <AudioPlayer lesson={lesson} />
      </div>

      {/* Two-Column Body: Content & Materials vs Series Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column: Lesson Details, Media Attachments & Previous/Next */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Overview */}
          <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">
              {language === 'ar' ? 'نبذة عن الدرس ومحاوره' : 'Lesson Summary & Topics'}
            </h3>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {language === 'ar' ? lesson.description_ar : lesson.description_en}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 text-xs">
              <span className="text-stone-400 font-medium">Keywords:</span>
              {lesson.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Attached Media & Studied Book Treatise (Requirements 4 & 5) */}
          <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7 shadow-xs">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>{language === 'ar' ? 'المواد والملفات المرفقة بالدرس' : 'Lesson Materials & Attached Media'}</span>
            </h3>

            <div className="space-y-3">
              {/* Audio File Item */}
              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      {language === 'ar' ? 'التسجيل الصوتي الكامل (MP3)' : 'Complete Audio Lecture (MP3)'}
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      {LibraryRepository.formatDuration(lesson.duration)} · High Quality Sound
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={lesson.audioUrl}
                    download={`Lesson_${lesson.lessonNumber}.mp3`}
                    className="px-3 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* PDF Document Item (if available) */}
              {(lesson.pdfUrl || book?.pdfUrl) && (
                <div className="p-3.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                        {book
                          ? (language === 'ar' ? `متن الكتاب: ${book.title_ar}` : `Studied Text: ${book.title_en}`)
                          : (language === 'ar' ? 'مذكرة الدرس PDF' : 'Lesson Notes (PDF)')}
                      </h4>
                      <span className="text-[11px] text-stone-400">
                        {book ? `${book.author_en || book.author_ar} · Classical Text` : 'Curricular Reference'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {book ? (
                      <Link
                        href={`/kutub/${book.id}`}
                        className="px-3 py-1.5 rounded-md bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'عرض الكتاب' : 'Read Book'}</span>
                      </Link>
                    ) : (
                      <a
                        href={lesson.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Open PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Previous / Next Lesson Navigation Bar */}
          <div className="grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link
                href={`/duruus/${prevLesson.id}`}
                className="group p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 transition-colors flex flex-col justify-between"
              >
                <span className="text-[11px] font-semibold text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  {t('previousLesson')}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-200 line-clamp-1 mt-2">
                  Lesson #{prevLesson.lessonNumber}: {language === 'ar' ? prevLesson.title_ar : prevLesson.title_en}
                </span>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link
                href={`/duruus/${nextLesson.id}`}
                className="group p-4 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 transition-colors flex flex-col justify-between text-end"
              >
                <span className="text-[11px] font-semibold text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 flex items-center justify-end gap-1">
                  {t('nextLesson')}
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-200 line-clamp-1 mt-2">
                  Lesson #{nextLesson.lessonNumber}: {language === 'ar' ? nextLesson.title_ar : nextLesson.title_en}
                </span>
              </Link>
            ) : <div />}
          </div>

        </div>

        {/* Sidebar Column: Telegram Provenance & Series Playlist */}
        <div className="flex flex-col gap-6">
          
          {/* Telegram Source Provenance Card */}
          {lesson.telegramSource && (
            <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Send className="w-4 h-4" />
                <span>Telegram Source Archive</span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
                <div className="flex justify-between">
                  <span className="text-stone-400">Channel:</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    @{lesson.telegramSource.channelUsername}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Message ID:</span>
                  <span className="font-mono text-stone-800 dark:text-stone-200">
                    #{lesson.telegramSource.messageId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Broadcast Date:</span>
                  <span>{new Date(lesson.telegramSource.postDate).toLocaleDateString()}</span>
                </div>
              </div>

              {lesson.telegramSource.originalCaption && (
                <div className="mt-3 p-2.5 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-[11px] text-stone-600 dark:text-stone-300 font-arabic leading-relaxed">
                  &quot;{lesson.telegramSource.originalCaption}&quot;
                </div>
              )}

              <a
                href={lesson.telegramSource.telegramMessageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Original Telegram Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Series Lessons Playlist (Requirement 6: Other lessons in the same series) */}
          {series && seriesLessons.length > 0 && (
            <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {language === 'ar' ? 'دروس هذه السلسلة' : 'Other Lessons in Series'}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {seriesLessons.length} {language === 'ar' ? 'درساً مرتباً' : 'sequential lessons'}
                  </p>
                </div>
                <Link
                  href={`/series/${series.id}`}
                  className="text-xs text-emerald-800 dark:text-emerald-400 hover:underline"
                >
                  {t('viewAll')}
                </Link>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                {seriesLessons.map((sl) => {
                  const isActive = sl.id === lesson.id;
                  return (
                    <div
                      key={sl.id}
                      className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-2 ${
                        isActive
                          ? 'bg-emerald-900 text-amber-100 font-semibold shadow-xs'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <Link
                        href={`/duruus/${sl.id}`}
                        className="min-w-0 flex-1 flex items-center gap-2"
                      >
                        <span className="font-mono text-[11px] opacity-80 shrink-0">
                          #{sl.lessonNumber.toString().padStart(2, '0')}
                        </span>
                        <span className="truncate">
                          {language === 'ar' ? sl.title_ar : sl.title_en}
                        </span>
                      </Link>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="font-mono text-[10px] opacity-70">
                          {LibraryRepository.formatDuration(sl.duration)}
                        </span>
                        <button
                          onClick={() => playLesson(sl)}
                          title="Play Audio"
                          className="p-1 hover:text-amber-200 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
