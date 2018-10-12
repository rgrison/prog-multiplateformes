/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */
'use strict';
importScripts('./build/sw-toolbox.js');
importScripts("https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js");
import * as Constants from "./constants"
import { Storage } from '@ionic/storage'

// Cache for Ionic
self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// Listeners
self.addEventListener('install', event => {
  console.log('Installing Service Worker...');
  console.log('Caching resources...');

  event.waitUntil(
      Promise.all([
        // FIXME : is it useful ?
        // caches.open(STATIC_CACHE_NAME)
          // .then(cache => {
          //   return cache.addAll(FILES_TO_CACHE);
          // }),
          getData(Constants.SPEAKERS),
          getData(Constants.SESSIONS)
        ])
  );
});

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
