'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { BookOpen, Send, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs items={[{ label: t('navAbout') }]} />

      {/* Main Title Banner */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 mb-10 text-center">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
          Archival Documentation
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 mt-2 mb-4">
          {language === 'ar' ? 'عن مكتبة الشيخ محمد زين الرقمية' : 'About the Digital Library'}
        </h1>
        <p className="font-arabic text-xl sm:text-2xl text-emerald-950 dark:text-emerald-200 font-bold mb-4">
          مكتبة الشيخ محمد زين حفظه الله ورعاه
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
          Dedicated to systematically preserving, indexing, and freely disseminating the scholarly heritage and lesson recordings of Shaykh Muhammad Zain.
        </p>
      </div>

      {/* Section 1: The Scholar */}
      <section className="mb-12">
        <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
          {language === 'ar' ? 'ترجمة موجزة للشيخ' : 'About Shaykh Muhammad Zain'}
        </h2>
        <div className="prose dark:prose-invert text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
          <p>
            Shaykh Muhammad Zain (حفظه الله) is an esteemed Islamic scholar and educator recognized for his dedication to traditional Islamic sciences, teaching authentic creed (Aqeedah), prophetic hadith, exegesis of the Quran (Tafsir), and classical Arabic grammar. His instructional methodology focuses on elucidating foundational classical texts with clarity, linguistic precision, and deep practical relevance for students of knowledge.
          </p>
          <p>
            Over the course of many years, the Shaykh has delivered extensive lesson cycles covering standard Islamic curricula including <em>Riyad as-Salihin</em>, <em>Tafsir Ibn Kathir</em>, <em>Al-Aqeedah Al-Wasitiyyah</em>, <em>Matn al-Ajrumiyyah</em>, <em>Matn Abi Shuja’</em>, and many other cornerstone manuals of traditional Islamic learning.
          </p>
        </div>
      </section>

      {/* Section 2: Origin & Telegram Archive */}
      <section className="mb-12 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Send className="w-4 h-4" />
          <span>Telegram Archive Origin &amp; Transformation</span>
        </div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 mb-4">
          From Telegram Stream to Structured Archival System
        </h3>
        <div className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-3">
          <p>
            The original recordings and course handouts originated within the Shaykh’s active Telegram broadcast channel. While Telegram serves as a reliable channel for immediate dissemination, thousands of recordings posted over months and years quickly become challenging to search, navigate sequentially, or study systematically.
          </p>
          <p>
            This Digital Library platform was developed to transform that unstructured repository into an organized, permanent digital library:
          </p>
          <ul className="list-disc pl-5 rtl:pr-5 rtl:pl-0 space-y-2 mt-2">
            <li><strong>Thematic Series:</strong> Individual lectures are organized into chronological lesson cycles aligned with their respective books.</li>
            <li><strong>Chapter Cross-Referencing:</strong> Table of contents and audio chapters map directly to studied classical texts.</li>
            <li><strong>Multilingual Accessibility:</strong> Trilingual interfaces and metadata in Arabic, English, and Amharic to serve diverse communities of students.</li>
            <li><strong>Continuous Audio Experience:</strong> High-performance audio player allowing uninterrupted listening across navigation, speed control, and progress persistence.</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Principles & Integrity */}
      <section className="mb-12">
        <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 mb-6 pb-2 border-b border-stone-200 dark:border-stone-800">
          Core Archival Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-emerald-800 dark:text-emerald-400 mb-3" />
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-2">Authenticity &amp; Fidelity</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Preserving original lectures in their exact recorded state with verified provenance linking back to the original Telegram posts.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
            <HeartHandshake className="w-6 h-6 text-emerald-800 dark:text-emerald-400 mb-3" />
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-2">Free Open Access</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              100% free of charge, with no advertisements or commercial barriers, dedicated solely to the pleasure of Allah and spreading beneficial knowledge.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl">
            <Globe className="w-6 h-6 text-emerald-800 dark:text-emerald-400 mb-3" />
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-2">Multilingual Bridge</h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Full localization supporting native Arabic typography, English translation, and Amharic representation for East African and international students.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
