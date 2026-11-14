(function () {
    "use strict";
    const BS_LTR = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    const BS_RTL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";

    const EN = {
        brand: "Dar-e-Arqam Gurguri", brandSub: "Madrasa",
        "nav.home": "Home", "nav.about": "About", "nav.programs": "Programs", "nav.resources": "Guidance", "nav.login": "Portal login",
        "nav.admissions": "Admissions", "nav.notices": "Notices", "nav.results": "Results", "nav.contact": "Contact",
        "ab.title": "Madrasa Dar-e-Arqam Gurguri",
        "ab.lead": "A centre for Quran education, Tajweed and Islamic upbringing, where every student receives individual attention.",
        "ab.f1": "Departments", "ab.f2": "Teachers", "ab.f3v": "None", "ab.f3": "Failing in classes", "ab.f4v": "Islamic studies", "ab.f4": "Our teaching focus",
        "ab.depT": "Our departments", "ab.depS": "Step-by-step learning from Qaida to Complete Tajweed, for every age and level.",
        d1: "Qaida with Tajweed", d2: "Nazra Quran with Tajweed", d3: "Hifz of the Quran with Tajweed",
        d4: "Islamic studies for adults", d5: "Maktab Qurania", d6: "Complete Tajweed",
        "ab.admT": "Administration", "ab.admS": "The people who guide the madrasa's teaching and management.",
        "ab.r1": "Muhtamim (Principal)", "ab.n1": "Maulana Muhammad Umar Haqqani",
        "ab.r2": "Nazim-e-Taleemat (Academic Director)", "ab.n2": "Qari Muhammad Arif Bakhtiyar",
        "ab.polT": "Academic system",
        "ab.p1t": "No failing in classes", "ab.p1d": "The madrasa does not fail students in its classes. Every student moves forward at their own pace.",
        "ab.p2t": "Modern education", "ab.p2d": "Modern (secular) subjects are not currently offered at the madrasa.",
        "ab.ctaT": "Contact us for admission and more information", "ab.cta1": "How to apply", "ab.cta2": "Contact us",
        "foot.about": "Quran, character and knowledge, in one place.",
        "foot.links": "Quick links", "foot.portals": "Portals", "foot.contact": "Contact",
        "login.student": "Student results", "login.parent": "Parent results", "login.wifaq": "Wifaq Madaris login",
        "con.phoneValue": "00923349798988", "con.emailValue": "qarimuhammadarif988@gmail.com",
        "foot.copy": "© 2026 Madrasa Dar-e-Arqam Gurguri. All rights reserved."
    };

    const els = Array.from(document.querySelectorAll("[data-i18n]"));
    const UR = {};
    els.forEach(el => { UR[el.dataset.i18n] = el.textContent; }); // Urdu = the HTML itself

    function apply(lang) {
        const ur = lang === "ur";
        document.documentElement.lang = lang;
        document.documentElement.dir = ur ? "rtl" : "ltr";
        document.getElementById("bootstrap-css").href = ur ? BS_RTL : BS_LTR;
        els.forEach(el => { const k = el.dataset.i18n; el.textContent = ur ? UR[k] : (EN[k] || UR[k]); });
        document.title = (ur ? "ہمارے بارے میں | مدرسہ دارِ ارقم گرگری" : "About | Madrasa Dar-e-Arqam Gurguri");
        const langToggle = document.getElementById("langToggle");
        if (langToggle) langToggle.textContent = ur ? "English" : "اردو";
        const ul = document.querySelector("#navMenu .navbar-nav");
        if (ul) {
            ul.classList.toggle("ms-auto", !ur); ul.classList.toggle("me-auto", ur);
        }
        try { localStorage.setItem("madrasa-lang", lang); } catch (e) { }
    }

    let saved = "ur";
    try { saved = localStorage.getItem("madrasa-lang") || "ur"; } catch (e) { }
    apply(saved === "en" ? "en" : "ur");

    document.getElementById("langToggle").addEventListener("click", () =>
        apply(document.documentElement.lang === "ur" ? "en" : "ur"));
    const mainNav = document.getElementById("mainNav");
    const toTop = document.getElementById("toTop");
    const updateScrollState = () => {
        if (mainNav) mainNav.classList.toggle("scrolled", window.scrollY > 10);
        if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();