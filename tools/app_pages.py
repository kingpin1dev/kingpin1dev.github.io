"""Home and side pages for the redesigned <slug>.kingpindev.com app sites (Mixora, LunaDock): English and Turkish.

    python tools/build_app_sites.py        # builds every app site; the slugs in SLUGS get the redesigned pages from here

Home page: hero with the live demo, stats band, how it works, screenshot gallery, feature bento, details, comparison teaser, FAQ, call to action.
Side pages: FAQ, changelog, compare, press kit, privacy. The look is the Notchify site's design system (app-sites/v2.css + v2.js) with each app's own
accent colours. Content lives in app_pages_data_<slug>.py (side pages, home extras) and in APPS in build_app_sites.py (home copy).
Press-kit images are prepared by tools/prep_press.py into img/press/<slug>/.
"""
from __future__ import annotations

import html
import importlib
import json
import re
from pathlib import Path

from skins import SKINS, order_of, layout_attrs, build_css as build_skin_css

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "sites"
SLUGS = ("mixora", "lunadock", "vicesonar", "vorganizer", "aurora", "spotidrop", "hotpad", "goliath", "lolable", "glidesnap")
KINDS = ("faq", "changelog", "compare", "press", "privacy")
LASTMOD = "2026-11-16"
MIN_RATINGS = 4      # a Store rating line is shown only from this many ratings on (see tools/fetch_store_ratings.py)
ASSET_V = "20261120-skins2"

SUBUI = {
    "en": {
        "faq": "FAQ", "changelog": "Changelog", "compare": "Compare", "press": "Press kit", "privacy": "Privacy", "home": "Home", "more_q": "All questions",
        "demo": "Demo", "features": "Features", "skip": "Skip to content", "menu": "Menu", "get_short": "Get it",
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
        "yes": "Yes", "no": "Not confirmed", "rated": "Rated {avg} on the Microsoft Store ({n} ratings)", "get": "Get it from Microsoft Store", "questions_none": "Still have a question?", "write_us": "Write to us at",
        "shines": "Where it shines", "differs": "Where {} differs", "pick": "Pick it if", "how": "How it works", "feat": "Features", "details": "Details",
        "faq_title": "Questions", "onel": "One line", "shortd": "Short description", "longd": "Full description", "copy": "Copy", "copied": "Copied", "facts": "Key facts",
        "assets": "Downloads", "logo": "Logo", "logo_note": "PNG with transparent background", "icon": "App icon", "shots": "Screenshots", "zip": "Download everything (ZIP)",
        "download": "Download", "notes": "Notes for writers", "toc": "On this page", "all_compare": "Read the full comparison", "pause": "Pause", "play": "Play",
        "more_apps": "More apps by Kingpindev", "more_apps_sub": "Small tools, made by one developer.", "try": "Try the live demo", "all_apps": "All apps",
        "cta_t": "Ready to try {}?", "cta_p": "Get it from the Microsoft Store and set it up in a minute.", "by": "A Windows app by", "gallery_h": "Screenshots",
    },
    "tr": {
        "faq": "SSS", "changelog": "Sürümler", "compare": "Karşılaştırma", "press": "Basın kiti", "privacy": "Gizlilik", "home": "Ana sayfa", "more_q": "Tüm sorular",
        "demo": "Demo", "features": "Özellikler", "skip": "İçeriğe geç", "menu": "Menü", "get_short": "Edinin",
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
        "yes": "Evet", "no": "Doğrulanmadı", "rated": "Microsoft Store'da {avg} puan ({n} değerlendirme)", "get": "Microsoft Store'dan edinin", "questions_none": "Başka bir sorunuz mu var?", "write_us": "Bize yazın:",
        "shines": "Güçlü olduğu yer", "differs": "{} nerede farklı", "pick": "Şu durumda seçin", "how": "Nasıl çalışır", "feat": "Özellikler", "details": "Ayrıntılar",
        "faq_title": "Sık sorulanlar", "onel": "Tek cümle", "shortd": "Kısa açıklama", "longd": "Tam açıklama", "copy": "Kopyala", "copied": "Kopyalandı", "facts": "Önemli bilgiler",
        "assets": "İndirmeler", "logo": "Logo", "logo_note": "Saydam arka planlı PNG", "icon": "Uygulama ikonu", "shots": "Ekran görüntüleri", "zip": "Hepsini indirin (ZIP)",
        "download": "İndir", "notes": "Yazarlar için notlar", "toc": "Bu sayfada", "all_compare": "Karşılaştırmanın tamamını okuyun", "pause": "Duraklat", "play": "Oynat",
        "more_apps": "Kingpindev'in diğer uygulamaları", "more_apps_sub": "Tek bir geliştiriciden küçük araçlar.", "try": "Canlı demoyu deneyin", "all_apps": "Tüm uygulamalar",
        "cta_t": "{} denemeye hazır mısınız?", "cta_p": "Microsoft Store'dan indirin, bir dakikada kurun.", "by": "Bir Kingpindev Windows uygulaması:", "gallery_h": "Ekran görüntüleri",
    },
}
LANGNAME = {"en": "English", "tr": "Türkçe"}
MONTHS = {"2026-11-16": ("16 November 2026", "16 Kasım 2026")}
PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
BURGER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
PAUSE_IC = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'


def cta_of(app: dict, lang: str) -> dict:
    """Primary call to action: the Microsoft Store page, or the app's own link (Discord invite, installer download)."""
    B = _b()
    c = app.get("cta")
    if c:
        return {"url": c["url"], "label": c[lang], "short": c[lang + "_short"], "text": c.get(lang + "_text"), "logo": "" if c.get("nologo") else B.WIN_LOGO, "dl": " download" if c.get("download") else ""}
    return {"url": B.STORE.format(app["store"]), "label": SUBUI[lang]["get"], "short": SUBUI[lang]["get_short"], "text": None, "logo": B.WIN_LOGO, "dl": ""}


def _b():
    return importlib.import_module("build_app_sites")


def e(text) -> str:
    return html.escape(str(text), quote=True)


def data(slug: str, lang: str) -> dict:
    return importlib.import_module(f"app_pages_data_{slug}").DATA[lang]


def home_data(slug: str, lang: str) -> dict:
    return importlib.import_module(f"app_pages_data_{slug}").HOME[lang]


def base(slug: str, lang: str) -> str:
    return f"https://{slug}.kingpindev.com/" + ("tr/" if lang == "tr" else "")


def sub_url(slug: str, lang: str, kind: str) -> str:
    return base(slug, lang) + kind + "/"


def sub_path(lang: str, kind: str) -> str:
    return ("/tr/" if lang == "tr" else "/") + kind + "/"


def _rgb(hex_color: str) -> str:
    h = hex_color.lstrip("#")
    return ",".join(str(int(h[i:i + 2], 16)) for i in (0, 2, 4))


def _light(hex_color: str, k: float) -> str:
    h = hex_color.lstrip("#")
    c = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
    return "#%02x%02x%02x" % tuple(round(v + (255 - v) * k) for v in c)


def _theme(app: dict) -> str:
    a1, a2 = app["accent"], app["accent2"]
    return (f":root{{--a1:{a1};--a2:{a2};--rgb1:{_rgb(a1)};--rgb2:{_rgb(a2)};--eb:{_light(a1, .25)};--ebl:{_light(a1, .55)}}}")


def _links(slug: str, lang: str, current=None) -> str:
    s = SUBUI[lang]
    home = "/tr/" if lang == "tr" else "/"
    items = [(home + "#demo", s["demo"], None), (home + "#features", s["features"], None)] + [(sub_path(lang, k), s[k], k) for k in ("compare", "faq", "changelog", "press")]
    return "".join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if k and k == current else "", e(t)) for h, t, k in items)


def shell(slug: str, app: dict, lang: str, kind: str, title: str, desc: str, body: str, ld: list, canon: str, alt_en: str, alt_tr: str, other_url: str) -> str:
    B = _b()
    s = SUBUI[lang]
    other = "en" if lang == "tr" else "tr"
    ci = cta_of(app, lang)
    home = base(slug, lang)
    ld_html = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)
    footer_links = "".join('<a href="%s">%s</a>' % (sub_path(lang, k), s[k]) for k in KINDS)
    sk = SKINS.get(slug, {})
    if sk:
        fonts_head = ""
        skin_link = (f'\n<link rel="stylesheet" href="/app-sites/layouts.css?v={ASSET_V}">'
                     f'\n<link rel="stylesheet" href="/app-sites/skins/{slug}.css?v={ASSET_V}">')
    else:
        fonts_head = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
                      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">\n')
        skin_link = ""
    out = f"""<!doctype html>
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
<meta name="theme-color" content="{sk.get("theme", "#000000")}">
<meta name="color-scheme" content="{sk.get("scheme", "dark")}">
<link rel="icon" type="image/png" href="{app["icon"]}">
{fonts_head}<link rel="stylesheet" href="/app-sites/v2.css?v={ASSET_V}">
<style>{_theme(app)}</style>{skin_link}
<script>document.documentElement.className+=" js"</script>
<script src="/app-sites/v2.js?v={ASSET_V}" defer></script>
{ld_html}
</head>
<body class="sk-{slug}" {layout_attrs(slug) if slug in SKINS else ""} data-kind="{kind}" data-lang="{lang}" data-other="{other_url}" data-copied="{e(s["copied"])}">
<a class="skip" href="#main">{e(s["skip"])}</a>
<header class="bar">
  <a class="brand" href="{home}"><img src="{app["icon"]}" alt="" width="30" height="30"><span>{e(app["name"])}</span></a>
  <nav class="links glass" id="navlinks" aria-label="{e(s["menu"])}">{_links(slug, lang, kind if kind != "home" else None)}</nav>
  <div class="right">
    <a class="lang-pill glass" href="{other_url}" hreflang="{other}" lang="{other}" data-lang-switch="{other}">{LANGNAME[other]}</a>
    <a class="cta-sm" href="{ci["url"]}"{ci["dl"]}>{e(ci["short"])}</a>
    <button class="burger glass" id="burger" type="button" aria-expanded="false" aria-controls="navlinks" aria-label="{e(s["menu"])}">{BURGER}</button>
  </div>
</header>
<main id="main">
{body}
</main>
{footer(slug, app, lang, footer_links)}
</body>
</html>
"""
    return tr_brands(out) if (lang == "tr" and slug in SKINS) else out


# English brand names inside Turkish text: some skins set text-transform:uppercase, and Turkish casing turns "Mixora" into "MİXORA".
_BRAND_RE = re.compile(r"\b(Microsoft|Windows|Discord|Spotify|SteelSeries|Riot|Mixora|Radios|SpotiDrop|GlideSnap|Kingpindev|Interception|Notchify|BokMail|vOrganizer|Premium|Explorer|Hotpad|Lolable)\b")


def tr_brands(doc: str) -> str:
    head, sep, rest = doc.partition("<body")
    out, skip = [], None
    for part in re.split(r"(<[^>]*>)", sep + rest):
        if part.startswith("<"):
            m = re.match(r"<(/?)(script|style|title)\b", part, re.I)
            if m:
                skip = None if m.group(1) else m.group(2).lower()
            out.append(part)
        elif skip is None:
            out.append(_BRAND_RE.sub(lambda m: '<span lang="en">' + m.group(1) + "</span>", part))
        else:
            out.append(part)
    return head + "".join(out)



def footer(slug, app, lang, footer_links) -> str:
    s = SUBUI[lang]
    home = base(slug, lang)
    return (f'<div class="word" aria-hidden="true">{e(app["name"])}</div>'
            f'<footer><div class="wrap"><span>{e(app.get("by", {}).get(lang, s["by"]))} <a href="https://kingpindev.com/" style="display:inline;min-height:0;text-decoration:underline">Kingpindev</a></span>'
            f'<nav><a href="{home}">{e(s["home"])}</a>{footer_links}<a href="https://kingpindev.com/#projects">{e(s["all_apps"])}</a></nav></div></footer>')


def matrix_html(slug: str, lang: str) -> str:
    """Notchify-style comparison: a feature table (tick = confirmed in the tool's own documentation, dash = not found) and a bar per tool."""
    mod = importlib.import_module(f"app_pages_data_{slug}")
    M = getattr(mod, "MATRIX", None)
    if not M:
        return ""
    m = M[lang]
    s = SUBUI[lang]
    cols, rows = m["cols"], m["rows"]
    head = '<th class="f"></th>' + "".join(f'<th class="{"us" if i == 0 else ""}">{e(n)}<small>{e(sub)}</small></th>' for i, (n, sub) in enumerate(cols))
    body = ""
    for label, vals in rows:
        cells = ""
        for i, v in enumerate(vals):
            inner = (f'<span class="y">{CHECK}<span class="sr">{e(s["yes"])}</span></span>' if v
                     else f'<span class="n dash" aria-hidden="true">&mdash;</span><span class="sr">{e(s["no"])}</span>')
            cells += f'<td class="{"us" if i == 0 else ""}">{inner}</td>'
        body += f'<tr><td class="f">{e(label)}</td>{cells}</tr>'
    counts = [sum(r[1][i] for r in rows) for i in range(len(cols))]
    bars = "".join('<div class="bar-row%s"><span>%s</span><div class="meter"><i style="--w:%d%%"></i></div><b>%d</b></div>'
                   % (" us" if i == 0 else "", e(n), round(100 * counts[i] / len(rows)), counts[i]) for i, (n, _) in enumerate(cols))
    return (f'<div class="cmp-wrap rv"><table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></div>'
            f'<p class="legend">{e(m["legend"])} {e(m["checked"])}</p>'
            f'<div class="cmp-bars rv"><h3>{e(m["bars"])} ({len(rows)})</h3><div class="bars">{bars}</div></div>')


def rating_span(slug: str, lang: str) -> str:
    """Real Microsoft Store rating (tools/store_ratings.json), only when there are enough ratings to mean something."""
    f = ROOT / "tools" / "store_ratings.json"
    if not f.exists():
        return ""
    r = json.loads(f.read_text(encoding="utf-8")).get(slug)
    if not r or r["count"] < MIN_RATINGS:
        return ""
    avg = f"{r['avg']:.1f}".replace(".", ",") if lang == "tr" else f"{r['avg']:.1f}"
    return f'<span class="rate"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z"/></svg>{e(SUBUI[lang]["rated"].format(avg=avg, n=r["count"]))}</span>'


def sec_head(eyebrow: str, h2: str, sub: str = "") -> str:
    return (f'<div class="center rv"><div class="eyebrow">{e(eyebrow)}</div><h2>{e(h2)}</h2>' + (f'<p class="sub">{e(sub)}</p>' if sub else "") + "</div>")


def final_cta(slug, app, lang, text=None) -> str:
    B = _b()
    s = SUBUI[lang]
    ci = cta_of(app, lang)
    mail = data(slug, lang)["press"]["facts"][-1][1]
    paths = "".join('<path d="M-20 %d C 200 %d, 380 %d, 640 %d S 1000 %d, 1240 %d"/>' % (40 + i * 26, 10 + i * 30, 120 + i * 18, 60 + i * 24, 150 - i * 10, 70 + i * 20) for i in range(9))
    return (f'<section><div class="wrap"><div class="final rv"><svg class="paths" viewBox="0 0 1240 300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="pg" x1="0" x2="1">'
            f'<stop offset="0" stop-color="var(--a1)" stop-opacity="0"/><stop offset=".5" stop-color="var(--a1)"/><stop offset="1" stop-color="var(--a2)" stop-opacity="0"/></linearGradient></defs>{paths}</svg>'
            f'<h2>{e(s["cta_t"].format(app["name"]))}</h2><p>{e(text or ci["text"] or s["cta_p"])} {e(s["write_us"])} <a href="mailto:{mail}">{mail}</a></p>'
            f'<div class="btns"><a class="btn btn-p" href="{ci["url"]}"{ci["dl"]}>{ci["logo"]}<span>{e(ci["label"])}</span></a></div></div></div></section>')


def apps_row(slug, lang) -> str:
    B = _b()
    s = SUBUI[lang]
    chips = "".join(f'<a class="app-chip" href="{B.url(sl, lang)}"><img src="{ic}" alt="" width="38" height="38" loading="lazy"><span>{e(n)}</span></a>' for sl, n, ic in B.OTHER_APPS if sl != slug)
    chips += '<a class="app-chip" href="https://notchify.app/"><img src="/img/notchify.png" alt="" width="38" height="38" loading="lazy"><span>Notchify</span></a>'
    chips += '<a class="app-chip" href="https://bokmails.com/"><img src="/img/BokMail.png" alt="" width="38" height="38" loading="lazy"><span>BokMail</span></a>'
    return f'<section><div class="wrap">{sec_head("Kingpindev", s["more_apps"], s["more_apps_sub"])}<div class="apps-row rv">{chips}</div></div></section>'


# ---------------------------------------------------------------- home
def home_page(slug: str, app: dict, lang: str) -> str:
    B = _b()
    c, s, hd = app[lang], SUBUI[lang], home_data(slug, lang)
    D = data(slug, lang)
    ci = cta_of(app, lang)
    canon, alt_en, alt_tr = base(slug, lang), base(slug, "en"), base(slug, "tr")
    other_url = base(slug, "en" if lang == "tr" else "tr")
    assert 25 <= len(c["desc"]) <= 160, (slug, lang, len(c["desc"]))
    h1 = e(c["h1"])
    assert hd["emph"] in c["h1"], (slug, lang, hd["emph"])
    h1 = h1.replace(e(hd["emph"]), "<em>" + e(hd["emph"]) + "</em>", 1)
    demo = app["demo"]
    if demo["kind"] == "script":
        opts = dict(demo["opts"])
        if demo.get("lang"):
            opts["lang"] = lang
        demo_html = (f'<div class="demo-box demo-script" data-api="{demo["api"]}" data-opts="{e(json.dumps(opts))}"></div><script src="{demo["src"]}" defer></script>')
    else:
        src = demo["src"] + (("&" if "?" in demo["src"] else "?") + "lang=" + lang if demo.get("lang") else "")
        demo_html = (f'<div class="demo-box demo-frame" data-w="{demo["w"]}" data-h="{demo["h"]}"><iframe src="{e(src)}" width="{demo["w"]}" height="{demo["h"]}" title="{e(app["name"])} demo" loading="lazy"></iframe></div>')
    trust = rating_span(slug, lang) + "".join(f"<span>{CHECK}{e(f)}</span>" for f in c["facts"])
    badge, chip_text = hd["chip"]
    hero = (f'<header class="hero"><div class="wrap"><div class="chip rv"><b>{e(badge)}</b>{e(chip_text)}</div><h1>{h1}</h1><p class="lead">{e(c["lead"])}</p>'
            f'<div class="btns"><a class="btn btn-p" href="{ci["url"]}"{ci["dl"]}>{ci["logo"]}<span>{e(ci["label"])}</span></a><a class="btn btn-g" href="#demo">{e(s["try"])}</a></div>'
            f'<div class="trust">{trust}</div>'
            f'<div class="stage" id="demo"><div class="stage-frame">{demo_html}</div><p class="stage-note">{e(c["demo_note"])}</p></div></div></header>')
    stats = "".join(f'<div><b data-count="{n}" data-suffix="{suf}">{n}{suf}</b><span>{e(lbl)}</span></div>' for n, suf, lbl in hd["stats"])
    stats_sec = f'<section><div class="wrap"><div class="stats rv">{stats}</div></div></section>'
    # how it works: a scroll story. Each step puts a live demo (its own instance, mounted when it comes near the screen) into the scene of the step.
    mod = importlib.import_module(f"app_pages_data_{slug}")
    story_map = getattr(mod, "STORY", [0, 1, 2])
    story_steps = "".join(f'<div class="sstep2" tabindex="0"><div class="num">{n}</div><h3>{e(t_)}</h3><p>{e(d_)}</p></div>' for n, (t_, d_) in enumerate(c["steps"], 1))
    if demo["kind"] == "script":
        o3 = dict(demo["opts"])
        if demo.get("lang"):
            o3["lang"] = lang
        demo3 = f'<div class="demo-box demo-script" data-lazy data-api="{demo["api"]}" data-opts="{e(json.dumps(o3))}"></div>'
    else:
        s3 = demo["src"] + (("&" if "?" in demo["src"] else "?") + "lang=" + lang if demo.get("lang") else "")
        demo3 = (f'<div class="demo-box demo-frame" data-w="{demo["w"]}" data-h="{demo["h"]}"><iframe src="{e(s3)}" width="{demo["w"]}" height="{demo["h"]}" title="{e(app["name"])} demo" loading="lazy"></iframe></div>')
    story_scenes = importlib.import_module(f"app_pages_data_{slug}").SCENES
    how = (f'<section id="how"><div class="wrap">{sec_head(app["name"], c["steps_title"])}<div class="story2" id="story" data-kind="{demo["kind"]}" data-map="{e(json.dumps(story_map))}" data-scenes="{e(json.dumps(story_scenes))}">'
           f'<div class="story-steps">{story_steps}</div><div class="story-stage"><div class="stage-frame">{demo3}</div></div></div></div></section>')
    # feature explorer: each tab drives the live demo into the matching scene (same idea as the Notchify feature switcher)
    scenes = importlib.import_module(f"app_pages_data_{slug}").SCENES
    assert len(scenes) == len(c["features"]), (slug, len(scenes), len(c["features"]))
    tabs = ""
    for i, (ic, t_, d_) in enumerate(c["features"]):
        sel = i == 0
        tabs += (f'<button class="tab" role="tab" type="button" id="tab-{i}" aria-selected="{"true" if sel else "false"}" aria-controls="explorer-stage" tabindex="{0 if sel else -1}">'
                 f'<span class="ic">{B.icon(ic)}</span><div><strong>{e(t_)}</strong><div class="more"><div><p>{e(d_)}</p></div></div></div></button>')
    if demo["kind"] == "script":
        opts2 = dict(demo["opts"])
        if demo.get("lang"):
            opts2["lang"] = lang
        demo2 = f'<div class="demo-box demo-script" data-lazy data-api="{demo["api"]}" data-opts="{e(json.dumps(opts2))}"></div>'
    else:
        src2 = demo["src"] + (("&" if "?" in demo["src"] else "?") + "lang=" + lang if demo.get("lang") else "")
        demo2 = (f'<div class="demo-box demo-frame" data-w="{demo["w"]}" data-h="{demo["h"]}"><iframe src="{e(src2)}" width="{demo["w"]}" height="{demo["h"]}" title="{e(app["name"])} demo" loading="lazy"></iframe></div>')
    features = (f'<section id="features"><div class="wrap">{sec_head(s["feat"], c["features_title"])}<div class="fs rv" id="explorer" data-kind="{demo["kind"]}" data-scenes="{e(json.dumps(scenes))}">'
                f'<div class="tabs" role="tablist" aria-orientation="vertical" aria-label="{e(s["feat"])}">{tabs}</div>'
                f'<div class="fs-stage" id="explorer-stage" role="tabpanel"><div class="stage-frame">{demo2}</div><p class="stage-note">{e(hd["explorer_note"])}</p></div></div></div></section>')
    specs = "".join(f'<div class="spec"><small>{e(k)}</small><p>{e(v)}</p></div>' for k, v in c["details"])
    specs_sec = f'<section><div class="wrap"><div class="specs rv">{specs}</div></div></section>'
    cmp_cards = "".join(f'<article class="cmp rv"><h3 class="t">{e(n)}</h3><span class="tag">{e(tag)}</span><h3 class="k">{e(s["pick"])}</h3><p>{e(pick)}</p></article>' for n, tag, _sh, _df, pick in D["compare"]["items"])
    mx = matrix_html(slug, lang)
    if D["compare"].get("none"):
        compare = f'<section id="compare"><div class="wrap">{sec_head(s["compare"], hd["compare_title"], hd["compare_sub"])}</div></section>'
    else:
        compare = (f'<section id="compare"><div class="wrap">{sec_head(s["compare"], hd["compare_title"], hd["compare_sub"])}{mx if mx else f'<div class="cmp-grid">{cmp_cards}</div>'}'
                   f'<div class="center"><a class="more-link" href="{sub_path(lang, "compare")}">{e(s["all_compare"])} {ARROW}</a></div></div></section>')
    faq = "".join(f'<details class="rv"><summary>{e(q)}{PLUS}</summary><p>{e(a)}</p></details>' for q, a in c["faq"])
    faq_sec = (f'<section id="faq"><div class="wrap">{sec_head(s["faq"], s["faq_title"])}<div class="faq">{faq}</div>'
               f'<div class="center"><a class="more-link" href="{sub_path(lang, "faq")}">{e(s["more_q"])} {ARROW}</a></div></div></section>')
    parts = {"hero": hero, "stats": stats_sec, "how": how, "features": features, "specs": specs_sec, "compare": compare, "faq": faq_sec,
             "cta": final_cta(slug, app, lang), "apps": apps_row(slug, lang)}
    body = "".join(parts[k] for k in order_of(slug))
    ld = [{"@context": "https://schema.org", "@type": "SoftwareApplication", "name": app["name"], "operatingSystem": app.get("os", "Windows 10, Windows 11"),
           "applicationCategory": app["category"], "description": c["desc"], "url": canon, "image": f"https://{slug}.kingpindev.com/img/og-{slug}.jpg",
           "installUrl": ci["url"], "inLanguage": lang, "author": {"@type": "Person", "name": "Burak Pekel", "url": "https://kingpindev.com/"},
           "publisher": {"@type": "Organization", "name": "Kingpindev", "url": "https://kingpindev.com/"}},
          {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang, "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in c["faq"]]}]
    return shell(slug, app, lang, "home", c["title"], c["desc"], body, ld, canon, alt_en, alt_tr, other_url)


# ---------------------------------------------------------------- side pages
def sub_hero(app, lang, kind, extra="", h1=None, lead=None):
    s = SUBUI[lang]
    name = app["name"]
    return (f'<header class="sub-hero"><div class="wrap"><div class="eyebrow">{e(name)}</div><h1>{e(h1 or s["h1"][kind].format(name))}</h1>'
            f'<p class="lead">{e(lead or s["lead"][kind].format(name))}</p>{extra}</div></header>')


def faq_page(slug, app, lang):
    d = data(slug, lang)["faq"]
    s = SUBUI[lang]
    toc = "".join(f'<a href="#g{i}">{e(g)}</a>' for i, (g, _) in enumerate(d))
    groups, qa = "", []
    for i, (g, items) in enumerate(d):
        det = "".join(f'<details><summary>{e(q)}{PLUS}</summary><p>{e(a)}</p></details>' for q, a in items)
        groups += f'<section class="fgroup" id="g{i}"><div class="wrap"><h2>{e(g)}</h2><div class="faq">{det}</div></div></section>'
        qa += [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]
    ld = [{"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang, "mainEntity": qa}]
    return sub_hero(app, lang, "faq", f'<nav class="chips" aria-label="{e(s["toc"])}">{toc}</nav>') + groups + final_cta(slug, app, lang, s["questions_none"]), ld


def changelog_page(slug, app, lang):
    rows = ""
    for ver, date, headline, items in data(slug, lang)["changelog"]:
        rid = "v" + ver.replace(" ", "").replace(".", "-")
        lis = "".join(f"<li>{e(x)}</li>" for x in items)
        rows += (f'<article class="rel" id="{rid}"><div class="rel-side"><span class="ver">{e(ver)}</span><time>{e(date)}</time></div>'
                 f'<div class="rel-main"><h2>{e(headline)}</h2><ul>{lis}</ul></div></article>')
    return sub_hero(app, lang, "changelog") + f'<section class="rels"><div class="wrap">{rows}</div></section>' + final_cta(slug, app, lang), []


def privacy_page(slug, app, lang):
    D = data(slug, lang)
    meta = D.get("privacy_meta") or (f"Effective date: {MONTHS[LASTMOD][0]}" if lang == "en" else f"Yürürlük tarihi: {MONTHS[LASTMOD][1]}")
    secs = ""
    for h, paras in D["privacy"]:
        inner = ("<ul>" + "".join(f"<li>{e(p)}</li>" for p in paras) + "</ul>") if h in ("Summary", "Özet") else "".join(f"<p>{e(p)}</p>" for p in paras)
        secs += f"<h2>{e(h)}</h2>{inner}"
    mail = D["press"]["facts"][-1][1]
    mod = importlib.import_module(f"app_pages_data_{slug}")
    full = ""
    if getattr(mod, "PRIVACY_URL", None):
        lbl = ("Full Privacy Policy", "Terms of Service") if lang == "en" else ("Tam Gizlilik Politikası", "Kullanım Şartları")
        full = f'<p><a href="{mod.PRIVACY_URL}" rel="noopener">{lbl[0]}</a>' + (f' · <a href="{mod.TERMS_URL}" rel="noopener">{lbl[1]}</a>' if getattr(mod, "TERMS_URL", None) else "") + "</p>"
    contact = {"en": ("Contact", "If you have any questions about this policy, contact us at"), "tr": ("İletişim", "Bu politika hakkında sorularınız varsa bize şu adresten ulaşın:")}[lang]
    pub = "Publisher: Kingpindev" if lang == "en" else "Yayıncı: Kingpindev"
    body = (sub_hero(app, lang, "privacy") + f'<section class="prose"><div class="wrap"><p class="meta">{e(meta)} · {e(pub)}</p>{secs}'
            f'{full}<h2>{contact[0]}</h2><p>{e(contact[1])} <a href="mailto:{mail}">{mail}</a>.</p></div></section>')
    return body, []


def compare_page(slug, app, lang):
    D = data(slug, lang)["compare"]
    s = SUBUI[lang]
    sources = ""
    if D.get("sources"):
        label = "Official sources" if lang == "en" else "Resmî kaynaklar"
        links = " · ".join(f'<a href="{e(url)}">{e(name)}</a>' for name, url in D["sources"])
        sources = f'<p class="foot-note center" style="text-align:center">{label}: {links}</p>'
    cards = "".join(f'<article class="cmp rv"><h2>{e(n)}</h2><span class="tag">{e(tag)}</span><h3 class="k">{e(s["shines"])}</h3><p>{e(sh)}</p>'
                    f'<h3 class="k">{e(s["differs"].format(app["name"]))}</h3><p>{e(df)}</p><div class="pick"><h3 class="k">{e(s["pick"])}</h3><p>{e(pk)}</p></div></article>'
                    for n, tag, sh, df, pk in D["items"])
    body = (sub_hero(app, lang, "compare", h1=D.get("h1"), lead=D.get("lead")) + f'<section><div class="wrap"><p class="sub center" style="margin-inline:auto;text-align:center;max-width:760px">{e(D["intro"])}</p>'
            f'{matrix_html(slug, lang)}<div class="cmp-grid">{cards}</div>{sources}<p class="foot-note center" style="text-align:center">{e(D["foot"])}</p></div></section>' + final_cta(slug, app, lang))
    return body, []


def press_page(slug, app, lang):
    D = data(slug, lang)["press"]
    s = SUBUI[lang]
    name = app["name"]
    facts = "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in D["facts"])
    blocks = ""
    for i, (label, key) in enumerate(((s["onel"], "oneliner"), (s["shortd"], "short"), (s["longd"], "long"))):
        blocks += (f'<div class="copyblock"><div class="cb-head"><h3>{e(label)}</h3><button type="button" class="btn btn-g btn-sm" data-copy="cp{i}">{e(s["copy"])}</button></div><p id="cp{i}">{e(D[key])}</p></div>')
    folder = f"/img/press/{slug}/"
    prefix = "tr-" if (slug == "mixora" and lang == "tr") else ""
    shots = "".join(f'<figure class="shot"><a href="{folder}{prefix}{f}.jpg" download><img src="{folder}{prefix}{f}-thumb.jpg" alt="{e(cap)}" width="480" height="270" loading="lazy"></a>'
                    f'<figcaption>{e(cap)} <a href="{folder}{prefix}{f}.jpg" download>{e(s["download"])}</a></figcaption></figure>' for f, cap in D["shots"])
    notes = "".join(f"<li>{e(n)}</li>" for n in D["notes"])
    body = (sub_hero(app, lang, "press")
            + f'<section class="pk"><div class="wrap"><h2>{e(s["facts"])}</h2><dl class="kdl">{facts}</dl></div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["onel"])} / {e(s["shortd"])} / {e(s["longd"])}</h2>{blocks}</div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["assets"])}</h2><div class="logos">'
              f'<a class="logo-card" href="{folder}{slug}-logo.png" download><img src="{folder}{slug}-logo-thumb.png" alt="{e(name)}" width="160" height="160" loading="lazy"><span><b>{e(s["logo"])}</b><small>{e(s["logo_note"])}</small></span></a>'
              f'<a class="logo-card" href="{folder}{slug}-icon-256.png" download><img src="{folder}{slug}-icon-256.png" alt="" width="96" height="96" loading="lazy"><span><b>{e(s["icon"])}</b><small>PNG 256 × 256</small></span></a>'
              f'<a class="btn btn-p" href="{folder}{slug}-press-kit.zip" download>{e(s["zip"])}</a></div>'
              f'<h3 class="sub-h">{e(s["shots"])}</h3><div class="shots">{shots}</div></div></section>'
            + f'<section class="pk"><div class="wrap"><h2>{e(s["notes"])}</h2><ul class="notes">{notes}</ul></div></section>'
            + final_cta(slug, app, lang))
    return body, []


BUILDERS = {"faq": faq_page, "changelog": changelog_page, "compare": compare_page, "press": press_page, "privacy": privacy_page}


def build_sub_pages(slug: str, app: dict) -> None:
    for lang in ("en", "tr"):
        s = SUBUI[lang]
        for kind in KINDS:
            body, ld = BUILDERS[kind](slug, app, lang)
            name = app["name"]
            title, desc = s["title"][kind].format(name), s["desc"][kind].format(name)
            if kind == "compare":
                cd = data(slug, lang)["compare"]
                title, desc = cd.get("title", title), cd.get("desc", desc)
            assert 25 <= len(desc) <= 175, (slug, lang, kind, len(desc))
            home = base(slug, lang)
            crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": name, "item": home}, {"@type": "ListItem", "position": 2, "name": s[kind], "item": sub_url(slug, lang, kind)}]}
            other = "en" if lang == "tr" else "tr"
            page_html = shell(slug, app, lang, kind, title, desc, body, [crumbs] + ld, sub_url(slug, lang, kind), sub_url(slug, "en", kind), sub_url(slug, "tr", kind), sub_url(slug, other, kind))
            d = OUT / slug / ("tr" if lang == "tr" else "") / kind
            d.mkdir(parents=True, exist_ok=True)
            (d / "index.html").write_text(page_html, encoding="utf-8", newline="\n")


def build_home_pages(slug: str, app: dict) -> None:
    d = OUT / slug
    (d / "tr").mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(home_page(slug, app, "en"), encoding="utf-8", newline="\n")
    (d / "tr" / "index.html").write_text(home_page(slug, app, "tr"), encoding="utf-8", newline="\n")
