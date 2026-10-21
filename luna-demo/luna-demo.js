/* LunaDock live demo for kingpindev.com.
   A small desktop with LunaDock's stacks on it: click a stack to fan it open, switch
   icon packs, the screen edge, grouping and the pile/category look. Categories, colours
   and the 25 icon packs follow the app's Grouping.cs and IconPacks.cs. The items are
   made up. Mount with LunaDemo.mount(el, { img: '/img/' }). */
(function () {
  "use strict";

  const W = 760, H = 440, TASK = 34;          // design size of the desktop, scaled to the card
  const P = {
    monitor: "M 4 3 h 16 a 2 2 0 0 1 2 2 v 10 a 2 2 0 0 1 -2 2 h -16 a 2 2 0 0 1 -2 -2 v -10 a 2 2 0 0 1 2 -2 Z M 8 21 L 16 21 M 12 17 L 12 21",
    folder: "M 20 20 a 2 2 0 0 0 2 -2 V 8 a 2 2 0 0 0 -2 -2 h -7.9 a 2 2 0 0 1 -1.69 -.9 L 9.6 3.9 A 2 2 0 0 0 7.93 3 H 4 a 2 2 0 0 0 -2 2 v 13 a 2 2 0 0 0 2 2 Z",
    link: "M 9 17 H 7 A 5 5 0 0 1 7 7 h 2 M 15 7 h 2 a 5 5 0 1 1 0 10 h -2 M 8 12 L 16 12",
    list: "M 3 5 h .01 M 3 12 h .01 M 3 19 h .01 M 8 5 h 13 M 8 12 h 13 M 8 19 h 13",
    image: "M 5 3 h 14 a 2 2 0 0 1 2 2 v 14 a 2 2 0 0 1 -2 2 h -14 a 2 2 0 0 1 -2 -2 v -14 a 2 2 0 0 1 2 -2 Z M 9 9 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 21 15 l -3.086 -3.086 a 2 2 0 0 0 -2.828 0 L 6 21",
    video: "M 16 13 l 5.223 3.482 a .5 .5 0 0 0 .777 -.416 V 7.87 a .5 .5 0 0 0 -.752 -.432 L 16 10.5 M 4 6 h 10 a 2 2 0 0 1 2 2 v 8 a 2 2 0 0 1 -2 2 h -10 a 2 2 0 0 1 -2 -2 v -8 a 2 2 0 0 1 2 -2 Z",
    music: "M 9 18 V 5 l 12 -2 v 13 M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
    gamepad: "M 6 11 L 10 11 M 8 9 L 8 13 M 15 12 L 15.01 12 M 18 10 L 18.01 10 M 17.32 5 H 6.68 a 4 4 0 0 0 -3.978 3.59 c -.006 .052 -.01 .101 -.017 .152 C 2.604 9.416 2 14.456 2 16 a 3 3 0 0 0 3 3 c 1 0 1.5 -.5 2 -1 l 1.414 -1.414 A 2 2 0 0 1 9.828 16 h 4.344 a 2 2 0 0 1 1.414 .586 L 17 18 c .5 .5 1 1 2 1 a 3 3 0 0 0 3 -3 c 0 -1.545 -.604 -6.584 -.685 -7.258 -.007 -.05 -.011 -.1 -.017 -.151 A 4 4 0 0 0 17.32 5 z",
    file: "M 15 2 H 6 a 2 2 0 0 0 -2 2 v 16 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 7 Z M 14 2 v 4 a 2 2 0 0 0 2 2 h 4",
    note: "M 16 3 H 5 a 2 2 0 0 0 -2 2 v 14 a 2 2 0 0 0 2 2 h 14 a 2 2 0 0 0 2 -2 V 8 Z M 15 3 v 4 a 2 2 0 0 0 2 2 h 4",
    braces: "M 8 3 H 7 a 2 2 0 0 0 -2 2 v 5 a 2 2 0 0 1 -2 2 a 2 2 0 0 1 2 2 v 5 c 0 1.1 .9 2 2 2 h 1 M 16 21 h 1 a 2 2 0 0 0 2 -2 v -5 c 0 -1.1 .9 -2 2 -2 a 2 2 0 0 1 -2 -2 V 5 a 2 2 0 0 0 -2 -2 h -1",
    calendar: "M 8 2 v 4 M 16 2 v 4 M 5 4 h 14 a 2 2 0 0 1 2 2 v 14 a 2 2 0 0 1 -2 2 h -14 a 2 2 0 0 1 -2 -2 v -14 a 2 2 0 0 1 2 -2 Z M 3 10 h 18",
    clock: "M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 Z M 12 6 v 6 l 4 2",
    history: "M 3 12 a 9 9 0 1 0 9 -9 a 9.75 9.75 0 0 0 -6.74 2.74 L 3 8 M 3 3 v 5 h 5 M 12 7 v 5 l 4 2",
    chev: "M 6 9 l 6 6 6 -6",
    trash: "M 3 6 h 18 M 19 6 v 14 c 0 1 -1 2 -2 2 H 7 c -1 0 -2 -1 -2 -2 V 6 M 8 6 V 4 c 0 -1 1 -2 2 -2 h 4 c 1 0 2 1 2 2 v 2",
    globe: "M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 Z M 12 2 a 14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0 -20 M 2 12 h 20",
    gear: "M 12 15 a 3 3 0 1 0 0 -6 a 3 3 0 0 0 0 6 Z M 19.4 15 a 1.65 1.65 0 0 0 .33 1.82 l .06 .06 a 2 2 0 1 1 -2.83 2.83 l -.06 -.06 a 1.65 1.65 0 0 0 -2.82 1.17 V 21 a 2 2 0 1 1 -4 0 v -.09 A 1.65 1.65 0 0 0 9 19.4 a 1.65 1.65 0 0 0 -1.82 .33 l -.06 .06 a 2 2 0 1 1 -2.83 -2.83 l .06 -.06 A 1.65 1.65 0 0 0 4.6 15 a 1.65 1.65 0 0 0 -1.51 -1 H 3 a 2 2 0 1 1 0 -4 h .09 A 1.65 1.65 0 0 0 4.6 9 a 1.65 1.65 0 0 0 -.33 -1.82 l -.06 -.06 a 2 2 0 1 1 2.83 -2.83 l .06 .06 A 1.65 1.65 0 0 0 9 4.6 a 1.65 1.65 0 0 0 1 -1.51 V 3 a 2 2 0 1 1 4 0 v .09 a 1.65 1.65 0 0 0 1 1.51 a 1.65 1.65 0 0 0 1.82 -.33 l .06 -.06 a 2 2 0 1 1 2.83 2.83 l -.06 .06 A 1.65 1.65 0 0 0 19.4 9 a 1.65 1.65 0 0 0 1.51 1 H 21 a 2 2 0 1 1 0 4 h -.09 a 1.65 1.65 0 0 0 -1.51 1 Z",
  };
  const svg = (n, size, color, sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

  // ── Items (made up) ──────────────────────────────────────────────────────
  // kind: folder | file | img | app | sys | game ; ext shown on file icons; d = days since modified
  const KIND = [
    { key: "System", glyph: "monitor", color: "#0EA5E9", items: [["This PC", "sys:monitor", 30], ["Recycle Bin", "sys:trash", 30], ["Network", "sys:globe", 30], ["Control Panel", "sys:gear", 30]] },
    { key: "Folders", glyph: "folder", color: "#3B82F6", items: [["Projects", "folder", 1], ["Screenshots", "folder", 0], ["Work", "folder", 12], ["Old Stuff", "folder", 300]] },
    { key: "Shortcuts", glyph: "link", color: "#14B8A6", items: [["Notchify", "app:notchify.png", 2], ["Aurora Radios", "app:Aurora.png", 9]] },
    { key: "Apps", glyph: "list", color: "#6366F1", items: [["GroupySetup.exe", "app:FluentMixer.png", 0]] },
    { key: "Images", glyph: "image", color: "#22C55E", items: [["sunset.jpg", "img:#f97316,#7c3aed", 0], ["wallpaper-4k.png", "img:#0ea5e9,#1e3a8a", 1], ["logo-final.png", "img:#ec4899,#f59e0b", 3], ["avatar.png", "img:#22c55e,#0f766e", 6], ["mockup.psd", "img:#6366f1,#a855f7", 15], ["trip-01.jpg", "img:#eab308,#b45309", 40], ["scan.png", "img:#94a3b8,#334155", 120]] },
    { key: "Movies", glyph: "video", color: "#A855F7", items: [["trailer.mp4", "file:MP4:#a855f7", 0], ["clip-0412.mkv", "file:MKV:#a855f7", 4], ["edit-final.mp4", "file:MP4:#a855f7", 20], ["recording.mov", "file:MOV:#a855f7", 70]] },
    { key: "Music", glyph: "music", color: "#EC4899", items: [["Midnight Drive.mp3", "file:MP3:#ec4899", 1], ["demo-beat.wav", "file:WAV:#ec4899", 5], ["podcast-12.mp3", "file:MP3:#ec4899", 9], ["voice-memo.m4a", "file:M4A:#ec4899", 33], ["lofi-mix.flac", "file:FLAC:#ec4899", 200]] },
    { key: "Games", glyph: "gamepad", color: "#84CC16", items: [["VALORANT", "game:#ff4655", 0], ["Dying Light", "game:#d97706", 2], ["ARC Raiders", "game:#e11d48", 5], ["Cyberpunk 2077", "game:#facc15", 25], ["Split Fiction", "game:#3b82f6", 45], ["Euro Truck Simulator 2", "game:#16a34a", 260]] },
    { key: "Other", glyph: "file", color: "#6B7280", items: [["license.key", "file:KEY:#6b7280", 50], ["backup.bak", "file:BAK:#6b7280", 400]] },
    { key: "Text Documents", glyph: "note", color: "#64748B", items: [["todo.txt", "file:TXT:#64748b", 0]] },
    { key: "Developer", glyph: "braces", color: "#64748B", items: [["build.ps1", "file:PS1:#2563eb", 1], ["app.js", "file:JS:#ca8a04", 8], ["config.json", "file:JSON:#64748b", 18]] },
  ];
  const DATE = [
    { key: "Today", glyph: "clock", color: "#3B82F6", max: 0 },
    { key: "Yesterday", glyph: "history", color: "#6366F1", max: 1 },
    { key: "Previous 7 Days", glyph: "calendar", color: "#8B5CF6", max: 7 },
    { key: "Previous 30 Days", glyph: "calendar", color: "#A855F7", max: 30 },
    { key: "This Year", glyph: "calendar", color: "#64748B", max: 365 },
    { key: "Older", glyph: "calendar", color: "#6B7280", max: 1e9 },
  ];
  const ALL = KIND.flatMap((k) => k.items);
  function stacks(mode) {
    if (mode === "kind") return KIND;
    let lo = -1;
    return DATE.map((b) => {
      const items = ALL.filter(([, , d]) => d > lo && d <= b.max);
      lo = b.max;
      return { ...b, items };
    }).filter((b) => b.items.length);
  }

  // ── Icon packs (IconPacks.cs) ────────────────────────────────────────────
  const hex2 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const x = hex2(a), y = hex2(b); return "rgb(" + x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",") + ")"; };
  const rgba = (h, a) => `rgba(${hex2(h).join(",")},${a})`;
  const PACKS = {
    Fluent: (c) => ({ bg: c, fg: "#fff" }),
    Glass: () => ({ bg: "rgba(255,255,255,.22)", fg: "#fff", bd: "1px solid rgba(255,255,255,.44)", blur: 1 }),
    Light: (c) => ({ bg: "rgba(255,255,255,.95)", fg: c, bd: "1px solid rgba(0,0,0,.13)" }),
    Circle: (c) => ({ bg: c, fg: "#fff", r: "50%" }),
    Gradient: (c) => ({ bg: `linear-gradient(135deg,${mix(c, "#ffffff", 0.35)},${mix(c, "#000000", 0.25)})`, fg: "#fff", r: "30%" }),
    Minimal: () => ({ bg: "transparent", fg: "#fff", sh: 1 }),
    Outline: (c) => ({ bg: "rgba(0,0,0,.15)", fg: mix(c, "#ffffff", 0.15), bd: `2px solid ${mix(c, "#ffffff", 0.15)}` }),
    Neon: (c) => ({ bg: "rgba(14,16,24,.9)", fg: mix(c, "#ffffff", 0.25), bd: `1.5px solid ${mix(c, "#ffffff", 0.25)}`, glow: c }),
    Pastel: (c) => ({ bg: mix(c, "#ffffff", 0.65), fg: mix(c, "#000000", 0.35) }),
    Dark: (c) => ({ bg: "#1F242E", fg: mix(c, "#ffffff", 0.2) }),
    Duotone: (c) => ({ bg: rgba(c, 0.33), fg: mix(c, "#ffffff", 0.3) }),
    Glossy: (c) => ({ bg: `linear-gradient(180deg,${mix(c, "#ffffff", 0.45)} 0%,${mix(c, "#ffffff", 0.15)} 48%,${c} 52%,${mix(c, "#000000", 0.2)} 100%)`, fg: "#fff", bd: "1px solid rgba(255,255,255,.6)" }),
    Mono: () => ({ bg: "rgba(255,255,255,.95)", fg: "#1A1A1A", bd: "1px solid rgba(0,0,0,.13)" }),
    Leaf: (c) => ({ bg: c, fg: "#fff", r: "45% 2px 45% 2px" }),
    Drop: (c) => ({ bg: c, fg: "#fff", r: "50% 50% 3px 50%" }),
    Sharp: (c) => ({ bg: c, fg: "#fff", r: "2px" }),
    Ring: (c) => ({ bg: "rgba(0,0,0,.2)", fg: mix(c, "#ffffff", 0.2), bd: `2.5px solid ${mix(c, "#ffffff", 0.2)}`, r: "50%" }),
    Sunset: (c) => ({ bg: `linear-gradient(135deg,${c} 0%,#FF7A59 60%,#E13D7A 100%)`, fg: "#fff" }),
    Ocean: (c) => ({ bg: `linear-gradient(180deg,${mix(c, "#ffffff", 0.2)},#1E3A8A)`, fg: "#fff" }),
    Aurora: (c) => ({ bg: `linear-gradient(135deg,${c} 0%,#14B8A6 60%,#7C3AED 100%)`, fg: "#fff" }),
    Frosted: () => ({ bg: "rgba(16,18,24,.55)", fg: "#fff", bd: "1px solid rgba(255,255,255,.35)", blur: 1 }),
    Midnight: (c) => ({ bg: "#0F172A", fg: mix(c, "#ffffff", 0.25), bd: `1px solid ${rgba(c, 0.5)}` }),
    Clay: (c) => ({ bg: `linear-gradient(180deg,${mix(c, "#ffffff", 0.55)},${mix(c, "#ffffff", 0.35)})`, fg: mix(c, "#000000", 0.3), bd: "2px solid rgba(255,255,255,.7)", r: "35%" }),
    Retro: () => ({ bg: "#F4EBD0", fg: "#4A3428", bd: "2.5px solid #4A3428", r: "4px" }),
    "Color Glyph": (c) => ({ bg: "transparent", fg: mix(c, "#ffffff", 0.15), sh: 1 }),
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const CSS = `
.ld-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);user-select:none;-webkit-user-select:none;background:#081521;
  font-family:"Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif}
.ld-demo *{box-sizing:border-box;cursor:none!important}
.ld-view{position:relative;overflow:hidden}
.ld-desk{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;overflow:hidden;
  background:radial-gradient(55% 45% at 50% 52%,rgba(190,205,215,.22),transparent 70%),radial-gradient(70% 50% at 25% 95%,rgba(40,160,200,.45),transparent 70%),radial-gradient(60% 45% at 85% 100%,rgba(90,190,210,.35),transparent 70%),linear-gradient(180deg,#061420 0%,#0b2433 45%,#174a5e 100%)}
.ld-stars{position:absolute;inset:0;pointer-events:none}
.ld-logo{position:absolute;left:50%;top:44%;width:58px;height:58px;margin:-29px 0 0 -29px;opacity:.9;pointer-events:none}
.ld-stack,.ld-item{position:absolute;width:62px;display:flex;flex-direction:column;align-items:center;transition:left .38s cubic-bezier(.2,.9,.25,1),top .38s cubic-bezier(.2,.9,.25,1),opacity .25s}
.ld-ic{position:relative;width:40px;height:40px;display:grid;place-items:center;border-radius:10px;transition:transform .15s}
.ld-stack:hover .ld-ic,.ld-item:hover .ld-ic{transform:scale(1.07)}
.ld-lb{margin-top:4px;max-width:62px;text-align:center;font-size:9.5px;line-height:1.25;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.85),0 0 6px rgba(0,0,0,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ld-lb small{display:block;font-size:9px;opacity:.92}
.ld-item .ld-lb{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ld-item{opacity:0}
.ld-item.in{opacity:1}
.ld-item:hover::before,.ld-item.sel::before{content:"";position:absolute;inset:-3px -2px;border-radius:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);z-index:-1}
.ld-item.sel::before{background:rgba(96,165,250,.25);border-color:rgba(147,197,253,.5)}
.ld-pile{position:relative;width:40px;height:40px}
.ld-pile>*{position:absolute}
.ld-task{position:absolute;left:0;right:0;bottom:0;height:${TASK}px;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(8,14,22,.78);border-top:1px solid rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.ld-task img{width:20px;height:20px;border-radius:5px}
.ld-clock{position:absolute;right:12px;top:50%;transform:translateY(-50%);text-align:right;font-size:9px;line-height:1.3;color:#fff}
.ld-bar{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;padding:11px 14px;background:rgba(6,12,20,.9);border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:rgba(255,255,255,.6)}
.ld-grp{display:flex;align-items:center;gap:6px}
.ld-seg{display:flex;border:1px solid rgba(255,255,255,.14);border-radius:8px;overflow:hidden}
.ld-seg button{all:unset;padding:4px 9px;font-size:12px;color:rgba(255,255,255,.75);border-left:1px solid rgba(255,255,255,.1)}
.ld-seg button:first-child{border-left:0}
.ld-seg button.on{background:#60a5fa;color:#06121f;font-weight:600}
.ld-seg button:not(.on):hover{background:rgba(255,255,255,.07)}
.ld-pack{all:unset;display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.14);color:#fff;font-size:12px}
.ld-pack:hover{background:rgba(255,255,255,.07)}
.ld-hint{margin-left:auto;font-size:11.5px;color:rgba(255,255,255,.5)}
`;
  function injectCss() {
    if (document.getElementById("ld-demo-css")) return;
    const st = document.createElement("style");
    st.id = "ld-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // Seeded star field, drawn once.
  function stars(canvas) {
    canvas.width = W * 2; canvas.height = H * 2;
    const x = canvas.getContext("2d");
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 260; i++) {
      const r = rnd() < 0.9 ? 0.8 : 1.6, a = 0.35 + rnd() * 0.6;
      x.fillStyle = `rgba(255,255,255,${a})`;
      x.beginPath(); x.arc(rnd() * W * 2, rnd() * H * 2, r, 0, 7); x.fill();
    }
  }

  function Demo(root, IMG) {
    const s = { mode: "kind", look: "category", pack: "Fluent", edge: "top", open: null, sel: null };
    const packNames = Object.keys(PACKS);

    root.innerHTML = `<div class="ld-view"><div class="ld-desk"><canvas class="ld-stars" style="width:${W}px;height:${H}px"></canvas>
        <svg class="ld-logo" viewBox="0 0 88 88"><g fill="rgba(255,255,255,.92)"><path d="M0 12.4l35.7-4.9v34.4H0z"/><path d="M40 6.8L87.3 0v41.5H40z"/><path d="M0 45.7h35.7v34.5L0 75.3z"/><path d="M40 45.7h47.3V88L40 81.4z"/></g></svg>
        <div class="ld-layer"></div>
        <div class="ld-task"><svg width="18" height="18" viewBox="0 0 88 88"><g fill="#38bdf8"><path d="M0 12.4l35.7-4.9v34.4H0z"/><path d="M40 6.8L87.3 0v41.5H40z"/><path d="M0 45.7h35.7v34.5L0 75.3z"/><path d="M40 45.7h47.3V88L40 81.4z"/></g></svg>
          ${["notchify.png", "FluentMixer.png", "vice-sonar.png", "Aurora.png", "BokMail.png"].map((f) => `<img src="${IMG}${f}" alt="">`).join("")}
          <div class="ld-clock">21:30<br>21.10.2026</div></div></div></div>
      <div class="ld-bar">
        <div class="ld-grp">Look <div class="ld-seg" data-g="look"><button data-v="category">Category icons</button><button data-v="pile">Piles</button></div></div>
        <div class="ld-grp">Icon pack <button class="ld-pack" data-act="pack"></button></div>
        <div class="ld-grp">Edge <div class="ld-seg" data-g="edge"><button data-v="top">Top</button><button data-v="bottom">Bottom</button><button data-v="left">Left</button><button data-v="right">Right</button></div></div>
        <div class="ld-grp">Group by <div class="ld-seg" data-g="mode"><button data-v="kind">Kind</button><button data-v="date">Date</button></div></div>
        <span class="ld-hint">Click a stack to open it</span>
      </div>`;
    stars(root.querySelector(".ld-stars"));
    const view = root.querySelector(".ld-view"), desk = root.querySelector(".ld-desk"), layer = root.querySelector(".ld-layer");

    function fit() {
      const k = view.clientWidth / W;
      if (!k) return;
      desk.style.transform = `scale(${k})`;
      view.style.height = H * k + "px";
    }

    // ── Icons ──
    function itemIcon([name, kind]) {
      const [t, a, b, c] = kind.split(":");
      if (t === "folder") return `<svg width="40" height="34" viewBox="0 0 40 34"><path d="M2 6a3 3 0 0 1 3-3h10l4 4h16a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#e8a33a"/><path d="M2 12a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#fcc955"/></svg>`;
      if (t === "img") { const [g1, g2] = a.split(","); return `<div style="width:36px;height:30px;border-radius:3px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);background:radial-gradient(circle at 72% 30%,rgba(255,255,255,.75) 0 4px,transparent 5px),linear-gradient(160deg,${g1},${g2})"></div>`; }
      if (t === "app") return `<img src="${IMG}${a}" alt="" style="width:36px;height:36px;border-radius:9px;box-shadow:0 2px 6px rgba(0,0,0,.35)">`;
      if (t === "sys") return `<div style="width:36px;height:36px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(180deg,#38bdf8,#0369a1)">${svg(a, 20, "#fff")}</div>`;
      if (t === "game") return `<div style="width:36px;height:36px;border-radius:9px;display:grid;place-items:center;background:${a};color:#fff;font:700 16px/1 'Segoe UI',sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.35)">${name[0]}</div>`;
      // file: page with a coloured extension band
      return `<svg width="32" height="40" viewBox="0 0 32 40"><path d="M3 1h18l9 9v27a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" fill="#f8fafc" stroke="#cbd5e1"/><path d="M21 1v7a2 2 0 0 0 2 2h7" fill="#e2e8f0" stroke="#cbd5e1"/><rect x="1" y="24" width="24" height="10" rx="1.5" fill="${b}"/><text x="13" y="31.6" font-size="6.5" font-family="Segoe UI,sans-serif" font-weight="700" fill="#fff" text-anchor="middle">${a}</text></svg>`;
    }
    function categoryIcon(st, open) {
      if (open) return `<div class="ld-ic" style="background:rgba(120,130,140,.55);backdrop-filter:blur(8px)">${svg("chev", 20, "#fff", 2.4)}</div>`;
      const p = PACKS[s.pack](st.color);
      const style = [`background:${p.bg}`, p.bd ? `border:${p.bd}` : "", `border-radius:${p.r || "25%"}`,
        p.glow ? `box-shadow:0 0 10px ${rgba(st.color, 0.55)}` : p.bg === "transparent" ? "" : "box-shadow:0 2px 6px rgba(0,0,0,.3)",
        p.blur ? "backdrop-filter:blur(8px)" : ""].join(";");
      const glyph = svg(st.glyph, 22, p.fg, 2);
      return `<div class="ld-ic" style="${style}">${p.sh ? `<span style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))">${glyph}</span>` : glyph}</div>`;
    }
    function pileIcon(st, open) {
      if (open) return categoryIcon(st, true);
      const top = st.items.slice(0, 3);
      return `<div class="ld-ic"><div class="ld-pile">${top.map((it, i) => `<div style="left:${(top.length - 1 - i) * 3}px;top:${(top.length - 1 - i) * -2}px;transform:scale(${1 - (top.length - 1 - i) * 0.04});opacity:${1 - (top.length - 1 - i) * 0.12}">${itemIcon(it)}</div>`).reverse().join("")}</div></div>`;
    }

    // ── Layout ──
    const CW = 66, CH = 72, M = 12, USABLE = H - TASK;
    function stackPositions(n) {
      const pos = [];
      if (s.edge === "top" || s.edge === "bottom") {
        const y = s.edge === "top" ? M : USABLE - M - CH;
        const x0 = s.edge === "top" ? (W - n * CW) / 2 : M;
        for (let i = 0; i < n; i++) pos.push([x0 + i * CW + 3, y]);
      } else {
        const rows = Math.floor((USABLE - M) / CH);
        for (let i = 0; i < n; i++) {
          const col = Math.floor(i / rows), row = i % rows;
          const x = s.edge === "left" ? M + col * CW : W - M - CW - col * CW;
          pos.push([x + 3, M + row * CH]);
        }
      }
      return pos;
    }
    function fanPositions(origin, count) {
      const [ox, oy] = origin, out = [];
      const step = s.edge === "top" || s.edge === "bottom" ? 68 : 70;
      for (let i = 1; i <= count; i++) {
        if (s.edge === "top") out.push([ox, oy + i * step]);
        else if (s.edge === "bottom") out.push([ox, oy - i * step]);
        else if (s.edge === "left") out.push([ox + i * step + (s.cols - 1) * CW, oy]);
        else out.push([ox - i * step - (s.cols - 1) * CW, oy]);
      }
      return out.filter(([x, y]) => x > -4 && x < W - 60 && y > -4 && y < USABLE - CH + 6);
    }

    function render() {
      const list = stacks(s.mode);
      const pos = stackPositions(list.length);
      const rows = Math.floor((USABLE - M) / CH);
      s.cols = s.edge === "left" || s.edge === "right" ? Math.ceil(list.length / rows) : 1;
      let html = "";
      list.forEach((st, i) => {
        const open = s.open === st.key;
        const [x, y] = pos[i];
        html += `<div class="ld-stack" data-stack="${st.key}" style="left:${x}px;top:${y}px">${s.look === "pile" ? pileIcon(st, open) : categoryIcon(st, open)}
          <div class="ld-lb">${st.key}<small>${st.items.length} item${st.items.length === 1 ? "" : "s"}</small></div></div>`;
        if (open) {
          // In a side column the fan starts past the outer column, like the app.
          const origin = s.edge === "left" ? [M + 3, y] : s.edge === "right" ? [W - M - CW + 3, y] : [x, y];
          fanPositions(origin, st.items.length).forEach(([fx, fy], j) => {
            const it = st.items[j];
            html += `<div class="ld-item ${s.sel === it[0] ? "sel" : ""}" data-item="${it[0]}" data-to="${fx},${fy}" style="left:${x}px;top:${y}px;transition-delay:${j * 0.03}s">
              <div class="ld-ic">${itemIcon(it)}</div><div class="ld-lb">${it[0]}</div></div>`;
          });
        }
      });
      layer.innerHTML = html;
      // Fan out on the next frame so the items slide from the stack.
      requestAnimationFrame(() => requestAnimationFrame(() => layer.querySelectorAll(".ld-item").forEach((el) => {
        const [fx, fy] = el.dataset.to.split(",");
        el.style.left = fx + "px"; el.style.top = fy + "px"; el.classList.add("in");
      })));
      root.querySelectorAll(".ld-seg").forEach((g) => g.querySelectorAll("button").forEach((b) => b.classList.toggle("on", s[g.dataset.g] === b.dataset.v)));
      root.querySelector(".ld-pack").innerHTML = `${s.pack} ${svg("chev", 12, "rgba(255,255,255,.6)")}`;
      root.querySelector(".ld-pack").style.opacity = s.look === "pile" ? 0.45 : 1;
    }

    root.addEventListener("click", (e) => {
      const t = e.target.closest("[data-stack],[data-item],.ld-seg button,[data-act]");
      if (!t) { if (e.target.closest(".ld-desk") && s.open) { s.open = null; render(); } return; }
      if (t.dataset.stack) { s.open = s.open === t.dataset.stack ? null : t.dataset.stack; s.sel = null; render(); }
      else if (t.dataset.item) { s.sel = t.dataset.item; layer.querySelectorAll(".ld-item").forEach((el) => el.classList.toggle("sel", el === t)); }
      else if (t.dataset.act === "pack") { s.pack = packNames[(packNames.indexOf(s.pack) + 1) % packNames.length]; if (s.look === "pile") s.look = "category"; render(); }
      else { const g = t.parentElement.dataset.g; s[g] = t.dataset.v; s.open = null; render(); }
    });
    addEventListener("resize", fit);
    fit();
    render();
    requestAnimationFrame(fit);
  }

  window.LunaDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("ld-demo");
      Demo(root, opts.img || "/img/");
    },
  };
})();
