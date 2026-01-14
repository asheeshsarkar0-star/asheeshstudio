const CACHE = "studio-v3";

const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",

  // ICON
  "/file_0000000027e471faa86a9842ff80a567.png",

  // SHARE CARD
  "/file_00000000769c7230853e1deb70bf32c2.png",

  // SPLASH IMAGE
  "/file_000000007f1071fd8ee5386f380d665b.png",

  // WEBSITE IMAGES
  "/banner.png",
  "/g1.png",
  "/g2.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
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
