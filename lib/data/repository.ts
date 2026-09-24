import { mockCategories } from './categories';
import { mockSeries } from './series';
import { mockBooks } from './books';
import { mockLessons } from './lessons';
import { mockTelegramImports } from './imports';
import { mockMediaItems } from './media';
import {
  Lesson,
  Series,
  Book,
  Category,
  TelegramImportRecord,
  MediaItem,
  LessonFilters,
  SearchFilters,
} from '@/types/library';

// In-memory writable caches for live prototype interaction
let lessonsStore: Lesson[] = [...mockLessons];
let seriesStore: Series[] = [...mockSeries];
let booksStore: Book[] = [...mockBooks];
let importsStore: TelegramImportRecord[] = [...mockTelegramImports];
let mediaStore: MediaItem[] = [...mockMediaItems];

export const LibraryRepository = {
  // Lessons
  getLessons: (filters?: LessonFilters): Lesson[] => {
    let results = [...lessonsStore];

    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      results = results.filter((l) =>
        l.title_en.toLowerCase().includes(q) ||
        l.title_ar.includes(q) ||
        (l.title_am && l.title_am.includes(q)) ||
        l.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (filters?.categoryId && filters.categoryId !== 'all') {
      results = results.filter((l) => l.categoryId === filters.categoryId);
    }

    if (filters?.seriesId && filters.seriesId !== 'all') {
      results = results.filter((l) => l.seriesId === filters.seriesId);
    }

    if (filters?.bookId && filters.bookId !== 'all') {
      results = results.filter((l) => l.bookId === filters.bookId);
    }

    if (filters?.durationRange && filters.durationRange !== 'all') {
      if (filters.durationRange === 'short') {
        results = results.filter((l) => l.duration < 1800);
      } else if (filters.durationRange === 'medium') {
        results = results.filter((l) => l.duration >= 1800 && l.duration <= 3600);
      } else if (filters.durationRange === 'long') {
        results = results.filter((l) => l.duration > 3600);
      }
    }

    if (filters?.sortBy) {
      if (filters.sortBy === 'newest') {
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (filters.sortBy === 'oldest') {
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (filters.sortBy === 'lesson_number') {
        results.sort((a, b) => a.lessonNumber - b.lessonNumber);
      } else if (filters.sortBy === 'title') {
        results.sort((a, b) => a.title_en.localeCompare(b.title_en));
      }
    }

    return results;
  },

  getLessonById: (id?: string): Lesson | undefined => {
    if (!id) return undefined;
    return lessonsStore.find((l) => l.id === id);
  },

  getLessonsBySeries: (seriesId?: string): Lesson[] => {
    if (!seriesId) return [];
    return lessonsStore
      .filter((l) => l.seriesId === seriesId)
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
  },

  getLessonsByBook: (bookId?: string): Lesson[] => {
    if (!bookId) return [];
    return lessonsStore
      .filter((l) => l.bookId === bookId)
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
  },

  // Series
  getAllSeries: (categoryId?: string): Series[] => {
    if (categoryId && categoryId !== 'all') {
      return seriesStore.filter((s) => s.categoryId === categoryId);
    }
    return seriesStore;
  },

  getSeriesById: (id?: string): Series | undefined => {
    if (!id) return undefined;
    return seriesStore.find((s) => s.id === id);
  },

  // Books
  getBooks: (categoryId?: string): Book[] => {
    if (categoryId && categoryId !== 'all') {
      return booksStore.filter((b) => b.categoryId === categoryId);
    }
    return booksStore;
  },

  getBookById: (id?: string): Book | undefined => {
    if (!id) return undefined;
    return booksStore.find((b) => b.id === id);
  },

  // Categories
  getCategories: (): Category[] => {
    return mockCategories;
  },

  getCategoryById: (id?: string): Category | undefined => {
    if (!id) return undefined;
    return mockCategories.find((c) => c.id === id);
  },

  // Telegram Imports
  getImports: (): TelegramImportRecord[] => {
    return importsStore;
  },

  getTelegramImports: (): TelegramImportRecord[] => {
    return importsStore.map((item) => ({
      ...item,
      postDate: item.postDate || item.date,
      channelUsername: item.channelUsername || 'ShaykhMuhammadZain_Archive',
      fileName: item.fileName || `Lesson_Record_${item.messageId}.mp3`,
      fileSizeFormatted: item.fileSizeFormatted || item.fileSize,
      suggestedTitle_ar: item.suggestedTitle_ar || item.suggestedTitle,
      suggestedTitle_en: item.suggestedTitle_en || item.suggestedTitle,
      status: item.status === 'needs_review' ? 'pending' : item.status,
      telegramMessageUrl: item.telegramMessageUrl || `https://t.me/ShaykhMuhammadZain_Archive/${item.messageId}`,
    }));
  },

  getPendingImportsCount: (): number => {
    return importsStore.filter((i) => i.status === 'needs_review' || i.status === 'pending').length;
  },

  approveTelegramImport: (
    id: string,
    metadata: {
      title_ar?: string;
      title_en?: string;
      seriesId?: string;
      categoryId?: string;
      bookId?: string;
      lessonNumber?: number;
      description_en?: string;
      tags?: string[];
    }
  ): TelegramImportRecord | undefined => {
    const item = importsStore.find((i) => i.id === id);
    if (!item) return undefined;

    const updated: TelegramImportRecord = {
      ...item,
      status: 'approved',
      suggestedTitle_ar: metadata.title_ar || item.suggestedTitle_ar,
      suggestedTitle_en: metadata.title_en || item.suggestedTitle_en,
      suggestedSeriesId: metadata.seriesId || item.suggestedSeriesId,
      suggestedCategoryId: metadata.categoryId || item.suggestedCategoryId,
      suggestedBookId: metadata.bookId || item.suggestedBookId,
      suggestedLessonNumber: metadata.lessonNumber || item.suggestedLessonNumber,
      notes: metadata.description_en || item.notes,
      detectedTags: metadata.tags || item.detectedTags,
    };

    importsStore = importsStore.map((i) => (i.id === id ? updated : i));

    // Also add to lessons if audio
    if (item.mediaType === 'audio') {
      const newLesson: Lesson = {
        id: `lesson-imported-${item.messageId}`,
        lessonNumber: metadata.lessonNumber || item.suggestedLessonNumber || 1,
        title_en: metadata.title_en || item.suggestedTitle,
        title_ar: metadata.title_ar || item.suggestedTitle,
        description_en: metadata.description_en || 'Ingested from Telegram broadcast.',
        description_ar: item.content,
        seriesId: metadata.seriesId || item.suggestedSeriesId || 'series-riyad-as-salihin',
        bookId: metadata.bookId || item.suggestedBookId,
        categoryId: metadata.categoryId || item.suggestedCategoryId || 'cat-hadith',
        duration: 2280,
        audioUrl: 'https://archive.org/download/quran-recitations/surah-al-fatihah.mp3',
        date: new Date().toISOString().split('T')[0],
        tags: metadata.tags || ['Telegram', 'Imported'],
        status: 'published',
        playCount: 0,
        telegramSource: {
          channelName: 'Shaykh Muhammad Zain Archive',
          channelUsername: 'ShaykhMuhammadZain_Archive',
          messageId: item.messageId,
          postDate: item.date,
          originalCaption: item.content,
          telegramMessageUrl: `https://t.me/ShaykhMuhammadZain_Archive/${item.messageId}`,
        },
      };
      lessonsStore = [newLesson, ...lessonsStore];
    }

    return updated;
  },

  rejectTelegramImport: (id: string, reason?: string): TelegramImportRecord | undefined => {
    const item = importsStore.find((i) => i.id === id);
    if (!item) return undefined;
    const updated: TelegramImportRecord = {
      ...item,
      status: 'rejected',
      notes: reason || item.notes,
    };
    importsStore = importsStore.map((i) => (i.id === id ? updated : i));
    return updated;
  },

  updateImportStatus: (id: string, status: 'approved' | 'rejected' | 'needs_review'): void => {
    importsStore = importsStore.map((item) =>
      item.id === id ? { ...item, status } : item
    );
  },

  // Media
  getMediaItems: (): MediaItem[] => {
    return mediaStore;
  },

  getMediaAssets: () => {
    return mediaStore.map((m) => ({
      id: m.id,
      fileName: m.filename,
      fileType: m.type,
      fileSizeFormatted: m.size,
      duration: 2280,
      bitrate: '128 kbps',
      storageStatus: m.storageStatus,
    }));
  },

  // Search
  searchAll: (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { lessons: [], series: [], books: [], categories: [], totalCount: 0 };
    }

    const matchedLessons = lessonsStore.filter((l) =>
      l.title_en.toLowerCase().includes(q) ||
      l.title_ar.includes(q) ||
      (l.title_am && l.title_am.includes(q)) ||
      l.description_en.toLowerCase().includes(q) ||
      l.tags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 10);

    const matchedSeries = seriesStore.filter((s) =>
      s.title_en.toLowerCase().includes(q) ||
      s.title_ar.includes(q) ||
      (s.title_am && s.title_am.includes(q))
    ).slice(0, 6);

    const matchedBooks = booksStore.filter((b) =>
      b.title_en.toLowerCase().includes(q) ||
      b.title_ar.includes(q) ||
      (b.title_am && b.title_am.includes(q)) ||
      b.author_en.toLowerCase().includes(q)
    ).slice(0, 6);

    const matchedCategories = mockCategories.filter((c) =>
      c.name_en.toLowerCase().includes(q) ||
      c.name_ar.includes(q) ||
      (c.name_am && c.name_am.includes(q))
    ).slice(0, 4);

    return {
      lessons: matchedLessons,
      series: matchedSeries,
      books: matchedBooks,
      categories: matchedCategories,
      totalCount: matchedLessons.length + matchedSeries.length + matchedBooks.length + matchedCategories.length,
    };
  },

  // Stats
  getArchiveStats: () => {
    const totalDurationSeconds = lessonsStore.reduce((acc, curr) => acc + curr.duration, 0);
    const totalHours = Math.round(totalDurationSeconds / 3600);
    return {
      totalLessons: lessonsStore.length,
      totalSeries: seriesStore.length,
      totalBooks: booksStore.length,
      totalAudioHours: totalHours,
      totalPdfs: booksStore.filter((b) => b.pdfAvailable).length,
      pendingImports: importsStore.filter((i) => i.status === 'needs_review').length,
    };
  },

  // Helpers
  formatDuration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },

  formatDurationHuman: (seconds: number, lang: string = 'en'): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (lang === 'ar') {
      if (hours > 0) return `${hours} ساعة و ${minutes} دقيقة`;
      return `${minutes} دقيقة`;
    }
    if (lang === 'am') {
      if (hours > 0) return `${hours} ሰዓት ከ ${minutes} ደቂቃ`;
      return `${minutes} ደቂቃ`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} mins`;
  }
};
