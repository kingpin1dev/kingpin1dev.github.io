/* Groupy live demo for kingpindev.com.
   A working copy of the app's tray flyout (FlyoutView.cs) and a scaled main window
   (MainWindow / CategoryCardView), sharing one state. Colours, sizes and icons follow
   the app's Theme.cs, Controls.cs and Icons.cs (lucide). Mount with GroupyDemo.mount(el). */
(function () {
  "use strict";

  // ── Icons (lucide 24x24, stroke) ─────────────────────────────────────────
  const P = {
    gamepad: "M 6 11 L 10 11 M 8 9 L 8 13 M 15 12 L 15.01 12 M 18 10 L 18.01 10 M 17.32 5 H 6.68 a 4 4 0 0 0 -3.978 3.59 c -.006 .052 -.01 .101 -.017 .152 C 2.604 9.416 2 14.456 2 16 a 3 3 0 0 0 3 3 c 1 0 1.5 -.5 2 -1 l 1.414 -1.414 A 2 2 0 0 1 9.828 16 h 4.344 a 2 2 0 0 1 1.414 .586 L 17 18 c .5 .5 1 1 2 1 a 3 3 0 0 0 3 -3 c 0 -1.545 -.604 -6.584 -.685 -7.258 -.007 -.05 -.011 -.1 -.017 -.151 A 4 4 0 0 0 17.32 5 z",
    chat: "M 21 15 a 2 2 0 0 1 -2 2 H 7 l -4 4 V 5 a 2 2 0 0 1 2 -2 h 14 a 2 2 0 0 1 2 2 z",
    music: "M 9 18 V 5 l 12 -2 v 13 M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
    sliders: "M 21 4 L 14 4 M 10 4 L 3 4 M 21 12 L 12 12 M 8 12 L 3 12 M 21 20 L 16 20 M 12 20 L 3 20 M 14 2 L 14 6 M 8 10 L 8 14 M 16 18 L 16 22",
    headphones: "M 3 14 h 3 a 2 2 0 0 1 2 2 v 3 a 2 2 0 0 1 -2 2 H 5 a 2 2 0 0 1 -2 -2 v -7 a 9 9 0 0 1 18 0 v 7 a 2 2 0 0 1 -2 2 h -1 a 2 2 0 0 1 -2 -2 v -3 a 2 2 0 0 1 2 -2 h 3",
    vol: "M 11 4.702 a .705 .705 0 0 0 -1.203 -.498 L 6.413 7.587 A 1.4 1.4 0 0 1 5.416 8 H 3 a 1 1 0 0 0 -1 1 v 6 a 1 1 0 0 0 1 1 h 2.416 a 1.4 1.4 0 0 1 .997 .413 l 3.383 3.384 A .705 .705 0 0 0 11 19.298 z M 16 9 a 5 5 0 0 1 0 6 M 19.364 18.364 a 9 9 0 0 0 0 -12.728",
    volx: "M 11 4.702 a .705 .705 0 0 0 -1.203 -.498 L 6.413 7.587 A 1.4 1.4 0 0 1 5.416 8 H 3 a 1 1 0 0 0 -1 1 v 6 a 1 1 0 0 0 1 1 h 2.416 a 1.4 1.4 0 0 1 .997 .413 l 3.383 3.384 A .705 .705 0 0 0 11 19.298 z M 22 9 L 16 15 M 16 9 L 22 15",
    chevR: "M 9 18 l 6 -6 -6 -6",
    chevD: "M 6 9 l 6 6 6 -6",
    max: "M 15 3 L 21 3 L 21 9 M 9 21 L 3 21 L 3 15 M 21 3 L 14 10 M 3 21 L 10 14",
    gear: "M 12.22 2 h -.44 a 2 2 0 0 0 -2 2 v .18 a 2 2 0 0 1 -1 1.73 l -.43 .25 a 2 2 0 0 1 -2 0 l -.15 -.08 a 2 2 0 0 0 -2.73 .73 l -.22 .38 a 2 2 0 0 0 .73 2.73 l .15 .1 a 2 2 0 0 1 1 1.72 v .51 a 2 2 0 0 1 -1 1.74 l -.15 .09 a 2 2 0 0 0 -.73 2.73 l .22 .38 a 2 2 0 0 0 2.73 .73 l .15 -.08 a 2 2 0 0 1 2 0 l .43 .25 a 2 2 0 0 1 1 1.73 V 20 a 2 2 0 0 0 2 2 h .44 a 2 2 0 0 0 2 -2 v -.18 a 2 2 0 0 1 1 -1.73 l .43 -.25 a 2 2 0 0 1 2 0 l .15 .08 a 2 2 0 0 0 2.73 -.73 l .22 -.39 a 2 2 0 0 0 -.73 -2.73 l -.15 -.08 a 2 2 0 0 1 -1 -1.74 v -.5 a 2 2 0 0 1 1 -1.74 l .15 -.09 a 2 2 0 0 0 .73 -2.73 l -.22 -.38 a 2 2 0 0 0 -2.73 -.73 l -.15 .08 a 2 2 0 0 1 -2 0 l -.43 -.25 a 2 2 0 0 1 -1 -1.73 V 4 a 2 2 0 0 0 -2 -2 z M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
    power: "M 12 2 v 10 M 18.4 6.6 a 9 9 0 1 1 -12.77 .04",
    mic: "M 12 2 a 3 3 0 0 0 -3 3 v 7 a 3 3 0 0 0 6 0 V 5 a 3 3 0 0 0 -3 -3 Z M 19 10 v 2 a 7 7 0 0 1 -14 0 v -2 M 12 19 L 12 22",
    micOff: "M 2 2 L 22 22 M 18.89 13.23 A 7.12 7.12 0 0 0 19 12 v -2 M 5 10 v 2 a 7 7 0 0 0 12 5 M 15 9.34 V 5 a 3 3 0 0 0 -5.68 -1.33 M 9 9 v 3 a 3 3 0 0 0 5.12 2.12 M 12 19 L 12 22",
    star: "M 11.525 2.295 a .53 .53 0 0 1 .95 0 l 2.31 4.679 a 2.123 2.123 0 0 0 1.595 1.16 l 5.166 .756 a .53 .53 0 0 1 .294 .904 l -3.736 3.638 a 2.123 2.123 0 0 0 -.611 1.878 l .882 5.14 a .53 .53 0 0 1 -.771 .56 l -4.618 -2.428 a 2.122 2.122 0 0 0 -1.973 0 L 6.396 21.01 a .53 .53 0 0 1 -.77 -.56 l .881 -5.139 a 2.122 2.122 0 0 0 -.611 -1.879 L 2.16 9.795 a .53 .53 0 0 1 .294 -.906 l 5.165 -.755 a 2.122 2.122 0 0 0 1.597 -1.16 z",
    minus: "M 5 12 h 14",
    square: "M 5 3 h 14 a 2 2 0 0 1 2 2 v 14 a 2 2 0 0 1 -2 2 h -14 a 2 2 0 0 1 -2 -2 v -14 a 2 2 0 0 1 2 -2 Z",
    x: "M 18 6 6 18 M 6 6 l 12 12",
    speaker: "M 6 2 h 12 a 2 2 0 0 1 2 2 v 16 a 2 2 0 0 1 -2 2 h -12 a 2 2 0 0 1 -2 -2 v -16 a 2 2 0 0 1 2 -2 Z M 12 6 h .01 M 8 14 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 Z M 12 14 h .01",
    layers: "M 12.83 2.18 a 2 2 0 0 0 -1.66 0 L 2.6 6.08 a 1 1 0 0 0 0 1.83 l 8.58 3.91 a 2 2 0 0 0 1.66 0 l 8.58 -3.9 a 1 1 0 0 0 0 -1.83 Z M 22 17.65 l -9.17 4.16 a 2 2 0 0 1 -1.66 0 L 2 17.65 M 22 12.65 l -9.17 4.16 a 2 2 0 0 1 -1.66 0 L 2 12.65",
    search: "M 3 11 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 Z M 21 21 l -4.3 -4.3",
  };
  const ic = (name, size, color, sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name]}"/></svg>`;

  // ── State ────────────────────────────────────────────────────────────────
  const GROUPS = [
    { id: "game", name: "Oyun", icon: "gamepad", from: "#ff8a4c", to: "#ff3d71", glow: "rgba(255,77,113,.35)" },
    { id: "chat", name: "Sohbet", icon: "chat", from: "#4cc4ff", to: "#5b8cff", glow: "rgba(91,140,255,.35)" },
    { id: "media", name: "Medya", icon: "music", from: "#34e7a6", to: "#22c55e", glow: "rgba(52,231,166,.32)" },
    { id: "aux", name: "Aux", icon: "sliders", from: "#b98cff", to: "#8b5cf6", glow: "rgba(139,92,246,.35)" },
  ];
  const PROFILES = [
    { name: "Günlük", vols: { game: 0.7, chat: 1, media: 0.55, aux: 0.4 }, mix: 0 },
    { name: "Oyun gecesi", vols: { game: 1, chat: 0.85, media: 0.25, aux: 0.12 }, mix: -0.3 },
  ];
  // status: 2 = Etkin (playing), 1 = Boşta (open, silent), 0 = Kapalı (closed)
  const APPS = {
    game: [["Valorant", 2, "#ff4655"], ["Riot Client", 1, "#d13639"], ["Steam", 0, "#1b2838"]],
    chat: [["Discord", 2, "#5865f2"], ["Discord PTB", 0, "#5865f2"]],
    media: [["Spotify", 2, "#1db954"], ["Chrome", 1, "#4285f4"]],
    aux: [["Wallpaper Engine", 1, "#2f6fdf"]],
  };
  const DETECTED = [["Notchify", 2], ["NVIDIA Broadcast", 2], ["OBS Studio", 1], ["System Sounds", 1], ["Windows Ses Aygıtı", 2]];

  function newState() {
    const s = { profile: 0, mix: 0, mic: { vol: 1, muted: false }, view: "flyout", open: { media: true }, g: {}, trims: {}, appMuted: {} };
    GROUPS.forEach((g) => { s.g[g.id] = { vol: PROFILES[0].vols[g.id], muted: false }; });
    return s;
  }

  const pct = (v) => Math.round(v * 100) + "%";
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ── Styles ───────────────────────────────────────────────────────────────
  const CSS = `
.gp-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);user-select:none;-webkit-user-select:none;
  font-family:"Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif;color:#fff;
  background:radial-gradient(60% 80% at 15% 105%,rgba(255,120,80,.35),transparent 70%),radial-gradient(55% 80% at 90% 100%,rgba(91,140,255,.42),transparent 70%),radial-gradient(45% 55% at 60% 30%,rgba(139,92,246,.22),transparent 70%),linear-gradient(180deg,#0a0d1c 0%,#141a3a 60%,#1d2150 100%)}
.gp-demo *{box-sizing:border-box;cursor:none!important}
.gp-stage{position:relative;display:flex;justify-content:center;padding:22px 16px 64px}
.gp-fly{width:350px;max-width:100%;background:#0e1117;border:1px solid rgba(255,255,255,.10);border-radius:18px;box-shadow:0 14px 40px rgba(0,0,0,.55);padding-bottom:4px}
.gp-head{display:flex;align-items:center;justify-content:space-between;margin:12px 12px 8px 16px}
.gp-brand{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(255,255,255,.8);letter-spacing:.02em}
.gp-brand img{width:18px;height:18px;border-radius:5px;display:block}
.gp-hbtn{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;transition:background .12s}
.gp-hbtn:hover{background:rgba(255,255,255,.10)}
.gp-chips{display:flex;flex-wrap:wrap;margin:0 14px 2px}
.gp-chip{font-size:12px;font-weight:600;padding:5px 11px;border-radius:10px;margin:0 6px 6px 0;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:rgba(255,255,255,.65);transition:background .15s,border-color .15s}
.gp-chip.on{background:rgba(99,102,241,.28);border-color:rgba(129,140,248,.6);color:rgba(255,255,255,.95)}
.gp-div{height:1px;background:rgba(255,255,255,.07);margin:4px 14px}
.gp-rows{margin:0 6px}
.gp-row{border-radius:14px;padding:4px 4px 0;margin-bottom:2px;transition:background .12s}
.gp-row:hover{background:rgba(255,255,255,.03)}
.gp-line{display:flex;align-items:center;height:40px}
.gp-exp{width:22px;height:36px;display:grid;place-items:center}
.gp-exp svg{transition:transform .18s cubic-bezier(.16,1,.3,1)}
.gp-row.open .gp-exp svg{transform:rotate(90deg)}
.gp-tile{position:relative;flex:none;width:34px;height:34px;border-radius:11px;display:grid;place-items:center;transition:filter .2s}
.gp-badge{position:absolute;right:-3px;top:-3px;width:11px;height:11px;border-radius:50%;background:#34d399;border:2px solid #0e1117;display:none}
.gp-name{width:64px;margin:0 8px 0 10px;font-size:13.5px;font-weight:500;color:rgba(255,255,255,.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gp-pct{width:42px;margin:0 6px 0 8px;text-align:right;font-size:12px;font-weight:600;color:rgba(255,255,255,.65);font-variant-numeric:tabular-nums}
.gp-mute{flex:none;width:32px;height:32px;border-radius:10px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);transition:background .12s}
.gp-mute:hover{background:rgba(255,255,255,.10)}
.gp-mute.on{background:rgba(239,68,68,.15);border-color:rgba(248,113,113,.40)}
.gp-sl{position:relative;flex:1;min-width:60px;height:24px;touch-action:none}
.gp-tr{position:absolute;left:0;right:0;top:50%;height:8px;margin-top:-4px;border-radius:4px;background:rgba(255,255,255,.08)}
.gp-fill{position:absolute;left:0;top:50%;height:8px;margin-top:-4px;border-radius:4px}
.gp-th{position:absolute;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.55);transition:transform .12s}
.gp-sl:active .gp-th{transform:scale(1.12)}
.gp-sl.sm .gp-tr,.gp-sl.sm .gp-fill{height:6px;margin-top:-3px}
.gp-sl.sm .gp-th{width:12px;height:12px;margin:-6px 0 0 -6px}
.gp-sl.mic .gp-th{width:14px;height:14px;margin:-7px 0 0 -7px}
.gp-sl.off{opacity:.4}
.gp-apps{margin:4px 0 6px;animation:gpIn .2s ease}
@keyframes gpIn{from{opacity:0}to{opacity:1}}
.gp-app{display:flex;align-items:center;height:34px;margin:0 4px 0 26px}
.gp-app-n{display:flex;align-items:center;flex:1.1;min-width:90px;font-size:12.5px;color:rgba(255,255,255,.85)}
.gp-app-n.closed{color:rgba(255,255,255,.4)}
.gp-lb{flex:none;width:18px;height:18px;border-radius:4px;display:grid;place-items:center;font-size:10px;margin-right:8px;color:#fff}
.gp-app-n span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:98px}
.gp-dot{flex:none;width:6px;height:6px;border-radius:50%;margin:0 6px 0 4px}
.gp-app .gp-sl{flex:1}
.gp-app-p{width:36px;margin:0 4px 0 6px;text-align:right;font-size:11px;font-weight:600;color:rgba(255,255,255,.55);font-variant-numeric:tabular-nums}
.gp-amute{flex:none;width:26px;height:26px;border-radius:8px;display:grid;place-items:center}
.gp-amute:hover{background:rgba(255,255,255,.10)}
.gp-mix{display:flex;align-items:center;margin:10px 20px 6px}
.gp-bal{position:relative;flex:1;margin:0 14px;height:24px;touch-action:none}
.gp-bal .gp-tr{height:8px;background:rgba(255,255,255,.10)}
.gp-tick{position:absolute;left:50%;top:50%;width:2px;height:12px;margin:-6px 0 0 -1px;border-radius:1px;background:rgba(255,255,255,.25)}
.gp-bal .gp-th{width:18px;height:18px;margin:-9px 0 0 -9px;box-shadow:0 0 0 2px rgba(0,0,0,.2),0 2px 8px rgba(0,0,0,.4)}
.gp-micrw{display:flex;align-items:center;margin:2px 16px 6px}
.gp-micb{flex:none;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06)}
.gp-micb:hover{background:rgba(255,255,255,.12)}
.gp-micb.on{background:rgba(239,68,68,.20);border-color:rgba(248,113,113,.55)}
.gp-micrw .gp-sl{margin:0 8px 0 12px}
.gp-micp{width:40px;text-align:right;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.55);font-variant-numeric:tabular-nums}
.gp-acts{margin:4px 8px 4px}
.gp-act{display:flex;align-items:center;height:42px;border-radius:12px;padding:0 10px;font-size:13.5px;color:rgba(255,255,255,.85);transition:background .12s}
.gp-act:hover{background:rgba(255,255,255,.06)}
.gp-act.danger{color:#fca5a5}.gp-act.danger:hover{background:rgba(239,68,68,.10)}
.gp-act i{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;margin-right:12px;background:rgba(255,255,255,.07)}
.gp-act.danger i{background:rgba(239,68,68,.14)}
.gp-task{position:absolute;left:0;right:0;bottom:0;height:44px;display:flex;align-items:center;justify-content:flex-end;gap:14px;padding:0 16px;background:rgba(10,12,20,.82);border-top:1px solid rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-size:11px;color:rgba(255,255,255,.85)}
.gp-task img{width:22px;height:22px;border-radius:6px;padding:3px;background:rgba(255,255,255,.10);box-sizing:content-box}
.gp-clock{text-align:right;line-height:1.3}
.gp-toast{position:absolute;z-index:2;left:16px;bottom:15px;font-size:11.5px;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:7px;pointer-events:none}
.gp-toast::before{content:"";width:7px;height:7px;border-radius:50%;background:#58a6ff;box-shadow:0 0 8px #58a6ff}
/* main window */
.gp-winwrap{position:relative;width:100%;overflow:hidden}
.gp-win{position:absolute;left:0;top:0;width:1180px;height:700px;transform-origin:0 0;background:linear-gradient(180deg,#121420,#0b0d14);border:1px solid rgba(255,255,255,.08);border-radius:10px;box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden}
.gp-win::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 90% 0%,rgba(139,92,246,.10),transparent 70%);pointer-events:none}
.gp-tb{position:relative;display:flex;align-items:center;height:34px;padding:0 6px 0 14px}
.gp-tb .gp-brand{flex:1}
.gp-tbb{width:34px;height:28px;display:grid;place-items:center;border-radius:6px}
.gp-tbb:hover{background:rgba(255,255,255,.08)}
.gp-tbb.x:hover{background:#c42b1c}
.gp-cmx{position:relative;display:flex;align-items:center;gap:12px;margin:8px 12px 12px;height:52px;padding:0 14px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07)}
.gp-cmx-t{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,#ff8a4c,#38bdf8)}
.gp-cmx b{font-size:14px;font-weight:600}
.gp-cmx .gp-bal{flex:1.4;margin:0 4px}
.gp-side{font-size:11.5px;color:rgba(255,255,255,.75);white-space:nowrap}
.gp-cmx .gp-sl{flex:none;width:96px}
.gp-pill{display:flex;align-items:center;gap:7px;height:30px;padding:0 11px;border-radius:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);font-size:12.5px;font-weight:600;white-space:nowrap}
.gp-cols{position:relative;display:flex;gap:14px;margin:0 12px;height:600px}
.gp-card{position:relative;flex:1;border-radius:18px;padding:16px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);overflow:hidden}
.gp-card::before{content:"";position:absolute;left:0;right:0;top:0;height:120px;background:radial-gradient(90% 100% at 30% 0%,var(--gl),transparent 70%);pointer-events:none;transition:opacity .2s}
.gp-card.muted::before{opacity:.25}
.gp-ch{position:relative;display:flex;align-items:center;gap:12px}
.gp-ch .gp-tile{width:38px;height:38px;border-radius:12px}
.gp-ch b{display:block;font-size:16px;font-weight:600}
.gp-ch small{font-size:11px;color:rgba(255,255,255,.55)}
.gp-ch .gp-mute{margin-left:auto;width:34px;height:34px}
.gp-cv{position:relative;display:flex;align-items:center;gap:10px;margin-top:16px}
.gp-big{font-size:19px;font-weight:700;font-variant-numeric:tabular-nums;width:56px;text-align:right}
.gp-big small{font-size:12px;font-weight:600;color:rgba(255,255,255,.7)}
.gp-meter{position:relative;height:3px;border-radius:2px;background:rgba(255,255,255,.06);margin:6px 66px 14px 0;overflow:hidden}
.gp-meter i{position:absolute;left:0;top:0;bottom:0;border-radius:2px;width:0}
.gp-out{position:relative;display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;border-radius:9px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);font-size:12px;color:rgba(255,255,255,.85)}
.gp-out span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gp-lbl{position:relative;font-size:10.5px;font-weight:700;letter-spacing:.06em;color:rgba(255,255,255,.55);margin:18px 0 8px}
.gp-ai{position:relative;display:flex;align-items:center;gap:10px;height:46px;padding:0 10px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.035);margin-bottom:7px}
.gp-ai.closed{opacity:.55;background:transparent}
.gp-ai .gp-lb{width:22px;height:22px;border-radius:6px;margin:0;font-size:11px}
.gp-ai b{display:block;font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gp-st{display:flex;align-items:center;gap:5px;font-size:10.5px;color:rgba(255,255,255,.55)}
.gp-st i{width:6px;height:6px;border-radius:50%}
.gp-st.on{color:#34d399}
.gp-det{position:relative;width:250px;flex:none;border-radius:18px;padding:16px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.gp-det h4{margin:0 0 12px;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.06em;color:rgba(255,255,255,.75)}
.gp-det h4 span{font-size:10.5px;padding:1px 7px;border-radius:99px;background:rgba(255,255,255,.08)}
.gp-srch{display:flex;align-items:center;gap:8px;height:34px;padding:0 11px;border-radius:9px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);font-size:12.5px;color:rgba(255,255,255,.45);margin-bottom:10px}
.gp-det p{position:absolute;left:14px;right:14px;bottom:12px;margin:0;font-size:10.5px;color:rgba(255,255,255,.45)}
`;

  function injectCss() {
    if (document.getElementById("gp-demo-css")) return;
    const st = document.createElement("style");
    st.id = "gp-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // ── Demo ─────────────────────────────────────────────────────────────────
  function Demo(root, logo) {
    const s = newState();
    const G = (id) => GROUPS.find((g) => g.id === id);
    const active = (id) => !s.g[id].muted && APPS[id].some(([n, st]) => st === 2 && !s.appMuted[n]);

    // Sliders: data-k names the value; get/set map it to state.
    const val = {
      get(k) {
        const [a, b] = k.split(":");
        if (a === "g") return s.g[b].vol;
        if (a === "t") return s.trims[b] ?? 1;
        if (a === "mic") return s.mic.vol;
        if (a === "mix") return s.mix;
      },
      set(k, v) {
        const [a, b] = k.split(":");
        if (a === "g") s.g[b].vol = v;
        else if (a === "t") s.trims[b] = v;
        else if (a === "mic") s.mic.vol = v;
        else if (a === "mix") s.mix = Math.abs(v) < 0.04 ? 0 : v; // detent at the centre
      },
    };

    const slider = (k, from, to, cls = "") =>
      `<div class="gp-sl ${cls}" data-k="${k}"><div class="gp-tr"></div><div class="gp-fill" style="background:linear-gradient(90deg,${from},${to});box-shadow:0 0 10px ${to}55"></div><div class="gp-th"></div></div>`;
    const balance = () => `<div class="gp-bal" data-k="mix"><div class="gp-tr"></div><div class="gp-fill"></div><div class="gp-tick"></div><div class="gp-th"></div></div>`;
    const tile = (g, size, isz) => `<div class="gp-tile" data-tile="${g.id}" style="background:linear-gradient(135deg,${g.from},${g.to})">${ic(g.icon, isz, "#0B0D12", 2.5)}<i class="gp-badge" data-badge="${g.id}"></i></div>`;
    const letter = (n, c) => `<i class="gp-lb" style="background:${c}">${esc(n[0])}</i>`;
    const chips = () => `<div class="gp-chips">${PROFILES.map((p, i) => `<div class="gp-chip ${i === s.profile ? "on" : ""}" data-prof="${i}">${esc(p.name)}</div>`).join("")}</div>`;

    function flyout() {
      const rows = GROUPS.map((g) => {
        const open = !!s.open[g.id];
        const apps = open ? `<div class="gp-apps">${APPS[g.id].map(([n, st, c]) => `
          <div class="gp-app"><div class="gp-app-n ${st === 0 ? "closed" : ""}">${letter(n, st === 0 ? "rgba(255,255,255,.10)" : c)}<span>${esc(n)}</span><i class="gp-dot" style="${st === 2 ? "background:#34d399" : st === 0 ? "border:1px solid rgba(255,255,255,.25)" : ""}"></i></div>
          ${slider("t:" + n, g.from, g.to, "sm")}<span class="gp-app-p" data-p="t:${n}"></span>
          <div class="gp-amute" data-amute="${esc(n)}"></div></div>`).join("")}</div>` : "";
        return `<div class="gp-row ${open ? "open" : ""}"><div class="gp-line">
          <div class="gp-exp" data-exp="${g.id}">${ic("chevR", 14, "rgba(255,255,255,.45)")}</div>${tile(g, 34, 17)}
          <div class="gp-name" data-exp="${g.id}">${g.name}</div>${slider("g:" + g.id, g.from, g.to)}
          <span class="gp-pct" data-p="g:${g.id}"></span><div class="gp-mute" data-mute="${g.id}"></div></div>${apps}</div>`;
      }).join("");
      return `<div class="gp-stage"><div class="gp-fly">
        <div class="gp-head"><div class="gp-brand"><img src="${logo}" alt="">GROUPY</div><div class="gp-hbtn" data-act="main">${ic("max", 14, "rgba(255,255,255,.5)")}</div></div>
        ${chips()}<div class="gp-div"></div><div class="gp-rows">${rows}</div><div class="gp-div"></div>
        <div class="gp-mix">${ic("gamepad", 17, "rgba(255,138,76,.9)")}${balance()}${ic("chat", 17, "rgba(94,200,255,.9)")}</div>
        <div class="gp-micrw"><div class="gp-micb" data-act="mic"></div>${slider("mic", "#ff8ad8", "#e0449e", "mic")}<span class="gp-micp" data-p="mic"></span></div>
        <div class="gp-div"></div>
        <div class="gp-acts">
          <div class="gp-act" data-act="main"><i>${ic("max", 15, "rgba(255,255,255,.75)", 2.2)}</i>Groupy'yi aç</div>
          <div class="gp-act" data-act="main"><i>${ic("gear", 15, "rgba(255,255,255,.75)", 2.2)}</i>Ayarlar</div>
          <div class="gp-act danger" data-act="quit"><i>${ic("power", 15, "#fca5a5", 2.2)}</i>Çıkış</div>
        </div></div></div>
        <div class="gp-toast">Kaydır, sessize al, profili değiştir</div>
        <div class="gp-task">${ic("chevD", 14, "rgba(255,255,255,.8)").replace('d="M 6 9', 'transform="rotate(180 12 12)" d="M 6 9')}<img src="${logo}" alt="">${ic("vol", 17, "rgba(255,255,255,.85)")}<div class="gp-clock">21 Ekim 2026<br>21:30</div></div>`;
    }

    function mainWin() {
      const gameSide = GROUPS.filter((g) => g.id !== "chat").map((g) => g.name).join(", ");
      const cards = GROUPS.map((g) => {
        const apps = APPS[g.id];
        const out = g.id === "media" ? "Hoparlörler (Realtek Audio)" : "Varsayılan çıkış";
        return `<div class="gp-card" data-card="${g.id}" style="--gl:${g.glow}">
          <div class="gp-ch">${tile(g, 38, 19)}<div><b>${g.name}</b><small>${apps.length} uygulama</small></div><div class="gp-mute" data-mute="${g.id}"></div></div>
          <div class="gp-cv">${slider("g:" + g.id, g.from, g.to)}<span class="gp-big" data-big="${g.id}"></span></div>
          <div class="gp-meter"><i data-meter="${g.id}" style="background:linear-gradient(90deg,${g.from},${g.to})"></i></div>
          <div class="gp-out">${ic("speaker", 14, "rgba(255,255,255,.6)")}<span>${out}</span>${ic("chevD", 14, "rgba(255,255,255,.5)")}</div>
          <div class="gp-lbl">UYGULAMALAR</div>
          ${apps.map(([n, st, c]) => `<div class="gp-ai ${st === 0 ? "closed" : ""}">${letter(n, st === 0 ? "rgba(255,255,255,.12)" : c)}<div style="min-width:0"><b>${esc(n)}</b><span class="gp-st ${st === 2 ? "on" : ""}"><i style="${st === 2 ? "background:#34d399" : st === 1 ? "background:rgba(255,255,255,.45)" : "border:1px solid rgba(255,255,255,.35)"}"></i>${["Kapalı", "Boşta", "Etkin"][st]}</span></div></div>`).join("")}
        </div>`;
      }).join("");
      return `<div class="gp-winwrap"><div class="gp-win">
        <div class="gp-tb"><div class="gp-brand"><img src="${logo}" alt="">GROUPY</div>
          <div class="gp-tbb">${ic("star", 15, "#e5b72e")}</div><div class="gp-tbb">${ic("gear", 15, "rgba(255,255,255,.7)")}</div>
          <div class="gp-tbb" data-act="fly">${ic("minus", 15, "rgba(255,255,255,.7)")}</div><div class="gp-tbb">${ic("square", 13, "rgba(255,255,255,.7)")}</div><div class="gp-tbb x" data-act="fly">${ic("x", 15, "rgba(255,255,255,.8)")}</div></div>
        <div class="gp-cmx"><div class="gp-cmx-t">${ic("headphones", 15, "#0B0D12", 2.4)}</div><b>ChatMix</b>
          <span class="gp-side" style="color:#fbbf24;font-weight:600">Oyun</span>${balance()}<span class="gp-side" style="color:#38bdf8;font-weight:600">Sohbet</span>
          <span class="gp-side"><span style="color:#ff7a50">Oyun tarafı</span> ${gameSide}</span><span class="gp-side"><span style="color:#38bdf8">Sohbet tarafı</span> Sohbet</span>
          <div class="gp-micb" data-act="mic"></div>${slider("mic", "#ff8ad8", "#e0449e", "mic")}
          <div class="gp-pill">${ic("layers", 14, "rgba(255,255,255,.8)")}<span data-prof="next">${esc(PROFILES[s.profile].name)}</span></div>
          <div class="gp-pill">Gruplar ${ic("chevD", 13, "rgba(255,255,255,.7)")}</div></div>
        <div class="gp-cols">${cards}
          <div class="gp-det"><h4>ALGILANAN UYGULAMALAR <span>${DETECTED.length}</span></h4>
            <div class="gp-srch">${ic("search", 14, "rgba(255,255,255,.45)")}Uygulama ara</div>
            ${DETECTED.map(([n, st]) => `<div class="gp-ai">${letter(n, "rgba(255,255,255,.12)")}<div style="min-width:0"><b>${esc(n)}</b><span class="gp-st ${st === 2 ? "on" : ""}"><i style="background:${st === 2 ? "#34d399" : "rgba(255,255,255,.45)"}"></i>${st === 2 ? "Etkin" : "Boşta"}</span></div></div>`).join("")}
            <p>Bir uygulamayı gruba sürükleyin ya da tıklayın</p></div>
        </div></div></div>
        <div class="gp-toast">Pencereyi kapatınca tepsi paneline dönersin</div>`;
    }

    // ── Render + live updates ─────────────────────────────────────────────
    function fitWindow() {
      const wrap = root.querySelector(".gp-winwrap");
      if (!wrap) return;
      const k = Math.min(1, (root.clientWidth - 24) / 1180);
      const win = wrap.firstElementChild;
      win.style.transform = `translate(12px,12px) scale(${k})`;
      wrap.style.height = Math.round(700 * k + 24 + 40) + "px";
    }

    function render() {
      root.innerHTML = s.view === "flyout" ? flyout() : mainWin();
      fitWindow();
      update();
    }

    function setSlider(el, v, disabled) {
      const k = el.dataset.k;
      if (k === "mix") {
        const x = (v + 1) / 2;
        el.querySelector(".gp-th").style.left = x * 100 + "%";
        const f = el.querySelector(".gp-fill");
        f.style.background = v >= 0 ? "linear-gradient(90deg,#38bdf8,#5b8cff)" : "linear-gradient(90deg,#ff8a4c,#ff3d71)";
        f.style.left = Math.min(x, 0.5) * 100 + "%";
        f.style.width = Math.abs(x - 0.5) * 100 + "%";
        return;
      }
      el.querySelector(".gp-th").style.left = v * 100 + "%";
      el.querySelector(".gp-fill").style.width = v * 100 + "%";
      el.classList.toggle("off", !!disabled);
    }

    function update() {
      root.querySelectorAll(".gp-sl,.gp-bal").forEach((el) => {
        const k = el.dataset.k, [a, b] = k.split(":");
        const dis = (a === "g" && s.g[b].muted) || (a === "t" && s.appMuted[b]) || (a === "mic" && s.mic.muted);
        setSlider(el, a === "mic" && s.mic.muted ? 0 : val.get(k), dis);
      });
      root.querySelectorAll("[data-p]").forEach((el) => {
        const k = el.dataset.p;
        el.textContent = k === "mic" && s.mic.muted ? "Sessiz" : pct(val.get(k));
        const [a, b] = k.split(":");
        el.style.color = a === "g" && s.g[b].muted ? "rgba(255,255,255,.30)" : "";
      });
      root.querySelectorAll("[data-big]").forEach((el) => {
        const g = s.g[el.dataset.big];
        el.innerHTML = `${Math.round(g.vol * 100)}<small>%</small>`;
        el.style.opacity = g.muted ? 0.4 : 1;
      });
      root.querySelectorAll("[data-mute]").forEach((el) => {
        const m = s.g[el.dataset.mute].muted;
        el.classList.toggle("on", m);
        el.innerHTML = ic(m ? "volx" : "vol", 15, m ? "#fca5a5" : "rgba(255,255,255,.7)");
      });
      root.querySelectorAll("[data-amute]").forEach((el) => {
        const m = !!s.appMuted[el.dataset.amute];
        el.innerHTML = ic(m ? "volx" : "vol", 13, m ? "#fca5a5" : "rgba(255,255,255,.55)");
      });
      root.querySelectorAll("[data-tile]").forEach((el) => { el.style.filter = s.g[el.dataset.tile].muted ? "grayscale(.7)" : ""; });
      root.querySelectorAll("[data-badge]").forEach((el) => { el.style.display = active(el.dataset.badge) ? "block" : "none"; });
      root.querySelectorAll("[data-card]").forEach((el) => el.classList.toggle("muted", s.g[el.dataset.card].muted));
      root.querySelectorAll(".gp-micb").forEach((el) => {
        el.classList.toggle("on", s.mic.muted);
        el.innerHTML = ic(s.mic.muted ? "micOff" : "mic", 15, s.mic.muted ? "#fca5a5" : "rgba(255,255,255,.75)");
      });
    }

    // Profile switch: glide the group volumes to the profile's values (the app snaps; a short ease reads better here).
    let anim = null;
    function applyProfile(i) {
      s.profile = i;
      const p = PROFILES[i], start = {}, t0 = performance.now(), mix0 = s.mix;
      GROUPS.forEach((g) => { start[g.id] = s.g[g.id].vol; });
      cancelAnimationFrame(anim);
      const step = (now) => {
        const t = Math.min(1, (now - t0) / 380), e = 1 - Math.pow(1 - t, 3);
        GROUPS.forEach((g) => { s.g[g.id].vol = start[g.id] + (p.vols[g.id] - start[g.id]) * e; });
        s.mix = mix0 + (p.mix - mix0) * e;
        update();
        if (t < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
      root.querySelectorAll("[data-prof]").forEach((el) => {
        if (el.dataset.prof === "next") el.textContent = p.name;
        else el.classList.toggle("on", +el.dataset.prof === i);
      });
    }

    // Level meters in the main window: a soft fake signal for groups with a playing app.
    let lastMeter = 0;
    function meters(now) {
      if (s.view === "main" && now - lastMeter > 50 && root.isConnected) {
        lastMeter = now;
        root.querySelectorAll("[data-meter]").forEach((el, i) => {
          const id = el.dataset.meter;
          const lv = active(id) ? s.g[id].vol * (0.55 + 0.3 * Math.sin(now / 170 + i * 1.7) + 0.15 * Math.sin(now / 61 + i)) : 0;
          el.style.width = clamp(lv, 0, 1) * 100 + "%";
        });
      }
      requestAnimationFrame(meters);
    }
    requestAnimationFrame(meters);

    // ── Input ─────────────────────────────────────────────────────────────
    let drag = null;
    root.addEventListener("pointerdown", (e) => {
      const sl = e.target.closest(".gp-sl,.gp-bal");
      if (sl) {
        const k = sl.dataset.k, [a, b] = k.split(":");
        if ((a === "g" && s.g[b].muted) || (a === "t" && s.appMuted[b]) || (a === "mic" && s.mic.muted)) return;
        drag = sl;
        sl.setPointerCapture(e.pointerId);
        move(e);
        e.preventDefault();
      }
    });
    function move(e) {
      if (!drag) return;
      const r = drag.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const k = drag.dataset.k;
      val.set(k, k === "mix" ? x * 2 - 1 : Math.round(x * 100) / 100);
      update();
    }
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", () => { drag = null; });
    root.addEventListener("pointercancel", () => { drag = null; });
    root.addEventListener("click", (e) => {
      const t = e.target.closest("[data-mute],[data-amute],[data-exp],[data-prof],[data-act]");
      if (!t) return;
      const d = t.dataset;
      if (d.mute) { s.g[d.mute].muted = !s.g[d.mute].muted; update(); }
      else if (d.amute) { s.appMuted[d.amute] = !s.appMuted[d.amute]; update(); }
      else if (d.exp) { s.open[d.exp] = !s.open[d.exp]; render(); }
      else if (d.prof !== undefined) applyProfile(d.prof === "next" ? (s.profile + 1) % PROFILES.length : +d.prof);
      else if (d.act === "mic") { s.mic.muted = !s.mic.muted; update(); }
      else if (d.act === "main") { s.view = "main"; render(); }
      else if (d.act === "fly") { s.view = "flyout"; render(); }
      else if (d.act === "quit") { /* the demo keeps running */ }
    });
    window.addEventListener("resize", fitWindow);
    render();
  }

  window.GroupyDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("gp-demo");
      Demo(root, opts.logo || "/img/FluentMixer.png");
    },
  };
})();
