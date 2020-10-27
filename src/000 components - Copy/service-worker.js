/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

var CACHE_NAME = "skillbakery-cache";
var urlsToCache = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/service-worker.js",
  "/index.html",
  "/static/js/2.73a7ac12.chunk.js",
  "/static/js/main.c73d62da.chunk.js",
  "/static/js/runtime-main.23083dbb.js",
  "/static/css/main.5ec536da.chunk.css",
  "/static/media/open_page_movie.2ddcc5a8.mp4",
  "/static/media/open_page.9d2067e4.mp4",
  "/static/media/ziniuone_movie.1a5b4fb4.mp4",
  "/static/media/page0.2d2033ce.mp4",
  "/static/media/page1.2f567873.mp4",
  "/static/media/page1plants.b94e7387.mp4",
  "/static/media/page2.65f4775c.mp4",
  "/static/media/page2plants.8350b401.mp4",
  "/static/media/page3.e794bdd4.mp4",
  "/static/media/page3plants.cc770a41.mp4",
  "/static/media/page4.de096ea8.mp4",
  "/static/media/page4plants.056d0d33.mp4",
  "/static/media/page5.1bb744b8.mp4",
  "/static/media/page5plants.2395f65a.mp4",
  "/static/media/page6.5a332c9a.mp4",
  "/static/media/page6plants.d27cf720.mp4",
  "/static/media/page7.67ea878a.mp4",
  "/static/media/page7plants.1036f9cb.mp4",
  "/static/media/forrest.5b184e3c.mp3",
  "/static/media/garden.57d91bd3.mp3",
  "/static/media/meadow.51582553.mp3",
  "/static/media/plants_moving.969993f3.mp3",
  "/static/media/ziniuone_movie_audio.900cf3cf.mp3"
];

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("/precache-manifest.cb2cd9f09a0da91154a6e10288d4571e.js");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheName) {})
      .map(function (cacheName) {
        return caches.delete(cacheName);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("found in cache");
        console.log(event.request);
        console.log(response);
        return response;
      }
      console.log("not found in cache");
      console.log(event.request);
      return fetch(event.request);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/]
});
