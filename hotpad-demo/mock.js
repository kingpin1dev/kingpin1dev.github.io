/* kingpindev.com demo: stands in for Hotpad's WebView2 host (window.chrome.webview) so the real, unmodified
   React interface runs in the browser. Nothing is captured or saved: the keyboard, the apps and the macros are made up.
   ?lang=tr starts the interface in Turkish (the app stores the language in its settings; here it comes from the page). */
(function () {
  "use strict";
  var q = new URLSearchParams(location.search), lang = q.get("lang") === "tr" ? "tr" : "en";
  var listeners = [];
  var emit = function (data) { setTimeout(function () { listeners.slice().forEach(function (cb) { cb({ data: data }); }); }, 0); };
  var seq = function (steps) { return steps.map(function (s) { return { action: s[0], target: s[1] }; }); };

  var T = lang === "tr" ? {
    daily: "Günlük", stream: "Yayın", game: "Oyun", notes: "Not defteri",
    calc: "Hesap makinesi", mail: "E-postamı yaz", copy: "Kopyala", paste: "Yapıştır", mute: "Mikrofon aç / kapat", scene: "Sahne: Oyun", rec: "Kaydı başlat / durdur",
    ping: "Takım pingi", combo: "Combo", chat: "Hızlı sohbet", discord: "Discord", hello: "Merhaba! Müsait olunca döneceğim.",
    mailText: "ben@ornek.com", cap: "Ekran alıntısı", lock: "Ekranı kilitle", music: "Müzik: sonraki parça"
  } : {
    daily: "Everyday", stream: "Streaming", game: "Gaming", notes: "Notes",
    calc: "Calculator", mail: "Type my email", copy: "Copy", paste: "Paste", mute: "Mute / unmute mic", scene: "Scene: Gaming", rec: "Start / stop recording",
    ping: "Team ping", combo: "Combo", chat: "Quick chat", discord: "Discord", hello: "Hi! I'll get back to you in a moment.",
    mailText: "me@example.com", cap: "Screen snip", lock: "Lock the screen", music: "Music: next track"
  };

  var config = {
    language: lang, showKeyboard: true,
    macroDeviceHardwareId: "HID\\VID_C0F4&PID_0201&MI_00",
    activeProfile: T.daily, profileSwitchKey: { scanCode: 41, e0: false },
    profiles: [
      { name: T.daily, bindings: [
        { scanCode: 59, e0: false, action: "launch", target: "calc.exe", comment: T.calc },
        { scanCode: 60, e0: false, action: "launch", target: "discord.exe", comment: T.discord },
        { scanCode: 16, e0: false, action: "text", target: T.mailText, comment: T.mail },
        { scanCode: 17, e0: false, action: "text", target: T.hello, comment: null },
        { scanCode: 46, e0: false, action: "hotkey", target: "ctrl+c", comment: T.copy },
        { scanCode: 47, e0: false, action: "hotkey", target: "ctrl+v", comment: T.paste },
        { scanCode: 45, e0: false, action: "hotkey", target: "win+shift+s", comment: T.cap },
        { scanCode: 30, e0: false, action: "hotkey", target: "win+l", comment: T.lock },
        { scanCode: 31, e0: false, action: "hotkey", target: "ctrl+alt+right", comment: T.music }
      ] },
      { name: T.stream, bindings: [
        { scanCode: 59, e0: false, action: "microphone", target: "toggle", comment: T.mute },
        { scanCode: 60, e0: false, action: "hotkey", target: "ctrl+shift+1", comment: T.scene },
        { scanCode: 61, e0: false, action: "hotkey", target: "ctrl+shift+r", comment: T.rec },
        { scanCode: 16, e0: false, action: "launch", target: "obs64.exe", comment: null }
      ] },
      { name: T.game, bindings: [
        { scanCode: 57, e0: false, action: "sequence", target: "", comment: T.combo, steps: seq([["hotkey", "q"], ["delay", "60"], ["hotkey", "w"], ["delay", "60"], ["hotkey", "e"]]) },
        { scanCode: 16, e0: false, action: "hotkey", target: "f13", comment: T.ping },
        { scanCode: 17, e0: false, action: "sequence", target: "", comment: T.chat, steps: seq([["hotkey", "enter"], ["text", "gg wp"], ["hotkey", "enter"]]) },
        { scanCode: 59, e0: false, action: "microphone", target: "mute", comment: null }
      ] }
    ]
  };

  var apps = ["Calculator", "Discord", "Google Chrome", "Notepad", "OBS Studio", "Paint", "Spotify", "Steam", "Visual Studio Code"].map(function (n) {
    return { name: n, target: "shell:AppsFolder\\demo-" + n.toLowerCase().replace(/[^a-z]/g, "") };
  });
  if (lang === "tr") apps[0].name = "Hesap Makinesi", apps[3].name = "Not Defteri", apps[5].name = "Paint";
  config.profiles.forEach(function (p) { p.bindings.forEach(function (b) { if (b.action === "launch") { var a = apps.filter(function (x) { return x.target === b.target; })[0]; if (a) { b.comment = b.comment || a.name; } } }); });

  var spare = [[18, "E"], [19, "R"], [20, "T"], [32, "D"], [33, "F"], [34, "G"], [44, "Z"], [48, "B"], [62, "F4"], [63, "F5"]], nextKey = 0;
  var reply = function (m, extra) { var r = { type: m.type, requestId: m.requestId }; for (var k in extra) r[k] = extra[k]; emit(r); };

  var host = {
    addEventListener: function (type, cb) { if (type === "message") listeners.push(cb); },
    removeEventListener: function (type, cb) { listeners = listeners.filter(function (x) { return x !== cb; }); },
    postMessage: function (m) {
      if (!m || !m.type) return;
      if (m.type === "ready") return emit({ type: "init", deviceReady: true, autoStart: false, config: JSON.parse(JSON.stringify(config)) });
      if (m.type === "listApplications") return setTimeout(function () { reply(m, { apps: apps }); }, 350);
      if (m.type === "captureKey") { var k = spare[nextKey++ % spare.length]; return setTimeout(function () { reply(m, { scanCode: k[0], e0: false, label: k[1] }); }, 900); }
      if (m.type === "learnDevice") return setTimeout(function () { reply(m, { hardwareId: config.macroDeviceHardwareId, deviceReady: true }); }, 900);
      if (m.type === "setAutoStart") return reply(m, { enabled: !!m.enabled });
      if (m.type === "exportConfig") return reply(m, { exported: true });
      if (m.type === "browseFile") return reply(m, { path: "C:\\Tools\\notes.txt" });
      if (m.type === "save") { if (m.config) config = m.config; return reply(m, { ok: true }); }
      if (m.requestId) reply(m, {});
    }
  };
  window.chrome = window.chrome || {};
  window.chrome.webview = host;
})();
