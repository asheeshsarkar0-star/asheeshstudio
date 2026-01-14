const CACHE="studio-v1";
const ASSETS=[
"/",
"/index.html",
"/portfolio.html",
"/payment.html",
"/icon-192.png",
"/icon-512.png",
"/manifest.json"
];

self.addEventListener("install",e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener("fetch",e=>{
 e.respondWith(
  caches.match(e.request).then(res=>res || fetch(e.request))
 );
});
