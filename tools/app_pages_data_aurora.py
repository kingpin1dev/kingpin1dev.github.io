"""Content for the Aurora Radios side pages and home extras (English and Turkish).

Facts: the project's source and packaging (station directory: radio-browser.info; liked songs open Spotify, Apple Music or YouTube Music searches;
optional Discord Rich Presence; tray) and the live Aurora Radios page.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is Aurora Radios?", "Aurora Radios is a Windows app for listening to live radio from around the world. Pick a mood, genre or country, or search, and start a station with one click."),
            ("Which versions of Windows does it support?", "Windows 10 (version 1809 or later) and Windows 11. It needs an internet connection to stream stations."),
            ("Where do I get it?", "From the Microsoft Store. Updates arrive automatically through the Store."),
            ("Do I need an account?", "No. Open the app and start listening."),
            ("Are there ads?", "No. Aurora Radios shows no ads."),
        ]),
        ("Finding stations", [
            ("How do I find something to listen to?", "Browse by mood (Chill, Focus, Energetic, Party, Sleep, Late Night and more), by genre, or by country, or type in the search box and results appear as you type."),
            ("Where do the stations come from?", "Station information comes from the community-run Radio Browser directory, and the audio streams directly from each station."),
            ("Can I save stations?", "Yes. Mark the stations you love as favourites for quick access."),
        ]),
        ("Listening", [
            ("Can I see which song is playing?", "Yes. For stations that share it, the artist and title appear in the player."),
            ("What are liked songs?", "Like a song and it is kept in your own list. From there you can search for it on Spotify, Apple Music or YouTube Music."),
            ("What is the Now playing view?", "A full-screen view with album art and a live equalizer."),
            ("Does it keep playing when I close the window?", "Yes. It keeps playing from the system tray until you stop it."),
            ("Does it work with Discord?", "Optionally. If you turn it on, Aurora Radios can show what you are listening to as your Discord activity (Rich Presence)."),
        ]),
        ("Looks", [
            ("Are there themes?", "Two: a deep animated Aurora theme and a Windows 11 Mica theme."),
        ]),
        ("Privacy and support", [
            ("Does Aurora Radios collect my data?", "No accounts, no analytics and no advertising. Your favourites and liked songs stay on your PC. The app connects to the station directory and to the stations you play. See the privacy page."),
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your Windows version, your Aurora Radios version and the station you were playing."),
            ("How much does it cost?", "The Store page always shows the current price."),
        ]),
    ],
    "changelog": [
        ("0.1.0", "2026", "First release", [
            "Live radio by mood, genre or country, with search as you type.",
            "Current artist and title on supported stations, liked songs and favourite stations.",
            "Full-screen Now playing view with a live equalizer.",
            "Two themes (Aurora and Windows 11 Mica), playback from the system tray and optional Discord Rich Presence.",
        ]),
    ],
    "press": {
        "oneliner": "Aurora Radios plays live radio from around the world by mood, genre or country, with no account and no ads.",
        "short": "Aurora Radios is a Windows app for live radio. Pick a vibe like Chill, Focus or Late Night, browse by genre or country, see the song that is playing, save favourite stations and keep listening from the tray. No account, no ads.",
        "long": "Aurora Radios is a Windows 10 and 11 app that makes live radio easy to discover. Choose a mood such as Chill, Focus, Energetic or Late Night, browse by genre, or explore stations from more than 200 countries, with search that updates as you type. See the artist and title that is playing on supported stations, like songs to keep a personal list and open them on Spotify, Apple Music or YouTube Music, and save your favourite stations. A full-screen Now playing view shows album art and a live equalizer, two themes (a deep animated Aurora theme and a Windows 11 Mica theme) set the look, and the app keeps playing from the system tray after you close the window, with optional Discord Rich Presence. Aurora Radios needs no account, shows no ads and is available on the Microsoft Store.",
        "facts": [
            ("Name", "Aurora Radios"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) and Windows 11"),
            ("Category", "Music and audio"),
            ("Requires", "An internet connection"),
            ("Account and ads", "No account, no ads"),
            ("Website", "aurora.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "Pick a mood"), ("shot-2", "Browse by genre"), ("shot-3", "Live search"), ("shot-4", "Favourite stations")],
        "notes": ["Screenshots show live stations at the time they were taken. Station names and logos belong to their owners.", "Please do not alter the logo.", "When you write about Aurora Radios, please link to its Microsoft Store page or to aurora.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["Aurora Radios does not collect, sell or share your personal data.", "Aurora Radios does not use analytics, telemetry, advertising or tracking.", "Aurora Radios does not require an account.", "Your favourites, liked songs and settings stay on your device."]),
        ("What Aurora Radios stores on your device", ["Your settings, favourite stations and liked songs are stored on your PC. Uninstalling Aurora Radios removes the app; you can also delete its data folder."]),
        ("Network use", ["To work, Aurora Radios connects to the Radio Browser station directory to look up stations, and to the stations you choose to play to stream their audio. Those services see your internet address, like any website or radio player you use, and have their own privacy practices.",
                         "Aurora Radios does not send your listening history or favourites to our servers.",
                         "If you turn on Discord Rich Presence, Aurora Radios tells the Discord app on your PC which station you are listening to so Discord can show it as your activity. Discord's own privacy policy applies to it.",
                         "When you search for a liked song on Spotify, Apple Music or YouTube Music, the search opens in your browser and that service's privacy policy applies.",
                         "If you obtained Aurora Radios from the Microsoft Store, purchases, licensing, ratings and updates are handled by Microsoft through the services built into Windows."]),
        ("Children", ["Aurora Radios does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "There are many ways to listen to radio on a PC. Here is an honest look at how Aurora Radios fits next to the two most common ones, and where each is the better pick.",
        "items": [
            ("Radio websites in your browser", "Free in any browser",
             "Nothing to install, and the station's own site often has extras like schedules and show pages.",
             "Aurora Radios is a dedicated app: browse by mood, genre or country in one place, see the current song, save favourites, and keep playing from the tray without a browser tab.",
             "Use the station's own site when you want its schedules, podcasts or live chat."),
            ("Streaming music services", "Spotify, Apple Music, YouTube Music and similar",
             "Huge on-demand catalogues, playlists and recommendations made for you.",
             "Aurora Radios is live radio: stations from around the world, no account and no ads, and it can hand a liked song over to Spotify, Apple Music or YouTube Music when you want to hear it on demand.",
             "Pick a streaming service when you want to choose exactly which song plays."),
        ],
        "foot": "Checked on 16 November 2026. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("Aurora Radios nedir?", "Aurora Radios, dünyanın dört bir yanından canlı radyo dinlemek için bir Windows uygulamasıdır. Bir ruh hâli, tür ya da ülke seçin veya arayın; bir istasyonu tek tıkla başlatın."),
            ("Hangi Windows sürümlerini destekliyor?", "Windows 10 (1809 ve sonrası) ve Windows 11. İstasyonları yayınlamak için internet bağlantısı gerekir."),
            ("Nereden edinebilirim?", "Microsoft Store'dan. Güncellemeler Store üzerinden otomatik gelir."),
            ("Hesap gerekir mi?", "Hayır. Uygulamayı açın ve dinlemeye başlayın."),
            ("Reklam var mı?", "Hayır. Aurora Radios reklam göstermez."),
        ]),
        ("İstasyon bulma", [
            ("Dinleyecek bir şeyi nasıl bulurum?", "Ruh hâline (Chill, Focus, Energetic, Party, Sleep, Late Night ve daha fazlası), türe ya da ülkeye göre gezin; ya da arama kutusuna yazın, sonuçlar yazdıkça görünür."),
            ("İstasyonlar nereden geliyor?", "İstasyon bilgileri topluluk tarafından işletilen Radio Browser dizininden gelir; ses doğrudan her istasyondan yayınlanır."),
            ("İstasyon kaydedebilir miyim?", "Evet. Sevdiğiniz istasyonları hızlı erişim için favori olarak işaretleyin."),
        ]),
        ("Dinleme", [
            ("Çalan şarkıyı görebilir miyim?", "Evet. Paylaşan istasyonlar için sanatçı ve şarkı adı oynatıcıda görünür."),
            ("Beğenilen şarkılar nedir?", "Bir şarkıyı beğenin, kendi listenizde tutulur. Oradan Spotify, Apple Music ya da YouTube Music'te arayabilirsiniz."),
            ("Şu an çalıyor görünümü nedir?", "Albüm kapağı ve canlı ekolayzırı olan tam ekran bir görünüm."),
            ("Pencereyi kapatınca çalmaya devam eder mi?", "Evet. Siz durdurana kadar sistem tepsisinden çalmaya devam eder."),
            ("Discord ile çalışır mı?", "İsteğe bağlı. Açarsanız Aurora Radios, ne dinlediğinizi Discord etkinliği (Rich Presence) olarak gösterebilir."),
        ]),
        ("Görünüm", [
            ("Temalar var mı?", "İki tane: derin, animasyonlu bir Aurora teması ve bir Windows 11 Mica teması."),
        ]),
        ("Gizlilik ve destek", [
            ("Aurora Radios verilerimi topluyor mu?", "Hesap, analiz ve reklam yoktur. Favorileriniz ve beğendiğiniz şarkılar bilgisayarınızda kalır. Uygulama istasyon dizinine ve çaldığınız istasyonlara bağlanır. Gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine Windows sürümünüzle, Aurora Radios sürümünüzle ve çaldığınız istasyonla birlikte yazın."),
            ("Ne kadar?", "Güncel fiyat her zaman Store sayfasında görünür."),
        ]),
    ],
    "changelog": [
        ("0.1.0", "2026", "İlk sürüm", [
            "Ruh hâline, türe ya da ülkeye göre canlı radyo ve yazdıkça arama.",
            "Desteklenen istasyonlarda güncel sanatçı ve şarkı adı, beğenilen şarkılar ve favori istasyonlar.",
            "Canlı ekolayzırlı tam ekran Şu an çalıyor görünümü.",
            "İki tema (Aurora ve Windows 11 Mica), sistem tepsisinden çalma ve isteğe bağlı Discord Rich Presence.",
        ]),
    ],
    "press": {
        "oneliner": "Aurora Radios, dünyanın dört bir yanından canlı radyoyu ruh hâline, türe ya da ülkeye göre çalar; hesap ve reklam yok.",
        "short": "Aurora Radios, canlı radyo için bir Windows uygulamasıdır. Chill, Focus ya da Late Night gibi bir hava seçin, türe ya da ülkeye göre gezin, çalan şarkıyı görün, favori istasyonları kaydedin ve tepsiden dinlemeye devam edin. Hesap yok, reklam yok.",
        "long": "Aurora Radios, canlı radyoyu keşfetmeyi kolaylaştıran bir Windows 10 ve 11 uygulamasıdır. Chill, Focus, Energetic ya da Late Night gibi bir ruh hâli seçin, türe göre gezin ya da 200'den fazla ülkenin istasyonlarını keşfedin; arama yazdıkça güncellenir. Desteklenen istasyonlarda çalan sanatçıyı ve şarkıyı görün, kişisel bir liste tutmak için şarkıları beğenin ve Spotify, Apple Music ya da YouTube Music'te açın, favori istasyonlarınızı kaydedin. Tam ekran bir Şu an çalıyor görünümü albüm kapağını ve canlı ekolayzırı gösterir; iki tema (derin, animasyonlu bir Aurora teması ve bir Windows 11 Mica teması) görünümü belirler; uygulama pencereyi kapattıktan sonra da sistem tepsisinden çalmaya devam eder, isteğe bağlı Discord Rich Presence ile. Aurora Radios hesap gerektirmez, reklam göstermez ve Microsoft Store'da bulunur.",
        "facts": [
            ("Ad", "Aurora Radios"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) ve Windows 11"),
            ("Kategori", "Müzik ve ses"),
            ("Gereksinim", "İnternet bağlantısı"),
            ("Hesap ve reklam", "Hesap yok, reklam yok"),
            ("Web sitesi", "aurora.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Bir ruh hâli seçin"), ("shot-2", "Türe göre gezin"), ("shot-3", "Canlı arama"), ("shot-4", "Favori istasyonlar")],
        "notes": ["Ekran görüntüleri, alındıkları andaki canlı istasyonları gösterir. İstasyon adları ve logoları sahiplerine aittir.", "Lütfen logoyu değiştirmeyin.", "Aurora Radios hakkında yazarken lütfen Microsoft Store sayfasına ya da aurora.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["Aurora Radios kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "Aurora Radios analiz, telemetri, reklam ya da takip kullanmaz.", "Aurora Radios hesap gerektirmez.", "Favorileriniz, beğendiğiniz şarkılar ve ayarlarınız cihazınızda kalır."]),
        ("Aurora Radios cihazınızda ne saklar", ["Ayarlarınız, favori istasyonlarınız ve beğendiğiniz şarkılar bilgisayarınızda saklanır. Aurora Radios'u kaldırmak uygulamayı siler; veri klasörünü de silebilirsiniz."]),
        ("Ağ kullanımı", ["Çalışmak için Aurora Radios, istasyonları aramak üzere Radio Browser istasyon dizinine ve sesi yayınlamak üzere çalmayı seçtiğiniz istasyonlara bağlanır. Bu hizmetler, kullandığınız her web sitesi ya da radyo oynatıcısı gibi internet adresinizi görür ve kendi gizlilik uygulamalarına sahiptir.",
                         "Aurora Radios dinleme geçmişinizi ya da favorilerinizi sunucularımıza göndermez.",
                         "Discord Rich Presence'ı açarsanız Aurora Radios, bilgisayarınızdaki Discord uygulamasına hangi istasyonu dinlediğinizi bildirir; Discord bunu etkinliğiniz olarak gösterebilir. Bunun için Discord'un kendi gizlilik politikası geçerlidir.",
                         "Beğendiğiniz bir şarkıyı Spotify, Apple Music ya da YouTube Music'te aradığınızda arama tarayıcınızda açılır ve o hizmetin gizlilik politikası geçerlidir.",
                         "Aurora Radios'u Microsoft Store'dan edindiyseniz satın alma, lisans, derecelendirme ve güncellemeleri Microsoft, Windows'a yerleşik hizmetler üzerinden yürütür."]),
        ("Çocuklar", ["Aurora Radios, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Bilgisayarda radyo dinlemenin birçok yolu var. İşte Aurora Radios'un en yaygın ikisinin yanında nerede durduğuna ve her birinin daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("Tarayıcıda radyo siteleri", "Her tarayıcıda ücretsiz",
             "Kurulum gerekmez; istasyonun kendi sitesinde çoğu zaman yayın akışı ve program sayfaları gibi ekstralar olur.",
             "Aurora Radios özel bir uygulamadır: ruh hâline, türe ya da ülkeye göre tek yerde gezin, çalan şarkıyı görün, favorileri kaydedin ve tarayıcı sekmesi olmadan tepsiden çalmaya devam edin.",
             "Yayın akışı, podcast ya da canlı sohbet istiyorsanız istasyonun kendi sitesini kullanın."),
            ("Müzik akış hizmetleri", "Spotify, Apple Music, YouTube Music ve benzerleri",
             "Devasa isteğe bağlı kataloglar, çalma listeleri ve sizin için hazırlanan öneriler.",
             "Aurora Radios canlı radyodur: dünyanın dört bir yanından istasyonlar, hesap ve reklam yok; beğendiğiniz bir şarkıyı isteğe bağlı dinlemek istediğinizde Spotify, Apple Music ya da YouTube Music'e devredebilir.",
             "Hangi şarkının çalacağını tam olarak siz seçmek istiyorsanız bir akış hizmeti seçin."),
        ],
        "foot": "16 Kasım 2026'da kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "by mood", "chip": ("Live radio", "No account, no ads, thousands of stations"),
        "stats": [(200, "+", "countries of stations"), (12, "", "moods, from Chill to Late Night"), (2, "", "themes"), (0, "", "ads or accounts")],
        "explorer_note": "Pick a feature and the real Aurora Radios interface shows it with live stations.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the app.",
        "compare_title": "How Aurora Radios compares", "compare_sub": 'TuneIn and Radio Garden are good ways to listen too. Here is where each one fits.',
    },
    "tr": {
        "emph": "ruh halinize göre", "chip": ("Canlı radyo", "Hesap yok, reklam yok, binlerce istasyon"),
        "stats": [(200, "+", "ülkeden istasyon"), (12, "", "ruh hâli, Chill'den Late Night'a"), (2, "", "tema"), (0, "", "reklam ya da hesap")],
        "explorer_note": "Bir özellik seçin, gerçek Aurora Radios arayüzü onu canlı istasyonlarla gösterir.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Uygulamadan ekranlar.",
        "compare_title": "Aurora Radios nasıl bir yerde duruyor", "compare_sub": 'TuneIn ve Radio Garden de dinlemenin iyi yolları. İşte her birinin uygun olduğu yer.',
    },
}

# Feature explorer scenes (the real Aurora Radios interface in the frame), in the order of APPS["aurora"]["en"]["features"].
SCENES = [
    [[0, {"clickText": "Mood"}], [1000, {"clickText": "Genre"}], [2100, {"clickText": "Jazz"}], [5200, {"clickText": "Mood"}]],
    [[0, {"clickText": "Mood"}], [500, {"type": {"sel": "input", "value": "jazz"}}]],
    [[0, {"clickText": "Mood"}], [600, {"clickText": "Chill"}]],
    [[0, {"clickText": "Songs"}]],
    [[0, {"clickText": "Favorites"}]],
    None,
    None,
    None,
]

# "How it works" scroll story: the feature-explorer scene shown for each of the three steps.
STORY = [2, 2, 4]

# Feature matrix for the comparison table. A tick = confirmed on the service's own page (checked 2026-11-16), a dash = the page does not mention it.
MATRIX = {
    "en": {
        "cols": [('Aurora Radios', 'This app'), ('TuneIn', 'tunein.com'), ('Radio Garden', 'radio.garden')],
        "rows": [('Live radio stations', [1, 1, 1]), ('Browse by mood', [1, 0, 0]), ('Browse by genre', [1, 1, 0]), ('Explore stations on a rotating globe', [0, 0, 1]), ('Podcasts and audiobooks', [0, 1, 0]), ('Live sports and news', [0, 1, 0]), ('Windows desktop app', [1, 0, 0]), ('No account and no ads', [1, 0, 0])],
        "legend": "A tick means we confirmed it on the service's own page. A dash means the page does not mention it, so it may exist. TuneIn lists apps for iOS and Android and says it is on hundreds of devices; Radio Garden's page only describes the globe.",
        "bars": 'Confirmed features',
        "checked": 'Checked on 16 November 2026.',
    },
    "tr": {
        "cols": [('Aurora Radios', 'Bu uygulama'), ('TuneIn', 'tunein.com'), ('Radio Garden', 'radio.garden')],
        "rows": [('Canlı radyo istasyonları', [1, 1, 1]), ('Ruh hâline göre gezinme', [1, 0, 0]), ('Türe göre gezinme', [1, 1, 0]), ('İstasyonları dönen bir küre üzerinde keşfetme', [0, 0, 1]), ("Podcast'ler ve sesli kitaplar", [0, 1, 0]), ('Canlı spor ve haber', [0, 1, 0]), ('Windows masaüstü uygulaması', [1, 0, 0]), ('Hesap ve reklam yok', [1, 0, 0])],
        "legend": "Onay işareti, hizmetin kendi sayfasında doğruladığımız anlamına gelir. Çizgi, sayfanın bunu anmadığı, yani var olabileceği anlamına gelir. TuneIn iOS ve Android uygulamalarını listeler ve yüzlerce cihazda olduğunu söyler; Radio Garden'ın sayfası yalnızca küreyi anlatır.",
        "bars": 'Doğrulanan özellikler',
        "checked": "16 Kasım 2026'da kontrol edildi.",
    },
}

DATA = {"en": EN, "tr": TR}
