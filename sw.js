const VERSION = "v2";
const CACHE = "kto-ya-" + VERSION;
const FILES = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "icon.svg",
  "img/1-palto.jpg",
  "img/2-kafe.jpg",
  "img/3-raskladka.jpg",
  "img/4-moher.jpg",
  "img/5-vecher.jpg",
  "img/sanya-1-mesto.jpg",
  "img/sanya-2-eda.jpg",
  "img/sanya-3-frazy.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Сначала интернет (свежая версия), без интернета — сохранённая копия
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
