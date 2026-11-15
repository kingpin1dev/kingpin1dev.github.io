"""Content for the Lolable (Discord bot) side pages and home extras (English and Turkish).

Facts: the bot's README (commands, data behaviour, deletion commands, Riot API use), the published privacy policy and terms of service on kingpindev.com,
and the live Lolable page. Lolable is not endorsed by Riot Games and replies in Turkish.
"""

CONTACT = "admin@kingpindev.com"
PRIVACY_URL = "https://kingpindev.com/lolable-privacy-policy"
TERMS_URL = "https://kingpindev.com/lolable-terms-of-service"

EN = {
    "faq": [
        ("Getting started", [
            ("What is Lolable?", "Lolable is a Discord bot for League of Legends communities. It shows rank and LP, form and KDA, champion mastery, your last match, live game scouting, comparisons and a server leaderboard, all as slash commands."),
            ("How do I add it to my server?", "Use the Add to Discord button. You need the Manage Server permission on the server. Discord shows the permissions the bot asks for before you confirm."),
            ("Which language does it use?", "Lolable replies in Turkish."),
            ("Is it affiliated with Riot Games?", "No. Lolable is not endorsed or supported by Riot Games. League of Legends and Riot Games are trademarks of Riot Games, Inc."),
        ]),
        ("Linking and profiles", [
            ("Do I need to link my account?", "Linking is needed for /me and the leaderboard. You can also look up any Riot ID with /profil."),
            ("How do I link my Riot ID?", "Run /bagla with your Riot ID and tag. It can also give optional rank roles."),
            ("What does /profil show?", "A paged card: league, form, performance, champion pool, observations, the last 24 hours and league history."),
            ("What does /sonmac show?", "Your latest game: summary, items, damage and economy."),
        ]),
        ("Live games and comparisons", [
            ("What does /live do?", "While a game is running it shows both teams with ranks, masteries and recent form, with the sample size behind each number. It works as long as Riot's Spectator API access allows it, and says so clearly when it does not."),
            ("What does /compare do?", "It puts two linked players side by side and states each player's sample size."),
            ("What is the daily summary?", "/profil includes the last 24 hours of ranked games with your best match."),
            ("What does the leaderboard show?", "Linked players on your server ranked by SoloQ LP. /duo lists members of a similar rank."),
        ]),
        ("Notifications", [
            ("What is the match feed?", "/feed posts match results, rank changes and streaks to a channel you pick. It needs the Manage Server permission."),
            ("Will it announce old matches?", "No. The feed does not announce old matches when you set it up; it only reports matches that happen afterwards."),
        ]),
        ("Your data", [
            ("Where does the data come from?", "From Riot Games' public API and Data Dragon, with caching and rate limiting that respects Riot's limits."),
            ("How do I remove my data?", "/baglantikes deletes your account link, league history and feed tracking records on the current server. /verisil deletes your account links and related bot records on all servers. Messages already sent to Discord are not deleted by these commands."),
            ("What does Lolable store?", "Only what its features need. See the privacy page for the list."),
        ]),
        ("Support", [
            ("How do I get help or report a problem?", "Write to admin@kingpindev.com with your server name, the command you used and what happened."),
        ]),
    ],
    "changelog": [
        ("Current", "2026", "What Lolable does today", [
            "/profil and /me: a paged card with league, form, performance, champion pool, observations, the last 24 hours and league history.",
            "/sonmac, /compare, /live and /leaderboard, with the sample size shown behind each statistic.",
            "/duo, /feed and a persistent /panel that keeps working after restarts.",
            "Data controls: /baglantikes and /verisil remove your records.",
        ]),
    ],
    "press": {
        "oneliner": "Lolable is a Discord bot that shows League of Legends rank, form, live games and a server leaderboard with slash commands.",
        "short": "Lolable brings your server's League of Legends stats into Discord: link a Riot ID and get rank and LP cards, form and KDA, champion mastery, a last-match breakdown, live game scouting, comparisons and a server leaderboard. It uses Riot's public API and is not endorsed by Riot Games.",
        "long": "Lolable is a Discord bot for League of Legends communities. Players link a Riot ID with /bagla and then use /profil for a paged card with league, form, performance and champion pool, /sonmac for a breakdown of the last game, /live to scout a running game with both teams, ranks and recent form, /compare to put two players side by side and /leaderboard to rank the server by SoloQ LP. /feed posts match results, rank changes and streaks to a channel, /duo finds players in a similar league and a persistent /panel keeps working after restarts. Every statistic shows the sample size behind it. Data comes from Riot Games' public API and Data Dragon, players can delete their data with /baglantikes and /verisil, and Lolable replies in Turkish. It is not endorsed or supported by Riot Games.",
        "facts": [
            ("Name", "Lolable"),
            ("Developer", "Kingpindev (Burak Pekel)"),
            ("Platform", "Discord, as slash commands"),
            ("Data", "Riot Games public API and Data Dragon"),
            ("Language", "Replies in Turkish"),
            ("Affiliation", "Not endorsed by Riot Games"),
            ("Website", "lolable.kingpindev.com"),
            ("Press contact", CONTACT),
        ],
        "shots": [("shot-1", "The profile card"), ("shot-2", "Last match breakdown"), ("shot-3", "Live scouting"), ("shot-4", "Server leaderboard")],
        "notes": ["Screenshots are from the live demo with made-up players and numbers. Please do not alter the logo.", "Lolable is not endorsed or supported by Riot Games, and League of Legends is a trademark of Riot Games, Inc. Please do not describe Lolable as an official Riot product."],
    },
    "privacy": [
        ("Summary", ["Lolable is a non-commercial Discord bot. It collects only what it needs to provide its features.", "It does not sell, trade or share your data beyond what is needed to run the service.", "It does not collect Discord message content or private messages."]),
        ("Data Lolable may store", ["Discord user, server and (if you configure a feed) channel IDs; the Riot ID (game name and tag line) you link and the matching Riot PUUID; your platform and region; profile icon and summoner level; ranked snapshot data (tier, division, LP, wins, losses, recent win rate); the last seen match IDs used only to detect new matches for the feed; and minimal server settings such as feed channels."]),
        ("Data Lolable does not collect", ["Discord message content, direct or private messages, usernames or display names, email addresses, real names, passwords or payment information."]),
        ("How the data is used", ["Only to provide Lolable's features: profiles, last matches, live scouting, comparisons, leaderboards, daily summaries and feed notifications. It is never used for advertising, profiling, gambling, boosting, cheating or any abuse of competitive integrity."]),
        ("Riot Games data", ["Game data is retrieved in real time from the Riot Games API and Data Dragon, with caching, and is subject to Riot's Developer Policies. Lolable is not endorsed or supported by Riot Games."]),
        ("Deleting your data", ["/baglantikes deletes your account link, league history and feed tracking records on the current server. /verisil deletes your account links and related bot records on all servers. Messages already sent to Discord and server backups are not deleted by these commands. League history snapshots older than 90 days are removed automatically."]),
        ("Full documents", ["This page is a summary. The full Privacy Policy and the Terms of Service are the binding documents."]),
    ],
    "compare": {
        "intro": "There are many ways to look at League of Legends stats. Here is an honest look at how Lolable fits, and where another approach is the better pick.",
        "items": [
            ("Stat websites and in-client tools", "Websites and apps such as op.gg and in-client overlays",
             "Rich dashboards with deep history, builds and per-champion detail, outside Discord.",
             "Lolable lives in Discord: your server's linked players, a leaderboard, comparisons and a match feed are one slash command away, with the sample size shown behind each number.",
             "Pick a stat website when you want deep, long-term analysis of one player."),
            ("General-purpose game bots", "Discord bots that cover many games",
             "One bot for many games, often with lighter League support.",
             "Lolable is built only for League: live scouting, ban suggestions, last-match pages and a server leaderboard.",
             "Pick a general bot if your server plays many different games."),
        ],
        "foot": "Checked on 16 November 2026. Tools change; if something here is out of date, tell us at admin@kingpindev.com and we will fix it.",
    },
}

TR = {
    "faq": [
        ("Başlarken", [
            ("Lolable nedir?", "Lolable, League of Legends toplulukları için bir Discord botudur. Lig ve LP, form ve KDA, şampiyon ustalığı, son maçınızı, canlı oyun keşfi, karşılaştırmalar ve bir sunucu sıralamasını gösterir; hepsi slash komutlarıyla."),
            ("Sunucuma nasıl eklerim?", "Discord'a ekle düğmesini kullanın. Sunucuda Sunucuyu Yönet yetkisine ihtiyacınız var. Discord, onaylamadan önce botun istediği izinleri gösterir."),
            ("Hangi dili kullanıyor?", "Lolable Türkçe yanıt verir."),
            ("Riot Games ile bağlantılı mı?", "Hayır. Lolable, Riot Games tarafından onaylanmamış ya da desteklenmemiştir. League of Legends ve Riot Games, Riot Games, Inc.'in ticari markalarıdır."),
        ]),
        ("Bağlama ve profiller", [
            ("Hesabımı bağlamam gerekir mi?", "/me ve sıralama için bağlama gerekir. /profil ile herhangi bir Riot ID'sine de bakabilirsiniz."),
            ("Riot ID'mi nasıl bağlarım?", "Riot ID'nizle ve etiketinizle /bagla çalıştırın. İsteğe bağlı lig rolleri de verebilir."),
            ("/profil ne gösterir?", "Sayfalı bir kart: lig, form, performans, şampiyon havuzu, gözlemler, son 24 saat ve lig geçmişi."),
            ("/sonmac ne gösterir?", "Son oyununuz: özet, eşyalar, hasar ve ekonomi."),
        ]),
        ("Canlı oyunlar ve karşılaştırmalar", [
            ("/live ne yapar?", "Bir oyun sürerken her iki takımı ligleri, ustalıkları ve son formlarıyla, her sayının arkasındaki örneklem büyüklüğüyle gösterir. Riot'un Spectator API erişimi izin verdiği sürece çalışır; vermediğinde bunu açıkça söyler."),
            ("/compare ne yapar?", "Bağlı iki oyuncuyu yan yana koyar ve her oyuncunun örneklem büyüklüğünü belirtir."),
            ("Günlük özet nedir?", "/profil, son 24 saatteki dereceli oyunları en iyi maçınızla birlikte içerir."),
            ("Sıralama ne gösterir?", "Sunucunuzdaki bağlı oyuncuları SoloQ LP'ye göre sıralar. /duo benzer ligdeki üyeleri listeler."),
        ]),
        ("Bildirimler", [
            ("Maç akışı nedir?", "/feed, maç sonuçlarını, lig değişikliklerini ve serileri seçtiğiniz bir kanala gönderir. Sunucuyu Yönet yetkisi gerekir."),
            ("Eski maçları duyurur mu?", "Hayır. Akış kurulduğunda eski maçları duyurmaz; yalnızca sonrasında olan maçları bildirir."),
        ]),
        ("Verileriniz", [
            ("Veriler nereden geliyor?", "Riot Games'in herkese açık API'sinden ve Data Dragon'dan; Riot'un sınırlarına uyan önbellekleme ve hız sınırlamasıyla."),
            ("Verilerimi nasıl kaldırırım?", "/baglantikes, geçerli sunucudaki hesap bağlantınızı, lig geçmişinizi ve akış takip kayıtlarınızı siler. /verisil tüm sunuculardaki hesap bağlantılarınızı ve ilgili bot kayıtlarını siler. Discord'a zaten gönderilmiş mesajlar bu komutlarla silinmez."),
            ("Lolable ne saklıyor?", "Yalnızca özelliklerinin ihtiyaç duyduğunu. Listeyi gizlilik sayfasında görün."),
        ]),
        ("Destek", [
            ("Yardımı nasıl alırım, sorunu nasıl bildiririm?", "admin@kingpindev.com adresine sunucu adınızla, kullandığınız komutla ve ne olduğuyla birlikte yazın."),
        ]),
    ],
    "changelog": [
        ("Güncel", "2026", "Lolable bugün neler yapıyor", [
            "/profil ve /me: lig, form, performans, şampiyon havuzu, gözlemler, son 24 saat ve lig geçmişi içeren sayfalı bir kart.",
            "/sonmac, /compare, /live ve /leaderboard; her istatistiğin arkasındaki örneklem büyüklüğüyle.",
            "/duo, /feed ve yeniden başlatmalardan sonra da çalışan kalıcı bir /panel.",
            "Veri denetimleri: /baglantikes ve /verisil kayıtlarınızı kaldırır.",
        ]),
    ],
    "press": {
        "oneliner": "Lolable; League of Legends liginizi, formunuzu, canlı oyunları ve bir sunucu sıralamasını slash komutlarıyla gösteren bir Discord botudur.",
        "short": "Lolable, sunucunuzun League of Legends istatistiklerini Discord'a getirir: bir Riot ID bağlayın, lig ve LP kartları, form ve KDA, şampiyon ustalığı, son maç dökümü, canlı oyun keşfi, karşılaştırmalar ve bir sunucu sıralaması alın. Riot'un herkese açık API'sini kullanır ve Riot Games tarafından onaylanmamıştır.",
        "long": "Lolable, League of Legends toplulukları için bir Discord botudur. Oyuncular /bagla ile bir Riot ID bağlar, ardından lig, form, performans ve şampiyon havuzu içeren sayfalı bir kart için /profil, son oyunun dökümü için /sonmac, iki takımı, ligleri ve son formu ile çalışan bir oyunu keşfetmek için /live, iki oyuncuyu yan yana koymak için /compare ve sunucuyu SoloQ LP'ye göre sıralamak için /leaderboard kullanır. /feed maç sonuçlarını, lig değişikliklerini ve serileri bir kanala gönderir, /duo benzer ligdeki oyuncuları bulur ve kalıcı bir /panel yeniden başlatmalardan sonra da çalışır. Her istatistik arkasındaki örneklem büyüklüğünü gösterir. Veriler Riot Games'in herkese açık API'sinden ve Data Dragon'dan gelir, oyuncular verilerini /baglantikes ve /verisil ile silebilir ve Lolable Türkçe yanıt verir. Riot Games tarafından onaylanmamış ya da desteklenmemiştir.",
        "facts": [
            ("Ad", "Lolable"),
            ("Geliştirici", "Kingpindev (Burak Pekel)"),
            ("Platform", "Discord, slash komutlarıyla"),
            ("Veri", "Riot Games herkese açık API'si ve Data Dragon"),
            ("Dil", "Türkçe yanıt verir"),
            ("Bağlantı", "Riot Games tarafından onaylanmamıştır"),
            ("Web sitesi", "lolable.kingpindev.com"),
            ("Basın iletişimi", CONTACT),
        ],
        "shots": [("shot-1", "Profil kartı"), ("shot-2", "Son maç dökümü"), ("shot-3", "Canlı keşif"), ("shot-4", "Sunucu sıralaması")],
        "notes": ["Ekran görüntüleri, uydurma oyuncular ve sayılarla canlı demodandır. Lütfen logoyu değiştirmeyin.", "Lolable, Riot Games tarafından onaylanmamış ya da desteklenmemiştir ve League of Legends, Riot Games, Inc.'in ticari markasıdır. Lütfen Lolable'ı resmî bir Riot ürünü olarak tanıtmayın."],
    },
    "privacy": [
        ("Özet", ["Lolable ticari olmayan bir Discord botudur. Yalnızca özelliklerini sunmak için ihtiyaç duyduğunu toplar.", "Hizmeti çalıştırmak için gerekenin ötesinde verilerinizi satmaz, takas etmez ya da paylaşmaz.", "Discord mesaj içeriğini ya da özel mesajları toplamaz."]),
        ("Lolable'ın saklayabileceği veriler", ["Discord kullanıcı, sunucu ve (bir akış yapılandırırsanız) kanal kimlikleri; bağladığınız Riot ID (oyun adı ve etiket) ve eşleşen Riot PUUID; platformunuz ve bölgeniz; profil ikonu ve çağırıcı seviyesi; dereceli anlık görüntü verileri (kademe, bölüm, LP, galibiyet, mağlubiyet, son kazanma oranı); akış için yalnızca yeni maçları saptamakta kullanılan son görülen maç kimlikleri ve akış kanalları gibi asgari sunucu ayarları."]),
        ("Lolable'ın toplamadığı veriler", ["Discord mesaj içeriği, doğrudan ya da özel mesajlar, kullanıcı adları ya da görünen adlar, e-posta adresleri, gerçek adlar, parolalar ya da ödeme bilgileri."]),
        ("Veriler nasıl kullanılır", ["Yalnızca Lolable'ın özelliklerini sunmak için: profiller, son maçlar, canlı keşif, karşılaştırmalar, sıralamalar, günlük özetler ve akış bildirimleri. Asla reklam, profilleme, kumar, boosting, hile ya da rekabet bütünlüğünün herhangi bir biçimde kötüye kullanımı için kullanılmaz."]),
        ("Riot Games verileri", ["Oyun verileri, önbellekleme ile Riot Games API'sinden ve Data Dragon'dan gerçek zamanlı alınır ve Riot'un Geliştirici Politikalarına tabidir. Lolable, Riot Games tarafından onaylanmamış ya da desteklenmemiştir."]),
        ("Verilerinizi silme", ["/baglantikes geçerli sunucudaki hesap bağlantınızı, lig geçmişinizi ve akış takip kayıtlarınızı siler. /verisil tüm sunuculardaki hesap bağlantılarınızı ve ilgili bot kayıtlarını siler. Discord'a zaten gönderilmiş mesajlar ve sunucu yedekleri bu komutlarla silinmez. 90 günden eski lig geçmişi anlık görüntüleri otomatik olarak kaldırılır."]),
        ("Tam belgeler", ["Bu sayfa bir özettir. Tam Gizlilik Politikası ve Kullanım Şartları bağlayıcı belgelerdir."]),
    ],
    "compare": {
        "intro": "League of Legends istatistiklerine bakmanın birçok yolu var. İşte Lolable'ın nerede durduğuna ve başka bir yaklaşımın daha iyi seçim olduğu yerlere dürüst bir bakış.",
        "items": [
            ("İstatistik siteleri ve istemci içi araçlar", "op.gg gibi web siteleri ve uygulamalar, istemci içi katmanlar",
             "Discord dışında, derin geçmiş, build'ler ve şampiyon başına ayrıntıyla zengin paneller.",
             "Lolable Discord'da yaşar: sunucunuzun bağlı oyuncuları, bir sıralama, karşılaştırmalar ve bir maç akışı bir slash komutu uzağınızdadır; her sayının arkasındaki örneklem büyüklüğüyle.",
             "Bir oyuncunun derin, uzun vadeli analizini istiyorsanız bir istatistik sitesi seçin."),
            ("Genel amaçlı oyun botları", "Birçok oyunu kapsayan Discord botları",
             "Birçok oyun için tek bot; çoğu zaman daha hafif League desteğiyle.",
             "Lolable yalnızca League için yapıldı: canlı keşif, yasak önerileri, son maç sayfaları ve bir sunucu sıralaması.",
             "Sunucunuz birçok farklı oyun oynuyorsa genel bir bot seçin."),
        ],
        "foot": "16 Kasım 2026'da kontrol edildi. Araçlar değişir; burada eskimiş bir bilgi görürseniz admin@kingpindev.com adresine yazın, düzeltelim.",
    },
}

HOME = {
    "en": {
        "emph": "League stats", "chip": ("Riot API", "Rank, form, live games and a server leaderboard"),
        "stats": [(13, "", "slash commands"), (9, "", "commands to try in the live demo"), (90, "", "days of league history kept"), (2, "", "commands to delete your data")],
        "explorer_note": "Pick a feature and the live Discord channel runs it. Players and numbers are made up, and the bot replies in Turkish.",
        "gallery_title": "See it in action", "gallery_note": "Screens from the demo.",
        "compare_title": "How Lolable compares", "compare_sub": "Stat websites and general game bots are both good. Here is where each one fits.",
    },
    "tr": {
        "emph": "League istatistikleri", "chip": ("Riot API", "Lig, form, canlı oyunlar ve bir sunucu sıralaması"),
        "stats": [(13, "", "slash komutu"), (9, "", "canlı demoda denenecek komut"), (90, "", "gün lig geçmişi tutulur"), (2, "", "verinizi silen komut")],
        "explorer_note": "Bir özellik seçin, canlı Discord kanalı onu çalıştırır. Oyuncular ve sayılar uydurmadır; bot Türkçe yanıt verir.",
        "gallery_title": "Çalışırken görün", "gallery_note": "Demodan ekranlar.",
        "compare_title": "Lolable nasıl bir yerde duruyor", "compare_sub": "İstatistik siteleri ve genel oyun botları ikisi de iyi. İşte her birinin uygun olduğu yer.",
    },
}

# Feature explorer scenes (LolableDemo.apply: types a command and sends it), in the order of APPS["lolable"]["en"]["features"].
SCENES = [
    None,
    [[0, {"clear": 1}], [500, {"send": "/profil"}]],
    [[0, {"clear": 1}], [500, {"send": "/sonmac"}]],
    [[0, {"clear": 1}], [500, {"send": "/live"}]],
    [[0, {"clear": 1}], [500, {"send": "/compare"}]],
    [[0, {"clear": 1}], [500, {"send": "/gunluk"}]],
    [[0, {"clear": 1}], [500, {"send": "/leaderboard"}]],
    None,
]

DATA = {"en": EN, "tr": TR}
