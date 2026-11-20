"""Content for the Hotpad side pages and home extras (English and Turkish).

Facts: the Hotpad project's README, installer script (Hotpad.iss), install notes, EULA and UI strings, and the rivals' own pages
(Microsoft Learn "PowerToys Keyboard Manager", autohotkey.com), checked 2026-11-16.
Hotpad is distributed as an installer from kingpindev.com/hotpad, not through the Microsoft Store.
"""

CONTACT = "hotpad@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is Hotpad?", "Hotpad turns a second keyboard (a small gaming keypad, a half keyboard or any spare keyboard) into a dedicated macro keyboard. Its keys never reach Windows; they only run the macros you set. Your main keyboard keeps working normally."),
            ("What do I need?", "Windows 10 or 11 (64-bit), a second keyboard and the optional Interception driver, which is what lets Hotpad tell the two keyboards apart. The installer includes the .NET runtime and installs Microsoft's WebView2 if it is missing."),
            ("Is it free?", "Hotpad is free for personal use. Commercial use needs written permission, see the licence in the installer."),
            ("Where do I get it?", "From the download button on this site (kingpindev.com/hotpad). It is not on the Microsoft Store."),
        ]),
        ("The driver", [
            ("Why does it need a driver?", "Windows treats every keyboard as one input device. To react to only one of them, Hotpad uses the open-source Interception driver, which lets it see which keyboard a key came from before Windows does."),
            ("Does the installer install the driver?", "Only if you tick the optional box, and only if it is not installed yet. It needs administrator approval and a restart. If the driver is already there, setup leaves it alone."),
            ("What happens if Hotpad crashes or is closed?", "The driver stops sending keys to Hotpad and your keyboards go back to normal on their own, so you cannot get locked out."),
            ("Can I use it in online games?", "Yes, but the responsibility is yours. Check the rules of every game you play before using a macro tool: some games and their anti-cheat systems restrict input drivers or automation. League of Legends now blocks macro programs at the kernel level, so Hotpad does not work in that game."),
        ]),
        ("Using Hotpad", [
            ("How do I pick my second keyboard?", "Press Select keyboard and tap any key on the small keyboard within 15 seconds. Hotpad remembers its hardware ID. If two keyboards share the same ID, Hotpad asks you to choose again instead of guessing."),
            ("What can a key do?", "Open a program, file or link; type a ready-made text; send a shortcut such as Ctrl+Shift+Esc; run a sequence of steps with delays; or mute and unmute your Windows microphone."),
            ("Can I have different setups for different games or jobs?", "Yes. Profiles hold separate sets of keys. Switch from the app, from the tray menu or with a key you choose. Drag profiles to reorder them."),
            ("Do changes apply while the editor is open?", "Yes. Macros keep working while you edit and every change is applied live."),
            ("Does it start with Windows?", "If you turn on Start with Windows, it runs quietly in the system tray when you sign in."),
        ]),
        ("Your data", [
            ("Where are my settings?", "In %LOCALAPPDATA%\\Hotpad\\macros.json. Updating or uninstalling Hotpad keeps that file. You can also export all profiles from Settings."),
            ("Does Hotpad collect my data?", "No accounts, analytics or advertising. Hotpad does not send anything over the internet. See the privacy page."),
            ("How do I get help or report a problem?", "Write to hotpad@kingpindev.com with your Windows version, your Hotpad version and what you were doing."),
        ]),
    ],
    "changelog": [
        ("1.0.0", "16 November 2026", "First release", [
            "Turns a second keyboard into a macro keyboard using the Interception driver; the main keyboard is untouched.",
            "Five actions per key: open a program, file or link, type text, send a shortcut, run a step sequence with delays, and control the Windows microphone.",
            "Profiles with drag to reorder, a profile switch key and a tray menu.",
            "Live editor with a visual key layout, key capture from the small keyboard and a searchable list of your installed apps.",
            "English and Turkish interface, Start with Windows, and one-click export of all your profiles.",
            "Per-user installer with the .NET runtime included. The Interception driver is an optional step in setup.",
        ]),
    ],
    "press": {
        "oneliner": "Hotpad turns a second keyboard into a dedicated macro keyboard for Windows.",
        "short": "Hotpad turns a spare keyboard into a macro keyboard. Its keys never reach Windows, so they can open programs, type text, send shortcuts, run step sequences and mute your microphone, while your main keyboard works as usual. Profiles, a live visual editor and a tray icon keep it out of the way. Free for personal use.",
        "long": "Hotpad is a Windows app for anyone with a small keypad or a spare keyboard lying around. Using the open-source Interception driver, it tells your keyboards apart and captures only the one you choose, so every key on it becomes a button for something you do often: opening a program or link, typing an address or a reply, sending a shortcut, running a short sequence of steps with delays, or toggling the Windows microphone while a game is full screen. A visual editor shows the key layout, lets you capture a key by pressing it and keeps working live while you edit. Profiles hold separate sets of keys for different games or jobs and can be switched from the app, the tray or a key. If Hotpad ever closes, the driver hands the keyboards back to normal. The per-user installer includes the .NET runtime, and the interface is available in English and Turkish.",
        "facts": [
            ("Name", "Hotpad"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 and Windows 11, 64-bit"),
            ("Version", "1.0.0, about 53 MB installer"),
            ("Category", "Utilities, productivity"),
            ("Price", "Free for personal use"),
            ("Requires", "A second keyboard; the optional Interception driver"),
            ("Distribution", "Download from kingpindev.com/hotpad (not on the Microsoft Store)"),
            ("Website", "hotpad.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "Macros and the key layout"), ("shot-2", "Assigning a program"), ("shot-3", "A step sequence"), ("shot-4", "Settings")],
        "notes": ["Hotpad is not affiliated with Microsoft or with the Interception project. Please do not describe it as their product.", "Screenshots show example macros. Please do not alter the logo.", "Please mention that people are responsible for checking the rules of the games they play. League of Legends blocks macro programs at the kernel level, so Hotpad does not work in that game."],
    },
    "privacy": [
        ("Summary", ["Hotpad does not collect, sell or share your personal data.", "Hotpad does not use analytics, telemetry, advertising or tracking.", "Hotpad does not require an account.", "Your profiles and settings stay on your device."]),
        ("What Hotpad stores on your device", ["Your profiles, key assignments and settings are saved in %LOCALAPPDATA%\\Hotpad\\macros.json. Updating or uninstalling Hotpad does not delete that file. Exporting a backup writes a JSON file to the place you choose."]),
        ("What Hotpad reads", ["To work, Hotpad sees which keyboard a key came from and the key itself, but only the macro keyboard you selected is captured and its keys are never typed into other apps. The keys of your other keyboards are passed through untouched and are not stored. The text you assign to a key is stored only in your settings file.",
                               "The list of installed apps in the editor is read from Windows on your PC and is not sent anywhere."]),
        ("What Hotpad connects to", ["Hotpad does not connect to the internet while it runs. The setup program downloads Microsoft's WebView2 runtime from Microsoft only if it is missing from your PC. The download button on this website is served by kingpindev.com, which, like any web server, may keep standard request logs (such as your internet address and the time of the request). We do not use them to identify you."]),
        ("The Interception driver", ["If you choose to install it, the Interception keyboard driver (open source, LGPL-3.0) is installed with administrator approval. It runs on your PC and does not send data anywhere. Uninstall it with its own uninstaller if you no longer need it."]),
        ("Children", ["Hotpad does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "There are other ways to make keys do more on Windows. Here is an honest look at how Hotpad fits next to two of the best known, and where each is the better pick.",
        "items": [
            ("PowerToys Keyboard Manager", "Free, from Microsoft",
             "Remaps keys and shortcuts, sends text, starts apps and opens links, with per-app shortcuts and no driver. It is part of Microsoft PowerToys.",
             "Hotpad works per keyboard: a second keyboard can be used only for macros while your main keyboard stays as it is, which PowerToys says it cannot do. Hotpad also has profiles, step sequences with delays and microphone control.",
             "Use Keyboard Manager if you just want to remap the keys of your only keyboard or add shortcuts, and do not want to install a driver."),
            ("AutoHotkey", "Free and open source",
             "A scripting language for desktop automation with hotkeys, key remapping and hotstrings. Extremely flexible if you are happy to write scripts.",
             "Hotpad needs no scripting: you pick a keyboard, click a key and choose an action in a visual editor, and changes apply live.",
             "Use AutoHotkey when you want full scripting power and complex logic, and do not mind writing code."),
        ],
        "foot": "Checked on 16 November 2026 against Microsoft Learn and autohotkey.com. Tools change; if something here is out of date, tell us at hotpad@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("Hotpad nedir?", "Hotpad, ikinci bir klavyeyi (küçük bir oyun tuş takımı, yarım klavye ya da boşta duran herhangi bir klavye) özel bir makro klavyeye çevirir. Tuşları Windows'a hiç gitmez, yalnızca belirlediğiniz makroları çalıştırır. Ana klavyeniz her zamanki gibi çalışır."),
            ("Neye ihtiyacım var?", "Windows 10 ya da 11 (64 bit), ikinci bir klavye ve Hotpad'in iki klavyeyi ayırt etmesini sağlayan isteğe bağlı Interception sürücüsü. Yükleyici .NET çalışma zamanını içerir, WebView2 yoksa Microsoft'tan kurar."),
            ("Ücretsiz mi?", "Hotpad kişisel kullanım için ücretsizdir. Ticari kullanım için yazılı izin gerekir, yükleyicideki lisansa bakın."),
            ("Nereden edinirim?", "Bu sitedeki indirme düğmesinden (kingpindev.com/hotpad). Microsoft Store'da değildir."),
        ]),
        ("Sürücü", [
            ("Neden sürücü gerekiyor?", "Windows tüm klavyeleri tek bir giriş aygıtı olarak görür. Yalnızca birine tepki verebilmek için Hotpad, bir tuşun hangi klavyeden geldiğini Windows'tan önce görmesini sağlayan açık kaynaklı Interception sürücüsünü kullanır."),
            ("Yükleyici sürücüyü kuruyor mu?", "Yalnızca isteğe bağlı kutuyu işaretlerseniz ve sürücü henüz kurulu değilse. Yönetici izni ve yeniden başlatma gerekir. Sürücü zaten varsa kurulum ona dokunmaz."),
            ("Hotpad çökerse ya da kapanırsa ne olur?", "Sürücü tuşları Hotpad'e göndermeyi bırakır ve klavyeleriniz kendiliğinden normale döner; dışarıda kalmazsınız."),
            ("Çevrimiçi oyunlarda kullanabilir miyim?", "Evet, kullanabilirsiniz; ancak sorumluluk size aittir. Bir makro aracı kullanmadan önce oynadığınız her oyunun kurallarını kontrol edin: bazı oyunlar ve hile önleme sistemleri giriş sürücülerini ya da otomasyonu kısıtlar. League of Legends artık makro programlarını çekirdek (kernel) seviyesinde engelliyor; bu yüzden Hotpad bu oyunda çalışmıyor."),
        ]),
        ("Hotpad'i kullanma", [
            ("İkinci klavyemi nasıl seçerim?", "Klavye seç'e basın ve 15 saniye içinde küçük klavyede bir tuşa dokunun. Hotpad donanım kimliğini hatırlar. İki klavye aynı kimliği paylaşıyorsa Hotpad tahmin etmek yerine yeniden seçmenizi ister."),
            ("Bir tuş ne yapabilir?", "Bir program, dosya ya da bağlantı açar; hazır bir metin yazar; Ctrl+Shift+Esc gibi bir kısayol gönderir; beklemeli bir adım dizisi çalıştırır; ya da Windows mikrofonunuzu kapatıp açar."),
            ("Farklı oyunlar ya da işler için ayrı düzenlerim olabilir mi?", "Evet. Profiller ayrı tuş kümeleri tutar. Uygulamadan, tepsi menüsünden ya da seçtiğiniz bir tuşla geçebilirsiniz. Sıralamak için profilleri sürükleyin."),
            ("Düzenleyici açıkken değişiklikler uygulanıyor mu?", "Evet. Düzenlerken makrolar çalışmaya devam eder ve her değişiklik canlı uygulanır."),
            ("Windows ile başlıyor mu?", "Windows ile başlat'ı açarsanız oturum açtığınızda sistem tepsisinde sessizce çalışır."),
        ]),
        ("Verileriniz", [
            ("Ayarlarım nerede?", "%LOCALAPPDATA%\\Hotpad\\macros.json içinde. Hotpad'i güncellemek ya da kaldırmak bu dosyayı silmez. Ayarlar'dan tüm profilleri dışa da aktarabilirsiniz."),
            ("Hotpad verilerimi topluyor mu?", "Hesap, analiz ya da reklam yoktur. Hotpad internet üzerinden hiçbir şey göndermez. Gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "hotpad@kingpindev.com adresine Windows sürümünüzle, Hotpad sürümünüzle ve ne yaptığınızla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("1.0.0", "16 Kasım 2026", "İlk sürüm", [
            "Interception sürücüsüyle ikinci bir klavyeyi makro klavyeye çevirir; ana klavyeye dokunulmaz.",
            "Tuş başına beş eylem: program, dosya ya da bağlantı açma, metin yazma, kısayol gönderme, beklemeli adım dizisi çalıştırma ve Windows mikrofonunu yönetme.",
            "Sürükleyerek sıralanan profiller, bir profil geçiş tuşu ve tepsi menüsü.",
            "Görsel tuş düzenli canlı düzenleyici, küçük klavyeden tuş yakalama ve kurulu uygulamalarınızın aranabilir listesi.",
            "İngilizce ve Türkçe arayüz, Windows ile başlat ve tüm profillerinizi tek tıkla dışa aktarma.",
            "Kullanıcı başına kurulan, .NET çalışma zamanını içeren yükleyici. Interception sürücüsü kurulumda isteğe bağlı bir adımdır.",
        ]),
    ],
    "press": {
        "oneliner": "Hotpad, ikinci bir klavyeyi Windows için özel bir makro klavyeye çevirir.",
        "short": "Hotpad, boştaki bir klavyeyi makro klavyeye çevirir. Tuşları Windows'a hiç gitmez; program açar, metin yazar, kısayol gönderir, adım dizileri çalıştırır ve mikrofonunuzu kapatır; ana klavyeniz her zamanki gibi çalışır. Profiller, canlı görsel düzenleyici ve bir tepsi simgesi yolunuzdan çekilir. Kişisel kullanım için ücretsiz.",
        "long": "Hotpad, küçük bir tuş takımı ya da boşta bir klavyesi olan herkes için bir Windows uygulamasıdır. Açık kaynaklı Interception sürücüsüyle klavyelerinizi ayırt eder ve yalnızca seçtiğinizi yakalar; böylece üzerindeki her tuş, sık yaptığınız bir işin düğmesine dönüşür: bir program ya da bağlantı açmak, bir adres ya da yanıt yazmak, bir kısayol göndermek, beklemeli kısa bir adım dizisi çalıştırmak ya da oyun tam ekranken Windows mikrofonunu açıp kapatmak. Görsel bir düzenleyici tuş düzenini gösterir, bir tuşa basarak yakalamanızı sağlar ve düzenlerken canlı çalışmaya devam eder. Profiller farklı oyunlar ya da işler için ayrı tuş kümeleri tutar ve uygulamadan, tepsiden ya da bir tuştan değiştirilebilir. Hotpad kapanırsa sürücü klavyeleri normale döndürür. Kullanıcı başına kurulan yükleyici .NET çalışma zamanını içerir; arayüz İngilizce ve Türkçedir.",
        "facts": [
            ("Ad", "Hotpad"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 ve Windows 11, 64 bit"),
            ("Sürüm", "1.0.0, yaklaşık 53 MB yükleyici"),
            ("Kategori", "Yardımcı programlar, üretkenlik"),
            ("Fiyat", "Kişisel kullanım için ücretsiz"),
            ("Gereksinim", "İkinci bir klavye; isteğe bağlı Interception sürücüsü"),
            ("Dağıtım", "kingpindev.com/hotpad adresinden indirme (Microsoft Store'da değil)"),
            ("Web sitesi", "hotpad.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Makrolar ve tuş düzeni"), ("shot-2", "Program atama"), ("shot-3", "Adım dizisi"), ("shot-4", "Ayarlar")],
        "notes": ["Hotpad, Microsoft ya da Interception projesiyle bağlantılı değildir. Lütfen onların ürünü olarak tanıtmayın.", "Ekran görüntüleri örnek makroları gösterir. Lütfen logoyu değiştirmeyin.", "Lütfen insanların oynadıkları oyunların kurallarını kontrol etmekten kendilerinin sorumlu olduğunu belirtin. League of Legends makro programlarını çekirdek seviyesinde engelliyor, bu yüzden Hotpad bu oyunda çalışmıyor."],
    },
    "privacy": [
        ("Özet", ["Hotpad kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "Hotpad analiz, telemetri, reklam ya da takip kullanmaz.", "Hotpad hesap gerektirmez.", "Profilleriniz ve ayarlarınız cihazınızda kalır."]),
        ("Hotpad cihazınızda ne saklar", ["Profilleriniz, tuş atamalarınız ve ayarlarınız %LOCALAPPDATA%\\Hotpad\\macros.json dosyasına kaydedilir. Hotpad'i güncellemek ya da kaldırmak bu dosyayı silmez. Yedek dışa aktarmak, seçtiğiniz yere bir JSON dosyası yazar."]),
        ("Hotpad ne okur", ["Çalışabilmek için Hotpad bir tuşun hangi klavyeden geldiğini ve tuşun kendisini görür; ancak yalnızca seçtiğiniz makro klavye yakalanır ve tuşları başka uygulamalara yazılmaz. Diğer klavyelerinizin tuşları dokunulmadan geçirilir ve saklanmaz. Bir tuşa atadığınız metin yalnızca ayar dosyanızda saklanır.",
                              "Düzenleyicideki kurulu uygulamalar listesi bilgisayarınızdaki Windows'tan okunur ve hiçbir yere gönderilmez."]),
        ("Hotpad nelere bağlanır", ["Hotpad çalışırken internete bağlanmaz. Kurulum programı, bilgisayarınızda yoksa Microsoft'un WebView2 çalışma zamanını yalnızca Microsoft'tan indirir. Bu web sitesindeki indirme düğmesi kingpindev.com tarafından sunulur; her web sunucusu gibi standart istek günlükleri (internet adresiniz ve isteğin zamanı gibi) tutabilir. Bunları sizi tanımlamak için kullanmayız."]),
        ("Interception sürücüsü", ["Kurmayı seçerseniz Interception klavye sürücüsü (açık kaynak, LGPL-3.0) yönetici izniyle kurulur. Bilgisayarınızda çalışır ve hiçbir yere veri göndermez. Artık gerekmiyorsa kendi kaldırıcısıyla kaldırın."]),
        ("Çocuklar", ["Hotpad, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Windows'ta tuşlara daha fazla iş yaptırmanın başka yolları da var. İşte Hotpad'in en bilinen ikisinin yanında nerede durduğuna ve her birinin daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("PowerToys Klavye Yöneticisi", "Ücretsiz, Microsoft'tan",
             "Tuşları ve kısayolları yeniden eşler, metin gönderir, uygulama başlatır ve bağlantı açar; uygulamaya özel kısayollar vardır ve sürücü gerekmez. Microsoft PowerToys'un parçasıdır.",
             "Hotpad klavye başına çalışır: ikinci bir klavye yalnızca makro için kullanılırken ana klavyeniz olduğu gibi kalır; PowerToys bunu yapamadığını söylüyor. Hotpad ayrıca profiller, beklemeli adım dizileri ve mikrofon denetimi sunar.",
             "Yalnızca tek klavyenizin tuşlarını yeniden eşlemek ya da kısayol eklemek istiyor ve sürücü kurmak istemiyorsanız Klavye Yöneticisi'ni kullanın."),
            ("AutoHotkey", "Ücretsiz ve açık kaynak",
             "Kısayol tuşları, tuş yeniden eşleme ve hotstring'ler içeren bir masaüstü otomasyon betik dili. Betik yazmaya razıysanız son derece esnek.",
             "Hotpad betik gerektirmez: bir klavye seçer, bir tuşa tıklar ve görsel düzenleyicide bir eylem seçersiniz; değişiklikler canlı uygulanır.",
             "Tam betik gücü ve karmaşık mantık istiyor ve kod yazmaya aldırmıyorsanız AutoHotkey'i kullanın."),
        ],
        "foot": "16 Kasım 2026'da Microsoft Learn ve autohotkey.com'a karşı kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz hotpad@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "every key", "chip": ("1.0.0", "Free for personal use, installs in a minute"),
        "stats": [(5, "", "actions per key: program, text, shortcut, sequence, microphone"), (2, "", "keyboards, only one of them captured"), (15, " s", "to pick your keyboard by pressing a key"), (0, "", "accounts, analytics or data sent")],
        "explorer_note": "Pick a feature and the real Hotpad interface shows it. The keyboard is made up and nothing is saved or run.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "Why choose Hotpad", "compare_sub": "Two well-known ways to remap keys on Windows, and what Hotpad does differently.",
    },
    "tr": {
        "emph": "işe yarasın", "chip": ("1.0.0", "Kişisel kullanım için ücretsiz, bir dakikada kurulur"),
        "stats": [(5, "", "tuş başına eylem: program, metin, kısayol, dizi, mikrofon"), (2, "", "klavye, yalnızca biri yakalanır"), (15, " sn", "içinde bir tuşa basarak klavyenizi seçin"), (0, "", "hesap, analiz ya da gönderilen veri")],
        "explorer_note": "Bir özellik seçin, gerçek Hotpad arayüzü onu gösterir. Klavye uydurmadır, hiçbir şey kaydedilmez ya da çalıştırılmaz.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "Neden Hotpad'i tercih etmelisiniz", "compare_sub": "Windows'ta tuşları yeniden eşlemenin iki bilinen yolu ve Hotpad'in farklı yaptığı.",
    },
}

# Feature explorer scenes (the real Hotpad interface in the frame, language independent: they click by selector), in the order of APPS["hotpad"]["en"]["features"].
CLOSE = {"click": ".dialog-head .icon-button"}
MACROS = {"click": ".app-navigation button:nth-child(1)"}


def _profile(n):
    return {"click": ".profile-nav button:nth-child(%d)" % n}


def _key(row, col):
    return {"click": ".keyboard-row:nth-child(%d) .keycap:nth-child(%d)" % (row, col)}


SCENES = [
    [[0, CLOSE], [40, MACROS], [80, _profile(1)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(1)], [160, _key(1, 2)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(1)], [160, _key(3, 2)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(1)], [160, _key(5, 4)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(3)], [160, _key(6, 3)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(2)], [160, _key(1, 2)]],
    [[0, CLOSE], [40, MACROS], [80, _profile(3)]],
    [[0, CLOSE], [200, {"click": ".app-navigation button:nth-child(2)"}]],
]

# "How it works" scroll story: the feature-explorer scene shown for each of the three steps.
STORY = [0, 3, 6]

# Feature matrix for the comparison table. A tick = confirmed on the rival's own page (Microsoft Learn, autohotkey.com) or in the app; a dash = not mentioned there.
MATRIX = {
    "en": {
        "cols": [("Hotpad", "This app"), ("PowerToys Keyboard Manager", "From Microsoft"), ("AutoHotkey", "Scripting, open source")],
        "rows": [("Point-and-click editor", [1, 1, 0]), ("Macros for one chosen keyboard only", [1, 0, 0]), ("Start a program or open a link", [1, 1, 0]), ("Type ready-made text", [1, 1, 1]),
                 ("Send keyboard shortcuts", [1, 1, 1]), ("Multi-step sequences with delays", [1, 0, 1]), ("Windows microphone mute from a key", [1, 0, 0]), ("Works without installing a driver", [0, 1, 0])],
        "legend": "A tick means we confirmed it: Microsoft Learn's Keyboard Manager page for PowerToys, autohotkey.com for AutoHotkey, the Hotpad app for Hotpad. A dash means it is not mentioned there. Hotpad needs the optional Interception driver to tell keyboards apart; PowerToys states that it cannot have different mappings for different keyboards.",
        "bars": "Confirmed features",
        "checked": "Checked on 16 November 2026.",
    },
    "tr": {
        "cols": [("Hotpad", "Bu uygulama"), ("PowerToys Klavye Yöneticisi", "Microsoft'tan"), ("AutoHotkey", "Betik dili, açık kaynak")],
        "rows": [("Göster-tıkla düzenleyici", [1, 1, 0]), ("Yalnızca seçilen tek klavye için makro", [1, 0, 0]), ("Program başlatma ya da bağlantı açma", [1, 1, 0]), ("Hazır metin yazma", [1, 1, 1]),
                 ("Klavye kısayolu gönderme", [1, 1, 1]), ("Beklemeli çok adımlı diziler", [1, 0, 1]), ("Bir tuştan Windows mikrofonunu kapatma", [1, 0, 0]), ("Sürücü kurmadan çalışma", [0, 1, 0])],
        "legend": "Onay işareti, doğruladığımız anlamına gelir: PowerToys için Microsoft Learn'ün Klavye Yöneticisi sayfası, AutoHotkey için autohotkey.com, Hotpad için Hotpad uygulaması. Çizgi, orada anılmadığı anlamına gelir. Hotpad klavyeleri ayırt etmek için isteğe bağlı Interception sürücüsüne ihtiyaç duyar; PowerToys farklı klavyeler için farklı eşlemeler yapılamadığını belirtir.",
        "bars": "Doğrulanan özellikler",
        "checked": "16 Kasım 2026'da kontrol edildi.",
    },
}

DATA = {"en": EN, "tr": TR}
