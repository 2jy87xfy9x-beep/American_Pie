import { data } from "./data.js";

"use strict";

(function () {
  var ROOT = "";
  var state = {
    mode: "2008",
    simulationComplete: false,
    eventIndex: 0,
    stressLevel: 12,
    currentArticle: null,
    currentSection: 0,
    sections: [],
    meta: {},
    ghostTrackKey: null,
    marginEditOpen: false,
    revealOpen: false,
    variables: {},
    events: [],
    didYouKnow: [],
    ghostTracks: {},
    tickerUnlocked: false,
    gaugeUnlocked: false,
    conceptsRead: {},
  };

  var LS_VARS = "american_pie_variables";
  var LS_NAV = "american_pie_nav_revealed";
  var LS_FIRST_DONE = "american_pie_first_article_complete";
  var LS_ON_THIS_DAY = "american_pie_on_this_day_index";
  var LS_CONCEPTS = "american_pie_concepts";

  function $(id) {
    return document.getElementById(id);
  }

  function fmtMoney(n) {
    if (n == null || isNaN(n)) return "—";
    var neg = n < 0;
    n = Math.abs(Math.round(n));
    var s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "−" : "") + "$" + s;
  }

  function fmtNumber(n, decimals) {
    if (n == null || isNaN(n)) return "—";
    if (decimals != null) return Number(n).toFixed(decimals);
    return String(n);
  }

  function fmtPercent(n) {
      if (n == null || isNaN(n)) return "—";
      return fmtNumber(n, 2) + "%";
  }

  function fmtDays(n) {
    if (n == null || isNaN(n)) return "—";
    return String(Math.round(n)) + " days";
  }

  function articleDataKey(slug) {
    if (state.mode === "present" && slug.indexOf("/") === -1) {
      return "present/" + slug;
    }
    return slug;
  }

  function simPath(file) {
    var folder = state.mode === "present" ? "present" : "2008";
    return ROOT + "simulations/" + folder + "/" + file;
  }

  function loadLocalOverrides() {
    try {
      var raw = localStorage.getItem(LS_VARS);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  function saveLocalOverrides(map) {
    try {
      localStorage.setItem(LS_VARS, JSON.stringify(map));
    } catch (e) {}
  }

  function mergeVariables(base, overrides) {
    var out = JSON.parse(JSON.stringify(base || {}));
    var o = overrides || {};
    Object.keys(o).forEach(function (k) {
      if (!out[k]) out[k] = { value: null, unit: "dollars", confirmed: false, source: "", last_checked: "", notes: "" };
      out[k].value = o[k].value != null ? o[k].value : out[k].value;
      if (o[k].unit != null) out[k].unit = o[k].unit;
    });
    return out;
  }

  function getRawValue(key, vars) {
    var entry = vars && vars[key];
    if (!entry) return null;
    return entry.value;
  }

  function computeDerived(vars) {
    var cash = Number(getRawValue("your_cash", vars)) || 0;
    var exp = Number(getRawValue("your_monthly_expenses", vars)) || 1;
    var gapMonthly = exp * 0.55;
    var coverage_days = exp > 0 ? (cash / exp) * 30 : 0;
    var covered_months_with_ui = gapMonthly > 0 ? cash / gapMonthly : 0;
    return {
      coverage_days: coverage_days,
      income_gap: gapMonthly,
      covered_months_with_ui: covered_months_with_ui,
    };
  }

  function formatTemplateValue(key, val, unit) {
    if (unit === "percent") return fmtPercent(val);
    if (unit === "number") return val != null && val !== "" && !isNaN(Number(val)) ? String(val) : "—";
    if (unit === "dollars") return fmtMoney(val);
    if (key === "coverage_days") return fmtDays(val);
    if (key === "income_gap") return fmtMoney(val);
    if (key === "covered_months_with_ui") return fmtNumber(val, 1) + " months";
    if (key === "today") {
      return new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return val != null ? String(val) : "—";
  }

  function buildReplaceMap(vars) {
    var d = computeDerived(vars);
    var map = {};
    Object.keys(vars || {}).forEach(function (k) {
      var e = vars[k];
      map[k] = formatTemplateValue(k, e && e.value, e && e.unit);
    });
    map.coverage_days = fmtDays(d.coverage_days);
    map.income_gap = fmtMoney(d.income_gap);
    map.covered_months_with_ui = fmtNumber(d.covered_months_with_ui, 1) + " months";
    map.today = formatTemplateValue("today", null, null);
    return map;
  }

  function extractEditableKeys(text) {
    var re = /\{\{(\w+)\}\}/g;
    var keys = [];
    var m;
    while ((m = re.exec(text))) {
      if (keys.indexOf(m[1]) === -1) keys.push(m[1]);
    }
    var computed = ["coverage_days", "income_gap", "covered_months_with_ui", "today"];
    return keys.filter(function (k) {
      return computed.indexOf(k) === -1;
    });
  }

  function parseFrontmatter(md) {
    var meta = {};
    if (md.slice(0, 3) !== "---") return { meta: meta, body: md };
    var end = md.indexOf("\n---", 3);
    if (end === -1) return { meta: meta, body: md };
    var fm = md.slice(3, end).trim().split("\n");
    fm.forEach(function (line) {
      var i = line.indexOf(":");
      if (i === -1) return;
      var k = line.slice(0, i).trim();
      var v = line.slice(i + 1).trim();
      if (v === "present") meta[k] = "present";
      else if (/^\[/.test(v)) {
        try {
          meta[k] = JSON.parse(v.replace(/'/g, '"'));
        } catch (e) {
          meta[k] = v;
        }
      } else if (/^\d+$/.test(v)) meta[k] = Number(v);
      else meta[k] = v.replace(/^"|"$/g, "");
    });
    return { meta: meta, body: md.slice(end + 4).trim() };
  }

  function splitSections(body) {
    var lines = body.split(/\r?\n/);
    var sections = [];
    var cur = null;
    lines.forEach(function (line) {
      if (/^## /.test(line)) {
        if (cur) sections.push(cur);
        cur = { title: line.replace(/^## /, "").trim(), content: [] };
      } else if (cur) {
        cur.content.push(line);
      }
    });
    if (cur) sections.push(cur);
    return sections.map(function (s) {
      return { title: s.title, text: s.content.join("\n").trim() };
    });
  }

  function mdInlineToHtml(text) {
    if (!text) return "";
    var esc = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    var html = esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\n\n+/g, "</p><p>");
    html = "<p>" + html + "</p>";
    html = html.replace(/<p><\/p>/g, "");
    return html;
  }

  function renderSectionHtml(rawText, vars, editableKeys) {
    var map = buildReplaceMap(vars);
    var parts = rawText.split(/\{\{(\w+)\}\}/g);
    var html = "";
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        html += mdInlineToHtml(parts[i]);
      } else {
        var key = parts[i];
        var display = map[key] != null ? map[key] : "—";
        var canEdit = editableKeys.indexOf(key) !== -1;
        if (canEdit) {
          html +=
            '<button type="button" class="var-inline" data-var="' +
            key +
            '">' +
            display +
            "</button>";
        } else {
          html += '<span class="var-wrap" data-var="' + key + '">' + display + "</span>";
        }
      }
    }
    return html;
  }

  function processReveal(html) {
    var idx = html.indexOf("If you had known");
    if (idx === -1) return { main: html, hasReveal: false };
    var before = html.slice(0, idx);
    var after = html.slice(idx);
    return {
      main: before,
      reveal: after,
      hasReveal: true,
    };
  }

  function simulationDataKey(file) {
    var folder = state.mode === "present" ? "present" : "2008";
    var base = file.replace(/\.json$/i, "");
    return folder + "/" + base;
  }

  function loadSimulationBundle() {
    var overrides = loadLocalOverrides()[state.mode] || {};
    var base = data.simulations[simulationDataKey("variables.json")];
    if (base) {
      state.variables = mergeVariables(base, overrides);
    } else {
      state.variables = {};
    }
    var ev = data.simulations[simulationDataKey("events.json")];
    if (ev) {
      state.events = ev;
      syncEventStress();
    } else {
      state.events = [];
    }
    var dyk = data.simulations[simulationDataKey("did-you-know.json")];
    state.didYouKnow = dyk || [];
    var gt = data.simulations[simulationDataKey("ghost-tracks.json")];
    state.ghostTracks = gt || {};
    loadConceptsFromStorage();
  }

  function syncEventStress() {
    var ev = state.events[state.eventIndex];
    state.stressLevel = ev && ev.stress_level != null ? ev.stress_level : state.stressLevel;
  }

  function persistVariable(key, value) {
    var all = loadLocalOverrides();
    if (!all[state.mode]) all[state.mode] = {};
    if (!all[state.mode][key]) {
      all[state.mode][key] = {
        value: value,
        unit: state.variables[key] ? state.variables[key].unit : "dollars",
        confirmed: true,
        source: "user",
        last_checked: new Date().toISOString().slice(0, 10),
        notes: "",
      };
    } else {
      all[state.mode][key].value = value;
      all[state.mode][key].last_checked = new Date().toISOString().slice(0, 10);
    }
    saveLocalOverrides(all);
    if (state.variables[key]) state.variables[key].value = value;
  }

  function updateDateline() {
    var el = $("dateline-text");
    if (!el) return;
    var d = new Date();
    if (state.mode === "2008" && state.events[state.eventIndex] && state.events[state.eventIndex].date) {
      el.textContent = String(state.events[state.eventIndex].date).toUpperCase();
    } else {
      el.textContent = d
        .toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toUpperCase();
    }
  }

  function updatePressure() {
    var m = $("pressure-marker");
    if (!m) return;
    var pct = Math.max(0, Math.min(100, state.stressLevel));
    m.style.left = "calc(" + pct + "% - 5px)";
  }

  function ghostTrackMeta() {
    return [
      { key: "winner", label: "Winner", color: "var(--winner)" },
      { key: "weatherer", label: "Weatherer", color: "var(--weatherer)" },
      { key: "unaware", label: "Unaware", color: "var(--unaware)" },
      { key: "gambler_lost", label: "Gambler−", color: "var(--gambler-lost)" },
      { key: "gambler_won", label: "Gambler+", color: "var(--gambler-won)" },
    ];
  }

  function currentGhostLogEntries() {
    var date =
      state.events[state.eventIndex] && state.events[state.eventIndex].date
        ? state.events[state.eventIndex].date
        : "January 2008";
    var out = [];
    ghostTrackMeta().forEach(function (gt) {
      var track = state.ghostTracks[gt.key];
      if (!track || !track.log || !track.log.length) return;
      var entry =
        track.log.filter(function (l) {
          return l.date === date;
        })[0] || track.log[track.log.length - 1];
      var msg = entry && entry.action ? entry.action : (entry && entry.thinking) || "";
      out.push({ key: gt.key, label: gt.label, color: gt.color, text: msg });
    });
    return out;
  }

  function renderTicker() {
    var track = $("ticker-track");
    if (!track) return;
    var items = currentGhostLogEntries();
    if (!items.length) {
      items = [
        {
          key: "winner",
          label: "Winner",
          color: "var(--winner)",
          text: "Building runway with high-yield savings.",
        },
        {
          key: "weatherer",
          label: "Weatherer",
          color: "var(--weatherer)",
          text: "Watching headlines. Holding steady.",
        },
        {
          key: "unaware",
          label: "Unaware",
          color: "var(--unaware)",
          text: "No change to routine.",
        },
        {
          key: "gambler_lost",
          label: "Gambler−",
          color: "var(--gambler-lost)",
          text: "Considering positions.",
        },
        {
          key: "gambler_won",
          label: "Gambler+",
          color: "var(--gambler-won)",
          text: "Considering positions.",
        },
      ];
    }
    function row(list) {
      return list
        .map(function (it) {
          return (
            '<span class="ticker-item"><span class="ticker-dot" style="background:' +
            it.color +
            '"></span>' +
            it.label +
            " · " +
            (it.text || "").replace(/</g, "&lt;") +
            "</span>"
          );
        })
        .join("");
    }
    var inner = row(items) + row(items);
    track.innerHTML = inner;
  }

  function renderGhostMarginList() {
    var ul = $("ghost-tracks-short");
    if (!ul) return;
    ul.innerHTML = ghostTrackMeta()
      .map(function (gt) {
        return (
          '<li data-track="' +
          gt.key +
          '"><span class="ghost-dot" style="background:' +
          gt.color +
          '"></span>' +
          gt.label +
          "</li>"
        );
      })
      .join("");
    ul.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("click", function () {
        openGhostFull(li.getAttribute("data-track"));
      });
    });
  }

  function renderHome() {
    var newsTitle = $("in-the-news-title");
    if (newsTitle) {
      newsTitle.textContent =
        state.mode === "present" ? "In the news — Your feed" : "In the news — Early 2008";
    }
    var newsList = $("in-the-news-list");
    if (newsList) {
      newsList.innerHTML = "";
      var evs = state.events.length ? state.events.slice(0, 7) : fallbackNews();
      evs.forEach(function (e) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = e.headline || e.ticker_text || "Event";
        a.addEventListener("click", function (evt) {
          evt.preventDefault();
          if (e.article) openArticle(e.article);
        });
        li.appendChild(a);
        newsList.appendChild(li);
      });
    }
    var dyk = $("did-you-know-list");
    if (dyk) {
      dyk.innerHTML = "";
      var hooks = state.didYouKnow.length ? state.didYouKnow.slice(0, 6) : fallbackDyk();
      var map = buildReplaceMap(state.variables);
      hooks.forEach(function (h) {
        var li = document.createElement("li");
        var text = h.text || h.hook || "";
        text = text.replace(/\{\{(\w+)\}\}/g, function (_, k) {
          return map[k] != null ? map[k] : "—";
        });
        li.textContent = text;
        dyk.appendChild(li);
      });
    }
    var oti = $("on-this-day-body");
    var otil = $("on-this-day-label");
    if (oti && otil) {
      var pool = state.didYouKnow.filter(function (x) {
        return x.on_this_day;
      });
      if (!pool.length)
        pool = [{ on_this_day: "March 14, 2008", text: fallbackOnThisDay() }];
      var idx = Number(sessionStorage.getItem(LS_ON_THIS_DAY) || "");
      if (idx === "" || isNaN(idx)) {
        idx = Math.floor(Math.random() * pool.length);
        sessionStorage.setItem(LS_ON_THIS_DAY, String(idx));
      }
      var pick = pool[idx % pool.length];
      otil.textContent = "On this day — " + (pick.on_this_day || "");
      oti.textContent = pick.text || pick.body || "";
    }
    var feat = $("featured-article-link");
    var more = $("featured-read-more");
    var slug = state.mode === "present" ? "getting-started" : "emergency-fund";
    var title =
      state.mode === "present"
        ? "Getting Started With Your Real Numbers"
        : "The 2008 Financial Crisis: What Most Americans Did Not Know Was Already Happening To Them";
    if (feat) {
      feat.textContent = title;
      feat.onclick = function (e) {
        e.preventDefault();
        openArticle(slug);
      };
    }
    if (more) {
      more.onclick = function (e) {
        e.preventDefault();
        openArticle(slug);
      };
    }
    updateDateline();
    renderTicker();
    updatePressure();
  }

  function fallbackNews() {
    return [
      { headline: "Bear Stearns reports heavy losses tied to mortgage-backed securities", article: "bear-stearns" },
      { headline: "Federal Reserve cuts interest rates again", article: "federal-reserve" },
      { headline: "US unemployment reaches multi-year highs", article: "unemployment-insurance" },
      { headline: "Oil prices touch triple digits", article: "inflation" },
      { headline: "Consumer confidence weakens", article: "bull-market" },
    ];
  }

  function fallbackDyk() {
    var cash = fmtMoney(getRawValue("your_cash", state.variables) || 7000);
    return [
      { text: "The average American household lost 39% of their net worth between 2007 and 2010." },
      { text: "57% of Americans had no emergency fund in 2008." },
      { text: "A person who invested " + cash + " at the March 2009 low would have grown it materially by 2024—mock data seeds from your entered cash." },
      { text: "Most people learned what a mortgage-backed security was only after losing money because of one." },
    ];
  }

  function fallbackOnThisDay() {
    return "JP Morgan acquired Bear Stearns for $2 per share. One year earlier the stock traded near $170. People who understood what this meant acted within hours.";
  }

  function setMode(mode) {
    state.mode = mode;
    var b2008 = $("mode-2008");
    var bp = $("mode-present");
    if (b2008) b2008.setAttribute("aria-pressed", mode === "2008" ? "true" : "false");
    if (bp) bp.setAttribute("aria-pressed", mode === "present" ? "true" : "false");
    loadSimulationBundle();
    renderHome();
    if ($("view-article") && !$("view-article").classList.contains("hidden")) {
      if (state.currentArticle) openArticle(state.currentArticle);
    }
  }

  function showView(name) {
    ["view-home", "view-article", "view-ghost", "view-clarity", "view-stub"].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.classList.toggle("hidden", id !== "view-" + name && !(id === "view-stub" && name === "stub"));
    });
    if (name !== "stub") {
      var stub = $("view-stub");
      if (stub) stub.classList.add("hidden");
    }
    if (name === "stub") {
      var st = $("view-stub");
      if (st) st.classList.remove("hidden");
    }
  }

  function revealNavIfNeeded() {
    if (localStorage.getItem(LS_FIRST_DONE) === "1") {
      document.body.classList.add("nav-visible");
      var shell = $("nav-shell");
      if (shell && window.matchMedia && window.matchMedia("(max-width: 900px)").matches) {
        shell.classList.add("show-mobile");
      }
    }
  }

  function openArticle(slug) {
    state.currentArticle = slug;
    state.currentSection = 0;
    state.revealOpen = false;
    state.marginEditOpen = false;
    hideMarginEditor();
    var key = articleDataKey(slug);
    var md = data.articles[key];
    if (!md) {
      openStub("Article", "emergency-fund");
      return;
    }
    var parsed = parseFrontmatter(md);
    state.meta = parsed.meta;
    state.sections = splitSections(parsed.body);
    renderArticle();
    showView("article");
    updateDateline();
    updateNavClarity();
  }

  function renderArticle() {
    var title = $("article-title");
    var meta = $("article-meta");
    var crumbEra = $("crumb-era");
    var crumbCat = $("crumb-category");
    if (title) title.textContent = state.meta.title || "";
    if (crumbEra) {
      crumbEra.textContent = state.mode === "present" ? "Present" : "2008";
      crumbEra.onclick = function (e) {
        e.preventDefault();
        goHome();
      };
    }
    if (crumbCat) crumbCat.textContent = state.meta.category || "";
    if (meta) {
      meta.textContent =
        (state.meta.date || "") +
        " · " +
        (state.meta.sections ? state.meta.sections + " sections" : state.sections.length + " sections") +
        " · Concepts: " +
        (Array.isArray(state.meta.concepts) ? state.meta.concepts.length : 0);
    }
    var toc = $("margin-toc");
    if (toc) {
      toc.innerHTML = "";
      state.sections.forEach(function (s, i) {
        var li = document.createElement("li");
        li.textContent = i + 1 + " · " + s.title;
        li.addEventListener("click", function () {
          state.currentSection = i;
          state.revealOpen = false;
          renderArticleSection();
        });
        toc.appendChild(li);
      });
    }
    renderGhostMarginList();
    renderArticleSection();
    buildSourceViewContent();
  }

  function renderArticleSection() {
    var ind = $("section-indicator");
    var body = $("article-body");
    var next = $("article-next");
    var rev = $("reveal-toggle");
    var sec = state.sections[state.currentSection];
    if (!sec) return;
    if (ind) ind.textContent = "Section " + (state.currentSection + 1) + " of " + state.sections.length;
    var keys = extractEditableKeys(sec.text);
    var html = renderSectionHtml(sec.text, state.variables, keys);
    var pr = processReveal(html);
    if (pr.hasReveal && (state.meta.sections === 6 || sec.title.toLowerCase().indexOf("people") !== -1)) {
      if (rev) {
        rev.classList.remove("hidden");
        rev.setAttribute("aria-expanded", state.revealOpen ? "true" : "false");
        rev.textContent = state.revealOpen ? "▾ Hide" : "▸ Reveal";
      }
      html =
        pr.main +
        '<div class="reveal-block' +
        (state.revealOpen ? "" : " hidden") +
        '" id="reveal-block">' +
        pr.reveal +
        "</div>";
    } else {
      if (rev) rev.classList.add("hidden");
      html = pr.main;
    }
    if (body) body.innerHTML = html;
    wireVarButtons(keys);
    if (next) {
      next.classList.toggle("hidden", state.currentSection >= state.sections.length - 1);
      next.onclick = function (e) {
        e.preventDefault();
        advanceSection();
      };
    }
    if (rev) {
      rev.onclick = function () {
        state.revealOpen = !state.revealOpen;
        var rb = $("reveal-block");
        if (rb) rb.classList.toggle("hidden", !state.revealOpen);
        rev.setAttribute("aria-expanded", state.revealOpen ? "true" : "false");
        rev.textContent = state.revealOpen ? "▾ Hide" : "▸ Reveal";
      };
    }
  }

  function advanceSection() {
    if (state.currentSection < state.sections.length - 1) {
      state.currentSection += 1;
      state.revealOpen = false;
      renderArticleSection();
    } else {
      markArticleComplete();
      goHome();
    }
  }

  function markArticleComplete() {
    localStorage.setItem(LS_FIRST_DONE, "1");
    revealNavIfNeeded();
    if (Array.isArray(state.meta.concepts)) {
      state.meta.concepts.forEach(function (c) {
        state.conceptsRead[c] = Math.min(100, (state.conceptsRead[c] || 0) + 20);
      });
      saveConcepts();
    }
    updateNavClarity();
  }

  function loadConceptsFromStorage() {
    try {
      state.conceptsRead = JSON.parse(localStorage.getItem(LS_CONCEPTS) || "{}") || {};
    } catch (e) {
      state.conceptsRead = {};
    }
  }

  function saveConcepts() {
    localStorage.setItem(LS_CONCEPTS, JSON.stringify(state.conceptsRead));
  }

  function clarityScore() {
    var vals = Object.values(state.conceptsRead);
    if (!vals.length) return 2;
    var s = vals.reduce(function (a, b) {
      return a + b;
    }, 0);
    return Math.min(100, Math.max(2, Math.round(s / 5)));
  }

  function updateNavClarity() {
    var n = $("nav-clarity-num");
    if (n) n.textContent = String(clarityScore());
  }

  function wireVarButtons(keys) {
    var body = $("article-body");
    if (!body) return;
    body.querySelectorAll(".var-inline").forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        openMarginEditor(btn.getAttribute("data-var"), keys);
      });
    });
  }

  function hideMarginEditor() {
    var ed = $("margin-editor");
    if (ed) ed.classList.add("hidden");
    state.marginEditOpen = false;
  }

  function openMarginEditor(primaryKey, keysInSection) {
    state.marginEditOpen = true;
    var ed = $("margin-editor");
    var fields = $("margin-editor-fields");
    var sum = $("margin-mock-summary");
    if (!ed || !fields) return;
    ed.classList.remove("hidden");
    var keys = keysInSection.slice();
    if (primaryKey && keys.indexOf(primaryKey) === -1) keys.unshift(primaryKey);
    fields.innerHTML = "";
    keys.forEach(function (k) {
      var def = state.variables[k];
      var lab = document.createElement("label");
      lab.className = "mono";
      lab.style.display = "block";
      lab.style.fontFamily = "var(--font-mono)";
      lab.style.fontSize = "11px";
      lab.textContent = (def && def.notes) || k;
      var inp = document.createElement("input");
      inp.type = "number";
      inp.step = "any";
      inp.dataset.varKey = k;
      inp.value = getRawValue(k, state.variables) != null ? String(getRawValue(k, state.variables)) : "";
      inp.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      inp.addEventListener("input", function () {
        var v = parseFloat(String(inp.value), 10);
        if (!isNaN(v)) {
          persistVariable(k, v);
          renderArticleSection();
          if (sum) {
            sum.innerHTML = marginSummaryHtml();
          }
          buildSourceViewContent();
          renderHome();
        }
      });
      fields.appendChild(lab);
      fields.appendChild(inp);
    });
    if (sum) sum.innerHTML = marginSummaryHtml();
  }

  function marginSummaryHtml() {
    var d = computeDerived(state.variables);
    return (
      "Using mock data:<br/>Expenses: " +
      fmtMoney(getRawValue("your_monthly_expenses", state.variables)) +
      "<br/>Savings: " +
      fmtMoney(getRawValue("your_cash", state.variables)) +
      "<br/><br/>Coverage: " +
      fmtDays(d.coverage_days)
    );
  }

  function buildSourceViewContent() {
    var box = $("source-content");
    if (!box) return;
    var slug = state.currentArticle || "emergency-fund";
    var path =
      state.mode === "present"
        ? "articles/present/" + slug + ".md"
        : "articles/" + slug + ".md";
    var varPath = "simulations/" + (state.mode === "present" ? "present" : "2008") + "/variables.json";
    var keys = [];
    if (state.sections.length) {
      state.sections.forEach(function (s) {
        extractEditableKeys(s.text).forEach(function (k) {
          if (keys.indexOf(k) === -1) keys.push(k);
        });
      });
    }
    keys = keys.concat(["coverage_days", "income_gap"]);
    var map = buildReplaceMap(state.variables);
    var lines = [
      "This screen is powered by:",
      "",
      "Article file:",
      path,
      "",
      "Variables used:",
    ];
    keys.forEach(function (k) {
      lines.push(k + " → " + (map[k] != null ? map[k] : "—"));
    });
    lines.push("", "coverage_days is calculated:", "your_cash ÷ your_monthly_expenses × 30");
    var c = Number(getRawValue("your_cash", state.variables)) || 0;
    var e = Number(getRawValue("your_monthly_expenses", state.variables)) || 1;
    lines.push(
      "= " + c + " ÷ " + e + " × 30",
      "= " + Math.round((c / e) * 30) + " days",
      "",
      "To edit variables: open " + varPath + " or tap any value in the article.",
      "",
      "Note: edits from this page are stored in the browser (localStorage) and overlay the JSON file when values differ.",
    );
    box.innerHTML = "<pre class=\"mono\">" + lines.join("\n") + "</pre>";
  }

  function openGhostFull(key) {
    state.ghostTrackKey = key;
    var track = state.ghostTracks[key];
    var title = $("ghost-profile-title");
    var meta = $("ghost-profile-meta");
    var logEl = $("ghost-log");
    var crumb = $("ghost-breadcrumb-era");
    if (crumb) crumb.textContent = state.mode === "present" ? "Present" : "2008";
    if (title) title.textContent = track && track.label ? track.label : key;
    if (meta) {
      meta.textContent =
        (state.events[state.eventIndex] && state.events[state.eventIndex].date) ||
        "March 2008 · Age 28 · Renting";
    }
    if (logEl && track && track.log) {
      logEl.innerHTML = track.log
        .map(function (entry) {
          return (
            '<div class="ghost-entry"><div class="ghost-entry-date">' +
            (entry.date || "").replace(/</g, "&lt;") +
            '</div><div class="ghost-entry-body">' +
            (entry.action || entry.thinking || "").replace(/</g, "&lt;") +
            "</div></div>"
          );
        })
        .join("");
    } else if (logEl) logEl.innerHTML = "<p>No log yet.</p>";
    showView("ghost");
  }

  function goHome() {
    showView("home");
    renderHome();
  }

  function openStub(title, targetSlug) {
    $("stub-title").textContent = title;
    var c = $("stub-continue");
    if (c) {
      c.onclick = function (e) {
        e.preventDefault();
        openArticle(targetSlug || "emergency-fund");
      };
    }
    showView("stub");
  }

  function openClarityView() {
    var lede = $("clarity-lede");
    var bars = $("clarity-bars");
    var nx = $("clarity-next");
    var score = clarityScore();
    if (lede) {
      lede.innerHTML =
        "Score: <strong>" +
        score +
        " / 100</strong><br/>You understand " +
        score +
        "% of what affects your financial life.<br/>That is " +
        score +
        "% more than when you started.";
    }
    var catalog = [
      { k: "emergency-fund", label: "Emergency funds" },
      { k: "burn-rate", label: "Burn rate" },
      { k: "checking-vs-savings", label: "Checking vs savings" },
      { k: "federal-reserve", label: "Federal Reserve" },
      { k: "income-tax-basics", label: "Income tax basics" },
      { k: "investment-accounts", label: "Investment accounts" },
      { k: "capital-gains", label: "Capital gains" },
      { k: "inflation", label: "Inflation" },
    ];
    if (bars) {
      bars.innerHTML = catalog
        .map(function (row) {
          var v = state.conceptsRead[row.k] || 0;
          var filled = Math.round(v / 10);
          filled = Math.max(0, Math.min(10, filled));
          var bar = "█".repeat(filled) + "░".repeat(10 - filled);
          return (
            '<div class="clarity-row"><div>' +
            row.label +
            '</div><div class="mono">' +
            bar +
            "</div></div>"
          );
        })
        .join("");
    }
    if (nx) {
      nx.innerHTML =
        'Next concept that will move your score the most:<br/>→ <a href="#" class="text-link" id="clarity-next-link">Burn Rate</a> (you are close)';
      var l = $("clarity-next-link");
      if (l) {
        l.onclick = function (e) {
          e.preventDefault();
          openArticle("burn-rate");
        };
      }
    }
    showView("clarity");
  }

  function bindChrome() {
    var acc = document.querySelector(".article-content-col");
    if (acc) {
      acc.addEventListener("click", function () {
        hideMarginEditor();
      });
    }
    document.querySelectorAll(".theme-link").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.remove("theme-encyclopedia", "theme-newspaper");
        document.body.classList.add("theme-" + btn.getAttribute("data-theme"));
      });
    });
    var b2008 = $("mode-2008");
    var bp = $("mode-present");
    if (b2008) b2008.addEventListener("click", function () {
      setMode("2008");
    });
    if (bp) bp.addEventListener("click", function () {
      setMode("present");
    });
    document.querySelectorAll('.crumb[data-crumb="home"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        goHome();
      });
    });
    var st = $("source-toggle");
    var so = $("source-overlay");
    var sc = $("source-close");
    if (st && so) {
      st.addEventListener("click", function (e) {
        e.preventDefault();
        buildSourceViewContent();
        so.hidden = false;
      });
    }
    if (sc && so) {
      sc.addEventListener("click", function () {
        so.hidden = true;
      });
    }
    document.querySelectorAll(".nav-item").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var r = a.getAttribute("data-route");
        if (r === "home") goHome();
        else if (r === "clarity") openClarityView();
        else if (r === "learn") openArticle("emergency-fund");
        else openStub(r === "simulation" ? "Simulation" : "My Situation", "emergency-fund");
      });
    });
    var sr = $("sim-reset");
    var sp = $("sim-to-present");
    if (sr) {
      sr.addEventListener("click", function () {
        state.eventIndex = 0;
        $("simulation-complete-overlay").hidden = true;
        setMode("2008");
      });
    }
    if (sp) {
      sp.addEventListener("click", function () {
        $("simulation-complete-overlay").hidden = true;
        setMode("present");
      });
    }
    if (window.matchMedia) {
      window.matchMedia("(max-width: 900px)").addEventListener("change", function () {
        revealNavIfNeeded();
      });
    }
  }

  function init() {
    bindChrome();
    revealNavIfNeeded();
    updateNavClarity();
    setMode("2008");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
