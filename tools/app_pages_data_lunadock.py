"""Content for the LunaDock side pages (FAQ, changelog, press kit, privacy, compare), English and Turkish.

Facts come from the app's own notes (Stacks/AGENTS.md version table, README), the published privacy policy and the live
LunaDock page. Competitor notes are limited to what the vendor's own public pages and press coverage say (checked 2026-11-15).
"""

CONTACT = "lunadock@kingpindev.com"
UPDATED = "2026-11-15"

EN = {
    "faq": [
        ("Getting started", [
            ("What is LunaDock?", "LunaDock is a desktop organizer for Windows. It gathers the files, folders and shortcuts on your desktop into tidy stacks (images, movies, music, documents, games, apps and more) that fan open when you click them."),
            ("Which versions of Windows does it support?", "Windows 10 (version 2004 or later) and Windows 11."),
            ("Where do I get it?", "From the Microsoft Store. Updates arrive automatically through the Store."),
            ("How much does it cost?", "LunaDock is a paid app on the Microsoft Store. The Store page always shows the current price."),
            ("Which languages does it speak?", "16 languages, including English, Türkçe, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी and العربية. It follows your Windows language by default."),
        ]),
        ("Your files", [
            ("Does LunaDock move or change my files?", "No. Your files stay where they are on the desktop. LunaDock only displays them in stacks, and it only renames or deletes something when you ask it to from its menu."),
            ("What happens to my desktop icons?", "The original desktop icons are hidden while LunaDock runs and come back as soon as it closes."),
            ("What happens to new files I save to the desktop?", "They join the right stack by themselves, by type or by date depending on how you group."),
            ("Can I open, rename and delete files from a stack?", "Yes. LunaDock uses the familiar Windows right-click menu, so Open with, Send to, Properties and the rest are all there. Delete sends items to the Recycle Bin, and holding Shift deletes permanently."),
            ("Can I drag files in and out of stacks?", "Yes. Drag files to any app, or drop them on the desktop or on a folder. The usual Windows rules apply: Ctrl copies, Shift moves and Alt creates a shortcut."),
        ]),
        ("Stacks and looks", [
            ("Can I group by date instead of type?", "Yes. Group by file type, or by date to see Today, Yesterday, Previous 7 Days and older."),
            ("Can I change the icons?", "Yes. Choose from more than 20 icon packs, from Fluent and Glass to Neon, Pastel and Aurora, or give any stack your own icon or image."),
            ("Can I put the stacks somewhere else on the screen?", "Yes. They can sit on the top, bottom, left or right edge, and you can adjust icon size, margins and the background to match your wallpaper."),
            ("Does it work with more than one monitor?", "Yes. LunaDock supports multiple monitors, and you can choose which monitor shows the stacks."),
            ("Does it work with Wallpaper Engine, Rainmeter and similar tools?", "It is built to coexist with them: LunaDock leaves room for desktop widgets near the stacks, and clicks on empty space can pass through to an interactive wallpaper."),
        ]),
        ("Keyboard and speed", [
            ("Is there a quick preview?", "Yes. Press Space on a file for a large preview of images, text and code, video and audio, and folder contents. If you use QuickLook, LunaDock hands the preview to it."),
            ("Which keyboard shortcuts are there?", "Arrow keys move between items, Enter opens, F2 renames, Delete moves to the Recycle Bin, Ctrl+A, C, X and V select, copy, cut and paste, F5 refreshes and Esc closes the stacks."),
            ("Does it start with Windows?", "It can. Starting with Windows is an option in the settings."),
        ]),
        ("Privacy and support", [
            ("Does LunaDock collect my data?", "No. There is no account, analytics, telemetry, advertising or tracking. Everything stays on your PC. See the privacy page."),
            ("What if LunaDock stops responding?", "If something goes wrong, LunaDock logs the error, brings your original desktop icons back and restarts itself."),
            ("How do I get help or report a problem?", "Write to lunadock@kingpindev.com with your Windows version, your LunaDock version (Settings, About) and what you were doing."),
        ]),
    ],
    "changelog": [
        ("1.0.8", "October 2026", "More categories, better monitors", [
            "New 3D Models category, and wider recognition of design, video and audio files.",
            "Monitors are remembered by a stable ID and shown by name in the settings.",
            "Wireless displays (Miracast, Samsung Second Screen) are detected, with an option to ignore wireless displays.",
            "A development build no longer touches the automatic start-up entry.",
            "Fix for a drag image that could get stuck on screen.",
        ]),
        ("1.0.7", "October 2026", "Crash fix", [
            "Fixed a crash when you right-click a shortcut that has no target and pick a command. The menu was being released before the command finished.",
        ]),
        ("1.0.5 to 1.0.6", "October 2026", "Starts as soon as you sign in", [
            "LunaDock now starts the moment you sign in to Windows.",
            "Fixed the settings window opening at start-up because of the Store's start-up entry.",
            "Start with Windows is on by default, and LunaDock gets high priority for the first 30 seconds after an automatic start.",
        ]),
        ("1.0.4", "October 2026", "Deck view and many fixes", [
            "New Deck view (the default) with Wrap and Scroll options, and smoother Deck performance.",
            "Stacks close when you click outside them, and opening and closing quickly now works smoothly.",
            "Fixed a crash when an item that had not been realised yet was moved in the Deck.",
            "Fixed a blue plate behind the taskbar icon.",
            "Custom stacks that follow your own rules, with a confirmation before you delete one.",
            "Right-click works inside Wallpaper Engine, context menus are much faster, and menus close when you click another window.",
        ]),
        ("1.0.0 to 1.0.3", "October 2026", "First Store releases", [
            "LunaDock arrives on the Microsoft Store: automatic stacks by type or date, 20+ icon packs, any screen edge, multiple monitors and the Windows right-click menu.",
        ]),
    ],
    "press": {
        "oneliner": "LunaDock sorts your Windows desktop into tidy stacks that fan open with a click, and never moves your files.",
        "short": "LunaDock gathers the files, folders and shortcuts on your Windows desktop into neat stacks: images, movies, music, documents, games, apps and more. Click a stack to fan it open, click again to tuck it away. Your files stay exactly where they are.",
        "long": "LunaDock is a desktop organizer for Windows 10 and 11. It turns a cluttered desktop into stacks grouped by file type or by date, placed on any edge of any monitor. Click a stack to fan it open, preview files with Space, and use the familiar Windows right-click menu to open, rename and delete. More than 20 icon packs, from Fluent and Glass to Neon, Pastel and Aurora, let you match your wallpaper, and any stack can take your own icon or image. LunaDock never moves your files: it only shows them in stacks, hides the original desktop icons while it runs and brings them back when it closes. It speaks 16 languages, has no account, analytics or tracking, and is available on the Microsoft Store.",
        "facts": [
            ("Name", "LunaDock"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (2004+) and Windows 11"),
            ("Category", "Utilities, desktop"),
            ("Languages", "16, including English, Türkçe, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी, العربية"),
            ("Price", "Paid app on the Microsoft Store"),
            ("Website", "lunadock.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("01-Before-After", "Before and after"), ("02-Icon-Packs", "20+ icon packs"), ("03-Open-Your-Stacks", "Open a stack, find your file"), ("04-Organized-Your-Way", "Organised your way")],
        "notes": ["Screenshots show example files. Please do not alter the logo.", "When you write about LunaDock, please link to its Microsoft Store page or to lunadock.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["LunaDock does not collect, sell or share your personal data.", "LunaDock does not use analytics, telemetry, advertising or tracking of any kind.", "LunaDock does not require an account.", "Everything the app needs stays on your device."]),
        ("Information processed on your device", ["To organize your desktop, LunaDock reads the names, types, icons, thumbnails and dates of the files, folders and shortcuts on your Windows desktop. This information is used only to display your stacks and is never sent anywhere.",
                                                  "LunaDock stores the following on your device, in your Windows user profile: your settings (such as language, icon pack and stack position), your layout (the order of your stacks and any custom names or icons you choose) and log files (technical diagnostic messages, for example errors, that help troubleshoot problems; logs stay on your device and are only shared if you choose to send them to us yourself). You can delete this information at any time by uninstalling LunaDock.",
                                                  "LunaDock does not move, modify, upload or delete your desktop files unless you explicitly ask it to, for example by renaming or deleting an item from its menu."]),
        ("Microsoft Store", ["If you obtained LunaDock from the Microsoft Store, purchases, licensing, ratings and app updates are handled by Microsoft. When LunaDock checks for updates or opens the rating dialog, it uses the Microsoft Store services built into Windows. This information is processed by Microsoft under the Microsoft Privacy Statement. We do not receive any personal information about you from these services beyond the standard sales and usage reports Microsoft provides to developers."]),
        ("Links", ["LunaDock contains links (for example to our website or to send an email). Opening a link uses your default browser or email app, and the website you visit is governed by its own privacy policy."]),
        ("Children", ["LunaDock does not knowingly collect any information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update it on this page and change the effective date."]),
    ],
    "privacy_meta": "Effective date: October 13, 2026",
    "compare": {
        "intro": "There are a few good ways to tame a cluttered Windows desktop. Here is an honest look at how LunaDock fits next to the ones people ask about most. We checked each tool's own public pages and press coverage, and we point out where another tool is the better pick.",
        "items": [
            ("The Windows desktop on its own", "Built in to Windows",
             "Nothing to install. You can sort and align the icons on the desktop and keep your files wherever you like.",
             "LunaDock gathers the desktop into stacks by type or date, new files find their stack by themselves, the stacks tuck away on a screen edge, and your files never move.",
             "Stay with plain Windows if you keep only a handful of icons on the desktop."),
            ("Stardock Fences", "Paid desktop utility from Stardock",
             "Shaded containers (fences) that you place and size on the desktop, with rules that sort icons into them, tabs, roll-up fences and icon tinting.",
             "LunaDock does not draw containers on your wallpaper. It folds everything into compact stacks on one screen edge that fan open on a click, picks the stack for each file automatically, and leaves the files where they are.",
             "Pick Fences if you want free-form containers laid out across the desktop, rules you write yourself or business deployment tools."),
        ],
        "foot": "Checked on 15 November 2026 from public pages and press coverage. Tools change; if something here is out of date, tell us at lunadock@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("LunaDock nedir?", "LunaDock, Windows için bir masaüstü düzenleyicisidir. Masaüstünüzdeki dosya, klasör ve kısayolları (resimler, filmler, müzik, belgeler, oyunlar, uygulamalar ve daha fazlası) tıklayınca yelpaze gibi açılan düzenli yığınlarda toplar."),
            ("Hangi Windows sürümlerini destekliyor?", "Windows 10 (2004 ve sonrası) ve Windows 11."),
            ("Nereden edinebilirim?", "Microsoft Store'dan. Güncellemeler Store üzerinden otomatik gelir."),
            ("Ne kadar?", "LunaDock, Microsoft Store'da ücretli bir uygulamadır. Güncel fiyat her zaman Store sayfasında görünür."),
            ("Hangi dillerde?", "English, Türkçe, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी ve العربية dahil 16 dilde. Varsayılan olarak Windows dilinizi izler."),
        ]),
        ("Dosyalarınız", [
            ("LunaDock dosyalarımı taşıyor ya da değiştiriyor mu?", "Hayır. Dosyalarınız masaüstünde olduğu yerde kalır. LunaDock onları yalnızca yığınlarda gösterir; bir şeyi ancak siz menüsünden isterseniz yeniden adlandırır ya da siler."),
            ("Masaüstü ikonlarıma ne olur?", "LunaDock çalışırken özgün masaüstü ikonları gizlenir, kapandığı anda geri gelir."),
            ("Masaüstüne kaydettiğim yeni dosyalar ne olur?", "Gruplama biçiminize göre tür ya da tarihe göre kendiliğinden doğru yığına katılırlar."),
            ("Bir yığından dosyaları açabilir, yeniden adlandırabilir ve silebilir miyim?", "Evet. LunaDock tanıdık Windows sağ tık menüsünü kullanır; Birlikte aç, Gönder, Özellikler ve diğerleri orada. Sil, öğeleri Geri Dönüşüm Kutusu'na gönderir; Shift ile basarsanız kalıcı siler."),
            ("Dosyaları yığınlara ve yığınlardan sürükleyebilir miyim?", "Evet. Dosyaları herhangi bir uygulamaya sürükleyin ya da masaüstüne veya bir klasöre bırakın. Windows'un olağan kuralları geçerli: Ctrl kopyalar, Shift taşır, Alt kısayol oluşturur."),
        ]),
        ("Yığınlar ve görünüm", [
            ("Türe değil tarihe göre gruplayabilir miyim?", "Evet. Dosya türüne ya da tarihe göre gruplayın; Bugün, Dün, Son 7 gün ve daha eskiyi görün."),
            ("İkonları değiştirebilir miyim?", "Evet. Fluent ve Glass'tan Neon, Pastel ve Aurora'ya kadar 20'den fazla ikon paketinden seçin ya da her yığına kendi ikonunuzu veya resminizi verin."),
            ("Yığınları ekranda başka bir yere koyabilir miyim?", "Evet. Üst, alt, sol ya da sağ kenarda durabilirler; ikon boyutunu, kenar boşluklarını ve arka planı duvar kağıdınıza uyacak şekilde ayarlayabilirsiniz."),
            ("Birden fazla monitörle çalışır mı?", "Evet. LunaDock birden fazla monitörü destekler ve yığınları hangi monitörde göstereceğinizi seçebilirsiniz."),
            ("Wallpaper Engine, Rainmeter gibi araçlarla çalışır mı?", "Onlarla birlikte çalışacak şekilde yapıldı: LunaDock, yığınların yakınındaki masaüstü widget'ları için boşluk bırakır; boş alana yapılan tıklamalar etkileşimli bir duvar kağıdına geçebilir."),
        ]),
        ("Klavye ve hız", [
            ("Hızlı önizleme var mı?", "Evet. Bir dosyada Space'e basın; resim, metin ve kod, video ve ses ile klasör içeriği için büyük bir önizleme görün. QuickLook kullanıyorsanız LunaDock önizlemeyi ona devreder."),
            ("Hangi klavye kısayolları var?", "Ok tuşları öğeler arasında gezer, Enter açar, F2 yeniden adlandırır, Delete Geri Dönüşüm Kutusu'na taşır, Ctrl+A, C, X ve V tümünü seçer, kopyalar, keser ve yapıştırır, F5 yeniler, Esc yığınları kapatır."),
            ("Windows ile birlikte açılır mı?", "İsterseniz. Windows ile başlatma ayarlardan açılıp kapatılabilir."),
        ]),
        ("Gizlilik ve destek", [
            ("LunaDock verilerimi topluyor mu?", "Hayır. Hesap, analiz, telemetri, reklam ya da takip yoktur. Her şey bilgisayarınızda kalır. Gizlilik sayfasına bakın."),
            ("LunaDock yanıt vermezse ne olur?", "Bir şey ters giderse LunaDock hatayı kaydeder, özgün masaüstü ikonlarınızı geri getirir ve kendini yeniden başlatır."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "lunadock@kingpindev.com adresine Windows sürümünüzle, LunaDock sürümünüzle (Ayarlar, Hakkında) ve ne yaptığınızla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("1.0.8", "Ekim 2026", "Daha fazla kategori, daha iyi monitör desteği", [
            "Yeni 3B Modeller kategorisi; tasarım, video ve ses dosyaları için daha geniş tanıma.",
            "Monitörler kalıcı bir kimlikle hatırlanır ve ayarlarda adlarıyla gösterilir.",
            "Kablosuz ekranlar (Miracast, Samsung Second Screen) algılanır; kablosuz ekranları yok sayma seçeneği eklendi.",
            "Geliştirme sürümü artık otomatik başlatma kaydına dokunmaz.",
            "Ekranda takılı kalabilen sürükleme görseli düzeltildi.",
        ]),
        ("1.0.7", "Ekim 2026", "Çökme düzeltmesi", [
            "Hedefi olmayan bir kısayola sağ tıklayıp komut seçince oluşan çökme düzeltildi. Menü, komut bitmeden serbest bırakılıyordu.",
        ]),
        ("1.0.5 - 1.0.6", "Ekim 2026", "Oturum açar açmaz başlar", [
            "LunaDock artık Windows'ta oturum açtığınız anda başlar.",
            "Store'un başlangıç kaydı yüzünden açılışta ayarlar penceresinin açılması düzeltildi.",
            "Windows ile başlatma varsayılan olarak açık; otomatik başlatmadan sonraki ilk 30 saniye LunaDock yüksek öncelik alır.",
        ]),
        ("1.0.4", "Ekim 2026", "Deck görünümü ve birçok düzeltme", [
            "Wrap ve Scroll seçenekleriyle yeni Deck görünümü (varsayılan) ve daha akıcı Deck performansı.",
            "Yığınlar dışarı tıklayınca kapanır; hızlı aç-kapa artık sorunsuz çalışır.",
            "Deck'te henüz oluşturulmamış bir öğe taşınınca oluşan çökme düzeltildi.",
            "Görev çubuğu ikonunun arkasındaki mavi plaka düzeltildi.",
            "Kendi kurallarınızı izleyen özel yığınlar; silmeden önce onay.",
            "Wallpaper Engine'de sağ tık çalışır, bağlam menüleri çok daha hızlı, başka bir pencereye tıklayınca menüler kapanır.",
        ]),
        ("1.0.0 - 1.0.3", "Ekim 2026", "İlk Store sürümleri", [
            "LunaDock Microsoft Store'da: tür ya da tarihe göre otomatik yığınlar, 20'den fazla ikon paketi, ekranın her kenarı, birden fazla monitör ve Windows sağ tık menüsü.",
        ]),
    ],
    "press": {
        "oneliner": "LunaDock, Windows masaüstünüzü tıklayınca yelpaze gibi açılan düzenli yığınlara ayırır ve dosyalarınızı asla taşımaz.",
        "short": "LunaDock, Windows masaüstünüzdeki dosya, klasör ve kısayolları düzenli yığınlarda toplar: resimler, filmler, müzik, belgeler, oyunlar, uygulamalar ve daha fazlası. Bir yığını açmak için tıklayın, kapatmak için tekrar tıklayın. Dosyalarınız tam olarak oldukları yerde kalır.",
        "long": "LunaDock, Windows 10 ve 11 için bir masaüstü düzenleyicisidir. Dağınık bir masaüstünü, dosya türüne ya da tarihe göre gruplanmış ve herhangi bir monitörün herhangi bir kenarına yerleştirilmiş yığınlara dönüştürür. Bir yığını açmak için tıklayın, dosyaları Space ile önizleyin, açmak, yeniden adlandırmak ve silmek için tanıdık Windows sağ tık menüsünü kullanın. Fluent ve Glass'tan Neon, Pastel ve Aurora'ya kadar 20'den fazla ikon paketi duvar kağıdınıza uymanızı sağlar; her yığına kendi ikonunuzu ya da resminizi verebilirsiniz. LunaDock dosyalarınızı asla taşımaz: yalnızca yığınlarda gösterir, çalışırken özgün masaüstü ikonlarını gizler ve kapanınca geri getirir. 16 dilde çalışır; hesap, analiz ya da takip yoktur; Microsoft Store'da bulunur.",
        "facts": [
            ("Ad", "LunaDock"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (2004+) ve Windows 11"),
            ("Kategori", "Yardımcı programlar, masaüstü"),
            ("Diller", "English, Türkçe, Español, Français, Deutsch, Português, Русский, 中文, 日本語, हिन्दी, العربية dahil 16"),
            ("Fiyat", "Microsoft Store'da ücretli uygulama"),
            ("Web sitesi", "lunadock.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("01-Before-After", "Önce ve sonra"), ("02-Icon-Packs", "20'den fazla ikon paketi"), ("03-Open-Your-Stacks", "Yığını aç, dosyanı bul"), ("04-Organized-Your-Way", "Senin düzenin")],
        "notes": ["Ekran görüntüleri örnek dosyaları gösterir. Lütfen logoyu değiştirmeyin.", "LunaDock hakkında yazarken lütfen Microsoft Store sayfasına ya da lunadock.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["LunaDock kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "LunaDock hiçbir türde analiz, telemetri, reklam ya da takip kullanmaz.", "LunaDock hesap gerektirmez.", "Uygulamanın ihtiyaç duyduğu her şey cihazınızda kalır."]),
        ("Cihazınızda işlenen bilgiler", ["Masaüstünüzü düzenlemek için LunaDock, Windows masaüstünüzdeki dosya, klasör ve kısayolların adlarını, türlerini, ikonlarını, küçük resimlerini ve tarihlerini okur. Bu bilgi yalnızca yığınlarınızı göstermek için kullanılır ve hiçbir yere gönderilmez.",
                                         "LunaDock cihazınızda, Windows kullanıcı profilinizde şunları saklar: ayarlarınız (dil, ikon paketi ve yığın konumu gibi), düzeniniz (yığınlarınızın sırası ve seçtiğiniz özel adlar ya da ikonlar) ve günlük dosyaları (sorunları gidermeye yardımcı teknik tanılama iletileri, örneğin hatalar; günlükler cihazınızda kalır ve yalnızca siz bize göndermeyi seçerseniz paylaşılır). LunaDock'u kaldırarak bu bilgileri istediğiniz zaman silebilirsiniz.",
                                         "LunaDock, siz açıkça istemedikçe (örneğin menüsünden bir öğeyi yeniden adlandırmak ya da silmek gibi) masaüstü dosyalarınızı taşımaz, değiştirmez, yüklemez ya da silmez."]),
        ("Microsoft Store", ["LunaDock'u Microsoft Store'dan edindiyseniz satın alma, lisans, derecelendirme ve uygulama güncellemelerini Microsoft yürütür. LunaDock güncellemeleri denetlerken ya da derecelendirme penceresini açarken Windows'a yerleşik Microsoft Store hizmetlerini kullanır. Bu bilgiler Microsoft tarafından Microsoft Gizlilik Bildirimi kapsamında işlenir. Bu hizmetlerden, Microsoft'un geliştiricilere sağladığı standart satış ve kullanım raporları dışında hakkınızda hiçbir kişisel bilgi almayız."]),
        ("Bağlantılar", ["LunaDock bağlantılar içerir (örneğin web sitemize ya da e-posta göndermeye). Bir bağlantıyı açmak varsayılan tarayıcınızı ya da e-posta uygulamanızı kullanır; gittiğiniz web sitesi kendi gizlilik politikasına tabidir."]),
        ("Çocuklar", ["LunaDock, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfada güncelleyip yürürlük tarihini değiştiririz."]),
    ],
    "privacy_meta": "Yürürlük tarihi: 13 Ekim 2026",
    "compare": {
        "intro": "Dağınık bir Windows masaüstünü düzene sokmanın birkaç iyi yolu var. İşte LunaDock'un en çok sorulan araçların yanında nerede durduğuna dürüst bir bakış. Her aracın kendi herkese açık sayfalarına ve basın yazılarına baktık ve başka bir aracın daha iyi seçim olduğu yerleri de belirttik.",
        "items": [
            ("Tek başına Windows masaüstü", "Windows'ta yerleşik",
             "Kurulum gerekmez. Masaüstündeki ikonları sıralayıp hizalayabilir, dosyalarınızı istediğiniz yerde tutabilirsiniz.",
             "LunaDock masaüstünü tür ya da tarihe göre yığınlara toplar, yeni dosyalar kendi yığınını kendiliğinden bulur, yığınlar ekranın bir kenarında yer kaplamadan durur ve dosyalarınız asla taşınmaz.",
             "Masaüstünde yalnızca bir avuç ikon tutuyorsanız düz Windows'ta kalın."),
            ("Stardock Fences", "Stardock'tan ücretli masaüstü aracı",
             "Masaüstünde yerleştirip boyutlandırdığınız gölgeli kutular (fence'ler); ikonları onlara ayıran kurallar, sekmeler, daralan fence'ler ve ikon renklendirme.",
             "LunaDock duvar kağıdınızın üzerine kutular çizmez. Her şeyi tek bir ekran kenarındaki, tıklayınca yelpaze gibi açılan kompakt yığınlara toplar, her dosyanın yığınını kendiliğinden seçer ve dosyaları oldukları yerde bırakır.",
             "Masaüstüne yayılmış serbest kutular, kendi yazdığınız kurallar ya da kurumsal dağıtım araçları istiyorsanız Fences'ı seçin."),
        ],
        "foot": "15 Kasım 2026'da herkese açık sayfalardan ve basın yazılarından kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz lunadock@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "tidy stacks", "chip": ("Windows 10 & 11", "A desktop organizer that never moves your files"),
        "stats": [(20, "+", "icon packs"), (16, "", "languages"), (4, "", "screen edges to dock on"), (0, "", "files moved")],
        "explorer_note": "Pick a feature and the live LunaDock shows it. It is the real app model: click the stacks yourself.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the Microsoft Store listing.",
        "compare_title": "How LunaDock compares", "compare_sub": "Plain Windows and Stardock Fences both tidy a desktop. Here is where each one fits.",
    },
    "tr": {
        "emph": "düzenli yığınlar", "chip": ("Windows 10 ve 11", "Dosyalarınızı asla taşımayan bir masaüstü düzenleyicisi"),
        "stats": [(20, "+", "ikon paketi"), (16, "", "dil"), (4, "", "yerleştirilebilir ekran kenarı"), (0, "", "taşınan dosya")],
        "explorer_note": "Bir özellik seçin, canlı LunaDock onu gösterir. Gerçek uygulama modeli bu: yığınlara kendiniz tıklayın.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Microsoft Store sayfasından ekranlar.",
        "compare_title": "LunaDock nasıl bir yerde duruyor", "compare_sub": "Düz Windows ve Stardock Fences masaüstünü düzene sokar. İşte her birinin uygun olduğu yer.",
    },
}

# Scenes for the feature explorer on the home page: one per feature tab, in the order of APPS[slug]["en"]["features"].
# Each scene is a list of [delay ms, state] steps applied to the live demo (LunaDockDemo.set).
_BASE = {"organized": True, "style": "category", "pack": "Fluent", "edge": "top", "group": "kind", "overflow": "deck", "wallpaper": "blue", "open": None, "deck": 0, "selected": None}
SCENES = [
    [[0, {**_BASE, "organized": False, "style": "pile"}], [900, {"organized": True, "style": "pile"}], [2300, {"style": "category"}]],
    [[0, _BASE], [900, {"group": "date"}], [3400, {"group": "kind"}]],
    [[0, _BASE], [800, {"open": "images"}], [2800, {"deck": 5}]],
    [[0, _BASE], [800, {"pack": "Glass"}], [2500, {"pack": "Pastel"}], [4200, {"pack": "Aurora"}]],
    [[0, _BASE], [800, {"edge": "right"}], [2700, {"edge": "bottom"}], [4500, {"edge": "top"}]],
    [[0, _BASE], [800, {"open": "images", "deck": 0}], [2500, {"deck": 5}]],
    [[0, {**_BASE, "style": "pile"}], [900, {"open": "documents"}]],
    [[0, _BASE], [800, {"wallpaper": "dusk"}], [2800, {"wallpaper": "blue"}]],
]

# Feature matrix for the comparison table: a tick means confirmed from the tool's own pages or press coverage (checked 2026-11-16), a dash means not found there.
MATRIX = {
    "en": {
        "cols": [("LunaDock", "This app"), ("Windows desktop", "Built in"), ("Stardock Fences", "Paid utility")],
        "rows": [
            ("Groups the desktop automatically by file type", [1, 0, 1]),
            ("Groups by date: Today, Yesterday, older", [1, 0, 0]),
            ("New files find their group by themselves", [1, 0, 1]),
            ("Sorts icons by name, date, size or type", [1, 1, 0]),
            ("Tabs for groups", [0, 0, 1]),
            ("Icon looks: packs or tint", [1, 0, 1]),
            ("Collapses groups out of the way", [1, 0, 1]),
            ("Docks the groups on any screen edge", [1, 0, 0]),
            ("Quick preview with Space", [1, 0, 0]),
        ],
        "legend": "A tick means we confirmed it on the tool's own pages or in press coverage. A dash means we did not find it there. Fences also offers rules you write yourself and business deployment tools, which LunaDock does not.",
        "bars": "Confirmed features",
        "checked": "Checked on 16 November 2026.",
    },
    "tr": {
        "cols": [("LunaDock", "Bu uygulama"), ("Windows masaüstü", "Yerleşik"), ("Stardock Fences", "Ücretli araç")],
        "rows": [
            ("Masaüstünü dosya türüne göre kendiliğinden gruplama", [1, 0, 1]),
            ("Tarihe göre gruplama: Bugün, Dün, daha eski", [1, 0, 0]),
            ("Yeni dosyalar grubunu kendiliğinden bulur", [1, 0, 1]),
            ("İkonları ada, tarihe, boyuta ya da türe göre sıralama", [1, 1, 0]),
            ("Gruplar için sekmeler", [0, 0, 1]),
            ("İkon görünümleri: paketler ya da renk tonu", [1, 0, 1]),
            ("Grupları yoldan çekip daraltma", [1, 0, 1]),
            ("Grupları herhangi bir ekran kenarına yerleştirme", [1, 0, 0]),
            ("Space ile hızlı önizleme", [1, 0, 0]),
        ],
        "legend": "Onay işareti, aracın kendi sayfalarında ya da basın yazılarında doğruladığımız anlamına gelir. Çizgi, orada bulamadığımız anlamına gelir. Fences ayrıca kendi yazdığınız kurallar ve kurumsal dağıtım araçları sunar; LunaDock sunmaz.",
        "bars": "Doğrulanan özellikler",
        "checked": "16 Kasım 2026'da kontrol edildi.",
    },
}

# "How it works" scroll story: the feature-explorer scene shown for each of the three steps.
STORY = [0, 1, 2]

DATA = {"en": EN, "tr": TR}
