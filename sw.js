// offline cache, version 00e8b2fb31. A new version replaces the old cache and the page reloads once.
var CACHE = "nye-00e8b2fb31", FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: "reload" }); })); })); self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })); })); self.clients.claim(); });
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || fetch(e.request).catch(function () { return caches.match("index.html"); }); }));
});
