"""Per-app skins for the <slug>.kingpindev.com sites.

Each app gets its own look: tools/skins_src/<slug>.css (hand-written) + <slug>.fonts.css (made by fetch_skin_fonts.py) are joined into
app-sites/skins/<slug>.css and loaded after the shared base (app-sites/v2.css). A skin can also choose the order of the home sections
and drop the ones it does not use. Section keys: hero stats how features specs compare faq cta apps.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "tools" / "skins_src"
OUT = ROOT / "app-sites" / "skins"

DEFAULT_ORDER = ["hero", "stats", "how", "features", "specs", "compare", "faq", "cta", "apps"]

# scheme = browser colour scheme, theme = <meta name=theme-color>, pre = display font file to preload, order = home sections
L = lambda **k: k
DEFAULTS = dict(nav="pill", hero="center", heads="center", how="story", feat="side", faq="list", spec="cards", stats="band", cta="panel")
SKINS = {
    "mixora": {"scheme": "dark", "theme": "#17140f", "layout": L(hero="split", heads="left", spec="rows", cta="left")},
    "lunadock": {"scheme": "light", "theme": "#eef3ff", "layout": L(how="cols", feat="cards", faq="cols", stats="inline")},
    "vicesonar": {"scheme": "dark", "theme": "#120726", "layout": L(nav="bar", hero="poster", heads="side", feat="top", spec="strip", cta="left"),
                  "order": ["hero", "features", "how", "specs", "compare", "faq", "cta", "apps"]},
    "vorganizer": {"scheme": "light", "theme": "#e9dcc0", "layout": L(nav="bar", hero="stack", heads="left", how="cols", faq="cols", spec="rows", stats="inline")},
    "aurora": {"scheme": "dark", "theme": "#04110f", "layout": L(heads="side", feat="cards", spec="strip"),
               "order": ["hero", "how", "features", "specs", "faq", "compare", "cta", "apps"]},
    "spotidrop": {"scheme": "dark", "theme": "#000000", "layout": L(nav="bar", hero="poster", heads="left", how="cols", feat="top", faq="cols", spec="rows", cta="left"),
                  "order": ["hero", "stats", "how", "features", "compare", "specs", "faq", "cta", "apps"]},
    "hotpad": {"scheme": "light", "theme": "#e8e4dc", "layout": L(hero="splitrev", feat="cards", faq="cols", spec="strip", cta="left"),
               "order": ["hero", "features", "how", "compare", "specs", "faq", "cta", "apps"]},
    "goliath": {"scheme": "dark", "theme": "#1e1f22", "layout": L(nav="bar", hero="split", heads="left", how="cols", spec="rows", stats="inline"),
                "order": ["hero", "stats", "features", "how", "specs", "compare", "faq", "cta", "apps"]},
    "lolable": {"scheme": "dark", "theme": "#010a13", "layout": L(feat="top")},
    "glidesnap": {"scheme": "light", "theme": "#f1f3f5", "layout": L(hero="stack", heads="side", how="cols", feat="cards", faq="cols", spec="strip", stats="inline", cta="left"),
                  "order": ["hero", "how", "stats", "features", "specs", "compare", "faq", "cta", "apps"]},
}


def layout_attrs(slug: str) -> str:
    lay = dict(DEFAULTS, **SKINS.get(slug, {}).get("layout", {}))
    return " ".join('data-%s="%s"' % (k, v) for k, v in lay.items())


def order_of(slug: str) -> list[str]:
    return SKINS.get(slug, {}).get("order", DEFAULT_ORDER)


def build_css() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug in SKINS:
        parts = []
        for name in (slug + ".fonts.css", slug + ".css"):
            f = SRC / name
            if f.exists():
                txt = f.read_text(encoding="utf-8")
                if name == slug + ".css":
                    # skin selectors must out-rank the layout kit (body[data-x] .y): write .sk-<slug> .y, built as body.sk-<slug> .y
                    txt = re.sub(r"(?<!body)\.sk-%s" % slug, "body.sk-" + slug, txt)
                parts.append(txt)
        (OUT / (slug + ".css")).write_text("\n".join(parts), encoding="utf-8", newline="\n")
