"""Builds mixora-demo/mixora-demo.js: splices the lucide icon table from groupy-demo.js into
mixora-demo.src.js (the source keeps a /*ICONS*/ marker) and adds the icons Mixora needs on top."""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
groupy = (root / "groupy-demo" / "groupy-demo.js").read_text(encoding="utf-8")
m = re.search(r"  const P = \{.*?\n  \};\n", groupy, re.S)
assert m, "icon table not found"
extra = '''  P.globe = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z";
  P.moon = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z";
  P.refresh = "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16 M8 16H3v5";
  P.maximize = "M8 3H5a2 2 0 0 0-2 2v3 M21 8V5a2 2 0 0 0-2-2h-3 M3 16v3a2 2 0 0 0 2 2h3 M16 21h3a2 2 0 0 0 2-2v-3";
'''
src = (root / "mixora-demo" / "mixora-demo.src.js").read_text(encoding="utf-8")
assert "/*ICONS*/" in src
out = src.replace("  /*ICONS*/\n", m.group(0) + extra)
(root / "mixora-demo" / "mixora-demo.js").write_text(out, encoding="utf-8", newline="\n")
print("built", len(out))
