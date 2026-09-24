export type Language = 'en' | 'ar' | 'am';
export type Direction = 'ltr' | 'rtl';

export type ContentStatus = 'published' | 'draft' | 'needs_review' | 'archived';

export interface TelegramSource {
  messageId: number;
  channelName?: string;
  channelUsername: string;
  postDate: string;
  originalCaption: string;
  telegramMessageUrl?: string;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  title_en: string;
  title_ar: string;
  title_am?: string;
  description_en: string;
  description_ar: string;
  description_am?: string;
  seriesId: string;
  bookId?: string;
  categoryId: string;
  date: string;
  duration: number; // in seconds
  audioUrl: string;
  pdfUrl?: string;
  telegramSource: TelegramSource;
  tags: string[];
  status: ContentStatus;
  playCount: number;
}

export interface Series {
  id: string;
  title_en: string;
  title_ar: string;
  title_am?: string;
  description_en: string;
  description_ar: string;
  description_am?: string;
  coverImage: string;
  categoryId: string;
  bookId?: string;
  lessonCount: number;
  totalDuration: number; // in seconds
  isCompleted: boolean;
  order: number;
}

export interface TableOfContentItem {
  chapter: number;
  title_en: string;
  title_ar: string;
  title_am?: string;
  lessonId?: string;
}

export interface Book {
  id: string;
  title_en: string;
  title_ar: string;
  title_am?: string;
  author_en: string;
  author_ar: string;
  author_am?: string;
  description_en: string;
  description_ar: string;
  description_am?: string;
  coverImage: string;
  categoryId: string;
  seriesId?: string;
  lessonCount: number;
  pdfAvailable: boolean;
  pdfPages?: number;
  pdfSize?: string;
  pdfUrl?: string;
  tableOfContents?: TableOfContentItem[];
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  name_am?: string;
  description_en: string;
  description_ar: string;
  description_am?: string;
  icon: string;
  colorClass: string;
  lessonCount: number;
  seriesCount: number;
  bookCount: number;
}

export interface MediaItem {
  id: string;
  filename: string;
  type: 'audio' | 'pdf' | 'image' | 'document' | 'video';
  size: string;
  duration?: string;
  linkedLessonId?: string;
  storageStatus: 'synced' | 'local_cached' | 'telegram_backed';
  createdAt: string;
}

export interface TelegramImportRecord {
  id: string;
  messageId: number;
  date: string;
  postDate?: string;
  content: string;
  channelUsername?: string;
  mediaType: 'audio' | 'pdf' | 'document' | 'voice';
  fileName?: string;
  fileSize: string;
  fileSizeFormatted?: string;
  duration?: number;
  originalCaption?: string;
  suggestedTitle: string;
  suggestedTitle_ar?: string;
  suggestedTitle_en?: string;
  suggestedSeriesId: string;
  suggestedBookId: string;
  suggestedCategoryId: string;
  suggestedLessonNumber: number;
  confidence: number;
  status: 'needs_review' | 'approved' | 'rejected' | 'pending';
  notes?: string;
  detectedTags?: string[];
  telegramMessageUrl?: string;
}

export type TelegramImport = TelegramImportRecord;


export interface UserProgress {
  lessonId: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  lastPlayed: string;
}

export interface Bookmark {
  id: string;
  type: 'lesson' | 'series' | 'book';
  itemId: string;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  categoryId?: string;
  seriesId?: string;
  bookId?: string;
  type?: 'all' | 'lessons' | 'series' | 'books';
}

export interface LessonFilters {
  searchQuery?: string;
  categoryId?: string;
  seriesId?: string;
  bookId?: string;
  durationRange?: 'all' | 'short' | 'medium' | 'long';
  sortBy?: 'newest' | 'oldest' | 'lesson_number' | 'title';
}
