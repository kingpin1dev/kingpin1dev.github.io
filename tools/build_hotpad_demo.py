"""Rebuilds /hotpad-demo/: the real Hotpad React interface (Macro Keyboard/ui) running in the browser with a fake WebView2 host.

    python tools/build_hotpad_demo.py [path to the Macro Keyboard project]

Runs `vite build` into hotpad-demo/ (the app's own wwwroot is not touched), copies hotpad-demo-src/mock.js next to it and
loads it (and frame-bridge.js) before the app bundle, so window.chrome.webview exists when the interface starts.
"""
import os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(ROOT), "Macro Keyboard")
OUT = os.path.join(ROOT, "hotpad-demo")
subprocess.run(["npx", "vite", "build", "--outDir", OUT, "--emptyOutDir"], cwd=os.path.join(SRC, "ui"), check=True, shell=(os.name == "nt"))
shutil.copy(os.path.join(ROOT, "hotpad-demo-src", "mock.js"), os.path.join(OUT, "mock.js"))
p = os.path.join(OUT, "index.html")
html = open(p, encoding="utf-8").read()
html = html.replace("<title>Hotpad</title>", '<title>Hotpad</title>\n    <meta name="robots" content="noindex" />\n    <script src="/frame-bridge.js"></script>\n    <script src="./mock.js"></script>', 1)
html = re.sub(r'<script type="module" crossorigin', '<script type="module" crossorigin', html)
open(p, "w", encoding="utf-8").write(html)
for f in os.listdir(os.path.join(OUT, "assets")):   # the app loads its logo from the site root ("/hotpad.png"); here it lives next to the demo
    if f.endswith(".js"):
        fp = os.path.join(OUT, "assets", f)
        js = open(fp, encoding="utf-8").read()
        open(fp, "w", encoding="utf-8", newline="").write(js.replace('"/hotpad.png"', '"/hotpad-demo/hotpad.png"'))
print("ok", sorted(os.listdir(OUT)))
