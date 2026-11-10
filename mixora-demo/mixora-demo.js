/* Mixora live demo for kingpindev.com.
   A working model of the app on a small Windows desktop: the main window (groups, ChatMix, detected
   apps with drag and drop, auto-lowering), the equalizer (draggable parametric curve, preset library,
   tone, preamp, surround, compressor, AI noise cancellation), settings, the tray panel and the hotkey
   OSD. One shared state drives all of it. Colours and layout follow the real app.
   Mount with MixoraDemo.mount(el, { lang: "tr" | "en", logo: "/img/FluentMixer.png" }). */
(function () {
  "use strict";

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
  P.globe = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z";
  P.moon = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z";
  P.refresh = "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16 M8 16H3v5";
  P.maximize = "M8 3H5a2 2 0 0 0-2 2v3 M21 8V5a2 2 0 0 0-2-2h-3 M3 16v3a2 2 0 0 0 2 2h3 M16 21h3a2 2 0 0 0 2-2v-3";
  P.zap = "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";
  P.wave = "M2 10v3 M6 6v11 M10 3v18 M14 8v7 M18 5v13 M22 10v3";
  P.info = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01";
  P.monitor = "M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 21h8 M12 17v4";
  P.keyboard = "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M6 9h.01 M10 9h.01 M14 9h.01 M18 9h.01 M7 15h10";
  P.check = "M20 6 9 17l-5-5";
  P.plus = "M5 12h14 M12 5v14";
  P.back = "M15 18l-6-6 6-6";
  P.trash = "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2";
  P.grid = "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z";
  P.info2 = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01";
  P.gauge = "M12 14l4-4 M3.34 19a10 10 0 1 1 17.32 0";
  P.target = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z";
  P.down2 = "M7 6l5 5 5-5 M7 13l5 5 5-5";
  P.up = "M12 19V5 M5 12l7-7 7 7";
  P.dn = "M12 5v14 M19 12l-7 7-7-7";
  const ic = (name, size, color, sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color || "currentColor"}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name]}"/></svg>`;

  // ── Strings ──────────────────────────────────────────────────────────────
  const T = {
    en: {
      groups: { game: "Game", chat: "Chat", media: "Media", aux: "Aux" }, apps: (n) => `${n} app${n === 1 ? "" : "s"}`,
      appsLbl: "APPS", detected: "DETECTED APPS", search: "Search apps", dragHint: "Drag an app to a group, or click it",
      st: ["Closed", "Idle", "Active"], defOut: "Default output", hp: "Headphones (Arctis Nova 5)", spk: "Speakers (Realtek Audio)",
      chatmix: "ChatMix", groupsBtn: "Groups", profiles: ["Gaming", "Streaming", "Late night"], assign: "Move to group", ducked: "lowered",
      speaking: "Friend speaking in Discord", quiet: "Voice chat quiet", back: "Back", settings: "Settings",
      nav: { general: "General", groups: "Groups", profiles: "Profiles", audio: "Audio", overlay: "Overlay", shortcuts: "Shortcuts", about: "About" },
      eq: "Equalizer", autoProfile: "Auto profile", useEq: "Use the equalizer", profile: "PROFILE", favs: "FAVOURITES", importF: "Import file...", exportF: "Export...", reset: "Reset",
      bands: ["SUB BASS", "BASS", "LOW MIDS", "MID RANGE", "UPPER MIDS", "HIGHS"], selPoint: "SELECTED POINT", back0: "Back to 0 dB", peak: "Peak", lowS: "Low shelf", highS: "High shelf",
      freq: "Frequency", gain: "Gain", tone: "TONE", bass: "Bass", voice: "Voice", treble: "Treble", pre: "PREAMP", processing: "PROCESSING",
      preNote: (d) => `The curve reaches ${d} dB; the limiter holds the peaks, nothing distorts.`, surround: "Virtual surround", comp: "Compressor", ai: "AI noise cancellation",
      tuning: "Tuning", dist: "Distance", drag: "Drag · wheel: width · right-click: flatten", library: "Preset library", libNote: "The app ships with 389 ready profiles. This demo shows a few.",
      libCats: ["Game", "Media", "Voice"], flatName: "Flat", custom: "Custom", close: "Close", search2: "Search presets",
      autoOn: "Switches to the profile of the game you launch", aiNote: "Chat group only",
      duck: "AUTO-LOWERING (DUCKING)", duckT: "Lower other groups while one is active", duckD: "When the trigger group makes sound (a friend speaking in Discord, for example), the groups you choose are turned down, then come back up smoothly.",
      trig: "Trigger group", trigD: "Its sound lowers the others.", listen: "Listen on", listenD: "The output device the trigger group is measured on.", anyDev: "Any device",
      howMuch: "How much to lower", howMuchD: "Share of the volume taken away.", sens: "Sensitivity", sensD: "How loud the trigger group must be before the others are lowered.", sensO: ["High", "Medium", "Low"],
      toLower: "Groups to lower", toLowerD: "Click a group to include or leave it out.", meters: "LEVEL METERS", metersT: "Show level meters", metersD: "A thin live bar under each group's volume that moves with the sound.",
      balance: "Headphone balance", balanceD: "Moves the sound toward the left or right ear. Applies to every app, evened out when Mixora closes.", left: "Left", right: "Right", center: "Center",
      gen: [["Start with Windows", "Mixora starts quietly in the tray when you sign in."], ["Start minimized", "Skip the main window on startup."], ["Close to tray", "The close button hides the window instead of quitting."], ["Assign new apps automatically", "New apps join the group you used last."], ["Reset volumes on exit", "Every app goes back to 100 % when Mixora quits."]],
      language: "Language", appearance: "Tray panel theme", themes: ["System", "Dark", "Light"],
      profTitle: "Profiles", profD: "A profile stores group volumes, ChatMix and assignments.", apply: "Apply", active: "Active", saveNew: "Save current as new profile", autoUpd: "Update the active profile automatically", newProf: "My profile",
      ovTitle: "On-screen display", ovD: "Where the volume pop-up appears after a hotkey.", pos: "Position", size: "Size", dur: "Duration", test: "Show a test", small: "Small", med: "Medium", large: "Large",
      keys: [["Group volume up", "Ctrl + Alt + ↑"], ["Group volume down", "Ctrl + Alt + ↓"], ["Mute the group", "Ctrl + Alt + M"], ["Assign the app in front", "Ctrl + Alt + A"], ["ChatMix toward Game", "Ctrl + Alt + ←"], ["ChatMix toward Chat", "Ctrl + Alt + →"], ["Mute the microphone", "Ctrl + Alt + N"], ["Next profile", "Ctrl + Alt + P"], ["Open Mixora", "Ctrl + Alt + O"]],
      shortD: "Global shortcuts work in any app, including full-screen games.",
      aboutD: "Mixora groups your apps and controls them together: volume, mute, equalizer and ducking, with no virtual driver.", ver: "Version", store: "Microsoft Store",
      open: "Open Mixora", exit: "Exit", hkVol: "Game +5", hkVolD: "Game −5", hkMute: "Mute game", hotkeys: "Hotkeys", muted: "Muted", tipTray: "Mixora in the tray",
      tutorial: "Click the tray icon, or press a hotkey. Everything here works.", groupNames: ["Game", "Chat", "Media", "Aux"], noEq: "Equalizer is off for this group",
    },
    tr: {
      groups: { game: "Oyun", chat: "Sohbet", media: "Medya", aux: "Aux" }, apps: (n) => `${n} uygulama`,
      appsLbl: "UYGULAMALAR", detected: "ALGILANAN UYGULAMALAR", search: "Uygulama ara", dragHint: "Bir uygulamayı gruba sürükleyin ya da tıklayın",
      st: ["Kapalı", "Boşta", "Etkin"], defOut: "Varsayılan çıkış", hp: "Kulaklık (Arctis Nova 5)", spk: "Hoparlörler (Realtek Audio)",
      chatmix: "ChatMix", groupsBtn: "Gruplar", profiles: ["Oyun", "Yayın", "Gece"], assign: "Gruba taşı", ducked: "kısıldı",
      speaking: "Discord'da arkadaşın konuşuyor", quiet: "Sesli sohbet sessiz", back: "Geri", settings: "Ayarlar",
      nav: { general: "Genel", groups: "Gruplar", profiles: "Profiller", audio: "Ses", overlay: "Gösterge", shortcuts: "Kısayollar", about: "Hakkında" },
      eq: "Ekolayzır", autoProfile: "Otomatik profil", useEq: "Ekolayzırı kullan", profile: "PROFİL", favs: "FAVORİLER", importF: "Dosya içe aktar...", exportF: "Dışa aktar...", reset: "Sıfırla",
      bands: ["ALT BAS", "BAS", "ALT ORTA", "ORTA", "ÜST ORTA", "TİZ"], selPoint: "SEÇİLİ NOKTA", back0: "0 dB'ye dön", peak: "Tepe", lowS: "Alçak raf", highS: "Yüksek raf",
      freq: "Frekans", gain: "Kazanç", tone: "TON", bass: "Bas", voice: "Ses", treble: "Tiz", pre: "ÖN KAZANÇ", processing: "İŞLEME",
      preNote: (d) => `Eğri ${d} dB'ye çıkıyor; sınırlayıcı tepeleri tutar, hiçbir şey bozulmaz.`, surround: "Sanal surround", comp: "Kompresör", ai: "Yapay zekâ gürültü azaltma",
      tuning: "Ayar", dist: "Mesafe", drag: "Sürükle · tekerlek: genişlik · sağ tık: düzleştir", library: "Profil kitaplığı", libNote: "Uygulamada 389 hazır profil var. Bu demoda birkaçı gösteriliyor.",
      libCats: ["Oyun", "Medya", "Ses"], flatName: "Düz", custom: "Özel", close: "Kapat", search2: "Profil ara",
      autoOn: "Açtığın oyunun profiline kendiliğinden geçer", aiNote: "Yalnızca Sohbet grubu",
      duck: "OTOMATİK KISMA (DUCKING)", duckT: "Biri etkinken diğer grupları kıs", duckD: "Tetikleyici grup ses çıkarınca (Discord'da arkadaşının konuşması gibi) seçtiğin gruplar kısılır, sonra yumuşakça geri gelir.",
      trig: "Tetikleyici grup", trigD: "Sesi diğerlerini kısar.", listen: "Dinlenecek cihaz", listenD: "Tetikleyici grubun ölçüldüğü çıkış cihazı.", anyDev: "Herhangi bir cihaz",
      howMuch: "Ne kadar kısılsın", howMuchD: "Sesten alınan pay.", sens: "Hassasiyet", sensD: "Diğerleri kısılmadan önce tetikleyicinin ne kadar yüksek olması gerektiği.", sensO: ["Yüksek", "Orta", "Düşük"],
      toLower: "Kısılacak gruplar", toLowerD: "Bir gruba tıklayarak ekle ya da çıkar.", meters: "SEVİYE GÖSTERGELERİ", metersT: "Seviye göstergelerini göster", metersD: "Her grubun ses çubuğunun altında sesle hareket eden ince bir çubuk.",
      balance: "Kulaklık dengesi", balanceD: "Sesi sol ya da sağ kulağa kaydırır. Her uygulamaya uygulanır, Mixora kapanınca eşitlenir.", left: "Sol", right: "Sağ", center: "Orta",
      gen: [["Windows ile başlat", "Oturum açınca Mixora sessizce tepside başlar."], ["Küçültülmüş başlat", "Açılışta ana pencereyi gösterme."], ["Kapatınca tepsiye in", "Kapat düğmesi çıkmak yerine pencereyi gizler."], ["Yeni uygulamaları otomatik ata", "Yeni uygulamalar en son kullandığın gruba girer."], ["Çıkışta sesleri sıfırla", "Mixora kapanınca her uygulama %100'e döner."]],
      language: "Dil", appearance: "Tepsi paneli teması", themes: ["Sistem", "Koyu", "Açık"],
      profTitle: "Profiller", profD: "Bir profil grup seslerini, ChatMix'i ve atamaları saklar.", apply: "Uygula", active: "Etkin", saveNew: "Mevcut durumu yeni profil olarak kaydet", autoUpd: "Etkin profili kendiliğinden güncelle", newProf: "Profilim",
      ovTitle: "Ekran göstergesi", ovD: "Kısayoldan sonra ses penceresinin çıktığı yer.", pos: "Konum", size: "Boyut", dur: "Süre", test: "Deneme göster", small: "Küçük", med: "Orta", large: "Büyük",
      keys: [["Grup sesini artır", "Ctrl + Alt + ↑"], ["Grup sesini azalt", "Ctrl + Alt + ↓"], ["Grubu sessize al", "Ctrl + Alt + M"], ["Öndeki uygulamayı ata", "Ctrl + Alt + A"], ["ChatMix Oyun'a", "Ctrl + Alt + ←"], ["ChatMix Sohbet'e", "Ctrl + Alt + →"], ["Mikrofonu sessize al", "Ctrl + Alt + N"], ["Sonraki profil", "Ctrl + Alt + P"], ["Mixora'yı aç", "Ctrl + Alt + O"]],
      shortD: "Genel kısayollar, tam ekran oyunlar dahil her uygulamada çalışır.",
      aboutD: "Mixora uygulamalarını gruplar ve birlikte yönetir: ses, sessiz, ekolayzır ve kısma, sanal sürücü olmadan.", ver: "Sürüm", store: "Microsoft Store",
      open: "Mixora'yı aç", exit: "Çıkış", hkVol: "Oyun +5", hkVolD: "Oyun −5", hkMute: "Oyunu sustur", hotkeys: "Kısayollar", muted: "Sessiz", tipTray: "Tepsideki Mixora",
      tutorial: "Tepsi simgesine tıkla ya da bir kısayola bas. Buradaki her şey çalışır.", groupNames: ["Oyun", "Sohbet", "Medya", "Aux"], noEq: "Bu grup için ekolayzır kapalı",
    },
  };
  let L = T.en;

  // ── Model ────────────────────────────────────────────────────────────────
  const GROUPS = [
    { id: "game", icon: "gamepad", from: "#ff8a4c", to: "#ff3d71" },
    { id: "chat", icon: "chat", from: "#4cc4ff", to: "#5b8cff" },
    { id: "media", icon: "music", from: "#34e7a6", to: "#22c55e" },
    { id: "aux", icon: "sliders", from: "#b98cff", to: "#8b5cf6" },
  ];
  const G = Object.fromEntries(GROUPS.map((g) => [g.id, g]));
  const gname = (id) => L.groups[id];
  const APPS = [
    { id: "steam", name: "Steam", c: "#1b2838", t: "S", g: "game", st: 1 },
    { id: "valorant", name: "VALORANT", c: "#ff4655", t: "V", g: "game", st: 2 },
    { id: "lol", name: "League of Legends", c: "#c89b3c", t: "L", g: "game", st: 0 },
    { id: "discord", name: "Discord", c: "#5865f2", t: "D", g: "chat", st: 2 },
    { id: "chrome", name: "Google Chrome", c: "#4285f4", t: "C", g: "media", st: 1, trim: 0.7 },
    { id: "spotify", name: "Spotify", c: "#1db954", t: "S", g: "media", st: 2 },
    { id: "obs", name: "OBS Studio", c: "#302e31", t: "O", g: "aux", st: 1 },
    { id: "medal", name: "Medal", c: "#2a2a33", t: "M", g: "aux", st: 0 },
    { id: "nvidia", name: "NVIDIA Broadcast", c: "#76b900", t: "N", g: null, st: 2 },
    { id: "wallpaper", name: "Wallpaper Engine", c: "#2563eb", t: "W", g: null, st: 1 },
  ];
  const PROFILES = [
    { vols: { game: 0.85, chat: 1, media: 0.55, aux: 0.4 }, mix: -0.1 },
    { vols: { game: 0.6, chat: 0.9, media: 0.7, aux: 0.7 }, mix: 0.2 },
    { vols: { game: 0.35, chat: 0.8, media: 0.3, aux: 0.2 }, mix: 0.3 },
  ];
  const BANDS = [[20, 100], [100, 250], [250, 1000], [1000, 2000], [2000, 5000], [5000, 20000]];

  // EQ presets: eight points [freq, gain dB, Q, type]
  const pt = (f, g, q, t) => ({ f, g, q: q || 1, t: t || "peak" });
  const FLAT = () => [pt(50, 0, 0.7, "low"), pt(125, 0), pt(300, 0), pt(700, 0), pt(1500, 0), pt(3200, 0), pt(6500, 0), pt(12000, 0, 0.7, "high")];
  const PRESETS = [
    { id: "valorant", cat: 0, name: "Valorant Pro Preset", pts: [pt(60, -8, 0.7, "low"), pt(110, 6.5, 1.2), pt(250, 3, 1.4), pt(700, -0.5, 1), pt(1500, 0.5), pt(3136, 6, 10), pt(6200, 5, 6), pt(11000, 1.5, 0.7, "high")] },
    { id: "cs2", cat: 0, name: "CS2 Footsteps", pts: [pt(55, -6, 0.7, "low"), pt(130, -2, 1), pt(320, -1, 1), pt(800, 1, 1), pt(1800, 3, 1.4), pt(3500, 5.5, 2.4), pt(7000, 4, 1.6), pt(12000, 2, 0.7, "high")] },
    { id: "lol", cat: 0, name: "League of Legends", pts: [pt(50, 3, 0.7, "low"), pt(120, 2.5, 1), pt(300, -1.5, 1.2), pt(700, -2, 1.2), pt(1500, 0.5, 1), pt(3200, 2.5, 1.4), pt(6500, 3, 1.2), pt(12000, 3.5, 0.7, "high")] },
    { id: "apex", cat: 0, name: "Apex Legends", pts: [pt(50, 2, 0.7, "low"), pt(125, 4, 1), pt(300, 1, 1), pt(700, -2, 1.2), pt(1500, 1, 1), pt(3200, 4, 1.8), pt(6500, 2.5, 1.2), pt(12000, 1, 0.7, "high")] },
    { id: "warzone", cat: 0, name: "Warzone Directional", pts: [pt(50, -4, 0.7, "low"), pt(125, 1, 1), pt(300, 2, 1.4), pt(700, 0, 1), pt(1500, 2.5, 1.6), pt(3200, 5, 2), pt(6500, 3, 1.4), pt(12000, -1, 0.7, "high")] },
    { id: "fortnite", cat: 0, name: "Fortnite Competitive", pts: [pt(50, -5, 0.7, "low"), pt(125, 3, 1.1), pt(300, 0, 1), pt(700, -1, 1), pt(1500, 1, 1), pt(3200, 4.5, 1.7), pt(6500, 4.5, 1.4), pt(12000, 2, 0.7, "high")] },
    { id: "rocket", cat: 0, name: "Rocket League", pts: [pt(50, 4, 0.7, "low"), pt(125, 3, 1), pt(300, -1, 1), pt(700, -1.5, 1), pt(1500, 0, 1), pt(3200, 2, 1.4), pt(6500, 2, 1.2), pt(12000, 2.5, 0.7, "high")] },
    { id: "cinema", cat: 0, name: "Cinematic Single-Player", pts: [pt(50, 5, 0.7, "low"), pt(125, 3, 1), pt(300, 0.5, 1), pt(700, -1, 1), pt(1500, 0, 1), pt(3200, 1, 1.2), pt(6500, 2, 1.2), pt(12000, 3, 0.7, "high")] },
    { id: "bassb", cat: 1, name: "Bass Boost", pts: [pt(50, 7, 0.7, "low"), pt(110, 5, 1), pt(300, 1, 1), pt(700, 0, 1), pt(1500, 0, 1), pt(3200, 0.5, 1), pt(6500, 1, 1), pt(12000, 1.5, 0.7, "high")] },
    { id: "vocal", cat: 1, name: "Vocal Lift", pts: [pt(50, -3, 0.7, "low"), pt(125, -1, 1), pt(300, 0.5, 1), pt(700, 2, 1.2), pt(1500, 3.5, 1.2), pt(3200, 3, 1.2), pt(6500, 1.5, 1.2), pt(12000, 1, 0.7, "high")] },
    { id: "night", cat: 1, name: "Night Mode", pts: [pt(50, -5, 0.7, "low"), pt(125, -2, 1), pt(300, 0, 1), pt(700, 1, 1), pt(1500, 2, 1), pt(3200, 1.5, 1), pt(6500, -1, 1), pt(12000, -3, 0.7, "high")] },
    { id: "bright", cat: 1, name: "Bright and Clear", pts: [pt(50, 0, 0.7, "low"), pt(125, 0, 1), pt(300, -1, 1), pt(700, -1, 1), pt(1500, 1, 1), pt(3200, 3, 1.2), pt(6500, 4, 1.2), pt(12000, 5, 0.7, "high")] },
    { id: "clearvoice", cat: 2, name: "Clear Voice", pts: [pt(80, -9, 0.7, "low"), pt(150, -3, 1), pt(300, -1.5, 1), pt(700, 1, 1), pt(1500, 3, 1.2), pt(3200, 4, 1.3), pt(6500, 1, 1.2), pt(12000, -2, 0.7, "high")] },
    { id: "warm", cat: 2, name: "Warm Voice", pts: [pt(80, -6, 0.7, "low"), pt(150, 2.5, 1), pt(300, 3, 1), pt(700, 1, 1), pt(1500, 0, 1), pt(3200, 1, 1.2), pt(6500, -1, 1.2), pt(12000, -3, 0.7, "high")] },
    { id: "radio", cat: 2, name: "Radio Host", pts: [pt(80, -10, 0.7, "low"), pt(150, 3, 1), pt(300, 2, 1), pt(700, 0, 1), pt(1500, 2, 1), pt(3200, 4, 1.2), pt(6500, 3, 1.2), pt(12000, 1, 0.7, "high")] },
  ];
  const preset = (id) => PRESETS.find((p) => p.id === id);
  const clone = (a) => a.map((p) => ({ ...p }));

  const S = {
    view: "main", page: "audio", winOpen: true, fly: false, flyOpen: { media: true },
    g: { game: { vol: 0.85, mute: false, out: "def" }, chat: { vol: 1, mute: false, out: "def" }, media: { vol: 0.55, mute: false, out: "hp" }, aux: { vol: 0.4, mute: false, out: "def" } },
    mix: -0.1, mic: { vol: 0.8, mute: false }, profile: 0, ovPos: 7, ovSize: 1, ovDur: 1, autoUpd: true, balance: 0.0,
    gen: [true, false, true, true, false], theme: 1, meters: true,
    duck: { on: true, trigger: "chat", amt: 50, sens: 1, targets: { game: true, media: true, aux: true } },
    chatSpeak: 0,                              // 0..1 eased (is the friend speaking)
    lvl: { game: 0, chat: 0, media: 0, aux: 0 }, ducking: 0,
    eq: {}, eqTab: "game", eqSel: 1, libOpen: false, libCat: 0, favs: { game: ["valorant"], chat: [], media: [], aux: [] },
    osd: { show: false, g: "game", t: 0 }, extraProfiles: [],
  };
  GROUPS.forEach((g) => {
    const base = g.id === "game" ? "valorant" : null;
    S.eq[g.id] = { on: true, auto: false, preset: base, pts: base ? clone(preset(base).pts) : FLAT(), bass: 0, voice: 0, treble: 0, pre: 0, surround: false, tuning: 0.5, dist: 0.65, comp: false, compAmt: 0.5, ai: false, aiAmt: 0.8 };
  });
  S.eq.media.on = false; S.eq.chat.on = true;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const eqs = () => S.eq[S.eqTab];
  const groupApps = (id) => APPS.filter((a) => a.g === id);
  const pct = (v) => Math.round(v * 100);

  // ── Filter maths (RBJ biquads, magnitude in dB at 48 kHz) ────────────────
  function mag(type, f0, g, Q, f) {
    const A = Math.pow(10, g / 40), w0 = (2 * Math.PI * f0) / 48000, c = Math.cos(w0), s = Math.sin(w0), al = s / (2 * Q);
    let b0, b1, b2, a0, a1, a2;
    if (type === "peak") { b0 = 1 + al * A; b1 = -2 * c; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * c; a2 = 1 - al / A; }
    else {
      const sq = 2 * Math.sqrt(A) * al;
      if (type === "low") { b0 = A * (A + 1 - (A - 1) * c + sq); b1 = 2 * A * (A - 1 - (A + 1) * c); b2 = A * (A + 1 - (A - 1) * c - sq); a0 = A + 1 + (A - 1) * c + sq; a1 = -2 * (A - 1 + (A + 1) * c); a2 = A + 1 + (A - 1) * c - sq; }
      else { b0 = A * (A + 1 + (A - 1) * c + sq); b1 = -2 * A * (A - 1 + (A + 1) * c); b2 = A * (A + 1 + (A - 1) * c - sq); a0 = A + 1 - (A - 1) * c + sq; a1 = 2 * (A - 1 - (A + 1) * c); a2 = A + 1 - (A - 1) * c - sq; }
    }
    const w = (2 * Math.PI * f) / 48000, cw = Math.cos(w), sw = Math.sin(w), c2 = Math.cos(2 * w), s2 = Math.sin(2 * w);
    const nr = b0 + b1 * cw + b2 * c2, ni = -(b1 * sw + b2 * s2), dr = a0 + a1 * cw + a2 * c2, di = -(a1 * sw + a2 * s2);
    return 10 * Math.log10((nr * nr + ni * ni) / (dr * dr + di * di));
  }
  function response(e, f) {
    let d = 0;
    for (const p of e.pts) if (p.g) d += mag(p.t, p.f, p.g, p.q, f);
    if (e.bass) d += mag("low", 120, e.bass, 0.7, f);
    if (e.voice) d += mag("peak", 1800, e.voice, 0.7, f);
    if (e.treble) d += mag("high", 8000, e.treble, 0.7, f);
    return d;
  }
  const peakDb = (e) => { let m = 0; for (let i = 0; i <= 60; i++) m = Math.max(m, response(e, 20 * Math.pow(1000, i / 60))); return Math.max(0, Math.round(m + e.pre)); };

  // ── CSS ──────────────────────────────────────────────────────────────────
  const CSS = `
.mx-demo{position:relative;width:100%;overflow:hidden;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:#070912;user-select:none;-webkit-user-select:none;
  font-family:"Segoe UI Variable Text","Segoe UI",system-ui,sans-serif;color:#e9eaf2;touch-action:pan-y}
.mx-demo *{box-sizing:border-box}
.mx-stage{position:absolute;left:0;top:0;width:1180px;height:720px;transform-origin:0 0;overflow:hidden;
  background:radial-gradient(70% 90% at 15% 10%,#243a78 0%,transparent 60%),radial-gradient(60% 80% at 90% 100%,#4a2a7a 0%,transparent 60%),linear-gradient(160deg,#0f1a3a,#12142e 55%,#1a1236)}
.mx-demo button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.mx-demo svg{display:block;flex:none}
.mx-win{position:absolute;left:30px;top:14px;width:1120px;height:646px;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;
  background:radial-gradient(60% 80% at 100% 0%,rgba(120,50,70,.35),transparent 60%),radial-gradient(60% 80% at 0% 100%,rgba(30,50,120,.25),transparent 60%),#0c0d16;
  border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 80px rgba(0,0,0,.6);transition:opacity .22s,transform .22s}
.mx-win.off{opacity:0;transform:scale(.96) translateY(14px);pointer-events:none}
.mx-title{height:42px;display:flex;align-items:center;gap:10px;padding:0 14px 0 14px;flex:none}
.mx-title img{width:22px;height:22px}.mx-title b{font-weight:600;font-size:14px;flex:1}
.mx-tb{width:34px;height:30px;display:grid;place-items:center;border-radius:6px;color:#b8bad0}.mx-tb:hover{background:rgba(255,255,255,.08)}
.mx-tb.x:hover{background:#c42b1c;color:#fff}.mx-tb.star{color:#e6b840}
.mx-body{flex:1;min-height:0;position:relative;padding:0 16px 14px}
.mx-view{position:absolute;inset:0 16px 14px;display:none}.mx-view.on{display:block}
.mx-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px}
.mx-top{height:60px;display:flex;align-items:center;gap:12px;padding:0 14px;margin-bottom:12px}
.mx-lab{font-size:12px;font-weight:700}.mx-tile{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;flex:none;color:#10131c}
.mx-sl{position:relative;height:22px;flex:1;cursor:pointer;touch-action:none}
.mx-sl:before{content:"";position:absolute;left:0;right:0;top:8px;height:6px;border-radius:3px;background:rgba(255,255,255,.1)}
.mx-sl .f{position:absolute;left:0;top:8px;height:6px;border-radius:3px}
.mx-sl .k{position:absolute;top:1px;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.5)}
.mx-sl.thin{height:18px}.mx-sl.thin:before,.mx-sl.thin .f{top:6px;height:5px}.mx-sl.thin .k{width:16px;height:16px;margin-left:-8px;top:1px}
.mx-sl.mid:before{background:rgba(255,255,255,.12)}
.mx-btn{height:34px;padding:0 12px;border-radius:10px;display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1)}
.mx-btn:hover{background:rgba(255,255,255,.12)}.mx-btn.on{background:rgba(99,102,241,.28);border-color:rgba(129,140,248,.6)}
.mx-ico{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#c8cae0}
.mx-ico:hover{background:rgba(255,255,255,.14)}.mx-ico.mut{color:#ff6b81;background:rgba(255,80,100,.14);border-color:rgba(255,80,100,.35)}
.mx-row{display:flex;gap:12px;height:calc(100% - 72px)}
.mx-grp{flex:1;min-width:0;padding:14px;display:flex;flex-direction:column;position:relative;transition:box-shadow .2s,border-color .2s}
.mx-grp.drop{border-color:rgba(255,255,255,.6);box-shadow:0 0 0 2px rgba(255,255,255,.25) inset}
.mx-gh{display:flex;align-items:center;gap:12px}.mx-gh .n{flex:1;min-width:0}.mx-gh b{display:block;font-size:17px;font-weight:600}.mx-gh small{color:#9a9db6;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mx-vr{display:flex;align-items:center;gap:8px;margin-top:12px}.mx-vr .v{font-size:21px;font-weight:700;width:64px;text-align:right}.mx-vr .v i{font-style:normal;font-size:12px;color:#9a9db6;font-weight:600;margin-left:1px}
.mx-meter{height:3px;border-radius:2px;background:rgba(255,255,255,.07);margin:4px 0 20px;overflow:hidden;position:relative}.mx-meter i{position:absolute;left:0;top:0;bottom:0;border-radius:2px}
.mx-duckb{position:absolute;right:14px;top:101px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;background:rgba(255,200,80,.16);color:#ffd36b;opacity:0;transition:opacity .2s}
.mx-sel{height:40px;border-radius:12px;display:flex;align-items:center;gap:9px;padding:0 12px;font-size:13px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);width:100%;text-align:left;color:#d8daee}
.mx-sel span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mx-sel.acc{border-color:currentColor}
.mx-cap{font-size:11px;font-weight:700;letter-spacing:.05em;color:#8b8ea8;margin:14px 0 8px}
.mx-app{display:flex;align-items:center;gap:10px;height:50px;padding:0 10px;border-radius:12px;margin-bottom:8px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);cursor:grab;touch-action:none}
.mx-app.z{opacity:.5}.mx-app .t{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;font-size:12px;font-weight:800;color:#fff;flex:none}
.mx-app .m{min-width:0;flex:1}.mx-app .m b{display:block;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mx-app .m small{font-size:11px;color:#9a9db6;display:flex;align-items:center;gap:5px}.mx-dot{width:8px;height:8px;border-radius:50%;background:#7a7d92}.mx-dot.a{background:#2fd48a;box-shadow:0 0 0 3px rgba(47,212,138,.2)}.mx-dot.c{background:none;border:1.5px solid #7a7d92}
.mx-det{width:250px;flex:none;padding:14px;display:flex;flex-direction:column}
.mx-det h6{margin:0;font-size:11.5px;letter-spacing:.05em;color:#9a9db6;font-weight:700;display:flex;gap:8px;align-items:center}.mx-det h6 i{font-style:normal;background:rgba(255,255,255,.1);border-radius:99px;padding:1px 8px;color:#e9eaf2}
.mx-find{height:38px;margin:12px 0;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:8px;padding:0 10px;color:#8b8ea8;font-size:13px}
.mx-find input{flex:1;min-width:0;background:none;border:0;outline:0;color:#e9eaf2;font:inherit}
.mx-hint{margin-top:auto;font-size:11.5px;color:#8b8ea8;line-height:1.4}
.mx-menu{position:absolute;z-index:40;min-width:200px;padding:6px;border-radius:12px;background:#171827;border:1px solid rgba(255,255,255,.14);box-shadow:0 16px 40px rgba(0,0,0,.6)}
.mx-menu button{display:flex;align-items:center;gap:9px;width:100%;text-align:left;padding:9px 10px;border-radius:8px;font-size:13px}.mx-menu button:hover{background:rgba(255,255,255,.08)}.mx-menu button.cur{color:#a5b4fc}
.mx-ghost{position:fixed;z-index:60;pointer-events:none;display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:10px;background:#1c1d2e;border:1px solid rgba(255,255,255,.3);font-size:12.5px;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.mx-voice{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;color:#9a9db6}.mx-voice i{width:7px;height:7px;border-radius:50%;background:#555a70;transition:.2s}.mx-voice.on{color:#8fd8ff}.mx-voice.on i{background:#4cc4ff;box-shadow:0 0 8px #4cc4ff}
/* equalizer */
.mx-eqh{display:flex;align-items:center;gap:12px;height:56px}.mx-eqh h2{margin:0 6px 0 8px;font-size:22px;font-weight:600}
.mx-tab{height:34px;padding:0 17px;border-radius:99px;font-size:14px;font-weight:600;color:#b8bad0}.mx-tab.on{color:#fff}.mx-sp{flex:1}
.mx-tg{position:relative;width:48px;height:26px;border-radius:13px;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.28);flex:none;transition:.18s;cursor:pointer}
.mx-tg:after{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.18s}.mx-tg.on{background:#6366f1;border-color:#818cf8}.mx-tg.on:after{left:25px}
.mx-qmark{width:20px;height:20px;border-radius:50%;border:1.5px solid #6c6f88;color:#8b8ea8;font-size:11px;display:grid;place-items:center}
.mx-prof{display:flex;align-items:center;gap:16px;padding:10px 18px;height:94px;margin:2px 0 8px}
.mx-prof .pi{width:56px;height:56px;border-radius:17px;display:grid;place-items:center;color:#fff;flex:none}.mx-prof .pn b{font-size:17px;font-weight:600;display:flex;align-items:center;gap:8px}.mx-prof .pn small{font-size:10.5px;letter-spacing:.06em;color:#8b8ea8;display:block;margin-bottom:6px}
.mx-fav{width:92px;height:58px;border-radius:12px;border:1.5px dashed rgba(255,255,255,.16);display:grid;place-items:center;font-size:11px;font-weight:700;text-align:center;line-height:1.15;padding:6px;color:#fff;cursor:pointer}
.mx-fav.f{border:0;color:#fff;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;overflow:hidden;line-height:1.1}.mx-fav.f.cur:after{content:"";position:absolute;left:12px;right:12px;bottom:4px;height:3px;border-radius:2px;background:#fff}
.mx-link{font-size:13px;color:#b8bad0;padding:6px 6px}.mx-link:hover{color:#fff}
.mx-graph{position:relative;height:222px;margin-bottom:8px;overflow:hidden}.mx-graph canvas{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none}
.mx-pan{padding:12px 16px;height:166px}.mx-pan h5{margin:0 0 10px;font-size:11.5px;letter-spacing:.05em;font-weight:600;color:#9a9db6;display:flex;gap:8px;align-items:center}
.mx-pans{display:flex;gap:10px}
.mx-fr{display:flex;align-items:center;gap:10px;margin-bottom:7px;font-size:13px}.mx-fr label{width:50px}.mx-num{height:30px;min-width:78px;padding:0 10px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:12.5px}
.mx-seg{display:inline-flex;padding:3px;border-radius:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);gap:2px}.mx-seg button{height:30px;padding:0 13px;border-radius:8px;font-size:12.5px;font-weight:600;color:#b8bad0}.mx-seg button.on{background:#3a3d8f;color:#fff}
.mx-field{display:flex;align-items:center;gap:8px;font-size:12px;color:#9a9db6}.mx-field span.v{height:32px;min-width:68px;padding:0 10px;border-radius:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);display:inline-flex;align-items:center;color:#e9eaf2;font-size:13px}
.mx-lib{position:absolute;inset:0;background:rgba(6,7,14,.78);backdrop-filter:blur(6px);z-index:30;display:none;padding:34px 60px}.mx-lib.on{display:block}
.mx-libbox{height:100%;border-radius:18px;background:#12131f;border:1px solid rgba(255,255,255,.12);padding:20px 24px;display:flex;flex-direction:column}
.mx-libg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;overflow:auto;margin-top:14px}
.mx-pre{display:flex;align-items:center;gap:11px;height:54px;padding:0 12px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);font-size:13px;font-weight:600;text-align:left;cursor:pointer}
.mx-pre:hover{background:rgba(255,255,255,.1)}.mx-pre .q{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex:none;color:#fff}
/* settings */
.mx-sh{display:flex;align-items:center;gap:14px;height:56px}.mx-sh h2{margin:0;font-size:26px;font-weight:600}
.mx-back{height:34px;padding:0 14px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:13px;display:flex;align-items:center;gap:6px}
.mx-sw{display:flex;gap:30px;height:calc(100% - 64px)}.mx-nav{width:300px;flex:none;padding-top:10px}
.mx-ni{height:48px;border-radius:12px;display:flex;align-items:center;gap:14px;padding:0 20px;font-size:16px;color:#c8cae0;width:100%;margin-bottom:6px}.mx-ni:hover{background:rgba(255,255,255,.05)}.mx-ni.on{background:rgba(255,255,255,.08);color:#fff}
.mx-pg{flex:1;min-width:0;overflow-y:auto;padding-right:8px}.mx-pg::-webkit-scrollbar{width:6px}.mx-pg::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:3px}
.mx-ph{display:flex;align-items:center;gap:14px;margin-bottom:18px}.mx-ph .pi{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#6366f1,#c084fc)}.mx-ph b{font-size:22px;font-weight:600}
.mx-sec{font-size:11.5px;letter-spacing:.05em;color:#8b8ea8;margin:6px 6px 10px;font-weight:600}
.mx-set{border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);margin-bottom:22px;overflow:hidden}
.mx-it{display:flex;align-items:center;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.07)}.mx-it:last-child{border:0}
.mx-it .ii{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.06);color:#c8cae0;flex:none}
.mx-it .tx{flex:1;min-width:0}.mx-it .tx b{display:block;font-size:15.5px;font-weight:500}.mx-it .tx small{display:block;font-size:13px;color:#8e91aa;margin-top:3px;line-height:1.4;max-width:560px}
.mx-chips{display:flex;gap:10px;flex-wrap:wrap;padding:0 20px 18px}.mx-chip{height:44px;padding:0 14px;border-radius:12px;display:flex;align-items:center;gap:9px;font-size:15px;font-weight:500;border:1.5px solid;opacity:.5}.mx-chip.on{opacity:1}
.mx-key{display:inline-flex;gap:5px}.mx-key kbd{font:600 12px "Segoe UI",system-ui;padding:5px 9px;border-radius:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);box-shadow:0 2px 0 rgba(255,255,255,.08)}
.mx-pos{display:grid;grid-template-columns:repeat(3,30px);gap:6px}.mx-pos button{height:22px;border-radius:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12)}.mx-pos button.on{background:#6366f1;border-color:#a5b4fc}
.mx-pf{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.07)}.mx-pf b{flex:1;font-size:15px;font-weight:500}
/* desktop */
.mx-task{position:absolute;left:0;right:0;bottom:0;height:46px;background:rgba(18,20,38,.86);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;padding:0 12px;gap:10px;z-index:20}
.mx-task .ic{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.07);flex:none}.mx-task .cen{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:10px;align-items:center}
.mx-task .app{position:relative;width:30px;height:30px;border-radius:8px;display:grid;place-items:center}.mx-task .app.run:after{content:"";position:absolute;bottom:-5px;left:11px;width:8px;height:3px;border-radius:2px;background:#8aa4ff}
.mx-hk{display:flex;gap:6px;align-items:center;font-size:11.5px;color:#b8bad0}.mx-hk button{height:28px;padding:0 10px;border-radius:7px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);font-size:11.5px;font-weight:600;color:#e9eaf2}.mx-hk button:hover{background:rgba(255,255,255,.14)}
.mx-tray{margin-left:auto;display:flex;align-items:center;gap:12px;font-size:11.5px;color:#d7d9ea;text-align:right;line-height:1.15}.mx-tray img{width:22px;height:22px;cursor:pointer;padding:2px;border-radius:6px}.mx-tray img:hover,.mx-tray img.on{background:rgba(255,255,255,.14)}
.mx-fly{position:absolute;right:14px;bottom:56px;width:344px;border-radius:20px;background:#0f1119;border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.65);padding:14px 14px 12px;z-index:25;transition:opacity .18s,transform .18s;transform-origin:100% 100%}
.mx-fly.off{opacity:0;transform:translateY(14px) scale(.97);pointer-events:none}
.mx-fh{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:14px;font-weight:600}.mx-fh img{width:22px;height:22px}.mx-fh span{flex:1}
.mx-pills{display:flex;gap:8px;margin-bottom:10px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.08)}.mx-pills button{height:32px;padding:0 13px;border-radius:10px;font-size:12.5px;font-weight:600;color:#b8bad0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.mx-pills button.on{background:rgba(99,102,241,.26);border-color:rgba(129,140,248,.7);color:#fff}
.mx-fg{display:flex;align-items:center;gap:8px;height:46px}.mx-fg .t{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;position:relative;color:#10131c;flex:none}
.mx-fg .t i{position:absolute;right:-3px;top:-3px;width:9px;height:9px;border-radius:50%;background:#2fd48a;border:2px solid #0f1119}.mx-fg .nm{width:62px;font-size:13px;font-weight:600}.mx-fg .p{width:36px;text-align:right;font-size:11.5px;color:#9a9db6}
.mx-fa{display:flex;align-items:center;gap:8px;height:30px;padding-left:34px}.mx-fa .t{width:20px;height:20px;border-radius:6px;display:grid;place-items:center;font-size:10px;font-weight:800;color:#fff}.mx-fa .p{width:34px;text-align:right;font-size:11.5px;color:#9a9db6}.mx-fa .nm{width:82px;font-size:12px;color:#d0d2e6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mx-mini{width:30px;height:28px;border-radius:8px;display:grid;place-items:center;color:#a9acc6}.mx-mini:hover{background:rgba(255,255,255,.08)}.mx-mini.mut{color:#ff6b81}
.mx-fmix{display:flex;align-items:center;gap:10px;padding:10px 0;margin-top:6px;border-top:1px solid rgba(255,255,255,.08)}
.mx-fbtn{display:flex;align-items:center;gap:12px;width:100%;height:40px;font-size:14px;color:#d8daee;text-align:left;border-radius:10px}.mx-fbtn:hover{background:rgba(255,255,255,.05)}.mx-fbtn .q{width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.07);display:grid;place-items:center}.mx-fbtn.exit{color:#ff8a98}
.mx-osd{position:absolute;z-index:30;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:16px;background:rgba(14,16,26,.94);border:1px solid rgba(255,255,255,.14);box-shadow:0 16px 40px rgba(0,0,0,.55);transition:opacity .22s,transform .22s}
.mx-osd.off{opacity:0;pointer-events:none;transform:translateY(10px)}.mx-osd .t{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;color:#10131c;flex:none}.mx-osd .p{width:42px;text-align:right;font-size:13px;font-weight:700}
.mx-tip{position:absolute;left:50%;top:6px;transform:translateX(-50%);z-index:15;font-size:12px;color:#c4c7e0;background:rgba(10,12,24,.6);padding:5px 14px;border-radius:99px;pointer-events:none;transition:opacity .4s;white-space:nowrap}
.mx-bal{display:flex;align-items:center;gap:12px;width:320px;font-size:12px;color:#9a9db6}
`;
  function injectCss() { if (document.getElementById("mx-demo-css")) return; const s = document.createElement("style"); s.id = "mx-demo-css"; s.textContent = CSS; document.head.appendChild(s); }

  // ── Small view helpers ───────────────────────────────────────────────────
  const gTile = (id, sz = 38, isz = 20) => { const g = G[id]; return `<span class="mx-tile" style="width:${sz}px;height:${sz}px;background:linear-gradient(135deg,${g.from},${g.to})">${ic(g.icon, isz, "#10131c", 2.2)}</span>`; };
  const gGrad = (id) => `linear-gradient(90deg,${G[id].from},${G[id].to})`;
  const slider = (k, id, cls) => `<div class="mx-sl ${cls || ""}" data-k="${k}"><i class="f" style="background:${id ? gGrad(id) : "linear-gradient(90deg,#ff7ac6,#ff4ea0)"}"></i><b class="k"></b></div>`;
  const toggle = (k, on) => `<button class="mx-tg ${on ? "on" : ""}" data-tg="${k}" role="switch" aria-checked="${!!on}"></button>`;
  const tileApp = (a, sz = 26) => `<span class="t" style="background:${a.c};width:${sz}px;height:${sz}px">${a.t}</span>`;
  const outName = (o) => (o === "hp" ? L.hp : o === "spk" ? L.spk : L.defOut);

  // ── Demo ─────────────────────────────────────────────────────────────────
  function Demo(root, logo) {
    root.innerHTML = `<div class="mx-stage"><div class="mx-tip"></div><div class="mx-win"></div><div class="mx-fly off"></div><div class="mx-osd off"></div><div class="mx-task"></div></div>`;
    const stage = root.firstChild, win = stage.querySelector(".mx-win"), fly = stage.querySelector(".mx-fly"), osd = stage.querySelector(".mx-osd"), task = stage.querySelector(".mx-task"), tip = stage.querySelector(".mx-tip");
    let scale = 1, menu = null, ghost = null, drag = null, eqCanvas = null, eqCtx = null, eqDrag = null, visible = true, hideTimer = 0, lastBuild = "";
    tip.textContent = L.tutorial;

    function fit() { const w = root.clientWidth || 1180; scale = w / 1180; stage.style.transform = `scale(${scale})`; root.style.height = 720 * scale + "px"; drawEq(); }

    // sliders: getter/setter by key
    const ACC = {
      mix: { get: () => (S.mix + 1) / 2, set: (v) => (S.mix = v * 2 - 1) },
      mic: { get: () => S.mic.vol, set: (v) => { S.mic.vol = v; if (v > 0) S.mic.mute = false; } },
      bal: { get: () => (S.balance + 1) / 2, set: (v) => (S.balance = Math.abs(v - 0.5) < 0.04 ? 0 : v * 2 - 1) },
      bass: { get: () => (eqs().bass + 12) / 24, set: (v) => (eqs().bass = snap(v * 24 - 12)) },
      voice: { get: () => (eqs().voice + 12) / 24, set: (v) => (eqs().voice = snap(v * 24 - 12)) },
      treble: { get: () => (eqs().treble + 12) / 24, set: (v) => (eqs().treble = snap(v * 24 - 12)) },
      pre: { get: () => (eqs().pre + 12) / 24, set: (v) => (eqs().pre = snap(v * 24 - 12)) },
      compAmt: { get: () => eqs().compAmt, set: (v) => (eqs().compAmt = Math.round(v * 20) / 20) },
      tuning: { get: () => eqs().tuning, set: (v) => (eqs().tuning = v) },
      dist: { get: () => eqs().dist, set: (v) => (eqs().dist = v) },
      aiAmt: { get: () => eqs().aiAmt, set: (v) => (eqs().aiAmt = Math.round(v * 20) / 20) },
      osdv: { get: () => S.g[S.osd.g].vol, set: (v) => { S.g[S.osd.g].vol = v; S.g[S.osd.g].mute = false; } },
    };
    function snap(v) { v = Math.round(v * 2) / 2; return Math.abs(v) < 0.4 ? 0 : v; }
    function acc(k) {
      if (k.startsWith("vol:")) { const id = k.slice(4); return { get: () => S.g[id].vol, set: (v) => { S.g[id].vol = Math.round(v * 100) / 100; S.g[id].mute = false; } }; }
      if (k.startsWith("tvol:")) { const id = k.slice(5); return acc("vol:" + id); }
      if (k.startsWith("tapp:")) { const id = k.slice(5); const a = APPS.find((x) => x.id === id); return { get: () => a.trim == null ? 1 : a.trim, set: (v) => { a.trim = Math.round(v * 100) / 100; } }; }
      return ACC[k];
    }
    const fmtDb = (v) => (v > 0 ? "+" : "") + v.toFixed(1) + " dB";

    function updateSliders() {
      root.querySelectorAll(".mx-sl").forEach((el) => {
        const a = acc(el.dataset.k); if (!a) return;
        const v = clamp(a.get(), 0, 1);
        el.querySelector(".f").style.width = v * 100 + "%"; el.querySelector(".k").style.left = v * 100 + "%";
      });
      GROUPS.forEach((g) => {
        const c = S.g[g.id];
        root.querySelectorAll(`[data-vt="${g.id}"]`).forEach((n) => (n.innerHTML = c.mute ? "0<i>%</i>" : pct(c.vol) + "<i>%</i>"));
        root.querySelectorAll(`[data-pt="${g.id}"]`).forEach((n) => (n.textContent = c.mute ? "0%" : pct(c.vol) + "%"));
        root.querySelectorAll(`[data-mute="${g.id}"]`).forEach((n) => { n.classList.toggle("mut", c.mute); n.innerHTML = ic(c.mute ? "volx" : "vol", 18); });
      });
      root.querySelectorAll("[data-micmute]").forEach((m) => { m.classList.toggle("mut", S.mic.mute); m.innerHTML = ic(S.mic.mute ? "micOff" : "mic", 18); });
      root.querySelectorAll("[data-micp]").forEach((m) => (m.textContent = S.mic.mute ? "0%" : pct(S.mic.vol) + "%"));
      root.querySelectorAll("[data-pa]").forEach((n) => { const ap = APPS.find((x) => x.id === n.dataset.pa); n.textContent = (ap.trim == null ? 100 : pct(ap.trim)) + "%"; });
      root.querySelectorAll("[data-t]").forEach((n) => { const k = n.dataset.t; n.textContent = k === "bass" || k === "voice" || k === "treble" || k === "pre" ? fmtDb(eqs()[k]) : k === "compAmt" ? pct(eqs().compAmt) + " %" : k === "aiAmt" ? pct(eqs().aiAmt) + " %" : k === "tuning" ? [L.sensO[2], "Balanced", "Wide"][Math.round(eqs().tuning * 2)] : k === "dist" ? String(pct(eqs().dist)) : k === "bal" ? (S.balance === 0 ? L.center : (S.balance < 0 ? L.left : L.right) + " " + pct(Math.abs(S.balance)) + "%") : n.textContent; });
      const pn = root.querySelector("[data-prenote]"); if (pn) pn.textContent = L.preNote(peakDb(eqs()));
      const osdp = osd.querySelector(".p"); if (osdp) osdp.textContent = S.g[S.osd.g].mute ? "0%" : pct(S.g[S.osd.g].vol) + "%";
    }

    // ── builders ──
    function buildTitle(extra) {
      return `<div class="mx-title"><img src="${logo}" alt=""><b>Mixora</b>${extra || ""}<button class="mx-tb star" aria-label="Store">${ic("star", 16)}</button><button class="mx-tb" data-go="settings" aria-label="${L.settings}">${ic("gear", 16)}</button><button class="mx-tb" aria-hidden="true">${ic("minus", 15)}</button><button class="mx-tb" aria-hidden="true">${ic("square", 13)}</button><button class="mx-tb x" data-act="close" aria-label="Close">${ic("x", 16)}</button></div>`;
    }
    function appRow(a, inGroup) {
      const gid = a.g, st = a.st;
      const sub = `<small><i class="mx-dot ${st === 2 ? "a" : st === 0 ? "c" : ""}"></i><span style="color:${st === 2 ? "#4be0a0" : "inherit"}">${L.st[st]}</span>${a.trim != null && a.trim < 1 ? `<span style="color:#e8b45a">· ${pct(a.trim)}%</span>` : ""}</small>`;
      return `<div class="mx-app ${st === 0 ? "z" : ""}" data-app="${a.id}">${tileApp(a)}<div class="m"><b>${a.name}</b>${sub}</div></div>`;
    }
    function groupCard(g) {
      const c = S.g[g.id], n = groupApps(g.id).length;
      const sel = `<button class="mx-sel ${c.out === "hp" ? "acc" : ""}" style="${c.out === "hp" ? "color:" + g.from : ""}" data-out="${g.id}">${ic(c.out === "hp" ? "headphones" : "speaker", 16)}<span>${outName(c.out)}</span>${ic("chevD", 15)}</button>`;
      return `<div class="mx-card mx-grp" data-gcard="${g.id}" style="background:linear-gradient(180deg,${g.from}1f,rgba(255,255,255,.03) 55%)">
        <div class="mx-gh">${gTile(g.id, 46, 24)}<div class="n"><b>${gname(g.id)}</b><small data-cnt="${g.id}">${L.apps(n)}</small></div><button class="mx-ico" data-mute="${g.id}" aria-label="Mute"></button></div>
        <div class="mx-vr">${slider("vol:" + g.id, g.id)}<span class="v" data-vt="${g.id}"></span></div>
        <div class="mx-meter"><i data-meter="${g.id}" style="background:${gGrad(g.id)}"></i></div><span class="mx-duckb" data-duckb="${g.id}"></span>
        ${sel}<div class="mx-cap">${L.appsLbl}</div><div data-apps="${g.id}">${groupApps(g.id).map((a) => appRow(a)).join("")}</div></div>`;
    }
    function detectedList() {
      const q = (S.q || "").toLowerCase();
      return APPS.filter((a) => !a.g && a.name.toLowerCase().includes(q)).map((a) => appRow(a)).join("");
    }
    function buildMain() {
      const un = APPS.filter((a) => !a.g).length;
      return `<div class="mx-card mx-top"><span class="mx-tile" style="background:linear-gradient(135deg,#34e7a6,#4cc4ff)">${ic("headphones", 20, "#10131c", 2.2)}</span><b style="font-size:16px;font-weight:600">${L.chatmix}</b>
        <span class="mx-lab" style="color:#ffc24a">${gname("game")}</span>${slider("mix", null, "mid").replace("linear-gradient(90deg,#ff7ac6,#ff4ea0)", "linear-gradient(90deg,#ffb36b,#ff5470)")}<span class="mx-lab" style="color:#4cc4ff">${gname("chat")}</span>
        <span class="mx-voice" data-voice><i></i><span></span></span>
        <button class="mx-ico" data-micmute aria-label="Mic"></button><div style="width:130px;display:flex">${slider("mic", null, "")}</div>
        <button class="mx-btn" data-prof-menu>${ic("layers", 16)}<span data-profname>${L.profiles[S.profile] || S.extraProfiles[S.profile - 3] || ""}</span></button>
        <button class="mx-btn" data-go="settings:groups">${L.groupsBtn}${ic("chevD", 14)}</button></div>
        <div class="mx-row">${GROUPS.map(groupCard).join("")}
        <div class="mx-card mx-det"><h6>${L.detected}<i data-ucount>${un}</i></h6><div class="mx-find">${ic("search", 16)}<input data-q placeholder="${L.search}" value="${S.q || ""}"></div><div data-det>${detectedList()}</div><div class="mx-hint">${L.dragHint}</div></div></div>`;
    }
    function buildEq() {
      const e = eqs(), gid = S.eqTab, g = G[gid];
      const pr = e.preset ? preset(e.preset) : null;
      const favs = S.favs[gid];
      const slots = Array.from({ length: 6 }, (_, i) => { const id = favs[i]; if (!id) return `<div class="mx-fav" data-favslot="${i}"></div>`; const p = preset(id); return `<button class="mx-fav f ${e.preset === id ? "cur" : ""}" data-fav="${id}" style="background:${gGrad(gid)}">${ic("wave", 15, "#fff", 2.2)}<span>${p.name}</span></button>`; }).join("");
      const proc = `<div class="mx-fr" style="justify-content:space-between"><span>${L.surround}</span>${toggle("surround", e.surround)}</div>
        ${e.surround ? `<div class="mx-fr"><label style="width:60px">${L.tuning}</label>${slider("tuning", gid, "thin")}<span class="mx-num" style="min-width:74px" data-t="tuning"></span></div><div class="mx-fr"><label style="width:60px">${L.dist}</label>${slider("dist", gid, "thin")}<span class="mx-num" style="min-width:74px" data-t="dist"></span></div>` : `<div class="mx-fr" style="justify-content:space-between"><span>${L.comp}</span>${toggle("comp", e.comp)}</div>${e.comp ? `<div class="mx-fr">${slider("compAmt", gid, "thin")}<span class="mx-num" data-t="compAmt"></span></div>` : ""}${gid === "chat" ? `<div class="mx-fr" style="justify-content:space-between"><span>${L.ai}</span>${toggle("ai", e.ai)}</div>${e.ai ? `<div class="mx-fr">${slider("aiAmt", gid, "thin")}<span class="mx-num" data-t="aiAmt"></span></div>` : ""}` : ""}`}`;
      return `<div class="mx-eqh"><button class="mx-btn" data-go="main" style="margin-right:2px">${ic("back", 15)}</button><h2>${L.eq}</h2>${GROUPS.map((x) => `<button class="mx-tab ${x.id === gid ? "on" : ""}" data-eqtab="${x.id}" style="${x.id === gid ? "background:" + gGrad(x.id) : ""}">${gname(x.id)}</button>`).join("")}<span class="mx-sp"></span>
        <span style="font-size:13px;color:#c8cae0">${L.autoProfile}</span><span class="mx-qmark" title="${L.autoOn}">?</span>${toggle("auto", e.auto)}<span style="font-size:13px;color:#c8cae0;margin-left:10px">${L.useEq}</span>${toggle("eqon", e.on)}</div>
        <div class="mx-card mx-prof"><div style="display:flex;align-items:center;gap:14px;width:340px"><div class="pi" style="background:${gGrad(gid)}">${ic("wave", 32, "#fff", 2)}</div><div class="pn"><small>${L.profile}</small><b>${pr ? pr.name : L.custom}${pr ? `<span data-star style="color:${favs.includes(pr.id) ? "#f5c542" : "#6c6f88"};cursor:pointer">${ic("star", 17, "currentColor", 2)}</span>` : ""}</b></div><button class="mx-ico" data-lib style="width:56px;height:56px;margin-left:12px;border-radius:16px">${ic("search", 22)}</button></div>
        <div style="flex:1"><div style="font-size:11px;letter-spacing:.05em;color:#8b8ea8;margin-bottom:8px">${L.favs} (${favs.length}/6)</div><div style="display:flex;gap:8px">${slots}</div></div><div style="display:flex;gap:6px;align-self:flex-end"><button class="mx-link" data-eqreset="1">${L.reset}</button></div></div>
        <div class="mx-card mx-graph" data-graph><canvas></canvas></div>
        <div class="mx-pans"><div class="mx-card mx-pan" style="width:380px" data-selpt></div>
        <div class="mx-card mx-pan" style="width:270px"><h5>${L.tone}</h5>${["bass", "voice", "treble"].map((k) => `<div class="mx-fr"><label>${L[k]}</label>${slider(k, gid, "thin")}<span class="mx-num" data-t="${k}"></span></div>`).join("")}</div>
        <div class="mx-card mx-pan" style="width:210px"><h5>${L.pre}</h5><div class="mx-fr">${slider("pre", gid, "thin")}</div><div class="mx-fr"><span class="mx-num" data-t="pre" style="width:100%"></span></div><div style="font-size:11.5px;color:#8e91aa;line-height:1.35" data-prenote></div></div>
        <div class="mx-card mx-pan" style="flex:1"><h5>${L.processing}</h5>${proc}</div></div>
        <div class="mx-lib ${S.libOpen ? "on" : ""}" data-lib-box><div class="mx-libbox"><div style="display:flex;align-items:center;gap:12px"><b style="font-size:19px">${L.library}</b><span style="font-size:12px;color:#8e91aa">${L.libNote}</span><span class="mx-sp"></span><div class="mx-seg">${L.libCats.map((c, i) => `<button class="${S.libCat === i ? "on" : ""}" data-libcat="${i}">${c}</button>`).join("")}</div><button class="mx-ico" data-libclose>${ic("x", 16)}</button></div><div class="mx-libg">${PRESETS.filter((p) => p.cat === S.libCat).map((p) => `<button class="mx-pre" data-pre="${p.id}"><span class="q" style="background:${gGrad(gid)}">${ic("wave", 16, "#fff", 2.2)}</span>${p.name}</button>`).join("")}</div></div></div>`;
    }
    function selPanel() {
      const e = eqs(), p = e.pts[S.eqSel] || e.pts[0], bi = bandOf(p.f);
      return `<h5>${L.selPoint}</h5><div style="display:flex;align-items:center;gap:10px;font-size:15px;margin-bottom:12px"><i style="width:11px;height:11px;border-radius:50%;background:${G[S.eqTab].from}"></i><b style="font-weight:600;flex:1">${L.bands[bi].charAt(0) + L.bands[bi].slice(1).toLowerCase()}</b><button class="mx-link" data-flat="1" style="font-size:12.5px">${L.back0}</button></div>
        <div class="mx-seg" style="margin-bottom:12px">${[["peak", L.peak], ["low", L.lowS], ["high", L.highS]].map(([t, n]) => `<button class="${p.t === t ? "on" : ""}" data-ptype="${t}" style="${p.t === t ? "background:" + gGrad(S.eqTab) : ""}">${n}</button>`).join("")}</div>
        <div class="mx-field"><span>${L.freq}</span><span class="v">${Math.round(p.f)}</span><span>Hz</span><span style="margin-left:6px">${L.gain}</span><span class="v" style="min-width:60px">${p.g.toFixed(1)}</span><span>dB</span><span style="margin-left:6px">Q</span><span class="v" style="min-width:60px">${p.q.toFixed(2)}</span></div>`;
    }
    const bandOf = (f) => { for (let i = 0; i < BANDS.length; i++) if (f < BANDS[i][1]) return i; return 5; };

    function buildSettings() {
      const pages = ["general", "groups", "profiles", "audio", "overlay", "shortcuts", "about"], pic = { general: "gear", groups: "grid", profiles: "layers", audio: "vol", overlay: "monitor", shortcuts: "keyboard", about: "info" };
      const nav = pages.map((k) => `<button class="mx-ni ${S.page === k ? "on" : ""}" data-page="${k}">${ic(pic[k], 20, S.page === k ? "#a5b4fc" : "currentColor")}${L.nav[k]}</button>`).join("");
      return `<div class="mx-sh"><button class="mx-back" data-go="main">${ic("back", 14)}${L.back}</button><h2>${L.settings}</h2></div><div class="mx-sw"><div class="mx-nav">${nav}</div><div class="mx-pg">${settingsPage()}</div></div>`;
    }
    const row = (icn, title, desc, ctl) => `<div class="mx-it"><span class="ii">${ic(icn, 20)}</span><div class="tx"><b>${title}</b><small>${desc || ""}</small></div>${ctl || ""}</div>`;
    const seg = (key, opts, cur) => `<div class="mx-seg">${opts.map((o, i) => `<button class="${i === cur ? "on" : ""}" data-seg="${key}:${i}">${o}</button>`).join("")}</div>`;
    function settingsPage() {
      const head = (icn, t) => `<div class="mx-ph"><span class="pi">${ic(icn, 20, "#fff")}</span><b>${t}</b></div>`;
      if (S.page === "audio") {
        const d = S.duck;
        return head("vol", L.nav.audio) + `<div class="mx-sec">${L.duck}</div><div class="mx-set">
          ${row("wave", L.duckT, L.duckD, toggle("duck", d.on))}
          ${row("zap", L.trig, L.trigD, `<button class="mx-sel" style="width:190px" data-trig>${gname(d.trigger)}<span></span>${ic("chevD", 15)}</button>`)}
          ${row("headphones", L.listen, L.listenD, `<button class="mx-sel" style="width:190px">${L.anyDev}<span></span>${ic("chevD", 15)}</button>`)}
          ${row("down2", L.howMuch, L.howMuchD, seg("amt", ["30%", "50%", "70%", "90%"], [30, 50, 70, 90].indexOf(d.amt)))}
          ${row("gauge", L.sens, L.sensD, seg("sens", L.sensO, d.sens))}
          ${row("target", L.toLower, L.toLowerD, "")}<div class="mx-chips">${GROUPS.filter((g) => g.id !== d.trigger).map((g) => `<button class="mx-chip ${d.targets[g.id] ? "on" : ""}" data-tgt="${g.id}" style="border-color:${g.from}88;background:${g.from}14">${gTile(g.id, 24, 14)}${gname(g.id)}</button>`).join("")}</div></div>
          <div class="mx-sec">${L.meters}</div><div class="mx-set">${row("wave", L.metersT, L.metersD, toggle("meters", S.meters))}${row("headphones", L.balance, L.balanceD, `<div class="mx-bal"><span>${L.left}</span>${slider("bal", null, "mid thin")}<span>${L.right}</span><span data-t="bal" style="width:70px;text-align:right;color:#e9eaf2"></span></div>`)}</div>`;
      }
      if (S.page === "general") {
        const ic2 = ["power", "minus", "x", "plus", "refresh"];
        return head("gear", L.nav.general) + `<div class="mx-set">${L.gen.map((r, i) => row(ic2[i] === "refresh" ? "refresh" : ic2[i], r[0], r[1], toggle("gen:" + i, S.gen[i]))).join("")}${row("globe", L.language, "", `<div class="mx-seg"><button class="${L === T.en ? "on" : ""}" data-lang="en">English</button><button class="${L === T.tr ? "on" : ""}" data-lang="tr">Türkçe</button></div>`)}${row("moon", L.appearance, "", seg("theme", L.themes, S.theme))}</div>`;
      }
      if (S.page === "groups") {
        return head("grid", L.nav.groups) + `<div class="mx-set">${GROUPS.map((g) => `<div class="mx-pf">${gTile(g.id, 40, 20)}<b>${gname(g.id)}</b><span style="color:#8e91aa;font-size:13px">${L.apps(groupApps(g.id).length)}</span></div>`).join("")}</div>`;
      }
      if (S.page === "profiles") {
        const all = [...L.profiles, ...S.extraProfiles];
        return head("layers", L.profTitle) + `<div class="mx-sec" style="text-transform:none;font-size:13px;letter-spacing:0">${L.profD}</div><div class="mx-set">${all.map((n, i) => `<div class="mx-pf"><span class="ii mx-ico" style="width:38px;height:38px">${ic("layers", 18)}</span><b>${n}</b>${i === S.profile ? `<span class="mx-btn on" style="cursor:default">${ic("check", 14)}${L.active}</span>` : `<button class="mx-btn" data-applyprof="${i}">${L.apply}</button>`}</div>`).join("")}${row("refresh", L.autoUpd, "", toggle("autoUpd", S.autoUpd))}</div><button class="mx-btn" data-newprof style="height:40px">${ic("plus", 15)}${L.saveNew}</button>`;
      }
      if (S.page === "overlay") {
        return head("monitor", L.ovTitle) + `<div class="mx-set">${row("monitor", L.pos, L.ovD, `<div class="mx-pos">${Array.from({ length: 9 }, (_, i) => `<button class="${S.ovPos === i ? "on" : ""}" data-ovpos="${i}"></button>`).join("")}</div>`)}${row("maximize", L.size, "", seg("ovsize", [L.small, L.med, L.large], S.ovSize))}${row("refresh", L.dur, "", seg("ovdur", ["1.5 s", "2.5 s", "4 s"], S.ovDur))}</div><button class="mx-btn" data-ovtest style="height:40px">${ic("play" in P ? "monitor" : "monitor", 15)}${L.test}</button>`;
      }
      if (S.page === "shortcuts") {
        return head("keyboard", L.nav.shortcuts) + `<div class="mx-sec" style="text-transform:none;font-size:13px;letter-spacing:0">${L.shortD}</div><div class="mx-set">${L.keys.map((k, i) => `<div class="mx-pf"><b>${k[0]}</b><span class="mx-key">${k[1].split(" + ").map((x) => `<kbd>${x}</kbd>`).join("")}</span></div>`).join("")}</div>`;
      }
      return head("info", L.nav.about) + `<div class="mx-set"><div style="display:flex;gap:20px;padding:26px;align-items:center"><img src="${logo}" width="84" height="84" alt=""><div><b style="font-size:22px">Mixora</b><div style="color:#9a9db6;font-size:13px;margin:4px 0 10px">${L.ver} 1.1.1 · Kingpindev</div><div style="font-size:14px;line-height:1.5;color:#d0d2e6;max-width:520px">${L.aboutD}</div></div></div></div>`;
    }

    function buildFlyout() {
      const pills = L.profiles.map((n, i) => `<button class="${S.profile === i ? "on" : ""}" data-fprof="${i}">${n}</button>`).join("");
      const rows = GROUPS.map((g) => {
        const open = S.flyOpen[g.id], apps = groupApps(g.id);
        const act = apps.some((a) => a.st === 2);
        return `<div class="mx-fg"><button class="mx-mini" data-fexp="${g.id}" style="width:20px">${ic(open ? "chevD" : "chevR", 14)}</button><span class="t" style="background:linear-gradient(135deg,${g.from},${g.to})">${ic(g.icon, 19, "#10131c", 2.2)}${act ? "<i></i>" : ""}</span><span class="nm">${gname(g.id)}</span>${slider("tvol:" + g.id, g.id, "thin")}<span class="p" data-pt="${g.id}"></span><button class="mx-ico" style="width:34px;height:34px" data-mute="${g.id}"></button></div>${open ? apps.map((a) => `<div class="mx-fa">${tileApp(a, 20)}<span class="nm">${a.name}</span>${slider("tapp:" + a.id, g.id, "thin")}<span class="p" data-pa="${a.id}">${a.trim == null ? 100 : pct(a.trim)}%</span></div>`).join("") : ""}`;
      }).join("");
      return `<div class="mx-fh"><img src="${logo}" alt=""><span>Mixora</span><button class="mx-mini" data-act="open" aria-label="${L.open}">${ic("max", 15)}</button></div><div class="mx-pills">${pills}</div>${rows}
        <div class="mx-fmix"><span style="color:#ff9c5a">${ic("gamepad", 18)}</span>${slider("mix", null, "mid thin").replace("linear-gradient(90deg,#ff7ac6,#ff4ea0)", "linear-gradient(90deg,#ffb36b,#ff5470)")}<span style="color:#4cc4ff">${ic("chat", 18)}</span></div>
        <div class="mx-fmix" style="border:0;padding-top:0;margin:0"><button class="mx-ico" data-micmute></button>${slider("mic", null, "thin")}<span class="p" style="width:42px;text-align:right;font-size:12px;color:#9a9db6" data-micp></span></div>
        <div style="border-top:1px solid rgba(255,255,255,.08);margin-top:8px;padding-top:6px"><button class="mx-fbtn" data-act="open"><span class="q">${ic("max", 16)}</span>${L.open}</button><button class="mx-fbtn" data-go="settings"><span class="q">${ic("gear", 16)}</span>${L.settings}</button><button class="mx-fbtn exit" data-act="exit"><span class="q" style="background:rgba(255,90,110,.16)">${ic("power", 16)}</span>${L.exit}</button></div>`;
    }
    function buildTask() {
      const dots = ["#4285f4", "#5865f2", "#1db954", "#1b2838", "#c084fc"].map((c) => `<span class="app"><span style="width:22px;height:22px;border-radius:7px;background:${c};display:block"></span></span>`).join("");
      task.innerHTML = `<div class="mx-hk"><span>${L.hotkeys}</span><button data-hk="up">Ctrl+Alt+↑ · ${L.hkVol}</button><button data-hk="dn">Ctrl+Alt+↓ · ${L.hkVolD}</button><button data-hk="mute">Ctrl+Alt+M · ${L.hkMute}</button></div>
        <div class="cen"><span class="ic" style="border-radius:7px"></span>${dots}<span class="app ${S.winOpen ? "run" : ""}" data-act="open" style="cursor:pointer"><img src="${logo}" width="24" height="24" alt=""></span></div>
        <div class="mx-tray"><img data-tray class="${S.fly ? "on" : ""}" src="${logo}" alt="${L.tipTray}" title="${L.tipTray}"><span>12:30<br>11/10/2026</span></div>`;
    }
    function buildOsd() {
      const g = G[S.osd.g], sz = [0.85, 1, 1.2][S.ovSize];
      const pos = S.ovPos, col = pos % 3, rw = Math.floor(pos / 3);
      osd.style.transform = `scale(${sz})`; osd.style.transformOrigin = "center";
      osd.style.left = col === 0 ? "24px" : col === 1 ? "calc(50% - 170px)" : "auto"; osd.style.right = col === 2 ? "24px" : "auto";
      osd.style.top = rw === 0 ? "24px" : rw === 1 ? "300px" : "auto"; osd.style.bottom = rw === 2 ? "66px" : "auto";
      osd.style.width = "340px";
      osd.innerHTML = `<span class="t" style="background:linear-gradient(135deg,${g.from},${g.to})">${ic(g.icon, 19, "#10131c", 2.2)}</span><div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:600;margin-bottom:2px">${gname(g.id)}</div>${slider("osdv", g.id, "thin")}</div><span class="p"></span>`;
    }

    // ── render ──
    function renderWin() {
      const views = { main: buildMain, eq: buildEq, settings: buildSettings };
      const extra = S.view === "main" ? `<button class="mx-btn" data-go="eq" style="margin-right:6px">${ic("wave", 15)}${L.eq}</button>` : "";
      win.innerHTML = buildTitle(extra) + `<div class="mx-body"><div class="mx-view on" data-view="${S.view}">${views[S.view]()}</div></div>`;
      win.classList.toggle("off", !S.winOpen);
      if (S.view === "eq") { eqCanvas = win.querySelector(".mx-graph canvas"); eqCtx = eqCanvas.getContext("2d"); win.querySelector("[data-selpt]").innerHTML = selPanel(); sizeEq(); }
      else { eqCanvas = null; }
      updateSliders(); updateVoice();
    }
    function renderFly() { fly.innerHTML = buildFlyout(); fly.classList.toggle("off", !S.fly); updateSliders(); }
    function renderAll() { renderWin(); renderFly(); buildTask(); buildOsd(); updateSliders(); }

    // ── EQ canvas ──
    const GW = 1088, GH = 222, PADL = 44, PADR = 24, PADT = 36, PADB = 26;
    const fx = (f) => PADL + (Math.log(f / 20) / Math.log(1000)) * (GW - PADL - PADR);
    const gy = (g) => PADT + ((12 - clamp(g, -12, 12)) / 24) * (GH - PADT - PADB);
    const xf = (x) => 20 * Math.pow(1000, (x - PADL) / (GW - PADL - PADR));
    const yg = (y) => 12 - ((y - PADT) / (GH - PADT - PADB)) * 24;
    function sizeEq() { if (!eqCanvas) return; const dpr = Math.min(2, (window.devicePixelRatio || 1) * Math.max(1, scale)); eqCanvas.width = GW * dpr; eqCanvas.height = GH * dpr; drawEq(); }
    function drawEq() {
      if (!eqCanvas || !eqCtx) return; const c = eqCtx, e = eqs(), g = G[S.eqTab], dpr = eqCanvas.width / GW;
      c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, GW, GH);
      c.font = "11px 'Segoe UI',sans-serif"; c.textAlign = "center";
      // bands
      BANDS.forEach((b, i) => {
        const x0 = fx(Math.max(20, b[0])), x1 = fx(b[1]), cur = i === bandOf(e.pts[S.eqSel] ? e.pts[S.eqSel].f : 1000);
        if (cur) { c.fillStyle = g.from + "26"; c.fillRect(x0, PADT - 18, x1 - x0, GH - PADT - PADB + 18); }
        c.fillStyle = cur ? g.from : "#7f829b"; c.fillText(L.bands[i], (x0 + x1) / 2, 24);
        c.strokeStyle = "rgba(255,255,255,.06)"; c.setLineDash([3, 4]); c.beginPath(); c.moveTo(x1, PADT - 18); c.lineTo(x1, GH - PADB); c.stroke(); c.setLineDash([]);
      });
      // grid
      c.textAlign = "right"; c.fillStyle = "#7f829b";
      [12, 6, 0, -6, -12].forEach((d) => { c.strokeStyle = d === 0 ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.07)"; c.beginPath(); c.moveTo(PADL, gy(d)); c.lineTo(GW - PADR, gy(d)); c.stroke(); c.fillText((d > 0 ? "+" : "") + d, PADL - 8, gy(d) + 4); });
      c.textAlign = "center";
      [[20, "20"], [50, "50"], [100, "100"], [200, "200"], [500, "500"], [1000, "1k"], [2000, "2k"], [5000, "5k"], [10000, "10k"], [20000, "20k"]].forEach(([f, l]) => { c.strokeStyle = "rgba(255,255,255,.05)"; c.beginPath(); c.moveTo(fx(f), PADT); c.lineTo(fx(f), GH - PADB); c.stroke(); c.fillText(l, fx(f), GH - 8); });
      // curve
      const on = e.on, grad = c.createLinearGradient(0, PADT, 0, GH - PADB); grad.addColorStop(0, g.from + (on ? "55" : "18")); grad.addColorStop(1, g.from + "05");
      c.beginPath(); const N = 220; const ys = [];
      for (let i = 0; i <= N; i++) { const f = 20 * Math.pow(1000, i / N), y = gy(on ? response(e, f) : 0); ys.push(y); const x = fx(f); i ? c.lineTo(x, y) : c.moveTo(x, y); }
      c.save(); c.lineTo(GW - PADR, gy(0)); c.lineTo(PADL, gy(0)); c.closePath(); c.fillStyle = grad; c.fill(); c.restore();
      c.beginPath(); for (let i = 0; i <= N; i++) { const x = fx(20 * Math.pow(1000, i / N)); i ? c.lineTo(x, ys[i]) : c.moveTo(x, ys[i]); }
      c.strokeStyle = on ? g.from : "#6c6f88"; c.lineWidth = 2.2; c.lineJoin = "round"; c.stroke();
      // points
      e.pts.forEach((p, i) => { const x = fx(p.f), y = gy(p.g), sel = i === S.eqSel;
        c.beginPath(); c.arc(x, y, sel ? 8 : 6.5, 0, 7); c.fillStyle = "#f3f3f8"; c.fill(); if (sel) { c.lineWidth = 3; c.strokeStyle = g.to; c.stroke(); } });
      const p = e.pts[S.eqSel]; if (p) { c.textAlign = "left"; c.fillStyle = "#e9eaf2"; c.font = "13px 'Segoe UI',sans-serif"; const b = L.bands[bandOf(p.f)]; c.fillText(`${b.charAt(0) + b.slice(1).toLowerCase()}  ·  ${p.f >= 1000 ? (p.f / 1000).toFixed(2) + " kHz" : Math.round(p.f) + " Hz"}  ·  ${p.g > 0 ? "+" : ""}${p.g.toFixed(1)} dB  ·  Q ${p.q.toFixed(2)}`, PADL + 14, PADT + 6); }
      c.textAlign = "right"; c.fillStyle = "#6f7289"; c.font = "11px 'Segoe UI',sans-serif"; c.fillText(L.drag, GW - PADR - 8, GH - PADB - 8);
    }
    function eqPos(ev) { const r = eqCanvas.getBoundingClientRect(); return [((ev.clientX - r.left) / r.width) * GW, ((ev.clientY - r.top) / r.height) * GH]; }
    function nearest(x, y) { const e = eqs(); let b = -1, bd = 22; e.pts.forEach((p, i) => { const d = Math.hypot(fx(p.f) - x, gy(p.g) - y); if (d < bd) { bd = d; b = i; } }); return b; }
    function refreshSel() { const el = win.querySelector("[data-selpt]"); if (el) el.innerHTML = selPanel(); updateSliders(); drawEq(); }

    // ── behaviours ──
    function applyProfile(i) {
      const p = PROFILES[i % 3]; S.profile = i;
      GROUPS.forEach((g) => { S.g[g.id].vol = p.vols[g.id]; S.g[g.id].mute = false; }); S.mix = p.mix; renderAll();
    }
    function showOsd(gid, ms) { S.osd.g = gid; S.osd.show = true; buildOsd(); osd.classList.remove("off"); updateSliders(); clearTimeout(hideTimer); hideTimer = setTimeout(() => { if (!osdHover) { osd.classList.add("off"); S.osd.show = false; } }, ms || [1500, 2500, 4000][S.ovDur]); }
    let osdHover = false;
    osd.addEventListener("pointerenter", () => { osdHover = true; }); osd.addEventListener("pointerleave", () => { osdHover = false; showOsd(S.osd.g, 1400); });
    function hotkey(k) {
      const c = S.g.game; if (k === "up") { c.vol = clamp(Math.round((c.vol + 0.05) * 100) / 100, 0, 1); c.mute = false; } else if (k === "dn") { c.vol = clamp(Math.round((c.vol - 0.05) * 100) / 100, 0, 1); } else { c.mute = !c.mute; }
      showOsd("game"); updateSliders();
    }
    function closeMenu() { if (menu) { menu.remove(); menu = null; } }
    function openMenu(anchor, items, onPick) {
      closeMenu(); const sr = stage.getBoundingClientRect(), ar = anchor.getBoundingClientRect();
      menu = document.createElement("div"); menu.className = "mx-menu";
      menu.innerHTML = items.map((it, i) => `<button class="${it.cur ? "cur" : ""}" data-mi="${i}">${it.icon || ""}${it.label}</button>`).join("");
      menu.style.left = Math.min((ar.left - sr.left) / scale, 1180 - 230) + "px"; menu.style.top = (ar.bottom - sr.top) / scale + 6 + "px";
      stage.appendChild(menu); menu.addEventListener("click", (e) => { const b = e.target.closest("[data-mi]"); if (b) { const i = +b.dataset.mi; closeMenu(); onPick(items[i], i); } });
    }
    function assign(app, gid) { app.g = gid; if (gid) { S.q = S.q; } renderWin(); renderFly(); }

    // pointer: sliders, drag of apps, eq points
    let slDrag = null;
    root.addEventListener("pointerdown", (e) => {
      const sl = e.target.closest(".mx-sl");
      if (sl) { slDrag = sl; sl.setPointerCapture && sl.setPointerCapture(e.pointerId); moveSlider(e); e.preventDefault(); return; }
      const ap = e.target.closest("[data-app]");
      if (ap && !e.target.closest(".mx-menu")) { drag = { id: ap.dataset.app, x: e.clientX, y: e.clientY, on: false, el: ap }; return; }
      if (eqCanvas && e.target === eqCanvas) {
        const [x, y] = eqPos(e), i = nearest(x, y);
        if (e.button === 2) return;
        if (i >= 0) { S.eqSel = i; eqDrag = i; eqCanvas.setPointerCapture(e.pointerId); refreshSel(); e.preventDefault(); }
      }
    });
    function moveSlider(e) {
      if (!slDrag) return; const r = slDrag.getBoundingClientRect(), a = acc(slDrag.dataset.k); if (!a) return;
      let v = clamp((e.clientX - r.left) / r.width, 0, 1); a.set(v);
      if (slDrag.dataset.k === "osdv") showOsd(S.osd.g, 1800);
      updateSliders(); if (S.view === "eq") drawEq(); if (slDrag.dataset.k === "mix") updateVoice();
      if (/^(bass|voice|treble|pre|tuning|dist|compAmt|aiAmt)$/.test(slDrag.dataset.k)) { updateSliders(); }
    }
    window.addEventListener("pointermove", (e) => {
      if (slDrag) moveSlider(e);
      if (eqDrag != null) { const [x, y] = eqPos(e), p = eqs().pts[eqDrag]; p.f = clamp(xf(x), 20, 20000); p.g = Math.round(clamp(yg(y), -12, 12) * 2) / 2; eqs().preset = null; refreshSel();  }
      if (drag) {
        if (!drag.on && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) {
          drag.on = true; const a = APPS.find((x) => x.id === drag.id); ghost = document.createElement("div"); ghost.className = "mx-ghost"; ghost.innerHTML = tileApp(a, 22) + a.name; document.body.appendChild(ghost);
        }
        if (drag.on) { ghost.style.left = e.clientX + 12 + "px"; ghost.style.top = e.clientY + 8 + "px"; const t = document.elementFromPoint(e.clientX, e.clientY), card = t && t.closest("[data-gcard]"); root.querySelectorAll(".mx-grp").forEach((x) => x.classList.toggle("drop", x === card)); }
      }
    });
    function endPointer(e) {
      slDrag = null;
      if (eqDrag != null) { eqDrag = null; renderEqFav(); }
      if (drag) {
        const was = drag; drag = null;
        if (ghost) { ghost.remove(); ghost = null; }
        root.querySelectorAll(".mx-grp").forEach((x) => x.classList.remove("drop"));
        if (was.on) { const t = document.elementFromPoint(e.clientX, e.clientY), card = t && t.closest("[data-gcard]"), det = t && t.closest(".mx-det"); const a = APPS.find((x) => x.id === was.id); if (card) assign(a, card.dataset.gcard); else if (det) assign(a, null); }
        else {
          const a = APPS.find((x) => x.id === was.id);
          openMenu(was.el, [...GROUPS.map((g) => ({ label: gname(g.id), id: g.id, cur: a.g === g.id, icon: `<span style="display:inline-grid">${ic(g.icon, 15, g.from)}</span>` })), ...(a.g ? [{ label: L.detected.charAt(0) + L.detected.slice(1).toLowerCase(), id: null, icon: ic("x", 15) }] : [])], (it) => assign(a, it.id));
        }
      }
    }
    window.addEventListener("pointerup", endPointer); window.addEventListener("pointercancel", () => { slDrag = null; eqDrag = null; if (ghost) { ghost.remove(); ghost = null; } drag = null; });
    function renderEqFav() { /* keeps preset name when only the curve moved */ const pn = win.querySelector(".mx-prof .pn b"); if (pn && !eqs().preset) pn.firstChild.textContent = L.custom; }
    root.addEventListener("wheel", (e) => { if (eqCanvas && e.target === eqCanvas) { const [x, y] = eqPos(e), i = nearest(x, y); if (i >= 0) { const p = eqs().pts[i]; p.q = clamp(+(p.q * (e.deltaY < 0 ? 1.15 : 0.87)).toFixed(2), 0.3, 12); S.eqSel = i; eqs().preset = null; refreshSel(); e.preventDefault(); } } }, { passive: false });
    root.addEventListener("contextmenu", (e) => { if (eqCanvas && e.target === eqCanvas) { const [x, y] = eqPos(e), i = nearest(x, y); if (i >= 0) { eqs().pts[i].g = 0; S.eqSel = i; eqs().preset = null; refreshSel(); } e.preventDefault(); } });
    root.addEventListener("input", (e) => { if (e.target.matches("[data-q]")) { S.q = e.target.value; const d = root.querySelector("[data-det]"); if (d) d.innerHTML = detectedList(); } });

    function updateVoice() {
      const v = root.querySelectorAll("[data-voice]"); v.forEach((el) => { el.classList.toggle("on", S.chatSpeak > 0.5); el.lastChild.textContent = S.chatSpeak > 0.5 ? L.speaking : L.quiet; });
    }

    root.addEventListener("click", (e) => {
      if (menu && !e.target.closest(".mx-menu")) closeMenu();
      const t = e.target.closest("[data-go],[data-act],[data-mute],[data-tg],[data-page],[data-eqtab],[data-out],[data-prof-menu],[data-fprof],[data-fexp],[data-tray],[data-hk],[data-lib],[data-libclose],[data-libcat],[data-pre],[data-fav],[data-favslot],[data-star],[data-eqreset],[data-flat],[data-ptype],[data-seg],[data-tgt],[data-trig],[data-applyprof],[data-newprof],[data-ovpos],[data-ovtest],[data-lang],[data-micmute]");
      if (!t) return; const d = t.dataset;
      if (d.go !== undefined) { const [v, pg] = d.go.split(":"); S.view = v; if (pg) S.page = pg; S.libOpen = false; S.winOpen = true; renderAll(); }
      else if (d.act === "close") { S.winOpen = false; S.fly = false; renderAll(); }
      else if (d.act === "open") { S.winOpen = true; S.fly = false; renderAll(); }
      else if (d.act === "exit") { S.fly = false; renderFly(); }
      else if (d.mute) { const c = S.g[d.mute]; c.mute = !c.mute; updateSliders(); }
      else if (d.micmute !== undefined) { S.mic.mute = !S.mic.mute; updateSliders(); }
      else if (d.tray !== undefined) { S.fly = !S.fly; fly.classList.toggle("off", !S.fly); buildTask(); tip.style.opacity = 0; }
      else if (d.hk) hotkey(d.hk);
      else if (d.fprof !== undefined) applyProfile(+d.fprof);
      else if (d.fexp) { S.flyOpen[d.fexp] = !S.flyOpen[d.fexp]; renderFly(); }
      else if (d.out) { const g = d.out; openMenu(t, [["def", L.defOut], ["hp", L.hp], ["spk", L.spk]].map(([id, label]) => ({ id, label, cur: S.g[g].out === id })), (it) => { S.g[g].out = it.id; renderWin(); }); }
      else if (d.profMenu !== undefined) { const all = [...L.profiles, ...S.extraProfiles]; openMenu(t, all.map((n, i) => ({ label: n, cur: i === S.profile })), (it, i) => applyProfile(i)); }
      else if (d.eqtab) { S.eqTab = d.eqtab; S.eqSel = 1; renderWin(); }
      else if (d.tg) toggleKey(d.tg, t);
      else if (d.page) { S.page = d.page; renderWin(); }
      else if (d.lib !== undefined) { S.libOpen = true; win.querySelector("[data-lib-box]").classList.add("on"); }
      else if (d.libclose !== undefined) { S.libOpen = false; win.querySelector("[data-lib-box]").classList.remove("on"); }
      else if (d.libcat !== undefined) { S.libCat = +d.libcat; renderWin(); }
      else if (d.pre) { const p = preset(d.pre), e2 = eqs(); e2.preset = p.id; e2.pts = clone(p.pts); S.libOpen = false; S.eqSel = 5; renderWin(); }
      else if (d.fav) { const p = preset(d.fav), e2 = eqs(); e2.preset = p.id; e2.pts = clone(p.pts); renderWin(); }
      else if (d.star !== undefined) { const id = eqs().preset, f = S.favs[S.eqTab]; const i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else if (f.length < 6) f.push(id); renderWin(); }
      else if (d.eqreset) { const e2 = eqs(); e2.preset = null; e2.pts = FLAT(); e2.bass = e2.voice = e2.treble = e2.pre = 0; renderWin(); }
      else if (d.flat !== undefined) { eqs().pts[S.eqSel].g = 0; eqs().preset = null; refreshSel(); }
      else if (d.ptype) { eqs().pts[S.eqSel].t = d.ptype; eqs().preset = null; refreshSel(); }
      else if (d.seg) { const [k, v] = d.seg.split(":"), n = +v; if (k === "amt") S.duck.amt = [30, 50, 70, 90][n]; else if (k === "sens") S.duck.sens = n; else if (k === "theme") S.theme = n; else if (k === "ovsize") { S.ovSize = n; buildOsd(); } else if (k === "ovdur") S.ovDur = n; renderWin(); }
      else if (d.tgt) { S.duck.targets[d.tgt] = !S.duck.targets[d.tgt]; renderWin(); }
      else if (d.trig !== undefined) openMenu(t, GROUPS.map((g) => ({ id: g.id, label: gname(g.id), cur: S.duck.trigger === g.id })), (it) => { S.duck.trigger = it.id; renderWin(); });
      else if (d.applyprof) applyProfile(+d.applyprof);
      else if (d.newprof !== undefined) { S.extraProfiles.push(L.newProf + " " + (S.extraProfiles.length + 1)); PROFILES.push({ vols: Object.fromEntries(GROUPS.map((g) => [g.id, S.g[g.id].vol])), mix: S.mix }); S.profile = 2 + S.extraProfiles.length; renderWin(); }
      else if (d.ovpos !== undefined) { S.ovPos = +d.ovpos; buildOsd(); showOsd("game"); renderWin(); }
      else if (d.ovtest !== undefined) showOsd("game", 2500);
      else if (d.lang) { L = T[d.lang]; tip.textContent = L.tutorial; renderAll(); }
    });
    function toggleKey(k, el) {
      if (k === "duck") S.duck.on = !S.duck.on; else if (k === "meters") S.meters = !S.meters; else if (k === "autoUpd") S.autoUpd = !S.autoUpd;
      else if (k.startsWith("gen:")) { const i = +k.slice(4); S.gen[i] = !S.gen[i]; }
      else if (k === "eqon") eqs().on = !eqs().on; else if (k === "auto") eqs().auto = !eqs().auto; else if (k === "surround") eqs().surround = !eqs().surround; else if (k === "comp") eqs().comp = !eqs().comp; else if (k === "ai") eqs().ai = !eqs().ai;
      renderWin();
    }

    // ── live loop: meters and auto-lowering ──
    let last = performance.now(), t0 = last, nextSpeak = 4;
    function frame(now) {
      requestAnimationFrame(frame); if (!visible || document.hidden) { last = now; return; }
      const dt = Math.min(0.1, (now - last) / 1000); last = now; const tt = (now - t0) / 1000;
      // friend speaks in Discord: 3.6 s every 9 s
      const speaking = tt % 9 > 4 && tt % 9 < 7.6 ? 1 : 0;
      const prev = S.chatSpeak; S.chatSpeak += (speaking - S.chatSpeak) * Math.min(1, dt * (speaking ? 6 : 2.5));
      if ((prev > 0.5) !== (S.chatSpeak > 0.5)) updateVoice();
      const duckAmt = S.duck.on ? (S.duck.amt / 100) * S.chatSpeak : 0; S.ducking = duckAmt;
      GROUPS.forEach((g) => {
        const act = groupApps(g.id).some((a) => a.st === 2);
        const target = g.id === "chat" ? (S.chatSpeak > 0.5 ? 0.55 + Math.sin(tt * 9) * 0.2 + Math.sin(tt * 23) * 0.12 : 0.04) : act ? 0.5 + Math.sin(tt * (3 + g.id.length)) * 0.22 + Math.sin(tt * 11 + g.id.length) * 0.15 : 0.02;
        const lowered = g.id !== S.duck.trigger && S.duck.targets[g.id] ? 1 - duckAmt : 1;
        S.lvl[g.id] += (clamp(target, 0, 1) - S.lvl[g.id]) * Math.min(1, dt * 14);
        const c = S.g[g.id], eff = c.mute ? 0 : c.vol * lowered;
        const m = root.querySelector(`[data-meter="${g.id}"]`); if (m) m.style.width = (S.meters ? clamp(S.lvl[g.id] * eff, 0, 1) * 100 : 0) + "%";
        const b = root.querySelector(`[data-duckb="${g.id}"]`); if (b) { const on = lowered < 0.98; b.style.opacity = on ? 1 : 0; if (on) b.textContent = "−" + Math.round((1 - lowered) * 100) + "% " + L.ducked; }
      });
    }
    if ("IntersectionObserver" in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0.05 }).observe(root);
    window.addEventListener("resize", () => { fit(); sizeEq(); });
    root.addEventListener("pointerdown", () => { tip.style.opacity = 0; }, { once: true });
    renderAll(); fit(); requestAnimationFrame(frame);
    if ("ResizeObserver" in window) new ResizeObserver(() => { fit(); }).observe(root);
  }

  window.MixoraDemo = {
    mount(root, opts) {
      opts = opts || {}; if (root.__mounted) return; root.__mounted = true; injectCss();
      root.classList.add("mx-demo"); L = T[opts.lang === "tr" ? "tr" : "en"];
      Demo(root, opts.logo || "/img/FluentMixer.png");
    },
  };
})();
