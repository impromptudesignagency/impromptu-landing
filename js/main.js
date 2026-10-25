// Impromptu Design Agency — minimal JS: reveal on scroll (fail-safe), year
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var revealEls = document.querySelectorAll(".reveal");

  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Safety net: never leave content hidden, whatever happens.
  setTimeout(showAll, 1600);

  if ("IntersectionObserver" in window) {
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } catch (err) {
      showAll();
    }
  } else {
    showAll();
  }

  // Current year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Hamburger menu (mobile)
  var hb = document.getElementById("hamburger");
  var menu = document.getElementById("navMenu");
  if (hb && menu) {
    hb.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      hb.classList.toggle("open", open);
      hb.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        hb.classList.remove("open");
        hb.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
