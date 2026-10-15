// Shopfloor Companion – Service Worker: App-Hülle und Bibliotheken offline verfügbar
const CACHE = "sfc-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    const u = new URL(req.url);
    if (res.ok && (u.origin === location.origin || u.hostname === "cdnjs.cloudflare.com" || u.hostname.endsWith("gstatic.com") || u.hostname.endsWith("googleapis.com"))) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => caches.match("./index.html"))));
});
