// Captures the press-kit screenshots of the apps that have a live demo (real interface or real app model) straight from the built app sites.
//   node tools/capture_press_shots.cjs [slug ...]      -> img/press/<slug>/shot-N.jpg  (then run: python tools/prep_press.py)
// It serves the repository locally (sites/<slug> as the site root, shared folders from the repo root), opens the home page, runs the feature
// explorer scene of a tab, waits, and screenshots the demo frame. Needs puppeteer: set PUPPETEER_DIR to a folder whose node_modules has it.
const fs = require('fs'), path = require('path'), http = require('http');
const ROOT = path.resolve(__dirname, '..');
const puppeteer = require(path.join(process.env.PUPPETEER_DIR || 'C:/Burak/Rarely Used/Projects/Notchify Codex Edition/WhatsAppBridge', 'node_modules/puppeteer'));
const SHARED = /^\/(img|app-sites|[a-z]+-demo|frame-bridge\.js)/;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' };
// slug -> [tab index, wait ms after clicking it] for shot-1..4 (the tab runs a scene of the feature explorer)
const SHOTS = {
  vorganizer: [[0, 2600], [3, 2600], [4, 7000], [6, 1800]],
  aurora: [[2, 3500], [0, 4200], [1, 3000], [4, 2500]],
  spotidrop: [[0, 2200], [4, 4200], [7, 1800], [6, 1800]],
  goliath: [[4, 3500], [1, 3000], [7, 3000], [2, 6500]],
  lolable: [[1, 3200], [2, 3200], [3, 3200], [6, 3200]],
  glidesnap: [[0, 2000], [1, 1600], [2, 3200], [3, 2400]],
};
const wait = ms => new Promise(r => setTimeout(r, ms));
function serve(slug) {
  return new Promise(res => {
    const s = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
      const base = SHARED.test(p) ? ROOT : path.join(ROOT, 'sites', slug);
      const f = path.join(base, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
    }).listen(0, '127.0.0.1', () => res(s));
  });
}
(async () => {
  const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS);
  const browser = await puppeteer.launch({ headless: true });
  for (const slug of wanted) {
    const srv = await serve(slug), port = srv.address().port;
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => { try { localStorage.setItem('kpd-lang', 'x'); } catch (e) { } });
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1.5 });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' }); await wait(1500);
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('features').scrollIntoView(); }); await wait(2500);
    const out = path.join(ROOT, 'img', 'press', slug); fs.mkdirSync(out, { recursive: true });
    let n = 0;
    for (const [tab, ms] of SHOTS[slug]) {
      n++;
      await page.$eval('#tab-' + tab, e => e.click()); await wait(ms);
      const el = await page.$('#explorer .stage-frame');
      await el.screenshot({ path: path.join(out, `shot-${n}.jpg`), type: 'jpeg', quality: 88 });
      console.log(slug, 'shot', n, 'tab', tab);
    }
    await page.close(); srv.close();
  }
  await browser.close();
})();
