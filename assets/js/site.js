/* ==========================================================================
   Journal of K-Geo — script du site
   1. Bascule de langue FR / EN (memorisee dans le navigateur)
   2. Mise en evidence de l'onglet de navigation courant
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "kgeo-lang";
  var DEFAULT_LANG = "fr";

  /* ---- 1. Langue -------------------------------------------------------- */

  function applyLang(lang) {
    if (lang !== "fr" && lang !== "en") { lang = DEFAULT_LANG; }
    document.body.classList.remove("lang-fr", "lang-en");
    document.body.classList.add("lang-" + lang);
    document.documentElement.setAttribute("lang", lang);
    var buttons = document.querySelectorAll(".langswitch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].dataset.setlang === lang ? "true" : "false");
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* mode prive */ }
  }

  function storedLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { return saved; }
    } catch (e) { /* mode prive */ }
    // A defaut : anglais si le navigateur n'est pas francophone
    var nav = (navigator.language || "fr").toLowerCase();
    return nav.indexOf("fr") === 0 ? "fr" : "en";
  }

  /* ---- 2. Navigation ---------------------------------------------------- */

  function markCurrentNav() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll("nav.main a");
    for (var i = 0; i < links.length; i++) {
      var target = links[i].getAttribute("href");
      if (target === here) { links[i].classList.add("active"); }
    }
  }

  /* ---- Initialisation --------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(storedLang());
    markCurrentNav();

    var sw = document.querySelector(".langswitch");
    if (sw) {
      sw.addEventListener("click", function (ev) {
        var btn = ev.target.closest("button[data-setlang]");
        if (btn) { applyLang(btn.dataset.setlang); }
      });
    }

    // Annee courante dans le pied de page
    var y = document.querySelectorAll(".js-year");
    for (var i = 0; i < y.length; i++) { y[i].textContent = new Date().getFullYear(); }
  });
})();
