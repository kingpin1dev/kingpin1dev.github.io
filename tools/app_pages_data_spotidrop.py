"""Content for the SpotiDrop side pages and home extras (English and Turkish).

Facts: the project's README and its 0.5.0 working notes, the source (endpoints it contacts), and the live SpotiDrop page.
SpotiDrop is distributed as a signed-less installer from kingpindev.com, not through the Microsoft Store. The legal note stays on every page:
download only content you have the right to download.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is SpotiDrop?", "SpotiDrop downloads music from YouTube, SoundCloud, Bandcamp and other supported sites into your Spotify Local Files folder, tagged with title, artist, album and cover art, ready to play."),
            ("What do I need to install?", "Nothing else. The installer bundles yt-dlp and ffmpeg. You need Windows 10 or 11 and an internet connection. The installer is about 122 MB, installs for your user and needs no administrator rights."),
            ("Is it free? Do I need an account?", "SpotiDrop is free and there is no account to create."),
            ("Where do I get it?", "From the download button on this site (kingpindev.com/spotidrop). It is not on the Microsoft Store."),
        ]),
        ("Spotify", [
            ("Does it download audio from Spotify?", "No. Spotify is only read for public track information: title, artists, album, cover, duration, track number and release date. The audio comes from a public source such as YouTube or SoundCloud, or from files you already own."),
            ("Why is Spotify audio never downloaded?", "Spotify streams are DRM-protected and licensed per country. SpotiDrop deliberately stops at the metadata."),
            ("What can I paste in the Spotify tab?", "A Spotify track, album or playlist link, or a spotify: URI. Artist links are not supported."),
            ("Why does a track sometimes find nothing?", "Some tracks are restricted by country or have no matching public source. The metadata still shows, but the source search may find nothing."),
            ("How do my files get into Spotify?", "Files go into the folder you choose. The Spotify Guide in the app walks you through Settings, Local Files, Add a source, so the tracks play in Spotify and sync to your phone over Wi-Fi."),
        ]),
        ("Downloads", [
            ("Which formats can I get?", "MP3 at 44.1 kHz by default, with FLAC and other formats in Settings. Spotify downloads are 44.1 kHz MP3 with the Spotify tags and a 500 by 500 cover."),
            ("Can I download a whole album?", "Yes. Download all queues the whole album or playlist; several tracks run in parallel with live progress."),
            ("Can I tag files I already own?", "Yes. Point SpotiDrop at a file, or use Match a folder to match a whole album by duration and name, and it writes Spotify's tags and cover."),
            ("What if YouTube rejects the download engine?", "YouTube sometimes rejects older yt-dlp builds. SpotiDrop keeps the engine up to date and updates it once automatically when a download is rejected. There is also a manual Update in Settings."),
        ]),
        ("Responsible use", [
            ("What may I download?", "Only content you have the right to download: Creative Commons, public domain, podcasts, your own uploads. Downloading copyrighted music may violate a platform's terms and copyright law. You are responsible for how you use SpotiDrop."),
        ]),
        ("Privacy and support", [
            ("Does SpotiDrop collect my data?", "No accounts, analytics or advertising. See the privacy page for what it contacts to do its job."),
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your Windows version, your SpotiDrop version and what you were doing."),
        ]),
    ],
    "changelog": [
        ("0.6.0", "2026", "Current release", [
            "Installer of about 122 MB with yt-dlp and ffmpeg bundled, per-user install without administrator rights.",
            "Checks a small update manifest on start and shows a banner when a new version is out.",
        ]),
        ("0.5.0", "24 October 2026", "A built-in Spotify tab", [
            "The Spotify tab no longer opens a third-party website: SpotiDrop reads public Spotify track, album and playlist information itself (no account, no token).",
            "Download from Spotify links: the audio is searched in parallel on YouTube and SoundCloud, scored by duration and title or artist similarity, and the best match is downloaded and tagged with the Spotify metadata and a cover.",
            "Download all for albums and playlists, with per-track progress.",
            "Tag files you own: pick a file for a track, or Match a folder to match a whole folder by duration and name.",
            "Short spotify.link addresses are resolved, and a transient network error is retried once.",
        ]),
    ],
    "press": {
        "oneliner": "SpotiDrop downloads music from YouTube, SoundCloud and Bandcamp into Spotify Local Files, tagged with cover art.",
        "short": "SpotiDrop saves music from YouTube, SoundCloud, Bandcamp and other supported sites as tagged MP3 files in your Spotify Local Files folder. Paste a Spotify link to get the track list and cover, then let it find the audio. yt-dlp and ffmpeg are bundled; no account is needed. Use it only for content you have the right to download.",
        "long": "SpotiDrop is a Windows app with a glassy, neon-lit interface that turns links into properly tagged music files. Paste a YouTube, SoundCloud or Bandcamp link, search for a track, or paste a Spotify track, album or playlist link: SpotiDrop reads Spotify's public information (title, artists, album, cover, track number), finds the audio on a public source, converts it to 44.1 kHz MP3 and writes the Spotify tags and a cover, saving it where Spotify's Local Files picks it up. Whole albums download from a queue with live progress, files you already own can be matched and tagged from a folder, and the download engine can update itself. It never downloads audio from Spotify, needs no account and bundles yt-dlp and ffmpeg. SpotiDrop should be used only for content you have the right to download.",
        "facts": [
            ("Name", "SpotiDrop"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 and Windows 11"),
            ("Version", "0.6.0, about 122 MB installer"),
            ("Category", "Music and audio, utilities"),
            ("Price", "Free, no account"),
            ("Distribution", "Download from kingpindev.com/spotidrop (not on the Microsoft Store)"),
            ("Website", "spotidrop.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "The Spotify tab"), ("shot-2", "Downloading with live progress"), ("shot-3", "The Library"), ("shot-4", "Settings")],
        "notes": ["SpotiDrop is not affiliated with Spotify, YouTube, SoundCloud or Bandcamp. Please do not describe it as an official tool of any of them.", "Screenshots show example tracks. Please do not alter the logo.", "Please mention that SpotiDrop should only be used for content the user has the right to download."],
    },
    "privacy": [
        ("Summary", ["SpotiDrop does not collect, sell or share your personal data.", "SpotiDrop does not use analytics, telemetry, advertising or tracking.", "SpotiDrop does not require an account.", "Your settings, library and downloaded files stay on your device."]),
        ("What SpotiDrop stores on your device", ["Your settings, your library list and the files you download are stored on your PC, in the folders you choose and in your user profile. Uninstalling SpotiDrop removes the app."]),
        ("What SpotiDrop contacts to do its job", ["When you download or search, SpotiDrop (through the bundled yt-dlp) connects to the site you point it at, for example YouTube, SoundCloud or Bandcamp, to find and download audio. Those sites see your internet address and have their own privacy practices.",
                                                    "When you paste a Spotify link, SpotiDrop reads public Spotify pages for the track information and cover. It does not log in to Spotify and does not download Spotify's audio.",
                                                    "On start SpotiDrop fetches a small update manifest (latest.json) from kingpindev.com to see whether a new version exists, and it can download the yt-dlp engine from its public releases on GitHub. Like any web server, those servers may keep standard request logs (such as your internet address and the time of the request). We do not use them to identify you.",
                                                    "Thumbnails may be loaded from the image servers of the site you search."]),
        ("Responsible use", ["Download only content you have the right to download. You are responsible for following each platform's terms and the law."]),
        ("Children", ["SpotiDrop does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "There are a few ways to get music into Spotify's Local Files or onto your own devices. Here is an honest look at how SpotiDrop fits next to them, and where each is the better pick.",
        "items": [
            ("yt-dlp on the command line", "Free and open source",
             "The engine SpotiDrop builds on: extremely flexible, supports a huge list of sites and every option you can think of, from the command line.",
             "SpotiDrop adds a point-and-click interface, queues, automatic tagging with cover art, Spotify link matching and a Local Files workflow, with yt-dlp and ffmpeg bundled and kept up to date.",
             "Use yt-dlp directly if you are comfortable in a terminal and want every option."),
            ("Spotify's own offline mode", "From Spotify, for subscribers",
             "The official way to listen offline inside the Spotify app, with the full catalogue.",
             "SpotiDrop makes ordinary music files you keep, from public sources you choose, tagged and ready for Spotify's Local Files or any player. It does not take audio from Spotify.",
             "Use Spotify's offline mode when you simply want Spotify's catalogue offline in the Spotify app."),
        ],
        "foot": "Checked on 16 November 2026. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("SpotiDrop nedir?", "SpotiDrop; YouTube, SoundCloud, Bandcamp ve desteklenen diğer sitelerden müziği, başlık, sanatçı, albüm ve kapak resmi etiketleriyle Spotify Yerel Dosyalar klasörünüze indirir; çalmaya hazır."),
            ("Neyi kurmam gerekir?", "Başka bir şey değil. Yükleyici yt-dlp ve ffmpeg'i içerir. Windows 10 ya da 11 ve internet bağlantısı gerekir. Yükleyici yaklaşık 122 MB, kullanıcınız için kurulur ve yönetici hakkı istemez."),
            ("Ücretsiz mi? Hesap gerekir mi?", "SpotiDrop ücretsizdir ve oluşturulacak bir hesap yoktur."),
            ("Nereden edinirim?", "Bu sitedeki indirme düğmesinden (kingpindev.com/spotidrop). Microsoft Store'da değildir."),
        ]),
        ("Spotify", [
            ("Spotify'dan ses indiriyor mu?", "Hayır. Spotify yalnızca herkese açık parça bilgisi için okunur: başlık, sanatçılar, albüm, kapak, süre, parça numarası ve çıkış tarihi. Ses YouTube ya da SoundCloud gibi herkese açık bir kaynaktan ya da zaten sahip olduğunuz dosyalardan gelir."),
            ("Spotify sesi neden hiç indirilmiyor?", "Spotify akışları DRM korumalıdır ve ülke bazında lisanslıdır. SpotiDrop bilerek künyede durur."),
            ("Spotify sekmesine ne yapıştırabilirim?", "Bir Spotify parça, albüm ya da çalma listesi bağlantısı veya bir spotify: URI. Sanatçı bağlantıları desteklenmez."),
            ("Bir parça neden bazen hiçbir şey bulamıyor?", "Bazı parçalar ülkeye göre kısıtlıdır ya da eşleşen herkese açık kaynağı yoktur. Künye yine görünür ama kaynak araması bir şey bulamayabilir."),
            ("Dosyalarım Spotify'a nasıl giriyor?", "Dosyalar seçtiğiniz klasöre gider. Uygulamadaki Spotify Rehberi, Ayarlar, Yerel Dosyalar, Kaynak ekle adımlarında size yol gösterir; böylece parçalar Spotify'da çalar ve telefonunuza Wi-Fi ile eşitlenir."),
        ]),
        ("İndirmeler", [
            ("Hangi biçimleri alabilirim?", "Varsayılan olarak 44,1 kHz MP3; Ayarlar'da FLAC ve diğer biçimler. Spotify indirmeleri, Spotify etiketleri ve 500 × 500 kapakla 44,1 kHz MP3'tür."),
            ("Bütün bir albümü indirebilir miyim?", "Evet. Tümünü indir, bütün albümü ya da çalma listesini kuyruğa alır; birkaç parça canlı ilerlemeyle paralel çalışır."),
            ("Zaten sahip olduğum dosyaları etiketleyebilir miyim?", "Evet. SpotiDrop'u bir dosyaya yöneltin ya da Klasörü eşleştir ile bütün bir albümü süre ve adla eşleştirin; Spotify etiketlerini ve kapağı yazar."),
            ("YouTube indirme motorunu reddederse ne olur?", "YouTube bazen eski yt-dlp sürümlerini reddeder. SpotiDrop motoru güncel tutar ve bir indirme reddedildiğinde bir kez kendiliğinden günceller. Ayarlar'da elle Güncelle de vardır."),
        ]),
        ("Sorumlu kullanım", [
            ("Ne indirebilirim?", "Yalnızca indirme hakkına sahip olduğunuz içerikleri: Creative Commons, kamu malı, podcast'ler, kendi yüklemeleriniz. Telif hakkıyla korunan müziği indirmek bir platformun şartlarını ve telif hukukunu ihlal edebilir. SpotiDrop'u nasıl kullandığınızdan siz sorumlusunuz."),
        ]),
        ("Gizlilik ve destek", [
            ("SpotiDrop verilerimi topluyor mu?", "Hesap, analiz ya da reklam yoktur. İşini yapmak için nelere bağlandığını gizlilik sayfasında görün."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine Windows sürümünüzle, SpotiDrop sürümünüzle ve ne yaptığınızla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("0.6.0", "2026", "Güncel sürüm", [
            "yt-dlp ve ffmpeg dâhil yaklaşık 122 MB'lık yükleyici; yönetici hakkı gerektirmeyen kullanıcı başına kurulum.",
            "Açılışta küçük bir güncelleme bildirimine bakar ve yeni sürüm çıktığında bir şerit gösterir.",
        ]),
        ("0.5.0", "24 Ekim 2026", "Yerleşik Spotify sekmesi", [
            "Spotify sekmesi artık üçüncü taraf bir web sitesi açmaz: SpotiDrop herkese açık Spotify parça, albüm ve çalma listesi bilgisini kendisi okur (hesap yok, belirteç yok).",
            "Spotify bağlantılarından indirme: ses YouTube ve SoundCloud'da paralel aranır, süre ve başlık ya da sanatçı benzerliğiyle puanlanır; en iyi eşleşme indirilir ve Spotify künyesi ve kapakla etiketlenir.",
            "Albümler ve çalma listeleri için Tümünü indir, parça başına ilerlemeyle.",
            "Kendi dosyalarınızı etiketleme: bir parça için dosya seçin ya da Klasörü eşleştir ile bütün bir klasörü süre ve adla eşleştirin.",
            "Kısa spotify.link adresleri çözülür ve geçici bir ağ hatası bir kez yeniden denenir.",
        ]),
    ],
    "press": {
        "oneliner": "SpotiDrop, YouTube, SoundCloud ve Bandcamp'ten müziği kapak resimli etiketlerle Spotify Yerel Dosyalar'a indirir.",
        "short": "SpotiDrop, YouTube, SoundCloud, Bandcamp ve desteklenen diğer sitelerden müziği Spotify Yerel Dosyalar klasörünüze etiketli MP3 dosyaları olarak kaydeder. Parça listesini ve kapağı almak için bir Spotify bağlantısı yapıştırın, sonra sesi bulmasını bırakın. yt-dlp ve ffmpeg dâhildir; hesap gerekmez. Yalnızca indirme hakkına sahip olduğunuz içerikler için kullanın.",
        "long": "SpotiDrop, bağlantıları düzgün etiketlenmiş müzik dosyalarına çeviren, cam görünümlü ve neon ışıklı arayüzlü bir Windows uygulamasıdır. Bir YouTube, SoundCloud ya da Bandcamp bağlantısı yapıştırın, bir parça arayın ya da bir Spotify parça, albüm ya da çalma listesi bağlantısı yapıştırın: SpotiDrop Spotify'ın herkese açık bilgisini (başlık, sanatçılar, albüm, kapak, parça numarası) okur, sesi herkese açık bir kaynakta bulur, 44,1 kHz MP3'e çevirir ve Spotify etiketlerini ve bir kapağı yazarak Spotify Yerel Dosyalar'ın aldığı yere kaydeder. Bütün albümler canlı ilerlemeyle kuyruktan iner, zaten sahip olduğunuz dosyalar bir klasörden eşleştirilip etiketlenebilir ve indirme motoru kendini güncelleyebilir. Spotify'dan asla ses indirmez, hesap gerektirmez ve yt-dlp ile ffmpeg'i içerir. SpotiDrop yalnızca indirme hakkına sahip olduğunuz içerikler için kullanılmalıdır.",
        "facts": [
            ("Ad", "SpotiDrop"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 ve Windows 11"),
            ("Sürüm", "0.6.0, yaklaşık 122 MB yükleyici"),
            ("Kategori", "Müzik ve ses, yardımcı programlar"),
            ("Fiyat", "Ücretsiz, hesap yok"),
            ("Dağıtım", "kingpindev.com/spotidrop adresinden indirme (Microsoft Store'da değil)"),
            ("Web sitesi", "spotidrop.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Spotify sekmesi"), ("shot-2", "Canlı ilerlemeyle indirme"), ("shot-3", "Kütüphane"), ("shot-4", "Ayarlar")],
        "notes": ["SpotiDrop; Spotify, YouTube, SoundCloud ya da Bandcamp ile bağlantılı değildir. Lütfen bunlardan herhangi birinin resmî aracı olarak tanıtmayın.", "Ekran görüntüleri örnek parçaları gösterir. Lütfen logoyu değiştirmeyin.", "Lütfen SpotiDrop'un yalnızca kullanıcının indirme hakkına sahip olduğu içerikler için kullanılması gerektiğini belirtin."],
    },
    "privacy": [
        ("Özet", ["SpotiDrop kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "SpotiDrop analiz, telemetri, reklam ya da takip kullanmaz.", "SpotiDrop hesap gerektirmez.", "Ayarlarınız, kütüphaneniz ve indirdiğiniz dosyalar cihazınızda kalır."]),
        ("SpotiDrop cihazınızda ne saklar", ["Ayarlarınız, kütüphane listeniz ve indirdiğiniz dosyalar bilgisayarınızda, seçtiğiniz klasörlerde ve kullanıcı profilinizde saklanır. SpotiDrop'u kaldırmak uygulamayı siler."]),
        ("SpotiDrop işini yapmak için nelere bağlanır", ["İndirdiğinizde ya da aradığınızda SpotiDrop (birlikte gelen yt-dlp aracılığıyla) sesi bulmak ve indirmek için yöneltildiği siteye bağlanır; örneğin YouTube, SoundCloud ya da Bandcamp. Bu siteler internet adresinizi görür ve kendi gizlilik uygulamalarına sahiptir.",
                                                         "Bir Spotify bağlantısı yapıştırdığınızda SpotiDrop parça bilgisi ve kapak için herkese açık Spotify sayfalarını okur. Spotify'a giriş yapmaz ve Spotify'ın sesini indirmez.",
                                                         "Açılışta SpotiDrop, yeni bir sürüm olup olmadığına bakmak için kingpindev.com'dan küçük bir güncelleme bildirimi (latest.json) alır ve yt-dlp motorunu GitHub'daki herkese açık sürümlerinden indirebilir. Her web sunucusu gibi bu sunucular standart istek günlükleri (internet adresiniz ve isteğin zamanı gibi) tutabilir. Bunları sizi tanımlamak için kullanmayız.",
                                                         "Küçük resimler, aradığınız sitenin görsel sunucularından yüklenebilir."]),
        ("Sorumlu kullanım", ["Yalnızca indirme hakkına sahip olduğunuz içerikleri indirin. Her platformun şartlarına ve yasaya uymaktan siz sorumlusunuz."]),
        ("Çocuklar", ["SpotiDrop, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Müziği Spotify Yerel Dosyalar'a ya da kendi cihazlarınıza almanın birkaç yolu var. İşte SpotiDrop'un onların yanında nerede durduğuna ve her birinin daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("Komut satırında yt-dlp", "Ücretsiz ve açık kaynak",
             "SpotiDrop'un üzerine kurulduğu motor: son derece esnek, çok uzun bir site listesini ve akla gelen her seçeneği komut satırından destekler.",
             "SpotiDrop; göster-tıkla bir arayüz, kuyruklar, kapaklı otomatik etiketleme, Spotify bağlantısı eşleştirme ve bir Yerel Dosyalar akışı ekler; yt-dlp ve ffmpeg dâhildir ve güncel tutulur.",
             "Terminalde rahatsanız ve her seçeneği istiyorsanız doğrudan yt-dlp kullanın."),
            ("Spotify'ın kendi çevrimdışı modu", "Spotify'dan, aboneler için",
             "Spotify uygulamasında tam kataloğuyla çevrimdışı dinlemenin resmî yolu.",
             "SpotiDrop, sizin seçtiğiniz herkese açık kaynaklardan, saklayacağınız sıradan müzik dosyaları üretir; etiketli ve Spotify Yerel Dosyalar'a ya da herhangi bir oynatıcıya hazır. Spotify'dan ses almaz.",
             "Yalnızca Spotify kataloğunu Spotify uygulamasında çevrimdışı istiyorsanız Spotify'ın çevrimdışı modunu kullanın."),
        ],
        "foot": "16 Kasım 2026'da kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "tagged music", "chip": ("0.6.0", "Includes yt-dlp and ffmpeg, no account needed"),
        "stats": [(6, "", "tabs: link, search, Spotify, library, guide, settings"), (44, ".1 kHz", "MP3 with title, artist, album and cover"), (122, " MB", "installer with everything bundled"), (0, "", "accounts to create")],
        "explorer_note": "Pick a feature and the real SpotiDrop interface shows it. It reads a made-up album and fakes the downloads, so nothing is saved.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "How SpotiDrop compares", "compare_sub": "yt-dlp and Spotify's own offline mode are both good. Here is where each one fits.",
    },
    "tr": {
        "emph": "etiketli müzik", "chip": ("0.6.0", "yt-dlp ve ffmpeg dâhil, hesap gerekmez"),
        "stats": [(6, "", "sekme: bağlantı, arama, Spotify, kütüphane, rehber, ayarlar"), (44, ",1 kHz", "başlık, sanatçı, albüm ve kapaklı MP3"), (122, " MB", "her şeyi içeren yükleyici"), (0, "", "oluşturulacak hesap")],
        "explorer_note": "Bir özellik seçin, gerçek SpotiDrop arayüzü onu gösterir. Uydurma bir albümü okur ve indirmeleri taklit eder, hiçbir şey kaydedilmez.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "SpotiDrop nasıl bir yerde duruyor", "compare_sub": "yt-dlp ve Spotify'ın kendi çevrimdışı modu ikisi de iyi. İşte her birinin uygun olduğu yer.",
    },
}

# Feature explorer scenes (the real SpotiDrop interface in the frame), in the order of APPS["spotidrop"]["en"]["features"].
SCENES = [
    [[0, {"clickText": "Spotify"}]],
    [[0, {"clickText": "Search"}], [1200, {"clickText": "Link"}]],
    [[0, {"clickText": "Spotify"}], [900, {"clickText": "Download", "nth": 1}]],
    [[0, {"clickText": "Spotify Guide"}]],
    [[0, {"clickText": "Spotify"}], [800, {"clickText": "Download all"}]],
    [[0, {"clickText": "Spotify"}]],
    [[0, {"clickText": "Settings"}]],
    [[0, {"clickText": "Library", "starts": True}]],
]

DATA = {"en": EN, "tr": TR}
