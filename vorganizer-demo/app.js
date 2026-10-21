/* ── File Organizer — Frontend ─────────────────────────────────────────── */

'use strict';

let selectedFolder    = null;
let isOrganizing      = false;
let canUndo           = false;
let categoryChecked   = {};
let organizeBtnHTML   = null;
let deferredInstall   = null;   // captured beforeinstallprompt event

/* ── Service Worker + PWA install prompt (must run before DOMContentLoaded) */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.hidden = false;
});

window.addEventListener('appinstalled', () => {
  deferredInstall = null;
  const btn = document.getElementById('installBtn');
  if (btn) btn.hidden = true;
  logInfo('✅ App installed! Close and reopen to get a title-bar-free window.');
});

/* ── Boot ───────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {
  organizeBtnHTML = document.getElementById('organizeBtn').innerHTML;

  const cats = await get('/api/categories');
  buildCategoryGrid(cats);
  bindEvents();
  logInfo('Ready — select a folder, then press Organize Now.');
});

/* ── HTTP helpers ───────────────────────────────────────────────────────── */

async function get(url) {
  const r = await fetch(url);
  return r.json();
}

async function post(url, body = {}) {
  const r = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  return r.json();
}

/* ── Category grid ──────────────────────────────────────────────────────── */

function buildCategoryGrid(cats) {
  const grid = document.getElementById('catGrid');
  grid.innerHTML = '';

  for (const [name, info] of Object.entries(cats)) {
    categoryChecked[name] = true;

    const tile = document.createElement('div');
    tile.className   = 'cat-tile checked';
    tile.dataset.cat = name;
    tile.style.setProperty('--tile-color', info.color);
    tile.tabIndex = 0;
    tile.setAttribute('role', 'checkbox');
    tile.setAttribute('aria-checked', 'true');

    tile.innerHTML = `
      <div class="tile-top">
        <span class="tile-icon">${info.icon}</span>
        <span class="tile-name">${name}</span>
        <span class="tile-check">
          <svg class="tile-check-mark" viewBox="0 0 10 10" fill="none"
               stroke="white" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 5l2 2.5L8 3"/>
          </svg>
        </span>
      </div>
      <span class="tile-exts">${info.preview || ''}</span>
    `;

    tile.addEventListener('click', () => toggleTile(tile, name));
    tile.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleTile(tile, name); }
    });

    grid.appendChild(tile);
  }
}

function toggleTile(tile, name) {
  categoryChecked[name] = !categoryChecked[name];
  tile.classList.toggle('checked', categoryChecked[name]);
  tile.setAttribute('aria-checked', categoryChecked[name]);
  syncSelectAll();
}

function syncSelectAll() {
  const vals = Object.values(categoryChecked);
  const cb   = document.getElementById('selectAll');
  cb.indeterminate = !vals.every(Boolean) && vals.some(Boolean);
  cb.checked       = vals.every(Boolean);
}

/* ── Events ─────────────────────────────────────────────────────────────── */

function bindEvents() {
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('installBtn').addEventListener('click', triggerInstall);

  document.querySelectorAll('.shortcut-btn[data-name]').forEach(btn =>
    btn.addEventListener('click', () => selectHomeFolder(btn.dataset.name))
  );
  document.getElementById('browseBtn').addEventListener('click', browseFolder);
  document.getElementById('fdOpen').addEventListener('click',    openInExplorer);

  document.getElementById('selectAll').addEventListener('change', e => {
    const on = e.target.checked;
    document.querySelectorAll('.cat-tile').forEach(tile => {
      categoryChecked[tile.dataset.cat] = on;
      tile.classList.toggle('checked', on);
      tile.setAttribute('aria-checked', on);
    });
  });

  document.getElementById('previewBtn').addEventListener('click',  doPreview);
  document.getElementById('organizeBtn').addEventListener('click', doOrganize);
  document.getElementById('undoBtn').addEventListener('click',     doUndo);
  document.getElementById('clearBtn').addEventListener('click',    clearLog);
}

/* ── PWA Install ────────────────────────────────────────────────────────── */

async function triggerInstall() {
  if (!deferredInstall) return;
  deferredInstall.prompt();
  const { outcome } = await deferredInstall.userChoice;
  if (outcome === 'accepted') {
    deferredInstall = null;
    document.getElementById('installBtn').hidden = true;
  }
}

/* ── Theme ──────────────────────────────────────────────────────────────── */

function toggleTheme() {
  const html    = document.documentElement;
  const isDark  = html.dataset.theme === 'dark';
  const nowDark = !isDark;
  html.dataset.theme = nowDark ? 'dark' : 'light';

  // Native title-bar sync: Electron overlay or Win32 DWM
  if (window.electronAPI) {
    window.electronAPI.setOverlay(nowDark);
  } else {
    post('/api/window/theme', { dark: nowDark });
  }

  document.getElementById('themeIcon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('themeLabel').textContent = isDark ? 'Dark' : 'Light';

  document.getElementById('themeIcon').animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.4) rotate(-20deg)' }, { transform: 'scale(1) rotate(0)' }],
    { duration: 350, easing: 'cubic-bezier(0.34,1.56,0.64,1)' }
  );
}

/* ── Folder selection ───────────────────────────────────────────────────── */

async function selectHomeFolder(name) {
  const res = await post('/api/folder/home', { name });
  if (res.ok) applyFolder(res.path);
  else        logError(`Could not find ${name}: ${res.error}`);
}

async function browseFolder() {
  const res = await post('/api/folder/browse');
  if (res.ok) applyFolder(res.path);
}

async function openInExplorer() {
  await post('/api/folder/open');
}

function applyFolder(path) {
  selectedFolder = path;

  const display = document.getElementById('fdPath');
  display.textContent = path;
  display.classList.add('active');
  document.getElementById('fdOpen').hidden = false;

  // Pulse highlight on folder card
  document.getElementById('folderCard').animate(
    [{ outline: '3px solid rgba(0,122,255,0.4)' }, { outline: '3px solid rgba(0,122,255,0)' }],
    { duration: 600, easing: 'ease-out' }
  );

  logInfo(`Folder: ${path}`);
}

/* ── Preview ────────────────────────────────────────────────────────────── */

async function doPreview() {
  if (!selectedFolder) { pulse(document.getElementById('folderCard')); return; }

  clearLog();
  logInfo('Scanning…');

  const enabled = enabledCategories().join(',');
  const res     = await get(`/api/preview?enabled=${encodeURIComponent(enabled)}`);

  clearLog();
  if (!res.ok)         { logError(res.error || 'Preview failed'); return; }
  if (!res.groups.length) { logInfo('No files found in this folder.'); return; }

  logInfo(`Found ${res.total} file${res.total !== 1 ? 's' : ''} to organize:`);
  res.groups.forEach(appendPreviewGroup);
  logInfo('Press Organize Now to move the files.');
}

function appendPreviewGroup(group) {
  const body = document.getElementById('logBody');
  const wrap = document.createElement('div');
  wrap.className = 'preview-group';

  const header = document.createElement('div');
  header.className = 'preview-group-header';
  header.style.setProperty('--ph-color', group.color || '#888');
  header.innerHTML = `
    <span class="ph-icon">${group.icon}</span>
    <span>${escHtml(group.cat)}</span>
    <span class="ph-count">${group.count} file${group.count !== 1 ? 's' : ''}</span>
  `;

  const files = document.createElement('div');
  files.className = 'preview-group-files';
  group.files.forEach(name => {
    const el = document.createElement('div');
    el.className   = 'preview-file';
    el.textContent = name;
    files.appendChild(el);
  });
  if (group.more > 0) {
    const more = document.createElement('div');
    more.className   = 'preview-more';
    more.textContent = `… and ${group.more} more`;
    files.appendChild(more);
  }

  let open = true;
  header.addEventListener('click', () => {
    open = !open;
    files.style.display  = open ? '' : 'none';
    header.style.opacity = open ? '' : '0.65';
  });

  wrap.appendChild(header);
  wrap.appendChild(files);
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

/* ── Organize ───────────────────────────────────────────────────────────── */

async function doOrganize() {
  if (!selectedFolder)      { pulse(document.getElementById('folderCard')); return; }
  if (isOrganizing)         return;
  const enabled = enabledCategories();
  if (!enabled.length)      { pulse(document.getElementById('categoriesCard')); return; }

  clearLog();
  setOrganizing(true);

  // 1 — tell backend to start
  const res = await post('/api/organize', { enabled });
  if (!res.ok) { logError(res.error || 'Failed to start'); setOrganizing(false); return; }

  // 2 — stream progress via SSE
  const evtSrc = new EventSource('/api/organize/stream');

  evtSrc.onmessage = e => {
    const ev = JSON.parse(e.data);

    if (ev.type === 'progress') {
      updateProgress(ev.pct, ev.filename, ev.category, ev.icon);

    } else if (ev.type === 'error') {
      logError(ev.msg);

    } else if (ev.type === 'done') {
      evtSrc.close();
      finishOrganize(ev.moved, ev.can_undo);
    }
  };

  evtSrc.onerror = () => {
    evtSrc.close();
    setOrganizing(false);
    logError('Connection to server lost.');
  };
}

function updateProgress(pct, filename, category, icon) {
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  fill.style.width  = `${Math.round(pct * 100)}%`;
  label.textContent = `Moving files… ${Math.round(pct * 100)}%`;

  const body = document.getElementById('logBody');
  const row  = document.createElement('div');
  row.className = 'log-entry';
  row.innerHTML = `
    <span class="log-icon">${icon}</span>
    <span class="log-text">${escHtml(filename)}</span>
    <span class="log-cat">→ ${escHtml(category)}/</span>
  `;
  body.appendChild(row);
  // Only auto-scroll if already near bottom
  if (body.scrollHeight - body.scrollTop < body.clientHeight + 80) {
    body.scrollTop = body.scrollHeight;
  }
}

function finishOrganize(moved, canUndoNow) {
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  fill.style.width = '100%';
  fill.classList.add('done');
  label.textContent = `Done! ${moved} file${moved !== 1 ? 's' : ''} organized.`;

  canUndo = canUndoNow;
  document.getElementById('undoBtn').disabled = !canUndo;

  setOrganizing(false);
  logDone(`✨  ${moved} file${moved !== 1 ? 's' : ''} organized successfully.`);

  // Momentary "Done!" label, then restore the original button markup
  const btn = document.getElementById('organizeBtn');
  btn.innerHTML = '✓  Done!';
  setTimeout(() => { btn.innerHTML = organizeBtnHTML; }, 2200);
}

/* ── Undo ───────────────────────────────────────────────────────────────── */

async function doUndo() {
  if (!canUndo) return;
  document.getElementById('undoBtn').disabled = true;

  const res = await post('/api/undo');
  if (res.ok) {
    logUndo(`↩  Restored ${res.restored} file${res.restored !== 1 ? 's' : ''}.`);
    canUndo = res.can_undo;
    document.getElementById('undoBtn').disabled = !canUndo;

    // Reset progress bar
    const fill = document.getElementById('progressFill');
    fill.style.width = '0%';
    fill.classList.remove('done');
    document.getElementById('progressLabel').textContent = '';
  } else {
    logError(res.error || 'Undo failed');
    document.getElementById('undoBtn').disabled = false;
  }
}

/* ── Log helpers ────────────────────────────────────────────────────────── */

function addLogRow(type, icon, text) {
  const body = document.getElementById('logBody');
  const row  = document.createElement('div');
  row.className = `log-entry log-${type}`;
  row.innerHTML = `<span class="log-icon">${icon}</span><span class="log-text">${escHtml(text)}</span>`;
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
}

const logInfo  = t => addLogRow('info',  'ℹ️',  t);
const logError = t => addLogRow('error', '❌', t);
const logDone  = t => addLogRow('done',  '✅', t);
const logUndo  = t => addLogRow('undo',  '↩️', t);
const clearLog = () => { document.getElementById('logBody').innerHTML = ''; };

/* ── UI helpers ─────────────────────────────────────────────────────────── */

function setOrganizing(active) {
  isOrganizing = active;
  document.getElementById('organizeBtn').disabled = active;
  document.getElementById('previewBtn').disabled  = active;
  document.getElementById('progressWrap').hidden  = false;

  const btn = document.getElementById('organizeBtn');
  if (active) {
    btn.innerHTML = `
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"
           style="animation:spin .9s linear infinite">
        <circle cx="10" cy="10" r="7" stroke-dasharray="22 22" stroke-linecap="round"/>
      </svg>
      Organizing…`;
  }
}

// Inject spin keyframe once
document.head.insertAdjacentHTML('beforeend',
  '<style>@keyframes spin{to{transform:rotate(360deg)}}</style>'
);

function enabledCategories() {
  return Object.entries(categoryChecked).filter(([, v]) => v).map(([k]) => k);
}

function pulse(el) {
  el.animate(
    [{ boxShadow: '0 0 0 0   rgba(255,59,48,.5)' },
     { boxShadow: '0 0 0 7px rgba(255,59,48,.0)' }],
    { duration: 500, easing: 'ease-out' }
  );
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
