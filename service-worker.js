const CACHE = "studio-v1";

const ASSETS = [
 "/",
 "/index.html",
 "/offline.html",
 "/manifest.json",
 "/icon-192.png",
 "/icon-512.png",
 "/banner.png",
 "/g1.png",
 "/g2.png"
];

self.addEventListener("install", e => {
 e.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(ASSETS))
 );
});

self.addEventListener("activate", e => {
 e.waitUntil(
  caches.keys().then(keys =>
   Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  )
 );
});

self.addEventListener("fetch", event => {
 event.respondWith(
  caches.match(event.request).then(cached => {
   return cached || fetch(event.request).catch(() => caches.match("/offline.html"));
  })
 );
});
