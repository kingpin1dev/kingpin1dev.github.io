/*
 * Notchify interactive island demo.
 *
 * A faithful port of the real app's drawing code (SkiaSharp -> Canvas2D). Every number below comes
 * from the Notchify source, not from eyeballing:
 *   - Spring:      Daylight.Utils/SecondOrder.cs     (expand f2.5 z0.6 r0.1, contract f3 z0.9 r0.1)
 *   - Shape:       Daylight.Utils/Squircle.cs + IslandObject.Draw (Lame corners, smoothness 0.6,
 *                  radius 52, notch body extended above the bezel, shoulders nocr = R/4)
 *   - Layout:      HomeMenu (pill 170x35, player 610x200 with the lyrics panel, element offsets)
 *   - Fade-in:     UIObject.SetActive (250 ms ease-out-cubic, alpha 0->1, blur 50->0)
 *   - Lyrics:      LyricsView (15.5px ExtraBold, row 1.22, gap 7, brush sweep, depth blur, edge fade)
 *   - Pill roll:   HomeMenu karaoke roll (0.22 s ease-out, 9 px slide)
 * The song, artist, cover and lyrics are invented for the demo.
 */
(function () {
  "use strict";

  // ── Theme "Dark" (Theme.cs case 0) ───────────────────────────────────────
  const C = {
    island: "#000000",
    text: [255, 255, 255],
    text2: [166, 166, 166],
  };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  // ── Demo song (fictional) ────────────────────────────────────────────────
  const SONG = { title: "Paper Satellites", artist: "Lumen Harbor", duration: 152 };
  const LYRICS = [
    [0.0, "I fold the dark into wings"],
    [4.2, "and send them up past the lights"],
    [8.6, "all the towns hum a song"],
    [12.8, "but yours is the one I hear"],
    [17.0, "paper stars on the bay"],
    [21.0, "all the words we never say"],
    [25.4, "if the signal fades away"],
    [29.6, "I will fold one more for you"],
    [33.8, "♪"],
    [37.0, "we were static on the air"],
    [41.2, "two lost waves now one"],
    [45.6, "keep the light at the top"],
    [49.8, "I'll be your island in the dark"],
  ];
  const LOOP = 54.0;          // lyric timeline length (s); the clock wraps inside it
  const START_AT = 13.4;      // demo opens mid-song
  const CHUNK = 3;            // Settings.LyricChunkSize default

  // ── Fonts / images ───────────────────────────────────────────────────────
  const FB = "InterXB", FR = "InterR";
  const font = (px, bold) => `${px}px ${bold ? FB : FR}`;
  const img = (src) => { const i = new Image(); i.src = src; return i; };
  const IMG = {
    cover: img("/notchify-demo/demo/cover.png"),
    play: img("/notchify-demo/demo/V2Play.png"), pause: img("/notchify-demo/demo/V2Pause.png"),
    prev: img("/notchify-demo/demo/V2Rewind.png"), next: img("/notchify-demo/demo/V2Forward.png"),
    shuffle: img("/notchify-demo/demo/V2Shuffle.png"), repeat: img("/notchify-demo/demo/V2Repeat.png"),
    battery: img("/notchify-demo/demo/battery.png"),
  };
  // TimeWidget: 24 h or "hh:mm tt" (en-US) depending on the culture, like the app.
  const HOUR12 = (() => { try { return new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12 === true; } catch (e) { return false; } })();
  const clockText = () => {
    const d = new Date(), m = String(d.getMinutes()).padStart(2, "0");
    if (!HOUR12) return String(d.getHours()).padStart(2, "0") + ":" + m;
    const h = d.getHours() % 12 || 12;
    return String(h).padStart(2, "0") + ":" + m + (d.getHours() < 12 ? " AM" : " PM");
  };

  // ── Math helpers ─────────────────────────────────────────────────────────
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  /** SecondOrder.cs, per axis. */
  class SecondOrder {
    constructor(x0, f, z, r) { this.xp = x0.slice(); this.y = x0.slice(); this.yd = [0, 0]; this.set(f, z, r); }
    set(f, z, r) {
      this.k1 = z / (Math.PI * f);
      this.k2 = 1 / ((2 * Math.PI * f) * (2 * Math.PI * f));
      this.k3 = (r * z) / (2 * Math.PI * f);
    }
    update(T, x) {
      // The app calls Update without xd, so the velocity-feedforward term is zero.
      const k2s = Math.max(this.k2, T * T / 2 + T * this.k1 / 2, T * this.k1);
      for (let i = 0; i < 2; i++) {
        this.y[i] += T * this.yd[i];
        this.yd[i] += T * (x[i] - this.y[i] - this.k1 * this.yd[i]) / k2s;
      }
      return this.y;
    }
  }

  /** Squircle.cs: superellipse corners, 24 segments, n = 2 + (1 - s) * 2. */
  function squirclePath(ctx, l, t, r, b, radius, smooth) {
    const R = clamp(radius, 0, Math.min(r - l, b - t) / 2);
    const n = 2 + (1 - smooth) * 2, inv = 2 / n, SEG = 24;
    const corner = (cx, cy, a0, first) => {
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * (Math.PI / 2) + a0;
        const c = Math.cos(a), s = Math.sin(a);
        const x = cx + Math.sign(c) * Math.pow(Math.abs(c), inv) * R;
        const y = cy + Math.sign(s) * Math.pow(Math.abs(s), inv) * R;
        if (i === 0 && first) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    };
    ctx.beginPath();
    corner(r - R, t + R, -Math.PI / 2, true);
    corner(r - R, b - R, 0, false);
    corner(l + R, b - R, Math.PI / 2, false);
    corner(l + R, t + R, Math.PI, false);
    ctx.closePath();
  }

  /** IslandObject.Draw in Notch mode: body extended above the bezel + outward shoulders. */
  function drawIsland(ctx, cx, top, w, h) {
    const RADIUS = 52, SMOOTH = 0.6;
    const l = cx - w / 2, r = cx + w / 2, b = top + h;
    const R = Math.min(RADIUS, Math.min(w, h) / 2);
    const bezel = 0;
    ctx.fillStyle = C.island;
    // shoulders
    const nocr = R / 4, fillet = Math.min(nocr, h / 2), kk = 8;
    ctx.beginPath();
    ctx.moveTo(l, bezel + fillet);
    ctx.bezierCurveTo(l, bezel + fillet, l - nocr / kk, bezel, l - nocr, bezel);
    ctx.lineTo(r + nocr, bezel);
    ctx.bezierCurveTo(r + nocr, bezel, r + nocr / kk, bezel, r, bezel + fillet);
    ctx.lineTo(l, bezel + fillet);
    ctx.closePath();
    ctx.fill();
    squirclePath(ctx, l, bezel - R, r, b, RADIUS, SMOOTH);
    ctx.fill();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    roundRectSub(ctx, x, y, w, h, r);
  }
  /** Rounded rect as a sub-path of the current path (no beginPath). */
  function roundRectSub(ctx, x, y, w, h, r) {
    if (!(w > 0 && h > 0)) return;          // fading-out panels can shrink past zero while the island resizes
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // White-tinted icon (QuickActionGlyphs.DrawBitmapTinted, SrcIn) cached per image.
  const tintCache = new Map();
  function tinted(im) {
    if (!im.complete || !im.naturalWidth) return null;
    if (tintCache.has(im)) return tintCache.get(im);
    const c = document.createElement("canvas");
    c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(im, 0, 0);
    x.globalCompositeOperation = "source-in";
    x.fillStyle = "#fff";
    x.fillRect(0, 0, c.width, c.height);
    tintCache.set(im, c);
    return c;
  }

  // Text helpers. Skia positions DWText by its tight bounds; centre on actualBoundingBox like it does.
  function textCenter(ctx, s, x, y, px, bold, col) {
    ctx.font = font(px, bold);
    const m = ctx.measureText(s);
    const asc = m.actualBoundingBoxAscent, desc = m.actualBoundingBoxDescent;
    ctx.fillStyle = col;
    ctx.fillText(s, x - m.width / 2, y + (asc - desc) / 2);
  }
  function textLeftMid(ctx, s, x, y, px, bold, col) {
    ctx.font = font(px, bold);
    const m = ctx.measureText(s);
    ctx.fillStyle = col;
    ctx.fillText(s, x, y + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
    return m.width;
  }

  // ── Element fade (UIObject.SetActive) ────────────────────────────────────
  class Fade {
    constructor(on) { this.on = on; this.t = 1; }
    set(on) { if (on !== this.on) { this.on = on; this.t = 0; } }
    step(dt) { this.t = Math.min(1, this.t + dt / 0.25); }
    get visible() { return this.on ? true : this.t < 0.5; }
    get alpha() { const f = easeOutCubic(this.t); return this.on ? f : 1 - f; }
    get blur() { const f = easeOutCubic(this.t); return this.on ? lerp(50, 0, f) : lerp(0, 50, f); }
  }

  // ── Lyrics (LyricsProvider.PhraseAt + LyricsView) ────────────────────────
  function lineIndexAt(pos) {
    let idx = -1;
    for (let i = 0; i < LYRICS.length; i++) { if (LYRICS[i][0] <= pos) idx = i; else break; }
    return idx;
  }
  function lineEnd(i) { return i + 1 < LYRICS.length ? LYRICS[i + 1][0] : LYRICS[i][0] + 4; }
  /** Current 3-word chunk of the sung line, split evenly over the line's duration. */
  function phraseAt(pos) {
    const i = lineIndexAt(pos);
    if (i < 0) return "";
    const words = LYRICS[i][1].split(" ").filter(Boolean);
    if (words.length === 1 && words[0] === "♪") return "";
    const nChunks = Math.ceil(words.length / CHUNK);
    const st = LYRICS[i][0], en = lineEnd(i);
    const k = clamp(Math.floor(((pos - st) / (en - st)) * nChunks), 0, nChunks - 1);
    return words.slice(k * CHUNK, k * CHUNK + CHUNK).join(" ");
  }

  class LyricsView {
    constructor(padX) {
      this.FS = 15.5; this.ROW = 15.5 * 1.22; this.GAP = 7; this.PAD = padX;
      this.FADE_T = 12; this.FADE_B = 22;
      this.layout = null; this.wrapW = -1;
      this.act = LYRICS.map(() => 0);
      this.dist = LYRICS.map((_, i) => i + 1);
      this.scroll = 0; this.scrollTarget = 0; this.active = -1; this.run = null;
      this.layer = document.createElement("canvas");
      // Input (LyricsView.BeginPress / EndPress / Wheel): click a line to seek, drag or wheel to browse.
      this.area = null; this.clock = 0; this.manualUntil = 0; this.manual = 0;
      this.pressing = false; this.pressY = 0; this.pressScroll = 0; this.moved = 0; this.pressLine = -1; this.dragY = null;
    }
    inArea(p) { const a = this.area; return !!a && !!p && p[0] >= a.x && p[0] <= a.x + a.w && p[1] >= a.y && p[1] <= a.y + a.h; }
    beginPress(p) {
      if (!this.layout || !this.inArea(p)) return false;
      this.pressY = this.dragY = p[1]; this.pressScroll = this.scrollTarget; this.moved = 0;
      this.pressLine = this.lineAtY(p[1]); this.pressing = true;
      return true;
    }
    dragTo(p) { if (this.pressing && p) this.dragY = p[1]; }
    /** A click (moved under 5px, released over the host) returns the line's time to seek to, else null. */
    endPress(overHost) {
      if (!this.pressing) return null;
      this.pressing = false;
      if (!overHost || this.moved >= 5) return null;
      const i = this.pressLine;
      if (i < 0 || i >= LYRICS.length) return null;
      this.manualUntil = 0;   // re-centre on the new line right away
      return LYRICS[i][0];
    }
    cancelPress() { this.pressing = false; }
    lineAtY(y) {
      const L = this.layout, cy = y - this.area.y + this.scroll;
      for (let i = 0; i < L.top.length; i++) if (cy >= L.top[i] - this.GAP / 2 && cy < L.top[i] + L.hgt[i] + this.GAP / 2) return i;
      return -1;
    }
    /** delta in WPF units (120 per notch, positive = up): about two lines per notch. */
    wheel(p, delta) {
      if (!this.layout || !this.inArea(p)) return false;
      const maxScroll = Math.max(0, this.layout.total - this.area.h * 0.5);
      this.scrollTarget = clamp(this.scrollTarget - delta * 0.45, 0, maxScroll);
      this.manualUntil = this.clock + 4;
      return true;
    }
    build(ctx, wrapW) {
      ctx.font = font(this.FS, true);
      const rows = [], top = [], hgt = [];
      let yy = 0;
      for (const [, t] of LYRICS) {
        const words = t.split(" ").filter(Boolean), r = [];
        let cur = "";
        for (const w of words) {
          const cand = cur ? cur + " " + w : w;
          if (ctx.measureText(cand).width <= wrapW) { cur = cand; continue; }
          if (cur) r.push(cur);
          cur = w;
        }
        if (cur || !r.length) r.push(cur);
        rows.push(r); top.push(yy); hgt.push(r.length * this.ROW);
        yy += r.length * this.ROW + this.GAP;
      }
      this.layout = { rows, top, hgt, total: yy };
      this.wrapW = wrapW;
    }
    buildRun(ctx, i) {
      ctx.font = font(this.FS, true);
      const rows = this.layout.rows[i], g = [];
      rows.forEach((row, r) => {
        if (r > 0) g.push({ ch: " ", x: -1, adv: 0, row: r });
        let x = 0;
        for (const ch of Array.from(row)) {
          const adv = ctx.measureText(ch).width;
          g.push({ ch, x, adv, row: r });
          x += adv;
        }
      });
      this.run = { line: i, g };
    }
    draw(ctx, dpr, area, pos, dt, alpha) {
      const wrapW = Math.max(40, area.w - this.PAD * 2);
      if (!this.layout || Math.abs(wrapW - this.wrapW) > 0.5) this.build(ctx, wrapW);
      const L = this.layout, n = LYRICS.length;
      const idx = lineIndexAt(pos);
      if (idx !== this.active) { this.active = idx; if (idx >= 0) this.buildRun(ctx, idx); }
      this.area = area; this.clock += dt;
      const maxScroll = Math.max(0, L.total - area.h * 0.5);
      // Drag-to-scroll; auto-centring pauses for 4 s after manual browsing.
      if (this.pressing && this.dragY != null) {
        const dy = this.dragY - this.pressY;
        this.moved = Math.max(this.moved, Math.abs(dy));
        if (this.moved >= 5) { this.scrollTarget = clamp(this.pressScroll - dy, 0, maxScroll); this.manualUntil = this.clock + 4; }
      }
      if (this.clock > this.manualUntil && idx >= 0) this.scrollTarget = clamp(L.top[idx] + L.hgt[idx] / 2 - area.h / 2, 0, maxScroll);
      this.scroll += (this.scrollTarget - this.scroll) * (1 - Math.pow(0.84, dt * 60));
      this.manual += ((this.clock < this.manualUntil ? 1 : 0) - this.manual) * (1 - Math.exp(-dt * 8));
      if (this.manual < 0.002) this.manual = 0;
      const ease = 1 - Math.exp(-dt * 9);
      for (let i = 0; i < n; i++) {
        this.act[i] += ((i === idx ? 1 : 0) - this.act[i]) * ease;
        const target = idx < 0 ? i + 1 : Math.abs(i - idx);
        this.dist[i] += (target - this.dist[i]) * ease;
      }

      // Render into an offscreen layer so the edge fade (DstIn mask) only touches the lyrics.
      const lw = Math.ceil(area.w * dpr), lh = Math.ceil(area.h * dpr);
      const lc = this.layer;
      if (lc.width !== lw || lc.height !== lh) { lc.width = lw; lc.height = lh; }
      const x = lc.getContext("2d");
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.clearRect(0, 0, area.w, area.h);
      x.textBaseline = "alphabetic";
      x.font = font(this.FS, true);
      const fm = x.measureText("Hg");
      const asc = fm.fontBoundingBoxAscent || this.FS * 0.97, desc = fm.fontBoundingBoxDescent || this.FS * 0.24;
      const baseOff = (this.ROW - (asc + desc)) / 2 + asc;
      const left = this.PAD;

      for (let i = 0; i < n; i++) {
        const top = L.top[i] - this.scroll;
        if (top > area.h || top + L.hgt[i] < 0) continue;
        if (i === idx && this.run && this.run.line === i) { this.drawActive(x, i, pos, left, top, baseOff); continue; }
        const act = this.act[i];
        // Browsing by hand: every line readable (the sung one still stands out at full white).
        let baseA = i < idx ? 0.20 : 0.36;
        baseA += (0.62 - baseA) * this.manual;
        const a = baseA + (1 - baseA) * act;
        let opac = Math.max(0.5, 1 - Math.max(0, this.dist[i] - 1) * 0.13);
        opac += (1 - opac) * this.manual;
        const sigma = Math.min(2.4, this.dist[i] * 0.6) * (1 - act) * (1 - this.manual);
        x.filter = sigma > 0.2 ? `blur(${sigma.toFixed(2)}px)` : "none";
        x.fillStyle = rgba(C.text, a * opac);
        L.rows[i].forEach((row, r) => x.fillText(row, left, top + r * this.ROW + baseOff));
      }
      x.filter = "none";
      // Edge fade.
      x.globalCompositeOperation = "destination-in";
      const g = x.createLinearGradient(0, 0, 0, area.h);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(this.FADE_T / area.h, "rgba(0,0,0,1)");
      g.addColorStop(1 - this.FADE_B / area.h, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, area.w, area.h);
      x.globalCompositeOperation = "source-over";

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(lc, area.x, area.y, area.w, area.h);
      ctx.restore();
    }
    drawActive(x, i, pos, left, top, baseOff) {
      const g = this.run.g, count = g.length;
      const st = LYRICS[i][0], en = lineEnd(i);
      const head = clamp((pos - st) / (en - st), 0, 1) * count;
      const spread = 2.4;
      const letter = (k, prox, col) => {
        const q = g[k];
        if (q.ch === " ") return;
        const gx = left + q.x, rowTop = top + q.row * this.ROW;
        x.fillStyle = col;
        if (prox > 0.02) {
          const s = 1 + prox * 0.18, ox = gx + q.adv / 2, oy = rowTop + this.ROW * 0.8;
          x.save(); x.translate(ox, oy); x.scale(s, s); x.translate(-ox, -oy);
          x.fillText(q.ch, gx, rowTop + baseOff);
          x.restore();
        } else x.fillText(q.ch, gx, rowTop + baseOff);
      };
      // glow pass
      x.filter = "blur(3.2px)";
      for (let k = 0; k < count; k++) {
        if (g[k].x < 0) continue;
        const prox = Math.max(0, 1 - Math.abs(head - k) / 2.2);
        if (prox <= 0.03) continue;
        letter(k, prox, rgba(C.text, prox * 0.6));
      }
      x.filter = "none";
      for (let k = 0; k < count; k++) {
        if (g[k].x < 0) continue;
        const f = clamp((head - k) / spread + 0.5, 0, 1);
        const prox = Math.max(0, 1 - Math.abs(head - k) / 2.2);
        letter(k, prox, rgba(C.text, 0.36 + 0.64 * f));
      }
    }
  }

  // ── Demo ────────────────────────────────────────────────────────────────
  function IslandDemo(root) {
    const canvas = root.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    let W = 1000;                            // logical stage width (narrower on phones, see resize)
    const H = 540;                           // canvas height: room for the tallest home menu view (480)
    const H_MIN = 300;                       // visible stage height while the pill / player show
    let hView = H_MIN;                       // visible height, eased: the stage grows with the island
    const PILL = [170, 35], PLAYER = [610, 200];
    // Nothing playing: HomeMenu.IslandSize() default (200 wide) with the small widgets (battery left, clock centre).
    const IDLE = [200, 35];
    const TOP = -2.5;                        // IslandObject.topOffset in Notch mode
    let dpr = 1, scale = 1;

    const spring = new SecondOrder(PILL, 3, 0.9, 0.1);
    let size = PILL.slice();
    let hover = false, pinned = false, wasExpanded = false;
    // IslandObject hover latch: when the target shrinks under the cursor (home button, a smaller tab),
    // keep the hover while the spring settles, then until the cursor clearly moves away (12px past the
    // closest it got to the padded island). Otherwise the island slides out from under a still cursor
    // and collapses.
    let latched = false, latchMin = Infinity, prevTarget = null, lastTarget = PILL;
    function cursorOver() {
      if (!pointer) { latched = false; return false; }
      const settling = Math.abs(size[0] - lastTarget[0]) > 1.5 || Math.abs(size[1] - lastTarget[1]) > 1.5;
      if (latched && settling) return true;
      if (inRect(pointer, islandRect(hover ? 20 : 0))) { latched = false; return true; }
      if (!latched) return false;
      const r = islandRect(20);
      const dx = Math.max(r.l - pointer[0], 0, pointer[0] - r.r), dy = Math.max(r.t - pointer[1], 0, pointer[1] - r.b);
      const d = Math.hypot(dx, dy);
      latchMin = Math.min(latchMin, d);
      if (d > latchMin + 12) { latched = false; return false; }   // pulled away toward empty space
      return true;
    }

    const pillFade = new Fade(true), playerFade = new Fade(false), homeFade = new Fade(false), idleFade = new Fade(false);
    // Player home button: HomeMenu.OnMusicHomeClicked suppresses the music view while the island stays
    // hovered, so the regular home menu shows; leaving the island resets it.
    let homeMode = false, zoom = 1;
    const media = { pos: 0, playing: true, shuffle: false, repeat: true };
    const lyricsView = new LyricsView(4);   // MusicLyricsPanel: PadX = 4

    let pos = START_AT, playing = true, shuffleOn = false, repeatOn = true;
    let marqueeX = 0;
    // pill karaoke roll
    let shown = phraseAt(pos % LOOP), outgoing = "", rollT = 1;
    let barSeek = null;   // player seek bar drag (DWSlider): { v }

    let pointer = null, pressed = null;
    const buttons = [];   // hit rects for this frame (island-space)

    function resize() {
      const r = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Phones: a narrower stage so the island isn't microscopic (the 610px player still fits).
      W = r.width < 700 ? 640 : 1000;
      scale = r.width / W;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(H * scale * dpr);
      canvas.style.height = H * scale + "px";
      root.style.overflow = "hidden";
      root.style.height = hView * scale + "px";
    }

    // Camera zoom (1 for the pill and player) keeps the taller home menu views inside the stage.
    function toStage(e) {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / scale, y = (e.clientY - r.top) / scale;
      return [W / 2 + (x - W / 2) / zoom, y / zoom];
    }
    const homeP = (p) => [p[0] - W / 2, p[1]];
    let barRect = null;
    // The embedded home menu writes play state into media on input; adopt it right away so the next
    // frame does not overwrite it with the player copy.
    const fromMedia = () => { pos = media.pos; playing = media.playing; shuffleOn = media.shuffle; repeatOn = media.repeat; };
    const toMedia = () => { media.pos = pos; media.playing = playing; media.shuffle = shuffleOn; media.repeat = repeatOn; };
    const onBar = (p) => !!barRect && !!p && p[0] >= barRect.x - 4 && p[0] <= barRect.x + barRect.w + 4 && Math.abs(p[1] - (barRect.y + barRect.h / 2)) <= 8;
    const barValue = (p) => clamp((p[0] - barRect.x) / barRect.w, 0.05, 1);
    const inHome = () => homeMode && homeFade.on;
    function islandRect(pad) {
      const cx = W / 2;
      return { l: cx - size[0] / 2 - pad, t: -10, r: cx + size[0] / 2 + pad, b: TOP + size[1] + pad };
    }
    const inRect = (p, q) => p && p[0] >= q.l && p[0] <= q.r && p[1] >= q.t && p[1] <= q.b;

    // Mouse position is tracked window-wide: the hover is decided by cursorOver() (with its latch), not
    // by the cursor briefly crossing the canvas edge while the stage grows.
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = toStage(e);
      // IslandObject.expandInteractionRect = 20: once open, the island keeps a 20px grace margin.
      hover = cursorOver();
      if (inHome()) { toMedia(); home.inMove(homeP(pointer)); fromMedia(); }
      if (barSeek) barSeek.v = barValue(pointer);
      lyricsView.dragTo(pointer);
    });
    // Touch fires pointerleave when the finger lifts; that must not close a tapped-open island.
    document.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" && !canvas.contains(e.target)) pinned = false; });
    document.documentElement.addEventListener("pointerleave", (e) => {   // cursor left the browser window
      if (e.pointerType && e.pointerType !== "mouse") return;
      pointer = null; hover = false; latched = false; pressed = null; pinned = false;
      home.inLeave(); home.inCancel(); barSeek = null; lyricsView.cancelPress();
    });
    canvas.addEventListener("pointerdown", (e) => {
      const p = toStage(e);
      pointer = e.pointerType === "mouse" ? p : pointer;
      const onIsland = inRect(p, islandRect(0));
      // A tap/click on the collapsed island opens it (phones have no hover); a tap outside closes it.
      if (!expandedState()) { if (onIsland) pinned = true; return; }
      if (!onIsland) { pinned = false; return; }
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      if (inHome()) { toMedia(); home.inDown(homeP(p)); fromMedia(); return; }
      pressed = hitButton(p);
      if (!pressed && playerFade.on && playerFade.t >= 0.5) {
        if (onBar(p)) barSeek = { v: barValue(p) };
        else lyricsView.beginPress(p);
      }
    });
    canvas.addEventListener("pointerup", (e) => {
      const p = toStage(e);
      if (inHome()) { toMedia(); home.inUp(homeP(p), e.pointerType === "mouse"); fromMedia(); pressed = null; return; }
      // DWSlider: seek only on the release of a drag that started on the bar.
      if (barSeek) { pos = barSeek.v * SONG.duration; barSeek = null; pressed = null; return; }
      const t = lyricsView.endPress(inRect(p, islandRect(0)));
      if (t != null) pos = pos - (pos % LOOP) + t;
      const b = hitButton(p);
      if (b && pressed && b.id === pressed.id) b.fn();
      pressed = null;
    });
    canvas.addEventListener("wheel", (e) => {
      const p = toStage(e);
      if (inHome()) { if (home.inWheel(homeP(p), e.deltaY, e.deltaMode)) e.preventDefault(); return; }
      if (expandedState() && playerFade.on && lyricsView.wheel(p, -e.deltaY * (e.deltaMode === 1 ? 40 : 1) * 1.2)) e.preventDefault();
    }, { passive: false });
    window.addEventListener("resize", resize);

    const home = HomeScene(root, "widgets", {
      canvas, media,
      scale: () => dpr * scale * zoom,
      size: () => size,
    });

    function hitButton(p) {
      if (!expandedState() || playerFade.t < 0.5) return null;
      for (const b of buttons) if (Math.hypot(p[0] - b.x, p[1] - b.y) <= b.r) return b;
      return null;
    }
    const expandedState = () => hover || pinned;

    function step(dt) {
      // Clock
      if (playing) pos += dt;
      if (pos >= SONG.duration) pos -= SONG.duration;
      // Island spring (IslandObject.Update)
      const exp = expandedState();
      if (!exp) homeMode = false;
      if (exp) spring.set(2.5, 0.6, 0.1); else spring.set(3, 0.9, 0.1);
      const tgt = exp ? (homeMode ? home.target() : PLAYER) : (playing ? PILL : IDLE);
      // Target shrank while the user is on the island: latch the hover (judged again once settled).
      if (exp && hover && prevTarget && (tgt[0] < prevTarget[0] - 0.5 || tgt[1] < prevTarget[1] - 0.5)) { latched = true; latchMin = Infinity; }
      prevTarget = exp ? tgt : null;
      lastTarget = tgt;
      size = spring.update(dt, tgt).slice();
      // Re-judge the hover every frame: the island moves under a resting cursor.
      if (pointer && !pinned) hover = cursorOver();
      // No vertical zoom: shrinking the island under a resting cursor would drop the hover (the home
      // button sits near the edge). The stage grows instead; zoom only fits the width on phones.
      zoom = approach(zoom, Math.min(1, W / (tgt[0] + 30)), 6, dt);
      const hNeed = Math.max(H_MIN, Math.min(H, tgt[1] + 40));
      // Grow at once with the live island (never let it spill past the visible stage), shrink eased.
      const hNext = Math.max(approach(hView, hNeed, 8, dt), Math.min(H, size[1] + 40));
      if (Math.abs(hNext - hView) > 0.05) { hView = Math.abs(hNeed - hNext) < 0.5 ? hNeed : hNext; root.style.height = hView * scale + "px"; }
      if (exp !== wasExpanded) {
        wasExpanded = exp;
        root.parentElement.classList.toggle("demo-open", exp);   // hides the "hover/tap" hint
      }
      pillFade.set(!exp && playing); idleFade.set(!exp && !playing); playerFade.set(exp && !homeMode); homeFade.set(exp && homeMode);
      pillFade.step(dt); idleFade.step(dt); playerFade.step(dt); homeFade.step(dt);
      media.pos = pos; media.playing = playing; media.shuffle = shuffleOn; media.repeat = repeatOn;
      if (homeFade.visible) home.step(dt, performance.now());
      pos = media.pos; playing = media.playing; shuffleOn = media.shuffle; repeatOn = media.repeat;
      // Pill roll
      const ph = phraseAt(pos % LOOP);
      if (ph !== shown) { outgoing = shown; shown = ph; rollT = 0; }
      rollT = clamp(rollT + Math.min(dt, 0.034) / 0.22, 0, 1);
      marqueeX += 35 * dt;
    }

    function withFade(f, fn) {
      if (!f.visible) return;
      ctx.save();
      ctx.globalAlpha *= f.alpha;
      const b = f.blur;
      // Skia CreateBlur(sigma) and CSS blur(<sigma>) are both a Gaussian standard deviation.
      if (b > 0.3) ctx.filter = `blur(${b.toFixed(2)}px)`;
      fn();
      ctx.restore();
    }

    function draw(dt) {
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const z = dpr * scale * zoom;
      ctx.setTransform(z, 0, 0, z, dpr * scale * (W / 2) * (1 - zoom), 0);
      const cx = W / 2, w = size[0], h = size[1];
      drawIsland(ctx, cx, TOP, w, h);

      // Content is clipped to the island, positioned from its centre (UIAlignment.Center).
      const icx = cx, icy = TOP + h / 2;
      ctx.save();
      squirclePath(ctx, cx - w / 2, -60, cx + w / 2, TOP + h, 52, 0.6);
      ctx.clip();

      // Collapsed pill: round cover + karaoke chunk.
      withFade(pillFade, () => {
        const ax = icx - w / 2 + 20, ay = icy;
        drawCover(ax, ay, 22, 11, false);
        const le = 1 - (1 - rollT) * (1 - rollT), slide = 9;
        if (shown) textCenter(ctx, shown, icx + 20, icy + (1 - le) * slide, 12, true, rgba(C.text, le));
        if (rollT < 1 && outgoing) textCenter(ctx, outgoing, icx + 20, icy - le * slide, 12, true, rgba(C.text, 1 - le));
      });

      // Idle pill: smallWidgetsContainer = IslandSize - sCD(35) wide; battery MiddleLeft (20 wide, 26 px image),
      // clock (Inter Bold 14) pinned to the centre.
      withFade(idleFade, () => {
        const left = icx - (w - 35) / 2;
        if (IMG.battery.complete && IMG.battery.naturalWidth) ctx.drawImage(IMG.battery, left + 10 - 13, icy - 13, 26, 26);
        textCenter(ctx, clockText(), icx, icy, 14, true, rgba(C.text, 1));
      });

      // Expanded player (lyrics found -> 610 wide, player shifted left by 125).
      buttons.length = 0;
      withFade(playerFade, () => {
        const mx = -(610 - 360) / 2;
        const X = (dx) => icx + dx + mx, Y = (dy) => icy + dy;
        drawCover(X(-118), Y(-24), 66, 22, true);
        // title / artist (MarqueeText, MaxWidth 180, left anchored)
        marquee(SONG.title, X(-72), Y(-33), 15, true, rgba(C.text, 1));
        marquee(SONG.artist, X(-72), Y(-14), 12, false, rgba(C.text2, 1));
        // progress (DWProgressBar: white fill, 3px gap, 10% white rest)
        const bw = 180, bh = 5, bx = X(0) - bw / 2, by = Y(16) - bh / 2;
        barRect = { x: bx, y: by, w: bw, h: bh };
        const v = barSeek ? barSeek.v : clamp(pos / SONG.duration, 0, 1);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        roundRect(ctx, bx + bw * v + 3, by, bw * (1 - v), bh, 2.5); ctx.fill();
        ctx.fillStyle = "#fff";
        roundRect(ctx, bx, by, bw * v, bh, 2.5); ctx.fill();
        // Time labels: the left one is right-aligned, the right one left-aligned (Anchor 1 / 0).
        ctx.font = font(10, false);
        const tl = "-" + mmss(SONG.duration - v * SONG.duration);
        textLeftMid(ctx, tl, X(-100) - ctx.measureText(tl).width, Y(16), 10, false, rgba(C.text2, 1));
        textLeftMid(ctx, mmss(SONG.duration), X(100), Y(16), 10, false, rgba(C.text2, 1));
        // controls
        iconButton("shuffle", IMG.shuffle, X(-120), Y(50), 18, 20, shuffleOn ? 1 : 0.4, () => (shuffleOn = !shuffleOn));
        iconButton("prev", IMG.prev, X(-60), Y(50), 20, 24.8, 1, () => { pos = Math.max(0, lineStart(-1)); }, true);
        iconButton("play", playing ? IMG.pause : IMG.play, X(0), Y(50), 24, 28, 1, () => (playing = !playing));
        iconButton("next", IMG.next, X(60), Y(50), 20, 24.8, 1, () => { pos = lineStart(1); }, true);
        iconButton("repeat", IMG.repeat, X(120), Y(50), 18, 20, repeatOn ? 1 : 0.4, () => (repeatOn = !repeatOn));
        // home (IconActionButton: 28px, 8% icon-colour fill)
        const hx = icx + w / 2 - 35, hy = TOP + 26;
        drawHomeButton(hx, hy);
      });
      // Lyrics panel: right part, below the home button (follows the SetActive alpha only).
      if (playerFade.visible) {
        const left = 610 / 2 - 15 - 235, top = -100 + 44, bottom = 100 - 12;
        const area = { x: icx + left, y: icy + top, w: 235, h: bottom - top };
        lyricsView.draw(ctx, dpr * scale * zoom, area, pos % LOOP, dt, playerFade.alpha);
      }
      // Home menu (after the player's home button), drawn by the shared HomeScene.
      withFade(homeFade, () => { ctx.translate(W / 2, 0); home.drawContent(dt); });
      canvas.style.cursor = inHome() && home.cursorHot() ? "pointer" : "default";
      ctx.restore();
    }

    function lineStart(dir) {
      const base = pos - (pos % LOOP), i = lineIndexAt(pos % LOOP);
      const j = clamp(i + dir, 0, LYRICS.length - 1);
      return base + LYRICS[j][0];
    }
    const mmss = (s) => { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };

    function drawCover(x, y, s, r, squircle) {
      if (!IMG.cover.complete || !IMG.cover.naturalWidth) return;
      ctx.save();
      if (squircle) squirclePath(ctx, x - s / 2, y - s / 2, x + s / 2, y + s / 2, r, 0.6);
      else { ctx.beginPath(); ctx.arc(x, y, s / 2, 0, Math.PI * 2); }
      ctx.clip();
      ctx.drawImage(IMG.cover, x - s / 2, y - s / 2, s, s);
      ctx.restore();
    }

    function marquee(s, x, y, px, bold, col) {
      ctx.font = font(px, bold);
      const tw = ctx.measureText(s).width, MAX = 180;
      if (tw <= MAX) { textLeftMid(ctx, s, x, y, px, bold, col); return; }
      const period = tw + 60, off = marqueeX % period;
      ctx.save();
      ctx.beginPath(); ctx.rect(x, y - px, MAX, px * 2); ctx.clip();
      textLeftMid(ctx, s, x - off, y, px, bold, col);
      textLeftMid(ctx, s, x - off + period, y, px, bold, col);
      ctx.restore();
    }

    function iconButton(id, im, x, y, r, glyph, glyphAlpha, fn, scaleOnHover) {
      buttons.push({ id, x, y, r, fn });
      const hov = pointer && Math.hypot(pointer[0] - x, pointer[1] - y) <= r && playerFade.on;
      const down = hov && pressed && pressed.id === id;
      if (hov) {
        ctx.fillStyle = down ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.10)";
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      const t = tinted(im);
      if (!t) return;
      const g = glyph * (hov && scaleOnHover ? 1.15 : 1);
      ctx.save();
      ctx.globalAlpha *= glyphAlpha;
      ctx.drawImage(t, x - g / 2, y - g / 2, g, g);
      ctx.restore();
    }

    function drawHomeButton(x, y) {
      buttons.push({ id: "home", x, y, r: 14, fn: () => { homeMode = true; } });
      const hov = pointer && Math.hypot(pointer[0] - x, pointer[1] - y) <= 14;
      ctx.fillStyle = hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)";
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
      const s = 16, wv = s * 0.36;
      ctx.strokeStyle = "#fff"; ctx.lineWidth = s * 0.13; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x - wv, y + s * 0.28); ctx.lineTo(x - wv, y - s * 0.05); ctx.lineTo(x, y - s * 0.38);
      ctx.lineTo(x + wv, y - s * 0.05); ctx.lineTo(x + wv, y + s * 0.28); ctx.closePath(); ctx.stroke();
    }

    let last = performance.now(), running = false, raf = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      draw(dt);
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    root.__demo = {
      get size() { return size.slice(); }, get zoom() { return zoom; }, get homeMode() { return homeMode; }, get pos() { return pos; }, get playing() { return playing; }, get lyricsScroll() { return lyricsView.scrollTarget; },
      tick(n, dt) { for (let i = 0; i < (n || 1); i++) { step(dt || 1 / 60); draw(dt || 1 / 60); } },   // verification hook
    };
    // Only animate while visible (saves battery, like the app's idle gate).
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop()))).observe(root);
    } else start();
  }

  // ════════════════════════════════════════════════════════════════════════
  // Home menu scenes (feature sections): the expanded island with its toolbar and the Widgets,
  // Clipboard and Notifications tabs, plus the pinned lyrics widget. Ported from HomeMenu,
  // CalendarWidget, WeatherWidget, MediaWidget, LyricsWidget, ClipboardTray and NotificationTray.
  // ════════════════════════════════════════════════════════════════════════
  const T = {
    text2: "#a6a6a6", text3: "#595959", primary: [105, 136, 183],
    success: "#bad844", widgetBg: "rgba(255,255,255,0.067)",   // #11ffffff
  };
  const SIMG = {
    widgets: img("/notchify-demo/demo/Widgets.png"), tray: img("/notchify-demo/demo/Tray.png"), file: img("/notchify-demo/demo/File.png"),
    bt: img("/notchify-demo/demo/BluetoothConnected.png"), gear: img("/notchify-demo/demo/Settings.png"),
    location: img("/notchify-demo/demo/Location.png"), cloud: img("/notchify-demo/demo/Weather.png"), sunny: img("/notchify-demo/demo/Sunny.png"),
    calPrev: img("/notchify-demo/demo/Previous.png"), calNext: img("/notchify-demo/demo/Next.png"), photo: img("/notchify-demo/demo/clip-photo.jpg"),
    btSym: img("/notchify-demo/demo/BtSymbolV2.png"), doc: img("/notchify-demo/demo/tray-doc.png"), file2: img("/notchify-demo/demo/tray-file.png"),
    rec1: img("/notchify-demo/demo/rec-1.jpg"), rec2: img("/notchify-demo/demo/rec-2.jpg"), rec3: img("/notchify-demo/demo/rec-3.jpg"),
  };
  // HomeMenu.GetBellIcon / GetRecordIcon: drawn once on a 64px bitmap.
  function glyphCanvas(fn) { const c = document.createElement("canvas"); c.width = c.height = 64; fn(c.getContext("2d")); return c; }
  const BELL = glyphCanvas((g) => {
    const cx = 32; g.fillStyle = "#fff"; g.beginPath();
    g.moveTo(cx - 16, 42); g.bezierCurveTo(cx - 16, 18, cx - 11, 14, cx, 13); g.bezierCurveTo(cx + 11, 14, cx + 16, 18, cx + 16, 42);
    g.lineTo(cx + 21, 46); g.lineTo(cx - 21, 46); g.closePath(); g.fill();
    g.beginPath(); g.arc(cx, 52, 4.5, 0, 7); g.fill(); g.beginPath(); g.arc(cx, 12, 3.2, 0, 7); g.fill();
  });
  const REC = glyphCanvas((g) => {
    g.strokeStyle = g.fillStyle = "#fff"; g.lineWidth = 5;
    g.beginPath(); g.arc(32, 32, 24, 0, 7); g.stroke(); g.beginPath(); g.arc(32, 32, 12, 0, 7); g.fill();
  });

  // LucideSkia paths (lucide.dev, ISC).
  const LU = {
    pin: "M12 17v5 M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
    x: "M18 6 6 18 M6 6l12 12",
    trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6",
    clipboard: "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
    panelOpen: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M15 3v18 M10 15l-3-3 3-3",
    panelClose: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M15 3v18 M8 9l3 3-3 3",
    // Notification app tiles (transparent glyphs, drawn on the neutral plate like real app logos).
    message: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
    terminal: "M12 19h8 M4 17l6-6-6-6",
    calendar: "M8 2v4 M16 2v4 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M3 10h18",
    // Recorder (RecordGlyphs) and misc.
    monitorDotBody: "M12 17v4 M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693 M8 21h8",
    monitor: "M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 21h8 M12 17v4",
    monitorPlay: "M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z M12 17v4 M8 21h8 M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    micOn: "M12 19v3 M19 10v2a7 7 0 0 1-14 0v-2 M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z",
    micOff: "M2 2 22 22 M18.89 13.23A7.12 7.12 0 0 0 19 12v-2 M5 10v2a7 7 0 0 0 12 5 M15 9.34V5a3 3 0 0 0-5.68-1.33 M9 9v3a3 3 0 0 0 5.12 2.12 M12 19v3",
    chevronUp: "M18 15 12 9 6 15",
    folder: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    gear: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M15 12a3 3 0 1 1-6 0 3 3 0 1 1 6 0z",
    ellipsis: "M13 12a1 1 0 1 1-2 0 1 1 0 1 1 2 0z M20 12a1 1 0 1 1-2 0 1 1 0 1 1 2 0z M6 12a1 1 0 1 1-2 0 1 1 0 1 1 2 0z",
    play: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
    pause: "M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M6 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",
    square: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    package: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z M12 22V12 M3.29 7 12 12l8.71-5 M7.5 4.27l9 5.15",
  };
  const pathCache = new Map();
  function lucide(ctx, d, cx, cy, size, color, sw) {
    let p = pathCache.get(d); if (!p) { p = new Path2D(d); pathCache.set(d, p); }
    ctx.save();
    ctx.translate(cx - size / 2, cy - size / 2); ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = color; ctx.lineWidth = sw; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.stroke(p);
    ctx.restore();
  }
  // TextRender.Draw: x/y is the baseline origin, like fillText.
  function txt(ctx, s, x, y, px, bold, col, align) {
    ctx.font = font(px, bold); ctx.textAlign = align || "left"; ctx.fillStyle = col;
    ctx.fillText(s, x, y); ctx.textAlign = "left";
  }
  function measure(ctx, s, px, bold) { ctx.font = font(px, bold); return ctx.measureText(s).width; }
  function fitText(ctx, s, px, bold, maxW) {
    if (!s) return "";
    if (measure(ctx, s, px, bold) <= maxW) return s;
    for (let n = s.length - 1; n > 0; n--) { const c = s.slice(0, n).trimEnd() + "…"; if (measure(ctx, c, px, bold) <= maxW) return c; }
    return "…";
  }
  /** WrappedText.Wrap */
  function wrapText(ctx, text, px, maxW, maxLines) {
    const out = []; let trunc = false;
    outer: for (const para of text.split("\n")) {
      if (out.length >= maxLines) { trunc = true; break; }
      let line = "";
      for (const w of para.split(" ")) {
        if (!w) continue;
        const trial = line ? line + " " + w : w;
        if (!line || measure(ctx, trial, px, false) <= maxW) line = trial;
        else { out.push(line); line = w; if (out.length >= maxLines) { trunc = true; break outer; } }
      }
      if (out.length >= maxLines) { trunc = true; break; }
      if (line) out.push(line);
    }
    if (trunc && out.length) {
      let s = out[out.length - 1];
      while (s && measure(ctx, s + "…", px, false) > maxW) s = s.slice(0, -1);
      out[out.length - 1] = s + "…";
    }
    return out;
  }
  const inR = (p, x, y, w, h) => !!p && p[0] >= x && p[0] <= x + w && p[1] >= y && p[1] <= y + h;
  const inC = (p, x, y, r) => !!p && Math.hypot(p[0] - x, p[1] - y) <= r;
  const approach = (cur, target, rate, dt) => cur + (target - cur) * Math.min(1, rate * dt);
  const mss = (s) => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

  // Album colours for the media / lyrics widgets (MediaWidget.AccentFrom, LyricsWidget.BuildPalette).
  let coverData = null;
  function coverPixels() {
    if (coverData || !IMG.cover.complete || !IMG.cover.naturalWidth) return coverData;
    const c = document.createElement("canvas"); c.width = IMG.cover.naturalWidth; c.height = IMG.cover.naturalHeight;
    const g = c.getContext("2d"); g.drawImage(IMG.cover, 0, 0);
    coverData = g.getImageData(0, 0, c.width, c.height);
    return coverData;
  }
  function accentFrom(d) {
    let r = 0, g = 0, b = 0, ws = 0;
    const step = Math.max(1, Math.floor(Math.min(d.width, d.height) / 24));
    for (let x = 0; x < d.width; x += step) for (let y = 0; y < d.height; y += step) {
      const o = (y * d.width + x) * 4, R = d.data[o], G = d.data[o + 1], B = d.data[o + 2];
      const mx = Math.max(R, G, B), mn = Math.min(R, G, B), sat = mx - mn;
      if (sat < 30 || mx < 40) continue;
      const w = sat * sat; r += R * w; g += G * w; b += B * w; ws += w;
    }
    if (ws <= 0) return [29, 185, 84];
    // SKColor.ToHsv / FromHsv with s >= 55 and v >= 80 (percent)
    let [h, s, v] = rgbToHsv(r / ws, g / ws, b / ws);
    s = Math.min(100, Math.max(s, 55)); v = Math.min(100, Math.max(v, 80));
    return hsvToRgb(h, s, v);
  }
  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    return [h, mx ? (d / mx) * 100 : 0, mx * 100];
  }
  function hsvToRgb(h, s, v) {
    s /= 100; v /= 100;
    const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }
  function palette(d) {
    const pal = new Float32Array(48);
    for (let cy = 0; cy < 4; cy++) for (let cx = 0; cx < 4; cx++) {
      let rs = 0, gs = 0, bs = 0, n = 0;
      for (let sy = 0; sy < 8; sy++) for (let sx = 0; sx < 8; sx++) {
        const px = Math.min(d.width - 1, Math.floor((cx + (sx + 0.5) / 8) * d.width / 4));
        const py = Math.min(d.height - 1, Math.floor((cy + (sy + 0.5) / 8) * d.height / 4));
        const o = (py * d.width + px) * 4; rs += d.data[o]; gs += d.data[o + 1]; bs += d.data[o + 2]; n++;
      }
      const o = (cy * 4 + cx) * 3; pal[o] = rs / n / 255; pal[o + 1] = gs / n / 255; pal[o + 2] = bs / n / 255;
    }
    return pal;
  }

  /** LyricsWidget animated album-colour wash (64x36, re-rendered at 30 fps, drawn stretched). */
  class Wash {
    constructor() {
      this.c = document.createElement("canvas"); this.c.width = 64; this.c.height = 36;
      this.g = this.c.getContext("2d"); this.img = this.g.createImageData(64, 36);
      this.t = 0; this.acc = 1; this.pal = null; this.stamp = -1;
    }
    update(now, dt, playing, aspect) {
      if (now === this.stamp) return;           // shared by the grid and the pinned view: once per frame
      this.stamp = now;
      if (!this.pal) { const d = coverPixels(); if (!d) return; this.pal = palette(d); }
      this.t += dt * (playing ? 0.4 : 0.05); this.acc += dt;
      if (this.acc < 1 / 30) return; this.acc = 0;
      const P = this.pal, t = this.t, px = this.img.data;
      for (let py = 0; py < 36; py++) for (let qx = 0; qx < 64; qx++) {
        let sx = (qx + 0.5) / 64, sy = 1 - (py + 0.5) / 36;
        if (aspect > 1) sx = (sx - 0.5) / aspect + 0.5; else sy = (sy - 0.5) * aspect + 0.5;
        sx = (sx - 0.5) * 0.78 + 0.5; sy = (sy - 0.5) * 0.78 + 0.5;
        const wx = Math.sin(sy * 2.6 + t) + 0.6 * Math.sin(sx * 1.9 + t * 0.7);
        const wy = Math.cos(sx * 2.4 - t * 0.8) + 0.6 * Math.cos(sy * 1.7 - t * 0.55);
        sx = clamp(sx + wx * 0.22, 0.06, 0.94); sy = clamp(sy + wy * 0.22, 0.06, 0.94);
        const fx = clamp(sx * 4 - 0.5, 0, 3), fy = clamp((1 - sy) * 4 - 0.5, 0, 3);
        const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(3, x0 + 1), y1 = Math.min(3, y0 + 1), ax = fx - x0, ay = fy - y0;
        const bi = (ch) => {
          const c00 = P[(y0 * 4 + x0) * 3 + ch], c10 = P[(y0 * 4 + x1) * 3 + ch], c01 = P[(y1 * 4 + x0) * 3 + ch], c11 = P[(y1 * 4 + x1) * 3 + ch];
          return (c00 + (c10 - c00) * ax) * (1 - ay) + (c01 + (c11 - c01) * ax) * ay;
        };
        let r = bi(0), g = bi(1), b = bi(2);
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        r = (gray + (r - gray) * 1.75) * 1.26; g = (gray + (g - gray) * 1.75) * 1.26; b = (gray + (b - gray) * 1.75) * 1.26;
        const o = (py * 64 + qx) * 4;
        px[o] = clamp(r, 0, 1) * 255; px[o + 1] = clamp(g, 0, 1) * 255; px[o + 2] = clamp(b, 0, 1) * 255; px[o + 3] = 255;
      }
      this.g.putImageData(this.img, 0, 0);
    }
  }

  // DWImage with a theme colour (allowIconThemeColor): tinted copy per colour.
  const tintColCache = new Map();
  function tintedCol(im, col) {
    if (!im.complete || !im.naturalWidth) return null;
    const k = im.src + "|" + col;
    if (tintColCache.has(k)) return tintColCache.get(k);
    const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext("2d"); x.drawImage(im, 0, 0); x.globalCompositeOperation = "source-in"; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height);
    tintColCache.set(k, c); return c;
  }

  // ── Demo data (invented) ─────────────────────────────────────────────────
  function clipSeed() {
    return [
      { id: 1, kind: "link", text: "https://notchify.app/", meta: "link  1m" },
      { id: 2, kind: "text", text: "Meet at 7, the table by the window. I'll bring the printed tickets so we don't have to queue at the door.", meta: "text  4m", pinned: true },
      { id: 3, kind: "image", meta: "image  12m  1920x1280  2.4 MB" },
      { id: 4, kind: "files", text: "Q3-roadmap.pdf", files: ["C:\\Users\\Alex\\Documents\\Q3-roadmap.pdf"], meta: "files  1h  1 item" },
      { id: 5, kind: "link", text: "https://example.com/docs/getting-started", meta: "link  2h" },
      { id: 6, kind: "text", text: "Remember to water the plants on Friday", meta: "text  5h" },
    ];
  }
  function notifSeed() {
    return [
      { key: "maya", title: "Maya", glyph: LU.message, unread: 2, open: true, time: "Now",
        msgs: [["Are we still on for tonight?", "4m"], ["I booked the table by the window", "2m"], ["See you at 7!", "Now"]] },
      { key: "mom", title: "Mom", glyph: LU.message, unread: 0, open: false, time: "12m",
        msgs: [["Are you coming for dinner on Sunday?", "15m"], ["I'm making your favorite", "12m"]] },
      { key: "cal", title: "Dentist appointment", glyph: LU.calendar, unread: 0, open: false, time: "1h",
        msgs: [["Tomorrow at 10:30. Tap to see the address.", "1h"]] },
      { key: "ship", title: "Your order has shipped", glyph: LU.package, unread: 1, open: false, time: "3h",
        msgs: [["It arrives on Thursday. You can track it from your account at any time.", "3h"]] },
    ];
  }

  /**
   * host (optional): embed the home menu inside another island (the hero demo). The host owns the canvas,
   * events, island shape, size spring and the frame loop; it calls the returned API instead.
   */
  function HomeScene(root, kind, host) {
    const embedded = !!host;
    const canvas = embedded ? host.canvas : root.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const TOP = -2.5, bCD = 50, TOPSP = 15;
    let dpr = 1, cw = 0, ch = 0, cam = null;

    let tab = kind === "lyrics" ? "widgets" : kind;
    let pinned = kind === "lyrics";
    let clipExpanded = kind === "clipboard";
    let entries = clipSeed(), groups = notifSeed();
    let pos = 47, playing = true, shuffleOn = false, repeatOn = true;

    const fades = { widgets: new Fade(tab === "widgets" && !pinned), clipboard: new Fade(tab === "clipboard"),
      notifications: new Fade(tab === "notifications"), toolbar: new Fade(!pinned), pinned: new Fade(pinned),
      tray: new Fade(false), record: new Fade(false), bt: new Fade(false), recPill: new Fade(false) };
    const lit = { widgets: 0, tray: 0, clipboard: 0, notifications: 0, record: 0, bt: 0 };
    lit[tab] = 0.075;
    const lyricsGrid = new LyricsView(14), lyricsPin = new LyricsView(14);
    const wash = new Wash();
    let accent = null, frameNow = 0;

    // pointer + interaction state
    let pointer = null, down = null, drag = null;
    const hp = {};                       // widget hover progress
    let calOffset = 0, barHover = 0, seeking = null, pinHover = 0;
    let clipScroll = 0, clipY = 0, notifScroll = 0, notifY = 0;
    let previewId = null, copiedId = null, copiedT = 0, refillT = 0;
    const expand = {}; groups.forEach((g) => (expand[g.key] = g.open ? 1 : 0));
    let swipe = null;                    // { key, msg, x, vel, prev, removing, release }
    let clock = 0;                       // scene time (s), drives the eased tweens
    let trayFiles = [], trayId = 0, trayScroll = 0, trayY = 0;
    let recPill = false, btReturn = "widgets";
    const recSet = { scr: 0, q: 1, f: 1, sys: true, cur: true };
    const rec = { live: false, paused: false, elapsed: 0, pulse: 0, mic: true, tab: 0, sel: 0, scroll: 0, scrollT: 0, flash: 0,
      items: [
        { name: "Notchify 2026-10-07 11.38.47", meta: "00:00:05 • 2 MB • 1080p 60fps", img: SIMG.rec1 },
        { name: "Notchify 2026-10-07 11.37.27", meta: "00:00:07 • 3 MB • 1080p 60fps", img: SIMG.rec2 },
        { name: "Notchify 2026-10-07 11.24.27", meta: "00:00:09 • 4 MB • 1080p 60fps", img: SIMG.rec3 },
      ] };

    const clipCardH = (e) => (e.kind === "image" ? 172 : 60);
    function clipContentH() { let h = 8; for (const e of entries) h += clipCardH(e) + 8; return h; }
    const notifExtra = (n) => (n <= 0 ? 0 : 10 + n * 46 + (n - 1) * 4 + 10);
    const notifCardH = (g) => 76 + (expand[g.key] || 0) * notifExtra(g.msgs.length);
    // HomeMenu.IslandSizeBig for each view (bCD 50, topSpacing 15).
    function targetSize() {
      if (pinned) return [260 + bCD, 146 + bCD];
      if (tab === "bt") return [360, 78];
      if (tab === "record") return recPill && rec.live ? [470, 62] : [880, 480];
      if (tab === "tray") return [565, 250];
      if (tab === "widgets") return [565, 2 * 146 + bCD + 15 + TOPSP + 25];
      if (tab === "clipboard") {
        if (clipExpanded && entries.length) return [860, 480];
        return [420, clamp(44 + clipContentH() + bCD + TOPSP + 25, 250, 480)];
      }
      let h = 8; for (const g of groups) h += 76 + (g.open ? notifExtra(g.msgs.length) : 0) + 8;
      return [420, clamp(h + bCD + TOPSP + 25, 250, 480)];
    }
    let target = targetSize();
    const spring = new SecondOrder(target, 2.5, 0.6, 0.1);
    let size = target.slice();

    function resize() {
      const r = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = r.width; ch = r.height;
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    }
    // Camera: frames the island's target size plus room for the notch shoulders, eased.
    const camTarget = () => [target[0] + 120, target[1] + 44];
    const camScale = () => (embedded ? host.scale() : Math.min(cw / cam[0], ch / cam[1]));
    function toStage(e) {
      const r = canvas.getBoundingClientRect(), s = camScale();
      return [(e.clientX - r.left - r.width / 2) / s, (e.clientY - r.top) / s];
    }

    // Hit regions are rebuilt every frame by the draw code: { id, test(p), click?, press?, swipe? }.
    let hits = [], live = [];   // hits = last complete frame (hover/clicks), live = being built
    function hitAt(p) { if (!p) return null; for (let i = hits.length - 1; i >= 0; i--) if (hits[i].test(p)) return hits[i]; return null; }
    const isHot = (id) => { const h = hitAt(pointer); return !!h && h.id === id; };
    const isDown = (id) => !!down && !!down.hit && down.hit.id === id && isHot(id);

    // ── input (stage coordinates: island centre x = 0, screen top y = 0) ──
    // LyricsWidget input: the view that is on screen (pinned view, or the grid on the Widgets tab).
    const lyricsViews = () => (pinned ? [lyricsPin] : tab === "widgets" ? [lyricsGrid] : []);
    function inMove(p) { pointer = p; onDrag(); lyricsViews().forEach((v) => v.dragTo(p)); }
    function inLeave() { if (!drag) pointer = null; }
    function inDown(p) {
      pointer = p; down = { p: p.slice(), hit: hitAt(p) };
      drag = { start: p.slice() };
      if (down.hit && down.hit.press) down.hit.press();
      if (!down.hit) lyricsViews().forEach((v) => v.beginPress(p));
    }
    function inUp(p, mouse) {
      if (seeking) { pos = seeking.v * SONG.duration; seeking = null; }
      for (const v of [lyricsGrid, lyricsPin]) {
        const t = v.endPress(inR(p, -size[0] / 2, TOP, size[0], size[1]));
        if (t != null) pos = pos - (pos % LOOP) + t;
      }
      if (swipe && !swipe.removing) {
        if (committed()) swipe.removing = true; else swipe.release = true;
      } else if (down && down.hit && Math.hypot(p[0] - down.p[0], p[1] - down.p[1]) < 10) {
        const h = hitAt(p);
        if (h && h.id === down.hit.id && h.click) h.click();
      }
      pointer = mouse ? p : null;
      down = null; drag = null;
    }
    function inCancel() { lyricsGrid.cancelPress(); lyricsPin.cancelPress(); down = null; drag = null; seeking = null; if (swipe && !swipe.removing) swipe.release = true; }
    /** Returns true when the wheel scrolled something (caller then prevents page scroll). */
    function inWheel(p, deltaY, deltaMode) {
      if (pinned) return false;
      if (p[0] < -size[0] / 2 || p[0] > size[0] / 2 || p[1] > TOP + size[1]) return false;
      const raw = -deltaY * (deltaMode === 1 ? 40 : 1) * 1.2;   // ~WPF wheel delta (120 per notch)
      const d = raw * 0.30;
      for (const v of lyricsViews()) if (v.wheel(p, raw)) return true;
      const view = size[1] - bCD - TOPSP - 25;
      if (tab === "clipboard") {
        const n = clamp(clipScroll + d, -Math.max(0, clipContentH() - (view - 44)), 0);
        if (n !== clipScroll) { clipScroll = n; return true; }
      } else if (tab === "tray") {
        trayScroll += raw * 0.225; return true;
      } else if (tab === "record" && rec.tab === 0 && !recPill) {
        rec.scrollT += raw * 0.5; return true;
      } else if (tab === "notifications") {
        let h = 8; for (const g of groups) h += notifCardH(g) + 8;
        const n = clamp(notifScroll + d, -Math.max(0, h - view), 0);
        if (n !== notifScroll) { notifScroll = n; return true; }
      }
      return false;
    }
    if (!embedded) {
      canvas.addEventListener("pointermove", (e) => { if (cam) inMove(toStage(e)); });
      canvas.addEventListener("pointerleave", inLeave);
      canvas.addEventListener("pointerdown", (e) => {
        if (!cam) return;
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        inDown(toStage(e));
      });
      canvas.addEventListener("pointerup", (e) => { if (cam) inUp(toStage(e), e.pointerType === "mouse"); });
      canvas.addEventListener("pointercancel", inCancel);
      canvas.addEventListener("wheel", (e) => { if (cam && inWheel(toStage(e), e.deltaY, e.deltaMode)) e.preventDefault(); }, { passive: false });
      window.addEventListener("resize", resize);
    }

    // NotificationTray swipe-to-delete
    const committed = () => !!swipe && (Math.abs(swipe.x) >= 120 || (Math.abs(swipe.x) >= 28 && Math.abs(swipe.vel) >= 15));
    function onDrag() {
      if (!drag || !pointer) return;
      if (seeking) { seeking.v = clamp((pointer[0] - seeking.l) / seeking.w, 0, 1); return; }
      if (!down || !down.hit || !down.hit.swipe || (swipe && swipe.removing)) return;
      const dx = pointer[0] - drag.start[0], dy = pointer[1] - drag.start[1];
      if (!swipe && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) swipe = Object.assign({}, down.hit.swipe, { x: dx, vel: 0, prev: dx });
      if (swipe) {
        swipe.vel = 0.6 * swipe.vel + 0.4 * (dx - swipe.prev); swipe.prev = dx; swipe.x = dx;
        if (committed()) { swipe.removing = true; down = null; }
      }
    }

    function setTab(t) {
      if (t === "bt" && tab !== "bt") btReturn = tab;
      if (t === "notifications") groups.forEach((g) => (g.unread = 0));   // NotificationStore.MarkAllRead
      tab = t;
    }

    function step(dt) {
      if (playing) pos += dt;
      if (pos >= SONG.duration) pos = 0;
      clock += dt;
      rec.pulse += dt;
      if (rec.live && !rec.paused) rec.elapsed += dt;
      if (!rec.live) recPill = false;
      rec.scroll += (rec.scrollT - rec.scroll) * Math.min(1, 18 * dt);
      if (rec.flash > 0) rec.flash -= dt;
      stepTray(dt, 565);
      target = targetSize();
      if (embedded) size = host.size().slice();
      else {
        size = spring.update(dt, target).slice();
        const ct = camTarget();
        if (!cam) cam = ct.slice();
        cam[0] = approach(cam[0], ct[0], 5, dt); cam[1] = approach(cam[1], ct[1], 5, dt);
      }
      fades.widgets.set(tab === "widgets" && !pinned); fades.clipboard.set(tab === "clipboard" && !pinned);
      fades.notifications.set(tab === "notifications" && !pinned); fades.pinned.set(pinned);
      const pill = tab === "record" && recPill && rec.live;
      fades.toolbar.set(!pinned && tab !== "bt" && !pill);
      fades.tray.set(tab === "tray" && !pinned); fades.record.set(tab === "record" && !pinned && !pill);
      fades.recPill.set(pill && !pinned); fades.bt.set(tab === "bt" && !pinned);
      for (const k in fades) fades[k].step(dt);
      for (const k in lit) lit[k] = approach(lit[k], k === tab ? 0.075 : 0, 15, dt);
      clipY = approach(clipY, clipScroll, 20, dt); notifY = approach(notifY, notifScroll, 20, dt);
      if (copiedT > 0) copiedT -= dt; else copiedId = null;
      for (const g of groups) {
        const t = g.open ? 1 : 0, p = expand[g.key] ?? t;
        let n = p + (t - p) * Math.min(1, 14 * dt); if (Math.abs(t - n) < 0.002) n = t; expand[g.key] = n;
      }
      if (swipe) {
        if (swipe.removing) {
          swipe.x = approach(swipe.x, (swipe.x < 0 ? -1 : 1) * (390 + 40), 16, dt);
          if (Math.abs(swipe.x) >= 390) {
            const g = groups.find((q) => q.key === swipe.key);
            if (g && swipe.msg != null) { g.msgs.splice(swipe.msg, 1); if (!g.msgs.length) groups = groups.filter((q) => q !== g); }
            else groups = groups.filter((q) => q.key !== swipe.key);
            swipe = null;
          }
        } else if (swipe.release) {
          swipe.x = approach(swipe.x, 0, 18, dt);
          if (Math.abs(swipe.x) <= 0.5) swipe = null;
        }
      }
      // The demo never stays empty: refill a moment after the last item is cleared.
      if (!entries.length || !groups.length) {
        refillT += dt;
        if (refillT > 2.6) {
          if (!entries.length) { entries = clipSeed(); clipScroll = 0; }
          if (!groups.length) { groups = notifSeed(); groups.forEach((g) => (expand[g.key] = 0)); notifScroll = 0; }
          refillT = 0;
        }
      } else refillT = 0;
    }

    function withF(f, fn) {
      if (!f.visible) return;
      ctx.save(); ctx.globalAlpha *= f.alpha;
      const b = f.blur; if (b > 0.3) ctx.filter = `blur(${b.toFixed(2)}px)`;
      fn(); ctx.restore();
    }

    function draw(dt) {
      const s = camScale();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * cw / 2, 0);
      drawIsland(ctx, 0, TOP, size[0], size[1]);
      ctx.save();
      squirclePath(ctx, -size[0] / 2, -60, size[0] / 2, TOP + size[1], 52, 0.6); ctx.clip();
      drawContent(dt);
      ctx.restore();
      canvas.style.cursor = cursorHot() ? "pointer" : "default";
    }
    const cursorHot = () => { const hh = hitAt(pointer); return !!hh && !!(hh.click || hh.press); };
    /** Everything inside the island (the caller draws the island and clips to it). */
    function drawContent(dt) {
      live = [];
      const w = size[0], h = size[1], L = -w / 2, icy = TOP + h / 2;
      withF(fades.toolbar, () => drawToolbar(L, w));
      withF(fades.widgets, () => drawWidgetGrid(icy, dt));
      withF(fades.clipboard, () => drawClipboard(w, h));
      withF(fades.notifications, () => drawNotifications(w, h));
      withF(fades.tray, () => drawTray(w, h));
      withF(fades.record, () => drawRecord(w, h));
      withF(fades.recPill, () => drawRecPill(w, h));
      withF(fades.bt, () => drawBt(w, h));
      withF(fades.pinned, () => {
        const x = -130, y = icy - 73;
        drawWidgetFrame("lyricsPin", x, y, 260, 146, dt, () => drawLyricsWidget(x, y, lyricsPin, dt, fades.pinned.alpha));
      });
      hits = live;
    }

    // ── toolbar (HomeMenu.InitializeMenu: 32x24 icon-only tabs at 20 + 34k, gear 23px at -20) ──
    function drawToolbar(L, w) {
      const left = L + 15, cy = TOP + 30;
      const tabs = [["widgets", SIMG.widgets], ["tray", SIMG.tray], ["clipboard", SIMG.file], ["notifications", BELL], ["record", REC], ["bt", SIMG.bt]];
      tabs.forEach(([id, im], k) => {
        const x = left + 20 + 34 * k;
        const enabled = true;
        live.push({ id: "tab-" + id, test: (p) => inR(p, x - 16, cy - 12, 32, 24), click: enabled ? () => setTab(id) : null });
        const sc = isDown("tab-" + id) ? 0.95 : isHot("tab-" + id) ? 1.05 : 1;
        ctx.save(); ctx.translate(x, cy); ctx.scale(sc, sc);
        if (lit[id] > 0.002) { ctx.fillStyle = `rgba(255,255,255,${lit[id]})`; roundRect(ctx, -16, -12, 32, 24, 12); ctx.fill(); }
        const t = im instanceof HTMLCanvasElement ? im : tinted(im);
        if (t) ctx.drawImage(t, -10.2, -10.2, 20.4, 20.4);
        ctx.restore();
      });
      const gx = L + w - 15 - 20;
      live.push({ id: "gear", test: (p) => inR(p, gx - 11.5, cy - 11.5, 23, 23) });
      const g = tinted(SIMG.gear), gs = 23 * 0.85 * (isHot("gear") ? 1.05 : 1);
      if (g) ctx.drawImage(g, gx - gs / 2, cy - gs / 2, gs, gs);
    }

    // ── widgets tab: Carousel Grid (2 columns, bottom-anchored rows, 15px spacing) ──
    function drawWidgetGrid(icy, dt) {
      const bottom = icy + (397 - bCD) / 2;
      const r2 = bottom - 146, r1 = r2 - 15 - 146, xl = -137.5 - 130, xr = 137.5 - 130;
      drawWidgetFrame("lyrics", xl, r1, 260, 146, dt, () => drawLyricsWidget(xl, r1, lyricsGrid, dt, fades.widgets.alpha));
      drawWidgetFrame("media", xr, r1, 260, 146, dt, () => drawMediaWidget(xr, r1, dt));
      drawWidgetFrame("calendar", xl, r2, 260, 146, dt, () => drawCalendar(xl, r2));
      drawWidgetFrame("weather", xr, r2, 260, 146, dt, () => drawWeather(xr, r2));
      // CarouselGridDots under the weather slot (four widgets in it, the first one showing).
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i === 0 ? "#fff" : "rgba(255,255,255,0.333)";
        ctx.beginPath(); ctx.arc(xr + 130 - 13.5 + i * 9, r2 + 146 - 7, i === 0 ? 2.6 : 1.8, 0, 7); ctx.fill();
      }
    }
    /** WidgetBase.Draw: hover scale 1 + p/60 and a faint outer glow. */
    function drawWidgetFrame(id, x, y, w, h, dt, fn) {
      const hov = inR(pointer, x, y, w, h) && !swipe && !seeking;
      hp[id] = approach(hp[id] || 0, hov ? 1 : 0, 10, dt);
      const p = hp[id];
      ctx.save();
      if (p > 0.025) {
        const cx = x + w / 2, cy = y + h / 2, sc = 1 + p / 60;
        ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        ctx.save();
        ctx.beginPath(); ctx.rect(x - 60, y - 60, w + 120, h + 120);
        roundRectSub(ctx, x, y, w, h, 15); ctx.clip("evenodd");
        ctx.shadowColor = `rgba(255,255,255,${p / 10})`; ctx.shadowBlur = p * 20;
        ctx.fillStyle = "#000"; roundRect(ctx, x, y, w, h, 15); ctx.fill();
        ctx.restore();
      }
      fn();
      ctx.restore();
    }

    function drawLyricsWidget(x, y, view, dt, alpha) {
      ctx.save();
      roundRect(ctx, x, y, 260, 146, 15); ctx.clip();
      wash.update(frameNow, dt, playing, 260 / 146);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      ctx.drawImage(wash.c, x, y, 260, 146);
      const sg = ctx.createLinearGradient(0, y, 0, y + 146);
      sg.addColorStop(0, "rgba(0,0,0,0.141)"); sg.addColorStop(0.55, "rgba(0,0,0,0.22)"); sg.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.fillStyle = sg; ctx.fillRect(x, y, 260, 146);
      if (IMG.cover.complete && IMG.cover.naturalWidth) {
        ctx.save(); roundRect(ctx, x + 14, y + 10, 28, 28, 6); ctx.clip(); ctx.drawImage(IMG.cover, x + 14, y + 10, 28, 28); ctx.restore();
      }
      const pcx = x + 242, pcy = y + 24, tx = x + 52, maxW = pcx - 11 - 4 - tx, mid = y + 24;
      txt(ctx, fitText(ctx, SONG.title, 12.5, true, maxW), tx, mid - 1.5, 12.5, true, "#fff");
      txt(ctx, fitText(ctx, SONG.artist, 10.5, false, maxW), tx, mid + 11.5, 10.5, false, "rgba(255,255,255,0.784)");
      view.draw(ctx, dpr * camScale(), { x, y: y + 40, w: 260, h: 106 }, pos % LOOP, dt, alpha);
      // pin (visible while the widget is hovered or pinned); pinning hugs the island around this widget
      const id = view === lyricsPin ? "pinP" : "pinG";
      live.push({ id, test: (p) => inC(p, pcx, pcy, 11), click: () => { pinned = !pinned; } });
      const over = isHot(id);
      pinHover = approach(pinHover, inR(pointer, x, y, 260, 146) || pinned ? 1 : 0, 12, dt);
      if (pinHover > 0.02) {
        if (pinned || over) { ctx.fillStyle = `rgba(255,255,255,${pinHover * (pinned ? 0.28 : 0.16)})`; ctx.beginPath(); ctx.arc(pcx, pcy, 11, 0, 7); ctx.fill(); }
        lucide(ctx, LU.pin, pcx, pcy, 13, `rgba(255,255,255,${pinHover * (pinned || over ? 1 : 0.7)})`, 1.9);
      }
      ctx.restore();
    }

    function iconBtn(id, im, cx, cy, d, glyph, normal, glyphA, fn, disc) {
      live.push({ id, test: (p) => inC(p, cx, cy, d / 2), click: fn });
      const hov = isHot(id), dn = isDown(id), sc = dn ? 0.95 : hov ? 1.05 : 1;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc);
      ctx.fillStyle = dn ? "rgba(255,255,255,0.22)" : hov ? "rgba(255,255,255,0.12)" : normal;
      ctx.beginPath(); ctx.arc(0, 0, d / 2, 0, 7); ctx.fill();
      if (disc) { ctx.fillStyle = disc; ctx.beginPath(); ctx.arc(0, 0, d / 2, 0, 7); ctx.fill(); }
      const t = tinted(im);
      if (t) { ctx.globalAlpha *= glyphA; ctx.drawImage(t, -glyph / 2, -glyph / 2, glyph, glyph); }
      ctx.restore();
    }

    function drawMediaWidget(x, y, dt) {
      if (!accent) { const d = coverPixels(); if (d) accent = accentFrom(d); }
      const acc = accent || [29, 185, 84];
      const mix = (t, a) => `rgba(${acc.map((c) => Math.round(c * (1 - t))).join(",")},${a})`;
      ctx.fillStyle = T.widgetBg; roundRect(ctx, x, y, 260, 146, 15); ctx.fill();
      ctx.save(); roundRect(ctx, x, y, 260, 146, 15); ctx.clip();
      const lg = ctx.createLinearGradient(x, y, x + 260, y + 146);
      lg.addColorStop(0, mix(0.55, 0.95)); lg.addColorStop(1, mix(0.82, 0.92));
      ctx.fillStyle = lg; ctx.fillRect(x, y, 260, 146);
      const rg = ctx.createRadialGradient(x + 53, y + 54, 0, x + 53, y + 54, 120);
      rg.addColorStop(0, `rgba(${acc},0.28)`); rg.addColorStop(1, `rgba(${acc},0)`);
      ctx.fillStyle = rg; ctx.fillRect(x, y, 260, 146);
      ctx.restore();
      ctx.strokeStyle = `rgba(${acc},0.22)`; ctx.lineWidth = 1; roundRect(ctx, x + 0.5, y + 0.5, 259, 145, 15); ctx.stroke();
      if (IMG.cover.complete && IMG.cover.naturalWidth) {
        ctx.save(); roundRect(ctx, x + 14, y + 15, 78, 78, 12); ctx.clip(); ctx.drawImage(IMG.cover, x + 14, y + 15, 78, 78); ctx.restore();
      }
      ctx.strokeStyle = "rgba(255,255,255,0.10)"; roundRect(ctx, x + 14.5, y + 15.5, 77, 77, 12); ctx.stroke();
      const textMax = (231 - 14.5 - 8) - 101;
      txt(ctx, fitText(ctx, SONG.title, 15.5, true, textMax), x + 101, y + 31, 15.5, true, "#fff");
      txt(ctx, fitText(ctx, SONG.artist, 12.5, false, textMax), x + 101, y + 48, 12.5, false, "rgba(255,255,255,0.68)");
      const RowY = y + 87;
      iconBtn("m-prev", IMG.prev, x + 117, RowY, 30, 15, "rgba(0,0,0,0.28)", 1, () => { pos = Math.max(0, pos - 10); });
      iconBtn("m-play", playing ? IMG.pause : IMG.play, x + 160, RowY, 37, 18, "rgba(0,0,0,0.30)", 1, () => (playing = !playing));
      iconBtn("m-next", IMG.next, x + 201, RowY, 30, 15, "rgba(0,0,0,0.28)", 1, () => { pos = Math.min(SONG.duration - 1, pos + 10); });
      iconBtn("m-rep", IMG.repeat, x + 237, RowY, 29, 14, "rgba(0,0,0,0.28)", repeatOn ? 1 : 0.55, () => (repeatOn = !repeatOn), repeatOn ? `rgba(${acc},0.30)` : null);
      iconBtn("m-shuf", IMG.shuffle, x + 231, y + 50, 29, 14, "rgba(0,0,0,0.28)", shuffleOn ? 1 : 0.55, () => (shuffleOn = !shuffleOn), shuffleOn ? `rgba(${acc},0.30)` : null);
      // seek bar (drag to scrub)
      const bl = x + 14, bt = y + 118, bw = 232;
      live.push({ id: "m-bar", test: (p) => inR(p, bl - 6, bt + 2 - 9, bw + 12, 18), press: () => { seeking = { l: bl, w: bw, v: clamp((pointer[0] - bl) / bw, 0, 1) }; } });
      barHover = approach(barHover, isHot("m-bar") || seeking ? 1 : 0, 14, dt);
      const v = seeking ? seeking.v : clamp(pos / SONG.duration, 0, 1);
      ctx.fillStyle = "rgba(255,255,255,0.16)"; roundRect(ctx, bl, bt, bw, 4, 2); ctx.fill();
      ctx.fillStyle = `rgb(${acc})`;
      if (bw * v > 0.5) { roundRect(ctx, bl, bt, bw * v, 4, 2); ctx.fill(); }
      ctx.beginPath(); ctx.arc(bl + bw * v, bt + 2, 5.5 + 1.5 * barHover, 0, 7); ctx.fill();
      txt(ctx, mss(v * SONG.duration), bl, y + 136, 11, false, "rgba(255,255,255,0.75)");
      txt(ctx, mss(SONG.duration), bl + bw, y + 136, 11, false, "rgba(255,255,255,0.75)", "right");
    }

    function drawCalendar(x, y) {
      const now = new Date(), disp = new Date(now.getFullYear(), now.getMonth() + calOffset, 1);
      textCenter(ctx, disp.toLocaleDateString("en-US", { month: "long", year: "numeric" }), x + 130, y + 19, 13, true, "#fff");
      for (const [id, im, cx, dir] of [["c-prev", SIMG.calPrev, x + 14, -1], ["c-next", SIMG.calNext, x + 226, 1]]) {
        live.push({ id, test: (p) => inC(p, cx, y + 9, 10), click: () => (calOffset += dir) });
        const hov = isHot(id), dn = isDown(id);
        ctx.save(); ctx.translate(cx, y + 9); if (hov && !dn) ctx.scale(1.15, 1.15);
        if (hov) { ctx.fillStyle = dn ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)"; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill(); }
        const t = tinted(im); if (t) ctx.drawImage(t, -5, -5, 10, 10);
        ctx.restore();
      }
      const cw7 = 240 / 7, x0 = x + 10, y0 = y + 30;
      ["M", "T", "W", "T", "F", "S", "S"].forEach((d, i) => txt(ctx, d, x0 + i * cw7 + cw7 / 2, y0 + 9, 9, true, T.text2, "center"));
      const days = new Date(disp.getFullYear(), disp.getMonth() + 1, 0).getDate();
      const same = disp.getFullYear() === now.getFullYear() && disp.getMonth() === now.getMonth();
      let col = (disp.getDay() + 6) % 7, row = 0;
      for (let d = 1; d <= days; d++) {
        const cx = x0 + col * cw7 + cw7 / 2, cy = y0 + 12 + row * 14, today = same && d === now.getDate();
        if (today) { ctx.fillStyle = `rgb(${T.primary})`; ctx.beginPath(); ctx.arc(cx, cy + 6, 6, 0, 7); ctx.fill(); }
        // Day numbers use Skia's default typeface (Segoe UI on Windows); today is InterBold.
        ctx.font = today ? font(11, true) : '11px "Segoe UI", system-ui, sans-serif';
        ctx.textAlign = "center"; ctx.fillStyle = !today && col >= 5 ? T.text2 : "#fff";
        ctx.fillText(String(d), cx, cy + 10); ctx.textAlign = "left";
        if (++col === 7) { col = 0; row++; }
      }
    }

    function drawWeather(x, y) {
      ctx.fillStyle = T.widgetBg; roundRect(ctx, x, y, 260, 146, 15); ctx.fill();
      const ic = (im, cx, cy, s, col) => { const t = tintedCol(im, col); if (t) ctx.drawImage(t, cx - s / 2, cy - s / 2, s, s); };
      ic(SIMG.location, x + 20, y + 17.5, 12.5, T.text2);
      textLeftMid(ctx, "Lisbon", x + 32.5, y + 17.5, 15, false, T.text2);
      ic(SIMG.cloud, x + 20, y + 37.5, 12.5, T.text3);
      textLeftMid(ctx, "Clear", x + 32.5, y + 37.5, 13, true, T.text3);
      textLeftMid(ctx, "21°C", x + 15, y + 146 - 27.5, 34, false, "#fff");
      ctx.save(); roundRect(ctx, x, y, 260, 146, 15); ctx.clip();
      ic(SIMG.sunny, x + 260, y + 73, 100, T.text3);
      ctx.restore();
    }

    // ── clipboard tab (ClipboardTray) ──
    function drawClipboard(w, h) {
      const PX = 10, HH = 44;
      const tw = w - 30, th = h - bCD - TOPSP - 25, tx = -tw / 2, ty = TOP + 45;
      const expanded = clipExpanded && entries.length > 0;
      const listW = expanded ? Math.min(390, tw) : tw;
      ctx.save(); roundRect(ctx, tx, ty, tw, th, 14); ctx.clip();
      const cy = Math.round(ty + HH / 2); let hx = tx + PX + 4;
      lucide(ctx, LU.clipboard, Math.round(hx + 9), cy, 18, `rgb(${T.primary})`, 2);
      hx += 26;
      txt(ctx, "Clipboard", hx, cy + 6, 16, true, "#fff");
      hx += measure(ctx, "Clipboard", 16, true) + 8;
      if (entries.length) {
        const cnt = String(entries.length), cwid = Math.max(20, measure(ctx, cnt, 11, true) + 12);
        ctx.fillStyle = `rgba(${T.primary},0.22)`; roundRect(ctx, hx, cy - 9, cwid, 18, 9); ctx.fill();
        txt(ctx, cnt, hx + cwid / 2, cy + 4, 11, true, "#fff", "center");
        const bh = 28, bw = Math.round(34 + measure(ctx, "Clear", 12.5, true) + 14), by = Math.round(ty + (HH - bh) / 2);
        const cl = Math.round(tx + listW - PX - bw);
        live.push({ id: "c-clear", test: (p) => inR(p, cl, by, bw, bh), click: () => { entries = []; clipScroll = 0; } });
        const hc = isHot("c-clear");
        ctx.fillStyle = hc ? "rgba(255,69,58,0.251)" : "rgba(255,255,255,0.11)"; roundRect(ctx, cl, by, bw, bh, 14); ctx.fill();
        const ccol = hc ? "#ff6b61" : "#fff";
        lucide(ctx, LU.trash, cl + 18, by + bh / 2, 16, ccol, 2);
        txt(ctx, "Clear", cl + 32, by + bh / 2 + 4.5, 12.5, true, ccol);
        const ex = cl - 6 - 32;
        live.push({ id: "c-exp", test: (p) => inR(p, ex, by, 32, bh), click: () => (clipExpanded = !clipExpanded) });
        const he = isHot("c-exp");
        ctx.fillStyle = expanded ? `rgba(${T.primary},${he ? 0.45 : 0.32})` : `rgba(255,255,255,${he ? 0.2 : 0.11})`;
        roundRect(ctx, ex, by, 32, bh, 14); ctx.fill();
        lucide(ctx, expanded ? LU.panelClose : LU.panelOpen, ex + 16, by + bh / 2, 16, "#fff", 2);
      }
      const listTop = ty + HH;
      if (!entries.length) {
        dashed(tx + PX, listTop + 8, tw - 2 * PX, th - HH - 16);
        txt(ctx, "No clipboard items", tx + tw / 2, listTop + (th - HH) / 2, 13, false, T.text3, "center");
        ctx.restore(); return;
      }
      let y = listTop + 8 + clipY, hovered = -1;
      if (inR(pointer, tx, listTop, listW, th - HH)) {
        for (let i = 0; i < entries.length; i++) {
          const c = clipCardH(entries[i]);
          if (pointer[1] >= y && pointer[1] <= y + c) { hovered = i; previewId = entries[i].id; break; }
          y += c + 8;
        }
      }
      if (expanded) {
        const pr = { x: tx + listW, y: ty + 8, w: tw - listW - PX, h: th - 16 };
        if (pr.w > 60) drawPreview(pr);
      }
      ctx.save(); ctx.beginPath(); ctx.rect(tx, listTop, listW, th - HH); ctx.clip();
      y = listTop + 8 + clipY;
      entries.forEach((e, i) => {
        const c = clipCardH(e);
        if (y + c >= listTop && y <= ty + th) drawClipCard(e, tx + PX, y, listW - 2 * PX, c, i === hovered, listTop, ty + th);
        y += c + 8;
      });
      ctx.restore();
      ctx.restore();
    }
    function dashed(x, y, w, h) {
      ctx.save(); ctx.setLineDash([10, 10]); ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(89,89,89,0.35)"; roundRect(ctx, x, y, w, h, 12); ctx.stroke(); ctx.restore();
    }
    const metaOf = (e) => (copiedId === e.id ? ["Copied", T.success] : [e.meta, T.text3]);
    function copy(e) { copiedId = e.id; copiedT = 1.1; }
    function drawClipCard(e, x, y, w, h, hovered, clipT, clipB) {
      const id = "card-" + e.id;
      live.push({ id, test: (p) => inR(p, x, y, w, h) && p[1] >= clipT && p[1] <= clipB, click: () => copy(e) });
      ctx.fillStyle = hovered ? "rgba(255,255,255,0.137)" : T.widgetBg; roundRect(ctx, x, y, w, h, 12); ctx.fill();
      if (e.kind === "image") {
        drawContain(SIMG.photo, { x: x + 8, y: y + 8, w: w - 16, h: h - 16 - 18 }, 6);
        const [m, c] = metaOf(e);
        txt(ctx, fitText(ctx, m, 10.5, false, w - 24), x + 12, y + h - 7, 10.5, false, c);
      } else {
        const title = e.text.replace(/\s+/g, " ").trim();
        const col = e.kind === "link" ? `rgb(${T.primary})` : "#fff";
        const tw2 = w - 24, titleW = hovered ? tw2 - 44 : e.pinned ? tw2 - 16 : tw2;
        txt(ctx, fitText(ctx, title, 13, true, titleW), x + 12, y + h / 2 - 2, 13, true, col);
        const [m, c] = metaOf(e);
        txt(ctx, fitText(ctx, m, 10.5, false, tw2), x + 12, y + h / 2 + 15, 10.5, false, c);
      }
      const del = [x + w - 15, y + 15], pin = [x + w - 37, y + 15];
      if (hovered) {
        live.push({ id: "pin-" + e.id, test: (p) => inC(p, pin[0], pin[1], 12), click: () => (e.pinned = !e.pinned) });
        live.push({ id: "del-" + e.id, test: (p) => inC(p, del[0], del[1], 12), click: () => { entries = entries.filter((q) => q !== e); } });
        for (const [c, idb] of [[pin, "pin-" + e.id], [del, "del-" + e.id]]) {
          ctx.fillStyle = isHot(idb) ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.arc(c[0], c[1], 11, 0, 7); ctx.fill();
        }
        lucide(ctx, LU.pin, pin[0], pin[1], 13, e.pinned ? `rgb(${T.primary})` : "#fff", 1.9);
        lucide(ctx, LU.x, del[0], del[1], 12, "#fff", 1.9);
      } else if (e.pinned) lucide(ctx, LU.pin, del[0], del[1], 12, `rgb(${T.primary})`, 1.9);
    }
    function drawContain(im, a, r) {
      if (!im.complete || !im.naturalWidth) return;
      const s = Math.min(a.w / im.naturalWidth, a.h / im.naturalHeight), dw = im.naturalWidth * s, dh = im.naturalHeight * s;
      const dx = a.x + a.w / 2 - dw / 2, dy = a.y + a.h / 2 - dh / 2;
      ctx.save(); roundRect(ctx, dx, dy, dw, dh, r); ctx.clip(); ctx.drawImage(im, dx, dy, dw, dh); ctx.restore();
    }
    function drawPreview(r) {
      const e = entries.find((q) => q.id === previewId) || entries[0];
      live.push({ id: "preview", test: (p) => inR(p, r.x, r.y, r.w, r.h), click: () => copy(e) });
      ctx.fillStyle = isHot("preview") ? "rgba(255,255,255,0.117)" : T.widgetBg; roundRect(ctx, r.x, r.y, r.w, r.h, 12); ctx.fill();
      const a = { x: r.x + 14, y: r.y + 14, w: r.w - 28, h: r.h - 28 - 22 };
      ctx.save(); ctx.beginPath(); ctx.rect(a.x, a.y, a.w, a.h); ctx.clip();
      if (e.kind === "image") drawContain(SIMG.photo, a, 8);
      else {
        const text = e.kind === "files" ? e.files.join("\n") : e.text;
        wrapText(ctx, text, 13.5, a.w, Math.max(1, Math.floor(a.h / 20)))
          .forEach((l, i) => txt(ctx, l, a.x, a.y + 14 + i * 20, 13.5, false, e.kind === "link" ? `rgb(${T.primary})` : "#fff"));
      }
      ctx.restore();
      const [m, c] = metaOf(e);
      txt(ctx, fitText(ctx, m, 10.5, false, r.w - 28), r.x + 14, r.y + r.h - 14 + 2, 10.5, false, c);
    }

    // ── notifications tab (NotificationTray) ──
    function drawNotifications(w, h) {
      const PX = 10, tw = w - 30, th = h - bCD - TOPSP - 25, tx = -tw / 2, ty = TOP + 45;
      ctx.save(); roundRect(ctx, tx, ty, tw, th, 14); ctx.clip();
      if (!groups.length) {
        dashed(tx + PX, ty + 8, tw - 2 * PX, th - 16);
        txt(ctx, "No notifications", tx + tw / 2, ty + th / 2, 13, false, T.text3, "center");
        ctx.restore(); return;
      }
      const cw2 = tw - 2 * PX;
      let y = ty + 8 + notifY;
      groups.forEach((g) => {
        const chh = notifCardH(g);
        if (y + chh >= ty && y <= ty + th) {
          const sw = swipe && swipe.key === g.key && swipe.msg == null && Math.abs(swipe.x) > 0.5;
          if (sw) {
            ctx.fillStyle = "#e24b4a"; roundRect(ctx, tx + PX, y, cw2, chh, 16); ctx.fill();
            const left = swipe.x < 0;
            txt(ctx, "Delete", left ? tx + PX + cw2 - 18 : tx + PX + 18, y + 38 + 4.5, 12.5, true, "#fff", left ? "right" : "left");
          }
          ctx.save(); if (sw) ctx.translate(swipe.x, 0);
          drawNotifCard(g, tx + PX, y, cw2, chh, ty, ty + th);
          ctx.restore();
        }
        y += chh + 8;
      });
      ctx.restore();
    }
    function drawNotifCard(g, x, y, w, h, clipT, clipB) {
      const p = expand[g.key] || 0, pad = 14;
      const bx = x + w - 14 - 30, by = y + 76 - 14 - 30;
      const cardId = "n-" + g.key, btnId = "nb-" + g.key, hasMore = g.msgs.length > 0;
      const vis = (q) => q[1] >= clipT && q[1] <= clipB;
      live.push({ id: cardId, test: (q) => vis(q) && inR(q, x, y, w, 76), click: () => {}, swipe: { key: g.key, msg: null } });
      if (hasMore) live.push({ id: btnId, test: (q) => vis(q) && inR(q, bx, by, 30, 30), click: () => { g.open = !g.open; } });
      ctx.fillStyle = isHot(cardId) ? "rgba(255,255,255,0.137)" : T.widgetBg; roundRect(ctx, x, y, w, h, 16); ctx.fill();
      const ix = x + pad, iy = y + (76 - 44) / 2;
      ctx.fillStyle = "rgba(255,255,255,0.10)"; roundRect(ctx, ix, iy, 44, 44, 12); ctx.fill();
      lucide(ctx, g.glyph, ix + 22, iy + 22, 23, "#fff", 2);
      const tx = x + pad + 44 + 14, rightEdge = bx - 6, tb = y + 27;
      txt(ctx, g.time, bx + 28, tb, 11.5, false, T.text3, "right");
      const timeW = measure(ctx, g.time, 11.5, false);
      txt(ctx, fitText(ctx, g.title, 14.5, true, bx + 30 - 10 - timeW - tx), tx, tb, 14.5, true, "#fff");
      const last = g.msgs.length ? g.msgs[g.msgs.length - 1][0] : "";
      wrapText(ctx, last, 12.5, Math.max(40, rightEdge - tx), 2).forEach((l, i) => txt(ctx, l, tx, y + 47 + i * 17, 12.5, false, T.text2));
      if (hasMore) {
        ctx.fillStyle = `rgba(255,255,255,${isHot(btnId) ? 0.16 : 0.08})`; ctx.beginPath(); ctx.arc(bx + 15, by + 15, 15, 0, 7); ctx.fill();
        ctx.save(); ctx.translate(bx + 15, by + 15); ctx.rotate(Math.PI * p);
        ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath(); ctx.moveTo(-5, -2.25); ctx.lineTo(0, 2.75); ctx.lineTo(5, -2.25); ctx.stroke();
        ctx.restore();
      }
      if (g.unread > 0) {
        const ux = x + pad + 44 - 2, uy = iy + 2;
        ctx.fillStyle = `rgb(${T.primary})`; ctx.beginPath(); ctx.arc(ux, uy, 8.5, 0, 7); ctx.fill();
        txt(ctx, g.unread > 9 ? "9+" : String(g.unread), ux, uy + 3.5, 9.5, true, "#fff", "center");
      }
      if (p <= 0.001 || !hasMore) return;
      ctx.save(); roundRect(ctx, x, y, w, h, 16); ctx.clip();
      const a = clamp((p - 0.15) / 0.6, 0, 1);
      ctx.fillStyle = `rgba(255,255,255,${0.08 * a})`; ctx.fillRect(x + pad, y + 76, w - 2 * pad, 1);
      let my = y + 76 + 10 + (1 - p) * 8;
      g.msgs.forEach(([text, time], i) => {
        const row = { x: x + pad, y: my, w: w - 2 * pad, h: 46 }, rid = "nm-" + g.key + "-" + i;
        live.push({ id: rid, test: (q) => p > 0.5 && vis(q) && inR(q, row.x, row.y - 2, row.w, 50), click: () => {}, swipe: { key: g.key, msg: i } });
        const rs = swipe && swipe.key === g.key && swipe.msg === i && Math.abs(swipe.x) > 0.5;
        if (rs) {
          ctx.fillStyle = `rgba(226,75,74,${a})`; roundRect(ctx, row.x, row.y, row.w, row.h, 11); ctx.fill();
          const left = swipe.x < 0;
          txt(ctx, "Delete", left ? row.x + row.w - 14 : row.x + 14, row.y + 23 + 4.5, 12, true, "#fff", left ? "right" : "left");
          ctx.save(); roundRect(ctx, row.x, row.y, row.w, row.h, 11); ctx.clip(); ctx.translate(swipe.x, 0);
          ctx.fillStyle = "#000"; roundRect(ctx, row.x, row.y, row.w, row.h, 11); ctx.fill();
          ctx.fillStyle = T.widgetBg; roundRect(ctx, row.x, row.y, row.w, row.h, 11); ctx.fill();
        }
        ctx.fillStyle = `rgba(255,255,255,${(isHot(rid) ? 0.10 : 0.05) * a})`; roundRect(ctx, row.x, row.y, row.w, row.h, 11); ctx.fill();
        const rtx = row.x + 12, rtr = row.x + row.w - 12;
        txt(ctx, time, rtr, row.y + 17, 10.5, false, `rgba(89,89,89,${a})`, "right");
        const mtw = measure(ctx, time, 10.5, false);
        const ml = wrapText(ctx, text, 13, Math.max(40, rtr - mtw - 10 - rtx), 2);
        const fb = ml.length > 1 ? row.y + 18 : row.y + 23 + 4.5;
        ml.forEach((l, li) => txt(ctx, l, rtx, fb + li * 17, 13, false, `rgba(255,255,255,${a})`));
        if (rs) ctx.restore();
        my += 46 + 4;
      });
      ctx.restore();
    }

    // ── eased values (ZonePanel.Ease: fixed-length ease-out-cubic tween, retargets from the current value) ──
    const tweens = {};
    function ease(key, target, speed) {
      let tw = tweens[key];
      if (!tw) { tweens[key] = { v: target, from: target, to: target, start: clock, dur: 0 }; return target; }
      if (tw.to !== target) { tw.from = tw.v; tw.to = target; tw.start = clock; tw.dur = clamp(3.2 / (speed || 14), 0.1, 0.4); }
      const t = tw.dur ? (clock - tw.start) / tw.dur : 1;
      tw.v = t >= 1 ? target : tw.from + (tw.to - tw.from) * (1 - Math.pow(1 - t, 3));
      return tw.v;
    }
    const hov = (id) => ease("hov:" + id, isHot(id) ? 1 : 0, 24);
    const hovA = (id, a, b) => a + (b - a) * hov(id);
    const W_ = (a) => `rgba(255,255,255,${a})`;
    const RED = [255, 69, 58];
    function circ(cx, cy, r, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill(); }
    function rrect(x, y, w, h, r, fill) { ctx.fillStyle = fill; roundRect(ctx, x, y, w, h, r); ctx.fill(); }
    /** ZonePanel.PressScale: 0.93 around the zone while held. */
    function pressed(id, x, y, w, h, fn) {
      ctx.save();
      if (isDown(id)) { const cx = x + w / 2, cy = y + h / 2; ctx.translate(cx, cy); ctx.scale(0.93, 0.93); ctx.translate(-cx, -cy); }
      fn(); ctx.restore();
    }
    function zone(id, x, y, w, h, click) { live.push({ id, test: (p) => inR(p, x, y, w, h), click }); }

    // ── File tray (Tray + TrayFile) ──
    function drawTray(w, h) {
      const tw = w - 30, th = h - bCD - TOPSP - 25, x0 = -tw / 2, y0 = TOP + 45;
      zone("tray-bg", x0, y0, tw, th, () => trayFiles.forEach((f) => (f.sel = false)));
      if (!trayFiles.length) {
        ctx.save(); ctx.setLineDash([10, 10]); ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.strokeStyle = W_(0.1); roundRect(ctx, x0 + 5, y0 + 5, tw - 10, th - 10, 20); ctx.stroke(); ctx.restore();
        txt(ctx, "Drop files here", 0, y0 + th / 2 + 4, 13, false, T.text3, "center");
      }
      ctx.save(); ctx.beginPath(); ctx.rect(x0 - 25, y0, tw + 50, th); ctx.clip();
      const cols = Math.max(1, Math.floor((tw - 50) / (60 + 25)));
      trayFiles.forEach((f, i) => {
        const fx = x0 + f.x, fy = y0 + f.y;
        live.push({ id: "tf-" + f.id, test: (p) => inR(p, fx, fy, 60, 75) && p[1] >= y0 && p[1] <= y0 + th, click: () => (f.sel = !f.sel) });
        withF(f.fade, () => {
          const cx = fx + 30;
          ctx.font = font(11, false);
          const title = f.name.length > 10 ? f.name.slice(0, 10) + "..." : f.name;
          const tw2 = ctx.measureText(title).width;
          if (f.sel) {
            const a = 0.35 + 0.05 * (1 + Math.sin(f.cycle));
            ctx.fillStyle = `rgba(${T.primary},${a})`;
            ctx.beginPath();
            roundRectSub(ctx, cx - tw2 / 2 + 2.5, fy + 65 - 7 + 1.5, Math.max(0, tw2 - 5), 14, 5);
            roundRectSub(ctx, fx, fy, 60, 65, 7.5);
            ctx.fill("nonzero");
          }
          const im = f.thumb;
          if (im && (im.naturalWidth || im.width)) {
            const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, k = Math.min(50 / iw, 50 / ih);
            const dw = iw * k, dh = ih * k;
            ctx.save(); roundRect(ctx, cx - 25, fy + 5, 50, 50, 5); ctx.clip();
            ctx.drawImage(im, cx - dw / 2, fy + 30 - dh / 2, dw, dh); ctx.restore();
          }
          textCenter(ctx, title, cx, fy + 65, 11, false, T.text2);
          textCenter(ctx, f.date, cx, fy + 82.5, 10, false, T.text3);
          textCenter(ctx, f.size, cx, fy + 92.5, 10, false, T.text3);
        });
      });
      ctx.restore();
      return cols;
    }
    function stepTray(dt, w) {
      const tw = w - 30, th = 250 - bCD - TOPSP - 25, cols = Math.max(1, Math.floor((tw - 50) / 85));
      let n5 = 0, n6 = 0;
      trayFiles.forEach((f, i) => {
        f.cycle += dt * 5;
        f.fade.step(dt);
        f.x = approach(f.x, 110 * (i % cols) + 17.5, 5, dt);
        f.y = approach(f.y, 100 * Math.floor(i / cols) + trayY, 5, dt);
        n5 += 100; if (n5 >= th && i % cols === 0) n6 += 100;
      });
      trayScroll = approach(trayScroll, clamp(trayScroll, -n6, 0), 25, dt);
      trayY = approach(trayY, trayScroll, 50, dt);
    }
    const fmtSize = (b) => (b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB");
    const fmtDate = (d) => { const p = (n) => String(n).padStart(2, "0"); return `${p(d.getFullYear() % 100)}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
    function addTrayFile(name, bytes, date, thumb) {
      trayFiles.push({ id: ++trayId, name, size: fmtSize(bytes), date: fmtDate(date), thumb, x: 0, y: 0, cycle: 0, sel: false, fade: Object.assign(new Fade(false), { t: 1 }) });
      const f = trayFiles[trayFiles.length - 1];
      setTimeout(() => f.fade.set(true), 20 * trayFiles.length);   // TrayFile appears once its thumbnail is ready
    }
    function traySeed() {
      const d = (m) => new Date(Date.now() - m * 60000);
      addTrayFile("Vacation", 2480000, d(40), SIMG.photo);
      addTrayFile("Q3-roadmap", 412000, d(95), SIMG.doc);
      addTrayFile("cover-art", 182000, d(130), IMG.cover);
      addTrayFile("meeting-notes", 3400, d(300), SIMG.doc);
      addTrayFile("Screenshot 2026-10-07", 521500, d(820), SIMG.rec1);
      addTrayFile("invoice-0412", 96000, d(1500), SIMG.file2);
      addTrayFile("demo-reel", 18400000, d(3000), SIMG.rec3);
    }
    // Real files dropped on the island go into the demo tray (read locally, nothing is uploaded).
    if (!embedded) canvas.addEventListener("dragover", (e) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"; });
    if (!embedded) canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer ? [...e.dataTransfer.files] : [];
      if (!files.length) return;
      pinned = false; setTab("tray");
      for (const f of files.slice(0, 20)) {
        const base = f.name.replace(/\.[^.]+$/, "") || f.name;
        let thumb = SIMG.file2;
        if (/^image\//.test(f.type)) { thumb = new Image(); thumb.src = URL.createObjectURL(f); }
        else if (/^text\/|pdf|document|sheet|presentation/.test(f.type)) thumb = SIMG.doc;
        addTrayFile(base, f.size, new Date(f.lastModified || Date.now()), thumb);
      }
    });

    // ── Record panel (RecordPanel) ──
    const recOpts = () => [
      ["scr", ["Island's screen", "Primary", "Display 2"], "Screen to record"],
      ["q", ["720p", "1080p", "1440p", "Native"], "Quality"],
      ["f", ["30", "60"], "Frame rate"],
      ["sys", [], "System audio"],
      ["cur", [], "Show cursor"],
    ];
    const recSummary = () => `${recSet.scr === 2 ? "Display 2" : "Primary"} · ${recOpts()[1][1][recSet.q]} · ${recSet.f ? 60 : 30} fps`;
    const elapsedStr = (s) => { s = Math.floor(s); const m = Math.floor(s / 60) % 60, hh = Math.floor(s / 3600); const p = (n) => String(n).padStart(2, "0"); return hh ? `${hh}:${p(m)}:${p(s % 60)}` : `${p(m)}:${p(s % 60)}`; };
    function recClick(id) {
      const R = rec;
      switch (id) {
        case "rec": R.live = true; R.paused = false; R.elapsed = 0; return;
        case "pause": R.paused = !R.paused; return;
        case "stop": stopRecording(); return;
        case "mic": R.mic = !R.mic; return;
        case "screen": if (!R.live) recSet.scr = recSet.scr + 1 > 2 ? 0 : recSet.scr + 1; return;
        case "collapse": recPill = true; return;
        case "tab0": R.tab = 0; return;
        case "tab1": R.tab = 1; return;
        case "sys": recSet.sys = !recSet.sys; return;
        case "cur": recSet.cur = !recSet.cur; return;
        case "thumb": case "play": case "folder": R.flash = 0.6; return;
      }
      const [k, i] = id.split(":"), idx = +i;
      if (k === "row" || k === "menu") R.sel = idx;
      else if (k === "scr" || k === "q") recSet[k] = idx;
      else if (k === "f") recSet.f = idx;
    }
    function stopRecording() {
      const R = rec;
      if (!R.live) return;
      const d = new Date(), p = (n) => String(n).padStart(2, "0");
      const secs = Math.max(1, Math.floor(R.elapsed));
      const q = recOpts()[1][1][recSet.q];
      R.items.unshift({ name: `Notchify ${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}.${p(d.getMinutes())}.${p(d.getSeconds())}`,
        meta: `${elapsedStr(secs).padStart(8, "00:")} • ${Math.max(1, Math.round(secs * (recSet.f ? 0.45 : 0.3)))} MB • ${q} ${recSet.f ? 60 : 30}fps`,
        img: [SIMG.rec1, SIMG.rec2, SIMG.rec3][R.items.length % 3] });
      R.live = false; R.paused = false; R.sel = 0; R.tab = 0; recPill = false;
    }
    function recLayout(x0, y0, W, H) {
      const Z = {}, P = 16, narrow = W < 600, live2 = rec.live;
      const cy = narrow ? y0 + P + 84 : y0 + P + 28;
      let xr = x0 + W - P;
      if (live2) { Z.collapse = [xr - 40, cy - 20, 40, 40]; xr -= 52; }
      const grp = [xr - 92, cy - 22, 92, 44];
      Z.grp = grp; Z.mic = [grp[0] + 6, cy - 20, 40, 40]; Z.screen = [grp[0] + 46, cy - 20, 40, 40];
      xr = grp[0] - 22;
      if (live2) { Z.stop = [xr - 50, cy - 25, 50, 50]; Z.pause = [xr - 110, cy - 25, 50, 50]; }
      else { const w = measure(ctx, "Start recording", 14, true) + 58; Z.rec = [xr - w, cy - 22, w, 44]; }
      const tabsY = y0 + P + (narrow ? 112 : 56) + 10, contentY = tabsY + 46;
      Z.tab0 = [x0 + P, tabsY, 132, 34]; Z.tab1 = [x0 + P + 144, tabsY, 110, 34];
      return { Z, P, narrow, tabsY, contentY, ch: y0 + H - P - contentY };
    }
    function drawRecord(w, h) {
      const W = w - 30, H = h - bCD - TOPSP - 25, x0 = -W / 2, y0 = TOP + 45;
      if (W < 50 || H < 50) return;
      const L = recLayout(x0, y0, W, H), Z = L.Z, P = L.P;
      ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, W, H); ctx.clip();
      const z = (id, click) => { const r = Z[id]; zone(id, r[0], r[1], r[2], r[3], click || (() => recClick(id))); return r; };
      // header
      rrect(x0 + P, y0 + P + 2, 52, 52, 15, W_(0.08));
      screenRec(x0 + P + 26, y0 + P + 28, 28, 0.95, 1);
      const tx = x0 + P + 52 + 16;
      txt(ctx, "Screen recording", tx, y0 + P + 24, 18, true, "#fff");
      if (rec.live) {
        const a = rec.paused ? 0.45 : 0.6 + 0.4 * (0.5 + 0.5 * Math.cos(rec.pulse * 4));
        circ(tx + 5, y0 + P + 43, 4.5, `rgba(${RED},${a})`);
        txt(ctx, elapsedStr(rec.elapsed) + (rec.paused ? "  ·  Paused" : ""), tx + 16, y0 + P + 48, 13.5, false, T.text2);
      } else txt(ctx, fitText(ctx, recSummary(), 13, false, L.narrow ? W - (tx - x0) - P : 260), tx, y0 + P + 48, 13, false, T.text2);
      if (Z.collapse) { const r = z("collapse"); pressed("collapse", ...r, () => { circ(r[0] + 20, r[1] + 20, 20, W_(hovA("collapse", 0.08, 0.16))); lucide(ctx, LU.chevronUp, r[0] + 20, r[1] + 20, 20, W_(0.9), 2); }); }
      const g = Z.grp;
      rrect(g[0], g[1], g[2], g[3], 22, W_(0.07));
      { const r = z("mic"); pressed("mic", ...r, () => { circ(r[0] + 20, r[1] + 20, 20, W_(0.1 * hov("mic"))); lucide(ctx, rec.mic ? LU.micOn : LU.micOff, r[0] + 20, r[1] + 20, 20, W_(rec.mic ? 0.95 : 0.55), 2); }); }
      { const r = z("screen"); pressed(rec.live ? "" : "screen", ...r, () => { if (!rec.live) circ(r[0] + 20, r[1] + 20, 20, W_(0.1 * hov("screen"))); lucide(ctx, LU.monitor, r[0] + 20, r[1] + 20, 20, W_(rec.live ? 0.35 : 0.95), 2); }); }
      ctx.strokeStyle = W_(0.12); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g[0] - 11, g[1] + 22 - 16); ctx.lineTo(g[0] - 11, g[1] + 22 + 16); ctx.stroke();
      if (Z.stop) { const r = z("stop"); pressed("stop", ...r, () => { circ(r[0] + 25, r[1] + 25, 25, `rgba(${RED},${isHot("stop") ? 1 : 0.9})`); lucideFill(LU.square, r[0] + 25, r[1] + 25, 14 * 24 / 18, "#fff"); }); }
      if (Z.pause) { const r = z("pause"); pressed("pause", ...r, () => { circ(r[0] + 25, r[1] + 25, 25, W_(hovA("pause", 0.1, 0.18))); if (rec.paused) lucideFill(LU.play, r[0] + 26, r[1] + 25, 15 * 24 / 18, W_(0.95)); else lucideFill(LU.pause, r[0] + 25, r[1] + 25, 15 * 24 / 16, W_(0.95)); }); }
      if (Z.rec) {
        const r = z("rec");
        pressed("rec", ...r, () => {
          rrect(r[0], r[1], r[2], r[3], r[3] / 2, `rgba(${RED},${isHot("rec") ? 1 : 0.88})`);
          ctx.strokeStyle = W_(0.95); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r[0] + 24, r[1] + 22, 8, 0, 7); ctx.stroke();
          circ(r[0] + 24, r[1] + 22, 4.5, W_(0.95));
          txt(ctx, "Start recording", r[0] + 42, r[1] + 22 + 5, 14, true, "#fff");
        });
      }
      // tabs
      [["tab0", "Recordings", 0], ["tab1", "Settings", 1]].forEach(([id, label, idx]) => {
        const r = z(id), on = rec.tab === idx, ix = r[0] + 10;
        const col = on ? "#fff" : `rgba(166,166,166,${isHot(id) ? 1 : 0.8})`;
        lucide(ctx, idx === 0 ? LU.monitorPlay : LU.gear, ix + 9, r[1] + 17, 18, col, 2);
        txt(ctx, label, ix + 28, r[1] + 17 + 5, 14, on, col);
      });
      { const r = Z["tab" + rec.tab], lbl = rec.tab === 0 ? "Recordings" : "Settings";
        const ux = x0 + ease("tab:x", r[0] + 10 - x0, 16), uw = ease("tab:w", measure(ctx, lbl, 14, true) + 28, 16);
        rrect(ux, r[1] + 35, uw, 2.5, 1.25, "#fff"); }
      ctx.fillStyle = W_(0.08); ctx.fillRect(x0 + P, L.tabsY + 37 - 0.5, W - 2 * P, 1);
      if (L.ch >= 40) { if (rec.tab === 0) drawRecList(x0, W, L); else drawRecSettings(x0, W, L); }
      ctx.restore();
    }
    function screenRec(cx, cy, s, a, dotA) {
      lucide(ctx, LU.monitorDotBody, cx, cy, s, W_(a), 2);
      const k = s / 24; circ(cx - s / 2 + 19 * k, cy - s / 2 + 6 * k, 4 * k, `rgba(${RED},${dotA})`);
    }
    function drawThumbFill(im, x, y, w, h, r) {
      ctx.save(); roundRect(ctx, x, y, w, h, r); ctx.clip();
      if (im && im.naturalWidth) { const k = Math.max(w / im.naturalWidth, h / im.naturalHeight), dw = im.naturalWidth * k, dh = im.naturalHeight * k; ctx.drawImage(im, x + w / 2 - dw / 2, y + h / 2 - dh / 2, dw, dh); }
      else { rrect(x, y, w, h, r, W_(0.07)); screenRec(x + w / 2, y + h / 2, Math.min(h * 0.5, 26), 0.35, 0.5); }
      ctx.restore();
    }
    function drawRecList(x0, W, L) {
      const items = rec.items, P = L.P, cy0 = L.contentY, ch = L.ch, RowH = 74, gap = 6;
      const listW = L.narrow ? W - 2 * P : (W - 2 * P) * 0.56, lx = x0 + P;
      if (!items.length) { txt(ctx, "No recordings yet", 0, cy0 + ch / 2, 13.5, false, T.text3, "center"); return; }
      rec.scrollT = clamp(rec.scrollT, Math.min(0, ch - items.length * (RowH + gap)), 0);
      ctx.save(); ctx.beginPath(); ctx.rect(lx, cy0, listW, ch); ctx.clip();
      items.forEach((it, i) => {
        const ry = cy0 + rec.scroll + i * (RowH + gap);
        if (ry + RowH < cy0 || ry > cy0 + ch) return;
        const rid = "row:" + i, mid = "menu:" + i, mcx = lx + listW - 48, mcy = ry + RowH / 2 - 17;
        live.push({ id: rid, test: (p) => inR(p, lx, Math.max(ry, cy0), listW, Math.min(ry + RowH, cy0 + ch) - Math.max(ry, cy0)), click: () => recClick(rid) });
        live.push({ id: mid, test: (p) => inR(p, mcx, mcy, 34, 34) && p[1] >= cy0 && p[1] <= cy0 + ch, click: () => recClick(mid) });
        if (i === rec.sel) rrect(lx, ry, listW, RowH, 14, W_(0.08));
        else { const hv = Math.max(hov(rid), hov(mid)); if (hv > 0.01) rrect(lx, ry, listW, RowH, 14, W_(0.045 * hv)); }
        drawThumbFill(it.img, lx + 10, ry + RowH / 2 - 29, 104, 58, 8);
        const tx = lx + 10 + 104 + 14, maxW = lx + listW - 58 - tx;
        txt(ctx, fitText(ctx, it.name, 13.5, true, maxW), tx, ry + RowH / 2 - 4, 13.5, true, "#fff");
        txt(ctx, fitText(ctx, it.meta, 12, false, maxW), tx, ry + RowH / 2 + 16, 12, false, T.text2);
        pressed(mid, mcx, mcy, 34, 34, () => { rrect(mcx, mcy, 34, 34, 10, W_(hovA(mid, 0.07, 0.16))); lucide(ctx, LU.ellipsis, mcx + 17, mcy + 17, 18, W_(0.9), 2.4); });
      });
      ctx.restore();
      if (L.narrow) return;
      const it = items[clamp(rec.sel, 0, items.length - 1)];
      const px = lx + listW + 16, pw = x0 + W - P - px, card = [px, cy0, pw, ch];
      zone("card", ...card);
      rrect(...card, 16, W_(0.05));
      let tw = pw - 28, th = Math.min(tw * 9 / 16, ch - 128); tw = th * 16 / 9;
      const t = [px + pw / 2 - tw / 2, cy0 + 14, tw, Math.max(10, th)];
      zone("thumb", ...t, () => recClick("thumb"));
      drawThumbFill(it.img, ...t, 12);
      if (isHot("thumb")) { rrect(...t, 12, "rgba(0,0,0,0.25)"); circ(t[0] + t[2] / 2, t[1] + t[3] / 2, 26, "rgba(0,0,0,0.45)"); lucideFill(LU.play, t[0] + t[2] / 2 + 2, t[1] + t[3] / 2, 24, W_(0.95)); }
      const ny = t[1] + t[3] + 24;
      txt(ctx, fitText(ctx, it.name, 14, true, pw - 28), px + 14, ny, 14, true, "#fff");
      txt(ctx, fitText(ctx, it.meta, 12, false, pw - 28), px + 14, ny + 19, 12, false, T.text2);
      const by = cy0 + ch - 14 - 40;
      zone("play", px + 14, by, 112, 40, () => recClick("play"));
      pressed("play", px + 14, by, 112, 40, () => { rrect(px + 14, by, 112, 40, 20, W_(hovA("play", 0.12, 0.2))); lucideFill(LU.play, px + 38, by + 20, 16, W_(0.95)); txt(ctx, "Play", px + 56, by + 25, 13.5, true, "#fff"); });
      zone("folder", px + 136, by, 40, 40, () => recClick("folder"));
      pressed("folder", px + 136, by, 40, 40, () => { circ(px + 156, by + 20, 20, W_(hovA("folder", 0.1, 0.18))); lucide(ctx, LU.folder, px + 156, by + 20, 19, W_(0.9), 2); });
      if (rec.flash > 0) {   // the real app opens the video / Explorer here
        ctx.globalAlpha *= Math.min(1, rec.flash * 3);
        rrect(px + pw / 2 - 110, cy0 + 8, 220, 30, 15, "rgba(0,0,0,0.75)");
        txt(ctx, "Opens in your video player", px + pw / 2, cy0 + 27, 12, false, "#fff", "center");
      }
    }
    function drawRecSettings(x0, W, L) {
      const P = L.P, cw = W - 2 * P; let ry = L.contentY + 4;
      for (const [key, opts, label] of recOpts()) {
        txt(ctx, label, x0 + P + 4, ry + 31, 14, false, "#fff");
        if (key === "sys" || key === "cur") {
          const t = [x0 + P + cw - 46, ry + 13, 46, 26];
          zone(key, ...t, () => recClick(key));
          const k = ease(key, recSet[key] ? 1 : 0, 16);
          const c0 = [90, 90, 98, 0.55], c1 = [52, 199, 89, 1], mix = (i) => c0[i] + (c1[i] - c0[i]) * k;
          rrect(...t, 13, `rgba(${Math.round(mix(0))},${Math.round(mix(1))},${Math.round(mix(2))},${mix(3)})`);
          circ(t[0] + 3 + (t[2] - 26) * k + 10, t[1] + 13, 10, "#fff");
        } else {
          const widths = opts.map((o) => measure(ctx, o, 12.5, true) + 26), total = widths.reduce((a, b) => a + b, 4);
          let sx = x0 + P + cw - total + 2;
          const rects = widths.map((wd, i) => { const r = [sx, ry + 10, wd, 32]; sx += wd; zone(`${key}:${i}`, ...r, () => recClick(`${key}:${i}`)); return r; });
          const first = rects[0], last = rects[rects.length - 1];
          rrect(first[0] - 2, first[1] - 2, last[0] + last[2] - first[0] + 4, 36, 10, W_(0.07));
          const sel = key === "f" ? recSet.f : recSet[key], sr = rects[sel];
          const thx = x0 + ease(key + ":x", sr[0] - x0, 16), thw = ease(key + ":w", sr[2], 16);
          rects.forEach((r, i) => { const hv = hov(`${key}:${i}`); if (i !== sel && hv > 0.01) rrect(...r, 8, W_(0.08 * hv)); });
          rrect(thx, first[1], thw, 32, 8, W_(0.9));
          rects.forEach((r, i) => {
            const cover = clamp((Math.min(r[0] + r[2], thx + thw) - Math.max(r[0], thx)) / Math.max(1, r[2]), 0, 1);
            const c = (a, b) => Math.round(a + (b - a) * cover);
            txt(ctx, opts[i], r[0] + r[2] / 2, r[1] + 16 + 4.5, 12.5, true, `rgb(${c(255, 24)},${c(255, 24)},${c(255, 32)})`, "center");
          });
        }
        ry += 52;
      }
    }
    // RecPill: the collapsed island while recording (470x62).
    function drawRecPill(w, h) {
      const x0 = -w / 2, y0 = TOP, cy = y0 + h / 2;
      if (w < 100) return;
      zone("open", x0, y0, 210, h, () => { recPill = false; });
      rrect(x0 + 12, cy - 20, 40, 40, 12, W_(hovA("open", 0.08, 0.14)));
      screenRec(x0 + 32, cy, 22, 0.95, 1);
      const tx = x0 + 66;
      txt(ctx, "Screen recording", tx, cy - 3, 15, true, "#fff");
      circ(tx + 4, cy + 12, 4, `rgba(${RED},${rec.paused ? 0.45 : 0.6 + 0.4 * (0.5 + 0.5 * Math.cos(rec.pulse * 4))})`);
      txt(ctx, elapsedStr(rec.elapsed) + (rec.paused ? "  ·  Paused" : ""), tx + 14, cy + 16.5, 12.5, false, T.text2);
      const xr = x0 + w - 12, stop = [xr - 42, cy - 21, 42, 42], pause = [xr - 88, cy - 19, 38, 38], mic = [xr - 132, cy - 19, 38, 38];
      // audio meter: fixed waveform shape, the first bars light up red with the level
      const shape = [0.42, 0.7, 1, 0.78, 0.55, 0.92, 0.66, 0.45, 0.6, 0.38];
      const lvl = rec.paused || !rec.mic ? 0 : 0.25 + 0.35 * Math.abs(Math.sin(rec.pulse * 3.1) * Math.sin(rec.pulse * 1.7));
      const lit = Math.round(Math.sqrt(lvl) * shape.length), mx = mic[0] - 22 - 70;
      shape.forEach((s, i) => { const bh = Math.max(4, 26 * s); rrect(mx + i * 7, cy - bh / 2, 3.6, bh, 1.8, i < lit ? `rgb(${RED})` : W_(0.28)); });
      zone("pmic", ...mic, () => { rec.mic = !rec.mic; });
      pressed("pmic", ...mic, () => { circ(mic[0] + 19, cy, 19, W_(0.12 * hov("pmic"))); lucide(ctx, rec.mic ? LU.micOn : LU.micOff, mic[0] + 19, cy, 18, W_(rec.mic ? 0.95 : 0.55), 2); });
      zone("ppause", ...pause, () => { rec.paused = !rec.paused; });
      pressed("ppause", ...pause, () => { circ(pause[0] + 19, cy, 19, W_(hovA("ppause", 0.08, 0.16))); if (rec.paused) lucideFill(LU.play, pause[0] + 20, cy, 16, W_(0.95)); else lucideFill(LU.pause, pause[0] + 19, cy, 18, W_(0.95)); });
      zone("pstop", ...stop, () => stopRecording());
      pressed("pstop", ...stop, () => { circ(stop[0] + 21, cy, 21, W_(hovA("pstop", 0.12, 0.22))); lucideFill(LU.square, stop[0] + 21, cy, 13 * 24 / 18, "#fff"); });
    }

    // ── Bluetooth tab: compact connected card (360x78, elements centred on the island) ──
    function drawBt(w, h) {
      const icy = TOP + h / 2;
      if (SIMG.btSym.complete && SIMG.btSym.naturalWidth) ctx.drawImage(SIMG.btSym, -136 - 24, icy - 24, 48, 48);
      textLeftMid(ctx, "Connected", -104, icy - 11, 10, false, "#34c759");
      textLeftMid(ctx, "Studio Headphones", -104, icy + 9, 15, true, "#fff");
      // BatteryRingElement 50x50, thickness 4, Success colour above 30 %
      const rx = 92, r = 25 - 2, pct = 72;
      ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(186,216,68,0.176)"; ctx.beginPath(); ctx.arc(rx, icy, r, 0, 7); ctx.stroke();
      ctx.strokeStyle = T.success; ctx.beginPath(); ctx.arc(rx, icy, r, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * pct / 100); ctx.stroke();
      txt(ctx, String(pct), rx, icy + 15 * 0.36, 15, true, T.success, "center");
      // home button (IconActionButton 28px, 8 % fill)
      const hx = w / 2 - 39.3, hy = TOP + 34;
      live.push({ id: "bt-home", test: (p) => inC(p, hx, hy, 14), click: () => setTab(btReturn) });
      const s = isDown("bt-home") ? 0.95 : isHot("bt-home") ? 1.05 : 1;
      ctx.save(); ctx.translate(hx, hy); ctx.scale(s, s);
      circ(0, 0, 14, isHot("bt-home") ? W_(0.18) : W_(0.08));
      const z = 16, wv = z * 0.36;
      ctx.strokeStyle = "#fff"; ctx.lineWidth = z * 0.13; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(-wv, z * 0.28); ctx.lineTo(-wv, -z * 0.05); ctx.lineTo(0, -z * 0.38); ctx.lineTo(wv, -z * 0.05); ctx.lineTo(wv, z * 0.28); ctx.closePath(); ctx.stroke();
      ctx.restore();
    }
    function lucideFill(d, cx, cy, size, color) {
      let p = pathCache.get(d); if (!p) { p = new Path2D(d); pathCache.set(d, p); }
      ctx.save(); ctx.translate(cx - size / 2, cy - size / 2); ctx.scale(size / 24, size / 24);
      ctx.fillStyle = ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.fill(p); ctx.stroke(p); ctx.restore();
    }

    let last = performance.now(), running = false, raf = 0;
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; frameNow = now;
      if (cw > 0) { step(dt); draw(dt); }
      raf = requestAnimationFrame(frame);
    }
    traySeed();
    if (embedded) {
      // Shared player state with the host (one song clock for the player and the media widget).
      const pull = () => { const m = host.media; pos = m.pos; playing = m.playing; shuffleOn = m.shuffle; repeatOn = m.repeat; };
      const push = () => { const m = host.media; m.pos = pos; m.playing = playing; m.shuffle = shuffleOn; m.repeat = repeatOn; };
      return {
        target: () => targetSize(),
        step(dt, now) { frameNow = now; pull(); const p0 = pos; step(dt); pos = p0; push(); },
        drawContent(dt) { pull(); drawContent(dt); push(); },
        inMove, inLeave, inCancel,
        inDown(p) { pull(); inDown(p); push(); },
        inUp(p, mouse) { pull(); inUp(p, mouse); push(); },
        inWheel,
        cursorHot,
      };
    }
    resize();
    // Debug hook (verification): advance and paint frames without requestAnimationFrame.
    root.__scene = {
      get size() { return size.slice(); }, setTab, get state() { return { tab, pinned, clipExpanded, recPill, live: rec.live, files: trayFiles.length }; },
      tick(n, dt) { for (let i = 0; i < (n || 1); i++) { frameNow += 1000 * (dt || 1 / 60); step(dt || 1 / 60); draw(dt || 1 / 60); } },
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
        else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
      })).observe(root);
    } else { running = true; raf = requestAnimationFrame(frame); }
  }

  /**
   * Collapsed island on its own (no hover): "idle" = HomeMenu small widgets (battery left, clock centre, 200x35),
   * "lyrics" = music pill (round cover + rolling karaoke chunk, 170x35). Drawn at a fixed zoom on the wallpaper.
   */
  function PillScene(root, mode) {
    const canvas = root.querySelector("canvas"), ctx = canvas.getContext("2d");
    const VW = 300, TOP = -2.5, size = mode === "idle" ? [200, 35] : [170, 35];
    let dpr = 1, cw = 0, ch = 0, pos = START_AT, shown = null, outgoing = null, rollT = 1, last = performance.now(), visible = true;
    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1; cw = r.width; ch = r.height;
      canvas.width = Math.max(1, Math.round(cw * dpr)); canvas.height = Math.max(1, Math.round(ch * dpr));
    }
    function draw() {
      const s = cw / VW, w = size[0], h = size[1], cx = VW / 2, icy = TOP + h / 2;
      ctx.setTransform(dpr * s, 0, 0, dpr * s, 0, 0);
      ctx.clearRect(0, 0, VW, ch / s);
      drawIsland(ctx, cx, TOP, w, h);
      ctx.save();
      squirclePath(ctx, cx - w / 2, -60, cx + w / 2, TOP + h, 52, 0.6);
      ctx.clip();
      if (mode === "idle") {
        const left = cx - (w - 35) / 2;
        if (IMG.battery.complete && IMG.battery.naturalWidth) ctx.drawImage(IMG.battery, left + 10 - 13, icy - 13, 26, 26);
        textCenter(ctx, clockText(), cx, icy, 14, true, rgba(C.text, 1));
      } else {
        const ax = cx - w / 2 + 20;
        if (IMG.cover.complete && IMG.cover.naturalWidth) {
          ctx.save(); ctx.beginPath(); ctx.arc(ax, icy, 11, 0, Math.PI * 2); ctx.clip();
          ctx.drawImage(IMG.cover, ax - 11, icy - 11, 22, 22); ctx.restore();
        }
        const le = 1 - (1 - rollT) * (1 - rollT), slide = 9;
        if (shown) textCenter(ctx, shown, cx + 20, icy + (1 - le) * slide, 12, true, rgba(C.text, le));
        if (rollT < 1 && outgoing) textCenter(ctx, outgoing, cx + 20, icy - le * slide, 12, true, rgba(C.text, 1 - le));
      }
      ctx.restore();
    }
    function step(dt) {
      pos += dt;
      const ph = phraseAt(pos % LOOP);
      if (ph !== shown) { outgoing = shown; shown = ph; rollT = 0; }
      rollT = clamp(rollT + Math.min(dt, 0.034) / 0.22, 0, 1);
      draw();
    }
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (visible) step(dt);
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(root);
    root.__pill = { tick: step };   // debug hook (the pane may be hidden, so rAF does not run)
    requestAnimationFrame(frame);
  }

  function boot() {
    const roots = document.querySelectorAll("[data-island-demo]");
    const scenes = document.querySelectorAll("[data-island-scene]");
    const pills = document.querySelectorAll("[data-island-pill]");
    if (!roots.length && !scenes.length && !pills.length) return;
    const faces = [
      new FontFace(FB, "url(/notchify-demo/fonts/Inter_24pt-ExtraBold.ttf)"),
      new FontFace(FR, "url(/notchify-demo/fonts/Inter_24pt-Regular.ttf)"),
    ];
    Promise.all(faces.map((f) => f.load().then((ff) => document.fonts.add(ff)).catch(() => {})))
      .finally(() => {
        roots.forEach((r) => IslandDemo(r));
        scenes.forEach((r) => HomeScene(r, r.getAttribute("data-island-scene")));
        pills.forEach((r) => PillScene(r, r.getAttribute("data-island-pill")));
      });
  }
  // kingpindev.com: the app card is rendered on demand, so the demo is mounted from there.
  let fontsReady = null;
  window.NotchifyDemo = {
    mount(root) {
      if (root.__mounted) return;
      root.__mounted = true;
      fontsReady = fontsReady || Promise.all([
        new FontFace(FB, "url(/notchify-demo/fonts/Inter_24pt-ExtraBold.ttf)"),
        new FontFace(FR, "url(/notchify-demo/fonts/Inter_24pt-Regular.ttf)"),
      ].map((f) => f.load().then((ff) => document.fonts.add(ff)).catch(() => {})));
      fontsReady.finally(() => IslandDemo(root));
    },
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
