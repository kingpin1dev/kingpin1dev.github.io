/* Goliath live demo for kingpindev.com: a Discord channel where you can run the bot's
   slash commands. Command names, descriptions, help categories and the replies (titles,
   colours, fields, footers) come from the bot's cogs; the bot speaks Turkish, so its
   replies stay Turkish on the English page too. Members, songs and numbers are made up.
   Mount with GoliathDemo.mount(el, { lang: "tr" | "en", img: "/img/" }). */
(function () {
  "use strict";

  // Slash commands and their descriptions (cogs/*.py).
  const CMDS = {
    help: "Tüm bot komutlarını kategori kategori gösterir", ping: "Botun gecikmesini gösterir", botinfo: "Bot hakkında bilgi gösterir",
    stats: "Sunucu bilgilerini gösterir", userinfo: "Kullanıcı bilgilerini gösterir", "avatar get": "Kullanıcının avatarını gösterir", membercount: "Sunucunun üye sayısını gösterir",
    servericon: "Sunucunun ikonunu gösterir", serverbanner: "Sunucunun banner'ını gösterir", emojis: "Sunucudaki tüm emojileri gösterir", invites: "Kullanıcının davet sayısını gösterir", memberstats: "Kullanıcı istatistiklerini gösterir",
    kick: "Bir kullanıcıyı sunucudan atar", ban: "Bir kullanıcıyı sunucudan yasaklar", unban: "Bir kullanıcının yasağını kaldırır", timeout: "Bir kullanıcıyı geçici olarak susturur",
    untimeout: "Bir kullanıcının timeout'unu kaldırır", clear: "Belirtilen sayıda mesajı siler", slowmode: "Yavaş modu ayarlar", lock: "Kanalı kilitler", unlock: "Kanal kilidini açar",
    nuke: "Kanalı siler ve yeniden oluşturur", warn: "Kullanıcıya uyarı verir", warnings: "Kullanıcının uyarılarını gösterir", clearwarnings: "Kullanıcının tüm uyarılarını siler",
    "role add": "Kullanıcıya rol verir", "role remove": "Kullanıcıdan rol alır", "role info": "Rol hakkında bilgi gösterir", setlog: "Log kanallarını ayarlar",
    rank: "Seviye ve XP bilgilerinizi gösterir", leaderboard: "Sunucunun seviye sıralamasını gösterir", setlevel: "Kullanıcının seviyesini ayarlar (Admin)",
    play: "YouTube veya Spotify'dan müzik çalar", radio: "Canlı radyo panelini açar", pause: "Müziği duraklatır", resume: "Müziği devam ettirir", skip: "Şarkıyı atlar",
    stop: "Müziği durdurur ve kuyruğu temizler", queue: "Müzik kuyruğunu gösterir", nowplaying: "Şu an çalan şarkıyı gösterir", volume: "Ses seviyesini ayarlar",
    loop: "Mevcut şarkıyı tekrarlar", seek: "Şarkının belirli bir saniyesine atlar", shuffle: "Kuyruktaki şarkıları karıştırır", jump: "Kuyruktaki belirli bir şarkıya atlar",
    remove: "Kuyruktan belirli bir şarkıyı kaldırır", stay: "Bot seste inaktif olsa bile kanalda kalır", disconnect: "Botu ses kanalından çıkarır", leave: "Botu ses kanalından çıkarır",
    musictimeout: "Müzik inaktivite zaman aşımı süresini ayarlar (Admin)", translate: "Metni çevirir", weather: "Hava durumu bilgisi (yakında)", yks: "YKS'ye kalan süreyi gerçek zamanlı gösterir",
    wiki: "Wikipedia'da arama yapar", calc: "Matematiksel işlem yapar", shortenurl: "URL'yi kısaltır", afk: "AFK moduna geçer", reminder: "Hatırlatıcı ayarlar",
  };
  // cogs/basic.py HELP_CATEGORIES + HELP_CATEGORY_EMOJIS
  const CATS = [
    ["ℹ️", "Genel", "Bot ve genel bilgi komutları", ["help", "ping", "botinfo"]],
    ["👥", "Sunucu ve Kullanıcı", "Sunucu, profil, avatar ve davet bilgileri", ["stats", "userinfo", "avatar get", "membercount", "servericon", "serverbanner", "emojis", "invites", "memberstats"]],
    ["🛡️", "Moderasyon", "Sunucu düzeni ve kullanıcı yönetimi", ["kick", "ban", "unban", "timeout", "untimeout", "clear", "slowmode", "lock", "unlock", "nuke", "warn", "warnings", "clearwarnings"]],
    ["🧩", "Rol Yönetimi ve Loglar", "Rol işlemleri ve sunucu log ayarları", ["role add", "role remove", "role info", "setlog"]],
    ["🏆", "Seviye", "XP, seviye ve sıralama sistemi", ["rank", "leaderboard", "setlevel"]],
    ["🎵", "Müzik ve Radyo", "Ses kanalında müzik, kuyruk ve canlı radyo", ["play", "radio", "pause", "resume", "skip", "stop", "queue", "nowplaying", "volume", "loop", "seek", "shuffle", "jump", "remove", "stay", "disconnect", "leave", "musictimeout"]],
    ["🧰", "Araçlar", "Çeviri, hesaplama, Wikipedia ve bağlantı araçları", ["translate", "weather", "yks", "wiki", "calc", "shortenurl"]],
    ["✨", "Özel", "AFK ve hatırlatıcı komutları", ["afk", "reminder"]],
  ];
  const WORKS = ["help", "ping", "rank", "leaderboard", "play", "nowplaying", "queue", "ban"];
  const SONGS = [["Lalune — Midnight Drive", "3:04"], ["Neon Coast — Skyline", "3:41"], ["Paper Satellites — Lumen Harbor", "2:32"], ["Aurora Lights — Late Night", "4:12"]];
  const TOP = [["kingpin", 24, 512, 5210], ["luna", 21, 380, 4122], ["sineorbit", 19, 640, 3786], ["eris", 15, 210, 2510], ["nova", 12, 95, 1490]];

  const T = {
    tr: { channel: "genel", topic: "Goliath'ı burada dene · / yazarak başla", ph: "#genel kanalına mesaj gönder", today: "Bugün", bot: "BOT", you: "sen",
      only: "Bu demoda çalışan komutlar:", select: "Yardım kategorisi seç", overview: "Genel Bakış", welcome: "Goliath'a hoş geldin! Aşağıdaki komutlardan birine tıkla ya da / yaz.",
      used: "kullandı", ephem: "Bunu sadece sen görebilirsin" },
    en: { channel: "general", topic: "Try Goliath here · type / to start", ph: "Message #general", today: "Today", bot: "BOT", you: "you",
      only: "Commands that work in this demo:", select: "Pick a help category", overview: "Overview", welcome: "Welcome to Goliath! Click a command below or type /. (The bot replies in Turkish.)",
      used: "used", ephem: "Only you can see this" },
  };

  const CSS = `
.gl-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#313338;color:#dbdee1;
  font-family:"gg sans","Noto Sans","Segoe UI",system-ui,sans-serif;user-select:none;-webkit-user-select:none;display:flex;height:520px}
.gl-demo *{box-sizing:border-box}
html:has(#cur) .gl-demo *{cursor:none!important}
.gl-rail{width:64px;flex:none;background:#1e1f22;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:12px}
.gl-rail i{width:44px;height:44px;border-radius:50%;background:#313338;display:grid;place-items:center;font-style:normal;font-weight:700;color:#dbdee1;font-size:15px}
.gl-rail i.on{border-radius:14px;background:#5865f2;color:#fff}
.gl-rail hr{width:30px;border:0;border-top:2px solid #35363c;margin:2px 0}
.gl-main{flex:1;min-width:0;display:flex;flex-direction:column}
.gl-head{height:48px;flex:none;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid #26272b;box-shadow:0 1px 0 rgba(0,0,0,.2)}
.gl-head b{font-size:15px;color:#f2f3f5}.gl-head b::before{content:"# ";color:#80848e}
.gl-head span{font-size:13px;color:#949ba4;border-left:1px solid #3f4147;padding-left:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gl-msgs{flex:1;overflow-y:auto;padding:10px 0 6px}
.gl-msgs::-webkit-scrollbar{width:8px}.gl-msgs::-webkit-scrollbar-thumb{background:#1a1b1e;border-radius:4px}
.gl-day{display:flex;align-items:center;gap:8px;margin:6px 16px 10px;color:#949ba4;font-size:12px;font-weight:600}
.gl-day::before,.gl-day::after{content:"";flex:1;border-top:1px solid #3f4147}
.gl-m{display:flex;gap:14px;padding:4px 16px 4px;animation:glIn .25s ease}
@keyframes glIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.gl-m:hover{background:#2e3035}
.gl-av{width:40px;height:40px;flex:none;border-radius:50%;overflow:hidden;background:#5865f2;display:grid;place-items:center;color:#fff;font-weight:700;margin-top:2px}
.gl-av img{width:100%;height:100%;object-fit:cover}
.gl-c{min-width:0;flex:1}
.gl-n{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:600;color:#f2f3f5}
.gl-n small{font-size:11.5px;font-weight:500;color:#949ba4}
.gl-tag{font-size:10px;font-weight:700;background:#5865f2;color:#fff;padding:1px 5px;border-radius:4px;letter-spacing:.02em}
.gl-reply{font-size:13px;color:#949ba4;margin:0 0 2px 54px;padding:0 16px;display:flex;gap:6px;align-items:center}
.gl-reply b{color:#c4c9ce;font-weight:600}.gl-reply code{color:#00a8fc;font-family:inherit}
.gl-t{font-size:15px;line-height:1.375;color:#dbdee1;white-space:pre-wrap;word-break:break-word}
.gl-mention{background:rgba(88,101,242,.3);color:#c9cdfb;border-radius:3px;padding:0 2px;font-weight:500}
.gl-e{display:flex;margin-top:4px;max-width:520px;background:#2b2d31;border-radius:4px;border-left:4px solid var(--c);overflow:hidden}
.gl-ei{padding:10px 16px 14px 12px;min-width:0;flex:1}
.gl-et{font-size:15px;font-weight:700;color:#f2f3f5;margin:2px 0 6px}
.gl-ed{font-size:14px;line-height:1.4;color:#dbdee1;white-space:pre-wrap;margin-bottom:6px}
.gl-ef{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 10px;margin-top:6px}
.gl-ef div{min-width:0}.gl-ef div.full{grid-column:1/-1}
.gl-ef .fn{display:block;font-size:13.5px;font-weight:700;color:#f2f3f5;margin-bottom:2px}
.gl-ef span{font-size:13.5px;color:#dbdee1;white-space:pre-wrap;word-break:break-word}
.gl-code{display:block;background:#1e1f22;border:1px solid #1a1b1e;border-radius:4px;padding:5px 8px;font-family:Consolas,ui-monospace,monospace;font-size:12.5px;color:#dbdee1}
.gl-ic{font-family:Consolas,ui-monospace,monospace;font-size:12.5px;background:#1e1f22;padding:1px 4px;border-radius:3px}
.gl-link{color:#00a8fc}
.gl-foot{font-size:12px;color:#949ba4;margin-top:10px}
.gl-sel{margin-top:6px;max-width:520px;height:40px;border-radius:4px;background:#1e1f22;border:1px solid #1a1b1e;display:flex;align-items:center;padding:0 12px;font-size:14px;color:#dbdee1;position:relative}
.gl-sel::after{content:"⌄";margin-left:auto;color:#b5bac1}
.gl-opts{position:absolute;left:-1px;right:-1px;bottom:42px;background:#2b2d31;border:1px solid #1a1b1e;border-radius:4px;max-height:220px;overflow:auto;z-index:3;box-shadow:0 8px 16px rgba(0,0,0,.3)}
.gl-opts div{padding:8px 12px;font-size:14px;display:flex;gap:8px}
.gl-opts div:hover{background:#35373c}
.gl-opts small{display:block;color:#949ba4;font-size:12px}
.gl-eph{font-size:12px;color:#949ba4;margin-top:4px}
.gl-in{padding:0 16px 14px;flex:none;position:relative}
.gl-box{display:flex;align-items:center;gap:10px;height:44px;border-radius:8px;background:#383a40;padding:0 14px}
.gl-box b{width:24px;height:24px;border-radius:50%;background:#b5bac1;color:#383a40;display:grid;place-items:center;font-size:18px;line-height:1;flex:none}
.gl-box input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#dbdee1;font:inherit;font-size:15px;user-select:text;-webkit-user-select:text}
.gl-box input::placeholder{color:#6d6f78}
.gl-ac{position:absolute;left:16px;right:16px;bottom:62px;background:#2b2d31;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-height:230px;overflow:auto;padding:6px 0;display:none}
.gl-ac.show{display:block}
.gl-ac div{display:flex;align-items:center;gap:10px;padding:7px 12px;font-size:14px}
.gl-ac div.on,.gl-ac div:hover{background:#35373c}
.gl-ac img{width:22px;height:22px;border-radius:50%}
.gl-ac b{color:#f2f3f5;font-weight:600}.gl-ac span{color:#949ba4;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gl-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 12px}
.gl-chips button{all:unset;padding:4px 10px;border-radius:99px;background:#2b2d31;border:1px solid #3f4147;font-size:12.5px;color:#dbdee1}
.gl-chips button:hover{background:#35373c;border-color:#5865f2}
`;
  function injectCss() {
    if (document.getElementById("gl-demo-css")) return;
    const st = document.createElement("style");
    st.id = "gl-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Tiny Discord markdown: **bold**, `code`, ```block```, [text](url) and @mentions.
  const md = (t) => esc(t)
    .replace(/```([^`]+)```/g, '<span class="gl-code">$1</span>')
    .replace(/`([^`]+)`/g, '<span class="gl-ic">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="gl-link">$1</span>')
    .replace(/@([a-z0-9_]+)/gi, '<span class="gl-mention">@$1</span>');
  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };

  function Demo(root, L, IMG) {
    const ME = "kingpin";
    const s = { xp: 1500, level: 12, msgs: 1284, playing: null, queue: [], songI: 0, acI: 0 };
    root.innerHTML = `<div class="gl-rail"><i class="on">K</i><hr><i>🎮</i><i>🎵</i><i>+</i></div>
      <div class="gl-main"><div class="gl-head"><b>${L.channel}</b><span>${L.topic}</span></div><div class="gl-msgs"><div class="gl-day">${L.today}</div></div>
      <div class="gl-chips">${WORKS.map((c) => `<button data-run="/${c}${c === "ban" ? " @spammer42" : ""}">/${c}</button>`).join("")}</div>
      <div class="gl-in"><div class="gl-ac"></div><div class="gl-box"><b>+</b><input data-in placeholder="${L.ph}" autocomplete="off" spellcheck="false"></div></div></div>`;
    const msgs = root.querySelector(".gl-msgs"), input = root.querySelector("[data-in]"), ac = root.querySelector(".gl-ac");

    const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };
    // Back-to-back messages from you stack under one name, like Discord.
    function userMsg(text) {
      const last = msgs.lastElementChild;
      if (last && last.dataset.author === "me") last.querySelector(".gl-c").insertAdjacentHTML("beforeend", `<div class="gl-t">${md(text)}</div>`);
      else msgs.insertAdjacentHTML("beforeend", `<div class="gl-m" data-author="me"><div class="gl-av" style="background:#eb459e">K</div><div class="gl-c">
        <div class="gl-n">${ME} <small>${L.today} ${now()}</small></div><div class="gl-t">${md(text)}</div></div></div>`);
      scroll();
    }
    function embedHtml(e) {
      const fields = (e.fields || []).map(([n, v, inline]) => `<div class="${inline ? "" : "full"}"><span class="fn">${md(n)}</span><span>${md(v)}</span></div>`).join("");
      return `<div class="gl-e" style="--c:${hex(e.color)}"><div class="gl-ei">${e.title ? `<div class="gl-et">${md(e.title)}</div>` : ""}
        ${e.desc ? `<div class="gl-ed">${md(e.desc)}</div>` : ""}${fields ? `<div class="gl-ef">${fields}</div>` : ""}${e.foot ? `<div class="gl-foot">${md(e.foot)}</div>` : ""}</div></div>`;
    }
    // A bot reply to a slash command shows "kingpin used /cmd" above it, like Discord.
    function botMsg({ cmd, text, embed, ephemeral, select }) {
      const id = "m" + Math.random().toString(36).slice(2);
      msgs.insertAdjacentHTML("beforeend", `${cmd ? `<div class="gl-reply">↱ <b>${ME}</b> ${L.used} <code>/${esc(cmd)}</code></div>` : ""}
        <div class="gl-m" id="${id}"><div class="gl-av"><img src="${IMG}Goliath.png" alt=""></div><div class="gl-c">
        <div class="gl-n">Goliath <span class="gl-tag">✓ ${L.bot}</span> <small>${L.today} ${now()}</small></div>
        ${text ? `<div class="gl-t">${md(text)}</div>` : ""}<div data-embed>${embed ? embedHtml(embed) : ""}</div>
        ${select ? `<div class="gl-sel" data-select="${id}">📖 ${L.select}</div>` : ""}${ephemeral ? `<div class="gl-eph">👁 ${L.ephem}</div>` : ""}</div></div>`);
      scroll();
      return id;
    }

    function helpEmbed(cat) {
      const total = Object.keys(CMDS).length;
      if (cat == null) return {
        title: "📖 Goliath Yardım Paneli", color: 0x5865F2,
        desc: `Toplam **${total}** slash komutu var.\nAşağıdaki dropdown ile kategori seçebilirsin.`,
        fields: [["Kategoriler", CATS.map(([em, n, , list], i) => `${em} \`${i + 1}.\` **${n}** - ${list.length} komut`).join("\n"), false]],
        foot: "Panel 5 dakika boyunca aktif kalır" };
      const [em, n, d, list] = CATS[cat];
      return { title: `${em} ${n}`, desc: d, color: 0x2ECC71, fields: [[`Komutlar (${list.length})`, list.map((c) => `\`/${c}\` - ${CMDS[c]}`).join("\n"), false]],
        foot: "Başka kategori görmek için dropdown kullan" };
    }

    function run(raw) {
      const line = raw.trim();
      if (!line) return;
      if (!line.startsWith("/")) { chat(line); return; }
      const [name, ...rest] = line.slice(1).split(/\s+/);
      const arg = rest.join(" ");
      const c = name.toLowerCase();
      setTimeout(() => respond(c, arg), 350 + Math.random() * 250);
    }
    function respond(c, arg) {
      const next = () => SONGS[s.songI++ % SONGS.length];
      if (c === "help") return botMsg({ cmd: "help", embed: helpEmbed(null), select: true });
      if (c === "ping") return botMsg({ cmd: "ping", text: `Pong! 🏓 Gecikme: ${28 + Math.floor(Math.random() * 30)}ms` });
      if (c === "rank") {
        const need = 5 * (s.level + 1) ** 2 + 50 * (s.level + 1) + 100, p = Math.round((s.xp / need) * 20);
        return botMsg({ cmd: "rank", embed: { title: `📊 ${ME} - Seviye Bilgisi`, color: 0x5865F2, fields: [
          ["🎖️ Seviye", "```" + s.level + "```", true], ["⭐ XP", "```" + s.xp + "/" + need + "```", true], ["🏆 Sıralama", "```#1```", true],
          ["💬 Mesajlar", "```" + s.msgs.toLocaleString("en-US") + "```", true],
          ["📈 İlerleme", "`" + "▰".repeat(p) + "▱".repeat(20 - p) + "` " + Math.round((s.xp / need) * 100) + "%", false]] } });
      }
      if (c === "leaderboard") {
        const medals = ["🥇", "🥈", "🥉"];
        return botMsg({ cmd: "leaderboard", embed: { title: "🏆 Kingpin Lounge - Liderlik Tablosu", color: 0xFFD700,
          fields: TOP.map(([n, lv, xp, m], i) => [`${medals[i] || `**#${i + 1}**`} ${n}`, `Seviye: \`${n === ME ? s.level : lv}\` • XP: \`${n === ME ? s.xp : xp}\` • Mesajlar: \`${(n === ME ? s.msgs : m).toLocaleString("en-US")}\``, false]),
          foot: `Toplam ${TOP.length} kullanıcı listelendi` } });
      }
      if (c === "play") {
        // A name finds the matching sample song; anything else is queued as typed.
        const song = arg ? (SONGS.find((x) => x[0].toLowerCase().includes(arg.toLowerCase())) || [arg, "3:30"]) : next();
        if (!s.playing) {
          s.playing = song;
          return botMsg({ cmd: "play", embed: { title: "🎵 Şimdi Çalıyor", desc: `[${song[0]}](https://youtube.com)`, color: 0x5865F2,
            fields: [["⏱️ Süre", song[1], true], ["🎧 Talep Eden", "@" + ME, true]] } });
        }
        s.queue.push(song);
        return botMsg({ cmd: "play", embed: { title: "➕ Kuyruğa Eklendi", desc: `[${song[0]}](https://youtube.com)`, color: 0x00FF00,
          fields: [["⏱️ Süre", song[1], true], ["📊 Sırada", `${s.queue.length} şarkı`, true]] } });
      }
      if (c === "nowplaying") {
        if (!s.playing) return botMsg({ cmd: "nowplaying", text: "❌ Şu an çalan bir şarkı yok!", ephemeral: true });
        return botMsg({ cmd: "nowplaying", embed: { title: "🎶 Şimdi Çalıyor", desc: `[${s.playing[0]}](https://youtube.com)`, color: 0xFF6B6B, fields: [["⏱️ Süre", s.playing[1], true]] } });
      }
      if (c === "queue") {
        if (!s.playing && !s.queue.length) return botMsg({ cmd: "queue", text: "❌ Kuyruk boş!", ephemeral: true });
        const f = [];
        if (s.playing) f.push(["▶️ Şimdi Çalıyor", `**[${s.playing[0]}](https://youtube.com)**\nSüre: ${s.playing[1]}`, false]);
        if (s.queue.length) f.push(["📜 Sırada", s.queue.map(([t, d], i) => `\`${i + 1}.\` [${t}](https://youtube.com) \`[${d}]\``).join("\n"), false]);
        return botMsg({ cmd: "queue", embed: { title: "🎵 Müzik Kuyruğu", color: 0x5865F2, fields: f, foot: `Toplam: ${s.queue.length} şarkı` } });
      }
      if (c === "ban") {
        const who = (arg.match(/@?([a-z0-9_]+)/i) || [, "spammer42"])[1];
        return botMsg({ cmd: "ban", embed: { title: "✅ Kullanıcı Yasaklandı", color: 0xFF0000, fields: [
          ["👤 Kullanıcı", `@${who} (\`7419920318822\`)`, false], ["📝 Sebep", arg.replace(/@?[a-z0-9_]+\s*/i, "").trim() || "Sebep belirtilmedi", false],
          ["🗑️ Silinen Mesajlar", "Son 0 gün", false], ["👮 Yetkili", "@" + ME, false]] } });
      }
      const known = Object.keys(CMDS).some((k) => k === c || k.startsWith(c + " "));
      return botMsg({ cmd: c, ephemeral: true, text: known ? `${L.only} ${WORKS.map((w) => "`/" + w + "`").join(" ")}` : `❌ /${c} ?` });
    }
    // Plain messages earn XP (cogs/leveling.py); enough of them level you up.
    function chat(text) {
      userMsg(text);
      s.msgs++;
      s.xp += 15 + Math.floor(Math.random() * 11);
      const need = 5 * (s.level + 1) ** 2 + 50 * (s.level + 1) + 100;
      if (s.xp >= need) {
        s.xp -= need; s.level++;
        setTimeout(() => botMsg({ embed: { title: "🎉 Seviye Atladı!", desc: `@${ME} **Seviye ${s.level}** oldu!`, color: 0xFFD700 } }), 400);
      }
    }

    // Slash autocomplete.
    function updateAc() {
      const v = input.value;
      if (!v.startsWith("/") || v.includes(" ")) { ac.classList.remove("show"); return; }
      const q = v.slice(1).toLowerCase();
      const list = Object.keys(CMDS).filter((c) => c.startsWith(q)).sort((a, b) => (WORKS.includes(b) - WORKS.includes(a)) || a.localeCompare(b)).slice(0, 8);
      if (!list.length) { ac.classList.remove("show"); return; }
      s.acI = Math.min(s.acI, list.length - 1);
      ac.innerHTML = list.map((c, i) => `<div class="${i === s.acI ? "on" : ""}" data-ac="${c}"><img src="${IMG}Goliath.png" alt=""><b>/${c}</b><span>${CMDS[c]}</span></div>`).join("");
      ac.classList.add("show");
    }
    function pick(c) {
      const arg = c === "play" ? " Midnight Drive" : c === "ban" ? " @spammer42 Spam" : "";
      input.value = ""; ac.classList.remove("show");
      run("/" + c + arg);
    }

    input.addEventListener("input", () => { s.acI = 0; updateAc(); });
    input.addEventListener("keydown", (e) => {
      const items = [...ac.querySelectorAll("[data-ac]")];
      if (ac.classList.contains("show") && items.length) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") { s.acI = (s.acI + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; updateAc(); e.preventDefault(); return; }
        if (e.key === "Tab" || (e.key === "Enter" && !input.value.trim().includes(" ") && input.value.trim() !== "/" + items[s.acI].dataset.ac)) { pick(items[s.acI].dataset.ac); e.preventDefault(); return; }
      }
      if (e.key === "Enter") { const v = input.value; input.value = ""; ac.classList.remove("show"); run(v); }
    });
    root.addEventListener("click", (e) => {
      const t = e.target.closest("[data-ac],[data-run],[data-select],[data-opt]");
      if (!t) return;
      if (t.dataset.ac) pick(t.dataset.ac);
      else if (t.dataset.run) run(t.dataset.run);
      else if (t.dataset.opt !== undefined) {
        // Help dropdown: edit the help message in place, like the bot's HelpPanelView.
        const id = t.closest("[data-select]").dataset.select, box = root.querySelector(`#${id} [data-embed]`);
        box.innerHTML = embedHtml(helpEmbed(t.dataset.opt === "o" ? null : +t.dataset.opt));
        t.closest(".gl-opts").remove();
        e.stopPropagation();
      } else if (t.dataset.select) {
        if (t.querySelector(".gl-opts")) { t.querySelector(".gl-opts").remove(); return; }
        t.insertAdjacentHTML("beforeend", `<div class="gl-opts"><div data-opt="o">📖 <span>${L.overview}<small>Tüm yardım kategorilerini gösterir</small></span></div>
          ${CATS.map(([em, n, d], i) => `<div data-opt="${i}">${em} <span>${n}<small>${d}</small></span></div>`).join("")}</div>`);
      }
    });

    botMsg({ text: L.welcome });
  }

  window.GoliathDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("gl-demo");
      Demo(root, T[opts.lang === "en" ? "en" : "tr"], opts.img || "/img/");
    },
  };
})();
