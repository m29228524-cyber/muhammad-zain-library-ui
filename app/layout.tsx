import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { AudioProvider } from '@/lib/context/AudioContext';
import { LearningProvider } from '@/lib/context/LearningContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MiniAudioPlayer } from '@/components/audio/MiniAudioPlayer';

export const metadata: Metadata = {
  title: 'Shaykh Muhammad Zain Digital Library | مكتبة الشيخ محمد زين',
  description: 'Digital Islamic knowledge library dedicated to preserving, organizing, and making accessible the lessons (Duruus), audio lectures, books (Kutub), and educational materials of Shaykh Muhammad Zain.',
  openGraph: {
    title: 'Shaykh Muhammad Zain Digital Library | مكتبة الشيخ محمد زين',
    description: 'Digital Islamic knowledge library dedicated to preserving and making accessible the scholarly works of Shaykh Muhammad Zain.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaykh Muhammad Zain Digital Library | مكتبة الشيخ محمد زين',
    description: 'Digital Islamic knowledge library dedicated to preserving and making accessible the scholarly works of Shaykh Muhammad Zain.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 dark:bg-[#0C1410] dark:text-stone-100 antialiased selection:bg-emerald-800 selection:text-amber-100 font-sans transition-colors duration-200" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>
            <LearningProvider>
              <AudioProvider>
                <Header />
                <main className="flex-1 pb-24">
                  {children}
                </main>
                <MiniAudioPlayer />
                <Footer />
              </AudioProvider>
            </LearningProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
