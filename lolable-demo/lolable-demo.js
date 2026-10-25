/* Lolable live demo for kingpindev.com: a Discord channel where you can run the bot's slash
   commands. Command names, descriptions, panel pages (Özet / Lig / Performans / ...), embed titles,
   colours and the monospace tables follow bot.py; the bot speaks Turkish, so its replies stay Turkish
   on the English page too. Players, ranks and numbers are made up (no Riot data).
   Mount with LolableDemo.mount(el, { lang: "tr" | "en", img: "/img/" }). */
(function () {
  "use strict";

  // Slash commands (bot.py COMMAND_HELP / tree commands).
  const CMDS = {
    bagla: "Riot ID hesabını Discord hesabına bağla.", profil: "Bağlı hesabın veya Riot ID'nin detaylı profil özetini göster.",
    me: "Kendi bağlı League of Legends profilini göster.", sonmac: "Son ranked maçını butonlu panel olarak göster.",
    compare: "İki bağlı oyuncuyu karşılaştır.", gunluk: "Son 24 saatlik ranked performans özetini göster.",
    championpool: "Şampiyon havuzu ve main pick riskini analiz et.", feed: "Maç sonu, rank ve streak bildirim kanalını ayarla.",
    live: "Canlı maç scouting raporu oluştur.", leaderboard: "Sunucudaki bağlı oyuncuları SoloQ LP'ye göre sırala.",
    duo: "Benzer ligdeki sunucu oyuncularını bul.", help: "Lolable komutlarını açıklamalı olarak göster.", panel: "Etkileşimli Lolable kontrol panelini aç.",
  };
  const WORKS = ["profil", "sonmac", "live", "leaderboard", "compare", "gunluk", "championpool", "duo", "help"];
  // [category, usage, description] for /help
  const HELP = [
    ["Hesap", "/bagla riot_id:<isim> tag:<tag>", "Riot ID hesabını Discord hesabına bağlar."],
    ["Profil", "/profil [kullanici] [riot_id] [tag]", "Bağlı hesabın veya girilen Riot ID'nin detaylı profil panelini gösterir."],
    ["Profil", "/me", "Kendi bağlı League of Legends profilini gösterir."],
    ["Maç", "/sonmac [kullanici] [riot_id] [tag]", "Son ranked maçını butonlu panel olarak gösterir."],
    ["Analiz", "/compare rakip:<kullanici> [kullanici]", "İki bağlı oyuncuyu karşılaştırır."],
    ["Analiz", "/gunluk [kullanici]", "Son 24 saatlik ranked performans özetini gösterir."],
    ["Analiz", "/championpool [kullanici]", "Şampiyon havuzu ve main pick riskini analiz eder."],
    ["Canlı", "/live [kullanici] [riot_id] [tag]", "Oyuncu oyundaysa canlı maç scouting raporu oluşturur."],
    ["Sunucu", "/leaderboard", "Sunucudaki bağlı oyuncuları SoloQ LP sırasına göre listeler."],
    ["Sunucu", "/duo", "Benzer ligdeki sunucu oyuncularını bulur."],
  ];

  const T = {
    tr: { channel: "lolable", topic: "Lolable'ı burada dene · / yazarak başla", ph: "#lolable kanalına mesaj gönder", today: "Bugün", bot: "BOT",
      only: "Bu demoda çalışan komutlar:", welcome: "Lolable'a hoş geldin! Aşağıdaki komutlardan birine tıkla ya da / yaz. (Oyuncular ve sayılar uydurmadır.)",
      used: "kullandı", ephem: "Bunu sadece sen görebilirsin" },
    en: { channel: "lolable", topic: "Try Lolable here · type / to start", ph: "Message #lolable", today: "Today", bot: "BOT",
      only: "Commands that work in this demo:", welcome: "Welcome to Lolable! Click a command below or type /. (The bot replies in Turkish; players and numbers are made up.)",
      used: "used", ephem: "Only you can see this" },
  };

  const CSS = `
.lb-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#313338;color:#dbdee1;
  font-family:"gg sans","Noto Sans","Segoe UI",system-ui,sans-serif;user-select:none;-webkit-user-select:none;display:flex;height:520px}
.lb-demo *{box-sizing:border-box}
html:has(#cur) .lb-demo *{cursor:none!important}
.lb-rail{width:64px;flex:none;background:#1e1f22;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:12px}
.lb-rail i{width:44px;height:44px;border-radius:50%;background:#313338;display:grid;place-items:center;font-style:normal;font-weight:700;color:#dbdee1;font-size:15px;overflow:hidden}
.lb-rail i img{width:100%;height:100%;object-fit:cover}
.lb-rail i.on{border-radius:14px;background:#5865f2;color:#fff}
.lb-rail hr{width:30px;border:0;border-top:2px solid #35363c;margin:2px 0}
.lb-main{flex:1;min-width:0;display:flex;flex-direction:column}
.lb-head{height:48px;flex:none;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid #26272b;box-shadow:0 1px 0 rgba(0,0,0,.2)}
.lb-head b{font-size:15px;color:#f2f3f5}.lb-head b::before{content:"# ";color:#80848e}
.lb-head span{font-size:13px;color:#949ba4;border-left:1px solid #3f4147;padding-left:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-msgs{flex:1;overflow-y:auto;padding:10px 0 6px}
.lb-msgs::-webkit-scrollbar{width:8px}.lb-msgs::-webkit-scrollbar-thumb{background:#1a1b1e;border-radius:4px}
.lb-day{display:flex;align-items:center;gap:8px;margin:6px 16px 10px;color:#949ba4;font-size:12px;font-weight:600}
.lb-day::before,.lb-day::after{content:"";flex:1;border-top:1px solid #3f4147}
.lb-m{display:flex;gap:14px;padding:4px 16px;animation:lbIn .25s ease}
@keyframes lbIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.lb-m:hover{background:#2e3035}
.lb-av{width:40px;height:40px;flex:none;border-radius:50%;overflow:hidden;background:#5865f2;display:grid;place-items:center;color:#fff;font-weight:700;margin-top:2px}
.lb-av img{width:100%;height:100%;object-fit:cover}
.lb-c{min-width:0;flex:1}
.lb-n{display:flex;align-items:center;gap:6px;font-size:15px;font-weight:600;color:#f2f3f5}
.lb-n small{font-size:11.5px;font-weight:500;color:#949ba4}
.lb-tag{font-size:10px;font-weight:700;background:#5865f2;color:#fff;padding:1px 5px;border-radius:4px;letter-spacing:.02em}
.lb-reply{font-size:13px;color:#949ba4;margin:0 0 2px 54px;padding:0 16px;display:flex;gap:6px;align-items:center}
.lb-reply b{color:#c4c9ce;font-weight:600}.lb-reply code{color:#00a8fc;font-family:inherit}
.lb-t{font-size:15px;line-height:1.375;color:#dbdee1;white-space:pre-wrap;word-break:break-word}
.lb-mention{background:rgba(88,101,242,.3);color:#c9cdfb;border-radius:3px;padding:0 2px;font-weight:500}
.lb-e{display:flex;margin-top:4px;max-width:520px;background:#2b2d31;border-radius:4px;border-left:4px solid var(--c);overflow:hidden}
.lb-ei{padding:10px 16px 14px 12px;min-width:0;flex:1;position:relative}
.lb-th{position:absolute;right:12px;top:12px;width:56px;height:56px;border-radius:6px;background:linear-gradient(135deg,#1e3a5f,#0e7c86);display:grid;place-items:center;font-size:24px}
.lb-et{font-size:15px;font-weight:700;color:#f2f3f5;margin:2px 0 6px}
.lb-ed{font-size:14px;line-height:1.4;color:#dbdee1;white-space:pre-wrap;margin-bottom:6px}
.lb-ef{display:grid;gap:8px;margin-top:6px}
.lb-ef .fn{display:block;font-size:13.5px;font-weight:700;color:#f2f3f5;margin-bottom:2px}
.lb-ef span{font-size:13.5px;color:#dbdee1;white-space:pre-wrap;word-break:break-word}
.lb-code{display:block;background:#1e1f22;border:1px solid #1a1b1e;border-radius:4px;padding:6px 9px;margin:2px 0;font-family:Consolas,ui-monospace,monospace;font-size:12.5px;line-height:1.35;color:#dbdee1;white-space:pre;overflow:hidden}
.lb-ic{font-family:Consolas,ui-monospace,monospace;font-size:12.5px;background:#1e1f22;padding:1px 4px;border-radius:3px}
.lb-link{color:#00a8fc}
.lb-foot{font-size:12px;color:#949ba4;margin-top:10px}
.lb-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;max-width:520px}
.lb-btns button{all:unset;box-sizing:border-box;padding:6px 14px;border-radius:4px;background:#4e5058;color:#fff;font-size:14px;font-weight:500;display:flex;gap:6px;align-items:center}
.lb-btns button:hover{background:#6d6f78}
.lb-btns button.on{background:#5865f2}
.lb-eph{font-size:12px;color:#949ba4;margin-top:4px}
.lb-in{padding:0 16px 14px;flex:none;position:relative}
.lb-box{display:flex;align-items:center;gap:10px;height:44px;border-radius:8px;background:#383a40;padding:0 14px}
.lb-box b{width:24px;height:24px;border-radius:50%;background:#b5bac1;color:#383a40;display:grid;place-items:center;font-size:18px;line-height:1;flex:none}
.lb-box input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#dbdee1;font:inherit;font-size:15px;user-select:text;-webkit-user-select:text}
.lb-box input::placeholder{color:#6d6f78}
.lb-ac{position:absolute;left:16px;right:16px;bottom:62px;background:#2b2d31;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-height:230px;overflow:auto;padding:6px 0;display:none}
.lb-ac.show{display:block}
.lb-ac div{display:flex;align-items:center;gap:10px;padding:7px 12px;font-size:14px}
.lb-ac div.on,.lb-ac div:hover{background:#35373c}
.lb-ac img{width:22px;height:22px;border-radius:50%}
.lb-ac b{color:#f2f3f5;font-weight:600}.lb-ac span{color:#949ba4;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 12px}
.lb-chips button{all:unset;padding:4px 10px;border-radius:99px;background:#2b2d31;border:1px solid #3f4147;font-size:12.5px;color:#dbdee1}
.lb-chips button:hover{background:#35373c;border-color:#5865f2}
`;
  function injectCss() {
    if (document.getElementById("lb-demo-css")) return;
    const st = document.createElement("style");
    st.id = "lb-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Tiny Discord markdown: ```text blocks```, `code`, **bold**, [text](url), @mentions.
  const md = (t) => esc(t)
    .replace(/```(?:text\n)?([\s\S]+?)```/g, (_, c) => '<span class="lb-code">' + c.replace(/\n$/, "") + "</span>")
    .replace(/`([^`\n]+)`/g, '<span class="lb-ic">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="lb-link">$1</span>')
    .replace(/@([a-z0-9_]+)/gi, '<span class="lb-mention">@$1</span>');
  const hex = (n) => "#" + n.toString(16).padStart(6, "0");
  const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
  // bot.py _code_block / _metric_table
  const cb = (t) => "```text\n" + t + "\n```";
  const table = (rows) => { const w = Math.max(...rows.map((r) => r[0].length)); return rows.map(([a, b]) => a.padEnd(w) + " : " + b).join("\n"); };
  const rgb = (r, g, b) => (r << 16) | (g << 8) | b;

  // ---- Made-up players -------------------------------------------------------------------
  const ME = { id: "Kingpin#TR1", tier: "Platinum II", color: rgb(65, 184, 163), lp: 47, w: 112, l: 98, lvl: 342 };
  const BOARD = [["kingpin", "Platinum II", "Kingpin#TR1"], ["luna", "Emerald IV", "Lunaris#TR1"], ["sineorbit", "Gold I", "SineOrbit#EUW"],
    ["malduhan", "Gold III", "Mald#TR1"], ["nova", "Silver I", "NovaKid#TR1"]];

  // ---- Panels (pages with buttons, as ProfilePanelView) ----------------------------------
  function profilePages() {
    return [
      ["🧬", "Özet", { title: "🧬 " + ME.id, color: ME.color, desc: "Seviye **" + ME.lvl + "**  •  Sunucu **TR1**", thumb: "🛡️", fields: [
        ["🥇 SoloQ", cb(table([["Lig", ME.tier], ["LP", String(ME.lp)], ["Kayıt", ME.w + "W " + ME.l + "L"], ["Win rate", "53%"]]))],
        ["📈 Son 20 maç", cb(table([["Kayıt", "12W 8L"], ["Win rate", "60%"], ["Seri", "3W"]]))],
        ["⭐ En yüksek ustalık", cb("1 Ahri       M7 412K")]], foot: "Detaylar için alttaki butonları kullan." }],
      ["🏆", "Lig", { title: "🏆 Lig & Form", color: ME.color, desc: "Rank ve son maç ivmesi.", fields: [
        ["🥇 SoloQ", cb(table([["Lig", ME.tier], ["LP", String(ME.lp)], ["Kayıt", ME.w + "W " + ME.l + "L"], ["Win rate", "53%"]]))],
        ["🧩 Flex", cb(table([["Lig", "Gold I"], ["LP", "12"], ["Kayıt", "31W 27L"], ["Win rate", "53%"]]))],
        ["📈 Son Form", cb(table([["Kayıt", "12W 8L"], ["Win rate", "60%"], ["Seri", "3W"]]))],
        ["Trend", cb("Yükseliş: 50% -> 70%")]] }],
      ["⚔️", "Performans", { title: "⚔️ Performans Özeti", color: rgb(94, 151, 246), desc: "KPI değerleri kategorilere ayrıldı.", fields: [
        ["⚔️ Savaş", cb(table([["KDA", "3.42"], ["KP", "61%"], ["Ölüm", "4.6/maç"]]))],
        ["💰 Ekonomi", cb(table([["CS/dk", "6.8"], ["GPM", "412"], ["Tempo", "Orta"]]))],
        ["👁️ Harita", cb(table([["Görüş/dk", "0.9"], ["Kontrol", "Güçlü"]]))]] }],
      ["⭐", "Şampiyonlar", { title: "⭐ Şampiyon Havuzu", color: rgb(236, 177, 69), desc: "Ustalık ve son seçimler.", fields: [
        ["Ustalık", cb("1 Ahri       M7 412K\n2 Lux        M7 301K\n3 Ezreal     M6 188K\n4 Jinx       M5 96K")],
        ["Son Seçimler", cb("Ahri            9 maç   67% WR  3.90 KDA\nLux             6 maç   50% WR  3.10 KDA\nEzreal          5 maç   60% WR  2.80 KDA")]] }],
      ["🧠", "Koç", { title: "🧠 Koç Notu", color: rgb(163, 113, 247), desc: cb("- 🔥 Son form güçlü; kazanma oranı 60%.\n- 🔥 3 maçlık galibiyet serisi var; momentum iyi.\n- ✅ Takım savaşına katılım yüksek; harita etkisi iyi görünüyor.") }],
    ];
  }
  function lastMatchPages() {
    const c = rgb(46, 204, 113);
    return [
      ["📋", "Özet", { title: "✅ Son Maç - " + ME.id, color: c, desc: "**Ahri** · Zafer · TR1_7391820455", fields: [
        ["Özet", cb(table([["Şampiyon", "Ahri"], ["KDA", "11/3/9"], ["Süre", "28.4 dk"], ["Sonuç", "Zafer"]]))]] }],
      ["🧰", "Build", { title: "🧰 Build - Ahri", color: c, fields: [
        ["Eşyalar", cb("Luden's Echo\nSorcerer's Shoes\nShadowflame\nZhonya's Hourglass")],
        ["Sihirdar Büyüleri", cb(table([["Spell 1", "4"], ["Spell 2", "14"]]))]] }],
      ["⚔️", "Hasar", { title: "⚔️ Hasar", color: c, fields: [
        ["Hasar Tablosu", cb(table([["Şampiyon hasarı", "28904"], ["Alınan hasar", "14230"], ["Objektif hasarı", "6112"], ["KP", "74%"]]))]] }],
      ["💰", "Ekonomi", { title: "💰 Ekonomi & Harita", color: c, fields: [
        ["Ekonomi", cb(table([["Gold", "13820"], ["GPM", "487"], ["CS", "212"], ["CS/dk", "7.5"]]))],
        ["Görüş", cb(table([["Görüş", "29"], ["Ward", "11"], ["Ward kırma", "5"], ["Pink", "3"]]))]] }],
      ["🧠", "Koç", { title: "🧠 Maç Koçu", color: c, desc: cb("- Farm temposu iyi; CS avantajı oyun planının güçlü tarafı.\n- Takım savaşına katılım yüksek; harita etkisi iyi görünüyor.") }],
    ];
  }
  function livePages() {
    return [
      ["🧭", "Takımlar", { title: "🔴 Canlı Maç - " + ME.id, color: rgb(0, 128, 128), desc: "Mod **CLASSIC** · Queue `420`", fields: [
        ["Mavi Takım", cb("Ahri       Platinum II    Kingpin   \nLee Sin    Emerald IV     Lunaris   \nOrnn       Gold I         SineOrbit \nJinx       Gold III       Mald      \nLulu       Silver I       NovaKid   ")],
        ["Kırmızı Takım", cb("Yone       Platinum I     Zephyr    \nViego      Platinum III   Wraith    \nAzir       Diamond IV     Mirage    \nKai'Sa     Emerald I      Helix     \nNautilus   Gold II        Anchor    ")]] }],
      ["⚠️", "Risk", { title: "⚠️ Tehlike Analizi", color: rgb(230, 126, 34), fields: [
        ["Risk Etiketleri", cb("Azir       main, sıcak seri, yüksek WR\nYone       main, yüksek WR\nViego      sıcak seri\nKai'Sa     temiz\nNautilus   temiz")]] }],
      ["🚫", "Ban", { title: "🚫 Ban Önerileri", color: rgb(231, 76, 60), desc: cb("1. Azir - Mirage (246K)\n2. Yone - Zephyr (188K)\n3. Viego - Wraith (74K)") }],
      ["📈", "Form", { title: "📈 Streak & Ustalık", color: rgb(88, 101, 242), fields: [
        ["Form", cb("Ahri       3W   WR 60%  Main 412K\nAzir       4W   WR 70%  Main 246K\nYone       2L   WR 45%  Main 188K\nViego      1W   WR 55%  Main 74K")]] }],
    ];
  }

  function Demo(root, L, IMG) {
    const USER = "kingpin";
    const s = { acI: 0 };
    root.innerHTML = `<div class="lb-rail"><i class="on"><img src="${IMG}Lolable.png" alt=""></i><hr><i>🎮</i><i>⚔️</i><i>+</i></div>
      <div class="lb-main"><div class="lb-head"><b>${L.channel}</b><span>${L.topic}</span></div><div class="lb-msgs"><div class="lb-day">${L.today}</div></div>
      <div class="lb-chips">${WORKS.map((c) => `<button data-run="/${c}">/${c}</button>`).join("")}</div>
      <div class="lb-in"><div class="lb-ac"></div><div class="lb-box"><b>+</b><input data-in placeholder="${L.ph}" autocomplete="off" spellcheck="false"></div></div></div>`;
    const msgs = root.querySelector(".lb-msgs"), input = root.querySelector("[data-in]"), ac = root.querySelector(".lb-ac");
    const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };

    function userMsg(text) {
      msgs.insertAdjacentHTML("beforeend", `<div class="lb-m"><div class="lb-av" style="background:#eb459e">K</div><div class="lb-c">
        <div class="lb-n">${USER} <small>${L.today} ${now()}</small></div><div class="lb-t">${md(text)}</div></div></div>`);
      scroll();
    }
    function embedHtml(e) {
      const fields = (e.fields || []).map(([n, v]) => `<div><span class="fn">${md(n)}</span><span>${md(v)}</span></div>`).join("");
      return `<div class="lb-e" style="--c:${hex(e.color)}"><div class="lb-ei">${e.thumb ? `<div class="lb-th">${e.thumb}</div>` : ""}${e.title ? `<div class="lb-et">${md(e.title)}</div>` : ""}
        ${e.desc ? `<div class="lb-ed">${md(e.desc)}</div>` : ""}${fields ? `<div class="lb-ef">${fields}</div>` : ""}${e.foot ? `<div class="lb-foot">${md(e.foot)}</div>` : ""}</div></div>`;
    }
    // Bot reply: "kingpin used /cmd" above it, optional page buttons that edit the embed in place.
    function botMsg({ cmd, text, embed, pages, ephemeral }) {
      const id = "m" + Math.random().toString(36).slice(2);
      const first = pages ? pages[0][2] : embed;
      msgs.insertAdjacentHTML("beforeend", `${cmd ? `<div class="lb-reply">↱ <b>${USER}</b> ${L.used} <code>/${esc(cmd)}</code></div>` : ""}
        <div class="lb-m" id="${id}"><div class="lb-av"><img src="${IMG}Lolable.png" alt=""></div><div class="lb-c">
        <div class="lb-n">Lolable <span class="lb-tag">✓ ${L.bot}</span> <small>${L.today} ${now()}</small></div>
        ${text ? `<div class="lb-t">${md(text)}</div>` : ""}<div data-embed>${first ? embedHtml(first) : ""}</div>
        ${pages ? `<div class="lb-btns">${pages.map(([em, label], i) => `<button class="${i ? "" : "on"}" data-page="${i}">${em} ${label}</button>`).join("")}</div>` : ""}
        ${ephemeral ? `<div class="lb-eph">👁 ${L.ephem}</div>` : ""}</div></div>`);
      if (pages) root.querySelector("#" + id).__pages = pages;
      scroll();
    }

    function helpEmbed() {
      return { title: "📖 Lolable Komutları", color: 0x5865F2, desc: "Tüm komutlar ve ne işe yaradıkları.",
        fields: HELP.map(([cat, usage, d]) => ["`" + usage + "`", d + " *(" + cat + ")*"]), foot: "/panel ile butonlu kontrol panelini açabilirsin." };
    }

    function run(raw) {
      const line = raw.trim();
      if (!line) return;
      if (!line.startsWith("/")) { userMsg(line); return; }
      userMsg(line);
      const [name, ...rest] = line.slice(1).split(/\s+/);
      setTimeout(() => respond(name.toLowerCase(), rest.join(" ")), 450 + Math.random() * 300);
    }
    function respond(c, arg) {
      if (c === "help") return botMsg({ cmd: "help", embed: helpEmbed() });
      if (c === "profil" || c === "me") return botMsg({ cmd: c, pages: profilePages() });
      if (c === "sonmac") return botMsg({ cmd: c, pages: lastMatchPages() });
      if (c === "live") return botMsg({ cmd: c, pages: livePages() });
      if (c === "bagla") return botMsg({ cmd: c, text: "✅ **" + ME.id + "** hesabına bağlandı. Rank: **" + ME.tier + "**", ephemeral: true });
      if (c === "compare") return botMsg({ cmd: c, embed: { title: "⚖️ Compare: " + ME.id + " vs Lunaris#TR1", color: 0x5865F2,
        desc: cb(["Metrik     Kingpin      Lunaris     ", "-".repeat(36), "Rank       Platinum II  Emerald IV  ", "LP Score   2247         2096        ", "Son WR     60%          55%         ", "KDA        3.42         2.87        ", "CS/dk      6.8          7.1         ", "GPM        412          398         ", "KP         61%          58%         ", "Ölüm       4.6          5.2         "].join("\n")),
        foot: "LP Score dahili sıralama puanıdır; doğrudan gerçek LP değildir." } });
      if (c === "gunluk") return botMsg({ cmd: c, embed: { title: "📅 Günlük Özet - " + ME.id, color: 0x008080, fields: [
        ["Genel", cb(table([["Kayıt", "4W 1L"], ["Win rate", "80%"], ["Seri", "4W"]]))],
        ["KPI", cb(table([["KDA", "4.10"], ["CS/dk", "7.2"], ["GPM", "431"], ["KP", "66%"], ["Görüş/dk", "1.0"]]))],
        ["En iyi maç", cb("Ahri 11/3/9 KDA 6.67")]] } });
      if (c === "championpool") return botMsg({ cmd: c, embed: { title: "⭐ Champion Pool - " + ME.id, color: 0xFFD700, fields: [
        ["Ustalık", cb("1 Ahri       M7 412K\n2 Lux        M7 301K\n3 Ezreal     M6 188K\n4 Jinx       M5 96K")],
        ["Son 20 ranked seçim", cb("Ahri            9 maç   67% WR  3.90 KDA\nLux             6 maç   50% WR  3.10 KDA\nEzreal          5 maç   60% WR  2.80 KDA")],
        ["Analiz", cb("- Havuz dengeli; ilk üç şampiyon maçların %100'ünü karşılıyor.\n- Ahri'ye bağımlılık orta düzeyde, ban riski var.")]] } });
      if (c === "leaderboard") return botMsg({ cmd: c, embed: { title: "Sunucu Liderlik Tablosu", color: 0xFFD700,
        desc: BOARD.map(([n, rank, id], i) => "`" + String(i + 1).padStart(2, "0") + "` **" + n + "** - " + rank + " (`" + id + "`)").join("\n") } });
      if (c === "duo") return botMsg({ cmd: c, ephemeral: true, embed: { title: "Duo Finder", color: 0x5865F2,
        desc: "@luna - Emerald IV (`Lunaris#TR1`)\n@sineorbit - Gold I (`SineOrbit#EUW`)\n@malduhan - Gold III (`Mald#TR1`)" } });
      const known = c in CMDS;
      return botMsg({ cmd: c, ephemeral: true, text: known ? `${L.only} ${WORKS.map((w) => "`/" + w + "`").join(" ")}` : `❌ /${c} ?` });
    }

    // Slash autocomplete.
    function updateAc() {
      const v = input.value;
      if (!v.startsWith("/") || v.includes(" ")) { ac.classList.remove("show"); return; }
      const q = v.slice(1).toLowerCase();
      const list = Object.keys(CMDS).filter((c) => c.startsWith(q)).sort((a, b) => (WORKS.includes(b) - WORKS.includes(a)) || a.localeCompare(b));
      if (!list.length) { ac.classList.remove("show"); return; }
      s.acI = Math.min(s.acI, list.length - 1);
      ac.innerHTML = list.map((c, i) => `<div class="${i === s.acI ? "on" : ""}" data-ac="${c}"><img src="${IMG}Lolable.png" alt=""><b>/${c}</b><span>${CMDS[c]}</span></div>`).join("");
      ac.classList.add("show");
    }
    function pick(c) { input.value = ""; ac.classList.remove("show"); run("/" + c); }

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
      const t = e.target.closest("[data-ac],[data-run],[data-page]");
      if (!t) return;
      if (t.dataset.ac) pick(t.dataset.ac);
      else if (t.dataset.run) run(t.dataset.run);
      else if (t.dataset.page !== undefined) {
        // Page buttons edit the embed in place and highlight the active one, like ProfilePanelView.
        const msg = t.closest(".lb-m"), pages = msg.__pages;
        msg.querySelector("[data-embed]").innerHTML = embedHtml(pages[+t.dataset.page][2]);
        msg.querySelectorAll("[data-page]").forEach((b) => b.classList.toggle("on", b === t));
      }
    });

    botMsg({ text: L.welcome });
  }

  window.LolableDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("lb-demo");
      Demo(root, T[opts.lang === "en" ? "en" : "tr"], opts.img || "/img/");
    },
  };
})();
