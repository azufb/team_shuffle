const cacheName = "js13kPWA-v1";
const appShellFiles = [
  "index.html",
  "main.tsx",
  "App.tsx",
  "index.css",
]
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");

  // 以下のコードが実行されるまでインストールされない
  e.waitUntil(
      caches.open(cacheName).then((cache) => {
          console.log("[Service Worker] Caching all: app shell and content");
          return cache.addAll(appShellFiles);
        }),
  )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).catch(() => caches.match('offline.html'));
      })
    );
  });

self.addEventListener("activate", (e) => {
    const casheWhitelist = [];
  casheWhitelist.push(cacheName);

  e.waitUntil(
    caches.keys().then((casheNames) =>
      Promise.all(
        casheNames.map((casheName) => {
          if (!casheWhitelist.includes(casheName)) {
            return caches.delete(casheName);
          }
        })
      )
    )
  );
})