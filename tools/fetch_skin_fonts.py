"""Downloads the Google fonts each app skin uses (latin + latin-ext woff2 only) into app-sites/fonts/ and writes
tools/skins_src/<slug>.fonts.css with @font-face rules pointing at /app-sites/fonts/. Run once per font change:  python tools/fetch_skin_fonts.py [slug ...]
"""
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "app-sites", "fonts")
SRC = os.path.join(ROOT, "tools", "skins_src")

# slug -> Google css2 family specs
FAMILIES = {
    "mixora": ["Barlow+Condensed:wght@500;600;700", "Barlow:wght@400;500;600", "DM+Mono:wght@400;500"],
    "lunadock": ["Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800", "Figtree:wght@400..700"],
    "vicesonar": ["Chakra+Petch:wght@500;600;700", "Exo+2:wght@400..600"],
    "vorganizer": ["Courier+Prime:wght@400;700", "Public+Sans:wght@400..700"],
    "aurora": ["Instrument+Serif:ital@0;1", "Manrope:wght@400..700"],
    "spotidrop": ["Anton", "Archivo:wght@400..700"],
    "hotpad": ["Space+Mono:wght@400;700", "Outfit:wght@400..700"],
    "goliath": ["Rubik:wght@400..800", "JetBrains+Mono:wght@500"],
    "lolable": ["Cinzel:wght@500..800", "Mulish:wght@400..700"],
    "glidesnap": ["Sora:wght@400..700", "IBM+Plex+Mono:wght@400;500"],
}
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read()


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(SRC, exist_ok=True)
    slugs = sys.argv[1:] or list(FAMILIES)
    for slug in slugs:
        rules, n = [], 0
        for spec in FAMILIES[slug]:
            css = get("https://fonts.googleapis.com/css2?family=%s&display=swap" % spec).decode("utf-8")
            for subset, blk in re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S):
                if subset not in ("latin", "latin-ext"):
                    continue
                fam = re.search(r"font-family:\s*'([^']+)'", blk).group(1)
                style = re.search(r"font-style:\s*(\w+)", blk).group(1)
                wt = re.search(r"font-weight:\s*([\d ]+)", blk).group(1).strip()
                url = re.search(r"url\(([^)]+)\)", blk).group(1)
                ur = re.search(r"unicode-range:\s*([^;]+);", blk).group(1)
                fn = re.sub(r"[^A-Za-z0-9]", "", fam) + "-" + style + "-" + subset + "-" + os.path.basename(url)
                path = os.path.join(OUT, fn)
                if not os.path.exists(path):
                    open(path, "wb").write(get(url))
                    n += 1
                rules.append("@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;src:url(/app-sites/fonts/%s) format('woff2');unicode-range:%s}" % (fam, style, wt, fn, ur))
        open(os.path.join(SRC, slug + ".fonts.css"), "w", encoding="utf-8").write("\n".join(rules) + "\n")
        print(slug, len(rules), "rules,", n, "new files")


if __name__ == "__main__":
    main()
