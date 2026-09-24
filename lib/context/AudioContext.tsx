'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Lesson } from '@/types/library';

interface AudioContextType {
  currentLesson: Lesson | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isMiniPlayerOpen: boolean;
  isExpandedPlayerOpen: boolean;
  playLesson: (lesson: Lesson) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  skip: (seconds: number) => void;
  setRate: (rate: number) => void;
  setVol: (volume: number) => void;
  toggleMute: () => void;
  closeMiniPlayer: () => void;
  setExpandedPlayerOpen: (open: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);
  const [isExpandedPlayerOpen, setIsExpandedPlayerOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize HTML5 Audio object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audioRef.current = audio;

      const onTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          // Persist progress to local storage
          if (currentLesson) {
            try {
              const progressKey = `progress_${currentLesson.id}`;
              localStorage.setItem(progressKey, JSON.stringify({
                lessonId: currentLesson.id,
                currentTime: audioRef.current.currentTime,
                duration: audioRef.current.duration || currentLesson.duration,
                lastPlayed: new Date().toISOString()
              }));
            } catch {
              // ignore
            }
          }
        }
      };

      const onLoadedMetadata = () => {
        if (audioRef.current) {
          const d = audioRef.current.duration;
          if (!isNaN(d) && d > 0) {
            setDuration(d);
          }
        }
      };

      const onEnded = () => {
        setIsPlaying(false);
        if (currentLesson) {
          try {
            const completedKey = `completed_${currentLesson.id}`;
            localStorage.setItem(completedKey, 'true');
          } catch {
            // ignore
          }
        }
      };

      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('ended', onEnded);

      return () => {
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('ended', onEnded);
        audio.pause();
      };
    }
  }, [currentLesson]);

  // Synthetic fallback timer in case media fails to stream (e.g. sandbox offline)
  useEffect(() => {
    if (isPlaying && (!audioRef.current || isNaN(audioRef.current.duration) || audioRef.current.duration === 0)) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const targetDuration = duration || (currentLesson?.duration ?? 1800);
          if (prev >= targetDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, currentLesson, playbackRate]);

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resume = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!currentLesson) return;
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const seek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration || currentLesson?.duration || 0));
    setCurrentTime(clamped);
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = clamped;
      } catch {
        // ignore
      }
    }
  };

  const skip = (seconds: number) => {
    seek(currentTime + seconds);
  };

  const playLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setDuration(lesson.duration);
    setIsMiniPlayerOpen(true);

    // Retrieve saved progress if any
    try {
      const saved = localStorage.getItem(`progress_${lesson.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentTime && parsed.currentTime < lesson.duration - 10) {
          setCurrentTime(parsed.currentTime);
        } else {
          setCurrentTime(0);
        }
      } else {
        setCurrentTime(0);
      }

      // Add to recently played list
      const recentsKey = 'library_recently_played';
      const existing = JSON.parse(localStorage.getItem(recentsKey) || '[]');
      const updated = [lesson.id, ...existing.filter((id: string) => id !== lesson.id)].slice(0, 15);
      localStorage.setItem(recentsKey, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (audioRef.current) {
      if (audioRef.current.src !== lesson.audioUrl) {
        audioRef.current.src = lesson.audioUrl;
        audioRef.current.playbackRate = playbackRate;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to simulated playback if external audio blocked
        setIsPlaying(true);
      });
    } else {
      setIsPlaying(true);
    }
  };

  const actionsRef = useRef({ togglePlay, skip, currentLesson });
  useEffect(() => {
    actionsRef.current = { togglePlay, skip, currentLesson };
  });

  // Global keyboard shortcuts (Space to toggle, Left/Right arrow to seek)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.getAttribute('contenteditable') === 'true') {
        return;
      }

      if (e.code === 'Space' && actionsRef.current.currentLesson) {
        e.preventDefault();
        actionsRef.current.togglePlay();
      } else if (e.code === 'ArrowLeft' && actionsRef.current.currentLesson) {
        e.preventDefault();
        actionsRef.current.skip(-10);
      } else if (e.code === 'ArrowRight' && actionsRef.current.currentLesson) {
        e.preventDefault();
        actionsRef.current.skip(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const setVol = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const closeMiniPlayer = () => {
    pause();
    setIsMiniPlayerOpen(false);
  };

  return (
    <AudioContext.Provider
      value={{
        currentLesson,
        isPlaying,
        currentTime,
        duration: duration || currentLesson?.duration || 0,
        playbackRate,
        volume,
        isMuted,
        isMiniPlayerOpen,
        isExpandedPlayerOpen,
        playLesson,
        togglePlay,
        pause,
        resume,
        seek,
        skip,
        setRate,
        setVol,
        toggleMute,
        closeMiniPlayer,
        setExpandedPlayerOpen: setIsExpandedPlayerOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
