"""Content for the VICE Sonar side pages and home extras (English and Turkish).

Facts: the project's README and handoff notes (versions, features, Lite/Full split) and the live VICE Sonar page.
VICE Sonar is an independent app and is not affiliated with SteelSeries. Competitor notes stick to what the vendors state themselves.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is VICE Sonar?", "VICE Sonar is a small always-on-top widget for Windows that controls SteelSeries Sonar for you: channel volumes, mutes, ChatMix, EQ profiles and GameSense RGB, without opening the main SteelSeries GG window."),
            ("What do I need?", "Windows 10 or 11, and SteelSeries GG installed and running with the Sonar app active. VICE Sonar talks to Sonar, so it needs it."),
            ("Is it made by SteelSeries?", "No. VICE Sonar is an independent app by Kingpindev and is not affiliated with or endorsed by SteelSeries."),
            ("Where do I get it?", "From the Microsoft Store (the full version), or as the free Lite build from the project's GitHub releases."),
            ("What is the difference between Lite and the Store version?", "Lite has master volume and mute, favourite EQ profiles, RGB lighting, bubble mode, the tray and 7 languages. The Store version adds ChatMix, every audio channel with output switching, and all EQ profiles."),
            ("Which languages does it speak?", "Türkçe, English, Français, Русский, Deutsch, Español and العربية, with instant switching."),
        ]),
        ("Audio and ChatMix", [
            ("Which channels can I control?", "Master, Game, Chat, Media, Aux and Mic, each with a volume slider and a mute toggle. Channels collapse and expand to keep the widget small."),
            ("Can I switch output devices?", "Yes. Each channel has an output picker, so you can move Game, Chat, Media or Aux to another device on the fly."),
            ("How does ChatMix work?", "A single slider balances Game against Chat and stays in sync with Sonar's own ChatMix, including the hardware wheel on supported SteelSeries headsets."),
            ("Do the volume hotkeys work in games?", "Yes. You can assign a key combination per channel with the mouse wheel or arrow keys, choose the step (2, 5, 10 or 15 per cent) and assign a shortcut that opens the widget."),
        ]),
        ("EQ and lighting", [
            ("How do EQ profiles work?", "VICE Sonar lists the EQ presets you already saved in Sonar for each device, with separate pickers for Game, Chat, Mic, Media and Aux. Pick one and it is applied. A Reload button refreshes the list."),
            ("How does RGB work?", "R, G and B sliders with a live preview, one-click presets (Orange, Red, Blue, Green, White, Off) and a Hue picker. Colours are sent to your devices through GameSense."),
        ]),
        ("The widget", [
            ("What is bubble mode?", "The widget shrinks to a small floating always-on-top circle. Click it to open the full panel again."),
            ("Can I change how it looks?", "Yes. There are 7 themes (Sunlight, Moonlight, Orbit, Aqua, Eris, Cyber and Spider Lily), a horizontal layout, and a transparency slider from 40 to 100 per cent."),
            ("Does it clutter my taskbar?", "No. It has no taskbar entry. It lives in the system tray, and it remembers where you placed it."),
            ("Does it start with Windows?", "It can. Start with Windows is an option in Settings."),
        ]),
        ("Privacy and support", [
            ("Does VICE Sonar collect my data?", "No. There is no account, analytics or advertising. The widget talks to the Sonar service on your own PC and keeps its settings on your device. See the privacy page."),
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your Windows version, your VICE Sonar version (Settings, About) and your SteelSeries GG version."),
        ]),
    ],
    "changelog": [
        ("3.4.5", "2026", "ChatMix wheel fix", [
            "Fixed the hardware ChatMix wheel so the widget follows it correctly.",
        ]),
        ("3.4.4", "2026", "Start with Windows fix", [
            "Fixed the Start with Windows option so it works from the shortcut the installer creates.",
        ]),
        ("3.4.3", "2026", "App execution alias", [
            "Added an app execution alias so VICE Sonar can be started from a terminal or the Run box.",
        ]),
        ("3.4.2", "2026", "Lite and Full", [
            "Free Lite build on GitHub and the full version on the Microsoft Store.",
            "Audio channels, ChatMix, EQ profiles, GameSense RGB, bubble mode, system tray, 7 themes and 7 languages.",
        ]),
    ],
    "press": {
        "oneliner": "VICE Sonar is a small always-on-top Windows widget that controls SteelSeries Sonar: volume, ChatMix, EQ and RGB.",
        "short": "VICE Sonar puts your SteelSeries Sonar controls in a compact widget: every channel's volume and mute, ChatMix, per-device EQ profiles and GameSense RGB, plus a bubble mode and 7 themes. It is an independent app and is not affiliated with SteelSeries.",
        "long": "VICE Sonar is a sleek, always-on-top desktop widget for Windows 10 and 11 that controls SteelSeries GG Sonar without opening the main app. It offers volume sliders and mute toggles for Master, Game, Chat, Media, Aux and Mic, a ChatMix balance that follows the hardware wheel, per-channel output device switching, your saved Sonar EQ presets for every device, and GameSense RGB lighting with presets. The window is borderless and draggable, can shrink to a floating bubble, hides from the taskbar, lives in the tray and remembers where you put it. Seven themes, a horizontal layout, adjustable transparency, volume hotkeys and 7 interface languages (Türkçe, English, Français, Русский, Deutsch, Español, العربية) make it fit any setup. The full version is on the Microsoft Store; a free Lite build is available on GitHub. VICE Sonar is an independent app and is not affiliated with or endorsed by SteelSeries.",
        "facts": [
            ("Name", "VICE Sonar"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 and Windows 11"),
            ("Requires", "SteelSeries GG with Sonar installed and running"),
            ("Category", "Utilities, audio"),
            ("Languages", "Türkçe, English, Français, Русский, Deutsch, Español, العربية"),
            ("Versions", "Full on the Microsoft Store, free Lite on GitHub"),
            ("Website", "vicesonar.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("panels_main", "Audio, EQ and RGB panels"), ("panels_full", "Output switching and all EQ profiles"), ("themes_grid", "Seven built-in themes"), ("themes_dark", "Dark themes"), ("panels_horizontal", "Horizontal layout and settings")],
        "notes": ["VICE Sonar is independent and not affiliated with SteelSeries. Please do not describe it as an official SteelSeries product.", "Screenshots show example settings. Please do not alter the logo.", "When you write about VICE Sonar, please link to its Microsoft Store page or to vicesonar.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["VICE Sonar does not collect, sell or share your personal data.", "VICE Sonar does not use analytics, telemetry, advertising or tracking.", "VICE Sonar does not require an account.", "Everything it needs stays on your device."]),
        ("What VICE Sonar does on your PC", ["To control Sonar, VICE Sonar talks to the SteelSeries GG and Sonar services that run on your own computer. It reads and changes the channel volumes, mutes, ChatMix, output devices, EQ presets and lighting colours that you control through the widget.",
                                             "To react to your volume hotkeys it watches the mouse wheel and the keys you assigned. It does not record what you type."]),
        ("What it stores on your device", ["Your settings (theme, language, layout, transparency, position, visible channels and hotkeys) are stored on your PC. Uninstalling VICE Sonar removes the app; you can also delete its settings folder."]),
        ("Network use", ["VICE Sonar does not send data to our servers. If you obtained it from the Microsoft Store, purchases, licensing, ratings and updates are handled by Microsoft through the services built into Windows.", "VICE Sonar contains links (for example to our website or to send an email). Opening a link uses your default browser or email app, and the site you visit has its own privacy policy."]),
        ("Independence", ["VICE Sonar is not affiliated with or endorsed by SteelSeries. SteelSeries, GG and Sonar are trademarks of their owners."]),
        ("Children", ["VICE Sonar does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "There are a few ways to control SteelSeries Sonar. Here is an honest look at how VICE Sonar fits next to the one people ask about most. We checked the vendor's own public pages, and we point out where the other tool is the better pick.",
        "items": [
            ("SteelSeries GG (Sonar) on its own", "From SteelSeries",
             "The full Sonar app: complete mixer, detailed EQ and device setup, configs and the whole GG ecosystem.",
             "VICE Sonar is a compact always-on-top widget on top of Sonar. It gives you the everyday controls (volume, mute, ChatMix, EQ preset pick, RGB colour) in a small window, a bubble, a tray menu and hotkeys, without opening GG.",
             "Stay in SteelSeries GG when you are setting Sonar up, building EQ presets or changing devices. Add VICE Sonar for quick control while you play."),
            ("Windows Volume Mixer", "Built in to Windows",
             "Nothing to install, and a slider for every app that plays sound.",
             "VICE Sonar controls Sonar's own channels (Game, Chat, Media, Aux, Mic), ChatMix and EQ presets, which Windows' mixer does not know about. It needs Sonar to be running.",
             "Use the Windows mixer if you do not use Sonar."),
        ],
        "foot": "Checked on 16 November 2026 from public pages. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("VICE Sonar nedir?", "VICE Sonar, Windows için küçük ve her zaman üstte duran bir widget'tır. SteelSeries Sonar'ı sizin yerinize yönetir: kanal sesleri, sessize alma, ChatMix, EQ profilleri ve GameSense RGB; ana SteelSeries GG penceresini açmadan."),
            ("Neye ihtiyacım var?", "Windows 10 ya da 11 ve kurulu, çalışan, Sonar uygulaması etkin SteelSeries GG. VICE Sonar Sonar ile konuşur, o yüzden onu ister."),
            ("SteelSeries mı yaptı?", "Hayır. VICE Sonar, Kingpindev'in bağımsız bir uygulamasıdır; SteelSeries ile bağlantılı değildir ve onun tarafından onaylanmamıştır."),
            ("Nereden edinirim?", "Microsoft Store'dan (tam sürüm) ya da projenin GitHub sürümlerinden ücretsiz Lite yapısı olarak."),
            ("Lite ile Store sürümü arasındaki fark nedir?", "Lite'ta ana ses ve sessize alma, favori EQ profilleri, RGB aydınlatma, balon modu, tepsi ve 7 dil var. Store sürümü ChatMix'i, tüm ses kanallarını çıkış değiştirmeyle ve tüm EQ profillerini ekler."),
            ("Hangi dillerde?", "Türkçe, English, Français, Русский, Deutsch, Español ve العربية; anında geçişle."),
        ]),
        ("Ses ve ChatMix", [
            ("Hangi kanalları yönetebilirim?", "Ana (Master), Oyun, Sohbet, Medya, Aux ve Mikrofon; her birinde ses kaydırıcısı ve sessize alma düğmesi var. Kanallar widget'ı küçük tutmak için daralıp genişler."),
            ("Çıkış cihazlarını değiştirebilir miyim?", "Evet. Her kanalın bir çıkış seçicisi vardır; Oyun, Sohbet, Medya ya da Aux'u anında başka bir cihaza taşıyabilirsiniz."),
            ("ChatMix nasıl çalışır?", "Tek bir kaydırıcı Oyun ile Sohbet'i dengeler ve Sonar'ın kendi ChatMix'iyle, desteklenen SteelSeries kulaklıklardaki donanım tekerleği dâhil, senkron kalır."),
            ("Ses kısayolları oyunlarda çalışır mı?", "Evet. Her kanal için fare tekerleği ya da ok tuşlarıyla bir tuş kombinasyonu atayabilir, adımı (yüzde 2, 5, 10 ya da 15) seçebilir ve widget'ı açan bir kısayol atayabilirsiniz."),
        ]),
        ("EQ ve aydınlatma", [
            ("EQ profilleri nasıl çalışır?", "VICE Sonar, Sonar'da her cihaz için kaydettiğiniz EQ ön ayarlarını listeler; Oyun, Sohbet, Mikrofon, Medya ve Aux için ayrı seçicileri vardır. Birini seçin, uygulanır. Yeniden yükle düğmesi listeyi tazeler."),
            ("RGB nasıl çalışır?", "Canlı önizlemeli R, G ve B kaydırıcıları, tek tıkla ön ayarlar (Turuncu, Kırmızı, Mavi, Yeşil, Beyaz, Kapalı) ve bir ton seçici. Renkler GameSense üzerinden cihazlarınıza gönderilir."),
        ]),
        ("Widget", [
            ("Balon modu nedir?", "Widget, küçük, her zaman üstte duran yüzen bir daireye dönüşür. Tam paneli yeniden açmak için tıklayın."),
            ("Görünümünü değiştirebilir miyim?", "Evet. 7 tema (Sunlight, Moonlight, Orbit, Aqua, Eris, Cyber ve Spider Lily), yatay düzen ve yüzde 40'tan 100'e şeffaflık kaydırıcısı var."),
            ("Görev çubuğumu kalabalıklaştırır mı?", "Hayır. Görev çubuğunda girişi yoktur. Sistem tepsisinde durur ve nereye koyduğunuzu hatırlar."),
            ("Windows ile birlikte açılır mı?", "İsterseniz. Windows ile başlatma Ayarlar'da bir seçenektir."),
        ]),
        ("Gizlilik ve destek", [
            ("VICE Sonar verilerimi topluyor mu?", "Hayır. Hesap, analiz ya da reklam yoktur. Widget kendi bilgisayarınızdaki Sonar hizmetiyle konuşur ve ayarlarını cihazınızda tutar. Gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine Windows sürümünüzle, VICE Sonar sürümünüzle (Ayarlar, Hakkında) ve SteelSeries GG sürümünüzle yazın."),
        ]),
    ],
    "changelog": [
        ("3.4.5", "2026", "ChatMix tekerleği düzeltmesi", ["Donanım ChatMix tekerleğinin widget tarafından doğru izlenmesi düzeltildi."]),
        ("3.4.4", "2026", "Windows ile başlatma düzeltmesi", ["Windows ile başlatma seçeneği, yükleyicinin oluşturduğu kısayoldan çalışacak şekilde düzeltildi."]),
        ("3.4.3", "2026", "Uygulama yürütme takma adı", ["VICE Sonar'ın terminalden ya da Çalıştır kutusundan başlatılabilmesi için uygulama yürütme takma adı eklendi."]),
        ("3.4.2", "2026", "Lite ve Tam sürüm", [
            "GitHub'da ücretsiz Lite yapısı ve Microsoft Store'da tam sürüm.",
            "Ses kanalları, ChatMix, EQ profilleri, GameSense RGB, balon modu, sistem tepsisi, 7 tema ve 7 dil.",
        ]),
    ],
    "press": {
        "oneliner": "VICE Sonar, SteelSeries Sonar'ı yöneten küçük, her zaman üstte duran bir Windows widget'ıdır: ses, ChatMix, EQ ve RGB.",
        "short": "VICE Sonar, SteelSeries Sonar kontrollerinizi kompakt bir widget'a koyar: her kanalın sesi ve sessize alması, ChatMix, cihaz başına EQ profilleri ve GameSense RGB; ayrıca balon modu ve 7 tema. Bağımsız bir uygulamadır ve SteelSeries ile bağlantılı değildir.",
        "long": "VICE Sonar, Windows 10 ve 11 için, ana uygulamayı açmadan SteelSeries GG Sonar'ı yöneten şık ve her zaman üstte duran bir masaüstü widget'ıdır. Ana, Oyun, Sohbet, Medya, Aux ve Mikrofon için ses kaydırıcıları ve sessize alma düğmeleri, donanım tekerleğini izleyen bir ChatMix dengesi, kanal başına çıkış cihazı değiştirme, her cihaz için kayıtlı Sonar EQ ön ayarlarınız ve ön ayarlı GameSense RGB aydınlatma sunar. Pencere çerçevesiz ve sürüklenebilirdir, yüzen bir balona küçülebilir, görev çubuğundan saklanır, tepsiden çalışır ve koyduğunuz yeri hatırlar. Yedi tema, yatay düzen, ayarlanabilir şeffaflık, ses kısayolları ve 7 arayüz dili (Türkçe, English, Français, Русский, Deutsch, Español, العربية) her kuruluma uymasını sağlar. Tam sürüm Microsoft Store'da; ücretsiz Lite yapısı GitHub'da. VICE Sonar bağımsız bir uygulamadır; SteelSeries ile bağlantılı değildir ve onun tarafından onaylanmamıştır.",
        "facts": [
            ("Ad", "VICE Sonar"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 ve Windows 11"),
            ("Gereksinim", "Kurulu ve çalışan SteelSeries GG ve Sonar"),
            ("Kategori", "Yardımcı programlar, ses"),
            ("Diller", "Türkçe, English, Français, Русский, Deutsch, Español, العربية"),
            ("Sürümler", "Microsoft Store'da tam sürüm, GitHub'da ücretsiz Lite"),
            ("Web sitesi", "vicesonar.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("panels_main", "Ses, EQ ve RGB panelleri"), ("panels_full", "Çıkış değiştirme ve tüm EQ profilleri"), ("themes_grid", "Yedi yerleşik tema"), ("themes_dark", "Koyu temalar"), ("panels_horizontal", "Yatay düzen ve ayarlar")],
        "notes": ["VICE Sonar bağımsızdır ve SteelSeries ile bağlantılı değildir. Lütfen resmî bir SteelSeries ürünü olarak tanıtmayın.", "Ekran görüntüleri örnek ayarları gösterir. Lütfen logoyu değiştirmeyin.", "VICE Sonar hakkında yazarken lütfen Microsoft Store sayfasına ya da vicesonar.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["VICE Sonar kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "VICE Sonar analiz, telemetri, reklam ya da takip kullanmaz.", "VICE Sonar hesap gerektirmez.", "İhtiyaç duyduğu her şey cihazınızda kalır."]),
        ("VICE Sonar bilgisayarınızda ne yapar", ["Sonar'ı yönetmek için VICE Sonar, kendi bilgisayarınızda çalışan SteelSeries GG ve Sonar hizmetleriyle konuşur. Widget üzerinden yönettiğiniz kanal seslerini, sessize almaları, ChatMix'i, çıkış cihazlarını, EQ ön ayarlarını ve aydınlatma renklerini okur ve değiştirir.",
                                                 "Ses kısayollarınıza tepki vermek için fare tekerleğini ve atadığınız tuşları izler. Yazdıklarınızı kaydetmez."]),
        ("Cihazınızda ne saklar", ["Ayarlarınız (tema, dil, düzen, şeffaflık, konum, görünen kanallar ve kısayollar) bilgisayarınızda saklanır. VICE Sonar'ı kaldırmak uygulamayı siler; ayar klasörünü de silebilirsiniz."]),
        ("Ağ kullanımı", ["VICE Sonar sunucularımıza veri göndermez. Microsoft Store'dan edindiyseniz satın alma, lisans, derecelendirme ve güncellemeleri Microsoft, Windows'a yerleşik hizmetler üzerinden yürütür.", "VICE Sonar bağlantılar içerir (örneğin web sitemize ya da e-posta göndermeye). Bir bağlantıyı açmak varsayılan tarayıcınızı ya da e-posta uygulamanızı kullanır; gittiğiniz sitenin kendi gizlilik politikası geçerlidir."]),
        ("Bağımsızlık", ["VICE Sonar, SteelSeries ile bağlantılı değildir ve onun tarafından onaylanmamıştır. SteelSeries, GG ve Sonar sahiplerinin ticari markalarıdır."]),
        ("Çocuklar", ["VICE Sonar, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "SteelSeries Sonar'ı yönetmenin birkaç yolu var. İşte VICE Sonar'ın en çok sorulan aracın yanında nerede durduğuna dürüst bir bakış. Satıcının kendi herkese açık sayfalarına baktık ve diğer aracın daha iyi seçim olduğu yerleri belirttik.",
        "items": [
            ("Tek başına SteelSeries GG (Sonar)", "SteelSeries'tan",
             "Tam Sonar uygulaması: eksiksiz mikser, ayrıntılı EQ ve cihaz kurulumu, yapılandırmalar ve tüm GG ekosistemi.",
             "VICE Sonar, Sonar'ın üstünde kompakt, her zaman üstte duran bir widget'tır. Günlük kontrolleri (ses, sessize alma, ChatMix, EQ ön ayarı seçimi, RGB rengi) GG'yi açmadan küçük bir pencerede, bir balonda, bir tepsi menüsünde ve kısayollarla verir.",
             "Sonar'ı kurarken, EQ ön ayarları hazırlarken ya da cihaz değiştirirken SteelSeries GG'de kalın. Oynarken hızlı kontrol için VICE Sonar'ı ekleyin."),
            ("Windows Ses Mikseri", "Windows'ta yerleşik",
             "Kurulum gerekmez; ses çalan her uygulama için bir kaydırıcı sunar.",
             "VICE Sonar, Windows mikserinin bilmediği Sonar kanallarını (Oyun, Sohbet, Medya, Aux, Mikrofon), ChatMix'i ve EQ ön ayarlarını yönetir. Sonar'ın çalışıyor olmasını ister.",
             "Sonar kullanmıyorsanız Windows mikserini kullanın."),
        ],
        "foot": "16 Kasım 2026'da herkese açık sayfalardan kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "one click", "chip": ("Sonar", "A compact control widget for SteelSeries Sonar"),
        "stats": [(6, "", "audio channels to control"), (7, "", "built-in themes"), (7, "", "interface languages"), (0, "", "taskbar clutter")],
        "explorer_note": "Pick a feature and the live VICE Sonar widget shows it. It works like the real app: drag the sliders, open the menus.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "How VICE Sonar compares", "compare_sub": "SteelSeries GG and the Windows mixer are both good. Here is where each one fits.",
    },
    "tr": {
        "emph": "tık uzağınızda", "chip": ("Sonar", "SteelSeries Sonar için kompakt bir kontrol widget'ı"),
        "stats": [(6, "", "yönetilen ses kanalı"), (7, "", "yerleşik tema"), (7, "", "arayüz dili"), (0, "", "görev çubuğu kalabalığı")],
        "explorer_note": "Bir özellik seçin, canlı VICE Sonar widget'ı onu gösterir. Gerçek uygulama gibi çalışır: kaydırıcıları sürükleyin, menüleri açın.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "VICE Sonar nasıl bir yerde duruyor", "compare_sub": "SteelSeries GG ve Windows mikseri ikisi de iyi. İşte her birinin uygun olduğu yer.",
    },
}

# Feature explorer scenes, in the order of APPS["vicesonar"]["en"]["features"]. None = the demo has no view for that feature.
SCENES = [
    [[0, {"view": "flyout", "tab": "audio", "open": None}]],
    [[0, {"view": "flyout", "tab": "audio", "open": None}], [900, {"open": "game"}], [2800, {"route": {"game": 1}, "open": None}]],
    [[0, {"view": "flyout", "tab": "audio", "open": None}], [700, {"mix": 0.9}], [2000, {"mix": 0.12}], [3300, {"mix": 0.5}]],
    [[0, {"view": "flyout", "tab": "eq", "eqOpen": None}], [900, {"eqOpen": "game"}]],
    [[0, {"view": "flyout", "tab": "rgb"}]],
    None,
    [[0, {"view": "settings", "tab": "audio"}]],
    None,
]

DATA = {"en": EN, "tr": TR}
