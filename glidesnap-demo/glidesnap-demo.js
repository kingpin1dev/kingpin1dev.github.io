/* GlideSnap demo for kingpindev.com: what the app does, on a small desktop.
   Hold Alt (or latch the on-screen Alt key) and grab a window anywhere: left drag moves,
   right drag resizes from the nearest corner or edge, the wheel changes opacity, a double
   click maximizes, the middle button keeps it on top, and dropping on the top or a side
   edge snaps it (GlideSnap's defaults, from Native/glidesnap.c). Without Alt the windows
   behave like normal Windows windows: only the title bar drags.
   Mount with GlideSnapDemo.mount(el, { lang: "tr" | "en", img: "/img/" }). */
(function () {
  "use strict";

  const W = 760, H = 430, TASK = 34, SNAP = 14;
  const T = {
    tr: { alt: "Alt", hold: "Alt'ı basılı tut ya da düğmeye bas", on: "Alt basılı",
      tips: ["Alt + sol tık sürükle: pencereyi her yerinden taşı", "Alt + sağ tık sürükle: köşeden ya da kenardan boyutlandır",
        "Alt + tekerlek: şeffaflık", "Alt + çift tık: büyüt / geri al", "Alt + orta tık: her zaman üstte", "Üst kenara bırak: tam ekran · yan kenar: yarım ekran"],
      normal: "Alt olmadan pencereler normal davranır: sadece başlık çubuğundan sürüklenir.", pinned: "Her zaman üstte", opacity: "Şeffaflık",
      notes: "Notlar", files: "Dosyalar", music: "Müzik", noteText: "GlideSnap ile pencereyi\nbaşlığından değil, içinden\ntutup taşıyabilirsin.\n\n• Alt + sol: taşı\n• Alt + sağ: boyutlandır",
      tracks: ["Midnight Drive", "Neon Skyline", "Paper Satellites"], folders: ["Belgeler", "İndirilenler", "Resimler", "Projeler"] },
    en: { alt: "Alt", hold: "Hold Alt or press the button", on: "Alt held",
      tips: ["Alt + left drag: move a window from anywhere", "Alt + right drag: resize from a corner or edge",
        "Alt + wheel: opacity", "Alt + double click: maximize / restore", "Alt + middle click: always on top", "Drop on the top edge: maximize · a side: half screen"],
      normal: "Without Alt the windows behave normally: they only drag by the title bar.", pinned: "Always on top", opacity: "Opacity",
      notes: "Notes", files: "Files", music: "Music", noteText: "With GlideSnap you grab a\nwindow from anywhere inside it,\nnot just the title bar.\n\n• Alt + left: move\n• Alt + right: resize",
      tracks: ["Midnight Drive", "Neon Skyline", "Paper Satellites"], folders: ["Documents", "Downloads", "Pictures", "Projects"] },
  };

  const CSS = `
.gs-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#0a1220;user-select:none;-webkit-user-select:none;
  font-family:"Segoe UI Variable Text","Segoe UI",system-ui,sans-serif;color:#e5e7eb}
.gs-demo *{box-sizing:border-box}
html:has(#cur) .gs-demo *{cursor:none!important}
.gs-view{position:relative;overflow:hidden}
.gs-desk{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;overflow:hidden;touch-action:none;
  background:radial-gradient(60% 60% at 20% 100%,rgba(112,255,178,.22),transparent 70%),radial-gradient(55% 60% at 90% 0%,rgba(59,130,246,.32),transparent 70%),linear-gradient(160deg,#0b1424,#0f2238 60%,#123a3a)}
.gs-preview{position:absolute;border-radius:10px;background:rgba(112,255,178,.16);border:2px solid rgba(112,255,178,.65);opacity:0;transition:opacity .12s,left .12s,top .12s,width .12s,height .12s;pointer-events:none}
.gs-preview.show{opacity:1}
.gs-win{position:absolute;display:flex;flex-direction:column;border-radius:9px;overflow:hidden;background:#1f2430;border:1px solid rgba(255,255,255,.12);box-shadow:0 14px 40px rgba(0,0,0,.45)}
.gs-win.anim{transition:left .18s,top .18s,width .18s,height .18s}
.gs-win.active{border-color:rgba(255,255,255,.22);box-shadow:0 18px 50px rgba(0,0,0,.55)}
.gs-win.grab{outline:2px solid rgba(112,255,178,.8)}
.gs-tb{display:flex;align-items:center;height:30px;flex:none;padding-left:10px;font-size:12px;background:#272d3a;gap:8px}
.gs-tb b{font-weight:600;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gs-tb i{font-style:normal;width:34px;height:30px;display:grid;place-items:center;color:#9ca3af;font-size:12px}
.gs-pin{font-size:10px;padding:1px 7px;border-radius:99px;background:rgba(112,255,178,.18);color:#70ffb2}
.gs-body{flex:1;min-height:0;padding:12px;font-size:12px;line-height:1.55;color:#cbd5e1;overflow:hidden}
.gs-note{white-space:pre-wrap;font-family:Consolas,ui-monospace,monospace;font-size:11.5px;background:#fbfbf3;color:#1f2937;margin:-12px;padding:12px;height:calc(100% + 24px)}
.gs-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(70px,1fr));gap:10px}
.gs-files div{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;color:#e5e7eb}
.gs-files div::before{content:"";width:34px;height:26px;border-radius:4px;background:linear-gradient(180deg,#ffd166,#f4a63a)}
.gs-track{display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:7px}
.gs-track:first-child{background:rgba(255,255,255,.06)}
.gs-track::before{content:"";width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#a855f7,#ec4899)}
.gs-task{position:absolute;left:0;right:0;bottom:0;height:${TASK}px;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(8,12,20,.85);border-top:1px solid rgba(255,255,255,.07)}
.gs-task img{width:20px;height:20px;border-radius:5px}
.gs-hud{position:absolute;left:50%;top:10px;transform:translateX(-50%);padding:5px 12px;border-radius:99px;font-size:12px;font-weight:600;background:rgba(8,12,20,.8);border:1px solid rgba(255,255,255,.12);color:#cbd5e1;opacity:0;transition:opacity .15s;pointer-events:none;white-space:nowrap}
.gs-hud.show{opacity:1}
.gs-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding:11px 14px;background:rgba(6,10,18,.92);border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#94a3b8}
.gs-key{all:unset;min-width:58px;text-align:center;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2);border-bottom-width:3px;background:#1f2430;color:#fff;font-weight:700;font-size:13px}
.gs-key.on{background:#70ffb2;color:#06210f;border-color:#3ddc84;transform:translateY(1px)}
.gs-tip{flex:1;min-width:220px;color:#cbd5e1}
.gs-tip b{color:#70ffb2;font-weight:600}
`;
  function injectCss() {
    if (document.getElementById("gs-demo-css")) return;
    const st = document.createElement("style");
    st.id = "gs-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function Demo(root, L, IMG) {
    const AREA = { x: 0, y: 0, w: W, h: H - TASK };
    const wins = [
      { id: "notes", title: L.notes, x: 46, y: 40, w: 250, h: 210, op: 1, pin: false, max: null },
      { id: "files", title: L.files, x: 330, y: 70, w: 300, h: 190, op: 1, pin: false, max: null },
      { id: "music", title: L.music, x: 200, y: 200, w: 260, h: 160, op: 1, pin: false, max: null },
    ];
    let z = wins.map((w) => w.id);   // stacking order, last on top
    let altKey = false, altLatch = false, drag = null, tipI = 0;
    const alt = () => altKey || altLatch;

    root.innerHTML = `<div class="gs-view"><div class="gs-desk"><div class="gs-preview"></div><div class="gs-wins"></div>
        <div class="gs-task">${["notchify.png", "FluentMixer.png", "GlideSnap.png", "vice-sonar.png"].map((f) => `<img src="${IMG}${f}" alt="">`).join("")}</div>
        <div class="gs-hud"></div></div></div>
      <div class="gs-bar"><button class="gs-key" data-alt>${L.alt}</button><span class="gs-tip"></span></div>`;
    const view = root.querySelector(".gs-view"), desk = root.querySelector(".gs-desk"), layer = root.querySelector(".gs-wins");
    const preview = root.querySelector(".gs-preview"), hud = root.querySelector(".gs-hud"), keyBtn = root.querySelector("[data-alt]"), tip = root.querySelector(".gs-tip");
    let k = 1;

    function fit() { k = view.clientWidth / W; if (!k) return; desk.style.transform = `scale(${k})`; view.style.height = H * k + "px"; }
    const body = (w) => w.id === "notes" ? `<div class="gs-note">${L.noteText}</div>`
      : w.id === "files" ? `<div class="gs-files">${L.folders.map((f) => `<div>${f}</div>`).join("")}</div>`
      : L.tracks.map((t) => `<div class="gs-track">${t}</div>`).join("");

    function render() {
      layer.innerHTML = z.map((id) => {
        const w = wins.find((x) => x.id === id);
        return `<div class="gs-win ${id === z[z.length - 1] ? "active" : ""}" data-win="${id}" style="left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px;opacity:${w.op}">
          <div class="gs-tb" data-tb><b>${w.title}</b>${w.pin ? `<span class="gs-pin">📌 ${L.pinned}</span>` : ""}<i>—</i><i>▢</i><i>✕</i></div><div class="gs-body">${body(w)}</div></div>`;
      }).join("");
    }
    function place(w) {
      const el = layer.querySelector(`[data-win="${w.id}"]`);
      if (!el) return;
      Object.assign(el.style, { left: w.x + "px", top: w.y + "px", width: w.w + "px", height: w.h + "px", opacity: w.op });
    }
    function front(id) {
      const pinned = wins.filter((w) => w.pin).map((w) => w.id);
      z = z.filter((x) => x !== id).concat(id);
      z = z.filter((x) => !pinned.includes(x)).concat(z.filter((x) => pinned.includes(x)));   // pinned windows stay on top
      render();
    }
    function showHud(text) { hud.textContent = text; hud.classList.add("show"); clearTimeout(showHud.t); showHud.t = setTimeout(() => hud.classList.remove("show"), 900); }
    function setTip(i) { tipI = i; tip.innerHTML = alt() ? `<b>${L.on}:</b> ${L.tips[i % L.tips.length]}` : `${L.hold}. ${L.normal}`; }
    function syncKey() { keyBtn.classList.toggle("on", alt()); setTip(tipI); }

    const pt = (e) => { const r = desk.getBoundingClientRect(); return [(e.clientX - r.left) / k, (e.clientY - r.top) / k]; };
    // GlideSnap's edge snap: top edge maximizes, left/right edges take half the screen.
    function snapZone(x, y) {
      if (y <= AREA.y + SNAP) return { x: AREA.x, y: AREA.y, w: AREA.w, h: AREA.h };
      if (x <= AREA.x + SNAP) return { x: AREA.x, y: AREA.y, w: AREA.w / 2, h: AREA.h };
      if (x >= AREA.w - SNAP) return { x: AREA.w / 2, y: AREA.y, w: AREA.w / 2, h: AREA.h };
      return null;
    }

    desk.addEventListener("contextmenu", (e) => e.preventDefault());
    desk.addEventListener("pointerdown", (e) => {
      const el = e.target.closest("[data-win]");
      if (!el) return;
      const w = wins.find((x) => x.id === el.dataset.win);
      front(w.id);
      const [px, py] = pt(e);
      const onTitle = !!e.target.closest("[data-tb]");
      if (e.button === 1 && alt()) { w.pin = !w.pin; front(w.id); setTip(4); e.preventDefault(); return; }
      let mode = null;
      if (e.button === 0 && (alt() || onTitle)) mode = "move";
      else if (e.button === 2 && alt()) mode = "resize";
      if (!mode) return;
      if (mode === "move" && w.max) {
        // Dragging a maximized window restores it under the cursor, keeping the grab ratio.
        const rx = (px - w.x) / w.w;
        Object.assign(w, w.max); w.max = null;
        w.x = px - w.w * rx; w.y = py - 12;
      }
      const ex = (px - w.x) / w.w, ey = (py - w.y) / w.h;
      drag = { w, mode, px, py, ox: w.x, oy: w.y, ow: w.w, oh: w.h,
        hx: ex < 0.33 ? -1 : ex > 0.66 ? 1 : 0, hy: ey < 0.33 ? -1 : ey > 0.66 ? 1 : 0, alt: alt() };
      if (!drag.hx && !drag.hy) drag.hx = drag.hy = 1;   // middle third: resize from the bottom-right
      desk.setPointerCapture(e.pointerId);
      render();
      layer.querySelector(`[data-win="${w.id}"]`).classList.add("grab");
      setTip(mode === "move" ? 0 : 1);
      e.preventDefault();
    });
    desk.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const [px, py] = pt(e), d = drag, w = d.w;
      if (d.mode === "move") {
        w.x = Math.round(d.ox + px - d.px); w.y = Math.round(d.oy + py - d.py);
        const z2 = snapZone(px, py);
        if (z2) Object.assign(preview.style, { left: z2.x + 6 + "px", top: z2.y + 6 + "px", width: z2.w - 12 + "px", height: z2.h - 12 + "px" });
        preview.classList.toggle("show", !!z2);
        d.zone = z2;
      } else {
        const dx = px - d.px, dy = py - d.py;
        if (d.hx === 1) w.w = Math.max(160, d.ow + dx);
        if (d.hx === -1) { w.w = Math.max(160, d.ow - dx); w.x = d.ox + d.ow - w.w; }
        if (d.hy === 1) w.h = Math.max(110, d.oh + dy);
        if (d.hy === -1) { w.h = Math.max(110, d.oh - dy); w.y = d.oy + d.oh - w.h; }
        showHud(`${Math.round(w.w)} × ${Math.round(w.h)}`);
      }
      place(w);
    });
    const end = () => {
      if (!drag) return;
      const w = drag.w, el = layer.querySelector(`[data-win="${w.id}"]`);
      if (drag.mode === "move" && drag.zone) {
        w.max = { x: drag.ox, y: drag.oy, w: drag.ow, h: drag.oh };
        Object.assign(w, drag.zone);
        if (el) { el.classList.add("anim"); place(w); setTip(5); }
      }
      if (el) el.classList.remove("grab");
      preview.classList.remove("show");
      drag = null;
      setTimeout(render, 200);
    };
    desk.addEventListener("pointerup", end);
    desk.addEventListener("pointercancel", end);
    desk.addEventListener("dblclick", (e) => {
      const el = e.target.closest("[data-win]");
      if (!el || !(alt() || e.target.closest("[data-tb]"))) return;
      const w = wins.find((x) => x.id === el.dataset.win);
      if (w.max) { Object.assign(w, w.max); w.max = null; }
      else { w.max = { x: w.x, y: w.y, w: w.w, h: w.h }; Object.assign(w, AREA); }
      render(); setTip(3);
    });
    desk.addEventListener("wheel", (e) => {
      const el = e.target.closest("[data-win]");
      if (!el || !alt()) return;
      e.preventDefault();
      const w = wins.find((x) => x.id === el.dataset.win);
      w.op = Math.min(1, Math.max(0.25, Math.round((w.op + (e.deltaY < 0 ? 0.05 : -0.05)) * 100) / 100));
      place(w); showHud(`${L.opacity}: ${Math.round(w.op * 100)}%`); setTip(2);
    }, { passive: false });

    // The real Alt key works while the pointer is over the demo; the on-screen key latches.
    let over = false;
    root.addEventListener("pointerenter", () => { over = true; });
    root.addEventListener("pointerleave", () => { over = false; if (altKey) { altKey = false; syncKey(); } });
    addEventListener("keydown", (e) => { if (e.key === "Alt" && over) { e.preventDefault(); if (!altKey) { altKey = true; syncKey(); } } });
    addEventListener("keyup", (e) => { if (e.key === "Alt" && altKey) { e.preventDefault(); altKey = false; syncKey(); } });
    addEventListener("blur", () => { if (altKey) { altKey = false; syncKey(); } });
    keyBtn.addEventListener("click", () => { altLatch = !altLatch; syncKey(); });
    // Cycle the tips while Alt is down and nothing is being dragged.
    setInterval(() => { if (alt() && !drag && root.isConnected) setTip(tipI + 1); }, 3500);

    addEventListener("resize", fit);
    fit(); render(); syncKey(); requestAnimationFrame(fit);
  }

  window.GlideSnapDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("gs-demo");
      Demo(root, T[opts.lang === "en" ? "en" : "tr"], opts.img || "/img/");
    },
  };
})();
