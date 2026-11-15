/* Shared script for the redesigned <app>.kingpindev.com sites (Mixora, LunaDock): language redirect, menu, reveal, counters,
   hero tilt, spotlight tiles, FAQ animation, screenshot gallery, live demo mounting and press-kit copy buttons. */
(function () {
  "use strict";
  var body = document.body, doc = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Language: a first-time visitor who lists Turkish (or is on Turkish time) is sent to /tr/ once; after that links are followed as they are.
  try {
    var saved = localStorage.getItem("kpd-lang"), here = body.dataset.lang;
    var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).join(",");
    var tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* ignore */ }
    var turkish = /(^|,)tr\b/i.test(langs) || /^(Europe|Asia)\/Istanbul$/.test(tz);
    if (!saved && here === "en" && turkish && !/bot|crawl|spider/i.test(navigator.userAgent)) {
      localStorage.setItem("kpd-lang", "tr"); location.replace(body.dataset.other); return;
    }
  } catch (e) { /* storage blocked: stay here */ }
  document.querySelectorAll("[data-lang-switch]").forEach(function (a) {
    a.addEventListener("click", function () { try { localStorage.setItem("kpd-lang", a.dataset.langSwitch); } catch (e) { /* ignore */ } });
  });

  // Burger menu
  var burger = document.getElementById("burger"), links = document.getElementById("navlinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open"); burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) { if (!links.contains(e.target) && !burger.contains(e.target)) { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  }

  // Reveal on scroll (content is visible by default without JS)
  var rv = [].slice.call(document.querySelectorAll(".rv, .steps3"));
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  // Counters in the stats band
  var counters = [].slice.call(document.querySelectorAll("[data-count]"));
  function countUp(el) {
    var end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = null, dur = 1100;
    if (reduce || !end) { el.textContent = end + suf; return; }
    (function step(t) { if (t0 === null) t0 = t; var p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(performance.now());
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }); }, { threshold: .6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else counters.forEach(function (c) { c.textContent = c.dataset.count + (c.dataset.suffix || ""); });

  // Spotlight on tiles
  if (matchMedia("(hover:hover)").matches) {
    document.querySelectorAll(".tile").forEach(function (t) {
      t.addEventListener("pointermove", function (e) { var r = t.getBoundingClientRect(); t.style.setProperty("--mx", (e.clientX - r.left) + "px"); t.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    });
  }

  // Hero stage: tilts flat as it scrolls into view
  var stage = document.querySelector(".stage .stage-frame");
  if (stage && !reduce) {
    var tick = false;
    var upd = function () { tick = false; var r = stage.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - r.top / (innerHeight * .9))); stage.style.setProperty("--tilt", (10 * (1 - p)).toFixed(2) + "deg"); stage.style.setProperty("--sc", (0.94 + .06 * p).toFixed(3)); };
    addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  }

  // FAQ: smooth open and close
  document.querySelectorAll("details").forEach(function (d) {
    var s = d.querySelector("summary"), p = d.querySelector("p");
    if (!s || !p) return;
    var anim = null;
    s.addEventListener("click", function (e) {
      if (reduce || !d.animate) return;
      e.preventDefault();
      if (anim) anim.cancel();
      if (!d.open) {
        d.open = true; d.classList.remove("closing");
        anim = p.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" });
      } else {
        d.classList.add("closing");
        anim = p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease-out" });
        anim.onfinish = function () { d.open = false; d.classList.remove("closing"); };
      }
    });
  });

  // Screenshot gallery
  var gal = document.querySelector(".gal");
  if (gal) {
    var tabs = [].slice.call(gal.querySelectorAll(".gtab")), imgs = [].slice.call(gal.querySelectorAll(".gshot img")), pb = gal.querySelector(".gpause");
    var cur = 0, timer = null, userPaused = false, hover = false, vis = true, DUR = 6000;
    var show = function (i) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) { var on = k === cur; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; t.classList.remove("run"); });
      imgs.forEach(function (im, k) { im.classList.toggle("on", k === cur); });
      var t = tabs[cur]; void t.offsetWidth; if (timer) t.classList.add("run");
      if (gal.querySelector(".gtabs").scrollWidth > gal.querySelector(".gtabs").clientWidth) t.scrollIntoView({ block: "nearest", inline: "center" });
    };
    var stop = function () { if (timer) { clearTimeout(timer); timer = null; } tabs.forEach(function (t) { t.classList.remove("run"); }); };
    var arm = function () { stop(); if (reduce || userPaused || hover || !vis || document.hidden) return; timer = setTimeout(function () { show(cur + 1); arm(); }, DUR); tabs[cur].classList.add("run"); };
    gal.style.setProperty("--gdur", DUR + "ms");
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); arm(); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, j = -1;
        if (k === "ArrowDown" || k === "ArrowRight") j = cur + 1; else if (k === "ArrowUp" || k === "ArrowLeft") j = cur - 1; else if (k === "Home") j = 0; else if (k === "End") j = tabs.length - 1;
        if (j >= 0) { e.preventDefault(); show(j); tabs[cur].focus(); arm(); }
      });
    });
    if (pb) pb.addEventListener("click", function () { userPaused = !userPaused; pb.setAttribute("aria-pressed", userPaused ? "true" : "false"); pb.querySelector("span").textContent = pb.getAttribute(userPaused ? "data-play" : "data-pause"); arm(); });
    gal.addEventListener("mouseenter", function () { hover = true; stop(); }); gal.addEventListener("mouseleave", function () { hover = false; arm(); });
    document.addEventListener("visibilitychange", arm);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; arm(); }).observe(gal);
    show(0); arm();
  }

  // Live demos: script demos mount into the box (those marked lazy only when they come near the screen), framed demos are laid out at their own size and scaled to the column
  document.querySelectorAll(".demo-script").forEach(function (box) {
    var opts = JSON.parse(box.dataset.opts || "{}");
    var mount = function () { var api = window[box.dataset.api]; if (!api) return false; var el = document.createElement("div"); box.appendChild(el); box.__api = api.mount(el, opts); return true; };
    var go = function () { if (!mount()) addEventListener("load", mount, { once: true }); };
    if (box.hasAttribute("data-lazy") && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { o.disconnect(); go(); } }, { rootMargin: "500px 0px" }).observe(box);
    } else go();
  });
  var frames = [].slice.call(document.querySelectorAll(".demo-frame"));
  var fit = function () { frames.forEach(function (box) { var f = box.querySelector("iframe"), w = +box.dataset.w, h = +box.dataset.h, k = Math.min(1, box.clientWidth / w); f.style.transform = "scale(" + k + ")"; box.style.height = Math.round(h * k) + "px"; }); };
  if (frames.length) {
    fit(); addEventListener("resize", fit);
    if ("ResizeObserver" in window) frames.forEach(function (box) { new ResizeObserver(function () { if (box.clientWidth !== box.__w) { box.__w = box.clientWidth; fit(); } }).observe(box); });
    frames.forEach(function (box) { var f = box.querySelector("iframe"); if (f) f.addEventListener("load", fit); });
  }



  // Framed demos that are the real app UI (Aurora, SpotiDrop, vOrganizer): a scene step clicks a button by its label or selector, or types into a field
  function frameDo(w, d) {
    var doc = w.document;
    var visible = function (e) { return e.getClientRects().length > 0; };
    if (d.clickText) {
      var all = [].slice.call(doc.querySelectorAll("button,a,[role=button],[role=tab]")).filter(function (e) { var tx = (e.innerText || "").replace(/\s+/g, " ").trim(); return visible(e) && (d.starts ? tx.indexOf(d.clickText) === 0 : tx === d.clickText); });
      if (all[d.nth || 0]) all[d.nth || 0].click();
    }
    if (d.click) { var el = doc.querySelector(d.click); if (el) el.click(); }
    if (d.type) {
      var inp = doc.querySelector(d.type.sel); if (inp) {
        var setter = Object.getOwnPropertyDescriptor(w.HTMLInputElement.prototype, "value").set; setter.call(inp, d.type.value);
        inp.dispatchEvent(new w.Event("input", { bubbles: true }));
      }
    }
  }
  // Scene player: a scene is a list of [delay ms, state] steps applied to a live demo (script demo with apply(), the LunaDock studio, or a real-UI frame)
  function player(box, kind, scenes) {
    var timers = [];
    function apply(d) {
      try {
        if (kind === "script") { if (box.__api && box.__api.apply) box.__api.apply(d); }
        else { var w = box.querySelector("iframe").contentWindow; if (w && w.LunaDockDemo) w.LunaDockDemo.set(d); else if (w) frameDo(w, d); }
      } catch (e) { /* demo not ready yet */ }
    }
    function isReady() {
      if (kind === "script") return !!(box.__api && box.__api.apply);
      var f = box.querySelector("iframe"), w = f && f.contentWindow;
      try { return !!(w && (w.LunaDockDemo || (w.document && w.document.readyState === "complete"))); } catch (e) { return false; }
    }
    return {
      run: function (i) { timers.forEach(clearTimeout); timers = []; (scenes[i] || []).forEach(function (st) { timers.push(setTimeout(function () { apply(st[1]); }, st[0])); }); },
      ready: function (cb, tries) { var self = this; tries = tries || 0; if (isReady()) cb(); else if (tries < 80) setTimeout(function () { self.ready(cb, tries + 1); }, 250); }
    };
  }

  // Feature explorer: each tab drives the live demo into its scene
  var ex = document.getElementById("explorer");
  if (ex) {
    var etabs = [].slice.call(ex.querySelectorAll(".tab")), ep = player(ex.querySelector(".demo-box"), ex.dataset.kind, JSON.parse(ex.dataset.scenes || "[]")), ecur = 0, started = false;
    var pick = function (i, focus) {
      ecur = i;
      etabs.forEach(function (t, k) { var on = k === i; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; });
      if (focus) etabs[i].focus();
      ep.run(i);
    };
    etabs.forEach(function (t, i) {
      t.addEventListener("click", function () { pick(i, false); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, j = -1, n = etabs.length;
        if (k === "ArrowDown" || k === "ArrowRight") j = (i + 1) % n; else if (k === "ArrowUp" || k === "ArrowLeft") j = (i - 1 + n) % n; else if (k === "Home") j = 0; else if (k === "End") j = n - 1;
        if (j >= 0) { e.preventDefault(); pick(j, true); }
      });
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es, o) { if (es[0].isIntersecting && !started) { started = true; o.disconnect(); ep.ready(function () { ep.run(ecur); }); } }, { threshold: .25 }).observe(ex);
    else ep.ready(function () { ep.run(0); });
  }

  // How it works: a scroll story. The demo stays pinned while the steps scroll past, and each step puts it into its scene.
  var story = document.getElementById("story");
  if (story) {
    var sp = player(story.querySelector(".demo-box"), story.dataset.kind, JSON.parse(story.dataset.scenes || "[]")), map = JSON.parse(story.dataset.map || "[]");
    var steps = [].slice.call(story.querySelectorAll(".sstep2")), scur = -1;
    var setStep = function (i) {
      if (i === scur) return; scur = i;
      steps.forEach(function (s, k) { s.classList.toggle("on", k === i); });
      sp.ready(function () { sp.run(map[i]); });
    };
    if ("IntersectionObserver" in window) {
      var sio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setStep(steps.indexOf(e.target)); }); }, { rootMargin: "-42% 0px -42% 0px" });
      steps.forEach(function (s) { sio.observe(s); });
    } else setStep(0);
    steps.forEach(function (s, i) { s.addEventListener("click", function () { scur = -1; setStep(i); }); });
  }

  // Press kit: copy buttons
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.dataset.copy); if (!el) return;
      var label = btn.textContent, done = function () { btn.textContent = body.dataset.copied || "Copied"; setTimeout(function () { btn.textContent = label; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(el.textContent.trim()).then(done, done);
      else { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); try { document.execCommand("copy"); } catch (x) { /* ignore */ } done(); }
    });
  });
})();
