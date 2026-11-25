// kingpindev.com demo: stands in for the browser extension APIs so the real Lalune page runs in a frame.
// Settings live in memory only, so every visit starts fresh and nothing is stored.
(function () {
  function area() {
    const data = {}, listeners = [];
    const clone = (o) => JSON.parse(JSON.stringify(o));
    return {
      async get(keys) {
        if (keys == null) return clone(data);
        if (typeof keys === 'string') keys = [keys];
        const out = {};
        if (Array.isArray(keys)) keys.forEach((k) => { if (k in data) out[k] = clone(data[k]); });
        else Object.keys(keys).forEach((k) => { out[k] = k in data ? clone(data[k]) : keys[k]; });
        return out;
      },
      async set(obj) { Object.assign(data, clone(obj)); },
      async remove(keys) { [].concat(keys).forEach((k) => delete data[k]); },
      async clear() { Object.keys(data).forEach((k) => delete data[k]); },
      async getBytesInUse() { return JSON.stringify(data).length; },
      onChanged: { addListener(f) { listeners.push(f); }, removeListener() {} },
    };
  }
  const ev = () => ({ addListener() {}, removeListener() {}, hasListener() { return false; } });
  const bm = (id, title, url) => (url ? { id, title, url, parentId: '1' } : { id, title, children: [] });
  const bar = { id: '1', title: 'Bookmarks bar', parentId: '0', children: [
    bm('11', 'GitHub', 'https://github.com/'),
    bm('12', 'YouTube', 'https://www.youtube.com/'),
    bm('13', 'Wikipedia', 'https://www.wikipedia.org/'),
    bm('14', 'Notion', 'https://www.notion.so/'),
    bm('15', 'Figma', 'https://www.figma.com/'),
    bm('16', 'Spotify', 'https://open.spotify.com/'),
  ] };
  const local = area(), sync = area();
  const L = (id, title, url) => ({ id, title, url });
  local.set({ klasBookmarkCategories: [
    { id: '0', name: 'Social', links: [L('a1', 'Instagram', 'https://www.instagram.com/'), L('a2', 'Reddit', 'https://www.reddit.com/'), L('a3', 'X', 'https://x.com/'), L('a4', 'YouTube', 'https://www.youtube.com/')] },
    { id: '1', name: 'Business', links: [L('b1', 'Gmail', 'https://mail.google.com/'), L('b2', 'Notion', 'https://www.notion.so/'), L('b3', 'Slack', 'https://slack.com/'), L('b4', 'Figma', 'https://www.figma.com/')] },
    { id: '2', name: 'Diğer', links: [L('c1', 'Wikipedia', 'https://www.wikipedia.org/'), L('c2', 'Spotify', 'https://open.spotify.com/'), L('c3', 'Netflix', 'https://www.netflix.com/')] },
    { id: '3', name: 'Araçlar', links: [L('d1', 'GitHub', 'https://github.com/'), L('d2', 'ChatGPT', 'https://chatgpt.com/'), L('d3', 'Google Translate', 'https://translate.google.com/')] },
  ] });
  window.chrome = {
    storage: { local, sync, onChanged: ev() },
    bookmarks: {
      getTree: async () => [{ id: '0', title: '', children: [bar, { id: '2', title: 'Other bookmarks', parentId: '0', children: [] }] }],
      onCreated: ev(), onChanged: ev(), onRemoved: ev(), onMoved: ev(),
    },
    runtime: {
      getURL: (p) => new URL(String(p).replace(/^\//, ''), location.href).href,
      setUninstallURL: async () => {},
      lastError: undefined,
      onInstalled: ev(), onStartup: ev(),
    },
    permissions: { request: async () => false, contains: async () => false },
    tabs: { create: (o) => { window.open(o.url, '_blank', 'noopener'); } },
    action: { onClicked: ev() },
  };
})();
