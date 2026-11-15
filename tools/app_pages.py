"""Side pages for the <slug>.kingpindev.com app sites: FAQ, changelog, press kit, privacy and compare (English and Turkish).

    python tools/build_app_sites.py        # builds the home pages and calls build_sub_pages() for the slugs listed in SLUGS

Content lives in app_pages_data_<slug>.py. Press-kit images are prepared once by tools/prep_press.py into img/press/<slug>/.
Pages share the stylesheet and script in app-sites/. The header and footer of the home pages pick up the links through hooks().
"""
from __future__ import annotations

import html
import importlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "sites"
SLUGS = ("mixora", "lunadock")
KINDS = ("faq", "changelog", "compare", "press", "privacy")
LASTMOD = "2026-11-15"

SUBUI = {
    "en": {
        "faq": "FAQ", "changelog": "Changelog", "compare": "Compare", "press": "Press kit", "privacy": "Privacy", "home": "Home", "more_q": "All questions",
        "demo": "Demo", "features": "Features", "menu": "Pages",
        "h1": {"faq": "Frequently asked questions", "changelog": "What's new in {}", "compare": "{} compared", "press": "{} press kit", "privacy": "{} privacy policy"},
        "lead": {"faq": "Straight answers about {}: setup, how it works, privacy and support.",
                 "changelog": "Every release of {}, newest first. Updates arrive automatically through the Microsoft Store.",
                 "compare": "An honest look at how {} fits next to the alternatives people ask about.",
                 "press": "Logos, screenshots, descriptions and facts for writing about {}.",
                 "privacy": "What {} does and does not do with your information."},
        "title": {"faq": "{} FAQ: questions and answers", "changelog": "{} changelog: release notes and version history", "compare": "{} compared with the alternatives",
                  "press": "{} press kit: logos, screenshots and facts", "privacy": "{} privacy policy"},
        "desc": {"faq": "Answers to the most common questions about {}: what it does, which Windows it needs, how it handles your data and how to get help.",
                 "changelog": "Release notes for every version of {}, newest first, from the first Store release to today.",
                 "compare": "How {} compares with the tools people ask about, with where each one is the better pick.",
                 "press": "Download the {} logo and screenshots, copy ready-made descriptions and find the facts and contact for press and reviewers.",
                 "privacy": "The {} privacy policy: no account, no analytics, no tracking. Everything stays on your device."},
        "get": "Get it from Microsoft Store", "contact": "Contact", "questions_none": "Still have a question?", "write_us": "Write to us at",
        "shines": "Where it shines", "differs": "Where {} differs", "pick": "Pick it if", "tag": "Version", "released": "Released",
        "onel": "One line", "shortd": "Short description", "longd": "Full description", "copy": "Copy", "copied": "Copied", "facts": "Key facts",
        "assets": "Downloads", "logo": "Logo", "logo_note": "PNG with transparent background", "icon": "App icon", "shots": "Screenshots", "zip": "Download everything (ZIP)",
        "download": "Download", "notes": "Notes for writers", "updated": "Last updated", "toc": "On this page", "back": "Back to {}",
    },
    "tr": {
        "faq": "SSS", "changelog": "Sürümler", "compare": "Karşılaştırma", "press": "Basın kiti", "privacy": "Gizlilik", "home": "Ana sayfa", "more_q": "Tüm sorular",
        "demo": "Demo", "features": "Özellikler", "menu": "Sayfalar",
        "h1": {"faq": "Sık sorulan sorular", "changelog": "{}: yenilikler", "compare": "{} karşılaştırması", "press": "{} basın kiti", "privacy": "{} gizlilik politikası"},
        "lead": {"faq": "{} hakkında net yanıtlar: kurulum, nasıl çalıştığı, gizlilik ve destek.",
                 "changelog": "{} için çıkan her sürüm, en yenisi üstte. Güncellemeler Microsoft Store üzerinden otomatik gelir.",
                 "compare": "{} uygulamasının, en çok sorulan alternatiflerin yanında nerede durduğuna dürüst bir bakış.",
                 "press": "{} hakkında yazmak için logolar, ekran görüntüleri, açıklamalar ve bilgiler.",
                 "privacy": "{} bilgilerinizle neyi yapar, neyi yapmaz."},
        "title": {"faq": "{} SSS: sorular ve yanıtlar", "changelog": "{} sürüm geçmişi ve sürüm notları", "compare": "{} alternatifleriyle karşılaştırma",
                  "press": "{} basın kiti: logolar, ekran görüntüleri ve bilgiler", "privacy": "{} gizlilik politikası"},
        "desc": {"faq": "{} hakkında en sık sorulan sorulara yanıtlar: ne yaptığı, hangi Windows'u istediği, verilerinizi nasıl ele aldığı ve nasıl yardım alınacağı.",
                 "changelog": "{} için her sürümün notları, ilk Store sürümünden bugüne, en yenisi üstte.",
                 "compare": "{} uygulamasının sorulan araçlarla karşılaştırması ve her birinin daha iyi bir seçim olduğu durumlar.",
                 "press": "{} logosunu ve ekran görüntülerini indirin, hazır açıklamaları kopyalayın; basın ve inceleyiciler için bilgi ve iletişim.",
                 "privacy": "{} gizlilik politikası: hesap, analiz ya da takip yok. Her şey cihazınızda kalır."},
        "get": "Microsoft Store'dan edinin", "contact": "İletişim", "questions_none": "Başka bir sorunuz mu var?", "write_us": "Bize yazın:",
        "shines": "Güçlü olduğu yer", "differs": "{} nerede farklı", "pick": "Şu durumda seçin", "tag": "Sürüm", "released": "Yayın",
        "onel": "Tek cümle", "shortd": "Kısa açıklama", "longd": "Tam açıklama", "copy": "Kopyala", "copied": "Kopyalandı", "facts": "Önemli bilgiler",
        "assets": "İndirmeler", "logo": "Logo", "logo_note": "Saydam arka planlı PNG", "icon": "Uygulama ikonu", "shots": "Ekran görüntüleri", "zip": "Hepsini indirin (ZIP)",
        "download": "İndir", "notes": "Yazarlar için notlar", "updated": "Son güncelleme", "toc": "Bu sayfada", "back": "{} sayfasına dön",
    },
}
MONTHS = {"2026-11-15": ("15 November 2026", "15 Kasım 2026")}


def _b():
    return importlib.import_module("build_app_sites")


def e(text) -> str:
    return html.escape(str(text), quote=True)


def data(slug: str, lang: str) -> dict:
    return importlib.import_module(f"app_pages_data_{slug}").DATA[lang]


def base(slug: str, lang: str) -> str:
    return f"https://{slug}.kingpindev.com/" + ("tr/" if lang == "tr" else "")


def sub_url(slug: str, lang: str, kind: str) -> str:
    return base(slug, lang) + kind + "/"


def sub_path(lang: str, kind: str) -> str:
    return ("/tr/" if lang == "tr" else "/") + kind + "/"


def hooks(slug: str, lang: str):
    """Header/footer pieces for the home page of an app that has side pages (None otherwise)."""
    if slug not in SLUGS:
        return None
    s = SUBUI[lang]
    home = "/tr/" if lang == "tr" else "/"
    links = (f'<a href="#demo">{s["demo"]}</a><a href="#features">{s["features"]}</a><a href="{sub_path(lang, "faq")}">{s["faq"]}</a>'
             f'<a href="{sub_path(lang, "changelog")}">{s["changelog"]}</a><a href="{sub_path(lang, "compare")}">{s["compare"]}</a><a href="{sub_path(lang, "press")}">{s["press"]}</a>')
    return {"links": links, "strip": strip(slug, lang, None), "privacy_url": sub_url(slug, lang, "privacy"),
            "faq_more": f'<p class="more-q"><a href="{sub_path(lang, "faq")}">{s["more_q"]} &rarr;</a></p>', "home": home}


def strip(slug: str, lang: str, current):
    """Mobile page strip (the header links are hidden on phones)."""
    s = SUBUI[lang]
    home = "/tr/" if lang == "tr" else "/"
    items = [("home", home, s["home"])] + [(k, sub_path(lang, k), s[k]) for k in ("faq", "changelog", "compare", "press", "privacy")]
    return ('<nav class="strip" aria-label="%s"><div class="wrap">%s</div></nav>'
            % (e(s["menu"]), "".join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if k == current else "", e(t)) for k, h, t in items)))


def shell(slug: str, app: dict, lang: str, kind: str, title: str, desc: str, body: str, ld: list) -> str:
    B = _b()
    u = B.UI[lang]
    s = SUBUI[lang]
    other = "en" if lang == "tr" else "tr"
    store = B.STORE.format(app["store"])
    canon, alt_en, alt_tr = sub_url(slug, lang, kind), sub_url(slug, "en", kind), sub_url(slug, "tr", kind)
    home = base(slug, lang)
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": app["name"], "item": home}, {"@type": "ListItem", "position": 2, "name": s[kind], "item": canon}]}
    ld = [crumbs] + ld
    ld_html = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)
    links = (f'<a href="{home}#demo">{s["demo"]}</a><a href="{home}#features">{s["features"]}</a>'
             + "".join('<a href="%s"%s>%s</a>' % (sub_path(lang, k), ' aria-current="page"' if k == kind else "", s[k]) for k in ("faq", "changelog", "compare", "press")))
    footer_links = " · ".join('<a href="%s">%s</a>' % (sub_path(lang, k), s[k]) for k in KINDS)
    return f"""<!doctype html>
<html lang="{lang}" translate="no">
<head>
<meta charset="utf-8">
<meta name="google" content="notranslate">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{canon}">
<link rel="alternate" hreflang="en" href="{alt_en}">
<link rel="alternate" hreflang="tr" href="{alt_tr}">
<link rel="alternate" hreflang="x-default" href="{alt_en}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kingpindev">
<meta property="og:locale" content="{'tr_TR' if lang == 'tr' else 'en_US'}">
<meta property="og:url" content="{canon}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="https://{slug}.kingpindev.com/img/og-{slug}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#070a12">
<link rel="icon" type="image/png" href="{app["icon"]}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/app-sites/site.css">
<script src="/app-sites/site.js" defer></script>
{ld_html}
<style>:root{{--accent:{app["accent"]};--accent2:{app["accent2"]}}}</style>
</head>
<body data-lang="{lang}" data-other="{sub_url(slug, other, kind)}" data-copied="{e(s["copied"])}">
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="{home}"><img src="{app["icon"]}" alt="" width="32" height="32"><span>{e(app["name"])}</span></a>
    <nav class="links">{links}</nav>
    <a class="lang" href="{sub_url(slug, other, kind)}" hreflang="{other}" lang="{other}" data-lang-switch="{other}">{u["other_label"]}</a>
    <a class="btn btn-sm" href="{store}">{B.WIN_LOGO}<span>{u["store_short"]}</span></a>
  </div>
</header>
{strip(slug, lang, kind)}
<main>
{body}
</main>
<footer class="foot">
  <div class="wrap">{u["by"]} <a href="https://kingpindev.com/">Kingpindev</a> · <a href="{home}">{e(app["name"])}</a> · {footer_links}</div>
</footer>
</body>
</html>
"""


def hero(app, lang, kind, extra=""):
    s = SUBUI[lang]
    name = app["name"]
    return (f'<section class="hero sub-hero"><div class="wrap"><p class="eyebrow">{e(name)}</p><h1>{e(s["h1"][kind].format(name))}</h1>'
            f'<p class="lead">{e(s["lead"][kind].format(name))}</p>{extra}</div></section>')


def cta(slug, app, lang, text=None):
    B = _b()
    s = SUBUI[lang]
    store = B.STORE.format(app["store"])
    mail = data(slug, lang)["press"]["facts"][-1][1]
    return (f'<section class="final"><div class="wrap"><img src="{app["icon"]}" alt="" width="72" height="72" loading="lazy">'
            f'<h2>{e(B.UI[lang]["cta_title"].format(app["name"]))}</h2><p>{e(text or B.UI[lang]["cta_text"])} {s["write_us"]} <a href="mailto:{mail}">{mail}</a></p>'
            f'<a class="btn" href="{store}">{B.WIN_LOGO}<span>{s["get"]}</span></a></div></section>')


def faq_page(slug, app, lang):
    d = data(slug, lang)["faq"]
    s = SUBUI[lang]
    toc = "".join(f'<a href="#g{i}">{e(g)}</a>' for i, (g, _) in enumerate(d))
    groups, qa = "", []
    for i, (g, items) in enumerate(d):
        det = "".join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in items)
        groups += f'<section class="faq fgroup" id="g{i}"><div class="wrap"><h2>{e(g)}</h2>{det}</div></section>'
        qa += [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]
    ld = [{"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang, "mainEntity": qa}]
    body = hero(app, lang, "faq", f'<nav class="chips" aria-label="{e(s["toc"])}">{toc}</nav>') + groups + cta(slug, app, lang, s["questions_none"])
    return body, ld


def changelog_page(slug, app, lang):
    d = data(slug, lang)["changelog"]
    s = SUBUI[lang]
    rows = ""
    for ver, date, headline, items in d:
        rid = "v" + ver.replace(" ", "").replace(".", "-")
        lis = "".join(f"<li>{e(x)}</li>" for x in items)
        rows += (f'<article class="rel" id="{rid}"><div class="rel-side"><span class="ver">{e(ver)}</span><time>{e(date)}</time></div>'
                 f'<div class="rel-main"><h2>{e(headline)}</h2><ul>{lis}</ul></div></article>')
    body = hero(app, lang, "changelog") + f'<section class="rels"><div class="wrap">{rows}</div></section>' + cta(slug, app, lang)
    return body, []


def privacy_page(slug, app, lang):
    D = data(slug, lang)
    s = SUBUI[lang]
    meta = D.get("privacy_meta") or (f'Effective date: {MONTHS[LASTMOD][0]}' if lang == "en" else f'Yürürlük tarihi: {MONTHS[LASTMOD][1]}')
    secs = ""
    for h, paras in D["privacy"]:
        if h in ("Summary", "Özet"):
            inner = "<ul>" + "".join(f"<li>{e(p)}</li>" for p in paras) + "</ul>"
        else:
            inner = "".join(f"<p>{e(p)}</p>" for p in paras)
        secs += f"<h2>{e(h)}</h2>{inner}"
    mail = D["press"]["facts"][-1][1]
    contact = {"en": ("Contact", f"If you have any questions about this policy, contact us at"), "tr": ("İletişim", "Bu politika hakkında sorularınız varsa bize şu adresten ulaşın:")}[lang]
    body = (hero(app, lang, "privacy") + f'<section class="prose"><div class="wrap"><p class="meta">{e(meta)} · {e("Publisher: Kingpindev" if lang == "en" else "Yayıncı: Kingpindev")}</p>{secs}'
            f'<h2>{contact[0]}</h2><p>{e(contact[1])} <a href="mailto:{mail}">{mail}</a>.</p></div></section>')
    return body, []


def compare_page(slug, app, lang):
    D = data(slug, lang)["compare"]
    s = SUBUI[lang]
    cards = ""
    for name, tag, shines, differs, pick in D["items"]:
        cards += (f'<article class="cmp"><h2>{e(name)}</h2><p class="tag">{e(tag)}</p>'
                  f'<h3>{e(s["shines"])}</h3><p>{e(shines)}</p><h3>{e(s["differs"].format(app["name"]))}</h3><p>{e(differs)}</p>'
                  f'<h3>{e(s["pick"])}</h3><p>{e(pick)}</p></article>')
    body = (hero(app, lang, "compare") + f'<section class="cmps"><div class="wrap"><p class="intro">{e(D["intro"])}</p><div class="cmp-grid">{cards}</div>'
            f'<p class="note">{e(D["foot"])}</p></div></section>' + cta(slug, app, lang))
    return body, []


def press_page(slug, app, lang):
    D = data(slug, lang)["press"]
    s = SUBUI[lang]
    name = app["name"]
    facts = "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in D["facts"])
    blocks = ""
    for i, (label, key) in enumerate(((s["onel"], "oneliner"), (s["shortd"], "short"), (s["longd"], "long"))):
        blocks += (f'<div class="copyblock"><div class="cb-head"><h3>{e(label)}</h3><button type="button" class="btn btn-ghost btn-sm" data-copy="cp{i}">{e(s["copy"])}</button></div>'
                   f'<p id="cp{i}">{e(D[key])}</p></div>')
    folder = f"/img/press/{slug}/"
    prefix = "tr-" if (slug == "mixora" and lang == "tr") else ""
    shots = "".join(f'<figure class="shot"><a href="{folder}{prefix}{f}.jpg" download><img src="{folder}{prefix}{f}-thumb.jpg" alt="{e(cap)}" width="480" height="270" loading="lazy"></a>'
                    f'<figcaption>{e(cap)} <a href="{folder}{prefix}{f}.jpg" download>{e(s["download"])}</a></figcaption></figure>' for f, cap in D["shots"])
    notes = "".join(f"<li>{e(n)}</li>" for n in D["notes"])
    body = (hero(app, lang, "press")
            + f'<section class="pk"><div class="wrap"><h2>{e(s["facts"])}</h2><dl class="kdl">{facts}</dl></div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["onel"])} / {e(s["shortd"])} / {e(s["longd"])}</h2>{blocks}</div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["assets"])}</h2><div class="logos">'
              f'<a class="logo-card" href="{folder}{slug}-logo.png" download><img src="{folder}{slug}-logo-thumb.png" alt="{e(name)}" width="160" height="160" loading="lazy"><span><b>{e(s["logo"])}</b><small>{e(s["logo_note"])}</small></span></a>'
              f'<a class="logo-card" href="{folder}{slug}-icon-256.png" download><img src="{folder}{slug}-icon-256.png" alt="" width="96" height="96" loading="lazy"><span><b>{e(s["icon"])}</b><small>PNG 256 × 256</small></span></a>'
              f'<a class="btn" href="{folder}{slug}-press-kit.zip" download>{e(s["zip"])}</a></div>'
              f'<h3 class="sub-h">{e(s["shots"])}</h3><div class="shots">{shots}</div></div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["notes"])}</h2><ul class="notes">{notes}</ul></div></section>'
            + cta(slug, app, lang))
    return body, []


BUILDERS = {"faq": faq_page, "changelog": changelog_page, "compare": compare_page, "press": press_page, "privacy": privacy_page}


def build_sub_pages(slug: str, app: dict) -> list[str]:
    """Writes the side pages of one app (both languages). Returns the list of URL paths for the sitemap."""
    paths = []
    for lang in ("en", "tr"):
        s = SUBUI[lang]
        for kind in KINDS:
            body, ld = BUILDERS[kind](slug, app, lang)
            name = app["name"]
            title, desc = s["title"][kind].format(name), s["desc"][kind].format(name)
            assert 25 <= len(desc) <= 175, (slug, lang, kind, len(desc))
            d = OUT / slug / ("tr" if lang == "tr" else "") / kind
            d.mkdir(parents=True, exist_ok=True)
            (d / "index.html").write_text(shell(slug, app, lang, kind, title, desc, body, ld), encoding="utf-8", newline="\n")
            paths.append((kind, lang))
    return paths
