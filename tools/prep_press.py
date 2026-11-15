"""Prepares the press-kit images for the app sites into img/press/<slug>/ (run once, or when the sources change).

    python tools/prep_press.py

Sources are the Store marketing images of each app (local project folders). Screenshots become 1600 px JPEGs plus 480 px thumbnails,
logos are PNGs, and everything is also packed into <slug>-press-kit.zip. Mixora has English and Turkish screenshots.
"""
import sys
import zipfile
from pathlib import Path

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
PROJECTS = ROOT.parent
OUT = ROOT / "img" / "press"

MIX = PROJECTS / "Fluent Mixer"
LUNA = PROJECTS / "Stacks"
MIX_SHOTS = ("01-groups", "02-chatmix", "03-tray", "04-outputs", "05-ducking", "06-profiles", "07-shortcuts")
SPEC = {
    "mixora": {
        "logo": MIX / "Assets" / "Logo.png",
        "shots": [(MIX / "store-media" / "out-redesign" / lang / (n + ".png"), ("tr-" if lang == "tr" else "") + n) for lang in ("en", "tr") for n in MIX_SHOTS],
    },
    "lunadock": {
        "logo": LUNA / "out" / "store-media" / "LunaDock-logo.png",
        "shots": [(LUNA / "Assets" / "Store" / "LunaDock-Promo" / (n + ".png"), n) for n in ("01-Before-After", "02-Icon-Packs", "03-Open-Your-Stacks", "04-Organized-Your-Way")],
    },
}


def jpg(src: Path, dst: Path, width: int, q: int) -> None:
    im = Image.open(src).convert("RGB")
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(dst, "JPEG", quality=q, optimize=True, progressive=True)


for slug, spec in SPEC.items():
    d = OUT / slug
    d.mkdir(parents=True, exist_ok=True)
    logo = Image.open(spec["logo"]).convert("RGBA")
    big = logo.resize((1024, round(logo.height * 1024 / logo.width)), Image.LANCZOS)
    big.save(d / (slug + "-logo.png"), optimize=True)
    big.resize((320, round(big.height * 320 / big.width)), Image.LANCZOS).save(d / (slug + "-logo-thumb.png"), optimize=True)
    logo.resize((256, 256), Image.LANCZOS).save(d / (slug + "-icon-256.png"), optimize=True)
    names = []
    for src, name in spec["shots"]:
        jpg(src, d / (name + ".jpg"), 1600, 86)
        jpg(src, d / (name + "-thumb.jpg"), 480, 80)
        names.append(name)
    with zipfile.ZipFile(d / (slug + "-press-kit.zip"), "w", zipfile.ZIP_DEFLATED) as z:
        for f in (slug + "-logo.png", slug + "-icon-256.png", *(n + ".jpg" for n in names)):
            z.write(d / f, f)
    total = sum(p.stat().st_size for p in d.iterdir())
    print(slug, len(names), "screenshots,", round(total / 1024), "KB")
