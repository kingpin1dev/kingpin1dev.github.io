/* VICE Sonar live demo for kingpindev.com.
   A working copy of the app's tray flyout (ui/flyout.py: Audio | EQ | RGB) and the
   Hotkeys page of its settings window, in the Aqua theme. Colours and sizes follow
   ui/styles.py and ui/flyout.py. Mount with SonarDemo.mount(el, { logo }). */
(function () {
  "use strict";

  const AC = "#38BDF8", AC_H = "#7DD3FC";
  const P = {
    sliders: "M 21 4 L 14 4 M 10 4 L 3 4 M 21 12 L 12 12 M 8 12 L 3 12 M 21 20 L 16 20 M 12 20 L 3 20 M 14 2 L 14 6 M 8 10 L 8 14 M 16 18 L 16 22",
    gamepad: "M 6 11 L 10 11 M 8 9 L 8 13 M 15 12 L 15.01 12 M 18 10 L 18.01 10 M 17.32 5 H 6.68 a 4 4 0 0 0 -3.978 3.59 c -.006 .052 -.01 .101 -.017 .152 C 2.604 9.416 2 14.456 2 16 a 3 3 0 0 0 3 3 c 1 0 1.5 -.5 2 -1 l 1.414 -1.414 A 2 2 0 0 1 9.828 16 h 4.344 a 2 2 0 0 1 1.414 .586 L 17 18 c .5 .5 1 1 2 1 a 3 3 0 0 0 3 -3 c 0 -1.545 -.604 -6.584 -.685 -7.258 -.007 -.05 -.011 -.1 -.017 -.151 A 4 4 0 0 0 17.32 5 z",
    headphones: "M 3 14 h 3 a 2 2 0 0 1 2 2 v 3 a 2 2 0 0 1 -2 2 H 5 a 2 2 0 0 1 -2 -2 v -7 a 9 9 0 0 1 18 0 v 7 a 2 2 0 0 1 -2 2 h -1 a 2 2 0 0 1 -2 -2 v -3 a 2 2 0 0 1 2 -2 h 3",
    music: "M 9 18 V 5 l 12 -2 v 13 M 3 18 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z M 15 16 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
    speaker: "M 6 2 h 12 a 2 2 0 0 1 2 2 v 16 a 2 2 0 0 1 -2 2 h -12 a 2 2 0 0 1 -2 -2 v -16 a 2 2 0 0 1 2 -2 Z M 12 6 h .01 M 8 14 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 Z M 12 14 h .01",
    mic: "M 12 2 a 3 3 0 0 0 -3 3 v 7 a 3 3 0 0 0 6 0 V 5 a 3 3 0 0 0 -3 -3 Z M 19 10 v 2 a 7 7 0 0 1 -14 0 v -2 M 12 19 L 12 22",
    message: "M 7.9 20 A 9 9 0 1 0 4 16.1 L 2 22 Z",
    external: "M 15 3 h 6 v 6 M 10 14 L 21 3 M 18 13 v 6 a 2 2 0 0 1 -2 2 H 5 a 2 2 0 0 1 -2 -2 V 8 a 2 2 0 0 1 2 -2 h 6",
    gear: "M 12.22 2 h -.44 a 2 2 0 0 0 -2 2 v .18 a 2 2 0 0 1 -1 1.73 l -.43 .25 a 2 2 0 0 1 -2 0 l -.15 -.08 a 2 2 0 0 0 -2.73 .73 l -.22 .38 a 2 2 0 0 0 .73 2.73 l .15 .1 a 2 2 0 0 1 1 1.72 v .51 a 2 2 0 0 1 -1 1.74 l -.15 .09 a 2 2 0 0 0 -.73 2.73 l .22 .38 a 2 2 0 0 0 2.73 .73 l .15 -.08 a 2 2 0 0 1 2 0 l .43 .25 a 2 2 0 0 1 1 1.73 V 20 a 2 2 0 0 0 2 2 h .44 a 2 2 0 0 0 2 -2 v -.18 a 2 2 0 0 1 1 -1.73 l .43 -.25 a 2 2 0 0 1 2 0 l .15 .08 a 2 2 0 0 0 2.73 -.73 l .22 -.39 a 2 2 0 0 0 -.73 -2.73 l -.15 -.08 a 2 2 0 0 1 -1 -1.74 v -.5 a 2 2 0 0 1 1 -1.74 l .15 -.09 a 2 2 0 0 0 .73 -2.73 l -.22 -.38 a 2 2 0 0 0 -2.73 -.73 l -.15 .08 a 2 2 0 0 1 -2 0 l -.43 -.25 a 2 2 0 0 1 -1 -1.73 V 4 a 2 2 0 0 0 -2 -2 z M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
    x: "M 18 6 6 18 M 6 6 l 12 12",
    chev: "M 9 18 l 6 -6 -6 -6",
    check: "M 20 6 9 17 l -5 -5",
    bulb: "M 15 14 c .2 -1 .7 -1.7 1.5 -2.5 1 -.9 1.5 -2.2 1.5 -3.5 A 6 6 0 0 0 6 8 c 0 1 .2 2.2 1.5 3.5 .7 .7 1.3 1.5 1.5 2.5 M 9 18 h 6 M 10 22 h 4",
    keyboard: "M 10 8 h .01 M 12 12 h .01 M 14 8 h .01 M 16 12 h .01 M 18 8 h .01 M 6 8 h .01 M 7 16 h 10 M 8 12 h .01 M 4 4 h 16 a 2 2 0 0 1 2 2 v 12 a 2 2 0 0 1 -2 2 h -16 a 2 2 0 0 1 -2 -2 v -12 a 2 2 0 0 1 2 -2 Z",
    crown: "M 11.562 3.266 a .5 .5 0 0 1 .876 0 L 15.39 8.87 a 1 1 0 0 0 1.516 .294 L 21.183 5.5 a .5 .5 0 0 1 .798 .519 l -2.834 10.246 a 1 1 0 0 1 -.956 .734 H 5.81 a 1 1 0 0 1 -.957 -.734 L 2.02 6.02 a .5 .5 0 0 1 .798 -.519 l 4.276 3.664 a 1 1 0 0 0 1.516 -.294 z M 5 21 h 14",
    arrows: "M 8 3 L 4 7 l 4 4 M 4 7 h 16 M 16 21 l 4 -4 -4 -4 M 20 17 H 4",
    palette: "M 12 22 a 1 1 0 0 1 0 -20 a 10 9 0 0 1 10 9 a 5 5 0 0 1 -5 5 h -2.25 a 1.75 1.75 0 0 0 -1.4 2.8 l .3 .4 a 1.75 1.75 0 0 1 -1.4 2.8 z M 13.5 6.5 h .01 M 17.5 10.5 h .01 M 6.5 12.5 h .01 M 8.5 7.5 h .01",
    home: "M 15 21 v -8 a 1 1 0 0 0 -1 -1 h -4 a 1 1 0 0 0 -1 1 v 8 M 3 10 a 2 2 0 0 1 .709 -1.528 l 7 -5.999 a 2 2 0 0 1 2.582 0 l 7 5.999 A 2 2 0 0 1 21 10 v 9 a 2 2 0 0 1 -2 2 H 5 a 2 2 0 0 1 -2 -2 z",
    info: "M 2 12 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 Z M 12 16 v -4 M 12 8 h .01",
  };
  const ic = (n, size, color, sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;
  // The flyout's mute glyph is a filled speaker with waves (High Volume.png / Mute.png).
  const spk = (muted, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 9.5h3.6L11 5.4v13.2l-4.4-4.1H3z" fill="${muted ? "#f85149" : "#e6edf3"}"/>
    ${muted ? '<path d="M15.5 9.5l5 5M20.5 9.5l-5 5" stroke="#f85149" stroke-width="2" stroke-linecap="round"/>'
      : '<path d="M14.6 9.2a4 4 0 0 1 0 5.6M17.4 6.6a7.6 7.6 0 0 1 0 10.8" fill="none" stroke="#e6edf3" stroke-width="1.9" stroke-linecap="round"/>'}</svg>`;

  const CH = [
    { id: "master", name: "Master", icon: "sliders", g: ["#a855f7", "#6366f1"], hk: "crown" },
    { id: "game", name: "Game", icon: "gamepad", g: ["#12c2b6", "#37e57a"], route: true },
    { id: "chat", name: "Chat", icon: "headphones", g: ["#ff5da2", "#a24bff"], route: true },
    { id: "media", name: "Media", icon: "music", g: ["#4f8bff", "#00d4ff"], route: true },
    { id: "aux", name: "Aux", icon: "speaker", g: ["#14b8a6", "#5eead4"], route: true },
  ];
  const DEVICES = ["Headphones (Arctis Nova 7)", "Speakers (Realtek Audio)", "Monitor (NVIDIA HD Audio)"];
  const EQ = [
    { id: "game", name: "Game", icon: "gamepad", g: ["#12c2b6", "#37e57a"], list: ["Valorant Pro Preset", "League of Legends", "Apex Legends", "ARC Raiders", "Flat"] },
    { id: "chat", name: "Chat", icon: "headphones", g: ["#ff5da2", "#a24bff"], list: ["Less Nasal", "Clarity", "Broadcast", "Balanced", "Flat"] },
    { id: "mic", name: "Mic", icon: "mic", g: ["#fbbf24", "#f97316"], list: ["Deep Voice", "Broadcast High Pitch", "Clarity Low Pitch", "Balanced", "Flat"] },
    { id: "media", name: "Media", icon: "music", g: ["#4f8bff", "#00d4ff"], list: ["Music: Deep Bass", "Music: Metal", "Music: Lo-fi Chill", "Movie: Immersion", "Flat"] },
    { id: "aux", name: "Aux", icon: "speaker", g: ["#14b8a6", "#5eead4"], list: ["Movie: Immersion", "Podcast", "Movie: Clear Dialogs", "Music: Clear Vocals", "Flat"] },
  ];
  const SWATCHES = [["Orange", "#ff6600"], ["Red", "#ff0000"], ["Blue", "#0064ff"], ["Green", "#00ff00"], ["White", "#ffffff"], ["Off", "#000000"]];

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const CSS = `
.vs-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);user-select:none;-webkit-user-select:none;
  font-family:"Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif;color:#E0F2FE;
  background:radial-gradient(60% 80% at 12% 105%,rgba(56,189,248,.35),transparent 70%),radial-gradient(55% 80% at 92% 100%,rgba(168,85,247,.32),transparent 70%),radial-gradient(45% 55% at 60% 25%,rgba(20,184,166,.18),transparent 70%),linear-gradient(180deg,#05101d 0%,#0b1a33 60%,#14204a 100%)}
.vs-demo *{box-sizing:border-box;cursor:none!important}
.vs-stage{display:flex;justify-content:center;padding:22px 16px 62px}
.vs-fly{width:352px;max-width:100%;padding:12px 14px 14px;border-radius:14px;background:rgba(7,14,26,.94);border:1px solid rgba(255,255,255,.09);box-shadow:0 16px 44px rgba(0,0,0,.55)}
.vs-hdr{display:flex;align-items:center;margin-bottom:4px}
.vs-hdr img{width:18px;height:18px;margin-right:4px;border-radius:4px}
.vs-hdr b{font-size:14.5px;font-weight:700;color:#fff;white-space:nowrap}
.vs-batt{display:flex;align-items:center;gap:3px;margin-left:8px;font-size:12px;font-weight:700;color:#37e57a}
.vs-seg{display:flex;margin-left:auto}
.vs-seg button{all:unset;box-sizing:border-box;height:24px;min-width:44px;padding:0 7px;text-align:center;font-size:11.5px;font-weight:700;color:#C9D1D9;border:1px solid rgba(255,255,255,.14);border-left-width:0;transition:background .15s,color .15s}
.vs-seg button:first-child{border-left-width:1px;border-radius:8px 0 0 8px}
.vs-seg button:last-child{border-radius:0 8px 8px 0}
.vs-seg button.on{background:${AC};border-color:${AC};color:#0d1418}
.vs-seg button:not(.on):hover{background:rgba(255,255,255,.06)}
.vs-div{height:1px;background:rgba(255,255,255,.07);margin:6px 0}
.vs-page{animation:vsIn .15s ease-out}
@keyframes vsIn{from{opacity:0}to{opacity:1}}
.vs-row{display:flex;align-items:center;gap:6px;height:40px}
.vs-exp{width:14px;height:36px;display:grid;place-items:center}
.vs-exp svg{transition:transform .18s}
.vs-exp.open svg{transform:rotate(90deg)}
.vs-badge{flex:none;width:30px;height:30px;border-radius:9px;display:grid;place-items:center}
.vs-name{width:46px;font-size:13px;color:#E0F2FE}
.vs-sl{position:relative;flex:1;height:22px;touch-action:none}
.vs-sl i{position:absolute;left:0;right:0;top:50%;height:4px;margin-top:-2px;border-radius:2px;background:rgba(255,255,255,.1)}
.vs-sl b{position:absolute;left:0;top:50%;height:4px;margin-top:-2px;border-radius:2px;background:${AC}}
.vs-sl em{position:absolute;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:${AC};transition:background .12s}
.vs-sl:hover em{background:${AC_H}}
.vs-sl.off{opacity:.45}
.vs-pct{width:36px;text-align:right;font-size:13px;color:#7EA8CC;font-variant-numeric:tabular-nums}
.vs-mute{flex:none;width:26px;height:26px;display:grid;place-items:center;border-radius:6px}
.vs-mute:hover{background:rgba(255,255,255,.06)}
.vs-dd{margin:0 0 4px 20px;padding:4px;border-radius:10px;background:#0D1828;border:1px solid rgba(255,255,255,.08);animation:vsIn .15s ease-out}
.vs-opt{display:flex;align-items:center;gap:8px;height:30px;padding:0 10px;border-radius:7px;font-size:12px;color:#C9D1D9}
.vs-opt:hover{background:rgba(255,255,255,.06)}
.vs-opt.on{color:${AC}}
.vs-opt span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vs-mix{display:flex;align-items:center;gap:8px;height:36px}
.vs-mix>span{width:22px;display:grid;place-items:center}
.vs-eq{display:flex;align-items:center;gap:8px;margin:2px 0}
.vs-eqb{flex:1;height:30px;display:flex;align-items:center;padding:0 8px;border-radius:8px;font-size:12px;color:#C9D1D9}
.vs-eqb:hover{background:rgba(255,255,255,.06)}
.vs-eqb b{color:#fff;font-weight:600;margin-right:6px}
.vs-card{padding:12px 16px;border-radius:12px;background:#122035;border:1px solid rgba(255,255,255,.06)}
.vs-ct{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:#fff;margin-bottom:8px}
.vs-sv{position:relative;height:120px;border-radius:8px;touch-action:none;background:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,var(--hue))}
.vs-sv em,.vs-hue em{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.4)}
.vs-hue{position:relative;height:12px;margin-top:10px;border-radius:6px;touch-action:none;background:linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)}
.vs-hue em{top:50%}
.vs-prev{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:#7EA8CC}
.vs-prev i{width:38px;height:24px;border-radius:6px;border:1px solid rgba(255,255,255,.2)}
.vs-prev b{width:62px;font-size:12px}
.vs-apply{margin-left:auto;height:30px;min-width:92px;border-radius:8px;display:grid;place-items:center;background:${AC};color:#0a0f12;font-weight:700;font-size:13px;transition:background .12s}
.vs-apply:hover{background:${AC_H}}
.vs-apply.done{background:#37e57a}
.vs-sw{display:flex;gap:8px;margin-top:6px}
.vs-sw i{width:30px;height:30px;border-radius:8px;border:1px solid rgba(255,255,255,.18)}
.vs-sw i:hover{border:2px solid ${AC}}
.vs-lbl{font-size:13px;color:#7EA8CC;margin-top:10px}
.vs-act{display:flex;align-items:center;gap:12px;height:42px;padding-left:6px;border-radius:8px;font-size:13px;color:#E0F2FE}
.vs-act:hover{background:rgba(255,255,255,.06)}
.vs-act.danger{color:#F85149}.vs-act.danger:hover{background:rgba(248,81,73,.10)}
.vs-act i{width:28px;height:28px;border-radius:50%;display:grid;place-items:center}
.vs-task{position:absolute;left:0;right:0;bottom:0;height:44px;display:flex;align-items:center;justify-content:flex-end;gap:14px;padding:0 16px;background:rgba(6,10,18,.85);border-top:1px solid rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-size:11px;color:rgba(255,255,255,.85)}
.vs-task img{width:20px;height:20px;padding:4px;border-radius:6px;background:rgba(255,255,255,.10);box-sizing:content-box}
.vs-clock{text-align:right;line-height:1.3}
.vs-toast{position:absolute;z-index:2;left:16px;bottom:15px;display:flex;align-items:center;gap:7px;font-size:11.5px;color:rgba(255,255,255,.7);pointer-events:none}
.vs-toast::before{content:"";width:7px;height:7px;border-radius:50%;background:${AC};box-shadow:0 0 8px ${AC}}
/* settings window */
.vs-winwrap{position:relative;width:100%;overflow:hidden}
.vs-win{position:absolute;left:0;top:0;width:684px;height:520px;transform-origin:0 0;display:flex;flex-direction:column;border-radius:12px;background:#070E1A;border:1px solid rgba(255,255,255,.09);box-shadow:0 20px 50px rgba(0,0,0,.55);overflow:hidden}
.vs-wt{display:flex;align-items:center;gap:8px;height:38px;padding:0 6px 0 16px;font-size:13px;font-weight:600;color:#fff}
.vs-wt img{width:18px;height:18px;border-radius:4px}
.vs-wx{margin-left:auto;width:36px;height:30px;display:grid;place-items:center;border-radius:6px}
.vs-wx:hover{background:#c42b1c}
.vs-wb{flex:1;display:flex;min-height:0}
.vs-nav{position:relative;width:182px;flex:none;padding:6px 10px;border-right:1px solid rgba(255,255,255,.06);background:rgba(13,24,40,.55)}
.vs-ni{display:flex;align-items:center;gap:10px;height:38px;padding:0 10px;margin-bottom:2px;border-radius:9px;font-size:13px;color:#C9D1D9}
.vs-ni.on{background:rgba(255,255,255,.08);color:#fff}
.vs-ver{position:absolute;left:10px;bottom:10px;right:10px;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,.04);font-size:11px;color:#7EA8CC}
.vs-main{flex:1;padding:14px 18px;overflow:hidden}
.vs-mh{display:flex;gap:14px;margin-bottom:12px}
.vs-mh>i{flex:none;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#4f8bff,#7c3aed)}
.vs-mh b{display:block;font-size:13.5px;color:#fff;margin:2px 0 3px}
.vs-mh p{margin:0;font-size:12px;line-height:1.4;color:#7EA8CC}
.vs-tbl{border-radius:12px;background:rgba(18,32,53,.6);border:1px solid rgba(255,255,255,.07);padding:10px 12px}
.vs-step{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#E0F2FE;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.06)}
.vs-step span{margin-right:auto}
.vs-step button{all:unset;height:26px;padding:0 13px;border-radius:13px;font-size:12px;color:#C9D1D9;background:rgba(255,255,255,.06)}
.vs-step button.on{background:${AC};color:#0a0f12;font-weight:700}
.vs-th{display:grid;grid-template-columns:1fr 112px 98px 22px;gap:8px;padding:8px 2px 6px;font-size:12px;font-weight:700;color:#C9D1D9;text-align:center}
.vs-th span:first-child{text-align:left;padding-left:44px}
.vs-hr{display:grid;grid-template-columns:1fr 112px 98px 22px;gap:8px;align-items:center;height:42px;padding:0 8px;margin-bottom:6px;border-radius:10px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}
.vs-hr>div{display:flex;align-items:center;gap:10px;font-size:13px}
.vs-hr .vs-badge{width:28px;height:28px;border-radius:8px}
.vs-key{height:28px;border-radius:6px;display:grid;place-items:center;background:#0D1828;font-size:12px;font-weight:600;color:#E0F2FE}
.vs-key.wait{color:${AC};box-shadow:inset 0 0 0 1px ${AC}}
.vs-set{height:28px;border-radius:6px;display:grid;place-items:center;background:#0D1828;font-size:12px;color:#E0F2FE}
.vs-set:hover{background:#1A2E4A}
.vs-clr{display:grid;place-items:center;height:28px;border-radius:6px}
.vs-clr:hover{background:rgba(248,81,73,.15)}
`;

  function injectCss() {
    if (document.getElementById("vs-demo-css")) return;
    const st = document.createElement("style");
    st.id = "vs-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // HSV helpers for the RGB picker.
  function hsv2rgb(h, s, v) {
    const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
    return [f(5), f(3), f(1)].map((x) => Math.round(x * 255));
  }
  const hex = (rgb) => "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
  function rgb2hsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx];
  }

  function Demo(root, logo) {
    const s = {
      view: "flyout", tab: "audio", open: null, eqOpen: null,
      vol: { master: 1, game: 1, chat: 1, media: 1, aux: 0.97 }, muted: {}, mix: 0.5,
      route: { game: 0, chat: 0, media: 1, aux: 1 },
      eq: { game: 0, chat: 0, mic: 0, media: 0, aux: 0 },
      hsv: rgb2hsv(255, 102, 0), applied: false,
      step: 1, keys: { master: "", game: "Ctrl+F13", chat: "", media: "", aux: "", chatmix: "" }, waiting: null,
    };

    const badge = (c, size = 30, isz = 16) => `<span class="vs-badge" style="width:${size}px;height:${size}px;background:linear-gradient(135deg,${c.g[0]},${c.g[1]})">${ic(c.icon, isz, "#fff", 2.2)}</span>`;
    const slider = (k) => `<div class="vs-sl" data-k="${k}"><i></i><b></b><em></em></div>`;

    function flyout() {
      let body = "";
      if (s.tab === "audio") {
        body = CH.map((c) => `
          <div class="vs-row">${c.route ? `<div class="vs-exp ${s.open === c.id ? "open" : ""}" data-open="${c.id}">${ic("chev", 11, "#e6edf3", 3)}</div>` : `<div class="vs-exp"></div>`}
            ${badge(c)}<span class="vs-name">${c.name}</span>${slider(c.id)}<span class="vs-pct" data-p="${c.id}"></span>
            <div class="vs-mute" data-mute="${c.id}"></div></div>
          ${s.open === c.id ? `<div class="vs-dd">${DEVICES.map((d, i) => `<div class="vs-opt ${s.route[c.id] === i ? "on" : ""}" data-route="${c.id}:${i}"><span>${d}</span>${s.route[c.id] === i ? ic("check", 13, AC, 2.6) : ""}</div>`).join("")}</div>` : ""}`).join("") +
          `<div class="vs-div" style="margin:10px 0"></div>
          <div class="vs-mix"><span>${ic("gamepad", 18, "#2dd4bf")}</span>${slider("mix")}<span>${ic("headphones", 18, "#a78bfa")}</span></div>`;
      } else if (s.tab === "eq") {
        body = EQ.map((e) => `
          <div class="vs-eq">${badge(e, 26, 15)}<div class="vs-eqb" data-eq="${e.id}"><b>${e.name}:</b>${e.list[s.eq[e.id] % e.list.length]}</div></div>
          ${s.eqOpen === e.id ? `<div class="vs-dd" style="margin-left:34px">${e.list.map((n, i) => `<div class="vs-opt ${s.eq[e.id] === i ? "on" : ""}" data-eqpick="${e.id}:${i}"><span>${n}</span>${s.eq[e.id] === i ? ic("check", 13, AC, 2.6) : ""}</div>`).join("")}</div>` : ""}`).join("");
      } else {
        const [h, sa, v] = s.hsv;
        body = `<div class="vs-card">
          <div class="vs-ct"><span class="vs-badge" style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#a855f7,#ec4899)">${ic("bulb", 16, "#fff", 2.2)}</span>RGB Lighting</div>
          <div class="vs-sv" data-k="sv" style="--hue:hsl(${h},100%,50%)"><em style="left:${sa * 100}%;top:${(1 - v) * 100}%"></em></div>
          <div class="vs-hue" data-k="hue"><em style="left:${(h / 360) * 100}%"></em></div>
          <div class="vs-prev">Preview <i data-prev></i><b data-hex></b><div class="vs-apply ${s.applied ? "done" : ""}" data-act="apply">${s.applied ? "Applied" : "Apply"}</div></div>
          <div class="vs-lbl">Presets</div>
          <div class="vs-sw">${SWATCHES.map(([n, c]) => `<i title="${n}" data-sw="${c}" style="background:${c}${c === "#000000" ? ";border-color:rgba(255,255,255,.45)" : ""}"></i>`).join("")}</div></div>`;
      }
      const tabs = [["audio", "Audio"], ["eq", "EQ"], ["rgb", "RGB"]].map(([k, l]) => `<button class="${s.tab === k ? "on" : ""}" data-tab="${k}">${l}</button>`).join("");
      return `<div class="vs-stage"><div class="vs-fly">
        <div class="vs-hdr"><img src="${logo}" alt=""><b>VICE Sonar</b><span class="vs-batt"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#37e57a" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 11v2M10 11v2"/></svg>68%</span><div class="vs-seg">${tabs}</div></div>
        <div class="vs-div"></div><div class="vs-page">${body}</div>
        <div class="vs-div" style="margin-top:10px"></div>
        <div class="vs-act"><i style="background:rgba(139,92,246,.19)">${ic("message", 14, "#c4b5fd")}</i>Bubble Mode</div>
        <div class="vs-act"><i style="background:rgba(56,189,248,.17)">${ic("external", 14, "#7dd3fc")}</i>Open SteelSeries GG</div>
        <div class="vs-act" data-act="settings"><i style="background:rgba(255,255,255,.09)">${ic("gear", 14, "#cbd5e1")}</i>Settings</div>
        <div class="vs-act danger"><i style="background:rgba(248,81,73,.16)">${ic("x", 14, "#f85149", 2.4)}</i>Quit VICE Sonar</div>
      </div></div>
      <div class="vs-toast">Try the sliders, tabs and Settings</div>
      <div class="vs-task"><img src="${logo}" alt="">${spk(false, 17)}<div class="vs-clock">21.10.2026<br>21:30</div></div>`;
    }

    function settings() {
      const rows = [...CH.map((c) => ({ id: c.id, name: c.name, icon: c.hk || c.icon, g: c.g })), { id: "chatmix", name: "ChatMix", icon: "arrows", g: ["#4f8bff", "#8b5cf6"] }];
      return `<div class="vs-winwrap"><div class="vs-win">
        <div class="vs-wt"><img src="${logo}" alt="">Settings<div class="vs-wx" data-act="close">${ic("x", 15, "#c9d1d9")}</div></div>
        <div class="vs-wb"><div class="vs-nav">
          <div class="vs-ni">${ic("palette", 17, "#c9d1d9")}Appearance</div>
          <div class="vs-ni on">${ic("keyboard", 17, "#fff")}Hotkeys</div>
          <div class="vs-ni">${ic("home", 17, "#c9d1d9")}General</div>
          <div class="vs-ni">${ic("info", 17, "#c9d1d9")}About</div>
          <div class="vs-ver">v3.7.3</div></div>
        <div class="vs-main">
          <div class="vs-mh"><i>${ic("keyboard", 22, "#fff")}</i><div><b>Scroll Shortcuts</b><p>Hold the assigned key and scroll the mouse wheel, or press the ↑/↓ arrow keys, to control the volume. Or hold the assigned key and click the mouse wheel to mute/unmute.</p></div></div>
          <div class="vs-tbl"><div class="vs-step"><span>Volume step:</span>${["2%", "5%", "10%", "15%"].map((t, i) => `<button class="${s.step === i ? "on" : ""}" data-step="${i}">${t}</button>`).join("")}</div>
            <div class="vs-th"><span>TARGET</span><span>ASSIGNED KEY</span><span>ACTION</span><span></span></div>
            ${rows.map((r) => `<div class="vs-hr"><div><span class="vs-badge" style="background:linear-gradient(135deg,${r.g[0]},${r.g[1]})">${ic(r.icon, 15, "#fff", 2.2)}</span>${r.name}</div>
              <span class="vs-key ${s.waiting === r.id ? "wait" : ""}">${s.waiting === r.id ? "Press a key…" : s.keys[r.id] || "—"}</span>
              <span class="vs-set" data-hk="${r.id}">Set shortcut</span><span class="vs-clr" data-clr="${r.id}">${ic("x", 12, "#93a4c8", 2.6)}</span></div>`).join("")}
          </div></div></div></div></div>
      <div class="vs-toast">Click Set shortcut and press a key</div>`;
    }

    function fit() {
      const wrap = root.querySelector(".vs-winwrap");
      if (!wrap) return;
      const k = Math.min(1, (root.clientWidth - 24) / 684);
      wrap.firstElementChild.style.transform = `translate(${Math.max(12, (root.clientWidth - 684 * k) / 2)}px,14px) scale(${k})`;
      wrap.style.height = Math.round(520 * k + 14 + 46) + "px";
    }
    function render() { root.innerHTML = s.view === "flyout" ? flyout() : settings(); fit(); update(); }

    function update() {
      root.querySelectorAll(".vs-sl").forEach((el) => {
        const k = el.dataset.k, v = k === "mix" ? s.mix : s.vol[k];
        el.querySelector("b").style.width = v * 100 + "%";
        el.querySelector("em").style.left = v * 100 + "%";
        el.classList.toggle("off", !!s.muted[k]);
      });
      root.querySelectorAll("[data-p]").forEach((el) => { el.textContent = Math.round(s.vol[el.dataset.p] * 100) + "%"; });
      root.querySelectorAll("[data-mute]").forEach((el) => { el.innerHTML = spk(!!s.muted[el.dataset.mute]); });
      const rgb = hsv2rgb(...s.hsv);
      root.querySelectorAll("[data-prev]").forEach((el) => { el.style.background = hex(rgb); });
      root.querySelectorAll("[data-hex]").forEach((el) => { el.textContent = hex(rgb); });
      const sv = root.querySelector(".vs-sv");
      if (sv) {
        sv.style.setProperty("--hue", `hsl(${s.hsv[0]},100%,50%)`);
        sv.querySelector("em").style.cssText = `left:${s.hsv[1] * 100}%;top:${(1 - s.hsv[2]) * 100}%`;
        root.querySelector(".vs-hue em").style.left = (s.hsv[0] / 360) * 100 + "%";
      }
    }

    let drag = null;
    root.addEventListener("pointerdown", (e) => {
      const el = e.target.closest(".vs-sl,.vs-sv,.vs-hue");
      if (!el || (el.dataset.k && s.muted[el.dataset.k])) return;
      drag = el;
      el.setPointerCapture(e.pointerId);
      move(e);
      e.preventDefault();
    });
    function move(e) {
      if (!drag) return;
      const r = drag.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1), y = clamp((e.clientY - r.top) / r.height, 0, 1);
      const k = drag.dataset.k;
      if (k === "sv") { s.hsv[1] = x; s.hsv[2] = 1 - y; s.applied = false; }
      else if (k === "hue") { s.hsv[0] = x * 360; s.applied = false; }
      else if (k === "mix") s.mix = x;
      else s.vol[k] = Math.round(x * 100) / 100;
      update();
      const ap = root.querySelector(".vs-apply");
      if (ap && !s.applied) { ap.classList.remove("done"); ap.textContent = "Apply"; }
    }
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", () => { drag = null; });
    root.addEventListener("pointercancel", () => { drag = null; });

    root.addEventListener("click", (e) => {
      const t = e.target.closest("[data-tab],[data-open],[data-route],[data-mute],[data-eq],[data-eqpick],[data-sw],[data-act],[data-step],[data-hk],[data-clr]");
      if (!t) return;
      const d = t.dataset;
      if (d.tab) { s.tab = d.tab; s.open = s.eqOpen = null; render(); }
      else if (d.open) { s.open = s.open === d.open ? null : d.open; render(); }
      else if (d.route) { const [c, i] = d.route.split(":"); s.route[c] = +i; s.open = null; render(); }
      else if (d.mute) { s.muted[d.mute] = !s.muted[d.mute]; update(); }
      else if (d.eq) { s.eqOpen = s.eqOpen === d.eq ? null : d.eq; render(); }
      else if (d.eqpick) { const [c, i] = d.eqpick.split(":"); s.eq[c] = +i; s.eqOpen = null; render(); }
      else if (d.sw) { const n = parseInt(d.sw.slice(1), 16); s.hsv = rgb2hsv(n >> 16, (n >> 8) & 255, n & 255); s.applied = true; render(); }
      else if (d.act === "apply") { s.applied = true; t.classList.add("done"); t.textContent = "Applied"; }
      else if (d.act === "settings") { s.view = "settings"; render(); }
      else if (d.act === "close") { s.view = "flyout"; s.waiting = null; render(); }
      else if (d.step) { s.step = +d.step; render(); }
      else if (d.hk) { s.waiting = d.hk; render(); }
      else if (d.clr) { s.keys[d.clr] = ""; if (s.waiting === d.clr) s.waiting = null; render(); }
    });

    // Shortcut capture: modifiers + one key, like the app (Esc cancels).
    document.addEventListener("keydown", (e) => {
      if (!s.waiting || !root.isConnected || s.view !== "settings") return;
      e.preventDefault();
      if (e.key === "Escape") { s.waiting = null; render(); return; }
      if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return;
      const mods = [e.ctrlKey && "Ctrl", e.altKey && "Alt", e.shiftKey && "Shift"].filter(Boolean);
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      s.keys[s.waiting] = [...mods, key].join("+");
      s.waiting = null;
      render();
    });
    window.addEventListener("resize", fit);
    render();
  }

  window.SonarDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("vs-demo");
      Demo(root, opts.logo || "/img/vice-sonar.png");
    },
  };
})();
