/* kingpindev.com demo: the real vOrganizer UI (index.html, style.css, app.js copied
   unchanged from the app) running against an in-page stand-in for its Flask backend.
   Nothing touches the visitor's disk: the folders and files below are made up, and
   "organizing" only moves names between lists. Also draws the Electron window
   controls the app gets from titleBarOverlay. */
(function () {
  'use strict';

  const CATEGORIES = {
    Images:      { icon: '🖼️', color: '#FF9500', preview: '.jpg  .png  .gif  .webp', ext: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'heic', 'svg', 'psd'] },
    Documents:   { icon: '📄', color: '#007AFF', preview: '.pdf  .docx  .xlsx  .txt', ext: ['pdf', 'docx', 'doc', 'xlsx', 'pptx', 'txt', 'csv', 'md'] },
    Videos:      { icon: '🎬', color: '#FF3B30', preview: '.mp4  .mkv  .mov', ext: ['mp4', 'mkv', 'mov', 'webm'] },
    Audio:       { icon: '🎵', color: '#34C759', preview: '.mp3  .wav  .flac', ext: ['mp3', 'wav', 'flac', 'm4a'] },
    Archives:    { icon: '🗜️', color: '#FF9500', preview: '.zip  .rar  .7z', ext: ['zip', 'rar', '7z', 'iso'] },
    Code:        { icon: '💻', color: '#5856D6', preview: '.py  .js  .html  .ts', ext: ['py', 'js', 'ts', 'html', 'css', 'json', 'ps1'] },
    Executables: { icon: '⚙️', color: '#FF3B30', preview: '.exe  .msi', ext: ['exe', 'msi'] },
    Fonts:       { icon: '🔤', color: '#AF52DE', preview: '.ttf  .otf  .woff', ext: ['ttf', 'otf', 'woff2'] },
  };

  const SEED = {
    Downloads: [
      'Screenshot 2026-10-18 214502.png', 'IMG_4821.jpg', 'wallpaper-4k.webp', 'meme.gif', 'logo-final-v3.psd',
      'Invoice_October.pdf', 'CV_2026.docx', 'budget.xlsx', 'notes.txt', 'presentation.pptx',
      'trailer_final.mp4', 'clip_0412.mkv', 'screen-recording.mov',
      'podcast_ep12.mp3', 'voice-memo.m4a',
      'project-assets.zip', 'fonts-pack.rar', 'backup.7z',
      'script.py', 'index.html', 'config.json',
      'SteamSetup.exe', 'DiscordSetup.exe', 'node-v24-x64.msi',
      'Inter-Variable.ttf', 'Poppins-Bold.otf',
    ],
    Desktop: [
      'Screenshot 2026-10-20 091233.png', 'reference.jpg', 'todo.txt', 'contract.pdf', 'Q3-report.xlsx',
      'highlight.mp4', 'track-demo.wav', 'old-stuff.zip', 'build.ps1', 'tool.exe',
    ],
    Documents: [
      'Thesis_draft.docx', 'Bank_statement.pdf', 'recipes.md', 'scan_001.jpg', 'scan_002.jpg',
      'meeting.m4a', 'archive-2025.zip', 'data.csv',
    ],
  };
  const HOME = 'C:\\Users\\Kingpin\\';
  const CUSTOM = 'D:\\Projects\\Inbox';
  SEED.Inbox = ['mockup.png', 'brief.pdf', 'demo.mp4', 'theme.css', 'assets.zip', 'icon.svg'];

  const folders = {};
  for (const k of Object.keys(SEED)) folders[k] = SEED[k].slice();
  let current = null;          // key into folders
  let lastMove = null;         // { key, moves: [{ name, cat }] } for undo
  let pending = null;          // queued organize run for the SSE stand-in

  const ext = (n) => n.split('.').pop().toLowerCase();
  const catOf = (n) => Object.keys(CATEGORIES).find((c) => CATEGORIES[c].ext.includes(ext(n))) || null;
  const pathOf = (k) => (k === 'Inbox' ? CUSTOM : HOME + k);

  function group(enabled) {
    const out = {};
    for (const f of folders[current] || []) {
      const c = catOf(f);
      if (c && enabled.has(c)) (out[c] = out[c] || []).push(f);
    }
    return out;
  }

  const json = (data) => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

  async function api(path, body) {
    const url = new URL(path, location.href);
    const p = url.pathname.replace(/^.*\/api\//, '/api/');
    await new Promise((r) => setTimeout(r, p === '/api/preview' ? 260 : 60));

    if (p === '/api/categories') {
      const out = {};
      for (const [k, v] of Object.entries(CATEGORIES)) out[k] = { icon: v.icon, color: v.color, preview: v.preview };
      return json(out);
    }
    if (p === '/api/folder/home') { current = body.name; return json({ ok: true, path: pathOf(current) }); }
    if (p === '/api/folder/browse') { current = 'Inbox'; return json({ ok: true, path: CUSTOM }); }
    if (p === '/api/folder/open') return json({ ok: true });
    if (p === '/api/window/theme') return json({ ok: true });
    if (p === '/api/preview') {
      const enabled = new Set((url.searchParams.get('enabled') || '').split(','));
      const g = group(enabled);
      let total = 0;
      const groups = Object.entries(g).map(([cat, list]) => {
        total += list.length;
        const info = CATEGORIES[cat];
        return { cat, icon: info.icon, color: info.color, count: list.length, files: list.slice(0, 10), more: Math.max(0, list.length - 10) };
      });
      return json({ ok: true, groups, total });
    }
    if (p === '/api/organize') {
      if (!current) return json({ ok: false, error: 'No folder selected' });
      const g = group(new Set(body.enabled || []));
      const moves = [];
      for (const [cat, list] of Object.entries(g)) for (const name of list) moves.push({ name, cat });
      pending = moves;
      return json({ ok: true });
    }
    if (p === '/api/undo') {
      if (!lastMove) return json({ ok: false, error: 'Nothing to undo' });
      folders[lastMove.key].push(...lastMove.moves.map((m) => m.name));
      const n = lastMove.moves.length;
      lastMove = null;
      return json({ ok: true, restored: n, can_undo: false });
    }
    return json({ ok: false, error: 'Unknown endpoint' });
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const u = typeof input === 'string' ? input : input.url;
    if (!/\/api\//.test(u)) return realFetch(input, init);
    let body = {};
    try { body = init.body ? JSON.parse(init.body) : {}; } catch (e) { /* empty */ }
    return api(u, body);
  };

  // Stand-in for /api/organize/stream: one progress event per file, then done.
  window.EventSource = class {
    constructor() {
      const moves = pending || [];
      pending = null;
      const key = current;
      let i = 0;
      const emit = (ev) => this.onmessage && this.onmessage({ data: JSON.stringify(ev) });
      const tick = () => {
        if (this.closed) return;
        if (i < moves.length) {
          const m = moves[i++];
          folders[key] = folders[key].filter((f) => f !== m.name);
          emit({ type: 'progress', pct: i / moves.length, filename: m.name, category: m.cat, icon: CATEGORIES[m.cat].icon });
          setTimeout(tick, 70);
        } else {
          if (moves.length) lastMove = { key, moves };
          emit({ type: 'done', moved: moves.length, can_undo: moves.length > 0 });
        }
      };
      setTimeout(tick, 150);
    }
    close() { this.closed = true; }
  };

  // No service worker or install prompt inside the demo.
  try { navigator.serviceWorker.register = () => Promise.resolve(); } catch (e) { /* empty */ }

  // Electron look: the app runs with .electron-app and Windows draws min/max/close in a
  // 44px overlay (#f2f2f7 / #1c1c1e). Draw those here, and recolour them on theme change.
  const OVERLAY = { light: ['#f2f2f7', '#1c1c1e'], dark: ['#1c1c1e', '#f5f5f7'] };
  let caption;
  function paintCaption(dark) {
    const [bg, fg] = OVERLAY[dark ? 'dark' : 'light'];
    caption.style.background = bg;
    caption.style.color = fg;
  }
  window.electronAPI = { setOverlay: (dark) => { paintCaption(dark); return Promise.resolve(); } };
  document.documentElement.classList.add('electron-app');
  document.addEventListener('DOMContentLoaded', () => {
    const st = document.createElement('style');
    st.textContent = `
      .electron-app .titlebar { width: calc(100% - 138px); }
      /* Preview groups squeeze to a sliver once the log overflows (flex-shrink); keep them whole. */
      .preview-group { flex-shrink: 0; }
      .kpd-caption { position: fixed; top: 0; right: 0; z-index: 10000; display: flex; height: 44px; }
      .kpd-caption span { width: 46px; display: grid; place-items: center; }
      .kpd-caption span:hover { background: rgba(128,128,128,.18); }
      .kpd-caption span:last-child:hover { background: #c42b1c; color: #fff; }
      .kpd-caption svg { width: 10px; height: 10px; }`;
    document.head.appendChild(st);
    caption = document.createElement('div');
    caption.className = 'kpd-caption';
    caption.innerHTML =
      '<span><svg viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor"/></svg></span>' +
      '<span><svg viewBox="0 0 10 10"><rect x=".5" y=".5" width="9" height="9" fill="none" stroke="currentColor"/></svg></span>' +
      '<span><svg viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor"/></svg></span>';
    document.body.appendChild(caption);
    paintCaption(document.documentElement.dataset.theme === 'dark');
  });
})();
