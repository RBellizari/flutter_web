'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/favicon.png": "5dcef449791fa27946b3d35ad8803796",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/main.dart.js": "6f2e0a6f69a3863f04f7a24dda41a4ec",
"/manifest.json": "9a474970ecb80605f90df140b477c3f5",
"/index.html": "2b532260b835b2fbcf6088c1cde2fdc4",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/LICENSE": "964211db6a8b173b1744e68da77ce459",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
