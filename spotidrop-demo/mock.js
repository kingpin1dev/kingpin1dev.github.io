/* kingpindev.com demo: stands in for SpotiDrop's Electron preload (window.api) so the real,
   unmodified renderer runs in the browser. Nothing is downloaded: the album, the sources and the
   progress are made up, and "files" only appear in the Library list. */
(function () {
  "use strict";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const subs = { event: [], done: [], error: [], lib: [], update: [], setup: [] };
  const on = (k) => (cb) => { subs[k].push(cb); return () => { subs[k] = subs[k].filter((x) => x !== cb); }; };
  const emit = (k, v) => subs[k].slice().forEach((cb) => cb(v));

  // Cover art: gradients with a simple mark, as data URIs.
  const cover = (a, b, mark) => "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="120" height="120" fill="url(#g)"/>${mark}</svg>`);
  const ALBUM_COVER = cover("#ff5f6d", "#3a1c71", '<circle cx="60" cy="64" r="26" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="5"/><path d="M20 92 L60 38 L100 92Z" fill="#fff" fill-opacity=".18"/>');
  const COVER_B = cover("#11998e", "#38ef7d", '<rect x="30" y="30" width="60" height="60" rx="12" fill="#fff" fill-opacity=".25"/>');
  const COVER_C = cover("#f7971e", "#ffd200", '<circle cx="60" cy="60" r="30" fill="#fff" fill-opacity=".3"/>');
  const COVER_D = cover("#4568dc", "#b06ab3", '<path d="M25 80 Q60 20 95 80Z" fill="#fff" fill-opacity=".3"/>');

  const ARTIST = "Lalune";
  const TRACKS = [["Midnight Drive", 184], ["Skyline", 221], ["Lumen Harbor", 152], ["Late Night", 252], ["Paper Satellites", 197], ["Afterglow", 233]]
    .map(([title, d], i) => ({ id: "t" + (i + 1), title, artist: ARTIST, album: "Neon Coast", cover: ALBUM_COVER, releaseDate: "2025-08-22", durationSec: d, trackNumber: i + 1 }));
  const ALBUM = { kind: "album", id: "demo-album", title: "Neon Coast", subtitle: ARTIST + " · 2025", cover: ALBUM_COVER, total: TRACKS.length, tracks: TRACKS };
  const ALBUM_URL = "https://open.spotify.com/album/5kNeonCoastDemo";

  const settings = { libraryDir: "C:\\Users\\you\\AppData\\Roaming\\Spotify\\Local Files", audioFormat: "mp3", audioQuality: "0", embedThumbnail: true, noPlaylist: false, checkUpdates: true };
  const DAY = 86400000;
  const library = [
    { name: "Daft Punk - Instant Crush.mp3", path: "C:\\demo\\Daft Punk - Instant Crush.mp3", size: 8420000, mtime: Date.now() - 3 * DAY },
    { name: "Tycho - Awake.mp3", path: "C:\\demo\\Tycho - Awake.mp3", size: 9610000, mtime: Date.now() - 6 * DAY },
  ];

  const YT = (id, title, up, d, th) => ({ id, title, uploader: up, thumbnail: th, duration: d, webpage_url: "https://www.youtube.com/watch?v=" + id });

  const api = {
    minimize: async () => {}, maximize: async () => {}, close: async () => {},
    getSettings: async () => ({ ...settings }),
    saveSettings: async (p) => Object.assign(settings, p) && { ...settings },
    pickFolder: async () => settings.libraryDir,
    readClipboard: async () => ALBUM_URL,
    engineStatus: async () => ({ ytdlp: true, ffmpeg: true, ytdlpVersion: "2025.09.26" }),
    engineSetup: async () => ({ ok: true }),
    updateEngine: async () => ({ ok: true, version: "2025.09.26", changed: false }),
    onSetupProgress: on("setup"),

    probe: async (url) => { await sleep(500); return [YT("dQw4demo01", "Lalune - Midnight Drive (Official Audio)", ARTIST, 184, COVER_B)]; },
    search: async (q) => {
      await sleep(600);
      const t = (q || "").trim() || "Instant Crush";
      return [YT("s1", t + " (Official Audio)", "Topic", 214, COVER_B), YT("s2", t + " - Live Session", "Radio Sessions", 238, COVER_C), YT("s3", t + " (Lyrics)", "Lyric Lab", 214, COVER_D), YT("s4", t + " - Extended Mix", "Night Archive", 402, ALBUM_COVER)];
    },
    startDownload: async (jobId, url, opts) => {
      const item = (opts && opts.item) || {};
      const name = ((item.uploader && item.uploader !== "Topic" ? item.uploader + " - " : "") + (item.title || "Track")).replace(/[\\/:*?"<>|]/g, "") + ".mp3";
      let p = 0;
      const total = 2200 + Math.random() * 1200, step = 120;
      for (let t = 0; t < total; t += step) {
        await sleep(step);
        p = Math.min(99, Math.round((t / total) * 100));
        emit("event", { type: "progress", jobId, percent: p, speed: (1.4 + Math.random() * 2).toFixed(1) + "MiB/s", eta: "00:0" + Math.max(0, Math.ceil((total - t) / 1000)) });
      }
      emit("event", { type: "phase", jobId, phase: "Converting to MP3…" });
      await sleep(700);
      emit("event", { type: "phase", jobId, phase: "Tagging cover art…" });
      await sleep(500);
      const path = settings.libraryDir + "\\" + name;
      emit("event", { type: "file", jobId, path });
      library.unshift({ name, path, size: 7200000 + Math.floor(Math.random() * 3000000), mtime: Date.now() });
      emit("done", { jobId, files: [path] });
      emit("lib");
    },
    cancelDownload: async () => {},
    onDownloadEvent: on("event"), onDownloadDone: on("done"), onDownloadError: on("error"),

    resolveSpotify: async (url) => { await sleep(700); if (!/spotify/i.test(url)) throw new Error("That does not look like a Spotify link."); return JSON.parse(JSON.stringify(ALBUM)); },
    pickAudioFile: async () => null,
    importSpotifyTrack: async () => ({ path: settings.libraryDir + "\\imported.mp3" }),
    matchSpotifyFolder: async (dir, tracks) => ({ matched: [], unmatchedTracks: tracks.map((t) => t.id) }),
    spotifySource: async (track) => { await sleep(250); return { url: "https://www.youtube.com/watch?v=" + track.id + "demo", source: "YouTube" }; },

    listLibrary: async () => library.slice(),
    onLibraryChanged: on("lib"),
    openLibrary: async () => true, revealFile: async () => true,
    deleteTrack: async (p) => { const i = library.findIndex((f) => f.path === p); if (i >= 0) library.splice(i, 1); emit("lib"); return true; },
    importFiles: async () => 0,

    spotifyStatus: async () => true,
    launchSpotify: async () => true,

    appVersion: async () => "0.6.0",
    checkForUpdate: async () => ({ ok: true, current: "0.6.0", available: false, info: null }),
    pendingUpdate: async () => null,
    openUpdate: async () => true,
    onUpdateAvailable: on("update"),
  };
  window.api = api;
})();
