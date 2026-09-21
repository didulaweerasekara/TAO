/* TAO — shared behaviour. No dependencies, no build step. */
(function () {
  "use strict";

  var cfg = window.TAO || {};
  var script = document.currentScript || document.querySelector("script[data-root]");
  var root = (script && script.getAttribute("data-root")) || "";
  var page = document.body.getAttribute("data-page") || "";

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4V9.75Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15V9l5.2 3-5.2 3Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.75 3h3.1l-6.77 7.74L22 21h-6.24l-4.89-6.4L5.27 21h-3.1l7.24-8.28L2 3h6.4l4.42 5.85L17.75 3Zm-1.09 16.15h1.72L7.4 4.75H5.55l11.11 14.4Z"/></svg>'
  };
  var SOCIAL_LABELS = { linkedin: "LinkedIn", instagram: "Instagram", youtube: "YouTube", x: "X (Twitter)" };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function socialLinks() {
    var s = cfg.social || {};
    return Object.keys(ICONS).filter(function (k) { return s[k]; }).map(function (k) {
      return '<a href="' + esc(s[k]) + '" target="_blank" rel="noopener noreferrer" aria-label="' + SOCIAL_LABELS[k] + '">' + ICONS[k] + "</a>";
    }).join("");
  }

  /* ---------- Header & footer ---------- */
  var NAV = [
    ["home", "index.html", "Home"],
    ["about", "about.html", "About"],
    ["team", "team.html", "Team"],
    ["testimonials", "testimonials.html", "Testimonials"],
    ["blog", "blog.html", "Blog"],
    ["contact", "contact.html", "Contact"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    var items = NAV.map(function (n) {
      var cur = n[0] === page ? ' aria-current="page"' : "";
      var cls = n[0] === "contact" ? ' class="btn btn--brass"' : "";
      return '<li><a href="' + root + n[1] + '"' + cls + cur + ">" + n[2] + "</a></li>";
    }).join("");
    header.innerHTML =
      '<div class="site-header"><div class="container site-header__inner">' +
      '<a class="brand" href="' + root + 'index.html" aria-label="TAO — home"><img src="' + root + 'assets/img/mark-white.png" alt="TAO" width="69" height="28"></a>' +
      '<nav class="nav" id="primary-nav" aria-label="Primary"><ul>' + items + "</ul></nav>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span aria-hidden="true"></span><span aria-hidden="true"></span><span class="sr-only">Menu</span></button>' +
      "</div></div>";

    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".nav");
    var setNav = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    var addr = (cfg.address || []).map(esc).join("<br>");
    var soc = socialLinks();
    footer.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer__top">' +
      '<div class="footer__brand"><img src="' + root + 'assets/img/logo-white.png" alt="TAO — Thrive in life &amp; career" width="520" height="300" loading="lazy">' +
      "<p>Workshops and an institution for professionals who want to thrive in life and in career.</p></div>" +
      "<div><h4>Explore</h4><ul>" +
      NAV.map(function (n) { return '<li><a href="' + root + n[1] + '">' + n[2] + "</a></li>"; }).join("") +
      "</ul></div>" +
      "<div><h4>Contact</h4><ul>" +
      (cfg.email ? '<li><a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a></li>" : "") +
      (cfg.phone ? '<li><a href="tel:' + esc(cfg.phone.replace(/[^+\d]/g, "")) + '">' + esc(cfg.phone) + "</a></li>" : "") +
      (addr ? "<li><address>" + addr + "</address></li>" : "") +
      "</ul></div>" +
      "<div><h4>Follow</h4>" + (soc ? '<div class="social">' + soc + "</div>" : '<p class="muted">Social links coming soon.</p>') + "</div>" +
      "</div>" +
      '<div class="footer__bottom"><span>© ' + new Date().getFullYear() + " TAO. All rights reserved.</span>" +
      '<a href="#top">Back to top ↑</a></div></div></footer>';
  }

  /* ---------- Fill contact details anywhere on a page ---------- */
  document.querySelectorAll("[data-tao]").forEach(function (el) {
    var key = el.getAttribute("data-tao");
    if (key === "email" && cfg.email) { el.textContent = cfg.email; el.setAttribute("href", "mailto:" + cfg.email); }
    else if (key === "phone" && cfg.phone) { el.textContent = cfg.phone; el.setAttribute("href", "tel:" + cfg.phone.replace(/[^+\d]/g, "")); }
    else if (key === "address" && cfg.address) { el.innerHTML = cfg.address.map(esc).join("<br>"); }
    else if (key === "hours" && cfg.hours) { el.textContent = cfg.hours; }
    else if (key === "social") {
      var html = socialLinks();
      if (html) el.innerHTML = html; else el.closest("[data-tao-wrap]") && (el.closest("[data-tao-wrap]").hidden = true);
    }
  });

  /* ---------- Images that may not exist yet: remove so the placeholder shows ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    var drop = function () { img.remove(); };
    img.addEventListener("error", drop, { once: true });
    if (img.complete && img.naturalWidth === 0) drop();
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Team profile dialog ---------- */
  var members = document.querySelectorAll(".member[data-profile]");
  if (members.length && typeof HTMLDialogElement === "function") {
    var dlg = document.createElement("dialog");
    dlg.className = "profile";
    dlg.setAttribute("aria-label", "Team member profile");
    document.body.appendChild(dlg);

    var openProfile = function (m) {
      var photo = m.querySelector(".photo");
      var full = m.querySelector(".member__full");
      var name = m.querySelector("h3").textContent;
      var role = m.querySelector(".member__role").textContent;
      dlg.innerHTML =
        '<button class="profile__close" type="button" aria-label="Close profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg></button>' +
        '<div class="profile__inner"><div class="profile__photo">' + (photo ? photo.outerHTML : "") + "</div>" +
        '<div class="profile__content"><p class="member__role">' + esc(role) + "</p><h3>" + esc(name) + "</h3>" + (full ? full.innerHTML : "") + "</div></div>";
      dlg.querySelectorAll("img[data-fallback]").forEach(function (img) { img.addEventListener("error", function () { img.remove(); }, { once: true }); });
      dlg.showModal();
      dlg.scrollTop = 0;
      history.replaceState(null, "", "#" + m.id);
    };

    members.forEach(function (m) {
      var btn = m.querySelector("[data-open-profile]");
      if (btn) btn.addEventListener("click", function () { openProfile(m); });
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.closest(".profile__close")) dlg.close();
    });
    dlg.addEventListener("close", function () { history.replaceState(null, "", location.pathname + location.search); });

    var fromHash = function () {
      var m = location.hash && document.querySelector('.member[data-profile]' + location.hash.replace(/[^#\w-]/g, ""));
      if (m && !dlg.open) openProfile(m);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
  }

  /* ---------- Blog filters ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    var cards = document.querySelectorAll(".post-card[data-category]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        cards.forEach(function (card) {
          card.hidden = !(f === "all" || card.getAttribute("data-category") === f);
        });
      });
    });
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var topic = new URLSearchParams(location.search).get("topic");
    var select = form.elements["topic"];
    if (topic && select) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].text === topic) { select.selectedIndex = i; break; }
      }
    }
    var show = function (msg, isError) {
      status.hidden = false;
      status.classList.toggle("is-error", !!isError);
      status.textContent = msg;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements["_gotcha"] && form.elements["_gotcha"].value) return; // bot
      var data = new FormData(form);
      var btn = form.querySelector('button[type="submit"]');

      if (cfg.formEndpoint) {
        btn.disabled = true;
        fetch(cfg.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("bad status");
            form.reset();
            show("Thank you — your message has been sent. We will reply within two working days.");
          })
          .catch(function () {
            show("Sorry, something went wrong. Please email us directly at " + (cfg.email || "our address") + ".", true);
          })
          .then(function () { btn.disabled = false; });
      } else {
        var body = [
          "Name: " + data.get("name"),
          "Organisation: " + (data.get("organisation") || "-"),
          "Interested in: " + data.get("topic"),
          "",
          data.get("message")
        ].join("\n");
        window.location.href = "mailto:" + (cfg.email || "") +
          "?subject=" + encodeURIComponent("Enquiry from " + data.get("name")) +
          "&body=" + encodeURIComponent(body);
        show("Your email app should now open with your message ready to send.");
      }
    });
  }
})();
