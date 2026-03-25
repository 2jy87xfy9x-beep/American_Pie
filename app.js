"use strict";

(function () {
  var ROOT = "";
  var IDB_NAME = "american_pie_fs";
  var IDB_STORE = "handles";
  var IDB_KEY_HANDLE = "folderHandle";

  var state = {
    mode: "2008",
    simulationComplete: false,
    currentEra: 1,
    currentEventIndex: 0,
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
    conceptsRead: {},
    folderHandle: null,
    simulationEnded: false,
    skipGaugeTransition: false,
    audio: {
      unlocked: false,
      enabled: true,
      context: null,
      buffer: null,
      sourceA: null,
      sourceB: null,
      crossfadeGainA: null,
      crossfadeGainB: null,
      gainNode: null,
      distortionNode: null,
      filterNode: null,
      reverbDryGain: null,
      reverbWetGain: null,
      convolver: null,
      masterGainNode: null,
      lastInteraction: Date.now(),
      config: {
        volume: 100,
        effects: "full",
        momentumFade: true,
        fadeDelay: 60,
      },
      activeCrossfadeSlot: 0,
      pendingDecode: null,
      bootstrapScheduled: false,
      graphReady: false,
      suspendedByVisibility: false,
      lastPositionSave: 0,
      gestureBound: false,
      momentumTimer: null,
      positionTimer: null,
      audioParamBaseline: null,
      lastEraStressForEvent: null,
      stressInterpActive: false,
      configOpen: false,
      distortionRampTimer: null,
      crossfadeSchedule: null,
      _xfTimer: null,
    },
  };

  var LS_VARS = "american_pie_variables";
  var LS_NAV = "american_pie_nav_revealed";
  var LS_FIRST_DONE = "american_pie_first_article_complete";
  var LS_ON_THIS_DAY = "american_pie_on_this_day_index";
  var LS_CONCEPTS = "american_pie_concepts";
  var LS_ERA = "american_pie_current_era";
  var LS_EVENT_IDX = "american_pie_current_event_index";
  var LS_TICKER_LIVE = "american_pie_ticker_live";
  var LS_GAUGE_LIVE = "american_pie_gauge_live";
  var LS_TICKER_AFTER = "american_pie_ticker_sections_after_seen";
  var LS_GAUGE_AFTER = "american_pie_gauge_articles_after_seen";
  var LS_FS_PROMPTED = "american_pie_fs_folder_prompted";
  var LS_ARTICLES_DONE = "american_pie_articles_done";
  var LS_SAW_TICKER_ILLU = "american_pie_saw_ticker_illustration";
  var LS_SAW_GAUGE_ILLU = "american_pie_saw_gauge_illustration";
  var LS_AUDIO_UNLOCKED = "audio_unlocked";
  var LS_AUDIO_ENABLED = "audio_enabled";
  var LS_AUDIO_CONFIG = "audio_config";
  var LS_AUDIO_ERA = "audio_current_era";
  var LS_AUDIO_POS = "audio_last_position";
  var LS_AUDIO_FIRST_PLAY = "audio_first_play_done";

  var ERA_AUDIO_ROWS = [
    { era: 1, stress: 12, rate: 0.88, gain: 0.4, distortion: 0, filter: 18000, reverb: 0.0 },
    { era: 2, stress: 38, rate: 0.95, gain: 0.58, distortion: 80, filter: 16000, reverb: 0.1 },
    { era: 3, stress: 87, rate: 1.05, gain: 0.82, distortion: 280, filter: 12000, reverb: 0.3 },
    { era: 4, stress: 71, rate: 1.0, gain: 0.75, distortion: 220, filter: 13500, reverb: 0.4 },
    { era: 5, stress: 34, rate: 0.93, gain: 0.55, distortion: 40, filter: 17000, reverb: 0.1 },
    { era: 6, stress: 18, rate: 0.9, gain: 0.45, distortion: 0, filter: 19000, reverb: 0.0 },
    { era: 7, stress: 82, rate: 1.08, gain: 0.8, distortion: 260, filter: 11000, reverb: 0.2 },
    { era: 8, stress: 61, rate: 1.02, gain: 0.68, distortion: 160, filter: 14000, reverb: 0.2 },
    { era: 9, stress: 28, rate: 0.91, gain: 0.48, distortion: 20, filter: 17500, reverb: 0.05 },
  ];

  var CROSSFADE_SEC = 10;
  var LOOP_TRIGGER_SEC = 502;
  var BUFFER_DURATION_SEC = 512;

  var MANIFEST_SLUGS = {
    "emergency-fund": 1,
    "burn-rate": 1,
    "checking-vs-savings": 1,
    "federal-reserve": 1,
    "bear-stearns": 1,
    "mortgage-backed-securities": 1,
    "recession-defined": 1,
    "unemployment-insurance": 1,
    "cobra-insurance": 1,
    "taxes-when-laid-off": 1,
    "too-big-to-fail": 1,
    "bear-market": 1,
    "stimulus": 1,
    "buying-the-dip": 1,
    "dollar-cost-averaging": 1,
    "index-funds": 1,
    "sp500": 1,
    "opportunity-cost": 1,
    "compound-interest": 1,
    "roth-ira": 1,
    "401k-matching": 1,
    "net-worth": 1,
    "assets-vs-liabilities": 1,
    "budget-reality": 1,
    "bull-market": 1,
    "idle-cash-inflation": 1,
    "crypto-basics": 1,
    "lifestyle-inflation": 1,
    "tax-brackets": 1,
    "diversification": 1,
    "sequence-of-returns": 1,
    "gig-economy-taxes": 1,
    "market-crash-vs-correction": 1,
    "quantitative-easing": 1,
    "eviction-moratorium": 1,
    "panic-selling-cost": 1,
    "inflation-mechanics": 1,
    "cpi": 1,
    "fed-funds-rate": 1,
    "bonds-and-rates": 1,
    "i-bonds": 1,
    "real-vs-nominal-returns": 1,
    "housing-affordability": 1,
    "wage-price-spiral": 1,
    "ai-and-employment": 1,
    "high-rates-home-buying": 1,
    "market-valuation": 1,
    "reading-your-documents": 1,
  };

  var B_VAR_WEIGHTS = {
    your_cash: 2,
    your_monthly_expenses: 2,
    your_monthly_income: 2,
    your_monthly_rent: 2,
    your_credit_card_debt: 2,
    your_investment_value: 2,
    your_net_worth: 2,
    your_credit_score: 2,
    fed_funds_rate: 2,
    inflation_rate: 2,
    unemployment_rate: 2,
    sp500_level: 2,
    stress_level: 2,
    marginal_tax_rate: 1,
    short_term_cg_rate: 1,
    long_term_cg_rate: 1,
    high_yield_savings_rate: 1,
  };

  function $(id) {
    return document.getElementById(id);
  }

  function hydrateAudioFromStorage() {
    var au = state.audio;
    try {
      au.unlocked = localStorage.getItem(LS_AUDIO_UNLOCKED) === "1";
      var en = localStorage.getItem(LS_AUDIO_ENABLED);
      au.enabled = en === null || en === "1";
      var raw = localStorage.getItem(LS_AUDIO_CONFIG);
      if (raw) {
        var c = JSON.parse(raw);
        if (typeof c.volume === "number") au.config.volume = Math.max(0, Math.min(100, Math.round(c.volume)));
        if (c.effects === "full" || c.effects === "subtle" || c.effects === "off") au.config.effects = c.effects;
        if (typeof c.momentumFade === "boolean") au.config.momentumFade = c.momentumFade;
        if (typeof c.fadeDelay === "number") au.config.fadeDelay = Math.max(15, Math.min(300, Math.round(c.fadeDelay)));
      }
      var er = parseInt(localStorage.getItem(LS_AUDIO_ERA) || "0", 10);
      if (er >= 1 && er <= 9) au.audioParamBaseline = { era: er };
      localStorage.getItem(LS_AUDIO_POS);
    } catch (e) {}
    au.lastInteraction = Date.now();
  }

  function persistAudioUnlock() {
    try {
      localStorage.setItem(LS_AUDIO_UNLOCKED, state.audio.unlocked ? "1" : "0");
    } catch (e) {}
  }

  function persistAudioEnabled() {
    try {
      localStorage.setItem(LS_AUDIO_ENABLED, state.audio.enabled ? "1" : "0");
    } catch (e) {}
  }

  function persistAudioConfig() {
    try {
      localStorage.setItem(LS_AUDIO_CONFIG, JSON.stringify(state.audio.config));
    } catch (e) {}
  }

  function persistAudioEraForAudio() {
    try {
      localStorage.setItem(LS_AUDIO_ERA, String(state.audio.audioParamBaseline && state.audio.audioParamBaseline.era ? state.audio.audioParamBaseline.era : state.currentEra));
    } catch (e) {}
  }

  function persistAudioPosition(sec) {
    try {
      localStorage.setItem(LS_AUDIO_POS, String(sec));
    } catch (e) {}
  }

  function eraRowByNum(era) {
    var e = Math.max(1, Math.min(9, era));
    return ERA_AUDIO_ROWS[e - 1];
  }

  function sortEraRowsByStress() {
    return ERA_AUDIO_ROWS.slice().sort(function (a, b) {
      return a.stress - b.stress;
    });
  }

  function interpolateParamsForStress(stress) {
    var sorted = sortEraRowsByStress();
    var s = Math.max(0, Math.min(100, Number(stress) || 0));
    var lo = sorted[0];
    var hi = sorted[sorted.length - 1];
    if (s <= lo.stress) return Object.assign({}, lo);
    if (s >= hi.stress) return Object.assign({}, hi);
    var found = false;
    for (var i = 0; i < sorted.length - 1; i++) {
      if (s >= sorted[i].stress && s <= sorted[i + 1].stress) {
        lo = sorted[i];
        hi = sorted[i + 1];
        found = true;
        break;
      }
    }
    if (!found) {
      lo = sorted[0];
      hi = sorted[sorted.length - 1];
    }
    var t = hi.stress === lo.stress ? 0 : (s - lo.stress) / (hi.stress - lo.stress);
    return {
      era: state.currentEra,
      stress: s,
      rate: lo.rate + t * (hi.rate - lo.rate),
      gain: lo.gain + t * (hi.gain - lo.gain),
      distortion: lo.distortion + t * (hi.distortion - lo.distortion),
      filter: lo.filter + t * (hi.filter - lo.filter),
      reverb: lo.reverb + t * (hi.reverb - lo.reverb),
    };
  }

  function applyEffectsModeToRow(row) {
    var m = state.audio.config.effects;
    var out = Object.assign({}, row);
    if (m === "subtle") {
      out.distortion = out.distortion * 0.5;
      out.filter = Math.min(20000, out.filter + 2000);
      out.reverb = out.reverb * 0.5;
    } else if (m === "off") {
      out.distortion = 0;
      out.filter = 20000;
      out.reverb = 0;
    }
    return out;
  }

  function makeDistortionCurve(amount) {
    var n = 2048;
    var curve = new Float32Array(n);
    var a = Math.max(0, Math.min(400, Number(amount) || 0));
    if (a < 0.01) {
      for (var i = 0; i < n; i++) {
        var x = (i * 2) / n - 1;
        curve[i] = x;
      }
      return curve;
    }
    var k = 1 + a * 0.035;
    for (var j = 0; j < n; j++) {
      var x1 = (j * 2) / n - 1;
      curve[j] = Math.tanh(k * x1) / Math.tanh(k);
    }
    return curve;
  }

  function createSyntheticReverbBuffer(ctx) {
    var rate = ctx.sampleRate;
    var len = Math.floor(2 * rate);
    var buf = ctx.createBuffer(2, len, rate);
    for (var c = 0; c < buf.numberOfChannels; c++) {
      var d = buf.getChannelData(c);
      for (var i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.8);
      }
    }
    return buf;
  }

  function volumeMultiplier() {
    return Math.max(0, Math.min(100, state.audio.config.volume)) / 100;
  }

  function getPresentStressValue() {
    var v = getRawValue("stress_level", state.variables);
    if (v == null || isNaN(Number(v))) return eraRowByNum(9).stress;
    return Number(v);
  }

  function mergePresentRow() {
    var baseNine = eraRowByNum(9);
    var row = Object.assign({}, baseNine);
    var s = getPresentStressValue();
    var ip = interpolateParamsForStress(s);
    row.gain = ip.gain;
    row.rate = baseNine.rate;
    row.distortion = baseNine.distortion;
    row.filter = baseNine.filter;
    row.reverb = baseNine.reverb;
    return row;
  }

  function rampAudioRowTo(row, transitionMs) {
    var auPtr = state.audio;
    var ctx = auPtr.context;
    if (!ctx || !auPtr.graphReady) return;
    var now = ctx.currentTime;
    var end = now + transitionMs / 1000;
    var r = applyEffectsModeToRow(row);
    if (auPtr.config.effects === "off") {
      r.distortion = 0;
      r.filter = 20000;
      r.reverb = 0;
    }

    if (auPtr.sourceA && auPtr.sourceA.playbackRate)
      auPtr.sourceA.playbackRate.linearRampToValueAtTime(r.rate, end);
    if (auPtr.sourceB && auPtr.sourceB.playbackRate)
      auPtr.sourceB.playbackRate.linearRampToValueAtTime(r.rate, end);

    var targetGn = r.gain * volumeMultiplier();
    auPtr.gainNode.gain.cancelScheduledValues(now);
    auPtr.gainNode.gain.setValueAtTime(auPtr.gainNode.gain.value, now);
    auPtr.gainNode.gain.linearRampToValueAtTime(targetGn, end);

    auPtr.filterNode.frequency.cancelScheduledValues(now);
    auPtr.filterNode.frequency.setValueAtTime(auPtr.filterNode.frequency.value, now);
    auPtr.filterNode.frequency.linearRampToValueAtTime(Math.min(r.filter, 20000), end);

    var dry = 1 - r.reverb;
    var wet = r.reverb;
    auPtr.reverbDryGain.gain.cancelScheduledValues(now);
    auPtr.reverbDryGain.gain.setValueAtTime(auPtr.reverbDryGain.gain.value, now);
    auPtr.reverbDryGain.gain.linearRampToValueAtTime(dry, end);
    auPtr.reverbWetGain.gain.cancelScheduledValues(now);
    auPtr.reverbWetGain.gain.setValueAtTime(auPtr.reverbWetGain.gain.value, now);
    auPtr.reverbWetGain.gain.linearRampToValueAtTime(wet, end);

    if (auPtr.distortionRampTimer) clearInterval(auPtr.distortionRampTimer);
    var steps = Math.max(1, Math.floor(transitionMs / 120));
    var curAmt = auPtr._distortionAmt || 0;
    var step = 0;
    auPtr.distortionRampTimer = setInterval(function () {
      step++;
      var t = Math.min(1, step / steps);
      var amt = curAmt + t * (r.distortion - curAmt);
      auPtr.distortionNode.curve = makeDistortionCurve(amt);
      auPtr._distortionAmt = amt;
      if (step >= steps) {
        clearInterval(auPtr.distortionRampTimer);
        auPtr.distortionRampTimer = null;
        auPtr.distortionNode.curve = makeDistortionCurve(r.distortion);
        auPtr._distortionAmt = r.distortion;
      }
    }, Math.max(30, transitionMs / steps));
  }

  function applyEraAudio(era, transitionMs) {
    state.audio.audioParamBaseline = { era: era, kind: "era" };
    persistAudioEraForAudio();
    var base = eraRowByNum(era);
    state.audio.stressInterpActive = false;
    state.audio.lastEraStressForEvent = base.stress;
    if (state.mode === "present") {
      state.audio.audioParamBaseline = { era: 9, kind: "present" };
      persistAudioEraForAudio();
      state.audio.stressInterpActive = false;
      rampAudioRowTo(mergePresentRow(), transitionMs);
      return;
    }
    rampAudioRowTo(Object.assign({}, base), transitionMs);
  }

  function applyPresentBaselineAudio(transitionMs) {
    var row = mergePresentRow();
    state.audio.audioParamBaseline = { era: 9, kind: "present" };
    persistAudioEraForAudio();
    state.audio.stressInterpActive = false;
    rampAudioRowTo(row, transitionMs);
  }

  function maybeApplyEventStressAudio() {
    if (state.mode !== "2008" || !state.audio.graphReady) return;
    var ev = currentContextEvent();
    if (!ev || ev.stress_level == null) return;
    var base = eraRowByNum(state.currentEra);
    var diff = Math.abs(Number(ev.stress_level) - base.stress);
    if (diff <= 5) return;
    state.audio.stressInterpActive = true;
    var row = interpolateParamsForStress(ev.stress_level);
    rampAudioRowTo(row, 3000);
  }

  function touchAudioLastInteraction() {
    state.audio.lastInteraction = Date.now();
    if (!state.audio.graphReady || !state.audio.context) return;
    if (!state.audio.config.momentumFade) return;
    var ctx = state.audio.context;
    if (state.audio.enabled === false) return;
    var now = ctx.currentTime;
    var baseRow = state.mode === "present" ? mergePresentRow() : Object.assign({}, eraRowByNum(state.currentEra));
    var rEff = applyEffectsModeToRow(baseRow);
    var target = rEff.gain * volumeMultiplier();
    state.audio.gainNode.gain.cancelScheduledValues(now);
    state.audio.gainNode.gain.setValueAtTime(state.audio.gainNode.gain.value, now);
    state.audio.gainNode.gain.linearRampToValueAtTime(target, now + 2);
    state.audio._momentumFactor = 1;
  }

  function runMomentumFadeCheck() {
    var auPtr = state.audio;
    if (!auPtr.graphReady || !auPtr.context) return;
    if (!auPtr.config.momentumFade) return;
    if (Date.now() - auPtr.lastInteraction < auPtr.config.fadeDelay * 1000) return;
    if (!auPtr.gainNode) return;
    var ctx = auPtr.context;
    var now = ctx.currentTime;
    var baseRow = state.mode === "present" ? mergePresentRow() : Object.assign({}, eraRowByNum(state.currentEra));
    var rEff = applyEffectsModeToRow(baseRow);
    var low = rEff.gain * volumeMultiplier() * 0.2;
    auPtr.gainNode.gain.cancelScheduledValues(now);
    auPtr.gainNode.gain.setValueAtTime(auPtr.gainNode.gain.value, now);
    auPtr.gainNode.gain.linearRampToValueAtTime(low, now + 4);
    auPtr._momentumFactor = 0.2;
  }

  function tryLoadPieBuffer() {
    if (state.audio.buffer) return Promise.resolve();
    function decodeAb(ab) {
      var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if (!OAC) return Promise.resolve();
      var tmp = new OAC(1, 2, 44100);
      return tmp.decodeAudioData(ab.slice(0)).then(function (buf) {
        state.audio.buffer = buf;
      });
    }
    if (state.folderHandle) {
      return state.folderHandle
        .getDirectoryHandle("audio", { create: false })
        .then(function (dh) { return dh.getFileHandle("Pie.m4a", { create: false }); })
        .then(function (fh) { return fh.getFile(); })
        .then(function (file) { return file.arrayBuffer(); })
        .then(decodeAb)
        .catch(function () { return fetch("audio/Pie.m4a").then(function (r) { return r.arrayBuffer(); }).then(decodeAb).catch(function () {}); });
    }
    return fetch("audio/Pie.m4a")
      .then(function (r) { return r.arrayBuffer(); })
      .then(decodeAb)
      .catch(function () {});
  }

  function setMasterGainTarget(vol, ms) {
    var auPtr = state.audio;
    if (!auPtr.context || !auPtr.masterGainNode) return;
    var ctx = auPtr.context;
    var now = ctx.currentTime;
    var end = now + ms / 1000;
    auPtr.masterGainNode.gain.cancelScheduledValues(now);
    auPtr.masterGainNode.gain.setValueAtTime(auPtr.masterGainNode.gain.value, now);
    auPtr.masterGainNode.gain.linearRampToValueAtTime(vol, end);
  }

  function audioReEntryRampGain() {
    var auPtr = state.audio;
    if (!auPtr.graphReady || !auPtr.gainNode) return;
    if (auPtr.enabled === false) return;
    var ctx = auPtr.context;
    var now = ctx.currentTime;
    var baseRow = state.mode === "present" ? mergePresentRow() : Object.assign({}, eraRowByNum(state.currentEra));
    var rEff = applyEffectsModeToRow(baseRow);
    var mult = auPtr._momentumFactor != null && auPtr._momentumFactor < 1 ? auPtr._momentumFactor : 1;
    var target = rEff.gain * volumeMultiplier() * mult;
    auPtr.gainNode.gain.cancelScheduledValues(now);
    auPtr.gainNode.gain.setValueAtTime(auPtr.gainNode.gain.value, now);
    auPtr.gainNode.gain.linearRampToValueAtTime(target, now + 1.5);
  }

  function playbackRowForSources() {
    var row = state.mode === "present" ? mergePresentRow() : Object.assign({}, eraRowByNum(state.currentEra));
    return applyEffectsModeToRow(row);
  }

  function scheduleCrossfadeFromSegmentStart(segmentZeroCtxTime) {
    var auPtr = state.audio;
    var ctx = auPtr.context;
    if (!ctx || !auPtr.buffer) return;
    if (auPtr._xfTimer) {
      clearTimeout(auPtr._xfTimer);
      auPtr._xfTimer = null;
    }
    var fadeStart = segmentZeroCtxTime + LOOP_TRIGGER_SEC;
    if (fadeStart < ctx.currentTime + 0.05) fadeStart = ctx.currentTime + 0.05;
    var fadeEnd = fadeStart + CROSSFADE_SEC;
    var oldIsA = auPtr.activeCrossfadeSlot === 0;
    var oldGain = oldIsA ? auPtr.crossfadeGainA : auPtr.crossfadeGainB;
    var newGain = oldIsA ? auPtr.crossfadeGainB : auPtr.crossfadeGainA;
    var oldSrc = oldIsA ? auPtr.sourceA : auPtr.sourceB;
    var row = playbackRowForSources();
    var newSrc = ctx.createBufferSource();
    newSrc.buffer = auPtr.buffer;
    newSrc.loop = false;
    newSrc.playbackRate.value = row.rate;
    if (oldSrc) oldSrc.playbackRate.value = row.rate;
    newSrc.connect(newGain);
    newSrc.start(fadeStart, 0);
    if (oldIsA) auPtr.sourceB = newSrc;
    else auPtr.sourceA = newSrc;
    var now = ctx.currentTime;
    oldGain.gain.cancelScheduledValues(now);
    newGain.gain.cancelScheduledValues(now);
    oldGain.gain.setValueAtTime(1, fadeStart);
    oldGain.gain.linearRampToValueAtTime(0, fadeEnd);
    newGain.gain.setValueAtTime(0, fadeStart);
    newGain.gain.linearRampToValueAtTime(1, fadeEnd);
    if (oldSrc) {
      try {
        oldSrc.stop(fadeEnd + 0.05);
      } catch (e) {}
    }
    auPtr.activeCrossfadeSlot = oldIsA ? 1 : 0;
    var nextSegZero = fadeStart;
    var delayMs = (nextSegZero + LOOP_TRIGGER_SEC - ctx.currentTime) * 1000;
    auPtr._xfTimer = window.setTimeout(function () {
      auPtr._xfTimer = null;
      if (state.audio.context !== ctx) return;
      scheduleCrossfadeFromSegmentStart(nextSegZero);
    }, Math.max(50, delayMs));
  }

  function initAudioGraphAndStart() {
    var auPtr = state.audio;
    if (auPtr.graphReady || !auPtr.buffer) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    var ctx = new AC();
    auPtr.context = ctx;
    auPtr.suspendedByVisibility = false;

    auPtr.crossfadeGainA = ctx.createGain();
    auPtr.crossfadeGainB = ctx.createGain();
    auPtr.gainNode = ctx.createGain();
    auPtr.distortionNode = ctx.createWaveShaper();
    auPtr.distortionNode.oversample = "2x";
    auPtr.filterNode = ctx.createBiquadFilter();
    auPtr.filterNode.type = "lowpass";
    auPtr.filterNode.frequency.value = 20000;
    auPtr.reverbDryGain = ctx.createGain();
    auPtr.convolver = ctx.createConvolver();
    auPtr.reverbWetGain = ctx.createGain();
    auPtr.masterGainNode = ctx.createGain();

    auPtr.convolver.buffer = createSyntheticReverbBuffer(ctx);

    auPtr.crossfadeGainA.connect(auPtr.gainNode);
    auPtr.crossfadeGainB.connect(auPtr.gainNode);
    auPtr.gainNode.connect(auPtr.distortionNode);
    auPtr.distortionNode.connect(auPtr.filterNode);
    auPtr.filterNode.connect(auPtr.reverbDryGain);
    auPtr.filterNode.connect(auPtr.convolver);
    auPtr.convolver.connect(auPtr.reverbWetGain);
    auPtr.reverbDryGain.connect(auPtr.masterGainNode);
    auPtr.reverbWetGain.connect(auPtr.masterGainNode);
    auPtr.masterGainNode.connect(ctx.destination);

    var firstPlayDone = false;
    try {
      firstPlayDone = localStorage.getItem(LS_AUDIO_FIRST_PLAY) === "1";
    } catch (e) {}
    var rowInit = firstPlayDone
      ? state.mode === "present"
        ? mergePresentRow()
        : Object.assign({}, eraRowByNum(state.currentEra))
      : Object.assign({}, eraRowByNum(1));
    var r0 = applyEffectsModeToRow(rowInit);
    auPtr.distortionNode.curve = makeDistortionCurve(r0.distortion);
    auPtr._distortionAmt = r0.distortion;
    auPtr.filterNode.frequency.value = r0.filter;
    auPtr.reverbDryGain.gain.value = 1 - r0.reverb;
    auPtr.reverbWetGain.gain.value = r0.reverb;
    auPtr.gainNode.gain.value = 0;
    auPtr.masterGainNode.gain.value = auPtr.enabled ? 1 : 0.02;

    var resumeOffset = 0;
    try {
      var saved = parseFloat(localStorage.getItem(LS_AUDIO_POS) || "0");
      if (!isNaN(saved) && saved > 0 && saved < BUFFER_DURATION_SEC - 1) resumeOffset = saved;
    } catch (e) {}
    if (resumeOffset >= LOOP_TRIGGER_SEC) resumeOffset = 0;

    var t0 = ctx.currentTime;
    var src = ctx.createBufferSource();
    src.buffer = auPtr.buffer;
    src.loop = false;
    src.playbackRate.value = r0.rate;
    src.connect(auPtr.crossfadeGainA);
    auPtr.sourceA = src;
    auPtr.crossfadeGainA.gain.value = 1;
    auPtr.crossfadeGainB.gain.value = 0;
    auPtr.activeCrossfadeSlot = 0;
    src.start(t0, resumeOffset);
    var segmentZeroCtx = t0 - resumeOffset;
    scheduleCrossfadeFromSegmentStart(segmentZeroCtx);

    auPtr.graphReady = true;
    auPtr._momentumFactor = 1;
    ctx.onstatechange = function () {
      if (!state.audio.context || state.audio.context !== ctx) return;
      if (ctx.state === "suspended" && !state.audio.suspendedByVisibility) {
        window.setTimeout(function () {
          if (state.audio.context === ctx) ctx.resume().catch(function () {});
        }, 500);
      }
      if (ctx.state === "interrupted") {
        window.setTimeout(function () {
          if (state.audio.context === ctx) ctx.resume().catch(function () {});
        }, 500);
      }
    };
    document.addEventListener("visibilitychange", onAudioVisibilityChange);

    if (!firstPlayDone) {
      var now2 = ctx.currentTime;
      auPtr.gainNode.gain.cancelScheduledValues(now2);
      auPtr.gainNode.gain.setValueAtTime(0, now2);
      var rowTarget = applyEffectsModeToRow(Object.assign({}, eraRowByNum(1)));
      auPtr.gainNode.gain.linearRampToValueAtTime(rowTarget.gain * volumeMultiplier(), now2 + 3);
      try {
        localStorage.setItem(LS_AUDIO_FIRST_PLAY, "1");
      } catch (e2) {}
    } else {
      if (state.mode === "present") applyPresentBaselineAudio(500);
      else applyEraAudio(state.currentEra, 500);
    }

    if (!auPtr.momentumTimer)
      auPtr.momentumTimer = window.setInterval(runMomentumFadeCheck, 5000);
    if (!auPtr.positionTimer)
      auPtr.positionTimer = window.setInterval(function () {
        if (!state.audio.context || !state.audio.graphReady) return;
        try {
          var rel = state.audio.context.currentTime % BUFFER_DURATION_SEC;
          persistAudioPosition(rel);
        } catch (e) {}
      }, 10000);
  }

  function onAudioVisibilityChange() {
    var auPtr = state.audio;
    if (!auPtr.context) return;
    if (document.hidden) {
      auPtr.suspendedByVisibility = true;
      auPtr.context.suspend().catch(function () {});
    } else {
      auPtr.suspendedByVisibility = false;
      auPtr.context.resume().then(function () {
        audioReEntryRampGain();
      }).catch(function () {});
    }
  }

  function unlockAudioAndPrepare() {
    state.audio.unlocked = true;
    persistAudioUnlock();
    updateAudioToggleDom();
    tryLoadPieBuffer().then(function () {
      bindFirstUserGestureForAudio();
    });
  }

  function bindFirstUserGestureForAudio() {
    if (state.audio.gestureBound) return;
    state.audio.gestureBound = true;
    var handler = function () {
      if (!state.audio.unlocked) return;
      if (!state.audio.buffer) {
        tryLoadPieBuffer().then(function () {
          if (state.audio.buffer) tryStartAudioAfterGesture();
        });
        return;
      }
      tryStartAudioAfterGesture();
    };
    document.addEventListener(
      "pointerdown",
      function () {
        handler();
      },
      { capture: true, passive: true }
    );
  }

  function tryStartAudioAfterGesture() {
    var auPtr = state.audio;
    if (!auPtr.unlocked) return;
    if (!auPtr.enabled) return;
    if (auPtr.graphReady) {
      if (auPtr.context && auPtr.context.state === "suspended") auPtr.context.resume().catch(function () {});
      return;
    }
    if (!auPtr.buffer) return;
    initAudioGraphAndStart();
  }

  function updateAudioToggleDom() {
    var wrap = $("audio-toggle-wrap");
    var span = $("audio-toggle");
    if (!wrap || !span) return;
    if (!state.audio.unlocked) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    span.classList.toggle("off", !state.audio.enabled);
    var ph = $("audio-config-panel-holder");
    if (ph && !state.audio.configOpen) ph.innerHTML = "";
  }

  function closeAudioConfigPanel() {
    state.audio.configOpen = false;
    var ph = $("audio-config-panel-holder");
    if (ph) ph.innerHTML = "";
    document.removeEventListener("pointerdown", onDocPointerCloseAudioPanel, true);
  }

  function onDocPointerCloseAudioPanel(ev) {
    var panel = $("audio-config-panel");
    var toggle = $("audio-toggle");
    if (panel && panel.contains(ev.target)) return;
    if (toggle && toggle.contains(ev.target)) return;
    closeAudioConfigPanel();
  }

  function renderAudioConfigPanel() {
    var ph = $("audio-config-panel-holder");
    if (!ph) return;
    var c = state.audio.config;
    ph.innerHTML =
      '<div class="audio-config-panel" id="audio-config-panel" tabindex="-1">' +
      '<span class="audio-config-label">Vol</span>' +
      '<input type="range" min="0" max="100" class="audio-config-slider" id="ac-vol-inp" value="' +
      c.volume +
      '" />' +
      '<span class="audio-config-val mono" id="ac-vol-val">' + c.volume + '</span>' +
      "</div>";
    wireAudioConfigPanel();
  }

  function wireAudioConfigPanel() {
    var panel = $("audio-config-panel");
    if (!panel) return;
    panel.addEventListener("click", function (e) { e.stopPropagation(); });
    var volInp = $("ac-vol-inp");
    if (volInp) {
      volInp.addEventListener("input", function () {
        var v = parseInt(String(volInp.value), 10);
        if (isNaN(v)) return;
        state.audio.config.volume = Math.max(0, Math.min(100, v));
        var valEl = $("ac-vol-val");
        if (valEl) valEl.textContent = state.audio.config.volume;
        persistAudioConfig();
        refreshAudioFromConfig();
      });
    }
  }

  function refreshAudioFromConfig() {
    if (!state.audio.graphReady) return;
    var ms = 50;
    if (state.mode === "present") applyPresentBaselineAudio(ms);
    else applyEraAudio(state.currentEra, ms);
  }

  var audioLongPressTimer = null;
  var audioLongPressArmed = false;

  function wireAudioToggleChrome() {
    var span = $("audio-toggle");
    if (!span) return;
    var startPress = function () {
      audioLongPressArmed = false;
      audioLongPressTimer = window.setTimeout(function () {
        audioLongPressArmed = true;
        audioLongPressTimer = null;
        state.audio.configOpen = true;
        renderAudioConfigPanel();
        document.addEventListener("pointerdown", onDocPointerCloseAudioPanel, true);
      }, 500);
    };
    var endPress = function () {
      if (audioLongPressTimer) {
        clearTimeout(audioLongPressTimer);
        audioLongPressTimer = null;
      }
    };
    span.addEventListener("mousedown", startPress);
    span.addEventListener("mouseup", endPress);
    span.addEventListener("mouseleave", endPress);
    span.addEventListener("touchstart", startPress, { passive: true });
    span.addEventListener("touchend", endPress);
    span.addEventListener("click", function (e) {
      if (audioLongPressArmed) {
        e.preventDefault();
        e.stopPropagation();
        audioLongPressArmed = false;
        return;
      }
      if (!state.audio.unlocked) return;
      state.audio.enabled = !state.audio.enabled;
      persistAudioEnabled();
      updateAudioToggleDom();
      if (state.audio.enabled) {
        if (!state.audio.graphReady && state.audio.buffer) {
          initAudioGraphAndStart();
        } else if (!state.audio.graphReady) {
          tryLoadPieBuffer().then(function () {
            if (state.audio.buffer) initAudioGraphAndStart();
          });
        }
        if (state.audio.graphReady) {
          setMasterGainTarget(1, 1500);
          refreshAudioFromConfig();
        }
      } else {
        setMasterGainTarget(0.02, 2000);
      }
    });
  }

  function idbOpen() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open(IDB_NAME, 1);
      req.onerror = function () {
        reject(req.error);
      };
      req.onupgradeneeded = function () {
        req.result.createObjectStore(IDB_STORE);
      };
      req.onsuccess = function () {
        resolve(req.result);
      };
    });
  }

  function idbPutHandle(handle) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(handle, IDB_KEY_HANDLE);
        tx.oncomplete = function () {
          resolve();
          db.close();
        };
        tx.onerror = function () {
          reject(tx.error);
          db.close();
        };
      });
    });
  }

  function idbGetHandle() {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(IDB_STORE, "readonly");
        var rq = tx.objectStore(IDB_STORE).get(IDB_KEY_HANDLE);
        rq.onsuccess = function () {
          resolve(rq.result || null);
          db.close();
        };
        rq.onerror = function () {
          reject(rq.error);
          db.close();
        };
      });
    });
  }

  function simFolderKey() {
    if (state.mode === "present") return "present";
    if (state.mode === "1999" || state.mode === "2020") return state.mode;
    return "2008";
  }

  function simPath(file) {
    return ROOT + "simulations/" + simFolderKey() + "/" + file;
  }

  function simulationDataKey(file) {
    var folder = simFolderKey();
    var base = file.replace(/\.json$/i, "");
    return folder + "/" + base;
  }

  function restoreFolderHandleFromIdb() {
    if (!window.indexedDB) return Promise.resolve(null);
    return idbGetHandle().then(function (h) {
      if (!h || !h.queryPermission) return null;
      return h.queryPermission({ mode: "readwrite" }).then(function (st) {
        if (st === "granted") return h;
        if (st === "prompt") {
          return h.requestPermission({ mode: "readwrite" }).then(function (st2) {
            return st2 === "granted" ? h : null;
          });
        }
        return null;
      });
    }).catch(function () {
      return null;
    });
  }

  function tryGrantFolderOnce() {
    if (state.folderHandle) return;
    if (localStorage.getItem(LS_FS_PROMPTED) === "1") return;
    if (!window.showDirectoryPicker) return;
    localStorage.setItem(LS_FS_PROMPTED, "1");
    window
      .showDirectoryPicker({ mode: "readwrite" })
      .then(function (dir) {
        state.folderHandle = dir;
        return idbPutHandle(dir);
      })
      .catch(function () {})
      .then(function () {
        tryLoadPieBuffer();
        return readVariablesFromHandle();
      })
      .then(function (diskVars) {
        if (diskVars) {
          state.variables = mergeVariablesDisk(state.variables, diskVars);
          if ($("view-home") && !$("view-home").classList.contains("hidden")) renderHome();
        }
      })
      .catch(function () {});
  }

  function readVariablesFromHandle() {
    if (!state.folderHandle || !state.folderHandle.getDirectoryHandle) return Promise.resolve(null);
    var folder = simFolderKey();
    return state.folderHandle
      .getDirectoryHandle("simulations", { create: false })
      .then(function (sim) {
        return sim.getDirectoryHandle(folder, { create: false });
      })
      .then(function (y) {
        return y.getFileHandle("variables.json", { create: false });
      })
      .then(function (fh) {
        return fh.getFile();
      })
      .then(function (file) {
        return file.text();
      })
      .then(function (txt) {
        return JSON.parse(txt);
      })
      .catch(function () {
        return null;
      });
  }

  function writeVariablesToHandle() {
    if (!state.folderHandle || !state.folderHandle.getDirectoryHandle) return Promise.resolve();
    var folder = simFolderKey();
    var json = JSON.stringify(state.variables, null, 2);
    return state.folderHandle
      .getDirectoryHandle("simulations", { create: true })
      .then(function (sim) {
        return sim.getDirectoryHandle(folder, { create: true });
      })
      .then(function (y) {
        return y.getFileHandle("variables.json", { create: true });
      })
      .then(function (fh) {
        return fh.createWritable();
      })
      .then(function (w) {
        return w.write(json).then(function () {
          return w.close();
        });
      })
      .catch(function () {});

  }

  function loadPersistedEraState() {
    try {
      var e = parseInt(localStorage.getItem(LS_ERA) || "1", 10);
      var ev = parseInt(localStorage.getItem(LS_EVENT_IDX) || "0", 10);
      state.currentEra = e >= 1 && e <= 9 ? e : 1;
      state.currentEventIndex = ev >= 0 ? ev : 0;
    } catch (err) {
      state.currentEra = 1;
      state.currentEventIndex = 0;
    }
  }

  function saveEraState() {
    try {
      localStorage.setItem(LS_ERA, String(state.currentEra));
      localStorage.setItem(LS_EVENT_IDX, String(state.currentEventIndex));
    } catch (e) {}
  }

  function tickerLive() {
    return localStorage.getItem(LS_TICKER_LIVE) === "1";
  }

  function gaugeLive() {
    return localStorage.getItem(LS_GAUGE_LIVE) === "1";
  }

  function setTickerChromeVisible(on) {
    var tb = $("ticker-bar");
    if (tb) tb.classList.toggle("ticker-off", !on);
  }

  function setGaugeChromeVisible(on) {
    var pw = $("pressure-wrap");
    if (pw) pw.classList.toggle("gauge-off", !on);
  }

  function syncChromeTickerGauge() {
    var tl = tickerLive();
    var gl = gaugeLive();
    setTickerChromeVisible(tl);
    setGaugeChromeVisible(gl);
    var track = $("ticker-track");
    if (track) {
      track.classList.toggle("ticker-animate", tl);
      track.classList.toggle("ticker-static", !tl);
    }
    var mk = $("pressure-marker");
    if (mk && !state.skipGaugeTransition) mk.style.transition = gl ? "" : "none";
  }

  function getEraEvents(era) {
    return state.events.filter(function (ev) {
      return ev.era === era;
    });
  }

  function lastEventForEra(era) {
    var evs = getEraEvents(era);
    return evs.length ? evs[evs.length - 1] : null;
  }

  function advanceEraFromArticleCompletion(slug) {
    if (state.mode !== "2008") return;
    var last = lastEventForEra(state.currentEra);
    if (!last || last.article !== slug) return;
    if (state.currentEra >= 9) {
      state.simulationEnded = true;
      saveEraState();
      showFinalScreen();
      return;
    }
    state.currentEra += 1;
    state.currentEventIndex = 0;
    saveEraState();
    var evs = getEraEvents(state.currentEra);
    var stress = evs.length && evs[0].stress_level != null ? evs[0].stress_level : state.stressLevel;
    animateStressTo(stress);
    if (state.audio.graphReady) applyEraAudio(state.currentEra, 5000);
    renderHome();
    updateDateline();
  }

  function animateStressTo(target) {
    target = Math.max(0, Math.min(100, Number(target) || 0));
    state.skipGaugeTransition = false;
    state.stressLevel = target;
    updatePressure();
  }

  function showFinalScreen() {
    syncChromeTickerGauge();
    showView("final");
  }

  function simulationReset() {
    state.currentEra = 1;
    state.currentEventIndex = 0;
    state.simulationEnded = false;
    try {
      localStorage.removeItem(LS_ERA);
      localStorage.removeItem(LS_EVENT_IDX);
    } catch (e) {}
    saveEraState();
    $("simulation-complete-overlay").hidden = true;
    setMode("2008");
    goHome();
  }

  function loadArticlesDone() {
    try {
      return JSON.parse(localStorage.getItem(LS_ARTICLES_DONE) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function saveArticlesDone(map) {
    try {
      localStorage.setItem(LS_ARTICLES_DONE, JSON.stringify(map || {}));
    } catch (e) {}
  }

  function primaryEraFromMeta(meta) {
    var e = meta && meta.era;
    if (e == null) return 1;
    if (typeof e === "number") return e;
    if (typeof e === "string") {
      var m = e.match(/^(\d+)/);
      return m ? Number(m[1]) : 1;
    }
    return 1;
  }

  function pointsForArticleMeta(meta) {
    var pe = primaryEraFromMeta(meta);
    return pe === 3 || pe === 4 ? 3 : 1;
  }

  function componentA() {
    var done = loadArticlesDone();
    var pts = 0;
    Object.keys(MANIFEST_SLUGS).forEach(function (slug) {
      if (!done[slug]) return;
      var key = articleDataKey(slug);
      var md = data.articles[key] || data.articles[slug];
      if (!md) return;
      var meta = parseFrontmatter(md).meta;
      pts += pointsForArticleMeta(meta);
    });
    return Math.min(70, pts);
  }

  function componentB() {
    if (state.mode !== "present") return 0;
    var pts = 0;
    Object.keys(B_VAR_WEIGHTS).forEach(function (k) {
      var e = state.variables[k];
      if (e && e.confirmed === true) pts += B_VAR_WEIGHTS[k];
    });
    return Math.min(30, pts);
  }

  function presentVariablesEnteredCount() {
    var n = 0;
    Object.keys(B_VAR_WEIGHTS).forEach(function (k) {
      var e = state.variables[k];
      if (e && e.confirmed === true) n += 1;
    });
    return n;
  }

  function clarityScoreTotal() {
    return Math.min(100, componentA() + componentB());
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
      var patch = o[k];
      if (patch.value != null) out[k].value = patch.value;
      if (patch.unit != null) out[k].unit = patch.unit;
      if (patch.confirmed != null) out[k].confirmed = patch.confirmed;
      if (patch.source != null) out[k].source = patch.source;
      if (patch.last_checked != null) out[k].last_checked = patch.last_checked;
      if (patch.notes != null) out[k].notes = patch.notes;
    });
    return out;
  }

  function mergeVariablesDisk(baseObj, diskObj) {
    var out = JSON.parse(JSON.stringify(baseObj || {}));
    var d = diskObj || {};
    Object.keys(d).forEach(function (k) {
      out[k] = JSON.parse(JSON.stringify(d[k]));
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
    // Convert → **Name** connection links to tappable article links
    html = html.replace(/<p>→ <strong>([^<]+)<\/strong>/g, function (m, name) {
      var slug = name.toLowerCase().replace(/[()'']/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      if (MANIFEST_SLUGS[slug]) {
        return '<p class="concept-link-para">→ <a href="#" class="text-link concept-link" data-slug="' + slug + '">' + name + "</a>";
      }
      return m;
    });
    return html;
  }

  function renderSectionHtml(rawText, vars, editableKeys) {
    var map = buildReplaceMap(vars);
    // Replace {{var}} with \x00PHn\x00 placeholders first so bold markers
    // like **{{coverage_days}} days** survive the markdown pass intact.
    var placeholders = [];
    var withPH = rawText.replace(/\{\{(\w+)\}\}/g, function (_, key) {
      var display = map[key] != null ? map[key] : "—";
      var canEdit = editableKeys.indexOf(key) !== -1;
      var span = canEdit
        ? '<button type="button" class="var-inline" data-var="' + key + '">' + display + "</button>"
        : '<span class="var-wrap" data-var="' + key + '">' + display + "</span>";
      placeholders.push(span);
      return "\x00PH" + (placeholders.length - 1) + "\x00";
    });
    var html = mdInlineToHtml(withPH);
    html = html.replace(/\x00PH(\d+)\x00/g, function (_, idx) {
      return placeholders[parseInt(idx, 10)];
    });
    return html;
  }

  function staticTickerIllustrationHtml() {
    return (
      '<div class="static-ticker-illustration" aria-hidden="true">' +
      '<div class="static-ticker-inner">' +
      '<span class="ticker-item"><span class="ticker-dot" style="background:var(--winner)"></span>Winner · Building runway with high-yield savings.</span>' +
      '<span class="ticker-item"><span class="ticker-dot" style="background:var(--weatherer)"></span>Weatherer · Watching headlines. Holding steady.</span>' +
      '<span class="ticker-item"><span class="ticker-dot" style="background:var(--unaware)"></span>Unaware · No change to routine.</span>' +
      '<span class="ticker-item"><span class="ticker-dot" style="background:var(--gambler-lost)"></span>Gambler− · Considering positions.</span>' +
      '<span class="ticker-item"><span class="ticker-dot" style="background:var(--gambler-won)"></span>Gambler+ · Considering positions.</span>' +
      "</div></div>"
    );
  }

  function staticGaugeIllustrationHtml() {
    return (
      '<div class="static-gauge-illustration" aria-hidden="true">' +
      '<div class="static-gauge-track"><div class="static-gauge-gradient"></div>' +
      '<div class="static-gauge-marker"></div></div>' +
      '<div class="static-gauge-labels"><span>Calm</span><span>Crisis</span></div>' +
      "</div>"
    );
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

  function loadSimulationBundle() {
    loadPersistedEraState();
    var overrides = loadLocalOverrides()[state.mode] || {};
    var base = data.simulations[simulationDataKey("variables.json")];
    var merged;
    if (base) {
      merged = JSON.parse(JSON.stringify(base));
      merged = mergeVariables(merged, overrides);
    } else {
      merged = mergeVariables({}, overrides);
    }
    state.variables = merged;
    var ev = data.simulations[simulationDataKey("events.json")];
    state.events = Array.isArray(ev) ? ev : [];
    syncEventStress();
    var dyk = data.simulations[simulationDataKey("did-you-know.json")];
    state.didYouKnow = dyk || [];
    var gt = data.simulations[simulationDataKey("ghost-tracks.json")];
    state.ghostTracks = gt || {};
    loadConceptsFromStorage();
    hydrateDiskVariables(overrides);
    maybeApplyEventStressAudio();
  }

  function hydrateDiskVariables(overrides) {
    if (!state.folderHandle) return;
    readVariablesFromHandle().then(function (disk) {
      if (!disk || typeof disk !== "object") return;
      var base = data.simulations[simulationDataKey("variables.json")] || {};
      var merged = JSON.parse(JSON.stringify(base));
      merged = mergeVariablesDisk(merged, disk);
      merged = mergeVariables(merged, overrides || {});
      state.variables = merged;
      if ($("view-home") && !$("view-home").classList.contains("hidden")) renderHome();
      if ($("view-article") && !$("view-article").classList.contains("hidden") && state.currentArticle)
        renderArticleSection();
      updateNavClarity();
    });
  }

  function syncEventStress() {
    if (state.mode !== "2008") {
      var sv = getRawValue("stress_level", state.variables);
      if (sv != null && !isNaN(Number(sv))) state.stressLevel = Number(sv);
      return;
    }
    var evs = getEraEvents(state.currentEra);
    if (!evs.length) return;
    var idx = Math.min(state.currentEventIndex, evs.length - 1);
    var ev = evs[idx];
    if (ev && ev.stress_level != null) state.stressLevel = ev.stress_level;
  }

  function persistVariable(key, value) {
    var all = loadLocalOverrides();
    if (!all[state.mode]) all[state.mode] = {};
    var prev = state.variables[key] || {};
    var unit = prev.unit != null ? prev.unit : "dollars";
    var entry = {
      value: value,
      unit: unit,
      confirmed: true,
      source: "user",
      last_checked: new Date().toISOString().slice(0, 10),
      notes: prev.notes != null ? prev.notes : "",
    };
    all[state.mode][key] = Object.assign({}, prev, entry);
    saveLocalOverrides(all);
    if (!state.variables[key]) state.variables[key] = {};
    Object.assign(state.variables[key], entry);
    writeVariablesToHandle();
    updateNavClarity();
    touchAudioLastInteraction();
    if (state.audio.graphReady && key === "stress_level" && state.mode === "present") {
      applyPresentBaselineAudio(3000);
    }
  }

  function updateDateline() {
    var el = $("dateline-text");
    if (!el) return;
    var d = new Date();
    if (state.mode === "2008") {
      var evs = getEraEvents(state.currentEra);
      if (evs.length) {
        var idx = Math.min(state.currentEventIndex, evs.length - 1);
        el.textContent = String(evs[idx].date || "").toUpperCase();
        return;
      }
    }
    el.textContent = d
      .toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toUpperCase();
  }

  function updatePressure() {
    var m = $("pressure-marker");
    if (!m) return;
    if (state.skipGaugeTransition) {
      m.style.transition = "none";
    }
    var pct = Math.max(0, Math.min(100, state.stressLevel));
    m.style.left = "calc(" + pct + "% - 5px)";
    if (state.skipGaugeTransition) {
      void m.offsetWidth;
      m.style.transition = "";
      state.skipGaugeTransition = false;
    }
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

  function currentContextEvent() {
    if (state.mode !== "2008") return null;
    var evs = getEraEvents(state.currentEra);
    if (!evs.length) return null;
    var idx = Math.min(state.currentEventIndex, evs.length - 1);
    return evs[idx];
  }

  function currentGhostLogEntries() {
    var ce = currentContextEvent();
    var date = ce && ce.date ? ce.date : "January 2008";
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

  function eraDateLabel(era) {
    var evs = getEraEvents(era);
    return evs.length ? evs[0].date : "2008";
  }

  function getHomeNewsEvents() {
    if (state.mode !== "2008") return [];
    var out = [];
    for (var e = state.currentEra; e <= 9 && out.length < 7; e++) {
      out = out.concat(getEraEvents(e));
    }
    return out.slice(0, 7);
  }

  function renderHome() {
    var newsTitle = $("in-the-news-title");
    if (newsTitle) {
      if (state.mode === "present") newsTitle.textContent = "In the news — Your feed";
      else if (state.mode === "2008")
        newsTitle.textContent = "In the news — " + eraDateLabel(state.currentEra);
      else newsTitle.textContent = "In the news";
    }
    var newsList = $("in-the-news-list");
    if (newsList) {
      newsList.innerHTML = "";
      if (state.mode !== "present" && (!state.events || !state.events.length)) {
        var li0 = document.createElement("li");
        li0.textContent =
          "No simulation data yet for this year. Use the built 2008 arc to see how feeds are authored, or add events.json here.";
        newsList.appendChild(li0);
      } else {
        var evs =
          state.mode === "2008"
            ? getHomeNewsEvents()
            : state.events.length
              ? state.events.slice(0, 7)
              : fallbackNews();
        evs.forEach(function (e, i) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = "#";
          a.textContent = e.headline || e.ticker_text || "Event";
          a.addEventListener("click", function (evt) {
            evt.preventDefault();
            if (state.mode === "2008") state.currentEventIndex = i;
            saveEraState();
            syncEventStress();
            maybeApplyEventStressAudio();
            touchAudioLastInteraction();
            if (e.article) openArticle(e.article);
          });
          li.appendChild(a);
          newsList.appendChild(li);
        });
      }
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
    if (state.audio.graphReady) {
      if (state.mode === "present") applyPresentBaselineAudio(5000);
      else applyEraAudio(state.currentEra, 5000);
    }
    renderHome();
    syncChromeTickerGauge();
    if ($("view-article") && !$("view-article").classList.contains("hidden")) {
      if (state.currentArticle && state.currentArticle.indexOf("worksheet:") === 0) {
        openWorksheet(state.currentArticle.slice(10));
      } else if (state.currentArticle) openArticle(state.currentArticle);
    }
  }

  function showView(name) {
    ["view-home", "view-article", "view-ghost", "view-clarity", "view-stub", "view-final"].forEach(
      function (id) {
        var el = $(id);
        if (!el) return;
        el.classList.toggle("hidden", id !== "view-" + name && !(id === "view-stub" && name === "stub"));
      }
    );
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
    }
  }

  function openArticle(slug) {
    touchAudioLastInteraction();
    document.body.classList.remove("view-worksheet");
    var margin = $("article-margin");
    if (margin) margin.classList.remove("hidden");
    var ind0 = $("section-indicator");
    if (ind0) ind0.classList.remove("hidden");
    var next0 = $("article-next");
    if (next0) next0.classList.remove("hidden");
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
    if (state.currentArticle === "federal-reserve") {
      if (state.currentSection >= 1) localStorage.setItem(LS_SAW_TICKER_ILLU, "1");
      if (state.currentSection >= 2) localStorage.setItem(LS_SAW_GAUGE_ILLU, "1");
    }
    var keys = extractEditableKeys(sec.text);
    var html = renderSectionHtml(sec.text, state.variables, keys);
    html = html.split("[[STATIC_TICKER]]").join(staticTickerIllustrationHtml());
    html = html.split("[[STATIC_GAUGE]]").join(staticGaugeIllustrationHtml());
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
    // Wire → **Article** concept links
    if (body) {
      body.querySelectorAll(".concept-link").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var slug = a.getAttribute("data-slug");
          if (slug) openArticle(slug);
        });
      });
    }
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
    touchAudioLastInteraction();
    var slug = state.currentArticle;
    var prevSec = state.currentSection;
    if (slug === "federal-reserve" && !tickerLive() && prevSec >= 1) {
      var t = parseInt(localStorage.getItem(LS_TICKER_AFTER) || "0", 10) + 1;
      localStorage.setItem(LS_TICKER_AFTER, String(t));
      if (t >= 2) {
        localStorage.setItem(LS_TICKER_LIVE, "1");
        syncChromeTickerGauge();
        renderTicker();
      }
    }
    if (state.currentSection < state.sections.length - 1) {
      state.currentSection += 1;
      state.revealOpen = false;
      renderArticleSection();
    } else {
      markArticleComplete();
      if (state.simulationEnded) return;
      goHome();
    }
  }

  function markArticleComplete() {
    var firstFullArticleEver = localStorage.getItem(LS_FIRST_DONE) !== "1";
    localStorage.setItem(LS_FIRST_DONE, "1");
    revealNavIfNeeded();
    if (Array.isArray(state.meta.concepts)) {
      state.meta.concepts.forEach(function (c) {
        state.conceptsRead[c] = Math.min(100, (state.conceptsRead[c] || 0) + 20);
      });
      saveConcepts();
    }
    var slug = state.currentArticle;
    if (slug && MANIFEST_SLUGS[slug]) {
      var d = loadArticlesDone();
      d[slug] = true;
      saveArticlesDone(d);
    }
    if (localStorage.getItem(LS_SAW_GAUGE_ILLU) === "1" && !gaugeLive()) {
      var g = parseInt(localStorage.getItem(LS_GAUGE_AFTER) || "0", 10) + 1;
      localStorage.setItem(LS_GAUGE_AFTER, String(g));
      if (g >= 3) {
        localStorage.setItem(LS_GAUGE_LIVE, "1");
        syncChromeTickerGauge();
        syncEventStress();
        updatePressure();
      }
    }
    advanceEraFromArticleCompletion(slug);
    updateNavClarity();
    if (firstFullArticleEver) unlockAudioAndPrepare();
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

  function updateNavClarity() {
    var n = $("nav-clarity-num");
    if (n) n.textContent = String(clarityScoreTotal());
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
      "Persistence: localStorage overlays bundled JSON; File System Access API also writes simulations/[mode]/variables.json when a folder permission is granted.",
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
      var ce = currentContextEvent();
      meta.textContent =
        (ce && ce.date) ||
        "March 2008 · Age 28 · Renting";
    }
    if (logEl && track && track.log) {
      logEl.innerHTML = track.log
        .map(function (entry) {
          var stats = "";
          if (entry.net_worth != null || entry.cash != null) {
            var parts = [];
            if (entry.net_worth != null) parts.push("NW " + fmtMoney(entry.net_worth));
            if (entry.cash != null) parts.push("Cash " + fmtMoney(entry.cash));
            if (entry.coverage_days != null) parts.push(Math.round(entry.coverage_days) + " days coverage");
            if (entry.credit_card_debt != null && entry.credit_card_debt > 0)
              parts.push("CC debt " + fmtMoney(entry.credit_card_debt));
            stats =
              '<div class="ghost-entry-stats mono">' +
              parts.join(" · ") +
              "</div>";
          }
          var thinking = entry.thinking
            ? '<div class="ghost-entry-thinking">"' + entry.thinking.replace(/</g, "&lt;") + '"</div>'
            : "";
          return (
            '<div class="ghost-entry"><div class="ghost-entry-date">' +
            (entry.date || "").replace(/</g, "&lt;") +
            '</div><div class="ghost-entry-body">' +
            (entry.action || "").replace(/</g, "&lt;") +
            thinking +
            stats +
            "</div></div>"
          );
        })
        .join("");
    } else if (logEl) logEl.innerHTML = "<p>No log yet.</p>";
    showView("ghost");
  }

  function goHome() {
    document.body.classList.remove("view-worksheet");
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
    document.body.classList.remove("view-worksheet");
    var lede = $("clarity-lede");
    var bars = $("clarity-bars");
    var nx = $("clarity-next");
    var applied = $("clarity-applied");
    var score = clarityScoreTotal();
    var a = componentA();
    var b = componentB();
    if (lede) {
      lede.innerHTML =
        "Score: <strong>" +
        score +
        " / 100</strong> (concepts " +
        a +
        " + applied " +
        b +
        ").<br/>Every finished article and every confirmed real variable moves the number.";
    }
    var catalog = [
      { k: "emergency-fund", label: "Emergency funds" },
      { k: "burn-rate", label: "Burn rate" },
      { k: "checking-vs-savings", label: "Checking vs savings" },
      { k: "federal-reserve", label: "Federal Reserve" },
      { k: "taxes-when-laid-off", label: "Taxes when laid off" },
      { k: "index-funds", label: "Index funds" },
      { k: "inflation-mechanics", label: "Inflation" },
      { k: "reading-your-documents", label: "Reading documents" },
    ];
    var done = loadArticlesDone();
    var fillUniform = Math.min(10, Math.round((a / 70) * 10));
    if (bars) {
      bars.innerHTML = catalog
        .map(function (row) {
          var filled = done[row.k] ? 10 : fillUniform;
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
    var entered = presentVariablesEnteredCount();
    if (applied) {
      var pf = Math.min(10, Math.round((entered / 17) * 10));
      var abar = "█".repeat(pf) + "░".repeat(10 - pf);
      applied.innerHTML =
        "<h3 class=\"margin-heading\">Applied to your life</h3><hr />" +
        "<p>" +
        entered +
        " of 17 variables entered in Present mode (confirmed).</p>" +
        '<div class="clarity-row"><div class="mono">' +
        abar +
        "</div></div>";
    }
    if (nx) {
      nx.innerHTML =
        'Next concept that will move your score the most:<br/>→ <a href="#" class="text-link" id="clarity-next-link">Burn Rate</a>';
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

  function openWorksheet(slug) {
    document.body.classList.add("view-worksheet");
    var md = data.worksheets && data.worksheets[slug];
    if (!md) {
      openStub("Worksheet", "emergency-fund");
      return;
    }
    var parsed = parseFrontmatter(md);
    state.sections = splitSections(parsed.body);
    if (!state.sections.length) state.sections = [{ title: "Worksheet", text: parsed.body }];
    state.currentArticle = "worksheet:" + slug;
    state.currentSection = 0;
    var body = $("article-body");
    var fullHtml = state.sections
      .map(function (s) {
        return (
          "<h2 class=\"worksheet-h2\">" +
          s.title.replace(/</g, "&lt;") +
          "</h2>" +
          mdInlineToHtml(s.text)
        );
      })
      .join("");
    if (body) body.innerHTML = fullHtml;
    var ind = $("section-indicator");
    if (ind) ind.classList.add("hidden");
    var next = $("article-next");
    if (next) next.classList.add("hidden");
    var rev = $("reveal-toggle");
    if (rev) rev.classList.add("hidden");
    var margin = $("article-margin");
    if (margin) margin.classList.add("hidden");
    var title = $("article-title");
    if (title) title.textContent = slug.replace(/-/g, " ");
    var meta = $("article-meta");
    if (meta) meta.textContent = "Printable worksheet";
    showView("article");
    updateDateline();
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
    var fr = $("final-start-over");
    var fp = $("final-switch-present");
    if (sr) sr.addEventListener("click", simulationReset);
    if (fr) fr.addEventListener("click", simulationReset);
    if (sp) {
      sp.addEventListener("click", function () {
        $("simulation-complete-overlay").hidden = true;
        setMode("present");
      });
    }
    if (fp) {
      fp.addEventListener("click", function () {
        setMode("present");
        goHome();
      });
    }
    var ws1 = $("worksheet-simulation-research");
    var ws2 = $("worksheet-real-life-snapshot");
    if (ws1) {
      ws1.addEventListener("click", function (e) {
        e.preventDefault();
        openWorksheet("simulation-research");
      });
    }
    if (ws2) {
      ws2.addEventListener("click", function (e) {
        e.preventDefault();
        openWorksheet("real-life-snapshot");
      });
    }
    if (window.matchMedia) {
      window.matchMedia("(max-width: 900px)").addEventListener("change", function () {
        revealNavIfNeeded();
      });
    }
    wireAudioToggleChrome();
  }

  function init() {
    hydrateAudioFromStorage();
    bindChrome();
    updateAudioToggleDom();
    if (state.audio.unlocked && state.audio.enabled) bindFirstUserGestureForAudio();
    loadPersistedEraState();
    syncChromeTickerGauge();
    restoreFolderHandleFromIdb()
      .then(function (h) {
        state.folderHandle = h;
        if (h) tryLoadPieBuffer();
        tryGrantFolderOnce();
        revealNavIfNeeded();
        updateNavClarity();
        setMode("2008");
        if (gaugeLive()) {
          state.skipGaugeTransition = true;
          syncEventStress();
          updatePressure();
        }
      })
      .catch(function () {
        revealNavIfNeeded();
        updateNavClarity();
        setMode("2008");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
