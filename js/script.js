/* =========================================================
   Madrasa Dar-e-Arqam Gurguri — demo site behaviour
   NOTE: all data below is demo data. In the Laravel system it
   is loaded from the database (stats, notices, date sheet,
   results and the grading scale are never hardcoded there).
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Demo data ---------- */
  const SITE_STATS = { clsStudents: 320, clsTeachers: 18, clsClasses: 12, clsDepts: 5 };

  const NOTICES = [
    { d: "15", m: { en: "Nov", ur: "نومبر" }, t: { en: "Annual exam date sheet released", ur: "سالانہ امتحان کا ڈیٹ شیٹ جاری" }, b: { en: "Exams begin on 1 December. Download or print the date sheet below.", ur: "امتحانات یکم دسمبر سے شروع ہوں گے۔ ڈیٹ شیٹ نیچے سے پرنٹ کریں۔" } },
    { d: "10", m: { en: "Nov", ur: "نومبر" }, t: { en: "Fee submission deadline", ur: "فیس جمع کرانے کی آخری تاریخ" }, b: { en: "Monthly fee must be paid by the 20th to avoid a late charge.", ur: "ماہانہ فیس 20 تاریخ تک جمع کرائیں۔" } },
    { d: "02", m: { en: "Nov", ur: "نومبر" }, t: { en: "Parent meeting", ur: "والدین سے ملاقات" }, b: { en: "Guardians are invited to meet teachers on Saturday after Zuhr.", ur: "ہفتہ کو ظہر کے بعد والدین اساتذہ سے ملاقات کریں۔" } }
  ];

  const DATE_SHEET = [
    { date: "2026-12-01", sub: "quran",  time: "9:00 – 11:00", hall: "A-1" },
    { date: "2026-12-02", sub: "hadith", time: "9:00 – 11:00", hall: "A-1" },
    { date: "2026-12-03", sub: "fiqh",   time: "9:00 – 11:00", hall: "A-2" },
    { date: "2026-12-05", sub: "nahw",   time: "9:00 – 11:00", hall: "A-2" },
    { date: "2026-12-07", sub: "urdu",   time: "9:00 – 11:00", hall: "A-1" },
    { date: "2026-12-08", sub: "math",   time: "9:00 – 11:00", hall: "A-1" }
  ];

  // Configurable grading scale (mirrors the admin-defined grades table)
  const GRADES = [
    { min: 80, grade: "A+", fail: false },
    { min: 70, grade: "A",  fail: false },
    { min: 60, grade: "B",  fail: false },
    { min: 50, grade: "C",  fail: false },
    { min: 40, grade: "D",  fail: false },
    { min: 0,  grade: "F",  fail: true  }
  ];
  const gradeFor = p => GRADES.find(g => p >= g.min);

  const DEMO_RESULT = {
    roll: "2026-001", reg: "REG-2026-0001",
    name: { en: "Demo Student", ur: "نمونہ طالب علم" },
    father: { en: "Sample Guardian", ur: "نمونہ سرپرست" },
    cls: { en: "Dars-e-Nizami, Year 1", ur: "درس نظامی، سال اول" },
    exam: { en: "Annual Exam 2026", ur: "سالانہ امتحان 2026" },
    marks: [
      { sub: "quran", total: 100, got: 92 }, { sub: "hadith", total: 100, got: 81 },
      { sub: "fiqh", total: 100, got: 76 },  { sub: "nahw", total: 100, got: 68 },
      { sub: "urdu", total: 100, got: 74 },  { sub: "math", total: 100, got: 58 }
    ]
  };

  /* ---------- Translations ---------- */
  const I18N = {
    en: {
      brand: "Dar-e-Arqam Gurguri", brandSub: "Madrasa",
      "nav.home": "Home", "nav.about": "About", "nav.programs": "Programs", "nav.resources": "Guidance", "nav.admissions": "Admissions",
      "nav.notices": "Notices", "nav.results": "Results", "nav.contact": "Contact", "nav.login": "Portal login",
      "login.student": "Student results", "login.parent": "Parent results", "login.wifaq": "Wifaq Madaris login",
      "hero.badge": "Admissions open 2026–2027", "hero.title": "Madrasa Dar-e-Arqam Gurguri",
      "hero.lead": "A place of learning where the Quran, sound character and useful knowledge are taught together, with care for every student.",
      "hero.cta1": "Apply for admission", "hero.cta2": "Check result",
      "hero.slide1": "Slide 1", "hero.slide2": "Slide 2", "hero.slide3": "Slide 3", "hero.slide4": "Slide 4",
      "hero.image1": "An open Quran on a wooden stand", "hero.image2": "The madrasa building",
      "hero.image3": "A student reading a book", "hero.image4": "An award for academic achievement", "hero.image5": "Learners studying together",
      "hero.carousel": "Madrasa images", "hero.previous": "Previous image", "hero.next": "Next image",
      "stats.title": "At a glance", "stat.students": "Students", "stat.teachers": "Teachers", "stat.classes": "Classes", "stat.depts": "Departments",
      "about.eyebrow": "Who we are", "about.title": "About the madrasa",
      "about.v4t": "Every learner matters", "about.v4d": "We follow attendance, assignments and progress, and keep families informed.", "about.since": "Established 2005 · Gurguri",
      "about.p1": "Madrasa Dar-e-Arqam Gurguri teaches the Quran, Hadith, Fiqh and Arabic alongside Urdu, English and mathematics, so that students grow in faith and in everyday skills.",
      "about.p2": "Our teachers follow each student's progress through attendance, assignments and regular examinations, and keep parents informed.",
      "about.v1t": "Quran first", "about.v1d": "Recitation, memorisation and understanding come before everything else.",
      "about.v2t": "Character", "about.v2d": "Adab, honesty and respect are taught and practised daily.",
      "about.v3t": "Useful skills", "about.v3d": "Languages, mathematics and computer basics prepare students for life.",
      "about.quoteT": "Our first lesson", "about.quote": "“Read in the name of your Lord who created.” Learning begins with the Quran and grows from there.",
      "teacher.eyebrow": "Our teaching team", "teacher.title": "Teaching, care, and guidance",
      "teacher.imageCaption": "Illustration for the teaching team",
      "teacher.intro": "Our teachers teach the Quran, Islamic studies and useful modern subjects, while guiding each student's learning progress.",
      "teacher.quranTitle": "Quran, Hifz and Tajweed", "teacher.quranText": "Structured teaching in recitation, memorisation, correct pronunciation and daily revision.",
      "teacher.darsTitle": "Dars-e-Nizami and Islamic studies", "teacher.darsText": "Step-by-step learning in the Dars-e-Nizami curriculum, Hadith, Fiqh and Arabic.",
      "teacher.progressTitle": "Learning progress", "teacher.progressText": "Attendance, assignments and exams help teachers follow each student's progress.",
      "teacher.familyTitle": "Family communication", "teacher.familyText": "Guardians can meet teachers and discuss a student's learning and support needs.",
      "teacher.cta": "Ask about the teaching team",
      "prog.eyebrow": "What we teach", "prog.title": "Academic programs", "prog.sub": "Departments and courses are managed by the administration and can change each session.",
      p1t: "Nazra", p1d: "Reading the Quran with correct pronunciation, for beginners and older students.",
      p2t: "Hifz", p2d: "Memorisation of the Quran with daily revision, led by experienced huffaz.",
      p3t: "Dars-e-Nizami", p3d: "The classical eight-year course from Ibtidaiyah to Aalamiyah.",
      p4t: "Tajweed", p4d: "Rules of recitation and Qira'at for students who want to refine their recitation.",
      p5t: "Arabic language", p5d: "Nahw, Sarf and spoken Arabic taught step by step.",
      p6t: "Modern subjects", p6d: "Urdu, English, mathematics and computer skills alongside religious studies.",
      "adm.title": "How to apply",
      "adm.s1t": "Fill the application", "adm.s1d": "Complete the admission form with the student and guardian details.",
      "adm.s2t": "Submit documents", "adm.s2d": "B-Form or CNIC, two photographs and the previous certificate, if any.",
      "adm.s3t": "Meet the teachers", "adm.s3d": "A short interview and level test decide the right class.",
      "adm.s4t": "Receive your admission number", "adm.s4d": "After approval you get a registration number and a student card.",
      "adm.cardT": "Admissions open", "adm.cardD": "Applications for the 2026–2027 session are accepted until the end of the month.",
      "adm.l1": "Boys and girls sections", "adm.l2": "Day scholar and residential places", "adm.l3": "Fee support for deserving students",
      "adm.cta": "Request the admission form",
      "notice.title": "Notices and date sheet", "notice.latest": "Latest notices",
      "ds.title": "Annual exam date sheet", "ds.cls": "Class: Dars-e-Nizami, Year 1", "ds.print": "Print",
      "ds.date": "Date", "ds.subject": "Subject", "ds.time": "Time", "ds.hall": "Hall",
      "sub.quran": "Quran", "sub.hadith": "Hadith", "sub.fiqh": "Fiqh", "sub.nahw": "Nahw", "sub.urdu": "Urdu", "sub.math": "Mathematics",
      "res.title": "Check your result", "res.sub": "Enter the roll number and registration number printed on your roll slip.",
      "res.roll": "Roll number", "res.reg": "Registration number", "res.btn": "Show result",
      "res.hint": "Sample only: try 2026-001 and REG-2026-0001. Connect the madrasa database for official results.",
      "res.notfound": "No result found. Check both numbers and try again.",
      "res.student": "Student", "res.father": "Father", "res.class": "Class", "res.total": "Total", "res.percent": "Percentage",
      "res.grade": "Grade", "res.status": "Status", "res.pass": "Pass", "res.fail": "Fail", "res.marks": "Marks", "res.out": "Out of", "res.print": "Print result",
      "gal.preview": "Gallery image preview", "gal.close": "Close image preview", "gal.eyebrow": "Our campus", "gal.all": "All moments", "gal.fQuran": "Quran learning", "gal.fCampus": "Campus", "gal.fEvents": "Events",
      "gal.title": "Life at the madrasa", "gal.sub": "A glimpse of learning, campus life and the moments we share.",
      "gal.g1": "Quran class", "gal.g2": "Campus", "gal.g3": "Annual function", "gal.g4": "Examination hall", "gal.g5": "Students", "gal.g6": "Hifz graduation",
      "con.title": "Contact us", "con.addrT": "Address", "con.addr": "Gurguri, Pakistan", "con.phoneT": "Phone and WhatsApp",
      "con.emailT": "Email", "con.phonePending": "Contact number to be added", "con.emailPending": "Email address to be added",
      "con.hoursT": "Office hours", "con.hours": "Saturday to Thursday, 8:00 am to 2:00 pm", "con.map": "Map goes here (Google Maps embed)",
      "con.formT": "Send a message", "con.name": "Your name", "con.phone": "Mobile number", "con.topic": "Topic", "con.msg": "Message", "con.send": "Send message",
      "con.t1": "Admission", "con.t2": "Fees", "con.t3": "Results", "con.t4": "Other",
      "con.ok": "Demo only: your message was not sent. Connect a form service to enable delivery.",
      "con.err": "Please fill in your name, mobile number and message.",
      "foot.about": "Quran, character and knowledge, in one place.", "foot.links": "Quick links", "foot.portals": "Portals",
      "foot.copy": "© 2026 Madrasa Dar-e-Arqam Gurguri. All rights reserved.",
      "hub.eyebrow": "Information and guidance", "hub.title": "Learning and guidance centre",
      "hub.sub": "Find key links for admissions, exams, results and trusted Islamic learning resources.",
      "hub.searchLabel": "Search information", "hub.searchPlaceholder": "Try admission, result, books",
      "hub.admission": "Admission guide", "hub.admissionD": "Requirements and application steps",
      "hub.exam": "Exams and notices", "hub.examD": "Latest notices and date sheet",
      "hub.result": "Results", "hub.resultD": "Look up a result by roll number",
      "hub.programs": "Academic programs", "hub.programsD": "Courses and curriculum overview",
      "hub.teachers": "Our teachers", "hub.teachersD": "Teaching areas and student guidance",
      "hub.questions": "Questions and answers", "hub.questionsD": "Public guidance from Jamia Banuri Town",
      "hub.library": "Books and articles", "hub.libraryD": "Publications and resources for further study",
      "hub.wifaq": "Wifaq ul Madaris login", "hub.wifaqD": "Official portal for affiliated madaris",
      "hub.external": "External website", "hub.empty": "No information matched your search."
    },
    ur: {
      brand: "دارِ ارقم گرگری", brandSub: "مدرسہ",
      "nav.home": "ہوم", "nav.about": "ہمارے بارے میں", "nav.programs": "شعبہ جات", "nav.resources": "رہنمائی", "nav.admissions": "داخلہ",
      "nav.notices": "اعلانات", "nav.results": "نتائج", "nav.contact": "رابطہ", "nav.login": "پورٹل لاگ اِن",
      "login.student": "طالب علم نتائج", "login.parent": "والدین نتائج", "login.wifaq": "وفاق المدارس لاگ اِن",
      "hero.badge": "داخلے جاری ہیں 2026–2027", "hero.title": "مدرسہ دارِ ارقم گرگری",
      "hero.lead": "ایسی درسگاہ جہاں قرآن، اچھے اخلاق اور مفید علم ایک ساتھ سکھایا جاتا ہے، اور ہر طالب علم کا خیال رکھا جاتا ہے۔",
      "hero.cta1": "داخلے کے لیے درخواست دیں", "hero.cta2": "نتیجہ دیکھیں",
      "hero.slide1": "سلائیڈ 1", "hero.slide2": "سلائیڈ 2", "hero.slide3": "سلائیڈ 3", "hero.slide4": "سلائیڈ 4",
      "hero.image1": "رحل پر کھلا ہوا قرآن مجید", "hero.image2": "مدرسے کی عمارت",
      "hero.image3": "کتاب پڑھتا ہوا طالب علم", "hero.image4": "تعلیمی کامیابی کا اعزاز", "hero.image5": "مل کر تعلیم حاصل کرتے ہوئے طلبہ",
      "hero.carousel": "مدرسے کی تصاویر", "hero.previous": "پچھلی تصویر", "hero.next": "اگلی تصویر",
      "stats.title": "اعداد و شمار", "stat.students": "طلبہ", "stat.teachers": "اساتذہ", "stat.classes": "درجات", "stat.depts": "شعبے",
      "about.eyebrow": "ہمارا تعارف", "about.title": "مدرسے کے بارے میں",
      "about.v4t": "ہر طالب علم اہم ہے", "about.v4d": "ہم حاضری، اسائنمنٹس اور تعلیمی پیش رفت پر نظر رکھتے اور اہلِ خانہ کو باخبر رکھتے ہیں۔", "about.since": "قیام 2005ء · گرگری",
      "about.p1": "مدرسہ دارِ ارقم گرگری میں قرآن، حدیث، فقہ اور عربی کے ساتھ اردو، انگریزی اور ریاضی بھی پڑھائی جاتی ہے تاکہ طلبہ دین اور روزمرہ مہارتوں میں آگے بڑھیں۔",
      "about.p2": "ہمارے اساتذہ حاضری، تحریری کام اور باقاعدہ امتحانات کے ذریعے ہر طالب علم کی پیش رفت دیکھتے ہیں اور والدین کو آگاہ رکھتے ہیں۔",
      "about.v1t": "قرآن سب سے پہلے", "about.v1d": "تلاوت، حفظ اور فہم کو ہر چیز پر مقدم رکھا جاتا ہے۔",
      "about.v2t": "کردار", "about.v2d": "ادب، سچائی اور احترام روزانہ سکھائے اور عمل میں لائے جاتے ہیں۔",
      "about.v3t": "مفید مہارتیں", "about.v3d": "زبانیں، ریاضی اور کمپیوٹر کی بنیادی تعلیم زندگی کے لیے تیار کرتی ہے۔",
      "about.quoteT": "ہمارا پہلا سبق", "about.quote": "«اپنے رب کے نام سے پڑھو جس نے پیدا کیا۔» تعلیم کا آغاز قرآن سے ہوتا ہے۔",
      "teacher.eyebrow": "ہمارے اساتذہ", "teacher.title": "اساتذہ — تعلیم اور رہنمائی",
      "teacher.imageCaption": "تدریس کا علامتی خاکہ",
      "teacher.intro": "ہمارے اساتذہ قرآن، دینی نصاب اور مفید عصری مضامین کی تعلیم کے ساتھ طلبہ کی روزانہ تعلیمی پیش رفت میں رہنمائی کرتے ہیں۔",
      "teacher.quranTitle": "قرآن، حفظ اور تجوید", "teacher.quranText": "ناظرہ، حفظ، درست تلفظ اور روزانہ دہرائی کے لیے منظم تدریس۔",
      "teacher.darsTitle": "درسِ نظامی اور دینی علوم", "teacher.darsText": "درسِ نظامی، حدیث، فقہ اور عربی کی مرحلہ وار تعلیم۔",
      "teacher.progressTitle": "تعلیمی پیش رفت", "teacher.progressText": "حاضری، اسائنمنٹس اور امتحانات کے ذریعے طلبہ کی پیش رفت پر نظر۔",
      "teacher.familyTitle": "والدین سے رابطہ", "teacher.familyText": "سرپرست اساتذہ سے ملاقات کرکے طالب علم کی تعلیم اور رہنمائی پر بات کر سکتے ہیں۔",
      "teacher.cta": "اساتذہ سے معلومات لیں",
      "prog.eyebrow": "ہم کیا پڑھاتے ہیں", "prog.title": "تعلیمی شعبہ جات", "prog.sub": "شعبے اور کورسز انتظامیہ ترتیب دیتی ہے اور ہر سیشن میں تبدیل ہو سکتے ہیں۔",
      p1t: "ناظرہ", p1d: "درست تلفظ کے ساتھ قرآن پڑھنا، ابتدائی اور بڑی عمر کے طلبہ کے لیے۔",
      p2t: "حفظ", p2d: "تجربہ کار حفاظ کی نگرانی میں روزانہ دہرائی کے ساتھ قرآن کا حفظ۔",
      p3t: "درسِ نظامی", p3d: "ابتدائیہ سے عالمیہ تک آٹھ سالہ روایتی کورس۔",
      p4t: "تجوید", p4d: "تلاوت کے قواعد اور قراءات، تلاوت بہتر بنانے والے طلبہ کے لیے۔",
      p5t: "عربی زبان", p5d: "نحو، صرف اور بول چال کی عربی مرحلہ وار۔",
      p6t: "عصری مضامین", p6d: "دینی علوم کے ساتھ اردو، انگریزی، ریاضی اور کمپیوٹر۔",
      "adm.title": "داخلہ کیسے لیں",
      "adm.s1t": "درخواست بھریں", "adm.s1d": "طالب علم اور سرپرست کی معلومات کے ساتھ داخلہ فارم مکمل کریں۔",
      "adm.s2t": "کاغذات جمع کرائیں", "adm.s2d": "ب فارم یا شناختی کارڈ، دو تصاویر اور سابقہ سند اگر ہو۔",
      "adm.s3t": "اساتذہ سے ملاقات", "adm.s3d": "مختصر انٹرویو اور امتحان سے درست درجہ طے ہوتا ہے۔",
      "adm.s4t": "داخلہ نمبر حاصل کریں", "adm.s4d": "منظوری کے بعد رجسٹریشن نمبر اور طالب علم کارڈ ملتا ہے۔",
      "adm.cardT": "داخلے جاری ہیں", "adm.cardD": "سیشن 2026–2027 کے لیے درخواستیں مہینے کے آخر تک وصول کی جاتی ہیں۔",
      "adm.l1": "طلبہ اور طالبات کے الگ شعبے", "adm.l2": "روزانہ آنے والے اور رہائشی طلبہ", "adm.l3": "مستحق طلبہ کے لیے فیس میں معاونت",
      "adm.cta": "داخلہ فارم طلب کریں",
      "notice.title": "اعلانات اور ڈیٹ شیٹ", "notice.latest": "تازہ اعلانات",
      "ds.title": "سالانہ امتحان کی ڈیٹ شیٹ", "ds.cls": "درجہ: درسِ نظامی، سال اول", "ds.print": "پرنٹ",
      "ds.date": "تاریخ", "ds.subject": "مضمون", "ds.time": "وقت", "ds.hall": "ہال",
      "sub.quran": "قرآن", "sub.hadith": "حدیث", "sub.fiqh": "فقہ", "sub.nahw": "نحو", "sub.urdu": "اردو", "sub.math": "ریاضی",
      "res.title": "اپنا نتیجہ دیکھیں", "res.sub": "رول سلپ پر درج رول نمبر اور رجسٹریشن نمبر لکھیں۔",
      "res.roll": "رول نمبر", "res.reg": "رجسٹریشن نمبر", "res.btn": "نتیجہ دکھائیں",
      "res.hint": "صرف نمونہ: 2026-001 اور REG-2026-0001 لکھ کر دیکھیں۔ اصل نتائج کے لیے ڈیٹا بیس منسلک کرنا ہوگا۔",
      "res.notfound": "نتیجہ نہیں ملا۔ دونوں نمبر چیک کر کے دوبارہ کوشش کریں۔",
      "res.student": "طالب علم", "res.father": "ولدیت", "res.class": "درجہ", "res.total": "کل", "res.percent": "فیصد",
      "res.grade": "درجہ بندی", "res.status": "حیثیت", "res.pass": "کامیاب", "res.fail": "ناکام", "res.marks": "حاصل کردہ نمبر", "res.out": "کل نمبر", "res.print": "نتیجہ پرنٹ کریں",
      "gal.preview": "گیلری تصویر", "gal.close": "تصویر بند کریں", "gal.eyebrow": "ہمارا مدرسہ", "gal.all": "تمام مناظر", "gal.fQuran": "قرآن کی تعلیم", "gal.fCampus": "مدرسہ", "gal.fEvents": "تقریبات",
      "gal.title": "مدرسے کی زندگی", "gal.sub": "تعلیم، مدرسے کی روزمرہ زندگی اور خوشگوار لمحات کی جھلکیاں۔",
      "gal.g1": "قرآن کلاس", "gal.g2": "عمارت", "gal.g3": "سالانہ تقریب", "gal.g4": "امتحان ہال", "gal.g5": "طلبہ", "gal.g6": "تکمیلِ حفظ",
      "con.title": "رابطہ کریں", "con.addrT": "پتہ", "con.addr": "گرگری، پاکستان", "con.phoneT": "فون اور واٹس ایپ",
      "con.emailT": "ای میل", "con.phonePending": "رابطہ نمبر شامل ہونا باقی ہے", "con.emailPending": "ای میل شامل ہونا باقی ہے",
      "con.hoursT": "دفتری اوقات", "con.hours": "ہفتہ تا جمعرات، صبح 8 بجے سے دوپہر 2 بجے", "con.map": "یہاں نقشہ آئے گا (گوگل میپ)",
      "con.formT": "پیغام بھیجیں", "con.name": "آپ کا نام", "con.phone": "موبائل نمبر", "con.topic": "موضوع", "con.msg": "پیغام", "con.send": "پیغام بھیجیں",
      "con.t1": "داخلہ", "con.t2": "فیس", "con.t3": "نتائج", "con.t4": "دیگر",
      "con.ok": "یہ صرف نمونہ ہے؛ آپ کا پیغام نہیں بھیجا گیا۔ پیغام وصول کرنے کے لیے فارم سروس جوڑیں۔",
      "con.err": "براہ کرم نام، موبائل نمبر اور پیغام لکھیں۔",
      "foot.about": "قرآن، کردار اور علم، ایک ہی جگہ۔", "foot.links": "اہم روابط", "foot.portals": "پورٹلز",
      "foot.copy": "© 2026 مدرسہ دارِ ارقم گرگری۔ جملہ حقوق محفوظ ہیں۔",
      "hub.eyebrow": "معلومات و رہنمائی", "hub.title": "تعلیمی و رہنمائی مرکز",
      "hub.sub": "داخلہ، امتحان، نتائج اور مستند دینی مطالعے کے اہم روابط ایک جگہ تلاش کریں۔",
      "hub.searchLabel": "معلومات تلاش کریں", "hub.searchPlaceholder": "مثلاً داخلہ، نتیجہ، کتابیں",
      "hub.admission": "داخلہ رہنمائی", "hub.admissionD": "شرائط اور درخواست کا طریقہ",
      "hub.exam": "امتحان و اعلانات", "hub.examD": "تازہ نوٹس اور ڈیٹ شیٹ",
      "hub.result": "نتائج", "hub.resultD": "رول نمبر کے ذریعے نتیجہ دیکھیں",
      "hub.programs": "تعلیمی شعبے", "hub.programsD": "کورسز اور نصاب کا تعارف",
      "hub.teachers": "ہمارے اساتذہ", "hub.teachersD": "تدریسی شعبے اور طلبہ کی رہنمائی",
      "hub.questions": "سوال و جواب اور دارالافتاء", "hub.questionsD": "جامعہ بنوری ٹاؤن کی عوامی علمی رہنمائی",
      "hub.library": "کتب و علمی مضامین", "hub.libraryD": "مستند مطالعے کے لیے اشاعت و کتب کا گوشہ",
      "hub.wifaq": "وفاق المدارس لاگ اِن", "hub.wifaqD": "مدارس کے لیے وفاق کا آفیشل پورٹل",
      "hub.external": "بیرونی ویب سائٹ", "hub.empty": "اس تلاش سے متعلق کوئی معلومات نہیں ملیں۔"
    }
  };

  const BS_LTR = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  const BS_RTL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";

  let lang = "ur";
  const t = key => (I18N[lang][key] !== undefined ? I18N[lang][key] : I18N.en[key] || key);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Rendering helpers ---------- */
  function renderNotices() {
    $("#noticeList").innerHTML = NOTICES.map(n => `
      <div class="notice-item">
        <div class="date-chip"><b>${n.d}</b><span>${n.m[lang]}</span></div>
        <div><h3>${esc(n.t[lang])}</h3><p>${esc(n.b[lang])}</p></div>
      </div>`).join("");
  }

  function renderDateSheet() {
    const locale = lang === "ur" ? "ur-PK" : "en-GB";
    $("#dateSheetBody").innerHTML = DATE_SHEET.map(r => {
      const d = new Date(r.date + "T00:00:00");
      const label = d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      return `<tr><td>${esc(label)}</td><td><strong>${esc(t("sub." + r.sub))}</strong></td><td><bdi dir="ltr">${esc(r.time)}</bdi></td><td><bdi dir="ltr">${esc(r.hall)}</bdi></td></tr>`;
    }).join("");
  }

  let currentResult = null;
  function renderResult() {
    const out = $("#resultOut");
    if (!currentResult) return;
    const r = currentResult;
    const total = r.marks.reduce((a, m) => a + m.total, 0);
    const got = r.marks.reduce((a, m) => a + m.got, 0);
    const pct = (got / total) * 100;
    const g = gradeFor(pct);
    const subjectFail = r.marks.some(m => m.got < m.total * 0.4);
    const pass = !g.fail && !subjectFail;
    out.innerHTML = `
      <div class="result-card print-area">
        <div class="head d-flex justify-content-between flex-wrap gap-2">
          <div><h3 class="h5 mb-0">${esc(r.exam[lang])}</h3><small class="text-muted">${esc(t("res.class"))}: ${esc(r.cls[lang])}</small></div>
          <span class="badge ${pass ? "badge-pass" : "badge-fail"} align-self-start fs-6">${esc(pass ? t("res.pass") : t("res.fail"))}</span>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-sm-6"><small class="text-muted d-block">${esc(t("res.student"))}</small><strong>${esc(r.name[lang])}</strong></div>
          <div class="col-sm-6"><small class="text-muted d-block">${esc(t("res.father"))}</small><strong>${esc(r.father[lang])}</strong></div>
          <div class="col-sm-6"><small class="text-muted d-block">${esc(t("res.roll"))}</small><bdi dir="ltr">${esc(r.roll)}</bdi></div>
          <div class="col-sm-6"><small class="text-muted d-block">${esc(t("res.reg"))}</small><bdi dir="ltr">${esc(r.reg)}</bdi></div>
        </div>
        <div class="table-responsive">
          <table class="table table-sm align-middle">
            <thead><tr><th>${esc(t("ds.subject"))}</th><th>${esc(t("res.out"))}</th><th>${esc(t("res.marks"))}</th><th>${esc(t("res.grade"))}</th></tr></thead>
            <tbody>${r.marks.map(m => `<tr><td>${esc(t("sub." + m.sub))}</td><td>${m.total}</td><td>${m.got}</td><td>${gradeFor((m.got / m.total) * 100).grade}</td></tr>`).join("")}</tbody>
            <tfoot><tr class="fw-bold"><td>${esc(t("res.total"))}</td><td>${total}</td><td>${got}</td><td>${g.grade}</td></tr></tfoot>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div><strong>${esc(t("res.percent"))}:</strong> <bdi dir="ltr">${pct.toFixed(1)}%</bdi></div>
          <button class="btn btn-outline-green btn-sm no-print" type="button" onclick="window.print()"><i class="bi bi-printer me-1"></i>${esc(t("res.print"))}</button>
        </div>
      </div>`;
  }

  function renderNotFound() {
    $("#resultOut").innerHTML = `<div class="alert alert-warning mb-0">${esc(t("res.notfound"))}</div>`;
  }

  /* ---------- Language ---------- */
  function applyLang(next) {
    lang = next;
    const isUr = lang === "ur";
    document.documentElement.lang = lang;
    document.documentElement.dir = isUr ? "rtl" : "ltr";
    $("#bootstrap-css").href = isUr ? BS_RTL : BS_LTR;

    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    $$("[data-i18n-aria-label]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel)); });
    $$("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    filterResources();
    document.title = t("hero.title");
    $("#langToggle").textContent = isUr ? "English" : "اردو";

    // Nav spacing flips with direction
    const navUl = $("#navMenu .navbar-nav");
    navUl.classList.toggle("ms-auto", !isUr);
    navUl.classList.toggle("me-auto", isUr);

    renderNotices();
    renderDateSheet();
    if (currentResult) renderResult();
    else if ($("#resultOut .alert")) renderNotFound();
    try { localStorage.setItem("madrasa-lang", lang); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- Stat counters ---------- */
  function animateCounters() {
    const els = $$("[data-count]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = el => {
      const target = SITE_STATS[el.dataset.count] || 0;
      if (reduce) { el.textContent = target; return; }
      const start = performance.now(), dur = 1200;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  }

  function filterResources() {
    const input = $("#resourceSearch");
    if (!input) return;
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    $$("[data-resource-item]").forEach(item => {
      const haystack = `${item.textContent} ${item.dataset.keywords || ""}`.toLocaleLowerCase();
      const match = !query || haystack.includes(query);
      item.hidden = !match;
      if (match) visible++;
    });
    $("#resourceEmpty").hidden = visible !== 0;
  }

  /* ---------- Events ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    let saved = "ur";
    try { saved = localStorage.getItem("madrasa-lang") || "ur"; } catch (e) { /* ignore */ }
    applyLang(saved === "en" ? "en" : "ur");
    animateCounters();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const carousel = $("#heroCarousel");
      carousel.dataset.bsRide = "false";
      bootstrap.Carousel.getOrCreateInstance(carousel).pause();
    }

    $("#langToggle").addEventListener("click", () => applyLang(lang === "en" ? "ur" : "en"));
    $("#resourceSearch").addEventListener("input", filterResources);
    $("#printSheet").addEventListener("click", () => window.print());

    // Result lookup (demo)
    $("#resultForm").addEventListener("submit", e => {
      e.preventDefault();
      const roll = $("#rollNo").value.trim().toUpperCase();
      const reg = $("#regNo").value.trim().toUpperCase();
      if (roll === DEMO_RESULT.roll && reg === DEMO_RESULT.reg) { currentResult = DEMO_RESULT; renderResult(); }
      else { currentResult = null; renderNotFound(); }
    });

    // Contact form (demo)
    $("#contactForm").addEventListener("submit", e => {
      e.preventDefault();
      const ok = $("#cName").value.trim() && $("#cPhone").value.trim() && $("#cMsg").value.trim();
      $("#contactAlert").innerHTML = `<div class="alert ${ok ? "alert-success" : "alert-danger"} mb-0">${esc(ok ? t("con.ok") : t("con.err"))}</div>`;
      if (ok) e.target.reset();
    });

    // Accessible gallery lightbox
    const galleryDialog = document.createElement("dialog");
    galleryDialog.className = "gallery-lightbox";
    galleryDialog.dataset.i18nAriaLabel = "gal.preview";
    galleryDialog.innerHTML = `<button class="gallery-lightbox__close" type="button" data-i18n-aria-label="gal.close">&times;</button><img alt="">`;
    document.body.append(galleryDialog);
    galleryDialog.querySelector(".gallery-lightbox__close").addEventListener("click", () => galleryDialog.close());
    galleryDialog.addEventListener("click", e => { if (e.target === galleryDialog) galleryDialog.close(); });
    $("#gallery .gal-zoom").forEach(button => {
      button.addEventListener("click", () => {
        const photo = button.closest(".gal-item").querySelector(".gal-photo");
        const preview = galleryDialog.querySelector("img");
        preview.src = photo.currentSrc || photo.src;
        preview.alt = photo.alt;
        galleryDialog.showModal();
      });
    });

    // Gallery filter
    $$("#gallery .gal-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        $$("#gallery .gal-filter").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const filter = btn.dataset.filter;
        $$("#galGrid .gal-item").forEach(item => {
          item.classList.toggle("hidden", filter !== "all" && item.dataset.cat !== filter);
        });
      });
    });

    // Close mobile menu after tapping a link
    $$("#navMenu .nav-link").forEach(a => a.addEventListener("click", () => {
      const menu = $("#navMenu");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }));

    // Active nav link on scroll, navbar shadow, back to top
    const sections = $$("main section[id], header[id]");
    const links = $$("#navMenu .nav-link");
    const toTop = $("#toTop");
    const onScroll = () => {
      $("#mainNav").classList.toggle("scrolled", window.scrollY > 10);
      toTop.classList.toggle("show", window.scrollY > 600);
      let current = "home";
      sections.forEach(s => { if (window.scrollY + 120 >= s.offsetTop) current = s.id; });
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  });
})();
