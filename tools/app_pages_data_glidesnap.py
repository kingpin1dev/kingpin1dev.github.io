"""Content for the GlideSnap side pages and home extras (English and Turkish).

Facts: the project's HANDOFF notes (gestures, native rewrite, Store trial licensing) and the live GlideSnap page.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is GlideSnap?", "GlideSnap is a small Windows tool that lets you move, resize, snap and make windows transparent from anywhere inside them, with a modifier key held (Alt by default), the way many Linux desktops do."),
            ("Which versions of Windows does it support?", "Windows 10 and Windows 11."),
            ("Where do I get it?", "From the Microsoft Store. Updates arrive automatically through the Store."),
            ("Is there a trial?", "Yes. The Store version has a 7-day trial; after that it needs a purchase. The Store page always shows the current price."),
            ("Do I need an account?", "No."),
        ]),
        ("Gestures", [
            ("How do I move a window?", "Hold Alt and drag with the left mouse button anywhere on the window, not just the title bar."),
            ("How do I resize a window?", "Hold Alt and drag with the right mouse button. GlideSnap resizes from the corner or edge nearest to where you grabbed."),
            ("How do I change transparency?", "Hold Alt and use the mouse wheel over a window."),
            ("How do I maximize or restore a window?", "Hold Alt and double-click with the left button."),
            ("How do I keep a window on top?", "Hold Alt and middle-click it. Do it again to unpin it."),
            ("Can I change the keys?", "Yes. Choose Alt, Ctrl or Shift as the modifier and set what each mouse button does."),
        ]),
        ("Snapping", [
            ("How does snapping work?", "Drop a window on the top edge to maximize it, or on the left or right edge to tile it to half the screen. Windows also align to screen and neighbouring window edges."),
            ("Are there grids?", "Yes. Turn on 2 by 1, 3 by 1, 2 by 2 or 3 by 2 grids when you want them."),
            ("What happens to the size when I drag a snapped window out?", "It gets its previous size back."),
        ]),
        ("Compatibility", [
            ("Does it work on every window?", "On almost all of them. Windows does not let a normal app control elevated or protected windows."),
            ("Can I exclude an app?", "Yes. Exclude by window title, window class or .exe name, or pause GlideSnap from the tray."),
            ("Does it run at startup?", "Only if you turn that option on. It lives in the system tray."),
        ]),
        ("Privacy and support", [
            ("Does GlideSnap collect my data?", "No accounts, analytics or advertising. It watches your mouse and keys locally to do its job and never records or sends them. See the privacy page."),
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your Windows version, your GlideSnap version and the app that misbehaved."),
        ]),
    ],
    "changelog": [
        ("1.0.6", "2026", "Store trial and licensing", [
            "Real Microsoft Store licensing with a 7-day trial: the app shows the trial, paid and expired states and a refresh option.",
        ]),
        ("1.0.4", "2026", "A much smaller, native app", [
            "Rewritten as a native Windows app: the package is under 1 MB instead of about 42 MB, with no .NET or WinUI runtime.",
            "A single settings window with System, Light and Dark themes.",
            "The window opens on the first run and the app starts hidden in the tray afterwards.",
        ]),
        ("1.0.3", "2026", "Full-screen fix", [
            "Fixed a problem with full-screen windows.",
        ]),
    ],
    "press": {
        "oneliner": "GlideSnap lets you move, resize and snap any Windows window from anywhere inside it with Alt and the mouse.",
        "short": "GlideSnap brings Linux-style window handling to Windows. Hold Alt and drag a window by any part of it to move it, drag with the right button to resize from the nearest corner, scroll for transparency, and drop it on an edge to snap it. It lives in the tray and stays out of the way.",
        "long": "GlideSnap is a lightweight window manager add-on for Windows 10 and 11. With Alt held (or the modifier you choose), a left drag moves a window from any point, a right drag resizes it from the nearest corner or edge, the mouse wheel changes its transparency, a double click maximizes or restores it and a middle click pins it on top. Dropping a window on an edge snaps it to full screen or half the screen, optional 2 by 1, 3 by 1, 2 by 2 and 3 by 2 grids are available, and a snapped window returns to its previous size when you drag it out. You can pick the modifier key and the action of each mouse button, exclude apps by title, class or .exe, and pause GlideSnap from the tray. It is a small native app with no account and is available on the Microsoft Store with a 7-day trial.",
        "facts": [
            ("Name", "GlideSnap"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 and Windows 11"),
            ("Category", "Utilities, productivity"),
            ("Language", "English"),
            ("Price", "Paid app on the Microsoft Store, 7-day trial"),
            ("Website", "glidesnap.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "Move from anywhere"), ("shot-2", "Resize from any corner"), ("shot-3", "Snap to an edge"), ("shot-4", "Opacity with the wheel")],
        "notes": ["Screenshots are from the live demo with example windows. Please do not alter the logo.", "When you write about GlideSnap, please link to its Microsoft Store page or to glidesnap.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["GlideSnap does not collect, sell or share your personal data.", "GlideSnap does not use analytics, telemetry, advertising or tracking.", "GlideSnap does not require an account.", "Its settings stay on your device."]),
        ("What GlideSnap does on your PC", ["To work, GlideSnap listens for your mouse buttons, mouse wheel and the modifier key you chose, so it can move, resize, snap and fade the window under the pointer. It does this on your PC only. It does not record what you type or where you click, and it does not send that information anywhere.",
                                            "It moves, resizes and changes the opacity or always-on-top state of other windows only when you use its gestures. It cannot control elevated or protected windows."]),
        ("What it stores on your device", ["Your settings (keys, snapping and grid options, exclusions, theme) are stored in a small settings file on your PC. Uninstalling GlideSnap removes the app."]),
        ("Network use", ["GlideSnap has no features that send data to our servers. Purchases, the trial, licensing, ratings and updates are handled by Microsoft through the services built into Windows. GlideSnap contains links (for example to our website or to send an email); opening a link uses your default browser or email app."]),
        ("Children", ["GlideSnap does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "Moving and resizing windows from anywhere inside them is not a new idea. Here is an honest look at how GlideSnap fits next to two well-known tools that do the same gesture, and where each is the better pick.",
        "items": [
            ("PowerToys Grab And Move", "Part of Microsoft PowerToys",
             "Hold Alt or the Windows key and drag anywhere inside a window to move it, or drag with the right button to resize from the nearest edge or corner. It has excluded apps, an option to show the window size and a setting that keeps it off while Game Mode is on.",
             "GlideSnap adds edge snapping with optional grids, opacity with the mouse wheel and pinning a window on top with a middle click, lets you choose Alt, Ctrl or Shift, and is a small standalone app from the Microsoft Store.",
             "Pick Grab And Move if you already use PowerToys and move and resize are all you need."),
            ("AltSnap", "Open source, GPL-3.0",
             "A long-running Alt-drag tool for Windows that moves and resizes windows from anywhere, drags windows transparently, has a maximize action and blacklists, runs from the tray and supports Windows from NT 4 to Windows 11.",
             "GlideSnap is a Microsoft Store app with edge snapping, grids, wheel opacity and always-on-top, and it is updated through the Store.",
             "Pick AltSnap if you want open source or need to run on very old Windows versions."),
        ],
        "foot": "Checked on 16 November 2026 from the tools' own pages. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("GlideSnap nedir?", "GlideSnap, bir değiştirici tuş basılıyken (varsayılan Alt) pencerelerin içindeki herhangi bir yerden taşımanızı, boyutlandırmanızı, hizalamanızı ve saydamlaştırmanızı sağlayan küçük bir Windows aracıdır; birçok Linux masaüstündeki gibi."),
            ("Hangi Windows sürümlerini destekliyor?", "Windows 10 ve Windows 11."),
            ("Nereden edinebilirim?", "Microsoft Store'dan. Güncellemeler Store üzerinden otomatik gelir."),
            ("Deneme var mı?", "Evet. Store sürümünün 7 günlük denemesi vardır; sonrasında satın alma gerekir. Güncel fiyat her zaman Store sayfasında görünür."),
            ("Hesap gerekir mi?", "Hayır."),
        ]),
        ("Hareketler", [
            ("Bir pencereyi nasıl taşırım?", "Alt'a basılı tutup sol fare düğmesiyle pencerenin herhangi bir yerinden, yalnızca başlık çubuğundan değil, sürükleyin."),
            ("Bir pencereyi nasıl boyutlandırırım?", "Alt'a basılı tutup sağ fare düğmesiyle sürükleyin. GlideSnap, tuttuğunuz yere en yakın köşeden ya da kenardan boyutlandırır."),
            ("Saydamlığı nasıl değiştiririm?", "Alt'a basılı tutup bir pencerenin üzerinde fare tekerleğini kullanın."),
            ("Bir pencereyi nasıl büyütür ya da geri alırım?", "Alt'a basılı tutup sol düğmeyle çift tıklayın."),
            ("Bir pencereyi nasıl üstte tutarım?", "Alt'a basılı tutup orta düğmeyle tıklayın. Sabitlemeyi kaldırmak için tekrar yapın."),
            ("Tuşları değiştirebilir miyim?", "Evet. Değiştirici olarak Alt, Ctrl ya da Shift'i seçin ve her fare düğmesinin ne yaptığını ayarlayın."),
        ]),
        ("Hizalama", [
            ("Hizalama nasıl çalışır?", "Bir pencereyi üst kenara bırakmak onu büyütür; sol ya da sağ kenara bırakmak ekranın yarısına döşer. Pencereler ayrıca ekran ve komşu pencere kenarlarına hizalanır."),
            ("Izgaralar var mı?", "Evet. İstediğinizde 2 × 1, 3 × 1, 2 × 2 ya da 3 × 2 ızgaraları açın."),
            ("Hizalanmış bir pencereyi dışarı sürüklersem boyutu ne olur?", "Önceki boyutuna geri döner."),
        ]),
        ("Uyumluluk", [
            ("Her pencerede çalışır mı?", "Neredeyse hepsinde. Windows, normal bir uygulamanın yükseltilmiş ya da korumalı pencereleri denetlemesine izin vermez."),
            ("Bir uygulamayı hariç tutabilir miyim?", "Evet. Pencere başlığına, pencere sınıfına ya da .exe adına göre hariç tutun ya da GlideSnap'i tepsiden duraklatın."),
            ("Başlangıçta çalışır mı?", "Yalnızca o seçeneği açarsanız. Sistem tepsisinde durur."),
        ]),
        ("Gizlilik ve destek", [
            ("GlideSnap verilerimi topluyor mu?", "Hesap, analiz ya da reklam yoktur. İşini yapmak için fareyi ve tuşları yerel olarak izler; asla kaydetmez ya da göndermez. Gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine Windows sürümünüzle, GlideSnap sürümünüzle ve sorun çıkaran uygulamayla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("1.0.6", "2026", "Store denemesi ve lisanslama", [
            "7 günlük denemeyle gerçek Microsoft Store lisanslaması: uygulama deneme, ücretli ve süresi dolmuş durumlarını ve bir yenileme seçeneğini gösterir.",
        ]),
        ("1.0.4", "2026", "Çok daha küçük, yerel bir uygulama", [
            "Yerel bir Windows uygulaması olarak yeniden yazıldı: paket yaklaşık 42 MB yerine 1 MB'ın altında, .NET ya da WinUI çalışma zamanı yok.",
            "Sistem, Açık ve Koyu temalı tek bir ayar penceresi.",
            "İlk çalıştırmada pencere açılır, sonrasında uygulama tepside gizli başlar.",
        ]),
        ("1.0.3", "2026", "Tam ekran düzeltmesi", ["Tam ekran pencerelerle ilgili bir sorun düzeltildi."]),
    ],
    "press": {
        "oneliner": "GlideSnap, Alt ve fareyle her Windows penceresini içindeki herhangi bir yerden taşımanızı, boyutlandırmanızı ve hizalamanızı sağlar.",
        "short": "GlideSnap, Linux tarzı pencere yönetimini Windows'a getirir. Alt'a basılı tutup bir pencereyi herhangi bir yerinden sürükleyerek taşıyın, sağ düğmeyle en yakın köşeden boyutlandırın, saydamlık için kaydırın ve bir kenara bırakarak hizalayın. Tepside durur ve yolunuzdan çekilir.",
        "long": "GlideSnap, Windows 10 ve 11 için hafif bir pencere yönetimi eklentisidir. Alt (ya da seçtiğiniz değiştirici) basılıyken sol sürükleme bir pencereyi herhangi bir noktadan taşır, sağ sürükleme en yakın köşeden ya da kenardan boyutlandırır, fare tekerleği saydamlığı değiştirir, çift tıklama büyütür ya da geri alır, orta tıklama pencereyi üstte sabitler. Bir pencereyi kenara bırakmak onu tam ekrana ya da ekranın yarısına hizalar, isteğe bağlı 2 × 1, 3 × 1, 2 × 2 ve 3 × 2 ızgaraları vardır ve hizalanmış bir pencere dışarı sürüklendiğinde önceki boyutuna döner. Değiştirici tuşu ve her fare düğmesinin eylemini seçebilir, uygulamaları başlık, sınıf ya da .exe'ye göre hariç tutabilir ve GlideSnap'i tepsiden duraklatabilirsiniz. Hesapsız, küçük, yerel bir uygulamadır ve Microsoft Store'da 7 günlük denemeyle bulunur.",
        "facts": [
            ("Ad", "GlideSnap"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 ve Windows 11"),
            ("Kategori", "Yardımcı programlar, verimlilik"),
            ("Dil", "English"),
            ("Fiyat", "Microsoft Store'da ücretli uygulama, 7 günlük deneme"),
            ("Web sitesi", "glidesnap.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Her yerden taşıyın"), ("shot-2", "Her köşeden boyutlandırın"), ("shot-3", "Kenara hizalayın"), ("shot-4", "Tekerlekle saydamlık")],
        "notes": ["Ekran görüntüleri, örnek pencereli canlı demodandır. Lütfen logoyu değiştirmeyin.", "GlideSnap hakkında yazarken lütfen Microsoft Store sayfasına ya da glidesnap.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["GlideSnap kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "GlideSnap analiz, telemetri, reklam ya da takip kullanmaz.", "GlideSnap hesap gerektirmez.", "Ayarları cihazınızda kalır."]),
        ("GlideSnap bilgisayarınızda ne yapar", ["Çalışmak için GlideSnap, imlecin altındaki pencereyi taşıyabilmek, boyutlandırabilmek, hizalayabilmek ve soldurabilmek için fare düğmelerinizi, fare tekerleğinizi ve seçtiğiniz değiştirici tuşu dinler. Bunu yalnızca bilgisayarınızda yapar. Ne yazdığınızı ya da nereye tıkladığınızı kaydetmez ve bu bilgiyi hiçbir yere göndermez.",
                                                "Diğer pencereleri yalnızca hareketlerini kullandığınızda taşır, boyutlandırır ve saydamlığını ya da her zaman üstte durumunu değiştirir. Yükseltilmiş ya da korumalı pencereleri denetleyemez."]),
        ("Cihazınızda ne saklar", ["Ayarlarınız (tuşlar, hizalama ve ızgara seçenekleri, hariç tutmalar, tema) bilgisayarınızda küçük bir ayar dosyasında saklanır. GlideSnap'i kaldırmak uygulamayı siler."]),
        ("Ağ kullanımı", ["GlideSnap'in sunucularımıza veri gönderen bir özelliği yoktur. Satın alma, deneme, lisans, derecelendirme ve güncellemeleri Microsoft, Windows'a yerleşik hizmetler üzerinden yürütür. GlideSnap bağlantılar içerir (örneğin web sitemize ya da e-posta göndermeye); bir bağlantıyı açmak varsayılan tarayıcınızı ya da e-posta uygulamanızı kullanır."]),
        ("Çocuklar", ["GlideSnap, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Pencereleri içlerindeki herhangi bir yerden taşımak ve boyutlandırmak yeni bir fikir değil. İşte GlideSnap'in aynı hareketi yapan iki tanınmış aracın yanında nerede durduğuna ve her birinin daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("PowerToys Grab And Move", "Microsoft PowerToys'ın parçası",
             "Alt ya da Windows tuşuna basılı tutup bir pencerenin içinde herhangi bir yerden sürükleyerek taşıyın ya da sağ düğmeyle sürükleyerek en yakın kenar ya da köşeden boyutlandırın. Hariç tutulan uygulamaları, pencere boyutunu gösterme seçeneği ve Oyun Modu açıkken devre dışı kalma ayarı vardır.",
             "GlideSnap, isteğe bağlı ızgaralı kenar hizalama, fare tekerleğiyle saydamlık ve orta tıkla pencereyi üstte sabitleme ekler; Alt, Ctrl ya da Shift seçmenize izin verir ve Microsoft Store'dan gelen küçük, bağımsız bir uygulamadır.",
             "Zaten PowerToys kullanıyorsanız ve ihtiyacınız yalnızca taşıma ve boyutlandırmaysa Grab And Move'u seçin."),
            ("AltSnap", "Açık kaynak, GPL-3.0",
             "Windows için uzun süredir var olan, pencereleri herhangi bir yerden taşıyıp boyutlandıran, pencereleri saydam sürükleyen, büyütme eylemi ve kara listeleri olan, tepsiden çalışan ve Windows NT 4'ten Windows 11'e destekleyen bir Alt-sürükleme aracı.",
             "GlideSnap, kenar hizalama, ızgaralar, tekerlekle saydamlık ve her zaman üstte özelliklerine sahip bir Microsoft Store uygulamasıdır ve Store üzerinden güncellenir.",
             "Açık kaynak istiyorsanız ya da çok eski Windows sürümlerinde çalışmanız gerekiyorsa AltSnap'i seçin."),
        ],
        "foot": "16 Kasım 2026'da araçların kendi sayfalarından kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "from anywhere", "chip": ("Alt + drag", "A 7-day trial, no account"),
        "stats": [(5, "", "mouse gestures with Alt"), (4, "", "snapping grids"), (1, "", "MB: a small native app"), (0, "", "accounts to create")],
        "explorer_note": "Pick a feature and the live desktop shows it. Try it yourself: hold Alt, or tap the on-screen Alt key, then drag a window.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "How GlideSnap compares", "compare_sub": 'PowerToys Grab And Move and AltSnap do the same gesture. Here is where each one fits.',
    },
    "tr": {
        "emph": "her yerinden", "chip": ("Alt + sürükle", "7 günlük deneme, hesap yok"),
        "stats": [(5, "", "Alt ile fare hareketi"), (4, "", "hizalama ızgarası"), (1, "", "MB: küçük, yerel bir uygulama"), (0, "", "oluşturulacak hesap")],
        "explorer_note": "Bir özellik seçin, canlı masaüstü onu gösterir. Kendiniz deneyin: Alt'a basılı tutun ya da ekrandaki Alt tuşuna dokunun, sonra bir pencereyi sürükleyin.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "GlideSnap nasıl bir yerde duruyor", "compare_sub": 'PowerToys Grab And Move ve AltSnap aynı hareketi yapar. İşte her birinin uygun olduğu yer.',
    },
}

# Feature explorer scenes (GlideSnapDemo.apply), in the order of APPS["glidesnap"]["en"]["features"].
SCENES = [
    [[0, {"reset": 1, "alt": True, "tip": 0}], [800, {"move": {"notes": {"x": 430, "y": 210}}}], [2500, {"move": {"notes": {"x": 60, "y": 60}}}]],
    [[0, {"reset": 1, "alt": True, "tip": 1}], [800, {"move": {"files": {"w": 440, "h": 270}}, "sizeHud": "440 × 270"}], [2500, {"move": {"files": {"w": 300, "h": 190}}, "sizeHud": "300 × 190"}]],
    [[0, {"reset": 1, "alt": True, "tip": 5}], [800, {"snap": {"notes": "left"}}], [2500, {"snap": {"files": "right"}}]],
    [[0, {"reset": 1, "alt": True, "tip": 2}], [700, {"move": {"files": {"x": 190, "y": 90}}}], [1500, {"move": {"notes": {"op": 0.4}}, "opHud": 0.4}], [3200, {"move": {"notes": {"op": 1}}}]],
    [[0, {"reset": 1, "alt": True, "tip": 4}], [700, {"move": {"music": {"x": 330, "y": 120}}}], [1400, {"pin": {"music": True}, "front": "music"}]],
    [[0, {"reset": 1, "alt": True, "tip": 5}], [800, {"snap": {"notes": "left"}}], [2600, {"restore": "notes"}]],
    [[0, {"reset": 1, "alt": True, "tip": 0}]],
    [[0, {"reset": 1, "alt": False}]],
]

# "How it works" scroll story: the feature-explorer scene shown for each of the three steps.
STORY = [0, 1, 2]

# Feature matrix for the comparison table. A tick = confirmed on the tool's own page (checked 2026-11-16), a dash = not mentioned there.
MATRIX = {
    "en": {
        "cols": [('GlideSnap', 'This app'), ('PowerToys Grab And Move', 'Microsoft PowerToys'), ('AltSnap', 'Open source (GPL-3.0)')],
        "rows": [('Move a window by dragging anywhere in it', [1, 1, 1]), ('Resize with a right-button drag', [1, 1, 1]), ('Choose the modifier key', [1, 1, 0]), ('Snap to screen edges', [1, 0, 0]), ('Optional 2×1, 3×1, 2×2 and 3×2 grids', [1, 0, 0]), ('Change window opacity with the mouse wheel', [1, 0, 0]), ('Pin a window on top with a middle click', [1, 0, 0]), ('Excluded apps', [1, 1, 1])],
        "legend": "A tick means we confirmed it on the tool's own page (Microsoft Learn for Grab And Move, the AltSnap project page). A dash means it is not mentioned there. Grab And Move lets you choose Alt or the Windows key; AltSnap also drags windows transparently and runs from Windows NT 4 to Windows 11.",
        "bars": 'Confirmed features',
        "checked": 'Checked on 16 November 2026.',
    },
    "tr": {
        "cols": [('GlideSnap', 'Bu uygulama'), ('PowerToys Grab And Move', 'Microsoft PowerToys'), ('AltSnap', 'Açık kaynak (GPL-3.0)')],
        "rows": [('Pencereyi içindeki herhangi bir yerden sürükleyerek taşıma', [1, 1, 1]), ('Sağ düğmeyle sürükleyerek boyutlandırma', [1, 1, 1]), ('Değiştirici tuşu seçme', [1, 1, 0]), ('Ekran kenarlarına hizalama', [1, 0, 0]), ('İsteğe bağlı 2×1, 3×1, 2×2 ve 3×2 ızgaraları', [1, 0, 0]), ('Fare tekerleğiyle pencere saydamlığını değiştirme', [1, 0, 0]), ('Orta tıkla pencereyi üstte sabitleme', [1, 0, 0]), ('Hariç tutulan uygulamalar', [1, 1, 1])],
        "legend": "Onay işareti, aracın kendi sayfasında (Grab And Move için Microsoft Learn, AltSnap için proje sayfası) doğruladığımız anlamına gelir. Çizgi, orada anılmadığı anlamına gelir. Grab And Move Alt ya da Windows tuşunu seçmenize izin verir; AltSnap ayrıca pencereleri saydam sürükler ve Windows NT 4'ten Windows 11'e çalışır.",
        "bars": 'Doğrulanan özellikler',
        "checked": "16 Kasım 2026'da kontrol edildi.",
    },
}

DATA = {"en": EN, "tr": TR}
