/* English for kingpindev.com (index.html and legacy.html).
   The pages are written in Turkish. In English mode every text node and the alt, title,
   aria-label and placeholder attributes are looked up in EN below (exact match, ignoring
   surrounding whitespace), then in RULES for lines with numbers or names in them. A
   MutationObserver does the same for anything the page renders later (app cards,
   terminal output, live Discord/Spotify status, achievement toasts).
   Language: ?lang=en|tr, else the last choice, else Turkish when Turkish is among the
   browser languages or the time zone is Türkiye, English otherwise. Browser machine
   translation is switched off (translate="no"): it mangles names like Groupy. The toggle is any [data-kpd-lang-toggle].
   To add text: add the Turkish string and its English version to EN. */
(function () {
  "use strict";
  var KEY = "kpd-lang";
  var params = new URLSearchParams(location.search);
  var lang = params.get("lang");
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
  if (lang !== "en" && lang !== "tr") {
    var bot = /bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent);
    // Turkish for bots and for anyone who lists Turkish among their languages or is on
    // Türkiye time (many Turkish users run an English browser).
    var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).join(",");
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* ignore */ }
    var turkish = /(^|,)tr\b/i.test(langs) || /^(Europe|Asia)\/Istanbul$/.test(tz);
    lang = saved || (bot || turkish ? "tr" : "en");
  } else {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
  }
  window.KPD_LANG = lang;
  var root = document.documentElement;
  root.lang = lang;

  // Toggle links work in both languages.
  function wireToggles() {
    document.querySelectorAll("[data-kpd-lang-toggle]").forEach(function (a) {
      var other = lang === "en" ? "tr" : "en";
      a.textContent = other.toUpperCase();
      a.setAttribute("lang", other);
      a.setAttribute("aria-label", other === "en" ? "Switch to English" : "Türkçeye geç");
      var u = new URL(location.href);
      u.searchParams.set("lang", other);
      a.href = u.pathname + u.search + u.hash;
      a.addEventListener("click", function () { try { localStorage.setItem(KEY, other); } catch (e) { /* ignore */ } });
    });
  }
  if (lang === "tr") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wireToggles); else wireToggles();
    return;
  }

  // Hide the Turkish first paint while it is translated.
  root.classList.add("i18n-pending");
  var hide = document.createElement("style");
  hide.textContent = "html.i18n-pending body{visibility:hidden}";
  (document.head || root).appendChild(hide);
  setTimeout(function () { root.classList.remove("i18n-pending"); }, 1500);

  var EN = {
    // ── page head
    "Kingpindev — Interactive Digital Universe": "Kingpindev — Interactive Digital Universe",
    "Kingpindev, bağımsız geliştirici Burak PEKEL'in dijital kimliği: Windows uygulamaları, web servisleri, sinematik video editleri ve UI/UX tasarımı.": "Kingpindev is the digital identity of independent developer Burak PEKEL: Windows apps, web services, cinematic video edits and UI/UX design.",
    "Burak PEKEL | kingpin1dev": "Burak PEKEL | kingpin1dev",

    // ── navigation
    "Burak PEKEL'in dijital evreni": "Burak PEKEL's digital universe",
    "Uygulamalar": "Apps", "Sistem": "Setup", "Kreatif": "Creative", "Aktivite": "Activity", "İletişim": "Contact",
    "Keşfet": "Explore", "Ana menü": "Main menu", "Ana Sayfa": "Home", "Projeler": "Projects",

    // ── hero
    "Yazılım Geliştirici • Video Editörü • Dijital Üretici": "Software Developer • Video Editor • Digital Creator",
    "Burada sadece site yok.": "Not just a website.",
    "Kingpindev evreni var.": "The Kingpindev universe.",
    "Kingpindev, Türkiye merkezli bağımsız geliştirici Burak PEKEL'in dijital kimliğidir. Windows uygulamaları, web servisleri, sinematik video editleri ve UI/UX tasarımı alanlarında çalışmalar üretmektedir.":
      "Kingpindev is the digital identity of Burak PEKEL, an independent developer based in Türkiye, building Windows apps, web services, cinematic video edits and UI/UX design.",
    "Evrene Gir": "Enter the universe",
    "Geliştir. Tasarla. Yayınla.": "Build. Design. Ship.",
    "Her proje bir fikrin gerçeğe dönüşmüş hali.": "Every project is an idea made real.",
    "Oyun": "Gaming",
    "Windows sesini gruplara ayıran modern kontrol merkezi.": "A modern control center that groups Windows audio.",
    "Anonim, hızlı ve kalıcı geçici e-posta deneyimi.": "Anonymous, fast temporary email that sticks around.",
    "Sinematik editler ve yaratıcı video üretimi.": "Cinematic edits and creative video work.",
    "Ana Sistem": "Main Rig",
    "Kaydır": "Scroll",
    "Yetenekler": "Skills",

    // ── apps section
    "Uygulama Galaksisi": "App Galaxy",
    "Her uygulama ayrı bir gezegen.": "Every app is its own planet.",
    "Her proje, günlük yazılım deneyimini daha akıcı ve kullanışlı hale getirmek için geliştirildi. Windows araçlarından web servislerine kadar uzanan ekosistem burada.":
      "Every project was built to make everyday software smoother and more useful. Here is the whole ecosystem, from Windows tools to web services.",
    "Windows Uygulaması": "Windows App", "E-posta Servisi": "Email Service", "Discord Botu": "Discord Bot",
    "Microsoft Store": "Microsoft Store", "Tanıtım Sayfası": "Product page", "Tüm Uygulamalar": "All apps", "Siteyi Aç": "Open site", "Bot Sayfası": "Bot page",
    "Ürünü İncele": "View app",
    "Groupy, uygulamaları Oyun, Sohbet, Medya ve Aux gibi gruplara ayırıp her grubun sesini, sessize alma durumunu ve çıkış cihazını tek yerden yönetmenizi sağlayan bir Windows ses mikseridir. Tepsi panelinden tek tıkla açılır; ChatMix ile oyun ve sohbet sesini dengeler, kısayol tuşlarıyla oyundan çıkmadan ayarlanır.":
      "Groupy is a Windows volume mixer that puts your apps into groups like Game, Chat, Media and Aux, so you can control each group's volume, mute and output device from one place. It opens with one click from the tray, balances game and chat with ChatMix, and adjusts with hotkeys without leaving your game.",
    "BokMail, kişisel e-posta adresinizi paylaşmadan, çevrimiçi platformlara kayıt olmanızı sağlayan ücretsiz bir geçici (temp) e-posta servisidir. Bu hizmet sayesinde spam maillerden, istenmeyen bültenlerden ve kişisel verilerinizi riske atmaktan kolayca kurtulabilirsiniz.":
      "BokMail is a free temporary email service that lets you sign up for online platforms without sharing your personal address. It keeps spam, unwanted newsletters and risks to your personal data away from your real inbox.",
    "Notchify, ekranınızın üst kısmına Dinamik Ada ekleyen şık bir kişiselleştirme uygulamasıdır. Arka planda çalan müzikleri, işlemci performansını ve anlık bildirimleri ekranı kaplamadan tek bir panelden takip etmenizi sağlar. Dosya sürükleyip saklayabileceğiniz pratik bir çekmece ve hava durumu gibi araçları tek bir modern arayüzde birleştirir.":
      "Notchify adds a Dynamic Island to the top of your screen. Follow the music playing in the background, your CPU and live notifications from one panel without covering the screen, with a handy shelf for dragging files and tools like weather, all in one modern interface.",
    "LunaDock, Windows masaüstünüzdeki dosya, klasör ve kısayolları otomatik olarak düzenli yığınlara ayırır. Bir yığına tıklayınca açılır, tekrar tıklayınca toplanır. Türe ya da tarihe göre gruplayın, 20’den fazla ikon paketinden seçin ve yığınları ekranın istediğiniz kenarına yerleştirin. Dosyalarınız yerinden oynamaz.":
      "LunaDock automatically sorts the files, folders and shortcuts on your Windows desktop into tidy stacks. Click a stack to open it, click again to tuck it away. Group by type or date, pick from more than 20 icon packs and place the stacks on any edge of the screen. Your files never move.",
    "VICE Sonar, SteelSeries GG Sonar ses yazılımını daha hızlı yönetmek için geliştirilmiş hafif bir masaüstü kontrol aracıdır. Büyük ana uygulamayı açmaya gerek kalmadan; oyun, sohbet, medya kanallarının ses seviyelerini ve ekolayzır profillerini ekran üzerindeki küçük bir widget vasıtasıyla anında değiştirmenizi sağlar.":
      "VICE Sonar is a lightweight desktop control for SteelSeries GG Sonar. Without opening the full app, change the levels of your game, chat and media channels and switch EQ profiles instantly from a small on-screen widget.",
    "GlideSnap, Linux sistemlerindeki pencere yönetimini Windows ortamına getiren ve sadece \"Alt\" tuşunu basılı tutarak pencereleri farenin herhangi bir yeriyle kolayca sürükleyip yeniden boyutlandırmanızı sağlayan bir uygulamadır. Basit fare hareketleriyle pencereleriniz üzerinde tam kontrol sağlar.":
      "GlideSnap brings Linux-style window management to Windows: hold \"Alt\" and drag or resize any window from anywhere inside it. Simple mouse moves give you full control over your windows.",
    "vOrganizer, dağınık indirilenler ve masaüstü klasörlerindeki dosyaları (Görseller, Belgeler, Videolar ve Müzikler gibi) otomatik olarak temiz kategorilere ayıran bir Windows uygulamasıdır. Bu aracı kullanarak karmaşık klasörlerinizi saniyeler içinde düzenli alanlara dönüştürebilirsiniz.":
      "vOrganizer is a Windows app that sorts the files in messy Downloads and Desktop folders into clean categories such as Images, Documents, Videos and Music. Turn cluttered folders into tidy ones in seconds.",
    "Aurora Radios, Windows kullanıcıları için geliştirilmiş modern ve şık bir internet radyosu oynatıcısıdır. Geliştiricisi Kingpindev olan bu uygulama, tamamen ücretsiz, reklamsız ve hesap oluşturma zorunluluğu olmadan kullanılabilir.":
      "Aurora Radios is a modern, stylish internet radio player for Windows by Kingpindev. It is free, has no ads and needs no account.",
    "Goliath, Discord sunucuları için geliştirilmiş çok amaçlı bir bottur. Moderasyon, seviye sistemi, müzik/radyo yayını, yardım paneli ve çeşitli kullanışlı komutlarla sunucu yönetimini kolaylaştırır. Kısaca, sunucuyu daha düzenli, eğlenceli ve kullanışlı hale getirmek için çalışır.":
      "Goliath is a multi-purpose Discord bot. Moderation, a level system, music and radio, a help panel and handy commands make running a server easier, and keep it organized, fun and useful.",
    // tags
    "Oyun / Sohbet / Medya / Aux": "Game / Chat / Media / Aux", "Tepsi Paneli": "Tray panel", "Profiller": "Profiles", "Kısayol Tuşları": "Hotkeys",
    "Şifresiz": "No password", "Kalıcı Depolama": "Persistent inbox", "Anonim": "Anonymous", "Spam Koruması": "Spam protection",
    "Akıcı Animasyonlar": "Smooth animations", "Bildirimler": "Notifications", "Medya Kontrolü": "Media controls", "Kısayollar": "Shortcuts",
    "Takvim": "Calendar", "Hava Durumu": "Weather", "Tepsi": "Tray",
    "Otomatik Yığınlar": "Automatic stacks", "Türe / Tarihe Göre": "By type / date", "20+ İkon Paketi": "20+ icon packs", "Dört Kenar": "Any edge", "Çoklu Monitör": "Multi-monitor",
    "Ses Kontrolü": "Audio control", "EQ Profilleri": "EQ profiles", "7 Tema": "7 themes",
    "Alt+Sürükle": "Alt+Drag", "Opaklık Kontrolü": "Opacity control", "Sistem Tepsisi": "System tray",
    "Otomatik Sıralama": "Auto sorting", "Dosya Türleri": "File types", "İndirilenler": "Downloads", "Hızlı": "Fast", "Dosya Düzeni": "File order", "Kategoriler": "Categories",
    "Online Radyo": "Online radio", "Şarkı": "Songs", "Favoriler": "Favorites",
    "Moderasyon": "Moderation", "Seviye Sistemi": "Level system", "Müzik / Radyo": "Music / Radio", "Yardım Paneli": "Help panel", "Komutlar": "Commands",
    "moderasyon": "moderation", "müzik · radyo": "music · radio",
    // SpotiDrop and Lolable cards
    "SpotiDrop, YouTube, SoundCloud ve Bandcamp gibi kaynaklardaki müzikleri etiketli ve kapak görselli şekilde Spotify'ın Yerel Dosyalar klasörüne indiren bir Windows uygulamasıdır. Spotify sekmesi, bir şarkı, albüm veya çalma listesi bağlantısının herkese açık meta verilerini okuyup elinizdeki ses dosyalarını etiketler; hesap gerektirmez ve Spotify'dan ses indirilmez. Yalnızca indirme hakkına sahip olduğunuz içerikler için kullanın.":
      "SpotiDrop is a Windows app that downloads music from sources such as YouTube, SoundCloud and Bandcamp into Spotify's Local Files folder, tagged and with cover art. The Spotify tab reads the public metadata of a track, album or playlist link and tags the audio files you already have; it needs no account, and no audio is downloaded from Spotify. Only use it for content you have the right to download.",
    "Lolable, League of Legends oyuncuları için geliştirilmiş bir Discord istatistik botudur. Riot ID'nizi Discord hesabınıza bağlayıp rank, LP, şampiyon ustalığı ve son maç performansınızı görebilir, sunucudaki arkadaşlarınızla liderlik tablosunda yarışabilir ve canlı maçlar için takım ranklarını, formları ve ban önerilerini içeren bir scouting raporu alabilirsiniz. Riot Games tarafından onaylanmış veya desteklenen bir proje değildir.":
      "Lolable is a Discord stats bot for League of Legends players. Link your Riot ID to your Discord account to see your rank, LP, champion mastery and recent match performance, compete with friends on your server's leaderboard, and get a scouting report for live matches with team ranks, form and ban suggestions. It is not approved or supported by Riot Games.",
    "Yerel Dosyalar": "Local Files", "Kapak + Etiket": "Cover + tags", "Hesapsız": "No account", "yt-dlp + ffmpeg dahil": "yt-dlp + ffmpeg included",
    "Riot ID Bağlama": "Riot ID linking", "Canlı Maç Raporu": "Live match report", "Liderlik Tablosu": "Leaderboard", "Duo Bulucu": "Duo finder", "Şampiyon Havuzu": "Champion pool",
    "Botu Ekle": "Add bot", "İndir · Windows (122 MB)": "Download · Windows (122 MB)", "Gizlilik Politikası": "Privacy Policy", "Kullanım Şartları": "Terms of Service",
    "Arama": "Search", "sırada": "queued", "scouting · ban önerisi": "scouting · ban suggestions",
    // card previews
    "Hesabınızı doğrulayın": "Verify your account", "az önce": "just now", "Haftanın fırsatları": "Deals of the week",
    "Giriş kodunuz: 4821": "Your login code: 4821", "3 dk": "3 min", "12 dk": "12 min",
    "Adanın üzerine gel": "Hover the island",
    "Adaya dokun": "Tap the island",
    "Notchify canlı demo: ekranın üstünde şarkı sözlerini gösteren ada. Müzik oynatıcıyı açmak için üzerine gelin.": "Notchify live demo: an island at the top of the screen showing lyrics. Hover it to open the music player.",
    "vOrganizer canlı demo": "vOrganizer live demo", "Aurora Radios canlı demo": "Aurora Radios live demo",

    // ── rig + terminal
    "Kod, kurgu ve oyun için güç odası.": "A powerhouse for code, editing and games.",
    "Geliştirme, kurgu ve oyun için tasarlanmış yüksek performanslı sistem. Her bileşen hem iş akışına hem de estetik anlayışa göre seçildi.":
      "A high-performance machine built for development, editing and gaming. Every part was picked for the workflow and for the looks.",
    "İpucu:": "Tip:", "yazıp Enter'a bas.": "and press Enter.", "Terminal komut girişi": "Terminal command input",
    "Komutlar: help whoami neofetch ls sosyal iletisim hire spotify steam now stack theme tarih uptime ping cowsay credits echo clear · [dev] boot matrix snake secret":
      "Commands: help whoami neofetch ls social contact hire spotify steam now stack theme date uptime ping cowsay credits echo clear · [dev] boot matrix snake secret",
    "Komutlar: help · whoami · neofetch · ls · sosyal · iletisim · hire · spotify · steam · now · theme · tarih · echo <metin> · clear":
      "Commands: help · whoami · neofetch · ls · social · contact · hire · spotify · steam · now · theme · date · echo <text> · clear",
    "Burak PEKEL — bağımsız geliştirici. Windows uygulamaları, web servisleri, sinematik video edit ve UI/UX tasarımı.": "Burak PEKEL — independent developer. Windows apps, web services, cinematic video edits and UI/UX design.",
    "İletişim penceresi açılıyor...": "Opening the contact window...",
    "Durum: yeni projelere ve işbirliklerine açık ✅": "Status: open to new projects and collaborations ✅",
    "Bir fikir mi var? 'iletisim' yaz ya da admin@kingpindev.com.": "Got an idea? Type 'contact' or write to admin@kingpindev.com.",
    "🎧  Şu an bir şey çalmıyor.": "🎧  Nothing playing right now.",
    "🎮  170 oyun · 39 tam bitirilmiş · 9.815 başarım · %71 tamamlama": "🎮  170 games · 39 fully completed · 9,815 achievements · 71% completion",
    "   geliştir · tasarla · yayınla — ve biraz da eğlen.": "   build · design · ship — and have some fun.",
    "☕  Kahve hazırlanıyor... kafeinsiz kod derlenmez.": "☕  Brewing coffee... code won't compile without caffeine.",
    "Matrix'e hoş geldin, Neo.": "Welcome to the Matrix, Neo.",
    "Tasarım & geliştirme: Burak PEKEL (Kingpindev).": "Design & development: Burak PEKEL (Kingpindev).",
    "Yıldızlar, terminal ve kahvenin katkılarıyla. ✦": "With help from the stars, the terminal and coffee. ✦",
    "pong 🏓  (0.42ms — ışık hızında)": "pong 🏓  (0.42ms — light speed)",
    "Bağlanılıyor: yıldız haritası ...": "Connecting: star map ...",
    "Modüller yükleniyor: uygulamalar, kreatif, aktivite": "Loading modules: apps, creative, activity",
    "Kişilik enjekte ediliyor ...": "Injecting personality ...",
    "Sistem hazır. Hoş geldin. ✦": "System ready. Welcome. ✦",
    "xyzzy... hiçbir şey olmadı. ya da oldu? 👀": "xyzzy... nothing happened. or did it? 👀",
    "🔓 Geliştirici modu açık — 'help' ile yeni komutları gör.": "🔓 Developer mode on — see the new commands with 'help'.",
    "İzin verildi ✅ Sözleşme hazırlanıyor...": "Permission granted ✅ Preparing the contract...",
    "🥪  Poof! Buyur, sandviçin hazır.": "🥪  Poof! Here's your sandwich.",
    "Kendin yap. 🥪": "Make it yourself. 🥪",
    "siliniyor: / ...": "deleting: / ...", "siliniyor: /home ...": "deleting: /home ...", "siliniyor: /evren ...": "deleting: /universe ...",
    "Şaka şaka 😄 hiçbir şey silinmedi.": "Just kidding 😄 nothing was deleted.",
    "Nice try. Bu sistem senden daha inatçı. 🧱": "Nice try. This system is more stubborn than you. 🧱",
    "psst… gece 3'te yazılan kod, sabah 9'da okunmaz. yine de yazarız. 🌙": "psst… code written at 3 AM is unreadable at 9 AM. we write it anyway. 🌙",
    "Bu terminalde sudo yok — ama denemen hoştu 😏": "There's no sudo in this terminal — but nice try 😏",
    "geri dönmek için: clear": "to go back: clear",
    "Yön: ok tuşları / WASD · Çıkış: Esc": "Move: arrow keys / WASD · Quit: Esc",
    "ay, kalp ve güneş": "moon, heart and sun",
    // achievements
    "Başarım Açıldı": "Achievement unlocked", "Taç Sende ♛": "You've Got the Crown ♛", "Matrix Yağmuru": "Matrix Rain", "Konami Kodu": "Konami Code",
    "Yılan Ustası": "Snake Master", "Gizli Geçit": "Secret Passage", "Geliştirici Modu": "Developer Mode", "İşe Alındın": "You're Hired",
    "Sudo Şefi": "Sudo Chef", "Cesur Ama Boşuna": "Brave but Pointless", "Gizli Satır": "Hidden Line", "Gizli Kelime: burak": "Secret Word: burak",

    // ── creative
    "Kreatif Evren": "Creative Universe",
    "Kodun yanında görüntü de var.": "There's more than code here.",
    "Video kurgu, film editleri ve müzik üretimlerim.": "My video editing, film edits and music.",
    "Film sahnelerine hayat verdiğim, sinematografik video edit sayfam.": "My cinematic edit page, where film scenes come alive.",
    "Sayfayı İncele": "View page",
    "Zaman zaman hobi olarak ürettiğim ve yayınladığım parçalar.": "Tracks I produce and release from time to time as a hobby.",
    "Spotify'da Dinle": "Listen on Spotify",
    "@sineorbit'ten Öne Çıkan Editler": "Featured edits from @sineorbit",
    "Tümünü Gör": "See all",

    // ── activity
    "Canlı Kimlik": "Live Identity",
    "Aktivite, profil ve oyun izi.": "Activity, profiles and gaming.",
    "Steam koleksiyonu, Xbox profili ve anlık sosyal sinyal noktalarını bir araya getiren kişisel aktivite alanı.": "A personal activity space bringing together my Steam collection, Xbox profile and live status.",
    "Çevrimiçi": "Online", "Boşta": "Idle", "Rahatsız Etmeyin": "Do Not Disturb", "Çevrimdışı": "Offline",
    "Kodlama": "Coding", "Şu an kod yazmıyor": "Not coding right now", "Şu an çalmıyor": "Nothing playing",
    "Steam • PC Oyuncusu": "Steam • PC Gamer", "Xbox • Konsol & PC": "Xbox • Console & PC",
    "Kişisel Oyun Vitrini": "Personal Game Showcase", "ID: KINGPIN • OYUNCU PROFİLİ": "ID: KINGPIN • PLAYER PROFILE",
    "Profile Git": "Go to profile", "Sahip olunan oyun": "Games owned", "%100 tamamlanan": "100% completed",
    "Kazanılan başarım": "Achievements earned", "Bitirme oranı": "Completion rate",
    "Kütüphane Özetim": "Library Highlights", "Koleksiyon Başarımları": "Collection Achievements", "Steam Seviyesi": "Steam Level",
    "Başarım": "Achievement",

    // ── contact + footer
    "Bağlantıda": "Let's stay", "kalalım.": "in touch.",
    "Projelerim hakkında konuşmak veya işbirliği yapmak için bana ulaşabilirsin.": "Reach out to talk about my projects or to work together.",
    "E-posta Gönder": "Send email", "E-posta": "Email", "Bana ulaş": "Get in touch",
    "Proje, işbirliği ya da sadece bir merhaba için.": "For a project, a collaboration or just to say hi.",
    "Kapat": "Close",

    // ── mobile page (legacy.html)
    "Software Developer & Video Editor": "Software Developer & Video Editor",
    "Yaratıcı uygulamaları geliştirmeyi ve fikirleri gerçeğe dönüştürmeyi seviyorum. Aynı zamanda video kurgu ve UI/UX tasarımı tutkunu bir geliştirici ve video editörüyüm. Güncel olarak Groupy, Aurora Radios ve Spotidrop projeleri üzerinde çalışmaktayım.":
      "I love building creative apps and turning ideas into reality. I'm also a developer and video editor with a passion for video editing and UI/UX design. Right now I'm working on Groupy, Aurora Radios and Spotidrop.",
    "Projeleri İncele": "View projects", "Öne Çıkan Projeler": "Featured Projects", "Güncel projelerim.": "My current projects.",
    "Microsoft Store Profilim": "My Microsoft Store profile", "Siteyi Ziyaret Et": "Visit site", "Tanıtım": "Details",
    "Gerçek e-posta adresinizi koruyun. Şifresiz, anında aktif, kalıcı saklama destekli anonim geçici e-posta servisi. Kayıt gerektirmez, doğrulama yok.":
      "Protect your real email address. An anonymous temporary email service with no password, instant activation and a persistent inbox. No sign-up, no verification.",
    "Windows için Dynamic Island tarzı masaüstü overlay. Fizik tabanlı animasyonlar, modüler widget'lar (hava durumu, medya, sistem istatistikleri) ve 10 dil desteğiyle macOS'tan ilham alan bir deneyim.":
      "A Dynamic Island style desktop overlay for Windows. Physics-based animations, modular widgets (weather, media, system stats) and 10 languages in a macOS-inspired experience.",
    "Masaüstündeki dosya, klasör ve kısayolları otomatik olarak düzenli yığınlara ayırır. Yığına tıklayınca açılır, tekrar tıklayınca toplanır. Türe ya da tarihe göre gruplama, 20'den fazla ikon paketi ve ekranın dört kenarına yerleşim. Dosyalarınız yerinden oynamaz.":
      "Sorts the files, folders and shortcuts on your desktop into tidy stacks automatically. Click a stack to open it, click again to tuck it away. Group by type or date, 20+ icon packs, stacks on any edge of the screen. Your files never move.",
    "SteelSeries GG Sonar için hafif masaüstü widget'ı. Ses kanalları, EQ profilleri ve RGB aydınlatmayı ana uygulamayı açmadan, görev çubuğuna ihtiyaç duymadan yönet.":
      "A lightweight desktop widget for SteelSeries GG Sonar. Control audio channels, EQ profiles and RGB lighting without opening the main app or cluttering the taskbar.",
    "GlideSnap, basit fare hareketleriyle pencereleriniz üzerinde tam kontrol sağlar. Anında kontrolü ele alın.": "GlideSnap gives you full control over your windows with simple mouse moves. Take control instantly.",
    "vOrganizer, dağınık klasörleri saniyeler içinde temiz ve düzenli alanlara dönüştürmenize yardımcı olur. Klasörlerinizi dosya türlerine göre otomatik olarak sıralar ve organize eder.":
      "vOrganizer turns messy folders into clean, organized spaces in seconds, sorting your files by type automatically.",
    "Ses çıkaran uygulamaları Game / Chat / Media / Aux gruplarına atayın, seslerini ve mute durumunu tek yerden yönetin. Sistem tepsisi, flyout panel ve kısayol tuşlarıyla tam kontrol.":
      "Assign apps that play sound to Game / Chat / Media / Aux groups and manage their volume and mute from one place. Full control from the tray, the flyout panel and hotkeys.",
    "Ses Grupları": "Audio groups", "Çıkış Cihazı": "Output device",
    "Ruh haline, türe veya ülkeye göre dünya çapında binlerce internet radyosunu keşfet ve tek tıkla dinle. Çalan şarkıyı anında gör, beğen ve dilediğin müzik platformunda aç; sevdiğin istasyonları kaydet, kaldığın yerden devam et.":
      "Discover thousands of internet radio stations worldwide by mood, genre or country and listen with one click. See the song that's playing, like it and open it on your favorite music platform; save the stations you love and pick up where you left off.",
    "Donanım & Ekipman": "Hardware & Gear",
    "Yüksek performanslı kod derleme, akıcı video kurgu süreçleri ve sağlam bir oyun deneyimi için özenle topladığım güncel sistemim.": "My current setup, put together carefully for fast builds, smooth video editing and solid gaming.",
    "Canlı Aktivite": "Live Activity", "Anlık aktivite ve oyuncu profillerim.": "My live activity and gaming profiles.",
    "Spotify Kapalı": "Spotify offline", "VS Code Kapalı": "VS Code offline", "PC Oyuncusu": "PC Gamer", "Profili Gör": "View profile",
    "Konsol & PC": "Console & PC", "PROFİLE GİT": "GO TO PROFILE", "Sahip Olunan Oyun": "Games owned", "%100 Tamamlanan": "100% completed",
    "Kazanılan Başarım": "Achievements earned", "Bitirme Oranı": "Completion rate", "Bağlantıda Kalalım": "Let's Stay in Touch",
    "Canlı Discord Durumu": "Live Discord status", "Dinliyor:": "Listening:", "Şu An Dinliyor": "Listening now", "Şu An Kodluyor": "Coding now",
    "Dosya düzenleniyor": "Editing a file", "Albüm": "Album",
  };

  // Lines that carry a number or a name.
  var STATUS = { "çevrimiçi": "online", "boşta": "idle", "rahatsız etmeyin": "do not disturb", "çevrimdışı": "offline" };
  var RULES = [
    [/^komut bulunamadı: (.+) — 'help' dene$/, "command not found: $1 — try 'help'"],
    [/^Kingpindev (\d+) yıldır bu evrende kod yazıyor\.$/, "Kingpindev has been coding in this universe for $1 years."],
    [/^🎨  Yıldız teması değişti \(hue (\d+)°\)\. Sıfırlamak için tekrar döndür\.$/, "🎨  Star theme changed (hue $1°). Keep rotating to reset."],
    [/^Discord: (çevrimiçi|boşta|rahatsız etmeyin|çevrimdışı)/, function (m, s) { return "Discord: " + STATUS[s]; }],
    [/ · Kodluyor: /, " · Coding: "],
    [/OYUN BİTTİ · Skor: (\d+)/, "GAME OVER · Score: $1"],
    [/^konsol\.\.\. \((\d)\/3\)$/, "console... ($1/3)"],
    [/^(\d+),(\d)B$/, "$1.$2K"],                       // Instagram counts: 91,8B -> 91.8K
    [/^%(\d+)$/, "$1%"],                               // %71 -> 71%
    [/^(\d{1,3})((?:\.\d{3})+)$/, function (m, a, b) { return a + b.replace(/\./g, ","); }], // 9.021 -> 9,021
  ];

  // Keys are matched with runs of whitespace collapsed, so terminal lines with double
  // spaces or indentation still match.
  var norm = function (x) { return x.replace(/\s+/g, " ").trim(); };
  var MAP = {};
  Object.keys(EN).forEach(function (k) { MAP[norm(k)] = EN[k].trim(); });

  function tr(text) {
    var t = norm(text);
    if (!t) return null;
    if (Object.prototype.hasOwnProperty.call(MAP, t)) {
      var r = text.replace(text.trim(), function () { return MAP[t]; });
      return r !== text ? r : null;
    }
    var out = text, hit = false;
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(out)) { out = out.replace(RULES[i][0], RULES[i][1]); hit = true; }
    }
    return hit && out !== text ? out : null;
  }

  // Demos that render their own language, and code-like areas, are left alone.
  var SKIP = "script,style,svg,canvas,iframe,.gp-demo,.ld-demo,.vs-demo,.bm-demo,.gs-demo,.gl-demo,[data-i18n-skip]";
  var ATTRS = ["alt", "title", "aria-label", "placeholder"];

  function translateText(node) {
    var p = node.parentElement;
    if (!p || p.closest(SKIP)) return;
    // Only write real changes: writing the same value still fires the observer.
    var v = tr(node.nodeValue);
    if (v !== null && v !== node.nodeValue) node.nodeValue = v;
  }
  function translateEl(el) {
    if (el.closest(SKIP) && !el.matches("canvas[aria-label],iframe[title]")) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = el.getAttribute(ATTRS[i]);
      if (a) { var v = tr(a); if (v !== null && v !== a) el.setAttribute(ATTRS[i], v); }
    }
  }
  function walk(rootNode) {
    if (rootNode.nodeType === 3) { translateText(rootNode); return; }
    if (rootNode.nodeType !== 1) return;
    translateEl(rootNode);
    var w = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) translateText(n); else translateEl(n); }
  }

  function start() {
    walk(document.body);
    var t = tr(document.title); if (t) document.title = t;
    var d = document.querySelector('meta[name="description"]');
    if (d) { var dv = tr(d.content); if (dv) d.content = dv; }
    // A language picked from the URL is its own page for search engines.
    if (params.get("lang") === "en") {
      var c = document.querySelector('link[rel="canonical"]');
      if (c) { var cu = new URL(c.href); cu.searchParams.set("lang", "en"); c.href = cu.href; }
    }
    wireToggles();
    root.classList.remove("i18n-pending");
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === "characterData") translateText(m.target);
        else if (m.type === "attributes") translateEl(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
