/* Shared script for the <app>.kingpindev.com sites: mounts the live demo, scales the
   framed demos to the column, and remembers the visitor's language. */
(function () {
  "use strict";
  const body = document.body;

  // Language: on the first visit, a visitor who lists Turkish among their languages or is
  // on Türkiye time is sent to /tr/ once.
  // After that (or after any click on the switch) links are followed as they are.
  try {
    const saved = localStorage.getItem("kpd-lang");
    const here = body.dataset.lang;
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).join(",");
    let tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* ignore */ }
    const turkish = /(^|,)tr\b/i.test(langs) || /^(Europe|Asia)\/Istanbul$/.test(tz);
    if (!saved && here === "en" && turkish && !/bot|crawl|spider/i.test(navigator.userAgent)) {
      localStorage.setItem("kpd-lang", "tr");
      location.replace(body.dataset.other);
      return;
    }
  } catch (e) { /* storage blocked: stay on this page */ }
  document.querySelectorAll("[data-lang-switch]").forEach((a) => a.addEventListener("click", () => {
    try { localStorage.setItem("kpd-lang", a.dataset.langSwitch); } catch (e) { /* ignore */ }
  }));

  // Script demos: wait for the demo's script, then mount it into the box.
  document.querySelectorAll(".demo-script").forEach((box) => {
    const opts = JSON.parse(box.dataset.opts || "{}");
    const mount = () => {
      const api = window[box.dataset.api];
      if (!api) return false;
      const el = document.createElement("div");
      box.appendChild(el);
      api.mount(el, opts);
      return true;
    };
    if (!mount()) addEventListener("load", mount, { once: true });
  });

  // Framed demos: the app UI is laid out at its own window size and scaled to fit.
  const frames = [...document.querySelectorAll(".demo-frame")];
  function fit() {
    frames.forEach((box) => {
      const f = box.querySelector("iframe"), w = +box.dataset.w, h = +box.dataset.h;
      const k = Math.min(1, box.clientWidth / w);
      f.style.transform = `scale(${k})`;
      box.style.height = Math.round(h * k) + "px";
    });
  }
  if (frames.length) { fit(); addEventListener("resize", fit); }
})();
