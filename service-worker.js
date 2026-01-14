const CACHE = "studio-v2";

const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",

  "/file_0000000027e471faa86a9842ff80a567.png",   // NEW APP ICON

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
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
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
