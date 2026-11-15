"""Content for the vOrganizer side pages and home extras (English and Turkish).

Facts: the project's notes and source (Python backend, Electron shell, MSIX 1.0.0, Store ID 9PKDPQDF6ZJL), the app's categories and the live vOrganizer page.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is vOrganizer?", "vOrganizer sorts a messy folder by file type. Point it at Downloads, Desktop, Documents or any folder, and it moves images, documents, videos, audio, archives, code, installers and fonts into their own folders."),
            ("Which versions of Windows does it support?", "Windows 10 (version 1809 or later) and Windows 11."),
            ("Where do I get it?", "From the Microsoft Store. Updates arrive automatically through the Store."),
            ("Does it need an internet connection or an account?", "No. vOrganizer works offline and needs no account."),
        ]),
        ("How sorting works", [
            ("Which categories are there?", "Eight: Images, Documents, Videos, Audio, Archives, Code, Executables and Fonts, recognised by dozens of file extensions. Files that fit none of them go to an Others folder."),
            ("Where do my files end up?", "In a folder named vOrganizer inside the folder you sorted, with one subfolder per category, such as vOrganizer\\Images."),
            ("Does it touch files in subfolders?", "No. Only the files that sit directly in the folder you chose are sorted."),
            ("Can I sort only some file types?", "Yes. Turn categories on or off before you press Organize Now, and only the kinds you leave on are moved."),
            ("Can I see what will happen first?", "Yes. Preview lists which files will go to which folder before anything moves."),
        ]),
        ("Safety", [
            ("Does vOrganizer delete anything?", "No. It only moves files into category folders."),
            ("Can I undo a run?", "Yes. Undo puts the files from the last run back where they were."),
            ("Is my data uploaded anywhere?", "No. Everything happens on your PC. See the privacy page."),
        ]),
        ("Support", [
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your Windows version, your vOrganizer version and what you were doing."),
            ("How much does it cost?", "The Store page always shows the current price."),
        ]),
    ],
    "changelog": [
        ("1.0.0", "2026", "First release", [
            "Sorts a folder by type into eight categories, with an Others folder for everything else.",
            "One-click shortcuts for Downloads, Desktop and Documents, or any folder you choose.",
            "Preview before you organize, live progress with an activity log, and Undo for the last run.",
            "Turn categories on or off, light and dark themes, and everything stays on your PC.",
        ]),
    ],
    "press": {
        "oneliner": "vOrganizer sorts a messy Windows folder by file type in seconds and lets you undo it.",
        "short": "vOrganizer sorts the files in any folder by type: images, documents, videos, audio, archives, code, installers and fonts each go to their own folder. Preview what will move, watch the progress and undo the last run with one click. It works offline and needs no account.",
        "long": "vOrganizer is a small Windows app that turns a messy Downloads, Desktop or Documents folder into tidy category folders. It recognises dozens of file extensions across eight categories (Images, Documents, Videos, Audio, Archives, Code, Executables and Fonts) and puts anything else into Others. A Preview shows exactly which file goes where before anything moves, a progress bar and activity log show the run, and Undo restores the files from the last run to where they were. You can turn categories on or off, choose any folder, and switch between a light and a dark theme. vOrganizer works completely offline, needs no account, never deletes files and is available on the Microsoft Store.",
        "facts": [
            ("Name", "vOrganizer"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) and Windows 11"),
            ("Category", "Utilities, files"),
            ("Works", "Offline, no account"),
            ("Website", "vorganizer.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "Pick a folder and preview"), ("shot-2", "Organizing with live progress"), ("shot-3", "Undo the last run"), ("shot-4", "Dark theme")],
        "notes": ["Screenshots show example folders. Please do not alter the logo.", "When you write about vOrganizer, please link to its Microsoft Store page or to vorganizer.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["vOrganizer does not collect, sell or share your personal data.", "vOrganizer does not use analytics, telemetry, advertising or tracking.", "vOrganizer does not require an account and works offline.", "Everything stays on your device."]),
        ("What vOrganizer does on your PC", ["When you pick a folder, vOrganizer reads the names and types of the files directly inside it to decide where each one belongs. When you press Organize Now it moves those files into category folders inside the folder you chose. It does not read file contents, and it does not delete files.",
                                             "To make Undo possible it remembers which files it moved during the last run."]),
        ("Network use", ["vOrganizer has no features that send your files or file names anywhere. If you obtained it from the Microsoft Store, purchases, licensing, ratings and updates are handled by Microsoft through the services built into Windows.", "vOrganizer contains links (for example to our website or to send an email). Opening a link uses your default browser or email app, and the site you visit has its own privacy policy."]),
        ("Children", ["vOrganizer does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "There are a few ways to keep a folder tidy on Windows. Here is an honest look at how vOrganizer fits next to them, and where another approach is the better pick.",
        "items": [
            ("Sorting by hand", "Built in to Windows",
             "Full control: you decide exactly where each file goes, and you can sort in Explorer by name, date, type or size.",
             "vOrganizer sorts a whole folder by file type in one pass, shows a preview first and can undo the run.",
             "Sort by hand if you only have a few files or want your own folder structure."),
            ("Folder rules and automation tools", "Third-party utilities",
             "Rules that run all the time, watch folders and can sort by name, date or content.",
             "vOrganizer is deliberately simple: you press a button when you want a folder sorted by type, and it does nothing in the background.",
             "Pick an automation tool if you want rules that keep running by themselves."),
        ],
        "foot": "Checked on 16 November 2026. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("vOrganizer nedir?", "vOrganizer dağınık bir klasörü dosya türüne göre düzenler. Onu İndirilenler, Masaüstü, Belgeler ya da herhangi bir klasöre yöneltin; resimleri, belgeleri, videoları, sesleri, arşivleri, kodları, yükleyicileri ve yazı tiplerini kendi klasörlerine taşır."),
            ("Hangi Windows sürümlerini destekliyor?", "Windows 10 (1809 ve sonrası) ve Windows 11."),
            ("Nereden edinebilirim?", "Microsoft Store'dan. Güncellemeler Store üzerinden otomatik gelir."),
            ("İnternet bağlantısı ya da hesap gerekir mi?", "Hayır. vOrganizer çevrimdışı çalışır ve hesap gerektirmez."),
        ]),
        ("Düzenleme nasıl çalışır", [
            ("Hangi kategoriler var?", "Sekiz: Resimler, Belgeler, Videolar, Sesler, Arşivler, Kod, Çalıştırılabilirler ve Yazı tipleri; onlarca dosya uzantısıyla tanınır. Hiçbirine uymayan dosyalar Diğerleri klasörüne gider."),
            ("Dosyalarım nereye gider?", "Düzenlediğiniz klasörün içindeki vOrganizer adlı bir klasöre, her kategori için bir alt klasörle; örneğin vOrganizer\\Images."),
            ("Alt klasörlerdeki dosyalara dokunur mu?", "Hayır. Yalnızca seçtiğiniz klasörün doğrudan içindeki dosyalar düzenlenir."),
            ("Yalnızca bazı dosya türlerini düzenleyebilir miyim?", "Evet. Şimdi Düzenle'ye basmadan önce kategorileri açıp kapatın; yalnızca açık bıraktığınız türler taşınır."),
            ("Önce ne olacağını görebilir miyim?", "Evet. Önizleme, hiçbir şey taşınmadan önce hangi dosyanın hangi klasöre gideceğini listeler."),
        ]),
        ("Güvenlik", [
            ("vOrganizer bir şey siliyor mu?", "Hayır. Dosyaları yalnızca kategori klasörlerine taşır."),
            ("Bir çalıştırmayı geri alabilir miyim?", "Evet. Geri al, son çalıştırmadaki dosyaları oldukları yere geri koyar."),
            ("Verilerim bir yere yükleniyor mu?", "Hayır. Her şey bilgisayarınızda olur. Gizlilik sayfasına bakın."),
        ]),
        ("Destek", [
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine Windows sürümünüzle, vOrganizer sürümünüzle ve ne yaptığınızla birlikte yazın."),
            ("Ne kadar?", "Güncel fiyat her zaman Store sayfasında görünür."),
        ]),
    ],
    "changelog": [
        ("1.0.0", "2026", "İlk sürüm", [
            "Bir klasörü türe göre sekiz kategoriye düzenler; geri kalan her şey için Diğerleri klasörü.",
            "İndirilenler, Masaüstü ve Belgeler için tek tıkla kısayollar ya da seçtiğiniz herhangi bir klasör.",
            "Düzenlemeden önce önizleme, etkinlik günlüğüyle canlı ilerleme ve son çalıştırma için Geri al.",
            "Kategorileri açıp kapatma, açık ve koyu tema; her şey bilgisayarınızda kalır.",
        ]),
    ],
    "press": {
        "oneliner": "vOrganizer, dağınık bir Windows klasörünü saniyeler içinde dosya türüne göre düzenler ve geri alınabilir.",
        "short": "vOrganizer, herhangi bir klasördeki dosyaları türe göre düzenler: resimler, belgeler, videolar, sesler, arşivler, kod, yükleyiciler ve yazı tipleri kendi klasörlerine gider. Neyin taşınacağını önizleyin, ilerlemeyi izleyin, son çalıştırmayı tek tıkla geri alın. Çevrimdışı çalışır, hesap gerektirmez.",
        "long": "vOrganizer, dağınık bir İndirilenler, Masaüstü ya da Belgeler klasörünü düzenli kategori klasörlerine çeviren küçük bir Windows uygulamasıdır. Sekiz kategoride (Resimler, Belgeler, Videolar, Sesler, Arşivler, Kod, Çalıştırılabilirler ve Yazı tipleri) onlarca dosya uzantısını tanır, geri kalanı Diğerleri'ne koyar. Önizleme, hiçbir şey taşınmadan önce hangi dosyanın nereye gideceğini gösterir; ilerleme çubuğu ve etkinlik günlüğü çalıştırmayı gösterir; Geri al, son çalıştırmadaki dosyaları oldukları yere geri koyar. Kategorileri açıp kapatabilir, herhangi bir klasör seçebilir ve açık ile koyu tema arasında geçiş yapabilirsiniz. vOrganizer tamamen çevrimdışı çalışır, hesap gerektirmez, dosyaları asla silmez ve Microsoft Store'da bulunur.",
        "facts": [
            ("Ad", "vOrganizer"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) ve Windows 11"),
            ("Kategori", "Yardımcı programlar, dosyalar"),
            ("Çalışma", "Çevrimdışı, hesapsız"),
            ("Web sitesi", "vorganizer.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Klasörü seçin ve önizleyin"), ("shot-2", "Canlı ilerlemeyle düzenleme"), ("shot-3", "Son çalıştırmayı geri alma"), ("shot-4", "Koyu tema")],
        "notes": ["Ekran görüntüleri örnek klasörleri gösterir. Lütfen logoyu değiştirmeyin.", "vOrganizer hakkında yazarken lütfen Microsoft Store sayfasına ya da vorganizer.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["vOrganizer kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "vOrganizer analiz, telemetri, reklam ya da takip kullanmaz.", "vOrganizer hesap gerektirmez ve çevrimdışı çalışır.", "Her şey cihazınızda kalır."]),
        ("vOrganizer bilgisayarınızda ne yapar", ["Bir klasör seçtiğinizde vOrganizer, her dosyanın nereye ait olduğuna karar vermek için doğrudan içindeki dosyaların adlarını ve türlerini okur. Şimdi Düzenle'ye bastığınızda bu dosyaları seçtiğiniz klasörün içindeki kategori klasörlerine taşır. Dosya içeriklerini okumaz ve dosyaları silmez.",
                                                 "Geri al'ı mümkün kılmak için son çalıştırmada hangi dosyaları taşıdığını hatırlar."]),
        ("Ağ kullanımı", ["vOrganizer'ın dosyalarınızı ya da dosya adlarınızı herhangi bir yere gönderen bir özelliği yoktur. Microsoft Store'dan edindiyseniz satın alma, lisans, derecelendirme ve güncellemeleri Microsoft, Windows'a yerleşik hizmetler üzerinden yürütür.", "vOrganizer bağlantılar içerir (örneğin web sitemize ya da e-posta göndermeye). Bir bağlantıyı açmak varsayılan tarayıcınızı ya da e-posta uygulamanızı kullanır; gittiğiniz sitenin kendi gizlilik politikası geçerlidir."]),
        ("Çocuklar", ["vOrganizer, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Windows'ta bir klasörü düzenli tutmanın birkaç yolu var. İşte vOrganizer'ın onların yanında nerede durduğuna ve başka bir yaklaşımın daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("Elle düzenleme", "Windows'ta yerleşik",
             "Tam denetim: her dosyanın tam olarak nereye gideceğine siz karar verirsiniz; Gezgin'de ada, tarihe, türe ya da boyuta göre sıralayabilirsiniz.",
             "vOrganizer bütün bir klasörü tek geçişte türe göre düzenler, önce önizleme gösterir ve çalıştırmayı geri alabilir.",
             "Yalnızca birkaç dosyanız varsa ya da kendi klasör yapınızı istiyorsanız elle düzenleyin."),
            ("Klasör kuralları ve otomasyon araçları", "Üçüncü taraf yardımcı programlar",
             "Sürekli çalışan kurallar, izlenen klasörler; ada, tarihe ya da içeriğe göre düzenleyebilir.",
             "vOrganizer bilerek basittir: bir klasörün türe göre düzenlenmesini istediğinizde bir düğmeye basarsınız, arka planda hiçbir şey yapmaz.",
             "Kendiliğinden çalışmaya devam eden kurallar istiyorsanız bir otomasyon aracı seçin."),
        ],
        "foot": "16 Kasım 2026'da kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "in seconds", "chip": ("Windows", "Sorts a folder by file type and lets you undo it"),
        "stats": [(8, "", "file categories"), (0, "", "files deleted"), (1, "", "click to undo the last run"), (0, "", "accounts or uploads")],
        "explorer_note": "Pick a feature and the real vOrganizer interface runs it on example folders. Nothing on your computer is touched.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "How vOrganizer compares", "compare_sub": 'File Explorer shows a folder by type, vOrganizer moves the files. Here is the difference.',
    },
    "tr": {
        "emph": "saniyeler içinde", "chip": ("Windows", "Klasörü türe göre düzenler ve geri almanızı sağlar"),
        "stats": [(8, "", "dosya kategorisi"), (0, "", "silinen dosya"), (1, "", "tıkla son çalıştırmayı geri al"), (0, "", "hesap ya da yükleme")],
        "explorer_note": "Bir özellik seçin, gerçek vOrganizer arayüzü onu örnek klasörlerde çalıştırır. Bilgisayarınızdaki hiçbir şeye dokunulmaz.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "vOrganizer nasıl bir yerde duruyor", "compare_sub": 'Dosya Gezgini bir klasörü türe göre gösterir, vOrganizer dosyaları taşır. İşte fark.',
    },
}

# Feature explorer scenes (the real vOrganizer interface in the frame), in the order of APPS["vorganizer"]["en"]["features"].
SCENES = [
    [[0, {"clickText": "Clear"}], [500, {"clickText": "📥 Downloads"}], [1400, {"clickText": "Preview"}]],
    [[0, {"clickText": "Clear"}], [500, {"clickText": "🖥️ Desktop"}], [1700, {"clickText": "📁 Documents"}]],
    [[0, {"clickText": "Clear"}], [500, {"clickText": "📥 Downloads"}], [1400, {"clickText": "Preview"}]],
    [[0, {"clickText": "Clear"}], [500, {"clickText": "📥 Downloads"}], [1300, {"clickText": "Organize Now"}]],
    [[0, {"clickText": "Clear"}], [500, {"clickText": "📥 Downloads"}], [1300, {"clickText": "Organize Now"}], [4600, {"clickText": "Undo"}]],
    None,
    [[0, {"click": ".theme-btn"}], [2600, {"click": ".theme-btn"}]],
    None,
]

# "How it works" scroll story: the feature-explorer scene shown for each of the three steps.
STORY = [0, 2, 3]

# Feature matrix for the comparison table. A tick = the app does it, a dash = it is not offered as a feature.
MATRIX = {
    "en": {
        "cols": [('vOrganizer', 'This app'), ('File Explorer', 'Built in to Windows')],
        "rows": [('Moves a whole folder into category folders in one step', [1, 0]), ('Preview of what will move before anything moves', [1, 0]), ('Turn file categories on or off', [1, 0]), ("Group or sort a folder's view by type", [0, 1]), ('Works offline, no account', [1, 1])],
        "legend": 'A tick means the app does it; a dash means it does not offer it as a feature. File Explorer groups and sorts how a folder looks, but it does not move files into category folders for you. We did not compare automation tools one by one.',
        "bars": 'Confirmed features',
        "checked": 'Checked on 16 November 2026.',
    },
    "tr": {
        "cols": [('vOrganizer', 'Bu uygulama'), ('Dosya Gezgini', "Windows'ta yerleşik")],
        "rows": [('Bütün bir klasörü tek adımda kategori klasörlerine taşıma', [1, 0]), ('Bir şey taşınmadan önce neyin taşınacağını önizleme', [1, 0]), ('Dosya kategorilerini açıp kapatma', [1, 0]), ('Klasör görünümünü türe göre gruplama ya da sıralama', [0, 1]), ('Çevrimdışı çalışma, hesap yok', [1, 1])],
        "legend": 'Onay işareti, uygulamanın bunu yaptığı; çizgi, bunu bir özellik olarak sunmadığı anlamına gelir. Dosya Gezgini klasörün nasıl göründüğünü gruplar ve sıralar ama dosyaları sizin için kategori klasörlerine taşımaz. Otomasyon araçlarını tek tek karşılaştırmadık.',
        "bars": 'Doğrulanan özellikler',
        "checked": "16 Kasım 2026'da kontrol edildi.",
    },
}

DATA = {"en": EN, "tr": TR}
