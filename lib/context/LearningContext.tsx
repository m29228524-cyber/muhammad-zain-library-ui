'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LearningContextType {
  bookmarks: { type: 'lesson' | 'series' | 'book'; id: string; savedAt: string }[];
  completedLessonIds: string[];
  recentlyPlayedIds: string[];
  toggleBookmark: (type: 'lesson' | 'series' | 'book', id: string) => boolean;
  isBookmarked: (type: 'lesson' | 'series' | 'book', id: string) => boolean;
  toggleCompleted: (lessonId: string) => boolean;
  isCompleted: (lessonId: string) => boolean;
  getLessonProgress: (lessonId: string) => { currentTime: number; duration: number } | null;
  getSeriesProgress: (seriesId: string, seriesLessonIds: string[]) => { completedCount: number; totalCount: number; percentage: number };
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<{ type: 'lesson' | 'series' | 'book'; id: string; savedAt: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedB = localStorage.getItem('library_bookmarks');
      return savedB ? JSON.parse(savedB) : [];
    } catch {
      return [];
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['duruus-riyad-001', 'duruus-riyad-002', 'duruus-tafsir-001'];
    try {
      const savedC = localStorage.getItem('library_completed_lessons');
      if (savedC) return JSON.parse(savedC);
      const initial = ['duruus-riyad-001', 'duruus-riyad-002', 'duruus-tafsir-001'];
      localStorage.setItem('library_completed_lessons', JSON.stringify(initial));
      return initial;
    } catch {
      return ['duruus-riyad-001', 'duruus-riyad-002', 'duruus-tafsir-001'];
    }
  });

  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['duruus-riyad-003', 'duruus-wasitiyyah-001', 'duruus-tafsir-002'];
    try {
      const savedR = localStorage.getItem('library_recently_played');
      if (savedR) return JSON.parse(savedR);
      const initialRecent = ['duruus-riyad-003', 'duruus-wasitiyyah-001', 'duruus-tafsir-002'];
      localStorage.setItem('library_recently_played', JSON.stringify(initialRecent));
      return initialRecent;
    } catch {
      return ['duruus-riyad-003', 'duruus-wasitiyyah-001', 'duruus-tafsir-002'];
    }
  });

  const toggleBookmark = (type: 'lesson' | 'series' | 'book', id: string): boolean => {
    const existingIndex = bookmarks.findIndex((b) => b.type === type && b.id === id);
    let next: typeof bookmarks;
    let added = false;
    if (existingIndex >= 0) {
      next = bookmarks.filter((_, idx) => idx !== existingIndex);
      added = false;
    } else {
      next = [{ type, id, savedAt: new Date().toISOString() }, ...bookmarks];
      added = true;
    }
    setBookmarks(next);
    try {
      localStorage.setItem('library_bookmarks', JSON.stringify(next));
    } catch {
      // ignore
    }
    return added;
  };

  const isBookmarked = (type: 'lesson' | 'series' | 'book', id: string): boolean => {
    return bookmarks.some((b) => b.type === type && b.id === id);
  };

  const toggleCompleted = (lessonId: string): boolean => {
    const exists = completedLessonIds.includes(lessonId);
    let next: string[];
    if (exists) {
      next = completedLessonIds.filter((id) => id !== lessonId);
    } else {
      next = [...completedLessonIds, lessonId];
    }
    setCompletedLessonIds(next);
    try {
      localStorage.setItem('library_completed_lessons', JSON.stringify(next));
    } catch {
      // ignore
    }
    return !exists;
  };

  const isCompleted = (lessonId: string): boolean => {
    return completedLessonIds.includes(lessonId);
  };

  const getLessonProgress = (lessonId: string) => {
    try {
      const saved = localStorage.getItem(`progress_${lessonId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { currentTime: parsed.currentTime || 0, duration: parsed.duration || 1800 };
      }
    } catch {
      // ignore
    }
    return null;
  };

  const getSeriesProgress = (seriesId: string, seriesLessonIds: string[]) => {
    if (!seriesLessonIds || seriesLessonIds.length === 0) {
      return { completedCount: 0, totalCount: 0, percentage: 0 };
    }
    const completedCount = seriesLessonIds.filter((id) => completedLessonIds.includes(id)).length;
    const totalCount = seriesLessonIds.length;
    const percentage = Math.round((completedCount / totalCount) * 100);
    return { completedCount, totalCount, percentage };
  };

  return (
    <LearningContext.Provider
      value={{
        bookmarks,
        completedLessonIds,
        recentlyPlayedIds,
        toggleBookmark,
        isBookmarked,
        toggleCompleted,
        isCompleted,
        getLessonProgress,
        getSeriesProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
