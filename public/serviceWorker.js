const cacheName = "js13kPWA-v1";
const urlsToCache = ["index.html"]

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(urlsToCache)
        })
    )
})

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