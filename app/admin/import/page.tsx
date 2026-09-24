'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LibraryRepository } from '@/lib/data/repository';
import { TelegramImport } from '@/types/library';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  FileText,
  Layers,
  ArrowRight,
  RefreshCw,
  Edit,
  ExternalLink,
  X,
  Filter,
} from 'lucide-react';

export default function TelegramImportPage() {
  const { language, t } = useLanguage();
  const [imports, setImports] = useState<TelegramImport[]>(() => LibraryRepository.getTelegramImports());
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedItem, setSelectedItem] = useState<TelegramImport | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);

  // Review Form Edit State
  const [editTitleAr, setEditTitleAr] = useState('');
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editSeriesId, setEditSeriesId] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editBookId, setEditBookId] = useState('');
  const [editLessonNumber, setEditLessonNumber] = useState<number>(1);
  const [editDescriptionEn, setEditDescriptionEn] = useState('');
  const [editTags, setEditTags] = useState('');

  const seriesList = LibraryRepository.getAllSeries();
  const categories = LibraryRepository.getCategories();
  const books = LibraryRepository.getBooks();

  const filteredImports = imports.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const handleOpenReview = (item: TelegramImport) => {
    setSelectedItem(item);
    setEditTitleAr(item.suggestedTitle_ar || '');
    setEditTitleEn(item.suggestedTitle_en || '');
    setEditSeriesId(item.suggestedSeriesId || '');
    setEditCategoryId(item.suggestedCategoryId || '');
    setEditBookId(item.suggestedBookId || '');
    setEditLessonNumber(item.suggestedLessonNumber || 1);
    setEditDescriptionEn(item.notes || '');
    setEditTags(item.detectedTags?.join(', ') || '');
    setIsReviewOpen(true);
  };

  const handleApprove = () => {
    if (!selectedItem) return;
    const updated = LibraryRepository.approveTelegramImport(selectedItem.id, {
      title_ar: editTitleAr,
      title_en: editTitleEn,
      seriesId: editSeriesId,
      categoryId: editCategoryId,
      bookId: editBookId,
      lessonNumber: editLessonNumber,
      description_en: editDescriptionEn,
      tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    if (updated) {
      setImports((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
    }
    setIsReviewOpen(false);
  };

  const handleReject = () => {
    if (!selectedItem) return;
    const updated = LibraryRepository.rejectTelegramImport(selectedItem.id, 'Duplicate or unverified message format.');
    if (updated) {
      setImports((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
    }
    setIsReviewOpen(false);
  };

  const handleSimulateSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => {
      const newImport: TelegramImport = {
        id: `import-${Date.now()}`,
        channelUsername: 'ShaykhMuhammadZain_Archive',
        messageId: Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString(),
        postDate: new Date().toISOString(),
        content: 'درس جديد لفضيلة الشيخ محمد زين حفظه الله في شرح كتاب رياض الصالحين',
        mediaType: 'audio',
        fileName: `Dars_Raw_${Date.now()}.mp3`,
        fileSize: '38.4 MB',
        fileSizeFormatted: '38.4 MB',
        duration: 2310,
        originalCaption: 'درس جديد لفضيلة الشيخ محمد زين حفظه الله في شرح كتاب رياض الصالحين',
        suggestedTitle: 'Riyad as-Salihin - Chapter on Taqwa',
        suggestedTitle_ar: 'شرح رياض الصالحين - باب التقوى',
        suggestedTitle_en: 'Riyad as-Salihin - Chapter on Taqwa',
        suggestedSeriesId: 'series-riyad-as-salihin',
        suggestedCategoryId: 'cat-hadith',
        suggestedBookId: 'book-riyad-as-salihin',
        suggestedLessonNumber: 25,
        confidence: 95,
        detectedTags: ['Taqwa', 'Hadith', 'RiyadAsSalihin'],
        status: 'pending',
        telegramMessageUrl: 'https://t.me/ShaykhMuhammadZain_Archive/9999',
      };
      setImports((prev) => [newImport, ...prev]);
      setIsSimulatingSync(false);
    }, 800);
  };

  const pendingCount = imports.filter((i) => i.status === 'pending').length;
  const approvedCount = imports.filter((i) => i.status === 'approved').length;
  const rejectedCount = imports.filter((i) => i.status === 'rejected').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Breadcrumbs
        items={[
          { label: t('navAdmin'), href: '/admin' },
          { label: 'Telegram Ingestion Inbox' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              Ingestion Pipeline
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-mono">@ShaykhMuhammadZain_Archive</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-stone-900 dark:text-stone-100">
            Telegram Archive Ingestion Inbox
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Review raw voice notes, audio lectures, and PDFs ingested from the official Telegram channel, enrich them with structured metadata, and publish them to the public library.
          </p>
        </div>

        <button
          onClick={handleSimulateSync}
          disabled={isSimulatingSync}
          className="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingSync ? 'animate-spin' : ''}`} />
          <span>{isSimulatingSync ? 'Fetching new messages...' : 'Simulate Channel Sync'}</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="border-b border-stone-200 dark:border-stone-800 mb-6 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'pending'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Needs Review ({pendingCount})</span>
          {activeTab === 'pending' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'approved'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Approved ({approvedCount})</span>
          {activeTab === 'approved' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'rejected'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Rejected ({rejectedCount})</span>
          {activeTab === 'rejected' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'text-emerald-900 dark:text-emerald-300 font-semibold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>All Items ({imports.length})</span>
          {activeTab === 'all' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-emerald-800 dark:bg-emerald-400" />
          )}
        </button>
      </div>

      {/* Ingestion Table */}
      <div className="bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Message / File</th>
                <th className="py-3 px-4">Broadcast Date</th>
                <th className="py-3 px-4">Suggested Title</th>
                <th className="py-3 px-4">Suggested Series</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
              {filteredImports.map((item) => {
                const s = item.suggestedSeriesId ? LibraryRepository.getSeriesById(item.suggestedSeriesId) : null;
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-colors"
                  >
                    {/* Message / File Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          {item.mediaType === 'audio' ? <Play className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-xs">
                            {item.fileName}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                            <span>Msg #{item.messageId}</span>
                            <span>·</span>
                            <span>{item.fileSizeFormatted}</span>
                            {item.duration && (
                              <>
                                <span>·</span>
                                <span>{LibraryRepository.formatDuration(item.duration)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(item.postDate || item.date).toLocaleDateString()}
                    </td>

                    {/* Suggested Title */}
                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <span className="font-medium text-stone-800 dark:text-stone-200 block truncate">
                        {item.suggestedTitle_ar || item.suggestedTitle_en}
                      </span>
                      {item.suggestedTitle_ar && item.suggestedTitle_en && (
                        <span className="text-[11px] text-stone-400 block truncate">
                          {item.suggestedTitle_en}
                        </span>
                      )}
                    </td>

                    {/* Suggested Series */}
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                      {s ? (
                        <span className="font-medium text-emerald-800 dark:text-emerald-400">
                          {language === 'ar' ? s.title_ar : s.title_en}
                        </span>
                      ) : (
                        <span className="text-stone-400 italic">Unassigned</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                        item.status === 'pending'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : item.status === 'approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                      }`}>
                        {item.status === 'pending' ? 'Needs Review' : item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenReview(item)}
                        className="px-3 py-1.5 rounded bg-emerald-900 hover:bg-emerald-800 text-amber-100 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Edit className="w-3 h-3" />
                        <span>{item.status === 'pending' ? 'Review & Ingest' : 'View / Edit'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Edit Modal */}
      {isReviewOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setIsReviewOpen(false)}
          />

          <div className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#111C16] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 uppercase font-semibold">
                  Telegram Source: #{selectedItem.messageId}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Curation &amp; Metadata Review
                </h3>
              </div>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              
              {/* Original Telegram Broadcast Box */}
              <div className="p-4 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>File: <strong className="text-stone-800 dark:text-stone-200 font-mono">{selectedItem.fileName}</strong></span>
                  <span>Size: {selectedItem.fileSizeFormatted}</span>
                </div>
                {selectedItem.originalCaption && (
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">Original Telegram Caption:</span>
                    <p className="font-arabic text-sm text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800/80 p-2.5 rounded border border-stone-200 dark:border-stone-700 leading-relaxed">
                      {selectedItem.originalCaption}
                    </p>
                  </div>
                )}
                <a
                  href={selectedItem.telegramMessageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-400 hover:underline font-semibold pt-1"
                >
                  <Send className="w-3 h-3" />
                  <span>View Original Telegram Message</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Form Fields for Library Publishing */}
              <div className="space-y-4">
                
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Arabic Title (عنوان الدرس بالعربية) *
                    </label>
                    <input
                      type="text"
                      value={editTitleAr}
                      onChange={(e) => setEditTitleAr(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg font-arabic text-sm focus:outline-none focus:ring-1 focus:ring-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      English Title *
                    </label>
                    <input
                      type="text"
                      value={editTitleEn}
                      onChange={(e) => setEditTitleEn(e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800"
                    />
                  </div>
                </div>

                {/* Series, Category, Book selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Assign to Series *
                    </label>
                    <select
                      value={editSeriesId}
                      onChange={(e) => setEditSeriesId(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none"
                    >
                      <option value="">Select a Series</option>
                      {seriesList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title_en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Discipline / Category *
                    </label>
                    <select
                      value={editCategoryId}
                      onChange={(e) => setEditCategoryId(e.target.value)}
                      className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name_en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Lesson Number *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editLessonNumber}
                      onChange={(e) => setEditLessonNumber(parseInt(e.target.value) || 1)}
                      className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Associated Book Treatise */}
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Associated Classical Text / Book (Optional)
                  </label>
                  <select
                    value={editBookId}
                    onChange={(e) => setEditBookId(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none"
                  >
                    <option value="">None / Standalone Lecture</option>
                    {books.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title_en} ({b.author_en})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description & Topics */}
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Lesson Description / Scholarly Notes
                  </label>
                  <textarea
                    rows={3}
                    value={editDescriptionEn}
                    onChange={(e) => setEditDescriptionEn(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none"
                    placeholder="Enter key topics and summary of what is covered in this lesson..."
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Topics / Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g. Niyyah, Sincerity, Bukhari, Hadith"
                    className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-xs focus:outline-none"
                  />
                </div>

              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 bg-stone-100 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-stone-700 dark:text-stone-200 hover:text-rose-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject / Ignore</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReviewOpen(false)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve &amp; Publish to Library</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
