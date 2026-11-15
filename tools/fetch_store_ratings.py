"""Fetches the real Microsoft Store rating summary (all markets, all time) of each Store app and writes tools/store_ratings.json.

    python tools/fetch_store_ratings.py          # then: python tools/build_app_sites.py

The app sites show a rating line only for apps with at least MIN_RATINGS ratings, so a single rating never looks like a trend.
Source: the public Microsoft Store catalogue (displaycatalog.mp.microsoft.com), the same data the Store page shows.
"""
import json
import sys
import time
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import build_app_sites as B  # noqa: E402

out = {}
for slug, app in B.APPS.items():
    sid = app.get("store")
    if not sid:
        continue
    url = f"https://displaycatalog.mp.microsoft.com/v7.0/products/{sid}?market=US&languages=en-US&MS-CV=DGU1mcuYo0WMMp%2BF.1"
    try:
        d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30))
        usage = {u["AggregateTimeSpan"]: u for u in d["Product"]["MarketProperties"][0].get("UsageData", [])}
        u = usage.get("AllTime", {})
        out[slug] = {"avg": round(float(u.get("AverageRating", 0)), 1), "count": int(u.get("RatingCount", 0)), "fetched": time.strftime("%Y-%m-%d")}
        print(slug, out[slug])
    except Exception as e:  # keep the previous value if the Store is unreachable
        print(slug, "failed:", e)
if out:
    (HERE / "store_ratings.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
