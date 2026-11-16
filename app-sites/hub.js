/* apps.kingpindev.com hub (concept): the live app switcher and the grid filter. Loaded together with v2.js. */
(function () {
  "use strict";
  var lang = document.body.dataset.lang || "en";

  // Live app switcher: each tab runs that app's real demo in the stage. Demos mount once and are kept (hidden) so switching back is instant.
  var sw = document.getElementById("switcher");
  if (sw) {
    var apps = JSON.parse(sw.dataset.apps), tabs = [].slice.call(sw.querySelectorAll(".hubtab")), frame = document.getElementById("hubframe"), note = document.getElementById("hubnote");
    var boxes = {}, scripts = {}, cur = -1;
    var loadScript = function (src) {
      if (scripts[src]) return scripts[src];
      scripts[src] = new Promise(function (res) { var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = res; document.head.appendChild(s); });
      return scripts[src];
    };
    var fit = function (box) {
      var f = box.querySelector("iframe"); if (!f) return;
      var w = +box.dataset.w, h = +box.dataset.h, k = Math.min(1, box.clientWidth / w);
      f.style.transform = "scale(" + k + ")"; box.style.height = Math.round(h * k) + "px";
    };
    var build = function (i) {
      var a = apps[i], box = document.createElement("div");
      box.className = "demo-box"; box.setAttribute("data-slug", a.slug);
      if (a.kind === "script") {
        box.classList.add("demo-script"); frame.appendChild(box);
        loadScript(a.src).then(function () { var api = window[a.api]; if (api) { var el = document.createElement("div"); box.appendChild(el); api.mount(el, a.opts); } });
      } else {
        box.classList.add("demo-frame"); box.dataset.w = a.w; box.dataset.h = a.h;
        var f = document.createElement("iframe");
        f.src = a.src + (a.lang ? (a.src.indexOf("?") > -1 ? "&" : "?") + "lang=" + lang : "");
        f.width = a.w; f.height = a.h; f.title = a.name; f.addEventListener("load", function () { fit(box); });
        box.appendChild(f); frame.appendChild(box); fit(box);
        if ("ResizeObserver" in window) new ResizeObserver(function () { if (box.clientWidth !== box.__w) { box.__w = box.clientWidth; fit(box); } }).observe(box);
      }
      boxes[i] = box; return box;
    };
    var show = function (i, focus) {
      if (i === cur) { if (focus) tabs[i].focus(); return; }
      cur = i;
      tabs.forEach(function (t, k) { var on = k === i; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; });
      if (focus) tabs[i].focus();
      Object.keys(boxes).forEach(function (k) { boxes[k].style.display = +k === i ? "" : "none"; });
      if (!boxes[i]) build(i); else { boxes[i].style.display = ""; fit(boxes[i]); }
      note.textContent = apps[i].note;
      frame.style.setProperty("--glow1", "rgba(" + apps[i].rgb1 + ",.32)"); frame.style.setProperty("--glow2", "rgba(" + apps[i].rgb2 + ",.24)");
    };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i, false); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, j = -1, n = tabs.length;
        if (k === "ArrowDown" || k === "ArrowRight") j = (i + 1) % n; else if (k === "ArrowUp" || k === "ArrowLeft") j = (i - 1 + n) % n; else if (k === "Home") j = 0; else if (k === "End") j = n - 1;
        if (j >= 0) { e.preventDefault(); show(j, true); }
      });
    });
    addEventListener("resize", function () { Object.keys(boxes).forEach(function (k) { fit(boxes[k]); }); });
    // the first demo loads when the section comes near the screen
    var first = function () { if (cur === -1) show(0, false); };
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { o.disconnect(); first(); } }, { rootMargin: "400px 0px" }).observe(sw); else first();
  }

  // Grid filter
  var chips = [].slice.call(document.querySelectorAll(".hubfilter .chipb")), cards = [].slice.call(document.querySelectorAll(".acard"));
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.toggle("on", x === c); });
      var f = c.dataset.f; cards.forEach(function (card) { card.classList.toggle("hide", f !== "all" && card.dataset.type !== f); });
    });
  });
})();
