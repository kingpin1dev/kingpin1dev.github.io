/* BokMail live demo for kingpindev.com.
   A working copy of bokmails.com's sign-in card, inbox and mail view (templates/index.html,
   inbox.html, email.html and the TR/EN strings from translations.py). Nothing is sent to
   the real service: the address is never created and the mails are made up.
   Mount with BokMailDemo.mount(el, { lang: "tr" | "en" }). */
(function () {
  "use strict";

  const T = {
    tr: { tag: "Şifre yok · Doğrulama yok · Anında hazır", h1a: "Spam'e karşı", h1b: "kalkanın.", card: "E-posta adresinizi seçin",
      ph: "kullaniciadi", btn: "Giriş Yap / Hesap Oluştur →", note: "Hesap otomatik oluşturulur — hiçbir şey gerekmez.",
      badge: "✦ Ücretsiz & Anonim", inbox: "Gelen Kutusu", unread: "okunmamış", refresh: "↻ Yenile", empty: "Henüz hiç mail yok.",
      emptySub: "Bu adrese gönderilen mailler burada görünecek.", login: "Giriş", logout: "Çıkış", back: "← Geri", del: "Sil",
      from: "Gönderen", to: "Alıcı", date: "Tarih", plain: "Düz Metin", copied: "Adres kopyalandı!", copyTip: "Kopyalamak için tıkla",
      hint: "Bir kullanıcı adı yazıp giriş yap; birkaç saniye içinde örnek mailler gelir." },
    en: { tag: "No password · No verification · Instant", h1a: "Your shield", h1b: "against spam.", card: "Choose your email address",
      ph: "username", btn: "Login / Create Account →", note: "Account created automatically — nothing required.",
      badge: "✦ Free & Anonymous", inbox: "Inbox", unread: "unread", refresh: "↻ Refresh", empty: "No emails yet.",
      emptySub: "Emails sent to this address will appear here.", login: "Logged in as", logout: "Logout", back: "← Back", del: "Delete",
      from: "From", to: "To", date: "Date", plain: "Plain Text", copied: "Address copied!", copyTip: "Click to copy",
      hint: "Type a username and sign in; sample mails arrive within seconds." },
  };
  // Made-up senders; they arrive one after another once the inbox is open.
  const MAILS = {
    tr: [
      { from: "no-reply@pixelforge.gg", subject: "Hesabını doğrula", brand: "PixelForge", color: "#6366f1",
        title: "Hesabını doğrula", text: "PixelForge'a hoş geldin! Hesabını doğrulamak için bu kodu kullan:", code: "482 913", foot: "Bu kodu sen istemediysen bu maili yok sayabilirsin." },
      { from: "hello@shopnest.io", subject: "Hoş geldin! İlk siparişine %10 indirim", brand: "ShopNest", color: "#f59e0b",
        title: "Aramıza hoş geldin 🎉", text: "Bültenimize kaydoldun. İlk siparişinde geçerli indirim kodun:", code: "WELCOME10", foot: "Bültenden istediğin zaman çıkabilirsin." },
      { from: "security@cloudnote.app", subject: "Giriş kodun: 739204", brand: "CloudNote", color: "#10b981",
        title: "Giriş kodun", text: "Yeni bir cihazdan giriş yapılıyor. Devam etmek için kodu gir:", code: "739 204", foot: "Kod 10 dakika geçerlidir." },
    ],
    en: [
      { from: "no-reply@pixelforge.gg", subject: "Verify your account", brand: "PixelForge", color: "#6366f1",
        title: "Verify your account", text: "Welcome to PixelForge! Use this code to verify your account:", code: "482 913", foot: "If you didn't ask for this code, you can ignore this email." },
      { from: "hello@shopnest.io", subject: "Welcome! 10% off your first order", brand: "ShopNest", color: "#f59e0b",
        title: "Welcome aboard 🎉", text: "You're on our newsletter. Here's a code for your first order:", code: "WELCOME10", foot: "You can unsubscribe at any time." },
      { from: "security@cloudnote.app", subject: "Your sign-in code: 739204", brand: "CloudNote", color: "#10b981",
        title: "Your sign-in code", text: "Someone is signing in from a new device. Enter this code to continue:", code: "739 204", foot: "The code is valid for 10 minutes." },
    ],
  };

  const CSS = `
.bm-demo{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#0d0d0d;color:#e8e8e8;
  font-family:'Segoe UI',system-ui,sans-serif;user-select:none;-webkit-user-select:none}
.bm-demo *{box-sizing:border-box}
html:has(#cur) .bm-demo *{cursor:none!important}
.bm-chrome{display:flex;align-items:center;gap:10px;height:38px;padding:0 14px;background:#161616;border-bottom:1px solid #262626}
.bm-dots{display:flex;gap:6px}.bm-dots i{width:10px;height:10px;border-radius:50%;background:#3a3a3a}
.bm-url{flex:1;max-width:360px;margin:0 auto;height:24px;border-radius:8px;background:#0d0d0d;border:1px solid #262626;display:flex;align-items:center;gap:6px;padding:0 10px;font-size:12px;color:#9a9a9a}
.bm-url b{color:#e8e8e8;font-weight:500}
.bm-view{height:460px;overflow:auto;position:relative}
.bm-view::-webkit-scrollbar{width:6px}.bm-view::-webkit-scrollbar-thumb{background:#2e2e2e;border-radius:3px}
/* landing (index.html) */
.bm-land{min-height:100%;background:#080810;font-family:Inter,system-ui,sans-serif;position:relative}
.bm-land::before{content:"";position:absolute;top:-160px;left:50%;transform:translateX(-50%);width:600px;height:420px;background:radial-gradient(ellipse,#7c3aed22 0%,transparent 70%);pointer-events:none}
.bm-lnav{position:relative;display:flex;align-items:center;gap:12px;height:50px;padding:0 22px;border-bottom:1px solid #ffffff0f}
.bm-logo{font-size:1.1rem;font-weight:800;background:linear-gradient(135deg,#a78bfa,#7c3aed);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.bm-nb{font-size:.68rem;background:#7c3aed22;border:1px solid #7c3aed44;color:#a78bfa;padding:3px 10px;border-radius:999px}
.bm-hero{position:relative;text-align:center;padding:30px 20px 18px}
.bm-tag{display:inline-flex;align-items:center;gap:6px;background:#7c3aed15;border:1px solid #7c3aed30;border-radius:999px;padding:5px 14px;font-size:.72rem;color:#a78bfa;margin-bottom:16px}
.bm-tag i{width:6px;height:6px;background:#7c3aed;border-radius:50%;animation:bmPulse 2s infinite}
@keyframes bmPulse{0%,100%{opacity:1}50%{opacity:.3}}
.bm-hero h3{margin:0;font-size:2.1rem;font-weight:900;line-height:1.1;letter-spacing:-.03em;color:#e8e8f0}
.bm-grad{background:linear-gradient(135deg,#a78bfa 0%,#7c3aed 50%,#5b21b6 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.bm-card{position:relative;max-width:400px;margin:0 auto 20px;background:linear-gradient(135deg,#1a1a2e,#16162a);border:1px solid #ffffff12;border-radius:18px;padding:24px;box-shadow:0 24px 60px #00000060,0 0 0 1px #7c3aed10}
.bm-card h4{margin:0 0 14px;font-size:.92rem;font-weight:600;color:#ccc}
.bm-row{display:flex;background:#0d0d1a;border:1px solid #2e2e50;border-radius:12px;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.bm-row:focus-within{border-color:#7c3aed;box-shadow:0 0 0 3px #7c3aed18}
.bm-row input{flex:1;min-width:0;background:transparent;border:0;color:#e8e8f0;font:inherit;font-size:.95rem;padding:12px 14px;outline:0;user-select:text;-webkit-user-select:text}
.bm-row input::placeholder{color:#555570}
.bm-dom{display:flex;align-items:center;padding:0 14px;color:#7c3aed;font-size:.9rem;font-weight:500;border-left:1px solid #2e2e50;background:#7c3aed08;white-space:nowrap}
.bm-go{all:unset;display:block;width:100%;margin-top:10px;text-align:center;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border-radius:12px;padding:12px;font-size:.95rem;font-weight:600;transition:opacity .2s,transform .1s}
.bm-go:hover{opacity:.9;transform:translateY(-1px)}
.bm-note{text-align:center;font-size:.74rem;color:#555570;margin-top:12px}
.bm-hint{text-align:center;font-size:.75rem;color:#6d6d8a;padding:0 20px 18px}
/* inbox + mail (base.html) */
.bm-nav{display:flex;align-items:center;gap:12px;height:50px;padding:0 18px;background:#1a1a1a;border-bottom:1px solid #2e2e2e;position:sticky;top:0;z-index:2}
.bm-nav .bm-logo2{font-size:1.15rem;font-weight:800;color:#7c3aed;letter-spacing:-.5px}
.bm-sp{flex:1}
.bm-user{font-size:.78rem;color:#888;background:#242424;border:1px solid #2e2e2e;border-radius:20px;padding:4px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px}
.bm-user span{color:#e8e8e8;font-weight:600}
.bm-btn{all:unset;display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:.84rem;font-weight:600;background:#242424;border:1px solid #2e2e2e;color:#e8e8e8;transition:background .15s}
.bm-btn:hover{background:#2e2e2e}
.bm-btn.danger{background:#dc2626;border-color:#dc2626;color:#fff}.bm-btn.danger:hover{background:#b91c1c}
.bm-main{padding:20px 20px 30px;max-width:760px;margin:0 auto}
.bm-ih{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}
.bm-ih b{font-size:1.25rem;font-weight:700}
.bm-addr{font-size:.84rem;background:#242424;border:1px solid #2e2e2e;border-radius:20px;padding:4px 12px;color:#7c3aed;font-weight:600}
.bm-badge{background:#7c3aed;color:#fff;font-size:.72rem;font-weight:700;border-radius:20px;padding:2px 9px}
.bm-list{display:flex;flex-direction:column;gap:8px}
.bm-item{display:flex;align-items:center;gap:14px;background:#1a1a1a;border:1px solid #2e2e2e;border-radius:10px;padding:13px 16px;transition:background .12s,border-color .12s;animation:bmIn .35s ease}
@keyframes bmIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.bm-item:hover{background:#242424;border-color:#7c3aed}
.bm-item.unread{background:#7c3aed22;border-color:#7c3aed55}
.bm-av{width:38px;height:38px;flex:none;border-radius:50%;display:grid;place-items:center;background:#242424;border:1px solid #2e2e2e;color:#7c3aed;font-weight:700;text-transform:uppercase}
.bm-meta{flex:1;min-width:0}
.bm-meta b,.bm-meta span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bm-meta b{font-size:.86rem;font-weight:600}
.bm-meta span{font-size:.84rem;color:#888;margin-top:2px}
.bm-item.unread .bm-meta span{color:#e8e8e8}
.bm-time{font-size:.76rem;color:#888;white-space:nowrap}
.bm-dot{width:8px;height:8px;border-radius:50%;background:#7c3aed;flex:none}
.bm-empty{text-align:center;padding:56px 20px;color:#888}
.bm-empty div{font-size:2.6rem;margin-bottom:12px}
.bm-empty b{display:block;color:#e8e8e8;font-size:1.1rem;margin-bottom:6px}
.bm-wait{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:.78rem;color:#a78bfa}
.bm-wait i{width:12px;height:12px;border:2px solid #7c3aed55;border-top-color:#a78bfa;border-radius:50%;animation:bmSpin .8s linear infinite}
@keyframes bmSpin{to{transform:rotate(360deg)}}
.bm-acts{display:flex;gap:10px;margin-bottom:16px}
.bm-mh{background:#1a1a1a;border:1px solid #2e2e2e;border-radius:12px;padding:18px 22px;margin-bottom:16px}
.bm-mh h5{margin:0 0 12px;font-size:1.2rem;font-weight:700;line-height:1.3}
.bm-mr{display:flex;gap:12px;font-size:.84rem;margin-top:5px}
.bm-mr span:first-child{color:#888;min-width:70px}
.bm-tabs{display:flex;gap:4px;margin-bottom:12px;background:#242424;border:1px solid #2e2e2e;border-radius:8px;padding:4px;width:fit-content}
.bm-tab{all:unset;padding:5px 14px;border-radius:6px;font-size:.82rem;font-weight:600;color:#888}
.bm-tab.on{background:#7c3aed;color:#fff}
.bm-body{background:#1a1a1a;border:1px solid #2e2e2e;border-radius:12px;padding:16px}
.bm-html{background:#fff;color:#1f2937;border-radius:8px;padding:22px 20px;font-family:Arial,Helvetica,sans-serif}
.bm-html .brand{font-weight:800;font-size:18px;margin-bottom:14px}
.bm-html h6{margin:0 0 8px;font-size:17px;color:#111827}
.bm-html p{margin:0 0 14px;font-size:14px;line-height:1.55;color:#374151}
.bm-html .code{display:inline-block;font:700 24px/1 ui-monospace,Consolas,monospace;letter-spacing:3px;padding:12px 18px;border-radius:8px;background:#f3f4f6;margin-bottom:14px;color:#111827}
.bm-html small{font-size:12px;color:#9ca3af}
.bm-text{white-space:pre-wrap;font-size:.9rem;line-height:1.7}
.bm-toast{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);background:#7c3aed;color:#fff;padding:8px 20px;border-radius:8px;font-size:.86rem;font-weight:600;opacity:0;transition:opacity .2s;pointer-events:none}
.bm-toast.show{opacity:1}
`;
  function injectCss() {
    if (document.getElementById("bm-demo-css")) return;
    const st = document.createElement("style");
    st.id = "bm-demo-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const stamp = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0") +
    " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");

  function Demo(root, L, mails) {
    const s = { view: "land", user: "", inbox: [], open: null, tab: "html", next: 0, timers: [] };
    root.innerHTML = `<div class="bm-chrome"><div class="bm-dots"><i></i><i></i><i></i></div><div class="bm-url">🔒 <b>bokmails.com</b><span data-path></span></div></div>
      <div class="bm-view"></div><div class="bm-toast">${L.copied}</div>`;
    const view = root.querySelector(".bm-view"), path = root.querySelector("[data-path]"), toast = root.querySelector(".bm-toast");
    const addr = () => `${s.user}@bokmails.com`;
    const nav = () => `<div class="bm-nav"><span class="bm-logo2">BokMail</span><span class="bm-sp"></span>
      <span class="bm-user">${L.login}: <span>${esc(addr())}</span></span><button class="bm-btn" data-act="logout">${L.logout}</button></div>`;

    function clearTimers() { s.timers.forEach(clearTimeout); s.timers = []; }
    // The next sample mail lands a few seconds after the last one, while the inbox is open.
    function schedule() {
      if (s.next >= mails.length) return;
      s.timers.push(setTimeout(() => {
        if (s.view === "land") return;
        s.inbox.unshift({ ...mails[s.next], id: s.next, read: false, at: stamp(new Date()) });
        s.next++;
        if (s.view === "inbox") render();
        schedule();
      }, s.next === 0 ? 2200 : 5500));
    }

    function render() {
      if (s.view === "land") {
        path.textContent = "";
        view.innerHTML = `<div class="bm-land"><div class="bm-lnav"><span class="bm-logo">BokMail</span><span class="bm-nb">${L.badge}</span></div>
          <div class="bm-hero"><div class="bm-tag"><i></i>${L.tag}</div><h3>${L.h1a}<br><span class="bm-grad">${L.h1b}</span></h3></div>
          <div class="bm-card"><h4>${L.card}</h4><form data-form><div class="bm-row"><input data-name maxlength="24" placeholder="${L.ph}" autocomplete="off" spellcheck="false"><div class="bm-dom">@bokmails.com</div></div>
          <button type="submit" class="bm-go">${L.btn}</button></form><div class="bm-note">${L.note}</div></div><div class="bm-hint">${L.hint}</div></div>`;
        return;
      }
      if (s.view === "inbox") {
        path.textContent = "/inbox";
        const unread = s.inbox.filter((m) => !m.read).length;
        const list = s.inbox.length
          ? `<div class="bm-list">${s.inbox.map((m) => `<div class="bm-item ${m.read ? "" : "unread"}" data-mail="${m.id}"><div class="bm-av">${esc(m.from[0])}</div>
              <div class="bm-meta"><b>${esc(m.from)}</b><span>${esc(m.subject)}</span></div><span class="bm-time">${m.at}</span>${m.read ? "" : '<i class="bm-dot"></i>'}</div>`).join("")}</div>`
          : `<div class="bm-empty"><div>📭</div><b>${L.empty}</b>${L.emptySub}<br><span class="bm-wait"><i></i></span></div>`;
        view.innerHTML = `${nav()}<div class="bm-main"><div class="bm-ih"><b>${L.inbox}</b><span class="bm-addr" data-act="copy" title="${L.copyTip}">${esc(addr())}</span>
          ${unread ? `<span class="bm-badge">${unread} ${L.unread}</span>` : ""}<span class="bm-sp"></span><button class="bm-btn" data-act="refresh">${L.refresh}</button></div>${list}</div>`;
        return;
      }
      const m = s.inbox.find((x) => x.id === s.open);
      path.textContent = `/mail/${m.id + 1}`;
      const html = `<div class="bm-html"><div class="brand" style="color:${m.color}">${m.brand}</div><h6>${esc(m.title)}</h6><p>${esc(m.text)}</p><div class="code">${m.code}</div><br><small>${esc(m.foot)}</small></div>`;
      const text = `${m.title}\n\n${m.text}\n\n${m.code}\n\n${m.foot}`;
      view.innerHTML = `${nav()}<div class="bm-main"><div class="bm-acts"><button class="bm-btn" data-act="back">${L.back}</button><button class="bm-btn danger" data-act="delete">🗑 ${L.del}</button></div>
        <div class="bm-mh"><h5>${esc(m.subject)}</h5><div class="bm-mr"><span>${L.from}</span><span>${esc(m.from)}</span></div>
        <div class="bm-mr"><span>${L.to}</span><span>${esc(addr())}</span></div><div class="bm-mr"><span>${L.date}</span><span>${m.at}</span></div></div>
        <div class="bm-tabs"><button class="bm-tab ${s.tab === "html" ? "on" : ""}" data-tab="html">HTML</button><button class="bm-tab ${s.tab === "text" ? "on" : ""}" data-tab="text">${L.plain}</button></div>
        <div class="bm-body">${s.tab === "html" ? html : `<div class="bm-text">${esc(text)}</div>`}</div></div>`;
    }

    root.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = (root.querySelector("[data-name]").value || "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 24);
      s.user = v || "kingpin" + Math.floor(100 + Math.random() * 900);
      s.view = "inbox"; s.inbox = []; s.next = 0;
      clearTimers(); render(); schedule();
    });
    root.addEventListener("click", (e) => {
      const t = e.target.closest("[data-act],[data-mail],[data-tab]");
      if (!t) return;
      const d = t.dataset;
      if (d.mail !== undefined) { s.open = +d.mail; s.tab = "html"; s.inbox.find((m) => m.id === s.open).read = true; s.view = "mail"; render(); view.scrollTop = 0; }
      else if (d.tab) { s.tab = d.tab; render(); }
      else if (d.act === "back") { s.view = "inbox"; render(); }
      else if (d.act === "delete") { s.inbox = s.inbox.filter((m) => m.id !== s.open); s.view = "inbox"; render(); }
      else if (d.act === "refresh") render();
      else if (d.act === "logout") { clearTimers(); s.view = "land"; render(); }
      else if (d.act === "copy") {
        try { navigator.clipboard.writeText(addr()); } catch (err) { /* not allowed here; the toast still shows */ }
        toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1800);
      }
    });
    render();
  }

  window.BokMailDemo = {
    mount(root, opts = {}) {
      if (root.__mounted) return;
      root.__mounted = true;
      injectCss();
      root.classList.add("bm-demo");
      const lang = opts.lang === "en" ? "en" : "tr";
      Demo(root, T[lang], MAILS[lang]);
    },
  };
})();
