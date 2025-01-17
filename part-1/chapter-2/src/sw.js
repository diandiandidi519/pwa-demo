self.addEventListener("fetch", function (event) {
  console.log("fetch event", event);
});
self.addEventListener("install", function (event) {
  console.log("install event", event);
  self.skipWaiting();
  event.waitUntil(
    caches.open("sw-cache-v1").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/index.css",
        "/index.js",
        "/images/launcher-icon.png",
      ]);
    })
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function (cacheList) {
        console.log(cacheList);
        Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== "sw-cache-v1") {
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});

console.log(self);
