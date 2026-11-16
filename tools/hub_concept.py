"""Concept for the apps.kingpindev.com hub in the Notchify design system: apps.kingpindev.com/concept/ and /tr/concept/ (noindex).

    python tools/build_app_sites.py      # build_hub() calls build_concept() at the end

Hero, a live app switcher (pick an app, its real demo runs in the stage), stats band, filterable app grid, the Notchify flagship band and a
short "made by" section. Styles are in app-sites/v2.css (hub block) and the script is app-sites/hub.js. Not linked from the live hub yet.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "sites" / "apps"
ASSET_V = "20261116"
ORDER = ["mixora", "lunadock", "vicesonar", "vorganizer", "aurora", "spotidrop", "hotpad", "goliath", "lolable", "glidesnap"]

T = {
    "en": {
        "title": "Kingpindev apps: Windows apps and Discord bots (concept)",
        "desc": "Every Windows app and Discord bot by Kingpindev in one place. Pick one and run its live demo right here.",
        "eyebrow": "Kingpindev apps", "h1a": "Small apps that make", "h1b": "Windows feel better.",
        "lead": "Windows apps and Discord bots built by one developer. Pick one below and it runs right here, in your browser.",
        "browse": "Browse the apps", "flag_cta": "Meet Notchify", "skip": "Skip to content", "menu": "Menu", "home": "kingpindev.com",
        "try_e": "Try them live", "try_h": "Pick an app. It runs right here.", "try_s": "Every demo is the real interface or the real app model. Nothing on your computer is touched.",
        "all_e": "All apps", "all_h": "Seven Windows apps, two Discord bots.", "all_s": "Filter by kind, then open the one you like.",
        "f_all": "All", "f_win": "Windows apps", "f_bot": "Discord bots", "win": "Windows app", "bot": "Discord bot",
        "see": "See the app", "store": "Microsoft Store", "download": "Download", "add": "Add to Discord",
        "s1": "apps and bots", "s2": "with a live demo in the browser", "s3": "accounts to create", "s4": "ads",
        "flag_e": "Flagship", "flag_h": "The Dynamic Island for Windows.", "flag_p": "Music with synced lyrics, notifications, clipboard history, widgets, screen recording, Discord controls and more, in one island at the top of your screen. In 10 languages.",
        "made_e": "About", "made_h": "Made by one developer.", "made_p": "I am Burak Pekel, and I build small Windows apps and Discord bots in Türkiye. Everything here is made, tested and supported by me.",
        "made_cta": "More on kingpindev.com", "rating": "Rated {avg} on the Microsoft Store ({n})", "other": "tr", "other_label": "Türkçe",
        "demo_for": "Live demo of {}",
    },
    "tr": {
        "title": "Kingpindev uygulamaları: Windows uygulamaları ve Discord botları (konsept)",
        "desc": "Kingpindev'in tüm Windows uygulamaları ve Discord botları tek yerde. Birini seçin, canlı demosu burada çalışsın.",
        "eyebrow": "Kingpindev uygulamaları", "h1a": "Windows'u daha iyi yapan", "h1b": "küçük uygulamalar.",
        "lead": "Tek bir geliştiriciden Windows uygulamaları ve Discord botları. Aşağıdan birini seçin, tarayıcınızda burada çalışsın.",
        "browse": "Uygulamalara göz at", "flag_cta": "Notchify ile tanış", "skip": "İçeriğe geç", "menu": "Menü", "home": "kingpindev.com",
        "try_e": "Canlı deneyin", "try_h": "Bir uygulama seçin. Burada çalışsın.", "try_s": "Her demo gerçek arayüz ya da gerçek uygulama modelidir. Bilgisayarınızdaki hiçbir şeye dokunulmaz.",
        "all_e": "Tüm uygulamalar", "all_h": "Yedi Windows uygulaması, iki Discord botu.", "all_s": "Türe göre süzün, sonra beğendiğinizi açın.",
        "f_all": "Tümü", "f_win": "Windows uygulamaları", "f_bot": "Discord botları", "win": "Windows uygulaması", "bot": "Discord botu",
        "see": "Uygulamayı gör", "store": "Microsoft Store", "download": "İndir", "add": "Discord'a ekle",
        "s1": "uygulama ve bot", "s2": "tarayıcıda canlı demolu", "s3": "oluşturulacak hesap", "s4": "reklam",
        "flag_e": "Öne çıkan", "flag_h": "Windows için Dinamik Ada.", "flag_p": "Senkron sözlerle müzik, bildirimler, pano geçmişi, widget'lar, ekran kaydı, Discord kontrolleri ve daha fazlası, ekranınızın üstündeki tek bir adada. 10 dilde.",
        "made_e": "Hakkında", "made_h": "Tek bir geliştiriciden.", "made_p": "Ben Burak Pekel; Türkiye'de küçük Windows uygulamaları ve Discord botları geliştiriyorum. Buradaki her şey benim tarafımdan yapılır, test edilir ve desteklenir.",
        "made_cta": "kingpindev.com'da daha fazlası", "rating": "Microsoft Store'da {avg} puan ({n})", "other": "en", "other_label": "English",
        "demo_for": "{} canlı demosu",
    },
}
CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
BURGER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
e = lambda s: html.escape(str(s), quote=True)  # noqa: E731


def _rgb(h):
    h = h.lstrip("#")
    return ",".join(str(int(h[i:i + 2], 16)) for i in (0, 2, 4))


def _light(h, k):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
    return "#%02x%02x%02x" % tuple(round(v + (255 - v) * k) for v in c)


def base(lang):
    return "https://apps.kingpindev.com/" + ("tr/" if lang == "tr" else "") + "concept/"


def page(lang: str) -> str:
    import build_app_sites as B
    t = T[lang]
    other = t["other"]
    ratings = {}
    rf = ROOT / "tools" / "store_ratings.json"
    if rf.exists():
        ratings = json.loads(rf.read_text(encoding="utf-8"))
    apps = []
    for slug in ORDER:
        a = B.APPS[slug]
        c = a[lang]
        bot = a.get("os") == "Discord"
        cta = a.get("cta")
        if cta:
            cta_url, cta_label = cta["url"], (t["add"] if bot else t["download"])
        else:
            cta_url, cta_label = B.STORE.format(a["store"]), t["store"]
        apps.append({"slug": slug, "a": a, "c": c, "bot": bot, "site": B.url(slug, lang), "cta_url": cta_url, "cta_label": cta_label, "dl": bool(cta and cta.get("download"))})

    # ---- switcher tabs + stage data
    tabs, data = "", []
    for i, x in enumerate(apps):
        a, c = x["a"], x["c"]
        sel = i == 0
        r = ratings.get(x["slug"])
        rate = ""
        if r and r.get("count", 0) >= 4:
            avg = f"{r['avg']:.1f}".replace(".", ",") if lang == "tr" else f"{r['avg']:.1f}"
            rate = f'<span class="rate">{e(t["rating"].format(avg=avg, n=r["count"]))}</span>'
        tabs += (f'<button class="tab hubtab" role="tab" type="button" id="htab-{i}" aria-selected="{"true" if sel else "false"}" aria-controls="hubstage" tabindex="{0 if sel else -1}" '
                 f'style="--a1:{a["accent"]};--a2:{a["accent2"]};--rgb1:{_rgb(a["accent"])};--rgb2:{_rgb(a["accent2"])}">'
                 f'<span class="aic"><img src="{a["icon"]}" alt="" width="40" height="40"></span>'
                 f'<div><strong>{e(a["name"])}<em class="kind">{e(t["bot"] if x["bot"] else t["win"])}</em></strong>'
                 f'<div class="more"><div><p>{e(c["desc"])}</p>{rate}<div class="hlinks"><a class="hl" href="{x["site"]}">{e(t["see"])} {ARROW}</a>'
                 f'<a class="hl alt" href="{x["cta_url"]}"{" download" if x["dl"] else ""}>{e(x["cta_label"])}</a></div></div></div></div></button>')
        d = a["demo"]
        data.append({"slug": x["slug"], "name": a["name"], "kind": d["kind"], "src": d["src"], "api": d.get("api"), "opts": dict(d.get("opts", {}), **({"lang": lang} if d.get("lang") else {})),
                     "w": d.get("w"), "h": d.get("h"), "lang": d.get("lang"), "note": c["demo_note"], "accent": a["accent"], "accent2": a["accent2"], "rgb1": _rgb(a["accent"]), "rgb2": _rgb(a["accent2"])})
    # ---- grid
    cards = ""
    for x in apps:
        a, c = x["a"], x["c"]
        cards += (f'<article class="tile acard rv" data-type="{"bot" if x["bot"] else "win"}" style="--a1:{a["accent"]};--a2:{a["accent2"]};--rgb1:{_rgb(a["accent"])};--rgb2:{_rgb(a["accent2"])};--grad:linear-gradient(135deg,{a["accent"]},{a["accent2"]})">'
                  f'<div class="achead"><img src="{a["icon"]}" alt="" width="52" height="52" loading="lazy"><span class="chipk">{e(t["bot"] if x["bot"] else t["win"])}</span></div>'
                  f'<h3>{e(a["name"])}</h3><p class="tag1">{e(c["h1"])}</p><p>{e(c["desc"])}</p>'
                  f'<div class="hlinks"><a class="hl" href="{x["site"]}">{e(t["see"])} {ARROW}</a><a class="hl alt" href="{x["cta_url"]}"{" download" if x["dl"] else ""}>{e(x["cta_label"])}</a></div></article>')
    canon = base(lang)
    alt_en, alt_tr = base("en"), base("tr")
    home = "https://kingpindev.com/"
    ld = {"@context": "https://schema.org", "@type": "CollectionPage", "name": t["title"], "url": canon, "inLanguage": lang,
          "hasPart": [{"@type": "SoftwareApplication", "name": x["a"]["name"], "url": x["site"]} for x in apps]}
    stats = (f'<div class="stats rv"><div><b data-count="{len(apps) + 1}">{len(apps) + 1}</b><span>{e(t["s1"])}</span></div><div><b data-count="{len(apps)}">{len(apps)}</b><span>{e(t["s2"])}</span></div>'
             f'<div><b data-count="0">0</b><span>{e(t["s3"])}</span></div><div><b data-count="0">0</b><span>{e(t["s4"])}</span></div></div>')
    flag = (f'<div class="flagband rv"><div class="fb-copy"><div class="eyebrow">{e(t["flag_e"])}</div><h2>{e(t["flag_h"])}</h2><p class="sub">{e(t["flag_p"])}</p>'
            f'<div class="btns" style="justify-content:flex-start"><a class="btn btn-p" href="https://notchify.app/">{e(t["flag_cta"])} {ARROW}</a></div></div>'
            f'<img class="fb-ic" src="/img/notchify.png" alt="Notchify" width="180" height="180" loading="lazy"></div>')
    return f"""<!doctype html>
<html lang="{lang}" translate="no">
<head>
<meta charset="utf-8">
<meta name="google" content="notranslate">
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(t["title"])}</title>
<meta name="description" content="{e(t["desc"])}">
<link rel="canonical" href="{canon}">
<link rel="alternate" hreflang="en" href="{alt_en}">
<link rel="alternate" hreflang="tr" href="{alt_tr}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(t["title"])}">
<meta property="og:description" content="{e(t["desc"])}">
<meta name="theme-color" content="#000000">
<meta name="color-scheme" content="dark">
<link rel="icon" type="image/png" href="/img/kingpindev.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/app-sites/v2.css?v={ASSET_V}">
<style>:root{{--a1:#a78bfa;--a2:#38bdf8;--rgb1:167,139,250;--rgb2:56,189,248;--eb:#c4b5fd;--ebl:#ddd6fe}}</style>
<script>document.documentElement.className+=" js"</script>
<script src="/app-sites/v2.js?v={ASSET_V}" defer></script>
<script src="/app-sites/hub.js?v={ASSET_V}" defer></script>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body data-lang="{lang}" data-other="{base(other)}">
<a class="skip" href="#main">{e(t["skip"])}</a>
<header class="bar">
  <a class="brand" href="{base(lang)}"><img src="/img/kingpindev.png" alt="" width="30" height="30"><span>Kingpindev</span></a>
  <nav class="links glass" id="navlinks" aria-label="{e(t["menu"])}"><a href="#try">{e(t["try_e"])}</a><a href="#all">{e(t["all_e"])}</a><a href="https://notchify.app/">Notchify</a><a href="{home}">{e(t["home"])}</a></nav>
  <div class="right">
    <a class="lang-pill glass" href="{base(other)}" hreflang="{other}" lang="{other}" data-lang-switch="{other}">{t["other_label"]}</a>
    <button class="burger glass" id="burger" type="button" aria-expanded="false" aria-controls="navlinks" aria-label="{e(t["menu"])}">{BURGER}</button>
  </div>
</header>
<main id="main">
<header class="hero"><div class="wrap">
  <div class="chip rv"><b>{len(apps) + 1}</b>{e(t["eyebrow"])}</div>
  <h1>{e(t["h1a"])} <em>{e(t["h1b"])}</em></h1>
  <p class="lead">{e(t["lead"])}</p>
  <div class="btns"><a class="btn btn-p" href="#try">{e(t["browse"])}</a><a class="btn btn-g" href="https://notchify.app/">{e(t["flag_cta"])}</a></div>
  <div class="trust"><span>{CHECK}Windows 10 &amp; 11</span><span>{CHECK}Discord</span><span>{CHECK}EN &middot; TR</span></div>
</div></header>
<section id="try"><div class="wrap">
  <div class="center rv"><div class="eyebrow">{e(t["try_e"])}</div><h2>{e(t["try_h"])}</h2><p class="sub">{e(t["try_s"])}</p></div>
  <div class="fs rv" id="switcher" data-apps="{e(json.dumps(data, ensure_ascii=False))}" data-demo-for="{e(t["demo_for"])}">
    <div class="tabs" role="tablist" aria-orientation="vertical" aria-label="{e(t["try_e"])}">{tabs}</div>
    <div class="fs-stage" id="hubstage" role="tabpanel"><div class="stage-frame" id="hubframe"><div class="hubload" aria-live="polite"></div></div><p class="stage-note" id="hubnote"></p></div>
  </div>
</div></section>
<section><div class="wrap">{stats}</div></section>
<section id="all"><div class="wrap">
  <div class="center rv"><div class="eyebrow">{e(t["all_e"])}</div><h2>{e(t["all_h"])}</h2><p class="sub">{e(t["all_s"])}</p></div>
  <div class="hubfilter" role="group" aria-label="{e(t["all_s"])}"><button type="button" class="chipb on" data-f="all">{e(t["f_all"])}</button><button type="button" class="chipb" data-f="win">{e(t["f_win"])}</button><button type="button" class="chipb" data-f="bot">{e(t["f_bot"])}</button></div>
  <div class="hubgrid">{cards}</div>
</div></section>
<section><div class="wrap">{flag}</div></section>
<section><div class="wrap"><div class="final rv"><div class="eyebrow">{e(t["made_e"])}</div><h2>{e(t["made_h"])}</h2><p>{e(t["made_p"])}</p>
  <div class="btns"><a class="btn btn-p" href="{home}">{e(t["made_cta"])} {ARROW}</a></div></div></div></section>
</main>
<div class="word" aria-hidden="true">kingpindev</div>
<footer><div class="wrap"><span>&copy; Kingpindev</span><nav><a href="#try">{e(t["try_e"])}</a><a href="#all">{e(t["all_e"])}</a><a href="https://notchify.app/">Notchify</a><a href="{home}">{e(t["home"])}</a></nav></div></footer>
</body>
</html>
"""


def build_concept() -> None:
    nl = chr(10)
    for lang in ("en", "tr"):
        d = OUT / ("tr" if lang == "tr" else "") / "concept"
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(page(lang), encoding="utf-8", newline=nl)
    print("built apps hub concept")
