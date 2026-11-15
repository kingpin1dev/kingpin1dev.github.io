"""Content for the Goliath (Discord bot) side pages and home extras (English and Turkish).

Facts: the bot's README and install notes (command list, music and log systems, intents, SQLite database) and the live Goliath page.
Goliath is free and replies in Turkish.
"""

CONTACT = "admin@kingpindev.com"

EN = {
    "faq": [
        ("Getting started", [
            ("What is Goliath?", "Goliath is a Discord bot that brings moderation, a level system, music and live radio, a browsable help panel and a set of everyday tools to your server. Everything is a slash command."),
            ("How do I add it to my server?", "Use the Add to Discord button. You need the Manage Server permission on the server. Discord shows the permissions the bot asks for before you confirm."),
            ("Is Goliath free?", "Yes."),
            ("Which language does it use?", "Goliath replies in Turkish."),
            ("Do I need to learn commands?", "No. Type / in any channel and Discord lists them with descriptions, or open /help for a dropdown that walks through every category."),
        ]),
        ("Moderation and server tools", [
            ("What can it moderate?", "Kick, ban and unban, timeout, warn (with a list and clear), clear messages, slow mode, lock and unlock a channel, and recreate a channel."),
            ("Can it manage roles?", "Yes. Give and take roles and look up role details."),
            ("Does it log what happens?", "Yes. You can set where logs go: deleted and edited messages, members joining and leaving, role and channel changes, moderation actions and voice activity."),
            ("What server information can I look up?", "Member count, server icon and banner, emojis, invites, bot info and detailed member statistics."),
        ]),
        ("Levels", [
            ("How do levels work?", "Members earn XP by chatting. /rank shows level and progress, /leaderboard ranks the server, and admins can set a level. Level-up notifications are posted automatically."),
        ]),
        ("Music and radio", [
            ("How does music work?", "Use /play with a YouTube or Spotify link or a search in a voice channel. There is a queue, pause, resume, skip, seek, jump, shuffle, remove, loop and volume, and YouTube playlists of up to 50 songs."),
            ("Does it leave the voice channel by itself?", "By default after 5 minutes of inactivity. Stay mode keeps it in the channel, and admins can change the timeout."),
            ("What about live radio?", "Open the radio panel to tune into live stations in a voice channel."),
        ]),
        ("Everyday tools", [
            ("What are the handy tools?", "Translate, calculate, weather, search Wikipedia, shorten links, set reminders and go AFK."),
        ]),
        ("Privacy and support", [
            ("What data does Goliath store?", "Only what its features need, such as level and XP counts, warnings, reminders, AFK status and server settings. See the privacy page."),
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your server name, the command you used and what happened."),
        ]),
    ],
    "changelog": [
        ("Current", "2026", "What Goliath does today", [
            "Moderation: kick, ban, timeout, warn, clear, slow mode, lock, unlock and more, with logs for messages, members, roles, channels, moderation and voice.",
            "Levels and XP with /rank and /leaderboard.",
            "Music with a queue, seek, jump, shuffle, loop, volume, YouTube playlists, stay mode and an inactivity timeout, plus a live radio panel.",
            "A help panel dropdown, role tools, server and member information, translate, weather, Wikipedia, link shortener, reminders and AFK.",
        ]),
    ],
    "press": {
        "oneliner": "Goliath is a Discord bot for moderation, levels, music and live radio, controlled entirely with slash commands.",
        "short": "Goliath keeps a Discord server in order: moderation with logs, a level system, music with a queue, live radio, a browsable help panel and everyday tools like translate, reminders and server info. Everything is a slash command, and it is free.",
        "long": "Goliath is a full-featured Discord bot with more than fifty slash commands. Moderation covers kick, ban, timeout, warnings, message clearing, slow mode and channel locking, with logs you route to a channel: deleted and edited messages, members joining and leaving, role and channel changes and voice activity. Members earn XP by chatting, with /rank and /leaderboard. Music plays from YouTube or Spotify links and searches with a queue, seek, shuffle, loop and volume, and a live radio panel tunes into stations in a voice channel. A help dropdown walks through every category, and handy tools add translation, weather, Wikipedia search, link shortening, reminders and AFK status. Goliath replies in Turkish and is free.",
        "facts": [
            ("Name", "Goliath"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Discord, as slash commands"),
            ("Language", "Replies in Turkish"),
            ("Price", "Free"),
            ("Commands", "More than 50"),
            ("Website", "goliath.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "The help panel"), ("shot-2", "Level and XP"), ("shot-3", "The server leaderboard"), ("shot-4", "Music queue")],
        "notes": ["Screenshots are from the live demo with made-up members and songs. Please do not alter the logo.", "Goliath is not affiliated with Discord. Please link to goliath.kingpindev.com or the bot's invite page when you write about it."],
    },
    "privacy": [
        ("Summary", ["Goliath does not sell your data or use it for advertising.", "It stores only what its features need, as described below.", "It has no website accounts and no analytics."]),
        ("What Goliath stores", ["To provide its features Goliath keeps a database with information such as Discord user and server (guild) IDs, level and XP and message counts for the level system, warnings and moderation records, reminders, AFK status and the settings admins choose (for example log channels).",
                                 "Goliath needs the Discord privileged intents for server members, message content and presence to count activity for levels, power moderation and logs and show statuses."]),
        ("Logs", ["If server admins set up logging, Goliath posts events (for example deleted or edited messages, members joining or leaving, role and channel changes, moderation actions and voice activity) to the channel they choose. That content then lives in your Discord server and is governed by your server's settings and Discord's terms."]),
        ("Music", ["When you play music, Goliath looks up and streams audio from YouTube, using the links or searches you give it, in the voice channel you are in."]),
        ("Third parties", ["Goliath runs on Discord and relies on Discord's services. Features such as translate, weather and Wikipedia search send your query to the matching public service to get an answer. We do not sell or share your data otherwise."]),
        ("Removing your data", ["Ask us at admin@kingpindev.com and we will remove the data Goliath holds about you or your server. Removing the bot from a server stops it from collecting new data there."]),
        ("Changes to this policy", ["If this policy changes, we will update this page and the date above."]),
    ],
    "compare": {
        "intro": "Discord has many bots, and some of them are very large. Here is an honest look at how Goliath fits, and where another kind of bot is the better pick.",
        "items": [
            ("Dedicated moderation bots", "Bots built mainly for moderation and auto-moderation",
             "Deep auto-moderation: filters, raid protection, detailed case systems and dashboards.",
             "Goliath is one bot for the everyday set: moderation commands and logs, levels, music, radio and handy tools, all with slash commands and nothing to configure on a website.",
             "Pick a dedicated moderation bot for a large server that needs automatic filters and raid protection."),
            ("Dedicated music bots", "Bots built mainly for music",
             "Polished, high-capacity music with many sources, effects and playlists.",
             "Goliath plays from YouTube and Spotify links and searches with a queue, seek, shuffle, loop and volume, plus a live radio panel, alongside its other features.",
             "Pick a dedicated music bot if music is the main thing your server does."),
        ],
        "foot": "Checked on 16 November 2026. Bots change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("Goliath nedir?", "Goliath; moderasyonu, seviye sistemini, müziği ve canlı radyoyu, göz atılabilir bir yardım panelini ve bir dizi günlük aracı sunucunuza getiren bir Discord botudur. Her şey bir slash komutudur."),
            ("Sunucuma nasıl eklerim?", "Discord'a ekle düğmesini kullanın. Sunucuda Sunucuyu Yönet yetkisine ihtiyacınız var. Discord, onaylamadan önce botun istediği izinleri gösterir."),
            ("Goliath ücretsiz mi?", "Evet."),
            ("Hangi dili kullanıyor?", "Goliath Türkçe yanıt verir."),
            ("Komutları öğrenmem gerekir mi?", "Hayır. Herhangi bir kanalda / yazın, Discord komutları açıklamalarıyla listeler; ya da her kategoriyi gezdiren bir açılır liste için /help açın."),
        ]),
        ("Moderasyon ve sunucu araçları", [
            ("Neleri denetleyebilir?", "Atma, yasaklama ve yasağı kaldırma, zaman aşımı, uyarı (liste ve temizleme ile), mesaj silme, yavaş mod, kanalı kilitleme ve açma, kanalı yeniden oluşturma."),
            ("Rolleri yönetebilir mi?", "Evet. Rol verin ve alın, rol ayrıntılarına bakın."),
            ("Olanları kaydediyor mu?", "Evet. Günlüklerin nereye gideceğini siz belirlersiniz: silinen ve düzenlenen mesajlar, üyelerin girişi ve çıkışı, rol ve kanal değişiklikleri, moderasyon eylemleri ve ses etkinliği."),
            ("Hangi sunucu bilgilerine bakabilirim?", "Üye sayısı, sunucu ikonu ve afişi, emojiler, davetler, bot bilgisi ve ayrıntılı üye istatistikleri."),
        ]),
        ("Seviyeler", [
            ("Seviyeler nasıl çalışır?", "Üyeler sohbet ederek XP kazanır. /rank seviyeyi ve ilerlemeyi gösterir, /leaderboard sunucuyu sıralar, yöneticiler seviye ayarlayabilir. Seviye atlama bildirimleri otomatik gönderilir."),
        ]),
        ("Müzik ve radyo", [
            ("Müzik nasıl çalışır?", "Bir ses kanalında /play ile YouTube ya da Spotify bağlantısı ya da arama kullanın. Kuyruk, duraklat, devam et, atla, sar, atla (sıraya), karıştır, kaldır, döngü ve ses vardır; 50 şarkıya kadar YouTube çalma listeleri desteklenir."),
            ("Ses kanalından kendiliğinden çıkar mı?", "Varsayılan olarak 5 dakika hareketsizlikten sonra. Kalma modu onu kanalda tutar ve yöneticiler zaman aşımını değiştirebilir."),
            ("Canlı radyo ne olacak?", "Bir ses kanalında canlı istasyonlara bağlanmak için radyo panelini açın."),
        ]),
        ("Günlük araçlar", [
            ("Pratik araçlar neler?", "Çeviri, hesaplama, hava durumu, Wikipedia araması, bağlantı kısaltma, hatırlatıcı kurma ve AFK olma."),
        ]),
        ("Gizlilik ve destek", [
            ("Goliath hangi verileri saklıyor?", "Yalnızca özelliklerinin ihtiyaç duyduğunu: seviye ve XP sayıları, uyarılar, hatırlatıcılar, AFK durumu ve sunucu ayarları. Gizlilik sayfasına bakın."),
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine sunucu adınızla, kullandığınız komutla ve ne olduğuyla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("Güncel", "2026", "Goliath bugün neler yapıyor", [
            "Moderasyon: atma, yasaklama, zaman aşımı, uyarı, temizleme, yavaş mod, kilitleme, kilit açma ve daha fazlası; mesajlar, üyeler, roller, kanallar, moderasyon ve ses için günlüklerle.",
            "/rank ve /leaderboard ile seviyeler ve XP.",
            "Kuyruk, sarma, atlama, karıştırma, döngü, ses, YouTube çalma listeleri, kalma modu ve hareketsizlik zaman aşımı ile müzik; ayrıca canlı radyo paneli.",
            "Yardım paneli açılır listesi, rol araçları, sunucu ve üye bilgisi, çeviri, hava durumu, Wikipedia, bağlantı kısaltıcı, hatırlatıcılar ve AFK.",
        ]),
    ],
    "press": {
        "oneliner": "Goliath; moderasyon, seviyeler, müzik ve canlı radyo için, tamamen slash komutlarıyla yönetilen bir Discord botudur.",
        "short": "Goliath bir Discord sunucusunu düzende tutar: günlüklü moderasyon, seviye sistemi, kuyruklu müzik, canlı radyo, göz atılabilir yardım paneli ve çeviri, hatırlatıcı ve sunucu bilgisi gibi günlük araçlar. Her şey bir slash komutudur ve ücretsizdir.",
        "long": "Goliath, elliden fazla slash komutlu, tam özellikli bir Discord botudur. Moderasyon; atma, yasaklama, zaman aşımı, uyarılar, mesaj temizleme, yavaş mod ve kanal kilitlemeyi kapsar; bir kanala yönlendirdiğiniz günlüklerle: silinen ve düzenlenen mesajlar, üyelerin girişi ve çıkışı, rol ve kanal değişiklikleri ve ses etkinliği. Üyeler sohbet ederek XP kazanır; /rank ve /leaderboard ile. Müzik, YouTube ya da Spotify bağlantılarından ve aramalardan kuyruk, sarma, karıştırma, döngü ve sesle çalar; canlı radyo paneli bir ses kanalında istasyonlara bağlanır. Bir yardım açılır listesi her kategoriyi gezdirir; pratik araçlar çeviri, hava durumu, Wikipedia araması, bağlantı kısaltma, hatırlatıcılar ve AFK durumu ekler. Goliath Türkçe yanıt verir ve ücretsizdir.",
        "facts": [
            ("Ad", "Goliath"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Discord, slash komutlarıyla"),
            ("Dil", "Türkçe yanıt verir"),
            ("Fiyat", "Ücretsiz"),
            ("Komutlar", "50'den fazla"),
            ("Web sitesi", "goliath.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Yardım paneli"), ("shot-2", "Seviye ve XP"), ("shot-3", "Sunucu sıralaması"), ("shot-4", "Müzik kuyruğu")],
        "notes": ["Ekran görüntüleri, uydurma üyeler ve şarkılarla canlı demodandır. Lütfen logoyu değiştirmeyin.", "Goliath, Discord ile bağlantılı değildir. Hakkında yazarken lütfen goliath.kingpindev.com adresine ya da botun davet sayfasına bağlantı verin."],
    },
    "privacy": [
        ("Özet", ["Goliath verilerinizi satmaz ve reklam için kullanmaz.", "Yalnızca aşağıda açıklandığı gibi özelliklerinin ihtiyaç duyduğunu saklar.", "Web sitesi hesabı ve analiz yoktur."]),
        ("Goliath ne saklar", ["Özelliklerini sunmak için Goliath; Discord kullanıcı ve sunucu (guild) kimlikleri, seviye sistemi için seviye, XP ve mesaj sayıları, uyarılar ve moderasyon kayıtları, hatırlatıcılar, AFK durumu ve yöneticilerin seçtiği ayarlar (örneğin günlük kanalları) gibi bilgileri tutan bir veritabanı tutar.",
                              "Goliath, seviyeler için etkinliği saymak, moderasyonu ve günlükleri çalıştırmak ve durumları göstermek için Discord'un üyeler, mesaj içeriği ve varlık ayrıcalıklı niyetlerine ihtiyaç duyar."]),
        ("Günlükler", ["Sunucu yöneticileri günlük tutmayı kurarsa Goliath olayları (örneğin silinen ya da düzenlenen mesajlar, üyelerin girişi ya da çıkışı, rol ve kanal değişiklikleri, moderasyon eylemleri ve ses etkinliği) seçtikleri kanala gönderir. O içerik artık Discord sunucunuzda yaşar ve sunucunuzun ayarlarına ve Discord'un şartlarına tabidir."]),
        ("Müzik", ["Müzik çaldığınızda Goliath, verdiğiniz bağlantı ya da aramaları kullanarak içinde bulunduğunuz ses kanalında YouTube'dan sesi bulur ve yayınlar."]),
        ("Üçüncü taraflar", ["Goliath Discord üzerinde çalışır ve Discord'un hizmetlerine dayanır. Çeviri, hava durumu ve Wikipedia araması gibi özellikler yanıt almak için sorgunuzu ilgili herkese açık hizmete gönderir. Verilerinizi başka şekilde satmaz ya da paylaşmayız."]),
        ("Verilerinizi kaldırma", ["admin@kingpindev.com adresinden bize ulaşın; Goliath'ın sizin ya da sunucunuz hakkında tuttuğu verileri kaldırırız. Botu bir sunucudan çıkarmak, orada yeni veri toplamasını durdurur."]),
        ("Bu politikadaki değişiklikler", ["Bu politika değişirse bu sayfayı ve yukarıdaki tarihi güncelleriz."]),
    ],
    "compare": {
        "intro": "Discord'da birçok bot var ve bazıları çok büyük. İşte Goliath'ın nerede durduğuna ve başka türden bir botun daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("Özel moderasyon botları", "Esas olarak moderasyon ve otomatik moderasyon için yapılmış botlar",
             "Derin otomatik moderasyon: filtreler, baskın koruması, ayrıntılı vaka sistemleri ve paneller.",
             "Goliath günlük set için tek bottur: moderasyon komutları ve günlükler, seviyeler, müzik, radyo ve pratik araçlar; hepsi slash komutlarıyla ve bir web sitesinde yapılandırılacak bir şey olmadan.",
             "Otomatik filtreler ve baskın koruması gereken büyük bir sunucu için özel bir moderasyon botu seçin."),
            ("Özel müzik botları", "Esas olarak müzik için yapılmış botlar",
             "Birçok kaynak, efekt ve çalma listesiyle cilalı, yüksek kapasiteli müzik.",
             "Goliath, diğer özelliklerinin yanında YouTube ve Spotify bağlantılarından ve aramalardan kuyruk, sarma, karıştırma, döngü ve sesle çalar; ayrıca canlı radyo paneli vardır.",
             "Sunucunuzun asıl işi müzikse özel bir müzik botu seçin."),
        ],
        "foot": "16 Kasım 2026'da kontrol edildi. Botlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "in order", "chip": ("Slash commands", "Free, and nothing to configure on a website"),
        "stats": [(50, "+", "slash commands"), (6, "", "kinds of logs"), (50, "", "songs per YouTube playlist"), (0, "", "cost")],
        "explorer_note": "Pick a feature and the live Discord channel runs it. Members and songs are made up, and the bot replies in Turkish.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the demo.",
        "compare_title": "How Goliath compares", "compare_sub": "Dedicated moderation and music bots are both good. Here is where each one fits.",
    },
    "tr": {
        "emph": "düzende", "chip": ("Slash komutları", "Ücretsiz; bir web sitesinde yapılandırılacak bir şey yok"),
        "stats": [(50, "+", "slash komutu"), (6, "", "günlük türü"), (50, "", "YouTube çalma listesi başına şarkı"), (0, "", "maliyet")],
        "explorer_note": "Bir özellik seçin, canlı Discord kanalı onu çalıştırır. Üyeler ve şarkılar uydurmadır; bot Türkçe yanıt verir.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Demodan ekranlar.",
        "compare_title": "Goliath nasıl bir yerde duruyor", "compare_sub": "Özel moderasyon ve müzik botları ikisi de iyi. İşte her birinin uygun olduğu yer.",
    },
}

# Feature explorer scenes (GoliathDemo.apply: types a command and sends it), in the order of APPS["goliath"]["en"]["features"].
SCENES = [
    [[0, {"clear": 1}], [500, {"send": "/ban @spammer42 Spam"}]],
    [[0, {"clear": 1}], [500, {"send": "/rank"}]],
    [[0, {"clear": 1}], [500, {"send": "/play Midnight Drive"}], [3600, {"send": "/queue"}]],
    None,
    [[0, {"clear": 1}], [500, {"send": "/help"}]],
    None,
    None,
    [[0, {"clear": 1}], [500, {"send": "/leaderboard"}]],
]

DATA = {"en": EN, "tr": TR}
