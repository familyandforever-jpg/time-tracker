// 离线缓存：没网时也能打开 App 记录，联网后自动同步。
const V = 'tt-v7';
const CORE = ['./', 'index.html', 'config.js', 'manifest.json', 'icon-192.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.hostname.endsWith('supabase.co')) return; // 数据请求不缓存
  if(url.origin === location.origin){
    // 自己的文件：先联网拿最新的，没网用缓存
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
  }else{
    // 字体和同步库：有缓存就用缓存
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(req, c)); return res; })));
  }
});
// 点通知：「还在做 / 继续」直接在后台处理，不打断你；点通知本身或「做完了」就打开 App
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const act = e.action;
  const quiet = act === 'taskMore' || act === 'stillYes';
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(cs => {
    const c = cs[0];
    if(c){
      if(act && act !== 'open') c.postMessage({tt: act});
      if(!quiet && 'focus' in c) return c.focus();
      return;
    }
    return self.clients.openWindow('./' + (act && act !== 'open' ? '?nact=' + act : ''));
  }));
});
