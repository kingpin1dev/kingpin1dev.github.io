"""Builds the per-app sites served on <slug>.kingpindev.com.

    python tools/build_app_sites.py

Writes sites/<slug>/index.html (English), sites/<slug>/tr/index.html (Turkish),
sites/<slug>/robots.txt and sites/<slug>/sitemap.xml. Shared styles and script live
in app-sites/. nginx maps each subdomain onto its sites/<slug> folder and lets the
shared folders (img, app-sites, *-demo) through; see the server's kingpindev-apps.conf.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "sites"
LASTMOD = "2026-10-21"

# Lucide icons (24x24, stroke) used on the feature cards.
ICONS = {
    "layers": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83ZM22 17.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65M22 12.65l-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",
    "calendar": "M8 2v4M16 2v4M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 10h18",
    "sort": "M3 6h18M7 12h10M10 18h4",
    "move": "M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20",
    "palette": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8zM13.5 6.5h.01M17.5 10.5h.01M6.5 12.5h.01M8.5 7.5h.01",
    "monitor": "M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 21h8M12 17v4",
    "mouse": "M12 2a6 6 0 0 1 6 6v8a6 6 0 0 1-12 0V8a6 6 0 0 1 6-6ZM12 6v4",
    "eye": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z",
    "globe": "M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0ZM12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20",
    "power": "M12 2v10M18.4 6.6a9 9 0 1 1-12.77.04",
    "sliders": "M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4",
    "pointer": "M22 14a8 8 0 0 1-8 8M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
    "headphones": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
    "speaker": "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM12 6h.01M8 14a4 4 0 1 0 8 0 4 4 0 1 0-8 0ZM12 14h.01",
    "keyboard": "M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10M8 12h.01M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    "gauge": "M12 14l4-4M3.34 19a10 10 0 1 1 17.32 0",
    "tray": "M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z",
    "feather": "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1zM16 8 2 22M17.5 15H9",
    "equalizer": "M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3",
    "bulb": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4",
    "bubble": "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
    "toggle": "M9 5h6a7 7 0 0 1 0 14H9A7 7 0 0 1 9 5ZM15 12a3 3 0 1 0 0-.01",
    "refresh": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5",
    "folder": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    "grid": "M4 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM15 3h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM15 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1ZM4 14h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z",
    "undo": "M3 7v6h6M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
    "progress": "M22 12h-4l-3 9L9 3l-3 9H2",
    "moon": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
    "list": "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13",
    "radio": "M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5M19.1 4.9C23 8.8 23 15.1 19.1 19M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0Z",
    "search": "M3 11a8 8 0 1 0 16 0 8 8 0 1 0-16 0ZM21 21l-4.3-4.3",
    "music": "M9 18V5l12-2v13M3 18a3 3 0 1 0 6 0 3 3 0 1 0-6 0ZM15 16a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z",
    "heart": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    "maximize": "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
    "discord": "M8 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M14 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0M15.5 17.5 17 20c3-1 5-3 5-6.5 0-3-1.2-6.5-3-8.5-1.5-1-3-1.5-4.5-1.5l-1 2a10 10 0 0 0-3 0l-1-2c-1.5 0-3 .5-4.5 1.5-1.8 2-3 5.5-3 8.5 0 3.5 2 5.5 5 6.5l1.5-2.5",
    "shield": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "check": "M20 6 9 17l-5-5",
}

STORE = "https://apps.microsoft.com/detail/{}"

APPS: dict[str, dict] = {
    "lunadock": {
        "name": "LunaDock", "icon": "/img/lunadock.png", "store": "9NZKGTR475CG", "accent": "#7dd3fc", "accent2": "#a78bfa",
        "category": "UtilitiesApplication", "demo": {"kind": "script", "src": "/luna-demo/luna-demo.js", "api": "LunaDemo", "opts": {"img": "/img/"}, "lang": True},
        "privacy": "https://kingpindev.com/lunadock-privacy-policy",
        "en": {
            "title": "LunaDock: tidy desktop stacks for Windows",
            "desc": "LunaDock sorts the files, folders and shortcuts on your Windows desktop into tidy stacks. Click a stack to fan it open; your files never move.",
            "eyebrow": "Desktop organizer for Windows",
            "h1": "Your desktop, sorted into tidy stacks.",
            "lead": "LunaDock gathers the files, folders and shortcuts on your Windows desktop into neat stacks: images, movies, music, documents, games, apps and more. Click a stack to fan it open, grab what you need, and click again to tuck it away. Your files stay exactly where they are.",
            "facts": ["Windows 10 and 11", "16 languages", "No account", "Files never move"],
            "demo_title": "Try it here",
            "demo_note": "A live demo of the stacks running in your browser. Click a stack, switch icon packs, move the stacks to another edge or group them by date. The files are examples.",
            "features_title": "Everything on your desktop, in the right place",
            "features": [
                ("layers", "Automatic stacks", "Images, movies, music, documents, games, apps and more each get their own stack. Anything new you save to the desktop lands in the right one by itself."),
                ("calendar", "By type or by date", "Group by file type, or by date to see what is new at a glance: Today, Yesterday, Previous 7 Days and older."),
                ("sort", "Sorted your way", "Sort inside each stack by name, date, size or type, and drag and drop to reorder stacks or move items between them."),
                ("palette", "20+ icon packs", "Classic piles that show your files' own icons, or colorful category icons in more than 20 packs, from Fluent and Glass to Neon, Pastel and Aurora. Any stack can take your own icon or image."),
                ("monitor", "Any edge, any monitor", "Place the stacks on the top, bottom, left or right edge of the screen, with multi-monitor support. Adjust icon size, margins and background to match your wallpaper."),
                ("mouse", "Works like Windows", "Open, rename and delete with the familiar Windows right-click menu, and get a quick preview for files."),
                ("eye", "Out of the way", "The original desktop icons are hidden while LunaDock runs and come back when it closes. Stacks open inline or in a panel next to the stack."),
                ("globe", "Made for Windows 11", "A translucent settings window with a live preview, a guided welcome tour, light and dark mode, and 16 languages."),
            ],
            "steps_title": "How it works",
            "steps": [("Install it", "Get LunaDock from the Microsoft Store and open it. A short welcome tour walks you through the options."),
                      ("Watch it tidy up", "Your desktop is gathered into stacks by type. New files join the right stack automatically."),
                      ("Click to open", "Click a stack to fan it open, then click again to tuck it away.")],
            "details": [("Requires", "Windows 10 (version 2004) or Windows 11"), ("Languages", "16, including English, Türkçe, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी and العربية"),
                        ("Your files", "Never moved. LunaDock only shows them in stacks"), ("Privacy", "No account, analytics or tracking; everything stays on your PC")],
            "faq": [("Does LunaDock move or change my files?", "No. Your files stay where they are on the desktop. LunaDock only displays them in stacks, and it only renames or deletes something when you ask it to from its menu."),
                    ("What happens when I close LunaDock?", "The original desktop icons are hidden while LunaDock runs and come back as soon as it closes."),
                    ("Can I use my own icons?", "Yes. Choose from more than 20 icon packs, or give any stack its own icon or image."),
                    ("Does it work with more than one monitor?", "Yes, LunaDock supports multiple monitors, and the stacks can sit on any edge of the screen."),
                    ("Does it start with Windows?", "It can. Starting with Windows is an option in the settings.")],
        },
        "tr": {
            "title": "LunaDock: Windows masaüstü için düzenli yığınlar",
            "desc": "LunaDock, Windows masaüstünüzdeki dosya, klasör ve kısayolları düzenli yığınlara ayırır. Yığına tıklayınca açılır; dosyalarınız yerinden oynamaz.",
            "eyebrow": "Windows için masaüstü düzenleyici",
            "h1": "Masaüstünüz, düzenli yığınlar halinde.",
            "lead": "LunaDock, Windows masaüstünüzdeki dosya, klasör ve kısayolları düzenli yığınlarda toplar: resimler, videolar, müzik, belgeler, oyunlar, uygulamalar ve daha fazlası. Bir yığına tıklayınca açılır, işinizi görüp tekrar tıklayınca toplanır. Dosyalarınız olduğu yerde kalır.",
            "facts": ["Windows 10 ve 11", "16 dil", "Hesap gerekmez", "Dosyalar yerinden oynamaz"],
            "demo_title": "Burada deneyin",
            "demo_note": "Yığınların tarayıcınızda çalışan canlı demosu. Bir yığına tıklayın, ikon paketini değiştirin, yığınları başka bir kenara taşıyın ya da tarihe göre gruplayın. Dosyalar örnektir.",
            "features_title": "Masaüstündeki her şey doğru yerde",
            "features": [
                ("layers", "Otomatik yığınlar", "Resimler, videolar, müzik, belgeler, oyunlar, uygulamalar ve daha fazlası kendi yığınına girer. Masaüstüne kaydettiğiniz her yeni dosya kendiliğinden doğru yığına yerleşir."),
                ("calendar", "Türe ya da tarihe göre", "Dosya türüne göre gruplayın ya da neyin yeni olduğunu tek bakışta görmek için tarihe göre: Bugün, Dün, Son 7 Gün ve daha eskiler."),
                ("sort", "İstediğiniz sırayla", "Her yığının içini ada, tarihe, boyuta ya da türe göre sıralayın; sürükleyip bırakarak yığınların yerini değiştirin ya da öğeleri yığınlar arasında taşıyın."),
                ("palette", "20'den fazla ikon paketi", "Dosyalarınızın kendi ikonlarını gösteren klasik yığınlar ya da Fluent ve Glass'tan Neon, Pastel ve Aurora'ya 20'den fazla pakette renkli kategori ikonları. Her yığına kendi ikonunuzu ya da resminizi verebilirsiniz."),
                ("monitor", "Her kenarda, her monitörde", "Yığınları ekranın üst, alt, sol ya da sağ kenarına yerleştirin; birden fazla monitör desteklenir. İkon boyutunu, kenar boşluklarını ve arka planı duvar kağıdınıza göre ayarlayın."),
                ("mouse", "Windows gibi çalışır", "Tanıdık Windows sağ tık menüsüyle açın, yeniden adlandırın, silin; dosyalara hızlıca önizleme ile bakın."),
                ("eye", "Ayak altında dolaşmaz", "LunaDock çalışırken masaüstünün kendi ikonları gizlenir, kapanınca geri gelir. Yığınlar yerinde ya da yanında açılan bir panelde açılır."),
                ("globe", "Windows 11 için tasarlandı", "Canlı önizlemeli yarı saydam ayarlar penceresi, rehberli bir karşılama turu, açık ve koyu tema ve 16 dil."),
            ],
            "steps_title": "Nasıl çalışır",
            "steps": [("Kurun", "LunaDock'u Microsoft Store'dan indirip açın. Kısa bir karşılama turu seçenekleri tanıtır."),
                      ("Toparlanmasını izleyin", "Masaüstünüz türe göre yığınlarda toplanır. Yeni dosyalar kendiliğinden doğru yığına girer."),
                      ("Tıklayıp açın", "Bir yığına tıklayınca açılır, tekrar tıklayınca toplanır.")],
            "details": [("Gereksinim", "Windows 10 (2004 sürümü) ya da Windows 11"), ("Diller", "Türkçe, English, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी ve العربية dahil 16 dil"),
                        ("Dosyalarınız", "Hiç taşınmaz; LunaDock onları yalnızca yığınlarda gösterir"), ("Gizlilik", "Hesap, analiz ya da takip yok; her şey bilgisayarınızda kalır")],
            "faq": [("LunaDock dosyalarımı taşıyor ya da değiştiriyor mu?", "Hayır. Dosyalarınız masaüstünde olduğu yerde kalır. LunaDock onları yalnızca yığınlarda gösterir; bir şeyi ancak siz menüsünden isterseniz yeniden adlandırır ya da siler."),
                    ("LunaDock'u kapatınca ne olur?", "LunaDock çalışırken gizlenen masaüstü ikonları, kapandığı anda geri gelir."),
                    ("Kendi ikonlarımı kullanabilir miyim?", "Evet. 20'den fazla ikon paketinden seçebilir ya da her yığına kendi ikonunuzu veya resminizi verebilirsiniz."),
                    ("Birden fazla monitörle çalışır mı?", "Evet, birden fazla monitör desteklenir ve yığınlar ekranın istediğiniz kenarında durabilir."),
                    ("Windows ile birlikte açılır mı?", "İsterseniz. Windows ile başlatma ayarlardan açılıp kapatılabilir.")],
        },
    },
    "groupy": {
        "name": "Groupy", "icon": "/img/FluentMixer.png", "store": "9NN5W7D23VLJ", "accent": "#a78bfa", "accent2": "#ff8a4c",
        "category": "UtilitiesApplication", "demo": {"kind": "script", "src": "/groupy-demo/groupy-demo.js", "api": "GroupyDemo", "opts": {"logo": "/img/FluentMixer.png"}, "lang": True},
        "en": {
            "title": "Groupy: control app audio by groups on Windows",
            "desc": "Groupy puts your Windows apps into Game, Chat, Media and Aux groups so you can set each group's volume, mute and output device from one place.",
            "eyebrow": "Volume mixer for Windows",
            "h1": "Control app audio by groups.",
            "lead": "Instead of hunting through the Windows volume mixer one app at a time, assign your running apps to Game, Chat, Media and Aux, then control each group's volume and mute together. Balance game and chat with ChatMix, send each group to its own output device, and change it all from the tray or with a hotkey.",
            "facts": ["Windows 10 and 11", "No drivers or virtual devices", "Lives in the tray"],
            "demo_title": "Try it here",
            "demo_note": "A live copy of Groupy's tray panel. Drag the sliders, mute a group, open a group's apps or press Open Groupy for the full window. The apps are examples.",
            "features_title": "Grouped audio, fast",
            "features": [
                ("sliders", "Four group sliders", "Game, Chat, Media and Aux, each with its own volume and mute. A group's level applies to every app in it, including ones you open later."),
                ("pointer", "Drag or click to assign", "Running apps show up as you start them. Drag one onto a group or click it to choose."),
                ("headphones", "ChatMix", "Balance game and chat audio from a single slider. Put each group on the game or the chat side and shift the balance from the tray or with a hotkey."),
                ("speaker", "Per-group output devices", "Route each group to its own device, for example game audio to a headset and chat to speakers. No virtual devices or extra drivers."),
                ("keyboard", "Global hotkeys", "Assign hotkeys for group volume, mute and ChatMix, with F13 to F24 support and a shortcut to add the active app to a group."),
                ("gauge", "On-screen overlay", "A small overlay shows the new level whenever a hotkey changes a group."),
                ("tray", "Quick tray panel", "Click the tray icon for instant control of every group, then open the full window when you need it."),
                ("feather", "Light and quiet", "A clean, animated dark interface that runs quietly in the tray, with an option to start with Windows."),
            ],
            "steps_title": "How it works",
            "steps": [("Open Groupy", "Apps that play sound, like games, Discord or Spotify, appear in the detected apps list."),
                      ("Assign them", "Drag each app onto Game, Chat, Media or Aux, or click it and pick a group."),
                      ("Control by group", "Move one slider or press one hotkey and the whole group follows.")],
            "details": [("Requires", "Windows 10 (version 1809) or Windows 11"), ("Audio", "Uses Windows' own audio sessions; no virtual devices or drivers"),
                        ("Works with", "Any app that plays sound: games, voice chat, music, browsers"), ("Runs", "In the system tray, optionally at startup")],
            "faq": [("Do I need virtual audio devices or extra drivers?", "No. Groupy works with Windows' own per-app audio, and per-group output devices use your existing devices."),
                    ("What about apps I open later?", "A group's volume and mute apply to every app assigned to it, including ones that start after you set the level."),
                    ("Do the hotkeys work while I'm in a game?", "Yes, they are global hotkeys. F13 to F24 work on their own; other keys need Ctrl, Alt or Shift."),
                    ("What is ChatMix?", "One slider that trades game volume for chat volume. Each group sits on the game side or the chat side, and moving the slider fades one side as the other gets louder.")],
        },
        "tr": {
            "title": "Groupy: Windows'ta uygulama seslerini gruplarla yönetin",
            "desc": "Groupy, Windows uygulamalarınızı Oyun, Sohbet, Medya ve Aux gruplarına ayırır; her grubun sesini, sessize almasını ve çıkış cihazını tek yerden yönetirsiniz.",
            "eyebrow": "Windows için ses mikseri",
            "h1": "Uygulama seslerini gruplarla yönetin.",
            "lead": "Windows ses mikserinde uygulamaları tek tek aramak yerine çalışan uygulamalarınızı Oyun, Sohbet, Medya ve Aux gruplarına atayın, sonra her grubun sesini ve sessize almasını birlikte yönetin. ChatMix ile oyun ve sohbet sesini dengeleyin, her grubu kendi çıkış cihazına gönderin ve hepsini tepsiden ya da bir kısayolla değiştirin.",
            "facts": ["Windows 10 ve 11", "Sürücü ya da sanal cihaz yok", "Tepside çalışır"],
            "demo_title": "Burada deneyin",
            "demo_note": "Groupy'nin tepsi panelinin canlı kopyası. Kaydırıcıları sürükleyin, bir grubu sessize alın, grubun uygulamalarını açın ya da tam pencere için Groupy'yi aç'a basın. Uygulamalar örnektir.",
            "features_title": "Gruplanmış ses, hızlıca",
            "features": [
                ("sliders", "Dört grup kaydırıcısı", "Oyun, Sohbet, Medya ve Aux; her birinin kendi sesi ve sessize alması var. Grubun seviyesi içindeki tüm uygulamalara, sonradan açılanlara da uygulanır."),
                ("pointer", "Sürükleyin ya da tıklayın", "Ses çıkaran uygulamalar açıldıkça listede görünür. Birini bir gruba sürükleyin ya da tıklayıp grubunu seçin."),
                ("headphones", "ChatMix", "Oyun ve sohbet sesini tek kaydırıcıyla dengeleyin. Her grubu oyun ya da sohbet tarafına koyun, dengeyi tepsiden ya da bir kısayolla değiştirin."),
                ("speaker", "Gruba özel çıkış cihazı", "Her grubu kendi cihazına gönderin; örneğin oyun sesi kulaklığa, sohbet hoparlöre. Sanal cihaz ya da ek sürücü gerekmez."),
                ("keyboard", "Genel kısayollar", "Grup sesi, sessize alma ve ChatMix için kısayol atayın; F13-F24 desteklenir, etkin uygulamayı bir gruba ekleyen kısayol da var."),
                ("gauge", "Ekran üstü gösterge", "Bir kısayol grubu değiştirdiğinde yeni seviyeyi küçük bir gösterge ekranda gösterir."),
                ("tray", "Hızlı tepsi paneli", "Tepsi simgesine tıklayınca bütün gruplar elinizin altında; gerektiğinde tam pencereyi açın."),
                ("feather", "Hafif ve sessiz", "Tepside sessizce çalışan sade, animasyonlu koyu bir arayüz; isterseniz Windows ile birlikte açılır."),
            ],
            "steps_title": "Nasıl çalışır",
            "steps": [("Groupy'yi açın", "Oyunlar, Discord ya da Spotify gibi ses çıkaran uygulamalar algılanan uygulamalar listesinde görünür."),
                      ("Gruplara atayın", "Her uygulamayı Oyun, Sohbet, Medya ya da Aux'a sürükleyin ya da tıklayıp bir grup seçin."),
                      ("Grupla yönetin", "Tek kaydırıcıyı oynatın ya da tek kısayola basın, bütün grup birlikte değişsin.")],
            "details": [("Gereksinim", "Windows 10 (1809 sürümü) ya da Windows 11"), ("Ses", "Windows'un kendi uygulama ses oturumlarını kullanır; sanal cihaz ya da sürücü yok"),
                        ("Uyumlu", "Ses çıkaran her uygulama: oyunlar, sesli sohbet, müzik, tarayıcılar"), ("Çalışma", "Sistem tepsisinde, isterseniz açılışta")],
            "faq": [("Sanal ses cihazı ya da ek sürücü gerekiyor mu?", "Hayır. Groupy Windows'un kendi uygulama başına ses yönetimiyle çalışır; gruba özel çıkış da mevcut cihazlarınızı kullanır."),
                    ("Sonradan açtığım uygulamalar ne olacak?", "Bir grubun sesi ve sessize alması o gruba atanan tüm uygulamalara, seviyeyi ayarladıktan sonra açılanlara da uygulanır."),
                    ("Kısayollar oyundayken çalışır mı?", "Evet, kısayollar geneldir. F13-F24 tek başına çalışır; diğer tuşlar için Ctrl, Alt ya da Shift gerekir."),
                    ("ChatMix nedir?", "Oyun sesiyle sohbet sesini birbirine karşı dengeleyen tek bir kaydırıcı. Her grup oyun ya da sohbet tarafındadır; kaydırıcıyı oynattıkça bir taraf kısılır, diğeri yükselir.")],
        },
    },
    "vicesonar": {
        "name": "VICE Sonar", "icon": "/img/vice-sonar.png", "store": "9P40TMPLQB43", "accent": "#38bdf8", "accent2": "#a855f7",
        "category": "UtilitiesApplication", "demo": {"kind": "script", "src": "/sonar-demo/sonar-demo.js", "api": "SonarDemo", "opts": {"logo": "/img/vice-sonar.png"}, "lang": False},
        "en": {
            "title": "VICE Sonar: SteelSeries Sonar controls from your tray",
            "desc": "VICE Sonar puts SteelSeries GG Sonar controls one click away: channel volumes, output routing, ChatMix, EQ profiles and RGB, from a widget or tray popup.",
            "eyebrow": "Companion app for SteelSeries GG Sonar",
            "h1": "Your Sonar controls, one click away.",
            "lead": "VICE Sonar is a lightweight widget for SteelSeries GG Sonar. Change every channel's volume, route audio to different devices, balance game and chat, switch EQ profiles and set your RGB lighting from a floating bubble or a quick popup above the tray, without opening the full GG app.",
            "facts": ["Windows 10 and 11", "7 languages", "Needs SteelSeries GG with Sonar"],
            "demo_title": "Try it here",
            "demo_note": "A live copy of the VICE Sonar tray popup. Move the sliders, switch tabs, pick an EQ profile or a colour, or open Settings to assign a hotkey. Device names are examples.",
            "features_title": "All of Sonar, without opening GG",
            "features": [
                ("sliders", "Every channel", "Volume and mute for Master, Game, Chat, Media and Aux."),
                ("speaker", "Output routing", "Send each channel to a different output device right from the popup."),
                ("headphones", "ChatMix", "Balance game and chat audio with one slider."),
                ("equalizer", "EQ profiles", "Switch the EQ profile of each device in a couple of clicks."),
                ("bulb", "RGB lighting", "Set your lighting colour through GameSense, for all SteelSeries device types."),
                ("bubble", "Bubble or popup", "Use a floating Bubble widget or a compact popup above the tray, and choose which tabs each one shows."),
                ("keyboard", "Volume hotkeys", "Hold a key and use the scroll wheel or the arrow keys to change a channel; click the wheel to mute."),
                ("palette", "Themes and languages", "Several glassmorphic themes and 7 languages that switch instantly."),
            ],
            "steps_title": "How it works",
            "steps": [("Run SteelSeries GG", "VICE Sonar finds Sonar on its own and notices when GG starts or stops."),
                      ("Click the tray icon", "The popup opens above the tray with your channels, EQ and RGB."),
                      ("Or float the bubble", "Keep the Bubble widget on screen for one-click control while you play.")],
            "details": [("Requires", "Windows 10 or 11 and SteelSeries GG with the Sonar app installed and running"), ("Languages", "7, with instant switching"),
                        ("Runs", "In the system tray, no taskbar clutter"), ("Note", "An independent app; not made by or affiliated with SteelSeries")],
            "faq": [("Do I need SteelSeries GG?", "Yes. VICE Sonar controls Sonar, so SteelSeries GG with the Sonar app has to be installed and running."),
                    ("Does it replace the GG app?", "No, it works alongside it. It gives you quick access to the controls you change most, without opening the full app."),
                    ("Which devices does the RGB control support?", "Lighting is set through GameSense, which covers all SteelSeries device types."),
                    ("Is VICE Sonar made by SteelSeries?", "No. It is an independent app by Kingpindev and is not affiliated with SteelSeries.")],
        },
        "tr": {
            "title": "VICE Sonar: SteelSeries Sonar kontrolleri tepside",
            "desc": "VICE Sonar, SteelSeries GG Sonar kontrollerini bir tık uzağınıza getirir: kanal sesleri, çıkış yönlendirme, ChatMix, EQ profilleri ve RGB.",
            "eyebrow": "SteelSeries GG Sonar için yardımcı uygulama",
            "h1": "Sonar kontrolleriniz bir tık uzağınızda.",
            "lead": "VICE Sonar, SteelSeries GG Sonar için hafif bir widget. Her kanalın sesini değiştirin, sesi farklı cihazlara yönlendirin, oyunla sohbeti dengeleyin, EQ profilini değiştirin ve RGB ışığınızı ayarlayın; hepsi yüzen bir baloncuktan ya da tepsinin üstünde açılan küçük bir pencereden, tam GG uygulamasını açmadan.",
            "facts": ["Windows 10 ve 11", "7 dil", "SteelSeries GG ve Sonar gerekir"],
            "demo_title": "Burada deneyin",
            "demo_note": "VICE Sonar tepsi penceresinin canlı kopyası. Kaydırıcıları oynatın, sekmeleri değiştirin, bir EQ profili ya da renk seçin veya kısayol atamak için Settings'i açın. Cihaz adları örnektir.",
            "features_title": "GG'yi açmadan bütün Sonar",
            "features": [
                ("sliders", "Bütün kanallar", "Master, Game, Chat, Media ve Aux için ses ve sessize alma."),
                ("speaker", "Çıkış yönlendirme", "Her kanalı doğrudan pencereden farklı bir çıkış cihazına gönderin."),
                ("headphones", "ChatMix", "Oyun ve sohbet sesini tek kaydırıcıyla dengeleyin."),
                ("equalizer", "EQ profilleri", "Her cihazın EQ profilini birkaç tıkla değiştirin."),
                ("bulb", "RGB aydınlatma", "Işık rengini GameSense üzerinden, bütün SteelSeries cihaz türleri için ayarlayın."),
                ("bubble", "Baloncuk ya da pencere", "Yüzen Bubble widget'ını ya da tepsinin üstündeki küçük pencereyi kullanın; her birinde hangi sekmelerin görüneceğini seçin."),
                ("keyboard", "Ses kısayolları", "Bir tuşu basılı tutup fare tekerleği ya da ok tuşlarıyla kanalı değiştirin; tekerleğe tıklayınca sessize alır."),
                ("palette", "Temalar ve diller", "Cam görünümlü birkaç tema ve anında değişen 7 dil."),
            ],
            "steps_title": "Nasıl çalışır",
            "steps": [("SteelSeries GG'yi açın", "VICE Sonar, Sonar'ı kendisi bulur; GG açılıp kapandığında bunu fark eder."),
                      ("Tepsi simgesine tıklayın", "Kanallar, EQ ve RGB ile pencere tepsinin üstünde açılır."),
                      ("Ya da baloncuğu kullanın", "Oyun oynarken tek tıkla kontrol için Bubble widget'ını ekranda tutun.")],
            "details": [("Gereksinim", "Windows 10 ya da 11 ve kurulu, çalışan SteelSeries GG (Sonar ile)"), ("Diller", "7, anında değişir"),
                        ("Çalışma", "Sistem tepsisinde, görev çubuğunu kalabalıklaştırmaz"), ("Not", "Bağımsız bir uygulamadır; SteelSeries tarafından yapılmamıştır ve onunla bağlantılı değildir")],
            "faq": [("SteelSeries GG gerekiyor mu?", "Evet. VICE Sonar, Sonar'ı yönettiği için SteelSeries GG ve Sonar uygulaması kurulu ve açık olmalı."),
                    ("GG uygulamasının yerini mi alıyor?", "Hayır, onunla birlikte çalışır. En sık değiştirdiğiniz kontrollere tam uygulamayı açmadan hızlıca ulaşmanızı sağlar."),
                    ("RGB kontrolü hangi cihazları destekliyor?", "Işık GameSense üzerinden ayarlanır; bütün SteelSeries cihaz türlerini kapsar."),
                    ("VICE Sonar'ı SteelSeries mi yaptı?", "Hayır. Kingpindev'in bağımsız bir uygulamasıdır ve SteelSeries ile bağlantılı değildir.")],
        },
    },
    "vorganizer": {
        "name": "vOrganizer", "icon": "/img/Vorganizer.png", "store": "9PKDPQDF6ZJL", "accent": "#3b9dff", "accent2": "#ff9500",
        "category": "UtilitiesApplication", "demo": {"kind": "frame", "src": "/vorganizer-demo/index.html", "w": 860, "h": 780},
        "en": {
            "title": "vOrganizer: sort messy folders on Windows in seconds",
            "desc": "vOrganizer sorts the files in your Downloads, Desktop or any folder into Images, Documents, Videos, Audio and more. Preview first, undo any time.",
            "eyebrow": "File organizer for Windows",
            "h1": "Messy folders, sorted in seconds.",
            "lead": "Point vOrganizer at your Downloads, Desktop, Documents or any folder and it sorts the files by type: images, documents, videos, audio, archives, code, installers and fonts each go to their own folder. See what will move before it happens, and undo the last run with one click.",
            "facts": ["Windows 10 and 11", "Works offline", "Undo any time"],
            "demo_title": "Try it here",
            "demo_note": "The real vOrganizer interface running in your browser on example folders. Pick a folder, press Preview, then Organize Now and Undo. Nothing on your computer is touched.",
            "features_title": "Order, without the busywork",
            "features": [
                ("grid", "Eight categories", "Images, Documents, Videos, Audio, Archives, Code, Executables and Fonts, recognised by dozens of file extensions."),
                ("folder", "Any folder", "One-click shortcuts for Downloads, Desktop and Documents, or choose any folder you like."),
                ("eye", "Preview first", "See which files will go where before anything moves."),
                ("progress", "Live progress", "Watch each file move with a progress bar and an activity log."),
                ("undo", "Undo", "Changed your mind? Undo puts the files from the last run back where they were."),
                ("check", "Pick what to sort", "Turn categories on or off, so only the kinds of files you choose are moved."),
                ("moon", "Light and dark", "A clean interface with a light and a dark theme."),
                ("shield", "Stays on your PC", "Everything happens locally; no account and no uploads."),
            ],
            "steps_title": "How it works",
            "steps": [("Pick a folder", "Downloads, Desktop, Documents, or any folder with Custom."),
                      ("Preview", "Check the list of files grouped by category."),
                      ("Organize", "Files move into a vOrganizer folder inside it, one subfolder per category.")],
            "details": [("Requires", "Windows 10 (version 1809) or Windows 11"), ("Where files go", "Into a vOrganizer folder inside the folder you sort, one subfolder per category; files that fit no category go to Others"),
                        ("Subfolders", "Only the files directly in the chosen folder are sorted"), ("Undo", "Restores the last organize run")],
            "faq": [("Does vOrganizer delete anything?", "No. It only moves files into category folders, and Undo moves them back."),
                    ("Where do my files end up?", "In a folder named vOrganizer inside the folder you sorted, with one subfolder per category, such as vOrganizer\\Images."),
                    ("Does it touch files in subfolders?", "No, only the files that sit directly in the folder you chose."),
                    ("Can I sort only some file types?", "Yes. Untick the categories you want to leave alone before you press Organize Now.")],
        },
        "tr": {
            "title": "vOrganizer: Windows'ta dağınık klasörleri saniyeler içinde düzenleyin",
            "desc": "vOrganizer, İndirilenler, Masaüstü ya da herhangi bir klasördeki dosyaları Görseller, Belgeler, Videolar gibi klasörlere ayırır. Önce önizleyin, geri alın.",
            "eyebrow": "Windows için dosya düzenleyici",
            "h1": "Dağınık klasörler, saniyeler içinde düzende.",
            "lead": "vOrganizer'a İndirilenler, Masaüstü, Belgeler ya da istediğiniz bir klasörü gösterin, dosyaları türüne göre ayırsın: görseller, belgeler, videolar, ses dosyaları, arşivler, kodlar, kurulum dosyaları ve yazı tipleri kendi klasörlerine gider. Neyin nereye taşınacağını önceden görün, son işlemi tek tıkla geri alın.",
            "facts": ["Windows 10 ve 11", "İnternetsiz çalışır", "İstediğiniz zaman geri alın"],
            "demo_title": "Burada deneyin",
            "demo_note": "Gerçek vOrganizer arayüzü, örnek klasörlerle tarayıcınızda çalışıyor. Bir klasör seçin, Preview'a, sonra Organize Now ve Undo'ya basın. Bilgisayarınızdaki hiçbir şeye dokunulmaz.",
            "features_title": "Uğraşmadan düzen",
            "features": [
                ("grid", "Sekiz kategori", "Görseller, Belgeler, Videolar, Ses, Arşivler, Kod, Çalıştırılabilir dosyalar ve Yazı tipleri; onlarca dosya uzantısıyla tanınır."),
                ("folder", "Her klasör", "İndirilenler, Masaüstü ve Belgeler için tek tıklık kısayollar ya da istediğiniz herhangi bir klasör."),
                ("eye", "Önce önizleme", "Hiçbir şey taşınmadan hangi dosyanın nereye gideceğini görün."),
                ("progress", "Canlı ilerleme", "Her dosyanın taşınmasını ilerleme çubuğu ve işlem kaydıyla izleyin."),
                ("undo", "Geri al", "Fikrinizi mi değiştirdiniz? Geri al, son işlemdeki dosyaları eski yerlerine koyar."),
                ("check", "Neyin ayrılacağını seçin", "Kategorileri açıp kapatın; yalnızca seçtiğiniz türdeki dosyalar taşınsın."),
                ("moon", "Açık ve koyu", "Açık ve koyu temalı sade bir arayüz."),
                ("shield", "Bilgisayarınızda kalır", "Her şey yerelde olur; hesap yok, yükleme yok."),
            ],
            "steps_title": "Nasıl çalışır",
            "steps": [("Klasör seçin", "İndirilenler, Masaüstü, Belgeler ya da Custom ile herhangi bir klasör."),
                      ("Önizleyin", "Kategoriye göre gruplanmış dosya listesine bakın."),
                      ("Düzenleyin", "Dosyalar klasörün içindeki vOrganizer klasörüne, her kategori için bir alt klasöre taşınır.")],
            "details": [("Gereksinim", "Windows 10 (1809 sürümü) ya da Windows 11"), ("Dosyalar nereye gider", "Düzenlenen klasörün içindeki vOrganizer klasörüne, her kategori için bir alt klasöre; hiçbir kategoriye uymayanlar Others'a"),
                        ("Alt klasörler", "Yalnızca seçilen klasörde doğrudan duran dosyalar ayrılır"), ("Geri al", "Son düzenleme işlemini geri getirir")],
            "faq": [("vOrganizer bir şey siliyor mu?", "Hayır. Dosyaları yalnızca kategori klasörlerine taşır; Undo onları geri taşır."),
                    ("Dosyalarım nereye gidiyor?", "Düzenlediğiniz klasörün içinde vOrganizer adlı bir klasöre, her kategori için bir alt klasöre; örneğin vOrganizer\\Images."),
                    ("Alt klasörlerdeki dosyalara dokunuyor mu?", "Hayır, yalnızca seçtiğiniz klasörde doğrudan duran dosyalara."),
                    ("Sadece bazı dosya türlerini ayırabilir miyim?", "Evet. Organize Now'a basmadan önce dokunulmasını istemediğiniz kategorilerin işaretini kaldırın.")],
        },
    },
    "aurora": {
        "name": "Aurora Radios", "icon": "/img/Aurora.png", "store": "9NXLD94RQV1Z", "accent": "#f472b6", "accent2": "#8b5cf6",
        "category": "MultimediaApplication", "demo": {"kind": "frame", "src": "/aurora-demo/index.html", "w": 1080, "h": 720},
        "en": {
            "title": "Aurora Radios: live internet radio for Windows",
            "desc": "Aurora Radios is an internet radio player for Windows. Find live stations by mood, genre or country, see the song that's playing and keep favourites.",
            "eyebrow": "Internet radio for Windows",
            "h1": "Live radio from around the world, by mood.",
            "lead": "Discover thousands of live stations by mood, genre or country and start listening with a single click. Pick a vibe like Chill, Focus or Late Night, see the song that is playing right now, save your favourite stations and keep the music going from the tray while you work.",
            "facts": ["Windows 10 and 11", "No account", "No ads"],
            "demo_title": "Try it here",
            "demo_note": "The real Aurora Radios interface running in your browser with live stations. Pick a mood, genre or country, or search, then press play.",
            "features_title": "Radio, the way you feel",
            "features": [
                ("radio", "By mood, genre or country", "Chill, Focus, Energetic, Late Night and more, any genre, or stations from over 200 countries."),
                ("search", "Live search", "Search across thousands of stations as you type."),
                ("music", "What's playing", "See the current artist and title on supported stations."),
                ("heart", "Liked songs", "Like songs to keep them in your own list, then open them on Spotify, Apple Music or YouTube Music."),
                ("check", "Favourite stations", "Save the stations you love for quick access."),
                ("maximize", "Now playing view", "A full-screen view with album art and a live equalizer."),
                ("moon", "Two themes", "A deep animated Aurora theme, or a Windows 11 Mica theme."),
                ("discord", "Tray and Discord", "Keeps playing from the system tray after you close the window, with optional Discord Rich Presence."),
            ],
            "steps_title": "How it works",
            "steps": [("Pick a vibe", "Choose a mood, a genre or a country, or search by name."),
                      ("Press play", "The station starts right away; the current song shows where available."),
                      ("Keep it", "Save the station to Favourites and like the songs you want to find again.")],
            "details": [("Requires", "Windows 10 (version 1809) or Windows 11 and an internet connection"), ("Account", "Not needed"),
                        ("Ads", "None"), ("In the background", "Keeps playing from the system tray")],
            "faq": [("Do I need an account?", "No. Open the app and start listening."),
                    ("Are there ads?", "No, Aurora Radios shows no ads."),
                    ("Can I see which song is playing?", "Yes, for stations that share it, the artist and title appear in the player."),
                    ("Does it keep playing when I close the window?", "Yes, it keeps playing from the system tray until you stop it.")],
        },
        "tr": {
            "title": "Aurora Radios: Windows için canlı internet radyosu",
            "desc": "Aurora Radios, Windows için bir internet radyosu. Canlı istasyonları ruh hali, tür ya da ülkeye göre bulun, çalan şarkıyı görün, favorilerinizi saklayın.",
            "eyebrow": "Windows için internet radyosu",
            "h1": "Dünyanın dört bir yanından canlı radyo, ruh halinize göre.",
            "lead": "Binlerce canlı istasyonu ruh hali, tür ya da ülkeye göre keşfedin ve tek tıkla dinlemeye başlayın. Chill, Focus ya da Late Night gibi bir hava seçin, şu an çalan şarkıyı görün, sevdiğiniz istasyonları kaydedin ve çalışırken müziği tepsiden sürdürün.",
            "facts": ["Windows 10 ve 11", "Hesap gerekmez", "Reklam yok"],
            "demo_title": "Burada deneyin",
            "demo_note": "Gerçek Aurora Radios arayüzü, canlı istasyonlarla tarayıcınızda çalışıyor. Bir ruh hali, tür ya da ülke seçin veya arayın, sonra çal'a basın.",
            "features_title": "Ruh halinize göre radyo",
            "features": [
                ("radio", "Ruh hali, tür ya da ülke", "Chill, Focus, Energetic, Late Night ve daha fazlası, her tür ya da 200'den fazla ülkeden istasyonlar."),
                ("search", "Canlı arama", "Yazdıkça binlerce istasyon arasında arayın."),
                ("music", "Ne çalıyor", "Destekleyen istasyonlarda çalan sanatçı ve şarkıyı görün."),
                ("heart", "Beğenilen şarkılar", "Şarkıları beğenip kendi listenizde tutun, sonra Spotify, Apple Music ya da YouTube Music'te açın."),
                ("check", "Favori istasyonlar", "Sevdiğiniz istasyonları hızlıca ulaşmak için kaydedin."),
                ("maximize", "Şimdi çalıyor ekranı", "Albüm kapağı ve canlı ekolayzerli tam ekran görünüm."),
                ("moon", "İki tema", "Derin, hareketli Aurora teması ya da Windows 11 Mica teması."),
                ("discord", "Tepsi ve Discord", "Pencereyi kapatınca tepsiden çalmaya devam eder; isterseniz Discord'da ne dinlediğinizi gösterir."),
            ],
            "steps_title": "Nasıl çalışır",
            "steps": [("Havayı seçin", "Bir ruh hali, tür ya da ülke seçin veya adıyla arayın."),
                      ("Çal'a basın", "İstasyon hemen başlar; destekleniyorsa çalan şarkı görünür."),
                      ("Saklayın", "İstasyonu Favorilere ekleyin, yeniden bulmak istediğiniz şarkıları beğenin.")],
            "details": [("Gereksinim", "Windows 10 (1809 sürümü) ya da Windows 11 ve internet bağlantısı"), ("Hesap", "Gerekmez"),
                        ("Reklam", "Yok"), ("Arka planda", "Sistem tepsisinden çalmaya devam eder")],
            "faq": [("Hesap gerekiyor mu?", "Hayır. Uygulamayı açın ve dinlemeye başlayın."),
                    ("Reklam var mı?", "Hayır, Aurora Radios reklam göstermez."),
                    ("Hangi şarkının çaldığını görebilir miyim?", "Evet, bu bilgiyi paylaşan istasyonlarda sanatçı ve şarkı adı oynatıcıda görünür."),
                    ("Pencereyi kapatınca çalmaya devam ediyor mu?", "Evet, siz durdurana kadar sistem tepsisinden çalmaya devam eder.")],
        },
    },
}

UI = {
    "en": {"features": "Features", "demo": "Demo", "faq": "FAQ", "store": "Get it from Microsoft Store", "store_short": "Microsoft Store",
           "try": "Try the live demo", "details": "Details", "faq_title": "Questions", "more": "More apps by Kingpindev",
           "by": "A Windows app by", "privacy": "Privacy policy", "lang_name": "English", "other": "tr", "other_label": "Türkçe",
           "cta_title": "Ready to try {}?", "cta_text": "Get it from the Microsoft Store and set it up in a minute.", "home": "All apps"},
    "tr": {"features": "Özellikler", "demo": "Demo", "faq": "SSS", "store": "Microsoft Store'dan edinin", "store_short": "Microsoft Store",
           "try": "Canlı demoyu deneyin", "details": "Ayrıntılar", "faq_title": "Sık sorulanlar", "more": "Kingpindev'in diğer uygulamaları",
           "by": "Bir Kingpindev Windows uygulaması:", "privacy": "Gizlilik politikası", "lang_name": "Türkçe", "other": "en", "other_label": "English",
           "cta_title": "{} denemeye hazır mısınız?", "cta_text": "Microsoft Store'dan indirin, bir dakikada kurun.", "home": "Tüm uygulamalar"},
}

OTHER_APPS = [("lunadock", "LunaDock", "/img/lunadock.png"), ("groupy", "Groupy", "/img/FluentMixer.png"), ("vicesonar", "VICE Sonar", "/img/vice-sonar.png"),
              ("vorganizer", "vOrganizer", "/img/Vorganizer.png"), ("aurora", "Aurora Radios", "/img/Aurora.png")]

WIN_LOGO = '<svg viewBox="0 0 88 88" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M0 12.4l35.7-4.9v34.4H0zM40 6.8L87.3 0v41.5H40zM0 45.7h35.7v34.5L0 75.3zM40 45.7h47.3V88L40 81.4z"/></svg>'


def e(text: str) -> str:
    return html.escape(text, quote=True)


def icon(name: str) -> str:
    return (f'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{ICONS[name]}"/></svg>')


def url(slug: str, lang: str) -> str:
    return f"https://{slug}.kingpindev.com/" + ("tr/" if lang == "tr" else "")


def page(slug: str, app: dict, lang: str) -> str:
    c, u = app[lang], UI[lang]
    store = STORE.format(app["store"])
    other = u["other"]
    assert 25 <= len(c["desc"]) <= 160, (slug, lang, len(c["desc"]))
    demo = app["demo"]
    if demo["kind"] == "script":
        opts = dict(demo["opts"])
        if demo.get("lang"):
            opts["lang"] = lang
        demo_html = (f'<div class="demo-box demo-script" data-api="{demo["api"]}" data-opts="{e(json.dumps(opts))}"></div>'
                     f'<script src="{demo["src"]}" defer></script>')
    else:
        demo_html = (f'<div class="demo-box demo-frame" data-w="{demo["w"]}" data-h="{demo["h"]}">'
                     f'<iframe src="{demo["src"]}" width="{demo["w"]}" height="{demo["h"]}" title="{e(app["name"])} demo" loading="lazy"></iframe></div>')
    ld = {
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": app["name"], "operatingSystem": "Windows 10, Windows 11",
        "applicationCategory": app["category"], "description": c["desc"], "url": url(slug, lang), "image": f"https://{slug}.kingpindev.com/img/og-{slug}.jpg",
        "installUrl": store, "inLanguage": lang, "author": {"@type": "Person", "name": "Burak Pekel", "url": "https://kingpindev.com/"},
        "publisher": {"@type": "Organization", "name": "Kingpindev", "url": "https://kingpindev.com/"},
    }
    features = "".join(f'<article class="feat">{icon(i)}<h3>{e(t)}</h3><p>{e(d)}</p></article>' for i, t, d in c["features"])
    steps = "".join(f'<li><b>{n}</b><h3>{e(t)}</h3><p>{e(d)}</p></li>' for n, (t, d) in enumerate(c["steps"], 1))
    details = "".join(f'<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>' for k, v in c["details"])
    faq = "".join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in c["faq"])
    facts = "".join(f"<li>{e(f)}</li>" for f in c["facts"])
    others = "".join(
        f'<a class="other" href="{url(s, lang)}"><img src="{ic}" alt="" width="40" height="40" loading="lazy"><span>{e(n)}</span></a>'
        for s, n, ic in OTHER_APPS if s != slug)
    others += f'<a class="other" href="https://notchify.app/"><img src="/img/notchify.png" alt="" width="40" height="40" loading="lazy"><span>Notchify</span></a>'
    privacy = f' · <a href="{app["privacy"]}">{u["privacy"]}</a>' if app.get("privacy") else ""
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(c["title"])}</title>
<meta name="description" content="{e(c["desc"])}">
<link rel="canonical" href="{url(slug, lang)}">
<link rel="alternate" hreflang="en" href="{url(slug, 'en')}">
<link rel="alternate" hreflang="tr" href="{url(slug, 'tr')}">
<link rel="alternate" hreflang="x-default" href="{url(slug, 'en')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kingpindev">
<meta property="og:locale" content="{'tr_TR' if lang == 'tr' else 'en_US'}">
<meta property="og:url" content="{url(slug, lang)}">
<meta property="og:title" content="{e(c["title"])}">
<meta property="og:description" content="{e(c["desc"])}">
<meta property="og:image" content="https://{slug}.kingpindev.com/img/og-{slug}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#070a12">
<link rel="icon" type="image/png" href="{app["icon"]}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/app-sites/site.css">
<script src="/app-sites/site.js" defer></script>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>:root{{--accent:{app["accent"]};--accent2:{app["accent2"]}}}</style>
</head>
<body data-lang="{lang}" data-other="{url(slug, other)}">
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="{url(slug, lang)}"><img src="{app["icon"]}" alt="" width="32" height="32"><span>{e(app["name"])}</span></a>
    <nav class="links"><a href="#demo">{u["demo"]}</a><a href="#features">{u["features"]}</a><a href="#faq">{u["faq"]}</a></nav>
    <a class="lang" href="{url(slug, other)}" hreflang="{other}" lang="{other}" data-lang-switch="{other}">{u["other_label"]}</a>
    <a class="btn btn-sm" href="{store}">{WIN_LOGO}<span>{u["store_short"]}</span></a>
  </div>
</header>
<main>
  <section class="hero">
    <div class="wrap">
      <img class="hero-icon" src="{app["icon"]}" alt="{e(app["name"])}" width="96" height="96">
      <p class="eyebrow">{e(c["eyebrow"])}</p>
      <h1>{e(c["h1"])}</h1>
      <p class="lead">{e(c["lead"])}</p>
      <div class="cta"><a class="btn" href="{store}">{WIN_LOGO}<span>{u["store"]}</span></a><a class="btn btn-ghost" href="#demo">{u["try"]}</a></div>
      <ul class="facts">{facts}</ul>
    </div>
  </section>
  <section id="demo" class="demo">
    <div class="wrap">
      <h2>{e(c["demo_title"])}</h2>
      {demo_html}
      <p class="note">{e(c["demo_note"])}</p>
    </div>
  </section>
  <section id="features" class="features">
    <div class="wrap">
      <h2>{e(c["features_title"])}</h2>
      <div class="feat-grid">{features}</div>
    </div>
  </section>
  <section class="steps">
    <div class="wrap">
      <h2>{e(c["steps_title"])}</h2>
      <ol class="step-list">{steps}</ol>
    </div>
  </section>
  <section class="details">
    <div class="wrap">
      <h2>{u["details"]}</h2>
      <dl>{details}</dl>
    </div>
  </section>
  <section id="faq" class="faq">
    <div class="wrap">
      <h2>{u["faq_title"]}</h2>
      {faq}
    </div>
  </section>
  <section class="final">
    <div class="wrap">
      <img src="{app["icon"]}" alt="" width="72" height="72" loading="lazy">
      <h2>{e(u["cta_title"].format(app["name"]))}</h2>
      <p>{u["cta_text"]}</p>
      <a class="btn" href="{store}">{WIN_LOGO}<span>{u["store"]}</span></a>
    </div>
  </section>
  <section class="more">
    <div class="wrap">
      <h2>{u["more"]}</h2>
      <div class="others">{others}</div>
    </div>
  </section>
</main>
<footer class="foot">
  <div class="wrap">{u["by"]} <a href="https://kingpindev.com/">Kingpindev</a> · <a href="https://kingpindev.com/#projects">{u["home"]}</a>{privacy}</div>
</footer>
</body>
</html>
"""


def main() -> None:
    for slug, app in APPS.items():
        d = OUT / slug
        (d / "tr").mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(page(slug, app, "en"), encoding="utf-8", newline="\n")
        (d / "tr" / "index.html").write_text(page(slug, app, "tr"), encoding="utf-8", newline="\n")
        (d / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: https://{slug}.kingpindev.com/sitemap.xml\n", encoding="utf-8", newline="\n")
        sm = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
        for lang in ("en", "tr"):
            sm.append(f"  <url><loc>{url(slug, lang)}</loc><lastmod>{LASTMOD}</lastmod>"
                      f'<xhtml:link rel="alternate" hreflang="en" href="{url(slug, "en")}"/>'
                      f'<xhtml:link rel="alternate" hreflang="tr" href="{url(slug, "tr")}"/></url>')
        sm.append("</urlset>")
        (d / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8", newline="\n")
        print("built", slug)


if __name__ == "__main__":
    main()
