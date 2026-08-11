export type Lang = 'ar' | 'en';

export type Dict = Record<string, string>;

export const EN: Dict = {
  'meta.title': 'Codexa — Elite Programming Academy',
  'meta.description':
    'Codexa — an elite modern programming academy for students learning software engineering.',

  'nav.courses': 'Courses',
  'nav.methodology': 'Methodology',
  'nav.curriculum': 'Curriculum',
  'nav.pricing': 'Pricing',
  'nav.enroll': 'Enroll Now',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.primary': 'Primary',
  'nav.lang': 'English',
  'nav.langSwitch': 'العربية',
  'nav.themeLight': 'Light mode',
  'nav.themeDark': 'Dark mode',

  'hero.eyebrow': 'CODEXA',
  'hero.title': 'Master Modern Software Engineering from Day One',
  'hero.subtitle':
    'Learn full-stack development, system architecture, and modern developer tooling through real-world production projects.',
  'hero.ctaPrimary': 'Explore Programs',
  'hero.ctaTerminal': 'codexa --start',
  'hero.badge': 'System Online',

  'features.eyebrow': 'Why Codexa',
  'features.title': 'Built like a real engineering org',
  'features.subtitle':
    'Every module mirrors how modern teams design, ship, and review software — not toy tutorials.',
  'features.f1.title': 'Production Stack',
  'features.f1.desc':
    'Ship with Angular, NestJS, TypeScript, MongoDB, and Docker — the same stack used in serious product teams.',
  'features.f1.stack': 'Angular · NestJS · TS',
  'features.f2.title': 'Real Engineering',
  'features.f2.desc':
    'Practice Git workflows, CI/CD pipelines, and Cursor-assisted AI development the way professionals do.',
  'features.f2.stack': 'Git · CI/CD · Cursor',
  'features.f3.title': 'System Design',
  'features.f3.desc':
    'Learn architectural patterns, caching strategies, state management, and API design that scales.',
  'features.f3.stack': 'Architecture',
  'features.f4.title': '1-on-1 Mentorship',
  'features.f4.desc':
    'Direct code reviews and weekly technical office hours with engineers who ship for a living.',
  'features.f4.stack': 'Reviews · Office hours',
  'features.f5.title': 'Portfolio Capstones',
  'features.f5.desc':
    'Graduate with deployable projects — not homework repos — ready to show hiring managers.',
  'features.f5.stack': 'Ship · Deploy',
  'features.f6.title': 'Career Acceleration',
  'features.f6.desc':
    'Interview drills, resume systems storytelling, and guidance on standing out as a junior engineer.',
  'features.f6.stack': 'Career track',

  'method.eyebrow': 'The Codexa Methodology',
  'method.title': 'Project-based. Test-driven. AI-augmented.',
  'method.subtitle':
    'You do not watch lectures and hope it sticks. You open a repo, write failing tests, implement features, and ship with tooling that mirrors elite product teams — including responsible Cursor-assisted workflows.',
  'method.cta': 'View curriculum pathway',
  'method.tabsLabel': 'Code samples',
  'method.p1.title': 'Project-based modules',
  'method.p1.body': 'Every week ends with a mergeable feature, not a quiz score.',
  'method.p2.title': 'Test-driven discipline',
  'method.p2.body': 'Red → green → refactor until the habit is muscle memory.',
  'method.p3.title': 'AI as a force multiplier',
  'method.p3.body': 'Learn when to prompt, when to verify, and when to own the design.',

  'curriculum.eyebrow': 'Curriculum pathway',
  'curriculum.title': 'From first commit to production deploy',
  'curriculum.subtitle':
    'A sequenced roadmap that compounds skills week over week — foundations, full-stack systems, infrastructure, then a shippable capstone.',
  'curriculum.p1.badge': 'Phase 1',
  'curriculum.p1.title': 'Core Foundations & Modern TypeScript',
  'curriculum.p1.desc':
    'Type systems, async patterns, tooling, and engineering hygiene that every production codebase expects.',
  'curriculum.p1.t1': 'TypeScript',
  'curriculum.p1.t2': 'Node tooling',
  'curriculum.p1.t3': 'Git fluency',
  'curriculum.p1.t4': 'Testing basics',
  'curriculum.p2.badge': 'Phase 2',
  'curriculum.p2.title': 'Full-Stack Web Architecture',
  'curriculum.p2.desc':
    'Build end-to-end features with Angular on the client and NestJS on the server — signals, modules, and clean APIs.',
  'curriculum.p2.t1': 'Angular',
  'curriculum.p2.t2': 'NestJS',
  'curriculum.p2.t3': 'REST/GraphQL',
  'curriculum.p2.t4': 'Auth',
  'curriculum.p3.badge': 'Phase 3',
  'curriculum.p3.title': 'Databases, Microservices & Docker',
  'curriculum.p3.desc':
    'Model data, containerize services, and introduce distributed patterns without drowning in complexity.',
  'curriculum.p3.t1': 'MongoDB / SQL',
  'curriculum.p3.t2': 'Docker',
  'curriculum.p3.t3': 'Caching',
  'curriculum.p3.t4': 'CI pipelines',
  'curriculum.p4.badge': 'Phase 4',
  'curriculum.p4.title': 'Capstone Project & Production Deployment',
  'curriculum.p4.desc':
    'Ship a real product: observability, deploy targets, polish, and a portfolio narrative hiring managers trust.',
  'curriculum.p4.t1': 'Capstone',
  'curriculum.p4.t2': 'Deploy',
  'curriculum.p4.t3': 'Observability',
  'curriculum.p4.t4': 'Demo day',

  'pricing.eyebrow': 'Enrollment',
  'pricing.title': 'Choose your intensity',
  'pricing.subtitle':
    'Same production curriculum. Elite adds mentorship density and career acceleration.',
  'pricing.billingLabel': 'Billing period',
  'pricing.term': 'Full term',
  'pricing.monthly': 'Monthly',
  'pricing.suffixTerm': '/ term',
  'pricing.suffixMonthly': '/ mo',
  'pricing.popular': 'Most popular',
  'pricing.core.name': 'Core Bootcamp',
  'pricing.core.blurb':
    'Focused curriculum, peer reviews, and portfolio-ready projects.',
  'pricing.core.cta': 'Join Core',
  'pricing.core.f1': 'Full production curriculum',
  'pricing.core.f2': 'Peer code reviews',
  'pricing.core.f3': 'Portfolio project labs',
  'pricing.core.f4': 'Community Discord access',
  'pricing.core.f5': 'Career resource library',
  'pricing.elite.name': 'Elite Track',
  'pricing.elite.blurb':
    '1-on-1 mentorship, live architecture labs, and priority career support.',
  'pricing.elite.cta': 'Enroll in Elite',
  'pricing.elite.f1': 'Everything in Core',
  'pricing.elite.f2': 'Weekly 1-on-1 mentorship',
  'pricing.elite.f3': 'Priority code reviews',
  'pricing.elite.f4': 'Live architecture labs',
  'pricing.elite.f5': 'Career coaching & mock interviews',

  'cta.title': 'Ready to write your first line of production code?',
  'cta.subtitle':
    'Join the next Codexa cohort. Get curriculum access, community, and a clear path from student to shipping engineer.',
  'cta.email': 'Email',
  'cta.placeholder': 'you@student.dev',
  'cta.submit': 'Join waitlist',
  'cta.success': "✓ You're on the list — we'll be in touch.",

  'footer.tagline':
    'Elite programming academy for students who want to ship like professionals.',
  'footer.learn': 'Learn',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.about': 'About',
  'footer.careers': 'Careers',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.cookies': 'Cookies',
  'footer.ready': 'codexa@academy:~$ ready to ship',
  'footer.copyright': '© {{year}} Codexa. All rights reserved.',
  'footer.github': 'GitHub',
  'footer.linkedin': 'LinkedIn',
  'footer.x': 'X',
  'footer.youtube': 'YouTube',
};

export const AR: Dict = {
  'meta.title': 'كوديكسا — أكاديمية البرمجة للنخبة',
  'meta.description':
    'كوديكسا — أكاديمية برمجة حديثة للنخبة، لطلاب يتعلمون هندسة البرمجيات.',

  'nav.courses': 'البرامج',
  'nav.methodology': 'المنهجية',
  'nav.curriculum': 'المسار',
  'nav.pricing': 'الأسعار',
  'nav.enroll': 'سجّل الآن',
  'nav.openMenu': 'فتح القائمة',
  'nav.closeMenu': 'إغلاق القائمة',
  'nav.primary': 'القائمة الرئيسية',
  'nav.lang': 'العربية',
  'nav.langSwitch': 'English',
  'nav.themeLight': 'الوضع الفاتح',
  'nav.themeDark': 'الوضع الداكن',

  'hero.eyebrow': 'CODEXA',
  'hero.title': 'أتقن هندسة البرمجيات الحديثة من اليوم الأول',
  'hero.subtitle':
    'تعلّم تطوير التطبيقات المتكاملة، وهندسة الأنظمة، وأدوات المطوّرين الحديثة عبر مشاريع إنتاج حقيقية.',
  'hero.ctaPrimary': 'استكشف البرامج',
  'hero.ctaTerminal': 'codexa --start',
  'hero.badge': 'النظام متصل',

  'features.eyebrow': 'لماذا كوديكسا',
  'features.title': 'مبنية مثل فريق هندسة حقيقي',
  'features.subtitle':
    'كل وحدة تعكس طريقة تصميم الفرق الحديثة للبرمجيات ومراجعتها وإطلاقها — لا دروسًا شكلية.',
  'features.f1.title': 'مكدس إنتاجي',
  'features.f1.desc':
    'ابنِ بـ Angular وNestJS وTypeScript وMongoDB وDocker — نفس التقنيات التي تستخدمها فرق المنتجات الجادة.',
  'features.f1.stack': 'Angular · NestJS · TS',
  'features.f2.title': 'هندسة حقيقية',
  'features.f2.desc':
    'تمرّن على سير عمل Git وخطوط CI/CD والتطوير بمساعدة Cursor كما يفعل المحترفون.',
  'features.f2.stack': 'Git · CI/CD · Cursor',
  'features.f3.title': 'تصميم الأنظمة',
  'features.f3.desc':
    'تعلّم أنماط المعمارية، والتخزين المؤقت، وإدارة الحالة، وتصميم واجهات برمجة قابلة للتوسع.',
  'features.f3.stack': 'Architecture',
  'features.f4.title': 'إرشاد فردي',
  'features.f4.desc':
    'مراجعات كود مباشرة وساعات مكتبية تقنية أسبوعية مع مهندسين يطلقون منتجات حقيقية.',
  'features.f4.stack': 'مراجعات · ساعات مكتبية',
  'features.f5.title': 'مشاريع تخرج قابلة للنشر',
  'features.f5.desc':
    'تخرّج بمشاريع جاهزة للنشر — لا مستودعات واجبات — لتعرضها على مسؤولي التوظيف.',
  'features.f5.stack': 'Ship · Deploy',
  'features.f6.title': 'تسريع المسار المهني',
  'features.f6.desc':
    'تمارين مقابلات، وسرد قصة السيرة عبر الأنظمة، وإرشاد للتميّز كمهندس مبتدئ.',
  'features.f6.stack': 'المسار المهني',

  'method.eyebrow': 'منهجية كوديكسا',
  'method.title': 'قائم على المشاريع. موجّه بالاختبارات. معزّز بالذكاء الاصطناعي.',
  'method.subtitle':
    'لن تكتفي بمشاهدة المحاضرات وتتمنّى الفهم. ستفتح مستودعًا، وتكتب اختبارات فاشلة، وتنفّذ الميزات، وتطلق بأدوات تشبه فرق المنتجات النخبوية — بما في ذلك استخدام Cursor بمسؤولية.',
  'method.cta': 'اعرض مسار المنهج',
  'method.tabsLabel': 'عينات الشيفرة',
  'method.p1.title': 'وحدات قائمة على المشاريع',
  'method.p1.body': 'كل أسبوع ينتهي بميزة قابلة للدمج، لا بدرجة اختبار.',
  'method.p2.title': 'انضباط موجّه بالاختبارات',
  'method.p2.body': 'أحمر ← أخضر ← إعادة هيكلة حتى يصبح الأمر عادة.',
  'method.p3.title': 'الذكاء الاصطناعي كمضاعف للقوة',
  'method.p3.body': 'تعلّم متى تطلب، ومتى تتحقق، ومتى تملك التصميم بنفسك.',

  'curriculum.eyebrow': 'مسار المنهج',
  'curriculum.title': 'من أول commit إلى النشر في الإنتاج',
  'curriculum.subtitle':
    'خارطة طريق متسلسلة تبني المهارات أسبوعًا بعد أسبوع — الأسس، الأنظمة المتكاملة، البنية التحتية، ثم مشروع تخرج قابل للإطلاق.',
  'curriculum.p1.badge': 'المرحلة 1',
  'curriculum.p1.title': 'الأسس وTypeScript الحديث',
  'curriculum.p1.desc':
    'أنظمة الأنواع، والأنماط غير المتزامنة، والأدوات، وانضباط الهندسة الذي تتوقعه كل قاعدة إنتاج.',
  'curriculum.p1.t1': 'TypeScript',
  'curriculum.p1.t2': 'أدوات Node',
  'curriculum.p1.t3': 'إتقان Git',
  'curriculum.p1.t4': 'أساسيات الاختبار',
  'curriculum.p2.badge': 'المرحلة 2',
  'curriculum.p2.title': 'معمارية الويب المتكاملة',
  'curriculum.p2.desc':
    'ابنِ ميزات من الطرف إلى الطرف بـ Angular على الواجهة وNestJS على الخادم — إشارات ووحدات وواجهات نظيفة.',
  'curriculum.p2.t1': 'Angular',
  'curriculum.p2.t2': 'NestJS',
  'curriculum.p2.t3': 'REST/GraphQL',
  'curriculum.p2.t4': 'المصادقة',
  'curriculum.p3.badge': 'المرحلة 3',
  'curriculum.p3.title': 'قواعد البيانات والخدمات المصغّرة وDocker',
  'curriculum.p3.desc':
    'نمذج البيانات، وغلّف الخدمات بالحاويات، وقدّم أنماطًا موزّعة دون تعقيد زائد.',
  'curriculum.p3.t1': 'MongoDB / SQL',
  'curriculum.p3.t2': 'Docker',
  'curriculum.p3.t3': 'التخزين المؤقت',
  'curriculum.p3.t4': 'خطوط CI',
  'curriculum.p4.badge': 'المرحلة 4',
  'curriculum.p4.title': 'مشروع التخرج والنشر الإنتاجي',
  'curriculum.p4.desc':
    'أطلق منتجًا حقيقيًا: المراقبة، أهداف النشر، الصقل، وسرد محفظة يثق به مسؤولو التوظيف.',
  'curriculum.p4.t1': 'مشروع تخرج',
  'curriculum.p4.t2': 'النشر',
  'curriculum.p4.t3': 'المراقبة',
  'curriculum.p4.t4': 'يوم العرض',

  'pricing.eyebrow': 'التسجيل',
  'pricing.title': 'اختر مستوى الكثافة',
  'pricing.subtitle':
    'نفس منهج الإنتاج. مسار النخبة يضيف كثافة الإرشاد وتسريع المسار المهني.',
  'pricing.billingLabel': 'فترة الفوترة',
  'pricing.term': 'الفصل كاملًا',
  'pricing.monthly': 'شهري',
  'pricing.suffixTerm': '/ فصل',
  'pricing.suffixMonthly': '/ شهر',
  'pricing.popular': 'الأكثر طلبًا',
  'pricing.core.name': 'المعسكر الأساسي',
  'pricing.core.blurb': 'منهج مركّز، ومراجعات الأقران، ومشاريع جاهزة للمحفظة.',
  'pricing.core.cta': 'انضم للأساسي',
  'pricing.core.f1': 'منهج إنتاجي كامل',
  'pricing.core.f2': 'مراجعات كود من الأقران',
  'pricing.core.f3': 'مختبرات مشاريع المحفظة',
  'pricing.core.f4': 'وصول لمجتمع Discord',
  'pricing.core.f5': 'مكتبة موارد مهنية',
  'pricing.elite.name': 'مسار النخبة',
  'pricing.elite.blurb':
    'إرشاد فردي، ومختبرات معمارية مباشرة، ودعم مهني بأولوية.',
  'pricing.elite.cta': 'سجّل في النخبة',
  'pricing.elite.f1': 'كل ما في الأساسي',
  'pricing.elite.f2': 'إرشاد فردي أسبوعي',
  'pricing.elite.f3': 'مراجعات كود ذات أولوية',
  'pricing.elite.f4': 'مختبرات معمارية مباشرة',
  'pricing.elite.f5': 'تدريب مهني ومقابلات تجريبية',

  'cta.title': 'هل أنت مستعد لكتابة أول سطر كود إنتاجي؟',
  'cta.subtitle':
    'انضم لدورة كوديكسا القادمة. احصل على وصول للمنهج والمجتمع ومسار واضح من طالب إلى مهندس يطلق منتجات.',
  'cta.email': 'البريد الإلكتروني',
  'cta.placeholder': 'you@student.dev',
  'cta.submit': 'انضم لقائمة الانتظار',
  'cta.success': '✓ تم تسجيلك في القائمة — سنتواصل معك قريبًا.',

  'footer.tagline':
    'أكاديمية برمجة للنخبة للطلاب الذين يريدون الإطلاق بعقلية المحترفين.',
  'footer.learn': 'تعلّم',
  'footer.company': 'الشركة',
  'footer.legal': 'قانوني',
  'footer.about': 'عنّا',
  'footer.careers': 'الوظائف',
  'footer.contact': 'تواصل',
  'footer.privacy': 'الخصوصية',
  'footer.terms': 'الشروط',
  'footer.cookies': 'ملفات الارتباط',
  'footer.ready': 'codexa@academy:~$ جاهزون للإطلاق',
  'footer.copyright': '© {{year}} كوديكسا. جميع الحقوق محفوظة.',
  'footer.github': 'GitHub',
  'footer.linkedin': 'LinkedIn',
  'footer.x': 'X',
  'footer.youtube': 'YouTube',
};

export const DICTS: Record<Lang, Dict> = { ar: AR, en: EN };
