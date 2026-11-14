(function () {
  "use strict";

  const page = document.body.dataset.page;
  if (!page) return;

  const links = [
    ["home", "index.html", "nav.home"],
    ["about", "about.html", "nav.about"],
    ["programs", "programs.html", "nav.programs"],
    ["guidance", "guidance.html", "nav.resources"],
    ["admissions", "admissions.html", "nav.admissions"],
    ["notices", "notices.html", "nav.notices"],
    ["results", "results.html", "nav.results"],
    ["contact", "contact.html", "nav.contact"]
  ];

  if (page !== "home" && page !== "about") {
    const navLinks = links.map(([id, href, label]) =>
      `<li class="nav-item"><a class="nav-link${page === id ? " active" : ""}" href="${href}" data-page-link="${id}" data-i18n="${label}"${page === id ? ' aria-current="page"' : ""}>${label}</a></li>`
    ).join("");

    document.body.insertAdjacentHTML("afterbegin", `
      <nav class="navbar navbar-expand-xl sticky-top" id="mainNav">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
            <img src="images/logo_gurguri_landscape.png" alt="مدرسہ دارِ ارقم گرگری">
            <span class="brand-text"><span data-i18n="brand">دارِ ارقم گرگری</span><small data-i18n="brandSub">مدرسہ</small></span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="نیویگیشن مینو دکھائیں یا چھپائیں">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav me-auto me-lg-3 mb-2 mb-lg-0">${navLinks}</ul>
            <div class="d-flex gap-2 align-items-center page-nav-actions">
              <button class="btn btn-outline-green btn-sm lang-btn" id="langToggle" type="button" aria-label="زبان تبدیل کریں">English</button>
              <a class="btn btn-green btn-sm" href="results.html"><i class="bi bi-person-circle me-1" aria-hidden="true"></i><span data-i18n="nav.login">پورٹل لاگ اِن</span></a>
            </div>
          </div>
        </div>
      </nav>`);
  }

  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <div class="container">
        <div class="row g-4 footer-grid">
          <div class="col-12 col-sm-6 col-lg-3">
            <span class="logo-chip mb-3"><img src="images/logo.png" alt="لوگو"></span>
            <p class="mt-2" data-i18n="foot.about">قرآن، کردار اور علم، ایک ہی جگہ۔</p>
          </div>
          <div class="col-6 col-lg-3">
            <h4 data-i18n="foot.links">اہم روابط</h4>
            <ul>
              <li><a href="about.html" data-i18n="nav.about">ہمارے بارے میں</a></li>
              <li><a href="programs.html" data-i18n="nav.programs">شعبہ جات</a></li>
              <li><a href="admissions.html" data-i18n="nav.admissions">داخلہ</a></li>
              <li><a href="results.html" data-i18n="nav.results">نتائج</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-3">
            <h4 data-i18n="foot.portals">پورٹلز</h4>
            <ul>
              <li><a href="results.html" data-i18n="login.student">طالب علم کے نتائج</a></li>
              <li><a href="results.html" data-i18n="login.parent">والدین کے نتائج</a></li>
              <li><a href="https://www.wifaqulmadaris.org/Account/MadarisLogin" target="_blank" rel="noopener noreferrer" data-i18n="login.wifaq">وفاق المدارس لاگ اِن</a></li>
            </ul>
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <h4 data-i18n="foot.contact">رابطہ</h4>
            <ul class="footer-contact-list">
              <li><a href="tel:+923349798988"><i class="bi bi-telephone" aria-hidden="true"></i><span dir="ltr" data-i18n="con.phoneValue">00923349798988</span></a></li>
              <li><a href="mailto:qarimuhammadarif988@gmail.com"><i class="bi bi-envelope" aria-hidden="true"></i><span dir="ltr" data-i18n="con.emailValue">qarimuhammadarif988@gmail.com</span></a></li>
            </ul>
          </div>
        </div>
        <div class="copy text-center"><span data-i18n="foot.copy">© 2026 مدرسہ دارِ ارقم گرگری۔ جملہ حقوق محفوظ ہیں۔</span></div>
      </div>
    </footer>
    <button id="toTop" type="button" aria-label="صفحے کے اوپر جائیں"><i class="bi bi-arrow-up"></i></button>`);
})();
