"""Content for the Mixora side pages (FAQ, changelog, press kit, privacy, compare), English and Turkish.

Facts come from the app's own notes (HANDOFF.md, whats-new-1.1.1.json, the source tree) and from the live Mixora page.
Competitor notes are limited to what their own public documentation says (checked 2026-11-15).
"""

CONTACT = "mixora@kingpindev.com"
UPDATED = "2026-11-15"

EN = {
    "faq": [
        ("Getting started", [
            ("What is Mixora?", "Mixora is a volume mixer for Windows that puts your apps into groups (Game, Chat, Media and Aux, plus your own) so you control volume, mute, equalizer and more for a whole group at once, instead of one app at a time."),
            ("Which versions of Windows does it support?", "Windows 10 (version 1809 or later) and Windows 11."),
            ("Where do I get it?", "From the Microsoft Store. Updates arrive automatically through the Store."),
            ("Do I need virtual audio devices or extra drivers?", "No. Mixora works with Windows' own per-app audio. Per-group output devices use the devices you already have."),
            ("Was Mixora called something else?", "Yes. It used to be called Groupy. It is the same app, now with an equalizer, auto-lowering and more."),
            ("Which languages does it speak?", "English, Türkçe, Deutsch, Français, Español and Português (Brasil). You can switch language inside the app without restarting."),
        ]),
        ("Groups and apps", [
            ("How do I put an app in a group?", "Apps that play sound show up in the detected apps list as you start them. Drag one onto a group, or click it and pick a group from the menu."),
            ("What about apps I open later?", "A group's volume and mute apply to every app assigned to it, including ones that start after you set the level. Mixora can also recognise many well-known apps and game folders and suggest a group for them."),
            ("Can I make my own groups?", "Yes. Besides Game, Chat, Media and Aux you can add custom groups (up to eight in total), and choose their name, colour and icon."),
            ("What happens to apps I close?", "Closed apps move to an Inactive apps drawer under their group and come back to the group when they start again."),
            ("Can I ignore an app?", "Yes. Apps you ignore are left out of the groups and the suggestions."),
        ]),
        ("Sound", [
            ("Does each group have its own equalizer?", "Yes. Every group has a 10-band equalizer you can drag, plus bass, voice and treble sliders and a preamp. There are more than 350 ready profiles, favourites and your own saved presets, and you can import Equalizer APO files."),
            ("What is the automatic profile?", "Turn it on for the Game group and the equalizer follows the game you are playing, then goes back when you quit."),
            ("What are the compressor, surround and noise reduction?", "A compressor keeps loud peaks under control for any group. Virtual surround for headphones has a mode and a distance control. Noise reduction for the Chat group cleans up incoming voice chat."),
            ("What is ChatMix?", "One slider that trades game volume for chat volume. Each group sits on the game side or the chat side, and moving the slider fades one side as the other gets louder."),
            ("How does auto-lowering work?", "When a friend speaks in Discord, the groups you choose are turned down and then come back smoothly. You pick the trigger group, how much to lower and how sensitive it is."),
            ("Can games and chat use different speakers or headphones?", "Yes. Route each group to its own output device, for example game audio to a headset and chat to speakers."),
            ("Do the volume sliders sound even?", "Yes. Since 1.1.1 the sliders follow how ears hear loudness, so each step sounds even, and 0% is truly silent."),
        ]),
        ("Hotkeys and the tray", [
            ("Do the hotkeys work while I'm in a game?", "Yes, they are global hotkeys. F13 to F24 work on their own; other keys need Ctrl, Alt or Shift."),
            ("What do the hotkeys control?", "Group volume, mute, ChatMix, the microphone and profiles. A small pop-up shows the new level and you can drag its slider."),
            ("Does Mixora run in the background?", "Yes, in the system tray, and optionally at startup. The tray panel has a light, dark or system theme."),
        ]),
        ("Privacy and support", [
            ("Does Mixora collect my data?", "No. There are no accounts, analytics or ads, and the app has no network code of its own beyond opening links in your browser. See the privacy page for details."),
            ("How do I get help or report a problem?", "Write to mixora@kingpindev.com. Tell us your Windows version, your Mixora version (Settings, About) and what you were doing."),
            ("How much does it cost?", "Mixora is a paid app on the Microsoft Store. The Store page always shows the current price."),
        ]),
    ],
    "changelog": [
        ("1.1.1", "November 2026", "Sound shaping for every group", [
            "Equalizer for each group: 10 bands, a library of 350+ ready profiles, favourites and your own saved presets. Import Equalizer APO files too.",
            "Auto profile: turn it on in Game and the equalizer follows the game you are playing, then goes back when you quit.",
            "Compressor for every group and noise reduction for Chat, to tame loud explosions and background hiss.",
            "Virtual surround for headphones, with a mode and a distance control, and left/right balance.",
            "Closed apps move to an Inactive apps drawer under each group and come back when they start.",
            "Tray panel with a light, dark or system theme, and sharper tray icons.",
            "Volume sliders now follow your ear: every step sounds even, and 0% is truly silent.",
            "New About page with the website and support address.",
            "Fixes: Discord follows its group's output device, and the tray panel opens next to the taskbar wherever it is.",
        ]),
        ("1.1.0", "October 2026", "Mixora recognises your apps", [
            "Automatic recognition: a built-in list of about 225 well-known apps, game folder detection and a suggested group for apps it does not know.",
            "Ignored apps: leave apps you never want to control out of the groups.",
            "The suggested group is shown in the app's menu.",
        ]),
        ("1.0.1", "October 2026", "First Store release", [
            "Game, Chat, Media and Aux groups plus custom groups (up to eight), with a colour and icon for each.",
            "Volume and mute per group, and a trim and mute for each app.",
            "A separate output device for each group, with no virtual devices.",
            "ChatMix, auto-lowering, profiles and global hotkeys with an on-screen overlay.",
            "Tray panel and six interface languages: English, Türkçe, Deutsch, Français, Español, Português (Brasil).",
        ]),
    ],
    "press": {
        "oneliner": "Mixora is a Windows volume mixer that controls your apps by groups, with an equalizer for each group.",
        "short": "Mixora puts your Windows apps into Game, Chat, Media and Aux groups. Control volume, mute and an equalizer for a whole group at once, lower the game when a friend speaks, balance game and chat with ChatMix, and send each group to its own output device, with no virtual drivers.",
        "long": "Mixora is a volume mixer and equalizer for Windows 10 and 11. Instead of hunting through the Windows mixer one app at a time, you assign running apps to Game, Chat, Media and Aux groups (or groups of your own) and control each group together: volume, mute, a drag-able 10-band equalizer with more than 350 ready profiles, a compressor, virtual surround and noise reduction for voice chat. Auto-lowering turns the game down while a friend speaks in Discord, ChatMix balances game and chat from one slider, and each group can use its own output device without any virtual device or driver. Global hotkeys and a small tray panel keep everything within reach, even in a full-screen game. Mixora speaks English, Türkçe, Deutsch, Français, Español and Português (Brasil), has no account, ads or analytics, and is available on the Microsoft Store.",
        "facts": [
            ("Name", "Mixora (formerly Groupy)"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) and Windows 11"),
            ("Category", "Utilities, audio"),
            ("Languages", "English, Türkçe, Deutsch, Français, Español, Português (Brasil)"),
            ("Price", "Paid app on the Microsoft Store"),
            ("Website", "mixora.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("01-groups", "Groups: your apps, one mix"), ("02-chatmix", "ChatMix"), ("03-tray", "Tray panel"), ("04-outputs", "Output devices per group"),
                  ("05-ducking", "Auto-lowering"), ("06-profiles", "Profiles"), ("07-shortcuts", "Shortcuts and overlay")],
        "notes": ["Screenshots show example apps and settings. Please do not alter the logo.", "When you write about Mixora, please link to its Microsoft Store page or to mixora.kingpindev.com."],
    },
    "privacy": [
        ("Summary", ["Mixora does not collect, sell or share your personal data.", "Mixora does not use analytics, telemetry, advertising or tracking.", "Mixora does not require an account.", "Everything the app needs stays on your device."]),
        ("What Mixora reads on your PC", ["To mix your apps, Mixora reads which apps are playing sound and their volume levels through the audio features built into Windows, and changes their volume, mute and output device when you ask it to.",
                                          "The equalizer, compressor, surround and noise reduction process sound on your PC. Mixora does not send audio anywhere."]),
        ("What Mixora stores on your device", ["Your settings, groups, app assignments, profiles, equalizer presets and shortcuts, in your Windows user profile. Uninstalling Mixora removes them."]),
        ("Network use", ["Mixora has no network code of its own. It does not contact our servers.", "If you obtained Mixora from the Microsoft Store, purchases, licensing, ratings and updates are handled by Microsoft through the services built into Windows.",
                         "Mixora contains links (for example to this website or to send an email). Opening a link uses your default browser or email app, and the site you visit has its own privacy policy."]),
        ("Children", ["Mixora does not knowingly collect information from anyone, including children under 13."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "Windows already has a volume mixer, and there are good tools for audio. Here is an honest look at how Mixora fits next to the ones people ask about most. We checked each tool's own public documentation, and we point out where another tool is the better pick.",
        "items": [
            ("Windows Volume Mixer", "Built in to Windows",
             "Nothing to install, and a slider for every app that is playing sound.",
             "Mixora puts apps into groups, so one slider or hotkey changes a whole group, and adds a per-group equalizer, auto-lowering, ChatMix and a separate output device for each group.",
             "Stay with the built-in mixer if you only adjust one app now and then."),
            ("EarTrumpet", "Free and open source, from the Microsoft Store",
             "A light taskbar flyout with per-app volume, the ability to move apps between playback devices, and hotkeys.",
             "Mixora overlaps on per-app output devices, and adds groups, a per-group equalizer, compressor, surround, noise reduction for chat, auto-lowering and ChatMix. We did not find an equalizer in EarTrumpet's feature list.",
             "Pick EarTrumpet if you want a small, free flyout and nothing more."),
            ("Voicemeeter", "From VB-Audio",
             "A virtual audio mixer with its own virtual audio devices, flexible routing and many inputs and outputs, popular with streamers.",
             "Mixora does not use virtual devices or drivers. It focuses on grouping the apps you already have and shaping each group, with a simpler setup.",
             "Pick Voicemeeter if you need free-form routing, virtual inputs and outputs, or to feed audio into other software."),
        ],
        "foot": "Checked on 15 November 2026 from each tool's public documentation. Tools change; if something here is out of date, tell us at mixora@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("Mixora nedir?", "Mixora, uygulamalarınızı gruplara (Oyun, Sohbet, Medya, Aux ve kendi gruplarınız) ayıran bir Windows ses mikseridir. Uygulamaları tek tek değil, bir grubu birden yönetirsiniz: ses, sessize alma, ekolayzır ve daha fazlası."),
            ("Hangi Windows sürümlerini destekliyor?", "Windows 10 (1809 ve sonrası) ve Windows 11."),
            ("Nereden edinebilirim?", "Microsoft Store'dan. Güncellemeler Store üzerinden otomatik gelir."),
            ("Sanal ses cihazı ya da ek sürücü gerekir mi?", "Hayır. Mixora, Windows'un kendi uygulama başına ses özelliğiyle çalışır. Grup başına çıkış cihazı, zaten sahip olduğunuz cihazları kullanır."),
            ("Mixora'nın eski bir adı var mıydı?", "Evet, eskiden Groupy adını taşıyordu. Aynı uygulama; şimdi ekolayzır, otomatik kısma ve daha fazlasıyla."),
            ("Hangi dillerde?", "English, Türkçe, Deutsch, Français, Español ve Português (Brasil). Dili uygulamanın içinden, yeniden başlatmadan değiştirebilirsiniz."),
        ]),
        ("Gruplar ve uygulamalar", [
            ("Bir uygulamayı gruba nasıl atarım?", "Ses çıkaran uygulamalar başlattıkça algılanan uygulamalar listesinde görünür. Birini bir gruba sürükleyin ya da tıklayıp menüden grubu seçin."),
            ("Sonradan açtığım uygulamalar ne olur?", "Bir grubun sesi ve sessize alması, ona atanmış her uygulamaya uygulanır; ses ayarladıktan sonra açılanlara da. Mixora ayrıca birçok tanınmış uygulamayı ve oyun klasörünü tanıyıp onlar için bir grup önerebilir."),
            ("Kendi gruplarımı oluşturabilir miyim?", "Evet. Oyun, Sohbet, Medya ve Aux'a ek olarak özel gruplar ekleyebilir (toplam en fazla sekiz), adını, rengini ve ikonunu seçebilirsiniz."),
            ("Kapattığım uygulamalar ne olur?", "Kapanan uygulamalar grubunun altındaki Etkin olmayanlar bölümüne geçer, tekrar açılınca gruba döner."),
            ("Bir uygulamayı yok sayabilir miyim?", "Evet. Yok saydığınız uygulamalar gruplardan ve önerilerden çıkarılır."),
        ]),
        ("Ses", [
            ("Her grubun kendi ekolayzırı var mı?", "Evet. Her grupta sürükleyebileceğiniz 10 bantlı bir ekolayzır, bas, ses ve tiz kaydırıcıları ve ön yükseltici vardır. 350'den fazla hazır profil, favoriler ve kendi kaydettiğiniz ayarlar bulunur; Equalizer APO dosyalarını da içe aktarabilirsiniz."),
            ("Otomatik profil nedir?", "Oyun grubunda açtığınızda ekolayzır oynadığınız oyuna göre değişir, oyundan çıkınca eski hâline döner."),
            ("Kompresör, surround ve gürültü azaltma ne işe yarar?", "Kompresör, herhangi bir grupta yüksek tepeleri dizginler. Kulaklık için sanal surround'un bir modu ve mesafe ayarı vardır. Sohbet grubundaki gürültü azaltma, gelen sesli sohbeti temizler."),
            ("ChatMix nedir?", "Oyun sesi ile sohbet sesini birbirine karşı değiştiren tek bir kaydırıcıdır. Her grup oyun ya da sohbet tarafında durur; kaydırıcıyı oynatınca bir taraf kısılırken diğeri yükselir."),
            ("Otomatik kısma nasıl çalışır?", "Discord'da bir arkadaşınız konuşunca seçtiğiniz gruplar kısılır, sonra yumuşakça geri gelir. Tetikleyici grubu, ne kadar kısılacağını ve duyarlılığı siz seçersiniz."),
            ("Oyun ve sohbet farklı hoparlör ya da kulaklık kullanabilir mi?", "Evet. Her grubu kendi çıkış cihazına yönlendirin; örneğin oyun sesi kulaklığa, sohbet hoparlöre."),
            ("Ses kaydırıcıları eşit mi duyuluyor?", "Evet. 1.1.1'den beri kaydırıcılar kulağın sesi algılayışına göre çalışır; her adım eşit duyulur ve %0 tamamen sessizdir."),
        ]),
        ("Kısayollar ve tepsi", [
            ("Oyundayken kısayollar çalışır mı?", "Evet, genel kısayollardır. F13-F24 tek başına çalışır; diğer tuşlar Ctrl, Alt ya da Shift ister."),
            ("Kısayollar neyi yönetir?", "Grup sesi, sessize alma, ChatMix, mikrofon ve profiller. Küçük bir açılır pencere yeni seviyeyi gösterir ve kaydırıcısını sürükleyebilirsiniz."),
            ("Mixora arka planda çalışır mı?", "Evet, sistem tepsisinde; isterseniz Windows ile birlikte açılır. Tepsi paneli açık, koyu ya da sistem temasını kullanır."),
        ]),
        ("Gizlilik ve destek", [
            ("Mixora verilerimi topluyor mu?", "Hayır. Hesap, analiz ya da reklam yoktur; uygulamanın bağlantıları tarayıcınızda açmak dışında kendi ağ kodu da yoktur. Ayrıntılar için gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "mixora@kingpindev.com adresine yazın. Windows sürümünüzü, Mixora sürümünüzü (Ayarlar, Hakkında) ve ne yaptığınızı belirtin."),
            ("Ne kadar?", "Mixora, Microsoft Store'da ücretli bir uygulamadır. Güncel fiyat her zaman Store sayfasında görünür."),
        ]),
    ],
    "changelog": [
        ("1.1.1", "Kasım 2026", "Her gruba ses şekillendirme", [
            "Her gruba ekolayzır: 10 bant, 350'den fazla hazır profil, favoriler ve kendi kaydettiğiniz ayarlar. Equalizer APO dosyalarını da içe aktarabilirsiniz.",
            "Otomatik profil: Oyun grubunda açınca ekolayzır oynadığınız oyuna göre değişir, oyundan çıkınca eski hâline döner.",
            "Her gruba kompresör, Sohbet'e gürültü azaltma: yüksek patlamaları ve arka plan cızırtısını bastırır.",
            "Kulaklık için sanal surround (mod ve mesafe ayarıyla) ve sol/sağ denge.",
            "Kapalı uygulamalar her grubun altındaki Etkin olmayanlar bölümüne geçer, açılınca geri gelir.",
            "Tepsi paneline açık, koyu ya da sistem teması; daha net tepsi simgeleri.",
            "Ses kaydırıcıları artık kulağa göre çalışıyor: her adım eşit duyulur, %0 tamamen sessizdir.",
            "Web sitesi ve destek adresiyle yeni Hakkında sayfası.",
            "Düzeltmeler: Discord grubunun çıkış cihazını izliyor, tepsi paneli görev çubuğu nerede olursa olsun yanında açılıyor.",
        ]),
        ("1.1.0", "Ekim 2026", "Mixora uygulamalarınızı tanıyor", [
            "Otomatik tanıma: yaklaşık 225 tanınmış uygulamanın yerleşik listesi, oyun klasörü tespiti ve tanımadığı uygulamalar için önerilen grup.",
            "Yok sayılanlar: hiç yönetmek istemediğiniz uygulamaları gruplardan çıkarın.",
            "Önerilen grup uygulamanın menüsünde gösterilir.",
        ]),
        ("1.0.1", "Ekim 2026", "İlk Store sürümü", [
            "Oyun, Sohbet, Medya ve Aux grupları ile özel gruplar (en fazla sekiz); her birine renk ve ikon.",
            "Grup başına ses ve sessize alma, her uygulama için de kırpma ve sessize alma.",
            "Her gruba ayrı çıkış cihazı, sanal cihaz olmadan.",
            "ChatMix, otomatik kısma, profiller ve ekranda gösterge ile genel kısayollar.",
            "Tepsi paneli ve altı arayüz dili: English, Türkçe, Deutsch, Français, Español, Português (Brasil).",
        ]),
    ],
    "press": {
        "oneliner": "Mixora, uygulamalarınızı gruplarla yöneten ve her gruba ekolayzır veren bir Windows ses mikseridir.",
        "short": "Mixora, Windows uygulamalarınızı Oyun, Sohbet, Medya ve Aux gruplarına ayırır. Bir grubun sesini, sessize almasını ve ekolayzırını birden yönetin, arkadaşınız konuşunca oyunu kısın, ChatMix ile oyun ve sohbeti dengeleyin ve her grubu kendi çıkış cihazına gönderin; sanal sürücü gerekmez.",
        "long": "Mixora, Windows 10 ve 11 için bir ses mikseri ve ekolayzırdır. Windows mikserinde uygulamaları tek tek aramak yerine çalışan uygulamaları Oyun, Sohbet, Medya ve Aux gruplarına (ya da kendi gruplarınıza) atar, her grubu birlikte yönetirsiniz: ses, sessize alma, 350'den fazla hazır profili olan sürüklenebilir 10 bantlı ekolayzır, kompresör, sanal surround ve sesli sohbet için gürültü azaltma. Otomatik kısma, Discord'da bir arkadaşınız konuşurken oyunu kısar; ChatMix oyun ve sohbeti tek kaydırıcıyla dengeler; her grup, sanal cihaz ya da sürücü olmadan kendi çıkış cihazını kullanabilir. Genel kısayollar ve küçük bir tepsi paneli, tam ekran bir oyunda bile her şeyi elinizin altında tutar. Mixora English, Türkçe, Deutsch, Français, Español ve Português (Brasil) dillerinde çalışır; hesap, reklam ve analiz yoktur; Microsoft Store'da bulunur.",
        "facts": [
            ("Ad", "Mixora (eski adı Groupy)"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Windows 10 (1809+) ve Windows 11"),
            ("Kategori", "Yardımcı programlar, ses"),
            ("Diller", "English, Türkçe, Deutsch, Français, Español, Português (Brasil)"),
            ("Fiyat", "Microsoft Store'da ücretli uygulama"),
            ("Web sitesi", "mixora.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("01-groups", "Gruplar: uygulamalarınız, tek karışım"), ("02-chatmix", "ChatMix"), ("03-tray", "Tepsi paneli"), ("04-outputs", "Grup başına çıkış cihazı"),
                  ("05-ducking", "Otomatik kısma"), ("06-profiles", "Profiller"), ("07-shortcuts", "Kısayollar ve gösterge")],
        "notes": ["Ekran görüntüleri örnek uygulamaları ve ayarları gösterir. Lütfen logoyu değiştirmeyin.", "Mixora hakkında yazarken lütfen Microsoft Store sayfasına ya da mixora.kingpindev.com adresine bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["Mixora kişisel verilerinizi toplamaz, satmaz ve paylaşmaz.", "Mixora analiz, telemetri, reklam ya da takip kullanmaz.", "Mixora hesap gerektirmez.", "Uygulamanın ihtiyaç duyduğu her şey cihazınızda kalır."]),
        ("Mixora bilgisayarınızda ne okur", ["Uygulamalarınızı karıştırmak için Mixora, Windows'a yerleşik ses özellikleriyle hangi uygulamaların ses çaldığını ve ses seviyelerini okur; siz istediğinizde bunların sesini, sessize alma durumunu ve çıkış cihazını değiştirir.",
                                            "Ekolayzır, kompresör, surround ve gürültü azaltma sesi bilgisayarınızda işler. Mixora sesi hiçbir yere göndermez."]),
        ("Mixora cihazınızda ne saklar", ["Ayarlarınızı, gruplarınızı, uygulama atamalarınızı, profillerinizi, ekolayzır ayarlarınızı ve kısayollarınızı Windows kullanıcı profilinizde saklar. Mixora'yı kaldırmak bunları siler."]),
        ("Ağ kullanımı", ["Mixora'nın kendi ağ kodu yoktur. Sunucularımızla iletişim kurmaz.", "Mixora'yı Microsoft Store'dan edindiyseniz satın alma, lisans, derecelendirme ve güncellemeleri Microsoft, Windows'a yerleşik hizmetler üzerinden yürütür.",
                         "Mixora bağlantılar içerir (örneğin bu web sitesine ya da e-posta göndermeye). Bir bağlantıyı açmak varsayılan tarayıcınızı ya da e-posta uygulamanızı kullanır; gittiğiniz sitenin kendi gizlilik politikası geçerlidir."]),
        ("Çocuklar", ["Mixora, 13 yaşın altındaki çocuklar dâhil hiç kimseden bilerek bilgi toplamaz."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Windows'un zaten bir ses mikseri var ve iyi ses araçları da mevcut. İşte Mixora'nın en çok sorulan araçların yanında nerede durduğuna dürüst bir bakış. Her aracın kendi herkese açık belgelerine baktık ve başka bir aracın daha iyi seçim olduğu yerleri de belirttik.",
        "items": [
            ("Windows Ses Mikseri", "Windows'ta yerleşik",
             "Kurulum gerekmez; ses çalan her uygulama için bir kaydırıcı sunar.",
             "Mixora uygulamaları gruplara ayırır; tek bir kaydırıcı ya da kısayol bütün grubu değiştirir. Ayrıca grup başına ekolayzır, otomatik kısma, ChatMix ve her gruba ayrı çıkış cihazı ekler.",
             "Yalnızca arada bir tek bir uygulamanın sesini ayarlıyorsanız yerleşik mikserde kalın."),
            ("EarTrumpet", "Ücretsiz ve açık kaynak, Microsoft Store'da",
             "Uygulama başına ses, uygulamaları çalma cihazları arasında taşıma ve kısayollar sunan hafif bir görev çubuğu paneli.",
             "Mixora uygulama başına çıkış cihazında örtüşür; üstüne gruplar, grup başına ekolayzır, kompresör, surround, sohbet için gürültü azaltma, otomatik kısma ve ChatMix ekler. EarTrumpet'in özellik listesinde ekolayzır bulamadık.",
             "Küçük, ücretsiz bir panelden fazlasını istemiyorsanız EarTrumpet'i seçin."),
            ("Voicemeeter", "VB-Audio'dan",
             "Kendi sanal ses cihazları, esnek yönlendirme ve çok sayıda giriş-çıkış sunan, yayıncılar arasında popüler sanal bir ses mikseri.",
             "Mixora sanal cihaz ya da sürücü kullanmaz. Elinizdeki uygulamaları gruplamaya ve her grubu şekillendirmeye odaklanır; kurulumu daha basittir.",
             "Serbest yönlendirme, sanal giriş-çıkış ya da sesi başka yazılımlara beslemek gerekiyorsa Voicemeeter'ı seçin."),
        ],
        "foot": "15 Kasım 2026'da her aracın herkese açık belgelerinden kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz mixora@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "groups", "chip": ("1.1.1", "Equalizer, compressor and noise reduction for every group"),
        "stats": [(350, "+", "ready equalizer profiles"), (10, "", "equalizer bands in every group"), (6, "", "interface languages"), (0, "", "virtual drivers needed")],
        "explorer_note": "Pick a feature and the live Mixora shows it. It works like the real app: drag, click and type.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the Microsoft Store listing.",
        "compare_title": "How Mixora compares", "compare_sub": "Windows' own mixer, EarTrumpet and Voicemeeter are all good. Here is where each one fits.",
    },
    "tr": {
        "emph": "gruplarla", "chip": ("1.1.1", "Her gruba ekolayzır, kompresör ve gürültü azaltma"),
        "stats": [(350, "+", "hazır ekolayzır profili"), (10, "", "her gruptaki ekolayzır bandı"), (6, "", "arayüz dili"), (0, "", "gereken sanal sürücü")],
        "explorer_note": "Bir özellik seçin, canlı Mixora onu gösterir. Gerçek uygulama gibi çalışır: sürükleyin, tıklayın, deneyin.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Microsoft Store sayfasından ekranlar.",
        "compare_title": "Mixora nasıl bir yerde duruyor", "compare_sub": "Windows'un kendi mikseri, EarTrumpet ve Voicemeeter'ın hepsi iyi. İşte her birinin uygun olduğu yer.",
    },
}

# Scenes for the feature explorer on the home page: one per feature tab, in the order of APPS[slug]["en"]["features"].
# Each scene is a list of [delay ms, state] steps applied to the live demo (see MixoraDemo.apply).
SCENES = [
    [[0, {"reset": 1, "view": "main"}]],
    [[0, {"reset": 1, "view": "main"}], [900, {"assign": [["nvidia", "chat"], ["wallpaper", "aux"]]}]],
    [[0, {"reset": 1, "view": "eq", "eqTab": "game"}]],
    [[0, {"reset": 1, "view": "eq", "eqTab": "chat"}]],
    [[0, {"reset": 1, "view": "settings", "page": "audio"}]],
    [[0, {"reset": 1, "view": "main"}], [800, {"mix": 0.5}], [2200, {"mix": -0.45}], [3600, {"mix": -0.1}]],
    [[0, {"reset": 1, "view": "main"}], [800, {"out": {"chat": "spk"}}]],
    [[0, {"reset": 1, "view": "settings", "page": "shortcuts"}], [700, {"osd": "game", "osdMs": 3500}]],
]

DATA = {"en": EN, "tr": TR}
