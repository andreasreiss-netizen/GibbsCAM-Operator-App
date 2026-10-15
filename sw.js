// Shopfloor Companion – Service Worker
// App-Dateien: zuerst Netz, Cache nur offline (damit Updates sofort ankommen).
// Bibliotheken/Fonts von CDNs: zuerst Cache.
const CACHE = "sfc-v5";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const u = new URL(req.url);
  const isCdn = u.hostname === "cdnjs.cloudflare.com" || u.hostname.endsWith("gstatic.com") || u.hostname.endsWith("googleapis.com");
  if (u.origin !== location.origin && !isCdn) return;
  const store = res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
  if (isCdn) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(store)));
  } else {
    e.respondWith(fetch(req).then(store).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html"))));
  }
});
