import { Language } from '@/types/library';

export interface TranslationDictionary {
  // Brand & Metadata
  brandName: string;
  brandSubtitle: string;
  arabicBrand: string;
  heroTagline: string;
  heroDescription: string;
  telegramArchiveNotice: string;
  exploreDuruus: string;
  browseSeries: string;
  browseKutub: string;
  viewBooks: string;
  searchButton: string;
  audioHoursCount: string;
  featuredSeries: string;
  recentLessons: string;
  categoriesSection: string;

  // Nav
  navHome: string;
  navDuruus: string;
  navSeries: string;
  navKutub: string;
  navCategories: string;
  navSearch: string;
  navAbout: string;
  navAdmin: string;
  navMyLearning: string;

  // Actions
  play: string;
  pause: string;
  playing: string;
  audioLecture: string;
  listen: string;
  read: string;
  readPdf: string;
  viewPdf: string;
  downloadPdf: string;
  downloadAudio: string;
  share: string;
  shareCopied: string;
  markCompleted: string;
  completed: string;
  saveLesson: string;
  saved: string;
  bookmark: string;
  bookmarked: string;
  continueListening: string;
  startSeries: string;
  viewAll: string;
  filter: string;
  resetFilters: string;
  clearFilters: string;
  close: string;
  back: string;
  next: string;
  previous: string;
  searchPlaceholder: string;
  searchCommand: string;
  quickSearch: string;
  recentSearches: string;
  popularDisciplines: string;
  searchResults: string;
  noResultsFound: string;
  noResults: string;
  noResultsDescription: string;

  // Catalog & Filters
  allCategories: string;
  allSeries: string;
  allBooks: string;
  sortBy: string;
  sortNewest: string;
  sortOldest: string;
  sortLessonNumber: string;
  sortTitle: string;
  viewGrid: string;
  viewList: string;
  filterDuration: string;
  durationAll: string;
  durationShort: string;
  durationMedium: string;
  durationLong: string;
  lessonsFound: string;
  lessonNumber: string;

  // Lesson Detail
  lessonInfo: string;
  telegramSource: string;
  telegramPost: string;
  materialsAndNotes: string;
  relatedBook: string;
  relatedLessons: string;
  previousLesson: string;
  nextLesson: string;
  playbackSpeed: string;
  volume: string;
  rewind10: string;
  forward10: string;

  // Series & Books
  seriesDescription: string;
  lessonsInSeries: string;
  totalDuration: string;
  progress: string;
  bookAuthor: string;
  tableOfContents: string;
  chapter: string;
  pageCount: string;
  fileSize: string;

  // Categories
  categoriesSubtitle: string;
  lessonsCount: string;
  duruusCount: string;
  seriesCount: string;
  booksCount: string;

  // Learning & Progress
  myLearningTitle: string;
  recentlyPlayed: string;
  savedItems: string;
  completedLessonsTitle: string;
  noSavedYet: string;
  noSavedDescription: string;

  // Admin & Import
  adminDashboard: string;
  adminLessons: string;
  adminSeries: string;
  adminBooks: string;
  adminCategories: string;
  adminMedia: string;
  adminImport: string;
  adminSettings: string;
  totalLessonsMetric: string;
  totalSeriesMetric: string;
  totalBooksMetric: string;
  totalAudioMetric: string;
  totalPdfsMetric: string;
  unorganizedMetric: string;
  recentActivity: string;
  telegramImportTitle: string;
  telegramImportSubtitle: string;
  messagesDiscovered: string;
  audioFiles: string;
  needsReview: string;
  alreadyOrganized: string;
  aiSuggestionNotice: string;
  humanReviewNotice: string;
  confidence: string;
  approve: string;
  edit: string;
  reject: string;
  status: string;
  actions: string;
  suggestedSeries: string;
  suggestedBook: string;
  suggestedCategory: string;
  saveDraft: string;
  publish: string;
  preview: string;

  // Common UI
  darkMode: string;
  lightMode: string;
  languageSelect: string;
  loading: string;
  minutes: string;
  hours: string;
  datePublished: string;
  archivalSource: string;
  scholarlyArchive: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandName: "Shaykh Muhammad Zain",
    brandSubtitle: "Digital Library",
    arabicBrand: "مكتبة الشيخ محمد زين",
    heroTagline: "Shaykh Muhammad Zain Digital Library",
    heroDescription: "Preserving beneficial knowledge and making it accessible to everyone. Explore audio lessons, scholarly books, and educational archives.",
    telegramArchiveNotice: "Official Archival Channel @ShaykhMuhammadZain_Archive",
    exploreDuruus: "Explore Duruus",
    browseSeries: "Browse Series",
    browseKutub: "Browse Kutub",
    viewBooks: "Classical Books",
    searchButton: "Search",
    audioHoursCount: "hours of audio",
    featuredSeries: "Thematic Studies",
    recentLessons: "Recent Lessons",
    categoriesSection: "Sacred Sciences",

    navHome: "Home",
    navDuruus: "Duruus",
    navSeries: "Series",
    navKutub: "Kutub",
    navCategories: "Categories",
    navSearch: "Search",
    navAbout: "About",
    navAdmin: "Admin",
    navMyLearning: "My Learning",

    play: "Play",
    pause: "Pause",
    playing: "Now Playing",
    audioLecture: "Audio Lecture",
    listen: "Listen",
    read: "Read",
    readPdf: "Read PDF",
    viewPdf: "View PDF",
    downloadPdf: "Download PDF",
    downloadAudio: "Download Audio",
    share: "Share",
    shareCopied: "Link copied to clipboard",
    markCompleted: "Mark as Completed",
    completed: "Completed",
    saveLesson: "Save",
    saved: "Saved",
    bookmark: "Save Bookmark",
    bookmarked: "Bookmarked",
    continueListening: "Continue Listening",
    startSeries: "Start Series",
    viewAll: "View All",
    filter: "Filter",
    resetFilters: "Reset Filters",
    clearFilters: "Clear Filters",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    searchPlaceholder: "Search lessons, books, series, or topics...",
    searchCommand: "Quick search...",
    quickSearch: "Quick Search",
    recentSearches: "Recent Searches",
    popularDisciplines: "Popular Disciplines",
    searchResults: "Search Results",
    noResultsFound: "No results found",
    noResults: "No results found",
    noResultsDescription: "Try adjusting your search terms or clearing active filters.",

    allCategories: "All Categories",
    allSeries: "All Series",
    allBooks: "All Books",
    sortBy: "Sort by",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortLessonNumber: "Lesson Number",
    sortTitle: "Title A-Z",
    viewGrid: "Grid View",
    viewList: "List View",
    filterDuration: "Duration",
    durationAll: "All Durations",
    durationShort: "Under 30 mins",
    durationMedium: "30 - 60 mins",
    durationLong: "Over 60 mins",
    lessonsFound: "lessons found",
    lessonNumber: "Lesson",

    lessonInfo: "Lesson Information",
    telegramSource: "Telegram Source Archive",
    telegramPost: "Telegram Channel Post",
    materialsAndNotes: "Study Materials & Notes",
    relatedBook: "Related Book",
    relatedLessons: "Related Lessons in this Series",
    previousLesson: "Previous Lesson",
    nextLesson: "Next Lesson",
    playbackSpeed: "Speed",
    volume: "Volume",
    rewind10: "10s Back",
    forward10: "10s Forward",

    seriesDescription: "Series Overview",
    lessonsInSeries: "Lessons in this Series",
    totalDuration: "Total Duration",
    progress: "Progress",
    bookAuthor: "Author",
    tableOfContents: "Table of Contents",
    chapter: "Chapter",
    pageCount: "Pages",
    fileSize: "Size",

    categoriesSubtitle: "Explore Islamic disciplines and organized lesson collections.",
    lessonsCount: "lessons",
    duruusCount: "duruus",
    seriesCount: "series",
    booksCount: "books",

    myLearningTitle: "My Learning Progress",
    recentlyPlayed: "Recently Played Lessons",
    savedItems: "Saved Lessons & Books",
    completedLessonsTitle: "Completed Lessons",
    noSavedYet: "No saved items yet",
    noSavedDescription: "Bookmark lessons or books while browsing to study them here anytime.",

    adminDashboard: "Dashboard",
    adminLessons: "Lessons Management",
    adminSeries: "Series Management",
    adminBooks: "Books Management",
    adminCategories: "Categories",
    adminMedia: "Media Library",
    adminImport: "Telegram Import Inbox",
    adminSettings: "Settings",
    totalLessonsMetric: "Total Lessons",
    totalSeriesMetric: "Total Series",
    totalBooksMetric: "Total Books",
    totalAudioMetric: "Audio Recordings",
    totalPdfsMetric: "Attached PDFs",
    unorganizedMetric: "Needs Review",
    recentActivity: "Recent Archival Activity",
    telegramImportTitle: "Telegram Import Inbox",
    telegramImportSubtitle: "Review incoming channel broadcasts before catalog publication. Human editorial verification is always required.",
    messagesDiscovered: "Discovered Messages",
    audioFiles: "Audio Files",
    needsReview: "Needs Review",
    alreadyOrganized: "Organized",
    aiSuggestionNotice: "AI metadata suggestions are assistive drafts. Review and verify accuracy before publishing.",
    humanReviewNotice: "Scholarly editorial review is mandatory.",
    confidence: "Match Confidence",
    approve: "Approve & Stage",
    edit: "Edit Metadata",
    reject: "Dismiss",
    status: "Status",
    actions: "Actions",
    suggestedSeries: "Suggested Series",
    suggestedBook: "Suggested Book",
    suggestedCategory: "Suggested Category",
    saveDraft: "Save Draft",
    publish: "Publish to Library",
    preview: "Preview",

    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    languageSelect: "Language",
    loading: "Loading...",
    minutes: "min",
    hours: "hrs",
    datePublished: "Date",
    archivalSource: "Archival Source",
    scholarlyArchive: "Scholarly Islamic Knowledge Archive"
  },

  ar: {
    brandName: "محمد زين",
    brandSubtitle: "مكتبة الشيخ محمد زين",
    arabicBrand: "مكتبة الشيخ محمد زين",
    heroTagline: "مكتبة الشيخ محمد زين",
    heroDescription: "حفظ العلم النافع وتيسيره للجميع. استمع إلى الدروس الصوتية، واطلع على الكتب العلمية والمواد التعليمية الموثقة.",
    telegramArchiveNotice: "القناة الرسمية للأرشيف @ShaykhMuhammadZain_Archive",
    exploreDuruus: "استكشف الدروس",
    browseSeries: "تصفح السلاسل",
    browseKutub: "تصفح الكتب",
    viewBooks: "أمهات الكتب",
    searchButton: "بحث",
    audioHoursCount: "ساعة صوتية مسجلة",
    featuredSeries: "السلاسل العلمية",
    recentLessons: "أحدث الدروس المرفوعة",
    categoriesSection: "أبواب العلوم الشرعية",

    navHome: "الرئيسية",
    navDuruus: "الدروس",
    navSeries: "السلاسل العلمية",
    navKutub: "الكتب",
    navCategories: "الأقسام",
    navSearch: "البحث",
    navAbout: "عن المكتبة",
    navAdmin: "لوحة الإدارة",
    navMyLearning: "متابعة التعلم",

    play: "تشغيل",
    pause: "إيقاف مؤقت",
    playing: "قيد التشغيل",
    audioLecture: "درس صوتي",
    listen: "استماع",
    read: "قراءة",
    readPdf: "قراءة الكتاب",
    viewPdf: "عرض الكتاب PDF",
    downloadPdf: "تحميل PDF",
    downloadAudio: "تحميل الصوت",
    share: "مشاركة",
    shareCopied: "تم نسخ الرابط إلى الحافظة",
    markCompleted: "تحديد كمكتمل",
    completed: "تم الاستماع",
    saveLesson: "حفظ",
    saved: "محفوظ",
    bookmark: "حفظ في المفضلة",
    bookmarked: "تم الحفظ",
    continueListening: "متابعة الاستماع",
    startSeries: "بدء السلسلة",
    viewAll: "عرض الكل",
    filter: "تصفية",
    resetFilters: "إعادة ضبط",
    clearFilters: "مسح الفلاتر",
    close: "إغلاق",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    searchPlaceholder: "ابحث في الدروس، الكتب، السلاسل، أو المسائل...",
    searchCommand: "بحث سريع...",
    quickSearch: "البحث السريع",
    recentSearches: "عمليات البحث الأخيرة",
    popularDisciplines: "الأقسام الشائعة",
    searchResults: "نتائج البحث",
    noResultsFound: "لم يتم العثور على نتائج",
    noResults: "لم يتم العثور على نتائج",
    noResultsDescription: "جرّب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية.",

    allCategories: "جميع الأقسام",
    allSeries: "جميع السلاسل",
    allBooks: "جميع الكتب",
    sortBy: "ترتيب حسب",
    sortNewest: "الأحدث أولاً",
    sortOldest: "الأقدم أولاً",
    sortLessonNumber: "رقم الدرس",
    sortTitle: "أبجدياً (أ-ي)",
    viewGrid: "عرض شبكي",
    viewList: "عرض قائمة",
    filterDuration: "المدة الزمنية",
    durationAll: "جميع المدد",
    durationShort: "أقل من ٣٠ دقيقة",
    durationMedium: "٣٠ - ٦٠ دقيقة",
    durationLong: "أكثر من ٦٠ دقيقة",
    lessonsFound: "درساً متاحاً",
    lessonNumber: "الدرس",

    lessonInfo: "معلومات الدرس",
    telegramSource: "المصدر الأصلي في تيليجرام",
    telegramPost: "منشور قناة التيليجرام",
    materialsAndNotes: "المواد والملفات المرفقة",
    relatedBook: "الكتاب المشروح",
    relatedLessons: "دروس هذه السلسلة",
    previousLesson: "الدرس السابق",
    nextLesson: "الدرس التالي",
    playbackSpeed: "السرعة",
    volume: "مستوى الصوت",
    rewind10: "١٠ ثوانٍ للخلف",
    forward10: "١٠ ثوانٍ للأمام",

    seriesDescription: "نبذة عن السلسلة",
    lessonsInSeries: "دروس السلسلة",
    totalDuration: "إجمالي الساعات",
    progress: "نسبة الإنجاز",
    bookAuthor: "المؤلف",
    tableOfContents: "فهرس المحتويات",
    chapter: "الباب / الفصل",
    pageCount: "الصفحات",
    fileSize: "الحجم",

    categoriesSubtitle: "تصفح الفنون والعلوم الإسلامية المصنفة بعناية.",
    lessonsCount: "درس",
    duruusCount: "درس",
    seriesCount: "سلسلة",
    booksCount: "كتاب",

    myLearningTitle: "سجل متابعة التعلم",
    recentlyPlayed: "آخر الدروس المستمع إليها",
    savedItems: "المواد المحفوظة",
    completedLessonsTitle: "الدروس المكتملة",
    noSavedYet: "لا توجد عناصر محفوظة حالياً",
    noSavedDescription: "يمكنك حفظ الدروس والكتب أثناء التصفح للرجوع إليها في أي وقت.",

    adminDashboard: "الرئيسية",
    adminLessons: "إدارة الدروس",
    adminSeries: "إدارة السلاسل",
    adminBooks: "إدارة الكتب",
    adminCategories: "الأقسام العلمية",
    adminMedia: "مكتبة الوسائط",
    adminImport: "صندوق وارد تيليجرام",
    adminSettings: "الإعدادات",
    totalLessonsMetric: "إجمالي الدروس",
    totalSeriesMetric: "إجمالي السلاسل",
    totalBooksMetric: "إجمالي الكتب",
    totalAudioMetric: "التسجيلات الصوتية",
    totalPdfsMetric: "الملفات المرفقة",
    unorganizedMetric: "بحاجة للمراجعة",
    recentActivity: "النشاط التوثيقي الأخير",
    telegramImportTitle: "صندوق استيراد منشورات تيليجرام",
    telegramImportSubtitle: "مراجعة المواد المستخرجة من القناة قبل نشرها في الفهرس. المراجعة البشرية الدقيقة إلزامية.",
    messagesDiscovered: "الرسائل المكتشفة",
    audioFiles: "ملفات صوتية",
    needsReview: "بانتظار المراجعة",
    alreadyOrganized: "تمت الفهرسة",
    aiSuggestionNotice: "اقتراحات الذكاء الاصطناعي استرشادية فقط. يجب التحقق والتأكد قبل الاعتماد.",
    humanReviewNotice: "التوثيق العلمي يتطلب المراجعة البشرية الدقيقة.",
    confidence: "نسبة المطابقة",
    approve: "اعتماد ونقل",
    edit: "تعديل البيانات",
    reject: "استبعاد",
    status: "الحالة",
    actions: "الإجراءات",
    suggestedSeries: "السلسلة المقترحة",
    suggestedBook: "الكتاب المقترح",
    suggestedCategory: "القسم المقترح",
    saveDraft: "حفظ كمسودة",
    publish: "نشر في المكتبة",
    preview: "معاينة",

    darkMode: "الوضع الليلي",
    lightMode: "الوضع النهاري",
    languageSelect: "اللغة",
    loading: "جارٍ التحميل...",
    minutes: "دقيقة",
    hours: "ساعة",
    datePublished: "تاريخ الدرس",
    archivalSource: "مصدر التوثيق",
    scholarlyArchive: "مكتبة وأرشيف الدروس العلمية"
  },

  am: {
    brandName: "ሸይኽ ሙሓመድ ዘይን",
    brandSubtitle: "የሸይኽ ሙሓመድ ዘይን ዲጂታል ቤተ-መጻሕፍት",
    arabicBrand: "مكتبة الشيخ محمد زين",
    heroTagline: "የሸይኽ ሙሓመድ ዘይን ዲጂታል ቤተ-መጻሕፍት",
    heroDescription: "ጠቃሚ ዕውቀትን መጠበቅ እና ለሁሉም ተደራሽ ማድረግ። የድምጽ ትምህርቶችን፣ የኪታብ ማብራሪያዎችን እና የትምህርት ማህደሮችን በቀላሉ ያግኙ።",
    telegramArchiveNotice: "የቴሌግራም ቻናል @ShaykhMuhammadZain_Archive",
    exploreDuruus: "ትምህርቶችን ይፈልጉ",
    browseSeries: "ተከታታይ ትምህርቶች",
    browseKutub: "ኪታቦችን ይመልከቱ",
    viewBooks: "ዋና ዋና ኪታቦች",
    searchButton: "ፈልግ",
    audioHoursCount: "የድምጽ ሰዓታት",
    featuredSeries: "ተከታታይ ትምህርቶች",
    recentLessons: "የቅርብ ጊዜ ትምህርቶች",
    categoriesSection: "የዕውቀት ዘርፎች",

    navHome: "ዋና ገጽ",
    navDuruus: "ትምህርቶች (ዱሩስ)",
    navSeries: "ተከታታይ ትምህርቶች",
    navKutub: "ኪታቦች",
    navCategories: "ዘርፎች",
    navSearch: "ፍለጋ",
    navAbout: "ስለ ቤተ-መጻሕፍቱ",
    navAdmin: "አስተዳደር",
    navMyLearning: "የትምህርት ጉዞዬ",

    play: "አጫውት",
    pause: "አቁም",
    playing: "እየተጫወተ ነው",
    audioLecture: "የድምጽ ደርስ",
    listen: "ያዳምጡ",
    read: "ያንብቡ",
    readPdf: "PDF ያንብቡ",
    viewPdf: "ፒዲኤፍ እይ",
    downloadPdf: "PDF አውርድ",
    downloadAudio: "ድምጹን አውርድ",
    share: "አጋራ",
    shareCopied: "ሊንኩ ተገልብጧል",
    markCompleted: "እንደተጠናቀቀ ምልክት አድርግ",
    completed: "ተጠናቋል",
    saveLesson: "አስቀምጥ",
    saved: "ተቀምጧል",
    bookmark: "ምልክት አድርግ",
    bookmarked: "ተቀምጧል",
    continueListening: "ማዳመጥ ይቀጥሉ",
    startSeries: "ተከታታይ ትምህርቱን ጀምር",
    viewAll: "ሁሉንም አሳይ",
    filter: "አጣራ",
    resetFilters: "ማጣሪያዎችን አጽዳ",
    clearFilters: "ማጣሪያዎችን አጽዳ",
    close: "ዝጋ",
    back: "ተመለስ",
    next: "ቀጣይ",
    previous: "ቀዳሚ",
    searchPlaceholder: "ትምህርቶችን፣ ኪታቦችን ወይም ርዕሶችን ይፈልጉ...",
    searchCommand: "ፈጣን ፍለጋ...",
    quickSearch: "ፈጣን ፍለጋ",
    recentSearches: "የቅርብ ጊዜ ፍለጋዎች",
    popularDisciplines: "ዋና ዋና ዘርፎች",
    searchResults: "የፍለጋ ውጤቶች",
    noResultsFound: "ምንም ውጤት አልተገኘም",
    noResults: "ምንም ውጤት አልተገኘም",
    noResultsDescription: "የተለየ የፍለጋ ቃል በመጠቀም ወይም ማጣሪያዎችን በማጽዳት እንደገና ይሞክሩ።",

    allCategories: "ሁሉም ዘርፎች",
    allSeries: "ሁሉም ተከታታይ ትምህርቶች",
    allBooks: "ሁሉም ኪታቦች",
    sortBy: "ደርድር በ",
    sortNewest: "አዳዲሶች መጀመሪያ",
    sortOldest: "ቀደምቶቹ መጀመሪያ",
    sortLessonNumber: "የትምህርት ቁጥር",
    sortTitle: "በፊደል ተራ",
    viewGrid: "ፍርግርግ እይታ",
    viewList: "ዝርዝር እይታ",
    filterDuration: "የቆይታ ጊዜ",
    durationAll: "ሁሉም ርዝመቶች",
    durationShort: "ከ30 ደቂቃ በታች",
    durationMedium: "30 - 60 ደቂቃ",
    durationLong: "ከ60 ደቂቃ በላይ",
    lessonsFound: "ትምህርቶች ተገኝተዋል",
    lessonNumber: "ትምህርት",

    lessonInfo: "የትምህርቱ መረጃ",
    telegramSource: "የቴሌግራም መገኛ",
    telegramPost: "የቴሌግራም መልእክት",
    materialsAndNotes: "ተያያዥ ሰነዶች",
    relatedBook: "ተዛማጅ ኪታብ",
    relatedLessons: "በዚህ ተከታታይ ውስጥ ያሉ ትምህርቶች",
    previousLesson: "ቀዳሚ ትምህርት",
    nextLesson: "ቀጣይ ትምህርት",
    playbackSpeed: "ፍጥነት",
    volume: "ድምጽ መጠን",
    rewind10: "10 ሰከንድ ወደ ኋላ",
    forward10: "10 ሰከንድ ወደ ፊት",

    seriesDescription: "ስለ ተከታታይ ትምህርቱ",
    lessonsInSeries: "በተከታታዩ ያሉ ትምህርቶች",
    totalDuration: "አጠቃላይ ቆይታ",
    progress: "የደረሱበት ደረጃ",
    bookAuthor: "ደራሲ / አዘጋጅ",
    tableOfContents: "የርዕሶች ማውጫ",
    chapter: "ምዕራፍ",
    pageCount: "ገጾች",
    fileSize: "መጠን",

    categoriesSubtitle: "የተደራጁ የኢስላማዊ ዕውቀት ዘርፎችን ያስሱ።",
    lessonsCount: "ትምህርቶች",
    duruusCount: "ትምህርቶች",
    seriesCount: "ተከታታዮች",
    booksCount: "ኪታቦች",

    myLearningTitle: "የትምህርት ክትትል",
    recentlyPlayed: "በቅርብ የተደመጡ",
    savedItems: "የተቀመጡ ትምህርቶች",
    completedLessonsTitle: "ያለቋቸው ትምህርቶች",
    noSavedYet: "ምንም የተቀመጠ ነገር የለም",
    noSavedDescription: "በማሰስ ላይ ሳሉ ትምህርቶችን ወይም ኪታቦችን ምልክት በማድረግ እዚህ በማንኛውም ጊዜ ያግኟቸው።",

    adminDashboard: "ዳሽቦርድ",
    adminLessons: "የትምህርቶች አስተዳደር",
    adminSeries: "የተከታታዮች አስተዳደር",
    adminBooks: "የኪታቦች አስተዳደር",
    adminCategories: "ዘርፎች",
    adminMedia: "የሚዲያ ማህደር",
    adminImport: "የቴሌግራም መልእክቶች ሳጥን",
    adminSettings: "ቅንብሮች",
    totalLessonsMetric: "አጠቃላይ ትምህርቶች",
    totalSeriesMetric: "አጠቃላይ ተከታታዮች",
    totalBooksMetric: "አጠቃላይ ኪታቦች",
    totalAudioMetric: "የድምጽ ትምህርቶች",
    totalPdfsMetric: "የተያያዙ PDF ሰነዶች",
    unorganizedMetric: "ክለሳ የሚሹ",
    recentActivity: "የቅርብ ጊዜ እንቅስቃሴዎች",
    telegramImportTitle: "የቴሌግራም ገቢ መልእክቶች ሳጥን",
    telegramImportSubtitle: "ከቴሌግራም ቻናል የተገኙ ትምህርቶች ከመታተማቸው በፊት ይገምግሙ። የአዘጋጅ ማረጋገጫ ግዴታ ነው።",
    messagesDiscovered: "የተገኙ መልእክቶች",
    audioFiles: "የድምጽ ፋይሎች",
    needsReview: "ክለሳ የሚሹ",
    alreadyOrganized: "የተደራጁ",
    aiSuggestionNotice: "የአይአይ (AI) ጥቆማዎች አጋዥ ረቂቆች ናቸው። ከመጽደቃቸው በፊት ትክክለኛነታቸውን ያረጋግጡ።",
    humanReviewNotice: "የሰው ክለሳ እና ማረጋገጫ አስፈላጊ ነው።",
    confidence: "የተስማሚነት መጠን",
    approve: "አጽድቅ",
    edit: "አስተካክል",
    reject: "አትቀበል",
    status: "ሁኔታ",
    actions: "እርምጃዎች",
    suggestedSeries: "የተጠቆመ ተከታታይ",
    suggestedBook: "የተጠቆመ ኪታብ",
    suggestedCategory: "የተጠቆመ ዘርፍ",
    saveDraft: "ረቂቅ አስቀምጥ",
    publish: "ወደ ላይብረሪው አትም",
    preview: "ቅድመ እይታ",

    darkMode: "ጨለማ ገጽታ",
    lightMode: "ብርሃን ገጽታ",
    languageSelect: "ቋንቋ",
    loading: "በመጫን ላይ...",
    minutes: "ደቂቃ",
    hours: "ሰዓት",
    datePublished: "ቀን",
    archivalSource: "የመረጃ ምንጭ",
    scholarlyArchive: "ኢስላማዊ የትምህርት ዲጂታል ማህደር"
  }
};
