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
  "/static/js/2.cf3f5806.chunk.js",
  "/static/js/main.43e3f26f.chunk.js",
  "/static/js/runtime-main.4910aef2.js",
  "/static/css/main.d0cf45c5.chunk.css",
  "/static/media/open_page_movie.74e69042.mp4",
  "/static/media/open_page.b338f61a.mp4",
  "/static/media/ziniuone_movie.0a0151df.mp4",
  "/static/media/page0.1bda70af.mp4",
  "/static/media/page1.c9b0b564.mp4",
  "/static/media/page1plants.50b733b0.mp4",
  "/static/media/page2.caebd500.mp4",
  "/static/media/page2plants.ca2246a5.mp4",
  "/static/media/page3.9faceec5.mp4",
  "/static/media/page3plants.11ebf1e2.mp4",
  "/static/media/page4.d3b4b90d.mp4",
  "/static/media/page4plants.351a7fff.mp4",
  "/static/media/page5.a41da7ec.mp4",
  "/static/media/page5plants.0105b27c.mp4",
  "/static/media/page6.be5baf17.mp4",
  "/static/media/page6plants.60cf42fe.mp4",
  "/static/media/page7.cb493f79.mp4",
  "/static/media/page7plants.f742383a.mp4",
  "/static/media/forrest.5b184e3c.mp3",
  "/static/media/garden.57d91bd3.mp3",
  "/static/media/meadow.51582553.mp3"
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
