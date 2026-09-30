/* ==========================================================================
   TAO: shared behaviour: header, footer, content rendering, forms, motion.
   No dependencies, no build step. Content comes from content.js; settings
   from config.js.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.TAO || {};
  var C = window.TAO_CONTENT || {};
  var script = document.currentScript || document.querySelector("script[data-root]");
  var root = (script && script.getAttribute("data-root")) || "";
  var page = document.body.getAttribute("data-page") || "";
  var params = new URLSearchParams(location.search);

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(list, id) { return (list || []).filter(function (x) { return x.id === id; })[0]; }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* Responsive <img> from the photo registry in content.js */
  function photo(key, sizes, opts) {
    var p = (C.photos || {})[key];
    if (!p) return "";
    opts = opts || {};
    var base = root + "assets/img/photos/" + p.file + "-";
    var srcset = p.widths.map(function (w) { return base + w + ".jpg " + w + "w"; }).join(", ");
    return '<img src="' + base + p.widths[0] + '.jpg" srcset="' + srcset + '" sizes="' + (sizes || "100vw") +
      '" width="' + p.w + '" height="' + p.h + '" alt="' + esc(opts.alt != null ? opts.alt : p.alt) + '"' +
      (opts.eager ? "" : ' loading="lazy"') + ' decoding="async">';
  }
  function facName(id) { var f = byId(C.facilitators, id); return f ? f.name : ""; }
  function facNames(ids) { return (ids || []).map(facName).filter(Boolean); }
  function progHref(p) { return root + "programmes.html#" + p.id; }
  function enquireHref(topic, type) {
    return root + "contact.html?" + (type ? "type=" + type + "&" : "") + "topic=" + encodeURIComponent(topic) + "#enquiry";
  }

  /* ---------- Header ---------- */
  var NAV = [
    ["about", "about.html", "About"],
    ["programmes", "programmes.html", "Programmes"],
    ["events", "events.html", "Events"],
    ["facilitators", "facilitators.html", "Facilitators"],
    ["organisations", "organisations.html", "For Organisations"],
    ["insights", "insights.html", "Insights"],
    ["newsletter", "newsletter.html", "Newsletter"],
    ["contact", "contact.html", "Contact"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    var items = NAV.map(function (n) {
      return '<li><a href="' + root + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : "") + ">" + n[2] + "</a></li>";
    }).join("");
    header.innerHTML =
      '<header class="site-header"><div class="container site-header__inner">' +
      '<a class="brand" href="' + root + 'index.html"><img src="' + root + 'assets/img/mark-white.png" alt="TAO" width="69" height="28"><span class="brand__tag">Thrive in Life<br>&amp; Career</span></a>' +
      '<nav class="nav" id="primary-nav" aria-label="Primary"><ul>' + items +
      '<li><a class="btn btn--primary" href="' + root + 'contact.html#enquiry">Work with TAO</a></li></ul></nav>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span aria-hidden="true"></span><span aria-hidden="true"></span><span class="sr-only">Menu</span></button>' +
      "</div></header>";

    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".nav");
    var setNav = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
      if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
    };
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1180) setNav(false); });
  }

  /* ---------- Footer ---------- */
  var SOCIAL = {
    linkedin: ["LinkedIn", '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4V9.75Z"/>'],
    instagram: ["Instagram", '<path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>'],
    facebook: ["Facebook", '<path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.97v2.23H8v3h2.5V21h3Z"/>'],
    youtube: ["YouTube", '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15V9l5.2 3-5.2 3Z"/>']
  };
  function socialHtml() {
    var s = cfg.social || {};
    var out = Object.keys(SOCIAL).filter(function (k) { return s[k]; }).map(function (k) {
      return '<a href="' + esc(s[k]) + '" target="_blank" rel="noopener noreferrer" aria-label="TAO on ' + SOCIAL[k][0] + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + SOCIAL[k][1] + "</svg></a>";
    }).join("");
    return out ? '<div class="social">' + out + "</div>" : "";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    var progLinks = (C.programmes || []).filter(function (p) { return p.featured; }).slice(0, 5).map(function (p) {
      return '<li><a href="' + progHref(p) + '">' + esc(p.title) + "</a></li>";
    }).join("");
    var facLinks = (C.facilitators || []).map(function (f) {
      return '<li><a href="' + root + "facilitators.html#" + f.id + '">' + esc(f.name) + "</a></li>";
    }).join("");
    var contactItems = "";
    if (cfg.email) contactItems += '<li><a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a></li>";
    if (cfg.phone) contactItems += '<li><a href="tel:' + esc(cfg.phone.replace(/[^+\d]/g, "")) + '">' + esc(cfg.phone) + "</a></li>";
    if (cfg.location) contactItems += "<li><span>" + esc(cfg.location) + "</span></li>";
    contactItems += '<li><a href="' + root + 'contact.html#enquiry">Send an enquiry</a></li>' +
      '<li><a href="' + root + 'contact.html?type=organisation#enquiry">Discuss a programme</a></li>';

    footer.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer__top">' +
      '<div class="footer__brand"><img src="' + root + 'assets/img/mark-white.png" alt="TAO" width="69" height="28" loading="lazy">' +
      '<p class="tag">Thrive in Life &amp; Career</p>' +
      "<p>Practical development in communication, leadership and negotiation for professionals, teams and organisations.</p>" +
      '<a class="btn btn--ghost btn--sm" href="' + root + 'newsletter.html#subscribe">Join the Newsletter</a>' + socialHtml() + "</div>" +
      '<div><h4>Explore</h4><ul>' +
      '<li><a href="' + root + 'about.html">About TAO</a></li>' +
      '<li><a href="' + root + 'programmes.html">Programmes</a></li>' +
      '<li><a href="' + root + 'events.html">Events</a></li>' +
      '<li><a href="' + root + 'organisations.html">For Organisations</a></li>' +
      '<li><a href="' + root + 'insights.html">Insights</a></li>' +
      '<li><a href="' + root + 'newsletter.html">Newsletter</a></li></ul></div>' +
      '<div><h4>Programmes</h4><ul>' + progLinks + '<li><a href="' + root + 'programmes.html">All programmes</a></li></ul></div>' +
      '<div><h4>Facilitators</h4><ul>' + facLinks + '</ul><h4 style="margin-top:32px">Contact</h4><ul>' + contactItems + "</ul></div>" +
      "</div>" +
      '<p class="footer__principle">Insight is useful only when it becomes behaviour.</p>' +
      '<div class="footer__bottom"><span>© ' + new Date().getFullYear() + " TAO: Thrive in Life &amp; Career</span>" +
      '<nav aria-label="Legal"><a href="' + root + 'privacy.html">Privacy Policy</a><a href="' + root + 'terms.html">Terms of Use</a><a href="#top">Back to top ↑</a></nav></div>' +
      "</div></footer>";
  }

  /* ---------- Renderers ---------- */
  var R = {};

  R.areas = function (el) {
    el.innerHTML = (C.areas || []).map(function (a, i) {
      return '<a class="area reveal" style="--d:' + (i % 2) * 0.06 + 's" href="' + root + "programmes.html?area=" + a.id + '#catalogue">' +
        '<span class="area__num">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(a.title) + "</h3>" + ARROW +
        "<p>" + esc(a.summary) + "</p></a>";
    }).join("");
  };

  function progCard(p, i) {
    var area = byId(C.areas, p.area);
    return '<a class="prog-card reveal" style="--d:' + (i % 3) * 0.08 + 's" href="' + progHref(p) + '">' +
      '<div class="prog-card__meta"><span>' + (p.audience === "organisation" ? "For organisations" : "For individuals") + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<div class="prog-card__foot"><span>' + esc(area ? area.title : "") + "</span>" + ARROW + "</div></a>";
  }
  R["featured-programmes"] = function (el) {
    var limit = +el.getAttribute("data-limit") || 3;
    el.innerHTML = (C.programmes || []).filter(function (p) { return p.featured; }).slice(0, limit).map(progCard).join("");
  };
  R["programmes-by-facilitator"] = function (el) {
    var id = el.getAttribute("data-facilitator");
    el.innerHTML = (C.programmes || []).filter(function (p) { return (p.facilitators || []).indexOf(id) > -1; }).map(function (p) {
      return '<a href="' + progHref(p) + '">' + esc(p.title) + "</a>";
    }).join("");
  };

  function programmeDetail(p) {
    var fac = facNames(p.facilitators);
    return '<details class="programme" id="' + p.id + '" data-audience="' + p.audience + '" data-area="' + p.area + '">' +
      "<summary><h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + '</p><span class="programme__toggle" aria-hidden="true"></span></summary>' +
      '<div class="programme__body">' +
      '<dl class="programme__facts">' +
      '<div class="span-2"><dt>Who it is for</dt><dd>' + esc(p.forWhom) + "</dd></div>" +
      "<div><dt>Format</dt><dd>" + esc(p.format) + "</dd></div>" +
      "<div><dt>Duration</dt><dd>" + esc(p.duration) + "</dd></div>" +
      (fac.length ? '<div class="span-2"><dt>Facilitator' + (fac.length > 1 ? "s" : "") + "</dt><dd>" +
        (p.facilitators || []).map(function (id) { return '<a href="' + root + "facilitators.html#" + id + '">' + esc(facName(id)) + "</a>"; }).join(" · ") + "</dd></div>" : "") +
      "</dl>" +
      '<div><h4 class="eyebrow eyebrow--plain">Key outcomes</h4><ul class="outcomes">' +
      (p.outcomes || []).map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul>" +
      '<div class="btn-row" style="margin-top:28px"><a class="btn btn--ink" href="' + enquireHref(p.title, p.audience === "organisation" ? "organisation" : "individual") + '">Enquire about this programme ' + ARROW + "</a></div></div>" +
      "</div></details>";
  }
  R.catalogue = function (el) {
    var groups = [
      ["individual", "For individuals", "Programmes for professionals developing their own capability. Join a public workshop or ask about one-to-one and small-group options."],
      ["organisation", "For organisations", "Programmes designed with and for your organisation, built around your people, your context and your own cases."]
    ];
    var areaChips = '<button class="chip" type="button" data-area="all" aria-pressed="true">All areas</button>' +
      (C.areas || []).map(function (a) { return '<button class="chip" type="button" data-area="' + a.id + '" aria-pressed="false">' + esc(a.title) + "</button>"; }).join("");
    el.innerHTML =
      '<div class="filters" role="group" aria-label="Filter programmes by development area">' + areaChips + "</div>" +
      groups.map(function (g) {
        var list = (C.programmes || []).filter(function (p) { return p.audience === g[0]; });
        return '<section class="catalogue-group" id="' + g[0] + '" aria-labelledby="h-' + g[0] + '">' +
          '<div class="catalogue-group__head"><h2 id="h-' + g[0] + '">' + g[1] + '</h2><p class="muted">' + g[2] + "</p></div>" +
          list.map(programmeDetail).join("") + "</section>";
      }).join("") +
      '<p class="muted" data-empty hidden>No programmes in this area yet. <a href="' + root + 'contact.html#enquiry">Tell us what you are looking for.</a></p>';

    var chips = $all(".chip[data-area]", el);
    var apply = function (area) {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-area") === area)); });
      var shown = 0;
      $all(".catalogue-group", el).forEach(function (g) {
        var n = 0;
        $all(".programme", g).forEach(function (p) {
          var on = area === "all" || p.getAttribute("data-area") === area;
          p.hidden = !on; if (on) n++;
        });
        g.hidden = n === 0; shown += n;
      });
      el.querySelector("[data-empty]").hidden = shown > 0;
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.getAttribute("data-area")); }); });
    var initial = params.get("area");
    if (initial && byId(C.areas, initial)) apply(initial);

    var openFromHash = function () {
      var id = location.hash.slice(1);
      var d = id && document.getElementById(id);
      if (d && d.classList.contains("programme")) {
        apply("all"); d.open = true;
        setTimeout(function () { d.scrollIntoView({ block: "start" }); }, 30);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  };

  function eventCard(ev) {
    var upcoming = ev.status === "upcoming";
    var fac = facNames(ev.facilitators);
    var when = ev.dateLabel || (upcoming ? "Date to be confirmed" : "Recently held");
    return '<article class="event reveal">' +
      '<div class="event__media">' + photo(ev.photo, "(max-width: 860px) 100vw, 45vw") +
      '<span class="event__status' + (upcoming ? " event__status--upcoming" : "") + '">' + (upcoming ? "Upcoming" : "Recent workshop") + "</span></div>" +
      '<div class="event__body">' +
      '<div class="event__title"><h3>' + esc(ev.title) + "</h3>" + (ev.subtitle ? "<p>" + esc(ev.subtitle) + "</p>" : "") + "</div>" +
      '<dl class="event__facts">' +
      "<div><dt>Date</dt><dd>" + esc(when) + (ev.time ? "<br>" + esc(ev.time) : "") + "</dd></div>" +
      (ev.venue ? "<div><dt>Venue</dt><dd>" + esc(ev.venue) + "</dd></div>" : "") +
      (fac.length ? "<div><dt>Facilitators</dt><dd>" + fac.map(esc).join("<br>") + "</dd></div>" : "") +
      "</dl>" +
      (ev.programmeLabel ? '<p class="event__desc"><strong>' + esc(ev.programmeLabel) + "</strong></p>" : "") +
      '<p class="event__desc">' + esc(ev.description) + "</p>" +
      ((ev.experience || []).length ? '<div class="event__exp"><h4>What participants experience' + (upcoming ? "" : "d") + '</h4><ul class="outcomes">' +
        ev.experience.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
      (ev.cta ? '<div class="btn-row"><a class="btn ' + (upcoming ? "btn--primary" : "btn--ink") + '" href="' + root + esc(ev.cta.href) + '">' + esc(ev.cta.label) + " " + ARROW + "</a></div>" : "") +
      "</div></article>";
  }
  function sortedEvents(status) {
    return (C.events || []).filter(function (e) { return e.status === status; }).sort(function (a, b) {
      return status === "upcoming" ? (a.date || "9999").localeCompare(b.date || "9999") : (b.date || "").localeCompare(a.date || "");
    });
  }
  var EMPTY_UPCOMING = function () {
    return '<div class="event-empty reveal"><div><h3>The next public dates are being finalised.</h3>' +
      "<p>Register your interest and we will let you know as soon as places open. Every programme can also be run privately for your team.</p></div>" +
      '<div class="btn-row"><a class="btn btn--ink" href="' + root + 'contact.html?type=workshop&amp;topic=Upcoming%20workshops#enquiry">Register interest ' + ARROW + "</a></div></div>";
  };
  R["events-upcoming"] = function (el) {
    var list = sortedEvents("upcoming");
    el.innerHTML = list.length ? '<div class="event-list">' + list.map(eventCard).join("") + "</div>" : EMPTY_UPCOMING();
  };
  R["events-past"] = function (el) {
    var list = sortedEvents("past");
    if (!list.length) { var s = el.closest("[data-section]"); if (s) s.hidden = true; return; }
    el.innerHTML = '<div class="event-list">' + list.map(function (ev) {
      var gal = (ev.gallery || []).length ? '<div class="gallery reveal" style="margin-top:clamp(16px,2vw,24px)">' + ev.gallery.map(function (k, i) {
        return "<figure>" + photo(k, i === 0 ? "(max-width: 860px) 100vw, 66vw" : "(max-width: 860px) 50vw, 33vw") + "</figure>";
      }).join("") + "</div>" : "";
      return "<div>" + eventCard(ev) + gal + "</div>";
    }).join("") + "</div>";
  };
  R["events-home"] = function (el) {
    var up = sortedEvents("upcoming");
    if (up.length) { el.innerHTML = eventCard(up[0]); return; }
    var past = sortedEvents("past");
    el.innerHTML = (past.length ? eventCard(past[0]) : "") + '<div style="margin-top:20px">' + EMPTY_UPCOMING() + "</div>";
  };

  R["facilitator-cards"] = function (el) {
    el.innerHTML = (C.facilitators || []).map(function (f, i) {
      return '<article class="fac reveal" style="--d:' + i * 0.1 + 's">' +
        '<a class="fac__photo" href="' + root + "facilitators.html#" + f.id + '" aria-label="' + esc(f.name) + ': full profile">' + photo(f.photo, "(max-width: 860px) 100vw, 45vw", { alt: f.name }) +
        '<span class="fac__discipline">' + esc(f.discipline) + "</span></a>" +
        "<div><h3>" + esc(f.name) + '</h3><p class="fac__role">' + esc(f.role) + "</p></div>" +
        '<ul class="fac__focus" aria-label="Focus areas">' + f.focus.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        '<p class="fac__summary">' + esc(f.summary) + "</p>" +
        '<a class="link-arrow" href="' + root + "facilitators.html#" + f.id + '">Read ' + esc(f.name.split(" ")[0]) + "’s profile " + ARROW + "</a></article>";
    }).join("");
  };

  R["facilitator-profiles"] = function (el) {
    el.innerHTML = (C.facilitators || []).map(function (f, i) {
      var progs = (C.programmes || []).filter(function (p) { return (p.facilitators || [])[0] === f.id; });
      return '<article class="profile' + (i % 2 ? " profile--flip" : "") + '" id="' + f.id + '" aria-labelledby="n-' + f.id + '">' +
        '<div class="profile__media reveal">' +
        '<div class="fac__photo">' + photo(f.photo, "(max-width: 1080px) 50vw, 40vw", { alt: f.name, eager: i === 0 }) + '<span class="fac__discipline">' + esc(f.discipline) + "</span></div>" +
        (f.secondPhoto ? '<div class="profile__second">' + photo(f.secondPhoto, "(max-width: 1080px) 50vw, 40vw") + "</div>" : "") +
        "</div>" +
        '<div class="profile__content">' +
        '<div class="profile__head reveal"><h2 id="n-' + f.id + '">' + esc(f.name) + '</h2><p class="profile__role">' + esc(f.role) + "</p>" +
        '<ul class="fac__focus" aria-label="Focus areas">' + f.focus.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
        '<p class="profile__lead reveal">' + esc(f.lead) + "</p>" +
        '<div class="prose reveal">' + f.profile.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<div class="profile__block reveal"><h3>Qualifications &amp; standing</h3><ul class="cred-list">' +
        f.credentials.map(function (c) { return "<li><span>" + esc(c.text) + (c.note ? ' <span class="note">(' + esc(c.note) + ")</span>" : "") + "</span></li>"; }).join("") + "</ul></div>" +
        ((f.experience || []).length ? '<div class="profile__block reveal"><h3>Experience</h3><ul class="cred-list">' + f.experience.map(function (x) { return "<li><span>" + esc(x) + "</span></li>"; }).join("") + "</ul></div>" : "") +
        (progs.length ? '<div class="profile__block reveal"><h3>Programmes led</h3><div class="leads">' + progs.map(function (p) { return '<a href="' + progHref(p) + '">' + esc(p.title) + "</a>"; }).join("") + "</div></div>" : "") +
        '<div class="btn-row reveal" style="margin-top:40px"><a class="btn btn--ink" href="' + enquireHref("Working with " + f.name, "speaking") + '">Enquire about working with ' + esc(f.name.split(" ")[0]) + " " + ARROW + "</a></div>" +
        "</div></article>";
    }).join("");
    if (location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) setTimeout(function () { t.scrollIntoView({ block: "start" }); }, 30);
    }
  };

  function currentIssue() {
    var list = C.newsletter || [];
    return byId(list, params.get("issue")) || list[0];
  }
  R["newsletter-latest"] = function (el) {
    var is = (C.newsletter || [])[0];
    if (!is) { var s = el.closest("[data-section]"); if (s) s.hidden = true; return; }
    el.innerHTML = '<a class="nl-card reveal" href="' + root + "newsletter.html?issue=" + is.id + '#issue">' +
      '<div class="nl-card__cover">' + photo(is.cover, "(max-width: 860px) 100vw, 45vw", { alt: "" }) +
      '<div class="nl-card__mast"><span>TAO Newsletter</span><span>Issue ' + esc(is.number) + "</span></div></div>" +
      '<div class="nl-card__body"><span class="eyebrow">' + esc(is.month) + "</span><h3>" + esc(is.title) + "</h3><p>" + esc(is.intro) + "</p>" +
      '<span class="link-arrow">Read the latest issue ' + ARROW + "</span></div></a>";
  };
  R["newsletter-issue"] = function (el) {
    var is = currentIssue();
    if (!is) { el.innerHTML = '<p class="muted">The first issue is on its way. Subscribe below to receive it.</p>'; return; }
    var sec = function (title, body) { return body ? '<section class="issue-section reveal"><h3>' + title + "</h3><div>" + body + "</div></section>" : ""; };
    var items = function (arr, fn) { return (arr || []).length ? '<div class="issue-items">' + arr.map(fn).join("") + "</div>" : ""; };
    var feat = is.featured;
    var articles = (is.articles || []).map(function (s) { return (C.insights || []).filter(function (x) { return x.slug === s; })[0]; }).filter(Boolean);
    var upcoming = (is.upcoming || []).map(function (id) { return byId(C.programmes, id); }).filter(Boolean);
    el.innerHTML =
      '<header class="issue-head reveal"><div><span class="eyebrow">TAO Newsletter · ' + esc(is.month) + '</span><h2>' + esc(is.title) + "</h2></div>" +
      '<div><div class="issue-head__no" aria-label="Issue ' + esc(is.number) + '">' + esc(is.number) + '</div><p class="lede" style="margin-top:16px">' + esc(is.intro) + "</p></div></header>" +
      (is.cover ? '<figure class="issue-cover reveal-img frame">' + photo(is.cover, "(max-width: 1240px) 100vw, 1200px") + "</figure>" : "") +
      sec("Featured story", feat ? '<article class="feature"><h4>' + esc(feat.title) + "</h4>" + feat.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</article>" : "") +
      sec("Articles", items(articles, function (a) { return '<a href="' + root + "insights/" + a.slug + '.html"><b>' + esc(a.title) + "</b><span>" + esc(a.summary) + "</span></a>"; })) +
      sec("Workshop updates", items(is.workshops, function (w) { return "<div><b>" + esc(w.title) + "</b><span>" + esc(w.text) + "</span>" + (w.href ? '<a class="link-arrow" style="justify-self:start;margin-top:8px" href="' + root + esc(w.href) + '">' + esc(w.label || "Read more") + " " + ARROW + "</a>" : "") + "</div>"; })) +
      sec("TAO news", items(is.news, function (n) { return "<div><b>" + esc(n.title) + "</b><span>" + esc(n.text) + "</span></div>"; })) +
      sec("Facilitator notes", items(is.facilitatorNotes, function (n) { return "<div><b>" + esc(n.title) + "</b><span>" + esc(n.text) + "</span>" + (n.by ? "<span>" + esc(facName(n.by) || n.by) + "</span>" : "") + "</div>"; })) +
      sec("Programmes in focus", items(upcoming, function (p) { return '<a href="' + progHref(p) + '"><b>' + esc(p.title) + "</b><span>" + esc(p.summary) + "</span></a>"; }));
    if (params.get("issue")) document.title = "Issue " + is.number + ": " + is.title + " | TAO Newsletter";
  };
  R["newsletter-archive"] = function (el) {
    var cur = currentIssue();
    el.innerHTML = (C.newsletter || []).map(function (is) {
      return '<a href="' + root + "newsletter.html?issue=" + is.id + '#issue"' + (cur && cur.id === is.id ? ' aria-current="true"' : "") + ">" +
        "<span>Issue " + esc(is.number) + "</span><b>" + esc(is.title) + "</b><span>" + esc(is.month) + "</span></a>";
    }).join("");
  };

  function postCard(a, i) {
    return '<a class="post-card reveal" style="--d:' + (i % 3) * 0.08 + 's" href="' + root + "insights/" + a.slug + '.html" data-category="' + esc(a.category) + '">' +
      '<div class="media">' + photo(a.photo, "(max-width: 620px) 100vw, (max-width: 1080px) 50vw, 33vw", { alt: "" }) + "</div>" +
      '<div class="post-meta"><span class="cat">' + esc(a.category) + "</span><span>" + esc(a.readTime) + "</span></div>" +
      "<h3>" + esc(a.title) + "</h3><p>" + esc(a.summary) + "</p></a>";
  }
  R.insights = function (el) {
    var limit = +el.getAttribute("data-limit") || 99;
    var exclude = el.getAttribute("data-exclude");
    var list = (C.insights || []).filter(function (a) { return a.slug !== exclude; }).slice(0, limit);
    var grid = '<div class="post-grid">' + list.map(postCard).join("") + "</div>";
    if (el.hasAttribute("data-filters")) {
      var cats = [];
      (C.insights || []).forEach(function (a) { if (cats.indexOf(a.category) < 0) cats.push(a.category); });
      el.innerHTML = '<div class="filters" role="group" aria-label="Filter insights by topic"><button class="chip" type="button" data-cat="all" aria-pressed="true">All topics</button>' +
        cats.map(function (c) { return '<button class="chip" type="button" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>"; }).join("") + "</div>" + grid;
      $all(".chip", el).forEach(function (chip) {
        chip.addEventListener("click", function () {
          var c = chip.getAttribute("data-cat");
          $all(".chip", el).forEach(function (x) { x.setAttribute("aria-pressed", String(x === chip)); });
          $all(".post-card", el).forEach(function (card) { card.hidden = !(c === "all" || card.getAttribute("data-category") === c); });
        });
      });
    } else {
      el.innerHTML = grid;
    }
  };

  R.testimonials = function (el) {
    var list = C.testimonials || [];
    var s = el.closest("[data-section]");
    if (!list.length) { if (s) s.hidden = true; return; }
    if (s) s.hidden = false;
    el.innerHTML = '<div class="quotes">' + list.map(function (t, i) {
      return '<figure class="quote reveal" style="--d:' + (i % 3) * 0.08 + 's"><blockquote>“' + esc(t.quote) + '”</blockquote>' +
        "<figcaption><b>" + esc(t.name) + "</b>" + esc(t.role || "") + (t.programme ? " · " + esc(t.programme) : "") + "</figcaption></figure>";
    }).join("") + "</div>";
  };

  R["topic-options"] = function (el) {
    var opt = function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; };
    var ind = (C.programmes || []).filter(function (p) { return p.audience === "individual"; });
    var org = (C.programmes || []).filter(function (p) { return p.audience === "organisation"; });
    el.innerHTML = '<option value="">Choose an option</option>' +
      '<optgroup label="Programmes for individuals">' + ind.map(function (p) { return opt(p.title); }).join("") + "</optgroup>" +
      '<optgroup label="For organisations">' + org.map(function (p) { return opt(p.title); }).join("") + "</optgroup>" +
      '<optgroup label="Other">' + ["Upcoming workshops", "Speaking or training request", "Partnership", "Something else"].map(opt).join("") + "</optgroup>";
  };

  $all("[data-render]").forEach(function (el) {
    var fn = R[el.getAttribute("data-render")];
    if (fn) fn(el);
  });

  /* ---------- Contact details anywhere on a page ---------- */
  $all("[data-contact]").forEach(function (el) {
    var html = "";
    if (cfg.email) html += '<li><span class="muted">Email</span><br><a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + "</a></li>";
    if (cfg.phone) html += '<li><span class="muted">Telephone</span><br><a href="tel:' + esc(cfg.phone.replace(/[^+\d]/g, "")) + '">' + esc(cfg.phone) + "</a></li>";
    if (cfg.whatsapp) html += '<li><span class="muted">WhatsApp</span><br><a href="https://wa.me/' + esc(cfg.whatsapp.replace(/\D/g, "")) + '" target="_blank" rel="noopener noreferrer">Message TAO on WhatsApp</a></li>';
    if (cfg.location) html += '<li><span class="muted">Based in</span><br>' + esc(cfg.location) + "</li>";
    var wrap = el.closest("[data-contact-wrap]");
    if (html) el.innerHTML = html; else if (wrap) wrap.hidden = true;
  });

  /* ---------- Forms (enquiry + newsletter) ---------- */
  function submitForm(form, subject, summary, onDone) {
    var status = form.querySelector(".form-status");
    var show = function (msg, isError) {
      status.hidden = false; status.classList.toggle("is-error", !!isError); status.textContent = msg;
    };
    var hp = form.querySelector(".hp input");
    if (hp && hp.value) return;
    var data = new FormData(form);
    data.append("_subject", subject);
    var btn = form.querySelector('button[type="submit"]');

    if (cfg.formEndpoint) {
      btn.disabled = true;
      fetch(cfg.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error("status " + r.status); form.reset(); show(onDone); })
        .catch(function () { show("Sorry, your message could not be sent. Please try again in a moment" + (cfg.email ? ", or email " + cfg.email : "") + ".", true); })
        .then(function () { btn.disabled = false; });
    } else if (cfg.email) {
      window.location.href = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(summary(data));
      show("Your email app should now open with your message ready to send.");
    } else {
      show("Thank you. Online submissions are being connected. Please try again shortly.", true);
    }
  }

  var enquiry = document.getElementById("enquiry-form");
  if (enquiry) {
    var t = params.get("type");
    if (t) { var r = enquiry.querySelector('input[name="enquiry_type"][value="' + t.replace(/[^a-z]/g, "") + '"]'); if (r) r.checked = true; }
    var topic = params.get("topic");
    var sel = enquiry.elements["topic"];
    if (topic && sel) {
      var match = $all("option", sel).filter(function (o) { return o.value === topic; })[0];
      if (!match) { match = document.createElement("option"); match.value = match.textContent = topic; sel.insertBefore(match, sel.options[1] || null); }
      match.selected = true;
    }
    enquiry.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(enquiry);
      submitForm(enquiry, "TAO enquiry: " + (d.get("topic") || d.get("enquiry_type") || "General") + ", " + d.get("name"), function (data) {
        return ["Enquiry type: " + (data.get("enquiry_type") || "-"), "Name: " + data.get("name"), "Email: " + data.get("email"),
          "Organisation: " + (data.get("organisation") || "-"), "Role: " + (data.get("role") || "-"), "Interested in: " + (data.get("topic") || "-"), "", data.get("message")].join("\n");
      }, "Thank you, your enquiry has been sent. We will reply personally.");
    });
  }
  $all(".subscribe-form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(f, "TAO Newsletter subscription", function (data) {
        return "Please add me to the TAO Newsletter.\n\nName: " + (data.get("name") || "-") + "\nEmail: " + data.get("email");
      }, "Thank you, you are on the list for the next TAO Newsletter.");
    });
  });

  /* ---------- Motion: reveal on scroll ---------- */
  var watch = $all(".reveal, .reveal-img, .converge.draw, .method__track");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    watch.forEach(function (el) { io.observe(el); });
  } else {
    watch.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
